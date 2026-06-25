import Link from "next/link";
import { gte, sql } from "drizzle-orm";
import {
  Clapperboard,
  Megaphone,
  Radio,
  Link as LinkIcon,
  Eye,
  CalendarDays,
  Users,
} from "lucide-react";
import { db } from "@/db";
import {
  announcements,
  linkCards,
  liveChannels,
  pageViews,
  videos,
} from "@/db/schema";
import { PageTitle } from "./ui";

export const dynamic = "force-dynamic";

const DAY = 86400000;
const DAY_LABELS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

export default async function Dashboard() {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const weekStart = new Date(todayStart.getTime() - 6 * DAY);

  const [vids, news, live, links, totalRow, todayRow, uniqRow, weekRows] =
    await Promise.all([
      db.select().from(videos),
      db.select().from(announcements),
      db.select().from(liveChannels),
      db.select().from(linkCards),
      db.select({ n: sql<number>`count(*)` }).from(pageViews),
      db
        .select({ n: sql<number>`count(*)` })
        .from(pageViews)
        .where(gte(pageViews.createdAt, todayStart)),
      db
        .select({ n: sql<number>`count(distinct ${pageViews.visitorId})` })
        .from(pageViews),
      db
        .select({ createdAt: pageViews.createdAt, referrer: pageViews.referrer })
        .from(pageViews)
        .where(gte(pageViews.createdAt, weekStart)),
    ]);

  const totalViews = totalRow[0]?.n ?? 0;
  const todayViews = todayRow[0]?.n ?? 0;
  const uniqueVisitors = uniqRow[0]?.n ?? 0;

  // Son 7 gün günlük kovalar
  const buckets = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart.getTime() + i * DAY);
    return { date: d, count: 0, label: DAY_LABELS[(d.getDay() + 6) % 7] };
  });
  for (const r of weekRows) {
    const idx = Math.floor((r.createdAt.getTime() - weekStart.getTime()) / DAY);
    if (idx >= 0 && idx < 7) buckets[idx].count++;
  }
  const maxCount = Math.max(1, ...buckets.map((b) => b.count));

  // Top kaynaklar (referrer)
  const refCounts = new Map<string, number>();
  for (const r of weekRows) {
    if (!r.referrer) continue;
    let host = r.referrer;
    try {
      host = new URL(r.referrer).hostname.replace(/^www\./, "");
    } catch {}
    if (!host || host.includes("isorigin")) continue;
    refCounts.set(host, (refCounts.get(host) ?? 0) + 1);
  }
  const topRefs = [...refCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const contentCards = [
    { label: "Video", count: vids.length, href: "/adminisorigin8789/videolar", icon: Clapperboard },
    { label: "Duyuru", count: news.length, href: "/adminisorigin8789/duyurular", icon: Megaphone },
    { label: "Canlı Kanal", count: live.length, href: "/adminisorigin8789/canli-yayin", icon: Radio },
    { label: "Link", count: links.length, href: "/adminisorigin8789/linkler", icon: LinkIcon },
  ];

  const statCards = [
    { label: "Toplam Ziyaret", value: totalViews, icon: Eye },
    { label: "Bugün", value: todayViews, icon: CalendarDays },
    { label: "Tekil Ziyaretçi", value: uniqueVisitors, icon: Users },
  ];

  return (
    <div className="space-y-6">
      <PageTitle title="Dashboard" desc="isorigin yönetim paneline hoş geldin." />

      {/* Ziyaret istatistikleri */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {statCards.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              <Icon size={13} className="text-gold-400" /> {label}
            </div>
            <p className="mt-2 text-3xl font-bold text-zinc-100">
              {value.toLocaleString("tr-TR")}
            </p>
          </div>
        ))}
      </div>

      {/* Son 7 gün grafiği + kaynaklar */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 lg:col-span-2">
          <h2 className="mb-4 text-sm font-bold text-zinc-300">
            Son 7 Gün Ziyaret
          </h2>
          <div className="flex h-40 items-end justify-between gap-2">
            {buckets.map((b, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="text-[10px] font-medium text-zinc-500">
                  {b.count}
                </span>
                <div
                  className="brand-gradient w-full rounded-t-md transition-all"
                  style={{
                    height: `${Math.max(4, (b.count / maxCount) * 120)}px`,
                  }}
                />
                <span className="text-[10px] text-zinc-600">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
          <h2 className="mb-4 text-sm font-bold text-zinc-300">
            Kaynaklar (7 gün)
          </h2>
          {topRefs.length === 0 ? (
            <p className="text-xs text-zinc-600">
              Henüz dış kaynak verisi yok.
            </p>
          ) : (
            <ul className="space-y-2">
              {topRefs.map(([host, n]) => (
                <li
                  key={host}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="truncate text-zinc-300">{host}</span>
                  <span className="ml-2 shrink-0 rounded bg-zinc-800 px-2 py-0.5 text-xs font-bold text-gold-300">
                    {n}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* İçerik sayıları */}
      <div>
        <h2 className="mb-2 text-sm font-bold text-zinc-300">İçerik</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {contentCards.map(({ label, count, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-gold-400/30"
            >
              <Icon size={18} className="text-gold-400" />
              <p className="mt-3 text-2xl font-bold text-zinc-100">{count}</p>
              <p className="text-xs text-zinc-500">{label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
