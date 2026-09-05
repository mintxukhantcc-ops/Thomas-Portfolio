export interface ProjectImage {
  id: string;
  url: string;
  caption?: string;
  type?: 'desktop' | 'mobile' | 'dashboard' | 'storyboard' | 'document' | 'general';
}

export interface VoiceoverSample {
  id: string;
  title: string;
  language: 'Burmese' | 'English';
  duration: string;
  scriptSnippet: string;
  tone: string;
  audioSrc?: string;
}

export interface Project {
  id: string;
  projectNumber: string;
  title: string;
  category: string;
  role: string;
  summary: string;
  heroImage: string;
  images: ProjectImage[];
  keyDeliverables: string[];
  tools: string[];
  technologies: string[];
  outcome?: string;
  projectLink?: string;
  videoEmbedUrl?: string;
  voiceoverSamples?: VoiceoverSample[];
  published: boolean;
  order: number;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  keyFocus: string;
  published: boolean;
  order: number;
}

export type SkillCategory = 'Design' | 'Development' | 'AI & Content' | 'CREATIVE' | 'DESIGN' | 'WEB' | 'AI / TECHNOLOGY';

export interface SkillItem {
  name: string;
  category: SkillCategory;
  description?: string;
  relatedProjectIds?: string[];
}

export interface PromptItem {
  id: string;
  title: string;
  category: '3D Logo' | 'Skincare Commercial' | 'Aesthetic Architecture' | 'Product Render';
  platform: 'Midjourney v6' | 'Stable Diffusion XL' | 'DALL-E 3' | 'Gemini Imagen 3';
  aspectRatio: string;
  promptText: string;
  negativePrompt?: string;
  parameters: string[];
  sampleImageUrl: string;
  notes?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organizationOrFocus: string;
  period: string;
  description: string;
  highlights: string[];
  order: number;
  published: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface NarrativeAct {
  actNumber: string;
  title: string;
  period: string;
  summary: string;
  fullNarrative: string;
  milestones: string[];
  tags: string[];
  keyEnvironments?: string[];
}

export interface FutureGoalItem {
  area: string;
  title: string;
  description: string;
  keyInitiatives: string[];
}

export interface ProfileData {
  name: string;
  nickname: string;
  title: string;
  slogan: string;
  headline: string;
  supportingStatement: string;
  positioning: string;
  portraitUrl: string;
  avatarUrl?: string;
  statusText: string;
  featureTags: string[];
  email: string;
  phone?: string;
  viberNumber?: string;
  location: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  socials: SocialLink[];
  aboutHeadline: string;
  aboutBody: string;
  philosophyHeadline: string;
  philosophySub: string;
  birthDate?: string;
  birthPlace?: string;
  narrativeActs?: NarrativeAct[];
  futureGoals?: FutureGoalItem[];
}

export interface AudioTrack {
  id: string;
  title: string;
  category: string;
  language: 'Burmese' | 'English' | string;
  duration: string;
  tone: string;
  scriptSnippet: string;
  audioSrc?: string;
}

export interface SectionVisibility {
  about: boolean;
  skills: boolean;
  projects: boolean;
  services: boolean;
  prompts?: boolean;
  experience: boolean;
  contact: boolean;
}

export interface PortfolioSettings {
  siteTitle: string;
  seoDescription: string;
  visibility: SectionVisibility;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  scopes: string[];
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'archived';
}

export type ActiveSection = 'home' | 'about' | 'skills' | 'projects' | 'services' | 'prompts' | 'experience' | 'contact';
