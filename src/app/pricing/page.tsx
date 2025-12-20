import { Metadata } from "next";
import { MarketingPageTemplate } from "@/components/marketing/page-template";
import { getMarketingPage } from "@/data/marketing-pages";

const pageContent = getMarketingPage("pricing");

export const metadata: Metadata = {
  title: pageContent?.seoTitle,
  description: pageContent?.seoDescription,
};

export default function PricingPage() {
  if (!pageContent) {
    return null;
  }

  return (
    <MarketingPageTemplate
      title={pageContent.title}
      description={pageContent.description}
      features={pageContent.features}
      cta={pageContent.cta}
    />
  );
}
