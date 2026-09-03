import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { ActiveSection } from '../types';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  Layers, 
  Cpu, 
  Layout, 
  Video,
  CheckCircle2,
  Send,
  FolderKanban
} from 'lucide-react';

export const Center: React.FC = () => {
  const { profile, projects, setActiveSection, setSelectedProjectId } = usePortfolio();

  const avatarUrl =
    profile.avatarUrl ||
    profile.portraitUrl ||
    'https://lh3.googleusercontent.com/d/1Pz77FIirx9DBi0-ExQwq2Ze9ehthkXAr';

  const publishedProjects = projects.filter((p) => p.published).sort((a, b) => a.order - b.order);
  const featuredProjects = publishedProjects.slice(0, 3);

  const navigateTo = (section: ActiveSection, projectId?: string) => {
    if (projectId) {
      setSelectedProjectId(projectId);
    }
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 4 Core Strategic Pillars for Bottom Floating Glass Dock
  const corePillars = [
    {
      id: 'pillar-1',
      title: 'UI/UX & Web Development',
      subtitle: 'Design systems, interactive prototypes & modern full-stack web builds',
      icon: Layout,
      actionText: 'Explore Projects',
      targetSection: 'projects' as ActiveSection,
      accentBorder: 'hover:border-blue-500/40',
      accentText: 'text-blue-400',
    },
    {
      id: 'pillar-2',
      title: 'Brand & Content Strategy',
      subtitle: 'Soft-opening launches, high-conversion narratives & campaign architectures',
      icon: Layers,
      actionText: 'View Services',
      targetSection: 'services' as ActiveSection,
      accentBorder: 'hover:border-indigo-500/40',
      accentText: 'text-indigo-400',
    },
    {
      id: 'pillar-3',
      title: 'Generative AI Execution',
      subtitle: 'Precision prompt engineering, visual generation & automated workflows',
      icon: Cpu,
      actionText: 'Inspect Skills',
      targetSection: 'skills' as ActiveSection,
      accentBorder: 'hover:border-purple-500/40',
      accentText: 'text-purple-400',
    },
    {
      id: 'pillar-4',
      title: 'Motion & Video Direction',
      subtitle: 'Speed-ramp clinic tours, social reels & broadcast script directing',
      icon: Video,
      actionText: 'See Media',
      targetSection: 'projects' as ActiveSection,
      accentBorder: 'hover:border-emerald-500/40',
      accentText: 'text-emerald-400',
    },
  ];

  return (
    <div className="relative w-full pt-8 sm:pt-12 lg:pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Background ambient accent glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* =================================================================== */}
      {/* 1. TWO-COLUMN TOP EDITORIAL HERO LAYOUT                             */}
      {/* =================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[580px] mb-16 lg:mb-20">
        
        {/* LEFT COLUMN: Typography & Primary CTAs (cols 1-7) */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center text-left"
        >
          {/* Status Chip / Category Tagline */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs font-mono-tech font-bold uppercase tracking-wider text-indigo-400 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              UI/UX DESIGNER · PROMPT ENGINEER · CONTENT STRATEGIST
            </span>

            {profile.location && (
              <span className="text-xs font-mono-tech text-slate-400 hidden sm:inline-block">
                · {profile.location}
              </span>
            )}
          </div>

          {/* Bold Name Heading */}
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-white font-sans leading-[1.08] mb-4">
            {profile.name}
            {profile.nickname && (
              <span className="block text-2xl lg:text-3xl font-sans font-medium text-slate-400 tracking-normal mt-1">
                ({profile.nickname})
              </span>
            )}
          </h1>

          {/* Slogan Quote Accent */}
          <div className="mb-6 inline-flex items-center gap-2 text-indigo-300 font-mono-tech text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>&ldquo;{profile.slogan || 'Logically Play The Creativity'}&rdquo;</span>
          </div>

          {/* Bio Paragraph */}
          <p className="text-slate-300 text-base lg:text-lg leading-relaxed max-w-xl mb-8 font-sans">
            {profile.positioning ||
              'Bridging creative strategy, visual craft, content production, and technical web development. From soft-opening clinic identities and high-converting video scriptwriting to full-stack React web portals and generative AI prompt engineering, connecting strategic logic with refined execution.'}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Primary filled button with hover glow */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('projects')}
              className="px-7 py-4 rounded-xl bg-white text-black font-sans font-semibold text-sm tracking-wide shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] hover:bg-slate-100 transition-all flex items-center gap-2 min-h-[50px]"
            >
              <span>{profile.primaryCtaText || 'Explore Case Studies'}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            {/* Secondary glass outline button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('contact')}
              className="px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-sans font-semibold text-sm tracking-wide border border-white/20 hover:border-white/40 transition-all backdrop-blur-md flex items-center gap-2 min-h-[50px]"
            >
              <span>{profile.secondaryCtaText || "Let's Work Together"}</span>
              <ArrowUpRight className="w-4 h-4 text-slate-300" />
            </motion.button>
          </div>

          {/* Social Proof Mini Indicators */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs font-mono-tech text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Full-Stack Web & UI Systems</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>High-Impact Video Direction</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>Generative AI Pipelines</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Large Profile Portrait (cols 8-12) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex items-center justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md">
            
            {/* Ambient Dark Background Glow */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-blue-600/30 via-indigo-600/20 to-purple-600/30 blur-2xl opacity-80" />
            
            {/* Portrait Frame */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 bg-slate-900/90 shadow-[0_0_50px_rgba(59,130,246,0.15)] group">
              <img
                src={avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback if network breaks
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80';
                }}
              />
              
              {/* Subtle bottom vignette gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* In-photo status caption */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs font-mono-tech">
                <div className="flex items-center gap-2 text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold">{profile.name}</span>
                </div>
                <span className="text-slate-400 uppercase text-[10px]">Yangon · Available</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>

      {/* =================================================================== */}
      {/* 2. BOTTOM FLOATING GLASS DOCK (Quick Cards)                          */}
      {/* =================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full backdrop-blur-xl bg-slate-900/60 border border-white/10 rounded-2xl p-6 lg:p-8 shadow-2xl mb-20"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div>
            <div className="text-xs font-mono-tech font-bold uppercase tracking-wider text-indigo-400 mb-1">
              STRATEGIC PILLARS
            </div>
            <h2 className="text-xl font-bold font-sans text-white tracking-tight">
              Disciplines & Specialized Execution
            </h2>
          </div>
          <span className="text-xs font-mono-tech text-slate-400 hidden sm:inline">
            Direct action access to verified case studies
          </span>
        </div>

        {/* 4 Cards Array: Desktop Grid / Mobile Stack */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {corePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.button
                key={pillar.id}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateTo(pillar.targetSection)}
                className={`p-5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 ${pillar.accentBorder} transition-all text-left flex flex-col justify-between group min-h-[170px]`}
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon className={`w-5 h-5 ${pillar.accentText}`} />
                  </div>
                  <h3 className="font-sans font-bold text-sm text-white mb-1.5 group-hover:text-indigo-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-xs text-slate-400 leading-relaxed mb-4">
                    {pillar.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-mono-tech font-semibold text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-all pt-2 border-t border-white/5">
                  <span>{pillar.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* =================================================================== */}
      {/* 3. CURATED FEATURED CASE STUDIES SHOWCASE                           */}
      {/* =================================================================== */}
      <div className="w-full space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="text-xs font-mono-tech font-bold uppercase tracking-wider text-blue-400 mb-1">
              CURATED SELECTION
            </div>
            <h2 className="text-2xl font-bold font-sans text-white tracking-tight">
              Featured Case Studies
            </h2>
          </div>
          <button
            onClick={() => navigateTo('projects')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-tech uppercase font-bold text-slate-300 hover:text-white transition-colors"
          >
            <span>View All ({publishedProjects.length}) Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -4 }}
              onClick={() => navigateTo('projects', project.id)}
              className="group cursor-pointer rounded-2xl bg-slate-900/60 border border-white/10 hover:border-indigo-500/40 overflow-hidden shadow-lg transition-all flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-mono-tech font-bold uppercase text-white">
                  #{project.projectNumber} · {project.category.split('·')[0].trim()}
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold font-sans text-white group-hover:text-indigo-300 transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans line-clamp-2 leading-relaxed mb-4">
                    {project.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-tech text-slate-400 group-hover:text-indigo-400">
                  <span>Explore Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Center;
