import { ExternalLink, Handshake } from "lucide-react";
import SectionTitle from "./SectionTitle";
import type { Partner } from "@/db/schema";

export default function PartnersSection({
  partners,
}: {
  partners: Partner[];
}) {
  if (partners.length === 0) return null;
  return (
    <section>
      <SectionTitle hint="İş ortakları">Partner Sunucular</SectionTitle>
      <div className="space-y-3">
        {partners.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="sheen group relative flex items-center gap-4 overflow-hidden rounded-2xl card-surface px-4 py-4 hover:-translate-y-0.5"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-ink-700">
              {p.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.logoUrl}
                  alt={p.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Handshake className="h-5 w-5 text-gold-400" />
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-semibold text-zinc-100">
                {p.name}
              </span>
              {p.description && (
                <span className="block truncate text-xs text-zinc-500">
                  {p.description}
                </span>
              )}
            </span>
            <ExternalLink className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-gold-400" />
          </a>
        ))}
      </div>
    </section>
  );
}
