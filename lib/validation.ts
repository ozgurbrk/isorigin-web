import { z } from "zod";

export const COLLAB_TYPES = [
  "Sponsorluk",
  "Reklam",
  "Ortak Yayın",
  "Sunucu İş Birliği",
  "Diğer",
] as const;

export const submissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "İsim en az 2 karakter olmalı.")
    .max(80, "İsim çok uzun."),
  email: z.string().trim().email("Geçerli bir e-posta girin.").max(160),
  collabType: z.enum(COLLAB_TYPES, {
    errorMap: () => ({ message: "Bir iş birliği türü seçin." }),
  }),
  message: z
    .string()
    .trim()
    .min(10, "Mesaj en az 10 karakter olmalı.")
    .max(2000, "Mesaj çok uzun."),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;
