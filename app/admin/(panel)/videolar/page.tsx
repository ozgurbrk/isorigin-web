import { asc } from "drizzle-orm";
import { Plus, Trash2, Star, Tag } from "lucide-react";
import { db } from "@/db";
import { videoCategories, videos } from "@/db/schema";
import { ytThumb } from "@/lib/youtube";
import {
  addVideo,
  addVideoCategory,
  deleteVideo,
  deleteVideoCategory,
  toggleVideoFeatured,
} from "@/app/admin/actions";
import { PageTitle, Panel, inputCls, btnPrimary } from "../ui";

export const dynamic = "force-dynamic";

export default async function VideolarAdmin() {
  const [cats, vids] = await Promise.all([
    db.select().from(videoCategories).orderBy(asc(videoCategories.sortOrder)),
    db.select().from(videos).orderBy(asc(videos.sortOrder)),
  ]);

  return (
    <div className="max-w-3xl space-y-6">
      <PageTitle title="Videolar" desc="YouTube videoları ve kategoriler." />

      {/* Kategoriler */}
      <Panel>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
          <Tag size={12} /> Kategoriler
        </div>
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs font-semibold text-zinc-300"
            >
              {c.name}
              <form action={deleteVideoCategory.bind(null, c.id)}>
                <button className="ml-1 text-zinc-600 transition-colors hover:text-red-400">
                  ✕
                </button>
              </form>
            </div>
          ))}
          {cats.length === 0 && (
            <span className="text-xs text-zinc-600">Henüz kategori yok</span>
          )}
        </div>
        <form action={addVideoCategory} className="flex gap-2">
          <input
            name="name"
            className={inputCls}
            placeholder="Yeni kategori adı"
          />
          <button className={btnPrimary}>
            <Plus size={13} /> Ekle
          </button>
        </form>
      </Panel>

      {/* Yeni video */}
      <Panel title="Yeni Video">
        <form action={addVideo} className="space-y-3">
          <input
            name="youtube"
            className={inputCls}
            placeholder="YouTube linki veya video ID (örn: https://youtu.be/xxxx)"
          />
          <input name="title" className={inputCls} placeholder="Başlık" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-zinc-500">
                Kategori
              </label>
              <select name="category" className={inputCls} defaultValue="">
                <option value="">— Kategorisiz —</option>
                {cats.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <label className="flex items-end gap-2 pb-2 text-sm text-zinc-400">
              <input
                type="checkbox"
                name="featured"
                className="accent-gold-400"
              />
              Öne çıkan
            </label>
          </div>
          <button className={btnPrimary}>
            <Plus size={13} /> Video Ekle
          </button>
        </form>
      </Panel>

      {/* Video listesi */}
      <div className="space-y-2">
        {vids.map((v) => (
          <div
            key={v.id}
            className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/30 p-3"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ytThumb(v.youtubeId)}
              alt=""
              className="h-12 w-20 shrink-0 rounded object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="mb-0.5 flex flex-wrap items-center gap-2">
                {v.featured && <Star size={11} className="text-gold-400" />}
                {v.category && (
                  <span className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-[10px] font-bold text-zinc-400">
                    {v.category}
                  </span>
                )}
                <span className="text-[10px] text-green-400">▶ YouTube</span>
              </div>
              <div className="line-clamp-1 text-sm font-semibold text-zinc-200">
                {v.title}
              </div>
            </div>
            <form action={toggleVideoFeatured.bind(null, v.id)}>
              <button
                className="p-1.5 text-zinc-600 transition-colors hover:text-gold-400"
                title="Öne çıkar"
              >
                <Star size={14} />
              </button>
            </form>
            <form action={deleteVideo.bind(null, v.id)}>
              <button className="p-1.5 text-zinc-600 transition-colors hover:text-red-400">
                <Trash2 size={14} />
              </button>
            </form>
          </div>
        ))}
        {vids.length === 0 && (
          <div className="py-8 text-center text-sm text-zinc-600">
            Henüz video yok.
          </div>
        )}
      </div>
    </div>
  );
}
