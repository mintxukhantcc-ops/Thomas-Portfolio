import { 
  ProfileData, 
  Project, 
  Service, 
  SkillItem, 
  ExperienceItem, 
  PortfolioSettings, 
  PromptItem, 
  AudioTrack 
} from '../types';

export const initialProfile: ProfileData = {
  name: 'Min Thu Khant',
  nickname: 'Thomas',
  birthDate: 'March 19, 2000',
  birthPlace: 'Yangon, Myanmar',
  title: 'Brand & Content Strategist · Web Developer · Creative Director',
  slogan: 'This is logically playing the creativity.',
  headline: "Hi, I'm Min Thu Khant (Thomas).",
  supportingStatement:
    'Helping aesthetic clinics, doctors, and lifestyle brands create engaging video content, establish distinct visual identities, and build modern digital platforms.',
  positioning:
    'I work where creative ideas meet practical execution. Over the past few years, I’ve managed content and shoots for Dr. Shumanyee, directed launch campaigns for clinics like The May Clinic and Timeless, and built web platforms like Glasskin Aesthetic. Whether it’s scripting a 15-second reel or building a React dashboard, I focus on work that looks great and actually delivers results.',
  portraitUrl: 'https://lh3.googleusercontent.com/d/1Pz77FIirx9DBi0-ExQwq2Ze9ehthkXAr',
  statusText: 'Available for Select Projects · Yangon & Remote',
  featureTags: [
    'AESTHETIC HEALTHCARE STRATEGY',
    'EXECUTIVE PA & TALENT MANAGEMENT',
    'UI/UX & FULL-STACK REACT / FIREBASE',
    'GENERATIVE AI PROMPT ENGINEERING',
    'SPEED-RAMP VIDEO DIRECTION',
    'BILINGUAL VOICEOVER',
  ],
  email: 'Mintxukhantcc@gmail.com',
  phone: '+95 9 798 886 644',
  viberNumber: '+95 9 798 886 644',
  location: 'Yangon, Myanmar',
  primaryCtaText: 'VIEW MY WORK',
  secondaryCtaText: "LET'S WORK TOGETHER",
  socials: [
    { platform: 'LinkedIn', url: 'https://linkedin.com', label: 'Connect on LinkedIn' },
    { platform: 'GitHub', url: 'https://github.com', label: 'Code Repositories' },
    { platform: 'Telegram', url: 'https://t.me', label: 'Direct Telegram' },
  ],
  aboutHeadline: 'Connecting Creative Direction, Strategy, and Code',
  aboutBody:
    "Hi, I'm Min Thu Khant—most people know me as Thomas. I was born on March 19, 2000, and I live and work in Yangon, Myanmar.\n\nMy work sits right where creative ideas meet practical execution. Over the past few years, I’ve found my niche working with aesthetic clinics, doctors, and lifestyle brands—helping them shape their brand identity, produce engaging short-form videos, and build clean, modern web applications.\n\nMy journey started during university, doing hands-on media production at Pyaesone Entertainment while training as a baritone singer. From there, I moved into digital marketing at FlyMya, handled commercial accounts at O'Ze Marketing Agency, and sharpened my design and coding skills at the Crossworks bootcamp. Today, I work closely with Dr. Shumanyee managing her content and personal assistant workflows, while directing campaigns for clinics like The May Clinic and Timeless, and building web platforms like Glasskin Aesthetic.\n\nThrough every project, my approach is simple: 'This is logically playing the creativity.' Great creative ideas need structure to actually deliver results, and technical systems need taste and empathy to connect with real people.",
  philosophyHeadline: 'THIS IS LOGICALLY PLAYING THE CREATIVITY',
  philosophySub: 'Good ideas need structure to actually work, and systems need imagination to connect with people. Logic gives creativity direction; creativity gives logic purpose.',
  narrativeActs: [
    {
      actNumber: 'Act I',
      title: 'The Expressive Roots & Student Life',
      period: '2000 — 2021',
      summary: 'Early creative work, hands-on production at Pyaesone Entertainment, and vocal training as a baritone.',
      fullNarrative:
        "My creative journey started long before I ever worked in an agency or wrote a line of code. Growing up in Yangon (born March 19, 2000), I was always fascinated by how sound, rhythm, and visuals work together to tell a story.\n\nDuring university, I joined Pyaesone Entertainment as a creative generalist. That was my first real taste of the production world—getting my hands on camera gear, editing video, and learning how a set actually runs. At the same time, I fell in love with vocal performance and audio composition. Training as a baritone singer taught me music theory, harmonic balance, and vocal dynamics. It turns out that understanding tempo and tone is one of the best foundations you can have for video pacing, voiceover delivery, and knowing how to hold an audience's attention.\n\nI also spent time working in customer service and F&B jobs during those student years. It taught me how to listen carefully, read a room, and stay patient under pressure—skills that are just as valuable today when I'm managing video shoots or working with clients.",
      milestones: [
        'Joined Pyaesone Entertainment as a creative generalist, gaining real hands-on experience with cameras, video editing, and production sets',
        'Trained in music theory and vocal performance as a baritone singer, building an ear for harmonic balance and vocal dynamics',
        'Developed an instinctive feel for rhythm, tempo, and storytelling cadence that now shapes my video directing style',
        'Learned interpersonal communication, customer empathy, and event coordination through student service and F&B roles',
      ],
      tags: ['Creative Generalist', 'Pyaesone Entertainment', 'Baritone Vocalist', 'Audio Composition', 'Student Life'],
      keyEnvironments: ['Yangon, Myanmar', 'Pyaesone Entertainment', 'Audio & Vocal Practice Studio'],
    },
    {
      actNumber: 'Act II',
      title: 'Agency Career & Marketing Growth',
      period: '2022 — Mid 2025',
      summary: 'Stepping into commercial marketing at FlyMya, client account work at O\'Ze, and technical training at Crossworks.',
      fullNarrative:
        "In 2022, I made the jump into professional marketing. I wanted to see how creative ideas hold up when real business goals, budgets, and metrics are on the line.\n\nI started at FlyMya, working my way up from an intern to Junior Digital Marketer. Managing travel content calendars and social campaigns taught me how to capture attention and keep an audience engaged week after week. In early 2024, I moved into agency life as a Key Account Intern at O'Ze Marketing Agency. There, I managed client communications, helped coordinate social strategies, and saw firsthand how commercial campaigns are structured and measured.\n\nTo push my technical abilities further, I enrolled in an intensive bootcamp at Crossworks. It was a rigorous, practical immersion in SEO, performance media buying, advanced video editing, and UI/UX design in Figma. Juggling client deadlines while learning new technical tools was a defining period for me. It's where I formulated my personal slogan: \"This is logically playing the creativity.\" Logic gives creativity direction, and creativity gives logic purpose.",
      milestones: [
        'FlyMya (2022–2023): Advanced from intern to Junior Digital Marketer, managing travel content calendars, social campaigns, and audience engagement',
        "O'Ze Marketing Agency (March 2024–June 2025): Key Account Intern managing client correspondence, campaign execution, and social roadmaps",
        'Crossworks Bootcamp: Completed an intensive technical immersion in SEO, paid media buying, advanced video editing, and Figma UI/UX design',
        'Coined my career philosophy and personal slogan: "This is logically playing the creativity."',
      ],
      tags: ['FlyMya', "O'Ze Marketing Agency", 'Crossworks Bootcamp', 'Key Account Management', 'SEO & Performance Media'],
      keyEnvironments: ['FlyMya Travel Platform', "O'Ze Marketing Agency", 'Crossworks Bootcamp Yangon'],
    },
    {
      actNumber: 'Act III',
      title: 'Aesthetic Healthcare Strategist & Executive Assistant',
      period: 'July 2025 — Present',
      summary: 'Personal assistant and content manager for Dr. Shumanyee, plus video campaign direction for top aesthetic clinics.',
      fullNarrative:
        "In July 2025, I stepped into the aesthetic healthcare space—an industry where visual presentation and medical credibility matter equally. I became the freelance Personal Assistant and Content Manager for Dr. Shumanyee, one of Myanmar's most prominent aesthetic doctors and digital creators.\n\nIn this role, I handle both creative direction and daily business operations:\n• Video & Content Direction: I prepare filming call sheets, coordinate shoot schedules between clinics and studios, direct dynamic speed-ramp video concepts, and write scripts that make aesthetic treatments feel accessible.\n• Business Operations: I manage brand collaboration guidelines, vet incoming partnership offers, negotiate quotations, and keep her content calendar organized and consistent.\n\nThat work quickly opened doors with other premier clinics in Yangon. For The May Clinic's soft opening, I wrote the launch copy and storyboarded their speed-ramp clinic tour video. For Timeless Aesthetic Clinic, I designed an interview framework for patient weight-loss testimonials—ensuring the stories were genuine, emotional, and fully compliant with Meta’s strict medical advertising rules.",
      milestones: [
        'Dr. Shumanyee: Freelance Personal Assistant & Content Manager handling filming call sheets, shoot schedules, speed-ramp video concepts, and script approvals',
        'Business Operations: Managed brand partnership guidelines, invitation vetting, quotation agreements, and official corporate correspondence',
        'Timeless Aesthetic Clinic: Created interview frameworks, production shot lists, and video scripts for a medical weight-loss testimonial campaign',
        'The May Clinic: Wrote soft-opening promotional copy, launch announcements, and speed-ramp clinic tour video storyboards',
        'Healthcare Ad Compliance: Scripted and structured video content to pass Meta\'s medical advertising policies without losing creative appeal',
      ],
      tags: ['Dr. Shumanyee', 'Aesthetic Healthcare', 'Personal Assistant', 'Speed-Ramp Direction', 'The May Clinic', 'Timeless Clinic'],
      keyEnvironments: ['Dr. Shumanyee Practice', 'The May Clinic', 'Timeless Aesthetic Clinic', 'Filming & Studio Sets'],
    },
    {
      actNumber: 'Act IV',
      title: 'Full-Stack Web App Development, Branding & Generative AI',
      period: 'Late 2025 — Present (2026)',
      summary: 'Designing websites, building full-stack web applications, and experimenting with generative AI.',
      fullNarrative:
        "Producing great content made me want to build the digital platforms behind it, too. Over the past year, I've expanded into UI/UX design, full-stack web development, and generative AI workflows.\n\nOn the design and branding side, I created UI/UX prototypes and learning flows for Crossworks in Figma, and handled the complete brand identity for SUMM/R boutique—from logo design and packaging all the way to directing their grand opening event. For Glasskin Aesthetic, I designed and built their entire website from scratch, creating a clean, easy-to-navigate experience for prospective patients.\n\nOn the technical side, I build modern web applications using React, Vite, Express, and Firebase, implementing role-based access control (RBAC) and clean database structures. I also spend significant time with generative AI prompt engineering—developing calibrated master prompts for 3D logos, cosmetic product renders, and architectural moodboards across Midjourney, SDXL, and Gemini Imagen 3. For me, code and AI aren't separate from creative work; they're just more tools to bring ideas to life.",
      milestones: [
        'Glasskin Aesthetic Website: Designed and coded the full website with a modern aesthetic and intuitive treatment discovery flows',
        'Crossworks Platform: Built interactive Figma prototypes, student enrollment flows, and a cohesive design system',
        'SUMM/R Boutique: Created the full brand identity, logo suite, and packaging, plus filmed and directed their grand opening event',
        'Full-Stack Web Development: Built web apps with React, Vite, Express, and Firebase featuring Role-Based Access Control (RBAC)',
        'Generative AI Prompting: Formulated calibrated prompts for 3D brand marks, skincare product shots, and architectural moodboards',
      ],
      tags: ['Glasskin Aesthetic', 'Crossworks UI/UX', 'SUMM/R Boutique', 'React & Firebase', 'Generative AI Prompt Engineering'],
      keyEnvironments: ['Glasskin Platform', 'SUMM/R Flagship Store', 'Figma Prototyping', 'Google AI Studio'],
    },
  ],
  futureGoals: [
    {
      area: 'Digital Product Expansion',
      title: 'Practical Web Applications & Portals',
      description:
        'Building useful, reliable web applications for clinics and small businesses—from patient appointment systems to internal team dashboards that save hours of manual work.',
      keyInitiatives: [
        'Secure patient management tools built with React, Firebase, and Express',
        'Modular design systems in Figma connected directly to Tailwind CSS',
        'Fast, mobile-friendly interfaces designed for everyday clinic workflows',
      ],
    },
    {
      area: 'Generative AI Integration',
      title: 'Prompt Engineering & Creative Workflows',
      description:
        'Using generative AI to accelerate visual exploration—generating realistic product mockups, 3D brand concepts, and moodboards in hours instead of weeks.',
      keyInitiatives: [
        'Calibrated prompts for photorealistic cosmetic and skincare product imagery',
        'Multi-model asset exploration using Gemini Imagen 3, Midjourney, and SDXL',
        'Streamlined creative pipelines that help small teams produce studio-quality visuals',
      ],
    },
    {
      area: 'Brand & Content Consulting',
      title: 'Strategic Direction for Aesthetic & Lifestyle Brands',
      description:
        'Helping doctors, clinic founders, and lifestyle entrepreneurs find their voice, tell honest stories, and turn viewers into loyal clients.',
      keyInitiatives: [
        'Launch roadmaps for new clinics and medical practices',
        'Personal brand management and collaboration vetting for creators and doctors',
        'Short-form video concepts with high retention and clear messaging',
      ],
    },
  ],
  heroCards: [
    {
      id: 'portrait-primary',
      title: 'Min Thu Khant',
      subtitle: 'Creative Technologist',
      tag: 'YANGON · AVAILABLE',
      image: '/src/assets/images/thomas_portrait_1788374555669.jpg',
      roleBadge: 'CREATIVE TECH',
    },
    {
      id: 'portrait-creative',
      title: 'Min Thu Khant',
      subtitle: 'UI/UX & Visual Direction',
      tag: 'YANGON · AVAILABLE',
      image: '/src/assets/images/thomas_portrait_creative_1788463053334.jpg',
      roleBadge: 'UI / UX CRAFT',
    },
    {
      id: 'portrait-tech',
      title: 'Min Thu Khant',
      subtitle: 'Prompt Engineer & AI Specialist',
      tag: 'YANGON · AVAILABLE',
      image: '/src/assets/images/thomas_portrait_tech_1788463073746.jpg',
      roleBadge: 'NEURAL AI LAB',
    },
    {
      id: 'portrait-studio',
      title: 'Min Thu Khant',
      subtitle: 'Content Strategist & Narrator',
      tag: 'YANGON · AVAILABLE',
      image: '/src/assets/images/thomas_portrait_studio_1788463090198.jpg',
      roleBadge: 'AUDIO & SCRIPT',
    },
    {
      id: 'portrait-outdoor',
      title: 'Min Thu Khant',
      subtitle: 'Full-Stack Web Architect',
      tag: 'YANGON · AVAILABLE',
      image: '/src/assets/images/thomas_portrait_outdoor_1788463111352.jpg',
      roleBadge: 'FULL-STACK CLOUD',
    },
  ],
  aboutImages: [
    {
      id: 'about-img-1',
      title: 'On-Set Clinic Tour Filming & Cue Sequences',
      caption: 'Directing camera moves and speed-ramp transitions inside The May Clinic prior to their official opening.',
      url: '/src/assets/images/project_campaign_1788374585030.jpg',
      category: 'On-Set & Direction',
      tag: 'Video Production',
      year: '2025',
      featured: true,
    },
    {
      id: 'about-img-2',
      title: 'Voiceover Recording & Audio Pacing Session',
      caption: 'Recording bilingual narration for clinic launch videos and patient transformation stories.',
      url: '/src/assets/images/project_voiceover_1788374615002.jpg',
      category: 'Studio & Audio',
      tag: 'Bilingual Voiceover',
      year: '2024 — Present',
      featured: true,
    },
    {
      id: 'about-img-3',
      title: 'Executive Talent & Call Sheet Management',
      caption: 'Organizing shoot schedules, call sheets, and brand sponsorships for Dr. Shumanyee.',
      url: '/src/assets/images/project_social_1788374600689.jpg',
      category: 'On-Set & Direction',
      tag: 'Talent Management',
      year: '2025',
      featured: false,
    },
    {
      id: 'about-img-4',
      title: 'Clinic Administration Dashboard Architecture',
      caption: 'Engineering the real-time Firebase booking management portal with role-based access control.',
      url: '/src/assets/images/project_healthcare_1788374571145.jpg',
      category: 'Design & Tech',
      tag: 'React / Firebase',
      year: '2026',
      featured: true,
    },
    {
      id: 'about-img-5',
      title: 'The May Clinic Soft-Opening Launch Event',
      caption: 'VIP treatment suites, signage typography, and reception styling for the launch campaign.',
      url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
      category: 'Clinic Launches',
      tag: 'The May Clinic',
      year: '2025',
      featured: false,
    },
    {
      id: 'about-img-6',
      title: 'Design System Tokens & UI Kit Exploration',
      caption: 'Figma component library with auto-layout and tokenized color palettes for the Crossworks learning platform.',
      url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      category: 'Design & Tech',
      tag: 'Figma UI/UX',
      year: '2024',
      featured: false,
    },
    {
      id: 'about-img-7',
      title: 'SUMM/R Flagship Boutique Opening Event',
      caption: 'Filming and directing the grand opening recap video, lookbook styling, and packaging design suite.',
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      category: 'Clinic Launches',
      tag: 'Retail Launch',
      year: '2025',
      featured: false,
    },
    {
      id: 'about-img-8',
      title: 'Patient Testimonial Studio Staging',
      caption: 'Framing compassionate patient interviews for medical weight-loss transformation stories with ad compliance.',
      url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      category: 'On-Set & Direction',
      tag: 'Timeless Clinic',
      year: '2025',
      featured: false,
    },
    {
      id: 'about-img-9',
      title: 'Generative AI Cosmetic Serum Render Exploration',
      caption: 'Calibrated master prompt macro renders of botanical skincare dropper bottles across Imagen 3 and Midjourney.',
      url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
      category: 'Design & Tech',
      tag: 'Generative AI',
      year: '2026',
      featured: true,
    },
  ],
};

export const initialProjects: Project[] = [
  {
    id: 'the-may-clinic',
    projectNumber: '01',
    title: 'The May Clinic',
    category: 'Campaign Strategy · Visual Branding · Video Direction',
    role: 'Lead Content Strategist & Visual Brand Designer',
    summary:
      'Brand identity, launch copywriting, and speed-ramp tour video direction for a luxury medical aesthetic clinic opening in Yangon.',
    heroImage: '/src/assets/images/project_campaign_1788374585030.jpg',
    images: [
      {
        id: 'may-1',
        url: '/src/assets/images/project_campaign_1788374585030.jpg',
        caption: 'Speed-ramp clinic tour storyboard and on-set camera cue sequence',
        type: 'storyboard',
      },
      {
        id: 'may-2',
        url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
        caption: 'Luxury interior tour frames and speed-ramp transition timing',
        type: 'general',
      },
      {
        id: 'may-3',
        url: 'https://images.unsplash.com/photo-1512290900672-1f0237583693?auto=format&fit=crop&w=1200&q=80',
        caption: 'Visual branding deck, typography choices, and clinic signage guide',
        type: 'document',
      },
      {
        id: 'may-4',
        url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
        caption: 'Soft-opening launch event assets and social media promo templates',
        type: 'general',
      },
    ],
    keyDeliverables: [
      'Promotional copywriting for the soft-opening campaign, announcements, and launch schedule',
      'Dynamic speed-ramp tour video storyboards with second-by-second camera cue sheets',
      'Complete visual branding package (logo variations, gold/champagne color palette, typography)',
      'Doctor and aesthetic specialist interview question scripts and lighting guides',
      'Meta advertising-compliant graphic templates for promotional ad sets',
      'Print collateral: treatment menu booklets, VIP invitation cards, and interior signage',
    ],
    tools: ['Adobe Illustrator', 'Adobe Premiere Pro', 'CapCut Pro', 'Notion', 'Figma', 'Meta Ads Manager'],
    technologies: ['Visual Branding', 'Speed-Ramp Video Scripting', 'Launch Strategy', 'Healthcare Ad Compliance'],
    outcome:
      'The soft-opening campaign brought in over 250 direct booking inquiries within the first two weeks, and the speed-ramp tour reel held an average watch duration of 68% across TikTok and Meta reels.',
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
    id: 'dr-shumanyee-brand',
    projectNumber: '02',
    title: 'Dr. Shumanyee Executive Brand & Content Management',
    category: 'Executive PA · Content Management · Talent Direction',
    role: 'Freelance Personal Assistant & Content Manager',
    summary:
      'Personal assistant and content management for Dr. Shumanyee (aesthetic doctor & creator in Myanmar), coordinating shoots, directing short-form reels, and managing brand collaborations.',
    heroImage: 'https://images.unsplash.com/photo-1594824813689-53e346ad031e?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'dr-1',
        url: 'https://images.unsplash.com/photo-1594824813689-53e346ad031e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Filming call sheets and multi-camera production workflow',
        type: 'storyboard',
      },
      {
        id: 'dr-2',
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
        caption: 'Aesthetic consultation video direction and clinical demonstration shots',
        type: 'general',
      },
      {
        id: 'dr-3',
        url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
        caption: 'Brand collaboration guidelines, quotation templates, and agreements',
        type: 'document',
      },
    ],
    keyDeliverables: [
      'Comprehensive filming call sheets, shot sequences, and equipment checklists',
      'Coordinating shoot schedules between clinical commitments, studios, and crew',
      'Directing speed-ramp video concepts and reviewing final cuts',
      'Managing corporate correspondence, brand sponsorship vetting, and contract terms',
      'Quotation negotiations and multi-channel content calendar planning',
      'Audience analytics tracking and short-form video hooks designed for high retention',
    ],
    tools: ['Notion', 'CapCut Pro', 'Adobe Premiere Pro', 'Google Workspace', 'Meta Creator Studio'],
    technologies: ['Talent Management', 'Call Sheet Planning', 'Brand Partnerships', 'Contract Negotiations'],
    outcome:
      'Streamlined filming prep time by 40%, secured premier brand collaborations, and consistently lifted audience retention rates across all her personal channels.',
    projectLink: 'https://github.com',
    published: true,
    order: 2,
  },
  {
    id: 'timeless-aesthetic-clinic',
    projectNumber: '03',
    title: 'Timeless Aesthetic Clinic',
    category: 'Video Content Strategy · Testimonial Campaigns',
    role: 'Creative Director & Video Content Strategist',
    summary:
      'A patient testimonial video campaign for a medical weight-loss program, built around authentic patient interviews and ad-policy compliant storytelling.',
    heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'time-1',
        url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Patient transformation studio setup and consultation room filming',
        type: 'general',
      },
      {
        id: 'time-2',
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
        caption: 'Body composition analysis and medical explanation overlay graphics',
        type: 'dashboard',
      },
      {
        id: 'time-3',
        url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
        caption: 'Patient interview storyboard focusing on honest transformation stories',
        type: 'storyboard',
      },
    ],
    keyDeliverables: [
      'Four-stage testimonial story arc (Discovery, Challenges, Treatment, Everyday Results)',
      'Doctor-guided scripts explaining medical weight loss simply and scientifically',
      'Framing before-and-after results to fully comply with Meta healthcare advertising policies',
      'Interview questionnaires designed to draw out genuine, relatable patient experiences',
      'Short-form vertical video cutdowns (15s hook, 30s summary, 60s deep-dive)',
      'Clean thumbnail designs with easy-to-read typography',
    ],
    tools: ['Adobe After Effects', 'Figma', 'Descript', 'Notion', 'Sony Alpha Workflows'],
    technologies: ['Patient Storytelling', 'Medical Ad Compliance', 'Video Editing', 'Short-Form Hook Testing'],
    outcome:
      'Lowered customer acquisition cost (CAC) on Meta ads by 34% by replacing traditional clinical promos with honest, relatable patient stories.',
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
    order: 3,
  },
  {
    id: 'glasskin-aesthetic',
    projectNumber: '04',
    title: 'Glasskin Aesthetic Web Platform',
    category: 'Web Design & Development · UI/UX Platform',
    role: 'Lead Web Designer & Frontend Developer',
    summary:
      'Designed and coded the full website for Glasskin Aesthetic, giving patients an intuitive way to explore treatments and book consultations.',
    heroImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'gk-1',
        url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
        caption: 'Glasskin Aesthetic homepage and categorized treatment directory',
        type: 'desktop',
      },
      {
        id: 'gk-2',
        url: 'https://images.unsplash.com/photo-1512290900672-1f0237583693?auto=format&fit=crop&w=1200&q=80',
        caption: 'Treatment details page with clear pricing and service breakdowns',
        type: 'general',
      },
      {
        id: 'gk-3',
        url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Mobile-first appointment booking flow built for easy tap interactions',
        type: 'mobile',
      },
    ],
    keyDeliverables: [
      'Complete end-to-end web architecture and user interface for Glasskin Aesthetic',
      'Clean, luminous visual identity reflecting modern dermatological care',
      'Treatment catalog with fast filtering (Skin Rejuvenation, Laser, Contouring, Facials)',
      'Mobile-first responsive interface making booking frictionless on phones',
      'Doctor credentials and clinic technology showcase sections',
      'Local SEO setup optimized for aesthetic clinic searches in Yangon',
    ],
    tools: ['React', 'Vite', 'Tailwind CSS', 'Figma', 'TypeScript'],
    technologies: ['Responsive Web Design', 'Information Architecture', 'Performance Optimization', 'Local SEO'],
    outcome:
      'Built a fast, mobile-first website with sub-second page loads, driving a 45% increase in online appointment inquiries within the first month.',
    projectLink: 'https://github.com',
    published: true,
    order: 4,
  },
  {
    id: 'summr-boutique',
    projectNumber: '05',
    title: 'SUMM/R Skincare & Boutique Branding',
    category: 'Brand Identity · Retail Branding · Event Direction',
    role: 'Brand Identity Designer & Opening Event Director',
    summary:
      'Complete brand identity for SUMM/R boutique—designing the logo suite, packaging, and print collateral, plus filming and directing their grand opening event.',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'summr-1',
        url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
        caption: 'SUMM/R flagship boutique and grand opening event videography',
        type: 'general',
      },
      {
        id: 'summr-2',
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Lookbook direction and skincare capsule catalog layouts',
        type: 'storyboard',
      },
      {
        id: 'summr-3',
        url: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Logo suite, typography guide, and eco-friendly packaging design',
        type: 'document',
      },
      {
        id: 'summr-4',
        url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
        caption: 'VIP grand opening teaser reel and influencer invitation package',
        type: 'mobile',
      },
    ],
    keyDeliverables: [
      'Full brand identity system: primary wordmark, monogram, and warm terracotta/sand palette',
      'Packaging and print suite: product stickers, clothing tags, VIP cards, and tote bags',
      'Filmed and directed the flagship store grand opening, producing multi-angle recap reels',
      'Social media launch teaser series with countdown graphics and reveal clips',
      'Influencer gifting kit design and unboxing guidelines',
      'Brand guideline handbook establishing typography rules and photography direction',
    ],
    tools: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Lightroom', 'CapCut Pro', 'Sony Alpha'],
    technologies: ['Brand Identity Systems', 'Event Videography', 'Packaging Design', 'Launch Strategy'],
    outcome:
      'The grand opening recap video reached over 120,000 organic views in 72 hours, and the boutique sold through 85% of its opening inventory during the first weekend.',
    projectLink: 'https://github.com',
    published: true,
    order: 5,
  },
  {
    id: 'crossworks-uiux',
    projectNumber: '06',
    title: 'Crossworks Platform UI/UX',
    category: 'UI/UX Design · Design System · Figma Prototyping',
    role: 'UI/UX Designer',
    summary:
      'Interactive Figma prototypes and a cohesive design system for the Crossworks platform, focusing on seamless student enrollment and course discovery.',
    heroImage: 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'cw-1',
        url: 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?auto=format&fit=crop&w=1200&q=80',
        caption: 'Crossworks learning dashboard and course progress tracker',
        type: 'desktop',
      },
      {
        id: 'cw-2',
        url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
        caption: 'Design tokens, auto-layout components, and UI kit in Figma',
        type: 'dashboard',
      },
      {
        id: 'cw-3',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        caption: 'Student enrollment flow and quiz module wireframes',
        type: 'mobile',
      },
    ],
    keyDeliverables: [
      'Interactive Figma prototype with a modular component library and color token system',
      'Student user flow mapping from course browsing to signup and lesson completion',
      'Responsive layouts tested across desktop, tablet, and mobile screen sizes',
      'Accessible color palette meeting WCAG AA contrast guidelines',
      'Micro-interactions and status indicators for assignment submissions',
      'Developer handoff documentation with spacing tokens and CSS specifications',
    ],
    tools: ['Figma', 'FigJam', 'Auto-Layout', 'Design Tokens', 'Miro'],
    technologies: ['UI/UX Prototyping', 'User Flows', 'Design Systems', 'Developer Handoff'],
    outcome:
      'Standardized the design language across all learning modules, cutting down estimated frontend build time by about 35%.',
    projectLink: 'https://github.com',
    published: true,
    order: 6,
  },
  {
    id: 'fullstack-clinic-portal',
    projectNumber: '07',
    title: 'Full-Stack Clinic Web Portal',
    category: 'Full-Stack Web App · Cloud Architecture · UI/UX',
    role: 'Lead Full-Stack Developer & UI/UX Designer',
    summary:
      'A modern clinic management dashboard built with React, Vite, Express, and Firebase, featuring role-based access control and real-time appointment tracking.',
    heroImage: '/src/assets/images/project_healthcare_1788374571145.jpg',
    images: [
      {
        id: 'portal-1',
        url: '/src/assets/images/project_healthcare_1788374571145.jpg',
        caption: 'Main administrative dashboard with real-time appointment tracking',
        type: 'desktop',
      },
      {
        id: 'portal-2',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        caption: 'Role-based access views (Admin, Doctor, Receptionist, Patient)',
        type: 'dashboard',
      },
      {
        id: 'portal-3',
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Mobile-first patient appointment booking and digital intake form',
        type: 'mobile',
      },
      {
        id: 'portal-4',
        url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
        caption: 'Firestore security rules and database structure overview',
        type: 'document',
      },
    ],
    keyDeliverables: [
      'Responsive React 18 + Vite frontend styled with Tailwind CSS',
      'Firebase Authentication for secure login, password resets, and route protection',
      'Role-Based Access Control (RBAC): Admin, Doctor, Receptionist, and Patient views',
      'Real-time Firestore listeners for patient queues and live scheduling updates',
      'Lightweight Express API for data validation and request handling',
      'Rapidly prototyped and refined through Google AI Studio workflows',
    ],
    tools: ['React 18', 'Vite', 'TypeScript', 'Tailwind CSS', 'Firebase Firestore', 'Firebase Auth', 'Express', 'Google AI Studio'],
    technologies: ['React SPA', 'TypeScript', 'Firebase RBAC', 'Cloud Firestore', 'Tailwind CSS'],
    outcome:
      'Replaced manual paper booking, eliminating double-booking errors entirely and saving clinic reception staff an estimated 18 hours per week.',
    projectLink: 'https://github.com',
    published: true,
    order: 7,
  },
  {
    id: 'ai-prompt-engineering-suite',
    projectNumber: '08',
    title: 'Generative AI Prompt Engineering Suite',
    category: 'Generative AI · 3D Visual Rendering · Prompt Engineering',
    role: 'AI Prompt Engineer & Creative Technologist',
    summary:
      'A calibrated set of master prompts for generating 3D logos, cosmetic product photos, and interior concepts across Midjourney, SDXL, and Gemini Imagen 3.',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'ai-1',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        caption: 'Frosted glass and brushed metal 3D monogram logo exploration',
        type: 'general',
      },
      {
        id: 'ai-2',
        url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
        caption: 'Macro product photography simulation of botanical serum dropper bottle',
        type: 'general',
      },
      {
        id: 'ai-3',
        url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
        caption: 'Minimalist travertine and microcement clinic interior moodboard concept',
        type: 'general',
      },
    ],
    keyDeliverables: [
      'Modular prompt syntax with aspect ratios, camera lens parameters, and lighting styles',
      'Negative prompt lists designed to eliminate AI artifacts and unnatural textures',
      'Prompt templates for photorealistic cosmetic serum bottles and droplet macros',
      'Prompts for 3D geometric and glassmorphism logos for early brand discovery sessions',
      'Spatial interior moodboards for aesthetic clinic consultations',
      'Side-by-side prompt testing between Midjourney v6, SDXL 1.0, and Gemini Imagen 3',
    ],
    tools: ['Midjourney v6', 'Stable Diffusion XL', 'Gemini Imagen 3', 'DALL-E 3', 'Google AI Studio'],
    technologies: ['Master Prompt Syntax', 'Negative Weighting', 'Camera & Lighting Calibrations', 'Multi-Modal Generation'],
    outcome:
      'Reduced initial visual concepting timelines from two weeks of 3D modeling down to 48 hours of rapid, photorealistic prompt iterations.',
    projectLink: 'https://github.com',
    published: true,
    order: 8,
  },
];

export const initialSkills: SkillItem[] = [
  // DESIGN
  {
    name: 'Figma & Design Systems',
    category: 'Design',
    description: 'Component architecture, responsive auto-layout, interactive prototypes, design tokens & handoff specs',
    relatedProjectIds: ['crossworks-uiux', 'glasskin-aesthetic', 'summr-boutique', 'the-may-clinic'],
  },
  {
    name: 'UI/UX Architecture',
    category: 'Design',
    description: 'User journey mapping, mobile-first information hierarchy, accessibility standards & ergonomic micro-interactions',
    relatedProjectIds: ['crossworks-uiux', 'glasskin-aesthetic', 'fullstack-clinic-portal'],
  },
  {
    name: 'Visual Brand Identity',
    category: 'Design',
    description: 'Logo suites, brand manuals, typography hierarchies, luxury aesthetic color systems & brand governance',
    relatedProjectIds: ['the-may-clinic', 'summr-boutique', 'glasskin-aesthetic', 'dr-shumanyee-brand'],
  },
  {
    name: 'Graphic Design & Packaging',
    category: 'Design',
    description: 'Marketing collateral, promotional print assets, boutique packaging craft & high-CTR social banners',
    relatedProjectIds: ['summr-boutique', 'the-may-clinic'],
  },

  // DEVELOPMENT
  {
    name: 'React 18 & Vite',
    category: 'Development',
    description: 'Modern functional components, context architecture, custom hooks, performance tuning & SPA builds',
    relatedProjectIds: ['fullstack-clinic-portal', 'glasskin-aesthetic'],
  },
  {
    name: 'TypeScript',
    category: 'Development',
    description: 'Strict typing, modular interfaces, type narrowing, clean contracts & reliable frontend engineering',
    relatedProjectIds: ['fullstack-clinic-portal', 'glasskin-aesthetic'],
  },
  {
    name: 'Tailwind CSS',
    category: 'Development',
    description: 'Utility-first styling, custom design tokens, fluid layouts, dark-mode architectures & responsive grids',
    relatedProjectIds: ['fullstack-clinic-portal', 'glasskin-aesthetic'],
  },
  {
    name: 'Firebase & Express',
    category: 'Development',
    description: 'Cloud Firestore schemas, Firebase Authentication, RBAC rules, REST API middleware & secure cloud deployment',
    relatedProjectIds: ['fullstack-clinic-portal'],
  },
  {
    name: 'Google AI Studio',
    category: 'Development',
    description: 'Rapid full-stack application prototyping, Gemini API workflows, cloud database integration & prompt engineering',
    relatedProjectIds: ['fullstack-clinic-portal', 'ai-prompt-engineering-suite'],
  },

  // AI & CONTENT
  {
    name: 'Generative AI Prompt Engineering',
    category: 'AI & Content',
    description: 'Structured master prompts, parameter tuning (--v 6, --style raw), negative weighting & multi-modal asset generation',
    relatedProjectIds: ['ai-prompt-engineering-suite', 'the-may-clinic', 'summr-boutique'],
  },
  {
    name: 'Talent & Production Management',
    category: 'AI & Content',
    description: 'Filming call sheets, shoot schedule coordination, on-set camera direction & script approvals for Dr. Shumanyee',
    relatedProjectIds: ['dr-shumanyee-brand', 'the-may-clinic', 'timeless-aesthetic-clinic'],
  },
  {
    name: 'Speed-Ramp Video Scriptwriting',
    category: 'AI & Content',
    description: 'Speed-ramp visual cues, 15s/30s/60s pacing, narrative hooks, clinic tour storyboards & shot lists',
    relatedProjectIds: ['the-may-clinic', 'timeless-aesthetic-clinic', 'dr-shumanyee-brand'],
  },
  {
    name: 'Bilingual Voiceover & Audio',
    category: 'AI & Content',
    description: 'Baritone commercial narration in Burmese and English, harmonic voice dynamics & timecoded audio mastering',
    relatedProjectIds: ['the-may-clinic', 'timeless-aesthetic-clinic'],
  },
  {
    name: 'Aesthetic Healthcare Ad Compliance',
    category: 'AI & Content',
    description: 'Meta advertising policy-compliant medical copywriting, before/after narrative framing & educational framing',
    relatedProjectIds: ['the-may-clinic', 'timeless-aesthetic-clinic', 'dr-shumanyee-brand'],
  },
  {
    name: 'SEO & Performance Media',
    category: 'AI & Content',
    description: 'Crossworks bootcamp immersion in search optimization, audience targeting, and multi-channel campaign analytics',
    relatedProjectIds: ['the-may-clinic', 'glasskin-aesthetic'],
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
    title: 'EXECUTIVE BRAND & CONTENT MANAGEMENT (PA WORKFLOWS)',
    shortDescription:
      'Executive Personal Assistant workflows, talent management, filming call sheets, shoot schedule coordination, brand partnership guidelines, and quotation negotiations.',
    fullDescription:
      'Serving as the strategic right hand to prominent aesthetic doctors and executive figures. I manage full-cycle creative direction and business operations: designing filming call sheets, approving final scripts, coordinating shoot schedules, vetting commercial brand partnerships, and managing corporate correspondence with poise and precision.',
    deliverables: [
      'Comprehensive filming call sheets & equipment cue lists',
      'Shoot schedule coordination across clinics, studios, and crew',
      'Brand partnership guidelines & collaboration vetting',
      'Quotation negotiations and formal corporate correspondence',
      'Multi-channel content strategy & posting calendars',
    ],
    keyFocus: 'Executive Management · Call Sheets · Brand Partnerships',
    published: true,
    order: 1,
  },
  {
    id: 'srv-02',
    number: '02',
    title: 'AESTHETIC HEALTHCARE CAMPAIGNS & SPEED-RAMP VIDEO DIRECTION',
    shortDescription:
      'Speed-ramp clinic tour storyboards, medical weight-loss testimonial scripts, doctor interview frameworks, and Meta healthcare ad compliance.',
    fullDescription:
      'Specialized creative direction tailored for high-end aesthetic clinics, dermatology centers, and medical practitioners. From 15-second fast-paced TikTok/Reels speed-ramp hooks to cinematic clinic walkthroughs and emotional patient recovery testimonials, I script every frame with camera movements, dialogue pacing, and on-screen text overlays designed for high retention and ad policy compliance.',
    deliverables: [
      'Speed-ramp clinic tour video storyboards & shot lists',
      'Doctor & aesthetic specialist interview question frameworks',
      'Patient testimonial narrative structures (Discovery to Result)',
      'Meta medical advertising policy compliance review',
      'Production call sheets & on-set camera cue coordination',
    ],
    keyFocus: 'Speed-Ramp Hooks · Medical Compliance · High Retention',
    published: true,
    order: 2,
  },
  {
    id: 'srv-03',
    number: '03',
    title: 'FULL-STACK WEB DEVELOPMENT & CLINICAL PORTALS',
    shortDescription:
      'Mobile-first web platforms, React 18, Vite, Express, and Firebase with Role-Based Access Control (RBAC) and Google AI Studio prototyping.',
    fullDescription:
      'I engineer digital platforms that look exquisite and run reliably. Specializing in mobile-first web applications, modern frontends (React, Vite, Tailwind CSS), Firebase backends with role-based permissions (SuperAdmin, Doctor, Receptionist, Patient), and custom administrative dashboards that empower healthcare practices to streamline operations effortlessly.',
    deliverables: [
      'Mobile-first responsive web apps & SPAs (React + Vite)',
      'Firebase Authentication & Role-Based Access Control (RBAC)',
      'Cloud Firestore real-time databases & secure rule schemas',
      'Custom administrative dashboards & patient intake workflows',
      'Google AI Studio prototyping and Gemini API integrations',
    ],
    keyFocus: 'Performance · Mobile-First UI · Architectural Rigor',
    published: true,
    order: 3,
  },
  {
    id: 'srv-04',
    number: '04',
    title: 'UI/UX & VISUAL BRAND IDENTITY SYSTEMS',
    shortDescription:
      'Figma design systems, auto-layout prototypes, logo marks, brand manuals, and marketing collateral for clinics and boutique ventures.',
    fullDescription:
      'Great design is intuitive, memorable, and functional. I design complete visual identities from brand discovery to logo design, typography styling, packaging, and high-fidelity Figma UI/UX prototypes ready for developer handoff. Experienced in delivering end-to-end retail identities like SUMM/R boutique and digital platforms like Glasskin Aesthetic and Crossworks.',
    deliverables: [
      'Complete brand identity manuals & typography palettes',
      'Logo suites (Primary, secondary, badges, favicon)',
      'Figma responsive design prototypes & UI kits with auto-layout',
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
    title: 'GENERATIVE AI PROMPT ENGINEERING & VISUAL ASSETS',
    shortDescription:
      'Structured master prompts, 3D logo renderings, photorealistic skincare product photography macros, and architectural pre-visualizations.',
    fullDescription:
      'Harnessing the cutting edge of generative AI to accelerate brand creative workflows. I formulate mathematically precise prompt syntax with camera focal lengths, lighting tokens, and negative prompt dictionaries across Midjourney v6, SDXL, and Gemini Imagen 3 to generate commercial-grade 3D marks, skincare product visuals, and spatial moodboards.',
    deliverables: [
      'Structured master prompt syntax frameworks',
      'Negative prompt dictionaries for artifact elimination',
      '3D geometric and glassmorphism logo asset generation',
      'Commercial skincare botanical macro photography simulations',
      'Spatial architectural moodboard renderings for clinic design',
    ],
    keyFocus: 'Prompt Precision · 3D Mark Synthesis · Creative Velocity',
    published: true,
    order: 5,
  },
  {
    id: 'srv-06',
    number: '06',
    title: 'BILINGUAL BURMESE & ENGLISH VOICEOVER NARRATION',
    shortDescription:
      'Professional Burmese and English narration for commercial videos, brand reels, promotional content, and educational media.',
    fullDescription:
      'A voice connects emotionally where visuals set the stage. As a native bilingual artist with vocal training as a baritone, I deliver authentic Burmese narration with culturally nuanced tone, alongside clean, articulate international English voiceovers tailored precisely to your brand persona.',
    deliverables: [
      'Broadcast-grade Burmese audio narration',
      'Clear, articulate English commercial voiceover',
      'Time-synced audio deliverables (WAV / 320kbps MP3)',
      'Multiple style takes (Warm, corporate, enthusiastic, soothing)',
      'Full script localization & pronunciation review',
    ],
    keyFocus: 'Vocal Nuance · Studio Clarity · Dual Language Fluency',
    published: true,
    order: 6,
  },
];

export const initialExperience: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Healthcare Brand Architect, UI/UX & Full-Stack AI Developer',
    organizationOrFocus: 'Dr. Shumanyee Practice, Premier Aesthetic Clinics & Independent Practice',
    period: 'Late 2025 — Present (2026)',
    description:
      'Serving as Freelance Personal Assistant & Content Manager to Dr. Shumanyee (prominent aesthetic doctor and influencer in Myanmar), while leading digital strategy, UI/UX design, and full-stack web engineering across leading aesthetic medical clinics and retail lifestyle brands.',
    highlights: [
      'Assumed full PA and content management responsibilities for Dr. Shumanyee: filming call sheets, shoot schedules, speed-ramp video concepts, script approvals, and brand collaboration guidelines',
      'Managed corporate correspondence, brand partnership negotiations, invitation approvals, and quotation agreements',
      'Timeless Aesthetic Clinic: Engineered interview frameworks, production shot lists, and video scripts for specialized medical weight-loss testimonial campaigns',
      'The May Clinic: Wrote soft-opening promotional copy, launch announcements, and speed-ramp clinic tour video storyboards',
      'SUMM/R Boutique: Delivered end-to-end branding, logo design, promotional collateral, and directed grand opening event videography',
      'Glasskin Aesthetic Website: Engineered and launched complete web platform with clean visual identity and user-centric navigation',
      'Crossworks Platform: Designed UI/UX prototypes and learning flow architecture in Figma',
      'Full-Stack Development: Built web application prototypes using React, Vite, Express, and Firebase (RBAC) via Google AI Studio',
      'Generative AI: Formulated structured master prompts for 3D logo renderings, UI components, and product visual assets',
    ],
    order: 1,
    published: true,
  },
  {
    id: 'exp-2',
    role: 'Agency Mastery & Technical Upskilling',
    organizationOrFocus: "Key Account Intern at O'Ze Marketing Agency & Crossworks Bootcamp Student",
    period: '2024 — Mid 2025',
    description:
      'Deepened commercial account management at O\'Ze Marketing Agency while completing an intensive technical bootcamp at Crossworks to master SEO, performance media, advanced video editing, and UI/UX design. Formulated the overarching professional slogan: "This is logically playing the creativity."',
    highlights: [
      "Handled commercial client communications, account strategy execution, and campaign performance tracking at O'Ze Marketing Agency",
      'Completed intensive Crossworks Bootcamp: advanced video editing, UI/UX prototyping, SEO, and performance media buying',
      'Formulated the core career philosophy: "This is logically playing the creativity." (Logic gives creativity direction; creativity gives logic purpose)',
      'Bridged client commercial requirements with rigorous analytical frameworks and creative visual deliverables',
    ],
    order: 2,
    published: true,
  },
  {
    id: 'exp-3',
    role: 'Transition to Digital Marketing',
    organizationOrFocus: 'Junior Digital Marketer & Intern at FlyMya',
    period: '2022 — 2023',
    description:
      'Officially transitioned from pre-career media activities into professional commercial digital marketing, managing travel content strategies, customer-facing campaign executions, and social media engagement.',
    highlights: [
      'Managed travel content strategies, editorial calendars, and audience engagement for prominent travel brand FlyMya',
      'Grounded creative intuition into structured content calendars and digital strategy frameworks',
      'Executed customer-facing social media campaigns with measurable audience growth and retention',
      'Gained valuable experience in campaign performance metrics, copywriting, and consumer engagement',
    ],
    order: 3,
    published: true,
  },
  {
    id: 'exp-4',
    role: 'Creative Foundations & Student Life',
    organizationOrFocus: 'Student, Amateur Vocalist & Creative Generalist at Pyaesone Entertainment',
    period: 'Pre-Career Phase (2018 — 2021)',
    description:
      'Explored performing arts, baritone vocal performance, audio composition, and student media production. Joined Pyaesone Entertainment during university years as a creative generalist, gaining early hands-on exposure to media production, video editing, and artistic execution.',
    highlights: [
      'Joined Pyaesone Entertainment as a creative generalist, building hands-on skills in video editing, production sets, and visual execution',
      'Analyzed music theory, harmonic extensions, modal shifts, and vocal dynamics as a baritone singer and amateur producer',
      'Established core understanding of rhythm, tone, emotional cadence, and audience connection that informs current video direction',
      'Developed essential soft skills in communication, audience engagement, and event coordination through F&B service roles',
    ],
    order: 4,
    published: true,
  },
  {
    id: 'exp-5',
    role: 'Next Phase Strategic Vision',
    organizationOrFocus: 'Future Outlook (2026 & Beyond)',
    period: '2026 & Beyond',
    description:
      'Advancing into digital product expansion, generative AI integration, and executive brand consulting for healthcare and technology pioneers.',
    highlights: [
      'Digital Product Expansion: Scaling full-stack web development and UI/UX expertise to build automated client portals and administrative web applications',
      'Generative AI Integration: Pushing boundaries of prompt engineering for 3D visual assets, synthetic video workflows, and AI-driven creative automation',
      'Brand Strategic Consulting: Continuing to position as a specialized digital expert for medical professionals, aesthetic brands, and tech-driven platforms',
    ],
    order: 5,
    published: true,
  },
];

export const initialSettings: PortfolioSettings = {
  siteTitle: 'Min Thu Khant (Thomas) — Healthcare Brand Architect & Full-Stack Developer',
  seoDescription:
    'Portfolio of Min Thu Khant (Thomas) — Healthcare Brand Architect, UI/UX & Web Developer, Content Strategist for Dr. Shumanyee, and AI Prompt Engineer. Slogan: "This is logically playing the creativity."',
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
