---
name: bmad-bam-design-tenant-offboarding
description: "Design tenant offboarding: GDPR Art 17 erasure, Art 20 export, regulatory retention floors. 3 deletion modes (hard_delete / soft_delete / anonymize) keyed off --regulatory-profile flag {gdpr_baseline | hipaa | sox_or_pci | none}. Output: offboarding-policy.md + .json + QG-M2-offboarding-evidence.md (QG-M2 evidence). Symmetric tear-down of onboarding-flow.json when present. Invoke via /bmad-bam-design-tenant-offboarding."
---

# bmad-bam-design-tenant-offboarding

## Purpose

Offboarding is the legally-loaded mirror of onboarding. Done wrong, it produces regulatory exposure (Art 17 deletion missing Art 20 export emit; HIPAA / SOX / PCI retention floors trampled), trust loss (customer perceives deletion as data hostage situation), and operational debt (orphan rows, hanging Stripe customers, dangling cells). This workflow elicits per-tier deletion modes, retention windows, legal-holds, and cross-module tear-down hooks keyed off a `--regulatory-profile` flag. It honors regulatory retention floors as a hard fail-fast in step-07-v, and emits Art 20 portability before Art 17 deletion as a mandatory schema invariant.

## When to invoke

- After tier-model is decided (required; tier-model.json provides tier list + retention hint)
- After tenancy is decided (required; tenancy-decision.json provides isolation_model + hybrid_resolution)
- Before any production launch (paid traffic accumulates erasure risk from day 1)
- After onboarding-flow.json (soft; provides symmetric tear-down hooks by reversing `provisioning_hooks[]`)
- After finops-baseline.json (soft; informs "billing must close" handoff)

## Inputs

- Required: `tier-model.json` (schema 1.0 with auto-fill OR 1.1)
- Required: `tenancy-decision.json`
- Soft: `finops-baseline.json` (cost-handoff hint; degraded gracefully if absent)
- Soft: `onboarding-flow.json` (symmetric tear-down hint; degraded gracefully — emits generic tear-down without reverse_map if absent)

## Output

- `docs/architecture/offboarding-policy.md` — human-readable narrative
- `_bmad/bam/evidence/QG-M2/offboarding-policy.json` — machine contract; schema per spec §3.3
- `_bmad/bam/evidence/QG-M2/QG-M2-offboarding-evidence.md` — human evidence narrative for QG-M2 (feeds H2)

## Gate

QG-M2 (refined v1.1.0). Note: QG-C1 mirror was DROPPED per spec G14 correction; offboarding evidence flows only to QG-M2.

## Flags

- `--regulatory-profile {gdpr_baseline | hipaa | sox_or_pci | none}` (default: `gdpr_baseline`) — selects retention-floor + per-tier deletion-mode pre-fills.
