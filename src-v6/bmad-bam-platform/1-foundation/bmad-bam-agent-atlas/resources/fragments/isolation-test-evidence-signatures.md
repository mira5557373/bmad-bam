---
id: isolation-test-evidence-signatures
title: Isolation Test Evidence Signatures
category: tenant-isolation
kind: fragment
module: bmad-bam-platform
persona: atlas
qg_ref: QG-M2
last_reviewed: 2026-05-17
version: 1.0.0
status: active
tags: [evidence, signature, machine-parseable, test-evidence, qg-m2, multi-tenant, isolation, audit]
references:
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/tenant-isolation-testing-patterns.md"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/rls-bypass-test-design.md"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/noisy-neighbor-detection.md"
---

# Isolation Test Evidence Signatures

This fragment specifies the **structure and quality bar** for the `evidence_signature` field in `test-catalogue.json#tests[*]`. The signature is a machine-parseable summary of what evidence proves the test passed; QG-M2 sign-off relies on it to verify each must-have test's evidence is concrete, traceable, and audit-defensible. Without strong evidence signatures, the catalogue degrades into a list of names — and QG-M2 becomes ceremonial rather than enforcing.

The schema constraint is mechanical: `evidence_signature` length ≥ 20 characters. The quality constraint is semantic: the signature must name (a) the observable thing produced by a passing test, (b) the artifact or log location it lives in, and (c) enough specificity that an auditor (regulator, security reviewer, customer's procurement team) can locate the actual evidence without having to read the test code. Signatures that fail either constraint produce a catalogue that *looks* valid to the schema validator but cannot defend the gate sign-off when challenged.

A signature like `"test passes"` (length: 11) fails the schema check. A signature like `"all tests pass in CI"` (length: 20) passes the schema check but fails the semantic check — it names no specific evidence. A signature like `"pg_class scan: every tenant-scoped table has relrowsecurity AND relforcerowsecurity"` (length: 87) passes both: it names a query (`pg_class scan`), a property checked (`relrowsecurity AND relforcerowsecurity`), and a scope (`every tenant-scoped table`).

---

## When to Use

- **When authoring or reviewing any entry in `test-catalogue.json#tests[]`.** Every entry's signature must satisfy this fragment's structure-and-quality bar. The catalogue's step-04 lock-down requires Atlas to enrich short or weak signatures before user sign-off.

- **When extending or modifying the default class library** (`bmad-bam-design-multi-tenant-testing` step-02 templates). New test entries inherit this fragment's signature conventions; deviations require ADR.

- **When responding to a QG-M2 audit (regulator, customer security review, internal compliance).** The auditor's question is typically "show us evidence test X passed on date Y for tenant Z" — the signature is the index into the answer.

- **When reviewing pull requests to the test class library or catalogue.** Code review checks signature length ≥ 20 (schema) AND semantic conformance (this fragment).

---

## When NOT to Use

- **In free-form narrative documentation.** `test-catalogue.md` (the markdown narrative) can paraphrase signatures for human readers; the machine-parseable form lives in the `.json` only. This fragment governs the `.json` field, not the narrative.

- **In tests outside the multi-tenant test catalogue.** Generic feature tests don't need this fragment's structure; it's specific to the QG-M2 enforcement contract.

---

## Architecture: signature anatomy

Every signature has three components, in order:

### 1. Observable artifact

What concrete thing exists when the test passes? Common observable artifacts:

| Artifact type | Example phrasing |
|---|---|
| Log line | `structured-log entry with tenant_id at every async resume point` |
| HTTP response | `429 with Retry-After header + structured JSON body containing quota_id, limit, current, retry_after_seconds` |
| Database query result | `pg_class scan: every tenant-scoped table has relrowsecurity AND relforcerowsecurity` |
| Postgres error message | `INSERT raises "new row violates row-level security policy"` |
| File / output | `audit-log entry art_20_export_emitted with checksum matching subject DSAR bundle` |
| Metric value | `tenant_b p99 < 200ms while tenant_a sustains 4x normal load for 60s` |
| Lint output | `linter-flagged-zero query in app code lacking tenant filter` |
| Test fixture rejection | `cross-tenant FK insert returns 403 or 422; body contains "tenant" or "ownership"` |

The artifact MUST be one that exists at runtime (in production or test environment), not a code property. "The code has a comment" is not an artifact; "the test fixture's response body contains X" is.

### 2. Quantitative or qualitative bound

How much, or what shape? Avoid `passes` / `succeeds` / `works`. Use:

- Counts: `every`, `≥ N`, `exactly N`, `at least one`, `zero`
- Thresholds: `< 200ms`, `≤ 4 retries`, `≥ 99.9% over 24h`
- Properties: `unique within set X`, `subset of Y`, `matches regex Z`
- Negations: `NOT visible to peer tenants`, `does NOT return rows`, `rejected with structured error`

### 3. Scope / context

Under what conditions, scope, or context does the artifact exist?

- `under tenant_a context` / `as application_user role`
- `at every async resume point` / `at server-release boundary`
- `while tenant_b sustains 4x normal load` / `during cohort dry-run`
- `for every tenant-scoped table in the tenant_scoped_tables.yaml manifest`

---

## Signature template

```
<artifact-type> <artifact-detail> with <quantitative-bound> <under-scope-context>
```

Example expansions:

| Test entry id | Signature |
|---|---|
| ISO-001 | structured-log entry with tenant_id at every async resume point |
| ISO-003 | parametrized 6-pair (attacker,victim) test: zero victim-rows per pair |
| ISO-004 | smuggled-row injected via admin role; tenant-context read returns 0 smuggled rows |
| BYP-005 | INSERT with foreign tenant_id raises "new row violates row-level security policy" |
| BYP-006 | pg_class scan: every tenant-scoped table has relrowsecurity AND relforcerowsecurity |
| NN-001 | enterprise p99 < SLA threshold while free tier sustains 4x normal load |
| QUO-001 | tenant exceeding rate budget receives 429 with Retry-After header |

Each conforms to the three-part anatomy. Each is ≥ 20 characters. Each names a concrete artifact, a bound, and a scope.

---

## Trade-offs

| Design choice | Pro | Con |
|---|---|---|
| Concise signatures (1 line) | Schema-friendly; easy to scan in catalogue tables | May lose nuance for complex tests |
| Verbose signatures (paragraph) | Captures auditor-relevant detail | Violates table-rendering ergonomics in markdown |
| Reference external doc (`see fragment X for details`) | Reuses canonical text | Forces auditor to chase the reference |
| Inline literal error string | Auditor can grep production logs | Brittle to library / OS / DB version changes |
| Quantitative absolute thresholds | Match SLA contract language | Brittle to environment performance variation |

The recommended balance: **one-line signature**, **inline literal artifact**, **absolute thresholds where SLA-contract-bound; relative thresholds otherwise**.

---

## Quality Checks

- **CRITICAL:** Evidence signature MUST be machine-parseable; human-narrative alone is not gate-evidence.

- **Length ≥ 20.** Schema-enforced at step-07-v; rejected with explicit message naming the test_id and current length.

- **Names a concrete observable artifact.** Reviewer rejects signatures whose primary noun is `test`, `code`, `system`, `platform` (too abstract). The noun should be a concrete thing: `log entry`, `response body`, `pg_class scan result`, `migration record`, `audit-log entry`, `metric value`.

- **Includes a bound (quantitative or qualitative).** Rejected: `tenant gets correct response`. Accepted: `tenant_b's p99 < 200ms` OR `response status code in {403, 422}`.

- **Includes scope or context.** Rejected: `RLS prevents access`. Accepted: `under tenant_a context, SELECT against invoices returns zero rows where tenant_id != tenant_a's UUID`.

- **No internal jargon without expansion.** "GE-passes" or "passes Atlas-baseline" are project-internal — auditor cannot evaluate. Spell out: `audit-log entry tagged tenant_a, action=ge_pass, threshold=p99<200ms`.

- **Inline literals where possible.** When the artifact is a literal string (Postgres error, HTTP header name), quote it. The auditor's grep needs the literal: `raises "new row violates row-level security policy"` is better than `raises an RLS-violation error`.

- **Avoid implementation-specific URLs.** `see https://app.datadog.com/dashboard/abc-123` is brittle. Use `Datadog dashboard for tenant-p99 under cross-tenant-load`. Vendor change shouldn't invalidate the signature.

- **Signature stable across language/framework changes.** When the test is implemented in pytest vs. jest, the signature is the same (it names the artifact, not the framework). This lets BMM's `bmad-qa-generate-e2e-tests` produce code in either framework against the same catalogue.

- **Signature surfaces in test failure output.** When the test fails, the failure message includes the signature verbatim. This is the single highest-leverage operational practice: an on-call engineer sees `expected: enterprise p99 < SLA threshold while free tier sustains 4x normal load; actual: tenant_b p99 = 287ms` and immediately knows what test is breaking what guarantee.

- **`traceable_to[]` aligns with signature.** Every signature should be consistent with the QG criterion it traces to. A signature about RLS bypass tracing to `QG-D1.H1` is a mismatch; review either the signature or the trace.

- **Reviewer-cost ≈ writer-cost.** The signature should be checkable by a non-author reviewer in < 60 seconds. If verification requires running code or reading the test file, the signature is under-specified.

---

## Anti-patterns

### Vague-verb signature

**Wrong:** `test passes` / `RLS works` / `tenant isolation maintained`
**Why:** Names no artifact; no bound; no scope. Schema-valid only if ≥ 20 chars, but semantically empty.
**Right:** Replace each verb with a concrete artifact and a bound. `test passes` → `pg_class scan: every tenant-scoped table has relrowsecurity AND relforcerowsecurity`.

### Implementation-anchored signature

**Wrong:** `pytest test_rls.py::test_bypass passes with exit 0`
**Why:** Anchored to test-framework; breaks if test moves; doesn't name the artifact the test proves.
**Right:** Name the underlying artifact. `SECURITY DEFINER function call from tenant_a returns only tenant_a rows`.

### Implementation-version signature

**Wrong:** `Postgres 14.2 error 42501 raised`
**Why:** Version-anchored; breaks on minor upgrade. Audit defensibility weakened (auditor must verify the error code is current).
**Right:** Name the semantic message. `raises "permission denied" with SQLSTATE 42501 for SET ROLE attempts from app pool`.

### Forward-reference signature

**Wrong:** `evidence will be added once QG-D1 ships`
**Why:** Catalogue is the contract; a forward-reference signature is a missing signature.
**Right:** Capture the test's intent in a signature even if upstream gates are pending. `migration runbook step `pre_check` outputs structured artifact; QG-D1.H1 trace deferred to P10.`

### Multi-test conflated signature

**Wrong:** `all 6 BYP tests pass with green CI status`
**Why:** Schema says one signature per test entry; conflation hides which artifact each test produces.
**Right:** Each `tests[*].evidence_signature` is per-entry. The catalogue's narrative `.md` can summarize across entries; the `.json` keeps them separate.

---

## Web Research Queries

Refresh empirical inputs annually. Replace `{date}` with current year.

- `audit evidence multi-tenant SaaS {date}` — security-audit-prep articles; sources of "what auditors actually ask for".
- `machine-readable test evidence {date}` — tooling articles on parseable test reports (JUnit XML, Allure, etc.); informs signature-to-artifact conventions.
- `SOC 2 multi-tenant evidence {date}` — compliance-evidence requirements for SaaS; useful for catalogue signature standards.
- `OWASP ASVS evidence verification {date}` — ASVS-aligned verification practices; informs structure of cross-references.
- `Postgres error code reference {date}` — for signatures inlining Postgres errors; verify error strings remain stable.

---

## Cross-references

**Companion fragments:**
- [[tenant-isolation-testing-patterns]] — the broader testing patterns this fragment's signatures serve
- [[rls-bypass-test-design]] — sibling fragment whose RLS-bypass signatures conform to this fragment's standard
- [[noisy-neighbor-detection]] — sibling fragment whose noisy-neighbor signatures conform to this fragment's standard

**Quality gate:**
- `QG-M2` v1.1.0 — C1 + C5 + H1 verification rely on signatures being machine-parseable; weak signatures invalidate sign-off

**Schemas:**
- `test-catalogue.json` schema (spec §3.4) — `tests[*].evidence_signature` field; length ≥ 20 enforced at step-07-v

**Downstream consumers:**
- `bmad-bam-design-multi-tenant-testing` step-04 — Atlas enriches short or weak signatures during catalogue lockdown
- BMM `bmad-qa-generate-e2e-tests` (via BAM overlay) — generated tests SHOULD include their entry's signature in their failure message (operational practice; not BMM-enforced)

**Upstream specs:**
- `docs/superpowers/specs/2026-05-17-p3-2-lifecycle-design.md` §3.4 (schema; length ≥ 20 rule), §5.1.1 (fragment registration)

**Glossary:**
- `evidence-signature` (P3.2 glossary; new entry) — defines the field this fragment governs
