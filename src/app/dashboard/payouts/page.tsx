'use client';

import { useEffect, useMemo, useState } from "react";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { getPayouts, getContractors, getContractorForUser } from "@/data/dashboard";
import { useIdentity } from "@/components/dashboard/role-provider";
import { Role } from "@/config/roles";
import { FlowState } from "@/components/dashboard/flow-state";

const payouts = getPayouts();
const contractorMap = Object.fromEntries(getContractors().map((c) => [c.id, c.name]));

export default function PayoutsPage() {
  const identity = useIdentity();
  const role = identity.role;
  const contractor = getContractorForUser(identity.userId);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [blockers, setBlockers] = useState<string[]>([]);

  useEffect(() => {
    if (role === Role.CONTRACTOR) return;
    const load = async () => {
      try {
        const res = await fetch("/api/onboarding/state");
        if (!res.ok) return;
        const state = await res.json();
        const next: string[] = [];
        if (!state?.fundingSourceConnected) next.push("Connect a funding source before scheduling payouts");
        if (!state?.firstContractorInvited) next.push("Invite a contractor and add their payout method");
        setBlockers(next);
      } catch {
        setBlockers([]);
      }
    };
    load();
  }, [role]);

  const filtered = useMemo(() => {
    const contractorId = contractor?.id;
    return payouts.filter((p) => {
      const matchesSearch =
        !search ||
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        contractorMap[p.contractorId]?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "all" || p.status.toLowerCase() === status;
      if (role === Role.CONTRACTOR) {
        if (!contractorId) return false;
        return matchesSearch && matchesStatus && p.contractorId === contractorId;
      }
      return matchesSearch && matchesStatus;
    });
  }, [search, status, role, contractor?.id]);

  const headerLabel = role === Role.CONTRACTOR ? "Your payouts" : "Releases";

  if (role === Role.CONTRACTOR && !contractor) {
    return <p className="text-sm text-muted">No contractor profile linked to this user.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted">{headerLabel}</p>
          <h1 className="font-display text-2xl font-semibold">Payouts</h1>
        </div>
        {role !== Role.CONTRACTOR && (
          <div className="flex items-center gap-2">
            <Button variant="secondary">Schedule</Button>
            <Button>Release funds</Button>
          </div>
        )}
      </div>
      {role !== Role.CONTRACTOR && blockers.length > 0 && (
        <FlowState
          title="Payouts are blocked"
          description="Resolve the prerequisites before creating or releasing payouts."
          blockers={blockers}
          ctaHref="/dashboard/settings?tab=funding"
        />
      )}

      <Card className="bg-panel/80">
        <CardHeader className="flex flex-col gap-4 border-b border-white/5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted">Upcoming releases</p>
            <p className="text-xs text-muted">Clarity on every payment corridor</p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Input
              placeholder="Search payout"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-44"
            />
            <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full sm:w-40">
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="failed">Failed</option>
              <option value="paid">Paid</option>
            </Select>
          </div>
          <Badge tone="subtle">FX lock active</Badge>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center text-muted">
              <p className="font-semibold text-text">No payouts scheduled</p>
              <p className="text-sm">Schedule your next release to keep contractors informed.</p>
              {role !== Role.CONTRACTOR && <Button className="mt-2">Schedule payout</Button>}
            </div>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-[0.12em] text-muted">
                <tr>
                  <th className="py-2 pr-4">ID</th>
                  <th className="py-2 pr-4">Contractor</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-4">Currency</th>
                  <th className="py-2 pr-4">Method</th>
                  <th className="py-2 pr-4">ETA</th>
                  <th className="py-2 pr-4">Status</th>
                  {role !== Role.CONTRACTOR && <th className="py-2 pr-4">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((payout) => (
                  <tr key={payout.id} className="hover:bg-white/5">
                    <td className="py-3 pr-4 font-semibold">{payout.id}</td>
                    <td className="py-3 pr-4 text-muted">{contractorMap[payout.contractorId] ?? "—"}</td>
                    <td className="py-3 pr-4">{payout.amount.toLocaleString()}</td>
                    <td className="py-3 pr-4 text-muted">{payout.currency}</td>
                    <td className="py-3 pr-4 text-muted">{payout.method}</td>
                    <td className="py-3 pr-4 text-muted">{payout.eta}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={payout.status} />
                    </td>
                    {role !== Role.CONTRACTOR && (
                      <td className="flex flex-wrap gap-2 py-3 pr-4">
                        <Button size="sm" variant="secondary">
                          Retry
                        </Button>
                        <Button size="sm" variant="secondary">
                          View receipt
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
