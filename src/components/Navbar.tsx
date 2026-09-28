"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { NavItem } from "@/data/portfolio";
import { cn } from "@/lib/cn";

type NavbarProps = {
  items: readonly NavItem[];
  name: string;
};

export function Navbar({ items, name }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? "#hero");

  useEffect(() => {
    const sections = items
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.2, 0.45, 0.7] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-3 z-50 px-3 sm:px-5">
      <nav
        aria-label="Primary navigation"
        className="mx-auto max-w-6xl rounded-card border border-slate-900/[0.08] bg-white/[0.76] shadow-panel backdrop-blur-xl"
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-5 lg:px-6">
          <a
            href="#hero"
            className="max-w-[14rem] truncate font-mono text-xs font-semibold uppercase tracking-[0.16em] text-signal-teal outline-none transition hover:text-signal-cyan focus-visible:ring-2 focus-visible:ring-signal-cyan sm:max-w-none"
            onClick={closeMenu}
          >
            {name}
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={activeHref === item.href ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium text-slate-600 outline-none transition hover:bg-white/80 hover:text-ink-950 focus-visible:ring-2 focus-visible:ring-signal-cyan",
                  activeHref === item.href && "bg-cyan-50 text-signal-teal"
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-900/[0.10] bg-white/60 text-ink-900 outline-none transition hover:border-signal-cyan focus-visible:ring-2 focus-visible:ring-signal-cyan md:hidden"
            aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={cn(
            "grid border-t border-slate-900/[0.08] transition-[grid-template-rows] duration-200 md:hidden",
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="grid gap-1 p-3">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={activeHref === item.href ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-3 text-sm font-medium text-slate-600 outline-none transition hover:bg-white/80 hover:text-ink-950 focus-visible:ring-2 focus-visible:ring-signal-cyan",
                    activeHref === item.href && "bg-cyan-50 text-signal-teal"
                  )}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
