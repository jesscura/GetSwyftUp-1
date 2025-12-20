import { Badge } from "@/components/ui/badge";

type Tone = "warning" | "success" | "critical" | "accent" | "subtle";

const toneMap: Record<string, { tone: Tone; label: string }> = {
  draft: { tone: "warning", label: "Draft" },
  submitted: { tone: "subtle", label: "Submitted" },
  approved: { tone: "accent", label: "Approved" },
  scheduled: { tone: "subtle", label: "Scheduled" },
  paid: { tone: "success", label: "Paid" },
  failed: { tone: "critical", label: "Failed" },
  pending: { tone: "warning", label: "Pending" },
  active: { tone: "success", label: "Active" },
  frozen: { tone: "warning", label: "Frozen" },
  closed: { tone: "critical", label: "Closed" },
  investigating: { tone: "warning", label: "Investigating" },
  open: { tone: "subtle", label: "Open" },
};

export function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase();
  const tone = toneMap[key] ?? { tone: "subtle", label: status };
  return <Badge tone={tone.tone}>{tone.label}</Badge>;
}
