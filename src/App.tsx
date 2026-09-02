/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Center } from './components/Center';
import { Projects } from './components/Projects';
import { ServicesView } from './components/ServicesView';
import { SkillsView } from './components/SkillsView';
import { AboutView } from './components/AboutView';
import { ExperienceView } from './components/ExperienceView';
import { ContactView } from './components/ContactView';
import { Admin } from './components/Admin';
import { AtmosphericBackground } from './components/AtmosphericBackground';
import { Footer } from './components/Footer';

const PortfolioContent: React.FC = () => {
  const { activeSection, setIsAdminOpen, isAdminOpen } = usePortfolio();

  // Hidden /admin direct route & hotkey detection (Keeps public navigation completely clean)
  useEffect(() => {
    const handleLocationRouting = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || path.startsWith('/admin') || hash === '#admin' || hash === '#/admin') {
        setIsAdminOpen(true);
      }
    };

    handleLocationRouting();
    window.addEventListener('popstate', handleLocationRouting);
    window.addEventListener('hashchange', handleLocationRouting);

    // Discreet shortcut (Ctrl+Shift+A or Cmd+Shift+A) for the site owner
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(!isAdminOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleLocationRouting);
      window.removeEventListener('hashchange', handleLocationRouting);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsAdminOpen, isAdminOpen]);

  return (
    <div className="relative min-h-screen bg-[#0c0c0e] text-[#f3f4f6] selection:bg-indigo-500/30 selection:text-white flex flex-col justify-between overflow-x-hidden">
      
      {/* Dynamic Real-Time Atmospheric Weather Background */}
      <AtmosphericBackground />

      {/* Top Header & Navigation Dock */}
      <Navbar />

      {/* Main Dynamic View with AnimatePresence Smooth Page Transitions */}
      <main className="flex-1 w-full relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {activeSection === 'home' && <Center />}
            {activeSection === 'projects' && <Projects />}
            {activeSection === 'services' && <ServicesView />}
            {activeSection === 'skills' && <SkillsView />}
            {activeSection === 'about' && <AboutView />}
            {activeSection === 'experience' && <ExperienceView />}
            {activeSection === 'contact' && <ContactView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Private Admin Dashboard Modal */}
      <Admin />

      {/* Sleek Polished Glassmorphism Footer with Phone / Viber Quick Action */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
