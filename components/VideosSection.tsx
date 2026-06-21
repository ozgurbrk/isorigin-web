"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { ytThumb } from "@/lib/youtube";
import type { Video, VideoCategory } from "@/db/schema";

export default function VideosSection({
  videos,
  categories,
}: {
  videos: Video[];
  categories: VideoCategory[];
}) {
  const [activeCat, setActiveCat] = useState<string>("Tümü");
  const [playing, setPlaying] = useState<Video | null>(null);

  if (videos.length === 0) return null;

  const cats = ["Tümü", ...categories.map((c) => c.name)];
  const list =
    activeCat === "Tümü"
      ? videos
      : videos.filter((v) => v.category === activeCat);

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-5 flex items-end justify-between px-1">
          <h2 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-zinc-100 sm:text-3xl">
            <span className="brand-gradient h-7 w-1.5 rounded-full" />
            Videolar
          </h2>
          <span className="text-sm font-medium text-zinc-500">
            {videos.length} video
          </span>
        </div>

        {/* Kategori sekmeleri */}
        {cats.length > 1 && (
          <div className="scroll-thin mb-5 flex gap-2 overflow-x-auto pb-1">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  activeCat === c
                    ? "brand-gradient text-white shadow-md shadow-fuchsia-900/30"
                    : "border border-white/10 bg-ink-700/60 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {/* Video ızgarası */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v) => (
            <button
              key={v.id}
              onClick={() => setPlaying(v)}
              className="sheen group relative overflow-hidden rounded-2xl card-surface text-left"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ytThumb(v.youtubeId)}
                  alt={v.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 shadow-lg">
                    <Play className="h-6 w-6 translate-x-0.5 fill-white text-white" />
                  </span>
                </span>
              </div>
              <div className="p-3.5">
                <p className="line-clamp-2 text-sm font-semibold leading-snug text-zinc-100">
                  {v.title}
                </p>
                {v.category && (
                  <span className="mt-2 inline-block rounded-full bg-ink-700 px-2.5 py-0.5 text-[11px] text-gold-300/80">
                    {v.category}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Oynatıcı modal */}
      {playing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setPlaying(null)}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPlaying(null)}
              className="absolute -top-10 right-0 flex items-center gap-1 text-sm text-zinc-300 hover:text-white"
            >
              <X className="h-5 w-5" /> Kapat
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-white/10">
              <iframe
                src={`https://www.youtube.com/embed/${playing.youtubeId}?autoplay=1`}
                title={playing.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <p className="mt-3 text-sm font-semibold text-zinc-100">
              {playing.title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
