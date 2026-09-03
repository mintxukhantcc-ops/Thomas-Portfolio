import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Maximize2, 
  X,
  Play,
  ChevronRight,
  ChevronLeft,
  Video,
  Sparkles,
  Layers,
  Wrench,
  Award
} from 'lucide-react';

/**
 * Parses YouTube or TikTok URLs and returns a sanitized embed URL and player metadata.
 */
export function getVideoEmbedInfo(url?: string): {
  type: 'youtube' | 'tiktok' | 'iframe';
  embedUrl: string;
  isVertical: boolean;
} | null {
  if (!url || !url.trim()) return null;
  const trimmed = url.trim();

  // YouTube Shorts: https://www.youtube.com/shorts/ID
  const ytShortsMatch = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (ytShortsMatch && ytShortsMatch[1]) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytShortsMatch[1]}?rel=0&modestbranding=1&loop=1`,
      isVertical: true,
    };
  }

  // YouTube Standard: watch?v=ID or youtu.be/ID or embed/ID
  const ytMatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([a-zA-Z0-9_-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`,
      isVertical: false,
    };
  }

  // TikTok: https://www.tiktok.com/@user/video/1234567890123456789 or /v/ID
  const tiktokMatch = trimmed.match(/tiktok\.com\/(?:@[^/]+\/video\/|v\/)(\d+)/);
  if (tiktokMatch && tiktokMatch[1]) {
    return {
      type: 'tiktok',
      embedUrl: `https://www.tiktok.com/embed/v2/${tiktokMatch[1]}`,
      isVertical: true,
    };
  }

  // Fallback if URL is already an embed URL or iframe source
  if (trimmed.includes('/embed')) {
    return {
      type: 'iframe',
      embedUrl: trimmed,
      isVertical: false,
    };
  }

  return null;
}

export const Projects: React.FC = () => {
  const { 
    projects, 
    selectedProjectId, 
    setSelectedProjectId, 
    setActiveSection 
  } = usePortfolio();

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('ALL');
  const [activeImageZoom, setActiveImageZoom] = useState<string | null>(null);

  const publishedProjects = projects.filter((p) => p.published).sort((a, b) => a.order - b.order);

  const categories = ['ALL', 'CAMPAIGN & STRATEGY', 'BRANDING & UI/UX', 'FULL-STACK WEB', 'VIDEO & CONTENT'];

  const filteredProjects = publishedProjects.filter((p) => {
    if (activeCategoryFilter === 'ALL') return true;
    if (activeCategoryFilter === 'CAMPAIGN & STRATEGY') {
      return (
        p.category.toLowerCase().includes('campaign') ||
        p.category.toLowerCase().includes('strategy') ||
        p.title.toLowerCase().includes('may clinic') ||
        p.title.toLowerCase().includes('pharmaplus')
      );
    }
    if (activeCategoryFilter === 'BRANDING & UI/UX') {
      return (
        p.category.toLowerCase().includes('branding') ||
        p.category.toLowerCase().includes('ui') ||
        p.category.toLowerCase().includes('identity') ||
        p.title.toLowerCase().includes('summ/r')
      );
    }
    if (activeCategoryFilter === 'FULL-STACK WEB') {
      return (
        p.category.toLowerCase().includes('web') ||
        p.category.toLowerCase().includes('portal') ||
        p.title.toLowerCase().includes('portal')
      );
    }
    if (activeCategoryFilter === 'VIDEO & CONTENT') {
      return (
        p.category.toLowerCase().includes('video') ||
        p.category.toLowerCase().includes('content') ||
        p.title.toLowerCase().includes('timeless') ||
        p.title.toLowerCase().includes('may clinic') ||
        Boolean(p.videoEmbedUrl)
      );
    }
    return true;
  });

  const activeProject = publishedProjects.find((p) => p.id === selectedProjectId);
  const videoInfo = activeProject ? getVideoEmbedInfo(activeProject.videoEmbedUrl) : null;

  const activeIndex = activeProject ? publishedProjects.findIndex((p) => p.id === activeProject.id) : -1;
  const prevProject = activeIndex > 0 ? publishedProjects[activeIndex - 1] : null;
  const nextProject = activeIndex >= 0 && activeIndex < publishedProjects.length - 1 ? publishedProjects[activeIndex + 1] : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveImageZoom(null);
      }
    };
    if (activeImageZoom) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageZoom]);

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-white/10">
        <div>
          <motion.button
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (selectedProjectId) {
                setSelectedProjectId(null);
              } else {
                setActiveSection('home');
              }
            }}
            className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-slate-400 hover:text-white transition-colors mb-2 min-h-[36px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{selectedProjectId ? 'Back to All Projects' : 'Back to Overview'}</span>
          </motion.button>
          
          <h1 className="text-2xl sm:text-4xl font-bold font-sans tracking-tight text-white">
            {selectedProjectId && activeProject ? activeProject.title : 'Featured Case Studies'}
          </h1>
        </div>

        {/* Categories Bar (Only in List View) */}
        {!selectedProjectId && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 max-w-full scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono-tech uppercase tracking-wider whitespace-nowrap transition-all min-h-[40px] flex items-center shrink-0 ${
                  activeCategoryFilter === cat
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* =================================================================== */}
      {/* VIEW A: PROJECT DETAIL VIEW                                         */}
      {/* =================================================================== */}
      {selectedProjectId && activeProject ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-12"
        >
          {/* Main Top Two-Column Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Hero Image or Video Player (cols 1-7) */}
            <div className="lg:col-span-7 space-y-4">
              {videoInfo ? (
                <div className="rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl">
                  <div className={`relative w-full ${videoInfo.isVertical ? 'aspect-[9/16] max-w-sm mx-auto' : 'aspect-video'}`}>
                    <iframe
                      src={videoInfo.embedUrl}
                      title={activeProject.title}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-3 bg-slate-900/80 border-t border-white/10 flex items-center justify-between text-xs font-mono-tech text-slate-400">
                    <span className="flex items-center gap-1.5 text-indigo-400">
                      <Video className="w-4 h-4" />
                      <span>Direct Video Presentation</span>
                    </span>
                    <span className="uppercase text-[10px]">{videoInfo.type} embed</span>
                  </div>
                </div>
              ) : (
                <div 
                  className="relative rounded-2xl overflow-hidden border border-white/15 bg-slate-900 shadow-2xl aspect-video group cursor-pointer"
                  onClick={() => setActiveImageZoom(activeProject.heroImage)}
                >
                  <img
                    src={activeProject.heroImage}
                    alt={activeProject.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <div className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* Gallery Thumbnails if available */}
              {activeProject.images && activeProject.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {activeProject.images.map((img, idx) => (
                    <div
                      key={img.id || idx}
                      onClick={() => setActiveImageZoom(img.url)}
                      className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-slate-900 cursor-pointer group shadow-sm hover:border-indigo-400/50 transition-colors"
                    >
                      <img
                        src={img.url}
                        alt={img.caption || `Gallery ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      {img.caption && (
                        <div className="absolute inset-x-0 bottom-0 p-1.5 bg-slate-950/80 backdrop-blur-sm text-[10px] font-sans text-slate-300 truncate">
                          {img.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Project Metadata & Overview (cols 8-12) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-slate-900/70 backdrop-blur-md border border-white/10 space-y-5">
                
                {/* Number & Category */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-2xl font-mono-tech font-bold text-indigo-400">
                    #{activeProject.projectNumber}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-tech uppercase tracking-wider text-slate-300">
                    {activeProject.category}
                  </span>
                </div>

                {/* Role */}
                <div>
                  <div className="text-xs font-mono-tech uppercase text-slate-400 mb-1">
                    Direct Role
                  </div>
                  <div className="text-sm font-sans font-semibold text-white">
                    {activeProject.role}
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <div className="text-xs font-mono-tech uppercase text-slate-400 mb-1">
                    Case Summary
                  </div>
                  <p className="text-sm font-sans text-slate-300 leading-relaxed">
                    {activeProject.summary}
                  </p>
                </div>

                {/* Tools & Technologies */}
                <div className="space-y-3 pt-2">
                  <div>
                    <div className="text-xs font-mono-tech uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Tools & Software</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.tools.map((t, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono-tech text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-mono-tech uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-blue-400" />
                      <span>Methodologies & Tech</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.technologies.map((t, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-xs font-mono-tech text-indigo-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* External Links */}
                {activeProject.projectLink && (
                  <div className="pt-4 border-t border-white/10">
                    <a
                      href={activeProject.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-mono-tech font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-md min-h-[44px]"
                    >
                      <span>Visit Live Deployment</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}

              </div>
            </div>

          </div>

          {/* Key Deliverables & Outcome Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Key Deliverables */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/50 border border-white/10 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h2 className="text-base font-bold font-sans text-white tracking-tight">
                  Strategic Deliverables & Specifications
                </h2>
              </div>
              <ul className="space-y-2.5">
                {activeProject.keyDeliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-sans text-slate-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Measurable Outcome */}
            {activeProject.outcome && (
              <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-indigo-950/30 to-blue-950/30 border border-indigo-500/30 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-indigo-500/20">
                  <Award className="w-4 h-4 text-indigo-400" />
                  <h2 className="text-base font-bold font-sans text-white tracking-tight">
                    Impact & Outcomes
                  </h2>
                </div>
                <p className="text-sm font-sans text-indigo-200 leading-relaxed">
                  {activeProject.outcome}
                </p>
              </div>
            )}

          </div>

          {/* Bottom Case Study Pagination / Back Buttons */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
            <button
              onClick={() => setSelectedProjectId(null)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-tech uppercase font-bold text-slate-300 hover:text-white transition-colors min-h-[46px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Projects</span>
            </button>

            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
              {prevProject ? (
                <button
                  onClick={() => {
                    setSelectedProjectId(prevProject.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-tech uppercase font-semibold text-slate-300 hover:text-white transition-colors min-h-[46px]"
                  title={`Previous: ${prevProject.title}`}
                >
                  <ChevronLeft className="w-4 h-4 text-indigo-400" />
                  <span className="hidden sm:inline truncate max-w-[140px]">{prevProject.title}</span>
                  <span className="sm:hidden">Prev Case</span>
                </button>
              ) : <div className="hidden sm:block" />}
              {nextProject && (
                <button
                  onClick={() => {
                    setSelectedProjectId(nextProject.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-500/30 text-xs font-mono-tech uppercase font-semibold text-indigo-200 hover:text-white transition-colors min-h-[46px]"
                  title={`Next: ${nextProject.title}`}
                >
                  <span className="hidden sm:inline truncate max-w-[140px]">{nextProject.title}</span>
                  <span className="sm:hidden">Next Case</span>
                  <ChevronRight className="w-4 h-4 text-indigo-400" />
                </button>
              )}
            </div>
          </div>

        </motion.div>
      ) : (
        /* =================================================================== */
        /* VIEW B: ALL PROJECTS GRID (Default)                                 */
        /* =================================================================== */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const hasVideo = Boolean(project.videoEmbedUrl);
            return (
              <motion.article
                key={project.id}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedProjectId(project.id)}
                className="group cursor-pointer rounded-2xl bg-slate-900/60 border border-white/10 hover:border-indigo-500/50 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-indigo-950/30 transition-all flex flex-col"
              >
                {/* Media Container */}
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
                  
                  {/* Category Chip */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-mono-tech font-bold uppercase text-white">
                    #{project.projectNumber} · {project.category.split('·')[0].trim()}
                  </div>

                  {/* Video Indicator if exists */}
                  {hasVideo && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-indigo-600/90 backdrop-blur-md border border-white/20 text-[10px] font-mono-tech font-bold uppercase text-white flex items-center gap-1 shadow-md">
                      <Play className="w-3 h-3 fill-white" />
                      <span>Video Available</span>
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h2 className="text-xl font-bold font-sans text-white group-hover:text-indigo-300 transition-colors tracking-tight mb-2">
                      {project.title}
                    </h2>
                    <p className="text-xs font-mono-tech text-slate-400 mb-3">
                      Role: <span className="text-slate-200">{project.role}</span>
                    </p>
                    <p className="text-xs text-slate-300 font-sans line-clamp-3 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Tools Tags */}
                  <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                    {project.tools.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono-tech text-slate-300">
                        {t}
                      </span>
                    ))}
                    {project.tools.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] font-mono-tech text-slate-400">
                        +{project.tools.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Card Action Link */}
                  <div className="pt-2 flex items-center justify-between text-xs font-mono-tech font-bold text-slate-300 group-hover:text-indigo-400">
                    <span>Inspect Case Study</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {activeImageZoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImageZoom(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl p-4 flex items-center justify-center cursor-zoom-out"
          >
            <div className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/20">
              <img
                src={activeImageZoom}
                alt="Enlarged case asset"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setActiveImageZoom(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white border border-white/20"
                aria-label="Close zoomed image"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Projects;
