import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  announcements,
  linkCards,
  liveChannels,
  partners,
  siteSettings,
  videoCategories,
  videos,
  type SiteSettings,
} from "@/db/schema";

const DEFAULT_SETTINGS: SiteSettings = {
  id: 1,
  brandName: "isorigin",
  handle: "@isorigin",
  tagline: "Elite Gaming & Metin2 • 2018'den beri premium içerik",
  profileText: "",
  decreeTitle: "",
  decreeText: "",
  contactEmail: "",
};

export async function getSettings(): Promise<SiteSettings> {
  const rows = await db.select().from(siteSettings).limit(1);
  return rows[0] ?? DEFAULT_SETTINGS;
}

export async function getMainLinks() {
  return db
    .select()
    .from(linkCards)
    .where(eq(linkCards.type, "main"))
    .orderBy(asc(linkCards.sortOrder));
}

export async function getSocialLinks() {
  return db
    .select()
    .from(linkCards)
    .where(eq(linkCards.type, "social"))
    .orderBy(asc(linkCards.sortOrder));
}

export async function getLiveChannels() {
  return db.select().from(liveChannels).orderBy(asc(liveChannels.sortOrder));
}

export async function getAnnouncements() {
  return db
    .select()
    .from(announcements)
    .orderBy(asc(announcements.sortOrder));
}

export async function getPartners() {
  return db
    .select()
    .from(partners)
    .where(eq(partners.enabled, true))
    .orderBy(asc(partners.sortOrder));
}

export async function getVideos() {
  return db.select().from(videos).orderBy(asc(videos.sortOrder));
}

export async function getVideoCategories() {
  return db
    .select()
    .from(videoCategories)
    .orderBy(asc(videoCategories.sortOrder));
}
