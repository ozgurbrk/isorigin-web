export default function SectionTitle({
  children,
  hint,
}: {
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between px-1">
      <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-zinc-200">
        <span className="brand-gradient h-3.5 w-1 rounded-full" />
        {children}
      </h2>
      {hint && (
        <span className="text-[11px] font-medium text-zinc-500">{hint}</span>
      )}
    </div>
  );
}
