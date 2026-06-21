/**
 * Hareketli arka plan katmanı (fixed, içeriğin arkasında).
 * Logonun renk paletinden (kırmızı/pembe/mor/turuncu) yavaşça süzülen
 * bulanık ışık küreleri + hafif hareketli aurora + ince ızgara dokusu.
 * Tamamen CSS animasyon, JS yok.
 */
export default function BackgroundFX() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Hareketli aurora taban */}
      <div
        className="absolute inset-0 animate-auroraShift opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(120deg, #1a0f24 0%, #2a1018 35%, #160f20 60%, #2e1014 100%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Süzülen ışık küreleri */}
      <div className="absolute -left-32 top-[-10%] h-[55vh] w-[55vh] animate-float1 rounded-full bg-fuchsia-600/25 blur-[110px]" />
      <div className="absolute right-[-15%] top-[20%] h-[50vh] w-[50vh] animate-float2 rounded-full bg-red-600/25 blur-[120px]" />
      <div className="absolute bottom-[-15%] left-[15%] h-[60vh] w-[60vh] animate-float3 rounded-full bg-purple-700/25 blur-[120px]" />
      <div className="absolute bottom-[-5%] right-[10%] h-[40vh] w-[40vh] animate-float1 rounded-full bg-amber-500/15 blur-[110px]" />

      {/* Üstte mor, altta kırmızı kor parlaması */}
      <div className="absolute inset-x-0 top-0 h-[40vh] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(124,58,237,0.28),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-[radial-gradient(60%_100%_at_50%_100%,rgba(190,30,45,0.32),transparent)]" />

      {/* İnce kayan ızgara dokusu */}
      <div
        className="absolute inset-0 animate-gridDrift opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(circle at 50% 40%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 40%, black, transparent 75%)",
        }}
      />

      {/* Hafif karartma vinyet */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_55%,rgba(0,0,0,0.55))]" />
    </div>
  );
}
