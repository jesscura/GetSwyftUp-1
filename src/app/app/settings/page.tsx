import { getDb } from "@/lib/mock-db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input, Select, Textarea } from "@/components/ui/input";

export default function SettingsPage() {
  const db = getDb();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Settings</p>
          <p className="text-sm text-muted">Company profile, roles, payout rails, and webhooks</p>
        </div>
        <Badge tone="subtle">RBAC ready</Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <p className="text-sm text-muted">Company profile</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input defaultValue={db.org.name} placeholder="Organization name" />
            <Input defaultValue="enterprise" placeholder="Plan" />
            <Textarea defaultValue="Global payouts and contractor billing" />
            <Button>Save profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-sm text-muted">Webhook keys</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input value="whsec_demo_live_key" readOnly />
            <Button variant="secondary">Rotate key</Button>
            <p className="text-sm text-muted">Keys are mocked for now; integrate provider when ready.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <p className="text-sm text-muted">Team members</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {db.users.map((user) => (
              <div key={user.id} className="flex items-center justify-between rounded-[var(--radius-card)] border border-white/5 px-3 py-3">
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-muted">{user.email}</p>
                </div>
                <Badge tone="subtle">{user.role}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-sm text-muted">Payout rails</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select defaultValue="wise">
              <option value="wise">Wise (multi-currency)</option>
              <option value="local">Local ACH</option>
              <option value="swift">SWIFT</option>
            </Select>
            <Input placeholder="Default currency" defaultValue="USD" />
            <Button>Save payout rail</Button>
            <p className="text-sm text-muted">Mock provider configuration stored server-side.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
