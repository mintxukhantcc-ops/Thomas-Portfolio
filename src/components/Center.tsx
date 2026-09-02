import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { ActiveSection } from '../types';
import { 
  ArrowUpRight, 
  FolderKanban, 
  Cpu, 
  User, 
  Layers, 
  Clock, 
  Send, 
  Sparkles, 
  ChevronRight,
  Play
} from 'lucide-react';

export const Center: React.FC = () => {
  const { profile, projects, setActiveSection, setSelectedProjectId, settings } = usePortfolio();

  // Dynamic rotating profile titles
  const dualProfiles = [
    'UI/UX & Graphic Designer',
    'Content Strategist & Creative Technologist',
    'Full-Stack Web Builder',
    'Creative Campaign Architect',
  ];

  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % dualProfiles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [dualProfiles.length]);

  const publishedProjects = projects.filter((p) => p.published);
  const featuredProjects = publishedProjects.slice(0, 4);

  // Satellite navigation nodes with tightened ~40% orbit around central avatar
  const primaryNodes = [
    {
      id: 'about' as ActiveSection,
      label: 'ABOUT',
      subtitle: 'Story & Philosophy',
      icon: User,
      // Desktop: Top Center (North) - tightened
      desktopStyle: 'top-2 lg:top-4 left-1/2 -translate-x-1/2',
      directionTag: 'N 00°',
      accentColor: 'from-blue-500/20 to-indigo-500/20',
      floatDelay: 0,
    },
    {
      id: 'projects' as ActiveSection,
      label: 'PROJECTS',
      subtitle: `${publishedProjects.length} Case Studies & Live Proof`,
      icon: FolderKanban,
      // Desktop: Top Right (North East) - tightened by ~40%
      desktopStyle: 'top-20 lg:top-24 right-6 lg:right-10 xl:right-16',
      directionTag: 'NE 45°',
      accentColor: 'from-indigo-500/25 to-violet-500/25',
      highlightBadge: 'FEATURED',
      floatDelay: 0.6,
    },
    {
      id: 'experience' as ActiveSection,
      label: 'EXPERIENCE',
      subtitle: 'Milestones & Roles',
      icon: Clock,
      // Desktop: Bottom Right (South East) - tightened by ~40%
      desktopStyle: 'bottom-20 lg:bottom-24 right-6 lg:right-10 xl:right-16',
      directionTag: 'SE 135°',
      accentColor: 'from-violet-500/20 to-purple-500/20',
      floatDelay: 1.2,
    },
    {
      id: 'contact' as ActiveSection,
      label: 'CONTACT',
      subtitle: 'Inquiries & Collaboration',
      icon: Send,
      // Desktop: Bottom Center (South) - tightened
      desktopStyle: 'bottom-2 lg:bottom-4 left-1/2 -translate-x-1/2',
      directionTag: 'S 180°',
      accentColor: 'from-cyan-500/20 to-blue-500/20',
      floatDelay: 1.8,
    },
    {
      id: 'services' as ActiveSection,
      label: 'SERVICES',
      subtitle: '5 Strategic Offerings',
      icon: Layers,
      // Desktop: Bottom Left (South West) - tightened by ~40%
      desktopStyle: 'bottom-20 lg:bottom-24 left-6 lg:left-10 xl:left-16',
      directionTag: 'SW 225°',
      accentColor: 'from-blue-500/20 to-cyan-500/20',
      floatDelay: 2.4,
    },
    {
      id: 'skills' as ActiveSection,
      label: 'SKILLS',
      subtitle: 'Design · Code · Strategy',
      icon: Cpu,
      // Desktop: Top Left (North West) - tightened by ~40%
      desktopStyle: 'top-20 lg:top-24 left-6 lg:left-10 xl:left-16',
      directionTag: 'NW 315°',
      accentColor: 'from-indigo-500/20 to-blue-500/20',
      floatDelay: 3.0,
    },
  ].filter((node) => settings.visibility[node.id as keyof typeof settings.visibility] !== false);

  const navigateTo = (section: ActiveSection) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 pt-24 sm:pt-28 pb-28 sm:pb-24 overflow-hidden">
      
      {/* Ambient Depth Aura behind spatial layout */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[620px] lg:w-[840px] h-[340px] sm:h-[620px] lg:h-[840px] rounded-full bg-gradient-to-br from-indigo-950/20 via-blue-950/15 to-transparent blur-[140px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[480px] h-[240px] sm:h-[480px] rounded-full bg-gradient-to-tr from-violet-900/15 via-cyan-950/10 to-transparent blur-[90px]" />
      </div>

      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* ================================================================= */}
        {/* DESKTOP VIEW (>= 1024px): HIGH-CRAFT SPATIAL ORBIT (TIGHTENED 40%) */}
        {/* ================================================================= */}
        <div className="hidden lg:flex relative w-full items-center justify-center min-h-[640px] px-4">
          
          {/* Orbital Concentric Ring Guides tightened ~40% with subtle rotation drift */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
            <div className="w-[540px] xl:w-[600px] h-[540px] xl:h-[600px] rounded-full border border-white/[0.05]" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
              className="w-[390px] xl:w-[440px] h-[390px] xl:h-[440px] rounded-full border border-indigo-500/[0.12] border-dashed" 
            />
            <div className="w-[250px] xl:w-[280px] h-[250px] xl:h-[280px] rounded-full border border-white/[0.04]" />
          </div>

          {/* Central Profile Card with Framer Motion Entrance Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center text-center max-w-[380px] mx-auto px-4 py-6"
          >
            {/* Portrait with circular framing & ambient glow */}
            <div className="relative mb-5 group">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-indigo-500/25 via-blue-500/25 to-violet-500/25 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-1 rounded-full bg-gradient-to-b from-white/20 via-white/5 to-transparent border border-white/15 shadow-2xl">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-[#16161b] relative">
                  <img
                    src={profile.portraitUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute bottom-1 right-1 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#121216]/95 border border-white/20 shadow-xl backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-mono-tech text-neutral-200 uppercase tracking-wider font-semibold">
                  AVAILABLE
                </span>
              </div>
            </div>

            {/* Dynamic Rotating Profile Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 text-xs font-mono-tech tracking-wider uppercase mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="font-semibold">{dualProfiles[titleIndex]}</span>
            </div>

            {/* Name & Nickname (Standard Web Scaling text-3xl to text-4xl) */}
            <h1 className="text-3xl xl:text-4xl font-sans font-bold text-white tracking-tight leading-tight mb-2">
              {profile.name}
              {profile.nickname && (
                <span className="text-neutral-400 text-xl font-normal ml-2">
                  ({profile.nickname})
                </span>
              )}
            </h1>

            {/* Philosophy Slogan */}
            <p className="text-xs xl:text-sm font-mono-tech tracking-wider uppercase text-indigo-400 font-semibold mb-2">
              &ldquo;{profile.slogan}&rdquo;
            </p>

            {/* Supporting Statement */}
            <p className="text-xs xl:text-sm text-neutral-300 font-sans leading-relaxed mb-5 max-w-sm">
              {profile.supportingStatement}
            </p>

            {/* Action Buttons with Spring Pressure Physics on Tap */}
            <div className="flex items-center justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                onClick={() => navigateTo('projects')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-mono-tech tracking-wider uppercase font-bold hover:bg-neutral-200 transition-colors shadow-lg shadow-white/5 min-h-[44px]"
              >
                <span>{profile.primaryCtaText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                onClick={() => navigateTo('contact')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#16161c]/70 backdrop-blur-md border border-white/15 text-white text-xs font-mono-tech tracking-wider uppercase font-semibold hover:bg-white/10 hover:border-white/30 transition-colors min-h-[44px]"
              >
                <span>{profile.secondaryCtaText}</span>
                <Send className="w-3.5 h-3.5 text-indigo-400" />
              </motion.button>
            </div>
          </motion.div>

          {/* Desktop Orbital Satellite Cards with Ambient Floating Motion & Hover Physics */}
          {primaryNodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.id}
                className={`absolute ${node.desktopStyle} z-20`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [-4, 4, -4],
                  x: [-2, 2, -2],
                }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.1 + index * 0.08 },
                  scale: { duration: 0.5, delay: 0.1 + index * 0.08 },
                  y: {
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: node.floatDelay,
                  },
                  x: {
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: node.floatDelay * 0.5,
                  },
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  onClick={() => navigateTo(node.id)}
                  className="group text-left focus:outline-none min-h-[48px] block"
                >
                  <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#15151b]/70 backdrop-blur-md border border-white/10 group-hover:border-indigo-400/60 shadow-2xl group-hover:shadow-indigo-500/10 transition-all w-[210px] xl:w-[230px]">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${node.accentColor} border border-white/10 text-white shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-5 h-5 text-indigo-300 group-hover:text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono-tech font-bold tracking-wider text-white group-hover:text-indigo-300 transition-colors">
                          {node.label}
                        </span>
                        <span className="text-[9px] font-mono-tech text-neutral-500">
                          {node.directionTag}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 font-sans truncate">
                        {node.subtitle}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* TABLET VIEW (768px - 1023px): TWO-COLUMN BALANCED ADAPTIVE LAYOUT */}
        {/* ================================================================= */}
        <div className="hidden md:flex lg:hidden w-full flex-col items-center gap-8 py-4">
          
          {/* Tablet Hero Profile Box with Backdrop Blur Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-[#141419]/70 backdrop-blur-md border border-white/10 shadow-xl"
          >
            <div className="relative mb-4">
              <div className="p-1 rounded-full bg-gradient-to-b from-white/20 via-white/5 to-transparent border border-white/15 shadow-xl">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-[#16161b]">
                  <img
                    src={profile.portraitUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#121216] border border-white/20 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-mono-tech text-neutral-300 uppercase tracking-wider">
                  AVAILABLE
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 text-xs font-mono-tech tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-semibold">{dualProfiles[titleIndex]}</span>
            </div>

            <h1 className="text-3xl font-sans font-bold text-white tracking-tight mb-1">
              {profile.name}
              {profile.nickname && (
                <span className="text-neutral-400 text-xl font-normal ml-2">
                  ({profile.nickname})
                </span>
              )}
            </h1>

            <p className="text-xs font-mono-tech tracking-wider uppercase text-indigo-400 font-semibold mb-2">
              &ldquo;{profile.slogan}&rdquo;
            </p>

            <p className="text-sm text-neutral-300 font-sans leading-relaxed max-w-md mb-5">
              {profile.supportingStatement}
            </p>

            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigateTo('projects')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-mono-tech font-bold uppercase tracking-wider min-h-[48px]"
              >
                <span>{profile.primaryCtaText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigateTo('contact')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-white text-xs font-mono-tech font-semibold uppercase tracking-wider min-h-[48px]"
              >
                <span>{profile.secondaryCtaText}</span>
                <Send className="w-3.5 h-3.5 text-indigo-400" />
              </motion.button>
            </div>
          </motion.div>

          {/* Tablet Navigation Grid (2x3 Grid) with Scroll Reveal */}
          <div className="w-full max-w-xl grid grid-cols-2 gap-3">
            {primaryNodes.map((node) => {
              const Icon = node.icon;
              return (
                <motion.button
                  key={node.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigateTo(node.id)}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#15151b]/70 backdrop-blur-md border border-white/10 hover:border-indigo-400/50 hover:bg-white/[0.04] transition-all text-left min-h-[64px]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-indigo-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-mono-tech font-bold tracking-wider text-white block truncate">
                        {node.label}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-sans block truncate">
                        {node.subtitle}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-500 shrink-0 ml-1" />
                </motion.button>
              );
            })}
          </div>

        </div>

        {/* ================================================================= */}
        {/* MOBILE VIEW (< 768px): PRISTINE VERTICAL STACK WITH 48PX TARGETS  */}
        {/* ================================================================= */}
        <div className="md:hidden w-full flex flex-col items-center">
          
          {/* 1. Mobile Central Profile Container */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center text-center px-4 py-6 rounded-3xl bg-[#141419]/70 backdrop-blur-md border border-white/10 mb-6"
          >
            {/* Avatar */}
            <div className="relative mb-4">
              <div className="p-1 rounded-full bg-gradient-to-b from-white/20 via-white/5 to-transparent border border-white/15 shadow-xl">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-[#16161b] relative">
                  <img
                    src={profile.portraitUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#121216] border border-white/20 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-mono-tech text-neutral-300 uppercase tracking-wider">
                  AVAILABLE
                </span>
              </div>
            </div>

            {/* Rotating Role Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 text-xs font-mono-tech tracking-wider uppercase mb-2">
              <Sparkles className="w-3 h-3 text-indigo-400 shrink-0" />
              <span className="font-semibold text-[11px] truncate max-w-[240px]">
                {dualProfiles[titleIndex]}
              </span>
            </div>

            {/* Name (Standard Web Scaling text-2xl to text-3xl) */}
            <h1 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight mb-1">
              {profile.name}
              {profile.nickname && (
                <span className="text-neutral-400 text-lg font-normal ml-2">
                  ({profile.nickname})
                </span>
              )}
            </h1>

            {/* Slogan */}
            <p className="text-xs font-mono-tech tracking-wider uppercase text-indigo-400 font-semibold mb-2">
              &ldquo;{profile.slogan}&rdquo;
            </p>

            {/* Bio Statement */}
            <p className="text-xs text-neutral-300 font-sans leading-relaxed max-w-sm mb-4">
              {profile.supportingStatement}
            </p>

            {/* Feature Tags */}
            <div className="flex flex-wrap justify-center gap-1.5 mb-5">
              {profile.featureTags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[9px] font-mono-tech uppercase text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs with minimum 48px touch targets */}
            <div className="flex w-full max-w-xs flex-col gap-2.5">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigateTo('projects')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black text-xs font-mono-tech font-bold uppercase tracking-wider min-h-[48px] shadow-md"
              >
                <span>{profile.primaryCtaText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigateTo('contact')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono-tech font-semibold uppercase tracking-wider min-h-[48px]"
              >
                <span>{profile.secondaryCtaText}</span>
                <Send className="w-3.5 h-3.5 text-indigo-400" />
              </motion.button>
            </div>
          </motion.div>

          {/* 2. Mobile Cleanly Stacked Navigation Cards */}
          <div className="w-full space-y-2.5 px-1">
            <div className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-400 mb-1 px-1">
              PORTFOLIO DIRECTORY
            </div>
            {primaryNodes.map((node) => {
              const Icon = node.icon;
              return (
                <motion.button
                  key={node.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigateTo(node.id)}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-[#141419]/70 backdrop-blur-md border border-white/10 active:border-indigo-400/60 transition-all text-left min-h-[56px]"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-indigo-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-sans font-bold tracking-tight text-white">
                          {node.label}
                        </span>
                        {node.highlightBadge && (
                          <span className="px-1.5 py-0.2 rounded bg-indigo-950 border border-indigo-500/40 text-[9px] font-mono-tech text-indigo-300 uppercase">
                            {node.highlightBadge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-neutral-400 font-sans block truncate">
                        {node.subtitle}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400 shrink-0 ml-2" />
                </motion.button>
              );
            })}
          </div>

        </div>

        {/* ================================================================= */}
        {/* SELECTED PROJECTS SHOWCASE GRID (With Scroll Reveal)             */}
        {/* ================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="w-full mt-16 sm:mt-20 pt-8 border-t border-white/5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-[10px] font-mono-tech tracking-widest uppercase text-indigo-400 block mb-1">
                CURATED WORK
              </span>
              <h2 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight">
                Selected Projects ({publishedProjects.length})
              </h2>
            </div>
            <motion.button
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigateTo('projects')}
              className="flex items-center gap-1.5 text-xs font-mono-tech tracking-wider uppercase text-neutral-300 hover:text-white transition-colors py-2 min-h-[44px]"
            >
              <span>Explore All Projects</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProjects.map((proj, idx) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => {
                  setSelectedProjectId(proj.id);
                  navigateTo('projects');
                }}
                className="group cursor-pointer rounded-2xl bg-[#141419]/70 backdrop-blur-md border border-white/10 overflow-hidden hover:border-white/20 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
                    <img
                      src={proj.heroImage}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141419] via-black/30 to-transparent" />
                    
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-mono-tech tracking-wider uppercase text-neutral-300">
                      PROJECT {proj.projectNumber}
                    </div>

                    {proj.videoEmbedUrl && (
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-950/80 backdrop-blur-md border border-rose-500/30 text-[9px] font-mono-tech uppercase text-rose-300">
                        <Play className="w-2.5 h-2.5 fill-rose-300 text-rose-300" />
                        <span>VIDEO</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <span className="text-[10px] font-mono-tech tracking-wider uppercase text-indigo-400 block mb-1">
                      {proj.category}
                    </span>
                    <h3 className="text-sm font-sans font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1 mb-1.5">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-sans line-clamp-2 leading-relaxed">
                      {proj.summary}
                    </p>
                  </div>
                </div>

                <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono-tech text-neutral-400 bg-white/[0.01]">
                  <span className="truncate max-w-[120px]">{proj.role}</span>
                  <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform shrink-0 flex items-center gap-1">
                    <span>VIEW</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Center;
