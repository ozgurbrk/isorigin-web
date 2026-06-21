import type { ChannelStats } from "./types";

/**
 * Twitch — resmi Helix API (uygulama erişim jetonu / client credentials).
 * Avatar, bio, canlı durum ve son video kapaklarını verir.
 * Not: Takipçi SAYISI artık yalnızca yayıncının kendi OAuth jetonuyla
 * alınabiliyor; uygulama jetonuyla alınamadığı için DB'deki değer korunur.
 * Gerekli env: TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET
 */

let tokenCache: { token: string; exp: number } | null = null;

async function getAppToken(): Promise<string> {
  const id = process.env.TWITCH_CLIENT_ID;
  const secret = process.env.TWITCH_CLIENT_SECRET;
  if (!id || !secret) throw new Error("Twitch anahtarları (env) tanımlı değil");
  if (tokenCache && tokenCache.exp > Date.now()) return tokenCache.token;

  const r = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${id}&client_secret=${secret}&grant_type=client_credentials`,
    { method: "POST", cache: "no-store" },
  );
  const j = await r.json();
  if (!j.access_token) throw new Error("Twitch token alınamadı");
  tokenCache = {
    token: j.access_token,
    exp: Date.now() + (j.expires_in - 60) * 1000,
  };
  return tokenCache.token;
}

function fillThumb(url: string): string {
  return url
    .replace(/%?\{width\}/g, "440")
    .replace(/%?\{height\}/g, "248");
}

export async function fetchTwitch(
  handle: string,
): Promise<Partial<ChannelStats>> {
  const login = handle.replace(/^@/, "").trim().toLowerCase();
  if (!login) return {};
  const id = process.env.TWITCH_CLIENT_ID!;
  const token = await getAppToken();
  const h = { "Client-Id": id, Authorization: `Bearer ${token}` };
  const out: Partial<ChannelStats> = {};

  const ur = await fetch(`https://api.twitch.tv/helix/users?login=${login}`, {
    headers: h,
    cache: "no-store",
  });
  const uj = await ur.json();
  const user = uj.data?.[0];
  if (!user) throw new Error(`Twitch: kullanıcı bulunamadı (${login})`);
  if (user.profile_image_url) out.avatarUrl = user.profile_image_url;
  if (user.description) out.bio = user.description;

  // Canlı durum
  const sr = await fetch(
    `https://api.twitch.tv/helix/streams?user_login=${login}`,
    { headers: h, cache: "no-store" },
  );
  const sj = await sr.json();
  const stream = sj.data?.[0];
  out.isLive = !!stream;

  const thumbs: string[] = [];
  if (stream?.thumbnail_url) thumbs.push(fillThumb(stream.thumbnail_url));

  // Son VOD kapakları
  const vr = await fetch(
    `https://api.twitch.tv/helix/videos?user_id=${user.id}&first=6&type=archive`,
    { headers: h, cache: "no-store" },
  );
  const vj = await vr.json();
  if (Array.isArray(vj.data)) {
    for (const v of vj.data) {
      if (v.thumbnail_url) thumbs.push(fillThumb(v.thumbnail_url));
    }
  }
  if (thumbs.length) out.thumbnails = thumbs.slice(0, 6);

  return out;
}
