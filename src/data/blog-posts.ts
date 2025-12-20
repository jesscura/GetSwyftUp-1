export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "global-payout-basics",
    title: "Global payout basics: timelines, rails, and fees",
    excerpt: "A quick primer on payout methods, common timelines, and how to keep contractors informed.",
    date: "2025-02-01",
    category: "Operations",
    content: [
      "Cross-border payouts combine banking rails, FX, and compliance checks. Set expectations by publishing the typical window for each corridor.",
      "Map when approvals must be completed to hit cutoffs. Keep contractors informed with a single status view and proactive alerts.",
    ],
  },
  {
    slug: "finance-ops-playbook",
    title: "A finance-ops playbook for contractor payments",
    excerpt: "How to structure approvals, documentation, and exception handling without slowing teams down.",
    date: "2025-01-18",
    category: "Finance",
    content: [
      "Require approvals by amount and region, and capture reasoning in an audit-ready log.",
      "Bundle invoices and payouts so reviewers see context, not just numbers. Standardize templates to reduce back-and-forth.",
    ],
  },
  {
    slug: "remote-work-cash-flow",
    title: "Helping remote contractors manage cash flow",
    excerpt: "Tactics to reduce payout friction and give talent faster access to earnings.",
    date: "2025-01-05",
    category: "Remote work",
    content: [
      "Offer virtual cards for immediate online spend while a bank withdrawal is en route.",
      "Publish transparent FX and fees so take-home pay is predictable. Provide status updates and expected arrival dates.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
