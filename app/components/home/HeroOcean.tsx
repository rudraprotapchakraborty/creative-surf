"use client";

/**
 * The hero ocean.
 *
 * A shaded Gerstner sea rather than a sine-displaced grid: Gerstner waves move
 * vertices horizontally as well as vertically, which is what gives real water
 * its sharp crests and wide troughs. Because the displacement is analytic we
 * get exact normals for free in the same loop — no normal map, no derivative
 * hacks — and those normals drive everything the surface does: Fresnel sky
 * reflection, a specular sun track, foam where the wave is about to break, and
 * spray that rides the crests.
 *
 * Raw three.js (not react-three-fiber: @react-three/fiber@9 needs React 19 and
 * this app is on 18). One shared uniform block feeds the surface, the wireframe
 * and the spray so the three layers can never drift out of phase.
 */

import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  LineSegments,
  MathUtils,
  Mesh,
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

/** Ocean extents in world units. x is across the view, z runs to the horizon. */
const OCEAN_W = 120;
const OCEAN_D = 90;

/**
 * Shared GLSL: the wave field itself.
 *
 * Six Gerstner waves at descending wavelength and amplitude — the long ones
 * carry the swell, the short ones the chop. `gerstner()` returns the offset and
 * accumulates both the normal and a "crest sharpness" term (the Jacobian), which
 * is what tells the fragment shader where water would actually foam.
 */
const WAVE_CHUNK = /* glsl */ `
  uniform float uTime;
  uniform float uRise;        // 0→1 entrance
  uniform float uChop;        // scroll flattens the sea
  uniform vec2  uPointer;     // pointer position in ocean space
  uniform float uPointerAmp;
  uniform float uImpactTime;  // seconds since the last click
  uniform vec2  uImpactPos;

  // direction.xy, amplitude, wavelength, speed, steepness
  const int WAVE_COUNT = 6;
  const vec3 W_DIR[6] = vec3[6](
    vec3( 1.00,  0.00, 0.0), vec3( 0.76,  0.65, 0.0), vec3(-0.42,  0.91, 0.0),
    vec3( 0.30, -0.95, 0.0), vec3(-0.88, -0.47, 0.0), vec3( 0.61,  0.79, 0.0)
  );
  const float W_AMP[6]  = float[6](1.55, 0.95, 0.52, 0.30, 0.17, 0.09);
  const float W_LEN[6]  = float[6](42.0, 24.0, 14.0,  8.5,  5.0,  3.0);
  const float W_SPD[6]  = float[6]( 0.55, 0.78, 1.05, 1.45, 1.95, 2.60);
  const float W_STP[6]  = float[6]( 0.72, 0.62, 0.52, 0.42, 0.32, 0.24);

  struct Surface {
    vec3  offset;     // xz horizontal pinch + y height
    vec3  normal;
    float crest;      // 0 = flat, 1 = about to break
  };

  Surface oceanAt(vec2 p) {
    Surface s;
    s.offset = vec3(0.0);
    float nx = 0.0, nz = 0.0, ny = 1.0;
    float crest = 0.0;

    for (int i = 0; i < WAVE_COUNT; i++) {
      vec2  d = normalize(W_DIR[i].xy);
      float w = 6.28318 / W_LEN[i];
      float a = W_AMP[i] * uRise * uChop;
      float q = W_STP[i] / (w * a * float(WAVE_COUNT) + 1e-4);

      float phase = w * dot(d, p) + uTime * W_SPD[i];
      float c = cos(phase);
      float sn = sin(phase);

      s.offset.xz += q * a * d * c;
      s.offset.y  += a * sn;

      float wa = w * a;
      nx    += d.x * wa * c;
      nz    += d.y * wa * c;
      ny    -= q * wa * sn;
      crest += q * wa * sn;
    }

    // Pointer wake: a soft dome that follows the cursor across the water.
    float pd = distance(p, uPointer);
    float dome = exp(-(pd * pd) / 240.0) * uPointerAmp;
    s.offset.y += dome * 2.4;

    // Click impact: a ring that expands and decays, like something dropped in.
    float t = uImpactTime;
    if (t < 4.0) {
      float rd = distance(p, uImpactPos);
      float ring = sin(rd * 0.55 - t * 7.0) * exp(-rd * 0.05) * exp(-t * 1.1);
      s.offset.y += ring * 1.9;
      crest += abs(ring) * 0.35;
    }

    s.normal = normalize(vec3(-nx, ny, -nz));
    s.crest = clamp(crest, 0.0, 1.0);
    return s;
  }

  /* Dissolve the sheet at the horizon and the side walls so the mesh never
     shows an edge — the sea should end in haze, not in geometry. */
  float horizonFade(vec2 p) {
    float far  = 1.0 - smoothstep(10.0, 44.0, p.y);
    float side = 1.0 - smoothstep(26.0, 54.0, abs(p.x));
    return far * side;
  }
`;

const SURFACE_VERT = /* glsl */ `
  ${WAVE_CHUNK}

  varying vec3  vWorld;
  varying vec3  vNormal;
  varying float vCrest;
  varying float vFade;
  varying vec2  vOcean;

  void main() {
    vec2 p = position.xy;
    Surface s = oceanAt(p);

    vec3 world = vec3(p.x + s.offset.x, s.offset.y, p.y + s.offset.z);

    vWorld  = world;
    vNormal = s.normal;
    vCrest  = s.crest;
    vFade   = horizonFade(p);
    vOcean  = p;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(world, 1.0);
  }
`;

const SURFACE_FRAG = /* glsl */ `
  precision highp float;

  uniform vec3  uDeep;
  uniform vec3  uShallow;
  uniform vec3  uSky;
  uniform vec3  uFoam;
  uniform vec3  uSun;
  uniform vec3  uFog;
  uniform vec3  uCamera;
  uniform vec3  uSunDir;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uGlint;

  varying vec3  vWorld;
  varying vec3  vNormal;
  varying float vCrest;
  varying float vFade;
  varying vec2  vOcean;

  /* Cheap value-noise FBM — used only to break up the foam edge so crests
     don't read as a clean mathematical band. */
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1,0)), u.x),
               mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(uCamera - vWorld);

    // Schlick Fresnel: water is nearly a mirror at grazing angles and nearly
    // clear straight down, which is most of what sells it as a liquid.
    float fres = 0.02 + 0.98 * pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 5.0);

    // Body colour: deep in the troughs, shallow on the lifted faces.
    float lift = clamp(vWorld.y * 0.22 + 0.5, 0.0, 1.0);
    vec3 body = mix(uDeep, uShallow, lift);

    // Sky reflection, approximated by how far up the reflected ray points.
    vec3 R = reflect(-V, N);
    vec3 sky = mix(uShallow, uSky, clamp(R.y * 0.5 + 0.5, 0.0, 1.0));
    vec3 col = mix(body, sky, fres * 0.82);

    // Sun: a tight specular for the glint plus a wide sheen down the track.
    vec3 H = normalize(uSunDir + V);
    float spec = pow(max(dot(N, H), 0.0), 420.0);
    float sheen = pow(max(dot(N, H), 0.0), 26.0);
    col += uSun * (spec * 2.4 + sheen * 0.16) * uGlint;

    // Foam where the wave steepens, softened by noise and trailing down the
    // back of the crest rather than ringing it evenly.
    float grain = fbm(vOcean * 0.75 + uTime * 0.06);
    float foam = smoothstep(0.42, 0.92, vCrest * (0.65 + grain * 0.7));
    foam += smoothstep(0.86, 1.0, vCrest) * 0.5;
    col = mix(col, uFoam, clamp(foam, 0.0, 1.0) * 0.85);

    // Distance haze into the page background, so the sea has no visible end.
    float haze = smoothstep(6.0, 40.0, vOcean.y);
    col = mix(col, uFog, haze * 0.9);

    gl_FragColor = vec4(col, vFade * uOpacity);
  }
`;

/** The wireframe skim — a faint data grid riding the same surface. */
const GRID_VERT = /* glsl */ `
  ${WAVE_CHUNK}
  varying float vFade;
  varying float vCrest;

  void main() {
    vec2 p = position.xy;
    Surface s = oceanAt(p);
    vFade  = horizonFade(p);
    vCrest = s.crest;
    vec3 world = vec3(p.x + s.offset.x, s.offset.y + 0.06, p.y + s.offset.z);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(world, 1.0);
  }
`;

const GRID_FRAG = /* glsl */ `
  uniform vec3  uSky;
  uniform float uOpacity;
  varying float vFade;
  varying float vCrest;

  void main() {
    gl_FragColor = vec4(uSky, vFade * (0.05 + vCrest * 0.20) * uOpacity);
  }
`;

/** Spray: points that ride the crests and only light up where water breaks. */
const SPRAY_VERT = /* glsl */ `
  ${WAVE_CHUNK}
  uniform float uDpr;
  attribute float aSeed;
  varying float vAlpha;

  void main() {
    vec2 p = position.xy;
    Surface s = oceanAt(p);

    // Lift each mote on its own little arc above the crest it belongs to.
    float bob = fract(aSeed + uTime * (0.07 + aSeed * 0.06));
    float lift = bob * 3.4;
    vec3 world = vec3(p.x + s.offset.x, s.offset.y + 0.2 + lift, p.y + s.offset.z);

    // Only foaming water throws spray, and the mote fades as it rises.
    vAlpha = smoothstep(0.35, 0.95, s.crest) * (1.0 - bob) * horizonFade(p);

    vec4 mv = modelViewMatrix * vec4(world, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.0 + aSeed * 2.4) * uDpr * (40.0 / max(-mv.z, 1.0));
  }
`;

const SPRAY_FRAG = /* glsl */ `
  uniform vec3  uFoam;
  uniform float uOpacity;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uFoam, soft * vAlpha * 0.75 * uOpacity);
  }
`;

/** Reads an `--accent-n` CSS token ("0 102 162") into a three Color. */
function readToken(styles: CSSStyleDeclaration, name: string, fallback: string) {
  const raw = styles.getPropertyValue(name).trim();
  const parts = raw.split(/[\s,]+/).map(Number);
  if (parts.length >= 3 && parts.every(Number.isFinite)) {
    return new Color(parts[0] / 255, parts[1] / 255, parts[2] / 255);
  }
  return new Color(fallback);
}

export default function HeroOcean({ reduced = false }: { reduced?: boolean }) {
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
    const camera = new PerspectiveCamera(50, 1, 0.1, 400);
    const CAM = new Vector3(0, 6.4, 26);
    camera.position.copy(CAM);
    camera.lookAt(0, 0.4, -14);

    /* ---- one uniform block, three materials ---- */
    const uniforms = {
      uTime: { value: 0 },
      uRise: { value: reduced ? 1 : 0 },
      uChop: { value: 1 },
      uPointer: { value: new Vector2(0, -400) },
      uPointerAmp: { value: 0 },
      uImpactTime: { value: 99 },
      uImpactPos: { value: new Vector2(0, 0) },
      uDpr: { value: dpr },
      uOpacity: { value: 1 },
      uGlint: { value: 1 },
      uCamera: { value: new Vector3().copy(CAM) },
      uSunDir: { value: new Vector3(-0.35, 0.62, 0.7).normalize() },
      uDeep: { value: new Color("#0b3c66") },
      uShallow: { value: new Color("#2f9bf0") },
      uSky: { value: new Color("#eaf6ff") },
      uFoam: { value: new Color("#ffffff") },
      uSun: { value: new Color("#ffffff") },
      uFog: { value: new Color("#f4fbff") },
    };

    const surfaceMat = new ShaderMaterial({
      uniforms,
      vertexShader: SURFACE_VERT,
      fragmentShader: SURFACE_FRAG,
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
    });
    const gridMat = new ShaderMaterial({
      uniforms,
      vertexShader: GRID_VERT,
      fragmentShader: GRID_FRAG,
      transparent: true,
      depthWrite: false,
    });
    const sprayMat = new ShaderMaterial({
      uniforms,
      vertexShader: SPRAY_VERT,
      fragmentShader: SPRAY_FRAG,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });

    /* ---- geometry ---- */
    const surfaceGeo = new PlaneGeometry(OCEAN_W, OCEAN_D, isMobile ? 150 : 300, isMobile ? 110 : 220);
    const surface = new Mesh(surfaceGeo, surfaceMat);
    scene.add(surface);

    const gridSrc = new PlaneGeometry(OCEAN_W, OCEAN_D, isMobile ? 34 : 58, isMobile ? 24 : 40);
    const gridGeo: BufferGeometry = new WireframeGeometry(gridSrc);
    gridSrc.dispose();
    const grid = new LineSegments(gridGeo, gridMat);
    scene.add(grid);

    // Spray motes are scattered over the near half of the sheet, where crests
    // are large enough on screen for the effect to read.
    const SPRAY = isMobile ? 900 : 2600;
    const sprayGeo = new BufferGeometry();
    const sprayPos = new Float32Array(SPRAY * 3);
    const spraySeed = new Float32Array(SPRAY);
    for (let i = 0; i < SPRAY; i++) {
      sprayPos[i * 3] = (Math.random() - 0.5) * OCEAN_W * 0.8;
      sprayPos[i * 3 + 1] = (Math.random() - 0.5) * OCEAN_D * 0.55 - 6;
      sprayPos[i * 3 + 2] = 0;
      spraySeed[i] = Math.random();
    }
    sprayGeo.setAttribute("position", new BufferAttribute(sprayPos, 3));
    sprayGeo.setAttribute("aSeed", new BufferAttribute(spraySeed, 1));
    const spray = new Points(sprayGeo, sprayMat);
    scene.add(spray);

    /* ---- theme: the sea re-tunes itself when the site flips light/dark ---- */
    const tDeep = new Color();
    const tShallow = new Color();
    const tSky = new Color();
    const tFoam = new Color();
    const tFog = new Color();

    const syncTheme = () => {
      const styles = getComputedStyle(document.documentElement);
      const dark = document.documentElement.classList.contains("dark");
      const a1 = readToken(styles, "--accent-1", "#0066A2");
      const a2 = readToken(styles, "--accent-2", "#0EA5E9");
      const a3 = readToken(styles, "--accent-3", "#7DD3FC");

      if (dark) {
        tDeep.set("#02101f");
        tShallow.copy(a1).multiplyScalar(0.5);
        tSky.copy(a3).multiplyScalar(0.42);
        tFoam.copy(a3);
        tFog.set("#061528");
        uniforms.uSun.value.copy(a3);
        uniforms.uGlint.value = 1.35;
      } else {
        tDeep.copy(a1).multiplyScalar(0.62);
        tShallow.copy(a2);
        tSky.set("#eaf6ff");
        tFoam.set("#ffffff");
        tFog.set("#f4fbff");
        uniforms.uSun.value.set("#ffffff");
        uniforms.uGlint.value = 1;
      }
    };
    syncTheme();
    uniforms.uDeep.value.copy(tDeep);
    uniforms.uShallow.value.copy(tShallow);
    uniforms.uSky.value.copy(tSky);
    uniforms.uFoam.value.copy(tFoam);
    uniforms.uFog.value.copy(tFog);

    const themeObserver = new MutationObserver(syncTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    /* ---- pointer: cursor drags a swell, click drops a ring ---- */
    const raycaster = new Raycaster();
    const mathPlane = new Plane(new Vector3(0, 1, 0), 0);
    const ndc = new Vector2();
    const hit = new Vector3();
    const pointerTarget = new Vector2(0, -400);
    const parallax = new Vector2(0, 0);
    const parallaxTarget = new Vector2(0, 0);
    let pointerActive = false;
    let impactAt = -99;

    const toOcean = (clientX: number, clientY: number) => {
      const rect = host.getBoundingClientRect();
      ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
      parallaxTarget.set(ndc.x, ndc.y);
      raycaster.setFromCamera(ndc, camera);
      return raycaster.ray.intersectPlane(mathPlane, hit) ? hit : null;
    };

    const onPointerMove = (e: PointerEvent) => {
      const p = toOcean(e.clientX, e.clientY);
      if (!p) return;
      // World (x, y, z) maps back to the sheet's own (x, z) coordinates.
      pointerTarget.set(p.x, p.z);
      pointerActive = true;
    };
    const onPointerLeave = () => { pointerActive = false; };
    const onPointerDown = (e: PointerEvent) => {
      const p = toOcean(e.clientX, e.clientY);
      if (!p) return;
      uniforms.uImpactPos.value.set(p.x, p.z);
      impactAt = performance.now() / 1000;
    };

    if (!reduced) {
      if (!isCoarse) {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("pointerleave", onPointerLeave, { passive: true });
      }
      window.addEventListener("pointerdown", onPointerDown, { passive: true });
    }

    /* ---- scroll: the sea flattens and the camera dips as the hero leaves ----
       Scroll *velocity* also warps wave time, so flicking the page makes the
       water surge — the motion answers the reader, not just the clock. */
    let scrollProgress = 0;
    let scrollVel = 0;
    let lastScroll = window.scrollY;
    const onScroll = () => {
      const h = host.getBoundingClientRect().height || window.innerHeight;
      scrollProgress = Math.min(Math.max(window.scrollY / h, 0), 1);
      scrollVel += Math.abs(window.scrollY - lastScroll) * 0.0016;
      scrollVel = Math.min(scrollVel, 1.8);
      lastScroll = window.scrollY;
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
    let elapsed = reduced ? 3 : 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      scrollVel = MathUtils.damp(scrollVel, 0, 2.2, dt);
      elapsed += dt * (1 + scrollVel);
      uniforms.uTime.value = elapsed;
      uniforms.uImpactTime.value = now / 1000 - impactAt;

      uniforms.uRise.value = MathUtils.damp(uniforms.uRise.value, 1, 1.1, dt);
      uniforms.uChop.value = 1 - scrollProgress * 0.7;
      uniforms.uPointerAmp.value = MathUtils.damp(uniforms.uPointerAmp.value, pointerActive ? 1 : 0, 3.2, dt);
      uniforms.uPointer.value.x = MathUtils.damp(uniforms.uPointer.value.x, pointerTarget.x, 5, dt);
      uniforms.uPointer.value.y = MathUtils.damp(uniforms.uPointer.value.y, pointerTarget.y, 5, dt);

      // Camera: scroll dolly plus a light cursor parallax, so the horizon
      // shifts against the headline as the reader moves.
      parallax.x = MathUtils.damp(parallax.x, parallaxTarget.x, 2.5, dt);
      parallax.y = MathUtils.damp(parallax.y, parallaxTarget.y, 2.5, dt);
      camera.position.set(
        CAM.x + parallax.x * 2.2,
        CAM.y - scrollProgress * 3.4 + parallax.y * 0.9,
        CAM.z - scrollProgress * 3.0
      );
      camera.lookAt(parallax.x * 1.2, 0.4 - parallax.y * 0.5, -14);
      uniforms.uCamera.value.copy(camera.position);

      uniforms.uDeep.value.lerp(tDeep, 1 - Math.exp(-3 * dt));
      uniforms.uShallow.value.lerp(tShallow, 1 - Math.exp(-3 * dt));
      uniforms.uSky.value.lerp(tSky, 1 - Math.exp(-3 * dt));
      uniforms.uFoam.value.lerp(tFoam, 1 - Math.exp(-3 * dt));
      uniforms.uFog.value.lerp(tFog, 1 - Math.exp(-3 * dt));

      renderer.render(scene, camera);
    };

    if (reduced) {
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(frame);
    }

    /* ---- pause offscreen — the homepage is long, this saves battery ---- */
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
      window.removeEventListener("pointerdown", onPointerDown);
      surfaceGeo.dispose();
      gridGeo.dispose();
      sprayGeo.dispose();
      surfaceMat.dispose();
      gridMat.dispose();
      sprayMat.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
  }, [reduced]);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden />;
}
