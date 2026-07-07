import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold-700 text-white shadow-[0_8px_24px_rgba(53,48,45,0.28)] hover:bg-gold-800 hover:shadow-[0_10px_30px_rgba(53,48,45,0.35)] hover:-translate-y-0.5",
  secondary:
    "bg-ocean-500 text-white hover:bg-ocean-600 hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(55,92,96,0.28)]",
  ghost:
    "bg-transparent text-ink border border-ink-300 hover:border-gold-500 hover:text-gold-700 hover:bg-gold-50",
  onDark:
    "bg-white/10 text-white border border-white/25 backdrop-blur-sm hover:bg-white hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "text-sm px-6 py-3",
  lg: "text-base px-8 py-4",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">;

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ButtonLinkProps) {
  const external = /^https?:|^tel:|^mailto:/.test(href);
  const classes = cn(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
