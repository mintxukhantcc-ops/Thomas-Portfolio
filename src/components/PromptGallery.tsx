import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Terminal, 
  Sliders, 
  Layers, 
  Eye, 
  ExternalLink,
  Cpu,
  Bookmark,
  Info
} from 'lucide-react';
import { initialPrompts } from '../data/initialData';
import { PromptItem } from '../types';

interface PromptGalleryProps {
  prompts?: PromptItem[];
}

export const PromptGallery: React.FC<PromptGalleryProps> = ({
  prompts = initialPrompts,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeModalPrompt, setActiveModalPrompt] = useState<PromptItem | null>(null);

  const categories = ['All', '3D Logo', 'Skincare Commercial', 'Aesthetic Architecture', 'Product Render'];

  const filteredPrompts = selectedCategory === 'All'
    ? prompts
    : prompts.filter((p) => p.category === selectedCategory);

  const handleCopyPrompt = (prompt: PromptItem) => {
    navigator.clipboard.writeText(prompt.promptText);
    setCopiedId(prompt.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2200);
  };

  const getPlatformBadgeColor = (platform: string) => {
    switch (platform) {
      case 'Midjourney v6':
        return 'bg-violet-950/70 border-violet-500/40 text-violet-300';
      case 'Stable Diffusion XL':
        return 'bg-blue-950/70 border-blue-500/40 text-blue-300';
      case 'Gemini Imagen 3':
        return 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300';
      default:
        return 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300';
    }
  };

  return (
    <div className="w-full">
      
      {/* Header & Category Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-mono-tech tracking-wider uppercase mb-2">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>GENERATIVE AI & PROMPT SYNTHESIS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Master Prompt Engineering Showcase
          </h2>
          <p className="text-sm text-neutral-400 font-sans mt-1 max-w-2xl">
            Calibrated production prompts for luxury brand identities, photorealistic skincare product photography, and architectural moodboards. Complete with aspect ratios, token weights, and render engines.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono-tech tracking-wider uppercase transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-white/25'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPrompts.map((item) => {
          const isCopied = copiedId === item.id;
          return (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl bg-[#131318] border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 shadow-xl group"
            >
              {/* Card Image Banner */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                <img
                  src={item.sampleImageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131318] via-black/40 to-transparent" />

                {/* Floating Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-mono-tech font-bold uppercase tracking-wider border shadow-lg backdrop-blur-md ${getPlatformBadgeColor(
                        item.platform
                      )}`}
                    >
                      {item.platform}
                    </span>
                    <span className="px-2 py-1 rounded-md text-[10px] font-mono-tech uppercase tracking-wider bg-black/70 border border-white/15 text-neutral-300 backdrop-blur-md">
                      AR {item.aspectRatio}
                    </span>
                  </div>

                  <span className="px-2 py-1 rounded-md text-[10px] font-mono-tech uppercase tracking-wider bg-white/10 border border-white/20 text-neutral-200 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                {/* Bottom Card Title Overlay */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-indigo-300 transition-colors drop-shadow-md">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Card Content & Prompt Terminal */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                
                {/* Prompt Terminal Box */}
                <div className="mb-4">
                  <div className="flex items-center justify-between gap-2 px-3 py-1.5 bg-[#0a0a0d] rounded-t-xl border border-white/10 border-b-0 text-[10px] font-mono-tech text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <Terminal className="w-3 h-3 text-indigo-400" />
                      <span>SYNTHESIS PROMPT INPUT</span>
                    </div>
                    <span className="text-neutral-500">RAW TOKEN SPECIFICATION</span>
                  </div>
                  
                  <div className="relative p-3.5 bg-[#08080a] border border-white/10 rounded-b-xl overflow-hidden font-mono-tech text-xs text-neutral-300 leading-relaxed group/box">
                    <p className="line-clamp-4 select-all text-neutral-200 font-normal">
                      {item.promptText}
                    </p>
                    
                    {/* Copy Button Inside Terminal */}
                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[10px] text-neutral-500 font-mono-tech">
                        Aspect: {item.aspectRatio}
                      </span>
                      <button
                        onClick={() => handleCopyPrompt(item)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono-tech uppercase tracking-wider font-semibold transition-all active:scale-95 ${
                          isCopied
                            ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                        }`}
                        title="Copy exact prompt text to clipboard"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>COPIED PROMPT</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>COPY PROMPT</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Parameters Chips */}
                <div className="mb-4">
                  <div className="flex items-center gap-1 text-[10px] font-mono-tech uppercase text-neutral-400 mb-1.5">
                    <Sliders className="w-3 h-3 text-indigo-400" />
                    <span>TUNING PARAMETERS & SHADERS</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.parameters.map((param, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[10px] font-mono-tech text-neutral-300"
                      >
                        {param}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Negative Prompt & Engineering Notes */}
                {item.notes && (
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-neutral-400 font-sans flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                    <p className="line-clamp-2 leading-relaxed">
                      {item.notes}
                    </p>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

      {/* Prompt Strategy Note Callout */}
      <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/30 via-[#14141a] to-blue-950/30 border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono-tech uppercase tracking-widest text-indigo-400 block mb-1">
            METHODOLOGY
          </span>
          <h4 className="text-lg font-display font-bold text-white mb-1">
            Prompt Engineering As Creative Direction
          </h4>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
            Every prompt in this gallery is calibrated with physical optics (focal lengths, f-stops), volumetric lighting physics (caustics, rim light), and material shaders to achieve commercial-grade outputs without unpredictable artifacts.
          </p>
        </div>

        <button
          onClick={() => {
            const allPromptsText = filteredPrompts
              .map((p) => `// ${p.title} (${p.platform})\n${p.promptText}\n`)
              .join('\n');
            navigator.clipboard.writeText(allPromptsText);
            alert('Copied all visible prompts to clipboard!');
          }}
          className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono-tech tracking-wider uppercase text-white font-medium transition-all"
        >
          <Bookmark className="w-4 h-4 text-indigo-400" />
          <span>COPY ALL TO NOTION</span>
        </button>
      </div>

    </div>
  );
};
