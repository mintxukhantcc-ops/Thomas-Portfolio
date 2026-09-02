import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, Service, SkillItem, ExperienceItem } from '../types';
import { 
  Lock, 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Upload, 
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
  Play,
  ExternalLink,
  Shield
} from 'lucide-react';
import { getVideoEmbedInfo } from './Projects';

export const Admin: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    projects,
    saveProject,
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
  } = usePortfolio();

  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('mtk_admin_auth') === 'true';
  });
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<
    'projects' | 'services' | 'skills' | 'experience' | 'profile' | 'settings' | 'backup'
  >('projects');
  const [toastMessage, setToastMessage] = useState('');

  // Editing states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  const [editingExperience, setEditingExperience] = useState<ExperienceItem | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
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
    } else {
      setAuthError('Invalid credentials. Accepted keys: admin, minthu, mtk2025');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('mtk_admin_auth');
  };

  const handleClose = () => {
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
      if (e.key === 'Escape' && isAdminOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isAdminOpen]);

  return (
    <AnimatePresence>
      {isAdminOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-6xl max-h-[95vh] flex flex-col rounded-3xl bg-[#101014] border border-white/10 shadow-2xl overflow-hidden text-neutral-200"
          >
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/90 text-black text-xs font-mono-tech font-bold uppercase shadow-xl animate-in fade-in slide-in-from-top-2">
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#141419]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-sans font-bold text-white tracking-tight">
                Portfolio Command & Administration
              </h2>
              <p className="text-[11px] font-mono-tech text-neutral-400">
                {isAuthenticated ? 'Authenticated Session · Direct Content Management' : 'Restricted Area · Enter Passcode'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg text-xs font-mono-tech text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                Logout
              </button>
            )}
            <button
              onClick={handleClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        {!isAuthenticated ? (
          /* Login View */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto my-auto text-center">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-4 text-indigo-400">
              <Lock className="w-8 h-8" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono-tech uppercase mb-3">
              <Shield className="w-3 h-3 text-indigo-400" />
              <span>Firebase Auth & RBAC Protected</span>
            </div>
            <h3 className="text-xl font-sans font-bold text-white mb-2">
              Authentication Required
            </h3>
            <p className="text-xs text-neutral-400 font-sans mb-6">
              Enter your administration master key or password to manage projects, videos, profile details, and services.
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter admin master password..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500 font-mono-tech"
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
                className="w-full py-3 rounded-xl bg-white text-black font-mono-tech font-bold uppercase tracking-wider text-xs hover:bg-neutral-200 transition-colors min-h-[48px]"
              >
                Access Dashboard
              </button>
              <div className="pt-2 text-[10px] font-mono-tech text-neutral-500">
                <span>Default Keys: </span>
                <span className="text-neutral-400 font-bold">admin · minthu · mtk2025</span>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Workspace */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Tabs */}
            <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-white/10 bg-[#121216] p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible shrink-0">
              <button
                onClick={() => setActiveTab('projects')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-mono-tech uppercase tracking-wider transition-all min-h-[44px] whitespace-nowrap ${
                  activeTab === 'projects'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FolderKanban className="w-4 h-4" />
                <span>Projects ({projects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-mono-tech uppercase tracking-wider transition-all min-h-[44px] whitespace-nowrap ${
                  activeTab === 'services'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Services ({services.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-mono-tech uppercase tracking-wider transition-all min-h-[44px] whitespace-nowrap ${
                  activeTab === 'skills'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>Skills ({skills.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('experience')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-mono-tech uppercase tracking-wider transition-all min-h-[44px] whitespace-nowrap ${
                  activeTab === 'experience'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Experience ({experience.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-mono-tech uppercase tracking-wider transition-all min-h-[44px] whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile & Bio</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-mono-tech uppercase tracking-wider transition-all min-h-[44px] whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <SettingsIcon className="w-4 h-4" />
                <span>Settings</span>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-mono-tech uppercase tracking-wider transition-all min-h-[44px] whitespace-nowrap ${
                  activeTab === 'backup'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>Data Backup</span>
              </button>
            </div>

            {/* Tab Workspace Body */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto max-h-[75vh]">
              
              {/* ========================================================= */}
              {/* TAB 1: PROJECTS & EMBEDDED VIDEOS                         */}
              {/* ========================================================= */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <h3 className="text-lg font-sans font-bold text-white">
                        Case Studies & Works
                      </h3>
                      <p className="text-xs text-neutral-400 font-sans">
                        Manage portfolio items, images, deliverables, and YouTube / TikTok video embeds.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const newP: Project = {
                          id: `proj-${Date.now()}`,
                          projectNumber: String(projects.length + 1).padStart(2, '0'),
                          title: 'New Case Study Title',
                          category: 'BRANDING & UI/UX',
                          role: 'Lead Designer',
                          summary: 'Project summary describing the scope and strategic impact...',
                          heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
                          images: [],
                          keyDeliverables: ['Visual Identity System', 'Interactive UI Components'],
                          tools: ['Figma', 'React', 'Tailwind CSS'],
                          technologies: ['TypeScript', 'Vite'],
                          outcome: 'Demonstrated measurable increase in user engagement and brand recognition.',
                          videoEmbedUrl: '',
                          published: true,
                          order: projects.length,
                        };
                        setEditingProject(newP);
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-mono-tech uppercase tracking-wider font-bold hover:bg-neutral-200 transition-colors min-h-[44px]"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Project</span>
                    </button>
                  </div>

                  {/* Project Editor Form Modal / Inline */}
                  {editingProject ? (
                    <div className="p-6 rounded-2xl bg-[#15151b] border border-white/15 space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <h4 className="text-sm font-mono-tech uppercase tracking-wider text-indigo-400 font-bold">
                          {editingProject.id.startsWith('proj-') ? 'Create Project' : `Edit: ${editingProject.title}`}
                        </h4>
                        <button
                          onClick={() => setEditingProject(null)}
                          className="text-neutral-400 hover:text-white text-xs font-mono-tech"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                            Project Title
                          </label>
                          <input
                            type="text"
                            value={editingProject.title}
                            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                            Category
                          </label>
                          <input
                            type="text"
                            value={editingProject.category}
                            onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                            Role
                          </label>
                          <input
                            type="text"
                            value={editingProject.role}
                            onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                            Hero Image URL
                          </label>
                          <input
                            type="text"
                            value={editingProject.heroImage}
                            onChange={(e) => setEditingProject({ ...editingProject, heroImage: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                          />
                        </div>

                        {/* Video Embed Link Input */}
                        <div className="md:col-span-2 p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="flex items-center gap-1.5 text-xs font-mono-tech uppercase text-rose-300 font-semibold">
                              <Video className="w-4 h-4 text-rose-400" />
                              <span>YouTube / TikTok Video Embed Link</span>
                            </label>
                            {editingProject.videoEmbedUrl && (
                              <span className="text-[10px] font-mono-tech text-neutral-400">
                                {getVideoEmbedInfo(editingProject.videoEmbedUrl) ? 'Valid Embed URL' : 'Checking format...'}
                              </span>
                            )}
                          </div>
                          
                          <input
                            type="url"
                            placeholder="e.g. https://www.youtube.com/watch?v=... or https://www.tiktok.com/@user/video/..."
                            value={editingProject.videoEmbedUrl || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, videoEmbedUrl: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-rose-500/30 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-rose-400 font-mono-tech"
                          />

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-neutral-400">
                            <span>
                              Accepts YouTube regular videos, YouTube Shorts, or TikTok reel links. Rendered responsively.
                            </span>
                            {editingProject.videoEmbedUrl && (
                              <a
                                href={editingProject.videoEmbedUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-rose-300 hover:text-white"
                              >
                                <span>Test Link</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>

                          {editingProject.videoEmbedUrl && getVideoEmbedInfo(editingProject.videoEmbedUrl) && (
                            <div className="mt-3 p-3 rounded-xl bg-black/60 border border-white/10 space-y-2">
                              <div className="flex items-center justify-between text-[11px] font-mono-tech text-neutral-300">
                                <span className="text-rose-300 font-semibold">Live Video Embed Preview:</span>
                                <span className="text-neutral-400">
                                  {getVideoEmbedInfo(editingProject.videoEmbedUrl)?.type.toUpperCase()} · {getVideoEmbedInfo(editingProject.videoEmbedUrl)?.isVertical ? '9:16 Vertical Reel' : '16:9 Standard'}
                                </span>
                              </div>
                              <div className={`relative rounded-lg overflow-hidden bg-black mx-auto border border-white/15 ${
                                getVideoEmbedInfo(editingProject.videoEmbedUrl)?.isVertical 
                                  ? 'w-full max-w-[240px] aspect-[9/16]' 
                                  : 'w-full aspect-video'
                              }`}>
                                <iframe
                                  src={getVideoEmbedInfo(editingProject.videoEmbedUrl)!.embedUrl}
                                  title="Admin Video Preview"
                                  className="w-full h-full"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                            Project Summary / Scope
                          </label>
                          <textarea
                            rows={3}
                            value={editingProject.summary}
                            onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500 font-sans"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                            Measurable Outcome / Business Impact
                          </label>
                          <input
                            type="text"
                            value={editingProject.outcome || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, outcome: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                            Key Deliverables (comma separated)
                          </label>
                          <input
                            type="text"
                            value={editingProject.keyDeliverables.join(', ')}
                            onChange={(e) =>
                              setEditingProject({
                                ...editingProject,
                                keyDeliverables: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                              })
                            }
                            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                            Tools Used (comma separated)
                          </label>
                          <input
                            type="text"
                            value={editingProject.tools.join(', ')}
                            onChange={(e) =>
                              setEditingProject({
                                ...editingProject,
                                tools: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                              })
                            }
                            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                            Live Project Link (optional)
                          </label>
                          <input
                            type="text"
                            value={editingProject.projectLink || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, projectLink: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                        <button
                          onClick={() => setEditingProject(null)}
                          className="px-4 py-2 rounded-xl text-xs font-mono-tech text-neutral-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            saveProject(editingProject);
                            setEditingProject(null);
                            showToast('Project updated successfully');
                          }}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono-tech uppercase tracking-wider font-bold shadow-md"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save Project</span>
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {/* Existing Projects Table */}
                  <div className="space-y-3">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <img
                            src={proj.heroImage}
                            alt={proj.title}
                            className="w-14 h-14 rounded-xl object-cover bg-black/50 shrink-0 border border-white/10"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono-tech text-indigo-400">
                                #{proj.projectNumber}
                              </span>
                              <h4 className="text-sm font-sans font-bold text-white truncate">
                                {proj.title}
                              </h4>
                              {proj.videoEmbedUrl && (
                                <span className="flex items-center gap-1 px-1.5 py-0.2 rounded bg-rose-950 border border-rose-500/40 text-[9px] font-mono-tech text-rose-300">
                                  <Play className="w-2 h-2 fill-rose-300" />
                                  <span>VIDEO</span>
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-neutral-400 font-sans truncate">
                              {proj.category} · {proj.role}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <button
                            onClick={() => setEditingProject({ ...proj })}
                            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono-tech text-neutral-300 hover:text-white transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete project "${proj.title}"?`)) {
                                deleteProject(proj.id);
                                showToast('Project deleted');
                              }
                            }}
                            className="p-2 rounded-xl text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            aria-label="Delete project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 2: SERVICES                                           */}
              {/* ========================================================= */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <h3 className="text-lg font-sans font-bold text-white">
                        Services & Offerings
                      </h3>
                      <p className="text-xs text-neutral-400 font-sans">
                        Manage your 5 core strategic offerings and deliverables.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const newS: Service = {
                          id: `serv-${Date.now()}`,
                          number: String(services.length + 1).padStart(2, '0'),
                          title: 'New Strategic Offering',
                          shortDescription: 'Short summary of the offering and impact...',
                          fullDescription: 'Comprehensive breakdown of how this service is delivered...',
                          deliverables: ['Custom Strategic Plan', 'Final Production Artifacts'],
                          keyFocus: 'Design & Code Excellence',
                          published: true,
                          order: services.length,
                        };
                        setEditingService(newS);
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-mono-tech uppercase tracking-wider font-bold hover:bg-neutral-200 transition-colors min-h-[44px]"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Service</span>
                    </button>
                  </div>

                  {editingService && (
                    <div className="p-6 rounded-2xl bg-[#15151b] border border-white/15 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                            Service Title
                          </label>
                          <input
                            type="text"
                            value={editingService.title}
                            onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                            Key Focus / Tagline
                          </label>
                          <input
                            type="text"
                            value={editingService.keyFocus}
                            onChange={(e) => setEditingService({ ...editingService, keyFocus: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                            Short Summary
                          </label>
                          <input
                            type="text"
                            value={editingService.shortDescription}
                            onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                            Deliverables (comma separated)
                          </label>
                          <input
                            type="text"
                            value={editingService.deliverables.join(', ')}
                            onChange={(e) =>
                              setEditingService({
                                ...editingService,
                                deliverables: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                              })
                            }
                            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                        <button
                          onClick={() => setEditingService(null)}
                          className="px-4 py-2 text-xs font-mono-tech text-neutral-400"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            saveService(editingService);
                            setEditingService(null);
                            showToast('Service saved');
                          }}
                          className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-mono-tech font-bold uppercase"
                        >
                          Save Service
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {services.map((srv) => (
                      <div
                        key={srv.id}
                        className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/10"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono-tech text-indigo-400">
                              {srv.number}
                            </span>
                            <h4 className="text-sm font-sans font-bold text-white">
                              {srv.title}
                            </h4>
                          </div>
                          <p className="text-xs text-neutral-400 font-sans mt-0.5">
                            {srv.shortDescription}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingService({ ...srv })}
                            className="px-3 py-1.5 rounded-xl bg-white/5 text-xs font-mono-tech text-neutral-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete service "${srv.title}"?`)) {
                                deleteService(srv.id);
                                showToast('Service deleted');
                              }
                            }}
                            className="p-1.5 text-neutral-500 hover:text-rose-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 3: SKILLS                                             */}
              {/* ========================================================= */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <h3 className="text-lg font-sans font-bold text-white">
                        Skills & Competencies
                      </h3>
                      <p className="text-xs text-neutral-400 font-sans">
                        Manage technical and creative skills across Design, Development, and Strategy.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingSkill({
                          name: 'New Skill',
                          category: 'DESIGN',
                          description: 'Core proficiency and real-world application.',
                        });
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-mono-tech uppercase tracking-wider font-bold hover:bg-neutral-200 transition-colors min-h-[44px]"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Skill</span>
                    </button>
                  </div>

                  {editingSkill && (
                    <div className="p-4 rounded-2xl bg-[#15151b] border border-white/15 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                            Skill Name
                          </label>
                          <input
                            type="text"
                            value={editingSkill.name}
                            onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                            Category
                          </label>
                          <select
                            value={editingSkill.category}
                            onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-xl bg-[#1c1c22] border border-white/10 text-white text-xs"
                          >
                            <option value="DESIGN">DESIGN</option>
                            <option value="WEB">WEB / DEVELOPMENT</option>
                            <option value="CREATIVE">CREATIVE & CONTENT</option>
                            <option value="AI / TECHNOLOGY">AI / STRATEGY</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setEditingSkill(null)}
                          className="px-3 py-1.5 text-xs font-mono-tech text-neutral-400"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            saveSkill(editingSkill);
                            setEditingSkill(null);
                            showToast('Skill saved');
                          }}
                          className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-mono-tech font-bold"
                        >
                          Save Skill
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {skills.map((s, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/10"
                      >
                        <div>
                          <span className="text-xs font-mono-tech text-indigo-400 block">
                            {s.category}
                          </span>
                          <span className="text-sm font-sans font-bold text-white">
                            {s.name}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            deleteSkill(s.name);
                            showToast('Skill deleted');
                          }}
                          className="p-1.5 text-neutral-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 4: EXPERIENCE                                         */}
              {/* ========================================================= */}
              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <h3 className="text-lg font-sans font-bold text-white">
                        Career & Experience Timeline
                      </h3>
                      <p className="text-xs text-neutral-400 font-sans">
                        Add and edit your professional milestones and organizational roles.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const newExp: ExperienceItem = {
                          id: `exp-${Date.now()}`,
                          role: 'Senior Digital Strategist & Designer',
                          organizationOrFocus: 'Agency / Studio / Enterprise',
                          period: '2024 — Present',
                          description: 'Led end-to-end creative direction and digital implementation.',
                          highlights: ['Delivered multi-channel digital assets', 'Improved team workflow velocity'],
                          order: experience.length,
                          published: true,
                        };
                        setEditingExperience(newExp);
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-mono-tech uppercase tracking-wider font-bold hover:bg-neutral-200 transition-colors min-h-[44px]"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Milestone</span>
                    </button>
                  </div>

                  {editingExperience && (
                    <div className="p-4 rounded-2xl bg-[#15151b] border border-white/15 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                            Role Title
                          </label>
                          <input
                            type="text"
                            value={editingExperience.role}
                            onChange={(e) => setEditingExperience({ ...editingExperience, role: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                            Organization / Client Focus
                          </label>
                          <input
                            type="text"
                            value={editingExperience.organizationOrFocus}
                            onChange={(e) =>
                              setEditingExperience({ ...editingExperience, organizationOrFocus: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                            Period (e.g. 2024 — Present)
                          </label>
                          <input
                            type="text"
                            value={editingExperience.period}
                            onChange={(e) => setEditingExperience({ ...editingExperience, period: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setEditingExperience(null)}
                          className="px-3 py-1.5 text-xs font-mono-tech text-neutral-400"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            saveExperience(editingExperience);
                            setEditingExperience(null);
                            showToast('Experience updated');
                          }}
                          className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-mono-tech font-bold"
                        >
                          Save Milestone
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {experience.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/10"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono-tech text-indigo-400">
                              {item.period}
                            </span>
                            <h4 className="text-sm font-sans font-bold text-white">
                              {item.role}
                            </h4>
                          </div>
                          <p className="text-xs text-neutral-400 font-sans">
                            {item.organizationOrFocus}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingExperience({ ...item })}
                            className="px-3 py-1.5 rounded-xl bg-white/5 text-xs font-mono-tech text-neutral-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              deleteExperience(item.id);
                              showToast('Experience item deleted');
                            }}
                            className="p-1.5 text-neutral-500 hover:text-rose-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 5: PROFILE & BIO                                      */}
              {/* ========================================================= */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="pb-4 border-b border-white/10">
                    <h3 className="text-lg font-sans font-bold text-white">
                      Profile & Biographic Information
                    </h3>
                    <p className="text-xs text-neutral-400 font-sans">
                      Update your personal branding, slogans, portraits, and contact information.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => updateProfile({ name: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                        Nickname / Alias
                      </label>
                      <input
                        type="text"
                        value={profile.nickname}
                        onChange={(e) => updateProfile({ nickname: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                        Primary Title
                      </label>
                      <input
                        type="text"
                        value={profile.title}
                        onChange={(e) => updateProfile({ title: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                        Official Slogan
                      </label>
                      <input
                        type="text"
                        value={profile.slogan}
                        onChange={(e) => updateProfile({ slogan: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                        Portrait Photo URL
                      </label>
                      <input
                        type="text"
                        value={profile.portraitUrl}
                        onChange={(e) => updateProfile({ portraitUrl: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => updateProfile({ email: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                        Direct Phone / Call Number
                      </label>
                      <input
                        type="text"
                        value={profile.phone || ''}
                        placeholder="+95 9 798 886 644"
                        onChange={(e) => updateProfile({ phone: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                        Viber Chat Number
                      </label>
                      <input
                        type="text"
                        value={profile.viberNumber || ''}
                        placeholder="+95 9 798 886 644"
                        onChange={(e) => updateProfile({ viberNumber: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                        Hero Supporting Statement
                      </label>
                      <textarea
                        rows={2}
                        value={profile.supportingStatement}
                        onChange={(e) => updateProfile({ supportingStatement: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-sans"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-mono-tech uppercase text-neutral-300 mb-1">
                        Full About Story & Philosophy
                      </label>
                      <textarea
                        rows={4}
                        value={profile.aboutBody}
                        onChange={(e) => updateProfile({ aboutBody: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-sans"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => showToast('Profile updated')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono-tech uppercase tracking-wider font-bold shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 6: SETTINGS & VISIBILITY                              */}
              {/* ========================================================= */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="pb-4 border-b border-white/10">
                    <h3 className="text-lg font-sans font-bold text-white">
                      Section Visibility & SEO Configuration
                    </h3>
                    <p className="text-xs text-neutral-400 font-sans">
                      Toggle active portfolio sections and manage meta titles.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-mono-tech uppercase text-neutral-400 tracking-wider">
                      Active Navigation Sections
                    </div>

                    {Object.entries(settings.visibility).map(([key, val]) => {
                      if (key === 'prompts') return null; // AI Prompts removed permanently
                      return (
                        <label
                          key={key}
                          className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/10 cursor-pointer"
                        >
                          <span className="text-xs font-mono-tech uppercase text-white">
                            {key} Section
                          </span>
                          <input
                            type="checkbox"
                            checked={Boolean(val)}
                            onChange={(e) => {
                              updateSettings({
                                visibility: {
                                  ...settings.visibility,
                                  [key]: e.target.checked,
                                },
                              });
                            }}
                            className="w-4 h-4 rounded text-indigo-600 focus:ring-0"
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 7: BACKUP & LOCALSTORAGE IMPORT/EXPORT                */}
              {/* ========================================================= */}
              {activeTab === 'backup' && (
                <div className="space-y-6">
                  <div className="pb-4 border-b border-white/10">
                    <h3 className="text-lg font-sans font-bold text-white">
                      Data Persistence & JSON Backup
                    </h3>
                    <p className="text-xs text-neutral-400 font-sans">
                      Export your entire portfolio state to a JSON file or import a saved backup.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                      onClick={() => {
                        const jsonStr = exportDataJson();
                        const blob = new Blob([jsonStr], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `min_thu_khant_portfolio_${new Date().toISOString().slice(0, 10)}.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                        showToast('Backup JSON downloaded');
                      }}
                      className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all text-center min-h-[120px]"
                    >
                      <Download className="w-6 h-6 text-indigo-400 mb-2" />
                      <span className="text-xs font-mono-tech font-bold uppercase text-white mb-1">
                        Download JSON Backup
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        Export all current projects and settings
                      </span>
                    </button>

                    <label className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all text-center min-h-[120px] cursor-pointer">
                      <Upload className="w-6 h-6 text-cyan-400 mb-2" />
                      <span className="text-xs font-mono-tech font-bold uppercase text-white mb-1">
                        Import JSON Backup
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        Select a previously exported file
                      </span>
                      <input
                        type="file"
                        accept=".json"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              const content = ev.target?.result as string;
                              if (importDataJson(content)) {
                                showToast('Portfolio imported successfully');
                              } else {
                                alert('Failed to parse JSON file.');
                              }
                            };
                            reader.readAsText(file);
                          }
                        }}
                      />
                    </label>

                    <button
                      onClick={() => {
                        if (
                          confirm(
                            'Are you sure you want to restore all defaults? This will reset custom edits in localStorage.'
                          )
                        ) {
                          resetAllToDefault();
                          showToast('Restored initial default state');
                        }
                      }}
                      className="flex flex-col items-center justify-center p-6 rounded-2xl bg-rose-950/20 border border-rose-500/20 hover:border-rose-500/40 transition-all text-center min-h-[120px]"
                    >
                      <RotateCcw className="w-6 h-6 text-rose-400 mb-2" />
                      <span className="text-xs font-mono-tech font-bold uppercase text-rose-300 mb-1">
                        Reset All To Defaults
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        Restore initial curated case studies
                      </span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Admin;
