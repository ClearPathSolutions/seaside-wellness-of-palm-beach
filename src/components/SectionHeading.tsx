import { cn } from "@/lib/cn";
import Reveal from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  className?: string;
  tone?: "dark" | "light";
};

export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  className,
  tone = "dark",
}: Props) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow mb-3", tone === "light" && "text-gold-300")}>{eyebrow}</p>
      )}
      <h2
        className={cn(
          "text-3xl font-medium sm:text-4xl lg:text-[2.75rem]",
          tone === "light" ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {text && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            tone === "light" ? "text-cream/80" : "text-ink-600"
          )}
        >
          {text}
        </p>
      )}
    </Reveal>
  );
}
