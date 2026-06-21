import { Icon } from "@/lib/icons";
import SectionTitle from "./SectionTitle";
import type { LiveChannel } from "@/db/schema";

export default function LiveSection({ channels }: { channels: LiveChannel[] }) {
  if (channels.length === 0) return null;
  const anyLive = channels.some((c) => c.isLive);

  return (
    <section>
      <SectionTitle hint={anyLive ? "Şu an canlı" : "Çevrimdışı"}>
        Canlı Yayın
      </SectionTitle>
      <div className="grid grid-cols-3 gap-3">
        {channels.map((ch) => (
          <a
            key={ch.id}
            href={ch.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex flex-col items-center gap-2 rounded-xl card-surface py-4 transition-all hover:-translate-y-0.5"
          >
            <span className="absolute right-2 top-2 flex items-center gap-1">
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  ch.isLive
                    ? "bg-red-500 animate-pulseGlow"
                    : "bg-zinc-600"
                }`}
              />
            </span>
            <Icon name={ch.platform} className="h-6 w-6 text-gold-400" />
            <span className="text-xs font-medium text-zinc-400">
              {ch.label}
            </span>
            <span
              className={`text-[10px] font-bold uppercase ${
                ch.isLive ? "text-red-400" : "text-zinc-600"
              }`}
            >
              {ch.isLive ? "CANLI" : "Offline"}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
