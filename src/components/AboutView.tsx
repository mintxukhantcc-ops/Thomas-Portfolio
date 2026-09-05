import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { NarrativeAct } from '../types';
import { 
  ArrowLeft, 
  Sparkles, 
  MapPin, 
  Compass, 
  CheckCircle2, 
  ArrowRight,
  Target,
  BrainCircuit,
  Wand2,
  Terminal,
  Gauge,
  BookOpen,
  Calendar,
  Layers,
  Award,
  ChevronRight,
  Lightbulb,
  Clock,
  Briefcase
} from 'lucide-react';

const philosophySteps = [
  {
    step: '01',
    title: 'DISCOVER & AUDIT',
    icon: Target,
    desc: 'Audit brand tone, audience intent, healthcare regulations, and technical boundaries.',
  },
  {
    step: '02',
    title: 'STRATEGIZE & MAP',
    icon: Compass,
    desc: 'Establish content pillars, call sheet logistics, information architecture, and prompt syntax.',
  },
  {
    step: '03',
    title: 'CREATE & DIRECT',
    icon: Wand2,
    desc: 'Script speed-ramp visual cues, record bilingual voiceover narration, and prototype in Figma.',
  },
  {
    step: '04',
    title: 'BUILD & WIRE',
    icon: Terminal,
    desc: 'Engineer mobile-first React web portals, configure Firebase RBAC, and test performance.',
  },
  {
    step: '05',
    title: 'OPTIMIZE & SCALE',
    icon: Gauge,
    desc: 'Review viewer retention curves, Meta ad compliance feedback, and client conversion velocity.',
  },
];

export const AboutView: React.FC = () => {
  const { profile, setActiveSection, setSelectedProjectId } = usePortfolio();
  const acts = profile.narrativeActs || [];
  const [selectedActIndex, setSelectedActIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'chapters' | 'continuous'>('chapters');

  const currentAct = acts[selectedActIndex] || acts[0];

  const jumpToProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActiveSection('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      
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
              THE FULL NARRATIVE BIOGRAPHY & ETHOS
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              {profile.aboutHeadline}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono-tech">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              <span>{profile.location}</span>
            </div>
            {profile.birthDate && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono-tech">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>Born: {profile.birthDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Visual Storytelling Hero: Portrait Anchor & Synthesis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Editorial Portrait Anchor */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#121217] shadow-2xl p-2 group sticky top-28">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-black/60 relative">
              <img
                src={profile.portraitUrl}
                alt={profile.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 space-y-2">
                <span className="text-[10px] font-mono-tech tracking-widest uppercase text-indigo-400 block">
                  MIN THU KHANT (THOMAS) · YANGON, MYANMAR
                </span>
                <p className="text-base font-display font-bold text-white leading-snug">
                  &ldquo;{profile.slogan}&rdquo;
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono-tech text-neutral-400">
                  <span>Aesthetic Healthcare & Web Tech</span>
                  <span className="text-emerald-400">● Available Q3/Q4</span>
                </div>
              </div>
            </div>

            {/* Quick Credentials Card */}
            <div className="p-4 space-y-3 mt-2 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-neutral-400">Core Identity:</span>
                <span className="text-white font-semibold">Min Thu Khant (Thomas)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-neutral-400">Birthdate:</span>
                <span className="text-neutral-200">March 19, 2000 (Yangon)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-neutral-400">Key Role:</span>
                <span className="text-indigo-300">PA & Content Mgr to Dr. Shumanyee</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-neutral-400">Slogan:</span>
                <span className="text-emerald-300 italic">"This is logically playing the creativity."</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Narrative Executive Synthesis */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#141419] border border-white/10 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-tech tracking-widest uppercase text-indigo-400">
                EXECUTIVE OVERVIEW
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-mono-tech">
                Four Acts of Evolution
              </span>
            </div>

            <div className="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed space-y-4 whitespace-pre-line">
              {profile.aboutBody}
            </div>

            {/* Feature Tags */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
              {profile.featureTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-tech text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick 3-Pillar Strengths Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#141419] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono-tech tracking-widest uppercase text-indigo-400 block">
                HEALTHCARE STRATEGY
              </span>
              <h4 className="text-sm font-bold text-white">Aesthetic Direction</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Talent management, call sheets, speed-ramp tour videos & doctor scripts.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#141419] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono-tech tracking-widest uppercase text-blue-400 block">
                FULL-STACK & UI/UX
              </span>
              <h4 className="text-sm font-bold text-white">Modern Web Engineering</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                React, Vite, Express, and Firebase RBAC with Figma design tokens.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#141419] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono-tech tracking-widest uppercase text-purple-400 block">
                GENERATIVE AI
              </span>
              <h4 className="text-sm font-bold text-white">Prompt Engineering</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Structured master prompt syntax for 3D marks, products & architecture.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* THE FOUR ACTS OF THOMAS (MIN THU KHANT)                   */}
      {/* ========================================================= */}
      <div className="rounded-3xl bg-[#121217] border border-white/10 p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <span className="text-[10px] font-mono-tech tracking-widest uppercase text-indigo-400 block mb-1">
              CHRONOLOGICAL NARRATIVE CHAPTERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              The Four Acts of Journey
            </h2>
            <p className="text-sm text-neutral-400 font-sans mt-1">
              Follow Thomas's evolution from student vocal performance to aesthetic brand architecture and full-stack AI engineering.
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-tech">
            <button
              onClick={() => setViewMode('chapters')}
              className={`px-3 py-1 rounded-full transition-all ${
                viewMode === 'chapters'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Chapter Tabs
            </button>
            <button
              onClick={() => setViewMode('continuous')}
              className={`px-3 py-1 rounded-full transition-all ${
                viewMode === 'continuous'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Acts Unfolded
            </button>
          </div>
        </div>

        {viewMode === 'chapters' ? (
          /* TABBED CHAPTER VIEW */
          <div className="space-y-8">
            {/* Act Navigation Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {acts.map((act, idx) => (
                <button
                  key={act.actNumber}
                  onClick={() => setSelectedActIndex(idx)}
                  className={`text-left p-4 rounded-2xl border transition-all ${
                    selectedActIndex === idx
                      ? 'bg-[#1b1b22] border-indigo-500/60 shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500/40'
                      : 'bg-[#141419] border-white/5 hover:border-white/20 text-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono-tech mb-1">
                    <span className={selectedActIndex === idx ? 'text-indigo-400 font-bold' : 'text-neutral-500'}>
                      {act.actNumber}
                    </span>
                    <span className="text-[11px] text-neutral-400">{act.period}</span>
                  </div>
                  <h3 className={`text-sm font-display font-bold truncate ${selectedActIndex === idx ? 'text-white' : 'text-neutral-300'}`}>
                    {act.title}
                  </h3>
                  <p className="text-[11px] text-neutral-400 font-sans line-clamp-1 mt-1">
                    {act.summary}
                  </p>
                </button>
              ))}
            </div>

            {/* Active Chapter Details */}
            {currentAct && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#15151c] border border-white/10 shadow-xl space-y-6 animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono-tech font-bold uppercase">
                        {currentAct.actNumber}
                      </span>
                      <span className="text-xs font-mono-tech text-neutral-400">
                        {currentAct.period}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                      {currentAct.title}
                    </h3>
                  </div>

                  {currentAct.keyEnvironments && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {currentAct.keyEnvironments.map((env, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 text-[11px] font-mono-tech text-neutral-300 border border-white/5">
                          {env}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Narrative Text */}
                <div className="text-sm sm:text-base text-neutral-200 font-sans leading-relaxed whitespace-pre-line bg-black/20 p-5 rounded-2xl border border-white/5">
                  {currentAct.fullNarrative}
                </div>

                {/* Key Milestones */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono-tech uppercase tracking-widest text-indigo-400 block">
                    KEY MILESTONES & CORE CONTRIBUTIONS
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentAct.milestones.map((milestone, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-neutral-300 font-sans"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags Footer */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
                  {currentAct.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-white/5 text-neutral-400 text-[11px] font-mono-tech"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* CONTINUOUS UNFOLDED VIEW */
          <div className="space-y-8">
            {acts.map((act) => (
              <div
                key={act.actNumber}
                className="p-6 sm:p-8 rounded-3xl bg-[#15151c] border border-white/10 shadow-xl space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono-tech font-bold uppercase">
                        {act.actNumber}
                      </span>
                      <span className="text-xs font-mono-tech text-neutral-400">
                        {act.period}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                      {act.title}
                    </h3>
                  </div>
                  {act.keyEnvironments && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {act.keyEnvironments.map((env, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 text-[11px] font-mono-tech text-neutral-300 border border-white/5">
                          {env}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-sm sm:text-base text-neutral-200 font-sans leading-relaxed whitespace-pre-line bg-black/20 p-5 rounded-2xl border border-white/5">
                  {act.fullNarrative}
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono-tech uppercase tracking-widest text-indigo-400 block">
                    KEY MILESTONES
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {act.milestones.map((milestone, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-neutral-300 font-sans"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* WORKING PHILOSOPHY & OPERATIONAL METHODOLOGY              */}
      {/* ========================================================= */}
      <div className="rounded-3xl bg-[#121217] border border-white/10 p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="max-w-3xl space-y-2">
          <span className="text-[10px] font-mono-tech tracking-widest uppercase text-indigo-400 block">
            CORE PHILOSOPHY & SLOGAN
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            &ldquo;{profile.slogan}&rdquo;
          </h2>
          <p className="text-sm sm:text-base text-indigo-200/90 font-sans italic pt-1">
            &ldquo;{profile.philosophySub}&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed pt-2">
            First formulated during commercial account management at O'Ze Marketing Agency and rigorous technical training at the Crossworks Bootcamp. Thomas observed that unchecked creativity easily loses commercial traction without structural discipline—while pure analytical logic remains sterile without artistic resonance. True impact occurs when strategic logic directs creative craft.
          </p>
        </div>

        {/* 5-Step Process Sequence */}
        <div className="space-y-4">
          <span className="text-[10px] font-mono-tech tracking-widest uppercase text-neutral-400 block">
            THE 5-PHASE OPERATIONAL EXECUTION ENGINE
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {philosophySteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="relative p-5 rounded-2xl bg-[#16161c] border border-white/5 hover:border-indigo-500/30 transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono-tech font-bold text-indigo-400">
                      {step.step}
                    </span>
                    <div className="p-1.5 rounded-lg bg-white/5 text-neutral-400 group-hover:text-indigo-300 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-display font-bold text-white mb-2 tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    {step.desc}
                  </p>
                  {idx < philosophySteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-neutral-600 text-xs font-mono-tech">
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* STRATEGIC FUTURE OUTLOOK (2026 & BEYOND)                  */}
      {/* ========================================================= */}
      {profile.futureGoals && profile.futureGoals.length > 0 && (
        <div className="rounded-3xl bg-[#121217] border border-white/10 p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono-tech tracking-widest uppercase text-emerald-400 block mb-1">
              FUTURE OUTLOOK · 2026 & BEYOND
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Next Phase Strategic Focus
            </h2>
            <p className="text-sm text-neutral-400 font-sans mt-1">
              The road ahead: scaling digital systems, synthetic AI production, and executive healthcare consulting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profile.futureGoals.map((goal, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#16161c] border border-white/5 hover:border-white/10 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono-tech uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 text-indigo-300">
                      {goal.area}
                    </span>
                    <span className="text-xs font-mono-tech text-neutral-500">0{idx + 1}</span>
                  </div>
                  <h3 className="text-base font-display font-bold text-white">
                    {goal.title}
                  </h3>
                  <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                    {goal.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-1.5">
                  {goal.keyInitiatives.map((init, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-neutral-400 font-sans">
                      <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0" />
                      <span>{init}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Navigation & Call to Action */}
      <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-base font-display font-bold text-white">
            Ready to bring strategic logic and creative spark to your brand?
          </p>
          <p className="text-xs text-neutral-400 font-sans mt-0.5">
            Available for select personal assistant engagements, healthcare launches, and full-stack web builds.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveSection('projects')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 text-xs font-mono-tech uppercase transition-colors"
          >
            <span>Explore Projects</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveSection('contact')}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-xs font-mono-tech uppercase font-bold hover:bg-neutral-200 transition-all active:scale-95"
          >
            <span>Start Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
