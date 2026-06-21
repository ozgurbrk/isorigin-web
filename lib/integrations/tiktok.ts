import { BROWSER_UA, compact, type ChannelStats } from "./types";

/**
 * TikTok — anahtarsız, ücretsiz yol.
 * Herkese açık profil verisini toplayan ücretsiz aggregator (tikwm) üzerinden
 * takipçi/takip/beğeni/avatar/bio ve son video kapaklarını çeker.
 * Not: TikTok "canlı mı" bilgisini bu yolla güvenilir vermez; isLive
 * dokunulmadan bırakılır (admin'den manuel ayarlanır).
 */
export async function fetchTikTok(
  handle: string,
): Promise<Partial<ChannelStats>> {
  const id = handle.replace(/^@/, "").trim();
  if (!id) return {};
  const out: Partial<ChannelStats> = {};
  const headers = { "User-Agent": BROWSER_UA };

  const r = await fetch(
    `https://www.tikwm.com/api/user/info?unique_id=${encodeURIComponent(id)}`,
    { headers, cache: "no-store" },
  );
  if (!r.ok) throw new Error(`TikTok HTTP ${r.status}`);
  const j = await r.json();
  if (j?.code !== 0 || !j.data) {
    throw new Error(`TikTok: kullanıcı bulunamadı (${id})`);
  }
  const u = j.data.user ?? {};
  const st = j.data.stats ?? {};
  const avatar = u.avatarLarger || u.avatarMedium || u.avatarThumb;
  if (avatar) out.avatarUrl = avatar;
  if (u.signature) out.bio = u.signature;
  if (st.followerCount != null) out.followers = compact(st.followerCount);
  if (st.followingCount != null) out.following = compact(st.followingCount);
  if (st.heartCount != null) out.likes = compact(st.heartCount);

  // Son videolar (kapak görselleri)
  try {
    const rp = await fetch(
      `https://www.tikwm.com/api/user/posts?unique_id=${encodeURIComponent(
        id,
      )}&count=6`,
      { headers, cache: "no-store" },
    );
    const jp = await rp.json();
    if (jp?.code === 0 && Array.isArray(jp.data?.videos)) {
      // Her küçük resim "kapakURL||videoURL" biçiminde saklanır
      const thumbs = jp.data.videos
        .map(
          (v: {
            cover?: string;
            origin_cover?: string;
            video_id?: string;
          }) => {
            const cover = v.cover || v.origin_cover;
            if (!cover) return null;
            const link = v.video_id
              ? `https://www.tiktok.com/@${id}/video/${v.video_id}`
              : "";
            return link ? `${cover}||${link}` : cover;
          },
        )
        .filter(Boolean)
        .slice(0, 6) as string[];
      if (thumbs.length) out.thumbnails = thumbs;
    }
  } catch {
    // videolar alınamadıysa profil verisiyle devam
  }

  return out;
}
