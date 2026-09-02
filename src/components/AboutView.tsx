import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
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
  Gauge
} from 'lucide-react';

const philosophySteps = [
  {
    step: '01',
    title: 'DISCOVER',
    icon: Target,
    desc: 'Audit brand tone, audience intent, core pain points, and technical constraints.',
  },
  {
    step: '02',
    title: 'STRATEGIZE',
    icon: Compass,
    desc: 'Establish content pillars, visual directions, information architecture, and timelines.',
  },
  {
    step: '03',
    title: 'CREATE',
    icon: Wand2,
    desc: 'Scripting, bilingual voiceover recording, high-impact copy, and Figma UI layouts.',
  },
  {
    step: '04',
    title: 'BUILD',
    icon: Terminal,
    desc: 'Mobile-first clean frontend development, cloud backend wiring, and QA testing.',
  },
  {
    step: '05',
    title: 'OPTIMIZE',
    icon: Gauge,
    desc: 'Review viewer retention metrics, ad policy feedback, usability and performance.',
  },
];

export const AboutView: React.FC = () => {
  const { profile, setActiveSection } = usePortfolio();

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
              ABOUT & ETHOS
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              {profile.aboutHeadline}
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono-tech">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            <span>{profile.location}</span>
          </div>
        </div>
      </div>

      {/* Visual Storytelling Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Editorial Portrait Anchor */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#121217] shadow-2xl p-2 group">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-black/60 relative">
              <img
                src={profile.portraitUrl}
                alt={profile.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[10px] font-mono-tech tracking-widest uppercase text-indigo-400 block mb-1">
                  MIN THU KHANT (THOMAS)
                </span>
                <p className="text-sm font-display font-bold text-white">
                  &ldquo;{profile.slogan}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Narrative Positioning */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#141419] border border-white/10 shadow-xl space-y-4">
            <span className="text-xs font-mono-tech tracking-widest uppercase text-indigo-400 block">
              THE CONVERGENCE
            </span>
            <div className="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed space-y-4 whitespace-pre-line">
              {profile.aboutBody}
            </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#141419] border border-white/5">
              <span className="text-[10px] font-mono-tech tracking-widest uppercase text-indigo-400 block mb-1">
                CREATIVE DIRECTION
              </span>
              <p className="text-sm text-neutral-300 font-sans">
                Narrative arcs, bilingual vocal emotion, high-retention video rhythm, and ad-compliant strategy.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#141419] border border-white/5">
              <span className="text-[10px] font-mono-tech tracking-widest uppercase text-blue-400 block mb-1">
                TECHNICAL EXECUTION
              </span>
              <p className="text-sm text-neutral-300 font-sans">
                Mobile-first responsive engineering, Firebase database architecture, and custom administrative controls.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* WORKING PHILOSOPHY SECTION */}
      {/* ========================================================= */}
      <div className="rounded-3xl bg-[#121217] border border-white/10 p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="max-w-2xl">
          <span className="text-[10px] font-mono-tech tracking-widest uppercase text-indigo-400 block mb-1">
            OPERATIONAL METHODOLOGY
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            {profile.philosophyHeadline}
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-sans mt-2 italic">
            &ldquo;{profile.philosophySub}&rdquo;
          </p>
        </div>

        {/* 5-Step Process Sequence */}
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

        {/* Ready to connect banner */}
        <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-display font-bold text-white">
              Ready to bring strategic logic and creative spark to your project?
            </h4>
            <p className="text-xs text-neutral-400 font-sans mt-0.5">
              Available for bespoke contracts and long-term retainer engagements.
            </p>
          </div>
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
