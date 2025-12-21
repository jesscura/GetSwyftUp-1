import { MarketingPageTemplateProps } from "@/components/marketing/page-template";

export type MarketingPageContent = MarketingPageTemplateProps & {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
};

export const marketingPages: MarketingPageContent[] = [
  {
    slug: "product",
    seoTitle: "Product Overview | SwyftUp",
    seoDescription:
      "One workspace to onboard contractors, manage approvals, and pay globally with faster access to funds.",
    title: "One place to onboard, pay, and support global contractors.",
    description:
      "SwyftUp helps teams manage contractor onboarding, billing approvals, and payouts—with faster access to funds through a virtual debit card.",
    features: [
      { title: "Onboard in minutes", description: "Collect contractor details once. Keep profiles organized and audit-ready." },
      { title: "Pay globally with confidence", description: "Send payouts in multiple currencies with clear tracking and approvals." },
      { title: "Access funds faster", description: "Offer a virtual debit card for quick spending and smoother cash flow." },
    ],
    cta: {
      headline: "Make payouts the easiest part of working globally.",
      subhead: "Start with a free account—or book a demo for your team.",
      primary: { label: "Get Started", href: "/auth/sign-up" },
      secondary: { label: "Book a Demo", href: "/contact" },
    },
  },
  {
    slug: "product/onboarding",
    seoTitle: "Contractor Onboarding | SwyftUp",
    seoDescription:
      "Standardize contractor onboarding with smart forms, centralized profiles, and audit-friendly controls.",
    title: "Contractor onboarding that doesn’t slow you down.",
    description:
      "Gather the right info, keep records tidy, and standardize approvals for every contractor—without messy spreadsheets.",
    features: [
      { title: "Smart forms", description: "Collect key profile data with reusable templates." },
      { title: "Centralized profiles", description: "Store contractor details, payout preferences, and history in one place." },
      { title: "Audit-friendly", description: "Track changes and approvals for a clean paper trail." },
    ],
    cta: {
      headline: "Onboard contractors like a modern team.",
      subhead: "Standardize the process and reduce manual follow-ups.",
      primary: { label: "Get Started", href: "/auth/sign-up" },
      secondary: { label: "See Pricing", href: "/pricing" },
    },
  },
  {
    slug: "product/global-payments",
    seoTitle: "Global Payments | SwyftUp",
    seoDescription: "Simplify cross-border payouts with approvals, tracking, and predictable processing.",
    title: "Global payments, simplified.",
    description:
      "Send payouts across borders with a clear approval flow and predictable processing—built for distributed teams.",
    features: [
      { title: "Multi-currency payouts", description: "Pay contractors in their preferred currency." },
      { title: "Approval workflows", description: "Route payments to the right approvers before sending." },
      { title: "Payout tracking", description: "Know what’s pending, approved, and paid at a glance." },
    ],
    cta: {
      headline: "Pay contractors on time, every time.",
      subhead: "Move from manual transfers to a clean payout workflow.",
      primary: { label: "Get Started", href: "/auth/sign-up" },
      secondary: { label: "Book a Demo", href: "/contact" },
    },
  },
  {
    slug: "product/virtual-debit-card",
    seoTitle: "Virtual Debit Card | SwyftUp",
    seoDescription: "Give contractors faster access to funds with card controls and a smoother payout experience.",
    title: "Virtual debit cards for faster access to earnings.",
    description:
      "Help contractors access funds quicker with a virtual card experience designed for remote work.",
    features: [
      { title: "Instant spend readiness", description: "Reduce waiting time between payout and use." },
      { title: "Card controls", description: "Enable basic controls that keep spending predictable." },
      { title: "Cleaner payout experience", description: "A smoother way for contractors to receive and use funds." },
    ],
    cta: {
      headline: "Turn payouts into usable money—faster.",
      subhead: "Make the contractor experience a competitive advantage.",
      primary: { label: "Get Started", href: "/auth/sign-up" },
      secondary: { label: "See Pricing", href: "/pricing" },
    },
  },
  {
    slug: "product/billing-invoicing",
    seoTitle: "Billing & Invoicing | SwyftUp",
    seoDescription: "Collect invoices, standardize formats, and keep approvals moving for finance teams.",
    title: "Billing & invoicing without chaos.",
    description:
      "Collect invoices, standardize formats, and keep approvals moving—so finance stays in control.",
    features: [
      { title: "Invoice collection", description: "Centralize invoice submissions and reduce back-and-forth." },
      { title: "Consistent review", description: "Use the same checks for every contractor and team." },
      { title: "Approval clarity", description: "See what’s blocked, what’s approved, and what’s next." },
    ],
    cta: {
      headline: "Close the loop from invoice to payout.",
      subhead: "Simplify billing so payments become predictable.",
      primary: { label: "Get Started", href: "/auth/sign-up" },
      secondary: { label: "Book a Demo", href: "/contact" },
    },
  },
  {
    slug: "product/approvals-audit",
    seoTitle: "Approvals & Audit Trail | SwyftUp",
    seoDescription: "Keep approvals structured and audit-ready with clear exception handling.",
    title: "Approvals & audit trail built in.",
    description: "Create a clear, trackable process for who approved what—and when.",
    features: [
      { title: "Role-based approvals", description: "Route payment decisions to the right people." },
      { title: "Exception handling", description: "Flag unusual items and resolve them quickly." },
      { title: "Audit trail", description: "Maintain a clean record of actions and changes." },
    ],
    cta: {
      headline: "Stay compliant without slowing down.",
      subhead: "Keep control while moving fast.",
      primary: { label: "Get Started", href: "/auth/sign-up" },
      secondary: { label: "Book a Demo", href: "/contact" },
    },
  },
  {
    slug: "product/live-dashboard",
    seoTitle: "Live Dashboard | SwyftUp",
    seoDescription: "Real-time visibility for payouts, approvals, and exceptions across teams.",
    title: "A live dashboard for payouts, approvals, and exceptions.",
    description:
      "See contractor activity, payment status, and pending approvals—without digging through tools.",
    features: [
      { title: "Real-time visibility", description: "Track what’s happening across teams and contractors." },
      { title: "Approval queue", description: "Clear next steps for finance and operations." },
      { title: "Exception alerts", description: "Spot issues early and resolve fast." },
    ],
    cta: {
      headline: "Run contractor ops from one screen.",
      subhead: "Bring clarity to onboarding, invoicing, and payouts.",
      primary: { label: "Get Started", href: "/auth/sign-up" },
      secondary: { label: "Book a Demo", href: "/contact" },
    },
  },
  {
    slug: "product/integrations",
    seoTitle: "Integrations | SwyftUp",
    seoDescription: "Connect SwyftUp to your finance stack with accounting-ready exports and APIs.",
    title: "Integrations that fit your finance workflow.",
    description:
      "Connect SwyftUp to the tools you already use to reduce double-entry and manual work.",
    features: [
      { title: "Accounting ready", description: "Support clean exports and structured data." },
      { title: "Team workflow", description: "Keep approvals aligned with your internal process." },
      { title: "API-first mindset", description: "Built to integrate as you scale." },
    ],
    cta: {
      headline: "Spend less time copying data.",
      subhead: "Integrate once, move faster everywhere.",
      primary: { label: "Get Started", href: "/auth/sign-up" },
      secondary: { label: "View Docs", href: "/docs" },
    },
  },
  {
    slug: "solutions/startups",
    seoTitle: "Solutions for Startups | SwyftUp",
    seoDescription: "Standardize onboarding, approvals, and payouts from day one.",
    title: "For startups paying contractors globally.",
    description:
      "Move fast without breaking your finance process. Standardize onboarding, approvals, and payouts from day one.",
    features: [
      { title: "Fast setup", description: "Get up and running without heavy ops overhead." },
      { title: "Clear approvals", description: "Prevent surprise payouts and missed steps." },
      { title: "Contractor-friendly", description: "A smoother experience that helps you retain talent." },
    ],
    cta: {
      headline: "Scale your contractor ops with confidence.",
      subhead: "Start simple now, stay organized as you grow.",
      primary: { label: "Get Started", href: "/auth/sign-up" },
      secondary: { label: "See Pricing", href: "/pricing" },
    },
  },
  {
    slug: "solutions/agencies",
    seoTitle: "Solutions for Agencies | SwyftUp",
    seoDescription: "Keep invoices and payouts organized across clients with approvals and visibility.",
    title: "For agencies managing multiple contractors.",
    description:
      "Keep invoices and payouts organized across clients and teams—with clear visibility into what’s pending.",
    features: [
      { title: "Centralized contractor management", description: "One system across multiple projects." },
      { title: "Approval workflow", description: "Get sign-off before money moves." },
      { title: "Reliable payouts", description: "Reduce delays and improve contractor satisfaction." },
    ],
    cta: {
      headline: "Make your agency payouts predictable.",
      subhead: "Remove friction from invoice review to payout.",
      primary: { label: "Get Started", href: "/auth/sign-up" },
      secondary: { label: "Book a Demo", href: "/contact" },
    },
  },
  {
    slug: "solutions/finance-teams",
    seoTitle: "Solutions for Finance Teams | SwyftUp",
    seoDescription: "Reduce manual work, enforce approvals, and keep clean records for audits.",
    title: "For finance teams that need control.",
    description:
      "Reduce manual work, enforce approvals, and keep clean records—built for visibility and audit readiness.",
    features: [
      { title: "Approval control", description: "Route payouts through structured review." },
      { title: "Audit trail", description: "Track actions and changes automatically." },
      { title: "Operational clarity", description: "Know what’s blocked and why." },
    ],
    cta: {
      headline: "Bring order to global contractor payments.",
      subhead: "Less chaos. More control.",
      primary: { label: "Book a Demo", href: "/contact" },
      secondary: { label: "See Pricing", href: "/pricing" },
    },
  },
  {
    slug: "solutions/remote-workers",
    seoTitle: "Solutions for Remote Workers | SwyftUp",
    seoDescription: "Reduce payout friction and give faster access to funds for remote workers.",
    title: "For remote workers who want faster access to funds.",
    description:
      "Get paid and access money sooner with a payout experience designed for people working overseas and remotely.",
    features: [
      { title: "Lower friction", description: "Fewer steps between earning and using funds." },
      { title: "Virtual card access", description: "Spend online quickly, without waiting for physical cards." },
      { title: "Transparent fees", description: "Know what you’ll receive upfront." },
    ],
    cta: {
      headline: "Stop waiting on payday logistics.",
      subhead: "Get a modern payout experience built for remote work.",
      primary: { label: "Get Started", href: "/auth/sign-up" },
      secondary: { label: "Learn More", href: "/get-paid-faster" },
    },
  },
  {
    slug: "solutions/global-contractors",
    seoTitle: "Solutions for Global Contractors | SwyftUp",
    seoDescription: "Make cross-border payments simple with multi-currency support and predictable workflows.",
    title: "For global contractors and distributed teams.",
    description:
      "Make cross-border payments feel simple—standard onboarding, clear approvals, and dependable payouts.",
    features: [
      { title: "Multi-currency support", description: "Pay in currencies contractors actually want." },
      { title: "Predictable workflows", description: "Clear steps from invoice to payout." },
      { title: "Better contractor experience", description: "Reduce payment stress and build trust." },
    ],
    cta: {
      headline: "Build a contractor experience people recommend.",
      subhead: "Pay globally without the operational mess.",
      primary: { label: "Get Started", href: "/auth/sign-up" },
      secondary: { label: "See Pricing", href: "/pricing" },
    },
  },
  {
    slug: "solutions/enterprises",
    seoTitle: "Solutions for Enterprises | SwyftUp",
    seoDescription: "Standardize contractor operations across teams with audit trails and approvals.",
    title: "For enterprises with global contractor scale.",
    description:
      "Standardize contractor operations across teams, maintain audit trails, and keep approvals consistent worldwide.",
    features: [
      { title: "Standard processes", description: "One system across regions and departments." },
      { title: "Visibility at scale", description: "Dashboards and controls for finance operations." },
      { title: "Security-first", description: "Clear policies and a compliance-ready approach." },
    ],
    cta: {
      headline: "Enterprise control, modern UX.",
      subhead: "Book a demo to map SwyftUp to your workflow.",
      primary: { label: "Book a Demo", href: "/contact" },
      secondary: { label: "Contact Sales", href: "/contact" },
    },
  },
  {
    slug: "pricing",
    seoTitle: "Pricing | Global Contractor Payments",
    seoDescription: "Contractor payment pricing with transparent tiers, FX clarity, and built-in approvals.",
    primaryKeyword: "contractor payment pricing",
    secondaryKeywords: ["global payouts pricing", "FX fees transparency", "contractor payment plans", "remote team pricing"],
    title: "Pricing that keeps global contractor payments predictable.",
    description:
      "Choose a plan that matches your contractor volume and payout corridors. SwyftUp keeps fees transparent, separates FX markup, and includes approvals so finance teams can budget with confidence.",
    sections: [
      {
        heading: "Transparent tiers",
        paragraphs: [
          "Pick a tier that fits your current volume and upgrade only when you need to. Every plan includes onboarding, invoice intake, approvals, and payout tracking.",
        ],
        bullets: [
          "Clear monthly platform fees by team size",
          "Usage aligned to payout volume",
          "No hidden add-ons for approvals or audit logs",
        ],
      },
      {
        heading: "FX and payout clarity",
        paragraphs: [
          "We separate payout fees from FX markup so you always know the landed cost before sending money.",
          "Contractors see the same transparency, reducing back-and-forth on expected amounts.",
        ],
        bullets: [
          "FX markup shown over mid-market rate",
          "Per-transfer payout fees displayed pre-approval",
          "Corridor-specific timelines documented",
        ],
      },
      {
        heading: "Built-in controls included",
        paragraphs: [
          "Approvals, role-based access, and audit-ready logs come standard—no extra module required.",
          "This keeps finance in control while avoiding bloated enterprise pricing.",
        ],
      },
      {
        heading: "Help choosing a plan",
        paragraphs: [
          "If you’re migrating from manual bank transfers or another platform, we’ll map your corridors, volumes, and compliance needs to the right tier.",
        ],
      },
    ],
    features: [
      { title: "Predictable tiers", description: "Plans mapped to team size and payout volume." },
      { title: "FX visibility", description: "Markup over mid-market shown before approvals." },
      { title: "Controls included", description: "Approvals and audit logs are standard, not add-ons." },
    ],
    internalLinks: [
      { label: "Fees & FX breakdown", href: "/pricing/fees-fx" },
      { label: "Compare with GetThera", href: "/compare/getthera" },
      { label: "Security overview", href: "/security" },
      { label: "Contact sales", href: "/contact" },
    ],
    cta: {
      headline: "Choose a plan and start paying globally.",
      subhead: "See fees, compare tiers, and get started today.",
      primary: { label: "See Plans", href: "/pricing" },
      secondary: { label: "Book a Demo", href: "/contact" },
    },
  },
  {
    slug: "pricing/fees-fx",
    seoTitle: "Fees & FX | International Payout Transparency",
    seoDescription: "International payout fees broken down with FX markup visibility and corridor timelines.",
    primaryKeyword: "international payout fees",
    secondaryKeywords: ["FX markup transparency", "cross-border payout costs", "contractor payout fees", "mid-market rate"],
    title: "Fees, FX, and timelines—made clear before you pay.",
    description:
      "Understand exactly what you and your contractors will pay before sending money. SwyftUp separates FX markup from payout fees and shows expected timelines by corridor so you can plan cash flow confidently.",
    sections: [
      {
        heading: "Payout fee breakdown",
        paragraphs: [
          "See per-transfer fees before you submit a payout. Finance teams can approve with full visibility into cost components.",
        ],
        bullets: [
          "Flat or corridor-based payout fees shown upfront",
          "No surprise add-ons for approvals or tracking",
          "Contractors see what they’ll receive after fees",
        ],
      },
      {
        heading: "FX transparency",
        paragraphs: [
          "We display the FX markup over mid-market so totals stay predictable. You know the exact conversion used for each payout.",
        ],
        bullets: [
          "Live FX reference with markup disclosed",
          "Audit trail of conversion rate per payout",
          "Visibility for both payers and contractors",
        ],
      },
      {
        heading: "Processing times by corridor",
        paragraphs: [
          "Each corridor includes expected delivery times and what could delay a transfer, so teams can set the right expectations.",
        ],
        bullets: [
          "Clear status updates: pending, in review, paid",
          "Exceptions flagged early for required info",
          "Notifications to contractors when funds are sent",
        ],
      },
      {
        heading: "How to evaluate costs",
        paragraphs: [
          "Compare total landed costs—including FX—to your current provider. We’ll map high-volume corridors to ensure predictability.",
        ],
      },
    ],
    features: [
      { title: "Line-item clarity", description: "Fees shown before approval so finance can budget accurately." },
      { title: "FX visibility", description: "Markup over mid-market displayed for every payout." },
      { title: "Timeline expectations", description: "Corridor-specific delivery windows with status tracking." },
    ],
    internalLinks: [
      { label: "Pricing overview", href: "/pricing" },
      { label: "Compare with GetThera", href: "/compare/getthera" },
      { label: "Security", href: "/security" },
      { label: "Contact sales", href: "/contact" },
    ],
    cta: {
      headline: "No surprises. Just clear costs.",
      subhead: "Build trust with contractors and your finance team.",
      primary: { label: "See Pricing", href: "/pricing" },
      secondary: { label: "Compare with GetThera", href: "/compare/getthera" },
    },
  },
  {
    slug: "compare/getthera",
    seoTitle: "SwyftUp vs GetThera | Contractor Payments",
    seoDescription: "Compare SwyftUp vs GetThera on payout speed, FX transparency, and workflow control.",
    primaryKeyword: "SwyftUp vs GetThera",
    secondaryKeywords: ["GetThera alternative", "contractor payment comparison", "payout speed comparison", "FX fee transparency"],
    title: "SwyftUp vs GetThera: choose faster, clearer contractor payments.",
    description:
      "SwyftUp focuses on payout speed, transparent FX, and a contractor-first experience. Compare how we stack up against GetThera on access to funds, total cost clarity, and workflow simplicity.",
    sections: [
      {
        heading: "Where SwyftUp leads",
        paragraphs: [
          "Faster access to funds with a virtual debit card and predictable timelines.",
          "Transparent FX and fees shown before approval—no guessing at landed amounts.",
        ],
        bullets: [
          "Contractor-first virtual debit card experience",
          "Line-item FX markup and payout fees",
          "Lean UI designed for distributed teams",
        ],
      },
      {
        heading: "Workflow control for finance",
        paragraphs: [
          "Role-based approvals, clear exception handling, and audit-ready records are included without add-ons.",
          "Finance teams keep visibility across onboarding, invoice intake, and payouts in one place.",
        ],
        bullets: [
          "Approval routing by amount, team, or corridor",
          "Real-time dashboard for pending and paid items",
          "Exports that stay accounting-ready",
        ],
      },
      {
        heading: "Cost comparison approach",
        paragraphs: [
          "We separate FX markup from payout fees so you can compare true landed costs to GetThera.",
          "Evaluate corridors, volumes, and contractor experience side by side.",
        ],
      },
      {
        heading: "Decision checklist",
        paragraphs: [
          "Use this framework when choosing between SwyftUp and GetThera.",
        ],
        bullets: [
          "How fast do contractors access funds?",
          "Is FX markup disclosed over mid-market?",
          "Are approvals and audit logs included, or add-ons?",
          "Is the contractor experience modern and mobile-friendly?",
        ],
      },
    ],
    features: [
      { title: "Speed to funds", description: "Virtual debit card and predictable payout timelines." },
      { title: "Cost clarity", description: "FX and fees disclosed before approval to prevent surprises." },
      { title: "Workflow simplicity", description: "Onboarding, invoicing, approvals, and payouts in one platform." },
    ],
    internalLinks: [
      { label: "Pricing", href: "/pricing" },
      { label: "Fees & FX", href: "/pricing/fees-fx" },
      { label: "Security", href: "/security" },
      { label: "Why SwyftUp", href: "/why-swyftup" },
    ],
    cta: {
      headline: "See if SwyftUp is the better fit.",
      subhead: "Get started or book a demo for your team.",
      primary: { label: "Get Started", href: "/auth/sign-up" },
      secondary: { label: "Book a Demo", href: "/contact" },
    },
  },
  {
    slug: "blog",
    seoTitle: "Global Contractor Payments Blog | SwyftUp",
    seoDescription: "Guides and playbooks on global contractor payments, FX, and remote work finance.",
    primaryKeyword: "global contractor payments blog",
    secondaryKeywords: ["remote work finance tips", "contractor payout guides", "FX best practices", "finance ops playbooks"],
    title: "Insights on global contractor payments and remote work finance.",
    description: "Read actionable guides, playbooks, and product updates that help finance, ops, and contractors move money across borders with confidence.",
    sections: [
      {
        heading: "What we publish",
        paragraphs: [
          "Deep dives on payout rails, corridor timelines, and cost models.",
          "Templates for approvals, onboarding, and invoice reviews.",
        ],
        bullets: [
          "Finance operations playbooks",
          "Contractor experience best practices",
          "Product updates and roadmap context",
        ],
      },
      {
        heading: "Who it’s for",
        paragraphs: [
          "Finance and ops leaders running global teams, agencies managing multiple clients, and contractors who want clearer payouts.",
        ],
      },
      {
        heading: "How to use the blog",
        paragraphs: [
          "Bookmark pillar posts for your team onboarding, share corridor-specific guides with contractors, and stay updated on new SwyftUp features.",
        ],
      },
    ],
    features: [
      { title: "Global payout basics", description: "Understand rails, timelines, and common pitfalls." },
      { title: "Finance ops playbooks", description: "Approval workflows and audit readiness." },
      { title: "Remote work money tips", description: "How contractors manage cash flow abroad." },
    ],
    internalLinks: [
      { label: "Pricing", href: "/pricing" },
      { label: "Why SwyftUp", href: "/why-swyftup" },
      { label: "Help Center", href: "/help" },
      { label: "Contact", href: "/contact" },
    ],
    cta: {
      headline: "Want updates in your inbox?",
      subhead: "Subscribe for monthly insights and product news.",
      primary: { label: "Subscribe", href: "#subscribe" },
      secondary: { label: "See Product", href: "/product" },
    },
  },
  {
    slug: "help",
    seoTitle: "Help Center | Contractor Payment Support",
    seoDescription: "Contractor payment help center for setup, payouts, approvals, and troubleshooting.",
    primaryKeyword: "contractor payment help center",
    secondaryKeywords: ["SwyftUp support", "payout troubleshooting", "contractor onboarding help", "virtual card support"],
    title: "Help Center for global contractor payments.",
    description: "Find concise guides to set up payouts, track statuses, and resolve issues fast—whether you’re finance, ops, or a contractor.",
    sections: [
      {
        heading: "Start fast",
        paragraphs: [
          "Create your account, add contractor profiles, and connect payout preferences with step-by-step guides.",
        ],
        bullets: [
          "Account setup checklist",
          "Contractor onboarding templates",
          "First payout walkthrough",
        ],
      },
      {
        heading: "Payouts and timelines",
        paragraphs: [
          "Understand payout statuses, corridor timelines, and what to check when something is delayed.",
        ],
        bullets: [
          "Status definitions: pending, in review, paid",
          "Typical delivery times by region",
          "How to submit required documents quickly",
        ],
      },
      {
        heading: "Approvals and roles",
        paragraphs: [
          "Learn how approvals are routed, how to add approvers, and how to manage exceptions.",
        ],
        bullets: [
          "Configure approvers by team or amount",
          "Resolve exceptions before cutoff times",
          "Export approval history for audits",
        ],
      },
      {
        heading: "Cards, security, and access",
        paragraphs: [
          "Manage virtual debit cards, reset credentials, and review security recommendations.",
        ],
        bullets: [
          "Virtual card activation steps",
          "Access recovery and MFA tips",
          "Reporting suspicious activity",
        ],
      },
    ],
    features: [
      { title: "Getting started", description: "Set up your account and first payout quickly." },
      { title: "Payout support", description: "Timelines, statuses, and issue resolution steps." },
      { title: "Account & security", description: "Access management and security best practices." },
    ],
    internalLinks: [
      { label: "FAQs", href: "/faqs" },
      { label: "Fees & FX", href: "/pricing/fees-fx" },
      { label: "Security", href: "/security" },
      { label: "Contact support", href: "/contact" },
    ],
    cta: {
      headline: "Still need help?",
      subhead: "Contact support and we’ll get back to you.",
      primary: { label: "Contact Support", href: "/contact" },
      secondary: { label: "FAQs", href: "/faqs" },
    },
  },
  {
    slug: "faqs",
    seoTitle: "Contractor Payment FAQs | SwyftUp",
    seoDescription: "Contractor payment FAQs covering payouts, FX, security, and virtual debit cards.",
    primaryKeyword: "contractor payment FAQs",
    secondaryKeywords: ["payout timelines", "FX fees questions", "virtual debit card FAQ", "contractor onboarding FAQ"],
    title: "Frequently asked questions about SwyftUp.",
    description: "Straight answers to the most common questions on payouts, FX, security, and getting started.",
    sections: [
      {
        heading: "Payouts and fees",
        paragraphs: [
          "How long do payouts take? Most corridors complete within documented timelines shown before approval.",
          "What are the fees? We separate payout fees from FX markup and show both before you send.",
        ],
        bullets: [
          "See corridor timelines in the Help Center",
          "FX markup displayed over mid-market rate",
          "Contractors see what they will receive after fees",
        ],
      },
      {
        heading: "Virtual debit card",
        paragraphs: [
          "When is the card available? After your payout is approved, spend readiness follows shortly for online purchases.",
          "What controls exist? Basic controls help keep spending predictable.",
        ],
      },
      {
        heading: "Onboarding and approvals",
        paragraphs: [
          "How do we onboard contractors? Use templates to capture required details and route approvals before money moves.",
          "Who can approve payments? Role-based access lets you define approvers by team or amount thresholds.",
        ],
      },
      {
        heading: "Security and compliance",
        paragraphs: [
          "How is data protected? Sensitive data is encrypted in transit and at rest with role-based access.",
          "Can we get documentation? Yes—request questionnaires, DPA, and subprocessors list via contact.",
        ],
      },
    ],
    features: [
      { title: "How payouts work", description: "Timelines, fees, and approval steps in plain language." },
      { title: "Virtual card basics", description: "When funds are available and how to use them." },
      { title: "Security & compliance", description: "Data protection, roles, and documentation access." },
    ],
    internalLinks: [
      { label: "Help Center", href: "/help" },
      { label: "Pricing & Fees", href: "/pricing/fees-fx" },
      { label: "Security", href: "/security" },
      { label: "Contact", href: "/contact" },
    ],
    cta: {
      headline: "Have a question not listed?",
      subhead: "Reach out and we’ll help.",
      primary: { label: "Contact", href: "/contact" },
      secondary: { label: "Help Center", href: "/help" },
    },
  },
  {
    slug: "security",
    seoTitle: "Security & Compliance | SwyftUp",
    seoDescription: "Fintech security and compliance practices with clear controls, audit trails, and data protections.",
    primaryKeyword: "fintech security and compliance",
    secondaryKeywords: ["contractor payment security", "audit-ready controls", "role-based access", "secure payouts"],
    title: "Security and compliance that reduce buyer risk.",
    description:
      "SwyftUp applies a security-first approach to contractor payments with encryption, access controls, and audit-ready visibility. We avoid overpromising certifications and instead offer clear documentation that maps to your procurement checklist.",
    sections: [
      {
        heading: "Data protection by design",
        paragraphs: [
          "Sensitive information is encrypted in transit and at rest, with environment isolation for production workloads.",
          "We continuously review data handling to minimize exposure and keep records traceable.",
        ],
        bullets: [
          "Encryption for sensitive contractor and payout data",
          "Access minimized by role and need-to-know",
          "Logging for key data events to support investigations",
        ],
      },
      {
        heading: "Access, roles, and approvals",
        paragraphs: [
          "Role-based access control ensures the right approvers authorize payouts before funds move.",
          "Separation of duties reduces risk for finance and operations teams.",
        ],
        bullets: [
          "Granular roles for finance, ops, and reviewers",
          "Approval workflows configurable by amount or team",
          "Audit trail of who approved what and when",
        ],
      },
      {
        heading: "Reliability and monitoring",
        paragraphs: [
          "Operational alerts monitor payout flows and integrations so exceptions are caught early.",
          "Status reporting keeps teams informed about incidents or delays.",
        ],
      },
      {
        heading: "Documentation you can review",
        paragraphs: [
          "We provide security questionnaires, data flow overviews, and subprocessors lists on request.",
          "No inflated claims—just clear answers your procurement team can verify.",
        ],
      },
    ],
    features: [
      { title: "Encryption", description: "Protects sensitive data in transit and at rest." },
      { title: "Role-based controls", description: "Approvals and permissions matched to your team structure." },
      { title: "Audit-ready logs", description: "Traceable records for payouts and access changes." },
    ],
    internalLinks: [
      { label: "Data Processing Agreement", href: "/dpa" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Compare with GetThera", href: "/compare/getthera" },
      { label: "Contact for security docs", href: "/contact" },
    ],
    cta: {
      headline: "Need security documentation?",
      subhead: "Contact us for a security questionnaire or details.",
      primary: { label: "Contact", href: "/contact" },
      secondary: { label: "Book a Demo", href: "/contact" },
    },
  },
  {
    slug: "docs",
    seoTitle: "API Docs | SwyftUp",
    seoDescription: "Integrate onboarding, payouts, and reporting with secure API endpoints and webhooks.",
    title: "API Docs",
    description:
      "Build with SwyftUp. Integrate onboarding, payouts, and reporting into your workflows.",
    features: [
      { title: "Authentication", description: "Secure access patterns for your apps." },
      { title: "Payout endpoints", description: "Create, approve, and track payouts." },
      { title: "Webhooks", description: "Get real-time updates on status changes." },
    ],
    cta: {
      headline: "Want an integration walkthrough?",
      subhead: "Book a demo and we’ll map the API to your needs.",
      primary: { label: "Book a Demo", href: "/contact" },
      secondary: { label: "Get Started", href: "/auth/sign-up" },
    },
  },
  {
    slug: "status",
    seoTitle: "System Status | SwyftUp",
    seoDescription: "Current uptime and service health for SwyftUp APIs, dashboard, and payouts.",
    title: "System Status",
    description: "Current uptime and service health for SwyftUp.",
    features: [
      { title: "API status", description: "Operational metrics and incidents." },
      { title: "Dashboard status", description: "Availability for web app access." },
      { title: "Payout processing status", description: "Service updates and known delays." },
    ],
    cta: {
      headline: "Need incident updates?",
      subhead: "Subscribe to status notifications.",
      primary: { label: "Subscribe", href: "#status-subscribe" },
      secondary: { label: "Contact Support", href: "/contact" },
    },
  },
  {
    slug: "about",
    seoTitle: "About SwyftUp | Global Contractor Payments",
    seoDescription: "Meet the team building a global contractor payments platform with trusted controls.",
    primaryKeyword: "global contractor payments platform",
    secondaryKeywords: [
      "remote work finance",
      "cross-border payouts",
      "fintech for contractors",
      "virtual debit card payouts",
    ],
    title: "Built to modernize global contractor payments.",
    description:
      "SwyftUp exists to make cross-border payouts simple, predictable, and faster for contractors and the teams who rely on them. We combine transparent fees, built-in approvals, and a contractor-first experience so getting paid becomes the easiest part of remote work.",
    sections: [
      {
        heading: "Why we built SwyftUp",
        paragraphs: [
          "Global teams struggle with fragmented payout tools, unclear FX, and slow access to funds. SwyftUp removes that friction with a single platform for onboarding, approvals, and multi-currency payouts.",
          "Our focus is trust: clear timelines, transparent fees, and a predictable experience for finance leaders and contractors alike.",
        ],
        bullets: [
          "One platform for onboarding, billing, approvals, and payouts",
          "Transparent FX and fees shown before money moves",
          "Contractor-friendly virtual debit card for faster access to earnings",
        ],
      },
      {
        heading: "Founder credibility",
        paragraphs: [
          "SwyftUp is led by operators who have managed remote teams across regions. The product reflects lived experience navigating compliance checks, payout delays, and contractor retention.",
          "We focus on practical controls and usability—no enterprise bloat, just the essentials teams need to stay compliant and pay on time.",
        ],
        bullets: [
          "Built with finance, ops, and contractor feedback loops",
          "Security-first approach with clear approval trails",
          "Roadmap shaped by real remote work pain points",
        ],
      },
      {
        heading: "How teams use SwyftUp",
        paragraphs: [
          "Startups and agencies standardize onboarding, invoice intake, and approvals to avoid last-minute payout surprises.",
          "Finance teams get visibility into every step, while contractors see predictable timelines and transparent amounts.",
        ],
        bullets: [
          "Multi-currency payouts with status tracking",
          "Role-based approvals to control spend",
          "Audit-ready records without extra manual work",
        ],
      },
      {
        heading: "Our commitment to trust",
        paragraphs: [
          "We avoid overpromising certifications and instead provide clarity on our security posture, subprocessors, and data handling.",
          "Teams can request questionnaires, review policies, and map SwyftUp to their procurement checklist.",
        ],
      },
    ],
    features: [
      { title: "Global-first", description: "Cross-border payouts with predictable timelines and tracking." },
      { title: "Finance-grade controls", description: "Role-based approvals and audit-friendly records by default." },
      { title: "Contractor-first UX", description: "Virtual debit card access and transparent fees to build trust." },
    ],
    internalLinks: [
      { label: "See pricing", href: "/pricing" },
      { label: "Security & compliance", href: "/security" },
      { label: "Compare with GetThera", href: "/compare/getthera" },
      { label: "Contact the team", href: "/contact" },
    ],
    cta: {
      headline: "Talk with the team building SwyftUp.",
      subhead: "Get a walkthrough of our global contractor payments platform.",
      primary: { label: "Book a Demo", href: "/contact" },
      secondary: { label: "See Pricing", href: "/pricing" },
    },
  },
  {
    slug: "why-swyftup",
    seoTitle: "Why SwyftUp | Built for Remote Teams",
    seoDescription: "Contractor payment platform for remote teams that need speed, transparency, and control.",
    primaryKeyword: "contractor payment platform for remote teams",
    secondaryKeywords: ["global contractor payouts", "remote team payments", "transparent FX fees", "virtual debit card"],
    title: "Why SwyftUp is the contractor payment platform for remote teams.",
    description:
      "Remote teams need payouts that are fast, predictable, and transparent. SwyftUp brings onboarding, invoice intake, approvals, and payouts into one flow—built for finance rigor and a contractor-first experience.",
    sections: [
      {
        heading: "Built for distributed finance workflows",
        paragraphs: [
          "SwyftUp keeps approvals, payout timelines, and FX visibility in one place, so finance leaders can sign off with confidence.",
          "Clear roles and audit-ready logs reduce risk while keeping teams moving quickly.",
        ],
        bullets: [
          "Role-based approvals with clear exceptions",
          "Standardized invoice intake that cuts back-and-forth",
          "Live status for pending, approved, and paid items",
        ],
      },
      {
        heading: "Contractor-first experience",
        paragraphs: [
          "We focus on what contractors need: predictable payouts, transparent fees, and faster access to funds via a virtual debit card.",
          "A smooth payout experience helps you retain talent across regions.",
        ],
        bullets: [
          "Fee and FX clarity before money moves",
          "Virtual debit card for quicker spend readiness",
          "Notifications so contractors know what to expect",
        ],
      },
      {
        heading: "Operational simplicity for remote teams",
        paragraphs: [
          "Distributed teams avoid fragmented tools with SwyftUp’s unified onboarding, invoicing, and payout workflows.",
          "Less manual work for ops; fewer surprises for finance.",
        ],
        bullets: [
          "Single source of truth for contractor profiles and payout preferences",
          "Templates to standardize onboarding across regions",
          "Exports that stay accounting-ready",
        ],
      },
      {
        heading: "Proof points against GetThera",
        paragraphs: [
          "SwyftUp emphasizes speed to funds, transparent costs, and a clean contractor UX instead of enterprise-heavy workflows.",
          "Compare timelines, FX clarity, and contractor access to funds when evaluating platforms.",
        ],
        bullets: [
          "Faster access via virtual debit card experience",
          "Clear FX markup and payout fees shown upfront",
          "Lean, modern UI designed for remote teams",
        ],
      },
    ],
    features: [
      { title: "Speed to funds", description: "Virtual debit card plus predictable payout tracking." },
      { title: "Transparent costs", description: "See FX and fees before approval to prevent surprises." },
      { title: "Control with less admin", description: "Approvals and audit-ready records without manual work." },
    ],
    internalLinks: [
      { label: "Compare SwyftUp vs GetThera", href: "/compare/getthera" },
      { label: "Pricing", href: "/pricing" },
      { label: "Security", href: "/security" },
      { label: "Get Paid Faster", href: "/get-paid-faster" },
    ],
    cta: {
      headline: "See how SwyftUp serves remote teams.",
      subhead: "Start now or compare us directly to GetThera.",
      primary: { label: "Get Started", href: "/auth/sign-up" },
      secondary: { label: "Compare with GetThera", href: "/compare/getthera" },
    },
  },
  {
    slug: "careers",
    seoTitle: "Careers | SwyftUp",
    seoDescription: "Join a remote-friendly team building the future of global contractor payments.",
    title: "Careers",
    description: "Help us build the future of global contractor payments.",
    features: [
      { title: "Remote-friendly", description: "Work from anywhere." },
      { title: "Mission-driven", description: "Make payouts easier for global workers." },
      { title: "Small team, big impact", description: "Build fast and ship often." },
    ],
    cta: {
      headline: "Want to join SwyftUp?",
      subhead: "Send your resume and portfolio.",
      primary: { label: "Apply", href: "/contact" },
      secondary: { label: "Contact", href: "/contact" },
    },
  },
  {
    slug: "partners",
    seoTitle: "Partners | SwyftUp",
    seoDescription: "Partner with SwyftUp to build better global payment experiences.",
    title: "Partners",
    description: "Let’s build better global payment experiences together.",
    features: [
      { title: "Platform partners", description: "Integrations and joint solutions." },
      { title: "Referral partners", description: "Earn by introducing teams to SwyftUp." },
      { title: "Community partners", description: "Support remote worker communities." },
    ],
    cta: {
      headline: "Interested in partnering?",
      subhead: "Tell us about your audience and goals.",
      primary: { label: "Become a Partner", href: "/contact" },
      secondary: { label: "Contact", href: "/contact" },
    },
  },
  {
    slug: "press",
    seoTitle: "Press | SwyftUp",
    seoDescription: "News, media assets, and updates from SwyftUp.",
    title: "Press",
    description: "News, media assets, and updates from SwyftUp.",
    features: [
      { title: "Announcements", description: "Product and company updates." },
      { title: "Media kit", description: "Logos, screenshots, and brand assets." },
      { title: "Press inquiries", description: "Contact for interviews and stories." },
    ],
    cta: {
      headline: "Need something for an article?",
      subhead: "Reach out to our press contact.",
      primary: { label: "Contact", href: "/contact" },
      secondary: { label: "Download Media Kit", href: "#media-kit" },
    },
  },
  {
    slug: "contact",
    seoTitle: "Contact | SwyftUp",
    seoDescription: "Talk to sales, support, or partnerships and we’ll route you to the right person.",
    title: "Talk to SwyftUp",
    description: "Sales, support, or partnerships—send a message and we’ll route it to the right team.",
    features: [
      { title: "Sales", description: "Request a demo or ask product questions." },
      { title: "Support", description: "Help with setup, payouts, or access." },
      { title: "Partnerships", description: "Integrations and referrals." },
    ],
    cta: {
      headline: "Want a walkthrough?",
      subhead: "Book a time or send a message—we’ll respond ASAP.",
      primary: { label: "Book a Demo", href: "/contact" },
      secondary: { label: "Send Message", href: "/contact#contact-form" },
    },
  },
  {
    slug: "get-paid-faster",
    seoTitle: "Get Paid Faster as a Freelancer | SwyftUp",
    seoDescription: "Get paid faster as a freelancer with transparent fees, FX clarity, and virtual debit card access.",
    primaryKeyword: "get paid faster as a freelancer",
    secondaryKeywords: ["fast contractor payouts", "virtual debit card payouts", "transparent freelancer fees", "remote worker payments"],
    title: "Get paid faster—built for freelancers and remote contractors.",
    description:
      "SwyftUp shortens the time between invoice approval and usable funds. Freelancers get transparency on what they’ll receive, plus a virtual debit card for faster access to their earnings.",
    sections: [
      {
        heading: "Know exactly what you’ll receive",
        paragraphs: [
          "See FX and fees before payout so there are no surprises when funds land.",
        ],
        bullets: [
          "Line-item FX markup over mid-market",
          "Clear payout fees by corridor",
          "Status updates from pending to paid",
        ],
      },
      {
        heading: "Access funds faster",
        paragraphs: [
          "Use the virtual debit card to spend online sooner after approval. No waiting for physical cards or repeated bank delays.",
        ],
        bullets: [
          "Virtual debit card linked to your payouts",
          "Spend readiness shortly after approval",
          "Reduced friction for everyday expenses",
        ],
      },
      {
        heading: "Fewer steps, less chasing",
        paragraphs: [
          "SwyftUp keeps your profile, payout preferences, and invoices organized so finance teams can approve quickly.",
        ],
        bullets: [
          "Centralized profile and payment preferences",
          "Invoice submissions in a consistent format",
          "Notifications when approvals are done",
        ],
      },
      {
        heading: "Built for remote work realities",
        paragraphs: [
          "Whether you’re overseas or traveling, SwyftUp provides predictable payout timelines and a modern experience that respects your time.",
        ],
      },
    ],
    features: [
      { title: "Transparency first", description: "See FX and fees before payout so amounts are predictable." },
      { title: "Virtual debit card", description: "Spend online faster without waiting for physical cards." },
      { title: "Reliable timelines", description: "Clear status updates from invoice to payout." },
    ],
    internalLinks: [
      { label: "Pricing", href: "/pricing" },
      { label: "Fees & FX", href: "/pricing/fees-fx" },
      { label: "Help Center", href: "/help" },
      { label: "Security", href: "/security" },
    ],
    cta: {
      headline: "Upgrade your payout experience.",
      subhead: "Create an account and get started in minutes.",
      primary: { label: "Get Started", href: "/auth/sign-up" },
      secondary: { label: "See Virtual Debit Card", href: "/product/virtual-debit-card" },
    },
  },
  {
    slug: "privacy",
    seoTitle: "Privacy Policy | SwyftUp",
    seoDescription: "How SwyftUp collects, uses, and protects data for global contractor payments.",
    primaryKeyword: "SwyftUp privacy policy",
    secondaryKeywords: ["contractor data protection", "privacy practices", "data rights", "fintech privacy"],
    title: "Privacy Policy",
    description: "Learn how SwyftUp collects, uses, and safeguards data for your account and payment activity.",
    sections: [
      {
        heading: "What we collect",
        paragraphs: [
          "Account details, usage information, and transaction metadata needed to operate the service.",
        ],
        bullets: [
          "Profile and contact information",
          "Payout and transaction data for processing",
          "Technical logs to secure and improve the product",
        ],
      },
      {
        heading: "How we use your data",
        paragraphs: [
          "To provide services, prevent fraud, comply with legal obligations, and improve performance.",
        ],
      },
      {
        heading: "Your choices and rights",
        paragraphs: [
          "You can request access, corrections, or deletion where applicable and manage communication preferences.",
        ],
      },
      {
        heading: "Placeholder notice",
        paragraphs: [
          "This is a placeholder summary. Replace with the approved, full Privacy Policy that details collection, use, retention, lawful bases, and data subject rights.",
        ],
      },
    ],
    features: [
      { title: "What we collect", description: "Basic account, usage, and transaction-related data." },
      { title: "How we use it", description: "To provide services, prevent fraud, and improve performance." },
      { title: "Your rights", description: "Access, deletion, and preference controls." },
    ],
    cta: {
      headline: "Questions about privacy?",
      subhead: "Contact us for clarification.",
      primary: { label: "Contact", href: "/contact" },
      secondary: { label: "Security", href: "/security" },
    },
  },
  {
    slug: "terms",
    seoTitle: "Terms of Service | SwyftUp",
    seoDescription: "Terms of service outlining account use, payments, and acceptable use for SwyftUp.",
    primaryKeyword: "SwyftUp terms of service",
    secondaryKeywords: ["contractor payment terms", "acceptable use", "service limitations", "billing terms"],
    title: "Terms of Service",
    description: "Understand the terms that govern your use of SwyftUp, including account responsibilities, payments, and acceptable use.",
    sections: [
      {
        heading: "Account responsibilities",
        paragraphs: [
          "How accounts are created, who can access them, and obligations to keep credentials secure.",
        ],
      },
      {
        heading: "Payments and fees",
        paragraphs: [
          "Details on platform charges, payout fees, FX considerations, and billing cycles.",
        ],
      },
      {
        heading: "Acceptable use and limitations",
        paragraphs: [
          "What is permitted, prohibited activities, and how we handle violations.",
        ],
      },
      {
        heading: "Disputes and changes",
        paragraphs: [
          "How disputes are addressed, and how updates to the Terms are communicated.",
          "Placeholder notice: replace this summary with the full, approved Terms of Service reviewed by legal.",
        ],
      },
    ],
    features: [
      { title: "Account terms", description: "Responsibilities and acceptable use." },
      { title: "Payments & fees", description: "How billing and payouts are handled." },
      { title: "Limitations", description: "Liability and dispute policies." },
    ],
    cta: {
      headline: "Need help understanding the terms?",
      subhead: "Contact us and we’ll help.",
      primary: { label: "Contact", href: "/contact" },
      secondary: { label: "FAQs", href: "/faqs" },
    },
  },
  {
    slug: "cookies",
    seoTitle: "Cookie Policy | SwyftUp",
    seoDescription: "Cookie policy detailing essential, analytics, and preference cookies with management options.",
    primaryKeyword: "SwyftUp cookie policy",
    secondaryKeywords: ["cookie preferences", "analytics cookies", "essential cookies", "consent management"],
    title: "Cookie Policy",
    description: "Understand how SwyftUp uses cookies, what categories we rely on, and how you can manage preferences.",
    sections: [
      {
        heading: "Cookie categories",
        paragraphs: [
          "We use essential cookies for security and functionality, analytics cookies to improve performance, and preference cookies to remember choices.",
        ],
      },
      {
        heading: "How to manage preferences",
        paragraphs: [
          "You can update consent settings at any time via the preferences control.",
        ],
        bullets: [
          "Enable or disable analytics cookies",
          "Review essential cookies required for service delivery",
          "Withdraw consent where applicable",
        ],
      },
      {
        heading: "Placeholder notice",
        paragraphs: [
          "This is a placeholder summary. Replace with the full Cookie Policy and link it to a live preferences manager or modal for consent updates.",
        ],
      },
    ],
    features: [
      { title: "Essential", description: "Site functionality and security." },
      { title: "Analytics", description: "Understand usage and improve performance." },
      { title: "Preferences", description: "Manage your cookie settings." },
    ],
    cta: {
      headline: "Manage your preferences.",
      subhead: "Update your cookie settings anytime.",
      primary: { label: "Update Preferences", href: "#cookie-preferences" },
      secondary: { label: "Privacy", href: "/privacy" },
    },
  },
  {
    slug: "dpa",
    seoTitle: "Data Processing Agreement | SwyftUp",
    seoDescription: "Review SwyftUp’s data processing roles, security measures, and subprocessors.",
    primaryKeyword: "SwyftUp data processing agreement",
    secondaryKeywords: ["DPA", "data processing roles", "subprocessors list", "security measures"],
    title: "Data Processing Agreement (DPA)",
    description: "Understand how SwyftUp processes data on behalf of customers, including roles, safeguards, and subprocessors.",
    sections: [
      {
        heading: "Roles and definitions",
        paragraphs: [
          "Outlines controller vs processor responsibilities and how SwyftUp supports compliance obligations.",
        ],
      },
      {
        heading: "Security measures",
        paragraphs: [
          "Summarizes technical and organizational measures used to protect data during processing.",
        ],
      },
      {
        heading: "Subprocessors",
        paragraphs: [
          "Provides transparency into approved subprocessors and how changes are communicated.",
        ],
      },
      {
        heading: "Placeholder notice",
        paragraphs: [
          "This is a placeholder summary. Attach and link the signed DPA with the full subprocessors list and security controls.",
        ],
      },
    ],
    features: [
      { title: "Roles & responsibilities", description: "Controller vs processor definitions." },
      { title: "Security measures", description: "How data is safeguarded." },
      { title: "Subprocessors", description: "Transparency into service providers." },
    ],
    cta: {
      headline: "Need the DPA for procurement?",
      subhead: "Contact us for the latest version.",
      primary: { label: "Contact", href: "/contact" },
      secondary: { label: "Book a Demo", href: "/contact" },
    },
  },
];

export function getMarketingPage(slug: string) {
  const normalized = slug.replace(/^\/|\/$/g, "");
  return marketingPages.find((page) => page.slug === normalized);
}

export function marketingStaticParams() {
  return marketingPages
    .filter((page) => page.slug !== "pricing")
    .map((page) => ({ slug: page.slug.split("/") }));
}
