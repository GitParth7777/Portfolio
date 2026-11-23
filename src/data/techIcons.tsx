import type { IconType } from "react-icons";
import {
  SiAutodesk,
  SiCloudinary,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiHtml5,
  SiJavascript,
  SiJira,
  SiJsonwebtokens,
  SiMongodb,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiRender,
  SiShadcnui,
  SiSocketdotio,
  SiTailwindcss,
  SiTanstack,
  SiTypescript,
} from "react-icons/si";
import { FaFileSignature, FaMicrosoft } from "react-icons/fa";
import { Database, Globe, KeyRound, Languages, MonitorSmartphone, Network, Puzzle, ScanText, Webhook } from "lucide-react";

type AnyIcon = IconType | typeof Database;

/** Tech name → [icon, brand colour]. Unknown names fall back to a generic icon. */
const map: Record<string, [AnyIcon, string]> = {
  "React.js": [SiReact, "#61DAFB"],
  React: [SiReact, "#61DAFB"],
  TypeScript: [SiTypescript, "#3178C6"],
  JavaScript: [SiJavascript, "#F7DF1E"],
  Python: [SiPython, "#3776AB"],
  SQL: [Database, "#8b7bff"],
  HTML: [SiHtml5, "#E34F26"],
  CSS: [SiCss, "#663399"],
  "C++": [SiCplusplus, "#00599C"],
  TanStack: [SiTanstack, "#FF4154"],
  "Tailwind CSS": [SiTailwindcss, "#06B6D4"],
  "shadcn/ui": [SiShadcnui, "currentColor"],
  "Ark UI": [Puzzle, "#22c55e"],
  i18n: [Languages, "#f59e0b"],
  "Responsive Design": [MonitorSmartphone, "#4f8cff"],
  "Node.js": [SiNodedotjs, "#5FA04E"],
  "Express.js": [SiExpress, "currentColor"],
  FastAPI: [SiFastapi, "#009688"],
  "REST APIs": [Webhook, "#8b7bff"],
  "Socket.io": [SiSocketdotio, "currentColor"],
  WebSockets: [Network, "#4f8cff"],
  JWT: [SiJsonwebtokens, "#D63AFF"],
  "OAuth 2.0": [KeyRound, "#f59e0b"],
  PostgreSQL: [SiPostgresql, "#4169E1"],
  MongoDB: [SiMongodb, "#47A248"],
  "Autodesk ACC": [SiAutodesk, "currentColor"],
  "Microsoft Entra ID": [FaMicrosoft, "#00A4EF"],
  DocuSign: [FaFileSignature, "#FFCC22"],
  "Gemini API": [SiGooglegemini, "#8E75B2"],
  OCR: [ScanText, "#22c55e"],
  Cloudinary: [SiCloudinary, "#3448C5"],
  Git: [SiGit, "#F05032"],
  GitHub: [SiGithub, "currentColor"],
  Docker: [SiDocker, "#2496ED"],
  Postman: [SiPostman, "#FF6C37"],
  Render: [SiRender, "currentColor"],
  "Agile/Scrum": [SiJira, "#0052CC"],
};

export function TechIcon({ name, className = "size-4" }: { name: string; className?: string }) {
  const [Icon, color] = map[name] ?? [Globe, "currentColor"];
  return <Icon className={className} style={{ color }} aria-hidden />;
}

/** Brand colour for a tech (falls back to the accent colour). */
export function techColor(name: string) {
  const c = map[name]?.[1];
  return !c || c === "currentColor" ? "var(--accent)" : c;
}
