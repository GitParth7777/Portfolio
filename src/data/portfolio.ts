// ─────────────────────────────────────────────────────────────
//  All site content lives here. Edit text in this file only —
//  the components read from it automatically.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Parth Babariya",
  firstName: "Parth",
  role: "Full-Stack Developer",
  location: "Ahmedabad, Gujarat, India",
  city: "Ahmedabad",
  tagline:
    "I build enterprise web applications with React, TypeScript, FastAPI and PostgreSQL, from the database schema to the last button on the screen.",
  availability: "Open to full-stack & product engineering roles",
  photo: "/parth.jpg",
  resume: "/Parth_Babariya_Resume.pdf",
  email: "parth.babariya70165@gmail.com",
  phone: "+91 84012 32301",
  phoneHref: "tel:+918401232301",
  linkedin: { url: "https://www.linkedin.com/in/babariyaparth990/", handle: "babariyaparth990" },
  github: { url: "https://github.com/GitParth7777", handle: "GitParth7777" },
};

export const about = {
  paragraphs: [
    "I'm a B.Tech ICT graduate from Adani University. I like work where software replaces a manual process people actually depend on: registers, approvals, migrations, billing.",
    "Most of my time goes into the parts users never see, like concurrency-safe numbering, SSO, and data that has to arrive intact. I also care about the screens they do see.",
  ],
};

export type Visual = "voice" | "editor";

export type Highlight = { icon: string; label: string; text: string };

export type Experience = {
  id: string;
  title: string;
  client: string;
  company: string;
  role: string;
  period: string;
  /** One or two lines shown on the card. */
  summary: string;
  tags: string[];
  problem: string;
  built: Highlight[];
  outcome: string;
};

export const experience: Experience[] = [
  {
    id: "correspondence",
    title: "Correspondence Management Platform",
    client: "Renewable Energy Client",
    company: "CCTech",
    role: "Forward Deployed Engineer (Full-Stack)",
    period: "Jul 2026 – Present",
    summary: "Replaced manual vendor correspondence with one platform: a gap-free Letter Register and a vendor Correspondence Hub.",
    tags: ["React", "shadcn/ui", "FastAPI", "PostgreSQL", "Entra ID", "DocuSign", "OCR"],
    problem: "Vendor letters were tracked by hand, with no central numbering and no view of pending replies.",
    built: [
      { icon: "hash", label: "Letter Register", text: "Gap-free, concurrency-safe letter numbering" },
      { icon: "inbox", label: "Correspondence Hub", text: "Vendor onboarding, PM routing, action tracking" },
      { icon: "scan", label: "OCR pre-fill", text: "Reads letter metadata, with manual fallback" },
      { icon: "shield", label: "SSO + e-signature", text: "Microsoft Entra ID login and DocuSign" },
    ],
    outcome: "Replaced the manual process in both business units, with Excel reports for missing numbers and pending replies.",
  },
  {
    id: "migration",
    title: "Aconex → Autodesk Construction Cloud Migration",
    client: "Client Project",
    company: "CCTech",
    role: "Forward Deployed Engineer (Full-Stack)",
    period: "Jul 2026 – Present",
    summary: "Automated moving project files and metadata from Aconex to Autodesk ACC.",
    tags: ["REST APIs", "OAuth 2.0", "Autodesk ACC"],
    problem: "Client project data had to move to ACC without losing a single file or field.",
    built: [
      { icon: "zap", label: "Automated transfer", text: "REST APIs with ACC OAuth 2.0 authentication" },
      { icon: "bug", label: "Error fixing", text: "Debugged transfer failures as they surfaced" },
      { icon: "check", label: "Verification", text: "Checked files and metadata for completeness" },
    ],
    outcome: "Files and metadata verified complete and accurate in ACC.",
  },
  {
    id: "drs",
    title: "DRS: Digital Routing System",
    client: "Renewable Energy Client",
    company: "CCTech",
    role: "Full Stack Developer Intern",
    period: "Jun 2026 – Jul 2026",
    summary: "UI features, Hindi localization and 15+ bug fixes for a construction platform.",
    tags: ["React", "TypeScript", "TanStack", "Ark UI", "i18n"],
    problem: "New UI features and defect fixes were needed across onboarding, service orders, materials and billing.",
    built: [
      { icon: "layout", label: "UI components", text: "React + TypeScript with Ark UI and TanStack" },
      { icon: "languages", label: "Localization", text: "English–Hindi across DRS screens" },
      { icon: "bug", label: "15+ defects fixed", text: "Root-cause debugging, no broken flows" },
    ],
    outcome: "Shipped features across four workflows while keeping existing flows stable.",
  },
];

export const roles = [
  { title: "Full Stack Developer Intern", company: "CCTech", period: "Jun 2026 – Jul 2026" },
  { title: "Forward Deployed Engineer (Full-Stack)", company: "CCTech", period: "Jul 2026 – Present" },
];

export type Project = {
  id: string;
  name: string;
  tagline: string;
  tags: string[];
  github: string;
  demo: string;
  why: string;
  how: string;
  result: string;
  visual: Visual;
};

export const projects: Project[] = [
  {
    id: "shifra",
    name: "Shifra",
    tagline: "AI voice assistant that listens, answers aloud and remembers.",
    tags: ["MongoDB", "Express.js", "React", "Node.js", "Tailwind CSS", "Gemini API", "Web Speech API", "Cloudinary"],
    github: "https://github.com/GitParth7777/virtualAssistant",
    demo: "https://virtualassistant-nakf.onrender.com/",
    why: "Text chatbots need typing and often lose context between follow-ups, which makes them awkward to use hands-free.",
    how: "Speech recognition and synthesis run on the Web Speech API, and replies come from the Gemini API. The last 2–3 exchanges are sent as context so follow-up questions stay coherent. An Express.js backend with JWT authentication stores each user's conversation history in MongoDB.",
    result: "A deployed, hands-free assistant that answers spoken questions aloud and remembers each user's past conversations.",
    visual: "voice",
  },
  {
    id: "codesync",
    name: "CodeSync",
    tagline: "Real-time collaborative code editor for pair programming.",
    tags: ["React", "Node.js", "Express.js", "Socket.io", "CodeMirror"],
    github: "https://github.com/GitParth7777/Realtime-Code-Editor",
    demo: "https://realtime-code-editor-1-yhlf.onrender.com",
    why: "Sharing code over chat or screen-share makes pair programming slow, because only one person can edit at a time.",
    how: "The editor is built with React and CodeMirror on a Node.js/Express.js backend. Every change is synced through Socket.io (WebSocket) events, and room-based sessions show join/leave notifications so everyone knows who is active.",
    result: "A live demo on Render where users in the same room see each other's edits in real time.",
    visual: "editor",
  },
];

/** Big tiles at the top of the Skills section. */
export const coreStack = [
  { name: "React.js", display: "React", label: "Frontend" },
  { name: "TypeScript", display: "TypeScript", label: "Language" },
  { name: "FastAPI", display: "FastAPI", label: "Backend" },
  { name: "PostgreSQL", display: "PostgreSQL", label: "Database" },
  { name: "Node.js", display: "Node.js", label: "Runtime" },
  { name: "Python", display: "Python", label: "Language" },
];

/** Highlighted in the full toolbox list (core stack + what I use at work right now). */
export const dailyDrivers = new Set([
  ...coreStack.map((c) => c.name),
  "Tailwind CSS",
  "shadcn/ui",
  "REST APIs",
  "Microsoft Entra ID",
  "DocuSign",
  "Git",
]);

export const skills: { title: string; items: string[] }[] = [
  {
    title: "Frontend",
    items: ["React.js", "TypeScript", "TanStack", "Tailwind CSS", "shadcn/ui", "Ark UI", "i18n", "Responsive Design"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "FastAPI", "REST APIs", "Socket.io", "WebSockets", "JWT", "OAuth 2.0"],
  },
  { title: "Languages", items: ["JavaScript", "TypeScript", "Python", "SQL", "HTML", "CSS", "C++"] },
  { title: "Databases", items: ["PostgreSQL", "MongoDB"] },
  {
    title: "Integrations",
    items: ["Autodesk ACC", "Microsoft Entra ID", "DocuSign", "Gemini API", "OCR", "Cloudinary"],
  },
  { title: "Tools", items: ["Git", "GitHub", "Docker", "Postman", "Render", "Agile/Scrum"] },
];

export const marqueeTech = [
  "React.js",
  "TypeScript",
  "FastAPI",
  "PostgreSQL",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
  "Socket.io",
  "Python",
  "Docker",
  "TanStack",
  "shadcn/ui",
  "Gemini API",
];

export const education = {
  school: "Adani University",
  location: "Ahmedabad",
  degree: "B.Tech in Information and Communication Technology",
  cgpa: 8.56,
  period: "2022 – 2026",
};
