import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketingPageTemplate } from "@/components/marketing/page-template";
import { getMarketingPage, marketingStaticParams } from "@/data/marketing-pages";

type PageParams = {
  slug?: string[];
};

export function generateStaticParams() {
  return marketingStaticParams();
}

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  const slug = (params.slug || []).join("/");
  const page = getMarketingPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle,
    description: page.seoDescription,
  };
}

export default function MarketingDynamicPage({ params }: { params: PageParams }) {
  const slug = (params.slug || []).join("/");
  const page = getMarketingPage(slug);

  if (!page) {
    return notFound();
  }

  return (
    <MarketingPageTemplate
      title={page.title}
      description={page.description}
      features={page.features}
      cta={page.cta}
      body={page.body}
    />
  );
}
