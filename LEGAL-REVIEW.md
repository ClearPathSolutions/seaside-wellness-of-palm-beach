# Legal pages — review pack for counsel

**Prepared 2026-08-06** · covers `/terms` and `/privacy-policy`
**Tracked as:** SW-003 in [ISSUES.md](ISSUES.md)

## What this is

A block-by-block review of the two legal pages, so counsel gets a scoped review rather than a rewrite.

**What I changed:** only unambiguous mechanical defects — duplicated list content, a print artifact, and the missing revision date. All listed under [Already fixed](#already-fixed), all reversible.

**What I did not change:** any operative clause. Everything in [Recommended deletions](#recommended-deletions-awaiting-approval) is *proposed* and still live. "Obviously inapplicable" language can turn out to be protective, and that call is counsel's, not a developer's.

---

## Part 1 — Terms of Service

Source: [src/data/content/terms.json](src/data/content/terms.json) → rendered at `/terms`. 64 blocks, 25 numbered sections.

### 1.1 Provenance — the first thing to settle

The document reads as a **consumer-review / local-directory marketplace ToS with the brand find-replaced**. It is not adapted for a healthcare provider. The internal evidence:

| § | Verbatim text | Why it doesn't fit |
|---|---|---|
| 8 | *"you might receive compliments or friend requests from other Users. You will also receive our weekly e-mail newsletter about happenings in your neighborhood"* | No accounts, no social graph, no newsletter |
| 18 | *"If you purchase a Seaside Wellness Deal or Gift Certificate…"* | No commerce of any kind |
| 17 | *"Please see our Event Terms and Conditions for information about events listed on or linked to on the Site"* | No events; no such document |
| 11 | *"may publicly display advertisements … adjacent to or included with Your Content"* | The site sells no ad inventory |
| §51 | *"ANY THIRD PARTY, SUCH AS THE BUSINESSES OR ADVERTISERS LISTED ON THE SITE"* | This site lists no businesses — it *is* the business |

I confirmed against the codebase that **none of these features exist**: no accounts, signup, login, cart, checkout, deals, gift certificates, events, or user-generated content anywhere in `src/`.

**⚠️ For counsel:** the phrasing tracks a well-known national platform's public Terms closely enough that provenance should be established before launch. Publishing another company's Terms largely verbatim is a copyright exposure independent of whether the clauses fit. This is the single highest-value thing to resolve here.

### 1.2 Broken incorporation by reference

The Terms bind the user to documents that **do not exist**, and none of the references are even hyperlinked (the content schema cannot hold links — see VIS-2):

| Referenced document | Times | Exists? |
|---|---|---|
| Content Guidelines | 3 | ❌ |
| Seaside Wellness General Terms for Deals and Certificates | 3 | ❌ |
| Infringement Policy | 1 | ❌ |
| Event Terms and Conditions | 1 | ❌ |
| Privacy Policy | 3 | ✅ `/privacy-policy` |

§14 goes further than referencing — it extracts a representation: *"You represent that you have read and understood our Content Guidelines."* The user is representing they have read a document that was never published. §17 does the same for the Event Terms.

### 1.3 Substantive drafting issues

These are not cosmetic and are worth counsel's attention regardless of what else is cut:

1. **The survival clause is likely wrong, and against your interest.** §24 (block 61) reads: *"Sections 1, 5, 6, 10 – 14 will continue in full force and effect, including our right to use Your Content as detailed in Section 5."*
   - §5 is **Eligibility**. The content licence is at **§9b**. The cross-reference is simply wrong.
   - The surviving set (1, 5, 6, 10–14) **omits §21 Indemnity and §22 Disclaimers and Limitations of Liability** — normally the clauses a drafter most wants to survive termination. Consistent with a numbering shift when the template was edited.

2. **Termination assumes accounts.** §24 (block 59): *"You may terminate the Terms at any time by closing your account … and providing Seaside Wellness with a notice of termination here."* There are no accounts, and "here" links nowhere.

3. **A broad content licence with nothing to license.** §9b grants Seaside the right to publicly display, reformat and incorporate "Your Content" into advertisements. The site accepts no user content. If a reviews feature is ever added (the shell now exists — see SW-002), this clause becomes live and should be drafted deliberately rather than inherited.

4. **Find-replace artifact** in §21: `"Seaside Wellness , its parents"` — stray space before the comma. Cosmetic, but it is the kind of tell that undermines the document's credibility if a claimant reads it closely.

5. **No healthcare-specific provisions at all.** There is nothing on medical disclaimer, no-doctor-patient-relationship, emergency instruction, telehealth, or the relationship between the site and clinical services. The footer carries a one-line disclaimer; the Terms do not. For a YMYL healthcare site this is the substantive gap — the current document protects a marketplace, not a treatment provider.

### 1.4 Section-by-section classification

| § | Title | Assessment |
|---|---|---|
| 1 | Parties | ✅ Applies |
| 2 | Content | ⚠️ Defines "Your Content" — only meaningful if UGC exists |
| 3 | Changes to the Terms | ✅ Applies — **but see [Already fixed](#already-fixed)**: it promised a revision date that was absent |
| 4 | Translation | ✅ Harmless |
| 5 | Eligibility | ✅ Applies (18+) |
| 6 | Permission to Use the Site | ✅ Applies |
| 7 | Site Availability | ✅ Applies |
| 8 | Communications | ❌ **Delete** — accounts, compliments, friend requests, neighbourhood newsletter |
| 9a | Responsibility for Your Content | ⚠️ Only if UGC exists |
| 9b | Our Right to Use Your Content | ⚠️ Only if UGC exists; see 1.3 §3 |
| 10 | Ownership | ✅ Applies — worth keeping and tightening |
| 11 | Advertising | ❌ **Delete** — no ad inventory |
| 12 | Other | ⚠️ About user content opinions; only if UGC exists |
| 13 | Restrictions | ✅ Applies — scraping/crawling restrictions are useful |
| 14 | Content Guidelines | ❌ **Delete or publish the document** — currently a representation about a nonexistent doc |
| 15 | Privacy | ✅ Applies — the only reference that resolves |
| 16 | Copyright and Trademark Disputes | ⚠️ **Rewrite** — points to a nonexistent Infringement Policy; replace with a DMCA agent notice |
| 17 | Events | ❌ **Delete** — no events, no such document |
| 18 | Deals & Advertising | ❌ **Delete** — no commerce |
| 19 | Suggestions and Improvements | ✅ Applies |
| 20 | Third Parties | ✅ Applies — relevant, the site embeds Google Maps |
| 21 | Indemnity | ✅ Applies — fix the spacing artifact; confirm survival (1.3 §1) |
| 22 | Disclaimers / Limitation of Liability | ✅ **Keep** — but see 1.3 §5; needs healthcare-specific medical disclaimer, and confirm survival |
| 23 | Choice of Law and Venue | ✅ Florida law — appropriate; counsel to confirm venue and any arbitration/class-waiver intent |
| 24 | Termination | ⚠️ **Rewrite** — assumes accounts; survival list is wrong |
| 25 | General Terms | ✅ Applies |

**Tally:** 12 apply as-is · 6 conditional on user-generated content · **5 recommended for deletion** · 2 need rewriting.

### Recommended deletions (awaiting approval)

Nothing below has been removed. Approve and I'll action it in one pass.

| § | Blocks | Reason |
|---|---|---|
| 8 · Communications | 16–17 | Accounts, compliments, friend requests, newsletter — none exist |
| 11 · Advertising | 25–26 | No ad inventory; the clause only makes sense for a directory |
| 14 · Content Guidelines | 32–33 | Extracts a representation about a document that was never published |
| 17 · Events | 38–39 | No events; references a nonexistent document |
| 18 · Deals & Gift Certificates | 40–41 | No commerce of any kind |

Removing these means renumbering, which **breaks §24's survival cross-references further** — so 1.3 §1 must be fixed in the same pass, not after.

---

## Part 2 — Notice of Privacy Practices

Source: [src/data/content/privacy.json](src/data/content/privacy.json) → rendered at `/privacy-policy`.

**This document is in much better shape than the Terms.** It is the **HHS Office for Civil Rights Model Notice of Privacy Practices** — the template HHS publishes for providers to adapt. Right starting point, correct structure, and it already includes the OCR complaint address and the Joint Commission complaint route.

### 2.1 Blocking gap — the effective date

**45 CFR §164.520(b)(1)(v)(C) requires a Notice of Privacy Practices to state its effective date.** There was none anywhere on the page.

I added the rendering path ([src/data/legal.ts](src/data/legal.ts) → `privacyEffective`) but left the value `null`, so **no date renders**. That is deliberate: only the practice can set a legally operative effective date, and defaulting it to today's date would fabricate a compliance fact. **Set `privacyEffective` before launch.**

### 2.2 Gaps for counsel

1. **No named privacy contact / Privacy Officer.** The complaint bullet previously said *"contacting us using the information on page 1"* — a print artifact; there is no page 1, and no contact block existed. I pointed it at the site's published phone and email as an interim fix, but the HHS model expects a designated privacy contact. **Counsel/practice to designate one.**
2. **No "Changes to the Terms of This Notice" section.** The HHS model includes one; this version does not.
3. **Confirm the notice matches actual practice** — particularly the fundraising bullet (block 30) and the research bullet (block 48). Both assert uses that may not reflect what the facility actually does.
4. **State law.** Florida imposes additional confidentiality requirements for substance use disorder and mental health records — and **42 CFR Part 2** governs SUD treatment records with restrictions materially stricter than HIPAA. A generic HIPAA notice may be insufficient for a detox and SUD residential provider. **This is the most important item in Part 2.**

### 2.3 Related open decision

**SW-010** in ISSUES.md: the Google Maps embed on `/contact` sets third-party cookies on the same page where prospective patients disclose health information, and contact-form submissions route through a third-party email vendor with no BAA. HHS OCR guidance on online tracking technologies for covered entities makes both a deliberate decision. Worth settling in the same session as this notice.

---

## Already fixed

Mechanical only. No operative clause touched.

| Fix | Detail |
|---|---|
| **Privacy: triplicated bullets** | Sub-bullets had been concatenated into their parent list item **and** duplicated as standalone lists. "We are not required to agree to your request…", "We will say 'yes' unless a law requires…" and the five public-health bullets each rendered **three times**. Removed 3 duplicate blocks (62 → 59) and un-concatenated 2 items. Pure de-duplication — no wording changed. |
| **Privacy: run-on artifact** | Block 45 rendered *"Preventing diseaseHelping with product recallsReporting adverse reactions…"* with no spaces — a flattened HTML list. Parent now reads *"We can share health information about you for certain situations such as:"* with the five bullets below it. |
| **Privacy: "page 1" print artifact** | *"by contacting us using the information on page 1"* → the published phone and email. See 2.2 §1 — still needs a designated Privacy Officer. |
| **Terms: missing revision date** | The Terms promise *"we will also indicate at the top of this page the date that revisions were last made."* Now renders "Last revised …" from `termsRevised` in [src/data/legal.ts](src/data/legal.ts). |

## Launch blockers

- [ ] Establish provenance of the Terms (1.1) — **highest priority**
- [ ] Set `privacyEffective` in [src/data/legal.ts](src/data/legal.ts) (2.1)
- [ ] Counsel-approved Terms scoped to a healthcare provider, incl. a medical disclaimer (1.3 §5)
- [ ] Fix the §24 survival clause and cross-references (1.3 §1)
- [ ] Confirm 42 CFR Part 2 / Florida SUD-record obligations are met (2.3 §4)
- [ ] Designate a privacy contact (2.2 §1)
- [ ] Approve or reject the 5 recommended deletions
