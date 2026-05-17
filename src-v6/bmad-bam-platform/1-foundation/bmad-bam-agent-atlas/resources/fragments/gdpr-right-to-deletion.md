---
id: gdpr-right-to-deletion
title: GDPR Right to Deletion (Art 17)
category: lifecycle
kind: fragment
module: bmad-bam-platform
persona: atlas
qg_ref: QG-M2
last_reviewed: 2026-05-17
version: 1.0.0
status: active
tags: [gdpr, deletion, art-17, right-to-erasure, subject-erasure, retention, multi-tenant]
references:
  - "Regulation (EU) 2016/679 Article 17 — Right to Erasure"
  - "EDPB Guidelines 5/2020 on consent (related: lawful basis for retention)"
  - "ICO guidance on the right to erasure (UK GDPR)"
---

# GDPR Right to Deletion (Art 17)

Article 17 of the GDPR — the "right to be forgotten" — obligates the controller (the SaaS platform) to erase personal data when one of six conditions applies: the data is no longer necessary, consent is withdrawn, the subject objects without overriding grounds, the data was unlawfully processed, erasure is required by EU/Member-State law, or the data was collected from a child under the conditions of Art 8. In multi-tenant SaaS, the controller-versus-processor split matters: when a tenant (an enterprise customer) controls its end-users' data, the SaaS is typically the processor, and the controller (the tenant) makes the Art 17 decision. But the SaaS still must support the mechanism — fast-path subject-erasure flows, retention-aware deletion, and Art 20 export-before-deletion sequencing.

This fragment is the design vocabulary for that mechanism. It defines what "erasure" actually means in a system that has indexes, caches, replicas, search clusters, AI memories, observability traces, and an outbox queue. It also defines the temporal contract: deletion MUST be honored within a regulatory window (Art 17 says "without undue delay"; the Article 29 Working Party benchmark and German DPA guidance converge on "within one month" as the typical fast-path floor), even when in-flight retention timers from tier policy exist.

The fragment is consumed by `bmad-bam-design-tenant-offboarding` (step-04 finalizes per-tier deletion-mode + retention window per regulatory profile) and is the primary citation for the `delete-without-export.md` anti-pattern.

---

## When to Use

Apply these patterns when:

- **The platform processes personal data of EU/EEA/UK subjects.** Art 17 applies whenever the GDPR (or UK GDPR) applies — controller in the EU, data subject in the EU, or processing activities targeting the EU. SOX/PCI/HIPAA add their own retention floors *on top of* Art 17; they do not replace the erasure right.

- **The platform is multi-tenant.** Single-tenant deletion is a row-DROP; multi-tenant deletion is a subject-erasure that must cleanly scope to the tenant's row(s) without touching another tenant's data, while propagating to every system that holds a copy (search index, AI memory, analytics warehouse, log archive, backup tape).

- **The deletion request can come from two paths.** (1) Tenant-initiated whole-tenant offboarding (covered by `bmad-bam-design-tenant-offboarding`). (2) Subject-initiated request via a tenant's data-subject-rights portal (the tenant operates the portal; the SaaS exposes an API to honor the request scoped to that tenant's data).

- **Retention windows are policy-driven, not hard-coded.** Tier policy says "free tier deletion = 7-day soft-delete window then hard-delete"; HIPAA floor says "clinical data retained 6 years". The two interact; the system MUST resolve the conflict explicitly via `retention_window_source` (tier_hint vs regulatory_floor vs legal_hold) and honor the most restrictive (longest retention) of the applicable obligations.

- **Cross-module handoff matters.** Erasure cannot proceed before billing closes (open invoices), before AI memory is purged (`bmad-bam-agent-runtime` scope), before observability logs are scrubbed of PII, before search-index entries are removed. The order matters; the `cross_module_handoffs[].ordering` field carries it.

## When NOT to Use

Skip these patterns when:

- **The platform stores zero personal data.** B2B aggregate-only platforms (e.g., financial-market data services with no individual user records) have no Art 17 surface; they still need retention policy but not subject-erasure machinery.

- **All processing is fully anonymous from collection.** Aggregated metrics gathered without any tenant-or-user identifier — by construction, there is no subject to erase. Verify with privacy counsel; "we hash the user_id" is pseudonymization, not anonymization, and Art 17 still applies.

- **Tenant data is operationally inseparable (legacy single-database non-RLS systems).** Apply the upstream tenancy fix first (P3.1 tenancy-decision) before adding deletion machinery. Erasure on a non-tenant-isolated system is risky — the deletion query may touch other tenants' rows.

- **Deletion is forbidden by another legal obligation.** Active legal holds (litigation, regulatory subpoena, tax-audit lockdown) supersede Art 17. The mechanism for this is the `legal_holds[]` array; see `legal-hold-and-retention-windows.md`.

---

## Architecture

### The six grounds for erasure (Art 17(1)(a)-(f))

Erasure is mandatory when ANY of these holds:

| Ground | Trigger | Typical SaaS encoding |
|---|---|---|
| 17(1)(a) — no longer necessary | Original purpose fulfilled | End of tier retention window |
| 17(1)(b) — consent withdrawn | Subject revokes consent + no other lawful basis | Subject-erasure API call |
| 17(1)(c) — subject objects under Art 21 | Direct-marketing objection or compelling personal grounds | Erasure-with-objection-flag |
| 17(1)(d) — unlawfully processed | Found post-hoc; mandatory remediation | Incident-driven bulk erasure |
| 17(1)(e) — legal obligation | Member-state law commands erasure | Country-specific compliance hook |
| 17(1)(f) — child's data per Art 8 | Original collection was under-age | Age-gating remediation |

The platform's deletion-mode policy MUST be able to express which ground triggered the erasure (lives in the `legal_holds[].reason` field for tenant-wide holds; in audit-log events for subject-scoped erasures).

### The six exceptions (Art 17(3))

Erasure does NOT apply when:

- (a) Exercise of freedom of expression and information
- (b) Compliance with EU/Member-State legal obligation requiring retention
- (c) Public-interest tasks in the area of public health
- (d) Archiving in the public interest, scientific/historical research or statistics (subject to Art 89)
- (e) Establishment, exercise or defense of legal claims (the litigation-hold path)
- (f) Reasons of public interest

In SaaS practice, (b) and (e) are the operationally relevant exceptions. (b) is what creates the HIPAA/SOX/PCI retention floors; (e) is what creates legal-hold overrides.

### Deletion semantics matrix

| deletion_mode | Art 17 compliance | When to choose |
|---|---|---|
| `hard_delete` | Strongest — data physically gone | Default when no retention exception applies; required for `regulatory_profile == none` |
| `soft_delete` | Conditional — Art 17 satisfied iff `post_retention_action: hard_delete` fires within "undue delay" window (≤ 30 days from request typical) | Bridge mode; provides reversibility window but MUST chain to hard-delete |
| `anonymize` | Strongest in spirit if irreversible — Art 17(1) need-no-longer-met is satisfied because the data is no longer personal data | Default when analytics integrity matters AND regulatory floor (HIPAA/SOX/PCI) prevents hard-delete |

The critical nuance: `soft_delete` without a guaranteed `post_retention_action` is NOT Art 17 compliance — the data still exists, the subject is still identifiable, and the rights of the subject still attach.

### Erasure-request fast-path

Independent of natural retention expiry, the system MUST honor an explicit subject-erasure request via a fast-path that does not wait for the tier's natural retention timer:

```
subject_erasure_fast_path: true       ← MANDATORY in offboarding-policy.json

invocation:
  POST /api/v1/erasure-requests
  { "tenant_id": "...", "subject_id": "...", "ground": "17(1)(b)", "evidence_ref": "..." }

response: 202 Accepted
  { "erasure_request_id": "...", "scheduled_completion": "<RFC 3339; ≤ T+30d>" }
```

The fast-path triggers the cross-module handoff chain immediately; the natural retention timer is bypassed for that subject. Audit-log entries are emitted at request, at each handoff step, and at completion.

### Cross-module handoff chain (ordered)

The reference handoff chain for an Art 17 erasure (ordered by `cross_module_handoffs[].ordering`):

```
1. billing      — close open invoices, archive billing history (lawful basis: contract performance retention; may itself enter "anonymized financial record" zone)
2. ai_runtime   — purge tenant memory + agent state + tool-call history (Nova)
3. observability — scrub PII from log archive (or accelerate to anonymize log entries; structured replacement of personal identifiers with a hash)
4. search       — remove tenant entries from search indexes (Elastic/OpenSearch/Algolia/Pinecone)
5. crm          — close CRM record (non-blocking; best-effort)
6. backups      — schedule de-PII'd re-snapshot at next backup cycle; mark current backup as containing pre-deletion PII (Art 17 reasonable-steps obligation)
7. platform     — final tenant row / schema / cell hard-delete or anonymize
```

The last step is the catch — it must be last because (1)-(6) read the tenant's identity to know what to delete; once the platform row is gone, downstream cleanup is harder.

### Backup-tape and replica handling

Art 17(2) reasonable-steps clause: the controller must take "reasonable steps" to notify downstream controllers that the subject has requested deletion. In SaaS terms, this applies to:

- **Hot replicas (read-replicas):** deletion propagates within minutes via replication; no special action.
- **Warm backups (point-in-time recovery):** deletion is *not* applied to existing backup snapshots; the obligation is met by scheduling a deletion of the backup before restore is possible.
- **Cold backups (tape, S3 Glacier, archive):** mark the subject for deletion; the next-snapshot policy must omit them; existing snapshots may legitimately retain the data UNTIL the next snapshot supersedes them. Document this in the privacy notice.
- **Third-party processors (sub-processors):** issue deletion-notification API calls or email; track completion in an audit log.

### ASCII diagram — erasure flow

```
  subject (via tenant DSR portal)
            │
            ▼
   POST /api/erasure-requests
            │
            ▼
   ┌────────────────────────────┐
   │ erasure-orchestrator       │ ← Temporal / Step Functions
   │  (records request; audits) │
   └────────────────────────────┘
            │
            ▼  (cross_module_handoffs[*].ordering)
  ┌─────────┼──────────┐
  ▼         ▼          ▼          ▼          ▼          ▼          ▼
 billing  ai_rt   obs-scrub   search   crm  backups  platform-delete
  (1)     (2)       (3)        (4)     (5)   (6)         (7)
                                                              │
                                                              ▼
                                                       audit-log: complete
                                                              │
                                                              ▼
                                                    response to DSR portal
```

---

## Trade-offs

| Axis | hard_delete | soft_delete + scheduled hard | anonymize |
|---|---|---|---|
| Art 17 compliance strength | Strongest | Conditional (only iff post_retention fires) | Strong (if irreversible) |
| Art 20 portability emit | MUST emit before delete; same in all modes | Same | Same |
| Operational reversibility | Zero | Window-bounded | Zero |
| Analytics integrity | Poor (cohort row vanishes) | Excellent (tombstone queryable) | Good (aggregates preserved) |
| Storage cost | Best (storage freed) | Worst (full retained for window) | Medium (PII columns may shrink) |
| Backup-tape obligation | Same in all modes (next snapshot supersedes) | Same | Same |
| Suitability for "regulatory_profile: none" | Default | Use only if analytics need short window | Avoid (no compliance driver) |
| Suitability for HIPAA/SOX/PCI | Forbidden (violates floor) | Forbidden (bridge to hard violates floor) | DEFAULT — irreversible anonymization is GDPR-compliant + floor-compliant |
| Suitability for GDPR-only | Acceptable; lawful | Acceptable bridge to hard | Acceptable; preferred when analytics matter |

### Decision rule

```
if regulatory_profile in {HIPAA, SOX_or_PCI}:
    business+enterprise tiers → anonymize (the floor demands retention; cannot hard-delete)
    free/starter/pro → soft_delete with post_retention: hard_delete (no PHI/financial regulated data; standard floor applies)
elif regulatory_profile == GDPR_baseline:
    all tiers → soft_delete with post_retention: hard_delete (provides reversibility window; ends in Art 17 compliance)
elif regulatory_profile == none:
    all tiers → hard_delete (no retention obligation; strongest compliance posture)
```

---

## Implementation Patterns

### Pattern 1 — Erasure-orchestrator workflow

```python
# pseudo-code; pin to a real workflow engine
@workflow
def handle_erasure_request(tenant_id, subject_id, ground):
    # Step 1: emit Art 20 portability export FIRST (before any deletion)
    export = activity(export_subject_data, tenant_id, subject_id, timeout="5m")
    audit("art_20_export_emitted", tenant_id, subject_id, export.ref)

    # Step 2-7: ordered handoffs
    for handoff in cross_module_handoffs_ordered():
        try:
            activity(handoff.fn, tenant_id, subject_id, timeout="2m")
            audit("handoff_complete", handoff.module)
        except Exception as e:
            if handoff.blocking:
                raise EraserBlocked(handoff.module, str(e))
            audit("handoff_failed_nonblocking", handoff.module, str(e))

    # Step 8: final platform tear-down (per deletion_mode)
    activity(execute_tear_down_hook, tenant_id, subject_id, deletion_mode())
    audit("erasure_complete", tenant_id, subject_id, completed_at=now())
```

### Pattern 2 — RLS row hard-delete

```sql
-- Pre-conditions:
--   1. Art 20 export already emitted
--   2. All cross-module handoffs complete
--   3. No active legal_hold for this tenant/subject

BEGIN;
  -- The RLS policy enforces tenant scope; we still WHERE-clause explicitly
  -- for defense in depth and audit-log clarity.
  DELETE FROM user_pii WHERE tenant_id = $1 AND user_id = $2;
  DELETE FROM user_events WHERE tenant_id = $1 AND user_id = $2;
  -- ... per table in PII catalog ...
  INSERT INTO erasure_audit_log (tenant_id, subject_id, mode, completed_at)
    VALUES ($1, $2, 'hard_delete', now());
COMMIT;
```

### Pattern 3 — Anonymize (irreversible)

```sql
-- Replace PII columns with deterministic-but-non-reversible hash.
-- The salt is rotated and the pre-anonymization mapping is NOT retained anywhere
-- (no recovery path; otherwise this is pseudonymization, not anonymization).

UPDATE user_pii
SET email = encode(sha256(random()::bytea || email::bytea), 'hex'),
    name = '[anonymized]',
    phone = NULL,
    -- ... per PII column ...
    anonymized_at = now()
WHERE tenant_id = $1 AND user_id = $2;

-- Verify: a re-anonymization of the same row produces a different hash
-- (because the random salt is fresh). Without this property, the mapping
-- can be reconstructed by attackers with column-access; it would be
-- pseudonymization, not anonymization.
```

See `tenant-anonymization-techniques.md` for the irreversibility-by-construction patterns and verification tests.

### Pattern 4 — Backup-tape lifecycle

```yaml
# backup-policy.yaml
snapshot_schedule:
  daily: 30-day retention
  weekly: 90-day retention
  monthly: 7-year retention   # often regulatory-driven

erasure_obligation:
  on_subject_erasure:
    - record subject_id in pending_erasure_in_next_snapshot
    - do NOT modify existing snapshots (operationally expensive; legally permissible per Art 17(2) reasonable-steps)
    - at next-snapshot time, omit subject_id from new snapshot
    - mark older snapshots as "contains pre-deletion PII; access requires erasure-aware decrypt"
    - retire older snapshots per natural retention; do not retain beyond regulatory minimum
```

### Pattern 5 — Audit-log signing

```python
# Every erasure event is logged + signed; the signature is the
# regulatory-defensibility evidence that the deletion actually happened.

def audit(event_type, tenant_id, subject_id, **fields):
    record = {
        "event_type": event_type,
        "tenant_id": tenant_id,
        "subject_id": subject_id,
        "timestamp": now_rfc3339(),
        "fields": fields,
    }
    record["signature"] = hmac_sha256(secret_key(), json.dumps(record, sort_keys=True))
    log_store.write(record)
```

---

## Quality Checks

- **Every Art 17 trigger maps to a deletion_mode + retention_window.** No ground in 17(1)(a)-(f) is unhandled; the offboarding-policy.json `per_tier[*]` covers every tier.

- **Erasure fast-path completes within the regulatory window.** Internal SLO: ≤ 7 days for the fast-path; external commitment: ≤ 30 days (Art 17 "without undue delay"). Measure end-to-end from request-receipt to all-handoffs-complete.

- **Art 20 export emit is verified before any deletion proceeds.** Step 1 of the orchestrator MUST succeed (export file written + acknowledged by subject's chosen delivery channel) before step 2 fires. See `data-export-portability.md`.

- **Per-deletion-mode invariants enforced.** soft_delete MUST have a `post_retention_action: hard_delete` (or `anonymize`); `noop` is forbidden as the post-action for a `soft_delete` tier. step-07-v of the offboarding skill enforces this.

- **Backup-tape policy is documented + tested.** A test scenario asserts that a subject erased at T does NOT appear in snapshots taken after T+24h (next daily snapshot cycle).

- **Audit log is tamper-evident.** Erasure-event signatures verify against an external root-of-trust (e.g., immutable log service, signed manifest published to S3 Object Lock).

- **CRITICAL:** Subject erasure MUST be honored within regulatory window even when in-flight retention timers exist.

---

## Web Research Queries

(Use `{date}` to scope to current best practice; replace with the current year at query time.)

- `GDPR Article 17 right to erasure multi-tenant SaaS implementation {date}`
- `Art 17 reasonable steps backup tape deletion {date}`
- `subject erasure fast-path SLO benchmarks {date}`
- `anonymization vs pseudonymization GDPR test cases {date}`
- `Schrems II data deletion cross-border {date}`

---

## Cross-references

- Fragment: `data-export-portability.md` — Art 20 portability MUST precede Art 17 erasure
- Fragment: `tenant-anonymization-techniques.md` — when anonymize is the chosen mode, this fragment defines irreversibility-by-construction
- Fragment: `legal-hold-and-retention-windows.md` — legal holds override Art 17; release path
- Fragment: `anti-corruption-layer.md` (REUSE) — cross-module handoff design across persona boundaries
- Anti-pattern: `delete-without-export.md` — skipping Art 20 portability before Art 17 deletion is a regulatory bug
- Glossary: `right-to-deletion`, `retention-floor`, `data-portability`, `anonymization`
- Gate: `QG-M2` (refined v1.1.0) — `offboarding-policy.json` provides H2 evidence sourced from this fragment
- Skill: `bmad-bam-design-tenant-offboarding` — primary consumer; step-04 finalizes per-tier deletion-mode from this fragment's decision rule
