import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { areas } from "@/data/catalog";
import { areaDetails } from "@/data/details";
import DetailLayout from "@/components/DetailLayout";
import { smartTitle } from "@/lib/seo";

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = areas.find((a) => a.slug === slug);
  if (!item) return {};
  const d = areaDetails.get(slug);
  return {
    title: d?.metaTitle
      ? smartTitle(d.metaTitle)
      : `Addiction & Mental Health Treatment in ${item.name}`,
    description: d?.metaDescription ?? item.short,
    alternates: { canonical: `/areas-we-serve/${slug}` },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = areas.find((a) => a.slug === slug);
  if (!item) notFound();

  const related = areas.filter((a) => a.slug !== slug).slice(0, 6);

  return (
    <DetailLayout
      detail={areaDetails.get(slug)}
      fallback={item}
      eyebrow="Areas We Serve"
      crumbs={[{ label: "Areas We Serve", href: "/areas-we-serve" }, { label: item.name }]}
      related={related}
      relatedBasePath="/areas-we-serve"
      relatedTitle="Nearby communities"
    />
  );
}
