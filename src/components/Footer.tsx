import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Phone, 
  PhoneCall, 
  MessageSquare, 
  Copy, 
  Check, 
  ArrowUp, 
  X, 
  ExternalLink,
  MapPin,
  Sparkles
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile, setActiveSection } = usePortfolio();
  const [isContactMenuOpen, setIsContactMenuOpen] = useState(false);
  const [hasCopiedPhone, setHasCopiedPhone] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const rawPhone = profile.phone || '+95 9 798 886 644';
  const viberTarget = profile.viberNumber || rawPhone;

  // Clean numbers for URLs
  const cleanDigits = rawPhone.replace(/\D/g, '');
  // tel URI format
  const telHref = rawPhone.startsWith('+') ? `tel:${rawPhone.replace(/\s+/g, '')}` : `tel:+${cleanDigits}`;
  // Viber URI format: viber://chat?number=%2B959...
  const viberAppHref = `viber://chat?number=%2B${cleanDigits}`;
  const viberWebHref = `https://viber.click/${cleanDigits}`;

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(rawPhone);
    setHasCopiedPhone(true);
    setTimeout(() => setHasCopiedPhone(false), 2000);
  };

  // Close popover on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsContactMenuOpen(false);
      }
    };
    if (isContactMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isContactMenuOpen]);

  const avatarUrl =
    profile.avatarUrl ||
    profile.portraitUrl ||
    'https://lh3.googleusercontent.com/d/1Pz77FIirx9DBi0-ExQwq2Ze9ehthkXAr';

  return (
    <footer className="relative z-20 backdrop-blur-md bg-slate-950/60 border-t border-white/10 pt-10 pb-28 md:pb-10 px-4 sm:px-6 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Section: Personal Avatar & Identity Branding */}
        <div className="flex items-center gap-3.5 text-left">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('home')}
            className="group flex items-center gap-3 text-left focus:outline-none"
            title="Return to Home Overview"
          >
            {/* Small circular profile avatar crop (w-9 h-9 rounded-full object-cover) */}
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/20 bg-slate-900 shadow-sm shrink-0 group-hover:border-indigo-400 transition-colors">
              <img
                src={avatarUrl}
                alt={profile.name}
                className="w-9 h-9 rounded-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80';
                }}
              />
              <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans text-sm font-semibold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                  {profile.name}
                </span>
                {profile.nickname && (
                  <span className="font-sans text-xs text-slate-400">
                    ({profile.nickname})
                  </span>
                )}
              </div>
              <p className="font-sans text-xs tracking-wide text-slate-400">
                &ldquo;{profile.slogan}&rdquo;
              </p>
            </div>
          </motion.button>
        </div>

        {/* Center / Actions: Dynamic Phone / Viber Direct Contact Action */}
        <div className="relative" ref={popoverRef}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => setIsContactMenuOpen((prev) => !prev)}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 hover:bg-slate-800/90 text-white border border-white/15 hover:border-indigo-400/50 shadow-lg backdrop-blur-md transition-all font-sans text-xs tracking-wide min-h-[44px]"
            title="Call or Viber chat directly"
            aria-expanded={isContactMenuOpen}
            aria-haspopup="true"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <Phone className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-medium text-slate-200">Direct Call / Viber Line</span>
          </motion.button>

          {/* Interactive Direct Contact Dropdown / Popover */}
          <AnimatePresence>
            {isContactMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: -10 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 sm:w-84 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-white/15 p-4 shadow-2xl z-50 text-left"
              >
                {/* Popover Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                      Direct Client Line
                    </span>
                  </div>
                  <button
                    onClick={() => setIsContactMenuOpen(false)}
                    className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Option 1: Direct Cellular Call */}
                <div className="space-y-2 mb-3">
                  <a
                    href={telHref}
                    className="group flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/40 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                        <PhoneCall className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-sans text-xs font-semibold text-white group-hover:text-indigo-300">
                          Direct Phone Call
                        </div>
                        <div className="font-sans text-[11px] text-slate-400">
                          {rawPhone}
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                  </a>

                  {/* Option 2: Viber Direct Chat */}
                  <a
                    href={viberAppHref}
                    onClick={() => {
                      // Fallback to web link if desktop app isn't registered
                      setTimeout(() => {
                        window.open(viberWebHref, '_blank');
                      }, 400);
                    }}
                    className="group flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/40 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-sans text-xs font-semibold text-white group-hover:text-purple-300">
                          Viber Chat & Voice
                        </div>
                        <div className="font-sans text-[11px] text-slate-400">
                          {viberTarget}
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                  </a>
                </div>

                {/* Quick Copy Number Action */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="font-sans text-[11px] text-slate-400">
                    Yangon & Remote Availability
                  </span>
                  <button
                    onClick={handleCopyPhone}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-sans text-slate-300 hover:text-white transition-all active:scale-95"
                  >
                    {hasCopiedPhone ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-400" />
                        <span>Copy Number</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Section: Coordinates & Back to Top */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4 font-sans text-xs tracking-wide text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>{profile.location}</span>
          </div>

          <span className="text-slate-600 hidden sm:inline">·</span>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1 hover:text-white transition-colors py-1"
            title="Scroll to top of page"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3 h-3 text-slate-400" />
          </motion.button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
