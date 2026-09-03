import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ArrowLeft, 
  Sparkles, 
  Cpu, 
  Palette, 
  Code2, 
  Bot, 
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Terminal,
  Layers,
  FileVideo,
  Mic,
  Layout,
  Database
} from 'lucide-react';
import { SkillItem } from '../types';

const categoryMeta: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; color: string; gradient: string; label: string; description: string }
> = {
  Design: { 
    icon: Palette, 
    color: 'text-violet-400 border-violet-500/30 bg-violet-950/40', 
    gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
    label: 'Design',
    description: 'Interface design, brand identity systems, typography hierarchies & high-fidelity interactive prototypes.',
  },
  Development: { 
    icon: Code2, 
    color: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40', 
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    label: 'Development',
    description: 'Modern component architectures, strict TypeScript patterns, cloud databases & authentication systems.',
  },
  'AI & Content': { 
    icon: Bot, 
    color: 'text-indigo-400 border-indigo-500/30 bg-indigo-950/40', 
    gradient: 'from-indigo-500/20 via-blue-500/10 to-transparent',
    label: 'AI & Content',
    description: 'Calibrated master prompt engineering, high-converting video scriptwriting & bilingual audio narration.',
  },
};

export const SkillsView: React.FC = () => {
  const { skills, projects, setActiveSection, setSelectedProjectId } = usePortfolio();
  const [selectedTab, setSelectedTab] = useState<string>('ALL');
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null);

  const categories = ['ALL', 'Design', 'Development', 'AI & Content'];

  // Normalize legacy categories if any
  const normalizedSkills: SkillItem[] = skills.map((s) => {
    let cat = s.category;
    if (cat === 'DESIGN' || cat === 'Creative' || cat === 'CREATIVE') {
      if (s.name.toLowerCase().includes('voiceover') || s.name.toLowerCase().includes('script') || s.name.toLowerCase().includes('prompt')) {
        cat = 'AI & Content';
      } else {
        cat = 'Design';
      }
    } else if (cat === 'WEB') {
      cat = 'Development';
    } else if (cat === 'AI / TECHNOLOGY') {
      cat = 'AI & Content';
    }
    return { ...s, category: cat };
  });

  const filteredSkills = normalizedSkills.filter((s) => {
    if (selectedTab === 'ALL') return true;
    return s.category === selectedTab;
  });

  // Group by the 3 distinct pillars
  const designSkills = normalizedSkills.filter((s) => s.category === 'Design');
  const devSkills = normalizedSkills.filter((s) => s.category === 'Development');
  const aiContentSkills = normalizedSkills.filter((s) => s.category === 'AI & Content');

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="mb-10 pb-6 border-b border-white/5">
        <button
          onClick={() => setActiveSection('home')}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-mono-tech tracking-wider uppercase mb-3 transition-colors active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-indigo-400" />
          <span>Return to Orbit Center</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-mono-tech tracking-wider uppercase mb-2">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>THREE-PILLAR COMPETENCY MATRIX</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Design · Development · AI & Content
            </h1>
            <p className="text-sm text-neutral-400 font-sans mt-1 max-w-2xl">
              A structured technical and creative matrix across user experience, modern web engineering, and generative AI content workflows.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-[#141418] p-1.5 rounded-xl border border-white/5 overflow-x-auto max-w-full scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedTab(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono-tech tracking-wider uppercase transition-all whitespace-nowrap min-h-[38px] flex items-center shrink-0 ${
                  selectedTab === cat
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Structured 3-Pillar Overview (When ALL selected) */}
      {selectedTab === 'ALL' ? (
        <div className="space-y-12">
          
          {/* PILLAR 1: DESIGN */}
          <section className="rounded-3xl bg-[#121217] border border-violet-500/20 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-950/60 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                    Design
                  </h2>
                  <p className="text-xs text-neutral-400 font-sans">
                    Figma · UI/UX · Visual Branding · Graphic Design
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-violet-950/50 border border-violet-500/30 text-violet-300 text-xs font-mono-tech uppercase">
                {designSkills.length} Core Competencies
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {designSkills.map((skill) => renderSkillCard(skill))}
            </div>
          </section>

          {/* PILLAR 2: DEVELOPMENT */}
          <section className="rounded-3xl bg-[#121217] border border-cyan-500/20 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                    Development
                  </h2>
                  <p className="text-xs text-neutral-400 font-sans">
                    React · Vite · TypeScript · Tailwind CSS · Firebase · Express
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono-tech uppercase">
                {devSkills.length} Technologies
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {devSkills.map((skill) => renderSkillCard(skill))}
            </div>
          </section>

          {/* PILLAR 3: AI & CONTENT */}
          <section className="rounded-3xl bg-[#121217] border border-indigo-500/20 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                    AI & Content
                  </h2>
                  <p className="text-xs text-neutral-400 font-sans">
                    Prompt Engineering · Video Scripting · Voiceover / Audio Production
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-xs font-mono-tech uppercase">
                {aiContentSkills.length} Production Disciplines
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiContentSkills.map((skill) => renderSkillCard(skill))}
            </div>
          </section>

        </div>
      ) : (
        /* Tab Filtered Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => renderSkillCard(skill))}
        </div>
      )}

    </div>
  );

  function renderSkillCard(skill: SkillItem) {
    const meta = categoryMeta[skill.category] || categoryMeta['Design'];
    const Icon = meta.icon;
    const isHighlighted = highlightedSkill === skill.name;

    const connectedProjects = projects.filter((p) =>
      skill.relatedProjectIds?.includes(p.id)
    );

    return (
      <div
        key={skill.name}
        onMouseEnter={() => setHighlightedSkill(skill.name)}
        onMouseLeave={() => setHighlightedSkill(null)}
        className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
          isHighlighted
            ? 'bg-gradient-to-b from-[#181822] to-[#121217] border-indigo-500/50 shadow-xl shadow-indigo-950/20 -translate-y-1'
            : 'bg-[#141419] border-white/10 hover:border-white/20'
        }`}
      >
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono-tech tracking-wider uppercase border ${meta.color}`}>
              {skill.category}
            </span>
            <Icon className="w-4 h-4 text-neutral-400" />
          </div>

          <h3 className="text-lg font-display font-bold text-white mb-2 tracking-tight">
            {skill.name}
          </h3>

          {skill.description && (
            <p className="text-xs text-neutral-400 font-sans leading-relaxed mb-4">
              {skill.description}
            </p>
          )}
        </div>

        {connectedProjects.length > 0 && (
          <div className="pt-3 border-t border-white/5">
            <span className="text-[9px] font-mono-tech uppercase tracking-widest text-neutral-500 block mb-1.5">
              CASE STUDY PROOF:
            </span>
            <div className="flex flex-wrap gap-1">
              {connectedProjects.map((cp) => (
                <button
                  key={cp.id}
                  onClick={() => {
                    setSelectedProjectId(cp.id);
                    setActiveSection('projects');
                  }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-indigo-900/30 border border-white/10 hover:border-indigo-400/50 text-[10px] font-mono-tech text-neutral-300 hover:text-white transition-colors"
                >
                  <span className="truncate max-w-[120px]">{cp.title}</span>
                  <ArrowUpRight className="w-2.5 h-2.5 text-indigo-400" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
};
