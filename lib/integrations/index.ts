import { eq } from "drizzle-orm";
import { db } from "@/db";
import { liveChannels } from "@/db/schema";
import { fetchTikTok } from "./tiktok";
import { fetchKick } from "./kick";
import { fetchTwitch } from "./twitch";
import type { ChannelStats } from "./types";

export type RefreshResult = {
  id: number;
  platform: string;
  handle: string;
  ok: boolean;
  fields?: string[];
  error?: string;
};

async function fetchByPlatform(
  platform: string,
  handle: string,
): Promise<Partial<ChannelStats>> {
  switch (platform.toLowerCase()) {
    case "tiktok":
      return fetchTikTok(handle);
    case "kick":
      return fetchKick(handle);
    case "twitch":
      return fetchTwitch(handle);
    default:
      throw new Error(`Bilinmeyen platform: ${platform}`);
  }
}

/**
 * Tüm yayın kanallarını sırayla günceller. Her kanal için API'den dönen
 * yalnızca dolu alanlar DB'ye yazılır (boş gelen alanlar son değerini korur).
 * Bir kanal hata verirse diğerleri etkilenmez.
 */
export async function refreshAllChannels(): Promise<RefreshResult[]> {
  const channels = await db.select().from(liveChannels);
  const results: RefreshResult[] = [];

  for (const c of channels) {
    if (!c.handle) {
      results.push({
        id: c.id,
        platform: c.platform,
        handle: "",
        ok: false,
        error: "kullanıcı adı (handle) boş",
      });
      continue;
    }
    try {
      const s = await fetchByPlatform(c.platform, c.handle);
      const upd: Partial<typeof liveChannels.$inferInsert> = {};
      if (s.avatarUrl) upd.avatarUrl = s.avatarUrl;
      if (s.bio) upd.bio = s.bio;
      if (s.following) upd.following = s.following;
      if (s.followers) upd.followers = s.followers;
      if (s.likes) upd.likes = s.likes;
      if (typeof s.isLive === "boolean") upd.isLive = s.isLive;
      if (s.thumbnails && s.thumbnails.length)
        upd.thumbnails = s.thumbnails.join("\n");

      if (Object.keys(upd).length) {
        await db.update(liveChannels).set(upd).where(eq(liveChannels.id, c.id));
      }
      results.push({
        id: c.id,
        platform: c.platform,
        handle: c.handle,
        ok: true,
        fields: Object.keys(upd),
      });
    } catch (e) {
      results.push({
        id: c.id,
        platform: c.platform,
        handle: c.handle,
        ok: false,
        error: e instanceof Error ? e.message : String(e),
      });
    }
  }

  return results;
}
