import { Scroll } from "lucide-react";
import type { SiteSettings } from "@/db/schema";

export default function DecreeSection({
  settings,
}: {
  settings: SiteSettings;
}) {
  if (!settings.decreeText) return null;
  return (
    <section className="sheen relative overflow-hidden rounded-2xl card-surface p-5">
      {/* köşe parlama */}
      <div className="brand-gradient pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-3xl" />
      <div className="relative mb-2 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-ink-700">
          <Scroll className="h-4 w-4 text-gold-400" />
        </span>
        <h2 className="text-sm font-bold uppercase tracking-wide text-brand">
          {settings.decreeTitle}
        </h2>
      </div>
      <p className="relative border-l-2 border-gold-600/40 pl-3 text-sm italic leading-relaxed text-zinc-300">
        {settings.decreeText}
      </p>
    </section>
  );
}
