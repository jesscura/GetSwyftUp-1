'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getContractors, getInvoices, getPayouts, getCards } from "@/data/dashboard";
import { useRole } from "@/components/dashboard/role-provider";
import { Role } from "@/config/roles";

const tabs = ["Overview", "Invoices", "Payouts", "Card", "Documents/Compliance"] as const;

export default function ContractorProfilePage({ params }: { params: { id: string } }) {
  const contractor = useMemo(() => getContractors().find((c) => c.id === params.id), [params.id]);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Overview");
  const role = useRole();

  if (![Role.OWNER, Role.FINANCE_ADMIN].includes(role)) {
    return <p className="text-sm text-muted">You do not have access to this contractor profile.</p>;
  }

  if (!contractor) {
    return <p className="text-sm text-muted">Contractor not found.</p>;
  }

  const invoices = getInvoices().filter((inv) => inv.contractorId === contractor?.id);
  const payouts = getPayouts().filter((p) => p.contractorId === contractor?.id);
  const card = getCards().find((c) => c.contractorId === contractor?.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted">Contractor profile</p>
          <h1 className="font-display text-2xl font-semibold">{contractor?.name}</h1>
          <p className="text-sm text-muted">{contractor?.country}</p>
        </div>
        <Badge tone="accent">{contractor?.status}</Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant={tab === activeTab ? "primary" : "secondary"}
            size="sm"
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <Card className="bg-panel/80">
          <CardHeader>
            <p className="text-sm text-muted">Summary</p>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-4">
              <p className="text-sm text-muted">Preferred currency</p>
              <p className="text-xl font-semibold">{contractor?.currency}</p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-4">
              <p className="text-sm text-muted">Payment method</p>
              <p className="text-xl font-semibold">{contractor?.preferredMethod}</p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-4">
              <p className="text-sm text-muted">Card issued</p>
              <p className="text-xl font-semibold">{contractor?.cardIssued ? "Yes" : "No"}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "Invoices" && (
        <Card className="bg-panel/80">
          <CardHeader>
            <p className="text-sm text-muted">Invoices</p>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-[0.12em] text-muted">
                <tr>
                  <th className="py-2 pr-4">ID</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td className="py-3 pr-4 font-semibold">{inv.id}</td>
                    <td className="py-3 pr-4">
                      {inv.amount} {inv.currency}
                    </td>
                    <td className="py-3 pr-4 text-muted">{inv.status}</td>
                    <td className="py-3 pr-4 text-muted">{inv.submittedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {activeTab === "Payouts" && (
        <Card className="bg-panel/80">
          <CardHeader>
            <p className="text-sm text-muted">Payouts</p>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-[0.12em] text-muted">
                <tr>
                  <th className="py-2 pr-4">ID</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-4">Method</th>
                  <th className="py-2 pr-4">ETA</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {payouts.map((p) => (
                  <tr key={p.id}>
                    <td className="py-3 pr-4 font-semibold">{p.id}</td>
                    <td className="py-3 pr-4">
                      {p.amount} {p.currency}
                    </td>
                    <td className="py-3 pr-4 text-muted">{p.method}</td>
                    <td className="py-3 pr-4 text-muted">{p.eta}</td>
                    <td className="py-3 pr-4 text-muted">{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {activeTab === "Card" && (
        <Card className="bg-panel/80">
          <CardHeader>
            <p className="text-sm text-muted">Card</p>
          </CardHeader>
          <CardContent className="space-y-2">
            {card ? (
              <>
                <p className="text-sm">Card ending {card.last4}</p>
                <p className="text-sm text-muted">Status: {card.status}</p>
                <p className="text-sm text-muted">
                  Limit: {card.limit} {card.currency}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted">No card issued yet.</p>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "Documents/Compliance" && (
        <Card className="bg-panel/80">
          <CardHeader>
            <p className="text-sm text-muted">Documents & Compliance</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">Upload KYB/KYC documents and monitor expiration here.</p>
            <Button className="mt-3" asChild>
              <Link href="/dashboard/contractors">Upload document</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
