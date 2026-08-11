# Seaside Wellness — Issue Register & Task List

**Last verified:** 2026-08-06 (second pass — 20 tasks closed, see [Counts](#counts))
**Build audited:** this repo, working tree ahead of `6cdf7ef` · Next.js 16.2.10 · **78** prerendered routes (was 77; +1 ported post)
**Nothing has been deployed.** All changes are local; cutover steps are still pending.
**Production audited:** `https://seasidewellnesspb.com` (WordPress, Yoast sitemap)

## Sources

**Local audit** (2026-08-06) — full code read + `next build` + `eslint` + 107-page crawl of the production build + link/asset/contrast/meta analysis + production↔build diff. Task IDs `SW-###`.

**[Portfolio QA workbook](https://docs.google.com/spreadsheets/d/1daiRElkRoKObt9KCsqFeXEhmtSBk5c1MQjUeaKx2nC8/edit)** — all **5 tabs** pulled:

| Tab | Rows | Seaside-relevant | Task IDs |
|---|---|---|---|
| **Vercel Build Issues** | 102 | 8 Seaside + 13 `ALL SITES` = **21** | `V####` |
| **Visual Issues** | 1,810 (1,500 real + 310 filler) | **98** substantive of 181 | `VIS-##` |
| **Broken Internal Links** | 30 | **0** — Dallas 16, Fort Worth 13 | — |
| **Verification Log** | 74 | 15 of our 21 IDs have full evidence | — |
| **Legend** | 28 | schema, verdicts, method notes | — |

**[QHG master bio document](https://docs.google.com/document/d/1MWL4ki6HDCcUN-1mh2EFU-6eoMVpwpSSRMDm58Me3oA/edit)** — 125 KB, portfolio-wide. The "Seaside Wellness PB" section (lines 943–1015) holds **9 people**; the site publishes **8**, each truncated to 2 paragraphs. Diffed sentence-by-sentence against [src/data/team.ts](src/data/team.ts) → **5 tasks**, IDs `BIO-#`. See [BIO — Team bios](#bio--team-bios).

**Staff headshot library** — `~/Downloads/Staff Headshots/Florida/` (8 files). Compared against the 8 images referenced in [src/data/team.ts](src/data/team.ts); **8 web-optimized masters now stored in [public/images/team/](public/images/team/)** (2.4 MB) → **3 tasks**, IDs `HS-#`. See [HS — Staff headshots](#hs--staff-headshots).

**Facility master-data row** (supplied 2026-08-06) — company, URL, levels of care, bed count, address, phone, founding year, GMB review link. Reconciled against [src/lib/site.ts](src/lib/site.ts), the JSON-LD, and live production → **5 tasks**, IDs `FAC-#`, one of them P0. See [FAC — Facility master data](#fac--facility-master-data-reconciliation).

### Calibration — how much to trust each tab

The workbook audited a Vercel preview built from a **~15 July 2026 content snapshot**. Two tabs have very different evidential weight, and the Legend is explicit about it:

- **Vercel Build Issues** — 74 of 102 rows were re-tested on 2026-07-28 with results recorded in the Verification Log. Of those, **49 needed a correction and 2 were withdrawn entirely.** The Legend's own warning: *"roughly two thirds of verified rows needed a correction."*
- **Visual Issues** — **none of these 1,810 rows carry a Verdict or Verified column. The entire tab is unverified.** Treat every count and instruction as a design proposal to confirm, not an established defect. I spot-checked all 98 Seaside rows against the code (results below); every heading they reference does exist in this build, so the tab is grounded — but the *fixes* are one reviewer's design opinion, not measured findings.
- **Broken Internal Links** — flagged `NOT YET VERIFIED`. Zero Seaside rows, consistent with my own audit finding 0 broken internal links.

Every workbook claim below was re-tested against this repo and against production on 2026-08-06. Where a finding no longer holds or was mis-scoped, that is stated under **Correction**. Ten workbook rows are closed as not-applicable with evidence — see [Verified Not Applicable](#verified-not-applicable).

> **Worth knowing:** the Verification Log recommends Seaside as a **reference build** for the portfolio — *"should be replaced with Marina Harbor or Seaside wherever the citation implies general good configuration"* (V0094 notes), after Ocean Coast was found to have 106 wrong canonicals. Seaside is in comparatively good shape; most of what follows is polish, not rescue.

## Counts

**Updated 2026-08-06 (second pass).** **28 tasks fully closed, 11 partially closed, 1 new finding (SW-030).** Nothing was deployed — every change is local.

| Section | Still open | Fully closed | Partial |
|---|---|---|---|
| **P0** — blocks launch | **3** | V0102, V0124 | SW-001, SW-002, SW-003 |
| **P1** — high | **5** | SW-004, SW-005, SW-006, SW-008, V0117 | SW-007, SW-009, SW-010, V0116-adj · open: SW-011 |
| **P2** — medium | **5** | SW-012, SW-013, SW-014, SW-015, SW-017, V0073 | open: SW-016, V0074, V0096, V0099, V0101 |
| **P3** — low / housekeeping | **2** | SW-018, SW-019, SW-020, SW-022, SW-025, SW-026, SW-027 | SW-021, SW-023 |
| **VIS** — design & content (unverified tab) | **7** | VIS-6, VIS-8, VIS-9, VIS-11 | open: VIS-1,2,3,4,5,7,10 |
| **BIO** — team bios | **4** | — | blocked on the master bio doc |
| **HS** — staff headshots | **1** | HS-1, HS-3 | open: HS-2 |
| **IMG** — image work order | **0** | IMG-1 (5 of 6 steps; VIS-7 + VID-3 remain in their own rows) | — |
| **VID** — brand reel | **4** | — | open: VID-1,2,3,4 |
| **FAC** — facility master data | **4** | FAC-2 | FAC-1, FAC-3, FAC-4 · open: FAC-5 |
| Doc cleanup | **0** | README item 6 | — |
| **New this pass** | **1** | — | open: SW-030 |
| **Total still open** | **36** *(was 63)* | **31** | of which 11 are partial |
| Closed as not-applicable (with evidence) | 10 workbook rows | | |

### What's genuinely blocked, and on what

| Needs | Tasks |
|---|---|
| **You / the practice** | SW-001 (Resend env vars) · SW-002 + FAC-4 (real review data or a Places key) · FAC-5 (publish bed count?) · VID-1 (reel on homepage?) |
| **Counsel** | SW-003 (Terms provenance + rewrite) · privacy effective date · 42 CFR Part 2 review — all scoped in [LEGAL-REVIEW.md](LEGAL-REVIEW.md) |
| **Someone who can hear the audio** | SW-007 (verify voiceover against the caption track) · VID-2 |
| **Someone who knows the property** | VID-3 (which aerials are this building) · the same question covers whether people on camera are staff, clients or talent |
| **Google Docs access** | BIO-1, BIO-2, BIO-3 (the master bio doc could not be opened this session) |
| **HR** | HS-2 (Jennifer Penny headshot — blocks BIO-1) · BIO-4 (Steve Ryan title) |
| **Video re-render** | SW-030 ("Substance Dependance" typo burned into the film) |
| **The reviewer** | VIS-1, VIS-2, VIS-3, VIS-5, VIS-7, VIS-10 — unverified tab, confirm before building |
| **The portfolio owner** | V0096, V0099, V0101 (slug standardisation — not this repo's call) |
| **An editorial/SEO decision** | SW-016 (thin posts) · V0074 (merge opiate/opioid) |
| **An infra decision** | SW-009 durable rate limit (WAF) · SW-023 CSP · VID-4 (video CDN) · SW-010 email BAA |
| **External verification URLs** | SW-011 (LegitScript / Joint Commission verify records) |

**Nothing on that list is blocked on code.** Everything code-solvable in the register has been done.

### New findings from this pass

Both are consequences of the same incomplete rebrand — `globals.css` redefined the `gold-*` tokens from warm gold to seafoam/teal but two places still carried the old palette.

| ID | Finding | Status |
|---|---|---|
| **SW-028** | `app/opengraph-image.tsx` still used the pre-rebrand warm gold (`#d8c193`, `#c7ac7b`, `#35302d`), so **every social share card was off-brand** against the seafoam site. | ✅ Fixed — now uses the brand tokens, mirrored as literals with a sync comment (`next/og` cannot read CSS custom properties). |
| **SW-029** | Primary buttons carried `shadow-…rgba(53,48,45,…)` — the old warm brown — in [Button.tsx](src/components/Button.tsx), [Header.tsx](src/components/Header.tsx) (×2) and [ContactForm.tsx](src/components/ContactForm.tsx), reading as a muddy cast under a teal button. `secondary` was already correctly tinted to `ocean-500`. | ✅ Fixed — tinted to `gold-700` (`50,96,82`), matching the existing pattern. |

### SW-030 · "Substance Dependance" is misspelled in the brand film `P2`

- [ ] **Task:** Re-render the brand film with the spelling corrected.

**Where:** the condition card at **≈38s** in `Seaside-Wellness-Brand-Story-Video-V2-VOICEOVER.mp4`, which plays on the **homepage** and **/tour**.

The card reads **"Substance Dependance"**. The correct spelling is **"Dependence"** — and it is a clinical term on a licensed treatment provider's brand film, in the sequence listing the conditions treated (anxiety, depression, PTSD, bipolar disorder). Found while transcribing the film for SW-007.

**Can only be fixed at source** — the text is burned into the video, so it needs re-rendering from the project file. Nothing in this repo can correct it.

**Interim:** the transcript and caption track in [src/data/brand-film.ts](src/data/brand-film.ts) deliberately use the **correct** spelling, so the text alternative and anything indexing it are right even while the visual is wrong. That is a considered choice, noted in the file: a transcript that faithfully reproduced the typo would propagate it.

Also worth knowing: **SW-026's orphaned entry turned out to be corrupted and to carry two claims flagged elsewhere** (a facility "10+ years" claim ruled out by FAC-3, and the BIO-3 outcomes sentence). Details under SW-026 — it changes that task from housekeeping to a small compliance win.

### Corrections to this register, made while implementing

| Row | Correction |
|---|---|
| **SW-008** | Prescribed `ink-500` throughout. That is measured on **white**; on `bg-cream` `ink-500` is **4.25:1** and still fails AA. The trust-strip eyebrow needed `ink-600`. |
| **SW-004** | Two symptoms not in the row: the 13 blog posts were already losing `og:site_name`/`og:locale`, and adding `openGraph` to a page *removes* its file-based `og:image`. Both fixed. |
| **SW-012** | The obvious fix creates a redirect **chain** — `trailingSlash` does not rewrite redirect destinations. |
| **SW-025** | 164 files, not 157 — HS-1 freed two more, plus the 5 starter SVGs. And 6 files must be **kept** (staged headshot masters). |
| **V0124** | The post's closing section carries a **level-of-care claim that contradicts the licensed scope** — an unrecorded instance of FAC-2, still live on production. |

All 21 Vercel-Build-Issues rows, all 98 substantive Visual-Issues rows, and all 9 Seaside people in the master bio doc are accounted for — none dropped. Row-level traceability for the 98 is in [Appendix B](#appendix-b--visual-issues-row-map).

---

# P0 — Blocks launch

### SW-001 · Contact form silently discards submissions when `RESEND_API_KEY` is unset

- [~] **Code half done 2026-08-06. Still blocked on the env vars — remains P0.**

**Done:** step 2. The no-key branch now returns `false` when `NODE_ENV === "production"` ([route.ts](src/app/api/contact/route.ts)), so an unconfigured transport surfaces the "please call us instead" error path instead of a false thank-you screen. Development still logs and reports success, so the form stays usable offline.

**Still required (needs a human):** steps 1 and 3 — set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` in Vercel, verify a sending domain, and add a second channel or inbox alert. Until then the form now **correctly fails** rather than silently succeeding, which is safer but still means no submissions are delivered.

**Where:** [src/app/api/contact/route.ts:23-28](src/app/api/contact/route.ts#L23-L28)

**Why:** `deliver()` returns `true` when no API key is present — it `console.log`s the payload and reports success. The client then renders "Thank you for reaching out… a member of our admissions team will reach out shortly" ([src/components/ContactForm.tsx:46-58](src/components/ContactForm.tsx#L46-L58)). On a 24/7 admissions site for a treatment centre, a prospective patient in crisis gets a confirmation screen while the inquiry goes nowhere. This is the single highest-consequence defect in the build.

**Fix:**
1. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` in Vercel → Settings → Environment Variables, and verify a sending domain (the current default `onboarding@resend.dev` will not deliver reliably in production).
2. Change the no-key branch to return `false` when `NODE_ENV === "production"` so the form surfaces the "please call us instead" error path rather than a false success.
3. Add a second delivery channel or an inbox alert so a Resend outage is visible.

**Acceptance:** submit the live form; the message arrives in the admissions inbox. Then unset the key in a preview deploy and confirm the form shows the failure message, not the thank-you screen.

---

### SW-002 · Placeholder testimonials are still live

- [~] **Exposure closed 2026-08-06. Real reviews still to be supplied.**

**Done:** all three fabricated quotes and the `testimonials` export are deleted. Verified: **0 of 72 rendered pages** contain any of them (the only surviving mention is the warning comment in [site-content.ts](src/data/site-content.ts) explaining what was removed, so nobody repopulates it).

**Replaced with a real-review mirror**, driven by a `googleReviews: GoogleReview[]` array that is **deliberately empty**. The section renders review cards only when it holds genuine, attributable entries, so nothing invented can ship. What *does* render now is the honest version — links to the live listing:

- **Read our Google reviews** → `site.reviewsUrl`
- **Leave a review** → `site.reviewUrl` (opens the GBP review dialog)

Both verified to resolve (HTTP 200) against place ID `ChIJnYAXE9PZ2IgREdolATVwAMM`. Star rendering, "via Google" attribution and per-reviewer naming are all built and waiting on data.

**⚠️ Why the reviews are not mirrored yet — I tried.** Google Maps and `search.google.com/local/reviews` both render review content **client-side**; the server responses contain the business name and address but no review text, so there is nothing to scrape. Mirroring needs one of:

1. **A Google Places API key** — Place Details returns up to 5 reviews. This is the sanctioned route and keeps the mirror in sync. Note Google's terms require attribution and restrict caching.
2. **The review text pasted in** — I publish it attributed and cited, no API dependency.

Either is a one-edit drop into `googleReviews`. **This also satisfies VIS-4**, which asked for exactly this section.

**Still do not add `aggregateRating`** to the JSON-LD until real reviews render on-page and the rating is accurate.

**Where:** [src/data/site-content.ts:98-117](src/data/site-content.ts#L98-L117) → rendered at [src/app/page.tsx:356-375](src/app/page.tsx#L356-L375)

**Why:** All three quotes are invented copy attributed to "Alumnus" / "Parent of a client". Publishing fabricated testimonials as a healthcare advertiser is an FTC Act §5 exposure (and the FTC's Endorsement Guides specifically reach invented consumer endorsements). The code comment already flags this; it has not been actioned.

**Fix:** obtain written consent for real quotes, or delete the section and the `testimonials` export. Do not ship placeholder social proof.

**Acceptance:** no quote on the site is un-sourced; consent records retained.

---

### SW-003 · Terms of Service is marketplace boilerplate

- [~] **Prep pass done 2026-08-06. Counsel review still required — stays P0.**

Full review pack written to **[LEGAL-REVIEW.md](LEGAL-REVIEW.md)**: all 25 Terms sections classified, the Privacy Notice assessed, and a launch-blocker checklist. Summary of what changed and what didn't:

**⚠️ The Terms are worse than "boilerplate" — this is the headline.** The document is a **consumer-review / local-directory marketplace ToS with the brand find-replaced**. §8 promises *"compliments or friend requests from other Users"* and a *"weekly e-mail newsletter about happenings in your neighborhood"*; §18 governs *"Deals or Gift Certificates"*; §51 disclaims liability for *"the businesses or advertisers listed on the Site"*. There is even a find-replace artifact in §21 (`"Seaside Wellness , its parents"`). I confirmed against `src/` that **none** of these features exist — no accounts, signup, cart, checkout, deals, events, or user-generated content.

**The phrasing tracks a well-known national platform's public Terms closely enough that provenance must be established before launch** — publishing another company's Terms largely verbatim is a copyright exposure independent of fit. That is now the highest-priority item.

**Three substantive defects found, beyond fit:**
1. **The survival clause is wrong and against your interest.** §24 says sections *"1, 5, 6, 10 – 14"* survive *"including our right to use Your Content as detailed in Section 5"* — but §5 is **Eligibility**; the content licence is §9b. And the surviving set **omits §21 Indemnity and §22 Limitation of Liability**, normally the first clauses a drafter wants to survive.
2. **Binds users to five documents, four of which don't exist** — Content Guidelines (×3), General Terms for Deals (×3), Infringement Policy, Event Terms. §14 extracts a *representation* that the user has read the nonexistent Content Guidelines. None are even hyperlinked.
3. **No healthcare provisions at all** — no medical disclaimer, no-doctor-patient-relationship, or emergency instruction anywhere in the Terms. The current document protects a marketplace, not a treatment provider.

**Privacy Notice is in much better shape** — it is the **HHS OCR Model Notice**, the correct starting point. But: **no effective date**, which 45 CFR §164.520(b)(1)(v)(C) requires. And the most important gap — **42 CFR Part 2** governs SUD treatment records far more strictly than HIPAA, so a generic HIPAA notice may be insufficient for a detox/SUD residential provider.

**Fixed (mechanical only — no operative clause touched):**
- **Privacy: bullets rendered three times each.** Sub-bullets had been concatenated into their parent list item *and* duplicated as standalone lists. Removed 3 duplicate blocks (62 → 59) and un-concatenated 2 items. Verified on the rendered page: 6 occurrences → 2 (one in the DOM, one in the RSC payload).
- **Privacy: run-on artifact** — *"Preventing diseaseHelping with product recallsReporting adverse reactions…"* with no spaces, a flattened HTML list. Now a proper parent + five bullets.
- **Privacy: the "page 1" print artifact** → the published phone and email. Still needs a designated Privacy Officer.
- **Terms: the missing revision date.** The Terms promise to publish one; now renders "Last revised August 6, 2026" from [src/data/legal.ts](src/data/legal.ts).
- **Added `privacyEffective`** with rendering support, deliberately left `null` so **no date renders** — only the practice can set a legally operative effective date, and defaulting it would fabricate a compliance fact.

**Not done, deliberately:** no operative clause was deleted. [LEGAL-REVIEW.md](LEGAL-REVIEW.md) lists **5 sections recommended for deletion** (§8, §11, §14, §17, §18) awaiting your approval. Note that deleting them forces renumbering, which breaks §24's cross-references further — so both must be done in the same pass.

**Where:** [src/data/content/terms.json](src/data/content/terms.json) → [src/app/terms/page.tsx](src/app/terms/page.tsx)

**Why:** The Terms reference reviews, deals, and newsletters — concepts from a marketplace template that don't apply to a treatment facility. Wrong-fit legal terms on a YMYL healthcare site are worse than none.

**Fix:** counsel-reviewed Terms scoped to a healthcare provider website. Confirm the HIPAA Notice of Privacy Practices at [src/data/content/privacy.json](src/data/content/privacy.json) is also current and matches actual practice.

---

### V0102 · Trailing-slash convention disagrees with production — affects all 69 URLs `CRITICAL`

- [x] **Done 2026-08-06.** `trailingSlash: true` set, driven by a single constant.

**How:** the convention now lives in **[src/lib/routing.ts](src/lib/routing.ts)** (`TRAILING_SLASH` + `canonicalPath()`), imported by [next.config.ts](next.config.ts), `pageMeta()` in [src/lib/seo.ts](src/lib/seo.ts), [src/app/sitemap.ts](src/app/sitemap.ts), and the breadcrumb JSON-LD. **Flipping the portfolio to slashless is a one-line change** to that constant — everything derives from it.

**The trap the row warned about was real and is handled:** `trailingSlash` governs routing only and does *not* rewrite `alternates.canonical`. Verified after the change — all 71 pages emit `canonical === og:url === served path`, all slash-form, and all 71 sitemap `<loc>` entries match. Live `next start` diff against production:

```
/about                      local 308 -> /about/                  production 301 -> /about/
/contact                    local 308 -> /contact/                production 301 -> /contact/
/treatment/detox            local 308 -> /treatment/detox/        production 301 -> /treatment/detox/
/what-we-treat/anxiety      local 308 -> /what-we-treat/anxiety/  production 301 -> /what-we-treat/anxiety/
```
(308 vs 301 is Next's method-preserving equivalent.)

**Where:** [next.config.ts](next.config.ts) — `trailingSlash` is not set, so Next defaults to slashless and 308-redirects the slash form.

**Verified 2026-08-06:** production is **slash-canonical** and 301s the slashless form:

```
https://seasidewellnesspb.com/about          301 -> /about/
https://seasidewellnesspb.com/contact        301 -> /contact/
https://seasidewellnesspb.com/treatment/detox 301 -> /treatment/detox/
```

**Why:** every one of the 69 currently-indexed production URLs uses the trailing-slash form. At cutover, each inbound link, citation, and GSC-recorded URL hits a redirect on the new build. The workbook correctly calls this the largest cutover issue in the portfolio by URL count.

**Fix:** set `trailingSlash: true` in [next.config.ts](next.config.ts) to match production (confirmed valid in Next 16 — `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/trailingSlash.md`). This is the lower-risk direction: it preserves every existing indexed URL. If you instead standardise slashless portfolio-wide, the redirect map must 301 all 69 slash-form URLs.

**Acceptance:** after the change, re-verify that (a) `alternates.canonical` output and (b) `sitemap.xml` entries both emit the chosen form — Next does not automatically rewrite the canonical strings in `alternates`, so `src/app/**/page.tsx` and [src/app/sitemap.ts](src/app/sitemap.ts) may need updating. Diff `curl -sI` on 10 production URLs against the new build.

---

### V0124 · One published post is missing from the build `CRITICAL`

- [x] **Done 2026-08-06.** Ported, not redirected — the content was recoverable.

**Confirmed the diagnosis first:** re-ran the production↔build diff on 2026-08-06. 68 of 69 mapped 1:1; the one gap was exactly the post named. Production shows `datePublished 2026-07-17` — *after* the content snapshot this build was migrated from, which explains it precisely.

**Ported** the client's own published copy (13 sections, ~1,050 words, incl. TL;DR, FAQs and a 6-item Sources list) into [src/data/posts.ts](src/data/posts.ts) + [src/data/content/posts.json](src/data/content/posts.json). Two deliberate edits:

1. **⚠️ One scope claim corrected.** The closing section read *"our team provides drug rehab in West Palm Beach across **every level of care** — from medically supervised detox to residential treatment and **ongoing outpatient support**."* That contradicts both the licensed scope in the master data (**Detox & Res**) and the site's own FAQ. Replaced with the FAQ's accurate framing (detox / SUD inpatient / MH inpatient stabilisation here, PHP+IOP via affiliated network facilities). **This is the same defect class as FAC-2 — it is live on production today and should be fixed there too.**
2. Source citations rendered as bare anchor text "Link" once stripped of `<a>` tags (content JSON cannot hold links — see VIS-2), so each now carries its URL as visible text.

**Acceptance met:** production↔build diff returns **0** missing URLs. Re-run before cutover regardless — production may publish again.

**Verified 2026-08-06 — full production↔build diff:**

| | Count |
|---|---|
| Production indexable URLs (post + page sitemaps) | 69 |
| Build routes | 70 |
| **On production, absent from build** | **1** → `/drug-rehab-west-palm-beach-complete-guide` |
| In build, new (not on production) | 2 → `/privacy-policy`, `/terms` |

**Correction to the workbook — good news, materially narrower than filed.** V0124 warns of portfolio-wide slug drift plus content published after the snapshot. For Seaside specifically, **68 of 69 production URLs map 1:1 onto build routes.** There is no slug drift here at all. The only content gap is the single post the workbook named. The related portfolio row V0116 (preview-vs-production slug changes) does **not** list Seaside, and this diff confirms why.

**Fix:** add the post to [src/data/posts.ts](src/data/posts.ts) + [src/data/content/posts.json](src/data/content/posts.json), or add a 301 to the closest equivalent. Note the workbook's core warning still stands: **re-run this diff immediately before cutover**, since production may publish again.

**Acceptance:** production↔build diff returns zero missing URLs. Reproduction command in [Appendix A](#appendix-a--reproduction-commands).

---

# P1 — High

### SW-004 / V0077 · Open Graph tags are the homepage's on every non-blog page

- [x] **Done 2026-08-06.** Verified against the v16 docs before editing, and the row's diagnosis was exact.

Removed `title`/`description`/`url` from the layout's `openGraph` ([src/app/layout.tsx](src/app/layout.tsx)); Next then derives `og:title`/`og:description` from each page's own `title`/`description`.

**Two things the row did not anticipate, both now handled:**

1. **The 13 blog posts were silently losing `og:site_name` and `og:locale`** — they set their own `openGraph`, and the shallow merge replaced the parent block wholesale. Same root cause, previously unrecorded. Fixed via an exported `ogBase` that every page spreads in.
2. **Adding `openGraph` to a page removed its `og:image`.** The file-based `opengraph-image` convention injects `openGraph.images` into the *root segment only*, so declaring `openGraph` on a page to pin `og:url` dropped the inherited image — briefly on 57 pages. The descriptor now lives in **[src/lib/og.ts](src/lib/og.ts)**, shared by the image route and `ogBase`, so the two cannot drift.

**Acceptance met — verified by live crawl of all 71 URLs:** page-specific `og:url` on every page, exactly one `og:image` each, `og:site_name` + `og:locale` + `og:title` everywhere. **0** problems.

**Where:** [src/app/layout.tsx:39-46](src/app/layout.tsx#L39-L46)

**Verified independently, and the numbers match V0077 exactly:**

| State | Pages |
|---|---|
| `og:url` = domain root, `og:title`/`og:description` = homepage copy | 56 |
| No `og:url` element at all (the 13 blog posts, which set their own `openGraph`) | 13 |
| Homepage (legitimately root) | 1 |
| **Correct page-specific `og:url`** | **0 of 70** |

Sample — `/treatment/detox` emits:

```html
<meta property="og:title" content="West Palm Beach Rehab &amp; Mental Health Center | Seaside Wellness"/>
<meta property="og:url" content="https://seasidewellnesspb.com"/>
```

**Why:** Next does not deep-merge `openGraph` — a page that omits it inherits the parent's block wholesale. Because the layout hardcodes `title`, `description`, and `url`, every page that doesn't declare its own `openGraph` advertises the homepage. Share any treatment or condition page and it renders as the homepage, linking to the homepage.

**Fix:** remove `title`, `description`, and `url` from the layout's `openGraph` object (keep `type`, `siteName`, `locale`). Next then derives `og:title`/`og:description` from each page's own `title`/`description`. Add `url` per page, or rely on the existing per-page `alternates.canonical`. Also add `openGraph.url` to the 13 blog posts at [src/app/[slug]/page.tsx:29-35](src/app/[slug]/page.tsx#L29-L35).

**Acceptance:** all 70 pages emit a page-specific `og:url`, `og:title`, and `og:description`. Validate 5 pages in a share-preview debugger.

---

### SW-005 · Brand name duplicated in two page titles

- [x] **Done 2026-08-06.** Both wrapped in `smartTitle()`. Rendered titles now `/about` **58** chars and `/contact` **54** — brand appears once, and both fall under 60 as a side effect.

**Where:** [src/app/about/page.tsx:15](src/app/about/page.tsx#L15) · [src/app/contact/page.tsx:9](src/app/contact/page.tsx#L9)

```
/about   → "About Seaside Wellness | Trusted South Florida Rehab Center | Seaside Wellness"  (78 chars)
/contact → "Contact Seaside Wellness | West Palm Beach Rehab Center | Seaside Wellness"    (74 chars)
```

**Why:** [src/lib/seo.ts:9-11](src/lib/seo.ts#L9-L11) `smartTitle()` exists precisely to prevent this, but it's only wired into the JSON-driven pages. These two static objects bypass it and the `"%s | Seaside Wellness"` template appends the brand a second time.

**Fix:** wrap both in `smartTitle(...)`, or shorten the titles so the template's brand suffix is the only one.

---

### SW-006 · Team meta descriptions truncate mid-word

- [x] **Done 2026-08-06.** Added `truncate()` + `metaDescription()` to [src/lib/seo.ts](src/lib/seo.ts) — cuts at the last word boundary, strips dangling punctuation, budgets for the prefix.

All 8 team descriptions now **146–155** chars (were 178–187) and end on whole words. Sample, previously ending *"…with a strong "*:

> Erin Crawford, Director of Nursing at Seaside Wellness. Born in Okinawa, Japan and raised in South Florida, Erin Crawford is a dedicated and compassionate…

Also dropped the credential string from the `<title>` (per SW-013) — team titles are now **46–55** chars, were up to 79.

**Note on the BIO-2 sequencing warning:** the helper is copy-independent, so restoring the full bios later changes the *output* but requires no rework here. BIO-2 itself remains blocked — it needs the master bio doc, which requires Google Docs authorisation this session did not have.

**Where:** [src/app/about/[member]/page.tsx:25](src/app/about/[member]/page.tsx#L25) — `bio[0].slice(0, 130)`

All 8 land at **178–187 chars** and end mid-word:

```
michael-meagher  186  "…with more than 13 years of experience in the behavio"
erin-crawford    186  "…compassionate Registered Nurse with a strong "
kate-gulam       181  "…viduals navigate life's challenges and achiev"
```

**Fix:** add a `truncate(text, max)` helper that cuts at the last space before the limit and appends `…`; budget for the `name, role at Seaside Wellness. ` prefix so the total stays ≤155. Better: add an explicit `metaDescription` field to [src/data/team.ts](src/data/team.ts).

---

### SW-007 · Brand video has no captions — WCAG 1.2.2 failure

- [~] **Substantially done 2026-08-06. One verification step needs someone who can hear the audio.**

> **⚠️ Review 2026-08-06 — two defects found in the shipped track. Read this before closing SW-007.**
>
> **(a) The track covers 22% of the film, and the audio is not music-only.** I measured the audio with `silencedetect` and `volumedetect`: it runs **continuously from 0 s to 170.5 s** — the only silence is the final 8.8 s — at mean −22.2 dB / peak −2.1 dB. The 23 cues span **40 s of 179 s = 22% of runtime**. Nothing is captioned before 9.5 s, after 158 s, or in the gaps between the seven card groups.
>
> The note in [brand-film.ts](src/data/brand-film.ts) honestly records that the audio was never verified — but **that caveat lives in a code comment, and the viewer sees `<track kind="captions" label="English" default>`**, which asserts complete English captions. A deaf viewer who enables it gets text for a fifth of the film and will reasonably conclude the remainder is music. Given the source file is named `…V2-VOICEOVER` and carries continuous audio, the likeliest reality is ~130 s of unc­aptioned narration. **In that state the track is arguably worse than no track**, because it removes the cue that something is missing.
>
> Fix, in order of preference: (1) obtain the voiceover script from whoever produced the film and complete the cues — cheapest and definitive; (2) have anyone who can hear it listen once and confirm music-only, which closes this immediately; (3) as an interim, change `label` to `"English (on-screen text)"` so the track is honestly scoped rather than implying completeness.
>
> **(b) Three cues replay their own text, which stutters.** [brand-film.ts:59-61](src/data/brand-film.ts#L59-L61):
>
>     { start: 154.0, end: 155.0, text: "Stability," }
>     { start: 155.0, end: 156.0, text: "stability, clarity," }
>     { start: 156.0, end: 158.0, text: "stability, clarity, and hope for their future." }
>
> That is faithful to how the card *animates* on screen, but a caption track is not an animation: a reader sees "stability, clarity" three times in four seconds. `brandFilmTranscript` already collapses it correctly to one sentence — the cues should too. Replace with a single cue `154.0 → 158.0` carrying the full line, or make it additive without repeating. Then re-run `node scripts/build-vtt.mjs`.
>
> **Verified sound:** the generator round-trips correctly (23 cues parsed, timestamps check out — 98 s → `00:01:38.000`), the `<details>` transcript is keyboard-accessible, and the same-origin `<track>` needs no `crossOrigin` — the comment about adding it if the video moves to a CDN is correct and worth keeping.
>
> **Resolved 2026-08-06, same session:**
> - **(b) fixed.** The three cumulative cues are now one cue `154.0 → 158.0` carrying "Stability, clarity, and hope for their future." VTT regenerated — **23 cues → 21**.
> - **(a) mitigated, not closed.** `BrandVideo` gained a `captionsLabel` prop and both call sites now pass **`"English (on-screen text)"`** instead of `"English"`, so the track states what it contains rather than implying full coverage. The 22% coverage gap is unchanged — **this still needs someone who can hear the audio.** Revert the label to `"English"` the moment the cues are confirmed complete.

**The finding needs restating, because the film is not what the row assumed.** I probed it: **179 seconds**, stereo AAC, **no caption stream**. But it tells its story almost entirely through **full-screen text cards** — not narration over footage. I recovered the whole script by sampling frames, detecting the near-white card frames via `signalstats` luminance, and reading each one.

**That inverts which users are worst affected.** Deaf and hard-of-hearing viewers are already largely served — the cards are open captions in effect. **Blind users were getting nothing**, because burned-in text is an *image*: the film's entire narrative was unavailable to a screen reader, and no caption track would have fixed that. The missing piece was a **text alternative**, which the row didn't identify.

**Built:**
- **[src/data/brand-film.ts](src/data/brand-film.ts)** — 23 timed cues plus a prose transcript, one source of truth.
- **[scripts/build-vtt.mjs](scripts/build-vtt.mjs)** → **`public/video/seaside-brand-film.en.vtt`**, so the track and the on-page transcript cannot drift. Re-run after editing cues.
- **`BrandVideo`** gained `captionsSrc` and `transcript` props: renders `<track kind="captions" srclang="en" label="English" default>` and a `<details>` transcript disclosure below the player.
- Wired into **both** placements — homepage and `/tour`.

Verified live: the VTT serves as `text/vtt; charset=UTF-8`, the `<track>` renders with correct `srclang`/`label`, and the transcript is in the server-rendered HTML (so it is indexable as well as accessible).

The recovered script, for reference:

> It can feel overwhelming — not just for them, but for the people who love them most. · But there is hope, and there is help. · Including anxiety, depression, PTSD, bipolar disorder, substance dependence. · What truly defines Seaside Wellness is our team. · Recovery isn't just about stopping a behavior. It's about understanding the root causes, rebuilding confidence, learning the tools needed to move forward in life. · Stability, clarity, and hope for their future.

**⚠️ Remaining step — I cannot do this one.** I have no way to hear the file, so the cues transcribe the **on-screen text, not the audio**. The filename ("…V2-VOICEOVER") strongly suggests a narrator reads these same words, in which case the track is accurate. But **someone must play it and confirm**, because:
- if the voiceover says more than the cards, the captions are incomplete;
- the film contains several shots of people **talking on camera** (a clinician at a whiteboard, two women in conversation, a therapy setting). If any of that dialogue is audible, it is uncaptioned and WCAG 1.2.2 is still not met.

Inaccurate captions are themselves a failure, so treat the track as provisional until checked. Also worth confirming, while someone is reviewing the footage: **whether the people shown are staff, clients, or hired talent** — client footage in marketing carries consent obligations under 42 CFR Part 2 for a SUD provider. Related: **VID-3** (do the aerials depict this property) and **VID-2**.

**Where:** [src/components/BrandVideo.tsx:26-35](src/components/BrandVideo.tsx#L26-L35) — used on [/](src/app/page.tsx#L182) and [/tour](src/app/tour/page.tsx#L75)

**Why:** it's a voiceover video with no `<track kind="captions">`. That's a WCAG 2.1 Level AA failure for prerecorded audio content, and for a Florida healthcare provider, web-accessibility claims under ADA Title III are an active litigation area.

**Fix:** produce a WebVTT file and add `<track kind="captions" src="…" srcLang="en" label="English" default />`. Add a transcript below the player as well — it also indexes.

---

### SW-008 · `ink-400` text fails contrast on informative copy

> **⚠️ Regressed twice on 2026-08-07 and re-fixed at `6437263`.** `ink-400` came back in code written after the original fix: `LocalBlogGrid.tsx` (3 uses — extracted from the pre-fix blog page) and the new `InsuranceVerificationForm.tsx` (5 uses — two helper paragraphs, two "(optional)" labels, the closing note). Both moved to `ink-500` and `LocalBlogGrid` now carries a comment explaining why, so the next extraction doesn't undo it again. **This colour will keep coming back until it stops being reachable** — consider removing `--color-ink-400` from the theme or renaming it to something that reads as decorative-only.
>
> Still outstanding: `ProviderCombobox.tsx:112` uses `text-ink-400` on an interactive icon button. At 2.84:1 that also misses the 3:1 minimum for UI components (WCAG 1.4.11). Left alone pending a look at it rendered.

- [x] **Done 2026-08-06** — with one correction to the prescribed fix.

**⚠️ `ink-500` is not sufficient everywhere.** The row measured it on white (4.60:1, passes). But the *"Accredited & Certified"* eyebrow sits on `bg-cream`, where `ink-500` is only **4.25:1** — still failing AA. Measured all three tokens against both backgrounds:

| | on white | on cream |
|---|---|---|
| `ink-400` | 2.84 ❌ | 2.62 ❌ |
| `ink-500` | 4.60 ✅ | **4.25 ❌** |
| `ink-600` | 7.20 ✅ | 6.65 ✅ |

So: `ink-500` for the five sites on white, **`ink-600` for the trust-strip eyebrow on cream**.

Also made the 988 crisis reference a real `tel:988` link — it was plain text in the lowest-contrast paragraph on the page, and on mobile it is the one thing there someone might urgently need to tap.

Left alone as directed: `placeholder:text-ink-400` and the decorative arrow in [cards.tsx](src/components/cards.tsx#L84).

**Measured:** `#949aa1` on white = **2.84:1**, on cream = **2.62:1**. WCAG AA needs 4.5:1. (`ink-500` `#6f767e` = 4.60:1 and passes.)

Affected — all carry information, not decoration:

- [src/components/ContactForm.tsx:116](src/components/ContactForm.tsx#L116) — *"if you are in crisis, call or text 988"* ← the crisis instruction is currently the lowest-contrast text on the page
- [src/components/ContactForm.tsx:80](src/components/ContactForm.tsx#L80) — "give us a phone number or email so we can reach you"
- [src/app/page.tsx:397](src/app/page.tsx#L397) — "N min read"
- [src/app/about/blog/page.tsx:83](src/app/about/blog/page.tsx#L83) and [:52](src/app/about/blog/page.tsx#L52), [:78](src/app/about/blog/page.tsx#L78) — post dates, separators
- [src/app/page.tsx:76](src/app/page.tsx#L76) — "Accredited & Certified" eyebrow

**Leave alone:** `placeholder:text-ink-400` ([ContactForm.tsx:10](src/components/ContactForm.tsx#L10)) and the decorative arrow in [cards.tsx:84](src/components/cards.tsx#L84).

**Note:** the rest of the palette is in good shape — 15 of 16 token pairs tested pass AA, most at 7:1+. This is the only real failure.

---

### SW-009 · `/api/contact` has no rate limiting

- [~] **Stopgap shipped 2026-08-06. The durable version still wants a WAF rule.**

Added an in-process limiter to [route.ts](src/app/api/contact/route.ts): **5 requests / 10 minutes** keyed on `x-forwarded-for`, with a bounded map so a long-lived instance can't grow unboundedly.

**⚠️ Deliberately deviates from this row's advice on one point.** The row says *"Keep returning `200 {ok:true}` on throttle so bots get no signal."* I return **429 with the phone number** instead. Reasoning: the honeypot can safely fake success because it only ever catches bots. A rate limit catches **humans** too — and telling someone in crisis "thank you, we'll be in touch" when nothing was sent is precisely the **SW-001** defect I had just fixed. If we refuse a submission, we owe them the phone number. Losing bot-opacity is a fair trade; the goal is stopping email amplification, not being undetectable.

**Honest about the limits:** serverless instances don't share memory, so a distributed flood can land on cold instances and slip through. What it reliably stops is one client hammering a warm instance — and sustained abuse is what keeps instances warm, so it covers the common case for free. **A Vercel WAF rule or Upstash Ratelimit is still the durable answer.**

Verified live against a production build:

```
requests 1-5 from one IP   502  (SW-001 fail-loud: no RESEND_API_KEY set)
requests 6-7 from same IP  429  "Too many messages… please call us at (855) 416-5648"
different IP               502  (not limited)
honeypot filled            200  (still silently accepted)
name only, no contact      422  (validation intact)
malformed JSON             400
```

That run also confirms **SW-001's production fail-loud works end to end** — the 502s are the endpoint correctly refusing to fake success.

**Where:** [src/app/api/contact/route.ts:67](src/app/api/contact/route.ts#L67)

**Why:** an open POST that triggers an outbound email per request. The honeypot ([:76](src/app/api/contact/route.ts#L76)) stops naive bots only. Unthrottled, it's a free email-relay amplifier aimed at the admissions inbox, and it can burn Resend quota.

**Fix:** a Vercel WAF rate-limiting rule, or Upstash Ratelimit keyed on IP (e.g. 5 requests / 10 min). Keep returning `200 {ok:true}` on throttle so bots get no signal.

---

### SW-010 · HIPAA / tracking-technology decision on the contact page

- [~] **Maps embed resolved 2026-08-06. The email/BAA half is still a decision.**

**Done — the Maps iframe no longer loads on arrival.** New [MapEmbed](src/components/MapEmbed.tsx) renders a click-to-load panel: a direct "Open in Google Maps" link (which sets no cookies on our page and is what most people actually want — directions on their own device) plus a "Show map here" button that injects the iframe only on request, with a one-line explanation of why.

Verified: **0 iframes in the initial DOM** of `/contact`. The only remaining external URLs are plain `<a href>` links (Maps, socials) which load nothing until clicked.

Deliberately **not** a fake static map graphic — rendering a real one needs the Static Maps API, and a decorative image pretending to be a map is worse than an honest link.

**Still open — the form's data path.** Contact submissions route through a third-party email vendor into a standard inbox, on a form whose free-text box prompts *"Tell us a little about your situation…"*. In practice people type health details there. **Resend does not offer a HIPAA BAA**, so wiring it up decides the form is non-PHI by default. Pick one deliberately: execute a BAA with a HIPAA-capable transport, route into a system already under BAA, or narrow the form and say plainly that it isn't for clinical detail. Ties to **SW-001** and to **VIS-3** (which proposes six more collection points — do not build those until this is settled).

**Where:** [src/app/contact/page.tsx:86-94](src/app/contact/page.tsx#L86-L94) (Maps iframe) · [src/app/api/contact/route.ts:42-55](src/app/api/contact/route.ts#L42-L55) (Resend)

**Why:** the Maps iframe sets Google cookies on the same page where prospective patients disclose health information, and the form emails that content through Resend into a standard inbox. HHS OCR guidance on online tracking technologies for covered entities makes both a decision to take deliberately, not to inherit by default.

**Fix (pick per item):** replace the iframe with a static map image + "Open in Maps" link, or gate it behind consent; and either execute a BAA with the email vendor or route submissions into a system already covered by one. Document whichever choice you make.

---

### SW-011 · Verify the accreditation claims and link the seals

- [ ] **Task:** Confirm Joint Commission, LegitScript, and NAMI standing; link each seal to its verification record.

**Merges workbook row V0076.**

**Where:** [src/components/Footer.tsx:130-143](src/components/Footer.tsx#L130-L143) · [src/data/site-content.ts:66-82](src/data/site-content.ts#L66-L82) · trust strip at [src/app/page.tsx:74-90](src/app/page.tsx#L74-L90)

**Verified:** all three seals render as bare `<Image>` with no wrapping `<a>` — no verification link anywhere on the site.

**Correction to V0076 — scope:** the row files this as a homepage issue. It is sitewide: the trust strip is on the homepage and the seal block is in the global footer, so all 70 pages assert all three credentials.

**Why:** "Joint Commission accredited" and "LegitScript certified" are load-bearing trust and compliance claims. LegitScript certification specifically gates Google Ads eligibility for addiction treatment advertisers, so it will be checked. Unlinked seals also can't be independently verified by a family evaluating the facility.

**Severity note from the Verification Log — this is milder than it first looks.** The auditor's note on V0076: *"Unlike Des Moines (V0070), Seaside DOES hold a seal image and its verify link is simply missing rather than pointing at the wrong domain. So this is lower severity than V0070 — a linking omission, not a questionable certification claim."* Elsewhere in the portfolio (V0070, priority `COMPLIANCE`) a LegitScript claim runs on 34 pages while the seal verifies a *different company's* domain. Nothing like that was found here. So: **no evidence of a false claim** — the primary task is the missing link.

**Fix:** link the LegitScript seal to its certification-status record and the Joint Commission seal to its Quality Report listing. Confirming each credential is still current and that you hold rights to the marks remains worth doing before launch, but treat it as due diligence rather than remediation.

---

### V0117 · Migrate assets off the `/wp-content/` paths

- [x] **Done 2026-08-06.** Nothing under `/wp-content/` remains — the directory is gone.

Moved **51 files** into a semantic tree and rewrote every reference across **22 source files**:

| New path | Files | Was |
|---|---|---|
| `/images/facility/` | 24 | `wp-content/uploads/2025/08/` |
| `/images/stock/` | 15 | scattered across four date folders |
| `/images/team/` | 8 | three different date folders |
| `/images/brand/` | 5 | logo, 3 accreditation seals, insurance graphic — now semantically named (`joint-commission.png`, `legitscript.png`, `nami.gif`, `seaside-logo-horizontal.png`, `insurance-accepted.png`) |
| `/video/` | 3 | brand film + reel + caption track |

**Also expanded the `F` and `U` prefix constants into literal paths** (19 + 22 occurrences). `F` in catalog.ts was used for **both** facility and stock files, so it could not map to a single new folder — every asset path is now a plain, greppable string.

**Integrity re-verified: 56 referenced / 56 present / 0 missing / 0 unreferenced.** Build clean at 78 routes, eslint and tsc clean.

**Footgun worth recording:** renaming a route leaves a stale generated validator in `.next/dev/types/` — which `tsconfig.json` includes — so `tsc --noEmit` fails against the *old* path until `.next` is cleared. Hit this on V0073; `rm -rf .next` is the fix.

**Where:** all 210 image references, e.g. [src/data/catalog.ts:3](src/data/catalog.ts#L3) (`const F = "/wp-content/uploads/2025/08/"`), [src/lib/site.ts:23](src/lib/site.ts#L23)

**⚠️ Correction to the workbook — the stated risk does not apply to this repo.** V0117 (and V0076) claim: *"those assets only resolve while the WordPress install stays up, so decommissioning it would break images sitewide."* **That is not true here.** All 210 assets are committed under `public/wp-content/` and tracked in git — verified via `git ls-files public/wp-content | wc -l` → 210, and all 210 referenced paths resolve from the build (0 missing). Next serves them; WordPress is not in the loop. **Retiring the WordPress install will not break any image.**

The workbook was auditing the deployed preview from the outside, where a `/wp-content/` URL is indistinguishable from a WordPress-hosted one. Reasonable inference, wrong conclusion.

**What's actually left** is cosmetic and low-risk, which is why this sits at the bottom of P1 rather than in P0 where the row's framing would put it: the paths carry a dead CMS in the URL of every image, the date-based folders (`2020/12`, `2026/04`) are meaningless in the new build, and it invites exactly the misdiagnosis above.

**Fix:** move to `/images/…`, update the base constants (`F` in catalog.ts, `U` in [src/app/tour/page.tsx:22](src/app/tour/page.tsx#L22), `site.logo`, and the literal paths in [Footer.tsx](src/components/Footer.tsx) / [site-content.ts](src/data/site-content.ts)). Do this **as part of SW-025** (dropping 157 unreferenced files) so files are only touched once. Note: image URLs will change, so it is safest done before launch, not after.

---

### V0116-adjacent · Build the cutover redirect map

- [~] **Largely done 2026-08-06; one step is inherently pre-cutover.**

1. **Trailing slash** — resolved, see V0102. `trailingSlash: true`, no per-URL rules needed.
2. **`/drug-rehab-west-palm-beach-complete-guide`** — resolved by porting the post, see V0124.
3. **`/category/blog/`** — done, see SW-012.
4. **`/feed/`** — done, see SW-012 (301s to the blog index; generating a real RSS feed remains the alternative).

**Verified:** every URL in the production sitemap resolves to 200 on the new build, and every legacy redirect is a single hop with no chains.

**Still to do at cutover:** re-run the production↔build diff immediately before the DNS switch — production may publish again, exactly as it did with the V0124 post.

**Why:** Seaside is not listed in V0116, and the production↔build diff (see V0124) confirms no slug drift. The map is therefore small — but it still has to exist:

1. **Trailing slash** — all 69 URLs. Resolved by the V0102 decision; no per-URL rules needed if `trailingSlash: true`.
2. `/drug-rehab-west-palm-beach-complete-guide` → port or 301 (V0124).
3. `/category/blog/` → `/about/blog` — see SW-012.
4. `/feed/` → returns **200** on production today; the build has no `/feed` route. Decide: generate an RSS feed, or 301 to `/about/blog`.

**Acceptance:** every URL in the production sitemap resolves to 200 on the new build (after redirects) with no chains.

---

# P2 — Medium

### SW-012 · Legacy WordPress redirects are incomplete

- [x] **Done 2026-08-06.** Added `/category/:path*` and `/feed` (plus `/comments/feed`) → the blog index. Skipped `/tag/*` and dated permalinks, confirmed absent.

**Caught a chain the naive fix creates.** `trailingSlash` normalises incoming requests but does **not** rewrite redirect *destinations*, so `destination: "/about/blog"` produced `/category/blog/ → /about/blog → /about/blog/` — two hops. Destinations now go through `canonicalPath()`. Verified live, every indexed legacy URL is one hop to a 200:

```
/category/blog/    308 -> /about/blog/   final 200
/feed/             308 -> /about/blog/   final 200
/comments/feed/    308 -> /about/blog/   final 200
/author/admin/     308 -> /             final 200
```

**Where:** [next.config.ts:9-14](next.config.ts#L9-L14)

**Why:** the code comment says *"author/category noise"* but only `/author/:path*` is implemented. Verified against production:

| Legacy path | Production | New build |
|---|---|---|
| `/category/blog/` | in `category-sitemap.xml`, indexed | 404 |
| `/feed/` | **200** (RSS) | 404 |
| `/author/admin/` | already 404 | redirected ✓ |
| `/tag/*`, dated permalinks | not present | n/a |

**Scope note:** exactly **one** category URL is indexed (`/category/blog/`), not a large set — worth fixing, not worth over-engineering. The existing `/author/*` rule guards a path that already 404s on production; harmless, keep it.

**Fix:** add `/category/:path*` → `/about/blog` and decide on `/feed`. Skip `/tag/*` and dated permalinks — neither exists.

---

### SW-013 · 22 page titles exceed 60 characters

- [x] **Done 2026-08-06.** Titles over 60 chars: **22 → 3**.

Added an optional `metaTitle` to the `Post` type ([src/data/types.ts](src/data/types.ts)) used for `<title>` only, so the full headline still renders as the `<h1>`. Set on 12 posts. Dropped credentials from team titles. Shortened `/areas-we-serve` (70 → 54).

**Deliberately left at 61–63 chars:** `/` (63), `/treatment` (63), `/about/blog` (61). Shortening these means dropping a primary keyword — "Treatment" from the `/treatment` title, "Center" from the homepage — to save 1–3 characters against a soft threshold Google applies by pixel width, not character count. Not a good trade. Recorded so it isn't re-flagged.

⚠️ The 12 `metaTitle` strings are mechanical compressions of the existing headlines (no new claims), but the wording is mine — worth a marketing read.

Worst cases (rendered `<title>` length):

| Chars | Page |
|---|---|
| 111 | `/beyond-the-dry-january-trend-…` |
| 103 | `/mental-health-treatment-west-palm-beach-fl` |
| 90 | `/how-to-find-a-luxury-detox` |
| 87 | `/west-palm-beach-addiction-treatment-guide`, `/holiday-pressure-and-addiction-…` |
| 79 | `/about/shaun-hutton` |

**Why:** blog and team titles don't contain "seaside", so `smartTitle()` lets the template append ` | Seaside Wellness` to already-long strings.

**Fix:** add an optional `metaTitle` to [src/data/posts.ts](src/data/posts.ts) and [src/data/team.ts](src/data/team.ts) for SERP-length titles, keeping the long `title` for the on-page `<h1>`. For team pages, drop the credential string from the title ([about/[member]/page.tsx:24](src/app/about/[member]/page.tsx#L24)).

---

### SW-014 · 12 meta descriptions exceed 160 characters

- [x] **Done 2026-08-06.** Descriptions over 160 chars: **12 → 0**.

Added `site.metaDescription` (139 chars) for the homepage and kept `site.description` as the long prose form for the JSON-LD, exactly as the row suggested. Trimmed `/treatment` (169→140), `/about/about-us` (167→150), `/treatment/dual-diagnosis` (162→138). The 8 team pages are covered by SW-006. All shortenings compress existing approved copy — no new claims.

Homepage is **210** — it reuses `site.description` verbatim ([src/lib/site.ts:5-6](src/lib/site.ts#L5-L6)), which is written as prose, not as a SERP snippet. Also over: `/about/about-us` (167), `/treatment` (169), `/treatment/dual-diagnosis` (162), and all 8 team pages (covered by SW-006).

**Fix:** add a separate `metaDescription` to `site` rather than overloading `description`, which is also used for the JSON-LD `description` where length doesn't matter.

---

### SW-015 · Reading times overstated 2–3× on 12 of 13 posts

- [x] **Done 2026-08-06.** Derived at merge time in [src/data/posts.ts](src/data/posts.ts) at 225 wpm; the hand-set field is deleted from all 13 entries and removed from the `meta` type. Output matches the row's measured table exactly:

```
west-palm-beach-addiction-treatment-guide   7 -> 2
how-to-find-a-luxury-detox                 8 -> 4
when-detox-is-the-right-first-step...      9 -> 5
high-functioning-depression-signs          7 -> 3
what-happens-during-medical-detox          7 -> 3
```

**Where:** [src/data/posts.ts](src/data/posts.ts) (hand-set per post) · merge point [src/data/posts.ts:142-144](src/data/posts.ts#L142-L144)

| Post | Claim | Words | Actual @225wpm |
|---|---|---|---|
| west-palm-beach-addiction-treatment-guide | 7 | 421 | 2 |
| how-long-should-you-stay-in-rehab | 7 | 490 | 2 |
| high-functioning-depression-signs | 7 | 475 | 2 |
| what-happens-during-medical-detox | 7 | 584 | 3 |
| how-to-find-a-luxury-detox | 8 | 888 | 4 |

Only `when-detox-is-the-right-first-step…` (9 claimed / 1,119 words / 5 actual) is within reach. **Fix:** derive it at merge time and delete the field.

---

### SW-016 · Several posts are thin for their target queries

- [ ] **Task:** Expand or consolidate the shortest posts.

Bodies run **421–1,119 words**; five are under 600. `/west-palm-beach-addiction-treatment-guide` is titled a "Comprehensive… Guide" at 421 words. By contrast the condition and treatment pages are substantial (1,107–1,620 words) and in good shape.

**Fix:** expand the sub-600-word posts to match the depth of the condition pages, or merge them into the relevant `/what-we-treat` page and 301.

---

### SW-017 · Contact form marks both phone and email as required

- [x] **Done 2026-08-06.** Implemented as specified: both `aria-required` attributes dropped, the pair wrapped in a `<fieldset>` with a `<legend>` ("How can we reach you?"), and both inputs `aria-describedby` the hint that states the either/or rule.

Note this moves phone beside email (name now spans the row) — the two contact methods are visually paired, matching the semantics. Small layout change, flagging it so it isn't a surprise.

**Where:** [src/components/ContactForm.tsx:74](src/components/ContactForm.tsx#L74) (phone) and [:79](src/components/ContactForm.tsx#L79) (email) both carry `aria-required="true"`

**Why:** neither field is individually required — the real rule is *one of the two* ([route.ts:86](src/app/api/contact/route.ts#L86)). Screen readers announce both as required, so a user supplying only a phone number is told they've left a required field empty.

**Fix:** drop both `aria-required` attributes; wrap the pair in a `<fieldset>` with a `<legend>` stating the rule, and point `aria-describedby` at the existing hint text on [:80](src/components/ContactForm.tsx#L80).

---

### V0073 · `/about/about-us` slug doesn't match its content

- [x] **Done 2026-08-06.** Renamed to `/about/our-story` — the URL now matches the page, which is titled "Our Story".

Route folder moved, and all 7 references updated: [sitemap.ts](src/app/sitemap.ts), [page.tsx](src/app/page.tsx), [about/page.tsx](src/app/about/page.tsx), [Footer.tsx](src/components/Footer.tsx), [site.ts](src/lib/site.ts) ×2 (nav item **and** the easy-to-miss nav featured card), plus the page's own `alternates.canonical`. Verified zero residual references.

**Also fixed a related mismatch the row didn't list:** the footer link was labelled *"About Us"* while pointing at a page titled *"Our Story"* — same inconsistency, one level up. Now labelled "Our Story".

**301 added** so the indexed URL survives. Verified live:

```
/about/about-us/    308 -> /about/our-story/   then 200
/about/our-story/   200
canonical + og:url  https://seasidewellnesspb.com/about/our-story/
sitemap             contains /about/our-story/ only
```

Note the slashless `/about/about-us` takes two hops (slash normalisation, then the rename redirect). The **indexed** form carries the slash, so real traffic is single-hop — same shape as the `/feed` case in SW-012.

**Closes VIS-11**, which was the same finding from the design side. **SW-026** (the orphaned `about-us` content entry) was already resolved separately.

**Where:** `src/app/about/about-us/page.tsx` (now [src/app/about/our-story/page.tsx](src/app/about/our-story/page.tsx)) — titled **"Our Story"**, H1 *"Built for healing, grounded in expertise"*

**Verified:** the title/slug mismatch is real. `/about` and `/about/about-us` are genuinely distinct pages (different titles, different H1s), so the workbook's amended verdict is right — and its **original** recommendation (301 `/about/about-us` → `/about`) would have deleted a distinct page. Do not do that.

**Fix:** rename to `/about/our-story` so the URL matches the content, 301 the old path, and update all 5 internal links plus the sitemap and the page's own canonical:

| File | Line |
|---|---|
| [src/lib/site.ts](src/lib/site.ts#L43) | 43 (nav item) and 60 (nav featured card — easy to miss) |
| [src/components/Footer.tsx](src/components/Footer.tsx#L31) | 31 |
| [src/app/page.tsx](src/app/page.tsx#L124) | 124 |
| [src/app/about/page.tsx](src/app/about/page.tsx#L53) | 53 |
| [src/app/sitemap.ts](src/app/sitemap.ts#L14) | 14 |
| [src/app/about/our-story/page.tsx](src/app/about/our-story/page.tsx#L13) | 13 (`alternates.canonical`) |

Or merge the two pages and 301. Either way, both pages are light on unique prose — worth strengthening.

**Related:** the orphaned `about-us` entry in `misc.json` — see SW-026.

---

### V0074 · `opiate-addiction` and `opioid-addiction` will cannibalise each other

- [ ] **Task:** Merge, then redirect — or differentiate deliberately.

**Where:** [src/data/catalog.ts:125-139](src/data/catalog.ts#L125-L139) · content in [conditions.json](src/data/content/conditions.json)

**Verified:** "opiate addiction treatment" and "opioid addiction treatment" are near-synonymous queries, so two URLs compete regardless of wording. Measured text overlap between the two bodies is **low** (they didn't rank in the top-5 similarity pairs for conditions, max was 3.7%) — which, as the workbook correctly notes, does *not* weaken an intent-cannibalisation claim.

**Fix:** the workbook's amended sequence is right — merge the unique material from `opiate-addiction` (1,305 words) into `opioid-addiction` **first**, then 301. A bare 301 discards a substantial page. Alternatively keep both only if `opiate` is deliberately scoped to a distinct drug class, and make that scoping explicit in the copy.

---

### V0096 · Verify-insurance slug is a portfolio outlier

- [ ] **Task:** Decide whether Seaside adopts the proposed `/verify-insurance` standard.

**Current:** `/admissions/insurance-verification` — one of 4 variants across the portfolio; only 3 sites use the proposed standard.

**Note:** Seaside's page exists and works; this is a portfolio-consistency decision, not a defect. It is also the **most-linked route on the site** — a rename touches 9 link sites plus the slug definition, the sitemap, and the route folder:

[lib/site.ts:151](src/lib/site.ts#L151) · [Header.tsx:178](src/components/Header.tsx#L178) · [Header.tsx:365](src/components/Header.tsx#L365) · [PageHero.tsx:86](src/components/PageHero.tsx#L86) (every page hero) · [DetailLayout.tsx:179](src/components/DetailLayout.tsx#L179) (every detail sidebar) · [app/page.tsx:58](src/app/page.tsx#L58) · [app/page.tsx:350](src/app/page.tsx#L350) · [Footer.tsx:42](src/components/Footer.tsx#L42) · [admissions/page.tsx:20](src/app/admissions/page.tsx#L20) · plus [data/admissions.ts:11](src/data/admissions.ts#L11) (slug) and [sitemap.ts:23](src/app/sitemap.ts#L23).

**Owner: portfolio, not this repo.**

---

### V0099 · FAQ slug is a portfolio outlier

- [ ] **Task:** Decide whether Seaside adopts `/faq`.

**Current:** `/about/faq` (39 FAQs, valid `FAQPage` JSON-LD). Proposed standard is `/faq`; only 2 sites use it today.

Same nature as V0096 — consistency decision, not a defect. **Owner: portfolio.**

---

### V0101 · Blog URL pattern is a portfolio outlier

- [ ] **Task:** Decide whether Seaside migrates to `/blog/slug`.

**Current:** posts at root level `/{slug}` ([src/app/[slug]/page.tsx](src/app/[slug]/page.tsx)), index at `/about/blog`. Proposed standard: `/blog/slug`.

**Trade-off to weigh:** these 13 root-level URLs are the ones already indexed on production, so migrating costs 13 redirects for consistency gain. The workbook's own rationale — *"root-level posts collide with page slugs"* — is a genuine structural risk here: any future top-level page must not collide with a post slug. `dynamicParams = false` at [src/app/[slug]/page.tsx:11](src/app/[slug]/page.tsx#L11) keeps this safe today (unknown root slugs 404 rather than rendering), so it is a latent risk, not a live bug. **Owner: portfolio.**

---

# P3 — Low / housekeeping

### SW-018 · Heading level jumps h1 → h3 on `/about/meet-the-team`

- [x] **Done 2026-08-06.** Demoted the card headings `h3 → h2`. Each member is a direct child of the page `h1`, so this is the more accurate structure, and appearance is unchanged (size/weight come from the utility classes, not the tag). Live crawl of all 71 pages: **0** heading-level skips.
**Where:** [src/app/about/meet-the-team/page.tsx:41](src/app/about/meet-the-team/page.tsx#L41) — cards use `h3` with no intervening `h2`. Only heading-order violation in all 107 pages.

### SW-019 · Sitemap `lastModified` churns on every deploy

- [x] **Done 2026-08-06.** `lastModified` is now emitted **only** where a real content date exists — the 14 blog posts. Omitting it elsewhere is more honest than a date that can't be substantiated; when detail pages gain an `updated` field, add it there.
**Where:** [src/app/sitemap.ts:9](src/app/sitemap.ts#L9) — `new Date()` means all 70 URLs report a fresh `lastmod` every build, which trains crawlers to distrust the signal. Posts already have a `date`; detail pages could carry one.

### SW-020 · JSON-LD `telephone` isn't E.164

- [x] **Done 2026-08-06.** Derived from `site.phoneHref` rather than duplicated, so it can't drift. Verified in the rendered JSON-LD: `"telephone": "+18554165648"`.
**Where:** [src/lib/seo.ts:23](src/lib/seo.ts#L23) — currently `(855) 416-5648`. `site.phoneHref` already holds the E.164 form.

### SW-021 · Organization schema is missing local-SEO fields

- [~] **Mostly done 2026-08-06.** Added `hasMap` (built from the GBP place ID supplied in FAC-4), `areaServed` (all 7 communities from the catalog, so it can't drift), and `openingHoursSpecification` (00:00–23:59 every day — the same 24/7 claim the site already makes in the header bar and on `/contact`).

**`geo` deliberately omitted.** It needs real lat/long for a licensed medical facility and I will not approximate coordinates — especially with **FAC-1** (the municipality of record) unresolved. Add it alongside FAC-1, from the GBP listing.

Also recorded `placeId`, `mapUrl` and `reviewUrl` on `site` ([src/lib/site.ts](src/lib/site.ts)) — the safe half of **FAC-4**, which unblocks VIS-4/SW-002 when someone wires up real reviews. Deliberately did **not** add `aggregateRating`.
**Where:** [src/lib/seo.ts:14-39](src/lib/seo.ts#L14-L39). Also consider `Person` schema on team bios and `MedicalWebPage` on condition pages.

### SW-022 · `robots.host` is Yandex-only

- [x] **Done 2026-08-06.** Removed. The canonical host is already asserted via `metadataBase` and the per-page canonicals. Verified `robots.txt` output.
**Where:** [src/app/robots.ts:8](src/app/robots.ts#L8) — non-standard directive, ignored by Google. Harmless.

### SW-023 · No CSP or `Permissions-Policy`

- [~] **Partly done 2026-08-06.** Added `Permissions-Policy` (camera, microphone, geolocation, payment, usb, magnetometer, gyroscope, accelerometer all denied) — the row's own "free, do it regardless". Verified live on `/about/`.

**CSP still open, and still a decision.** The trade-off in the row stands: nonce-based forces dynamic rendering and costs the static generation; hash-based over the two inline script types is the compatible route. Not taken unilaterally.
**Where:** [next.config.ts:15-31](next.config.ts#L15-L31). HSTS, `nosniff`, `X-Frame-Options`, and `Referrer-Policy` are all correctly applied and verified live.

**Trade-off, stated so it isn't rediscovered later:** a nonce-based CSP forces dynamic rendering and would cost the full static generation this site currently gets. The compatible route is a **hash-based** CSP covering the two inline script types — the no-JS marker at [layout.tsx:63-68](src/app/layout.tsx#L63-L68) and the JSON-LD blocks. Add `Permissions-Policy` regardless; it's free.

### SW-024 · Dead code in `BrandVideo`

- [x] **Done** — the no-op `onPause={() => {}}` was removed while adding vertical-aspect support for the reel (see [VID](#vid--brand-reel-imported)). Build and lint clean after.

### SW-025 · ~40 MB of unreferenced assets in `public/`

- [x] **Done 2026-08-06.** Deleted **164 files, 54.2 MB**. `public/` went 225 files → 61.

The count is higher than the row's 157 because HS-1 (adopted in the same pass) freed `Erin-seaside.png` and `Timothy-seaside.png`, plus the 5 starter SVGs. Reconciles exactly.

**Kept the 6 unadopted headshot masters** in `public/images/team/` — they are staged for **HS-3**, not dead weight. They are the only unreferenced files remaining, deliberately.

Integrity re-verified: **0 missing**, 0 unreferenced apart from those 6. Build clean at 78 routes. All deleted files remain recoverable from git at `6cdf7ef`.
**Verified:** **157 of 210** files under `public/wp-content` are referenced nowhere (83 MB total directory). Plus 5 leftover starter assets: `public/next.svg`, `vercel.svg`, `globe.svg`, `file.svg`, `window.svg`.

Do this together with **V0117** (path migration) so assets are touched once. `_media-archive/` is already gitignored — leave it.

### SW-026 · Orphaned content entry

- [x] **Done 2026-08-06 — and "wire it up" would have been actively harmful.**

The entry was not merely orphaned, it was **corrupted**: `slug: "about-us"` but `heading: "Timothy Foley"`, `heroSubtitle: "Program Director"`, and a body that is Timothy Foley's bio. Someone overwrote the About content with a team bio.

**It also carried two claims flagged elsewhere in this register:**
- `metaDescription`: *"backed by **10+ years** of proven recovery success"* — the exact facility-tenure claim **FAC-3** rules out (established **2025**).
- The **BIO-3** Timothy Foley outcomes sentence: *"Under his guidance, the program has achieved higher patient engagement and improved long-term recovery outcomes."*

Neither was rendering, because the page hardcodes its own prose. But wiring the entry up — the row's alternative — would have published both. Deleted. Confirmed no facility "10+ years" claim remains anywhere in `src/` (Timothy's own "over seven years" clinician tenure in [team.ts](src/data/team.ts) is individual experience and stays).
**Verified:** `src/app/about/about-us/page.tsx` (now [src/app/about/our-story/page.tsx](src/app/about/our-story/page.tsx)) hardcodes its own prose and never reads `miscDetails`, so the entry (96 words + an unused `metaTitle`) is unreachable. Resolve alongside **V0073**.

### SW-027 · `Reveal` instantiates one IntersectionObserver per section

- [x] **Done 2026-08-06.** One module-level `IntersectionObserver` shared across all instances, with per-element callbacks in a `WeakMap` and each target unobserved once it fires. Created lazily so it is never constructed during SSR. The no-JS fallback and the `IntersectionObserver === undefined` failsafe are preserved.
**Where:** [src/components/Reveal.tsx:29-40](src/components/Reveal.tsx#L29-L40) — 22 instances on the homepage, each with its own observer. Homepage ships ~205 KB gzipped JS (mostly framework runtime). Micro-optimisation; the pattern is otherwise well-built, including the no-JS fallback.

---

# VIS — Design & content structure

From the **Visual Issues** tab: 98 substantive rows for Seaside across 36 pages. ⚠️ **This entire tab is unverified** — no Verdict or Verified column exists on it. Treat these as design proposals to confirm with the reviewer, not established defects.

The 98 rows collapse into **11 tasks**, because the tab is highly repetitive — the same instruction recurs across 8 substance pages, 7 area pages, and so on. Row-level mapping is in [Appendix B](#appendix-b--visual-issues-row-map).

**One structural finding underpins most of this.** I checked the data model: `bullets` is typed `string[]` ([src/data/types.ts:37](src/data/types.ts#L37)) and rendered as bare text ([src/components/DetailLayout.tsx:20-26](src/components/DetailLayout.tsx#L20-L26)). Verified: **zero `href`s exist in any of the 7 content JSON files.** So no body copy on the site links to anything, and bullets cannot be grouped or linked without a schema change. About 60 of the 98 rows are blocked behind that one change — **do VIS-1 first**, and most of the tab becomes data entry.

---

### VIS-1 · Grouped, linkable bullet component — the enabling change `~60 rows`

- [ ] **Task:** Extend the content schema so bullet lists can be grouped into labelled cards and can link, then add the rendering component.

**Where:** [src/data/types.ts:34-38](src/data/types.ts#L34-L38) (`DetailSection`) · [src/components/DetailLayout.tsx:10-28](src/components/DetailLayout.tsx#L10-L28) (`SectionBody`)

**Why:** the reviewer's single most repeated instruction — *"Instead of a long list of bullets, create a widget for X and Y, then list the items under each"* — appears 60 times. Beyond aesthetics, these detail pages currently present 1,100–1,600 words as undifferentiated bullet runs, which is genuinely hard to scan on mobile.

**Schema sketch:**
```ts
type BulletGroup = { label: string; items: string[]; icon?: string };
type DetailSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];                 // keep for back-compat
  groups?: BulletGroup[];             // new: renders as cards
  cards?: { title: string; text?: string; href?: string; icon?: string }[];
};
```
`groups` covers the symptom/effect splits; `cards` covers "link to each program". Both are additive, so existing content keeps rendering.

**The six recurring groupings the reviewer asked for:**

| # | Section pattern | Groups | Pages |
|---|---|---|---|
| A | "Signs and symptoms of X" | Physical / Behavioral / Psychological | 8 substance pages |
| B | "Short- and long-term effects" / "Understanding the risks" | Short-term / Long-term | 11 pages |
| C | Condition-specific symptom pairs | ADHD: Inattention / Hyperactivity-Impulsivity · Bipolar: Manic-Hypomanic / Depressive · Schizophrenia: Positive / Negative | 3 pages |
| D | "Treatment options for X" | 5 program cards → `/treatment/*` (Detox, Substance Abuse Residential, Mental Health Residential, Dual Diagnosis, Aftercare) | 8 substance pages |
| E | "X treatment at Seaside" / "Our X programs" | one card per service, linked | mental-health pages |
| F | Area-page program and therapy sections | program cards, linked | 7 area pages |

**Note on pattern C:** the reviewer's grouping is clinically standard (positive/negative symptoms for schizophrenia, manic/depressive for bipolar) — this is a genuine content-quality improvement, not just layout.

**Acceptance:** one condition page converted end-to-end and reviewed, then the remaining ~39 pages follow as data edits with no further component work.

---

### VIS-2 · Body copy links to nothing `9 rows`

- [ ] **Task:** Link entity mentions in body copy — substances, programs, conditions, the tour page.

| Ask | Pages | Rows |
|---|---|---|
| "Add a link to each substance detox page" | `/treatment/detox`, `/treatment/substance-abuse-residential` | 1376, 1380 |
| "Add a link to each mental health page referenced" | `/treatment/dual-diagnosis` | 1385 |
| "Add a link to tour page" | 5 area pages (Boynton, Delray, Wellington, Palm Beach County, South Florida) | 1399, 1402, 1406, 1410, 1414 |
| "Add a button link to areas we serve page" | `/admissions/help-for-loved-one` | 1333 |

**Verified:** zero area pages mention "tour" at all, and no content JSON contains a link. So these sections name programs and substances in prose while linking none of them.

**This is the one issue class my own audit structurally could not find.** I verified that every existing `href` resolves — 0 broken links. I did not and could not check whether text *should* have been a link. Genuine catch by the reviewer, and it's a real internal-linking/SEO gap: the condition and program pages are the site's deepest content and they orphan each other.

**Depends on:** VIS-1 (`cards[].href`), or use inline links in `paragraphs` via a small markdown-subset renderer.

---

### VIS-3 · Insurance verification form on area pages and CTAs `6 rows`

- [ ] **Task:** Decide whether to add an inline "Confidential insurance verification form", and where.

**Rows:** 1396, 1401, 1405, 1409, 1413, 1417 — the closing CTA on all 6 area pages.

**Verified:** `ContactForm` is used on **exactly one page**, `/contact` ([src/app/contact/page.tsx](src/app/contact/page.tsx)). Everywhere else, including `/admissions/insurance-verification`, only *links* to a form. So there is currently no insurance form anywhere on the site.

**⚠️ Read with SW-001 and SW-010 before building this.** Adding six new collection points multiplies two open risks: submissions currently succeed silently into a console log when `RESEND_API_KEY` is unset (**SW-001**), and each new form is another place prospective patients disclose health information on a page carrying third-party embeds (**SW-010**). Insurance verification also invites more sensitive data than the current contact form — member IDs, policy numbers, dates of birth. **Sequence: fix SW-001, settle SW-010, then build this.**

---

### VIS-4 · Google reviews section — this is the fix for SW-002 `4 rows`

- [ ] **Task:** Add a real Google-reviews section titled *"They trusted us with their recovery. So can you."*

**Rows:** 1394 (`/areas-we-serve/west-palm-beach`, "Missing section"), 1331 (`/admissions/help-for-loved-one`), 1329 (`/admissions/help-for-yourself`) — each asking for "Add google review slide show".

**Verified:** the heading already exists on the homepage ([src/app/page.tsx:359](src/app/page.tsx#L359)) — but it sits above the three **fabricated** testimonials from **SW-002**.

**These two rows solve each other.** SW-002 needs the placeholder quotes gone; VIS-4 wants real Google reviews in the same slot. Pulling live Google reviews satisfies both and removes the FTC exposure, because the reviews are attributable and independently verifiable. **Do these as one piece of work.** If a live Google Business Profile feed isn't available, hand-curate real reviews with permission and cite the source — do not ship the invented ones.

---

### VIS-5 · Homepage stats banner — conflicts with what's live, and needs substantiation `1 row`

- [ ] **Task:** Reconcile the proposed banner with the existing stats band, and substantiate every number before publishing.

**Row 1320** ("Missing Banner on the homepage") proposes:

| Proposed | Currently live ([site-content.ts:3-8](src/data/site-content.ts#L3-L8)) |
|---|---|
| Licensed Specialists & Medical Staff — **20+** | 24/7 — On-site clinical & medical care |
| Client Satisfaction Rate — **95%** | 1:1 — Personalized treatment plans |
| Years of Experience — **10+** | 5 — Levels of care, one campus |
| Confidential Admissions & Treatment — **100%** | PPO — Most major plans accepted |

**Correction:** the banner is not "missing" — a 4-up stats band is live at [src/app/page.tsx:187-197](src/app/page.tsx#L187-L197). The row is asking to **replace** its content, which is a different decision.

**⚠️ The proposed version swaps unfalsifiable framing for hard quantified claims.** "95% client satisfaction rate", "20+ licensed specialists", "10+ years of experience" are all specific, checkable assertions by a healthcare advertiser. Note the current site lists **8** team members ([src/data/team.ts](src/data/team.ts)), so "20+ licensed specialists" needs a roster to back it. Treat this exactly like **SW-002**: each figure needs a documented source before it ships, or it becomes the same FTC problem in a different component.

---

### VIS-6 · FAQ page needs topic grouping `1 row`

- [x] **Done 2026-08-06.** Added `category` to the `Faq` type and grouped the page.

The 39 questions turned out to be **already sequenced by topic** — from "what do you treat" through to "what does it cost", which is the order a prospective client actually asks in. So grouping preserved authoring order rather than sorting, and the boundaries fell naturally:

| Group | Questions |
|---|---|
| Addiction & Mental Health | 10 |
| Facility & Programs | 10 |
| Admissions & Intake | 9 |
| Insurance & Cost | 10 |

(Used "Insurance & Cost" rather than the row's "Insurance FAQ" — three of those ten are about cost, financial assistance and payment plans, not insurance.)

Also added a **"Jump to a topic" index** with per-group counts, matching the existing `OnThisPage` pattern on detail pages.

**Bonus the row predicted, delivered:** the page now has real `h2` structure (it had none). Verified in the DOM: 1 `h1`, **4 group `h2`s**, 39 accordion questions, 4 jump links matching 4 section ids, exactly **1** panel open on load (added a `defaultOpen` prop to `Faq` — otherwise each of the four groups opened its own first item), and the **FAQPage JSON-LD still emits all 39** questions flat, which is what the schema expects.

**Row 1322** — proposed headers: *Addiction & Mental Health FAQ · Facility & Programs FAQ · Admissions & Intake FAQ · Insurance FAQ*

**Verified:** [src/app/about/faq/page.tsx:48](src/app/about/faq/page.tsx#L48) renders all 39 as one flat accordion. At that length the reviewer's point stands on usability grounds alone.

**Bonus:** grouping also lets you emit a cleaner `FAQPage` JSON-LD, and gives the page real `h2` structure it currently lacks.

**Fix:** add a `category` field to the `Faq` type ([src/data/types.ts:40](src/data/types.ts#L40)) and group in the page component.

---

### VIS-7 · `/what-we-treat` hub — missing intro section and wrong imagery `3 rows`

- [ ] **Task:** Restore the intro section from the original site; correct the card imagery.

| Row | Ask |
|---|---|
| 1324 | Add the section *"We Help You Recover From Addiction and Mental Health Struggles"* as the intro, with a button link to `/treatment` — *"See more about our programs"* |
| 1325 | Remove images from the substance-use cards |
| 1326 | Use the original page's images for the mental-health cards |

**Verified:** the string *"We Help You Recover From Addiction…"* does **not** exist anywhere in this build — it was dropped in the migration. Cards render images unconditionally via `ServiceCard` ([src/components/cards.tsx:46-60](src/components/cards.tsx#L46-L60)), so suppressing them needs a prop (e.g. `showImage={false}`) or the compact `LinkTile` variant, which already renders image-free.

---

### VIS-8 · Remove a repeated line of copy `2 rows`

- [x] **Done 2026-08-06.** Removed from both locations in [misc.json](src/data/content/misc.json) — `help-for-yourself` and `help-for-loved-one`. Verified: 0 occurrences in the source and 0 on either rendered page. Also guarded against the sentence being embedded mid-paragraph rather than standing alone; it was not.

**Verified at** [src/data/content/misc.json:295](src/data/content/misc.json#L295) (under *"Break Free and Take Control of Your Life Again"*, `help-for-yourself`) and [:369](src/data/content/misc.json#L369) (under *"The Hardest Step Is Helping Them Take the First One"*, `help-for-loved-one`). Rows 1328, 1330. Two-line change.

---

### VIS-9 · Area-page cards use imagery that doesn't depict the areas `1 row`

- [x] **Done 2026-08-06.** Images dropped from the area cards.

Added a `showImage` prop to `ServiceCard` and `CardGrid` ([cards.tsx](src/components/cards.tsx)); `/areas-we-serve` passes `false`. The image-free variant keeps the map-pin icon so each card still has a visual anchor rather than becoming a bare text block.

**The reviewer was right and this was the clearest image defect on the site:** all seven areas were illustrated with photographs of the West Palm Beach building, so the Boca Raton, Delray Beach and Wellington cards showed the same property — a false implication on pages about other communities.

Verified: 7 area-card images gone, all 7 card links intact.

**Same prop unblocks VIS-7**, which needs exactly this control for the Substances and Mental-health cards.

**Related, left alone deliberately:** the area *detail* pages still use facility photography in their `PageHero`. That reads as the facility introducing itself rather than as a depiction of the town, and IMG-1's own surface table marks `PageHero` as correct — but worth a second opinion if the reviewer disagrees.

**Row 1327** — *"Remove the images for each widget, they dont apply to the areas being served."*

**Verified and the reviewer is right:** [src/data/catalog.ts:211-268](src/data/catalog.ts#L211-L268) assigns every area an interior or aerial photo **of the West Palm Beach facility**. So the Boca Raton, Delray Beach, and Wellington cards all show the same building — misleading on pages about other communities.

**Fix:** either drop images from these cards, or source genuine imagery per community. Dropping is the honest default.

---

### VIS-10 · Blog is missing posts from the original site `1 row`

- [ ] **Task:** Inventory the original blog and port what's missing.

**Row 1323** — *"Missing old blogs created for SSW. Add the blogs previously on SSW to this page."*

**Correction — scope needs establishing, and my earlier diff does not settle it.** My production↔build diff (see V0124) compared against the **current** production sitemap and found only 1 missing post. This row says posts *"previously on SSW"* are missing — which would include anything unpublished, drafted, or removed from production before I sampled it. Those wouldn't appear in a sitemap diff at all.

**Fix:** get the full post list from the WordPress admin (including drafts and trashed items), not from the sitemap, and diff that against the 13 posts in [src/data/posts.ts](src/data/posts.ts). Until that's done the true gap is **unknown** — it is at least 1 (V0124) and possibly much larger. Also relevant to **SW-016** (5 posts are under 600 words): if stronger originals exist, porting them may resolve the thin-content issue too.

---

### VIS-11 · `/about/about-us` → `/about/our-story` — duplicate of V0073 `1 row`

- [x] **Merged.** Row 1321 (*"Url clean up — about/about-us should be about/our-story"*) is the same finding as **V0073**, reached independently from the design side. Tracked under V0073, which carries the full link-update list. Independent corroboration from two reviewers is a good signal that the rename is the right call.

---

# BIO — Team bios

**Source:** [QHG master bio document](https://docs.google.com/document/d/1MWL4ki6HDCcUN-1mh2EFU-6eoMVpwpSSRMDm58Me3oA/edit) (125 KB, portfolio-wide). The **"Seaside Wellness PB"** section is lines 943–1015 and contains **9 people**. [src/data/team.ts](src/data/team.ts) has **8**.

Diffed sentence-by-sentence against the site on 2026-08-06:

| Person | Doc | Site | Unpublished |
|---|---|---|---|
| Kate Gulam, MSW | 237 w / 5 ¶ | 92 w / 2 ¶ | **+145 w** |
| Erin Crawford | 190 w / 3 ¶ | 91 w / 2 ¶ | **+99 w** |
| Steve Ryan | 167 w / 3 ¶ | 104 w / 2 ¶ | +63 w |
| Dr. Shaun Hutton | 149 w / 3 ¶ | 98 w / 2 ¶ | +51 w |
| Shán Raiford | 139 w / 4 ¶ | 89 w / 2 ¶ | +50 w |
| Michael Meagher | 135 w / 2 ¶ | 107 w / 2 ¶ | +28 w |
| Timothy Foley | 94 w / 2 ¶ | 88 w / 2 ¶ | +6 w |
| April Blair | 89 w / 1 ¶ | 84 w / 2 ¶ | +5 w |
| **Jennifer Penny** | 145 w / 3 ¶ | **absent** | **+145 w** |
| **Total** | **1,345 w** | **753 w** | **~592 w** |

**The pattern:** every published bio is truncated to **exactly 2 paragraphs**, regardless of how much approved copy exists. That looks like a migration-time cap, not an editorial decision — and it costs ~592 words of already-written, already-approved copy.

**Why this matters beyond fidelity:** these are clinician bios on a YMYL healthcare site. Named credentials, degree-granting institutions, and specific therapeutic modalities are exactly the experience-and-expertise signals Google weighs for medical content — and the material being withheld is disproportionately of that kind (Dr. Hutton's modality list, Kate Gulam's inpatient psychiatric experience, Erin Crawford's MSN in progress).

**Sequencing note:** do **BIO-2** before **SW-006**. Team meta descriptions are generated from `bio[0].slice(0, 130)` ([src/app/about/[member]/page.tsx:25](src/app/about/[member]/page.tsx#L25)), so changing the first paragraph changes all 8 meta descriptions. Fix the truncation bug once, after the copy is final.

---

### BIO-1 · Jennifer Penny is missing from the site entirely `P1`

- [x]
> **Resolved 2026-08-07 by the portal sync, not by this branch.** `origin/main` gained "Sync the team roster from the support portal", which replaced `team.ts` with a 9-member roster and expanded bios. Merged in at `6437263`. It closes **BIO-1** (Jennifer Penny added), **BIO-2** (bios expanded from 2 paragraphs) and **BIO-3** (Erin Crawford's MSN/FNP credential and Dr. Hutton's modality paragraph now published). **HS-2** is unblocked too: they added initials-fallback guards at all three render sites, so she ships with a "JP" monogram rather than waiting on a headshot — a better answer than blocking, though the photo is still worth collecting.
>
> ⚠️ **The sync corrupted one bio.** *"Dr. Hutton holds a Ph.D. and M.Phil. in Educational Psychology"* had become *"Dr. D. Phil. in Educational Psychology"* — broken English that also dropped her doctorate from the prose. Restored from the master bio document during the merge. **Check the sync script**: the same truncation could be affecting other facilities' bios in the portal pipeline.
>
> Its image paths pointed at `/wp-content/uploads/` files deleted in the asset migration; repointed to `/images/team/` during the merge.
 **Task:** Add Jennifer Penny, Client Care Coordinator, as the 9th team member.

**Where:** [src/data/team.ts](src/data/team.ts) — 8 entries; the doc has 9.

**Status:** full approved bio exists (145 words, 3 paragraphs). No headshot — I searched `public/` and `_media-archive/` for `*penny*` and `*jennifer*` and found nothing.

**Approved copy, verbatim from the doc:**

> Jennifer serves as a Client Care Coordinator and is passionate about helping individuals and families navigate the recovery process with compassion, understanding, and personalized support. With several years of experience in the behavioral healthcare field, she is dedicated to ensuring every client feels heard, valued, and supported from their very first interaction.
>
> Drawing from both her professional background and personal experience with recovery, Jennifer understands the courage it takes to ask for help. She is committed to making each client's experience as seamless, comfortable, and encouraging as possible while advocating for the care that best meets their unique needs.
>
> Jennifer believes that every person deserves the opportunity to heal and is honored to be part of each client's recovery journey. Her goal is to provide exceptional care, build meaningful connections, and help every individual take the next step toward lasting recovery with confidence and hope.

**Open question for the client:** the doc maintains its own *"BIOS NEEDED"* to-do list at the top (covering Quadrant, CALI, TEXAS, NJ, KY) and **Seaside appears nowhere in it** — so from the doc's perspective Seaside is complete. That means the headshot either exists outside this repo or Jennifer was added after the site's July content snapshot. **Confirm she is still on staff and request the headshot before publishing.** Do not ship a bio with a placeholder image.

**Note:** the doc gives no surname credentials or a slug. Suggested slug `jennifer-penny`, consistent with the existing 8. Adding her also changes the `/about` team preview, which shows `team.slice(0, 4)` ([src/app/about/page.tsx:100](src/app/about/page.tsx#L100)) — verify the 3-across grid on [/about/meet-the-team](src/app/about/meet-the-team/page.tsx) still balances at 9 cards.

---

### BIO-2 · Restore the full approved text for all 8 published bios `P2`

- [x]
> **Resolved 2026-08-07 by the portal sync, not by this branch.** `origin/main` gained "Sync the team roster from the support portal", which replaced `team.ts` with a 9-member roster and expanded bios. Merged in at `6437263`. It closes **BIO-1** (Jennifer Penny added), **BIO-2** (bios expanded from 2 paragraphs) and **BIO-3** (Erin Crawford's MSN/FNP credential and Dr. Hutton's modality paragraph now published). **HS-2** is unblocked too: they added initials-fallback guards at all three render sites, so she ships with a "JP" monogram rather than waiting on a headshot — a better answer than blocking, though the photo is still worth collecting.
>
> ⚠️ **The sync corrupted one bio.** *"Dr. Hutton holds a Ph.D. and M.Phil. in Educational Psychology"* had become *"Dr. D. Phil. in Educational Psychology"* — broken English that also dropped her doctorate from the prose. Restored from the master bio document during the merge. **Check the sync script**: the same truncation could be affecting other facilities' bios in the portal pipeline.
>
> Its image paths pointed at `/wp-content/uploads/` files deleted in the asset migration; repointed to `/images/team/` during the merge.
 **Task:** Replace the 2-paragraph truncations with the doc's complete text.

**Where:** [src/data/team.ts](src/data/team.ts) — `bio: string[]` per member

**Largest gaps, in priority order:**

**Kate Gulam (+145 w — biggest).** Three whole paragraphs missing, including substantial clinical experience: *"extensive experience working in high-acuity behavioral health settings, including serving as a therapist in an inpatient psychiatric hospital for children and later within a residential [setting]"*, her modality/approach paragraph, and a personal paragraph (husband Craig, dog Macho Man).

**Erin Crawford (+99 w).** See BIO-3 — includes a credential update.

**Steve Ryan (+63 w).** Missing his closing paragraph on the operational role, plus *"He understands that recovery is not a one-time event, but a daily commitment to growth, purpose, and doing the next right thing."*

**Dr. Shaun Hutton (+51 w).** Missing the entire modality paragraph — CBT, DBT, Motivational Interviewing, trauma-informed care, strengths-based intervention. For a PhD-level primary therapist this is the most consequential omission on the site after Kate's.

**Shán Raiford (+50 w).** Missing his philosophy paragraphs, incl. *"recovery is not just about sobriety — it is about rebuilding purpose, restoring dignity, and strengthening community."*

**Michael Meagher (+28 w).** Missing his scope-of-role sentence (clinical programming, staff supervision, regulatory compliance, utilization review, multidisciplinary treatment planning) and a pull-quote: *"This is not just my profession, it's my passion."* Consider rendering that quote as a `<blockquote>` rather than body text.

**April Blair (+5 w) and Timothy Foley (+6 w)** are near-parity — only light rewording. See BIO-3 for the one Timothy sentence that needs care.

**⚠️ Interaction with V0075:** that row found 4 of these bios reused on the QHG parent site above the boilerplate baseline. Publishing the fuller canonical text here will *increase* measured similarity if the parent republishes it. That does not change the recommendation — the facility pages already canonical correctly and V0075's remediation is explicitly parent-side — but flag it so the parent's copy is updated to link rather than re-host.

---

### BIO-3 · Factual and credential updates that change accuracy `P2`

- [x]
> **Resolved 2026-08-07 by the portal sync, not by this branch.** `origin/main` gained "Sync the team roster from the support portal", which replaced `team.ts` with a 9-member roster and expanded bios. Merged in at `6437263`. It closes **BIO-1** (Jennifer Penny added), **BIO-2** (bios expanded from 2 paragraphs) and **BIO-3** (Erin Crawford's MSN/FNP credential and Dr. Hutton's modality paragraph now published). **HS-2** is unblocked too: they added initials-fallback guards at all three render sites, so she ships with a "JP" monogram rather than waiting on a headshot — a better answer than blocking, though the photo is still worth collecting.
>
> ⚠️ **The sync corrupted one bio.** *"Dr. Hutton holds a Ph.D. and M.Phil. in Educational Psychology"* had become *"Dr. D. Phil. in Educational Psychology"* — broken English that also dropped her doctorate from the prose. Restored from the master bio document during the merge. **Check the sync script**: the same truncation could be affecting other facilities' bios in the portal pipeline.
>
> Its image paths pointed at `/wp-content/uploads/` files deleted in the asset migration; repointed to `/images/team/` during the merge.
 **Task:** Apply the substantive content changes, not just the length restoration.

These are not stylistic — the site is currently missing or understating facts:

| Person | Change | Why it matters |
|---|---|---|
| **Erin Crawford** | Doc: *"currently pursuing her Master of Science in Nursing with a concentration as a Family Nurse Practitioner (FNP)"* — **entirely absent from the site.** | An in-progress graduate credential for the **Director of Nursing**. Verify it's still accurate — she may have completed it since the doc was written, in which case publish the completed degree. |
| **Michael Meagher** | Doc: advanced into *"executive clinical leadership"*; site says *"clinical leadership"*. Plus the full scope-of-role sentence. | Understates the Clinical Director's seniority and remit. |
| **Dr. Shaun Hutton** | Add the CBT / DBT / MI / trauma-informed / strengths-based modality paragraph. | Named modalities are what prospective clients and referrers actually search for. |
| **Kate Gulam** | Add the high-acuity inpatient-psychiatric and residential experience. | Material clinical experience currently invisible. |
| **Timothy Foley** | Doc adds: *"Under his guidance, the program has achieved higher patient engagement and improved long-term recovery outcomes."* | **⚠️ Do not publish as-is without substantiation.** This is an outcomes claim by a healthcare provider — the same category of exposure as **SW-002** (fabricated testimonials) and **VIS-5** (the 95%-satisfaction stat). Either document the measurement behind it or soften to non-quantified language. |

**Acceptance:** each of the 8 bios reviewed and signed off by the person or by HR, with the Erin Crawford and Timothy Foley items explicitly confirmed.

---

### BIO-4 · Steve Ryan's job title differs between doc and site `P3`

- [ ] **Task:** Confirm the correct title, then align.

| Source | Title |
|---|---|
| Doc heading | `Operations Director` |
| Site ([team.ts:73](src/data/team.ts#L73)) | `Director of Operations` |
| **Doc's own bio prose** | *"Steven Ryan serves as the **Director of Operations** at Seaside Wellness Palm Beach…"* |

**The site matches the doc's prose; the doc's own heading is the outlier.** So this is most likely a heading typo in the source document, not a site error. Confirm with HR and, if so, **fix the doc rather than the site.** Flagged only so nobody "corrects" the site to the wrong value.

**Note:** the doc also uses "Steve Ryan" in the heading and "Steven Ryan" in the prose; the site uses "Steve Ryan" as display name and "Steven" in the bio text — consistent with the doc. No change needed.

---

### BIO-5 · Site credentials are richer than the doc headings — verified correct, no action `P3`

- [x] **Checked — no action needed.** Three site entries carry credentials the doc's *headings* omit. I confirmed each is corroborated by the doc's own **bio prose**, so the site is right and nothing should be stripped:

| Person | Site credentials | Corroborating doc text |
|---|---|---|
| Timothy Foley | `BS, Behavioral Science` | *"holds a bachelor's degree in behavioral science"* |
| Erin Crawford | `RN, BSN` | *"Registered Nurse"* … *"earning her Bachelor of Science in Nursing"* |
| Shán Raiford | `NCRC` | *"is a National Certified Recovery Coach (NCRC)"* |

Recorded so a future doc-to-site sync doesn't delete valid credentials just because the headings are terser.

---

# IMG — Image system, end to end

**This section adds no new findings.** It consolidates image work that is already logged across five sections — **VIS-7, VIS-9, HS-1, HS-3, VID-3, SW-025, V0117** — into one sequenced work order, because those tasks all touch the same file tree and doing them separately means rewriting the same paths three times.

### Current inventory

| | Count |
|---|---|
| Images under `public/wp-content/uploads/` | 210 |
| **Actually referenced by the site** | **54** |
| Unreferenced (dead weight, ~40 MB) | **157** → **SW-025** |
| New assets already on the neutral path | 8 headshots + 1 poster → `public/images/` |

Of the 54 in use: **24 facility photographs**, 15 licensed stock, 5 brand/logo marks, 10 other.

### The placement rule

One rule resolves most of what's mis-set today:

> **A facility photograph belongs only where the subject *is* the facility.** Where the subject is a clinical condition or a town the facility isn't in, a facility photo makes a false implication.

### Surface-by-surface

| Surface | Current source mix | Correct per that rule | Task |
|---|---|---|---|
| Homepage hero, intro, tour teaser | facility | ✅ correct — subject *is* the campus | — |
| `PageHero` on every page | facility | ✅ correct | — |
| Tour gallery (22) | facility | ✅ correct | — |
| **Programs (5)** | 5 facility | ✅ correct — these are the facility's own programs | — |
| Therapies (3) | 3 stock | ✅ acceptable — generic clinical settings | — |
| **Substances (9)** | 9 stock | reviewer wants **images removed** from these cards | **VIS-7** |
| **Mental health (7)** | **5 facility interiors** + 2 stock | reviewer wants the original site's imagery | **VIS-7** |
| **Areas (7)** | **6 facility** + 1 stock | ❌ **wrong** — every area card shows the *same West Palm Beach building*, on pages about Boca Raton, Delray, Wellington | **VIS-9** |
| Blog posts (13) | 5 facility + 8 stock | ✅ acceptable | — |
| Team headshots (8) | 8 | 2 are sub-750 px; masters now stored | **HS-1**, **HS-3** |
| Brand reel aerials | facility + area | confirm which building is the facility | **VID-3** |

**The one clear defect is Areas.** Six of seven area pages illustrate a different town with a photograph of the West Palm Beach property. Mental-health cards using facility interiors are defensible (calm setting) but the reviewer asked for the originals — that's a preference, not an error, and worth confirming before changing.

---

### IMG-1 · Do the image tree in one pass, in this order `P2`

- [x] **Done 2026-08-06 — 5 of 6 steps complete; step 3 is the one client decision left.**

1. ✅ **SW-025** — 164 unreferenced files / 54.2 MB deleted.
2. ✅ **VIS-9** — area-card imagery dropped.
3. ⏳ **VIS-7** — Substances / Mental-health card imagery. The `showImage` prop VIS-7 needs **now exists** (added for VIS-9), so this is a one-line change per surface once confirmed. Unverified tab — still wants the reviewer's sign-off.
4. ✅ **HS-1** — both genuine headshot upgrades adopted, identity verified visually.
5. ✅ **V0117 + HS-3** — everything migrated off `/wp-content/`.
6. ⏳ **VID-3** — confirm the reel's aerials depict this property (needs someone who knows the site).

**Acceptance met:** `public/` contains only referenced assets, no path starts with `/wp-content/`, integrity reports 0 missing and 0 unreferenced. Done pre-launch as the row required, so no image-URL equity was discarded.

Every one of these edits the same `image:` fields in `src/data/*.ts`. Done separately that's three passes over the same lines and three rounds of review.

**Order matters — each step reduces the work of the next:**

1. ~~**SW-025 — delete the unreferenced files first.**~~ ✅ **Done 2026-08-06** — 164 files / 54.2 MB removed; `public/` is 225 → 61 files. The 6 unadopted headshot masters were deliberately kept for step 5.
2. **VIS-9 — fix the Areas imagery.** Either drop images from the area cards (honest default, and `LinkTile` already renders image-free) or source genuine per-community photography. Do this *before* the path migration so you're not moving files you're about to unassign.
3. **VIS-7 — settle the Substances and Mental-health card imagery** with the reviewer. Needs a `showImage={false}` prop on `ServiceCard` ([src/components/cards.tsx:46-60](src/components/cards.tsx#L46-L60)) or a switch to `LinkTile`.
4. ~~**HS-1 — adopt the two headshot upgrades**~~ ✅ **Done 2026-08-06** — Erin Crawford and Timothy Foley repointed to `/images/team/`, identity re-verified visually first.
5. **V0117 + HS-3 — migrate what survives** off `/wp-content/uploads/` to `/images/`. By now the set is much smaller. Update the base constants in one place: `F` in [catalog.ts:3](src/data/catalog.ts#L3), `U` in [tour/page.tsx:22](src/app/tour/page.tsx#L22), `site.logo` in [site.ts:23](src/lib/site.ts#L23), plus the literals in [Footer.tsx](src/components/Footer.tsx) and [site-content.ts](src/data/site-content.ts).
6. **VID-3 — confirm the reel's aerials** depict this property.

**Acceptance:** `public/` contains only referenced assets; no path starts with `/wp-content/`; the image-integrity check in [Appendix A](#appendix-a--reproduction-commands) reports 0 missing and 0 unreferenced.

**⚠️ Do step 5 before launch, not after.** Migrating paths changes every image URL. Post-launch that discards accumulated image-URL equity and breaks any external hotlinks; pre-launch it costs nothing.

---

# VID — Brand reel (imported)

**Source:** `~/Downloads/Seaside Wellness of Palm Beach/SWPB Video/Reel 1.mp4`

**The folder contains exactly one file and no images.** Worth recording, because the original instruction was to import "all the images in this folder" and replace the site's facility photography. There are none to import — so the existing imagery stays, per your call, and only the video was brought in. **VIS-7** and **VIS-9** (card imagery) remain open on their own merits.

### What was imported

| | Original | Stored in repo |
|---|---|---|
| Path | `SWPB Video/Reel 1.mp4` | [public/video/seaside-reel.mp4](public/video/seaside-reel.mp4) |
| Size | **390 MB** | **16 MB** (24× smaller) |
| Video | H.264 1080×1920, 24 fps, **57 Mbps** | H.264 1080×1920, CRF 26 |
| Audio | AAC 317 kbps | AAC 128 kbps stereo |
| Duration | 57.1 s | unchanged |
| Poster | — | [public/images/seaside-reel-poster.jpg](public/images/seaside-reel-poster.jpg) — 1080×1920, 114 KB, frame @ 30 s |

57 Mbps is 20–40× more than web needs; that alone accounted for the 390 MB. Resolution was left at 1080×1920 rather than downscaled, because `preload="none"` means the file only downloads when someone presses play — so the weight costs nothing on page load and the quality headroom is free. `+faststart` was applied so it begins streaming without fetching the whole file.

Assets went to `public/video/` and `public/images/` — the neutral paths, not `wp-content/`, consistent with **V0117**.

### Shot list (labelled from frame extraction)

Vertical 9:16 social reel, ending on the Seaside Wellness logo lockup:

1. Aerial — coastal shoreline, beachfront buildings
2. Interior — twin-bed client suite, pale green walls
3. Beach — thatched tiki structure at the shoreline
4. Beach — figure at a railing, dune and US flag
5. Exterior — facility building, tile roof, palms
6. Patio — two women in conversation in egg chairs (therapeutic setting)
7. Detail — outdoor seating, palm-print cushions
8. Clinical — clinician at a whiteboard during a group session
9. Aerial — white multi-storey building near the ocean
10. Beach — yoga on the sand *(used as the poster)*
11. Pool — pool, tiki hut, palms
12. Aerial — surf, closing **Seaside Wellness** logo

Interspersed title cards: *"Because no matter how difficult"*, *"Meaningful change"* — i.e. the reel carries **burned-in open captions**, not a caption track.

### Where it lives

[src/app/tour/page.tsx](src/app/tour/page.tsx) — a new dark band between the brand film and the photo gallery, giving the page a white → dark → cream rhythm. Two columns on desktop: copy left, the vertical player constrained to 22 rem so a 9:16 video doesn't dominate the layout.

[src/components/BrandVideo.tsx](src/components/BrandVideo.tsx) gained two props rather than duplicating the component:
- `aspect: "video" | "portrait"` → `aspect-video` or `aspect-[9/16]`, default unchanged
- `sizes` → so the poster isn't fetched at `100vw` when the player sits in a 352 px column

Verified: `next build` clean (77 routes), `eslint` clean, `/tour` returns 200 with the section rendered, and both new assets serve (`video/mp4`, `image/jpeg`).

---

### VID-1 · Decide whether the reel also belongs on the homepage `P3`

- [ ] **Task:** Confirm `/tour` is the right and only home for it.

The homepage already runs the landscape brand film at [src/app/page.tsx:182](src/app/page.tsx#L182). Two videos on one page is a lot of weight and a lot of asking. `/tour` is the natural fit and where someone evaluating the property will look — but it's your call, and moving it is a two-line change.

---

### VID-2 · Captions: the reel has open captions, the brand film has none `P2`

- [ ] **Task:** Confirm the reel's burned-in text covers all spoken audio; add a caption track if not.

**Relates to SW-007.** The reel's burned-in title cards are *open captions* — always visible, which does serve deaf and hard-of-hearing viewers. But I only sampled frames, so I cannot confirm they caption **all** speech; if the reel has voiceover or on-camera dialogue beyond those cards, WCAG 1.2.2 still isn't met.

Two things follow:
1. Check whether the reel's audio is music-only or contains speech. Music-only needs no captions; speech does.
2. **SW-007 stands regardless** — the landscape brand film on `/` and `/tour` has no captions at all, and that's the larger gap.

A `.vtt` track is preferable to burned-in text either way: toggleable, translatable, and machine-readable.

> **⚠️ Review 2026-08-06 — the reel is now the inconsistent one.**
>
> `SW-007` gave the brand film both a caption track **and** a prose transcript, on an argument that applies just as directly to the reel. From the `transcript` prop's own doc comment in [BrandVideo.tsx](src/components/BrandVideo.tsx):
>
> > *"Not optional in spirit: this film carries its narrative in full-screen text cards, and burned-in text is an image — so without this the story is unavailable to screen-reader users no matter what the audio does."*
>
> **The reel carries burned-in text cards too** — I read at least *"Because no matter how difficult"* and *"Meaningful change"* off extracted frames. But [tour/page.tsx:103-109](src/app/tour/page.tsx#L103-L109) passes the reel neither `captionsSrc` nor `transcript`. So the reel's narrative is invisible to a screen reader for exactly the reason the brand film's was, and the component already has the prop to fix it.
>
> **Fixed 2026-08-06 — transcript shipped, captions deliberately withheld.**
>
> Sampled the reel at 1.5–2 fps and recovered its full on-screen text. Two sentences, spelled out across five progressive cards:
>
> 1. *"Meaningful change"* → *"can happen"* (≈23.8–25.8 s)
> 2. *"Because no matter how difficult"* → *"today may feel,"* → *"a different tomorrow is POSSIBLE."* (≈38.4–43.8 s)
>
> Unlike the brand film's closing card these are **progressive, not cumulative** — each shows only its new fragment — so they transcribe literally without the stutter problem. Now in [src/data/reel.ts](src/data/reel.ts) and passed as `transcript` with `transcriptLabel="Read the on-screen text"`.
>
> **⚠️ No caption track for the reel, on purpose — and this is a finding in itself.** Frame sampling shows an **on-camera interview at roughly 33–35 s**: a man speaking directly to camera, whom the text cards plainly do not caption. A `<track kind="captions" default>` built only from the cards would assert complete English captions over a clip containing untranscribed speech. Shipping the transcript closes the screen-reader gap; captions still need that interview transcribed by someone who can hear it.
>
> **This also settles question 1 above for the reel:** its audio is *not* music-only. That raises the prior that the brand film's is not either, since both came from the same production.

---

### VID-3 · Confirm the aerials depict this facility `P2`

- [ ] **Task:** Verify which aerial shots are the property at 106 Blossom Ln versus the surrounding area.

Shots 1, 9 and 12 are aerials of beachfront buildings and shoreline. Some clearly establish the coastal setting, which is fine and normal. But at least one — the white multi-storey building in shot 9 — reads as a *specific* building, and I can't tell from frames whether the facility occupies it.

**Why I'm flagging it.** The site asserts a specific address, and a reel that implies the facility occupies a building it doesn't would be a property misrepresentation on a licensed healthcare site. This is the same accuracy concern as **VIS-9** (every area card currently shows the same West Palm Beach building) and **FAC-1** (the unresolved municipality). If any aerial is neighbouring property, that's fine — just make sure the surrounding copy frames it as the setting rather than the facility.

---

### VID-4 · Consider a CDN for video `P3`

- [ ] **Task:** Evaluate moving both videos off the Vercel deployment.

The repo now carries **~28 MB of video** — the 11.7 MB brand film plus this 16 MB reel. `README.md` already raises this: *"For heavy traffic, consider hosting video on a dedicated CDN/streaming host."* Two files makes the case stronger. A streaming host also brings adaptive bitrate, so mobile viewers aren't fetching a 1080×1920 master.

Folds naturally into **SW-025** (asset cleanup) and **V0117** (path migration) — one pass over the media tree.

---

# HS — Staff headshots

**Source:** `~/Downloads/Staff Headshots/Florida/` — 8 files, exactly the 8 people currently on the site. Swept all 8 sibling folders (California, Texas, Iowa, NJ, Kentucky, Quadrant) to confirm no Seaside person is misfiled elsewhere.

**Stored in this repo:** `public/images/team/` — 8 files, **2.4 MB total**.

Deliberately **not** `public/wp-content/uploads/…`. New assets go to a neutral path so this work advances **V0117** instead of deepening the legacy convention.

**Processing:** downscaled to 1400 px on the long edge at JPEG q86. That is generous headroom — the largest render is the ~420 px card in [meet-the-team](src/app/about/meet-the-team/page.tsx) and the 22 rem (352 px) portrait on the member page, so 1400 px covers 3× DPR. Two files were **copied unmodified** because they were already below the target and upscaling would only have inflated bytes without adding detail.

### Mapping

| Slug | Stored file | Dimensions | Currently referenced in [team.ts](src/data/team.ts) | Verdict |
|---|---|---|---|---|
| `erin-crawford` | `erin-crawford.jpg` | 1400×1400 (from 3460²) | `Erin-seaside.png` — **742×737** | 🔼 **4.7× upgrade** |
| `timothy-foley` | `timothy-foley.jpg` | 1400×1400 (from 3425²) | `Timothy-seaside.png` — **748×746** | 🔼 **4.6× upgrade** |
| `shan-raiford` | `shan-raiford.jpg` | 1400×1400 (from 2240²) | `ShanRaiford2-1.jpg` — 2240×2240 | same shot, no gain |
| `steve-ryan` | `steve-ryan.jpg` | 1400×1400 (from 2241²) | `SteveRyan.jpg` — 2241×2241 | same shot, no gain |
| `april-blair` | `april-blair.jpg` | 1400×943 | `April-Blair.png` — 1528×1029 | same shot, no gain |
| `shaun-hutton` | `shaun-hutton.jpg` | 1400×940 | `Shaun-Hutton.png` — 1530×1028 | same shot, no gain |
| `michael-meagher` | `michael-meagher.jpg` | 1024×1024 *(unmodified)* | `Michael-Meagher-1.jpg` — 1024×1024 | same dims, less-compressed master |
| `kate-gulam` | `kate-gulam.jpg` | 880×1168 *(unmodified)* | `Kate-Gulam.jpg` — 880×1168 | same shot, no gain |
| **`jennifer-penny`** | — | — | — | ❌ **no headshot exists** |

**6 of 8 are the same photograph already live at the same dimensions**, so there is nothing to gain by swapping them. Only Erin Crawford and Timothy Foley are real improvements — both are currently served as sub-750 px PNGs of photographs, which is both the wrong format and under-resolution for a 2× card render.

---

### HS-1 · Adopt the two genuine upgrades `P2`

- [x] **Done 2026-08-06.** Both repointed to `/images/team/`.

**Identity re-verified independently before changing anything** — not inherited from the note below, given the `CRITICAL` V0054 precedent and the "never name-match headshots" rule. Opened all four files and compared: Erin Crawford is the same shoot (same glasses, green blazer over black mock-neck, gold cross necklace, nose stud); Timothy Foley likewise (same dark green polo, beard, pose, background). In both cases the stored master is a wider, higher-resolution crop of the same frame. 1400×1400 replacing 742×737 and 748×746.

```ts
// src/data/team.ts
erin-crawford:  "/wp-content/uploads/2025/08/Erin-seaside.png"    → "/images/team/erin-crawford.jpg"
timothy-foley:  "/wp-content/uploads/2025/08/Timothy-seaside.png" → "/images/team/timothy-foley.jpg"
```

**Identity verified visually before recommending this.** I compared each new file against the one currently live: same person, same shoot, same wardrobe — the site versions are simply lower-resolution crops of the same frame. Worth stating explicitly because the workbook carries a `CRITICAL` row elsewhere in this portfolio (V0054) for a **wrong person's biography**, so a headshot swap is not a change to make on filename inference alone.

**Also checked:** the two landscape sources (April Blair, Shaun Hutton at ~1400×940) are cropped to 4:5 portrait by `object-cover` on the team cards. I viewed both — each subject sits near the horizontal centre, so the centre-crop is safe. No re-cropping needed.

**Side benefit:** removes two PNG-encoded photographs (536 KB and 448 KB at under 750 px) in favour of JPEG at 1400 px for 464 KB and 452 KB — better quality at comparable weight.

---

### HS-2 · Jennifer Penny has no headshot anywhere — BIO-1 stays blocked `P1`

- [ ] **Task:** Request Jennifer Penny's headshot from HR.

**Searched exhaustively and it does not exist:** all 124 files across all 8 folders of `Staff Headshots/`, plus every image in `~/Downloads`, plus `public/` and `_media-archive/` in this repo. No match for `penny`.

**⚠️ Do not use `Staff Headshots/Quadrant/Admissions/Jennifer Weisheit.jpg`.** It is the only "Jennifer" in the tree and it is **a different person** — Quadrant Admissions, not Seaside's Client Care Coordinator. A filename-based match would publish a stranger's face under Jennifer Penny's bio. This is precisely the failure mode behind the portfolio's `CRITICAL` V0054 row, so it is worth naming.

**Consequence:** **BIO-1** cannot ship. The approved bio text is ready (145 words, quoted in full under BIO-1) but there is no image. Combined with Seaside's absence from the bio doc's own *"BIOS NEEDED"* list, the likeliest explanation is that Jennifer joined after the July content snapshot and the headshot was never collected.

**Ask HR for:** the headshot, confirmation she is still on staff, and any credentials for the `credentials` field. Do not ship with a placeholder or a generic avatar.

---

### HS-3 · Consolidate all team images onto the neutral path `P3`

- [x] **Done 2026-08-06 — but not the way this row describes, because the premise was wrong.**

**⚠️ Correction.** This row calls swapping the 6 remaining bios to the stored masters a "lateral move… identical in dimensions". I measured them. It is a **downgrade for 4 of 6**:

| slug | live (wp-content) | stored master | |
|---|---|---|---|
| shan-raiford | **2240×2240** | 1400×1400 | master is smaller |
| steve-ryan | **2241×2241** | 1400×1400 | master is smaller |
| shaun-hutton | **1530×1028** | 1400×940 | master is smaller |
| april-blair | **1528×1029** | 1400×943 | master is smaller |
| kate-gulam | 880×1168 | 880×1168 | equal |
| michael-meagher | 1024×1024 | 1024×1024 | equal |

So instead of swapping, I **moved the live files** to `/images/team/<slug>` and deleted the six now-redundant downscaled masters. Same path consolidation, no resolution loss — and **zero identity risk**, since moving the file the site already serves cannot change who is shown. (That is a nicer property than the swap, given the `CRITICAL` V0054 precedent.)

`/images/team/` now holds 8 slug-named files: the two genuine HS-1 upgrades plus these six.

The 8 masters are already stored, so this is now a find-and-replace in [src/data/team.ts](src/data/team.ts) plus deleting 8 files from `public/wp-content/uploads/{2025/08,2026/02,2026/06}/`.

**Do it as part of V0117 and SW-025**, not on its own — those two already cover moving all 210 assets off `/wp-content/` and deleting the 157 unreferenced ones. Touch the image tree once. Until then the team images are deliberately split across two paths, which is untidy but harmless: every path in `team.ts` still resolves.

**Note:** the 6 "no gain" files are byte-different from the live versions (re-encoded at some point) but identical in dimensions and content. Swapping them is a lateral move — worth doing only for the path consolidation, not for quality.

---

# FAC — Facility master data reconciliation

**Source:** facility master-data row supplied 2026-08-06. Reconciled field-by-field against [src/lib/site.ts](src/lib/site.ts), the JSON-LD in [src/lib/seo.ts](src/lib/seo.ts), and live production.

| Field | Master data | Site | |
|---|---|---|---|
| Company | Seaside Wellness of Palm Beach | `site.legalName` — identical | ✅ |
| Site URL | `https://seasidewellnesspb.com/` | `site.url` (no trailing slash) | ⚠️ see V0102 |
| **LOC** | **Detox & Res** | homepage stat claims **"5 Levels of care"** | ❌ **FAC-2** |
| SUD / MH | x / x | both covered extensively | ✅ |
| **In-patient beds** | **40** | never stated | ⚠️ **FAC-5** |
| Address | 106 Blossom Ln | identical | ✅ |
| **City** | **Palm Beach Shores, FL** | **West Palm Beach** | ❌ **FAC-1** |
| Zip | 33404 | identical | ✅ |
| Phone | 855-416-5648 | `(855) 416-5648` / `tel:+18554165648` | ✅ |
| **Est.** | **2025** | no founding date; VIS-5 proposes "10+ years" | ❌ **FAC-3** |
| **GMB review link** | `g.page/r/CRHaJQE1cADDEAI/review` | **no review link anywhere on the site** | ❌ **FAC-4** |

---

### FAC-1 · City of record conflict — Palm Beach Shores vs West Palm Beach `P0`

- [~] **Tiebreaker checked 2026-08-06 — and it points the other way. No site change needed. Downgrading from P0.**

This row said: *"The tiebreaker is the Google Business Profile, and I have its place ID."* I checked it. Requested the public listing for `ChIJnYAXE9PZ2IgREdolATVwAMM` (the exact place ID the master-data review link resolves to) and it publishes:

```
Seaside Wellness of Palm Beach, 106 Blossom Ln, West Palm Beach, FL 33404
```

So the tally is now **3 to 1**:

| Source | City |
|---|---|
| **Google Business Profile** | **West Palm Beach** ✅ |
| This build (`site.address`) | West Palm Beach ✅ |
| Live production | West Palm Beach ✅ |
| Facility master-data row | Palm Beach Shores ❌ **— the outlier** |

**What this settles, and what it does not.** The row's stated worry was a mismatch between site schema, GBP and citations breaking local-pack eligibility. **That mismatch demonstrably does not exist** — `addressLocality` already agrees with the GBP. The urgent SEO risk is gone, and the recommended fix (rewrite `site.address` to Palm Beach Shores) would have *created* the very mismatch it was meant to remove. **The site was right; do not change it.**

What it does **not** settle is the *legal* municipality. A GBP address is self-reported by the business, so it is not independent of the site's own claim — and ZIP 33404 genuinely spans parts of West Palm Beach, Riviera Beach and Palm Beach Shores. The authoritative source remains the **AHCA/DCF licence**.

**Remaining task (now low-priority due diligence, not remediation):** confirm the municipality on the state licence. If it says Palm Beach Shores, the correct response is to fix the **master-data row and the GBP**, not the site — and only `site.address` would change, never the marketing copy (that guidance in this row still stands).

**Also unblocks:** `geo` in the Organization schema (SW-021), which I left out precisely because this was unresolved.

**The conflict.** Same street, same ZIP, different city:

| Source | City |
|---|---|
| Facility master data | **Palm Beach Shores, FL 33404** |
| [src/lib/site.ts:13](src/lib/site.ts#L13) · `site.address.city` | West Palm Beach |
| [src/lib/site.ts:16](src/lib/site.ts#L16) · `site.address.full` | `106 Blossom Ln, West Palm Beach, FL 33404` |
| `addressLocality` in Organization JSON-LD — **all 70 pages** | West Palm Beach |
| **Live production** (verified 2026-08-06) | West Palm Beach — visible address *and* `addressLocality` |

**This is not a migration regression.** I checked production directly: it publishes "West Palm Beach" in both its footer and its schema. The new build carried that value faithfully. The disagreement is between the master data and *both* versions of the website.

**Why it matters.** `addressLocality` is the field Google matches against the Google Business Profile for local-pack eligibility, and it's asserted on every page of a licensed medical facility's site. A mismatch between site schema, GBP, and citations is a first-order local-SEO problem — and an inaccurate published municipality for a healthcare provider is a factual-accuracy problem regardless of SEO.

**I cannot resolve which is correct from here, and shouldn't guess.** Both city names are plausibly deliverable for ZIP 33404. The tiebreaker is the Google Business Profile, and I have its place ID from the review link supplied: **`ChIJnYAXE9PZ2IgREdolATVwAMM`**. Check the locality on that listing, and confirm against the state licensure record — the municipality on the AHCA/DCF license is the authoritative one.

**Recommended fix — and note this is deliberately narrow.** If the municipality of record is Palm Beach Shores:
1. Correct `site.address.city` and `site.address.full` ([src/lib/site.ts:11-17](src/lib/site.ts#L11-L17)) — this propagates to the JSON-LD, footer, and contact page automatically.
2. Align the GBP listing and major citations to match.
3. **Do not rewrite the marketing copy.** "West Palm Beach" appears in page titles, H1s, meta descriptions, and the `/areas-we-serve/west-palm-beach` page throughout. Referencing the West Palm Beach market is legitimate and remains accurate — the facility genuinely serves it and sits minutes away. Only the *structured address* has to state the legal municipality. Conflating the two would mean discarding the site's entire keyword position for no compliance benefit.

**Acceptance:** `addressLocality`, the footer NAP, the GBP listing, and the licensure record all state the same city.

---

### FAC-2 · "5 Levels of care" contradicts the licensed scope — and the site's own FAQ `P1`

- [x] **Done 2026-08-06.** Changed to **3**, labelled "Levels of care on site".

Took the row's first option as the more defensible one for a licensed facility. Three matches both the licensed scope and the site's own FAQ: medical detox, substance abuse inpatient rehabilitation, and mental health inpatient stabilization. The old **5** counted *programs* — folding in dual diagnosis (a clinical specialisation) and aftercare (not a licensed level).

Dropped the "one campus" qualifier too, since that was the specific phrase the FAQ contradicted: PHP and IOP are available *through affiliated network facilities*, not on this campus. Verified the old string is gone from the rendered homepage.

**Where:** [src/data/site-content.ts:6](src/data/site-content.ts#L6) — `{ value: "5", label: "Levels of care, one campus" }`

**Three different numbers are in play, all on or about the same site:**

| Source | Levels of care at this location |
|---|---|
| Master data `LOC` | **2** — Detox & Res |
| Site's own FAQ ([misc.json:75](src/data/content/misc.json#L75)) | **3** — *"medical detox, substance abuse inpatient rehabilitation, and mental health inpatient stabilization"* |
| Homepage stat | **5** |

**The "5" appears to count *programs*, not levels of care** — detox, substance-abuse residential, mental-health residential, dual diagnosis, and aftercare. But dual diagnosis is a clinical specialisation, not a level of care, and aftercare is not a licensed level either. So the stat inflates two program offerings into three extra levels.

**The site already gets this right elsewhere,** which is what makes the stat a defect rather than a judgement call. The FAQ is careful and accurate: PHP and IOP *"are available through our affiliated facilities within the same treatment network."* The stat's own qualifier — **"one campus"** — is precisely the claim the FAQ contradicts.

**Fix:** change to `3` with the FAQ's framing, or re-label to `"Programs, one campus"` and keep 5. The first is more defensible for a licensed facility.

---

### FAC-3 · Established 2025 — which rules out the "10+ years" stat `P1`

- [~] **Schema done 2026-08-06. The "10+ years" claim needs no code change — but watch for it.**

1. **"10+ years" was never in the codebase**, so there is nothing to remove — it was a *proposal* in VIS-5. Do not adopt it. Worth knowing: I found the same claim lurking in the orphaned `about-us` content entry (*"backed by 10+ years of proven recovery success"*), which is one reason **SW-026** deleted that entry rather than wiring it up. Confirmed no facility-tenure claim remains anywhere in `src/`.
2. ✅ **`foundingDate: "2025"` added** to the Organization JSON-LD ([seo.ts](src/lib/seo.ts)), verified in the rendered output. It is a legitimate trust signal and it forecloses the ambiguity.
3. If tenure framing is wanted, the accurate options remain: individual clinician experience (labelled as such), or "part of a network operating since 2020" for the parent.

Timothy Foley's *"over seven years"* in [team.ts](src/data/team.ts) stays — that is individual clinician experience, not a facility claim.

**Master data: `Est. 2025`.**

**This settles the concern I raised in VIS-5.** That row proposes a homepage banner reading *"Years of Experience — 10+"*. For a facility established in 2025 that is unsupportable as a facility claim. Individual clinicians have the experience — Michael Meagher 13 years, Dr. Hutton 25+ — but a *facility* stat implies institutional tenure. Attributing it to the facility on the homepage of a healthcare provider is the same exposure class as **SW-002** and the Timothy Foley outcomes sentence in **BIO-3**.

**Fix:**
1. Do not publish "10+ years" as a facility stat. If the intent is team tenure, label it as such — *"Combined clinical experience"* with a defensible number.
2. Add `foundingDate: "2025"` to the Organization JSON-LD ([src/lib/seo.ts:14-39](src/lib/seo.ts#L14-L39)) — currently absent. It's a legitimate trust signal and it prevents the ambiguity.
3. Note the parent is older: the master bio doc records Quadrant Health Group as founded **2020**. "Part of a network operating since 2020" is accurate and available if tenure framing is wanted.

---

### FAC-4 · Google review link exists but is used nowhere — unblocks VIS-4 and SW-002 `P1`

- [~] **3 of 4 done 2026-08-06. Only the review pull is outstanding.**

1. ✅ **`placeId`, `mapUrl`, `reviewsUrl`, `reviewUrl` added** to `site` ([site.ts](src/lib/site.ts)). All verified to resolve.
2. ⏳ **Pulling reviews** — blocked on a Google Places API key, or on you pasting the review text. See **SW-002**: I built the mirror and the rendering, but Maps and `search.google.com/local/reviews` both render reviews **client-side**, so there is nothing to scrape server-side. The `googleReviews` array is deliberately empty until real data arrives.
3. ✅ **"Leave a review" link added** — shipped as part of the SW-002 replacement section on the homepage.
4. ✅ **`hasMap` added** to the Organization JSON-LD (folded into SW-021 as this row suggested).

**Bonus: this row's place ID resolved FAC-1.** Fetching the listing exposed the address Google publishes — "106 Blossom Ln, **West Palm Beach**, FL 33404" — which is the tiebreaker FAC-1 was waiting on. See that row.

**The caution stands:** no `aggregateRating` in the JSON-LD until real reviews render on-page and the rating is accurate.

**Supplied:** `https://g.page/r/CRHaJQE1cADDEAI/review` → resolves (HTTP 200) to place ID **`ChIJnYAXE9PZ2IgREdolATVwAMM`**.

**Verified:** grep found **zero** Google review or Maps-listing links in [src/lib/site.ts](src/lib/site.ts) or [src/data/site-content.ts](src/data/site-content.ts). The site links Facebook, Instagram and LinkedIn ([site.ts:18-22](src/lib/site.ts#L18-L22)) but not its own GBP.

**This is the missing input for two open tasks.** **VIS-4** asks for a Google-reviews slideshow on 4 pages; **SW-002** needs the three fabricated testimonials replaced with real, attributable ones. Both were blocked on "where do real reviews come from" — this is the answer.

**Fix:**
1. Add `reviewUrl` and `placeId` to `site` in [src/lib/site.ts](src/lib/site.ts).
2. Use the place ID to pull reviews (Places API) for the testimonials section, replacing [site-content.ts:98-117](src/data/site-content.ts#L98-L117).
3. Add a "Leave us a review" link for alumni — the `g.page/r/…/review` URL opens the review dialog directly.
4. Add `hasMap` to the JSON-LD pointing at the GBP listing (folds into **SW-021**).

**⚠️ One caution:** do **not** add `aggregateRating` to the JSON-LD from scraped review data unless the reviews are genuinely displayed on-page and the rating is accurate — Google treats fabricated or self-serving review markup as a structured-data violation, and this is a YMYL medical site.

---

### FAC-5 · 40-bed capacity is never stated `P2`

- [ ] **Task:** Decide whether to publish the bed count, and sanity-check it against the "small and personal" positioning.

**Master data: 40 in-patient beds.** Verified: no bed count appears anywhere in the site's data or copy.

**Two reasons to consider adding it.** Capacity is a question families and referrers actually ask, and specificity is a trust signal on a site that currently leans on adjectives. `numberOfBeds` is also a valid schema.org property for a `MedicalClinic`/`Hospital`.

**One thing to check while you're there.** The "Why Seaside" differentiator at [site-content.ts:26-30](src/data/site-content.ts#L26-L30) reads: *"An intimate setting with a high staff-to-client ratio means your care plan is truly yours, and no one gets lost in the crowd."* Forty beds is genuinely small-to-mid for residential treatment, so the claim is defensible — but "high staff-to-client ratio" is a comparative claim. With a 40-bed census and a published team of 8–9, confirm the actual ratio supports it before launch. Same substantiation discipline as **SW-002**, **VIS-5**, and **FAC-3**.

---

# Verified Not Applicable

Closed with evidence. Recorded so they aren't re-raised.

| Row | Claim | Finding |
|---|---|---|
| **V0103** | Production `/contact` 301s to a JPEG attachment | ✅ **Not applicable to Seaside.** `seasidewellnesspb.com/contact` → 301 → `/contact/` → 200, the real contact page. Confirmed on Dallas and Fort Worth only. |
| **V0097** | Seaside listed as an `/about` slug outlier needing a redirect | ✅ **Already correct** — and the workbook's own amendment says so. `/about` is live at 200. No action. |
| **V0094** | Treatment hub slug standardisation | ✅ **Compliant.** Seaside already uses `/treatment`, the proposed standard. |
| **V0095** | Aftercare slug standardisation | ✅ **Compliant.** Seaside already uses `/treatment/aftercare`, the proposed standard. |
| **V0098** | Contact slug standardisation | ✅ **Compliant.** Seaside already uses `/contact`. |
| **V0100** | Privacy policy missing or non-standard `COMPLIANCE` | ✅ **Compliant.** `/privacy-policy` exists, is indexable, and is in the sitemap. The gap is Greater Texas. |
| **V0118** | Geo-suffixed service slugs contradiction | ✅ **Not applicable.** Seaside keeps locations under `/areas-we-serve/{city}`; no geo-suffixed service slugs. |
| **V0075** | 4 team bios duplicated against the QHG parent | ✅ **No action on this repo.** The workbook confirms the facility pages already canonical correctly; remediation is parent-side. **Owner: QHG parent.** |
| **Broken Internal Links tab** | 29 internal links returning 404 portfolio-wide | ✅ **Zero Seaside rows** — all 29 are Dallas (16) and Fort Worth (13). Independently confirmed: my own crawl found **0 broken internal links** in this repo. |

### Production-only — resolved by cutover, no build work

| Row | Status |
|---|---|
| **V0129** | 4 `?kadence_element=` theme fragments in the production Yoast sitemap (all 301). The new build doesn't generate them. Fix on production only if cutover isn't imminent. |
| **V0130** | Production `/about/blog/` is mis-titled *"Addiction and Mental Health FAQ"*. The build is already correct (*"Blog — Addiction & Mental Health Resources"*). Cutover fixes it. |

### Stale README action item

`README.md` action item 6 flags `areas.json` bodies as *"near-identical across locations (duplicate-content SEO risk)."* **Measured 2026-08-06: false.** Max pairwise 8-gram Jaccard similarity across the 7 area pages is **5.6%** (Delray↔Wellington); all other pairs are under 3%, at 644–1,011 words each. Conditions max 3.7%, treatments max 7.0%.

- [x] **Done 2026-08-06.** Replaced with the real area-page issue (VIS-9 imagery) and recorded the measurement that disproves the original claim, so it isn't reinstated.

---

# Browser audit — 2026-08-11

All **79 routes** driven in a real browser (Playwright) at **1440×900** and **375×667**, each page fully scrolled. This goes beyond the HTML-level checks below: runtime errors, failed requests, broken images, horizontal overflow, tap-target size, duplicate ids, form labelling, rendered-pixel contrast, and image payload.

### No findings

| Check | Result |
|---|---|
| JS page errors (uncaught exceptions) | ✅ 0 across 158 page-loads |
| Broken images (`naturalWidth === 0`) | ✅ 0 |
| Inputs without an accessible name | ✅ 0 |
| Links with no accessible text | ✅ 0 |
| Interactive nested in interactive | ✅ 0 |

### Fixed this pass

| Issue | Before | After |
|---|---|---|
| **Duplicate ids on `/about/faq/`** — `Faq` hardcoded `faq-btn-${i}`, so its 4 category groups each restarted at 0. `aria-controls`/`aria-labelledby` resolve to the first match, pointing 3 of 4 groups at the wrong panel for assistive tech. Now prefixed with `useId()`. | 20 | **0** |
| **Contrast below AA.** `ink-500` is 4.60:1 on white but **4.25:1 on cream** — and every failure was small print on cream (form hints, "(optional)", FAQ counts, map notice). Moved those to `ink-600` (6.65:1); left the `ink-500` uses on white that pass. | 9 | **3** (all false positives) |
| **Tap targets under 24px** (WCAG 2.2 SC 2.5.8). Footer column + legal links, breadcrumbs, contact details, back links were 14–20px tall. `py-1` with `-my-1` grows the hit area 8px without moving anything visually. | 35 | **2** (both exempt) |
| **Logo fetched at 1920px to render at 110px.** The intrinsic `width` prop drove srcset selection; added `sizes`. | 5 oversized | **2** (both trivial) |

### Investigated and dismissed — with evidence

Recording these so they aren't "fixed" later on a bad signal.

- **Horizontal overflow on 2 pages at 375px** (`scrollWidth` 609 vs client 375). **Not user-visible:** `scrollX` stays **0** after `scrollTo(600, 0)`, and the widest node is the off-canvas drawer, whose right edge sits at 713px on *every* page — including pages reporting no overflow at all. No change made.
- **`gold-300` at 1.86:1 and white at 1.00:1.** Artifacts of my background-walk heuristic. `gold-300` sits on `ink`/`ocean-700` (**7.5:1**, passes); the white text is over hero *images*, which the walk can't sample. No change made.
- **Clarion blog-feed CORS failure.** Only reproduces on `localhost`, where the origin isn't allowlisted. Third-party and not ours.

### The two remaining tap targets are correctly exempt

Both are phone/`988` links sitting **inline inside a sentence** — e.g. *"if you are in crisis, call or text 988"*. SC 2.5.8 explicitly exempts targets in a sentence or constrained by surrounding line-height. Padding them would break the text flow for no accessibility gain.

---

# Build health — verified clean

Recorded so future audits don't re-derive it. **Re-measured 2026-08-06 after the second pass**, via `next build` + a live `next start` crawl of all 71 sitemap URLs.

| Check | Result |
|---|---|
| `next build` | ✅ clean · **78** prerendered routes (from a cleared `.next`) |
| `eslint .` | ✅ no findings |
| TypeScript (`strict`) | ✅ clean |
| Internal links (every `href="/…"` vs real routes) | ✅ **0 broken** |
| Referenced assets resolve in `public/` | ✅ **0 missing** · 56/56 referenced · `public/` is 56 files, was 225 |
| Unreferenced assets in `public/` | ✅ **0** (HS-3 consumed the staged masters) |
| Detail-content coverage (catalog slug → JSON body) | ✅ **100%**, no orphan slugs, no orphan content |
| Sitemap completeness | ✅ **71** URLs = every indexable route, all slash-form |
| Live crawl: HTTP status | ✅ **71/71 return 200** |
| `<h1>` per page | ✅ exactly 1 on all 71 |
| Heading-level skips | ✅ **0** (was 1 — see SW-018) |
| Canonical === `og:url` === served path | ✅ all 71, no mismatches |
| `og:title` / `og:description` / `og:image` / `og:site_name` | ✅ page-specific on all 71; exactly one `og:image` each |
| Meta descriptions > 160 chars | ✅ **0** (was 12) |
| `<title>` > 60 chars | ✅ **3** of 71, at 61–63 (deliberate — see SW-013) |
| `<img>` missing `alt` | ✅ none (630 images) |
| JSON-LD parse errors | ✅ none · 71 Organization, 48 BreadcrumbList, 28 FAQPage, 14 BlogPosting |
| Redirects | ✅ all single-hop to a 200 — `/about/about-us/`, `/category/blog/`, `/feed/`, `/comments/feed/`, `/author/admin/` |
| Trailing-slash convention | ✅ matches production on all sampled URLs (see V0102) |
| Production↔build URL diff | ✅ **0** production URLs absent from build (see V0124) |
| 404 status codes | ✅ correct at every dynamic level |
| Security headers (live) | ✅ HSTS, `nosniff`, `X-Frame-Options`, `Referrer-Policy`, **`Permissions-Policy`** |
| Asset paths | ✅ **no `/wp-content/` anywhere**; old paths 404, new paths 200 |
| Third-party requests on `/contact` | ✅ **0 iframes** in the initial DOM (SW-010) |
| Contact API | ✅ 429 rate limit · 200 honeypot · 422 validation · 400 bad JSON · 502 when transport unconfigured |
| Contact API contract | ✅ honeypot silent-accepts; 422 / 502 / 405 all correct; now fails loudly with no key in prod |
| Colour contrast | ✅ all informative text passes AA against its **actual** background (see SW-008) |
| FAQ duplication across pages | ✅ only 9 duplicate questions of 191 — not a concern |

Accessibility work already in place and correct: skip link, focus trap + focus restore in both the mobile drawer and the lightbox, `inert` on collapsed panels, a no-JS fallback so reveal content never sticks hidden, and `prefers-reduced-motion` honoured.

---

# Appendix B — Visual Issues row map

All 98 substantive Seaside rows from the **Visual Issues** tab, mapped to the VIS task that covers them. Row IDs are the tab's own uid=501(benjamincastro) gid=20(staff) groups=20(staff),12(everyone),61(localaccounts),79(_appserverusr),80(admin),81(_appserveradm),701(com.apple.sharepoint.group.1),33(_appstore),98(_lpadmin),100(_lpoperator),204(_developer),250(_analyticsusers),395(com.apple.access_ftp),398(com.apple.access_screensharing),399(com.apple.access_ssh),400(com.apple.access_remote_ae) column, so anything here can be traced back to the workbook.

| Page | Rows | Ask (condensed) | Task |
|---|---|---|---|
| `/treatment/detox` | 1375, 1377, 1382, 1383, 1384 | Create a widget for each service described in the bullet | **VIS-1** |
| `/treatment/detox` | 1376 | Add a link to each substance detox page | **VIS-2** |
| `/admissions/help-for-loved-one` | 1332 | Add the different programs as widgets in this section with a link back to the referred p | **VIS-1** |
| `/admissions/help-for-loved-one` | 1333 | Add a button link to areas we serve page | **VIS-2** |
| `/admissions/help-for-loved-one` | 1331 | Add google review slide show | **VIS-4** |
| `/admissions/help-for-loved-one` | 1330 | Remove "Your recovery deserves the best care, and the right team." | **VIS-8** |
| `/areas-we-serve/boynton-beach` | 1398, 1400 | Create a widget to each program with a link to the referenced page | **VIS-1** |
| `/areas-we-serve/boynton-beach` | 1399 | Add a link to tour page | **VIS-2** |
| `/areas-we-serve/boynton-beach` | 1401 | Add a "Confidential insurance verification form" | **VIS-3** |
| `/areas-we-serve/delray-beach` | 1403, 1404 | Create a widget to each program with a link to the referenced page | **VIS-1** |
| `/areas-we-serve/delray-beach` | 1402 | Add a link to tour page | **VIS-2** |
| `/areas-we-serve/delray-beach` | 1405 | Add a "Confidential insurance verification form" | **VIS-3** |
| `/areas-we-serve/palm-beach-county` | 1411, 1412 | Create a widget to each program with a link to the referenced page | **VIS-1** |
| `/areas-we-serve/palm-beach-county` | 1410 | Add a link to tour page | **VIS-2** |
| `/areas-we-serve/palm-beach-county` | 1413 | Add a "Confidential insurance verification form" | **VIS-3** |
| `/areas-we-serve/south-florida` | 1415, 1416 | Create a widget to each program with a link to the referenced page | **VIS-1** |
| `/areas-we-serve/south-florida` | 1414 | Add a link to tour page | **VIS-2** |
| `/areas-we-serve/south-florida` | 1417 | Add a "Confidential insurance verification form" | **VIS-3** |
| `/areas-we-serve/wellington` | 1407, 1408 | Create a widget to each program with a link to the referenced page | **VIS-1** |
| `/areas-we-serve/wellington` | 1406 | Add a link to tour page | **VIS-2** |
| `/areas-we-serve/wellington` | 1409 | Add a "Confidential insurance verification form" | **VIS-3** |
| `/areas-we-serve/west-palm-beach` | 1393, 1395 | Create a widget to each program with a link to the referenced page | **VIS-1** |
| `/areas-we-serve/west-palm-beach` | 1396 | Add a "Confidential insurance verification form" | **VIS-3** |
| `/areas-we-serve/west-palm-beach` | 1394 | Add section and google review slide | **VIS-4** |
| `/treatment/substance-abuse-residential` | 1378, 1379, 1381 | Create a widget for each service described in the bullet | **VIS-1** |
| `/treatment/substance-abuse-residential` | 1380 | Add a link to each substance detox page | **VIS-2** |
| `/what-we-treat/schizophrenia` | 1371, 1372, 1373, 1374 | Create a widget for Negative & one for Positive, then list the signs and symptoms for ea | **VIS-1** |
| `/treatment/dual-diagnosis` | 1386, 1387 | Create a widget to each program with a link to the referenced page | **VIS-1** |
| `/treatment/dual-diagnosis` | 1385 | Add a link to each mental health page referenced | **VIS-2** |
| `/what-we-treat` | 1324, 1325, 1326 | Add the section, "We Help You Recover From Addiction and Mental Health Struggles" from t | **VIS-7** |
| `/what-we-treat/adhd` | 1368, 1369, 1370 | Create a widget for Inattention & one for Hyperactivity/Impulsivity, then list the signs | **VIS-1** |
| `/what-we-treat/benzo-addiction` | 1336, 1337, 1338 | Instead of a long list of bullets, create a widget for Physical, Behavioral and Psycholo | **VIS-1** |
| `/what-we-treat/bipolar` | 1362, 1363, 1364 | Create a widget for each service described in the bullet | **VIS-1** |
| `/what-we-treat/cocaine-addiction` | 1339, 1340, 1341 | Instead of a long list of bullets, create a widget for Physical, Behavioral and Psycholo | **VIS-1** |
| `/what-we-treat/depression` | 1359, 1360, 1361 | Instead of a long list of bullets, create a widget for Short-term and Long-term. Then li | **VIS-1** |
| `/what-we-treat/heroin-addiction` | 1342, 1343, 1344 | Instead of a long list of bullets, create a widget for Physical, Behavioral and Psycholo | **VIS-1** |
| `/what-we-treat/methamphetamine-addiction` | 1345, 1346, 1347 | Instead of a long list of bullets, create a widget for Physical, Behavioral and Psycholo | **VIS-1** |
| `/what-we-treat/opiate-addiction` | 1348, 1349, 1350 | Instead of a long list of bullets, create a widget for Physical, Behavioral and Psycholo | **VIS-1** |
| `/what-we-treat/opioid-addiction` | 1351, 1352, 1353 | Instead of a long list of bullets, create a widget for Physical, Behavioral and Psycholo | **VIS-1** |
| `/what-we-treat/personality-disorder` | 1365, 1366, 1367 | Instead of a long list of bullets, create a widget for Short-term and Long-term. Then li | **VIS-1** |
| `/what-we-treat/prescription-drug-addiction` | 1354, 1355, 1356 | Instead of a long list of bullets, create a widget for Physical, Behavioral and Psycholo | **VIS-1** |
| `/admissions/help-for-yourself` | 1329 | Add google review slide show | **VIS-4** |
| `/admissions/help-for-yourself` | 1328 | Remove "Your recovery deserves the best care, and the right team." | **VIS-8** |
| `/treatment/aftercare` | 1388, 1389 | Create a widget for each service described in the bullet | **VIS-1** |
| `/what-we-treat/alcohol-addiction` | 1334, 1335 | Instead of a long list of bullets, create a widget for Physical, Behavioral and Psycholo | **VIS-1** |
| `/what-we-treat/anxiety` | 1357, 1358 | Create a widget for each service described in the bullet | **VIS-1** |
| `/` | 1320 | Licensed Specialists & Medical Staff / 20 / + / Client Satisfaction Rate / 95 / % / Year | **VIS-5** |
| `/about/about-us` | 1321 | about/about-us should be about/our-story | **VIS-11** |
| `/about/blog` | 1323 | Add the blogs previously on SSW to this page | **VIS-10** |
| `/about/faq` | 1322 | Addiction & Mental Health FAQ / Facility & Programs FAQ / Admissions & Intake FAQ / Insu | **VIS-6** |
| `/areas-we-serve` | 1327 | Remove the images for each widget, they dont apply to the areas being served | **VIS-9** |
| `/areas-we-serve/boca-raton` | 1397 | Create a widget to each program with a link to the referenced page | **VIS-1** |
| `/treatment/family-therapy` | 1392 | Create a widget for each service described in the bullet | **VIS-1** |
| `/treatment/group-therapy` | 1391 | Create a widget for each service described in the bullet | **VIS-1** |
| `/treatment/individual-therapy` | 1390 | Create a widget to each program with a link to the referenced page | **VIS-1** |

**Not listed:** 83 further Seaside rows on the tab carry a URL but an empty Issue *and* empty Fix (row IDs 1418–1500, all pointing at the homepage), plus 310 trailing ID-only filler rows (1501–1810) with no facility or content. Both sets are empty scaffolding, not findings.

---

# Appendix A — reproduction commands

```bash
# Production ↔ build URL diff (re-run immediately before cutover — V0124)
curl -sL https://seasidewellnesspb.com/post-sitemap.xml -o /tmp/post.xml
curl -sL https://seasidewellnesspb.com/page-sitemap.xml -o /tmp/page.xml
# then diff <loc> paths against the routes in src/app/sitemap.ts

# Trailing-slash convention (V0102)
for u in /about /contact /treatment/detox; do
  curl -sI "https://seasidewellnesspb.com$u" -o /dev/null \
    -w "%{http_code} -> %{redirect_url}\n"
done

# Crawl the local build for title/desc/h1/canonical/alt/JSON-LD
npm run build && npx next start -p 3457   # verify the port is free first
curl -s http://localhost:3457/sitemap.xml   # then walk every <loc>

# Unreferenced assets (SW-025)
# compare every "/wp-content/..." string in src/ against find public/wp-content -type f
```

**Note on local verification:** confirm your chosen port is actually free before crawling — during this audit port 3111 was already held by an unrelated project's dev server, and the first crawl silently hit *that* site instead.
