import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import Sidebar from "./Sidebar";

export const dynamic = "force-dynamic";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) redirect("/adminisorigin8789/login");

  return (
    <div className="relative z-0 min-h-screen bg-zinc-950 text-zinc-100">
      <Sidebar />
      <div className="flex min-h-screen flex-col lg:ml-56">
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
