import { asc } from "drizzle-orm";
import { Plus, Trash2 } from "lucide-react";
import { db } from "@/db";
import { announcements } from "@/db/schema";
import { addAnnouncement, deleteAnnouncement } from "@/app/adminisorigin8789/actions";
import { PageTitle, Panel, inputCls, btnPrimary } from "../ui";

export const dynamic = "force-dynamic";

export default async function DuyurularAdmin() {
  const news = await db
    .select()
    .from(announcements)
    .orderBy(asc(announcements.sortOrder));

  return (
    <div className="max-w-3xl space-y-6">
      <PageTitle title="Duyurular" desc="WhatsApp ve Discord duyuruları." />

      <Panel title="Yeni Duyuru">
        <form action={addAnnouncement} className="space-y-3">
          <div className="flex gap-2">
            <input name="title" className={inputCls} placeholder="Başlık" />
            <select name="source" className={`${inputCls} w-40`} defaultValue="whatsapp">
              <option value="whatsapp">WhatsApp</option>
              <option value="discord">Discord</option>
            </select>
          </div>
          <textarea
            name="body"
            rows={2}
            className={`${inputCls} resize-none`}
            placeholder="İçerik"
          />
          <button className={btnPrimary}>
            <Plus size={13} /> Duyuru Ekle
          </button>
        </form>
      </Panel>

      <div className="space-y-2">
        {news.map((a) => (
          <div
            key={a.id}
            className="flex items-start justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-900/30 p-3"
          >
            <div className="min-w-0">
              <div className="mb-0.5 flex items-center gap-2">
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                    a.source === "discord"
                      ? "bg-indigo-500/15 text-indigo-400"
                      : "bg-green-500/15 text-green-400"
                  }`}
                >
                  {a.source === "discord" ? "Discord" : "WhatsApp"}
                </span>
                <span className="text-sm font-semibold text-zinc-200">
                  {a.title}
                </span>
              </div>
              <p className="text-xs text-zinc-500">{a.body}</p>
            </div>
            <form action={deleteAnnouncement.bind(null, a.id)}>
              <button className="p-1.5 text-zinc-600 transition-colors hover:text-red-400">
                <Trash2 size={14} />
              </button>
            </form>
          </div>
        ))}
        {news.length === 0 && (
          <div className="py-8 text-center text-sm text-zinc-600">
            Henüz duyuru yok.
          </div>
        )}
      </div>
    </div>
  );
}
