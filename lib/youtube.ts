/** YouTube linkinden veya doğrudan id'den 11 karakterlik video id'sini çıkarır. */
export function parseYouTubeId(input: string): string | null {
  if (!input) return null;
  const s = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
  try {
    const u = new URL(s);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.slice(1, 12);
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }
    const v = u.searchParams.get("v");
    if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
    const m = u.pathname.match(/\/(shorts|embed|live)\/([a-zA-Z0-9_-]{11})/);
    if (m) return m[2];
  } catch {
    // URL değilse aşağıda regex denenir
  }
  const m = s.match(/[a-zA-Z0-9_-]{11}/);
  return m ? m[0] : null;
}

export function ytThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function ytWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

/** YouTube oEmbed ile video başlığını çeker (anahtar gerekmez). */
export async function fetchYouTubeTitle(id: string): Promise<string | null> {
  try {
    const r = await fetch(
      `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(
        ytWatchUrl(id),
      )}`,
      { cache: "no-store" },
    );
    if (!r.ok) return null;
    const j = await r.json();
    return typeof j.title === "string" ? j.title : null;
  } catch {
    return null;
  }
}
