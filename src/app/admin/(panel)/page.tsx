import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { Editor } from "@/components/admin/Editor";
import { readContent } from "@/lib/content";
import { hasSession } from "@/lib/session";

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center text-sm font-semibold text-soft">
          Loading dashboard…
        </div>
      }
    >
      <Dashboard />
    </Suspense>
  );
}

async function Dashboard() {
  // Always render at request time: the session check reads the clock and cookies.
  await connection();
  // The proxy already redirects anonymous visitors; this is the real check.
  if (!(await hasSession())) redirect("/admin/login");
  const content = await readContent();
  return <Editor initial={content} />;
}
