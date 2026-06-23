import { BadgeCheck } from "lucide-react";
import type { SiteSettings } from "@/db/schema";

export default function AboutSection({
  settings,
}: {
  settings: SiteSettings;
}) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <h2 className="mb-5 flex items-center gap-3 px-1 text-2xl font-extrabold tracking-tight text-zinc-100 sm:text-3xl">
        <span className="brand-gradient h-7 w-1.5 rounded-full" />
        Hakkımda
      </h2>

      <div className="sheen relative overflow-hidden rounded-2xl card-surface p-6 sm:p-8">
        <div className="brand-gradient pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-3xl" />

        <div className="relative mb-4 flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-gold-500/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt={settings.brandName}
              className="h-full w-full scale-150 object-contain"
            />
          </span>
          <div>
            <p className="flex items-center gap-1.5 text-base font-bold text-white">
              {settings.brandName}
              <BadgeCheck className="h-4 w-4 text-gold-400" />
            </p>
            <p className="text-xs text-gold-300/80">{settings.handle}</p>
          </div>
        </div>

        <p className="relative whitespace-pre-line text-sm leading-relaxed text-zinc-300">
          {settings.profileText || "Buraya hakkımda metni eklenecek."}
        </p>
      </div>
    </div>
  );
}
