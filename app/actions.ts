"use server";

import { db } from "@/db";
import { submissions } from "@/db/schema";
import { submissionSchema } from "@/lib/validation";

export type SubmitState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
};

export async function submitCollab(
  _prev: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  const parsed = submissionSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    collabType: formData.get("collabType"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !errors[key]) errors[key] = issue.message;
    }
    return { ok: false, message: "Lütfen formu kontrol edin.", errors };
  }

  try {
    await db.insert(submissions).values(parsed.data);
  } catch (err) {
    console.error("submitCollab error", err);
    return {
      ok: false,
      message: "Başvuru kaydedilemedi. Lütfen daha sonra tekrar deneyin.",
    };
  }

  return {
    ok: true,
    message: "Başvurun alındı! En kısa sürede dönüş yapılacaktır.",
  };
}
