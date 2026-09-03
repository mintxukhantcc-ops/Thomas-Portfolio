import React, { useEffect, useRef, useState } from 'react';
import { Cloud, Moon, Sun, CloudRain, Sparkles, Wind } from 'lucide-react';

export type WeatherCondition = 'clear_night' | 'sunny' | 'rain' | 'twilight' | 'aurora';

interface WeatherData {
  condition: WeatherCondition;
  temperature: number;
  conditionLabel: string;
  location: string;
  timezone: string;
  apparentTemp?: number;
  humidity?: number;
  windSpeed?: number;
  isRealTime: boolean;
}

export const AtmosphericBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Weather state (Default to Yangon coordinates & Asia/Yangon timezone)
  const [weather, setWeather] = useState<WeatherData>({
    condition: 'clear_night',
    temperature: 25,
    conditionLabel: 'Night Sky',
    location: 'Yangon, MM',
    timezone: 'Asia/Yangon',
    isRealTime: true,
  });

  // Time state for live clock
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');

  // 1. Clock timer synced to the target location's real timezone
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      try {
        const targetTz = weather.timezone || 'Asia/Yangon';
        setCurrentTimeStr(
          new Intl.DateTimeFormat([], {
            timeZone: targetTz,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          }).format(now)
        );
      } catch {
        setCurrentTimeStr(
          now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          })
        );
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [weather.timezone]);

  // 2. High-precision real-time meteorological fetch
  useEffect(() => {
    let isMounted = true;

    // Helper: Map WMO meteorological code & daylight cycle accurately
    const interpretWeather = (
      wCode: number,
      isDay: boolean,
      precipitation: number,
      cloudCover: number
    ): { condition: WeatherCondition; label: string } => {
      // Active precipitation / showers / thunderstorms
      if (
        precipitation > 0.2 ||
        [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(wCode)
      ) {
        if ([95, 96, 99].includes(wCode)) return { condition: 'rain', label: 'Thunderstorm' };
        if ([65, 82].includes(wCode)) return { condition: 'rain', label: 'Heavy Rain' };
        if ([51, 53, 55].includes(wCode)) return { condition: 'rain', label: 'Light Drizzle' };
        if ([61, 80].includes(wCode)) return { condition: 'rain', label: 'Passing Showers' };
        return { condition: 'rain', label: 'Rain & Showers' };
      }

      // Snow / wintry flurries
      if ([71, 73, 75, 77, 85, 86].includes(wCode)) {
        return { condition: 'aurora', label: 'Snow Flurries' };
      }

      // Fog / mist
      if ([45, 48].includes(wCode)) {
        return {
          condition: isDay ? 'twilight' : 'clear_night',
          label: 'Misty Fog',
        };
      }

      // Daylight conditions (isDay === true)
      if (isDay) {
        if (wCode === 0) return { condition: 'sunny', label: 'Clear Sky' };
        if (wCode === 1) return { condition: 'sunny', label: 'Mainly Sunny' };
        if (wCode === 2) {
          return {
            condition: cloudCover > 65 ? 'twilight' : 'sunny',
            label: 'Partly Cloudy',
          };
        }
        if (wCode === 3) return { condition: 'twilight', label: 'Overcast Sky' };
        return { condition: 'sunny', label: 'Daylight' };
      }

      // Nighttime conditions (isDay === false)
      if (wCode === 0) return { condition: 'clear_night', label: 'Clear Night' };
      if (wCode === 1) return { condition: 'clear_night', label: 'Mainly Clear' };
      if (wCode === 2) return { condition: 'clear_night', label: 'Partly Cloudy' };
      if (wCode === 3) return { condition: 'clear_night', label: 'Overcast Night' };
      return { condition: 'clear_night', label: 'Night Sky' };
    };

    const fetchRealTimeTelemetry = async () => {
      let lat = 16.8661;
      let lon = 96.1951;
      let locationLabel = 'Yangon, MM';
      let timezone = 'Asia/Yangon';

      // Tier 1: Check if geolocation permission was already granted silently
      let geoResolved = false;
      if (typeof navigator !== 'undefined' && 'permissions' in navigator) {
        try {
          const perm = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
          if (perm.state === 'granted') {
            await new Promise<void>((resolve) => {
              navigator.geolocation.getCurrentPosition(
                (pos) => {
                  lat = pos.coords.latitude;
                  lon = pos.coords.longitude;
                  geoResolved = true;
                  resolve();
                },
                () => resolve(),
                { timeout: 3000 }
              );
            });
          }
        } catch {
          // Silent catch
        }
      }

      // Tier 2: IP-based lookup if GPS was not silently available
      if (!geoResolved) {
        try {
          // Use reliable geojs.io service (no rate limiting, full CORS)
          const geoRes = await fetch('https://get.geojs.io/v1/ip/geo.json', {
            headers: { Accept: 'application/json' },
          });
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            if (geoData.latitude && geoData.longitude) {
              lat = parseFloat(geoData.latitude);
              lon = parseFloat(geoData.longitude);
              if (geoData.city) {
                locationLabel = `${geoData.city}, ${geoData.country_code || ''}`.trim();
              }
              if (geoData.timezone) {
                timezone = geoData.timezone;
              }
              geoResolved = true;
            }
          }
        } catch {
          // Try backup ipwho.is
          try {
            const backupRes = await fetch('https://ipwho.is/');
            if (backupRes.ok) {
              const bData = await backupRes.json();
              if (bData.success && bData.latitude && bData.longitude) {
                lat = bData.latitude;
                lon = bData.longitude;
                locationLabel = `${bData.city}, ${bData.country_code || ''}`.trim();
                if (bData.timezone?.id) {
                  timezone = bData.timezone.id;
                }
                geoResolved = true;
              }
            }
          } catch {
            // Keep default Yangon coordinates
          }
        }
      }

      // Tier 3: Query real-time WMO weather observation from Open-Meteo
      try {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m&timezone=auto`;
        const res = await fetch(weatherUrl);
        if (!res.ok) throw new Error(`Open-Meteo HTTP ${res.status}`);
        const data = await res.json();
        if (!isMounted) return;

        const current = data.current;
        const temp = Math.round(current.temperature_2m);
        const wCode = current.weather_code ?? 0;
        const isDay = current.is_day === 1;
        const precip = current.precipitation ?? 0;
        const cloud = current.cloud_cover ?? 0;
        const appTemp = Math.round(current.apparent_temperature ?? temp);
        const humidity = Math.round(current.relative_humidity_2m ?? 0);
        const wind = Math.round(current.wind_speed_10m ?? 0);

        if (data.timezone) {
          timezone = data.timezone;
        }

        const { condition, label } = interpretWeather(wCode, isDay, precip, cloud);

        setWeather({
          condition,
          temperature: temp,
          conditionLabel: label,
          location: locationLabel,
          timezone,
          apparentTemp: appTemp,
          humidity,
          windSpeed: wind,
          isRealTime: true,
        });
      } catch (err) {
        console.warn('Real-time weather query fallback:', err);
      }
    };

    fetchRealTimeTelemetry();

    // Re-verify periodically every 10 minutes
    const interval = setInterval(fetchRealTimeTelemetry, 10 * 60 * 1000);

    // Re-verify when tab visibility changes or device regains internet
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        fetchRealTimeTelemetry();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('online', fetchRealTimeTelemetry);

    return () => {
      isMounted = false;
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('online', fetchRealTimeTelemetry);
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

  return (
    <>
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
      </div>

      {/* 5. Autonomous Real-Time Live Atmosphere Indicator (Non-intrusive, Fixed Bottom-Right) */}
      <aside aria-label="Real-Time Atmosphere Telemetry" className="hidden md:flex items-center fixed bottom-6 right-6 z-30 pointer-events-none select-none">
        <div
          className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#121217]/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] pointer-events-auto cursor-default hover:border-white/25 transition-all"
          title={`Autonomous Weather Telemetry: ${weather.location} · ${weather.temperature}°C (${weather.conditionLabel})${weather.apparentTemp ? ` · Feels like ${weather.apparentTemp}°C` : ''}${weather.humidity ? ` · Humidity ${weather.humidity}%` : ''}${weather.windSpeed ? ` · Wind ${weather.windSpeed} km/h` : ''}`}
        >
          {/* Dynamic Weather Condition Icon */}
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10 shrink-0">
            <WeatherIcon className={`w-3.5 h-3.5 ${currentTheme.iconColor} animate-pulse`} />
          </div>

          {/* Autonomous Status: Temp, Location & Sky Condition */}
          <div className="flex items-center gap-2 font-mono-tech text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Autonomous Live Weather Sync" />
            <span className="font-bold text-white tracking-wide">
              {weather.temperature}°C
            </span>
            <span className="text-slate-400 text-[11px] uppercase tracking-wider">
              {weather.location}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300 text-[11px] font-medium">
              {weather.conditionLabel}
            </span>
            {currentTimeStr && (
              <>
                <span className="text-slate-600">·</span>
                <span className="text-indigo-300/90 text-[11px] font-semibold">{currentTimeStr}</span>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default AtmosphericBackground;
