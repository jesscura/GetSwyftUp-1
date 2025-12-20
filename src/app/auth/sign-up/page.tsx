'use client';

import { useState, FormEvent } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<"company" | "contractor">("company");
  const [inviteToken, setInviteToken] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    if (accountType === "contractor" && !inviteToken) {
      setMessage("Contractor sign-up requires a valid invite token.");
      return;
    }
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/app",
    });
    if (res?.error) {
      setMessage("Invalid credentials. Please confirm your access details.");
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
          <h1 className="font-display text-3xl font-semibold">Create your SwyftUp workspace</h1>
          <p className="text-sm text-muted">
            Set up your account in minutes. You can invite contractors after you’re ready.
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="flex items-center justify-between rounded-[var(--radius-card)] border border-white/5 p-3 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="accountType"
                  value="company"
                  checked={accountType === "company"}
                  onChange={() => setAccountType("company")}
                />
                I’m a Business
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="accountType"
                  value="contractor"
                  checked={accountType === "contractor"}
                  onChange={() => setAccountType("contractor")}
                />
                I’m a Contractor (invite-only)
              </label>
            </div>
            {accountType === "contractor" && (
              <p className="text-xs text-muted">Contractor accounts are typically created via invite.</p>
            )}
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
            {accountType === "contractor" && (
              <div className="space-y-2">
                <label className="text-sm text-muted">Invite token</label>
                <Input value={inviteToken} onChange={(e) => setInviteToken(e.target.value)} placeholder="Required" />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm text-muted">Password</label>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
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
