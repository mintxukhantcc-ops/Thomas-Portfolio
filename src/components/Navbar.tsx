import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { ActiveSection } from '../types';
import { 
  Send, 
  Layers, 
  Cpu, 
  FolderKanban, 
  Clock, 
  User, 
  Sparkles, 
  Menu, 
  X,
  Home
} from 'lucide-react';

interface NavItemDef {
  id: ActiveSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const Navbar: React.FC = () => {
  const {
    profile,
    activeSection,
    setActiveSection,
    settings,
  } = usePortfolio();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Strictly curated sections: Projects, Skills, Services, About, Experience, Contact
  // AI Prompts and Voiceover Audio Player are completely excluded
  // Admin links and lock icons are completely removed for privacy and security
  const rawNavItems: NavItemDef[] = [
    { id: 'projects', label: 'PROJECTS', icon: FolderKanban },
    { id: 'skills', label: 'SKILLS', icon: Cpu },
    { id: 'services', label: 'SERVICES', icon: Layers },
    { id: 'about', label: 'ABOUT', icon: User },
    { id: 'experience', label: 'EXPERIENCE', icon: Clock },
    { id: 'contact', label: 'CONTACT', icon: Send },
  ];

  const navItems = rawNavItems.filter(
    (item) => settings.visibility[item.id as keyof typeof settings.visibility] !== false
  );

  const handleNavClick = (section: ActiveSection) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const avatarUrl =
    profile.avatarUrl ||
    profile.portraitUrl ||
    'https://lh3.googleusercontent.com/d/1Pz77FIirx9DBi0-ExQwq2Ze9ehthkXAr';

  return (
    <>
      {/* Fixed Top Header Bar with Glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0c0c0e]/80 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Top-Left: Personal Profile Picture Avatar inside a small circular crop (w-10 h-10 rounded-full object-cover) */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none min-h-[48px] min-w-[48px] py-1"
            aria-label="Return to Overview"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 group-hover:border-indigo-400 transition-colors shrink-0 shadow-md bg-[#16161b]">
              <img
                src={avatarUrl}
                alt={profile.name}
                className="w-10 h-10 rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80';
                }}
              />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0c0c0e]" />
            </div>

            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-sans font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                {profile.name}
              </span>
              <span className="text-[10px] font-mono-tech tracking-wider uppercase text-neutral-400">
                {profile.nickname ? `(${profile.nickname}) · Creative Technologist` : 'Portfolio'}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links (>= 1024px) with Framer Motion Highlight */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#15151b]/70 backdrop-blur-md border border-white/10 rounded-full p-1 shadow-inner">
            {/* Home / Overview Tab */}
            <button
              onClick={() => handleNavClick('home')}
              className={`relative px-4 py-2 rounded-full text-xs font-mono-tech tracking-wider uppercase transition-colors min-h-[36px] z-10 ${
                activeSection === 'home' ? 'text-black font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {activeSection === 'home' && (
                <motion.div
                  layoutId="navbar-active-indicator"
                  className="absolute inset-0 bg-white rounded-full shadow-sm z-[-1]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span>OVERVIEW</span>
            </button>

            {/* Curated Navigation Tabs */}
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-full text-xs font-mono-tech tracking-wider uppercase transition-colors min-h-[36px] z-10 ${
                    isActive ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-indicator"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-md shadow-indigo-950/50 z-[-1]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Header Action Controls */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNavClick('contact')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border border-indigo-500/40 hover:border-indigo-400 text-indigo-200 text-xs font-mono-tech tracking-wider uppercase transition-all shadow-sm min-h-[44px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>LET&apos;S TALK</span>
            </motion.button>

            {/* Mobile menu toggle button (< 1024px) */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center border border-white/10"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay Navigation Drawer (< 1024px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 lg:hidden bg-[#0c0c0e]/95 backdrop-blur-xl pt-20 px-6 pb-8 flex flex-col justify-between"
          >
            <div className="space-y-2 pt-4">
              <div className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-500 px-3 mb-2">
                PORTFOLIO DIRECTORY
              </div>
              
              <button
                onClick={() => handleNavClick('home')}
                className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl text-left min-h-[48px] transition-all ${
                  activeSection === 'home'
                    ? 'bg-white text-black font-bold'
                    : 'text-neutral-200 hover:bg-white/5'
                }`}
              >
                <Home className="w-5 h-5 text-indigo-400" />
                <span className="text-sm font-mono-tech uppercase tracking-wider">OVERVIEW</span>
              </button>

              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl text-left min-h-[48px] transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg'
                        : 'text-neutral-200 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-indigo-300" />
                    <span className="text-sm font-mono-tech uppercase tracking-wider">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => handleNavClick('contact')}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-black text-xs font-mono-tech font-bold uppercase tracking-wider min-h-[48px]"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>START A CONVERSATION</span>
              </motion.button>
              <p className="text-center text-xs font-mono-tech text-neutral-500">
                {profile.email} · {profile.location}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Quick Rail (< 768px for immediate ergonomic touch access) */}
      <nav className="md:hidden fixed bottom-3 left-3 right-3 z-30 pointer-events-auto">
        <div className="flex items-center justify-around bg-[#121216]/90 backdrop-blur-xl border border-white/15 rounded-2xl py-1 px-1.5 shadow-2xl shadow-black/80">
          <button
            onClick={() => handleNavClick('home')}
            className={`flex flex-col items-center gap-0.5 py-1.5 px-2.5 rounded-xl transition-all min-h-[48px] min-w-[48px] justify-center ${
              activeSection === 'home' ? 'text-indigo-400 bg-white/10' : 'text-neutral-400'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-[9px] font-mono-tech uppercase">Home</span>
          </button>

          <button
            onClick={() => handleNavClick('projects')}
            className={`flex flex-col items-center gap-0.5 py-1.5 px-2.5 rounded-xl transition-all min-h-[48px] min-w-[48px] justify-center ${
              activeSection === 'projects' ? 'text-blue-400 bg-white/10' : 'text-neutral-400'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span className="text-[9px] font-mono-tech uppercase">Projects</span>
          </button>

          <button
            onClick={() => handleNavClick('skills')}
            className={`flex flex-col items-center gap-0.5 py-1.5 px-2.5 rounded-xl transition-all min-h-[48px] min-w-[48px] justify-center ${
              activeSection === 'skills' ? 'text-blue-400 bg-white/10' : 'text-neutral-400'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span className="text-[9px] font-mono-tech uppercase">Skills</span>
          </button>

          <button
            onClick={() => handleNavClick('services')}
            className={`flex flex-col items-center gap-0.5 py-1.5 px-2.5 rounded-xl transition-all min-h-[48px] min-w-[48px] justify-center ${
              activeSection === 'services' ? 'text-blue-400 bg-white/10' : 'text-neutral-400'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="text-[9px] font-mono-tech uppercase">Services</span>
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`flex flex-col items-center gap-0.5 py-1.5 px-2.5 rounded-xl transition-all min-h-[48px] min-w-[48px] justify-center ${
              activeSection === 'contact' ? 'text-blue-400 bg-white/10' : 'text-neutral-400'
            }`}
          >
            <Send className="w-4 h-4" />
            <span className="text-[9px] font-mono-tech uppercase">Contact</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
