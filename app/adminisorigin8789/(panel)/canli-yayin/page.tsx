import { asc } from "drizzle-orm";
import { RefreshCw } from "lucide-react";
import { db } from "@/db";
import { liveChannels } from "@/db/schema";
import {
  refreshLiveStats,
  toggleLive,
  updateLiveChannel,
} from "@/app/adminisorigin8789/actions";
import { PageTitle, Panel, inputCls, btnPrimary } from "../ui";

export const dynamic = "force-dynamic";

export default async function CanliYayinAdmin() {
  const live = await db
    .select()
    .from(liveChannels)
    .orderBy(asc(liveChannels.sortOrder));

  return (
    <div className="max-w-3xl space-y-6">
      <PageTitle
        title="CanlÄ± YayÄ±n"
        desc="Kanal bilgileri ve canlÄ± durumu. Veriler API'den Ã§ekilebilir."
      />

      <form action={refreshLiveStats}>
        <button className={btnPrimary}>
          <RefreshCw size={13} /> Verileri API&apos;den yenile
        </button>
      </form>

      <div className="space-y-4">
        {live.map((c) => (
          <Panel key={c.id} title={`${c.label} (@${c.handle || "â€”"})`}>
            <form action={toggleLive.bind(null, c.id)}>
              <button
                className={`rounded-md px-3 py-1.5 text-xs font-bold ${
                  c.isLive
                    ? "bg-red-500/15 text-red-400"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {c.isLive ? "â— CanlÄ±" : "â—‹ Ã‡evrimdÄ±ÅŸÄ±"} â€” deÄŸiÅŸtir
              </button>
            </form>

            <form action={updateLiveChannel.bind(null, c.id)} className="space-y-2">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <input name="label" defaultValue={c.label} className={inputCls} placeholder="Etiket" />
                <input name="handle" defaultValue={c.handle} className={inputCls} placeholder="kullanÄ±cÄ± adÄ±" />
              </div>
              <input name="url" defaultValue={c.url} className={inputCls} placeholder="YayÄ±n linki" />
              <input name="avatarUrl" defaultValue={c.avatarUrl} className={inputCls} placeholder="Avatar URL" />
              <div className="grid grid-cols-3 gap-2">
                <input name="following" defaultValue={c.following} className={inputCls} placeholder="Takip" />
                <input name="followers" defaultValue={c.followers} className={inputCls} placeholder="TakipÃ§i" />
                <input name="likes" defaultValue={c.likes} className={inputCls} placeholder="BeÄŸeni" />
              </div>
              <textarea name="bio" defaultValue={c.bio} rows={2} className={`${inputCls} resize-none`} placeholder="Bio" />
              <textarea
                name="thumbnails"
                defaultValue={c.thumbnails}
                rows={3}
                className={`${inputCls} resize-none`}
                placeholder="KÃ¼Ã§Ã¼k resim URL'leri (her satÄ±ra bir tane)"
              />
              <button className={btnPrimary}>Kaydet</button>
            </form>
          </Panel>
        ))}
      </div>
    </div>
  );
}
