---
id: legal-hold-and-retention-windows
title: Legal Hold & Retention Windows
category: lifecycle
kind: fragment
module: bmad-bam-platform
persona: atlas
qg_ref: QG-M2
last_reviewed: 2026-05-17
version: 1.0.0
status: active
tags: [legal-hold, retention, litigation-hold, regulatory-floor, multi-tenant]
references:
  - "FRCP Rule 37(e) — Sanctions for failing to preserve electronically stored information"
  - "Zubulake v. UBS Warburg (litigation hold benchmark case)"
  - "HIPAA 45 CFR §164.530(j) — 6-year retention floor"
  - "SOX §802 / §103 — 7-year retention for audit working papers"
  - "PCI-DSS v4.0 §3.2.1 / §10.5 — 1-year minimum log retention"
---

# Legal Hold & Retention Windows

A retention window is the time the platform is *permitted or obligated* to hold data; a legal hold is a *temporary override* that suspends deletion regardless of policy. The two interact in ways that have direct compliance implications: tier policy says "delete after 30 days", regulatory floor says "retain for 6 years", legal hold says "retain indefinitely until release". The most-restrictive (longest retention) obligation always wins, and the platform MUST be able to prove that interaction was honored at every deletion event.

This fragment defines the model: the retention-window-source enum (tier_hint → overridden → regulatory_floor → legal_hold), the legal-hold lifecycle (institute → scope → enforce → release), the release-controls (legal-team sign-off; not engineering), and the audit trail that makes the whole thing regulator-defensible. In multi-tenant SaaS, this is non-optional: a Zubulake-style spoliation finding can be platform-ending if a litigation hold was issued and the platform deleted on schedule.

The fragment is consumed by `bmad-bam-design-tenant-offboarding` (step-01 elicits legal-holds; step-04 finalizes; step-07-v cross-checks `retention_window_source: legal_hold` against `legal_holds[]` entries).

---

## When to Use

Apply these patterns when:

- **The platform is subject to discovery in litigation.** Any B2B SaaS, any consumer SaaS with user-generated content, any platform with tenant data that could be evidence in a lawsuit. FRCP Rule 37(e) sanctions for spoliation are severe.

- **Regulatory floors apply to a subset of tenants.** Healthcare tenants (HIPAA: 6 years), financial-services tenants (SOX: 7 years; PCI: 1 year), insurance, legal-services, education (FERPA), government contracts (varies). The platform's offboarding-policy MUST express which tenants are under which floor.

- **The tenant has its own retention obligations downstream.** The tenant is a hospital, a bank, a law firm; their data-retention policy is stricter than the platform's. The platform exposes a retention-extension API and honors tenant-driven extensions.

- **An incident has triggered a regulatory or legal preservation order.** Subpoena, search warrant, regulatory investigation, internal-investigation pre-litigation. The hold must be instituted before any policy-driven deletion fires next.

- **The tenant is in an active dispute (chargeback, contract, employment).** Legal-hold protects the dispute-relevant records from inadvertent deletion.

## When NOT to Use

Skip these patterns when:

- **The data is genuinely transient (no retention obligation at all).** Session tokens, ephemeral computation caches, scratch buffers — these have neither retention floor nor legal-hold relevance. Document the boundary and apply hard-delete with short TTL.

- **The tenant tier is `regulatory_profile: none` AND no legal-hold has been instituted.** Tier policy is the sole driver; this fragment's mechanisms are unused (but the architecture should be ready when they're needed — don't paint over the hooks).

- **Hold-without-release is being proposed.** Permanent indefinite retention without a release path is itself a privacy bug. Every hold MUST have a release mechanism, even if release requires legal-team sign-off + multi-year wait.

---

## Architecture

### The retention_window_source enum

The offboarding-policy.json `per_tier[*].retention_window_source` is a closed enum reflecting the precedence chain:

```
tier_hint < overridden < regulatory_floor < legal_hold
   (least)                                  (most restrictive)
```

| Source | Set when |
|---|---|
| `tier_hint` | tier-model.json provides retention_window_days_hint; no other source applies |
| `overridden` | User explicitly overrode in step-04 (rationale captured in ADR) |
| `regulatory_floor` | profile (HIPAA/SOX/PCI) bumps retention to ≥ floor; was lower from tier_hint |
| `legal_hold` | An active legal_holds[] entry matches this tier's scope; effective retention = infinite-until-release |

step-07-v validates that the most-restrictive applicable source is what's recorded. If `regulatory_profile: hipaa` AND `retention_window_days < 2190` AND no legal_hold matches → ERROR; either the bump didn't fire or the source was mis-recorded.

### Legal-hold lifecycle

```
                ┌──────────────────┐
                │  triggering      │
                │  event           │
                │ (subpoena, etc.) │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ INSTITUTE        │ ← legal counsel decides
                │  - scope         │
                │  - reason        │
                │  - effective_    │
                │    until         │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ ENFORCE          │ ← offboarding-policy.json
                │  - retention_    │   per_tier[].retention_
                │    window_source │   window_source =
                │    = legal_hold  │   legal_hold
                │  - deletion      │
                │    blocked       │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ AUDIT            │ ← every blocked-deletion
                │ + INFORM         │   event logged + signed
                │ subject (if      │
                │ legally         │
                │ permissible)    │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ RELEASE          │ ← REQUIRES legal-team
                │  - sign-off by   │   sign-off (released_by);
                │    counsel       │   NOT engineering alone
                │  - timestamp     │
                │  - reason        │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ RESUME normal    │
                │ retention policy │
                │ from tier/profile│
                └──────────────────┘
```

### legal_holds[] schema (offboarding-policy.json)

```json
"legal_holds": [
  {
    "scope": "all_tenants" | "tier:<tier_id>" | "tenant:<tenant_id>",
    "reason": "Litigation hold — Doe v. Platform, Case 4:25-cv-12345",
    "instituted_at": "2026-05-17T14:23:00Z",
    "effective_until": "indefinite" | "2027-05-17T00:00:00Z",
    "instituted_by": "general_counsel",
    "released_by": null
  }
]
```

When `released_by` is non-null, the hold is released (historical record retained for audit; the entry is NOT removed from the JSON — it documents the period the hold was in force).

### Regulatory retention floor table

| Profile | Days | Origin |
|---|---|---|
| `gdpr_baseline` | 0 | No floor; subject-erasure obligations dominate |
| `hipaa` | 2190 (6y) | 45 CFR §164.530(j) — retain records 6 years from creation or last effective date |
| `sox_or_pci` | 2555 (7y) | SOX §802 (7y for auditor working papers); PCI-DSS §3.2.1 (1y min log; but financial records typically 7y under SOX umbrella) |
| `none` | 0 | No regulatory obligation |

The combined floor: `effective_floor = max(profile_floor, all_active_legal_hold_floors)` where active legal-holds with `scope: all_tenants` or matching the tenant contribute infinite.

### Scope matching rules

A `legal_holds[]` entry matches a tier when:

```python
def hold_applies(hold, tier_id, tenant_id=None):
    scope = hold["scope"]
    if hold.get("released_by"):
        return False  # released; historical record only
    if hold.get("effective_until") != "indefinite":
        if parse_rfc3339(hold["effective_until"]) < now():
            return False  # expired
    if scope == "all_tenants":
        return True
    if scope == f"tier:{tier_id}":
        return True
    if tenant_id and scope == f"tenant:{tenant_id}":
        return True
    return False
```

When `retention_window_source: legal_hold` is set in per_tier, step-07-v cross-checks that at least one entry in `legal_holds[]` matches.

### ASCII diagram — combined retention resolution

```
   tier_id = "enterprise", regulatory_profile = "hipaa", legal_hold active
            │
            ▼
   ┌─────────────────────────────────────┐
   │ retention sources (precedence ↑)    │
   │                                      │
   │  tier_hint:          30 d           │
   │  overridden:         (not set)      │
   │  regulatory_floor:   2190 d (6y)    │
   │  legal_hold:         indefinite ← WINS
   │                                      │
   │  effective retention = indefinite   │
   │  retention_window_source = legal_hold
   └─────────────────────────────────────┘
            │
            ▼
   step-04 records: retention_window_days = 2190 (the floor; used only as numeric
                                                 placeholder)
                    retention_window_source = "legal_hold"
                                                 │
                                                 ▼
   step-07-v validates legal_holds[] has matching scope; if not → ERROR
```

---

## Trade-offs

| Approach | Permissive (delete on policy) | Conservative (always hold long) | Hold-on-trigger (this fragment) |
|---|---|---|---|
| Spoliation risk | High (deletion may destroy evidence) | None | Low if hold instituted promptly |
| Storage cost | Lowest | Highest (perpetual retention) | Bounded by hold duration |
| Subject-rights honoring | Easiest | Hardest (can never honor Art 17) | Possible per-tenant; held tenants accept the trade-off |
| Operational complexity | Lowest | Lowest | Medium (institute/enforce/release machinery) |
| Recommended | Never (FRCP exposure) | Never (GDPR exposure) | DEFAULT — bounded conservatism |

### Decision rule

```
if regulatory_profile in {HIPAA, SOX_or_PCI}:
    apply floor (2190 / 2555 / 1y)
if active legal_hold matches scope:
    retention = indefinite, source = legal_hold
if no other source applies:
    retention = tier_hint
deletion proceeds when: now() > created_at + retention_window AND no active hold AND post-retention_action chains complete
```

---

## Implementation Patterns

### Pattern 1 — Hold institution (CLI / admin API)

```python
@admin_only
def institute_legal_hold(scope, reason, effective_until=None, instituted_by_role="general_counsel"):
    """Called by legal team via admin API. Records hold immediately; enforcement begins."""
    hold = {
        "scope": scope,
        "reason": reason,
        "instituted_at": now_rfc3339(),
        "effective_until": effective_until or "indefinite",
        "instituted_by": instituted_by_role,
        "released_by": None,
    }
    # Read current offboarding-policy.json; append hold; re-write
    policy = load_offboarding_policy()
    policy["legal_holds"].append(hold)
    save_offboarding_policy(policy)
    # Update per_tier[].retention_window_source for affected tiers
    for tier in policy["per_tier"]:
        if hold_applies(hold, tier["tier_id"]):
            tier["retention_window_source"] = "legal_hold"
    save_offboarding_policy(policy)
    audit_log("legal_hold_instituted", scope, reason, instituted_by_role)
    return hold
```

### Pattern 2 — Deletion gate

```python
def can_delete_subject(tenant_id, subject_id):
    """Called at the top of every deletion-handoff workflow. Returns False if any hold blocks."""
    policy = load_offboarding_policy()
    tier_id = lookup_tier_for_tenant(tenant_id)
    for hold in policy.get("legal_holds", []):
        if hold_applies(hold, tier_id, tenant_id):
            audit_log("deletion_blocked_by_legal_hold", tenant_id, subject_id, hold)
            return False
    # No active hold; proceed (subject to retention-window check downstream)
    return True
```

### Pattern 3 — Release (with sign-off requirement)

```python
@admin_only
@requires_role("general_counsel")  # decorator enforces sign-off requirement
def release_legal_hold(hold_index, released_by_role, release_reason):
    policy = load_offboarding_policy()
    hold = policy["legal_holds"][hold_index]
    assert hold["released_by"] is None, "hold already released; cannot re-release"
    hold["released_by"] = released_by_role
    hold["released_at"] = now_rfc3339()
    hold["release_reason"] = release_reason
    # Update per_tier[].retention_window_source — revert to whichever source applies next
    for tier in policy["per_tier"]:
        if hold_applies(hold, tier["tier_id"]):
            # Re-resolve: regulatory_floor > overridden > tier_hint
            tier["retention_window_source"] = resolve_next_source(tier)
    save_offboarding_policy(policy)
    audit_log("legal_hold_released", hold["scope"], released_by_role, release_reason)
```

### Pattern 4 — Periodic hold-expiry sweep

```python
@cron("daily")
def sweep_expired_holds():
    """Holds with effective_until in the past are auto-released, with audit trail."""
    policy = load_offboarding_policy()
    for hold in policy.get("legal_holds", []):
        if hold.get("released_by"):
            continue
        eu = hold["effective_until"]
        if eu == "indefinite":
            continue
        if parse_rfc3339(eu) < now():
            hold["released_by"] = "auto_expiry"
            hold["released_at"] = now_rfc3339()
            hold["release_reason"] = f"effective_until ({eu}) passed"
            audit_log("legal_hold_auto_expired", hold["scope"])
    save_offboarding_policy(policy)
```

### Pattern 5 — HIPAA / SOX / PCI floor application

```python
FLOORS = {"gdpr_baseline": 0, "hipaa": 2190, "sox_or_pci": 2555, "none": 0}

def apply_regulatory_floor(tier, profile):
    floor = FLOORS[profile]
    if tier["retention_window_days"] < floor:
        tier["retention_window_days"] = floor
        tier["retention_window_source"] = "regulatory_floor"
    return tier
```

---

## Quality Checks

- **Every legal-hold has a documented institution + release path.** No "permanent hold" without a release mechanism (even if release requires legal-team multi-year decision).

- **Release requires legal-team sign-off.** Engineering cannot release a legal hold; the `@requires_role("general_counsel")` decorator enforces.

- **Held data is not deleted on schedule.** A test scenario: institute a hold; advance time past the natural retention window; assert the data is still present + the deletion-orchestrator records "blocked_by_legal_hold".

- **Held data is exportable for discovery.** The platform must produce subject data on demand (subpoena response). The Art 20 export machinery is the reuse path.

- **Released holds are preserved in audit log.** Released holds are NOT removed from `legal_holds[]`; they remain with `released_by` populated. The historical record is regulatory-defensibility evidence.

- **Retention-floor application is per-profile-correct.** Test fixtures for each profile assert HIPAA bumps to 2190d, SOX/PCI bumps to 2555d, GDPR-baseline / none leave tier_hint alone.

- **Hold-expiry sweep runs reliably.** A daily cron + monitoring ensures expired holds release on time.

- **CRITICAL:** Legal hold MUST override deletion regardless of tier policy; release requires legal-team sign-off.

---

## Web Research Queries

(Use `{date}` to scope to current best practice; replace with the current year at query time.)

- `litigation hold electronically stored information FRCP best practices {date}`
- `HIPAA 6 year retention multi-tenant SaaS implementation {date}`
- `SOX 7 year retention working papers software systems {date}`
- `PCI-DSS log retention 1 year SaaS audit {date}`
- `Zubulake spoliation sanctions cloud platform {date}`

---

## Cross-references

- Fragment: `gdpr-right-to-deletion.md` — legal hold overrides Art 17; this fragment defines the override mechanism
- Fragment: `data-export-portability.md` — export still emits even under hold (subject-rights are limited; discovery may compel)
- Fragment: `tenant-anonymization-techniques.md` — held data cannot be anonymized either (would destroy evidence); resume anonymize after release
- Anti-pattern: `delete-without-export.md` — applies when both export and deletion happen; legal-hold scenarios are out of scope but adjacent
- Glossary: `retention-floor`, `right-to-deletion`
- Gate: `QG-M2` (refined v1.1.0) — `legal_holds[]` cross-check in offboarding-policy.json
- Skill: `bmad-bam-design-tenant-offboarding` — primary consumer; step-01 elicits, step-04 finalizes, step-07 cross-checks
