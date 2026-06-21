import { NextResponse } from "next/server";
import { refreshAllChannels } from "@/lib/integrations";

export const dynamic = "force-dynamic";

/**
 * Yayın verilerini API'lerden çekip DB'yi günceller.
 * Cron / zamanlanmış görevden çağrılır:
 *   GET /api/refresh-live?secret=REFRESH_SECRET
 */
export async function GET(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  if (!process.env.REFRESH_SECRET || secret !== process.env.REFRESH_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const results = await refreshAllChannels();
  return NextResponse.json({ ok: true, at: new Date().toISOString(), results });
}
