"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Clapperboard,
  Megaphone,
  Radio,
  Link as LinkIcon,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { logout } from "@/app/adminisorigin8789/actions";

const NAV = [
  { href: "/adminisorigin8789", label: "Dashboard", icon: LayoutDashboard },
  { href: "/adminisorigin8789/videolar", label: "Videolar", icon: Clapperboard },
  { href: "/adminisorigin8789/duyurular", label: "Duyurular", icon: Megaphone },
  { href: "/adminisorigin8789/canli-yayin", label: "CanlÄ± YayÄ±n", icon: Radio },
  { href: "/adminisorigin8789/linkler", label: "Linkler", icon: LinkIcon },
  { href: "/adminisorigin8789/ayarlar", label: "Ayarlar", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/adminisorigin8789" ? pathname === "/adminisorigin8789" : pathname.startsWith(href);
  const current = NAV.find((n) => isActive(n.href))?.label ?? "Admin";

  return (
    <>
      {/* Ãœst bar (mobil) */}
      <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-zinc-800 bg-zinc-900/80 px-4 backdrop-blur lg:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="p-1.5 text-zinc-400 hover:text-zinc-100"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
        <span className="text-sm font-semibold text-zinc-300">{current}</span>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r border-zinc-800 bg-zinc-900 transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-14 shrink-0 items-center gap-2 border-b border-zinc-800 px-5">
          <span className="text-sm font-black tracking-wider text-zinc-100">
            <span className="text-gold-400">iso</span>rigin
          </span>
          <span className="text-[10px] font-semibold uppercase text-zinc-600">
            admin
          </span>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 rounded-md border px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "border-gold-400/20 bg-gold-400/10 text-gold-400"
                    : "border-transparent text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1.5 border-t border-zinc-800 px-3 py-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-xs text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
          >
            <ExternalLink size={13} /> Siteye DÃ¶n
          </Link>
          <form action={logout}>
            <button className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-xs text-zinc-500 transition-colors hover:bg-red-400/5 hover:text-red-400">
              <LogOut size={13} /> Ã‡Ä±kÄ±ÅŸ Yap
            </button>
          </form>
        </div>
      </aside>

      {/* Mobil overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
