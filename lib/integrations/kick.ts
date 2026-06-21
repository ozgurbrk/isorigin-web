import { BROWSER_UA, compact, type ChannelStats } from "./types";

/**
 * Kick — anahtarsız public API (v2 channels endpoint).
 * Takipçi sayısı, canlı durum, avatar, bio ve son yayın kapaklarını verir.
 * Not: Kick Cloudflare arkasında; bazı sunucu IP'lerinden 403 dönebilir.
 */
export async function fetchKick(
  handle: string,
): Promise<Partial<ChannelStats>> {
  const slug = handle.replace(/^@/, "").trim().toLowerCase();
  if (!slug) return {};
  const out: Partial<ChannelStats> = {};

  const r = await fetch(
    `https://kick.com/api/v2/channels/${encodeURIComponent(slug)}`,
    {
      headers: { "User-Agent": BROWSER_UA, Accept: "application/json" },
      cache: "no-store",
    },
  );
  if (!r.ok) throw new Error(`Kick HTTP ${r.status}`);
  const j = await r.json();

  const u = j.user ?? {};
  if (u.profile_pic) out.avatarUrl = u.profile_pic;
  if (u.bio) out.bio = u.bio;
  if (j.followers_count != null) out.followers = compact(j.followers_count);

  out.isLive = !!(j.livestream && j.livestream.is_live);

  const thumbs: string[] = [];
  const liveThumb = j.livestream?.thumbnail?.url || j.livestream?.thumbnail?.src;
  if (liveThumb) thumbs.push(liveThumb);
  if (Array.isArray(j.previous_livestreams)) {
    for (const p of j.previous_livestreams) {
      const t = p?.thumbnail?.src || p?.thumbnail?.url;
      if (t) thumbs.push(t);
    }
  }
  if (thumbs.length) out.thumbnails = thumbs.slice(0, 6);

  return out;
}
