import type { Locale } from "./types";

export type UiCopy = {
  skip: string;
  navLabel: string;
  home: string;
  projects: string;
  services: string;
  pricing: string;
  blog: string;
  contact: string;
  openMenu: string;
  closeMenu: string;
  language: string;
  languages: Record<Locale, string>;
  work: string;
  cv: string;
  terms: string;
  privacy: string;
  menu: string;
  footerNav: string;
  talkTitle: string;
  talkText: string;
  emailMe: string;
  bookCall: string;
  stars: string;
  localTime: string;
  followers: string;
  viewLive: string;
  viewProject: string;
  seeAll: string;
  showLess: string;
  shuffle: string;
  portrait: (name: string) => string;
  projectsMetaTitle: string;
  projectsMetaDescription: string;
  likeWhatYouSee: string;
  client: string;
  year: string;
  scope: string;
  screenshot: (title: string, block: number, frame: number, count: number) => string;
  seeOther: string;
  coolIdea: string;
  timeToListen: string;
  viewAllProjects: string;
  projectNotFound: string;
  blogMetaTitle: string;
  blogMetaDescription: string;
  noArticles: string;
  by: string;
  followTitle: string;
  followText: string;
  moreInsights: string;
  viewAll: string;
  postNotFound: string;
  breadcrumb: string;
  termsTitle: string;
  termsDescription: string;
  privacyTitle: string;
  privacyDescription: string;
  lastUpdated: string;
  notFoundKicker: string;
  notFoundLead: string;
  notFoundEnd: string;
  notFoundText: string;
  backHome: string;
  seeProjects: string;
};

export const ui: Record<Locale, UiCopy> = {
  en: {
    skip: "Skip to content",
    navLabel: "Main",
    home: "home",
    projects: "Projects",
    services: "Services",
    pricing: "Pricing",
    blog: "Blog",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    languages: { fr: "Français", en: "English" },
    work: "Work",
    cv: "CV",
    terms: "Terms",
    privacy: "Privacy",
    menu: "Menu",
    footerNav: "Footer",
    talkTitle: "Talk to me",
    talkText: "Email or book a call",
    emailMe: "Send me an email",
    bookCall: "Book a call",
    stars: "Rated five stars",
    localTime: "local time",
    followers: "followers",
    viewLive: "View live site",
    viewProject: "View project",
    seeAll: "See all",
    showLess: "Show less",
    shuffle: "Shuffle featured projects",
    portrait: (name) => `Portrait of ${name}`,
    projectsMetaTitle: "Projects",
    projectsMetaDescription:
      "Selected SaaS platforms, web applications, mobile apps and landing pages designed and built by Faust Oswald.",
    likeWhatYouSee: "Like what you see? Book a discovery call.",
    client: "Client",
    year: "Year",
    scope: "Scope of Work",
    screenshot: (title, block, frame, count) =>
      count > 1 ? `${title} screenshot ${block}.${frame}` : `${title} screenshot ${block}`,
    seeOther: "See other projects:",
    coolIdea: "Got a cool idea?",
    timeToListen: "I’ve got time to listen!",
    viewAllProjects: "View all my projects",
    projectNotFound: "Project not found",
    blogMetaTitle: "Blog",
    blogMetaDescription:
      "Notes on building real products: engineering, product thinking, AI and the business behind shipping.",
    noArticles: "No articles yet — the first one is on its way.",
    by: "By",
    followTitle: "Follow me to keep in touch",
    followText:
      "Where I share what I’m building, product experiments and thoughts on the industry.",
    moreInsights: "More insights",
    viewAll: "View all",
    postNotFound: "Article not found",
    breadcrumb: "Breadcrumb",
    termsTitle: "Terms of Service",
    termsDescription:
      "The terms that govern development subscriptions and per-project work with Faust Oswald.",
    privacyTitle: "Privacy Policy",
    privacyDescription: "How personal information is collected, used and protected on faustoswald.com.",
    lastUpdated: "Last updated",
    notFoundKicker: "Error 404",
    notFoundLead: "This page",
    notFoundEnd: "took a day off.",
    notFoundText:
      "The link may be outdated or the page may have moved. Let’s get you back on track.",
    backHome: "Back to home",
    seeProjects: "See projects",
  },
  fr: {
    skip: "Aller au contenu",
    navLabel: "Principal",
    home: "accueil",
    projects: "Projets",
    services: "Services",
    pricing: "Tarifs",
    blog: "Blog",
    contact: "Contact",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    language: "Langue",
    languages: { fr: "Français", en: "English" },
    work: "Travaux",
    cv: "CV",
    terms: "Mentions",
    privacy: "Confidentialité",
    menu: "Menu",
    footerNav: "Pied de page",
    talkTitle: "Parlons-en",
    talkText: "Un e-mail ou un appel",
    emailMe: "M’envoyer un e-mail",
    bookCall: "Réserver un appel",
    stars: "Noté cinq étoiles",
    localTime: "heure locale",
    followers: "abonnés",
    viewLive: "Voir le site",
    viewProject: "Voir le projet",
    seeAll: "Tout voir",
    showLess: "Réduire",
    shuffle: "Faire défiler les projets",
    portrait: (name) => `Portrait de ${name}`,
    projectsMetaTitle: "Projets",
    projectsMetaDescription:
      "Une sélection de plateformes SaaS, d’applications web, d’apps mobiles et de pages d’atterrissage conçues et construites par Faust Oswald.",
    likeWhatYouSee: "Ça vous parle ? Réservez un appel de découverte.",
    client: "Client",
    year: "Année",
    scope: "Périmètre",
    screenshot: (title, block, frame, count) =>
      count > 1 ? `${title}, capture ${block}.${frame}` : `${title}, capture ${block}`,
    seeOther: "Voir d’autres projets :",
    coolIdea: "Une idée qui vous tient ?",
    timeToListen: "J’ai le temps de l’écouter.",
    viewAllProjects: "Voir tous mes projets",
    projectNotFound: "Projet introuvable",
    blogMetaTitle: "Blog",
    blogMetaDescription:
      "Des notes sur la construction de vrais produits : ingénierie, produit, IA et le business derrière la livraison.",
    noArticles: "Pas encore d’article — le premier arrive.",
    by: "Par",
    followTitle: "Suivez-moi pour rester en contact",
    followText:
      "Là où je partage ce que je construis, des essais produit et des notes sur le métier.",
    moreInsights: "À lire aussi",
    viewAll: "Tout voir",
    postNotFound: "Article introuvable",
    breadcrumb: "Fil d’Ariane",
    termsTitle: "Conditions d’utilisation",
    termsDescription:
      "Les conditions qui encadrent l’abonnement au développement et les missions au projet avec Faust Oswald.",
    privacyTitle: "Politique de confidentialité",
    privacyDescription:
      "Comment les informations personnelles sont collectées, utilisées et protégées sur faustoswald.com.",
    lastUpdated: "Dernière mise à jour",
    notFoundKicker: "Erreur 404",
    notFoundLead: "Cette page",
    notFoundEnd: "a pris sa journée.",
    notFoundText: "Le lien est peut-être périmé, ou la page a bougé. On vous ramène.",
    backHome: "Retour à l’accueil",
    seeProjects: "Voir les projets",
  },
};
