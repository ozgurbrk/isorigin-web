import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "isorigin_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 gün

function secret() {
  return process.env.SESSION_SECRET ?? "insecure-dev-secret";
}

/** Basit imzalı token: "<exp>.<hmac>" */
function sign(exp: number) {
  return createHmac("sha256", secret()).update(String(exp)).digest("hex");
}

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export async function createSession() {
  const exp = Date.now() + MAX_AGE * 1000;
  const token = `${exp}.${sign(exp)}`;
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAuthenticated() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const [expStr, hmac] = token.split(".");
  if (!expStr || !hmac) return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  return safeEqual(hmac, sign(exp));
}

export function verifyPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;
  return safeEqual(input, expected);
}
