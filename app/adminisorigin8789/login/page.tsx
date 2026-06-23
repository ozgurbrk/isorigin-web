import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isAuthenticated()) redirect("/adminisorigin8789");
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-sm flex-col justify-center px-4">
      <h1 className="mb-1 text-center text-2xl font-bold text-gradient-gold">
        isorigin Â· Admin
      </h1>
      <p className="mb-6 text-center text-sm text-zinc-500">
        YÃ¶netim paneline giriÅŸ yap
      </p>
      <LoginForm />
    </main>
  );
}
