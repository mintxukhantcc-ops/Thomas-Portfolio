import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio, getDirectDriveUrl } from '../context/PortfolioContext';
import { Project, Service, SkillItem, ExperienceItem, ActiveSection, SkillCategory } from '../types';
import { 
  Lock, 
  Plus, 
  Trash2, 
  Save, 
  Download, 
  RotateCcw, 
  FolderKanban, 
  Layers, 
  Cpu, 
  Clock, 
  User, 
  Settings as SettingsIcon, 
  Database,
  Check,
  Video,
  ArrowUpRight,
  LogOut,
  Shield,
  Smartphone,
  Tablet,
  Monitor,
  Sparkles,
  Link,
  Eye,
  CheckCircle2,
  Mail,
  RefreshCw,
  Server,
  MessageSquare,
  ExternalLink
} from 'lucide-react';
import { getVideoEmbedInfo } from './Projects';

// Public components for direct live reactive preview
import { Center } from './Center';
import { Projects } from './Projects';
import { ServicesView } from './ServicesView';
import { SkillsView } from './SkillsView';
import { AboutView } from './AboutView';
import { ExperienceView } from './ExperienceView';
import { ContactView } from './ContactView';

export const Admin: React.FC = () => {
  const {
    setIsAdminOpen,
    projects,
    saveProject,
    updateProjectField,
    deleteProject,
    services,
    saveService,
    deleteService,
    skills,
    saveSkill,
    deleteSkill,
    experience,
    saveExperience,
    deleteExperience,
    profile,
    updateProfile,
    settings,
    updateSettings,
    resetAllToDefault,
    exportDataJson,
    importDataJson,
    inquiries,
    fetchInquiries,
    deleteInquiry,
    updateInquiryStatus,
    syncWithServer,
    isServerSynced,
  } = usePortfolio();

  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('mtk_admin_auth') === 'true';
  });
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<
    'projects' | 'services' | 'skills' | 'experience' | 'profile' | 'settings' | 'backup' | 'inquiries'
  >('projects');
  const [isSyncingServer, setIsSyncingServer] = useState(false);
  const [isAiEnhancing, setIsAiEnhancing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Active preview section & device mode on right panel
  const [previewSection, setPreviewSection] = useState<ActiveSection>('projects');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Currently editing project ID (or new)
  const [activeProjectId, setActiveProjectId] = useState<string | null>(() => {
    return projects[0]?.id || null;
  });

  // Services, skills, and experience editing states
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [activeExperienceId, setActiveExperienceId] = useState<string | null>(null);

  // New Skill form state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<SkillCategory>('Design');
  const [newSkillDesc, setNewSkillDesc] = useState('');

  // Auto-sync preview section when tab changes
  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    if (tab === 'projects') setPreviewSection('projects');
    else if (tab === 'services') setPreviewSection('services');
    else if (tab === 'skills') setPreviewSection('skills');
    else if (tab === 'experience') setPreviewSection('experience');
    else if (tab === 'profile') setPreviewSection('home');
    else if (tab === 'settings') setPreviewSection('home');
    else if (tab === 'inquiries') setPreviewSection('contact');
    else if (tab === 'backup') setPreviewSection('home');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2600);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const envPass = (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined)?.trim();
    const validPasswords = ['admin', 'minthu', 'mtk2025'];
    if (envPass) {
      validPasswords.push(envPass);
    }

    if (validPasswords.includes(passwordInput.trim())) {
      setIsAuthenticated(true);
      sessionStorage.setItem('mtk_admin_auth', 'true');
      setAuthError('');
      setPasswordInput('');
      showToast('Authenticated · Live CMS Loaded');
    } else {
      setAuthError('Invalid passcode. Try: admin, minthu, mtk2025');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('mtk_admin_auth');
  };

  const handleExitAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.pathname.toLowerCase() === '/admin') {
      window.history.replaceState(null, '', '/');
    } else if (window.location.hash.toLowerCase() === '#admin' || window.location.hash.toLowerCase() === '#/admin') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  // Close on Escape key press
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleExitAdmin();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const currentProject = projects.find((p) => p.id === activeProjectId) || projects[0] || null;
  const currentService = services.find((s) => s.id === activeServiceId) || services[0] || null;
  const currentExperience = experience.find((e) => e.id === activeExperienceId) || experience[0] || null;

  // New Project creator
  const handleCreateNewProject = () => {
    const newP: Project = {
      id: `proj-${Date.now()}`,
      projectNumber: String(projects.length + 1).padStart(2, '0'),
      title: 'New Case Study Title',
      category: 'BRANDING & UI/UX',
      role: 'Lead Designer & Strategist',
      summary: 'Comprehensive overview of design challenges, client objectives, and technical execution.',
      heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      images: [],
      keyDeliverables: ['Visual Identity Guidelines', 'Interactive UI Prototypes'],
      tools: ['Figma', 'Illustrator', 'React'],
      technologies: ['TypeScript', 'Tailwind CSS'],
      outcome: 'Resulted in 45% increase in client conversion and strong brand recognition.',
      videoEmbedUrl: '',
      published: true,
      order: projects.length,
    };
    saveProject(newP);
    setActiveProjectId(newP.id);
    showToast('New Case Study Created');
  };

  // New Service creator
  const handleCreateNewService = () => {
    const newS: Service = {
      id: `srv-${Date.now()}`,
      number: String(services.length + 1).padStart(2, '0'),
      title: 'New Strategic Offering',
      shortDescription: 'Tailored strategic solution engineered for modern brand growth.',
      fullDescription: 'Detailed scope of deliverables, methodology, and iterative client consultation.',
      deliverables: ['Strategy Roadmap', 'Asset Library', 'Post-Launch Audit'],
      keyFocus: 'Brand Strategy & Digital Growth',
      published: true,
      order: services.length,
    };
    saveService(newS);
    setActiveServiceId(newS.id);
    showToast('New Service Created');
  };

  // New Milestone creator
  const handleCreateNewExperience = () => {
    const newE: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: 'Creative Technologist & Consultant',
      organizationOrFocus: 'Independent Studio',
      period: '2025 — Present',
      description: 'Orchestrating design systems, generative AI pipelines, and web applications.',
      highlights: ['Managed brand overhauls', 'Architected multi-platform media'],
      order: experience.length,
      published: true,
    };
    saveExperience(newE);
    setActiveExperienceId(newE.id);
    showToast('New Experience Milestone Created');
  };

  // Backup import helper
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && importDataJson(content)) {
        showToast('Backup Restored Successfully');
      } else {
        alert('Invalid JSON backup file structure.');
      }
    };
    reader.readAsText(file);
  };

  // =========================================================================
  // 1. UN-AUTHENTICATED FULL-SCREEN LOGIN VIEW
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-slate-950 flex flex-col justify-between p-6 relative select-none">
        {/* Ambient background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[140px] absolute -top-20 -left-20" />
          <div className="w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[140px] absolute -bottom-20 -right-20" />
        </div>

        {/* Top bar */}
        <div className="w-full flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Shield className="w-4 h-4" />
            </div>
            <span className="text-xs font-mono-tech uppercase tracking-widest text-slate-300 font-bold">
              Min Thu Khant · Command CMS
            </span>
          </div>
          <button
            onClick={handleExitAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-tech text-slate-300 transition-colors"
          >
            <span>Return to Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Login form */}
        <div className="relative z-10 w-full max-w-md mx-auto my-auto p-8 sm:p-10 rounded-3xl bg-[#111117]/90 backdrop-blur-2xl border border-white/15 shadow-2xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-[10px] font-mono-tech uppercase mb-3">
            <span>Restricted Access · Passcode Protected</span>
          </div>

          <h2 className="text-2xl font-sans font-bold text-white mb-2 tracking-tight">
            Administrator Authentication
          </h2>
          <p className="text-xs text-slate-400 font-sans mb-6 leading-relaxed">
            Enter your administrator key to enter the Full-Screen Split-View CMS workspace.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter master password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 font-mono-tech transition-colors"
                autoFocus
              />
              {authError && (
                <p className="text-xs text-rose-400 font-mono-tech mt-2 text-left">
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-white text-black font-mono-tech font-bold uppercase tracking-wider text-xs hover:bg-neutral-200 transition-colors shadow-lg min-h-[46px]"
            >
              Unlock Command CMS
            </button>

            <div className="pt-2 text-[10px] font-mono-tech text-slate-500 flex items-center justify-center gap-1.5">
              <span>Accepted keys: </span>
              <span className="text-slate-400 font-semibold">admin · minthu · mtk2025</span>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="w-full text-center relative z-10 text-[11px] font-mono-tech text-slate-600">
          Min Thu Khant Portfolio · Live CMS Engine v3.5
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. FULL-SCREEN SPLIT-VIEW CMS (50% LEFT EDITOR / 50% RIGHT LIVE PREVIEW)
  // =========================================================================
  return (
    <div className="fixed inset-0 z-50 h-screen w-screen overflow-hidden bg-slate-950 flex flex-col select-none text-slate-200">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="absolute top-4 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-black text-xs font-mono-tech font-bold uppercase shadow-2xl"
          >
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP CMS BAR */}
      <header className="h-14 w-full bg-[#111116] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between shrink-0 z-20">
        
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Lock className="w-4 h-4" />
          </div>
          <div className="leading-none">
            <div className="flex items-center gap-2">
              <h1 className="text-xs sm:text-sm font-sans font-bold text-white tracking-tight">
                PORTFOLIO COMMAND CMS
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[9px] font-mono-tech uppercase text-emerald-300 hidden sm:inline-block">
                LIVE SPLIT-VIEW
              </span>
            </div>
            <p className="text-[10px] font-mono-tech text-slate-400 mt-0.5">
              Real-Time Reactive State & Synchronous LocalStorage Persistence
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono-tech text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>CHANGES LIVE SYNCED</span>
          </div>

          <button
            onClick={handleExitAdmin}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-mono-tech uppercase tracking-wider font-bold transition-colors min-h-[36px]"
          >
            <span>View Public Site</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Sign Out of CMS"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* SPLIT SCREEN BODY CONTAINER (50% / 50%) */}
      <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-56px)] w-full overflow-hidden">
        
        {/* ================================================================= */}
        {/* LEFT PANEL: 50% WIDTH EDITOR & FORM CONTROLS                      */}
        {/* ================================================================= */}
        <section className="w-full lg:w-1/2 h-full flex flex-col bg-[#0f0f14] border-r border-white/10 overflow-hidden">
          
          {/* Sub-Header Tabs */}
          <div className="w-full border-b border-white/10 bg-[#131319] p-2 flex items-center gap-1 overflow-x-auto shrink-0 scrollbar-none">
            <button
              onClick={() => handleTabChange('projects')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono-tech uppercase tracking-wider transition-all whitespace-nowrap min-h-[36px] ${
                activeTab === 'projects'
                  ? 'bg-indigo-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Projects ({projects.length})</span>
            </button>

            <button
              onClick={() => handleTabChange('profile')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono-tech uppercase tracking-wider transition-all whitespace-nowrap min-h-[36px] ${
                activeTab === 'profile'
                  ? 'bg-indigo-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Profile & Bio</span>
            </button>

            <button
              onClick={() => handleTabChange('services')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono-tech uppercase tracking-wider transition-all whitespace-nowrap min-h-[36px] ${
                activeTab === 'services'
                  ? 'bg-indigo-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Services ({services.length})</span>
            </button>

            <button
              onClick={() => handleTabChange('skills')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono-tech uppercase tracking-wider transition-all whitespace-nowrap min-h-[36px] ${
                activeTab === 'skills'
                  ? 'bg-indigo-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Skills ({skills.length})</span>
            </button>

            <button
              onClick={() => handleTabChange('experience')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono-tech uppercase tracking-wider transition-all whitespace-nowrap min-h-[36px] ${
                activeTab === 'experience'
                  ? 'bg-indigo-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Experience ({experience.length})</span>
            </button>

            <button
              onClick={() => handleTabChange('settings')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono-tech uppercase tracking-wider transition-all whitespace-nowrap min-h-[36px] ${
                activeTab === 'settings'
                  ? 'bg-indigo-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <SettingsIcon className="w-3.5 h-3.5" />
              <span>Settings</span>
            </button>

            <button
              onClick={() => handleTabChange('backup')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono-tech uppercase tracking-wider transition-all whitespace-nowrap min-h-[36px] ${
                activeTab === 'backup'
                  ? 'bg-indigo-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Backup</span>
            </button>

            <button
              onClick={() => handleTabChange('inquiries')}
              className={`relative flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono-tech uppercase tracking-wider transition-all whitespace-nowrap min-h-[36px] ${
                activeTab === 'inquiries'
                  ? 'bg-indigo-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Inquiries ({inquiries.length})</span>
              {inquiries.some((i) => i.status === 'unread') && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>
          </div>

          {/* Left Panel Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* ------------------------------------------------------------- */}
            {/* TAB 1: PROJECTS & VIDEO EMBED CMS                             */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <h2 className="text-base font-sans font-bold text-white tracking-tight">
                      Projects & Video Embeds
                    </h2>
                    <p className="text-xs text-slate-400">
                      Live keystrokes immediately reflect on the right live preview.
                    </p>
                  </div>
                  <button
                    onClick={handleCreateNewProject}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-black text-xs font-mono-tech uppercase tracking-wider font-bold hover:bg-neutral-200 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Project</span>
                  </button>
                </div>

                {/* Project Selector Carousel */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {projects.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => setActiveProjectId(proj.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono-tech transition-all shrink-0 border ${
                        (currentProject?.id === proj.id)
                          ? 'bg-indigo-950/80 border-indigo-500 text-white font-bold shadow-md'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span className="text-indigo-400">{proj.projectNumber}</span>
                      <span className="truncate max-w-[140px]">{proj.title}</span>
                    </button>
                  ))}
                </div>

                {/* Project Editor Form */}
                {currentProject ? (
                  <div className="p-5 rounded-2xl bg-[#14141a] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-indigo-600/30 text-indigo-300 text-[10px] font-mono-tech font-bold uppercase">
                          EDITING #{currentProject.projectNumber}
                        </span>
                        <h3 className="text-sm font-sans font-bold text-white truncate max-w-xs">
                          {currentProject.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-1.5 text-xs font-mono-tech text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={currentProject.published}
                            onChange={(e) => updateProjectField(currentProject.id, 'published', e.target.checked)}
                            className="rounded bg-white/10 border-white/20 text-indigo-500"
                          />
                          <span>Published</span>
                        </label>
                        <button
                          onClick={() => {
                            if (confirm(`Delete project "${currentProject.title}"?`)) {
                              deleteProject(currentProject.id);
                              showToast('Project deleted');
                            }
                          }}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
                          title="Delete project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono-tech uppercase text-slate-400 mb-1">
                          Project Number
                        </label>
                        <input
                          type="text"
                          value={currentProject.projectNumber}
                          onChange={(e) => updateProjectField(currentProject.id, 'projectNumber', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono-tech focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono-tech uppercase text-slate-400 mb-1">
                          Category Label
                        </label>
                        <input
                          type="text"
                          value={currentProject.category}
                          onChange={(e) => updateProjectField(currentProject.id, 'category', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono-tech focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono-tech uppercase text-slate-400 mb-1">
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={currentProject.title}
                        onChange={(e) => updateProjectField(currentProject.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm font-sans font-bold focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-tech uppercase text-slate-400 mb-1">
                        Role
                      </label>
                      <input
                        type="text"
                        value={currentProject.role}
                        onChange={(e) => updateProjectField(currentProject.id, 'role', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-sans focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-mono-tech uppercase text-slate-400">
                          Summary
                        </label>
                        <button
                          type="button"
                          onClick={async () => {
                            if (!currentProject.summary) return;
                            setIsAiEnhancing(true);
                            try {
                              const res = await fetch('/api/ai/enhance', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  prompt: currentProject.summary,
                                  type: 'project_description',
                                  context: { title: currentProject.title, role: currentProject.role },
                                }),
                              });
                              const data = await res.json();
                              if (data.enhancedText) {
                                updateProjectField(currentProject.id, 'summary', data.enhancedText);
                                showToast('AI enhanced summary applied');
                              } else if (data.fallback) {
                                updateProjectField(currentProject.id, 'summary', data.fallback);
                                showToast('Polished summary applied');
                              }
                            } catch {
                              showToast('Could not reach AI service');
                            } finally {
                              setIsAiEnhancing(false);
                            }
                          }}
                          disabled={isAiEnhancing || !currentProject.summary}
                          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-[10px] font-mono-tech transition-colors disabled:opacity-50"
                          title="Enhance summary with Gemini AI"
                        >
                          <Sparkles className={`w-3 h-3 ${isAiEnhancing ? 'animate-spin' : ''}`} />
                          <span>{isAiEnhancing ? 'Polishing...' : 'AI Polish'}</span>
                        </button>
                      </div>
                      <textarea
                        rows={3}
                        value={currentProject.summary}
                        onChange={(e) => updateProjectField(currentProject.id, 'summary', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-sans leading-relaxed focus:border-indigo-500 focus:outline-none resize-none"
                      />
                    </div>

                    {/* Hero Image with Google Drive auto converter */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-mono-tech uppercase text-slate-400">
                          Hero Image URL (Supports Direct Google Drive Links)
                        </label>
                        {currentProject.heroImage && (
                          <span className="text-[10px] font-mono-tech text-emerald-400">
                            Auto-converted to CDN
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        value={currentProject.heroImage}
                        placeholder="https://images.unsplash... or drive.google.com/file/d/..."
                        onChange={(e) => {
                          const converted = getDirectDriveUrl(e.target.value);
                          updateProjectField(currentProject.id, 'heroImage', converted);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono-tech focus:border-indigo-500 focus:outline-none"
                      />
                      {currentProject.heroImage && (
                        <div className="mt-2 relative aspect-video w-36 rounded-lg overflow-hidden border border-white/10 bg-black">
                          <img
                            src={currentProject.heroImage}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                    </div>

                    {/* YouTube / TikTok Video Embed URL */}
                    <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-1.5 text-xs font-mono-tech uppercase font-bold text-indigo-300">
                          <Video className="w-3.5 h-3.5" />
                          <span>Video Presentation Embed (YouTube or TikTok)</span>
                        </label>
                        {currentProject.videoEmbedUrl && (
                          <span className="text-[10px] font-mono-tech text-emerald-400">
                            {getVideoEmbedInfo(currentProject.videoEmbedUrl)?.type || 'Detected'}
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="https://www.youtube.com/watch?v=... or tiktok.com/@user/video/..."
                        value={currentProject.videoEmbedUrl || ''}
                        onChange={(e) => updateProjectField(currentProject.id, 'videoEmbedUrl', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono-tech focus:border-indigo-500 focus:outline-none"
                      />
                      <p className="text-[11px] font-sans text-slate-400">
                        Supports standard YouTube videos, YouTube Shorts, and TikTok video URLs. Will render in an interactive responsive video frame.
                      </p>
                    </div>

                    {/* Tools (comma separated) */}
                    <div>
                      <label className="block text-xs font-mono-tech uppercase text-slate-400 mb-1">
                        Tools (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={currentProject.tools.join(', ')}
                        onChange={(e) =>
                          updateProjectField(
                            currentProject.id,
                            'tools',
                            e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                          )
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono-tech focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    {/* Technologies (comma separated) */}
                    <div>
                      <label className="block text-xs font-mono-tech uppercase text-slate-400 mb-1">
                        Technologies & Methodologies (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={currentProject.technologies.join(', ')}
                        onChange={(e) =>
                          updateProjectField(
                            currentProject.id,
                            'technologies',
                            e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                          )
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono-tech focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    {/* Measurable Outcome */}
                    <div>
                      <label className="block text-xs font-mono-tech uppercase text-slate-400 mb-1">
                        Impact & Measurable Outcome
                      </label>
                      <textarea
                        rows={2}
                        value={currentProject.outcome || ''}
                        onChange={(e) => updateProjectField(currentProject.id, 'outcome', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-sans focus:border-indigo-500 focus:outline-none resize-none"
                      />
                    </div>

                    {/* Project Link */}
                    <div>
                      <label className="block text-xs font-mono-tech uppercase text-slate-400 mb-1">
                        Live Project / GitHub URL
                      </label>
                      <input
                        type="text"
                        value={currentProject.projectLink || ''}
                        placeholder="https://..."
                        onChange={(e) => updateProjectField(currentProject.id, 'projectLink', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono-tech focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">No project selected.</p>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB 2: PROFILE & BIO CMS                                       */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'profile' && (
              <div className="p-5 rounded-2xl bg-[#14141a] border border-white/10 space-y-4">
                <div className="pb-3 border-b border-white/10">
                  <h2 className="text-base font-sans font-bold text-white tracking-tight">
                    Identity, Biography & Portrait Settings
                  </h2>
                  <p className="text-xs text-slate-400">
                    Controls header branding, hero typography, and editorial portrait.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tech uppercase text-slate-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => updateProfile({ name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm font-bold focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono-tech uppercase text-slate-400 mb-1">
                      Nickname (English Callout)
                    </label>
                    <input
                      type="text"
                      value={profile.nickname}
                      onChange={(e) => updateProfile({ nickname: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono-tech focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tech uppercase text-slate-400 mb-1">
                    Philosophy Slogan
                  </label>
                  <input
                    type="text"
                    value={profile.slogan}
                    onChange={(e) => updateProfile({ slogan: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono-tech focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech uppercase text-slate-400 mb-1">
                    Hero Bio Description
                  </label>
                  <textarea
                    rows={4}
                    value={profile.positioning}
                    onChange={(e) => updateProfile({ positioning: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-sans leading-relaxed focus:border-indigo-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Portrait URL with Direct Google Drive URL parsing */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-mono-tech uppercase text-slate-400">
                      Personal Portrait URL (Direct Drive Link or Image URL)
                    </label>
                    <span className="text-[10px] font-mono-tech text-indigo-400">
                      Auto-converted to direct CDN
                    </span>
                  </div>
                  <input
                    type="text"
                    value={profile.portraitUrl}
                    onChange={(e) => {
                      const converted = getDirectDriveUrl(e.target.value);
                      updateProfile({ portraitUrl: converted, avatarUrl: converted });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono-tech focus:border-indigo-500 focus:outline-none"
                  />
                  {profile.portraitUrl && (
                    <div className="mt-3 flex items-center gap-3">
                      <img
                        src={profile.portraitUrl}
                        alt="Portrait thumbnail"
                        className="w-16 h-20 rounded-xl object-cover border border-white/20"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-xs font-mono-tech text-slate-400">
                        Current high-res editorial portrait
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tech uppercase text-slate-400 mb-1">
                      Direct Cellular Phone
                    </label>
                    <input
                      type="text"
                      value={profile.phone || ''}
                      onChange={(e) => updateProfile({ phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono-tech focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono-tech uppercase text-slate-400 mb-1">
                      Viber Contact Number
                    </label>
                    <input
                      type="text"
                      value={profile.viberNumber || ''}
                      onChange={(e) => updateProfile({ viberNumber: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono-tech focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tech uppercase text-slate-400 mb-1">
                      Primary Email
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => updateProfile({ email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono-tech focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono-tech uppercase text-slate-400 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => updateProfile({ location: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono-tech focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB 3: SERVICES CMS                                            */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <h2 className="text-base font-sans font-bold text-white tracking-tight">
                      Strategic Services
                    </h2>
                    <p className="text-xs text-slate-400">
                      Manage client service offerings and deliverables.
                    </p>
                  </div>
                  <button
                    onClick={handleCreateNewService}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-black text-xs font-mono-tech uppercase font-bold hover:bg-neutral-200 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Service</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {services.map((srv) => (
                    <button
                      key={srv.id}
                      onClick={() => setActiveServiceId(srv.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono-tech shrink-0 border ${
                        (currentService?.id === srv.id)
                          ? 'bg-indigo-950/80 border-indigo-500 text-white font-bold'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{srv.number}. {srv.title}</span>
                    </button>
                  ))}
                </div>

                {currentService && (
                  <div className="p-5 rounded-2xl bg-[#14141a] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-xs font-mono-tech text-indigo-400 font-bold">
                        Service #{currentService.number}
                      </span>
                      <button
                        onClick={() => {
                          if (confirm(`Delete service "${currentService.title}"?`)) {
                            deleteService(currentService.id);
                            showToast('Service deleted');
                          }
                        }}
                        className="text-rose-400 hover:text-rose-300 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-mono-tech uppercase text-slate-400 mb-1">
                        Service Title
                      </label>
                      <input
                        type="text"
                        value={currentService.title}
                        onChange={(e) => saveService({ ...currentService, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm font-bold focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-tech uppercase text-slate-400 mb-1">
                        Short Description
                      </label>
                      <textarea
                        rows={2}
                        value={currentService.shortDescription}
                        onChange={(e) => saveService({ ...currentService, shortDescription: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-sans focus:border-indigo-500 focus:outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-tech uppercase text-slate-400 mb-1">
                        Key Focus / Specialty
                      </label>
                      <input
                        type="text"
                        value={currentService.keyFocus}
                        onChange={(e) => saveService({ ...currentService, keyFocus: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono-tech focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB 4: SKILLS CMS                                              */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-white/10">
                  <h2 className="text-base font-sans font-bold text-white tracking-tight">
                    Technical & Creative Skills
                  </h2>
                  <p className="text-xs text-slate-400">
                    Add or remove skills with categories.
                  </p>
                </div>

                {/* Add new skill inline */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-wrap items-center gap-3">
                  <input
                    type="text"
                    placeholder="Skill Name (e.g. Prompt Architecture)..."
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/15 text-white text-xs font-mono-tech focus:border-indigo-500 focus:outline-none"
                  />
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value as SkillCategory)}
                    className="px-3 py-2 rounded-lg bg-slate-900 border border-white/15 text-white text-xs font-mono-tech focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Design">Design</option>
                    <option value="Development">Development</option>
                    <option value="AI & Content">AI & Content</option>
                  </select>
                  <button
                    onClick={() => {
                      if (!newSkillName.trim()) return;
                      saveSkill({
                        name: newSkillName.trim(),
                        category: newSkillCategory,
                        description: newSkillDesc.trim(),
                      });
                      setNewSkillName('');
                      setNewSkillDesc('');
                      showToast('Skill added');
                    }}
                    className="px-4 py-2 rounded-lg bg-white text-black text-xs font-mono-tech font-bold uppercase hover:bg-neutral-200 transition-colors"
                  >
                    Add Skill
                  </button>
                </div>

                {/* Skills List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skills.map((s) => (
                    <div
                      key={s.name}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-mono-tech font-bold text-white">
                          {s.name}
                        </div>
                        <div className="text-[10px] font-mono-tech text-indigo-400">
                          {s.category}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          deleteSkill(s.name);
                          showToast('Skill removed');
                        }}
                        className="text-slate-400 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB 5: EXPERIENCE CMS                                          */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'experience' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <h2 className="text-base font-sans font-bold text-white tracking-tight">
                      Experience Milestones
                    </h2>
                    <p className="text-xs text-slate-400">
                      Chronological career milestones and achievements.
                    </p>
                  </div>
                  <button
                    onClick={handleCreateNewExperience}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-black text-xs font-mono-tech uppercase font-bold hover:bg-neutral-200 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Milestone</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-4 rounded-xl bg-[#14141a] border border-white/10 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => saveExperience({ ...exp, role: e.target.value })}
                          className="px-2 py-1 rounded bg-white/5 border border-white/15 text-white text-xs font-bold font-sans"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => saveExperience({ ...exp, period: e.target.value })}
                            className="px-2 py-1 rounded bg-white/5 border border-white/15 text-indigo-300 text-[10px] font-mono-tech w-28 text-right"
                          />
                          <button
                            onClick={() => {
                              deleteExperience(exp.id);
                              showToast('Milestone removed');
                            }}
                            className="text-rose-400 hover:text-rose-300 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <input
                        type="text"
                        value={exp.organizationOrFocus}
                        onChange={(e) => saveExperience({ ...exp, organizationOrFocus: e.target.value })}
                        className="w-full px-2 py-1 rounded bg-white/5 border border-white/15 text-slate-300 text-xs font-sans"
                      />

                      <textarea
                        rows={2}
                        value={exp.description}
                        onChange={(e) => saveExperience({ ...exp, description: e.target.value })}
                        className="w-full px-2 py-1 rounded bg-white/5 border border-white/15 text-slate-300 text-xs font-sans resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB 6: SETTINGS CMS                                            */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'settings' && (
              <div className="p-5 rounded-2xl bg-[#14141a] border border-white/10 space-y-4">
                <div className="pb-3 border-b border-white/10">
                  <h2 className="text-base font-sans font-bold text-white tracking-tight">
                    Section Visibility Controls
                  </h2>
                  <p className="text-xs text-slate-400">
                    Toggle which navigation sections are active on the public site.
                  </p>
                </div>

                <div className="space-y-3">
                  {Object.entries(settings.visibility).map(([key, val]) => (
                    <label
                      key={key}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 cursor-pointer"
                    >
                      <span className="text-xs font-mono-tech uppercase text-slate-200">
                        {key}
                      </span>
                      <input
                        type="checkbox"
                        checked={val}
                        onChange={(e) =>
                          updateSettings({
                            visibility: {
                              ...settings.visibility,
                              [key]: e.target.checked,
                            },
                          })
                        }
                        className="rounded bg-white/10 border-white/20 text-indigo-500 w-4 h-4"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB 7: BACKUP & RESTORE CMS                                    */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'backup' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-[#14141a] border border-white/10 space-y-4">
                  <h3 className="text-xs font-mono-tech uppercase text-indigo-400 font-bold">
                    Export JSON Snapshot
                  </h3>
                  <p className="text-xs text-slate-400">
                    Download a full backup of all case studies, video embed links, profile info, and custom assets.
                  </p>
                  <button
                    onClick={() => {
                      const dataStr = exportDataJson();
                      const blob = new Blob([dataStr], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `min-thu-khant-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                      showToast('Backup downloaded');
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black text-xs font-mono-tech font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-[#14141a] border border-white/10 space-y-4">
                  <h3 className="text-xs font-mono-tech uppercase text-indigo-400 font-bold">
                    Restore from JSON File
                  </h3>
                  <p className="text-xs text-slate-400">
                    Upload a previously saved JSON snapshot to instantly restore all data.
                  </p>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileImport}
                    className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-mono-tech file:bg-white/10 file:text-white hover:file:bg-white/20"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
                  <h3 className="text-xs font-mono-tech uppercase text-rose-400 font-bold">
                    Reset All to System Defaults
                  </h3>
                  <p className="text-xs text-slate-400">
                    Revert all local storage modifications back to the default project and profile specifications.
                  </p>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all data to system defaults? This cannot be undone.')) {
                        resetAllToDefault();
                        showToast('Reset to defaults complete');
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono-tech font-bold uppercase tracking-wider"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All Data</span>
                  </button>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB 8: CLIENT INQUIRIES & BACKEND DISPATCH                    */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                {/* Panel Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold font-mono-tech uppercase text-white tracking-wider">
                        Client Inquiries & CRM
                      </h2>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono-tech">
                        {inquiries.length} Total
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Direct submissions received through the public Contact portal and persisted to server.
                    </p>
                  </div>

                  <button
                    onClick={async () => {
                      setIsSyncingServer(true);
                      await syncWithServer();
                      await fetchInquiries();
                      setIsSyncingServer(false);
                      showToast('Backend inquiries & state synchronized');
                    }}
                    disabled={isSyncingServer}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-mono-tech text-white uppercase tracking-wider transition-all active:scale-95 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isSyncingServer ? 'animate-spin' : ''}`} />
                    <span>{isSyncingServer ? 'Syncing...' : 'Sync with Server'}</span>
                  </button>
                </div>

                {/* Backend Server Status Card */}
                <div className="p-4 rounded-2xl bg-[#14141c] border border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Server className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono-tech text-white font-semibold">
                          Backend REST API Pipeline
                        </span>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono-tech">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Connected</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Inquiries are saved to <code className="text-indigo-300">/api/contact</code> and synced to server storage.
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono-tech text-slate-500 block">
                      UNREAD INBOX
                    </span>
                    <span className="text-sm font-bold font-mono-tech text-emerald-400">
                      {inquiries.filter((i) => i.status === 'unread').length} Pending
                    </span>
                  </div>
                </div>

                {/* Inquiries Stream */}
                {inquiries.length === 0 ? (
                  <div className="p-12 text-center rounded-2xl bg-[#121217] border border-dashed border-white/10 space-y-3">
                    <Mail className="w-8 h-8 text-slate-600 mx-auto" />
                    <h3 className="text-sm font-mono-tech uppercase text-slate-300">
                      No Inquiries Yet
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      When prospective clients submit the collaboration form on the Contact view, their messages will appear here in real-time.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className={`p-5 rounded-2xl border transition-all ${
                          inq.status === 'unread'
                            ? 'bg-[#151520] border-indigo-500/40 shadow-lg shadow-indigo-950/20'
                            : 'bg-[#111116] border-white/10 opacity-85'
                        }`}
                      >
                        {/* Header: Sender & Meta */}
                        <div className="flex flex-wrap items-start justify-between gap-2 pb-3 border-b border-white/5">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-display font-bold text-white">
                                {inq.name}
                              </h3>
                              {inq.status === 'unread' ? (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono-tech font-bold uppercase">
                                  NEW
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full bg-white/5 text-slate-400 text-[10px] font-mono-tech uppercase">
                                  READ
                                </span>
                              )}
                            </div>
                            <a
                              href={`mailto:${inq.email}`}
                              className="text-xs font-mono-tech text-indigo-400 hover:text-indigo-300 transition-colors mt-0.5 block"
                            >
                              {inq.email}
                            </a>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] font-mono-tech text-slate-500">
                              {new Date(inq.createdAt).toLocaleString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Project Scopes Tags */}
                        {inq.scopes && inq.scopes.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 py-3 border-b border-white/5">
                            {inq.scopes.map((scope, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono-tech text-slate-300"
                              >
                                {scope}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Message Content */}
                        <div className="py-3">
                          <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed whitespace-pre-wrap">
                            {inq.message}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/5">
                          <div className="flex items-center gap-2">
                            <a
                              href={`mailto:${inq.email}?subject=${encodeURIComponent(
                                `Re: Collaboration Inquiry - Min Thu Khant (Thomas)`
                              )}&body=${encodeURIComponent(
                                `Hi ${inq.name},\n\nThank you for reaching out regarding ${inq.scopes?.join(', ') || 'your project'}.\n\n`
                              )}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono-tech uppercase font-bold transition-all active:scale-95"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Reply via Email</span>
                            </a>

                            <button
                              onClick={() => {
                                const nextStatus = inq.status === 'unread' ? 'read' : 'unread';
                                updateInquiryStatus(inq.id, nextStatus);
                                showToast(`Marked inquiry as ${nextStatus}`);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-mono-tech uppercase transition-colors"
                            >
                              {inq.status === 'unread' ? 'Mark as Read' : 'Mark as Unread'}
                            </button>
                          </div>

                          <button
                            onClick={async () => {
                              if (confirm(`Delete inquiry from ${inq.name}?`)) {
                                await deleteInquiry(inq.id);
                                showToast('Inquiry deleted');
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </section>

        {/* ================================================================= */}
        {/* RIGHT PANEL: 50% WIDTH LIVE INTERACTIVE PUBLIC PREVIEW            */}
        {/* ================================================================= */}
        <section className="w-full lg:w-1/2 h-full border-t lg:border-t-0 lg:border-l border-white/10 overflow-hidden bg-[#0a0a0d] flex flex-col">
          
          {/* Preview Navigation & Viewport Mode Bar */}
          <div className="h-11 w-full border-b border-white/10 bg-[#121217] px-3 sm:px-4 flex items-center justify-between shrink-0 z-10">
            
            {/* Left: Section Navigator */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
              <span className="text-[10px] font-mono-tech uppercase text-slate-500 mr-1 hidden sm:inline-block">
                VIEWPORT:
              </span>
              {(['home', 'projects', 'services', 'skills', 'about', 'experience', 'contact'] as ActiveSection[]).map((sec) => (
                <button
                  key={sec}
                  onClick={() => setPreviewSection(sec)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono-tech uppercase tracking-wider transition-colors ${
                    previewSection === sec
                      ? 'bg-white text-black font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>

            {/* Right: Device Viewport Simulation */}
            <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10 shrink-0">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`p-1 rounded ${deviceMode === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                title="Desktop View (100% Split)"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeviceMode('tablet')}
                className={`p-1 rounded ${deviceMode === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                title="Tablet View (768px)"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`p-1 rounded ${deviceMode === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                title="Mobile View (390px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Real-time Component Preview Viewport */}
          <div className="flex-1 w-full overflow-y-auto overflow-x-hidden bg-[#0c0c0e] relative flex justify-center p-2 sm:p-4">
            
            {/* Viewport Frame Container */}
            <div
              className={`transition-all duration-300 w-full ${
                deviceMode === 'mobile'
                  ? 'max-w-[390px] border border-white/20 rounded-3xl shadow-2xl overflow-hidden min-h-[780px] my-auto bg-[#0c0c0e]'
                  : deviceMode === 'tablet'
                  ? 'max-w-[768px] border border-white/15 rounded-3xl shadow-2xl overflow-hidden min-h-[900px] my-auto bg-[#0c0c0e]'
                  : 'max-w-none'
              }`}
            >
              <div className="relative w-full min-h-full">
                {previewSection === 'home' && <Center />}
                {previewSection === 'projects' && <Projects />}
                {previewSection === 'services' && <ServicesView />}
                {previewSection === 'skills' && <SkillsView />}
                {previewSection === 'about' && <AboutView />}
                {previewSection === 'experience' && <ExperienceView />}
                {previewSection === 'contact' && <ContactView />}
              </div>
            </div>

          </div>

          {/* Bottom Live Status Bar */}
          <div className="h-7 w-full border-t border-white/10 bg-[#111116] px-4 flex items-center justify-between text-[10px] font-mono-tech text-slate-500 shrink-0">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-slate-400 font-semibold">REACTIVITY ACTIVE:</span>
              <span>Left-pane inputs immediately update this live portfolio preview</span>
            </span>
            <span className="hidden sm:inline-block">Press ESC or click View Public Site to exit</span>
          </div>

        </section>

      </div>
    </div>
  );
};

export default Admin;
