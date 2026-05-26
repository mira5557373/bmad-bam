---
id: tenant-anonymization-techniques
title: Tenant Anonymization Techniques
category: lifecycle
kind: fragment
module: bmad-bam-platform
persona: atlas
qg_ref: QG-M2
last_reviewed: 2026-05-17
version: 1.0.0
status: active
tags: [anonymization, pseudonymization, gdpr, retention-floor, k-anonymity, multi-tenant]
references:
  - "EDPB Opinion 05/2014 on anonymisation techniques (WP216)"
  - "Article 29 Working Party Opinion on the concept of anonymisation"
  - "ISO/IEC 20889 — Privacy enhancing data de-identification terminology"
  - "Cynthia Dwork — Differential Privacy (foundational paper)"
---

# Tenant Anonymization Techniques

Anonymization is the GDPR-defined transformation that takes personal data and renders it no-longer-personal-data — i.e., re-identification is not reasonably possible. Once anonymization is achieved, GDPR no longer applies to that data; it can be retained indefinitely, exported freely, and analyzed without subject-rights attachment. The catch: most operational "anonymization" is actually *pseudonymization* — reversible by anyone with access to the mapping (or sufficient auxiliary information), and therefore still personal data subject to GDPR.

This fragment defines what counts as anonymization (per EDPB WP216 + WP29 opinion), what counts only as pseudonymization, the three classical techniques (generalization, suppression, perturbation), the modern frame (k-anonymity, l-diversity, t-closeness, differential privacy), and how to verify irreversibility in test. In multi-tenant SaaS, anonymization is the default deletion-mode for tiers under HIPAA/SOX/PCI floors (where hard-delete is forbidden but data must lose its personal character).

The fragment is consumed by `bmad-bam-design-tenant-offboarding` (step-04 selects anonymize as deletion-mode for HIPAA/SOX/PCI business+enterprise tiers) and is cited from `gdpr-right-to-deletion.md` (anonymize-as-alternative-to-delete branch).

---

## When to Use

Apply these patterns when:

- **Regulatory floor forbids hard-delete.** HIPAA (6 years for clinical records), SOX (7 years for financial records), PCI-DSS (1 year minimum), tax-residency rules in many jurisdictions (5-10 years). The data MUST be retained AND the subject's GDPR rights MUST be honored — anonymization is the rare technique that satisfies both.

- **Analytics integrity is non-negotiable.** Hard-delete destroys aggregate-cohort signals (churn rates, segment-size trends, retention curves). Anonymization preserves the row count + non-PII columns while stripping PII; cohort analytics survive.

- **The data is not actively-needed in identifiable form.** Anonymization is a one-way operation; once applied, no future user interaction can be tied back to the subject. Confirm with product that no downstream feature needs the data identifiable before anonymizing.

- **A re-identification attack model has been thought through.** k-anonymity protects against direct re-identification; it does NOT protect against attribute-disclosure if the cohort has homogeneous sensitive values (l-diversity). t-closeness goes further. Choose the property based on the threat model.

- **The platform retains business-analytics need.** Aggregated dashboards, cohort retention curves, churn analyses — all benefit from anonymized data that is no longer GDPR-subject.

## When NOT to Use

Skip these patterns when:

- **`regulatory_profile == none` AND no analytics-integrity requirement.** Hard-delete is simpler, more storage-efficient, and the strongest compliance posture. Don't introduce anonymization machinery if you don't need it.

- **The "anonymization" is actually a pseudonymization in disguise.** If a salt is retained, if a mapping table is kept, if column-level encryption is reversible — that is pseudonymization, NOT anonymization, and GDPR continues to apply. Either commit to true irreversibility (this fragment's patterns) or accept the pseudonymization classification and treat the data as still-personal.

- **Re-identification is plausible from the non-anonymized columns alone.** A "anonymized" record with `(zip_code, birth_date, gender)` is provably re-identifiable for 87% of the US population (Sweeney 2000). Generalize zip → state, birth_date → birth_year, OR suppress the row, OR apply k-anonymity.

- **The downstream consumer needs identifiable data.** ML training on user behavior, personalization features, billing reconciliation — these need identifiers. Anonymize only the data not used by those features.

---

## Architecture

### Anonymization vs pseudonymization (the legal distinction)

Per GDPR Art 4 + WP216:

| Property | Pseudonymization | Anonymization |
|---|---|---|
| Reversible? | YES (with additional information held separately) | NO (re-identification not reasonably possible) |
| GDPR applies? | YES — pseudonymized data is still personal data | NO — anonymized data is no longer personal data |
| Re-identification risk | Manageable via key separation + access control | Provably negligible per the chosen test (k-anon, DP, etc.) |
| Typical SaaS example | Email replaced with `tenant_id + hashed_user_id` (deterministic hash, salt kept) | Email replaced with `[anonymized]` + salt destroyed |
| Retention-after-erasure obligation | Subject erasure still applies | Subject erasure no longer applies (no data subject in the data) |

The bright line: **if the platform can reverse the operation under any circumstance, it is pseudonymization**. If reversal requires breaking cryptography or obtaining auxiliary information the platform does not and could not hold, it is anonymization.

### Three classical techniques (WP216 framework)

WP216 frames anonymization as resistance to three risks: singling-out, linkability, inference. Three families of techniques:

#### 1. Generalization

Replace specific values with ranges or categories:

- `birth_date: 1990-03-15` → `birth_year_range: 1985-1994`
- `zip: 02139` → `state: MA`
- `salary: $87,432` → `salary_band: $80k-100k`

Cheap; preserves aggregates well; weak against record-linkage attacks unless combined with other techniques.

#### 2. Suppression

Remove the value entirely (NULL or constant placeholder):

- `email: alice@example.com` → `email: NULL`
- `name: Alice Cooper` → `name: '[anonymized]'`

Strong against re-identification of the suppressed field; lossy for analytics; required for direct-identifier columns.

#### 3. Perturbation (noise injection)

Add random noise to numeric values:

- `salary: $87,432` → `salary: $87,432 + Gaussian(σ=$2k) ≈ $89,011`

Preserves aggregate-distribution but obscures individual values. Foundation of differential privacy.

### Modern frame — k-anonymity, l-diversity, t-closeness

Beyond the classical techniques, formal properties:

| Property | Definition | Protects against |
|---|---|---|
| **k-anonymity** | Every record is indistinguishable from at least k-1 other records on quasi-identifiers | Direct re-identification via quasi-identifier matching |
| **l-diversity** | Within each k-anonymous group, sensitive attributes have at least l well-represented values | Attribute disclosure when group has homogeneous sensitive values |
| **t-closeness** | Within each k-anonymous group, sensitive-attribute distribution is within t of the global distribution | Skew-based attribute disclosure |
| **Differential privacy** | Adding noise such that the presence/absence of any single record changes query output by ≤ ε | Mathematically rigorous; the gold standard for aggregated-statistics release |

For SaaS offboarding-anonymization, k=5 with l=2 on sensitive attributes is the typical floor; k=10 is preferred when the cohort is large enough to support it.

### The salt-destruction principle

For column-level transformations (suppression with hash; truncation), the irreversibility comes from destroying the mapping:

```python
# WRONG — this is pseudonymization
def anonymize_email_BAD(email, secret_salt):
    return hashlib.sha256(secret_salt + email.encode()).hexdigest()
# The secret_salt is retained → reversible by anyone with the salt + a list
# of candidate emails → still personal data → GDPR still applies

# RIGHT — this is anonymization
def anonymize_email(email):
    fresh_salt = os.urandom(32)
    h = hashlib.sha256(fresh_salt + email.encode()).hexdigest()
    # fresh_salt is NEVER persisted; this function call is the only place it exists
    # Cannot re-derive h from email without it; cannot derive email from h
    return h
```

The acid test: if the platform's database is fully compromised — every row, every backup, every config file — can re-identification still be done? For pseudonymization, yes (the salt is in config). For true anonymization, no (the salt was random + ephemeral).

### Per-column policy table

```yaml
anonymization_policy:
  user_profile:
    email:        { technique: suppress_then_hash_fresh_salt, retain_uniqueness: false }
    name:         { technique: suppress, replacement: "[anonymized]" }
    phone:        { technique: suppress, replacement: NULL }
    address:      { technique: generalize, level: city_or_state }
    birth_date:   { technique: generalize, level: year_range_5 }
    salary:       { technique: perturb, distribution: gaussian, sigma_percent: 5 }
    user_id:      { technique: replace_with_anonymous_token, token_format: uuid_v4 }
  preserved_for_analytics:
    cohort_id:    keep
    signup_date:  generalize_to_month
    tier_at_signup: keep
```

The `replace_with_anonymous_token` for the primary key is the subtle one — preserve row-level identity across joins (so the user's events can still be aggregated as one record) but make the token a fresh UUID that has no derivable relationship to the original user_id.

### ASCII diagram — anonymize-then-retain flow

```
   subject erasure request OR end-of-retention-window
            │
            ▼
   ┌─────────────────────────────────┐
   │ 1. emit Art 20 export bundle    │  ← see data-export-portability fragment
   │    (still required before       │
   │     anonymization fires)        │
   └──────────────┬──────────────────┘
                  │
                  ▼
   ┌─────────────────────────────────┐
   │ 2. apply per-column policy      │
   │    suppress / generalize /      │
   │    perturb / token-replace      │
   └──────────────┬──────────────────┘
                  │
                  ▼
   ┌─────────────────────────────────┐
   │ 3. verify irreversibility       │
   │    (re-anonymize → different    │
   │     hash; k-anonymity check;    │
   │     no mapping table retained)  │
   └──────────────┬──────────────────┘
                  │
                  ▼
   ┌─────────────────────────────────┐
   │ 4. retained as non-personal-    │
   │    data; preserved for          │
   │    analytics / regulatory       │
   │    retention floor              │
   └─────────────────────────────────┘
```

---

## Trade-offs

| Axis | Suppression | Generalization | Perturbation | k-anonymity (multi-column) |
|---|---|---|---|---|
| Information loss | High (column gone) | Medium (precision reduced) | Low (mean preserved) | Medium (records suppressed if group < k) |
| Analytics utility | Lost for that column | Preserved at coarse grain | Preserved | Preserved for aggregate; lossy for outliers |
| Re-identification resistance | Strongest per column | Weak alone; strong combined | Strong against direct lookup | Strong against quasi-identifier match |
| Implementation cost | Cheapest | Cheap | Medium (statistical decisions) | Highest (table-wide; record-suppression complexity) |
| Suitable for | Direct identifiers (email, name) | Quasi-identifiers (zip, age) | Numeric outcomes (salary, score) | Cohort-level release |

### Decision rule by column type

```
direct_identifiers (email, name, phone, user_id):
  → suppress (NULL / [anonymized]) OR replace with fresh-salt hash (anonymization)

quasi_identifiers (zip, birth_date, gender, occupation):
  → generalize to coarse buckets; verify k-anonymity ≥ 5 on combination

sensitive_attributes (diagnosis, salary, religion):
  → keep IF k-anonymity ≥ 5 AND l-diversity ≥ 2; otherwise suppress

operational_keys (tenant_id, cohort_id):
  → keep (not personal data; cohort-level)

audit_evidence (signed_event_log):
  → keep with reference; never anonymize audit signatures
```

---

## Implementation Patterns

### Pattern 1 — Column-level anonymization (SQL)

```sql
-- The fresh salt is generated PER ROW and not persisted.
-- Use a CTE to ensure each row gets its own random bytes.

WITH fresh AS (
  SELECT user_id, encode(gen_random_bytes(32), 'hex') AS salt
  FROM user_pii
  WHERE tenant_id = $1
    AND anonymize_at <= now()
)
UPDATE user_pii u
SET email = encode(sha256((f.salt || u.email)::bytea), 'hex'),
    name = '[anonymized]',
    phone = NULL,
    birth_date_year_range = generalize_year_range(u.birth_date),
    birth_date = NULL,                          -- original suppressed
    zip = NULL,                                 -- generalize to state (separate column)
    state = u.state,                            -- kept; less identifying
    salary = u.salary + (random() - 0.5) * 0.05 * u.salary,  -- ±2.5% perturbation
    anonymized_at = now()
FROM fresh f
WHERE u.user_id = f.user_id;
-- f.salt is discarded at end of statement; never persisted
```

### Pattern 2 — k-anonymity verification

```python
def verify_k_anonymity(rows, quasi_identifiers, k=5):
    """Group rows by quasi-identifier combination; assert every group has >= k members."""
    from collections import Counter
    keys = Counter(tuple(r[q] for q in quasi_identifiers) for r in rows)
    violations = [(qi_tuple, count) for qi_tuple, count in keys.items() if count < k]
    if violations:
        raise KAnonymityViolation(violations)
    return True

# Usage in CI test
def test_anonymization_yields_k_anonymity():
    rows = run_anonymization_on_test_fixture()
    verify_k_anonymity(rows,
                       quasi_identifiers=["state", "birth_year_range", "tier_at_signup"],
                       k=5)
```

### Pattern 3 — Re-anonymization-determinism test

```python
def test_anonymization_is_irreversible():
    """A second pass on the same row produces a different hash → salt is fresh."""
    original = read_row(test_user_id)
    anonymize(test_user_id)
    pass_1 = read_row(test_user_id)
    # Restore original (test-only)
    write_row(test_user_id, original)
    anonymize(test_user_id)
    pass_2 = read_row(test_user_id)
    assert pass_1["email"] != pass_2["email"], "salt was reused; this is pseudonymization not anonymization"
```

### Pattern 4 — Differential-privacy-friendly aggregate

```python
# For aggregate statistics released externally (e.g., a public dashboard),
# add calibrated noise to query results, not to individual records.

def dp_count(query_predicate, epsilon=1.0):
    true_count = db.query(f"SELECT COUNT(*) FROM events WHERE {query_predicate}").scalar()
    # Laplace noise with sensitivity 1 (count); ε = 1.0 is a typical privacy budget
    import numpy as np
    noise = np.random.laplace(0, 1.0 / epsilon)
    return max(0, true_count + noise)  # never report negative
```

### Pattern 5 — Quasi-identifier suppression record

```python
def anonymize_with_k_anonymity_enforcement(rows, quasi_identifiers, k=5):
    """If a row's quasi-identifier combo is < k, SUPPRESS the row entirely."""
    from collections import Counter
    keys = Counter(tuple(r[q] for q in quasi_identifiers) for r in rows)
    output = []
    for r in rows:
        qi_tuple = tuple(r[q] for q in quasi_identifiers)
        if keys[qi_tuple] >= k:
            output.append(apply_column_policies(r))
        else:
            # Row is an outlier; suppress to maintain k-anonymity
            audit("anonymization_row_suppressed_k_violation", r["row_id"], qi_tuple)
    return output
```

---

## Quality Checks

- **Every "anonymization" column has a documented irreversibility argument.** Either: salt is fresh + non-persisted (per row), OR the operation is suppress (data destroyed), OR the operation is generalize to coarse bucket. No column relies on a persisted mapping.

- **k-anonymity ≥ 5 on declared quasi-identifiers post-anonymization.** A CI test runs `verify_k_anonymity` after each anonymization pass.

- **Re-anonymization yields different hash.** A CI test confirms a second anonymize-pass on the same row produces a different result (proves fresh salt).

- **Audit log of anonymization events is signed + retained.** Per row anonymized, an event is logged with `(tenant_id, user_id, anonymized_at)`; the row data is gone but the event of "this user was anonymized on this date" is regulatory-defensibility evidence.

- **Aggregate-statistics releases use differential privacy when low-cohort cells exist.** Direct count releases for cohorts < 100 leak per-individual presence; DP noise (ε ≤ 1) prevents.

- **No "anonymization reversal" code path exists.** Code-review check: no function takes anonymized data + a mapping and returns identifiable data. If such a path exists, the data is pseudonymized, not anonymized.

- **CRITICAL:** Anonymization MUST be irreversible by construction; reversibility → treat as pseudonymized (still GDPR-subject).

---

## Web Research Queries

(Use `{date}` to scope to current best practice; replace with the current year at query time.)

- `EDPB anonymisation techniques WP216 implementation {date}`
- `k-anonymity l-diversity multi-tenant SaaS {date}`
- `differential privacy aggregated statistics SaaS release {date}`
- `pseudonymization vs anonymization GDPR case law {date}`
- `re-identification attack quasi-identifier {date}`

---

## Cross-references

- Fragment: `gdpr-right-to-deletion.md` — anonymize is one of three deletion-modes; this fragment defines when to choose it
- Fragment: `data-export-portability.md` — export STILL emits before anonymization fires
- Fragment: `legal-hold-and-retention-windows.md` — legal-hold may force retention-without-anonymization
- Anti-pattern: `delete-without-export.md` — applies symmetrically to anonymization-without-export
- Glossary: `anonymization`, `right-to-deletion`
- Gate: `QG-M2` (refined v1.1.0) — anonymize evidence sourced from this fragment
- Skill: `bmad-bam-design-tenant-offboarding` — step-04 anonymize-mode selection for HIPAA/SOX/PCI business+enterprise tiers
