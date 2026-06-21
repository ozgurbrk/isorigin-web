import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";
import type { SiteSettings } from "@/db/schema";

export default function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-4 flex flex-col items-center gap-4 border-t border-ink-600 pt-6 pb-2 text-center">
      <div className="flex items-center gap-4">
        <a
          href="https://discord.gg/isorigin"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord"
          className="text-zinc-500 transition-colors hover:text-gold-400"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
        {settings.contactEmail && (
          <a
            href={`mailto:${settings.contactEmail}`}
            aria-label="E-posta"
            className="text-zinc-500 transition-colors hover:text-gold-400"
          >
            <Mail className="h-5 w-5" />
          </a>
        )}
      </div>

      <div className="flex items-center gap-3 text-xs text-zinc-600">
        <Link href="/privacy" className="hover:text-zinc-400">
          Gizlilik
        </Link>
        <span>·</span>
        <Link href="/terms" className="hover:text-zinc-400">
          Kullanım Şartları
        </Link>
      </div>

      <p className="text-[11px] text-zinc-700">
        © {year} {settings.brandName}. Tüm hakları saklıdır.
      </p>
    </footer>
  );
}
