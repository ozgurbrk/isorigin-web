"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function LoginForm() {
  const [error, formAction, pending] = useActionState(login, null);
  return (
    <form action={formAction} className="space-y-3 rounded-xl card-surface p-5">
      <input
        name="password"
        type="password"
        placeholder="Şifre"
        autoFocus
        className="w-full rounded-lg border border-ink-600 bg-ink-800 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-gold-500/60"
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-gradient-to-b from-gold-400 to-gold-600 px-4 py-2.5 text-sm font-bold uppercase text-ink-900 disabled:opacity-50"
      >
        {pending ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>
    </form>
  );
}
