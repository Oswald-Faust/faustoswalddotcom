import type { SiteContent } from "@/content/types";

/**
 * French overlay for the public site. English stays the editable source in
 * /admin. Fields omitted here keep their English value — long case studies,
 * the blog essay and the legal documents are still authored in English.
 */
export const french: DeepPartial<SiteContent> = {
  settings: {
    role: "Ingénieur logiciel produit",
    seoTitle: "Faust Oswald — Ingénieur logiciel produit",
    seoDescription:
      "Ingénieur logiciel produit. Je construis des applications web, des apps mobiles, des SaaS, de l’IA et de l’infrastructure — avec une architecture claire, un code propre et une livraison continue.",
    availability: "Disponible pour le T4",
    awardSubtitle: "Membre du jury",
  },
  hero: {
    titleLead: "Des",
    rotatingWords: ["produits", "apps", "sites", "plateformes", "systèmes"],
    titleEnd: "qui rapportent.",
    descriptionStrong:
      "De l’idée au produit : design, architecture, développement, IA et optimisation.",
    description: "Un partenaire technique pour construire des produits qui créent de la valeur.",
    cta: "Réserver un appel tech",
    collaborations: "99+ collaborations",
  },
  projectsSection: {
    title: "Mes derniers projets",
    moreLabel: "Voir plus de projets",
    pageTitle: "Mes projets les plus récents",
    pageIntro: "Une sélection du travail pour lequel on me connaît.",
    categoryLabels: {
      web: "SaaS web / applications web",
      mobile: "Applications mobiles",
      landing: "Pages d’atterrissage",
    },
  },
  projects: [
    { slug: "narria", tagline: "Plateforme SaaS de narratologie", liveLabel: "Voir le site" },
    { slug: "busted-data-saas", tagline: "Produit privacy-tech", liveLabel: "Voir le site" },
    { slug: "stablevps", tagline: "Plateforme VPS", liveLabel: "Voir le site" },
    { slug: "edwinhub", tagline: "Espace de travail SaaS", liveLabel: "Voir le site" },
    { slug: "social-mirror", tagline: "Copy trading", liveLabel: "Voir le site" },
    { slug: "maclasse", tagline: "Produit éducatif", liveLabel: "Voir le site" },
    { slug: "finea", tagline: "Application mobile finance", liveLabel: "Voir sur l’App Store" },
    { slug: "onlist", tagline: "Application mobile", liveLabel: "Voir sur l’App Store" },
    { slug: "coparents", tagline: "App mobile de cogestion familiale", liveLabel: "Voir sur GitHub" },
    { slug: "busted-landing", tagline: "Landing page Framer", liveLabel: "Voir le site" },
  ],
  services: {
    titleMuted: "Des services qui",
    title: "transforment votre activité et vos projets.",
    stackLabel: "Ma stack",
    items: [
      { label: "Développement Framer" },
      { label: "Développement mobile" },
      { label: "Applications web" },
      { label: "Pages d’atterrissage" },
      { label: "Intelligence artificielle" },
    ],
  },
  about: {
    titleLead: "Des projets",
    rotatingWords: ["techniques", "numériques", "innovants", "concrets", "ambitieux"],
    titleAfter: "",
    titleEnd: "qui changent des vies.",
    paragraphs: [
      {
        strong: "J’aime transformer des idées ambitieuses en produits que les gens utilisent vraiment.",
        text: "Pour moi, construire une application ne se résume pas à écrire du code : il s’agit de comprendre un problème, de concevoir une solution juste et de créer une expérience qui apporte une valeur réelle.",
      },
      {
        strong:
          "J’interviens sur tout le cycle d’un produit, de la réflexion stratégique au design, puis au développement, à la mise en ligne et à l’évolution.",
        text: "Que ce soit un SaaS, une application mobile, une plateforme web ou un produit porté par l’intelligence artificielle, le but reste le même : des produits rapides, fiables et faits pour durer.",
      },
      {
        strong: "Chaque projet est construit avec les mêmes exigences que si c’était ma propre startup.",
        text: "",
      },
    ],
    experienceLabel: "A travaillé avec",
    experience: [
      { role: "Formateur en ingénierie logicielle" },
      { role: "Développeur fullstack" },
      { role: "Ingénieur logiciel" },
    ],
  },
  pricing: {
    titleMuted: "Tarif simple.",
    title: "Du très bon dev.",
    introStrong: "Des coûts clairs, rien en plus.",
    intro: "Au mois, ou facturé au projet.",
    steps: [
      {
        title: "S’abonner",
        text: "Abonnez-vous via Stripe et envoyez vos demandes depuis l’espace client.",
      },
      {
        title: "Demander",
        text: "Demandez n’importe quel service proposé, du web au mobile.",
      },
      {
        title: "Recevoir",
        text: "Recevez ce dont vous avez besoin, aussi vite que possible.",
      },
    ],
    cardBadge: "Pause ou arrêt à tout moment",
    cardText: "Un abonnement pour les projets qui veulent grandir.",
    plansBadge: "Formules disponibles",
    plansTitle: "Commencer aujourd’hui",
    plansText: "Laissez le discours d’agence de côté et travaillez directement avec moi.",
    subscription: {
      title: "Votre développeur dédié",
      description:
        "Un abonnement mensuel pour faire avancer le produit : des priorités claires, du développement continu et un suivi pensé pour les startups.",
      period: "par mois",
      features: [
        "Développeur dédié",
        "Priorités chaque semaine",
        "Livraison continue",
        "Maintenance incluse",
        "Architecture qui tient la charge",
        "Points produit réguliers",
      ],
      cta: "Commencer",
    },
    oneOff: {
      title: "Projet ponctuel",
      description:
        "Un développement complet, pour n’importe quel type de projet. Idéal pour un besoin unique ou une mission cadrée.",
      features: ["Périmètre défini", "Délai fixé", "3 allers-retours", "Suivi par jalons"],
      cta: "Demander un devis",
    },
  },
  expertise: {
    title: "Besoin d’un expert qui construit à vos côtés ?",
    items: [
      {
        title: "Coaching produit",
        text: "Une idée qui ne se pose pas, ou un produit qui tourne en rond. On nomme ce qui bloque, on choisit une direction, et on repart avec un plan utilisable cette semaine.",
      },
      {
        title: "Cours et mentorat web",
        text: "Un apprentissage concret, de JavaScript et React jusqu’à Framer. Des exercices, un vrai projet, et un retour sur le travail que vous livrez.",
      },
      {
        title: "L’IA, sans le brouillard",
        text: "Vous voulez l’IA dans le quotidien ou dans le produit. On sépare les usages qui méritent d’exister du bruit, puis on construit.",
      },
    ],
    bannerText: "Aucun format ne colle ? Décrivez la situation. Je vous réponds franchement.",
    bannerCta: "Dites-moi ce qu’il vous faut",
  },
  testimonials: {
    logosLead: "Avec",
    logosStrong: "plusieurs entreprises",
    titleMuted: "Ce que",
    title: "disent mes clients.",
    label: "99+ clients satisfaits",
    items: [
      {
        quote:
          "Je suis ravi de ces 4 années de travail avec Faust — de loin ma meilleure collaboration. Il est pertinent et professionnel. Ce qui m’impressionne le plus, c’est son esprit créatif.",
        role: "Designer",
      },
      {
        quote:
          "Un collaborateur vraiment sérieux, avec un vrai sens du détail. Très professionnel et minutieux — c’est un plaisir de travailler avec lui.",
        role: "Community manager",
      },
      {
        quote:
          "J’ai vraiment apprécié notre collaboration. Très dynamique et, surtout, très professionnel. Un bon développeur, un bon créatif et un bon designer.",
        role: "Cofondateur, BrandIt",
      },
    ],
  },
  faq: {
    title: "Vos questions, avec une réponse.",
    items: [
      {
        question: "Comment fonctionne le partenariat de développement au mois ?",
        answer:
          "Pour 1 000 € par mois, je deviens votre partenaire de développement : on fixe les priorités, on avance par courtes itérations et le produit évolue en continu.",
      },
      {
        question: "Quels produits et services techniques proposez-vous ?",
        answer:
          "J’accompagne les startups et les équipes produit sur les applications web, les SaaS, les plateformes internes, les API, les automatisations et les expériences numériques sur mesure.",
      },
      {
        question: "Pouvez-vous rejoindre une startup déjà lancée ?",
        answer:
          "Oui. Je peux reprendre une base de code existante, auditer l’architecture, lever les blocages et livrer de nouvelles fonctionnalités sans ralentir l’équipe.",
      },
      {
        question: "Quelle stack utilisez-vous ?",
        answer:
          "La stack dépend du besoin. Je privilégie des solutions robustes et évolutives, avec une attention particulière à la performance, à la maintenance et à l’expérience.",
      },
      {
        question: "Comment organisez-vous le suivi et les livraisons ?",
        answer:
          "On fait un point régulier sur les priorités, l’avancement et la suite. Vous gardez une vue claire sur le produit, les décisions techniques et chaque livraison.",
      },
    ],
    ctaTitle: "Encore un doute ? Réservez un appel de découverte, gratuit.",
    ctaText:
      "Voyez comment je travaille, et comment je peux vous aider, vous et votre entreprise, à passer l’étape suivante.",
    ctaButton: "Planifier un appel",
  },
  footer: {
    titleLead: "Rendons vos",
    rotatingWords: ["projets tech", "produits", "applications"],
    titleEnd: "remarquables, ensemble",
    emailLabel: "E-mail",
    callLabel: "Appel",
    callCta: "Réserver un appel",
    socialLabel: "Réseaux",
  },
  blog: {
    title: "Mes notes, mes actus, mon parcours",
    intro:
      "Des notes sur la construction de vrais produits : ingénierie, produit, IA et le business derrière la livraison. Écrites depuis Cotonou, pour celles et ceux qui construisent.",
    posts: [
      {
        slug: "build-ship-monetize-loop",
        title: "La boucle Build–Ship–Monetize : le plan à suivre",
        category: "Méthode",
        excerpt:
          "Comment un ingénieur fullstack et produit, basé à Cotonou, pense la construction de vrais produits — avec des actifs qui génèrent du revenu.",
      },
    ],
  },
  cv: {
    pageTitle: "Curriculum vitæ",
    seoDescription:
      "CV de Faust Oswald, ingénieur logiciel produit à Cotonou, au Bénin : projets, expérience, formation, engagements, compétences et écrits.",
    subtitle: "Ingénieur logiciel produit · Fondateur, Nectarr",
    greeting:
      "Salut 👋🏿 Je m’appelle {avatar} [Faust Oswald](/), ingénieur logiciel à 🌴 Cotonou, au Bénin. Je construis 🛠️ [des produits qui rapportent](/projects)",
    bio: `J’ai commencé en 2021 en fondant Oasis Connect, une communauté de plus de 1 200 jeunes créatifs et passionnés de technologie, puis j’ai passé trois ans à Epitech sur le C/C++, les algorithmes, la programmation système et les réseaux.

Aujourd’hui je suis le fondateur de Nectarr, une plateforme marketing portée par l’IA pour les entreprises SaaS. Avant ça, j’ai construit et fait tourner [StableVPS](/projects/stablevps), une activité d’hébergement VPS qui a atteint environ 300 clients actifs avant d’être rachetée par Ruche US. Je construis aussi des produits avec des clients : [NARR’IA](/projects/narria), [ONLIST](/projects/onlist), [Finéa](/projects/finea) et [EdwinHub](/projects/edwinhub).

J’aime transformer des idées ambitieuses en produits que les gens utilisent vraiment, et transmettre ce que j’apprends : j’ai enseigné l’ingénierie logicielle à EIG University et je siège au Awwwards Young Jury.`,
    work: [
      { role: "Fondateur, responsable produit" },
      { role: "Fondateur · rachetée par Ruche US" },
      { role: "Formateur en ingénierie logicielle" },
      { role: "Ingénieur logiciel principal" },
      { role: "Ingénieur logiciel et UX/UI" },
      { role: "Développeur fullstack, stage" },
    ],
    education: [
      { role: "Licence, informatique" },
      { role: "Baccalauréat scientifique, avec mention" },
    ],
    involvements: [
      { role: "Membre du Young Jury" },
      { role: "Responsable technique" },
      { role: "Fondateur" },
    ],
    skills: [
      { label: "Langages" },
      { label: "Frameworks" },
      { label: "Machine learning" },
      { label: "Outils" },
    ],
    languages: [
      { name: "Français", level: "langue maternelle" },
      { name: "Anglais", level: "professionnel" },
    ],
    labels: {
      projects: "Projets",
      work: "Expérience",
      education: "Formation",
      involvements: "Engagements",
      skills: "Compétences",
      languages: "Langues",
      writing: "Écrits",
      elsewhere: "Ailleurs",
      allProjects: "Tous les projets",
      allPosts: "Tous les écrits",
      back: "Portfolio",
      download: "Télécharger le PDF",
    },
  },
};

type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;
