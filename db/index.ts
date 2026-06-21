import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

/**
 * Turso (libSQL) bağlantısı.
 * - Prod / Turso:  TURSO_DATABASE_URL = libsql://...  + TURSO_AUTH_TOKEN
 * - Lokal geliştirme: TURSO_DATABASE_URL = file:local.db  (token gerekmez)
 */
const url = process.env.TURSO_DATABASE_URL ?? "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient({ url, authToken });

export const db = drizzle(client, { schema });
export { schema };
