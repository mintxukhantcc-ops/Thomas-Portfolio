import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ArrowLeft, 
  Mail, 
  MapPin, 
  Copy, 
  Check, 
  Send, 
  Clock, 
  Sparkles, 
  ArrowUpRight,
  MessageSquare,
  Phone,
  PhoneCall
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { profile, setActiveSection, submitInquiry } = usePortfolio();
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);
  const [senderName, setSenderName] = useState<string>('');
  const [senderEmail, setSenderEmail] = useState<string>('');
  const [selectedScopes, setSelectedScopes] = useState<string[]>(['Content Strategy']);
  const [message, setMessage] = useState<string>('');
  const [isSentSuccess, setIsSentSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const scopeOptions = [
    'Content Strategy & Planning',
    'Video Scriptwriting & Direction',
    'Bilingual Voiceover (Burmese / English)',
    'Influencer & Campaign Coordination',
    'Full-Stack Web Development',
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.phone || '+95 9 798 886 644');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const toggleScope = (scope: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      // 1. Submit to server API
      await submitInquiry({
        name: senderName,
        email: senderEmail,
        scopes: selectedScopes,
        message,
      });

      // 2. Also trigger mailto fallback
      const subject = encodeURIComponent(`Project Inquiry: ${selectedScopes.join(', ')}`);
      const body = encodeURIComponent(
        `Hello Min Thu Khant (Thomas),\n\nMy name is ${senderName} (${senderEmail}).\n\nProject Scope: ${selectedScopes.join(', ')}\n\nMessage Details:\n${message}\n\nLooking forward to hearing from you.`
      );
      window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`);
      setIsSentSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <span className="text-[10px] font-mono-tech tracking-widest uppercase text-indigo-400 block mb-1">
          INITIATE COLLABORATION
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
          READY TO ELEVATE YOUR DIGITAL PRESENCE?
        </h1>
        <p className="text-base sm:text-lg text-neutral-400 font-sans mt-2">
          Let&apos;s discuss your next project or campaign.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Direct Contact Details & Coordinates */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-xs font-mono-tech uppercase tracking-widest text-indigo-400">
            Direct Coordinates & Channels
          </h2>
          
          {/* Email Direct Action Box */}
          <div className="p-6 rounded-3xl bg-[#141419] border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-400">
                DIRECT INBOX
              </h3>
              <Mail className="w-4 h-4 text-indigo-400" />
            </div>

            <div>
              <p className="text-sm font-mono-tech font-semibold text-white break-all">
                {profile.email}
              </p>
              <p className="text-xs text-neutral-400 font-sans mt-1">
                Typical reply window: within 12–24 business hours.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={handleCopyEmail}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-tech uppercase text-white transition-all active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${profile.email}`}
                className="flex items-center justify-center p-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 transition-all active:scale-95"
                title="Open Mail Client"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Direct Phone & Viber Hotline Card */}
          <div className="p-6 rounded-3xl bg-[#141419] border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-400">
                DIRECT CALL & VIBER HOTLINE
              </h3>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono-tech">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>ONLINE</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-mono-tech font-semibold text-white">
                {profile.phone || '+95 9 798 886 644'}
              </p>
              <p className="text-xs text-neutral-400 font-sans mt-1">
                Direct phone line & Viber chat for immediate creative briefs and project queries.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={profile.phone?.startsWith('+') ? `tel:${profile.phone.replace(/\s+/g, '')}` : `tel:+${(profile.phone || '+959798886644').replace(/\D/g, '')}`}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-tech uppercase text-white transition-all active:scale-95 min-h-[44px]"
              >
                <PhoneCall className="w-3.5 h-3.5 text-indigo-400" />
                <span>Call Now</span>
              </a>
              <a
                href={`viber://chat?number=%2B${(profile.viberNumber || profile.phone || '+959798886644').replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 text-xs font-mono-tech uppercase text-purple-200 transition-all active:scale-95 min-h-[44px]"
              >
                <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                <span>Viber Chat</span>
              </a>
            </div>

            <button
              onClick={handleCopyPhone}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-tech uppercase text-neutral-300 hover:text-white transition-all active:scale-95 min-h-[44px]"
            >
              {copiedPhone ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Number Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Copy Hotline Number</span>
                </>
              )}
            </button>
          </div>

          {/* Location & Timezone Coordinates */}
          <div className="p-6 rounded-3xl bg-[#141419] border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-400">
                BASE LOCATION & TIMEZONE
              </h3>
              <MapPin className="w-4 h-4 text-blue-400" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-display font-bold text-white">
                  {profile.location}
                </p>
                <p className="text-xs text-neutral-400 font-mono-tech mt-0.5">
                  UTC +06:30 (MMT)
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono-tech">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Remote Ready</span>
              </div>
            </div>
          </div>

          {/* Professional Channels */}
          <div className="p-6 rounded-3xl bg-[#141419] border border-white/10 shadow-xl space-y-3">
            <h3 className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-400 block mb-1">
              NETWORK & CHANNELS
            </h3>
            {profile.socials.map((soc, idx) => (
              <a
                key={idx}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/5 border border-white/5 hover:border-white/15 transition-all text-xs font-mono-tech text-neutral-300 hover:text-white group"
              >
                <span>{soc.platform}</span>
                <span className="flex items-center gap-1 text-neutral-400 group-hover:text-indigo-400">
                  <span>{soc.label}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>

        </div>

        {/* Right Column: Project Inquiry Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-3xl bg-[#141419] border border-white/10 shadow-2xl space-y-6"
          >
            <div>
              <span className="text-[10px] font-mono-tech tracking-widest uppercase text-indigo-400 block mb-1">
                STRUCTURED INQUIRY
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                Send a Message
              </h2>
            </div>

            {/* Scope selection chips */}
            <div>
              <label className="text-xs font-mono-tech uppercase tracking-wider text-neutral-400 block mb-2.5">
                Select Capabilities Needed:
              </label>
              <div className="flex flex-wrap gap-2">
                {scopeOptions.map((scope) => {
                  const isChecked = selectedScopes.includes(scope);
                  return (
                    <button
                      type="button"
                      key={scope}
                      onClick={() => toggleScope(scope)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech transition-all ${
                        isChecked
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow'
                          : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {scope}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono-tech uppercase tracking-wider text-neutral-400 block mb-1.5">
                  Your Name / Organization *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Phyo / Clinic Operations"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-indigo-400 text-white text-sm font-sans placeholder:text-neutral-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-mono-tech uppercase tracking-wider text-neutral-400 block mb-1.5">
                  Your Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-indigo-400 text-white text-sm font-sans placeholder:text-neutral-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono-tech uppercase tracking-wider text-neutral-400 block mb-1.5">
                Brief Overview or Objectives *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Describe your goals, timeline, and key deliverables..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-indigo-400 text-white text-sm font-sans placeholder:text-neutral-600 focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black text-xs font-mono-tech uppercase tracking-wider font-bold hover:bg-neutral-200 transition-all active:scale-98 shadow-xl shadow-white/5 disabled:opacity-50 min-h-[46px]"
            >
              <span>{isSubmitting ? 'PROCESSING...' : 'SEND INQUIRY'}</span>
              <Send className="w-4 h-4 text-black" />
            </button>

            {isSentSuccess && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono-tech flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Inquiry saved to server & dispatched to email client for Min Thu Khant (Thomas).</span>
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};
