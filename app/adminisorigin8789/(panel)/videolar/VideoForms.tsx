"use client";

import { useState } from "react";
import { Plus, Layers } from "lucide-react";
import { addVideo, addVideosBulk } from "@/app/adminisorigin8789/actions";

const inputCls =
  "w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-400/50";
const btnPrimary =
  "flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold bg-gold-400 hover:bg-gold-300 text-zinc-950 transition-colors";

type Cat = { id: number; name: string };

export default function VideoForms({ categories }: { categories: Cat[] }) {
  const [tab, setTab] = useState<"single" | "bulk">("single");

  const CatSelect = () => (
    <select name="category" className={inputCls} defaultValue="">
      <option value="">â€” Kategorisiz â€”</option>
      {categories.map((c) => (
        <option key={c.id} value={c.name}>
          {c.name}
        </option>
      ))}
    </select>
  );

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 sm:p-5">
      {/* Sekmeler */}
      <div className="mb-4 flex gap-1.5">
        <button
          onClick={() => setTab("single")}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
            tab === "single"
              ? "bg-gold-400 text-zinc-950"
              : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Plus size={13} /> Tekli
        </button>
        <button
          onClick={() => setTab("bulk")}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
            tab === "bulk"
              ? "bg-gold-400 text-zinc-950"
              : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Layers size={13} /> Toplu
        </button>
      </div>

      {tab === "single" ? (
        <form action={addVideo} className="space-y-3">
          <input
            name="youtube"
            className={inputCls}
            placeholder="YouTube linki veya video ID (Ã¶rn: https://youtu.be/xxxx)"
          />
          <input
            name="title"
            className={inputCls}
            placeholder="BaÅŸlÄ±k (boÅŸ bÄ±rakÄ±rsan YouTube'dan otomatik Ã§ekilir)"
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-zinc-500">
                Kategori
              </label>
              <CatSelect />
            </div>
            <label className="flex items-end gap-2 pb-2 text-sm text-zinc-400">
              <input type="checkbox" name="featured" className="accent-gold-400" />
              Ã–ne Ã§Ä±kan
            </label>
          </div>
          <button className={btnPrimary}>
            <Plus size={13} /> Video Ekle
          </button>
        </form>
      ) : (
        <form action={addVideosBulk} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs text-zinc-500">
              YouTube linkleri â€” her satÄ±ra bir tane
            </label>
            <textarea
              name="links"
              rows={6}
              className={`${inputCls} resize-none font-mono text-xs`}
              placeholder={
                "https://youtu.be/xxxx\nhttps://www.youtube.com/watch?v=yyyy\nhttps://youtube.com/shorts/zzzz"
              }
            />
            <p className="mt-1 text-[11px] text-zinc-600">
              BaÅŸlÄ±klar her video iÃ§in YouTube&apos;dan otomatik Ã§ekilir.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-zinc-500">
                Kategori (hepsine uygulanÄ±r)
              </label>
              <CatSelect />
            </div>
            <label className="flex items-end gap-2 pb-2 text-sm text-zinc-400">
              <input type="checkbox" name="featured" className="accent-gold-400" />
              Hepsi Ã¶ne Ã§Ä±kan
            </label>
          </div>
          <button className={btnPrimary}>
            <Layers size={13} /> Toplu Ekle
          </button>
        </form>
      )}
    </div>
  );
}
