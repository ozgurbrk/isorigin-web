import { Icon } from "@/lib/icons";
import PhoneFrame from "./PhoneFrame";
import type { Announcement } from "@/db/schema";

function timeAgo(date: Date) {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "Şimdi";
  if (diff < 3600) return `${Math.floor(diff / 60)} dk önce`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} sa önce`;
  return `${Math.floor(diff / 86400)} gün önce`;
}

type Accent = "whatsapp" | "discord";

const accents: Record<
  Accent,
  { ring: string; dotBg: string; btn: string; chip: string }
> = {
  whatsapp: {
    ring: "ring-green-500/40",
    dotBg: "bg-green-500/20 text-green-400",
    btn: "bg-gradient-to-b from-green-500 to-green-600",
    chip: "text-green-400",
  },
  discord: {
    ring: "ring-indigo-500/40",
    dotBg: "bg-indigo-500/20 text-indigo-400",
    btn: "bg-gradient-to-b from-indigo-500 to-indigo-600",
    chip: "text-indigo-400",
  },
};

export default function AnnouncementPhone({
  source,
  title,
  items,
  joinUrl,
  joinLabel,
}: {
  source: Accent;
  title: string;
  items: Announcement[];
  joinUrl: string;
  joinLabel: string;
}) {
  const a = accents[source];
  const icon = source === "whatsapp" ? "whatsapp" : "discord";

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col">
      {/* Durum çubuğu */}
      <div className="flex items-center justify-between px-4 pt-3 text-[10px] font-medium text-zinc-500">
        <span>{title}</span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2.5 rounded-[2px] bg-zinc-600" />
          <span className="inline-block h-2 w-3 rounded-[2px] border border-zinc-600" />
        </span>
      </div>

      {/* Kanal başlığı */}
      <div className="flex items-center gap-2.5 px-3 pt-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-2 ${a.ring} ${a.dotBg}`}
        >
          <Icon name={icon} className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 truncate text-sm font-bold text-white">
            {title}
            <span className="flex items-center gap-1 text-[10px] font-medium text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              çevrimiçi
            </span>
          </p>
          <p className="text-[10px] text-zinc-500">duyurular</p>
        </div>
      </div>

      <div className="mx-3 mt-3 border-t border-white/5" />

      {/* Duyuru listesi (telefon içinde kayar) */}
      <div className="scroll-thin flex-1 space-y-2 overflow-y-auto px-3 py-3">
        {items.length === 0 ? (
          <p className="py-8 text-center text-xs text-zinc-600">
            Henüz duyuru yok.
          </p>
        ) : (
          items.map((it) => (
            <div
              key={it.id}
              className="rounded-xl border border-white/5 bg-ink-800/60 p-3 transition-colors hover:bg-ink-700/50"
            >
              <p className="text-sm font-semibold leading-snug text-zinc-100">
                {it.title}
              </p>
              {it.body && (
                <p className={`mt-1 text-xs font-medium ${a.chip}`}>
                  {it.body}
                </p>
              )}
              <p className="mt-1.5 text-[10px] text-zinc-600">
                {timeAgo(it.createdAt)}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Katıl butonu (altta sabit) */}
      <div className="shrink-0 px-3 pb-3 pt-1">
        <a
          href={joinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-all hover:brightness-110 ${a.btn}`}
        >
          <Icon name={icon} className="h-4 w-4" />
          {joinLabel}
        </a>
      </div>
      </div>
    </PhoneFrame>
  );
}
