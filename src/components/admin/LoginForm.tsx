"use client";

import { Loader2, LockKeyhole } from "lucide-react";
import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/admin/actions";

const initialState: LoginState = { error: null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="mt-7 flex flex-col gap-4">
      <div>
        <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-soft">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "login-error" : undefined}
          className="w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm font-medium outline-none transition-shadow focus:border-ink focus:ring-2 focus:ring-ink/10"
        />
      </div>
      {state.error && (
        <p id="login-error" role="alert" className="text-xs font-semibold text-red-600">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-white shadow-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {pending ? <Loader2 className="size-4 animate-spin" /> : <LockKeyhole className="size-4" />}
        Sign in
      </button>
    </form>
  );
}
