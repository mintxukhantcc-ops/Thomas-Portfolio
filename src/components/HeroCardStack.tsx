import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  Sparkles
} from 'lucide-react';

import portrait1 from '../assets/images/thomas_portrait_1788374555669.jpg';
import portrait2 from '../assets/images/thomas_portrait_creative_1788463053334.jpg';
import portrait3 from '../assets/images/thomas_portrait_tech_1788463073746.jpg';
import portrait4 from '../assets/images/thomas_portrait_studio_1788463090198.jpg';
import portrait5 from '../assets/images/thomas_portrait_outdoor_1788463111352.jpg';

interface PortraitCard {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  roleBadge: string;
}

export const HeroCardStack: React.FC = () => {
  const { profile } = usePortfolio();

  const primaryPortrait =
    profile.portraitUrl ||
    profile.avatarUrl ||
    portrait1;

  // Curated 5 distinct persona portraits of Min Thu Khant (Thomas)
  const initialCards: PortraitCard[] = [
    {
      id: 'portrait-primary',
      title: profile.name,
      subtitle: 'Creative Technologist',
      tag: 'YANGON · AVAILABLE',
      image: primaryPortrait,
      roleBadge: 'CREATIVE TECH',
    },
    {
      id: 'portrait-creative',
      title: profile.name,
      subtitle: 'UI/UX & Visual Direction',
      tag: 'YANGON · AVAILABLE',
      image: portrait2,
      roleBadge: 'UI / UX CRAFT',
    },
    {
      id: 'portrait-tech',
      title: profile.name,
      subtitle: 'Prompt Engineer & AI Specialist',
      tag: 'YANGON · AVAILABLE',
      image: portrait3,
      roleBadge: 'NEURAL AI LAB',
    },
    {
      id: 'portrait-studio',
      title: profile.name,
      subtitle: 'Content Strategist & Narrator',
      tag: 'YANGON · AVAILABLE',
      image: portrait4,
      roleBadge: 'AUDIO & SCRIPT',
    },
    {
      id: 'portrait-outdoor',
      title: profile.name,
      subtitle: 'Full-Stack Web Architect',
      tag: 'YANGON · AVAILABLE',
      image: portrait5,
      roleBadge: 'FULL-STACK CLOUD',
    },
  ];

  // Ordered cards array where cards[0] is ALWAYS the front active card
  const [cards, setCards] = useState<PortraitCard[]>(initialCards);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [leavingCardId, setLeavingCardId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Responsive dimensions for flawless mathematical centering on mobile, tablet & desktop
  const [dimensions, setDimensions] = useState({
    cardWidth: 280,
    cardHeight: 350,
    stepSize: 42,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 380) {
        // Ultra-compact phones (320px - 375px)
        setDimensions({ cardWidth: 195, cardHeight: 245, stepSize: 20 });
      } else if (width < 480) {
        // Standard phones (375px - 479px)
        setDimensions({ cardWidth: 215, cardHeight: 270, stepSize: 23 });
      } else if (width < 640) {
        // Large phones (480px - 639px)
        setDimensions({ cardWidth: 235, cardHeight: 295, stepSize: 26 });
      } else if (width < 1024) {
        // Tablets
        setDimensions({ cardWidth: 255, cardHeight: 320, stepSize: 32 });
      } else if (width < 1280) {
        // Laptops
        setDimensions({ cardWidth: 275, cardHeight: 345, stepSize: 38 });
      } else {
        // Large desktop
        setDimensions({ cardWidth: 290, cardHeight: 360, stepSize: 42 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const SLIDE_INTERVAL = 3800; // 3.8s per portrait rotation

  // Total horizontal span of the visual deck: 4 steps + 1 full card width
  const totalDeckSpan = 4 * dimensions.stepSize + dimensions.cardWidth;

  // Synchronized forward rotation:
  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const departingCard = cards[0];
    setLeavingCardId(departingCard.id);

    // After 380ms exit animation, rotate array and re-dock to position 4 (back)
    setTimeout(() => {
      setCards((prev) => [...prev.slice(1), prev[0]]);
      setLeavingCardId(null);
      setIsTransitioning(false);
    }, 380);
  };

  // Synchronized backward rotation:
  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setCards((prev) => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 380);
  };

  // Direct card click: jump selected preview card directly to front
  const handleCardClick = (targetIndex: number) => {
    if (isTransitioning || targetIndex === 0) return;
    setIsTransitioning(true);
    setCards((prev) => [...prev.slice(targetIndex), ...prev.slice(0, targetIndex)]);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  // Mobile touch swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Trigger only if horizontal swipe dominates vertical scrolling
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        handleNext(); // Swiped left -> next
      } else {
        handlePrev(); // Swiped right -> prev
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Automatic slide rotation
  useEffect(() => {
    if (!isPlaying || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      handleNext();
    }, SLIDE_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, cards, isTransitioning]);

  const activeCard = cards[0];
  const activeOriginalIndex = initialCards.findIndex((c) => c.id === activeCard.id);

  return (
    <div 
      className="relative w-full flex flex-col items-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Portrait Showcase Deck"
    >
      {/* Mobile Swipe / Interaction Hint */}
      <div className="flex sm:hidden items-center justify-center gap-1.5 mb-2.5 text-[10px] font-mono-tech text-cyan-300/90 uppercase tracking-wider">
        <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
        <span>Swipe or tap previews to flip</span>
      </div>

      {/* 
        Deck Frame:
        Explicitly sized to totalDeckSpan and centered with mx-auto.
        Card 4 starts at x=0 (left boundary of totalDeckSpan).
        Card 0 ends at x = 4 * stepSize + cardWidth = totalDeckSpan (right boundary).
        Result: 100% mathematically centered on mobile and desktop!
      */}
      <div 
        className="relative mx-auto"
        style={{
          width: totalDeckSpan,
          height: dimensions.cardHeight,
        }}
      >
        {/* Dynamic Cyberpunk / Studio Ambient Aura centered right behind the deck */}
        <div className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-indigo-600/25 to-blue-600/20 blur-3xl opacity-75 pointer-events-none" />
        <div className="absolute -inset-2 sm:-inset-4 rounded-3xl bg-gradient-to-br from-purple-600/20 via-transparent to-blue-500/20 blur-2xl opacity-60 pointer-events-none" />

        {/* Cards mapping */}
        {cards.map((card, index) => {
          const isFront = index === 0;
          const isLeaving = leavingCardId === card.id;

          // Target X position in the centered totalDeckSpan frame:
          // Front card (index 0) sits at: 4 * stepSize (flush right)
          // Card 1 sits at: 3 * stepSize
          // Card 2 sits at: 2 * stepSize
          // Card 3 sits at: 1 * stepSize
          // Card 4 (furthest back) sits at: 0 * stepSize = 0 (flush left)
          const baseX = (4 - index) * dimensions.stepSize;
          let xPos = baseX;
          let scale = 1 - index * 0.04;
          let zIndex = 50 - index * 8;
          let opacity = 1;
          let rotate = 0;

          if (isLeaving) {
            xPos = baseX + 45;
            opacity = 0;
            scale = 0.96;
            rotate = 2.5;
            zIndex = 65; // Stays on top during exit
          } else if (isTransitioning && !isFront) {
            // Remaining cards smoothly slide forward to the right
            const newIndex = index - 1;
            xPos = (4 - newIndex) * dimensions.stepSize;
            scale = 1 - newIndex * 0.04;
            zIndex = 50 - newIndex * 8;
          }

          const brightness = isFront ? 1 : Math.max(0.65, 0.94 - index * 0.07);

          return (
            <motion.div
              key={card.id}
              initial={false}
              animate={{
                x: xPos,
                scale,
                zIndex,
                opacity,
                rotate,
              }}
              transition={{
                duration: 0.42,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => handleCardClick(index)}
              style={{
                width: dimensions.cardWidth,
                height: dimensions.cardHeight,
                filter: `brightness(${brightness})`,
                transformOrigin: 'center center',
              }}
              className={`absolute top-0 left-0 rounded-3xl overflow-hidden border transition-all duration-300 ${
                isFront
                  ? 'border-white/25 shadow-[0_25px_60px_rgba(0,0,0,0.9)] cursor-default ring-1 ring-white/10'
                  : 'border-white/20 hover:border-cyan-400/50 cursor-pointer shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:brightness-105 active:scale-[0.98]'
              } bg-[#0c0c12]`}
              title={!isFront ? `Click to switch: ${card.subtitle}` : undefined}
            >
              {/* Portrait Photo */}
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover object-center pointer-events-none"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80';
                }}
              />

              {/* Subtle depth glass gradient on background cards */}
              {!isFront && (
                <div className="absolute inset-0 bg-[#07070b]/20 hover:bg-transparent transition-colors" />
              )}

              {/* Edge Role Badge on unseen preview cards */}
              {!isFront && (
                <div className="absolute top-2.5 left-2 px-1 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[7px] sm:text-[8px] font-mono-tech text-cyan-300 uppercase tracking-tighter pointer-events-none">
                  {card.roleBadge}
                </div>
              )}

              {/* Vignette Gradient on Front Card */}
              {isFront && (
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/15 to-transparent pointer-events-none" />
              )}

              {/* In-Photo Status Badge Pill (Front Card Only) */}
              {isFront && (
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3.5 sm:left-3.5 sm:right-3.5 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-slate-950/90 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs font-mono-tech shadow-2xl">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-slate-200 min-w-0 pr-1.5">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse ring-2 ring-emerald-400/20" />
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-[11px] sm:text-xs text-white truncate tracking-tight">
                        {card.title}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-cyan-300/90 truncate font-mono-tech">
                        {card.subtitle}
                      </span>
                    </div>
                  </div>

                  <span className="text-slate-400 uppercase text-[8px] sm:text-[9px] tracking-wider shrink-0 font-mono-tech bg-white/5 px-1.5 sm:px-2 py-0.5 rounded-full border border-white/10">
                    {card.tag}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Floating Controls & Role Indicator Rail: Centered with totalDeckSpan */}
      <div 
        style={{ width: totalDeckSpan }}
        className="mx-auto mt-3.5 sm:mt-5 flex items-center justify-between px-1 text-xs font-mono-tech text-slate-400"
      >
        {/* Slide Counter & Active Role Tag */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-2">
          <span className="text-cyan-400 font-bold">
            0{activeOriginalIndex + 1}
          </span>
          <span className="text-slate-600">/</span>
          <span>0{initialCards.length}</span>
          <span className="hidden sm:inline text-slate-500">·</span>
          <span className="text-slate-200 text-[10px] sm:text-[11px] truncate max-w-[130px] sm:max-w-[190px] font-medium">
            {activeCard.subtitle}
          </span>
        </div>

        {/* Carousel Buttons (Prev, Auto-play toggle, Next) */}
        <div className="flex items-center gap-1 bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-full p-1 shadow-xl shrink-0">
          <button
            onClick={handlePrev}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center hover:bg-white/15 text-slate-300 hover:text-white transition-colors active:scale-95"
            aria-label="Previous portrait"
            title="Previous portrait"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center hover:bg-white/15 text-slate-300 hover:text-white transition-colors active:scale-95"
            aria-label={isPlaying ? 'Pause auto-rotation' : 'Resume auto-rotation'}
            title={isPlaying ? 'Pause Auto-Play' : 'Resume Auto-Play'}
          >
            {isPlaying ? (
              <Pause className="w-3 h-3 text-cyan-400" />
            ) : (
              <Play className="w-3 h-3 text-emerald-400 ml-0.5" />
            )}
          </button>

          <button
            onClick={handleNext}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center hover:bg-white/15 text-slate-300 hover:text-white transition-colors active:scale-95"
            aria-label="Next portrait"
            title="Next portrait"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress Dots Indicator */}
      <div className="mt-2.5 flex items-center justify-center gap-1.5">
        {initialCards.map((card, idx) => (
          <button
            key={card.id}
            onClick={() => {
              const currentPos = cards.findIndex((c) => c.id === card.id);
              if (currentPos !== -1) {
                handleCardClick(currentPos);
              }
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === activeOriginalIndex
                ? 'w-6 sm:w-7 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]'
                : 'w-1.5 sm:w-2 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Jump to portrait ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
