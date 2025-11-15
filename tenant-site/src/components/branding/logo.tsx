import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  withText?: boolean;
  className?: string;
};

export function Logo({ withText = true, className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-3 rounded-full px-2 py-1 transition hover:bg-white/60",
        className,
      )}
      aria-label="Vai alla home di Tenant"
    >
      <Image
        src="/logo.png"
        alt="Tenant logo"
        width={120}
        height={48}
        priority
        className="h-10 w-auto"
      />
      {withText && (
        <span className="text-lg font-semibold tracking-tight text-[#1A1A1A]">
          Tenant
        </span>
      )}
    </Link>
  );
}
