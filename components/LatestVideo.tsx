"use client";

import { useState } from "react";
import { Play, Sparkles } from "lucide-react";
import { ytThumb } from "@/lib/youtube";
import type { Video } from "@/db/schema";

export default function LatestVideo({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative flex h-full flex-col">
      {/* Dikkat çekici "Yeni Video" rozeti */}
      <div className="mb-3 flex shrink-0 items-center gap-2">
        <span className="brand-gradient flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-white shadow-lg shadow-fuchsia-900/30">
          <Sparkles className="h-3.5 w-3.5" />
          Yeni Video
        </span>
        <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-400">
          <span className="h-1.5 w-1.5 animate-pulseGlow rounded-full bg-red-500" />
          siteye en son eklenen
        </span>
      </div>

      {/* Belirgin kart — sütun boyunu doldurur */}
      <div className="sheen relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-gold-500/30 bg-ink-800/60 p-2 shadow-2xl shadow-fuchsia-900/10">
        <div className="brand-gradient pointer-events-none absolute -inset-1 -z-10 rounded-3xl opacity-25 blur-2xl" />

        <div className="relative min-h-[240px] w-full flex-1 overflow-hidden rounded-xl ring-1 ring-white/10">
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 h-full w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ytThumb(video.youtubeId)}
                alt={video.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/20">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-xl transition-transform group-hover:scale-110">
                  <Play className="h-7 w-7 translate-x-0.5 fill-white text-white" />
                </span>
              </span>
            </button>
          )}
        </div>

        <div className="shrink-0 px-2 pb-1 pt-3">
          {video.category && (
            <span className="mb-1.5 inline-block rounded-full bg-ink-700 px-2 py-0.5 text-[10px] text-gold-300/80">
              {video.category}
            </span>
          )}
          <h3 className="text-base font-bold leading-snug text-zinc-100">
            {video.title}
          </h3>
        </div>
      </div>
    </div>
  );
}
