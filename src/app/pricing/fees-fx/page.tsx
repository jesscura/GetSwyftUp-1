import { Metadata } from "next";
import { MarketingPageTemplate } from "@/components/marketing/page-template";
import { getMarketingPage } from "@/data/marketing-pages";

const pageContent = getMarketingPage("pricing/fees-fx");

export const metadata: Metadata = {
  title: pageContent?.seoTitle ?? "Fees & FX | SwyftUp",
  description: pageContent?.seoDescription ?? "Understand payout fees and FX transparency before you send money.",
};

export default function FeesFxPage() {
  if (!pageContent) return null;
  return (
    <MarketingPageTemplate
      title={pageContent.title}
      description={pageContent.description}
      features={pageContent.features}
      cta={pageContent.cta}
      body={pageContent.body}
    />
  );
}
