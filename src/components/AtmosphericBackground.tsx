import React, { useEffect, useRef, useState } from 'react';
import { Cloud, Moon, Sun, CloudRain, Sparkles, Wind, RefreshCw } from 'lucide-react';

export type WeatherCondition = 'clear_night' | 'sunny' | 'rain' | 'twilight' | 'aurora';

interface WeatherData {
  condition: WeatherCondition;
  temperature: number;
  conditionLabel: string;
  location: string;
  isRealTime: boolean;
}

export const AtmosphericBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Weather state
  const [weather, setWeather] = useState<WeatherData>({
    condition: 'clear_night',
    temperature: 28,
    conditionLabel: 'Clear Night Sky',
    location: 'Yangon, MM',
    isRealTime: true,
  });

  // Time state for live clock
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');
  const [isSelectorOpen, setIsSelectorOpen] = useState<boolean>(false);

  // 1. Clock timer
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Fetch or detect real-time weather (Yangon 16.8661° N, 96.1951° E)
  useEffect(() => {
    let isMounted = true;

    const resolveDefaultByTime = (now: Date): WeatherData => {
      const hours = now.getHours();
      if (hours >= 6 && hours < 9) {
        return {
          condition: 'aurora',
          temperature: 26,
          conditionLabel: 'Dawn Breeze',
          location: 'Yangon, MM',
          isRealTime: false,
        };
      } else if (hours >= 9 && hours < 17) {
        return {
          condition: 'sunny',
          temperature: 33,
          conditionLabel: 'Sunny Aura',
          location: 'Yangon, MM',
          isRealTime: false,
        };
      } else if (hours >= 17 && hours < 20) {
        return {
          condition: 'twilight',
          temperature: 29,
          conditionLabel: 'Golden Twilight',
          location: 'Yangon, MM',
          isRealTime: false,
        };
      } else {
        return {
          condition: 'clear_night',
          temperature: 27,
          conditionLabel: 'Clear Night Sky',
          location: 'Yangon, MM',
          isRealTime: false,
        };
      }
    };

    const fetchRealTimeWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=16.8661&longitude=96.1951&current=temperature_2m,weather_code,is_day&timezone=auto'
        );
        if (!res.ok) throw new Error('Weather API offline');
        const data = await res.json();
        if (!isMounted) return;

        const current = data.current;
        const temp = Math.round(current.temperature_2m);
        const wCode = current.weather_code;
        const isDay = current.is_day === 1;

        let detectedCondition: WeatherCondition = 'clear_night';
        let label = 'Clear Night Sky';

        // WMO Weather interpretation
        if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96].includes(wCode)) {
          detectedCondition = 'rain';
          label = 'Monsoon Rain';
        } else if (isDay) {
          if ([0, 1].includes(wCode)) {
            detectedCondition = 'sunny';
            label = 'Sunny Gold Aura';
          } else {
            detectedCondition = 'twilight';
            label = 'Partly Cloudy';
          }
        } else {
          detectedCondition = 'clear_night';
          label = 'Clear Night Sky';
        }

        setWeather({
          condition: detectedCondition,
          temperature: temp,
          conditionLabel: label,
          location: 'Yangon, MM',
          isRealTime: true,
        });
      } catch {
        if (isMounted) {
          setWeather(resolveDefaultByTime(new Date()));
        }
      }
    };

    fetchRealTimeWeather();
    return () => {
      isMounted = false;
    };
  }, []);

  // 3. Dynamic Atmospheric Canvas Simulation connected to Weather Condition
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

    // Weather particle structure
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulseSpeed: number;
      hue: number;
      length?: number;
    }

    const currentCondition = weather.condition;
    const isRain = currentCondition === 'rain';
    const isSunny = currentCondition === 'sunny';
    const isNight = currentCondition === 'clear_night';

    const particleCount = isRain ? (width < 768 ? 60 : 120) : (width < 768 ? 40 : 75);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      if (isRain) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 1,
          speedX: -1.2,
          speedY: Math.random() * 6 + 7, // Fast rainfall
          opacity: Math.random() * 0.4 + 0.3,
          pulseSpeed: 0.05,
          hue: 205, // Cyan-blue rain
          length: Math.random() * 14 + 8,
        });
      } else if (isSunny) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2.2 + 0.8,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: -Math.random() * 0.4 - 0.1, // Rising warm dust motes
          opacity: Math.random() * 0.5 + 0.25,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          hue: Math.random() > 0.5 ? 42 : 28, // Golden amber
        });
      } else if (isNight) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.6 + 0.5,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: -Math.random() * 0.15 - 0.02,
          opacity: Math.random() * 0.7 + 0.2, // Twinkling stars
          pulseSpeed: Math.random() * 0.03 + 0.01,
          hue: Math.random() > 0.4 ? 220 : 255, // Silver indigo
        });
      } else {
        // Twilight / Aurora
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.8 + 0.6,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: -Math.random() * 0.3 - 0.05,
          opacity: Math.random() * 0.6 + 0.2,
          pulseSpeed: Math.random() * 0.02 + 0.008,
          hue: currentCondition === 'aurora' ? 165 : 280, // Emerald vs Violet
        });
      }
    }

    let tick = 0;

    const render = () => {
      tick += 0.015;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around smoothly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) {
          p.y = 0;
          p.x = Math.random() * width;
        }

        if (isRain && p.length) {
          // Render rain streak
          ctx.strokeStyle = `hsla(${p.hue}, 80%, 75%, ${p.opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX * 2, p.y + p.length);
          ctx.stroke();
        } else {
          // Render glowing particulate motes / stars
          const dynamicAlpha = Math.sin(tick * 2 + i) * 0.2 + p.opacity;
          const safeAlpha = Math.max(0.05, Math.min(dynamicAlpha, 0.9));

          ctx.fillStyle = `hsla(${p.hue}, 85%, 75%, ${safeAlpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [weather.condition]);

  // Atmospheric gradient lighting per weather condition
  const getAtmosphericGradients = (condition: WeatherCondition) => {
    switch (condition) {
      case 'sunny':
        return {
          glow1: 'from-amber-500/20 via-orange-600/10 to-transparent',
          glow2: 'from-yellow-500/15 via-amber-900/10 to-transparent',
          glow3: 'from-rose-500/10 via-amber-950/15 to-transparent',
          icon: Sun,
          iconColor: 'text-amber-400',
        };
      case 'rain':
        return {
          glow1: 'from-cyan-700/20 via-blue-900/20 to-transparent',
          glow2: 'from-slate-700/20 via-cyan-950/20 to-transparent',
          glow3: 'from-indigo-900/20 to-transparent',
          icon: CloudRain,
          iconColor: 'text-cyan-400',
        };
      case 'twilight':
        return {
          glow1: 'from-purple-600/20 via-rose-900/15 to-transparent',
          glow2: 'from-indigo-600/15 via-violet-950/20 to-transparent',
          glow3: 'from-amber-500/10 via-purple-950/15 to-transparent',
          icon: Sparkles,
          iconColor: 'text-rose-400',
        };
      case 'aurora':
        return {
          glow1: 'from-emerald-500/20 via-teal-900/15 to-transparent',
          glow2: 'from-indigo-600/15 via-blue-900/20 to-transparent',
          glow3: 'from-cyan-600/10 to-transparent',
          icon: Wind,
          iconColor: 'text-emerald-400',
        };
      case 'clear_night':
      default:
        return {
          glow1: 'from-indigo-700/15 via-blue-950/20 to-transparent',
          glow2: 'from-violet-800/15 via-slate-950/25 to-transparent',
          glow3: 'from-cyan-950/15 to-transparent',
          icon: Moon,
          iconColor: 'text-indigo-400',
        };
    }
  };

  const currentTheme = getAtmosphericGradients(weather.condition);
  const WeatherIcon = currentTheme.icon;

  const weatherPresets: { id: WeatherCondition; label: string; temp: number }[] = [
    { id: 'clear_night', label: 'Clear Night', temp: 27 },
    { id: 'sunny', label: 'Sunny Aura', temp: 33 },
    { id: 'rain', label: 'Monsoon Rain', temp: 26 },
    { id: 'twilight', label: 'Twilight Dusk', temp: 29 },
    { id: 'aurora', label: 'Aurora Dawn', temp: 25 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Base Dark Canvas */}
      <div className="absolute inset-0 bg-[#0c0c0e]" />

      {/* 2. Dynamic Deep Atmospheric Aurora / Radial Weather Blobs */}
      <div
        className={`absolute -top-32 -left-32 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full bg-gradient-to-br ${currentTheme.glow1} blur-[140px] opacity-80 transition-all duration-1000`}
      />
      <div
        className={`absolute top-1/3 -right-32 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full bg-gradient-to-bl ${currentTheme.glow2} blur-[160px] opacity-75 transition-all duration-1000`}
      />
      <div
        className={`absolute -bottom-40 left-1/4 w-[600px] sm:w-[950px] h-[600px] sm:h-[950px] rounded-full bg-gradient-to-tr ${currentTheme.glow3} blur-[180px] opacity-65 transition-all duration-1000`}
      />

      {/* 3. Subtle Technical Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* 4. Canvas for Fluid Floating Atmospheric Particles & Weather Simulation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
      />

      {/* 5. Dynamic Interactive Real-Time Weather Widget (Bottom Left) */}
      <div className="hidden md:flex flex-col items-start absolute bottom-5 left-6 z-30 pointer-events-auto">
        <div className="flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-[#121217]/85 backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all hover:border-white/25">
          {/* Weather Icon with dynamic condition pulse */}
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 border border-white/10 shrink-0">
            <WeatherIcon className={`w-4 h-4 ${currentTheme.iconColor} animate-pulse`} />
          </div>

          {/* Temperature & Condition details */}
          <div className="flex flex-col min-w-0 pr-1">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-sm font-mono-tech font-bold text-white">
                {weather.temperature}°C
              </span>
              <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider">
                {weather.location}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[10px] font-mono-tech text-slate-300">
              <span className="text-slate-200 font-medium truncate max-w-[110px]">
                {weather.conditionLabel}
              </span>
              {currentTimeStr && (
                <>
                  <span className="text-slate-600">·</span>
                  <span className="text-indigo-300 font-semibold">{currentTimeStr}</span>
                </>
              )}
            </div>
          </div>

          {/* Interactive Switcher Button */}
          <button
            onClick={() => setIsSelectorOpen(!isSelectorOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            title="Switch Weather Atmosphere"
            aria-label="Switch Weather Atmosphere"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSelectorOpen ? 'rotate-180' : ''} transition-transform duration-300`} />
          </button>
        </div>

        {/* Quick Atmosphere Selector Drawer */}
        {isSelectorOpen && (
          <div className="mt-2 p-2 rounded-xl bg-[#14141a]/95 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-wrap gap-1 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="w-full text-[9px] font-mono-tech uppercase text-slate-400 px-1.5 py-0.5">
              Interactive Atmospheric Moods
            </div>
            {weatherPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setWeather({
                    condition: preset.id,
                    temperature: preset.temp,
                    conditionLabel: preset.label,
                    location: 'Yangon, MM',
                    isRealTime: false,
                  });
                  setIsSelectorOpen(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono-tech uppercase tracking-wider transition-all ${
                  weather.condition === preset.id
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {preset.label} ({preset.temp}°C)
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AtmosphericBackground;
