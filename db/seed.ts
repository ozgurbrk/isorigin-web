import { db } from "./index";
import {
  announcements,
  linkCards,
  liveChannels,
  partners,
  siteSettings,
  videoCategories,
} from "./schema";

/**
 * Başlangıç verisi. `npm run db:seed` ile çalışır.
 * Var olan içerik tablolarını temizleyip yeniden doldurur (submissions'a dokunmaz).
 */
async function seed() {
  console.log("Seeding...");

  await db.delete(linkCards);
  await db.delete(liveChannels);
  await db.delete(announcements);
  await db.delete(partners);
  await db.delete(siteSettings);
  await db.delete(videoCategories);

  await db.insert(videoCategories).values([
    { name: "Metin2", sortOrder: 1 },
    { name: "Vloglar", sortOrder: 2 },
    { name: "Tanıtım", sortOrder: 3 },
  ]);

  await db.insert(siteSettings).values({
    id: 1,
    brandName: "isorigin",
    handle: "@isorigin",
    tagline: "Elite Gaming & Metin2 Efsanesi • 2018'den beri premium içerik",
    profileText:
      "Merhaba! Ben isorigin. 2018'den bu yana Metin2 ve oyun dünyasında premium içerik üretiyorum. Tüm kanallarım, canlı yayınlarım ve iş birliği başvurularına buradan ulaşabilirsin.",
    decreeTitle: "İmparatorluk Fermanı",
    decreeText:
      "Bu diyarın efsanesi olmak isteyenler dinlesin: Ruh Darbesi'nin gücüyle yükselen, kılıcını onurla taşıyan herkes bu topluluğun bir parçasıdır. Yayınlarda buluşur, etkinliklerde ödül kazanır, birlikte zafere yürürüz.",
    contactEmail: "iletisim@isorigin.com",
  });

  await db.insert(linkCards).values([
    {
      type: "main",
      title: "isorigin",
      subtitle: "Ana YouTube Kanalı",
      url: "https://youtube.com/@isorigin",
      icon: "youtube",
      accent: "red",
      sortOrder: 1,
    },
    {
      type: "main",
      title: "Metin2 İçerikleri",
      subtitle: "Oyuna özel YouTube videoları",
      url: "https://youtube.com/@isorigin",
      icon: "swords",
      accent: "gold",
      sortOrder: 2,
    },
    {
      type: "main",
      title: "Discord Topluluğu",
      subtitle: "Etkinlikler, çekilişler ve duyurular",
      url: "https://discord.gg/isorigin",
      icon: "discord",
      accent: "indigo",
      sortOrder: 3,
    },
    {
      type: "social",
      title: "WhatsApp",
      url: "https://whatsapp.com/channel/isorigin",
      icon: "whatsapp",
      sortOrder: 1,
    },
    {
      type: "social",
      title: "TikTok",
      url: "https://tiktok.com/@isorigin",
      icon: "tiktok",
      sortOrder: 2,
    },
    {
      type: "social",
      title: "Instagram",
      url: "https://instagram.com/isorigin",
      icon: "instagram",
      sortOrder: 3,
    },
  ]);

  // Veriler API'den (TikTok/Kick/Twitch) çekilecek; burada yalnızca
  // kanal tanımları ve gerçek kullanıcı adları (handle) bulunur.
  // Doğru handle'ları admin panelden girip "API'den yenile" deyince dolar.
  await db.insert(liveChannels).values([
    {
      platform: "tiktok",
      label: "TikTok",
      url: "https://tiktok.com/@isorigin/live",
      isLive: false,
      sortOrder: 1,
      handle: "isorigin",
      avatarUrl: "",
      bio: "",
      following: "—",
      followers: "—",
      likes: "—",
      thumbnails: "",
    },
    {
      platform: "kick",
      label: "Kick",
      url: "https://kick.com/isorigin",
      isLive: false,
      sortOrder: 2,
      handle: "isorigin",
      avatarUrl: "",
      bio: "",
      following: "—",
      followers: "—",
      likes: "—",
      thumbnails: "",
    },
    {
      platform: "twitch",
      label: "Twitch",
      url: "https://twitch.tv/isorigin",
      isLive: false,
      sortOrder: 3,
      handle: "isorigin",
      avatarUrl: "",
      bio: "",
      following: "—",
      followers: "—",
      likes: "—",
      thumbnails: "",
    },
  ]);

  await db.insert(announcements).values([
    {
      source: "whatsapp",
      title: "Ruh Darbesi Hasar Testi",
      body: "Yeni video yayında! Ruh Darbesi'nin güncel hasar değerlerini birlikte test ediyoruz.",
      sortOrder: 1,
    },
    {
      source: "whatsapp",
      title: "Silah Tüccarının Tuhaf Hikâyesi",
      body: "Bu haftanın özel serisi: efsanevi silah tüccarının ardındaki sır.",
      sortOrder: 2,
    },
    {
      source: "discord",
      title: "Büyük Çekiliş",
      body: "Discord sunucumuzda 5.000 EP ve 1.000 TL ödüllü çekiliş başladı. Katılmayı unutma!",
      sortOrder: 3,
    },
  ]);

  await db.insert(partners).values([
    {
      name: "AyazMT2",
      url: "https://ayazmt2.com",
      description: "Partner Metin2 sunucusu",
      logoUrl: null,
      sortOrder: 1,
    },
  ]);

  console.log("Seed tamamlandı.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
