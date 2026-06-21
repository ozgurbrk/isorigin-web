import { ChevronRight } from "lucide-react";
import { Icon } from "@/lib/icons";
import type { LinkCard as LinkCardType } from "@/db/schema";

const accentText: Record<string, string> = {
  red: "text-red-400",
  gold: "text-gold-400",
  indigo: "text-indigo-400",
  green: "text-green-400",
};

const accentGlow: Record<string, string> = {
  red: "from-red-500/20",
  gold: "from-gold-500/20",
  indigo: "from-indigo-500/20",
  green: "from-green-500/20",
};

export default function LinkCard({ card }: { card: LinkCardType }) {
  const accent = card.accent ?? "gold";
  return (
    <a
      href={card.url}
      target="_blank"
      rel="noopener noreferrer"
      className="sheen group relative flex items-center gap-4 overflow-hidden rounded-2xl card-surface px-4 py-4 hover:-translate-y-0.5"
    >
      <span
        className={`pointer-events-none absolute -left-6 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-gradient-to-r ${
          accentGlow[accent] ?? "from-gold-500/20"
        } to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
      />
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink-700/80">
        <Icon
          name={card.icon}
          className={`h-5 w-5 ${accentText[accent] ?? "text-gold-400"}`}
        />
      </span>

      <span className="relative min-w-0 flex-1">
        <span className="block truncate font-semibold text-zinc-100">
          {card.title}
        </span>
        {card.subtitle && (
          <span className="block truncate text-xs text-zinc-500">
            {card.subtitle}
          </span>
        )}
      </span>

      <ChevronRight className="relative h-5 w-5 text-zinc-600 transition-all group-hover:translate-x-1 group-hover:text-gold-400" />
    </a>
  );
}
