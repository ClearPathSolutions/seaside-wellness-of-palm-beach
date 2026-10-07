import Link from "next/link";
import type { Byline } from "@/lib/byline";
import { formatBylineDate } from "@/lib/byline";
import { editorialPolicyServed, EDITORIAL_POLICY_PATH } from "@/lib/editorial";

/**
 * Article byline, from the editorial policy package's
 * templates/article-byline.html. Sits directly under the post's H1. Each line
 * renders only when its data exists; getByline() has already dropped a
 * reviewer that has no review date.
 */
export default function ArticleByline({ byline }: { byline: Byline }) {
  const { author, reviewer, lastReviewed, modified } = byline;
  const meta = [
    lastReviewed && (
      <span key="reviewed">
        Last reviewed <time dateTime={lastReviewed}>{formatBylineDate(lastReviewed)}</time>
      </span>
    ),
    modified && (
      <span key="updated">
        Updated <time dateTime={modified}>{formatBylineDate(modified)}</time>
      </span>
    ),
    // Linked only where the policy is served, so production never links a 404.
    editorialPolicyServed && (
      <Link key="policy" href={EDITORIAL_POLICY_PATH}>
        Editorial policy
      </Link>
    ),
  ].filter(Boolean);

  if (!author && !reviewer && meta.length === 0) return null;

  return (
    <div className="article-byline">
      {author && (
        <p className="byline-line">
          Written by{" "}
          <Link href={author.bioPath} rel="author">
            {author.name}
          </Link>
        </p>
      )}
      {reviewer && (
        <p className="byline-line">
          Clinically reviewed by{" "}
          <Link href={reviewer.bioPath}>
            {reviewer.name}
            {reviewer.credentials && `, ${reviewer.credentials}`}
          </Link>
        </p>
      )}
      {meta.length > 0 && (
        <p className="byline-meta">{meta.flatMap((m, i) => (i === 0 ? [m] : [" · ", m]))}</p>
      )}
    </div>
  );
}
