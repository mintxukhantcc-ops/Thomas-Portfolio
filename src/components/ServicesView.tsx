import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Video, 
  Mic2, 
  Share2, 
  Code2 
} from 'lucide-react';

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  '01': Share2,
  '02': Video,
  '03': Mic2,
  '04': Layers,
  '05': Code2,
};

export const ServicesView: React.FC = () => {
  const { services, setActiveSection } = usePortfolio();
  const [activeServiceId, setActiveServiceId] = useState<string>(services[0]?.id || '');

  const publishedServices = services.filter((s) => s.published).sort((a, b) => a.order - b.order);

  const selectedService = publishedServices.find((s) => s.id === activeServiceId) || publishedServices[0];

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="mb-10 pb-6 border-b border-white/5">
        <button
          onClick={() => setActiveSection('home')}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-mono-tech tracking-wider uppercase mb-3 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-indigo-400" />
          <span>Return to Orbit Center</span>
        </button>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Services & Capabilities
            </h1>
            <p className="text-sm text-neutral-400 font-sans mt-1">
              End-to-end creative execution and technical architecture tailored for ambitious brands.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-mono-tech">
            <Sparkles className="w-3.5 h-3.5" />
            <span>5 Core Disciplines</span>
          </div>
        </div>
      </div>

      {/* Mobile Quick Service Selector (< lg) */}
      <div className="lg:hidden mb-6">
        <div className="text-[10px] font-mono-tech uppercase tracking-widest text-indigo-400 mb-2 px-1">
          SELECT DISCIPLINE SPECIFICATION
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
          {publishedServices.map((srv) => {
            const Icon = serviceIcons[srv.number] || Layers;
            const isSelected = selectedService.id === srv.id;
            return (
              <button
                key={srv.id}
                onClick={() => setActiveServiceId(srv.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-left shrink-0 transition-all min-h-[44px] ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-950/50 font-bold'
                    : 'bg-[#141419] border-white/10 text-neutral-300 hover:bg-white/5 active:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs font-mono-tech uppercase tracking-wider whitespace-nowrap">
                  #{srv.number} · {srv.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Service Selector & Detailed Visual Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Quick Interactive Service List (Hidden on mobile to save scroll depth, shown on desktop) */}
        <div className="hidden lg:block lg:col-span-5 space-y-3">
          {publishedServices.map((srv) => {
            const Icon = serviceIcons[srv.number] || Layers;
            const isSelected = selectedService.id === srv.id;
            return (
              <button
                key={srv.id}
                onClick={() => setActiveServiceId(srv.id)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                  isSelected
                    ? 'bg-gradient-to-r from-white/[0.08] to-indigo-950/30 border-indigo-500/40 shadow-xl'
                    : 'bg-[#141419] border-white/5 hover:border-white/20'
                }`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md'
                      : 'bg-white/5 text-neutral-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono-tech tracking-wider uppercase text-neutral-400">
                      SERVICE {srv.number}
                    </span>
                    <span
                      className={`text-[10px] font-mono-tech tracking-wider uppercase ${
                        isSelected ? 'text-indigo-400' : 'text-neutral-500'
                      }`}
                    >
                      {isSelected ? 'ACTIVE VIEW' : 'SELECT →'}
                    </span>
                  </div>
                  <h3
                    className={`text-sm sm:text-base font-display font-semibold transition-colors ${
                      isSelected ? 'text-white' : 'text-neutral-300'
                    }`}
                  >
                    {srv.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans line-clamp-2 mt-1.5 leading-relaxed">
                    {srv.shortDescription}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep Visual Presentation of Selected Service */}
        <div className="lg:col-span-7">
          <div className="lg:sticky lg:top-24 rounded-3xl bg-[#141419] border border-white/10 p-5 sm:p-8 shadow-2xl space-y-6">
            
            {/* Service Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-mono-tech tracking-widest uppercase text-indigo-400 block mb-1">
                  DETAILED SERVICE SPECIFICATION {selectedService.number}
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  {selectedService.title}
                </h2>
              </div>
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-tech text-neutral-300">
                {selectedService.keyFocus}
              </div>
            </div>

            {/* Strategic Overview */}
            <div>
              <span className="text-[10px] font-mono-tech tracking-widest uppercase text-neutral-400 block mb-2">
                STRATEGIC APPROACH
              </span>
              <p className="text-sm sm:text-base text-neutral-200 font-sans leading-relaxed">
                {selectedService.fullDescription}
              </p>
            </div>

            {/* Structured Deliverables */}
            <div>
              <span className="text-[10px] font-mono-tech tracking-widest uppercase text-indigo-400 block mb-3">
                WHAT YOU RECEIVE (KEY DELIVERABLES)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedService.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-neutral-200 font-sans">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono-tech text-neutral-400 block">
                  Ready to activate this service?
                </span>
                <span className="text-sm font-semibold text-white">
                  Custom scope & rapid turnaround available.
                </span>
              </div>
              <button
                onClick={() => setActiveSection('contact')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black text-xs font-mono-tech tracking-wider uppercase font-bold hover:bg-neutral-200 transition-all active:scale-95 shadow-lg shadow-white/5 min-h-[48px]"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
