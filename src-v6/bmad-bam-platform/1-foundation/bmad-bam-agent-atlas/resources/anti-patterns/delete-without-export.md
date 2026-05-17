---
id: delete-without-export
title: Delete Without Export
kind: anti-pattern
module: bmad-bam-platform
persona: atlas
category: lifecycle
qg_ref: QG-M2
last_reviewed: 2026-05-17
version: 1.0.0
status: active
severity: critical
applicability:
  - greenfield: must-avoid
  - brownfield: must-fix
references:
  - "Regulation (EU) 2016/679 Article 17 & Article 20"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/data-export-portability.md"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/gdpr-right-to-deletion.md"
---

# Delete Without Export

## Summary

Subject erasure (or whole-tenant offboarding) proceeds directly to deletion / anonymization without first emitting an Art 20 portability export. Once deletion fires, the data is gone — and with it, the subject's right to receive their data in a structured, machine-readable format. This is a regulatory violation in the GDPR/UK GDPR jurisdiction: Art 17 deletion without satisfying Art 20 is unlawful processing.

The anti-pattern shows up as: an erasure-orchestrator with no export step; an offboarding-policy.json missing `data_export_required: true`; a tenant offboarding runbook that says "drop the tenant schema, send a confirmation email" without an export step in between; or a hard-delete code path that bypasses the orchestrator entirely.

## Symptoms

- `offboarding-policy.json` has `data_export_required: false` (or field is missing — read-time validator should reject this)
- Erasure orchestrator workflow has no export activity before deletion handoffs
- Subject DSR portal offers "delete my data" but no "export my data" button (or the export button is broken / never tested)
- Audit log of erasure events shows no `art_20_export_emitted` event between request-received and deletion-handoff-complete
- Customer-support tickets: "I asked for my data to be deleted but I never got a copy first"
- Regulator inquiry: "Show us evidence that subject X received their data before deletion proceeded on date Y"
- Tier-tier offboarding tests pass (data is deleted) but no export-bundle test exists

## Root causes

1. **Conflating Art 17 and Art 20.** Engineering treats "erasure" as the single Art 17 obligation and forgets that Art 20 is a separate right that survives until deletion fires. The two rights run in parallel; Art 20 must be honored BEFORE Art 17 destroys its subject.

2. **Privacy review happens after architecture is locked.** The orchestrator is designed without legal/privacy input; the export step is added later as a "feature request" rather than a foundational invariant. The original architecture is shipped without it.

3. **"Delete" is treated as the primitive; "export" is treated as optional convenience.** The team reasons "deletion is the right thing; export is a feature that helps users" — but Art 20 is not a feature; it's an obligation when consent or contract is the lawful basis.

4. **No mandatory schema invariant.** The offboarding-policy.json contract allows `data_export_required: false`; without a schema-level invariant, the field can be ignored.

5. **Export was once available manually but is not in the automated path.** The platform had an export feature in the early days; the automated erasure path doesn't call it; subjects who go through the automated path silently lose the right.

## Why harmful

- **Regulatory exposure.** Direct GDPR Art 20 violation. Fines up to 4% of global revenue or €20M (whichever higher) under Art 83(5).

- **Subject-rights violation.** The subject loses irretrievable data — their messages, uploads, history. They cannot transmit to a successor platform. This is the harm Art 20 was designed to prevent.

- **Loss of trust.** Customers learn (often via support tickets) that "delete" destroyed their data without giving them a copy. Trust does not recover from this.

- **Defensibility failure.** When a regulator audits the erasure path, the platform cannot produce evidence of Art 20 compliance. The audit log shows deletion-events but no preceding export-events.

- **Cross-controller transmission impossible.** Tenants migrating to a competing SaaS cannot bring their data; the platform has destroyed their ability to switch.

- **Anti-pattern compounds with `delete-on-cancel`.** When subscription cancellation triggers immediate deletion without export, the user cannot evaluate the data they're losing.

## Remediation

Make export-before-delete an architectural invariant, not a feature:

1. **Schema invariant.** `offboarding-policy.json` MUST have `data_export_required: true`; step-07-v in `bmad-bam-design-tenant-offboarding` exits 70 if false. (Already enforced; this anti-pattern is the violation the invariant catches.)

2. **Orchestrator activity ordering.** The erasure workflow's step 1 is "emit Art 20 export bundle" and that activity MUST succeed before step 2 (any deletion handoff) begins. See `data-export-portability.md` Pattern 1.

3. **Delivery confirmation gate.** The deletion handoff begins only after export delivery is confirmed (signed-URL acknowledged OR 3 delivery attempts + 7-day window exhausted). See `data-export-portability.md` Pattern 2.

4. **Audit-log enforcement.** Every erasure-event in the audit log MUST be preceded by a matching `art_20_export_emitted` event for the same `(tenant_id, subject_id)`. A CI test asserts this invariant against test fixtures.

5. **Subject DSR portal symmetry.** The portal exposes both "export my data" and "delete my data"; the delete flow internally calls the export flow first.

6. **Apply `data-export-portability.md` + `gdpr-right-to-deletion.md`.** These fragments provide the implementation patterns; this anti-pattern is the failure they prevent.

7. **Regression test.** A fixture-based test (P3.2's cross-skill DAG smoke covers this — see plan §5.6.2) emits a synthetic erasure request and asserts the export-bundle file exists and is signed before any deletion event fires.

## When acceptable

There is essentially never a case where this anti-pattern is acceptable under GDPR/UK GDPR with consent or contract as the lawful basis. Narrow exceptions:

- **Lawful basis is legitimate-interest only (Art 6(1)(f)).** Art 20 does not attach; export-before-delete is not a regulatory obligation (though good-customer-experience suggests offering it anyway). Document the lawful-basis determination in the privacy notice.

- **Data is processed without any identifiable subject (anonymized from collection).** No subject → no Art 20 obligation. Verify with privacy counsel; "we hashed the user_id" is not anonymization (see `tenant-anonymization-techniques.md`).

- **The subject has explicitly declined the export.** The DSR portal offers export; the subject clicks "skip export, just delete". This is permissible only if (a) the offer was unambiguous, (b) the decline is audit-logged, (c) the platform retains evidence of the decline.

- **The data is held under a legal-hold that forbids export.** Rare; usually legal-holds compel both retention AND export-on-demand for discovery. See `legal-hold-and-retention-windows.md`.

## Cross-references

- Fragment: [data-export-portability.md](../fragments/data-export-portability.md) — the Art 20 mechanism this anti-pattern violates
- Fragment: [gdpr-right-to-deletion.md](../fragments/gdpr-right-to-deletion.md) — the Art 17 path; sequencing constraint enforced
- Fragment: [legal-hold-and-retention-windows.md](../fragments/legal-hold-and-retention-windows.md) — adjacent concern; hold may modify but does not waive Art 20
- Cousin anti-pattern: `tenancy-as-afterthought.md` (P3.1 family) — similar root cause of compliance-after-architecture
- Glossary: `data-portability`, `right-to-deletion`
- Gate: `QG-M2` (refined v1.1.0) — invariant `data_export_required: true` catches this anti-pattern at schema-validation time
