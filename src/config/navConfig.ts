export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  href?: string;
  highlight?: boolean;
  items?: NavLink[];
};

export const navConfig = {
  brand: {
    name: "SwyftUp",
    href: "/",
  },
  actions: {
    signIn: "/auth/sign-in",
    getStarted: "/auth/sign-up",
  },
  primary: [
    {
      label: "Product",
      items: [
        { label: "Overview", href: "/product" },
        { label: "Contractor Onboarding", href: "/product/onboarding" },
        { label: "Global Payments", href: "/product/global-payments" },
        { label: "Virtual Debit Card", href: "/product/virtual-debit-card" },
        { label: "Billing & Invoicing", href: "/product/billing-invoicing" },
        { label: "Approvals & Audit Trail", href: "/product/approvals-audit" },
        { label: "Live Dashboard", href: "/product/live-dashboard" },
        { label: "Integrations", href: "/product/integrations" },
      ],
    },
    {
      label: "Solutions",
      items: [
        { label: "For Startups", href: "/solutions/startups" },
        { label: "For Agencies", href: "/solutions/agencies" },
        { label: "For Finance Teams", href: "/solutions/finance-teams" },
        { label: "For Remote Workers", href: "/solutions/remote-workers" },
        { label: "For Global Contractors", href: "/solutions/global-contractors" },
        { label: "For Enterprises", href: "/solutions/enterprises" },
      ],
    },
    {
      label: "Pricing",
      items: [
        { label: "Pricing Plans", href: "/pricing" },
        { label: "Fees & FX Rates", href: "/pricing/fees-fx" },
        { label: "Compare with GetThera", href: "/compare/getthera" },
      ],
    },
    {
      label: "Resources",
      items: [
        { label: "Blog", href: "/blog" },
        { label: "Help Center", href: "/help" },
        { label: "FAQs", href: "/faqs" },
        { label: "Compliance & Security", href: "/security" },
        { label: "API Docs", href: "/docs" },
        { label: "System Status", href: "/status" },
      ],
    },
    {
      label: "Company",
      items: [
        { label: "About SwyftUp", href: "/about" },
        { label: "Why SwyftUp", href: "/why-swyftup" },
        { label: "Careers", href: "/careers" },
        { label: "Partners", href: "/partners" },
        { label: "Press", href: "/press" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      label: "Get Paid Faster",
      href: "/get-paid-faster",
      highlight: true,
    },
  ] as NavGroup[],
  footer: {
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "/product" },
          { label: "Virtual Debit Card", href: "/product/virtual-debit-card" },
          { label: "Integrations", href: "/product/integrations" },
        ],
      },
      {
        title: "Solutions",
        links: [
          { label: "For Startups", href: "/solutions/startups" },
          { label: "For Agencies", href: "/solutions/agencies" },
          { label: "For Remote Teams", href: "/solutions/remote-workers" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Blog", href: "/blog" },
          { label: "Help Center", href: "/help" },
          { label: "Compliance & Security", href: "/security" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
          { label: "Cookie Policy", href: "/cookies" },
          { label: "Data Processing Agreement", href: "/dpa" },
        ],
      },
    ],
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "X", href: "#" },
    ],
    tagline: "Built for global teams and the people who power them.",
  },
};

export type MarketingFooterColumn = (typeof navConfig.footer.columns)[number];
