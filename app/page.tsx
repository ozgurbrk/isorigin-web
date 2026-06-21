import Header from "@/components/Header";
import LinkCard from "@/components/LinkCard";
import SocialRow from "@/components/SocialRow";
import LivePreview from "@/components/LivePreview";
import LatestVideo from "@/components/LatestVideo";
import AnnouncementPhone from "@/components/AnnouncementPhone";
import VideosSection from "@/components/VideosSection";
import Reveal from "@/components/Reveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getAnnouncements,
  getLiveChannels,
  getMainLinks,
  getSettings,
  getSocialLinks,
  getVideoCategories,
  getVideos,
} from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, mainLinks, socialLinks, live, news, vids, vidCats] =
    await Promise.all([
      getSettings(),
      getMainLinks(),
      getSocialLinks(),
      getLiveChannels(),
      getAnnouncements(),
      getVideos(),
      getVideoCategories(),
    ]);

  const waItems = news.filter((n) => n.source === "whatsapp");
  const dcItems = news.filter((n) => n.source === "discord");
  const latestVideo = [...vids].sort((a, b) => b.id - a.id)[0];
  const waUrl =
    socialLinks.find((l) => l.icon === "whatsapp")?.url ?? "#";
  const dcUrl =
    mainLinks.find((l) => l.icon === "discord")?.url ?? "#";

  return (
    <main className="h-[100dvh] snap-y snap-mandatory overflow-y-scroll scroll-smooth scroll-pt-14">
      <Navbar />

      {/* Bölüm 1 — Vitrin: logo + link butonları + en son video */}
      <section
        id="vitrin"
        className="flex min-h-[100dvh] w-full snap-start flex-col items-center justify-center gap-8 px-4 pb-12 pt-20"
      >
        <Reveal>
          <Header settings={settings} />
        </Reveal>

        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-6 lg:flex-row lg:items-stretch lg:gap-8">
          <Reveal className="flex w-full max-w-[400px] flex-col justify-center gap-4 lg:flex-1" delay={120}>
            {mainLinks.filter((l) => l.enabled).length > 0 && (
              <div className="space-y-3">
                {mainLinks
                  .filter((l) => l.enabled)
                  .map((card) => (
                    <LinkCard key={card.id} card={card} />
                  ))}
              </div>
            )}
            <SocialRow links={socialLinks.filter((l) => l.enabled)} />
          </Reveal>

          {latestVideo && (
            <Reveal
              className="flex w-full max-w-[560px] flex-col lg:flex-[1.35]"
              delay={240}
            >
              <LatestVideo video={latestVideo} />
            </Reveal>
          )}
        </div>
      </section>

      {/* Bölüm 2 — Telefonlar: canlı yayın + duyurular */}
      <section
        id="canli"
        className="flex min-h-[100dvh] w-full snap-start flex-col items-center justify-center gap-8 px-4 pb-12 pt-20"
      >
        <Reveal className="w-full max-w-5xl px-1">
          <h2 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-zinc-100 sm:text-3xl">
            <span className="brand-gradient h-7 w-1.5 rounded-full" />
            Canlı Yayın &amp; Duyurular
          </h2>
        </Reveal>

        <div className="flex w-full flex-wrap items-center justify-center gap-6">
          <Reveal className="w-[342px] max-w-full" delay={80}>
            <LivePreview channels={live} />
          </Reveal>
          <Reveal className="w-[342px] max-w-full" delay={200}>
            <AnnouncementPhone
              source="whatsapp"
              title={`${settings.brandName} Duyuru`}
              items={waItems}
              joinUrl={waUrl}
              joinLabel="Kanala Katıl"
            />
          </Reveal>
          <Reveal className="w-[342px] max-w-full" delay={320}>
            <AnnouncementPhone
              source="discord"
              title={`${settings.brandName} Community`}
              items={dcItems}
              joinUrl={dcUrl}
              joinLabel="Sunucuya Katıl"
            />
          </Reveal>
        </div>
      </section>

      {/* Bölüm 3 — Videolar + footer */}
      <section
        id="videolar"
        className="flex min-h-[100dvh] w-full snap-start flex-col items-center justify-center gap-10 px-4 pb-12 pt-20"
      >
        <Reveal className="w-full">
          <VideosSection videos={vids} categories={vidCats} />
        </Reveal>
        <Reveal className="w-full max-w-lg" delay={150}>
          <Footer settings={settings} />
        </Reveal>
      </section>
    </main>
  );
}
