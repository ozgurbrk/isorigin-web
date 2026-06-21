/** Admin panel ortak stilleri (ozgurdallas-web tarzı sade zinc tema). */
export const inputCls =
  "w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-400/50";

export const btnPrimary =
  "flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold bg-gold-400 hover:bg-gold-300 text-zinc-950 disabled:opacity-50 transition-colors";

export const btnGhost =
  "flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors";

export function Panel({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 sm:p-5 space-y-3">
      {title && (
        <h2 className="text-sm font-bold text-zinc-300">{title}</h2>
      )}
      {children}
    </div>
  );
}

export function PageTitle({
  title,
  desc,
}: {
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-5">
      <h1 className="text-lg font-bold text-zinc-100">{title}</h1>
      {desc && <p className="mt-0.5 text-sm text-zinc-500">{desc}</p>}
    </div>
  );
}
