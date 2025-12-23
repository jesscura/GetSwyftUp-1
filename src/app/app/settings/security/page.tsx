"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SecuritySettingsPage() {
  const [loading, setLoading] = useState(true);
  const [secret, setSecret] = useState<string | null>(null);
  const [otpauthUrl, setOtpauthUrl] = useState<string | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[] | null>(null);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/auth/twofactor", { method: "GET" });
      const data = await res.json();
      // If already enabled, secret/otpauth may be undefined
      setSecret(data.secret ?? null);
      setOtpauthUrl(data.otpauthUrl ?? null);
      setBackupCodes(data.backupCodes ?? null);
    } catch (e) {
      setMessage("Failed to load 2FA status");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function startEnrollment() {
    setMessage(null);
    try {
      const res = await fetch("/api/auth/twofactor", { method: "GET" });
      const data = await res.json();
      setSecret(data.secret);
      setOtpauthUrl(data.otpauthUrl);
      setBackupCodes(data.backupCodes);
    } catch {
      setMessage("Failed to start enrollment");
    }
  }

  async function confirmEnrollment() {
    setMessage(null);
    try {
      const res = await fetch("/api/auth/twofactor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (res.ok) {
        setBackupCodes(data.backupCodes ?? null);
        setSecret(null);
        setOtpauthUrl(null);
        setCode("");
        setMessage("Two-factor enabled");
      } else {
        setMessage(data.error ?? "Invalid code");
      }
    } catch {
      setMessage("Failed to confirm 2FA");
    }
  }

  async function disable2FA() {
    setMessage(null);
    try {
      const res = await fetch("/api/auth/twofactor", { method: "DELETE" });
      if (res.ok) {
        setBackupCodes(null);
        setSecret(null);
        setOtpauthUrl(null);
        setMessage("Two-factor disabled");
      } else {
        const data = await res.json();
        setMessage(data.error ?? "Unable to disable");
      }
    } catch {
      setMessage("Failed to disable 2FA");
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <p className="text-sm text-muted">Two-factor authentication (TOTP)</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {message && <p className="text-sm text-accent">{message}</p>}
          {loading ? (
            <p className="text-sm text-muted">Loading…</p>
          ) : backupCodes ? (
            <div className="space-y-3">
              <p className="text-sm text-muted">Status: Enabled</p>
              <div className="space-y-2">
                <p className="text-sm">Recovery codes (store securely):</p>
                <div className="grid grid-cols-2 gap-2">
                  {backupCodes.map((c) => (
                    <div key={c} className="rounded bg-white/5 px-3 py-2 text-sm font-mono">{c}</div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={refresh}>Refresh</Button>
                <Button variant="ghost" onClick={disable2FA}>Disable</Button>
              </div>
            </div>
          ) : secret && otpauthUrl ? (
            <div className="space-y-3">
              <p className="text-sm text-muted">Status: Pending setup</p>
              <p className="text-sm">Add this secret to your authenticator:</p>
              <div className="rounded bg-white/5 px-3 py-2 font-mono text-sm break-all">{secret}</div>
              <p className="text-xs text-muted">OTPAuth URL:</p>
              <div className="rounded bg-white/5 px-3 py-2 font-mono text-xs break-all">{otpauthUrl}</div>
              <div className="flex items-center gap-3">
                <Input placeholder="Enter 6-digit code" value={code} onChange={(e) => setCode(e.target.value)} />
                <Button onClick={confirmEnrollment}>Confirm</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted">Status: Disabled</p>
              <Button onClick={startEnrollment}>Enable 2FA</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
