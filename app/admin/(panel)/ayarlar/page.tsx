import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { updateSettings } from "@/app/admin/actions";
import { PageTitle, Panel, inputCls, btnPrimary } from "../ui";

export const dynamic = "force-dynamic";

export default async function AyarlarAdmin() {
  const rows = await db.select().from(siteSettings).limit(1);
  const s = rows[0];

  return (
    <div className="max-w-2xl space-y-6">
      <PageTitle title="Ayarlar" desc="Site marka ve genel bilgileri." />
      <Panel>
        <form action={updateSettings} className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Marka adı</label>
              <input name="brandName" defaultValue={s?.brandName ?? "isorigin"} className={inputCls} />
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Kullanıcı adı</label>
              <input name="handle" defaultValue={s?.handle ?? "@isorigin"} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-500">Tagline</label>
            <input name="tagline" defaultValue={s?.tagline ?? ""} className={inputCls} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-500">İletişim e-postası</label>
            <input name="contactEmail" defaultValue={s?.contactEmail ?? ""} className={inputCls} />
          </div>
          {/* Ferman alanları gizli tutuluyor (site bölümü kaldırıldı) ama değer korunur */}
          <input type="hidden" name="decreeTitle" defaultValue={s?.decreeTitle ?? ""} />
          <input type="hidden" name="decreeText" defaultValue={s?.decreeText ?? ""} />
          <button className={btnPrimary}>Kaydet</button>
        </form>
      </Panel>
    </div>
  );
}
