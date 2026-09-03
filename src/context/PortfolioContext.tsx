import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProfileData,
  Project,
  Service,
  SkillItem,
  ExperienceItem,
  PortfolioSettings,
  ActiveSection,
  PromptItem,
  Inquiry,
} from '../types';
import {
  initialProfile,
  initialProjects,
  initialServices,
  initialSkills,
  initialExperience,
  initialSettings,
  initialPrompts,
} from '../data/initialData';

/**
 * Converts Google Drive sharing or view URLs to direct image CDN links (lh3.googleusercontent.com).
 */
export function getDirectDriveUrl(url?: string): string {
  if (!url) return '';
  const trimmed = url.trim();

  // If already an lh3 direct link
  if (trimmed.includes('lh3.googleusercontent.com/d/')) {
    return trimmed;
  }

  // Pattern 1: drive.google.com/file/d/<FILE_ID>/view...
  const fileDMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch && fileDMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${fileDMatch[1]}`;
  }

  // Pattern 2: drive.google.com/(open|uc)?id=<FILE_ID>
  const idMatch = trimmed.match(/drive\.google\.com\/(?:open|uc)\?[^#]*id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
  }

  // Pattern 3: drive.google.com/thumbnail?id=<FILE_ID>
  const thumbMatch = trimmed.match(/drive\.google\.com\/thumbnail\?[^#]*id=([a-zA-Z0-9_-]+)/);
  if (thumbMatch && thumbMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${thumbMatch[1]}`;
  }

  return trimmed;
}

interface PortfolioContextType {
  profile: ProfileData;
  projects: Project[];
  services: Service[];
  skills: SkillItem[];
  prompts: PromptItem[];
  experience: ExperienceItem[];
  settings: PortfolioSettings;
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  // Real-time Admin Mutators with Immediate Persistence
  updateProfile: (data: Partial<ProfileData>) => void;
  updateSettings: (data: Partial<PortfolioSettings>) => void;
  saveProject: (project: Project) => void;
  updateProjectField: <K extends keyof Project>(id: string, field: K, value: Project[K]) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (projects: Project[]) => void;
  saveService: (service: Service) => void;
  deleteService: (id: string) => void;
  saveSkill: (skill: SkillItem) => void;
  deleteSkill: (name: string) => void;
  savePrompt: (prompt: PromptItem) => void;
  deletePrompt: (id: string) => void;
  saveExperience: (item: ExperienceItem) => void;
  deleteExperience: (id: string) => void;
  resetAllToDefault: () => void;
  resetToDefaults?: () => void;
  exportDataJson: () => string;
  exportData?: () => string;
  importDataJson: (jsonStr: string) => boolean;
  importData?: (jsonStr: string) => boolean;

  // Backend Integration & Inquiries
  inquiries: Inquiry[];
  fetchInquiries: () => Promise<void>;
  deleteInquiry: (id: string) => Promise<boolean>;
  updateInquiryStatus: (id: string, status: 'unread' | 'read' | 'archived') => Promise<boolean>;
  submitInquiry: (data: { name: string; email: string; scopes: string[]; message: string }) => Promise<{ success: boolean; error?: string }>;
  syncWithServer: () => Promise<boolean>;
  isServerSynced: boolean;
}

const STORAGE_KEYS = {
  PROFILE: 'mtk_portfolio_profile_v3',
  PROJECTS: 'mtk_portfolio_projects_v3',
  SERVICES: 'mtk_portfolio_services_v3',
  SKILLS: 'mtk_portfolio_skills_v3',
  PROMPTS: 'mtk_portfolio_prompts_v3',
  EXPERIENCE: 'mtk_portfolio_experience_v3',
  SETTINGS: 'mtk_portfolio_settings_v3',
};

// Safe synchronous localStorage writer
const persistStorage = <T,>(key: string, data: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`[Storage Sync Error] Failed to persist ${key}:`, err);
  }
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.portraitUrl) {
          parsed.portraitUrl = getDirectDriveUrl(parsed.portraitUrl);
        }
        if (parsed.avatarUrl) {
          parsed.avatarUrl = getDirectDriveUrl(parsed.avatarUrl);
        }
        return parsed;
      }
      return initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (saved) {
        const list = JSON.parse(saved) as Project[];
        return list.map((p) => ({
          ...p,
          heroImage: getDirectDriveUrl(p.heroImage),
          images: p.images?.map((img) => ({
            ...img,
            url: getDirectDriveUrl(img.url),
          })) || [],
        }));
      }
      return initialProjects;
    } catch {
      return initialProjects;
    }
  });

  const [services, setServices] = useState<Service[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return saved ? JSON.parse(saved) : initialServices;
    } catch {
      return initialServices;
    }
  });

  const [skills, setSkills] = useState<SkillItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
      return saved ? JSON.parse(saved) : initialSkills;
    } catch {
      return initialSkills;
    }
  });

  const [prompts, setPrompts] = useState<PromptItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROMPTS);
      return saved ? JSON.parse(saved) : initialPrompts;
    } catch {
      return initialPrompts;
    }
  });

  const [experience, setExperience] = useState<ExperienceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXPERIENCE);
      return saved ? JSON.parse(saved) : initialExperience;
    } catch {
      return initialExperience;
    }
  });

  const [settings, setSettings] = useState<PortfolioSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : initialSettings;
    } catch {
      return initialSettings;
    }
  });

  const [activeSection, setActiveSection] = useState<ActiveSection>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isServerSynced, setIsServerSynced] = useState<boolean>(false);

  // Synchronous background localStorage sync effects
  useEffect(() => {
    persistStorage(STORAGE_KEYS.PROFILE, profile);
  }, [profile]);

  useEffect(() => {
    persistStorage(STORAGE_KEYS.PROJECTS, projects);
  }, [projects]);

  useEffect(() => {
    persistStorage(STORAGE_KEYS.SERVICES, services);
  }, [services]);

  useEffect(() => {
    persistStorage(STORAGE_KEYS.SKILLS, skills);
  }, [skills]);

  useEffect(() => {
    persistStorage(STORAGE_KEYS.PROMPTS, prompts);
  }, [prompts]);

  useEffect(() => {
    persistStorage(STORAGE_KEYS.EXPERIENCE, experience);
  }, [experience]);

  useEffect(() => {
    persistStorage(STORAGE_KEYS.SETTINGS, settings);
  }, [settings]);

  // Synchronize with backend server (/api/portfolio)
  const syncWithServer = async (): Promise<boolean> => {
    try {
      const payload = {
        profile,
        projects,
        services,
        skills,
        prompts,
        experience,
        settings,
      };
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsServerSynced(true);
        return true;
      } else if (res.status === 405 || res.status === 404) {
        // Static hosting environment (e.g. Cloudflare Pages or GitHub Pages)
        // LocalStorage is already synchronized and active
        setIsServerSynced(true);
        return true;
      }
    } catch {
      // LocalStorage remains the primary persistent store
    }
    return false;
  };

  // Initial load from backend if available (read-only)
  useEffect(() => {
    const loadServerData = async () => {
      try {
        const res = await fetch('/api/portfolio', {
          headers: { Accept: 'application/json' },
        });
        if (res.ok) {
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const json = await res.json();
            if (json.success && json.data) {
              const d = json.data;
              // Only adopt server data if localStorage was empty or default
              const hasLocalCustomization = Boolean(localStorage.getItem(STORAGE_KEYS.PROJECTS));
              if (!hasLocalCustomization) {
                if (d.profile) setProfile(d.profile);
                if (d.projects) setProjects(d.projects);
                if (d.services) setServices(d.services);
                if (d.skills) setSkills(d.skills);
                if (d.prompts) setPrompts(d.prompts);
                if (d.experience) setExperience(d.experience);
                if (d.settings) setSettings(d.settings);
              }
              setIsServerSynced(true);
            }
          }
        }
      } catch {
        // Silent fallback to localStorage
      }
    };
    loadServerData();
  }, []);

  // Fetch inquiries from backend
  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/contact');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.inquiries)) {
          setInquiries(data.inquiries);
        }
      }
    } catch (err) {
      console.warn('[Inquiries Fetch Error]:', err);
    }
  };

  const deleteInquiry = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
        return true;
      }
    } catch (err) {
      console.error('[Delete Inquiry Error]:', err);
    }
    return false;
  };

  const updateInquiryStatus = async (id: string, status: 'unread' | 'read' | 'archived'): Promise<boolean> => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
        );
        return true;
      }
    } catch (err) {
      console.error('[Update Inquiry Error]:', err);
    }
    return false;
  };

  const submitInquiry = async (data: {
    name: string;
    email: string;
    scopes: string[];
    message: string;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        if (json.inquiry) {
          setInquiries((prev) => [json.inquiry, ...prev]);
        }
        return { success: true };
      }
      return { success: false, error: json.error || 'Submission failed' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error' };
    }
  };

  // Handle URL hashtag navigation with deep-linking support for projects
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
      if (!rawHash || rawHash === 'home') {
        setActiveSection('home');
        setSelectedProjectId(null);
        return;
      }

      if (rawHash.startsWith('projects/') || rawHash.startsWith('project/')) {
        const pId = rawHash.replace(/^(?:projects|project)\//, '');
        setActiveSection('projects');
        setSelectedProjectId(pId || null);
        return;
      }

      if (rawHash.startsWith('project=')) {
        const pId = rawHash.replace(/^project=/, '');
        setActiveSection('projects');
        setSelectedProjectId(pId || null);
        return;
      }

      const validSections: ActiveSection[] = ['about', 'skills', 'projects', 'services', 'prompts', 'experience', 'contact'];
      if (validSections.includes(rawHash as ActiveSection)) {
        setActiveSection(rawHash as ActiveSection);
        if (rawHash !== 'projects') {
          setSelectedProjectId(null);
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSetActiveSection = (section: ActiveSection) => {
    setActiveSection(section);
    if (section === 'home') {
      if (window.location.hash) {
        history.pushState(null, '', window.location.pathname + window.location.search);
      }
    } else if (section === 'projects') {
      if (selectedProjectId) {
        window.location.hash = `projects/${selectedProjectId}`;
      } else {
        window.location.hash = 'projects';
      }
    } else {
      window.location.hash = section;
    }
  };

  const handleSetSelectedProjectId = (id: string | null) => {
    setSelectedProjectId(id);
    if (id) {
      window.location.hash = `projects/${id}`;
    } else if (activeSection === 'projects') {
      window.location.hash = 'projects';
    }
  };

  // Synchronous, reactive state setters that guarantee zero data loss
  const updateProfile = (data: Partial<ProfileData>) => {
    setProfile((prev) => {
      const cleanedData = { ...data };
      if (cleanedData.portraitUrl) {
        cleanedData.portraitUrl = getDirectDriveUrl(cleanedData.portraitUrl);
      }
      if (cleanedData.avatarUrl) {
        cleanedData.avatarUrl = getDirectDriveUrl(cleanedData.avatarUrl);
      }
      const next = { ...prev, ...cleanedData };
      persistStorage(STORAGE_KEYS.PROFILE, next);
      return next;
    });
  };

  const updateSettings = (data: Partial<PortfolioSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...data };
      persistStorage(STORAGE_KEYS.SETTINGS, next);
      return next;
    });
  };

  const saveProject = (proj: Project) => {
    const cleanedProj = {
      ...proj,
      heroImage: getDirectDriveUrl(proj.heroImage),
      images: proj.images?.map((img) => ({
        ...img,
        url: getDirectDriveUrl(img.url),
      })) || [],
    };

    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === cleanedProj.id);
      let next: Project[];
      if (idx >= 0) {
        next = [...prev];
        next[idx] = cleanedProj;
      } else {
        next = [cleanedProj, ...prev];
      }
      persistStorage(STORAGE_KEYS.PROJECTS, next);
      return next;
    });
  };

  const updateProjectField = <K extends keyof Project>(id: string, field: K, value: Project[K]) => {
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx === -1) return prev;
      const next = [...prev];
      let cleanedValue = value;
      if (field === 'heroImage' && typeof value === 'string') {
        cleanedValue = getDirectDriveUrl(value) as Project[K];
      }
      next[idx] = { ...next[idx], [field]: cleanedValue };
      persistStorage(STORAGE_KEYS.PROJECTS, next);
      return next;
    });
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => {
      const next = prev.filter((p) => p.id !== id);
      persistStorage(STORAGE_KEYS.PROJECTS, next);
      return next;
    });
  };

  const reorderProjects = (nextProjects: Project[]) => {
    setProjects(nextProjects);
    persistStorage(STORAGE_KEYS.PROJECTS, nextProjects);
  };

  const saveService = (srv: Service) => {
    setServices((prev) => {
      const idx = prev.findIndex((s) => s.id === srv.id);
      let next: Service[];
      if (idx >= 0) {
        next = [...prev];
        next[idx] = srv;
      } else {
        next = [...prev, srv];
      }
      persistStorage(STORAGE_KEYS.SERVICES, next);
      return next;
    });
  };

  const deleteService = (id: string) => {
    setServices((prev) => {
      const next = prev.filter((s) => s.id !== id);
      persistStorage(STORAGE_KEYS.SERVICES, next);
      return next;
    });
  };

  const saveSkill = (skill: SkillItem) => {
    setSkills((prev) => {
      const idx = prev.findIndex((s) => s.name.toLowerCase() === skill.name.toLowerCase());
      let next: SkillItem[];
      if (idx >= 0) {
        next = [...prev];
        next[idx] = skill;
      } else {
        next = [...prev, skill];
      }
      persistStorage(STORAGE_KEYS.SKILLS, next);
      return next;
    });
  };

  const deleteSkill = (name: string) => {
    setSkills((prev) => {
      const next = prev.filter((s) => s.name !== name);
      persistStorage(STORAGE_KEYS.SKILLS, next);
      return next;
    });
  };

  const savePrompt = (prompt: PromptItem) => {
    setPrompts((prev) => {
      const idx = prev.findIndex((p) => p.id === prompt.id);
      let next: PromptItem[];
      if (idx >= 0) {
        next = [...prev];
        next[idx] = prompt;
      } else {
        next = [...prev, prompt];
      }
      persistStorage(STORAGE_KEYS.PROMPTS, next);
      return next;
    });
  };

  const deletePrompt = (id: string) => {
    setPrompts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      persistStorage(STORAGE_KEYS.PROMPTS, next);
      return next;
    });
  };

  const saveExperience = (item: ExperienceItem) => {
    setExperience((prev) => {
      const idx = prev.findIndex((e) => e.id === item.id);
      let next: ExperienceItem[];
      if (idx >= 0) {
        next = [...prev];
        next[idx] = item;
      } else {
        next = [...prev, item];
      }
      persistStorage(STORAGE_KEYS.EXPERIENCE, next);
      return next;
    });
  };

  const deleteExperience = (id: string) => {
    setExperience((prev) => {
      const next = prev.filter((e) => e.id !== id);
      persistStorage(STORAGE_KEYS.EXPERIENCE, next);
      return next;
    });
  };

  const resetAllToDefault = () => {
    setProfile(initialProfile);
    setProjects(initialProjects);
    setServices(initialServices);
    setSkills(initialSkills);
    setPrompts(initialPrompts);
    setExperience(initialExperience);
    setSettings(initialSettings);
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  };

  const exportDataJson = (): string => {
    return JSON.stringify(
      {
        profile,
        projects,
        services,
        skills,
        prompts,
        experience,
        settings,
        exportDate: new Date().toISOString(),
      },
      null,
      2
    );
  };

  const importDataJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.profile) {
        if (parsed.profile.portraitUrl) {
          parsed.profile.portraitUrl = getDirectDriveUrl(parsed.profile.portraitUrl);
        }
        if (parsed.profile.avatarUrl) {
          parsed.profile.avatarUrl = getDirectDriveUrl(parsed.profile.avatarUrl);
        }
        setProfile(parsed.profile);
        persistStorage(STORAGE_KEYS.PROFILE, parsed.profile);
      }
      if (parsed.projects) {
        const cleanedProjects = parsed.projects.map((p: Project) => ({
          ...p,
          heroImage: getDirectDriveUrl(p.heroImage),
          images: p.images?.map((img) => ({
            ...img,
            url: getDirectDriveUrl(img.url),
          })) || [],
        }));
        setProjects(cleanedProjects);
        persistStorage(STORAGE_KEYS.PROJECTS, cleanedProjects);
      }
      if (parsed.services) {
        setServices(parsed.services);
        persistStorage(STORAGE_KEYS.SERVICES, parsed.services);
      }
      if (parsed.skills) {
        setSkills(parsed.skills);
        persistStorage(STORAGE_KEYS.SKILLS, parsed.skills);
      }
      if (parsed.prompts) {
        setPrompts(parsed.prompts);
        persistStorage(STORAGE_KEYS.PROMPTS, parsed.prompts);
      }
      if (parsed.experience) {
        setExperience(parsed.experience);
        persistStorage(STORAGE_KEYS.EXPERIENCE, parsed.experience);
      }
      if (parsed.settings) {
        setSettings(parsed.settings);
        persistStorage(STORAGE_KEYS.SETTINGS, parsed.settings);
      }
      return true;
    } catch (err) {
      console.error('[Import Data Error]', err);
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        projects,
        services,
        skills,
        prompts,
        experience,
        settings,
        activeSection,
        setActiveSection: handleSetActiveSection,
        selectedProjectId,
        setSelectedProjectId: handleSetSelectedProjectId,
        isAdminOpen,
        setIsAdminOpen,
        updateProfile,
        updateSettings,
        saveProject,
        updateProjectField,
        deleteProject,
        reorderProjects,
        saveService,
        deleteService,
        saveSkill,
        deleteSkill,
        savePrompt,
        deletePrompt,
        saveExperience,
        deleteExperience,
        resetAllToDefault,
        resetToDefaults: resetAllToDefault,
        exportDataJson,
        exportData: exportDataJson,
        importDataJson,
        importData: importDataJson,
        inquiries,
        fetchInquiries,
        deleteInquiry,
        updateInquiryStatus,
        submitInquiry,
        syncWithServer,
        isServerSynced,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
