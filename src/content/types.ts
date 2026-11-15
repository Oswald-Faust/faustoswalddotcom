export type ProjectBlock =
  | { type: "images"; images: string[] }
  | { type: "text"; heading: string; body: string };

export type ProjectCategory = "web" | "mobile" | "landing";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  featured: boolean;
  cover: string;
  headline: string;
  client: string;
  year: string;
  description: string;
  scope: string[];
  liveUrl: string;
  liveLabel: string;
  blocks: ProjectBlock[];
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  cover: string;
  /** Markdown-lite: "## heading", "- item", "> quote", **bold**, blank line = paragraph. */
  body: string;
};

export type SiteContent = {
  settings: {
    name: string;
    role: string;
    siteUrl: string;
    seoTitle: string;
    seoDescription: string;
    email: string;
    whatsapp: string;
    calUrl: string;
    availability: string;
    instagram: string;
    x: string;
    linkedin: string;
    facebook: string;
    linkedinFollowers: string;
    facebookFollowers: string;
    awardTitle: string;
    awardSubtitle: string;
    timezone: string;
    city: string;
  };
  hero: {
    titleLead: string;
    rotatingWords: string[];
    titleEnd: string;
    descriptionStrong: string;
    description: string;
    cta: string;
    collaborations: string;
  };
  logos: { name: string; src: string }[];
  projectsSection: {
    title: string;
    moreLabel: string;
    pageTitle: string;
    pageIntro: string;
    categoryLabels: { web: string; mobile: string; landing: string };
  };
  projects: Project[];
  services: {
    titleMuted: string;
    title: string;
    stackLabel: string;
    items: { label: string; icon: string }[];
    stack: string[];
  };
  about: {
    titleLead: string;
    rotatingWords: string[];
    titleAfter: string;
    titleEnd: string;
    portrait: string;
    paragraphs: { strong: string; text: string }[];
    experienceLabel: string;
    experience: { company: string; role: string; period: string }[];
  };
  pricing: {
    titleMuted: string;
    title: string;
    introStrong: string;
    intro: string;
    steps: { title: string; text: string }[];
    cardBadge: string;
    cardText: string;
    plansBadge: string;
    plansTitle: string;
    plansText: string;
    subscription: {
      title: string;
      description: string;
      price: string;
      period: string;
      features: string[];
      cta: string;
    };
    oneOff: {
      title: string;
      description: string;
      features: string[];
      cta: string;
    };
  };
  expertise: {
    title: string;
    items: { title: string; text: string }[];
    bannerText: string;
    bannerCta: string;
  };
  testimonials: {
    logosLead: string;
    logosStrong: string;
    titleMuted: string;
    title: string;
    label: string;
    items: { quote: string; name: string; role: string; avatar: string }[];
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
  };
  footer: {
    titleLead: string;
    rotatingWords: string[];
    titleEnd: string;
    emailLabel: string;
    callLabel: string;
    callCta: string;
    socialLabel: string;
    wordmark: string;
  };
  blog: {
    title: string;
    intro: string;
    posts: BlogPost[];
  };
  /**
   * The one-page CV at /cv. Name, role, city, projects and articles come from
   * the sections above; only CV-specific data lives here.
   */
  cv: {
    pageTitle: string;
    seoDescription: string;
    /** Line under the name, e.g. "Product Software Engineer · Founder, Nectarr". */
    subtitle: string;
    /** Typed out on load. [text](url) = link, {avatar} = the small portrait. */
    greeting: string;
    /** Blank line = new paragraph, [text](url) = link. */
    bio: string;
    /** Slugs of the projects to list, in order. Empty = the featured projects. */
    projectSlugs: string[];
    work: CvRow[];
    education: CvRow[];
    involvements: CvRow[];
    /** `list` is a comma-separated list. */
    skills: { label: string; list: string }[];
    languages: { name: string; level: string }[];
    github: string;
    labels: {
      projects: string;
      work: string;
      education: string;
      involvements: string;
      skills: string;
      languages: string;
      writing: string;
      elsewhere: string;
      allProjects: string;
      allPosts: string;
      back: string;
      download: string;
    };
  };
};

/** One line of the CV: who, what, when. `url` is optional. */
export type CvRow = { name: string; role: string; period: string; url: string };
