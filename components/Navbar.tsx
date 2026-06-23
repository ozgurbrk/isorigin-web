"use client";

import { useEffect, useState } from "react";

const ITEMS = [
  { id: "vitrin", label: "Ana Sayfa", short: "Ana Sayfa" },
  { id: "canli", label: "Duyurular", short: "Duyurular" },
  { id: "videolar", label: "Videolar", short: "Videolar" },
];

export default function Navbar() {
  const [active, setActive] = useState("vitrin");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.5 },
    );
    ITEMS.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink-900/60 backdrop-blur-md">
      <div className="scroll-thin mx-auto flex h-14 max-w-5xl items-center justify-center gap-1.5 overflow-x-auto px-4 sm:gap-2">
        {ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all sm:text-sm ${
                isActive
                  ? "brand-gradient text-white shadow-md shadow-fuchsia-900/30"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
              }`}
            >
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">{item.short}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
