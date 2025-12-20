'use client';

import { useState, FormEvent } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("demo1234!");
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/app",
    });
    if (res?.error) {
      setMessage("Please use the shared demo password to create a workspace session.");
      return;
    }
    setMessage("Workspace created. Redirecting…");
    window.location.href = "/app";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <Card className="w-full max-w-md border-white/5 bg-[color-mix(in_srgb,var(--panel)_92%,transparent)]">
        <CardHeader className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Create workspace</p>
          <h1 className="font-display text-3xl font-semibold">Get started with SwyftUp</h1>
          <p className="text-sm text-muted">
            Use any email and the shared demo password to explore the dashboard. Roles default to Finance.
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label className="text-sm text-muted">Work email</label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@swyftup.com"
                type="email"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted">Password</label>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
              <p className="text-xs text-muted">Demo password defaults to demo1234! (configurable via env)</p>
            </div>
            {message && <p className="text-sm text-[var(--accent)]">{message}</p>}
            <Button className="w-full" type="submit">
              Create and continue
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted">
            Already onboarded?{" "}
            <Link href="/auth/sign-in" className="text-[var(--accent)] underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
