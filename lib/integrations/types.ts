/** Tüm platformlardan dönen normalize edilmiş yayın verisi. */
export type ChannelStats = {
  handle: string;
  avatarUrl: string;
  bio: string;
  following: string;
  followers: string;
  likes: string;
  isLive: boolean;
  thumbnails: string[];
};

/** Sayıyı kısa biçime çevirir: 11100 -> "11.1K" */
export function compact(n: number | string): string {
  const num = typeof n === "string" ? Number(n) : n;
  if (typeof num !== "number" || !Number.isFinite(num)) return String(n);
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
}

export const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
