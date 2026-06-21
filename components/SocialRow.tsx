import { Icon } from "@/lib/icons";
import type { LinkCard } from "@/db/schema";

export default function SocialRow({ links }: { links: LinkCard[] }) {
  if (links.length === 0) return null;
  return (
    <div className="grid grid-cols-3 gap-3">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="sheen group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl card-surface py-4 hover:-translate-y-0.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-ink-700/70 transition-transform group-hover:scale-110">
            <Icon name={link.icon} className="h-5 w-5 text-gold-400" />
          </span>
          <span className="text-[11px] font-medium text-zinc-400 group-hover:text-zinc-200">
            {link.title}
          </span>
        </a>
      ))}
    </div>
  );
}
