import Link from "next/link";
import { Clapperboard, Megaphone, Radio, Link as LinkIcon } from "lucide-react";
import { db } from "@/db";
import {
  announcements,
  linkCards,
  liveChannels,
  videos,
} from "@/db/schema";
import { PageTitle } from "./ui";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const [vids, news, live, links] = await Promise.all([
    db.select().from(videos),
    db.select().from(announcements),
    db.select().from(liveChannels),
    db.select().from(linkCards),
  ]);

  const cards = [
    { label: "Video", count: vids.length, href: "/adminisorigin8789/videolar", icon: Clapperboard },
    { label: "Duyuru", count: news.length, href: "/adminisorigin8789/duyurular", icon: Megaphone },
    { label: "Canlı Kanal", count: live.length, href: "/adminisorigin8789/canli-yayin", icon: Radio },
    { label: "Link", count: links.length, href: "/adminisorigin8789/linkler", icon: LinkIcon },
  ];

  return (
    <div>
      <PageTitle title="Dashboard" desc="isorigin yönetim paneline hoş geldin." />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cards.map(({ label, count, href, icon: Icon }) => (
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
  );
}
