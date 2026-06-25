import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { db } from "@/db";
import { pageViews } from "@/db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Anonim sayfa görüntüleme kaydı (ziyaret istatistiği için). */
export async function POST(req: Request) {
  try {
    const ua = req.headers.get("user-agent") ?? "";
    if (/bot|crawler|spider|crawl|facebookexternalhit|bingpreview|slurp/i.test(ua)) {
      return new NextResponse(null, { status: 204 });
    }

    const body = await req.json().catch(() => ({}) as Record<string, unknown>);
    let path = typeof body.path === "string" ? body.path.slice(0, 200) : "/";
    // admin/api yollarını sayma
    if (path.startsWith("/adminisorigin8789") || path.startsWith("/api")) {
      return new NextResponse(null, { status: 204 });
    }
    const referrer =
      typeof body.referrer === "string" ? body.referrer.slice(0, 300) : "";

    const store = await cookies();
    let vid = store.get("isv")?.value;
    const res = new NextResponse(null, { status: 204 });
    if (!vid) {
      vid = randomUUID();
      res.cookies.set("isv", vid, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
    }

    await db.insert(pageViews).values({ path, visitorId: vid, referrer });
    return res;
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}
