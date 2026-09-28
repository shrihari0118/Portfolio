import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const page = [
  read("src/app/page.tsx"),
  read("src/components/MainPortfolio.tsx"),
  read("src/components/Navbar.tsx"),
  read("src/components/ContactForm.tsx"),
  read("src/components/ProjectGithubLink.tsx"),
  read("src/data/portfolio.ts")
].join("\n");
const data = read("src/data/portfolio.ts");
const globals = read("src/app/globals.css");

const requiredIds = ["hero", "about", "skills", "projects", "experience", "education", "contact"];
for (const id of requiredIds) {
  assert.match(page, new RegExp(`id=["']${id}["']`), `Missing section id: ${id}`);
}

const navItems = ["Home", "About", "Skills", "Projects", "Experience", "Education", "Contact"];
for (const item of navItems) {
  assert.match(page, new RegExp(`>${item}<|label: "${item}"`), `Missing nav item: ${item}`);
}

const skills = [
  ["Python", 88],
  ["Java", 68],
  ["JavaScript", 68],
  ["Machine Learning", 80],
  ["Generative AI", 82],
  ["RAG", 82],
  ["Prompt Engineering", 80],
  ["FastAPI", 85],
  ["REST APIs", 82],
  ["Database Optimization", 68],
  ["MySQL", 78],
  ["MongoDB", 75],
  ["AWS Fundamentals", 60],
  ["Docker", 65],
  ["Git / GitHub", 85],
  ["Linux", 68],
  ["DSA Basics", 68],
  ["OOP", 78]
];

for (const [skill, percentage] of skills) {
  assert.match(data, new RegExp(`name: "${escapeRegExp(skill)}", percentage: ${percentage}`), `Skill value mismatch: ${skill}`);
}

const removedSkillEntries = [
  'title: "AI/ML Tools"',
  'name: "NLP"',
  'name: "LLMs"',
  'name: "User Authentication"',
  'name: "DBMS"',
  'name: "SQL"'
];
for (const removed of removedSkillEntries) {
  assert.equal(data.includes(removed), false, `Removed skill/category still present in data: ${removed}`);
}

const finalCategories = ["Languages", "AI & LLMs", "Backend & APIs", "Databases", "Cloud & DevOps", "CS Fundamentals"];
for (const category of finalCategories) {
  assert.match(data, new RegExp(`title: "${escapeRegExp(category)}"`), `Missing final skill category: ${category}`);
}
assert.equal((data.match(/title: "/g) ?? []).length >= finalCategories.length, true, "Expected centralized titled data entries.");

const projectContracts = [
  ["AI Personal Study Assistant", "AI-PERSONAL-STUDY-ASSISTANT", "ai-personal-study-assistant"],
  ["Tripzy - AI Trip Planner", "TRIPZY-AI", "tripzy-ai-trip-planner"],
  ["Forest Fire Prediction & Simulation", 'githubUrl: ""', "forest-fire-prediction"]
];

for (const [title, githubOrEmpty, slug] of projectContracts) {
  assert.match(data, new RegExp(escapeRegExp(title)), `Missing project title: ${title}`);
  assert.match(data, new RegExp(escapeRegExp(githubOrEmpty)), `Missing GitHub contract for: ${title}`);
  assert.match(data, new RegExp(`slug: "${slug}"`), `Missing slug: ${slug}`);
}

assert.match(page, /View Certificate/, "Missing certificate buttons");
assert.match(page, /aria-disabled=\{!certification\.certificateUrl\}/, "Certificate empty URLs must render disabled");
assert.match(page, /href=\{projectRoute\(project\.slug\)\}/, "Project card body must navigate internally");
assert.match(page, /onClick=\{\(event\) => event\.stopPropagation\(\)\}/, "GitHub button must stop card route navigation");
assert.match(page, /from "next\/image"/, "Hero portrait should use next/image");
assert.match(page, /portfolio\.hero\.portrait/, "Hero portrait must come from centralized data");
assert.match(data, /src: "\/images\/shrihari-profile\.jpg"/, "Hero portrait must use the deployment-safe public image path.");
assert.equal(data.includes("/images/shri-harihara-suthan-profile.jpg"), false, "Old portrait asset path should not remain.");
const portraitFile = new URL("../public/images/shrihari-profile.jpg", import.meta.url);
assert.equal(existsSync(portraitFile), true, "Hero portrait file is missing from public/images.");
assert.ok(statSync(portraitFile).size > 1024, "Hero portrait file should be a real image asset, not an empty placeholder.");
assert.equal(page.includes("agent_pipeline.py"), false, "Hero pipeline filename must be removed from the Hero.");
assert.equal(page.includes("pipelineSteps"), false, "Hero pipeline steps must not render on the main page.");
assert.match(globals, /color-scheme: light/, "Global theme should be light.");
assert.match(globals, /--background: #f7f8fa/i, "Global background token should use white-primary glassmorphism.");

assert.match(page, /mailto:\$\{portfolio\.candidate\.email\}/, "Missing centralized mailto contact link");
assert.match(page, /NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY/, "Contact form must use environment variable");
assert.match(page, /aria-live="polite"/, "Contact status must use aria-live");
assert.match(page, /required/, "Contact form fields must be required");
assert.match(page, /type="email"/, "Contact form must use email input");
assert.match(page, /disabled=\{status === "sending"\}/, "Submit button must protect sending state");

assert.match(globals, /prefers-reduced-motion: reduce/, "Missing reduced-motion support");
const forbiddenPreviousPortfolioTerms = [
  ["Sad", "hana"].join(""),
  ["sadhana", "arumugam07"].join(""),
  ["sadhana", "sadhu07"].join("")
];

for (const forbiddenTerm of forbiddenPreviousPortfolioTerms) {
  assert.equal(`${page}\n${data}`.includes(forbiddenTerm), false, "Forbidden previous-portfolio reference found");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
