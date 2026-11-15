import Link from "next/link";
import { LoginForm } from "@/components/admin/LoginForm";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-bg px-5">
      <div className="w-full max-w-[380px]">
        <div className="rounded-3xl bg-white p-8 shadow-card">
          <span className="grid size-11 place-items-center rounded-full bg-ink text-sm font-semibold text-white shadow-ink">
            FO
          </span>
          <h1 className="mt-6 text-[1.75rem] font-medium leading-tight tracking-[-0.03em]">
            <span className="text-muted">Site</span> dashboard
          </h1>
          <p className="mt-2 text-sm text-soft">Sign in to edit projects, pricing and content.</p>
          <LoginForm />
        </div>
        <p className="mt-5 text-center text-xs font-semibold text-soft">
          <Link href="/" className="underline-offset-4 hover:underline">
            ← Back to the site
          </Link>
        </p>
      </div>
    </main>
  );
}
