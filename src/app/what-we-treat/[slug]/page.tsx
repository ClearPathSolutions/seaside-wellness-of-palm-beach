import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { conditions, substances, mentalHealth } from "@/data/catalog";
import { conditionDetails } from "@/data/details";
import DetailLayout from "@/components/DetailLayout";
import { smartTitle } from "@/lib/seo";

export function generateStaticParams() {
  return conditions.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = conditions.find((c) => c.slug === slug);
  if (!item) return {};
  const d = conditionDetails.get(slug);
  return {
    title: d?.metaTitle ? smartTitle(d.metaTitle) : item.name,
    description: d?.metaDescription ?? item.short,
    alternates: { canonical: `/what-we-treat/${slug}` },
  };
}

export default async function ConditionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = conditions.find((c) => c.slug === slug);
  if (!item) notFound();

  const pool = item.category === "substance" ? substances : mentalHealth;
  const related = pool.filter((c) => c.slug !== slug).slice(0, 6);

  return (
    <DetailLayout
      detail={conditionDetails.get(slug)}
      fallback={item}
      eyebrow={item.category === "substance" ? "Substance Addiction" : "Mental Health"}
      crumbs={[{ label: "What We Treat", href: "/what-we-treat" }, { label: item.name }]}
      related={related}
      relatedBasePath="/what-we-treat"
      relatedTitle={item.category === "substance" ? "Other addictions" : "Other conditions"}
    />
  );
}
