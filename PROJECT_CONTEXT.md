# Portfolio Project Context

## Project Overview
Professional portfolio website for Shri Harihara Suthan M, positioned as an AI Developer / AI Developer Intern. The app is a Next.js App Router portfolio with a white-primary glassmorphism redesign, centralized content data, static project-detail routes and Web3Forms-ready contact architecture.

The portfolio is not production-ready until the supplied portrait file is present at the configured static asset path and the runtime smoke test passes with a valid loaded Hero image.

## Candidate
- Name: Shri Harihara Suthan M
- Role: AI Developer / AI Developer Intern
- Location: Coimbatore, Tamil Nadu
- Email: shrihari.m2006@gmail.com
- LinkedIn: https://www.linkedin.com/in/shri-harihara-suthan-2423b8282/
- GitHub: https://github.com/shrihari0118

## Tech Stack
- Next.js 16.3.6 App Router
- React 19.3.0
- TypeScript
- Tailwind CSS
- Framer Motion 11.18.2
- Lucide React 0.468.0
- ESLint 9.39.5 with `eslint-config-next` 16.3.6
- `ws` for local headless-browser CDP smoke tests

## Folder Structure
- `src/app/`: Root layout, global CSS, homepage and dynamic project route.
- `src/components/`: Navbar, main portfolio composition, section header, contact form and external project GitHub action component.
- `src/data/`: Centralized portfolio data and TypeScript content models.
- `src/lib/`: Shared utilities.
- `scripts/`: Source contract and runtime smoke tests.
- `public/images/`: Static asset location for the supplied Hero portrait. The folder exists; the actual image file still needs to be added.

## Affected Files
- `tailwind.config.ts`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/projects/[slug]/page.tsx`
- `src/components/MainPortfolio.tsx`
- `src/components/Navbar.tsx`
- `src/components/SectionHeader.tsx`
- `src/components/ContactForm.tsx`
- `src/components/ProjectGithubLink.tsx`
- `src/data/portfolio.ts`
- `scripts/validate-main-page.mjs`
- `scripts/smoke-runtime.mjs`
- `public/images/`
- `PROJECT_CONTEXT.md`

## Design System
The current design system is white-primary glassmorphism with restrained technology accents.

- Background: `#F7F8FA`, `#F9FAFB`, `#FFFFFF` with faint teal and warm radial highlights plus an extremely subtle grid texture.
- Glass surfaces: translucent white panels around `rgba(255,255,255,0.68-0.86)`, backdrop blur and thin slate/white borders.
- Text colors: primary near-black `#101828` / `#111827`; secondary slate `#475467` / `#667085`.
- Accents: restrained teal/cyan (`#0F766E`, `#0891B2`) with optional warm amber (`#B7791F`).
- Borders: subtle slate borders around `rgba(15,23,42,0.08)`.
- Shadows: soft elevated shadow `0 16px 40px rgba(15,23,42,0.08)` and restrained teal hover glow.
- Blur: `backdrop-blur-xl` for glass containers, kept subtle and readable.
- Card radius: `1rem` token for primary panels; inner elements use rounded-lg.
- Buttons: primary teal with white text and subtle glow; secondary white glass with dark text and thin borders.
- Inputs: light translucent fields with dark text, grey border and teal focus ring.

## Hero Architecture
- Removed the Hero engineering panel, including the `agent_pipeline.py` label, numbered workflow nodes, code block and related stats.
- Hero now renders the candidate portrait on the right via `next/image`.
- Portrait data is centralized at `portfolio.hero.portrait`.
- Deployment-safe portrait asset URL: `/images/shrihari-profile.jpg`.
- Physical file path to commit: `public/images/shrihari-profile.jpg`.
- Asset-path decision: the Hero may only reference the project static asset URL, never an absolute Windows path, `/mnt/data`, `file://`, Downloads, Desktop or any other developer-machine-only location.
- Image sizing: max-width about `350px`, aspect ratio `4 / 5`, `object-cover`, glass frame and subtle cyan/warm accent behind the frame.
- Desktop layout: left text column and right portrait column using `lg:grid-cols-[minmax(0,1.8fr)_minmax(260px,0.65fr)]`.
- Portrait placement: the portrait frame is slightly lower on desktop via `lg:mt-12`.
- Desktop name behavior: `lg:whitespace-nowrap` with `clamp(2.65rem,4.4vw,4.75rem)` to keep "Shri Harihara Suthan M" on one line at standard desktop widths without horizontal overflow.
- Tablet/mobile behavior: name wraps naturally below the large breakpoint.

## Main Sections
1. Navbar
2. Hero
3. About
4. Technical Skills
5. Projects
6. Experience
7. Certifications
8. Education
9. Contact
10. Footer

## Skills
Final skill categories are centralized in `src/data/portfolio.ts`.

1. Languages
   - Python 88
   - Java 68
   - JavaScript 68
2. AI & LLMs
   - Machine Learning 80
   - Generative AI 82
   - RAG 82
   - Prompt Engineering 80
3. Backend & APIs
   - FastAPI 85
   - REST APIs 82
   - Database Optimization 68
4. Databases
   - MySQL 78
   - MongoDB 75
5. Cloud & DevOps
   - AWS Fundamentals 60
   - Docker 65
   - Git / GitHub 85
   - Linux 68
6. CS Fundamentals
   - DSA Basics 68
   - OOP 78

Removed:
- AI/ML Tools category
- NLP skill row
- LLMs skill row
- User Authentication
- DBMS
- SQL

## Projects
Projects are centralized in `src/data/portfolio.ts`.

- AI Personal Study Assistant
  - Status: Completed / Active Project
  - Domain: Generative AI / RAG
  - Backend: FastAPI
  - GitHub: https://github.com/shrihari0118/AI-PERSONAL-STUDY-ASSISTANT
  - Live URL: empty, disabled in UI
- Tripzy - AI Trip Planner
  - Status: Active / Ongoing
  - Domain: Generative AI / Travel Technology
  - Backend: FastAPI
  - GitHub: https://github.com/shrihari0118/TRIPZY-AI
  - Live URL: empty, disabled in UI
- Forest Fire Prediction & Simulation
  - Status: Research / Prototype
  - Domain: Machine Learning / Environmental AI
  - GitHub: empty, disabled in UI
  - Live URL: empty, disabled in UI

## Project Routes
- `/projects/ai-personal-study-assistant`
- `/projects/tripzy-ai-trip-planner`
- `/projects/forest-fire-prediction`
- Unknown slug uses `notFound()` and returns 404.

Project detail layout:
- Left column: Back to Projects, status, title, summary, detailed explanation, technology badges, metadata and action buttons.
- Right column: project-specific major components workflow panel.

## External Link Architecture
- Main project card body links internally to the project detail route.
- Main project GitHub button is a separate external link and stops event bubbling.
- Detail-page GitHub Repository opens in a new tab only when `githubUrl` exists.
- Detail-page Live Website opens in a new tab only when `liveUrl` exists.
- Empty project URLs render disabled buttons with no fallback href.
- Adding URLs later only requires editing centralized project data.

## Experience
Experience remains one clean glass container:
- Yaane Technologies
- AI-Enabled Engineering Intern
- Jun 2025 - Jul 2025
- Copy covers AI-enabled engineering, Bolt.new research, rapid prototyping, productivity analysis, teamwork and collaborative workflow.

## Certifications
Three individual glass containers are retained:
- Oracle Certified Foundations Associate - AI Foundations
- Introduction to Amazon Web Services
- CodeAlpha Certificate of Completion

Certificate buttons are disabled while `certificateUrl` is empty. No fake links are used.

## Education
Education is compact in one glass container with a subtle divider:
- B.Tech, Information Technology, KGiSL Institute of Technology, 2023 - Present, CGPA: 8.36
- Higher Secondary Certificate - Computer Science, National Model Matriculation Higher Secondary School, 2022 - 2023

## Contact
Contact uses a two-column desktop layout:
- Left: heading, description, Email, LinkedIn and GitHub links.
- Right: light glass contact form.

Contact links:
- Email: `mailto:shrihari.m2006@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/shri-harihara-suthan-2423b8282/`
- GitHub: `https://github.com/shrihari0118`

The form preserves Web3Forms architecture through `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. It does not fake delivery. Without a key, it shows an error and preserves the user-entered message.

## Environment Variables
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`: optional Web3Forms access key for real contact delivery.

## Accessibility
- Semantic `nav`, `main`, `section`, `aside`, `footer` usage.
- Mobile menu uses `aria-expanded`, `aria-controls` and Escape-to-close behavior.
- Hero image alt text: "Shri Harihara Suthan M".
- Contact fields have explicit labels, native `required` constraints and `type="email"`.
- Form status uses `aria-live="polite"` and `role="status"`.
- Skill progress bars use `role="progressbar"` with `aria-valuenow`, `aria-valuemin` and `aria-valuemax`.
- Disabled empty actions use disabled buttons plus `aria-disabled`.
- Focus states use visible teal rings.
- Reduced-motion preference is respected globally.

## Responsive Behaviour
- Runtime smoke test covers `320`, `375`, `425`, `768`, `1024`, `1280`, `1440` and `1920`.
- Navbar collapses to a mobile menu below desktop navigation widths.
- Hero stacks on mobile and becomes text + portrait on desktop.
- Hero name is forced to one line only from the large breakpoint; mobile/tablet can wrap naturally.
- Portrait remains capped around `350px`, is offset slightly lower on desktop, scales responsively and should not dominate the Hero.
- Skills grid uses 1 column mobile, 2 columns tablet and 3 columns on wide screens.
- Project cards and detail pages stack on smaller screens and use multi-column layouts on desktop.
- Contact stacks before desktop and becomes two columns at desktop.

## SEO
- Main page title: `Shri Harihara Suthan M | AI Developer`
- AI Personal Study Assistant title: `AI Personal Study Assistant | Shri Harihara Suthan M`
- Tripzy title: `Tripzy – AI Trip Planner | Shri Harihara Suthan M`
- Forest Fire title: `Forest Fire Prediction & Simulation | Shri Harihara Suthan M`

## Validation Results
Latest targeted Hero asset/layout validation on 2026-09-28:
- Source contract: `npm.cmd run test:main` fails only because `public/images/shrihari-profile.jpg` is missing.
- TypeScript: `npm.cmd run typecheck` passed.
- ESLint: `npm.cmd run lint` passed.
- Production build: `npm.cmd run build` passed and generated `/`, `/_not-found` and all three project pages.
- Runtime smoke: `npm.cmd run test:runtime` against `next start -p 3100` fails at the Hero portrait image-load assertion because `/images/shrihari-profile.jpg` is not present.
- Runtime server log: `The requested resource isn't a valid image for /images/shrihari-profile.jpg received null`.
- Asset search: no candidate portrait image was found in the project, Downloads, Desktop, Pictures or top-level Temp image locations.
- Layout changes made: Hero text column widened, full-name font clamp reduced, portrait container reduced to `max-w-[350px]`, and portrait frame moved lower with `lg:mt-12`.

Latest validation on 2026-09-28:
- Source contract: `npm.cmd run test:main` passed.
- TypeScript: `npm.cmd run typecheck` passed.
- ESLint: `npm.cmd run lint` passed with no warnings after fixing the smoke helper parameter.
- Production build: `npm.cmd run build` passed and generated `/`, `/_not-found` and all three project pages.
- Runtime structural smoke: `npm.cmd run test:runtime` passed before the stricter portrait-loaded assertion was added, verifying breakpoints through `1920`, navigation, project routes, invalid slug 404, contact validation/error path and project action states.
- Runtime image smoke after stricter assertion: `npm.cmd run test:runtime` fails because the configured portrait asset is missing or invalid.
- Invalid project route: `/projects/invalid-project` returned 404.
- Portrait asset request: `/images/shri-harihara-suthan-profile.jpg` returned 404.
- Previous-personal-data scan: `rg -n "Sadhana|sadhanaarumugam07|sadhanasadhu07" . -g "!node_modules/**" -g "!.next/**"` returned zero matches.
- Theme integrity scan: no old dark base colors or dark card classes remain in `src`; `text-white` remains intentionally only on primary button text.
- Skills source scan: removed skill rows/categories are absent from `src`.
- Contact missing-key path: browser smoke validates native required fields, invalid email rejection, missing-key error state and preservation of message text.

## Issues Found and Fixed
- Removed old dark/moody global theme tokens and component utility classes.
- Removed Hero engineering panel from the main page.
- Reworked Hero name sizing and desktop nowrap strategy.
- Removed the AI/ML Tools skills card and requested skill rows.
- Fixed project detail GitHub fallback so empty GitHub URLs do not navigate to the profile URL.
- Added disabled Live Website/GitHub states for empty project URLs.
- Added detailed project explanations and major components.
- Expanded smoke tests to include 1920px, project detail routes, invalid slug 404 and portrait load state.
- Fixed TypeScript issue by making the Forest Fire `backend` field explicit in centralized data.
- Fixed ESLint warning in `scripts/smoke-runtime.mjs`.

## Known Issues
- The required uploaded profile photo is not present in the workspace. The app now references the deployment-safe static URL `/images/shrihari-profile.jpg`, but the corresponding file `public/images/shrihari-profile.jpg` is missing and `npm.cmd run test:runtime` fails on the Hero portrait load assertion.
- Certificate buttons remain disabled until verified certificate URLs are supplied.
- Forest Fire GitHub URL remains empty by requirement and is disabled.
- All live-site URLs are empty and disabled.
- Without `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`, contact submission intentionally shows a missing-configuration error and does not send email.
- No `.git` repository is available in this workspace, so git diff/status/commit workflows cannot be used.

## Pending Setup
- Place the supplied candidate portrait at `public/images/shrihari-profile.jpg`.
- Re-run `npm.cmd run build` and `npm.cmd run test:runtime` after adding the portrait.
- Configure `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in deployment for live contact delivery.
- Add certificate URLs if/when verified.

## Feature Completion
- White glassmorphism redesign: implemented.
- Hero engineering panel removal: implemented.
- Hero portrait architecture: implemented, blocked by missing asset file.
- Skills simplification: implemented.
- Project detail pages: implemented.
- Project routing and invalid route behavior: implemented.
- External GitHub/live-link behavior: implemented.
- Contact architecture: preserved.
- Production readiness: blocked by missing portrait asset and failing runtime image smoke.

## Change Log

### 2026-09-28 — Targeted Hero Static Portrait Path and Layout Adjustment

Affected files:
- `src/data/portfolio.ts`
- `src/components/MainPortfolio.tsx`
- `scripts/validate-main-page.mjs`
- `public/images/`
- `PROJECT_CONTEXT.md`

Asset-path decision:
- Changed Hero portrait URL to `/images/shrihari-profile.jpg`.
- The required committed asset path is `public/images/shrihari-profile.jpg`.
- The Hero must not reference any local Windows, `/mnt/data`, Downloads, Desktop, `file://` or other machine-only path.

Hero layout changes:
- Reduced portrait metadata dimensions from `780x980` to `720x900`.
- Reduced portrait container from `max-w-[390px]` to `max-w-[350px]`.
- Moved the portrait container slightly lower on desktop with `lg:mt-12`.
- Widened the desktop text column from `1.45fr` to `1.8fr`.
- Reduced the Hero name clamp from `clamp(3rem,5vw,5.35rem)` to `clamp(2.65rem,4.4vw,4.75rem)` so "Shri Harihara Suthan M" has more room to remain fully visible on desktop.

Validation:
- `npm.cmd run test:main`: fails because `public/images/shrihari-profile.jpg` is missing.
- `npm.cmd run typecheck`: passed.
- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed.
- `npm.cmd run test:runtime`: fails because `/images/shrihari-profile.jpg` does not load as a valid image.
- No supplied candidate image was found in the project or common local upload/download locations during this pass.

### 2026-09-28 — White Glassmorphism Redesign, Hero Portrait, Skills Simplification and Production QA

Files changed:
- `tailwind.config.ts`
- `src/app/globals.css`
- `src/app/projects/[slug]/page.tsx`
- `src/components/MainPortfolio.tsx`
- `src/components/Navbar.tsx`
- `src/components/SectionHeader.tsx`
- `src/components/ContactForm.tsx`
- `src/data/portfolio.ts`
- `scripts/validate-main-page.mjs`
- `scripts/smoke-runtime.mjs`
- `PROJECT_CONTEXT.md`

Changes:
- Converted the dark/moody theme to white-primary glassmorphism with reusable global panel, button, chip, contact link and input styles.
- Replaced the Hero engineering workflow panel with a `next/image` portrait frame wired to centralized portrait data.
- Tuned Hero grid and name typography so the full name can remain on one line at standard desktop widths while wrapping naturally on mobile.
- Removed the AI/ML Tools skill card.
- Removed the requested skill rows: NLP, LLMs, User Authentication, DBMS and SQL.
- Updated project cards and project detail pages to the new light glass style.
- Added full project-detail content, metadata, major component workflow panels and disabled empty-action behavior.
- Updated route smoke coverage for root, all project routes and invalid slug 404.
- Updated contact form styling to light inputs while preserving Web3Forms missing-key/error behavior.
- Updated responsive, accessibility and content-integrity smoke tests.

Validation:
- `npm.cmd run test:main`: passed.
- `npm.cmd run typecheck`: passed.
- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed.
- `npm.cmd run test:runtime`: currently fails on the stricter portrait image load assertion because `/images/shri-harihara-suthan-profile.jpg` is missing.
- Responsive checks through `320`, `375`, `425`, `768`, `1024`, `1280`, `1440` and `1920`: structurally passed before the portrait-loaded assertion; final runtime pass is pending the real portrait asset.
- Route checks: `/`, the three project routes and `/projects/invalid-project` verified; invalid slug returns 404.
- Accessibility checks: smoke-tested labels, `aria-live`, disabled action semantics, progressbar ARIA, mobile menu ARIA, focus-state classes and reduced-motion CSS.
- Content integrity: forbidden previous-personal-data scan returned zero matches.
