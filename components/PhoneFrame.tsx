/** Ortak telefon çerçevesi: dynamic island, yan tuşlar, gradyan parıltı. */
export default function PhoneFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[342px]">
      {/* yan tuşlar */}
      <span className="absolute -left-[3px] top-24 h-9 w-[3px] rounded-l bg-white/15" />
      <span className="absolute -left-[3px] top-36 h-14 w-[3px] rounded-l bg-white/15" />
      <span className="absolute -right-[3px] top-28 h-16 w-[3px] rounded-r bg-white/15" />
      {/* arka parıltı */}
      <div className="brand-gradient pointer-events-none absolute -inset-2 -z-10 rounded-[3rem] opacity-20 blur-2xl" />

      <div className="rounded-[2.6rem] border border-white/10 bg-gradient-to-b from-ink-700/90 to-ink-900 p-3 shadow-2xl shadow-black/70 ring-1 ring-gold-600/20">
        {/* dynamic island */}
        <div className="relative mb-2 flex justify-center">
          <span className="flex h-5 w-24 items-center justify-end gap-1.5 rounded-full bg-black px-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          </span>
        </div>

        <div className="flex h-[560px] flex-col overflow-hidden rounded-[1.9rem] bg-gradient-to-b from-ink-800 to-ink-900 ring-1 ring-white/5">
          {children}
        </div>
      </div>
    </div>
  );
}
