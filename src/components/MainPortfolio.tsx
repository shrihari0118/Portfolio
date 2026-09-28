import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin
} from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { ContactForm } from "@/components/ContactForm";
import { Navbar } from "@/components/Navbar";
import { ProjectGithubLink } from "@/components/ProjectGithubLink";
import { SectionHeader } from "@/components/SectionHeader";

export function MainPortfolio() {
  return (
    <>
      <Navbar items={portfolio.navigation} name={portfolio.candidate.name} />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="section-shell grid min-h-[calc(100vh-5.5rem)] scroll-mt-28 items-center gap-10 pt-20 lg:grid-cols-[minmax(0,1.8fr)_minmax(260px,0.65fr)]"
    >
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.22em] text-signal-teal">
          {portfolio.candidate.role}
        </p>
        <p className="mt-4 flex flex-wrap items-center gap-2 text-sm uppercase tracking-[0.2em] text-slate-600">
          <MapPin size={16} aria-hidden="true" />
          {portfolio.candidate.location}
        </p>
        <h1 className="mt-7 max-w-5xl text-[clamp(2.65rem,4.4vw,4.75rem)] font-semibold leading-[0.98] tracking-normal text-ink-950 lg:whitespace-nowrap">
          {portfolio.candidate.name}
        </h1>
        <h2 className="mt-7 max-w-3xl text-2xl font-medium leading-tight text-ink-900 sm:text-3xl">
          Building practical AI systems with LLMs, RAG, and backend engineering.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          {portfolio.hero.summary}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="btn-primary" href="#projects">
            View Projects <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a className="btn-secondary" href={portfolio.links.github} target="_blank" rel="noreferrer">
            <Github size={16} aria-hidden="true" /> GitHub
          </a>
          <a className="btn-secondary" href="#contact">
            <Linkedin size={16} aria-hidden="true" /> Connect
          </a>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {portfolio.hero.focusChips.map((chip) => (
            <span key={chip} className="glass-chip">
              {chip}
            </span>
          ))}
        </div>
      </div>

      <aside className="relative mx-auto w-full max-w-[350px] lg:mt-12 lg:justify-self-end">
        <div className="absolute -inset-4 -z-10 rounded-[1.35rem] bg-gradient-to-br from-cyan-200/45 via-white/40 to-amber-100/45 blur-2xl" />
        <div className="panel overflow-hidden p-3">
          <Image
            src={portfolio.hero.portrait.src}
            alt={portfolio.hero.portrait.alt}
            width={portfolio.hero.portrait.width}
            height={portfolio.hero.portrait.height}
            priority
            sizes="(min-width: 1280px) 330px, (min-width: 1024px) 28vw, 82vw"
            className="aspect-[4/5] w-full rounded-[0.85rem] object-cover"
          />
        </div>
      </aside>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="section-shell scroll-mt-28 border-t border-slate-900/[0.06]">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-start">
        <SectionHeader
          eyebrow="About"
          title="Practical AI engineering with clear product intent"
          description="A focused profile for LLM systems, applied AI backends and project-oriented software work."
        />
        <div className="panel p-5 sm:p-7">
          <p className="text-base leading-8 text-slate-600">{portfolio.about}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {["LLM/RAG", "FastAPI", "AI Automation"].map((item) => (
              <div key={item} className="rounded-lg border border-slate-900/[0.08] bg-white/[0.62] p-4">
                <CheckCircle2 className="text-signal-teal" size={18} aria-hidden="true" />
                <p className="mt-3 text-sm font-semibold text-ink-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="section-shell scroll-mt-28 border-t border-slate-900/[0.06]">
      <SectionHeader
        eyebrow="Technical Skills"
        title="AI-focused stack with backend depth"
        description="Skill levels are intentionally centralized in the portfolio data model so future updates stay consistent across the interface."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {portfolio.skills.map((category) => (
          <article key={category.title} className="panel p-5 transition hover:-translate-y-1 hover:shadow-glow">
            <h3 className="text-lg font-semibold text-ink-950">{category.title}</h3>
            <div className="mt-5 space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="min-w-0 truncate text-slate-700">{skill.name}</span>
                    <span className="font-mono text-signal-teal">{skill.percentage}%</span>
                  </div>
                  <div
                    className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200/80"
                    role="progressbar"
                    aria-label={`${skill.name} proficiency`}
                    aria-valuenow={skill.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-signal-teal to-signal-cyan"
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="section-shell scroll-mt-28 border-t border-slate-900/[0.06]">
      <SectionHeader
        eyebrow="Projects"
        title="Featured AI engineering work"
        description="Three focused project cards are wired to internal detail routes while repository actions remain separate external links."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {portfolio.projects.map((project, index) => (
          <article key={project.slug} className="panel group flex min-h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-glow">
            <Link
              href={projectRoute(project.slug)}
              className="flex flex-1 flex-col outline-none focus-visible:ring-2 focus-visible:ring-signal-cyan"
            >
              <div className="border-b border-slate-900/[0.06] bg-gradient-to-br from-cyan-50/80 to-white/20 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-signal-cyan/25 bg-cyan-50 font-mono text-sm text-signal-teal">
                  0{index + 1}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-ink-950">{project.title}</h3>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-sm leading-7 text-slate-600">{project.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span key={technology} className="rounded-lg border border-slate-900/[0.08] bg-white/[0.7] px-2.5 py-1.5 text-xs text-slate-700">
                      {technology}
                    </span>
                  ))}
                </div>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-signal-teal">
                  View Details <ArrowRight size={15} aria-hidden="true" />
                </span>
              </div>
            </Link>
            <div className="border-t border-slate-900/[0.06] p-5">
              {project.githubUrl ? (
                <ProjectGithubLink href={project.githubUrl} />
              ) : (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-slate-900/[0.08] bg-white/50 px-5 py-3 text-sm font-semibold text-slate-400"
                >
                  <Github size={16} aria-hidden="true" />
                  GitHub unavailable
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="section-shell scroll-mt-28 border-t border-slate-900/[0.06]">
      <SectionHeader
        eyebrow="Experience"
        title="Structured exposure to AI-enabled engineering"
        description="A concise professional snapshot of applied AI-assisted development and collaborative workflow."
      />
      <article className="panel mt-10 grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.36fr_1fr]">
        <div>
          <BriefcaseBusiness className="text-signal-teal" size={24} aria-hidden="true" />
          <p className="mt-5 font-mono text-sm uppercase tracking-[0.18em] text-signal-warm">
            {portfolio.experience.period}
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-ink-950">{portfolio.experience.role}</h3>
          <p className="mt-2 text-lg text-slate-600">{portfolio.experience.company}</p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{portfolio.experience.description}</p>
        </div>
      </article>
    </section>
  );
}

function CertificationsSection() {
  return (
    <section id="certifications" className="section-shell scroll-mt-28 border-t border-slate-900/[0.06]">
      <SectionHeader
        eyebrow="Certifications"
        title="Validated foundations across AI, cloud and software work"
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {portfolio.certifications.map((certification) => (
          <article key={certification.title} className="panel flex min-h-full flex-col p-5">
            <Award className="text-signal-warm" size={24} aria-hidden="true" />
            <h3 className="mt-5 text-lg font-semibold text-ink-950">{certification.title}</h3>
            <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{certification.description}</p>
            {certification.certificateUrl ? (
              <a
                href={certification.certificateUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary mt-6 justify-center"
              >
                View Certificate <ExternalLink size={15} aria-hidden="true" />
              </a>
            ) : (
              <button
                type="button"
                disabled
                aria-disabled={!certification.certificateUrl}
                className="mt-6 inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-slate-900/[0.08] bg-white/50 px-4 py-3 text-sm font-semibold text-slate-400"
              >
                View Certificate
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function EducationSection() {
  const [degree, hsc] = portfolio.education;

  return (
    <section id="education" className="section-shell scroll-mt-28 border-t border-slate-900/[0.06]">
      <SectionHeader eyebrow="Education" title="Academic foundation" />
      <div className="panel mt-10 p-5 sm:p-7">
        <div className="grid gap-5 md:grid-cols-[0.34fr_1fr]">
          <div>
            <GraduationCap className="text-signal-teal" size={24} aria-hidden="true" />
            <p className="mt-4 font-mono text-sm uppercase tracking-[0.18em] text-slate-500">
              {degree.period}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-ink-950">{degree.degree}</h3>
            <p className="mt-2 text-slate-600">{degree.institution}</p>
            <p className="mt-2 font-mono text-sm text-signal-teal">{degree.detail}</p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{degree.description}</p>
          </div>
        </div>
        <div className="my-6 h-px bg-slate-900/[0.08]" />
        <div className="grid gap-5 md:grid-cols-[0.34fr_1fr]">
          <div>
            <BookOpen className="text-signal-warm" size={22} aria-hidden="true" />
            <p className="mt-4 font-mono text-sm uppercase tracking-[0.18em] text-slate-500">
              {hsc.period}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ink-950">{hsc.degree}</h3>
            <p className="mt-2 text-slate-600">{hsc.institution}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section-shell scroll-mt-28 border-t border-slate-900/[0.06]">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-signal-teal">Contact</p>
          <h2 className="mt-4 text-3xl font-semibold text-ink-950 sm:text-4xl">{portfolio.contact.heading}</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">{portfolio.contact.description}</p>
          <div className="mt-8 grid gap-3">
            <a className="contact-link" href={`mailto:${portfolio.candidate.email}`}>
              <Mail size={18} aria-hidden="true" />
              {portfolio.candidate.email}
            </a>
            <a className="contact-link" href={portfolio.links.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={18} aria-hidden="true" />
              LinkedIn
            </a>
            <a className="contact-link" href={portfolio.links.github} target="_blank" rel="noreferrer">
              <Github size={18} aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>
        <ContactForm recipientEmail={portfolio.candidate.email} />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-900/[0.06] px-5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {portfolio.candidate.name}</p>
        <div className="flex flex-wrap gap-4">
          <a className="transition hover:text-ink-950" href={portfolio.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="transition hover:text-ink-950" href={portfolio.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="transition hover:text-ink-950" href="#hero">
            Back to Top
          </a>
        </div>
      </div>
    </footer>
  );
}

function projectRoute(slug: string) {
  return `/projects/${slug}`;
}
