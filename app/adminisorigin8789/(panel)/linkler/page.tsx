import { asc } from "drizzle-orm";
import { db } from "@/db";
import { linkCards } from "@/db/schema";
import { updateLink } from "@/app/adminisorigin8789/actions";
import { PageTitle, Panel, inputCls, btnPrimary } from "../ui";

export const dynamic = "force-dynamic";

export default async function LinklerAdmin() {
  const links = await db
    .select()
    .from(linkCards)
    .orderBy(asc(linkCards.sortOrder));

  return (
    <div className="max-w-3xl space-y-6">
      <PageTitle
        title="Linkler"
        desc="Ana ve sosyal linklerin adreslerini ve baÅŸlÄ±klarÄ±nÄ± dÃ¼zenle."
      />

      <div className="space-y-4">
        {links.map((l) => (
          <Panel key={l.id}>
            <form action={updateLink.bind(null, l.id)} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-zinc-200">
                  {l.title}{" "}
                  <span className="text-xs font-normal text-zinc-600">
                    ({l.type})
                  </span>
                </span>
                <label className="flex items-center gap-2 text-xs text-zinc-400">
                  <input
                    type="checkbox"
                    name="enabled"
                    defaultChecked={l.enabled}
                    className="accent-gold-400"
                  />
                  GÃ¶rÃ¼nÃ¼r
                </label>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <input
                  name="title"
                  defaultValue={l.title}
                  className={inputCls}
                  placeholder="BaÅŸlÄ±k"
                />
                <input
                  name="subtitle"
                  defaultValue={l.subtitle ?? ""}
                  className={inputCls}
                  placeholder="Alt baÅŸlÄ±k (opsiyonel)"
                />
              </div>
              <input
                name="url"
                defaultValue={l.url}
                className={inputCls}
                placeholder="https://..."
              />
              <button className={btnPrimary}>Kaydet</button>
            </form>
          </Panel>
        ))}
      </div>
    </div>
  );
}
