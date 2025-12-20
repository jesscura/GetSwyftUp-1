import { addSupportMessageAction, getDb } from "@/lib/mock-db";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { StatusBadge } from "@/components/status-badge";

export default function SupportPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const db = getDb();
  const activeId = typeof searchParams.ticket === "string" ? searchParams.ticket : db.tickets[0]?.id;
  const ticket = db.tickets.find((t) => t.id === activeId) ?? db.tickets[0];

  return (
    <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
      <Card className="h-full">
        <CardHeader>
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Tickets</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {db.tickets.map((t) => (
            <a
              key={t.id}
              href={`/app/support?ticket=${t.id}`}
              className={`block rounded-[var(--radius-card)] border border-white/5 px-4 py-3 transition hover:border-[var(--accent)]/40 ${
                t.id === ticket?.id ? "bg-white/5" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold">{t.subject}</p>
                <StatusBadge status={t.status} />
              </div>
              <p className="text-xs text-muted">{new Date(t.updatedAt).toLocaleString()}</p>
            </a>
          ))}
        </CardContent>
      </Card>

      {ticket && (
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted">Details</p>
              <p className="text-lg font-semibold">{ticket.subject}</p>
            </div>
            <Badge tone="subtle">{ticket.status}</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {ticket.messages.map((msg) => (
                <div key={msg.at} className="rounded-[var(--radius-card)] border border-white/5 px-3 py-3">
                  <p className="font-semibold">{msg.from}</p>
                  <p className="text-sm text-muted">{msg.body}</p>
                  <p className="text-xs text-muted">{new Date(msg.at).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <form
              className="space-y-3"
              action={async (formData) => {
                "use server";
                const body = String(formData.get("message") ?? "");
                await addSupportMessageAction(ticket.id, body);
              }}
            >
              <Textarea name="message" placeholder="Add a reply" required />
              <Button type="submit">Send reply</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
