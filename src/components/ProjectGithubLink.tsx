"use client";

import { Github } from "lucide-react";

type ProjectGithubLinkProps = {
  href: string;
};

export function ProjectGithubLink({ href }: ProjectGithubLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={(event) => event.stopPropagation()}
      className="btn-secondary w-full justify-center"
    >
      <Github size={16} aria-hidden="true" />
      GitHub
    </a>
  );
}
