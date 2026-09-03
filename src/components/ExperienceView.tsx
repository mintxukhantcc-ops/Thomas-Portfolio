import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ArrowLeft, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Briefcase, 
  ArrowRight 
} from 'lucide-react';

export const ExperienceView: React.FC = () => {
  const { experience, setActiveSection } = usePortfolio();

  const publishedExperience = experience
    .filter((e) => e.published)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 sm:px-6 max-w-5xl mx-auto space-y-12">
      
      {/* Top Header */}
      <div className="pb-6 border-b border-white/5">
        <button
          onClick={() => setActiveSection('home')}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-mono-tech tracking-wider uppercase mb-3 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-indigo-400" />
          <span>Return to Orbit Center</span>
        </button>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono-tech tracking-widest uppercase text-indigo-400 block mb-1">
              CHRONOLOGY & TRAJECTORY
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Professional Evolution
            </h1>
            <p className="text-sm text-neutral-400 font-sans mt-1">
              A track record bridging digital content strategy, creative direction, and technical web development.
            </p>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono-tech">
            <span>Verified Roles</span>
          </div>
        </div>
      </div>

      {/* Interactive Spatial Timeline */}
      <div className="relative pl-6 sm:pl-10 space-y-10 before:content-[''] before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500/40 before:via-blue-500/20 before:to-transparent">
        {publishedExperience.map((item, idx) => (
          <div key={item.id} className="relative group">
            
            {/* Timeline Orbital Node Indicator */}
            <div className="absolute -left-[30px] sm:-left-[38px] top-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-[#121217] border-2 border-indigo-400 shadow-md shadow-indigo-900/40 group-hover:scale-125 transition-transform">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>

            {/* Timeline Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141419] border border-white/10 group-hover:border-white/20 transition-all shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/5">
                <div>
                  <h2 className="text-lg sm:text-xl font-display font-bold text-white tracking-tight">
                    {item.role}
                  </h2>
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-indigo-400 mt-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{item.organizationOrFocus}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-tech text-neutral-300">
                  <Calendar className="w-3 h-3 text-neutral-400" />
                  <span>{item.period}</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
                {item.description}
              </p>

              {item.highlights && item.highlights.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-400 block">
                    KEY ACHIEVEMENTS & CONTRIBUTIONS
                  </span>
                  <div className="space-y-2">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Navigation */}
      <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setActiveSection('home')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-tech uppercase text-neutral-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Orbit Center</span>
        </button>
        <button
          onClick={() => setActiveSection('contact')}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-xs font-mono-tech uppercase font-bold hover:bg-neutral-200 transition-colors"
        >
          <span>Connect Regarding Opportunities</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
