import React, { useEffect, useRef } from "react";
import { Play } from "lucide-react";

interface SplashViewProps {
  onEnter: () => void;
}

export const SplashView: React.FC<SplashViewProps> = ({ onEnter }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(120, Math.floor(window.innerWidth / 10));
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.2 + 0.5,
          speedX: Math.random() * 0.4 - 0.2,
          speedY: Math.random() * -0.5 - 0.1,
          opacity: Math.random() * 0.6,
          color: Math.random() > 0.55 ? "#d32f2f" : "#ffd700",
        });
      }
    };

    const animateOutput = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animateOutput);
    };

    window.addEventListener("resize", resize);
    resize();
    initParticles();
    animateOutput();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-background text-on-background select-none"
      style={{
        background: "radial-gradient(circle at center, #2c1b1a 0%, #1e0f0e 80%)"
      }}
    >
      {/* Decorative Atmosphere Water Sleeve / Silk Flow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute top-[-25%] left-[-15%] w-[130%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(211,47,47,0.15)_0%,transparent_60%)] animate-pulse" />
      </div>

      {/* Floating Gold/Crimson Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[2] pointer-events-none" />

      {/* Main Branding Central Logo */}
      <main className="relative z-10 flex flex-col items-center gap-12 max-w-xl text-center px-6">
        <div className="relative group cursor-default">
          <div className="absolute -inset-16 bg-primary/10 blur-[80px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <h1 className="font-display text-[96px] md:text-[144px] leading-none gold-shimmer glow-pulse tracking-[0.25em] pl-[0.25em] select-none text-white select-none">
            戏游
          </h1>

          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="h-[1px] w-14 bg-gradient-to-r from-transparent via-outline/40 to-transparent" />
            <p className="font-space text-xs text-primary font-medium tracking-[0.4em] uppercase pl-[0.4em]">
              OPERA JOURNEY
            </p>
            <span className="h-[1px] w-14 bg-gradient-to-r from-transparent via-outline/40 to-transparent" />
          </div>
        </div>

        {/* Enter Stage Action Button */}
        <div className="mt-8 transition-transform duration-300">
          <button
            onClick={onEnter}
            id="enterButton"
            className="relative group px-14 py-4.5 overflow-hidden rounded-full border border-outline-variant/30 backdrop-blur-xl bg-white/5 active:scale-95 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(211,47,47,0.2)] md:shadow-md cursor-pointer pointer-events-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-tertiary/15 to-primary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <span className="relative z-10 font-space text-xs font-semibold text-primary uppercase tracking-[0.3em] pl-[0.3em] flex items-center justify-center gap-3">
              <Play className="w-4 h-4 fill-primary text-primary" />
              入 场
            </span>

            {/* Glowing Halo */}
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(211,47,47,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </div>
      </main>

      {/* Footer Cultural Signature */}
      <footer className="absolute bottom-10 w-full flex flex-col items-center gap-2 z-10 opacity-70">
        <div className="flex items-center gap-3">
          <span className="h-[1px] w-10 bg-outline/20" />
          <p className="font-space text-[10px] text-on-surface-variant font-medium tracking-[0.25em] pl-[0.25em] uppercase flex items-center gap-1.5 grayscale hover:grayscale-0 transition-all">
            岭南人工智能驱动
          </p>
          <span className="h-[1px] w-10 bg-outline/20" />
        </div>
        <p className="font-sans text-[10px] text-outline/40 tracking-[0.1em]">
          © 2224 新岭南美学实验室 • THE DIGITAL RED BOAT
        </p>
      </footer>
    </div>
  );
};
