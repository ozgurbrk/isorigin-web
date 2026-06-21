import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Ana navigasyon + sosyal linkler.
 * type: "main"  -> büyük navigasyon kartları (YouTube, Discord vb.)
 * type: "social" -> küçük sosyal satırı (WhatsApp, TikTok, Instagram)
 */
export const linkCards = sqliteTable("link_cards", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text("type", { enum: ["main", "social"] })
    .notNull()
    .default("main"),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  url: text("url").notNull(),
  icon: text("icon").notNull().default("link"),
  accent: text("accent").default("gold"),
  sortOrder: integer("sort_order").notNull().default(0),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
});

export const liveChannels = sqliteTable("live_channels", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  platform: text("platform").notNull(), // tiktok | kick | twitch ...
  label: text("label").notNull(),
  url: text("url").notNull(),
  isLive: integer("is_live", { mode: "boolean" }).notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  // Profil önizleme alanları
  handle: text("handle").notNull().default(""),
  avatarUrl: text("avatar_url").notNull().default(""),
  bio: text("bio").notNull().default(""),
  following: text("following").notNull().default("0"),
  followers: text("followers").notNull().default("0"),
  likes: text("likes").notNull().default("0"),
  // Küçük resim URL'leri, satır satır
  thumbnails: text("thumbnails").notNull().default(""),
});

export const announcements = sqliteTable("announcements", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  source: text("source", { enum: ["whatsapp", "discord"] })
    .notNull()
    .default("whatsapp"),
  title: text("title").notNull(),
  body: text("body").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const partners = sqliteTable("partners", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
  url: text("url").notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").notNull().default(0),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
});

/** Tek satırlık site ayarları (id = 1). */
export const siteSettings = sqliteTable("site_settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  brandName: text("brand_name").notNull().default("isorigin"),
  handle: text("handle").notNull().default("@isorigin"),
  tagline: text("tagline").notNull().default(""),
  profileText: text("profile_text").notNull().default(""),
  decreeTitle: text("decree_title").notNull().default(""),
  decreeText: text("decree_text").notNull().default(""),
  contactEmail: text("contact_email").notNull().default(""),
});

export const videoCategories = sqliteTable("video_categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const videos = sqliteTable("videos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  youtubeId: text("youtube_id").notNull(),
  category: text("category").notNull().default(""),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const submissions = sqliteTable("submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  collabType: text("collab_type").notNull(),
  message: text("message").notNull(),
  isRead: integer("is_read", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type LinkCard = typeof linkCards.$inferSelect;
export type LiveChannel = typeof liveChannels.$inferSelect;
export type Announcement = typeof announcements.$inferSelect;
export type Partner = typeof partners.$inferSelect;
export type SiteSettings = typeof siteSettings.$inferSelect;
export type Submission = typeof submissions.$inferSelect;
export type Video = typeof videos.$inferSelect;
export type VideoCategory = typeof videoCategories.$inferSelect;
