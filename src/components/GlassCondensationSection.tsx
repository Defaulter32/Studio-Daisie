import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, RefreshCw, Eye, Sliders, Droplets } from 'lucide-react';
import { StudioImage } from './StudioImage';

export const GlassCondensationSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isWiping, setIsWiping] = useState(false);
  const [mistDensity, setMistDensity] = useState(0.85); // 0.5 to 1.0
  const [showClearWindow, setShowClearWindow] = useState(true);

  // Parallax offsets
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });
  const isTouchRef = useRef(false);

  // Draw real physical wet condensation onto canvas
  const drawGlassCondensation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // 1. Heavy Translucent Fog Base (milky diffuse light reflection)
    const fogGradient = ctx.createRadialGradient(
      width * 0.45,
      height * 0.4,
      width * 0.1,
      width * 0.5,
      height * 0.5,
      width * 0.8
    );
    fogGradient.addColorStop(0, `rgba(235, 230, 222, ${0.45 * mistDensity})`);
    fogGradient.addColorStop(0.5, `rgba(220, 215, 205, ${0.72 * mistDensity})`);
    fogGradient.addColorStop(1, `rgba(195, 188, 178, ${0.88 * mistDensity})`);

    ctx.fillStyle = fogGradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Organic Clear Window (like someone wiped a section or condensation cleared in center)
    if (showClearWindow) {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      
      // Organic wipe path inspired by Photoshop tutorial reference
      ctx.beginPath();
      const cx = width * 0.52;
      const cy = height * 0.46;
      const rx = width * 0.32;
      const ry = height * 0.36;

      // Create organic curved perimeter
      ctx.ellipse(cx, cy, rx, ry, -0.08, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.82)';
      ctx.filter = 'blur(28px)';
      ctx.fill();

      // Second soft organic clearing lobe
      ctx.beginPath();
      ctx.ellipse(cx - 30, cy + 40, rx * 0.75, ry * 0.65, 0.15, 0, Math.PI * 2);
      ctx.filter = 'blur(36px)';
      ctx.fill();

      ctx.restore();
    }

    // 3. Fine Condensation Grain & Micro-Droplets (Procedural stippling)
    ctx.save();
    const dropletCount = Math.floor(1800 * mistDensity);
    for (let i = 0; i < dropletCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 2.2 + 0.5;

      // Soft white droplet highlight
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.55 + 0.25})`;
      ctx.fill();

      // Tiny shadow edge for 3D physical refraction
      if (r > 1.6) {
        ctx.beginPath();
        ctx.arc(x + 0.6, y + 0.6, r * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(40, 35, 30, 0.15)';
        ctx.fill();
      }
    }
    ctx.restore();

    // 4. Distinct Medium Water Beads & Rain Droplets
    ctx.save();
    const beadCount = 60;
    for (let j = 0; j < beadCount; j++) {
      const bx = (j * 47) % width + (Math.sin(j * 3.2) * 40);
      const by = (j * 71) % height + (Math.cos(j * 2.1) * 30);
      const br = (Math.sin(j) * 3 + 4.5);

      // Droplet body
      ctx.beginPath();
      ctx.ellipse(bx, by, br, br * 1.25, 0.1, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fill();

      // Specular highlight
      ctx.beginPath();
      ctx.arc(bx - br * 0.35, by - br * 0.4, br * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fill();

      // Lower refracted shadow rim
      ctx.beginPath();
      ctx.ellipse(bx, by + br * 0.5, br * 0.7, br * 0.4, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(20, 20, 20, 0.25)';
      ctx.fill();
    }
    ctx.restore();

    // 5. Vertical Downward Water Streaks / Drips (Running moisture)
    ctx.save();
    const streakPositions = [0.18, 0.32, 0.48, 0.68, 0.82, 0.91];
    streakPositions.forEach((posRatio, index) => {
      const sx = width * posRatio;
      const streakLength = height * (0.35 + (index % 3) * 0.2);
      const startY = (index * 60) % (height * 0.4);

      // Vertical clear channel carved into condensation
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.moveTo(sx, startY);
      ctx.bezierCurveTo(
        sx + 3, startY + streakLength * 0.3,
        sx - 2, startY + streakLength * 0.7,
        sx + 1, startY + streakLength
      );
      ctx.lineWidth = 3.5 + (index % 3);
      ctx.lineCap = 'round';
      ctx.filter = 'blur(4px)';
      ctx.stroke();

      // Droplet bead at bottom of streak
      ctx.globalCompositeOperation = 'source-over';
      ctx.beginPath();
      ctx.ellipse(sx + 1, startY + streakLength, 3.5, 5, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(sx, startY + streakLength - 1.5, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
    });
    ctx.restore();

  }, [mistDensity, showClearWindow]);

  // Handle canvas resize & initial paint
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      drawGlassCondensation();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [drawGlassCondensation]);

  // Interactive Cursor Wipe Functionality
  const handleWipe = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.filter = 'blur(18px)';
    ctx.beginPath();
    ctx.arc(x, y, 48 * dpr, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const onMouseMoveCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isWiping || e.buttons === 1) {
      handleWipe(e.clientX, e.clientY);
    }
  };

  const onTouchMoveCanvas = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      handleWipe(touch.clientX, touch.clientY);
    }
  };

  // Parallax physics handling
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      isTouchRef.current = true;
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || isTouchRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };

    const container = containerRef.current;
    if (container) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    let rafId: number;
    const updatePhysics = () => {
      setSmoothMouse((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.05,
        y: prev.y + (mousePos.y - prev.y) * 0.05,
      }));
      rafId = requestAnimationFrame(updatePhysics);
    };

    rafId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [mousePos]);

  // Movement layer offsets based on prompt:
  // - Glass surface: mostly stable (moves 1 - 2px max)
  // - Decorative elements: subtly respond to cursor (15 - 28px)
  // - Underlying photograph: moves ~5-10px in OPPOSITE direction (-6px)
  const decorX = smoothMouse.x * 24;
  const decorY = smoothMouse.y * 20;
  const photoOppositeX = smoothMouse.x * -9;
  const photoOppositeY = smoothMouse.y * -7;
  const glassX = smoothMouse.x * 1.5;
  const glassY = smoothMouse.y * 1.5;

  return (
    <section
      ref={containerRef}
      className="py-24 lg:py-36 px-6 md:px-10 lg:px-16 bg-[#141414] text-[#F9F6F0] relative overflow-hidden"
    >
      {/* Decorative organic glow (Layer: DECORATIVE ELEMENTS) */}
      <div
        className="absolute top-1/4 -left-20 w-80 h-80 rounded-full pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(${decorX}px, ${decorY}px, 0)`,
          background: 'radial-gradient(circle, rgba(220,165,159,0.18) 0%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />
      <div
        className="absolute bottom-10 -right-20 w-96 h-96 rounded-full pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(${-decorX}px, ${-decorY}px, 0)`,
          background: 'radial-gradient(circle, rgba(200,160,130,0.14) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Header Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#DCA59F] text-xs">✦</span>
              <span className="text-xs font-semibold tracking-[0.24em] text-[#E4B5B0] uppercase">
                STUDIO DAISIE / SIGNATURE LOOK
              </span>
            </div>

            {/* Oversized condensed editorial headline */}
            <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] uppercase tracking-[-0.02em] text-[#F9F6F0] leading-[0.88]">
              SEE<br />
              WHAT'S<br />
              BEHIND<br />
              <span className="text-[#DCA59F]">THE GLASS.</span>
            </h2>
          </div>

          <div className="mt-6 md:mt-0 max-w-sm">
            <p className="text-sm md:text-base text-white/80 font-serif italic mb-2">
              “Texture, colour and movement, seen differently.”
            </p>
            <p className="text-xs text-white/60 font-light leading-relaxed mb-4">
              Drag your finger or cursor across the condensed glass to wipe away the moisture mist and reveal the razor-sharp blonde wave structure underneath.
            </p>

            {/* Interactive controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  drawGlassCondensation();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono tracking-wider text-white transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 text-[#DCA59F]" />
                <span>Reset Mist</span>
              </button>

              <button
                onClick={() => {
                  setShowClearWindow(!showClearWindow);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono tracking-wider text-white transition-colors cursor-pointer"
              >
                <Eye className="w-3 h-3 text-[#DCA59F]" />
                <span>{showClearWindow ? 'Full Mist' : 'Organic Opening'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* WET GLASS IMMERSIVE VIEWPORT CONTAINER */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/10] rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.6)] border border-white/15 bg-[#1C1714]">
          {/* LAYER: PHOTOGRAPH (IMG_4238.webp) - Moves opposite mouse by ~5-10px */}
          <div
            className="absolute inset-[-15px] will-change-transform scale-[1.04]"
            style={{
              transform: `translate3d(${photoOppositeX}px, ${photoOppositeY}px, 0)`,
            }}
          >
            <StudioImage
              src="/IMG_4238.webp"
              alt="Studio Daisie Signature Blonde Hair Texture - Macro Wave Flow"
              fallbackType="macro"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* LAYER: SOFT OPTICAL DIFFUSION & DISTORTION UNDER GLASS */}
          <div className="absolute inset-0 backdrop-blur-[2.5px] bg-[#1E1917]/20 pointer-events-none" />

          {/* LAYER: REAL PHYSICAL WET GLASS CONDENSATION (Moves 1-2px) */}
          <div
            className="absolute inset-0 will-change-transform"
            style={{
              transform: `translate3d(${glassX}px, ${glassY}px, 0)`,
            }}
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-crosshair touch-none"
              onMouseMove={onMouseMoveCanvas}
              onMouseDown={() => setIsWiping(true)}
              onMouseUp={() => setIsWiping(false)}
              onTouchMove={onTouchMoveCanvas}
            />

            {/* Vertical flowing water drip line animation overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-[28%] w-[2px] h-36 bg-white/45 rounded-full water-drip blur-[0.5px]" />
              <div className="absolute top-0 left-[55%] w-[1.5px] h-44 bg-white/40 rounded-full water-drip [animation-delay:2.4s] blur-[0.5px]" />
              <div className="absolute top-0 left-[76%] w-[2.5px] h-32 bg-white/50 rounded-full water-drip [animation-delay:4.1s] blur-[0.5px]" />
            </div>

            {/* Soft perimeter condensation fog vignette */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_90px_rgba(235,225,215,0.4)]" />
          </div>

          {/* CRISP TYPOGRAPHY & FLOATING BADGES ABOVE GLASS */}
          <div className="absolute top-6 left-6 md:top-10 md:left-10 z-30 pointer-events-none">
            <div className="bg-[#141414]/75 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 inline-flex items-center gap-2 shadow-lg">
              <Droplets className="w-3.5 h-3.5 text-[#DCA59F]" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-white/90">
                WET GLASS INTERACTION // DRAG TO CLEAR
              </span>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-30 pointer-events-none">
            <div className="bg-[#141414]/75 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-right max-w-xs shadow-lg">
              <span className="text-[10px] tracking-[0.2em] font-semibold uppercase text-[#DCA59F] block mb-1">
                HAIR REFRACTION ARCHIVE
              </span>
              <p className="text-white text-xs font-serif italic">
                “Luminous blonde tones illuminated through filtered moisture.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
