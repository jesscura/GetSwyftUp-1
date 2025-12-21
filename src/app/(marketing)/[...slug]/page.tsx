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

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const resolved = await params;
  const slug = (resolved.slug || []).join("/");
  const page = getMarketingPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    keywords: page.secondaryKeywords || page.primaryKeyword ? [page.primaryKeyword, ...(page.secondaryKeywords || [])].filter(Boolean) : undefined,
  };
}

export default async function MarketingDynamicPage({ params }: { params: Promise<PageParams> }) {
  const resolved = await params;
  const slug = (resolved.slug || []).join("/");
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
