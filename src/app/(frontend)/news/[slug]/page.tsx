import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsArticleClient } from "@/components/pages/NewsArticleClient";
import { getContent } from "@/lib/content/get-content";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const { news } = await getContent("en");
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { news } = await getContent("en");
  const article = news.find((n) => n.slug === slug);
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
  const { news } = await getContent("en");
  if (!news.some((n) => n.slug === slug)) notFound();
  return <NewsArticleClient slug={slug} />;
}
