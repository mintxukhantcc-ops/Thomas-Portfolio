import React, { useState } from 'react';
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
  Video,
  Sparkles
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

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-32 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
      
      {/* Top Header & Breadcrumb with standard typography & scaling */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#15151b]/70 backdrop-blur-md border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white text-xs font-mono-tech tracking-wider uppercase mb-3 transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-400" />
            <span>{selectedProjectId ? 'Back to All Projects' : 'Return to Orbit Center'}</span>
          </motion.button>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold text-white tracking-tight break-words">
            {selectedProjectId && activeProject ? activeProject.title : 'Featured Case Studies'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-1 max-w-2xl">
            {selectedProjectId && activeProject 
              ? `${activeProject.category} · Role: ${activeProject.role}` 
              : 'End-to-end creative campaigns, brand identities, video content systems, and full-stack web applications.'}
          </p>
        </div>

        {/* Category filter pills (only visible on list view) */}
        {!selectedProjectId && (
          <div className="flex flex-wrap items-center gap-1.5 bg-[#141418]/70 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-inner">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono-tech tracking-wider uppercase transition-all min-h-[40px] ${
                  activeCategoryFilter === cat
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* DETAIL CASE STUDY VIEW                                    */}
      {/* ========================================================= */}
      {activeProject ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10"
        >
          {/* Hero Visual Asset Container */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#121217]/70 backdrop-blur-md shadow-2xl">
            <div className="aspect-[16/9] sm:aspect-[21/9] w-full relative overflow-hidden bg-black/80">
              <img
                src={activeProject.heroImage}
                alt={activeProject.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-black/40" />
              
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono-tech uppercase tracking-wider text-indigo-300">
                  PROJECT {activeProject.projectNumber}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono-tech uppercase tracking-wider text-neutral-300">
                  {activeProject.category}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveImageZoom(activeProject.heroImage)}
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 p-3 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 backdrop-blur-md transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center shadow-lg"
                title="Expand View"
                aria-label="Expand image"
              >
                <Maximize2 className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Overview & Metadata Bar (p-6 mobile, p-8 desktop) */}
            <div className="p-6 sm:p-8 bg-[#14141a]/80 backdrop-blur-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <span className="text-[10px] font-mono-tech tracking-widest uppercase text-indigo-400 block mb-1">
                    PROJECT STRATEGY & SCOPE
                  </span>
                  <p className="text-sm sm:text-base text-white font-sans leading-relaxed">
                    {activeProject.summary}
                  </p>
                  {activeProject.outcome && (
                    <div className="mt-4 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/25">
                      <span className="text-[10px] font-mono-tech tracking-widest uppercase text-indigo-300 block mb-1">
                        MEASURABLE BUSINESS IMPACT
                      </span>
                      <p className="text-xs sm:text-sm text-neutral-200 font-sans leading-relaxed">
                        {activeProject.outcome}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4 border-t md:border-t-0 md:border-l border-white/10 md:pl-6 pt-4 md:pt-0">
                  <div>
                    <span className="text-[10px] font-mono-tech tracking-widest uppercase text-neutral-400 block mb-1">
                      MY ROLE
                    </span>
                    <p className="text-sm font-semibold text-white font-sans">
                      {activeProject.role}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-tech tracking-widest uppercase text-neutral-400 block mb-1">
                      TOOLS & TECHNOLOGIES
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.tools.concat(activeProject.technologies).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono-tech uppercase text-neutral-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  {activeProject.projectLink && (
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      href={activeProject.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black text-xs font-mono-tech uppercase tracking-wider font-bold hover:bg-neutral-200 transition-colors min-h-[48px] shadow-md"
                    >
                      <span>VIEW LIVE SITE / DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* RESPONSIVE EMBEDDED VIDEO CONTAINER (ASPECT-VIDEO & 9:16 REEL)    */}
          {/* ================================================================= */}
          {videoInfo && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-white/10 bg-[#14141a]/70 backdrop-blur-md p-6 sm:p-8 shadow-xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-mono-tech uppercase mb-2">
                    <Play className="w-3 h-3 fill-rose-400 text-rose-400" />
                    <span>
                      {videoInfo.type === 'youtube'
                        ? videoInfo.isVertical ? 'YOUTUBE SHORTS REEL' : 'YOUTUBE VIDEO SHOWCASE'
                        : videoInfo.type === 'tiktok' ? 'TIKTOK COMMERCIAL REEL' : 'EMBEDDED VIDEO PLAYER'}
                    </span>
                  </div>
                  <h3 className="text-xl font-sans font-bold text-white tracking-tight">
                    Campaign Commercial Video & Creative Reel
                  </h3>
                </div>
                {activeProject.videoEmbedUrl && (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    href={activeProject.videoEmbedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono-tech text-neutral-300 hover:text-white transition-colors border border-white/10 min-h-[44px]"
                  >
                    <Video className="w-3.5 h-3.5 text-rose-400" />
                    <span>Open on {videoInfo.type === 'youtube' ? 'YouTube' : videoInfo.type === 'tiktok' ? 'TikTok' : 'Web'}</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </motion.a>
                )}
              </div>

              {/* Responsive Video Player Embed Box */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-black/95 border border-white/10 flex justify-center items-center shadow-2xl">
                {videoInfo.isVertical ? (
                  /* Vertical Short-Form Aspect Ratio (TikTok / YouTube Shorts 9:16) */
                  <div className="w-full max-w-sm aspect-[9/16] py-3">
                    <iframe
                      src={videoInfo.embedUrl}
                      title={`${activeProject.title} Video Reel`}
                      className="w-full h-full rounded-xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  /* Standard 16:9 Landscape Aspect Ratio (aspect-video) */
                  <div className="w-full aspect-video">
                    <iframe
                      src={videoInfo.embedUrl}
                      title={`${activeProject.title} Video Showcase`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Deliverables Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-white/10 bg-[#141419]/70 backdrop-blur-md p-6 sm:p-8 shadow-xl"
          >
            <div className="mb-5">
              <span className="text-[10px] font-mono-tech tracking-widest uppercase text-indigo-400 block mb-1">
                EXECUTION BREAKDOWN
              </span>
              <h3 className="text-xl font-sans font-bold text-white tracking-tight">
                Key Deliverables Produced
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeProject.keyDeliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-xs sm:text-sm text-neutral-200 font-sans leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image Gallery Showcase */}
          {activeProject.images && activeProject.images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] font-mono-tech tracking-widest uppercase text-indigo-400 block mb-1">
                    VISUAL DELIVERABLES
                  </span>
                  <h3 className="text-xl font-sans font-bold text-white tracking-tight">
                    Deliverables & Interface Gallery ({activeProject.images.length})
                  </h3>
                </div>
                <span className="text-xs font-mono-tech text-neutral-400 hidden sm:inline">
                  CLICK TO EXPAND
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeProject.images.map((img) => (
                  <motion.div
                    key={img.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setActiveImageZoom(img.url)}
                    className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-[#121217]/70 backdrop-blur-md hover:border-white/25 transition-all shadow-lg"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                      <img
                        src={img.url}
                        alt={img.caption || 'Project visual'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      
                      <div className="absolute top-3 right-3 p-2.5 rounded-full bg-black/70 text-white border border-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity min-h-[40px] min-w-[40px] flex items-center justify-center">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                      
                      {img.type && (
                        <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/15 text-[9px] font-mono-tech uppercase text-neutral-300">
                          {img.type}
                        </div>
                      )}
                    </div>
                    {img.caption && (
                      <div className="p-4 bg-[#141419]/80 border-t border-white/5">
                        <p className="text-xs font-sans text-neutral-300">
                          {img.caption}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Bottom Actions */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedProjectId(null)}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#15151b]/70 backdrop-blur-md hover:bg-white/10 border border-white/10 text-xs font-mono-tech uppercase tracking-wider text-neutral-300 hover:text-white transition-all min-h-[48px]"
            >
              <ArrowLeft className="w-4 h-4 text-indigo-400" />
              <span>Back to All Case Studies</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveSection('contact')}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black text-xs font-mono-tech uppercase tracking-wider font-bold hover:bg-neutral-200 transition-all min-h-[48px] shadow-md"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Inquire About Similar Project</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

        </motion.div>
      ) : (
        /* ========================================================= */
        /* GALLERY GRID VIEW (With Staggered Scroll Reveal)          */
        /* ========================================================= */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (idx % 3) * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => setSelectedProjectId(proj.id)}
              className="group cursor-pointer rounded-2xl bg-[#141419]/70 backdrop-blur-md border border-white/10 overflow-hidden hover:border-white/20 transition-all shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                  <img
                    src={proj.heroImage}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141419] via-black/30 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono-tech tracking-wider uppercase text-neutral-300">
                      PROJECT {proj.projectNumber}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {proj.videoEmbedUrl && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-rose-950/80 backdrop-blur-md border border-rose-500/30 text-[9px] font-mono-tech uppercase text-rose-300">
                        <Play className="w-2.5 h-2.5 fill-rose-300 text-rose-300" />
                        <span>VIDEO</span>
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded bg-indigo-950/80 backdrop-blur-md border border-indigo-500/30 text-[9px] font-mono-tech uppercase text-indigo-300">
                      {proj.images.length} ASSETS
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <span className="text-[10px] font-mono-tech tracking-wider uppercase text-indigo-400 block mb-1.5">
                    {proj.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-sans font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1 mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans line-clamp-3 leading-relaxed mb-4">
                    {proj.summary}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {proj.tools.slice(0, 3).map((tool, idx2) => (
                      <span
                        key={idx2}
                        className="px-2.5 py-0.5 rounded bg-white/[0.03] border border-white/5 text-[9px] font-mono-tech text-neutral-400"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono-tech text-neutral-400 bg-white/[0.01]">
                <span className="truncate max-w-[150px]">{proj.role}</span>
                <span className="text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>VIEW CASE</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox Modal with AnimatePresence */}
      <AnimatePresence>
        {activeImageZoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImageZoom(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/20"
            >
              <img
                src={activeImageZoom}
                alt="Expanded view"
                className="max-w-full max-h-[85vh] object-contain"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setActiveImageZoom(null)}
                className="absolute top-4 right-4 p-3 rounded-full bg-black/70 text-white hover:bg-black border border-white/20 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center shadow-xl"
                title="Close modal"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Projects;
