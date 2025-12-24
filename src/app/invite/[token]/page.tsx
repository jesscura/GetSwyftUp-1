import { acceptInviteAction, getDb } from "@/lib/data-service";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function InvitePage({ params }: { params: { token: string } }) {
  const db = await getDb();
  const invite = db.invites.find((i) => i.token === params.token);
  const company = invite ? db.org.name : "SwyftUp";

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <Card className="w-full max-w-xl border-white/5 bg-[color-mix(in_srgb,var(--panel)_92%,transparent)]">
        <CardHeader className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Contractor invite</p>
          <h1 className="font-display text-3xl font-semibold">Join {company}</h1>
          <p className="text-sm text-muted">Secure invite to onboard and get paid with SwyftUp.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {invite ? (
            <>
              <div className="flex items-center gap-2">
                <Badge tone="accent">Pending</Badge>
                <p className="text-sm text-muted">{invite.email}</p>
              </div>
              <form action={async () => acceptInviteAction(params.token)}>
                <Button type="submit" className="w-full">
                  Accept invite
                </Button>
              </form>
            </>
          ) : (
            <p className="text-sm text-[var(--brand-2)]">Invite not found or expired.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
