'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

function TwoFactorCard() {
  const [enabled, setEnabled] = useState(false);
  const [secret, setSecret] = useState<string | undefined>();
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/auth/twofactor");
      if (!res.ok) return;
      const json = await res.json();
      setEnabled(Boolean(json.enabled));
      setSecret(json.secret);
      setRecoveryCodes(json.recoveryCodes ?? []);
    };
    load();
  }, []);

  const handleEnable = async () => {
    setStatus(null);
    const res = await fetch("/api/auth/twofactor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const json = await res.json();
    if (!res.ok) {
      setStatus(json.error ?? "Invalid code");
      return;
    }
    setEnabled(true);
    setRecoveryCodes(json.recoveryCodes ?? []);
    setStatus("Two-factor authentication enabled.");
  };

  const handleDisable = async () => {
    await fetch("/api/auth/twofactor", { method: "DELETE" });
    setEnabled(false);
    setSecret(undefined);
    setRecoveryCodes([]);
    setStatus("Two-factor authentication disabled.");
  };

  return (
    <Card className="bg-panel/80">
      <CardHeader>
        <p className="text-sm text-muted">Security · Two-factor authentication</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted">
          Admin roles must use 2FA when enabled. Scan the secret below in Google Authenticator/Authy, enter the 6-digit
          code, and store your recovery codes securely.
        </p>
        {!enabled && (
          <div className="rounded-[var(--radius-card)] border border-white/10 bg-white/5 p-3 text-sm">
            <p className="font-semibold">Setup secret</p>
            <p className="text-xs text-muted break-all">{secret ?? "Loading..."}</p>
          </div>
        )}
        {enabled && recoveryCodes.length > 0 && (
          <div className="rounded-[var(--radius-card)] border border-white/10 bg-white/5 p-3 text-sm">
            <p className="font-semibold">Recovery codes</p>
            <p className="text-xs text-muted">Each code can be used once.</p>
            <ul className="mt-2 grid gap-1 md:grid-cols-2">
              {recoveryCodes.map((c) => (
                <li key={c} className="rounded bg-black/40 px-2 py-1 font-mono text-xs">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
        {!enabled && (
          <div className="space-y-2">
            <label className="text-sm text-muted">Enter code to verify</label>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="123456"
              inputMode="numeric"
            />
            <Button onClick={handleEnable}>Enable 2FA</Button>
          </div>
        )}
        {enabled && (
          <Button variant="secondary" onClick={handleDisable}>
            Disable 2FA
          </Button>
        )}
        {status && <p className="text-sm text-[var(--brand-2)]">{status}</p>}
      </CardContent>
    </Card>
  );
}

export default function SettingsPage() {
  const [name, setName] = useState("SwyftUp Capital");
  const [country, setCountry] = useState("United States");
  const [currency, setCurrency] = useState("USD");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted">Workspace</p>
          <h1 className="font-display text-2xl font-semibold">Settings</h1>
        </div>
        <Badge tone="subtle">Security placeholders</Badge>
      </div>

      <Card className="bg-panel/80">
        <CardHeader>
          <p className="text-sm text-muted">Organization profile</p>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm text-muted">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted">Country</label>
            <Input value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted">Default currency</label>
            <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted">Notification preferences</label>
            <Textarea defaultValue="Approvals: immediate\nPayouts: daily digest" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted">Security</label>
            <Input disabled value="SSO coming soon" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-panel/80">
        <CardHeader>
          <p className="text-sm text-muted">Team members</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: "Workspace Owner", role: "OWNER" },
            { name: "Finance Admin", role: "FINANCE_ADMIN" },
          ].map((member) => (
            <div key={member.name} className="flex items-center justify-between rounded-[var(--radius-card)] border border-white/5 bg-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-semibold">{member.name}</p>
                <p className="text-xs text-muted">Role: {member.role}</p>
              </div>
              <Button size="sm" variant="secondary">
                Change role
              </Button>
            </div>
          ))}
          <Button size="sm">Invite member</Button>
        </CardContent>
      </Card>

      <TwoFactorCard />
    </div>
  );
}
