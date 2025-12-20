'use client';

import { useState, FormEvent } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SignInPage() {
  const [email, setEmail] = useState("admin@swyftup.com");
  const [password, setPassword] = useState("demo1234!");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/app",
    });
    if (res?.error) {
      setError("Invalid credentials");
    } else {
      window.location.href = "/app";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <Card className="w-full max-w-md border-white/5 bg-[color-mix(in_srgb,var(--panel)_92%,transparent)]">
        <CardHeader className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Welcome back</p>
          <h1 className="font-display text-3xl font-semibold">Sign in to SwyftUp</h1>
          <p className="text-sm text-muted">
            Use the demo credentials or the password set in your environment variables.
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label className="text-sm text-muted">Email</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted">Password</label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
            </div>
            {error && <p className="text-sm text-[var(--brand-2)]">{error}</p>}
            <Button className="w-full" type="submit">
              Continue
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted">
            New here?{" "}
            <Link href="/auth/sign-up" className="text-[var(--accent)] underline underline-offset-4">
              Create access
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
