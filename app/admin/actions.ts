"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, not } from "drizzle-orm";
import { db } from "@/db";
import {
  announcements,
  linkCards,
  liveChannels,
  partners,
  siteSettings,
  submissions,
  videoCategories,
  videos,
} from "@/db/schema";
import { parseYouTubeId, fetchYouTubeTitle } from "@/lib/youtube";
import {
  createSession,
  destroySession,
  isAuthenticated,
  verifyPassword,
} from "@/lib/auth";
import { refreshAllChannels } from "@/lib/integrations";

async function requireAuth() {
  if (!(await isAuthenticated())) redirect("/admin/login");
}

function refresh() {
  revalidatePath("/admin", "layout");
  revalidatePath("/");
}

// ---- Videolar ----
export async function addVideo(formData: FormData) {
  await requireAuth();
  let title = String(formData.get("title") ?? "").trim();
  const link = String(formData.get("youtube") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const featured = formData.get("featured") === "on";
  const youtubeId = parseYouTubeId(link);
  if (!youtubeId) return;
  // Başlık boşsa YouTube'dan otomatik çek
  if (!title) {
    title = (await fetchYouTubeTitle(youtubeId)) ?? "Başlıksız video";
  }
  await db.insert(videos).values({
    title,
    youtubeId,
    category,
    featured,
    sortOrder: Date.now() % 100000,
  });
  refresh();
}

export async function addVideosBulk(formData: FormData) {
  await requireAuth();
  const raw = String(formData.get("links") ?? "");
  const category = String(formData.get("category") ?? "").trim();
  const featured = formData.get("featured") === "on";
  const lines = raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  let order = Date.now() % 100000;
  for (const line of lines) {
    const youtubeId = parseYouTubeId(line);
    if (!youtubeId) continue;
    const title = (await fetchYouTubeTitle(youtubeId)) ?? "Başlıksız video";
    await db.insert(videos).values({
      title,
      youtubeId,
      category,
      featured,
      sortOrder: order++,
    });
  }
  refresh();
}

export async function deleteVideo(id: number) {
  await requireAuth();
  await db.delete(videos).where(eq(videos.id, id));
  refresh();
}

export async function toggleVideoFeatured(id: number) {
  await requireAuth();
  await db
    .update(videos)
    .set({ featured: not(videos.featured) })
    .where(eq(videos.id, id));
  refresh();
}

export async function addVideoCategory(formData: FormData) {
  await requireAuth();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;
  const count = (await db.select().from(videoCategories)).length;
  await db.insert(videoCategories).values({ name, sortOrder: count + 1 });
  refresh();
}

export async function deleteVideoCategory(id: number) {
  await requireAuth();
  await db.delete(videoCategories).where(eq(videoCategories.id, id));
  refresh();
}

// ---- Auth ----
export async function login(_prev: string | null, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) {
    return "Hatalı şifre.";
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

// ---- Submissions ----
export async function toggleSubmissionRead(id: number, isRead: boolean) {
  await requireAuth();
  await db.update(submissions).set({ isRead }).where(eq(submissions.id, id));
  refresh();
}

export async function deleteSubmission(id: number) {
  await requireAuth();
  await db.delete(submissions).where(eq(submissions.id, id));
  refresh();
}

// ---- Live channels ----
export async function toggleLive(id: number) {
  await requireAuth();
  await db
    .update(liveChannels)
    .set({ isLive: not(liveChannels.isLive) })
    .where(eq(liveChannels.id, id));
  refresh();
}

export async function refreshLiveStats(): Promise<void> {
  await requireAuth();
  await refreshAllChannels();
  refresh();
}

export async function updateLiveChannel(id: number, formData: FormData) {
  await requireAuth();
  const s = (k: string) => String(formData.get(k) ?? "").trim();
  await db
    .update(liveChannels)
    .set({
      label: s("label") || "Yayın",
      url: s("url"),
      handle: s("handle"),
      avatarUrl: s("avatarUrl"),
      bio: s("bio"),
      following: s("following") || "0",
      followers: s("followers") || "0",
      likes: s("likes") || "0",
      thumbnails: s("thumbnails"),
    })
    .where(eq(liveChannels.id, id));
  refresh();
}

// ---- Announcements ----
export async function addAnnouncement(formData: FormData) {
  await requireAuth();
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const source = String(formData.get("source") ?? "whatsapp");
  if (!title || !body) return;
  await db.insert(announcements).values({
    title,
    body,
    source: source === "discord" ? "discord" : "whatsapp",
    sortOrder: Date.now() % 100000,
  });
  refresh();
}

export async function deleteAnnouncement(id: number) {
  await requireAuth();
  await db.delete(announcements).where(eq(announcements.id, id));
  refresh();
}

// ---- Partners ----
export async function addPartner(formData: FormData) {
  await requireAuth();
  const name = String(formData.get("name") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!name || !url) return;
  await db.insert(partners).values({ name, url, description });
  refresh();
}

export async function deletePartner(id: number) {
  await requireAuth();
  await db.delete(partners).where(eq(partners.id, id));
  refresh();
}

// ---- Link cards ----
export async function toggleLinkEnabled(id: number) {
  await requireAuth();
  await db
    .update(linkCards)
    .set({ enabled: not(linkCards.enabled) })
    .where(eq(linkCards.id, id));
  refresh();
}

export async function updateLink(id: number, formData: FormData) {
  await requireAuth();
  const s = (k: string) => String(formData.get(k) ?? "").trim();
  await db
    .update(linkCards)
    .set({
      title: s("title") || "Link",
      subtitle: s("subtitle") || null,
      url: s("url"),
      enabled: formData.get("enabled") === "on",
    })
    .where(eq(linkCards.id, id));
  refresh();
}

// ---- Settings ----
export async function updateSettings(formData: FormData) {
  await requireAuth();
  const values = {
    brandName: String(formData.get("brandName") ?? "isorigin").trim(),
    handle: String(formData.get("handle") ?? "@isorigin").trim(),
    tagline: String(formData.get("tagline") ?? "").trim(),
    profileText: String(formData.get("profileText") ?? "").trim(),
    decreeTitle: String(formData.get("decreeTitle") ?? "").trim(),
    decreeText: String(formData.get("decreeText") ?? "").trim(),
    contactEmail: String(formData.get("contactEmail") ?? "").trim(),
  };
  const existing = await db.select().from(siteSettings).limit(1);
  if (existing[0]) {
    await db
      .update(siteSettings)
      .set(values)
      .where(eq(siteSettings.id, existing[0].id));
  } else {
    await db.insert(siteSettings).values({ id: 1, ...values });
  }
  refresh();
}
