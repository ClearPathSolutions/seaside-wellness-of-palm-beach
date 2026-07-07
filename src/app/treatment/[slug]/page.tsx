import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { programs, therapies } from "@/data/catalog";
import { treatmentDetails } from "@/data/details";
import DetailLayout from "@/components/DetailLayout";
import { smartTitle } from "@/lib/seo";

const all = [...programs, ...therapies];

export function generateStaticParams() {
  return all.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = all.find((t) => t.slug === slug);
  if (!item) return {};
  const d = treatmentDetails.get(slug);
  return {
    title: d?.metaTitle ? smartTitle(d.metaTitle) : item.name,
    description: d?.metaDescription ?? item.short,
    alternates: { canonical: `/treatment/${slug}` },
  };
}

export default async function TreatmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = all.find((t) => t.slug === slug);
  if (!item) notFound();

  const isTherapy = therapies.some((t) => t.slug === slug);
  const pool = isTherapy ? therapies : programs;
  const related = pool.filter((t) => t.slug !== slug);

  return (
    <DetailLayout
      detail={treatmentDetails.get(slug)}
      fallback={item}
      eyebrow={isTherapy ? "Therapies" : "Treatment Programs"}
      crumbs={[{ label: "Treatment", href: "/treatment" }, { label: item.name }]}
      related={related}
      relatedBasePath="/treatment"
      relatedTitle={isTherapy ? "Other therapies" : "Other programs"}
    />
  );
}
