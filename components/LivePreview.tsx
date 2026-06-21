"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/lib/icons";
import PhoneFrame from "./PhoneFrame";
import type { LiveChannel } from "@/db/schema";

/** Canlı yayın için gömülü oynatıcı URL'si (Twitch/Kick). TikTok embed desteklemez. */
function buildEmbedUrl(ch: LiveChannel, host: string): string | null {
  if (!ch.isLive || !host) return null;
  const slug = ch.handle.replace(/^@/, "").trim();
  if (!slug) return null;
  const platform = ch.platform.toLowerCase();
  if (platform === "twitch") {
    return `https://player.twitch.tv/?channel=${encodeURIComponent(
      slug,
    )}&parent=${host}&muted=true&autoplay=true`;
  }
  if (platform === "kick") {
    return `https://player.kick.com/${encodeURIComponent(
      slug,
    )}?autoplay=true&muted=true`;
  }
  return null;
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-sm font-bold leading-none text-white">{value}</p>
      <p className="mt-1 text-[10px] text-zinc-400">{label}</p>
    </div>
  );
}

export default function LivePreview({ channels }: { channels: LiveChannel[] }) {
  const [active, setActive] = useState(0);
  const [host, setHost] = useState("");

  useEffect(() => {
    setHost(window.location.hostname);
  }, []);

  if (channels.length === 0) return null;

  const ch = channels[active] ?? channels[0];
  const thumbs = ch.thumbnails
    .split("\n")
    .map((t) => t.trim())
    .filter(Boolean);
  const embedUrl = buildEmbedUrl(ch, host);
  const isTikTok = ch.platform.toLowerCase() === "tiktok";

  return (
    <section>
      <PhoneFrame>
        <div className="flex h-full flex-col">
          {/* Üst kısım: durum çubuğu + sekmeler (sabit) */}
          <div className="shrink-0">
            {/* Durum çubuğu */}
            <div className="flex items-center justify-between px-4 pt-3 text-[10px] font-medium text-zinc-500">
              <span>{ch.label}</span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2.5 rounded-[2px] bg-zinc-600" />
                <span className="inline-block h-2 w-2.5 rounded-[2px] bg-zinc-600" />
                <span className="inline-block h-2 w-3 rounded-[2px] border border-zinc-600" />
              </span>
            </div>

            {/* LIVE durum */}
            <div className="flex items-center justify-between px-3 pt-4">
              <div className="flex items-center gap-1.5">
                <span
                  className={`h-2 w-2 rounded-full ${
                    ch.isLive ? "bg-red-500 animate-pulseGlow" : "bg-zinc-600"
                  }`}
                />
                <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-300">
                  {ch.isLive ? "Canlı Yayın" : "Çevrimdışı"}
                </span>
              </div>
              {ch.isLive && (
                <span className="flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  LIVE
                </span>
              )}
            </div>

            {/* Sekmeler */}
            <div className="flex gap-1.5 px-3 pt-2.5">
              {channels.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold uppercase transition-all ${
                    i === active
                      ? "brand-gradient text-white shadow-md shadow-fuchsia-900/30"
                      : "border border-white/5 bg-ink-700/70 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Icon name={c.platform} className="h-3.5 w-3.5" />
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {isTikTok ? (
            /* TikTok: profil + videolar (dikey kaydırma) */
            <div className="scroll-thin flex-1 overflow-y-auto">
              <div className="px-3 pt-3">
                <div className="flex items-start gap-3">
                  <span className="h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-gold-500/40">
                    {ch.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={ch.avatarUrl}
                        alt={ch.handle}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center bg-ink-700">
                        <Icon
                          name={ch.platform}
                          className="h-6 w-6 text-gold-400"
                        />
                      </span>
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-white">
                      {ch.handle || ch.label}
                    </p>
                    <div className="mt-1.5 flex items-center gap-4">
                      <Stat value={ch.following} label="Takip" />
                      <Stat value={ch.followers} label="Takipçi" />
                      <Stat value={ch.likes} label="Beğeni" />
                    </div>
                  </div>
                </div>

                {ch.bio && (
                  <p className="mt-2.5 whitespace-pre-line text-xs leading-relaxed text-zinc-300">
                    {ch.bio}
                  </p>
                )}
              </div>

              {thumbs.length > 0 && (
                <div className="grid grid-cols-2 gap-2 px-3 pb-3 pt-3">
                  {thumbs.map((src, i) => (
                    <a
                      key={i}
                      href={ch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block aspect-[3/4] w-full overflow-hidden rounded-lg ring-1 ring-white/10"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Kick/Twitch: oynatıcı/çevrimdışı — telefonda ortalanır */
            <div className="flex flex-1 items-center justify-center px-3">
              {embedUrl ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl ring-1 ring-red-500/40">
                  <iframe
                    src={embedUrl}
                    title={`${ch.label} canlı yayın`}
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                  <span className="pointer-events-none absolute left-2 top-2 flex items-center gap-1 rounded-full bg-red-500/90 px-2 py-0.5 text-[10px] font-bold text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulseGlow" />
                    CANLI
                  </span>
                </div>
              ) : (
                <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl border border-ink-600 bg-ink-900/60">
                  <Icon name={ch.platform} className="h-7 w-7 text-zinc-600" />
                  <span className="text-xs font-medium text-zinc-500">
                    Şu an çevrimdışı
                  </span>
                </div>
              )}
            </div>
          )}

          {/* CTA (altta sabit) */}
          <div className="shrink-0 px-3 pb-3 pt-1">
            <a
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold uppercase tracking-wide transition-all hover:brightness-110 ${
                ch.isLive
                  ? "brand-gradient text-white shadow-lg shadow-fuchsia-900/20"
                  : "bg-gradient-to-b from-gold-400 to-gold-600 text-ink-900"
              }`}
            >
              <Icon name={ch.platform} className="h-4 w-4" />
              {ch.isLive ? "Yayını İzle" : `${ch.label}'da Takip Et`}
            </a>
          </div>
        </div>
      </PhoneFrame>
    </section>
  );
}
