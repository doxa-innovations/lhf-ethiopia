import type { Metadata } from "next";
import { notFound } from "next/navigation";
import enContent from "@/content/en.json";
import { NewsArticleClient } from "@/components/pages/NewsArticleClient";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return enContent.news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = enContent.news.find((n) => n.slug === slug);
  if (!article) return { title: "News" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.image ? [{ url: article.image }] : undefined,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const exists = enContent.news.some((n) => n.slug === slug);
  if (!exists) notFound();
  return <NewsArticleClient slug={slug} />;
}
