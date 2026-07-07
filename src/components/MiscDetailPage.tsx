import { miscDetails } from "@/data/details";
import DetailLayout from "./DetailLayout";
import type { Crumb } from "./PageHero";
import type { CatalogItem } from "@/data/types";
import { smartTitle } from "@/lib/seo";

export function getMiscMeta(
  slug: string,
  fallbackTitle: string,
  fallbackDesc: string,
  canonical: string
) {
  const d = miscDetails.get(slug);
  const title = d?.metaTitle ?? fallbackTitle;
  return {
    title: smartTitle(title),
    description: d?.metaDescription ?? fallbackDesc,
    alternates: { canonical },
  };
}

export default function MiscDetailPage({
  slug,
  image,
  eyebrow,
  crumbs,
  name,
  short,
  related,
  relatedBasePath,
  relatedTitle,
}: {
  slug: string;
  image: string;
  eyebrow: string;
  crumbs: Crumb[];
  name: string;
  short: string;
  related?: CatalogItem[];
  relatedBasePath?: string;
  relatedTitle?: string;
}) {
  const detail = miscDetails.get(slug);
  const fallback: CatalogItem = {
    slug,
    name: detail?.heading ?? name,
    short: detail?.heroSubtitle ?? short,
    image,
  };
  return (
    <DetailLayout
      detail={detail}
      fallback={fallback}
      eyebrow={eyebrow}
      crumbs={crumbs}
      related={related}
      relatedBasePath={relatedBasePath}
      relatedTitle={relatedTitle}
    />
  );
}
