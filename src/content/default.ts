import { defaultProjects } from "./projects";
import type { SiteContent } from "./types";

export const defaultContent: SiteContent = {
  settings: {
    name: "Faust Oswald",
    role: "Product Software Engineer",
    siteUrl: "https://faustoswald.com",
    seoTitle: "Faust Oswald — Product Software Engineer",
    seoDescription:
      "Product Software Engineer. I build web apps, mobile apps, SaaS, AI and infrastructure — with clear architecture, clean code and continuous delivery.",
    email: "faustfrank370@gmail.com",
    whatsapp: "https://wa.me/22998367753",
    calUrl: "https://cal.com/faust-oswald-pvvlde/call-tech",
    availability: "Available for Q4",
    instagram: "https://www.instagram.com/faustoswald/",
    x: "https://x.com/OswaldFaust2",
    linkedin: "https://www.linkedin.com/in/faust-oswald/",
    facebook: "https://www.facebook.com/FaustOswald1/",
    linkedinFollowers: "12,730",
    facebookFollowers: "7,000",
    awardTitle: "Awwwards Young Jury",
    awardSubtitle: "Jury member",
    timezone: "Africa/Porto-Novo",
    city: "Cotonou",
  },
  hero: {
    titleLead: "Building",
    rotatingWords: ["products", "apps", "websites", "platforms", "systems"],
    titleEnd: "that pay off.",
    descriptionStrong:
      "From idea to product: design, architecture, development, AI and optimization.",
    description:
      "One technical partner to build products that create value.",
    cta: "Book a tech call with me",
    collaborations: "99+ Collaborations",
  },
  logos: [
    { name: "Partner 1", src: "/images/logos/logo-1.png" },
    { name: "Epitech", src: "/images/logos/logo-2.png" },
    { name: "Wallafrica", src: "/images/logos/logo-3.png" },
    { name: "Partner 4", src: "/images/logos/logo-4.png" },
    { name: "EIG", src: "/images/logos/logo-5.svg" },
    { name: "Beewton", src: "/images/logos/logo-6.svg" },
    { name: "Partner 7", src: "/images/logos/logo-7.png" },
    { name: "Partner 8", src: "/images/logos/logo-8.png" },
  ],
  projectsSection: {
    title: "My latest projects",
    moreLabel: "See more projects",
    pageTitle: "My most recent projects",
    pageIntro: "A selection of the work I’m best known for.",
    categoryLabels: {
      web: "Web SaaS / Web applications",
      mobile: "Mobile applications",
      landing: "Landing pages",
    },
  },
  projects: defaultProjects,
  services: {
    titleMuted: "Services that",
    title: "transform your business and your projects.",
    stackLabel: "My tech stack",
    items: [
      { label: "Framer Development", icon: "framer" },
      { label: "Mobile Development", icon: "mobile" },
      { label: "Web Applications", icon: "web" },
      { label: "Landing Pages", icon: "landing" },
      { label: "Artificial Intelligence", icon: "ai" },
    ],
    stack: [
      "javascript",
      "typescript",
      "react",
      "nextjs",
      "apple",
      "swift",
      "supabase",
      "docker",
    ],
  },
  about: {
    titleLead: "Building",
    rotatingWords: ["tech", "digital", "innovative", "impactful", "ambitious"],
    titleAfter: "projects",
    titleEnd: "that change lives.",
    portrait: "/images/people/portrait.png",
    paragraphs: [
      {
        strong:
          "I love turning ambitious ideas into products people actually use.",
        text: "To me, building an application isn’t just about writing code: it’s about understanding a problem, designing a relevant solution and creating an experience that delivers real value.",
      },
      {
        strong:
          "I work across the entire lifecycle of a product, from strategic thinking to design, through development, deployment and evolution.",
        text: "Whether it’s a SaaS, a mobile app, a web platform or a product powered by artificial intelligence, my goal stays the same: build products that are fast, reliable and made to last.",
      },
      {
        strong:
          "Every project is built with the same standards as if it were my own startup.",
        text: "",
      },
    ],
    experienceLabel: "Previously worked with",
    experience: [
      {
        company: "EIG Benin",
        role: "Software Engineering Instructor",
        period: "2026",
      },
      { company: "Beewton", role: "Fullstack Developer", period: "2025 - 2026" },
      { company: "Epitech", role: "Software Engineer", period: "2022 - 2025" },
    ],
  },
  pricing: {
    titleMuted: "Simple pricing.",
    title: "Insanely good dev.",
    introStrong: "Clear costs, no extras.",
    intro: "Choose to work month to month or get billed per project.",
    steps: [
      {
        title: "Subscribe",
        text: "Subscribe through Stripe and start submitting requests from the client area.",
      },
      {
        title: "Request",
        text: "Request any service on offer, from web development to mobile.",
      },
      {
        title: "Receive",
        text: "Get what you need delivered as fast as possible.",
      },
    ],
    cardBadge: "Pause or cancel anytime",
    cardText: "A subscription for projects that want to grow.",
    plansBadge: "Plans available",
    plansTitle: "Start today",
    plansText:
      "Skip the agency song and dance and work directly with me for once.",
    subscription: {
      title: "Your dedicated developer",
      description:
        "A monthly subscription to keep your product moving: clear priorities, continuous development and support tailored to startups.",
      price: "€1,000",
      period: "per month",
      features: [
        "Dedicated developer",
        "Weekly priorities",
        "Continuous delivery",
        "Maintenance included",
        "Scalable architecture",
        "Regular product check-ins",
      ],
      cta: "Get started",
    },
    oneOff: {
      title: "One-off project",
      description:
        "Complete dev services for any kind of project. Ideal for a one-time need or a focused mission.",
      features: [
        "Clearly defined scope",
        "Fixed timeline",
        "3 rounds of revisions",
        "Milestone tracking",
      ],
      cta: "Request a quote",
    },
  },
  expertise: {
    title: "Need an expert who builds alongside you?",
    items: [
      {
        title: "Product coaching",
        text: "An idea that won’t settle, or a product going in circles. We name what’s blocking it, pick a direction, and leave with a plan you can use this week.",
      },
      {
        title: "Web courses & mentoring",
        text: "Hands-on teaching, from JavaScript and React to Framer. Exercises, a real project, and feedback on the work you actually ship.",
      },
      {
        title: "AI, without the fog",
        text: "You want AI in the daily work or in the product. We separate the use cases that earn their place from the noise, then we build.",
      },
    ],
    bannerText:
      "Not sure which format fits? Describe the situation. I’ll give you a straight answer.",
    bannerCta: "Tell me what you need",
  },
  testimonials: {
    logosLead: "Worked with",
    logosStrong: "several companies",
    titleMuted: "Hear what",
    title: "my clients say.",
    label: "99+ Happy clients",
    items: [
      {
        quote:
          "I’m delighted with my 4 years of working with Faust — easily my best collaboration so far. He is very insightful and professional on the job. What impresses me most, though, is his creative mind.",
        name: "Emmanuel Jecs",
        role: "Creative Designer",
        avatar: "/images/people/client-3.png",
      },
      {
        quote:
          "A truly serious collaborator with a real eye for detail. Very professional and meticulous — it’s a pleasure to work with him.",
        name: "René Vodjo",
        role: "Community Manager",
        avatar: "/images/people/client-2.png",
      },
      {
        quote:
          "I really enjoyed our collaboration. Very dynamic and, above all, very professional. A good dev, a good creative and a good designer.",
        name: "Donald Honfo",
        role: "Co-founder, BrandIt",
        avatar: "/images/people/client-1.jpg",
      },
    ],
  },
  faq: {
    title: "Your questions, answered.",
    items: [
      {
        question: "How does the monthly development partnership work?",
        answer:
          "For €1,000 per month, I become your development partner: we set the priorities, move forward in short iterations and evolve your product continuously.",
      },
      {
        question: "Which tech products and services do you offer?",
        answer:
          "I support startups and product teams on web applications, SaaS, internal platforms, APIs, automations and custom digital experiences.",
      },
      {
        question: "Can you join a startup that is already up and running?",
        answer:
          "Yes. I can take over an existing codebase, audit the architecture, fix the blockers and ship new features without slowing the team down.",
      },
      {
        question: "Which stack do you use?",
        answer:
          "The stack depends on your needs. I favor robust, scalable solutions, with particular attention to performance, maintainability and user experience.",
      },
      {
        question: "How do you organize follow-up and deliveries?",
        answer:
          "We hold a regular check-in on priorities, progress and next steps. You keep clear visibility on the product, the technical decisions and every delivery.",
      },
    ],
    ctaTitle: "Still unsure? Book a free discovery call.",
    ctaText:
      "See how I work and how I can help you and your company reach the next stage.",
    ctaButton: "Schedule a call",
  },
  footer: {
    titleLead: "Let’s make your",
    rotatingWords: ["tech projects", "products", "apps"],
    titleEnd: "incredible together",
    emailLabel: "Email",
    callLabel: "Call me",
    callCta: "Book a call",
    socialLabel: "Social media",
    wordmark: "FAUST",
  },
  blog: {
    title: "My thoughts, my news and my journey",
    intro:
      "Notes on building real products: engineering, product thinking, AI and the business behind shipping. Written from Cotonou, for builders everywhere.",
    posts: [
      {
        slug: "build-ship-monetize-loop",
        title: "The Build–Ship–Monetize loop: the blueprint to follow",
        category: "Process",
        date: "2026-08-16",
        author: "Faust Oswald",
        excerpt:
          "How a Fullstack/Product Engineer based in Cotonou thinks about building real products — with assets that generate revenue.",
        cover: "/images/misc/blog-build-ship-monetize.jpeg",
        body: `## The loop that doesn’t lie

Everything I build runs on the same loop:

**Build → Ship → Monetize → Audience → Companies → Mobility**

It’s not a slogan. It’s the order of operations. Most builders get the first two right and stop. The third — monetizing — is where the loop either closes or dies. Audience and companies come after, and mobility (the freedom to operate from anywhere) is the long game.

Cash flow comes first. Always. Not vanity metrics. Not GitHub stars. Revenue — or at least a credible path to it.

## Where I come from

My name is **Faust Oswald**. I’m based in **Cotonou, Benin**. I’m a **Fullstack/Product Engineer** — TypeScript, JavaScript, React, Next.js, Tailwind, Node.js, Express, MongoDB, React Native, Expo, EAS. I also write C, C++, Python and Dockerfiles when the problem calls for it.

I spent about three years at **Epitech Benin**. I graduated. I didn’t stop there — I treated it as infrastructure, not a finish line.

Since then, I’ve been building:

- **VERSUS** — React Native + ExpressJS — being finalized
- **StableVPS** — infra/VPS + Next.js — shipped
- **SHEMA** — Shopify + React Native — in development

And more in the pipeline: ONLIST, Lydia / Hello AI.

None of these projects is an “idea”. They are products with stacks, scopes and delivery targets.

## Analyze before you build

Before writing a single line, I run through a fixed checklist:

- **Problem** — what is actually broken, and for whom?
- **Customer** — who pays, and why would they pay now?
- **Competition** — who already solves this, and where do they fall short?
- **Distribution** — how do people find it? Organic? Paid? Word of mouth?
- **Pricing** — what are the unit economics?
- **Legal** — is it allowed in the jurisdiction I operate in? (In my case: Benin, law 2017-21 + CNPD for data.)
- **Margins** — how much does it cost to run, and what is left?
- **MVP** — what is the smallest thing that delivers value and can be tested?
- **Defensibility** — what is the moat, if there is one?

Then I run the numbers. Numbers before opinions.

Then I decide: **BUILD / TEST FIRST / PIVOT / SKIP**. Not every idea deserves code. The ones that do get built lean and tested fast.

## Test first, always

When I build, I test first. Not after. The MVP is a hypothesis. Shipping without testing is building blind.

“BUILD/TEST FIRST” means: smallest increment → real user or real traffic → real signal → iterate or kill. Not months of building in the dark.

## The UI I believe in

I ship premium, dark, iOS/glass-style interfaces. Clean. Confident. Minimal noise. If it looks like a default template, I’m doing it wrong.

That’s not aesthetic vanity. A premium finish signals quality before the user has read a single word — and in a market where trust is scarce, that matters.

## AI: open source, permissive licenses

On the AI side, I work with open-source models under permissive licenses — Apache 2.0, MIT. I’m a fan of the Qwen family for that: no legal maze, no surprise restrictions, just models I can build on.

For me this isn’t a technical preference. It’s a business decision. The license determines whether a product can be shipped, sold and scaled without a legal team on standby.

## Jurisdiction is a constraint, not a bug

I operate from Benin. My currency is the euro. The legal framework is Benin’s law 2017-21 and the CNPD for personal data.

That’s not a limitation to complain about. It’s a constraint to design around. It shapes pricing, data handling, and where and how I sell. Constraints create focus. Focus creates product.

## Shipping is the point

StableVPS is shipped. VERSUS is being finalized. SHEMA is in development. Each followed the loop: build, ship, monetize. Not every project reaches “monetize” on the first try. But each one teaches something for the next.

The goal isn’t a portfolio of half-finished repos. The goal is a portfolio of shipped things that earn, or can earn, and a track record that compounds.

## What it means in practice

If you’re building right now:

- Treat your education as infrastructure. Use it. Don’t worship it.
- Pick a stack you can ship with, not one that sounds impressive in a conference talk.
- Run the analysis checklist before committing code.
- Test before building the full thing.
- Ship dark, clean, premium. Trust matters.
- Prefer open, permissive tooling when it removes friction.
- Know your jurisdiction. Design for it.
- Monetize early enough to know whether the loop is real.

The loop doesn’t ask for permission. It asks for a shipped product and a price on the table.`,
      },
    ],
  },
  cv: {
    pageTitle: "Curriculum Vitae",
    seoDescription:
      "CV of Faust Oswald, product software engineer in Cotonou, Benin: projects, work, education, involvements, skills and writing.",
    subtitle: "Product Software Engineer · Founder, Nectarr",
    greeting:
      "Hi 👋🏿 My name is {avatar} [Faust Oswald](/), and I’m a software engineer in 🌴 Cotonou, Benin building 🛠️ [products that pay off](/projects)",
    bio: `I started in 2021 by founding Oasis Connect, a community of 1,200+ young creatives and technology enthusiasts, then spent three years at Epitech working on C/C++, algorithms, systems programming and computer networking.

Right now I’m the founder of Nectarr, an AI-powered marketing platform for SaaS companies. Before that I built and ran [StableVPS](/projects/stablevps), a VPS hosting business that grew to about 300 active customers before it was acquired by Ruche US. I also build products with clients: [NARR’IA](/projects/narria), [ONLIST](/projects/onlist), [Finéa](/projects/finea) and [EdwinHub](/projects/edwinhub).

I like turning ambitious ideas into products people actually use, and passing on what I learn: I taught software engineering at EIG University and I sit on the Awwwards Young Jury.`,
    projectSlugs: ["narria", "stablevps", "onlist", "finea", "edwinhub", "busted-data-saas"],
    work: [
      { name: "Nectarr", role: "Founder, Head of Product", period: "2026 - Present", url: "" },
      { name: "StableVPS", role: "Founder · acquired by Ruche US", period: "2026", url: "https://stablevps.eu/" },
      { name: "EIG University", role: "Software Engineering Instructor", period: "2026", url: "" },
      { name: "Beewton", role: "Lead Software Engineer", period: "2025 - 2026", url: "" },
      { name: "85Media.fr", role: "Software & UX/UI Engineer", period: "2024 - 2025", url: "" },
      { name: "Atelier Paon", role: "Fullstack Developer Intern", period: "2023", url: "" },
    ],
    education: [
      { name: "Epitech", role: "BSc, Computer Science", period: "2022 - 2025", url: "https://www.epitech.eu/" },
      { name: "CS Félicité", role: "Scientific Baccalauréat, with honours", period: "2022", url: "" },
    ],
    involvements: [
      { name: "Awwwards", role: "Young Jury Member", period: "2025 - 2026", url: "https://www.awwwards.com/" },
      { name: "Google Developer Club Epitech", role: "Technical Lead", period: "2023 - 2024", url: "" },
      { name: "Oasis Connect", role: "Founder", period: "2021 - 2024", url: "" },
    ],
    skills: [
      {
        label: "Languages",
        list: "Python, TypeScript, JavaScript, C/C++, Dart, Java, SQL, Rust, Ruby, R, LaTeX, HTML/CSS",
      },
      {
        label: "Frameworks",
        list: "React, React Native, Next.js, Vue.js, Flutter, Flask, Node.js, Express, REST APIs",
      },
      { label: "Machine learning", list: "Hugging Face, LlamaFactory" },
      {
        label: "Tools",
        list: "Unix/Linux, Shell, Git, GitHub Actions, CI/CD, Docker, AWS, Microsoft Azure",
      },
    ],
    languages: [
      { name: "French", level: "native" },
      { name: "English", level: "professional working proficiency" },
    ],
    github: "https://github.com/Oswald-Faust",
    labels: {
      projects: "Building",
      work: "Work",
      education: "Education",
      involvements: "Involvements",
      skills: "Skills",
      languages: "Spoken",
      writing: "Writing",
      elsewhere: "Elsewhere",
      allProjects: "All projects",
      allPosts: "All writing",
      back: "Portfolio",
      download: "Download PDF",
    },
  },
};
