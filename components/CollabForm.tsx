"use client";

import { useActionState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { submitCollab, type SubmitState } from "@/app/actions";
import { COLLAB_TYPES } from "@/lib/validation";
import SectionTitle from "./SectionTitle";

const initial: SubmitState = { ok: false, message: "" };

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-red-400">{msg}</p>;
}

export default function CollabForm() {
  const [state, formAction, pending] = useActionState(submitCollab, initial);

  if (state.ok) {
    return (
      <section>
        <SectionTitle>İş Birliği</SectionTitle>
        <div className="sheen relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl card-surface p-8 text-center">
          <div className="brand-gradient pointer-events-none absolute -top-10 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full opacity-20 blur-3xl" />
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10">
            <CheckCircle2 className="h-7 w-7 text-green-400" />
          </span>
          <p className="text-sm text-zinc-200">{state.message}</p>
        </div>
      </section>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-ink-800/70 px-3.5 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-all focus:border-gold-500/60 focus:ring-2 focus:ring-gold-500/15";

  return (
    <section>
      <SectionTitle hint="Sponsorluk · Reklam · Ortaklık">
        İş Birliği Başvurusu
      </SectionTitle>
      <form
        action={formAction}
        className="sheen relative space-y-3 overflow-hidden rounded-2xl card-surface p-4"
      >
        <div>
          <input
            name="name"
            placeholder="Adın"
            className={inputCls}
            aria-label="Adın"
          />
          <FieldError msg={state.errors?.name} />
        </div>

        <div>
          <input
            name="email"
            type="email"
            placeholder="E-posta adresin"
            className={inputCls}
            aria-label="E-posta"
          />
          <FieldError msg={state.errors?.email} />
        </div>

        <div>
          <select
            name="collabType"
            defaultValue=""
            className={inputCls}
            aria-label="İş birliği türü"
          >
            <option value="" disabled>
              İş birliği türü seç
            </option>
            {COLLAB_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <FieldError msg={state.errors?.collabType} />
        </div>

        <div>
          <textarea
            name="message"
            rows={4}
            placeholder="Mesajın..."
            className={`${inputCls} resize-none`}
            aria-label="Mesaj"
          />
          <FieldError msg={state.errors?.message} />
        </div>

        {state.message && !state.ok && (
          <div className="flex items-center gap-2 text-xs text-red-400">
            <AlertCircle className="h-4 w-4" />
            {state.message}
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="brand-gradient flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-fuchsia-900/20 transition-all hover:brightness-110 hover:shadow-fuchsia-900/40 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          {pending ? "Gönderiliyor..." : "Başvuruyu Gönder"}
        </button>
      </form>
    </section>
  );
}
