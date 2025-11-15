import Link from "next/link";
import { Logo } from "@/components/branding/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <Logo />
        <div className="text-sm text-muted-foreground">
          Contatti:{" "}
          <a
            href="mailto:info@tenantapp.it"
            className="font-medium text-primary"
          >
            info@tenantapp.it
          </a>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="#" className="hover:text-primary">
            Privacy
          </Link>
          <Link href="#" className="hover:text-primary">
            Termini
          </Link>
        </div>
      </div>
    </footer>
  );
}
