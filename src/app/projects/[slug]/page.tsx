import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { portfolio } from "@/data/portfolio";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return portfolio.projects.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolio.projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found"
    };
  }

  return {
    title: projectMetadataTitle(project.slug),
    description: project.summary
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolio.projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="section-shell grid min-h-screen gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)]">
      <section>
        <Link href="/#projects" className="btn-secondary w-fit">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Projects
        </Link>
        <p className="mt-10 font-mono text-sm uppercase tracking-[0.2em] text-signal-warm">
          {project.status}
        </p>
        <h1 className="mt-5 text-4xl font-semibold text-ink-950 sm:text-5xl">{project.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">{project.summary}</p>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">{project.details}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span key={technology} className="glass-chip">
              {technology}
            </span>
          ))}
        </div>
        <dl className="panel mt-8 grid gap-4 p-5 sm:grid-cols-3">
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Domain</dt>
            <dd className="mt-2 text-sm font-semibold text-ink-900">{project.domain}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Backend</dt>
            <dd className="mt-2 text-sm font-semibold text-ink-900">{project.backend ?? "Modeling workflow"}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Status</dt>
            <dd className="mt-2 text-sm font-semibold text-ink-900">{project.status}</dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          {project.githubUrl ? (
            <a className="btn-primary" href={project.githubUrl} target="_blank" rel="noreferrer">
              <Github size={16} aria-hidden="true" />
              GitHub Repository
            </a>
          ) : (
            <button type="button" disabled aria-disabled="true" className="btn-secondary cursor-not-allowed opacity-55">
              <Github size={16} aria-hidden="true" />
              GitHub Repository
            </button>
          )}
          {project.liveUrl ? (
            <a className="btn-secondary" href={project.liveUrl} target="_blank" rel="noreferrer">
              <ExternalLink size={16} aria-hidden="true" />
              Live Website
            </a>
          ) : (
            <button type="button" disabled aria-disabled="true" className="btn-secondary cursor-not-allowed opacity-55">
              <ExternalLink size={16} aria-hidden="true" />
              Live Website
            </button>
          )}
        </div>
      </section>
      <aside className="panel h-fit p-5">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-signal-cyan">Major Components</p>
        <div className="mt-5 space-y-3">
          {project.workflow.map((step) => (
            <div key={step} className="rounded-lg border border-slate-900/[0.08] bg-white/[0.66] p-4 text-sm font-medium text-slate-700">
              {step}
            </div>
          ))}
        </div>
      </aside>
    </main>
  );
}

function projectMetadataTitle(slug: string) {
  if (slug === "ai-personal-study-assistant") {
    return "AI Personal Study Assistant | Shri Harihara Suthan M";
  }

  if (slug === "tripzy-ai-trip-planner") {
    return "Tripzy – AI Trip Planner | Shri Harihara Suthan M";
  }

  if (slug === "forest-fire-prediction") {
    return "Forest Fire Prediction & Simulation | Shri Harihara Suthan M";
  }

  return "Project | Shri Harihara Suthan M";
}
