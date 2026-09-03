import { ProfileData, Project, Service, SkillItem, ExperienceItem, PortfolioSettings, PromptItem, AudioTrack } from '../types';

export const initialProfile: ProfileData = {
  name: 'Min Thu Khant',
  nickname: 'Thomas',
  title: 'UI/UX & Graphic Designer · Prompt Engineer · Digital Content Strategist · Audio/Voiceover Artist',
  slogan: 'Logically Play The Creativity',
  headline: "Hi, I'm Min Thu Khant (Thomas).",
  supportingStatement:
    'Bridging high-craft UI/UX & graphic design, advanced prompt engineering, strategic content systems, and bilingual voiceover narration into cohesive digital brand experiences.',
  positioning:
    'I bridge creative strategy, visual craft, content production, and technical web development. From bespoke aesthetic clinic identities and high-converting video scriptwriting to full-stack React web portals and generative AI prompt engineering, my core advantage is connecting strategic logic with refined execution.',
  portraitUrl: 'https://lh3.googleusercontent.com/d/1Pz77FIirx9DBi0-ExQwq2Ze9ehthkXAr',
  statusText: 'Available for Select Q3/Q4 Projects · Yangon & Remote',
  featureTags: [
    'UI/UX & GRAPHIC DESIGN',
    'PROMPT ENGINEERING',
    'CONTENT STRATEGY',
    'BILINGUAL VOICEOVER',
    'FULL-STACK REACT / FIREBASE',
  ],
  email: 'Mintxukhantcc@gmail.com',
  phone: '+95 9 798 886 644',
  viberNumber: '+95 9 798 886 644',
  location: 'Yangon, Myanmar',
  primaryCtaText: 'EXPLORE CASE STUDIES',
  secondaryCtaText: "LET'S WORK TOGETHER",
  socials: [
    { platform: 'LinkedIn', url: 'https://linkedin.com', label: 'Connect on LinkedIn' },
    { platform: 'GitHub', url: 'https://github.com', label: 'Code Repositories' },
    { platform: 'Telegram', url: 'https://t.me', label: 'Direct Telegram' },
  ],
  aboutHeadline: 'Design Craftsmanship & Content Strategy Meets Full-Stack Engineering',
  aboutBody:
    "I'm Thomas (Min Thu Khant), a versatile digital practitioner based in Yangon. Over the years, I've cultivated a rare dual-engine workflow that unites visual design, generative AI prompt engineering, structured content strategy, and modern web application development.\n\nWhether developing a full-stack clinical management portal with Firebase authentication, orchestrating soft-opening campaigns for premium clinics, crafting high-converting social calendars, or narrating commercial broadcast spots in Burmese and English, I deliver holistic brand solutions built to scale.",
  philosophyHeadline: 'LOGICALLY PLAY THE CREATIVITY',
  philosophySub: 'Logic gives creativity direction. Creativity gives logic purpose.',
};

export const initialProjects: Project[] = [
  {
    id: 'the-may-clinic',
    projectNumber: '01',
    title: 'The May Clinic',
    category: 'Campaign Strategy · Visual Branding · Video Direction',
    role: 'Lead Content Strategist & Visual Brand Designer',
    summary:
      'Soft Opening Campaign, Speed-Ramp Tour Video Scripts & Visual Branding Package for a luxury medical aesthetic clinic.',
    heroImage: '/src/assets/images/project_campaign_1788374585030.jpg',
    images: [
      {
        id: 'may-1',
        url: '/src/assets/images/project_campaign_1788374585030.jpg',
        caption: 'Speed-Ramp Clinic Tour Video Scriptboards & On-Set Shot Sequence',
        type: 'storyboard',
      },
      {
        id: 'may-2',
        url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
        caption: 'Luxury Interior Tour Frames & Speed-Ramp Transition Timing',
        type: 'general',
      },
      {
        id: 'may-3',
        url: 'https://images.unsplash.com/photo-1512290900672-1f0237583693?auto=format&fit=crop&w=1200&q=80',
        caption: 'Visual Branding Deck, Typography Palette & Clinic Signage Guidelines',
        type: 'document',
      },
      {
        id: 'may-4',
        url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
        caption: 'Soft-Opening Launch Event Collateral & Meta-Compliant Promotion Assets',
        type: 'general',
      },
    ],
    keyDeliverables: [
      'Comprehensive soft opening campaign timeline & launch event roadmap',
      'Dynamic speed-ramp tour video script with second-by-second camera cue sheets',
      'Full visual branding package (logo variations, gold/champagne color palette, typography)',
      'Doctor & aesthetic specialist interview question scripts and lighting guides',
      'Meta advertising policy-compliant graphic templates for promotional ad sets',
      'Print collateral: treatment menu booklets, VIP invitation cards, and interior signage',
    ],
    tools: ['Adobe Illustrator', 'Adobe Premiere Pro', 'CapCut Pro', 'Notion', 'Figma', 'Meta Ads Manager'],
    technologies: ['Visual Branding', 'Speed-Ramp Video Scripting', 'Campaign Architecture', 'Healthcare Ad Compliance'],
    outcome:
      'The soft opening campaign generated over 250+ direct booking inquiries in the first 14 days, with the speed-ramp tour video achieving a 68% average watch duration on TikTok and Meta reels.',
    projectLink: 'https://github.com',
    videoEmbedUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    voiceoverSamples: [
      {
        id: 'may-vo-1',
        title: 'The May Clinic — Soft Opening Cinematic Tour',
        language: 'Burmese',
        duration: '0:42',
        tone: 'Sophisticated, Elegant, Welcoming',
        scriptSnippet:
          'အလှတရားရဲ့ အဓိပ္ပာယ်သစ်ကို The May Clinic မှာ စတင်ခံစားလိုက်ပါ။ ခေတ်မီဆန်းသစ်တဲ့ နိုင်ငံတကာအဆင့်မီ နည်းပညာများ၊ နွေးထွေးတဲ့ ဝန်ဆောင်မှုနဲ့ အတူ...',
      },
    ],
    published: true,
    order: 1,
  },
  {
    id: 'timeless-aesthetic-clinic',
    projectNumber: '02',
    title: 'Timeless Aesthetic Clinic',
    category: 'Video Content Strategy · Testimonial Campaigns',
    role: 'Creative Director & Video Content Strategist',
    summary:
      'Weight Loss Testimonial Campaign & Video Content Strategy delivering authentic patient transformations and medical credibility.',
    heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'time-1',
        url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Cinematic Patient Transformation Studio Setup & Consultation Room',
        type: 'general',
      },
      {
        id: 'time-2',
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
        caption: 'Body Composition Analysis & Medical Device Overlay Graphics',
        type: 'dashboard',
      },
      {
        id: 'time-3',
        url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
        caption: 'Authentic Patient Interview Frames & Empathy-Driven Storyboarding',
        type: 'storyboard',
      },
    ],
    keyDeliverables: [
      'Multi-stage testimonial narrative structure (Discovery, Struggle, Journey, Result)',
      'Doctor-guided medical weight-loss explanation scripts for credibility',
      'Meta advertising compliant before/after narrative framing without sensationalism',
      'Interview questionnaires engineered to capture genuine emotional patient milestones',
      'Short-form vertical video cut downs (15s hook, 30s summary, 60s deep-dive)',
      'Thumbnail visual design system with high CTR typography',
    ],
    tools: ['Adobe After Effects', 'Figma', 'Descript', 'Notion', 'Sony Alpha Workflows'],
    technologies: ['Patient Storytelling', 'Medical Narrative Compliance', 'Conversion Video Editing', 'A/B Hook Testing'],
    outcome:
      'Decreased client acquisition cost (CAC) on Meta ads by 34% through authentic testimonial engagement rather than cold clinical promotions.',
    projectLink: 'https://github.com',
    videoEmbedUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    voiceoverSamples: [
      {
        id: 'time-vo-1',
        title: 'Timeless Aesthetic — Journey to Confidence',
        language: 'English',
        duration: '0:35',
        tone: 'Empathetic, Inspiring, Authoritative',
        scriptSnippet:
          'Real transformation is not just about weight loss — it is about reclaiming vitality, confidence, and metabolic health with medical precision.',
      },
    ],
    published: true,
    order: 2,
  },
  {
    id: 'pharmaplus-pharmacy',
    projectNumber: '03',
    title: 'PharmaPlus Pharmacy',
    category: 'Social Media Strategy · Content Execution · Graphic Design',
    role: 'Digital Content Strategist & Visual Designer',
    summary:
      'Social Media Strategy, Visual Design & 12-Post Content Calendar Execution establishing trust and health education across regional digital channels.',
    heroImage: '/src/assets/images/project_social_1788374600689.jpg',
    images: [
      {
        id: 'pharma-1',
        url: '/src/assets/images/project_social_1788374600689.jpg',
        caption: '12-Post Monthly Editorial Calendar & Four-Pillar Content Matrix',
        type: 'document',
      },
      {
        id: 'pharma-2',
        url: 'https://images.unsplash.com/photo-1586015555751-63c20579e0a0?auto=format&fit=crop&w=1200&q=80',
        caption: 'Pharmacist Q&A Carousel Slides & Medicine Storage Infographics',
        type: 'mobile',
      },
      {
        id: 'pharma-3',
        url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1200&q=80',
        caption: 'Clean Pharmaceutical Visual Identity & Supplement Education Layouts',
        type: 'general',
      },
    ],
    keyDeliverables: [
      'Complete 12-post structured monthly editorial calendar',
      'Four core content pillars: Medical Literacy, Supplement Facts, Clinic Synergy, Seasonal Health',
      'High-contrast visual design templates for multi-slide educational carousels',
      'Bilingual caption copywriting with Myanmar medical terms and clean English summaries',
      'Targeted regional hashtag clusters and comment moderation protocols',
      'Weekly engagement metric tracking and best-performing post retrospectives',
    ],
    tools: ['Figma', 'Adobe Illustrator', 'Canva Pro', 'Google Sheets', 'Meta Business Suite'],
    technologies: ['Content Matrix Architecture', 'Bilingual Health Copywriting', 'Information Hierarchy', 'Audience Analytics'],
    outcome:
      'Increased organic page followers by 142% over a 3-month cadence, while establishing PharmaPlus as a dependable first-stop health educator in Yangon.',
    projectLink: 'https://github.com',
    published: true,
    order: 3,
  },
  {
    id: 'summr-boutique',
    projectNumber: '04',
    title: 'Summ/R Boutique',
    category: 'Brand Identity · Social Campaign · Creative Direction',
    role: 'Brand Designer & Creative Campaign Producer',
    summary:
      'Brand Identity & Grand Opening Social Campaign for a contemporary fashion & lifestyle apparel boutique.',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'summr-1',
        url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
        caption: 'Flagship Storefront & Grand Opening Architectural Showcase',
        type: 'general',
      },
      {
        id: 'summr-2',
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Lookbook Direction, Editorial Layouts & Seasonal Capsule Catalog',
        type: 'storyboard',
      },
      {
        id: 'summr-3',
        url: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Typography System, Custom Hangtags & Eco-Packaging Guidelines',
        type: 'document',
      },
      {
        id: 'summr-4',
        url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Influencer Seeding Kit Box & Instagram Countdown Story Series',
        type: 'mobile',
      },
    ],
    keyDeliverables: [
      'Boutique brand identity system: wordmark, minimalist monogram, warm terracotta color palette',
      'Grand opening 3-week teaser countdown social campaign (Reveal, Capsule Tease, VIP Day)',
      'Editorial lookbook layout & seasonal collection photography styling guidelines',
      'Influencer seeding invitation cards, packaging design, and unboxing guidelines',
      'Bilingual promotional video scripts highlighting fabric craft and modern silhouettes',
      'In-store display typography and garment wash-care label designs',
    ],
    tools: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Lightroom', 'CapCut Pro'],
    technologies: ['Brand Identity Systems', 'Fashion Editorial Direction', 'Launch Event Strategy', 'Packaging Craft'],
    outcome:
      'Opening weekend capsule collection sold out 85% of inventory in the first 48 hours following the coordinated influencer unveiling and teaser reel sequence.',
    projectLink: 'https://github.com',
    published: true,
    order: 4,
  },
  {
    id: 'fullstack-clinic-portal',
    projectNumber: '05',
    title: 'Full-Stack Clinic Web Portal',
    category: 'Full-Stack Web App · Cloud Architecture · UI/UX',
    role: 'Lead Full-Stack Developer & UI/UX Designer',
    summary:
      'React/Vite/Firebase Admin Dashboard with Authentication and User Role Management for multi-provider healthcare clinics.',
    heroImage: '/src/assets/images/project_healthcare_1788374571145.jpg',
    images: [
      {
        id: 'portal-1',
        url: '/src/assets/images/project_healthcare_1788374571145.jpg',
        caption: 'Main Administrative Dashboard with Real-Time Booking Telemetry',
        type: 'desktop',
      },
      {
        id: 'portal-2',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        caption: 'Role-Based Access Control (SuperAdmin, Doctor, Receptionist, Patient)',
        type: 'dashboard',
      },
      {
        id: 'portal-3',
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Mobile-First Patient Booking Workflow & Digital Intake Form',
        type: 'mobile',
      },
      {
        id: 'portal-4',
        url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
        caption: 'Firestore Database Security Rules Architecture & Query Profiler',
        type: 'document',
      },
    ],
    keyDeliverables: [
      'Responsive React 18 + Vite frontend with Tailwind CSS design token system',
      'Firebase Authentication supporting email/password, password reset, and protected routes',
      'Granular Role-Based Access Control (RBAC): SuperAdmin, Physician, Receptionist, Patient',
      'Firestore real-time document listener for active patient queues and appointment scheduling',
      'Patient electronic intake forms with mobile-optimized responsive input touch targets',
      'Audit logging and secure storage of treatment records adhering to privacy best practices',
    ],
    tools: ['React 18', 'Vite', 'TypeScript', 'Tailwind CSS', 'Firebase Firestore', 'Firebase Auth', 'Figma'],
    technologies: ['React SPA', 'TypeScript Strict Mode', 'Firebase RBAC', 'Cloud Firestore', 'Tailwind Design System'],
    outcome:
      'Replaced manual paper scheduling, eliminating booking overlap errors entirely and saving clinic administrative staff an estimated 18 hours per week.',
    projectLink: 'https://github.com',
    published: true,
    order: 5,
  },
];

export const initialSkills: SkillItem[] = [
  // DESIGN
  {
    name: 'Figma',
    category: 'Design',
    description: 'Component design systems, responsive auto-layout, interactive prototypes & tokens',
    relatedProjectIds: ['fullstack-clinic-portal', 'the-may-clinic', 'summr-boutique'],
  },
  {
    name: 'UI/UX',
    category: 'Design',
    description: 'User journey mapping, mobile-first information architecture, accessibility & ergonomics',
    relatedProjectIds: ['fullstack-clinic-portal', 'pharmaplus-pharmacy'],
  },
  {
    name: 'Visual Branding',
    category: 'Design',
    description: 'Brand identity guidelines, logo marks, color theory, typography pairings & brand manuals',
    relatedProjectIds: ['the-may-clinic', 'summr-boutique', 'pharmaplus-pharmacy'],
  },
  {
    name: 'Graphic Design',
    category: 'Design',
    description: 'Marketing collateral, promotional print assets, packaging craft & high-CTR social banners',
    relatedProjectIds: ['summr-boutique', 'the-may-clinic', 'pharmaplus-pharmacy'],
  },

  // DEVELOPMENT
  {
    name: 'React',
    category: 'Development',
    description: 'Modern functional components, context architecture, custom hooks & performance tuning',
    relatedProjectIds: ['fullstack-clinic-portal'],
  },
  {
    name: 'Vite',
    category: 'Development',
    description: 'Next-generation build pipelines, hot module bundling & optimized asset delivery',
    relatedProjectIds: ['fullstack-clinic-portal'],
  },
  {
    name: 'TypeScript',
    category: 'Development',
    description: 'Strict typing, reusable interfaces, type narrowing & reliable frontend engineering',
    relatedProjectIds: ['fullstack-clinic-portal'],
  },
  {
    name: 'Tailwind CSS',
    category: 'Development',
    description: 'Utility-first styling, bespoke design tokens, fluid layouts & dark-mode architectures',
    relatedProjectIds: ['fullstack-clinic-portal'],
  },
  {
    name: 'Firebase',
    category: 'Development',
    description: 'Cloud Firestore schemas, Firebase Authentication, RBAC rules & secure cloud deployment',
    relatedProjectIds: ['fullstack-clinic-portal'],
  },
  {
    name: 'Express',
    category: 'Development',
    description: 'Node.js REST API middleware, JSON payload validation, route security & proxy handlers',
    relatedProjectIds: ['fullstack-clinic-portal'],
  },

  // AI & CONTENT
  {
    name: 'Prompt Engineering',
    category: 'AI & Content',
    description: 'Structured master prompts, parameter tuning (--v 6, --style raw), negative weighting & multimodality',
    relatedProjectIds: ['the-may-clinic', 'summr-boutique'],
  },
  {
    name: 'Video Scripting',
    category: 'AI & Content',
    description: 'Speed-ramp visual cues, 15s/30s/60s pacing, narrative tension, hook design & shot lists',
    relatedProjectIds: ['the-may-clinic', 'timeless-aesthetic-clinic'],
  },
  {
    name: 'Voiceover / Audio Production',
    category: 'AI & Content',
    description: 'Bilingual Burmese & English commercial narration, timecoded syncing & studio sound mastering',
    relatedProjectIds: ['the-may-clinic', 'timeless-aesthetic-clinic'],
  },
];

export const initialPrompts: PromptItem[] = [
  {
    id: 'prompt-1',
    title: 'Minimalist 3D Glassmorphism & Matte Metallic Brand Logo',
    category: '3D Logo',
    platform: 'Midjourney v6',
    aspectRatio: '1:1',
    promptText:
      'A luxury minimalist 3D geometric monogram logo of interlocking letterforms, frosted translucent glass with subtle refractive caustics and brushed titanium edge accents, floating weightlessly over a pristine deep obsidian studio pedestal, soft studio rim lighting, cinematic depth of field, Octane render, ultra-high definition, clean hyper-minimalist aesthetics --ar 1:1 --v 6.0 --style raw --chaos 12',
    negativePrompt:
      'blurry, noisy, low resolution, cheap plastic, 2D vector, busy background, watermarks, text, typography, distorted geometry',
    parameters: ['--v 6.0', '--style raw', '--ar 1:1', '--chaos 12', 'Octane 8K', 'Frosted Glass Shader'],
    sampleImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    notes:
      'Engineered for luxury branding concepts, premium tech marks, and high-end visual identity exploration.',
  },
  {
    id: 'prompt-2',
    title: 'Commercial Skincare Botanical Water Splash Macro',
    category: 'Skincare Commercial',
    platform: 'Midjourney v6',
    aspectRatio: '16:9',
    promptText:
      'Commercial hero product photography of a frosted amber glass cosmetic serum dropper bottle with minimalist gold foil typography, bursting through crystal-clear suspended water droplets and morning botanical mist, vibrant fresh eucalyptus leaves in soft focus, high-speed photography capturing liquid turbulence, natural morning sunlight with soft caustics, Hasselblad H6D-100c medium format clarity --ar 16:9 --v 6.0 --style raw',
    negativePrompt:
      'distorted bottle, illegible labels, muddy water, artificial flash, overexposed, low detail, grain',
    parameters: ['--v 6.0', '--style raw', '--ar 16:9', 'Medium Format 100MP', 'High-Speed Water Freeze', 'Volumetric Sunlight'],
    sampleImageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
    notes:
      'Designed for skincare brand campaigns, organic beauty collateral, and e-commerce hero banners.',
  },
  {
    id: 'prompt-3',
    title: 'Aesthetic Medical Clinic Architectural Interior',
    category: 'Aesthetic Architecture',
    platform: 'Stable Diffusion XL',
    aspectRatio: '16:9',
    promptText:
      'High-end modern medical aesthetic dermatology clinic reception lounge, fluid organic curves, fluted travertine stone walls, seamless microcement flooring, concealed warm LED cove lighting at 3000K, brass sanitary fixtures, indoor minimalist zen bonsai garden, architectural digest photography style, wide angle perspective, pristine sterile yet tranquil ambiance, ultra-detailed architectural rendering',
    negativePrompt:
      'crowded, dark, dirty, dated hospital aesthetic, clinical harsh lighting, fluorescent glare, distorted perspective',
    parameters: ['SDXL 1.0', 'Steps: 45', 'CFG Scale: 7.5', 'Lighting: Warm 3000K Cove', 'Travertine Texture Shader'],
    sampleImageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    notes:
      'Used as spatial moodboards and pre-visualization assets for interior designers and clinic directors.',
  },
  {
    id: 'prompt-4',
    title: 'Luxury Organic Cosmetic Serum Flacon Render',
    category: 'Product Render',
    platform: 'Gemini Imagen 3',
    aspectRatio: '1:1',
    promptText:
      'Studio product render of a luxury matte ivory ceramic cosmetic dispenser bottle resting on a chiseled slab of raw white Italian Carrara marble, fine botanical shadows of olive leaves cast softly across the stone surface, gentle golden hour daylight from 45 degree angle, tactile stone texture, ultra sharp macro focus, high-end editorial cosmetics campaign',
    negativePrompt:
      'low quality, oversaturated, deformed shape, floating objects, harsh shadows, artificial cartoon style',
    parameters: ['Imagen 3 Pro', 'Quality: Max', 'Lighting: 45° Diffused Sunlight', 'Shader: Matte Ceramic + Raw Marble'],
    sampleImageUrl: 'https://images.unsplash.com/photo-1608248597359-59754f15d7e5?auto=format&fit=crop&w=1200&q=80',
    notes:
      'Calibrated for clean social media product mockups and visual lookbook catalog generation.',
  },
];

export const initialVoiceTracks: AudioTrack[] = [
  {
    id: 'track-1',
    title: 'The May Clinic — Soft Opening Tour Reel',
    category: 'Commercial Healthcare',
    language: 'Burmese' as const,
    duration: '0:42',
    tone: 'Warm, Elegant, Reassuring',
    scriptSnippet:
      'သင့်ရဲ့ သဘာဝအလှတရားကို အနုပညာဆန်ဆန် ပိုမိုတောက်ပလာစေဖို့... The May Clinic မှာ ခေတ်မီဆန်းသစ်တဲ့ နည်းပညာများ၊ နွေးထွေးတဲ့ ဝန်ဆောင်မှုနဲ့ အတူ ကြိုဆိုနေပါပြီ။',
  },
  {
    id: 'track-2',
    title: 'Timeless Aesthetic — Health & Vitality Campaign',
    category: 'Medical Narrative',
    language: 'English' as const,
    duration: '0:35',
    tone: 'Confident, Empathetic, Authority',
    scriptSnippet:
      'Real transformation begins when scientific precision meets patient care. Discover your path to metabolic confidence and renewed vitality.',
  },
  {
    id: 'track-3',
    title: 'Tech & Modern Digital Platform Overview',
    category: 'Product Showcase',
    language: 'English' as const,
    duration: '0:28',
    tone: 'Modern, Energetic, Dynamic',
    scriptSnippet:
      'Where strategic logic meets creative execution. Seamless interfaces built for human impact, engineered to elevate your brand from the very first click.',
  },
  {
    id: 'track-4',
    title: 'PharmaPlus — Safe Medicine Storage Guide',
    category: 'Public Health Education',
    language: 'Burmese' as const,
    duration: '0:38',
    tone: 'Trustworthy, Clear, Engaging',
    scriptSnippet:
      'ဆေးဝါးများ မှန်ကန်စွာ သိမ်းဆည်းခြင်းဟာ သင့်မိသားစု ကျန်းမာရေးအတွက် အလွန်အရေးကြီးပါတယ်။ PharmaPlus ရဲ့ အကြံပြုချက်လေးတွေကို အတူတူ လေ့လာကြည့်လိုက်ရအောင်။',
  },
];

export const initialServices: Service[] = [
  {
    id: 'srv-01',
    number: '01',
    title: 'SOCIAL MEDIA STRATEGY & 12-POST EDITORIAL CALENDARS',
    shortDescription:
      'Structured 12-post monthly social media content calendars built around content pillars, engaging copy, visual direction, and Meta ad policy compliance.',
    fullDescription:
      'I craft intentional content roadmaps that convert passive scrollers into committed brand advocates. Every calendar balances educational value, aesthetic brand consistency, and algorithm-friendly distribution tailored specifically for regional and global consumer behaviors.',
    deliverables: [
      '12-post monthly content calendar',
      'Defined content pillars & topic hierarchies',
      'Bilingual caption copy & targeted hashtags',
      'Visual moodboards & design templates',
      'Meta advertising policy pre-screen compliance',
    ],
    keyFocus: 'Consistency · Pillar Frameworks · Audience Retention',
    published: true,
    order: 1,
  },
  {
    id: 'srv-02',
    number: '02',
    title: 'VIDEO SCRIPTWRITING & SPEED-RAMP PRODUCTION DIRECTION',
    shortDescription:
      'Video concepts, scripts, storyboards, shot lists, interviews, and production coordination for commercial and promotional content.',
    fullDescription:
      'From 15-second fast-paced TikTok/Reels hooks to cinematic clinic walkthroughs and executive interviews, I script every frame with camera movements, dialogue pacing, and on-screen text overlays designed for viral engagement and clear message delivery.',
    deliverables: [
      'Commercial video scripts with timestamps',
      'Scene-by-scene shot lists & visual cues',
      'Speed-ramp & transition planning',
      'Interview questionnaires for specialists & clients',
      'Production call sheets & coordination guides',
    ],
    keyFocus: 'Cinematic Hooks · Pacing · High Viewer Retention',
    published: true,
    order: 2,
  },
  {
    id: 'srv-03',
    number: '03',
    title: 'BILINGUAL BURMESE & ENGLISH VOICEOVER',
    shortDescription:
      'Professional Burmese and English narration for commercial videos, brand reels, promotional content, and educational media.',
    fullDescription:
      'A voice connects emotionally where visuals set the stage. As a native bilingual artist, I deliver authentic Burmese narration with culturally nuanced tone, alongside clean, articulate international English voiceovers tailored precisely to your brand persona.',
    deliverables: [
      'Broadcast-grade Burmese audio narration',
      'Clear, articulate English commercial voiceover',
      'Time-synced audio deliverables (WAV / 320kbps MP3)',
      'Multiple style takes (Warm, corporate, enthusiastic, soothing)',
      'Full script localization & pronunciation review',
    ],
    keyFocus: 'Vocal Nuance · Studio Clarity · Dual Language Fluency',
    published: true,
    order: 3,
  },
  {
    id: 'srv-04',
    number: '04',
    title: 'UI/UX & VISUAL BRAND IDENTITY SYSTEMS',
    shortDescription:
      'Cohesive visual branding, logo identities, design systems in Figma, and marketing collateral for clinics and consumer ventures.',
    fullDescription:
      'Great design is intuitive, memorable, and functional. I design complete visual identities from brand discovery to logo design, typography styling, packaging, and high-fidelity Figma UI/UX prototypes ready for developer handoff.',
    deliverables: [
      'Complete brand identity manuals & typography palettes',
      'Logo suites (Primary, secondary, badges, favicon)',
      'Figma responsive design prototypes & UI kits',
      'Social media post templates & packaging mockups',
      'Handoff specifications for engineering & print teams',
    ],
    keyFocus: 'Aesthetic Precision · Usability · Brand Memorability',
    published: true,
    order: 4,
  },
  {
    id: 'srv-05',
    number: '05',
    title: 'FULL-STACK WEB DEVELOPMENT & PORTAL SYSTEMS',
    shortDescription:
      'Mobile-first web applications, UI/UX, authentication, databases, responsive interfaces, and custom administrative systems.',
    fullDescription:
      'I engineer digital platforms that look exquisite and run reliably. Specializing in mobile-first web apps, modern frontends (React, Vite, Tailwind), Firebase backends with role-based permissions, and custom administrative dashboards that empower clients to manage their content effortlessly.',
    deliverables: [
      'Mobile-first responsive web apps & SPAs',
      'Figma to clean code translation',
      'Authentication & role-based access systems',
      'Cloud database integrations (Firestore / APIs)',
      'Intuitive custom admin portals & content controls',
    ],
    keyFocus: 'Performance · Mobile-First UI · Architectural Rigor',
    published: true,
    order: 5,
  },
];

export const initialExperience: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'UI/UX Designer, Digital Content Strategist & Creative Technologist',
    organizationOrFocus: 'Independent Practice (Freelance)',
    period: '2023 — Present',
    description:
      'Spearheading end-to-end digital solutions for aesthetic clinics, healthcare networks, and lifestyle retail brands across Yangon and remote clients. Uniting visual brand design, prompt engineering, video scripting, bilingual voiceover, and full-stack React web apps.',
    highlights: [
      'Delivered full-stack clinic web portal with Firebase authentication and role-based permissions',
      'Directed soft-opening campaigns and speed-ramp tour video production for The May Clinic',
      'Architected 12-post monthly strategic content calendars and Meta ad compliance for PharmaPlus',
    ],
    order: 1,
    published: true,
  },
  {
    id: 'exp-2',
    role: 'Freelance Content Manager & Scriptwriter',
    organizationOrFocus: 'Aesthetic & Healthcare Ventures',
    period: '2022 — 2023',
    description:
      'Directed creative launch assets for aesthetic clinic soft-openings, specialized dermatology treatments, and physician interviews.',
    highlights: [
      'Authored speed-ramp clinic tour video scripts, doctor Q&A templates, and scene shot lists',
      'Supervised video production sets to ensure adherence to healthcare ad standards',
      'Synchronized social media promotion schedules with on-site clinic opening events',
    ],
    order: 2,
    published: true,
  },
  {
    id: 'exp-3',
    role: 'Bilingual Voiceover Artist & Commercial Copywriter',
    organizationOrFocus: 'Media & Digital Commercial Projects',
    period: '2021 — 2022',
    description:
      'Recorded voice narration and authored targeted commercial copy for promotional videos, product launches, and brand reels.',
    highlights: [
      'Delivered broadcast-quality audio narration in both Burmese and English',
      'Created precise timecoded voice scripts synchronized with video frame edits',
      'Collaborated directly with post-production editors for audio sweetening and clarity',
    ],
    order: 3,
    published: true,
  },
];

export const initialSettings: PortfolioSettings = {
  siteTitle: 'Min Thu Khant — UI/UX Designer, Prompt Engineer & Content Strategist',
  seoDescription:
    'Portfolio of Min Thu Khant (Thomas) — UI/UX & Graphic Designer, Prompt Engineer, Digital Content Strategist, and Audio/Voiceover Artist.',
  visibility: {
    about: true,
    skills: true,
    projects: true,
    services: true,
    prompts: true,
    experience: true,
    contact: true,
  },
};
