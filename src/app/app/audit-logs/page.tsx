import { getDb } from "@/lib/mock-db";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AuditLogsPage() {
  const db = getDb();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Audit logs</p>
          <p className="text-sm text-muted">Append-only trail for sensitive actions</p>
        </div>
        <Badge tone="subtle">{db.audit.length} events</Badge>
      </div>

      <Card>
        <CardHeader>
          <p className="text-sm text-muted">Recent activity</p>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted">
              <tr className="border-b border-white/5">
                <th className="px-3 py-2">Action</th>
                <th className="px-3 py-2">Actor</th>
                <th className="px-3 py-2">Metadata</th>
                <th className="px-3 py-2">At</th>
              </tr>
            </thead>
            <tbody>
              {db.audit.map((log) => {
                const actor = db.users.find((u) => u.id === log.actorUserId);
                return (
                  <tr key={log.id} className="border-b border-white/5">
                    <td className="px-3 py-3 font-semibold">{log.action}</td>
                    <td className="px-3 py-3 text-muted">{actor?.name ?? log.actorUserId}</td>
                    <td className="px-3 py-3 text-muted">{JSON.stringify(log.metadata)}</td>
                    <td className="px-3 py-3 text-muted">{new Date(log.createdAt).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
