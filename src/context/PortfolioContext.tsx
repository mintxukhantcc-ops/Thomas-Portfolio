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
  
  // Admin Mutators
  updateProfile: (data: Partial<ProfileData>) => void;
  updateSettings: (data: Partial<PortfolioSettings>) => void;
  saveProject: (project: Project) => void;
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

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : initialProjects;
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

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch (e) {
      console.error(e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
    } catch (e) {
      console.error(e);
    }
  }, [skills]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(prompts));
    } catch (e) {
      console.error(e);
    }
  }, [prompts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(experience));
    } catch (e) {
      console.error(e);
    }
  }, [experience]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  // Handle URL hashtag or query navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as ActiveSection;
      if (['about', 'skills', 'projects', 'services', 'prompts', 'experience', 'contact'].includes(hash)) {
        setActiveSection(hash);
      } else if (hash === 'home' || !hash) {
        setActiveSection('home');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const updateProfile = (data: Partial<ProfileData>) => {
    setProfile((prev) => ({ ...prev, ...data }));
  };

  const updateSettings = (data: Partial<PortfolioSettings>) => {
    setSettings((prev) => ({ ...prev, ...data }));
  };

  const saveProject = (proj: Project) => {
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === proj.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = proj;
        return next;
      }
      return [...prev, proj];
    });
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const reorderProjects = (nextProjects: Project[]) => {
    setProjects(nextProjects);
  };

  const saveService = (srv: Service) => {
    setServices((prev) => {
      const idx = prev.findIndex((s) => s.id === srv.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = srv;
        return next;
      }
      return [...prev, srv];
    });
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const saveSkill = (skill: SkillItem) => {
    setSkills((prev) => {
      const idx = prev.findIndex((s) => s.name.toLowerCase() === skill.name.toLowerCase());
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = skill;
        return next;
      }
      return [...prev, skill];
    });
  };

  const deleteSkill = (name: string) => {
    setSkills((prev) => prev.filter((s) => s.name !== name));
  };

  const savePrompt = (prompt: PromptItem) => {
    setPrompts((prev) => {
      const idx = prev.findIndex((p) => p.id === prompt.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = prompt;
        return next;
      }
      return [...prev, prompt];
    });
  };

  const deletePrompt = (id: string) => {
    setPrompts((prev) => prev.filter((p) => p.id !== id));
  };

  const saveExperience = (item: ExperienceItem) => {
    setExperience((prev) => {
      const idx = prev.findIndex((e) => e.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        return next;
      }
      return [...prev, item];
    });
  };

  const deleteExperience = (id: string) => {
    setExperience((prev) => prev.filter((e) => e.id !== id));
  };

  const resetAllToDefault = () => {
    setProfile(initialProfile);
    setProjects(initialProjects);
    setServices(initialServices);
    setSkills(initialSkills);
    setPrompts(initialPrompts);
    setExperience(initialExperience);
    setSettings(initialSettings);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.SKILLS);
    localStorage.removeItem(STORAGE_KEYS.PROMPTS);
    localStorage.removeItem(STORAGE_KEYS.EXPERIENCE);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
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
      if (parsed.profile) setProfile(parsed.profile);
      if (parsed.projects) setProjects(parsed.projects);
      if (parsed.services) setServices(parsed.services);
      if (parsed.skills) setSkills(parsed.skills);
      if (parsed.prompts) setPrompts(parsed.prompts);
      if (parsed.experience) setExperience(parsed.experience);
      if (parsed.settings) setSettings(parsed.settings);
      return true;
    } catch {
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
        setActiveSection: (sec) => {
          setActiveSection(sec);
          window.location.hash = sec === 'home' ? '' : sec;
        },
        selectedProjectId,
        setSelectedProjectId,
        isAdminOpen,
        setIsAdminOpen,
        updateProfile,
        updateSettings,
        saveProject,
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
