import { MessageCircle } from "lucide-react";
import SectionTitle from "./SectionTitle";
import type { Announcement } from "@/db/schema";

function timeAgo(date: Date) {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "az önce";
  if (diff < 3600) return `${Math.floor(diff / 60)} dk önce`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} sa önce`;
  return `${Math.floor(diff / 86400)} gün önce`;
}

const sourceStyle: Record<string, { label: string; cls: string }> = {
  whatsapp: { label: "WhatsApp", cls: "bg-green-500/15 text-green-400" },
  discord: { label: "Discord", cls: "bg-indigo-500/15 text-indigo-400" },
};

export default function AnnouncementsCard({
  items,
}: {
  items: Announcement[];
}) {
  if (items.length === 0) return null;
  return (
    <section>
      <SectionTitle hint="Duyurular">Son Paylaşımlar</SectionTitle>
      <div className="sheen relative space-y-1 overflow-hidden rounded-2xl card-surface p-2">
        {items.map((a) => {
          const s = sourceStyle[a.source] ?? {
            label: a.source,
            cls: "bg-ink-700 text-gold-300",
          };
          return (
            <div
              key={a.id}
              className="flex gap-3 rounded-xl p-2 transition-colors hover:bg-white/5"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-ink-700">
                <MessageCircle className="h-4 w-4 text-gold-400" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-zinc-100">
                    {a.title}
                  </p>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${s.cls}`}
                  >
                    {s.label}
                  </span>
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-zinc-400">
                  {a.body}
                </p>
                <p className="mt-1 text-[10px] text-zinc-600">
                  {timeAgo(a.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
