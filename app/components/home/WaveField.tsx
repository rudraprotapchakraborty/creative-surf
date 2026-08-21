"use client";

/**
 * The 3D swell behind the homepage hero.
 *
 * Raw three.js rather than react-three-fiber: @react-three/fiber@9 requires
 * React 19 and this app is on 18. Named imports keep the bundle tree-shakeable
 * (~90KB gz) and the imperative lifecycle mirrors MouseParticles.
 *
 * Two objects share one displacement function (WAVE_CHUNK) so the point cloud
 * and the wireframe never drift apart: points read as data, the grid reads as
 * water, and together they read as a Creative Surf wave.
 */

import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  LineSegments,
  MathUtils,
  NormalBlending,
  PerspectiveCamera,
  Plane,
  PlaneGeometry,
  Points,
  Raycaster,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
  WireframeGeometry,
} from "three";

/** Plane dimensions in world units. Local +y runs away from the camera. */
const PLANE_W = 46;
const PLANE_D = 30;

/**
 * Shared vertex displacement. Four directional sine waves at descending
 * amplitude give a rolling swell that never visibly repeats, plus a gaussian
 * lift under the pointer so the surface answers the cursor.
 */
const WAVE_CHUNK = `
  uniform float uTime;
  uniform float uRise;
  uniform float uFlatten;
  uniform vec2  uPointer;
  uniform float uPointerStrength;

  varying float vH;
  varying float vFade;

  float swell(vec2 p, float t) {
    float h = 0.0;
    h += sin(dot(p, vec2( 1.00,  0.15)) * 0.42 + t * 0.55) * 1.00;
    h += sin(dot(p, vec2( 0.72, -0.65)) * 0.63 + t * 0.78) * 0.55;
    h += sin(dot(p, vec2(-0.35,  0.92)) * 0.95 + t * 1.05) * 0.28;
    h += sin(dot(p, vec2( 0.90,  0.42)) * 1.85 + t * 1.60) * 0.12;
    return h;
  }

  float displace(vec2 p) {
    float h = swell(p, uTime);
    float d = distance(p, uPointer);
    h += exp(-(d * d) / 9.0) * uPointerStrength * 1.7;
    return h * uRise * uFlatten;
  }

  float fadeFor(vec2 p) {
    // Dissolve into the background at the far edge (top of the hero) and at
    // the left/right limits, so the plane never shows a hard boundary.
    float depth = 1.0 - smoothstep(3.0, 14.0, p.y);
    float edge  = 1.0 - smoothstep(13.0, 22.0, abs(p.x));
    return depth * edge;
  }
`;

const POINT_VERT = `
  ${WAVE_CHUNK}
  uniform float uDpr;

  void main() {
    vec2 p = position.xy;
    float h = displace(p);
    vH = h;
    vFade = fadeFor(p);

    vec4 mv = modelViewMatrix * vec4(position.x, position.y, h, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.5 + clamp(h, 0.0, 2.5) * 2.1) * uDpr * (26.0 / -mv.z);
  }
`;

const POINT_FRAG = `
  uniform vec3  uColorA;
  uniform vec3  uColorB;
  uniform vec3  uColorC;
  uniform float uOpacity;

  varying float vH;
  varying float vFade;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.1, d);

    float t = clamp(vH * 0.5 + 0.5, 0.0, 1.0);
    vec3 col = t < 0.5
      ? mix(uColorA, uColorB, t * 2.0)
      : mix(uColorB, uColorC, (t - 0.5) * 2.0);

    // Crests glow, troughs recede.
    float lift = 0.35 + 0.65 * t;
    gl_FragColor = vec4(col, soft * vFade * lift * uOpacity);
  }
`;

const LINE_VERT = `
  ${WAVE_CHUNK}

  void main() {
    vec2 p = position.xy;
    float h = displace(p);
    vH = h;
    vFade = fadeFor(p);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, h, 1.0);
  }
`;

const LINE_FRAG = `
  uniform vec3  uColorB;
  uniform vec3  uColorC;
  uniform float uOpacity;

  varying float vH;
  varying float vFade;

  void main() {
    float t = clamp(vH * 0.5 + 0.5, 0.0, 1.0);
    vec3 col = mix(uColorB, uColorC, t);
    gl_FragColor = vec4(col, vFade * (0.10 + 0.22 * t) * uOpacity);
  }
`;

/** Reads an `--accent-n` token ("0 102 162") into a linear Color. */
function readAccent(styles: CSSStyleDeclaration, name: string, fallback: string) {
  const raw = styles.getPropertyValue(name).trim();
  const parts = raw.split(/[\s,]+/).map(Number);
  if (parts.length >= 3 && parts.every((n) => Number.isFinite(n))) {
    return new Color(parts[0] / 255, parts[1] / 255, parts[2] / 255);
  }
  return new Color(fallback);
}

export default function WaveField({ reduced = false }: { reduced?: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    const renderer = new WebGLRenderer({ alpha: true, antialias: !isMobile, powerPreference: "high-performance" });
    renderer.setClearAlpha(0);
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    renderer.setPixelRatio(dpr);
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
    host.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(52, 1, 0.1, 120);
    const CAM_Y = 4.2;
    camera.position.set(0, CAM_Y, 11);
    camera.lookAt(0, -0.6, -2);

    // Shared uniform objects — mutating these drives both materials at once.
    const uniforms = {
      uTime: { value: 0 },
      uRise: { value: reduced ? 1 : 0 },
      uFlatten: { value: 1 },
      uPointer: { value: new Vector2(0, -40) },
      uPointerStrength: { value: 0 },
      uDpr: { value: dpr },
      uOpacity: { value: 1 },
      uColorA: { value: new Color("#0066A2") },
      uColorB: { value: new Color("#0EA5E9") },
      uColorC: { value: new Color("#7DD3FC") },
    };

    const pointMat = new ShaderMaterial({
      uniforms,
      vertexShader: POINT_VERT,
      fragmentShader: POINT_FRAG,
      transparent: true,
      depthWrite: false,
    });
    const lineMat = new ShaderMaterial({
      uniforms,
      vertexShader: LINE_VERT,
      fragmentShader: LINE_FRAG,
      transparent: true,
      depthWrite: false,
    });

    const pointGeo = new PlaneGeometry(PLANE_W, PLANE_D, isMobile ? 96 : 168, isMobile ? 56 : 96);
    const points = new Points(pointGeo, pointMat);
    points.rotation.x = -Math.PI / 2;
    scene.add(points);

    const gridSrc = new PlaneGeometry(PLANE_W, PLANE_D, isMobile ? 26 : 44, isMobile ? 16 : 26);
    const gridGeo: BufferGeometry = new WireframeGeometry(gridSrc);
    gridSrc.dispose();
    const grid = new LineSegments(gridGeo, lineMat);
    grid.rotation.x = -Math.PI / 2;
    scene.add(grid);

    /* ---- theme ---- */
    const targetA = new Color();
    const targetB = new Color();
    const targetC = new Color();

    const syncTheme = () => {
      const styles = getComputedStyle(document.documentElement);
      targetA.copy(readAccent(styles, "--accent-1", "#0066A2"));
      targetB.copy(readAccent(styles, "--accent-2", "#0EA5E9"));
      targetC.copy(readAccent(styles, "--accent-3", "#7DD3FC"));

      // Additive light blooms beautifully on a dark ground and washes out on a
      // light one, so the blend mode follows the theme.
      const dark = document.documentElement.classList.contains("dark");
      const blending = dark ? AdditiveBlending : NormalBlending;
      pointMat.blending = blending;
      lineMat.blending = blending;
      pointMat.needsUpdate = true;
      lineMat.needsUpdate = true;
    };
    syncTheme();
    uniforms.uColorA.value.copy(targetA);
    uniforms.uColorB.value.copy(targetB);
    uniforms.uColorC.value.copy(targetC);

    const themeObserver = new MutationObserver(syncTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    /* ---- pointer ---- */
    const raycaster = new Raycaster();
    const mathPlane = new Plane(new Vector3(0, 1, 0), 0);
    const ndc = new Vector2();
    const hit = new Vector3();
    const pointerTarget = new Vector2(0, -40);
    let pointerActive = false;

    const onPointerMove = (e: PointerEvent) => {
      if (isCoarse) return;
      const rect = host.getBoundingClientRect();
      ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(mathPlane, hit)) {
        // World (x, y, z) maps to plane-local (x, -z) once rotated flat.
        pointerTarget.set(hit.x, -hit.z);
        pointerActive = true;
      }
    };
    const onPointerLeave = () => { pointerActive = false; };

    if (!isCoarse && !reduced) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    }

    /* ---- scroll: the swell flattens and the camera dips as the hero exits ---- */
    let scrollProgress = 0;
    const onScroll = () => {
      const h = host.getBoundingClientRect().height || window.innerHeight;
      scrollProgress = Math.min(Math.max(window.scrollY / h, 0), 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---- size ---- */
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    /* ---- loop ---- */
    let raf = 0;
    let running = true;
    let last = performance.now();
    let elapsed = reduced ? 1.6 : 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      elapsed += dt;
      uniforms.uTime.value = elapsed;

      // Rise into place on load rather than snapping to full amplitude.
      uniforms.uRise.value = MathUtils.damp(uniforms.uRise.value, 1, 1.6, dt);

      uniforms.uFlatten.value = 1 - scrollProgress * 0.85;
      camera.position.y = CAM_Y - scrollProgress * 2.6;
      camera.lookAt(0, -0.6, -2);

      const strength = pointerActive ? 1 : 0;
      uniforms.uPointerStrength.value = MathUtils.damp(uniforms.uPointerStrength.value, strength, 4, dt);
      uniforms.uPointer.value.x = MathUtils.damp(uniforms.uPointer.value.x, pointerTarget.x, 6, dt);
      uniforms.uPointer.value.y = MathUtils.damp(uniforms.uPointer.value.y, pointerTarget.y, 6, dt);

      uniforms.uColorA.value.lerp(targetA, 1 - Math.exp(-3 * dt));
      uniforms.uColorB.value.lerp(targetB, 1 - Math.exp(-3 * dt));
      uniforms.uColorC.value.lerp(targetC, 1 - Math.exp(-3 * dt));

      renderer.render(scene, camera);
    };

    if (reduced) {
      // One static frame: the shape, none of the motion.
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(frame);
    }

    /* ---- pause offscreen: the homepage is long, this saves battery ---- */
    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return;
        if (entry.isIntersecting && !running) {
          running = true;
          last = performance.now();
          raf = requestAnimationFrame(frame);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(host);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      pointGeo.dispose();
      gridGeo.dispose();
      pointMat.dispose();
      lineMat.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
  }, [reduced]);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden />;
}
