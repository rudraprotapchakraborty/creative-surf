"use client";

import { useEffect, useRef } from 'react';

const colors = [
  "#0066A2", 
  "#7DD3FC", 
  "#F5B041", 
  "#E74C3C", 
  "#8E44AD",
  "#16A085"
];

export default function MouseParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;
    
    // Track the target destination (mouse) and current interpolated center
    let targetCenterX = window.innerWidth / 2;
    let targetCenterY = window.innerHeight / 2;
    let currentCenterX = window.innerWidth / 2;
    let currentCenterY = window.innerHeight / 2;
    
    // Track actual mouse independently for repulsion
    let mouseX = -1000;
    let mouseY = -1000;

    class Particle {
      x: number;
      y: number;
      size: number;
      offsetX: number;
      offsetY: number;
      density: number;
      color: string;
      angle: number;
      orbitRadius: number;
      orbitSpeed: number;
      phaseX: number;
      phaseY: number;
      
      constructor(startX: number, startY: number) {
        // Size of the custom cursor ring
        const maxRadius = 450; 
        const minRadius = 350; 
        
        // Random point uniformly distributed inside an annulus (ring), with some scattered outliers
        let r;
        if (Math.random() < 0.7) {
            // 70% form the main structured ring
            r = Math.sqrt(Math.random() * (maxRadius * maxRadius - minRadius * minRadius) + minRadius * minRadius);
        } else {
            // 30% are scattered outliers (filling the inside or extending far outside)
            r = Math.random() * (maxRadius * 1.3);
        }
        
        const theta = Math.random() * 2 * Math.PI;

        this.offsetX = r * Math.cos(theta);
        this.offsetY = r * Math.sin(theta);
        
        this.x = startX + this.offsetX;
        this.y = startY + this.offsetY;
        
        this.density = (Math.random() * 30) + 1;
        this.size = Math.random() * 1.5 + 0.5; // Very small: 0.5px to 2.0px
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Circular localized drift
        this.angle = Math.random() * Math.PI * 2;
        this.orbitRadius = Math.random() * 15 + 2;
        this.orbitSpeed = (Math.random() - 0.5) * 0.05;
        
        // Organic elliptical phase
        this.phaseX = Math.random() * Math.PI * 2;
        this.phaseY = Math.random() * Math.PI * 2;
      }

      draw(time: number) {
        if (!ctx) return;
        
        // Organic pulsing shape
        const rx = Math.max(0.1, this.size + Math.sin(time * 2 + this.phaseX) * (this.size * 0.6));
        const ry = Math.max(0.1, this.size + Math.cos(time * 2 + this.phaseY) * (this.size * 0.6));
        const rotation = time * 0.5 + this.phaseX;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, rx, ry, rotation, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update(centerX: number, centerY: number, breatheScale: number, msX: number, msY: number) {
        // Localized "bacteria-like" organic swimming/drifting
        this.angle += this.orbitSpeed;
        
        // Complex overlapping waves for X and Y creates unpredictable, smooth wandering
        const swimX = Math.cos(this.angle) * this.orbitRadius + Math.sin(this.angle * 1.3 + this.phaseX) * (this.orbitRadius * 1.5);
        const swimY = Math.sin(this.angle) * this.orbitRadius + Math.cos(this.angle * 0.8 + this.phaseY) * (this.orbitRadius * 1.5);
        
        const targetX = centerX + (this.offsetX * breatheScale) + swimX;
        const targetY = centerY + (this.offsetY * breatheScale) + swimY;

        // Repel from actual mouse
        let dx = msX - this.x;
        let dy = msY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        // The repulsion radius is large (400) to push against the inner wall of the ring
        const repulsionRadius = 400; 
        if (distance < repulsionRadius) {
          let force = (repulsionRadius - distance) / repulsionRadius;
          this.x -= (dx / distance) * force * this.density * 1.5;
          this.y -= (dy / distance) * force * this.density * 1.5;
        }

        // Smoothly follow the target destination with a faster snap
        this.x += (targetX - this.x) * (0.15 + Math.random() * 0.1);
        this.y += (targetY - this.y) * (0.15 + Math.random() * 0.1);
      }
    }

    const init = () => {
      particlesArray = [];
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      
      targetCenterX = width / 2;
      targetCenterY = height / 2;
      currentCenterX = width / 2;
      currentCenterY = height / 2;
      
      // Increased number of particles to compensate for smaller size, acting like a fine mist
      const numParticles = 200;

      for (let i = 0; i < numParticles; i++) {
        particlesArray.push(new Particle(currentCenterX, currentCenterY));
      }
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate organic breathing scale based on time completely independently of mouse
      const t = time * 0.001; 
      const breatheScale = 1 + Math.sin(t * 1.5) * 0.12; // breathes ±12% back and forth

      // Global organic drift for the entire ring container
      // This ensures the whole "cell" wanders around smoothly like bacteria even if the mouse is perfectly still
      const globalDriftX = Math.sin(t * 0.5) * 80 + Math.cos(t * 0.3) * 40;
      const globalDriftY = Math.cos(t * 0.4) * 80 + Math.sin(t * 0.2) * 40;

      const finalTargetX = targetCenterX + globalDriftX;
      const finalTargetY = targetCenterY + globalDriftY;

      // Slower, heavily-weighted interpolation so the ring feels "pulled" sluggishly
      currentCenterX += (finalTargetX - currentCenterX) * 0.05;
      currentCenterY += (finalTargetY - currentCenterY) * 0.05;

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw(t);
        particlesArray[i].update(currentCenterX, currentCenterY, breatheScale, mouseX, mouseY);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mX = e.clientX - rect.left;
      const mY = e.clientY - rect.top;
      mouseX = mX;
      mouseY = mY;
      
      // Magnetic pull: The ring stays anchored to the center but gets "pulled" by the mouse (20% distance)
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      targetCenterX = centerX + (mX - centerX) * 0.2;
      targetCenterY = centerY + (mY - centerY) * 0.2;
    };

    const handleMouseLeave = () => {
      // Gently return to the center of the screen when mouse leaves
      targetCenterX = canvas.width / 2;
      targetCenterY = canvas.height / 2;
      mouseX = -1000;
      mouseY = -1000;
    };

    // Initialize dimensions and particles
    init();
    animationFrameId = requestAnimationFrame(animate);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}
