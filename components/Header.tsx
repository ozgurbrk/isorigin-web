import { BadgeCheck } from "lucide-react";
import type { SiteSettings } from "@/db/schema";

export default function Header({ settings }: { settings: SiteSettings }) {
  return (
    <header className="flex flex-col items-center text-center animate-fadeUp">
      {/* Konumlandırma kabı (glow burada, kırpma kabının DIŞINDA) */}
      <div className="relative mx-auto -my-6 w-full max-w-[300px]">
        {/* logo arkası yumuşak parlama */}
        <div className="brand-gradient pointer-events-none absolute left-1/2 top-1/2 -z-10 h-28 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl" />
        {/* Şeffaf üst/alt boşluğu kırpmak için sabit yükseklik + overflow */}
        <div className="flex h-[150px] w-full items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt={settings.brandName}
            className="w-full object-contain drop-shadow-[0_6px_30px_rgba(170,40,60,0.5)]"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur">
        <span className="text-sm font-medium text-zinc-200">
          {settings.handle}
        </span>
        <BadgeCheck className="h-4 w-4 text-gold-400" aria-label="Doğrulanmış" />
      </div>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
        {settings.tagline}
      </p>
    </header>
  );
}
