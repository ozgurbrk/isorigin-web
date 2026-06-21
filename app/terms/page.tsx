import Link from "next/link";

export const metadata = { title: "Kullanım Şartları — isorigin" };

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-lg px-4 py-12">
      <Link href="/" className="text-xs text-zinc-500 hover:text-gold-400">
        ← Ana sayfa
      </Link>
      <h1 className="mb-6 mt-4 text-2xl font-bold text-gradient-gold">
        Kullanım Şartları
      </h1>
      <div className="space-y-4 text-sm leading-relaxed text-zinc-400">
        <p>
          isorigin web sitesini kullanarak aşağıdaki şartları kabul etmiş
          sayılırsın.
        </p>
        <h2 className="pt-2 font-semibold text-zinc-200">İçerik</h2>
        <p>
          Sitedeki tüm marka, logo ve içerikler isorigin'e aittir. İzinsiz
          kopyalanamaz veya çoğaltılamaz.
        </p>
        <h2 className="pt-2 font-semibold text-zinc-200">Bağlantılar</h2>
        <p>
          Site, üçüncü taraf platformlara (YouTube, Discord, TikTok vb.)
          bağlantılar içerir. Bu platformların içeriklerinden isorigin sorumlu
          değildir.
        </p>
        <h2 className="pt-2 font-semibold text-zinc-200">Sorumluluk</h2>
        <p>
          Site &quot;olduğu gibi&quot; sunulur. Hizmette kesinti veya hata
          olması durumunda sorumluluk kabul edilmez.
        </p>
      </div>
    </main>
  );
}
