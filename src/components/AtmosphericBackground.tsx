import React, { useEffect, useRef, useState } from 'react';
import { Cloud, Moon, Sun, Wind, Sparkles } from 'lucide-react';

export type WeatherAtmosphere = 'twilight' | 'clear_night' | 'aurora' | 'mist';

export const AtmosphericBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [atmosphere, setAtmosphere] = useState<WeatherAtmosphere>('twilight');
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');

  // Clock for real-time atmosphere detection
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      setCurrentTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );

      // Auto set atmosphere based on realistic local hour
      if (hours >= 5 && hours < 9) {
        setAtmosphere('mist'); // Dawn / Morning mist
      } else if (hours >= 9 && hours < 17) {
        setAtmosphere('aurora'); // Vibrant day / creative energy
      } else if (hours >= 17 && hours < 21) {
        setAtmosphere('twilight'); // Golden-indigo twilight
      } else {
        setAtmosphere('clear_night'); // Obsidian starry night
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Atmospheric particle canvas simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulseSpeed: number;
      hue: number;
    }

    const particleCount = Math.min(width < 768 ? 35 : 70, 90);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.5,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -Math.random() * 0.35 - 0.05,
        opacity: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        hue: Math.random() > 0.6 ? 230 : 260, // Indigo to Violet
      });
    }

    let tick = 0;

    const render = () => {
      tick += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Render atmosphere particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries smoothly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle pulsation
        const dynamicAlpha = Math.sin(tick * 2 + i) * 0.2 + p.opacity;
        const safeAlpha = Math.max(0.05, Math.min(dynamicAlpha, 0.85));

        ctx.fillStyle = `hsla(${p.hue}, 80%, 75%, ${safeAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [atmosphere]);

  // Atmosphere palette mapping
  const getAtmosphereTheme = () => {
    switch (atmosphere) {
      case 'twilight':
        return {
          glow1: 'from-indigo-600/15 via-purple-900/10 to-transparent',
          glow2: 'from-blue-600/10 via-violet-950/15 to-transparent',
          glow3: 'from-amber-500/05 via-rose-950/10 to-transparent',
          badgeText: 'Twilight Atmosphere',
          icon: Moon,
        };
      case 'clear_night':
        return {
          glow1: 'from-blue-900/15 via-indigo-950/20 to-transparent',
          glow2: 'from-cyan-900/10 via-slate-950/20 to-transparent',
          glow3: 'from-purple-950/10 to-transparent',
          badgeText: 'Clear Night Sky',
          icon: Sparkles,
        };
      case 'aurora':
        return {
          glow1: 'from-emerald-600/10 via-teal-900/10 to-transparent',
          glow2: 'from-indigo-600/15 via-blue-900/15 to-transparent',
          glow3: 'from-violet-900/10 to-transparent',
          badgeText: 'Aurora Ambience',
          icon: Wind,
        };
      case 'mist':
        return {
          glow1: 'from-slate-600/10 via-indigo-900/10 to-transparent',
          glow2: 'from-blue-700/10 via-cyan-950/10 to-transparent',
          glow3: 'from-amber-600/05 to-transparent',
          badgeText: 'Dawn Horizon Mist',
          icon: Cloud,
        };
    }
  };

  const theme = getAtmosphereTheme();
  const AtmosphereIcon = theme.icon;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Base Dark Canvas */}
      <div className="absolute inset-0 bg-[#0c0c0e]" />

      {/* 2. Dynamic Deep Atmospheric Aurora / Radial Lighting Blobs */}
      <div
        className={`absolute -top-32 -left-32 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full bg-gradient-to-br ${theme.glow1} blur-[140px] opacity-75 transition-all duration-1000`}
      />
      <div
        className={`absolute top-1/3 -right-32 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full bg-gradient-to-bl ${theme.glow2} blur-[160px] opacity-70 transition-all duration-1000`}
      />
      <div
        className={`absolute -bottom-40 left-1/4 w-[600px] sm:w-[950px] h-[600px] sm:h-[950px] rounded-full bg-gradient-to-tr ${theme.glow3} blur-[180px] opacity-60 transition-all duration-1000`}
      />

      {/* 3. Subtle Technical Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* 4. Canvas for Fluid Floating Atmospheric Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
      />

      {/* 5. Micro Weather / Time Status Pill (Bottom Left, Subtle & Non-Intrusive) */}
      <div className="hidden lg:flex items-center gap-2 absolute bottom-4 left-6 z-10 px-3 py-1.5 rounded-full bg-[#121216]/60 backdrop-blur-md border border-white/5 text-[10px] font-mono-tech text-neutral-400">
        <AtmosphereIcon className="w-3 h-3 text-indigo-400 animate-pulse" />
        <span className="uppercase tracking-wider">{theme.badgeText}</span>
        {currentTimeStr && (
          <>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-300 font-semibold">{currentTimeStr}</span>
          </>
        )}
      </div>
    </div>
  );
};
