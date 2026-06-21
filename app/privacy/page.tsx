import Link from "next/link";

export const metadata = { title: "Gizlilik Politikası — isorigin" };

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-lg px-4 py-12">
      <Link href="/" className="text-xs text-zinc-500 hover:text-gold-400">
        ← Ana sayfa
      </Link>
      <h1 className="mb-6 mt-4 text-2xl font-bold text-gradient-gold">
        Gizlilik Politikası
      </h1>
      <div className="space-y-4 text-sm leading-relaxed text-zinc-400">
        <p>
          Bu sayfa, isorigin web sitesi üzerinden topladığımız verilerin nasıl
          kullanıldığını açıklar.
        </p>
        <h2 className="pt-2 font-semibold text-zinc-200">
          Toplanan Veriler
        </h2>
        <p>
          İş birliği formunu doldurduğunda paylaştığın ad, e-posta adresi ve
          mesaj içeriği, yalnızca başvurunu değerlendirmek amacıyla saklanır.
        </p>
        <h2 className="pt-2 font-semibold text-zinc-200">Verilerin Kullanımı</h2>
        <p>
          Bilgilerin üçüncü taraflarla paylaşılmaz, pazarlama amacıyla
          kullanılmaz. Yalnızca seninle iletişime geçmek için kullanılır.
        </p>
        <h2 className="pt-2 font-semibold text-zinc-200">İletişim</h2>
        <p>
          Verilerinin silinmesini istersen, sitedeki iletişim kanallarından bize
          ulaşabilirsin.
        </p>
      </div>
    </main>
  );
}
