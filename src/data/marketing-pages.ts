import { MarketingPageTemplateProps } from "@/components/marketing/page-template";

export type MarketingPageContent = MarketingPageTemplateProps & {
  slug: string;
  seoTitle: string;
  seoDescription: string;
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
    seoTitle: "Pricing | SwyftUp",
    seoDescription: "Transparent pricing with built-in workflows for global contractor payments.",
    title: "Pricing that stays simple as you grow.",
    description:
      "Start small, scale up. Transparent fees and clear value—built for global contractor payments.",
    features: [
      { title: "Transparent tiers", description: "Choose a plan that fits your team size." },
      { title: "Fair FX approach", description: "Clear FX and payout fees (no surprises)." },
      { title: "Built-in workflows", description: "Approvals, tracking, and audit trails included." },
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
    seoTitle: "Fees & FX | SwyftUp Pricing",
    seoDescription: "Understand payout fees and FX transparency before you send money.",
    title: "Fees & FX you can understand.",
    description:
      "Know what you’ll pay and what contractors will receive—before you send a payout.",
    features: [
      { title: "Clear payout fees", description: "Straightforward line items you can explain." },
      { title: "FX transparency", description: "Show rates and totals upfront." },
      { title: "Better value at scale", description: "Designed to stay competitive as volume grows." },
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
    seoTitle: "SwyftUp vs GetThera | Comparison",
    seoDescription: "See how SwyftUp delivers faster payouts, transparent costs, and cleaner workflows.",
    title: "SwyftUp vs GetThera",
    description:
      "A modern contractor payments platform built for speed, transparency, and access—without enterprise bloat.",
    features: [
      { title: "Faster access to funds", description: "Virtual debit card experience designed for contractors." },
      { title: "Transparent costs", description: "Clear fees and FX visibility." },
      { title: "Cleaner workflows", description: "Onboarding, invoicing, approvals, and payouts in one place." },
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
    seoTitle: "Blog | SwyftUp",
    seoDescription: "Insights, guides, and product updates for paying and working globally.",
    title: "Insights for paying and working globally.",
    description: "Guides, best practices, and product updates for finance teams and remote workers.",
    features: [
      { title: "Global payout basics", description: "Understand rails, timelines, and common pitfalls." },
      { title: "Finance ops playbooks", description: "Approval workflows and audit readiness." },
      { title: "Remote work money tips", description: "How contractors manage cash flow abroad." },
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
    seoTitle: "Help Center | SwyftUp",
    seoDescription: "Find answers fast for setup, payouts, onboarding, and troubleshooting.",
    title: "Help Center",
    description: "Find answers fast—setup, payouts, onboarding, and troubleshooting.",
    features: [
      { title: "Getting started", description: "Set up your account and first payout." },
      { title: "Payout support", description: "Understand statuses, timelines, and issues." },
      { title: "Account & security", description: "Manage access and keep data safe." },
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
    seoTitle: "FAQs | SwyftUp",
    seoDescription: "Quick answers to the most common SwyftUp questions.",
    title: "Frequently asked questions",
    description: "Quick answers to the most common SwyftUp questions.",
    features: [
      { title: "How payouts work", description: "Timelines, fees, and approval steps." },
      { title: "Virtual card basics", description: "How contractors access and use funds." },
      { title: "Security & compliance", description: "How SwyftUp protects your data." },
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
    seoTitle: "Compliance & Security | SwyftUp",
    seoDescription: "Security practices built for modern finance operations and audit readiness.",
    title: "Compliance & Security",
    description:
      "Security practices designed for modern finance operations—built to support audit readiness.",
    features: [
      { title: "Data protection", description: "Encryption and secure handling of sensitive information." },
      { title: "Access controls", description: "Role-based access and approvals." },
      { title: "Audit trail", description: "Track key actions for accountability." },
    ],
    cta: {
      headline: "Need security details?",
      subhead: "Contact us for security documentation.",
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
    seoTitle: "About SwyftUp",
    seoDescription: "Built to make global contractor payouts simpler, faster, and more accessible.",
    title: "About SwyftUp",
    description:
      "SwyftUp is built to support the people who work globally—making payouts simpler, faster, and more accessible.",
    features: [
      { title: "Built from real experience", description: "Designed by someone who understands remote work firsthand." },
      { title: "Global-first", description: "Made for cross-border payments and distributed teams." },
      { title: "Contractor-friendly", description: "A better experience that helps teams retain talent." },
    ],
    cta: {
      headline: "Want to build with us?",
      subhead: "Partner with SwyftUp or request a demo.",
      primary: { label: "Book a Demo", href: "/contact" },
      secondary: { label: "Contact", href: "/contact" },
    },
  },
  {
    slug: "why-swyftup",
    seoTitle: "Why SwyftUp",
    seoDescription: "Choose a platform that makes getting paid the easiest part of remote work.",
    title: "Why SwyftUp",
    description: "Because getting paid shouldn’t be the hardest part of remote work.",
    features: [
      { title: "Faster access", description: "Virtual debit card experience for day-to-day spending." },
      { title: "Transparent fees", description: "Clarity builds trust for teams and contractors." },
      { title: "Less admin", description: "Centralized workflows that reduce back-and-forth." },
    ],
    cta: {
      headline: "Choose a platform built for people.",
      subhead: "Start now or see how it compares.",
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
    title: "Contact",
    description: "Talk to sales, support, or partnerships. We’ll route you to the right person.",
    features: [
      { title: "Sales", description: "Product questions and demos." },
      { title: "Support", description: "Help with setup and payouts." },
      { title: "Partnerships", description: "Integration and referral opportunities." },
    ],
    cta: {
      headline: "Tell us what you need.",
      subhead: "We’ll respond as soon as possible.",
      primary: { label: "Send Message", href: "/contact" },
      secondary: { label: "Book a Demo", href: "/contact" },
    },
  },
  {
    slug: "get-paid-faster",
    seoTitle: "Get Paid Faster | SwyftUp",
    seoDescription: "Reduce payout delays and access funds sooner with SwyftUp’s virtual card experience.",
    title: "Get paid faster—without the usual friction.",
    description:
      "SwyftUp is built to reduce delays between earning and using your money, especially for overseas and remote workers.",
    features: [
      { title: "Fewer payout steps", description: "A smoother flow from approval to access." },
      { title: "Virtual card access", description: "Use funds online sooner." },
      { title: "Fee transparency", description: "Know what you’ll receive before you withdraw." },
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
    seoDescription: "Understand how SwyftUp collects, uses, and protects your data.",
    title: "Privacy Policy",
    description: "How SwyftUp collects, uses, and protects your data.",
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
    seoDescription: "The terms and conditions for using SwyftUp.",
    title: "Terms of Service",
    description: "The terms and conditions for using SwyftUp.",
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
    seoDescription: "Learn how SwyftUp uses cookies and how to manage your preferences.",
    title: "Cookie Policy",
    description: "How SwyftUp uses cookies to improve your experience.",
    features: [
      { title: "Essential cookies", description: "Site functionality and security." },
      { title: "Analytics cookies", description: "Understand usage and improve performance." },
      { title: "Preference controls", description: "Manage your cookie settings." },
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
    seoDescription: "Review how SwyftUp processes data on behalf of customers and safeguards information.",
    title: "Data Processing Agreement (DPA)",
    description: "Terms describing how SwyftUp processes data on behalf of customers.",
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
