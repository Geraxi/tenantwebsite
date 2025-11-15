"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/branding/logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Funzionalità", href: "/features" },
  { label: "Prezzi", href: "/pricing" },
  { label: "Demo", href: "/demo" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const renderLinks = () => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition hover:text-primary",
            pathname === link.href
              ? "text-primary"
              : "text-muted-foreground",
          )}
          onClick={() => setOpen(false)}
        >
          {link.label}
        </Link>
      ))}
      <button
        className="cursor-not-allowed text-sm font-semibold text-muted-foreground opacity-70"
        disabled
        type="button"
      >
        Login
      </button>
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">{renderLinks()}</nav>
        <button
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Apri menu"
        >
          Menu
          <span className="text-lg">{open ? "−" : "+"}</span>
        </button>
      </div>
      {open && (
        <div className="border-t border-border/70 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">{renderLinks()}</div>
        </div>
      )}
    </header>
  );
}
