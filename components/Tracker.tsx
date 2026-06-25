"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Her sayfa görüntülemesinde anonim ziyaret kaydı gönderir. */
export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith("/adminisorigin8789")) return;
    try {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          referrer: document.referrer || "",
        }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // sessizce yoksay
    }
  }, [pathname]);

  return null;
}
