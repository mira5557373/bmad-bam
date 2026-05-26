---
id: data-export-portability
title: Data Export & Portability (GDPR Art 20)
category: lifecycle
kind: fragment
module: bmad-bam-platform
persona: atlas
qg_ref: QG-M2
last_reviewed: 2026-05-17
version: 1.0.0
status: active
tags: [gdpr, portability, art-20, data-export, subject-rights, multi-tenant]
references:
  - "Regulation (EU) 2016/679 Article 20 — Right to Data Portability"
  - "Article 29 Working Party Guidelines on the Right to Data Portability (16/EN WP 242 rev.01)"
  - "EDPB Guidelines on Article 20 — common export formats"
---

# Data Export & Portability (GDPR Art 20)

Article 20 of the GDPR gives data subjects the right to receive their personal data "in a structured, commonly used and machine-readable format" and to transmit that data to another controller without hindrance. In multi-tenant SaaS, Art 20 is the obligation that MUST be honored before Art 17 erasure proceeds — once data is deleted, the portability right is lost, and Art 17 deletion without Art 20 export is itself a regulatory violation, not a compliance posture.

This fragment defines the export mechanism: format choice, scope, completeness contract, encryption + integrity, delivery channels, and sequencing relative to deletion. Art 20 is operationally simple — emit a file — but the sequencing constraint and the format/scope decisions have direct compliance implications that are easy to get wrong.

The fragment is consumed by `bmad-bam-design-tenant-offboarding` (step-04 ensures the erasure orchestrator emits the export before any deletion handoff fires) and is the primary citation for the `delete-without-export.md` anti-pattern.

---

## When to Use

Apply these patterns when:

- **The platform is subject to GDPR or UK GDPR.** Art 20 applies whenever the subject is in scope of the regulation. CCPA has an analogous "right to know what data we have" + "right to delete"; the architecture below covers both.

- **Data is processed on the lawful basis of consent or contract (Art 6(1)(a) or (b)).** Art 20 applies only to these bases (not to legitimate-interest processing). In SaaS, the tenant-end-user contract is usually the lawful basis, so Art 20 attaches.

- **Data is processed by automated means.** Art 20 explicitly excludes paper-only or analog processing. SaaS is automated by definition.

- **Tenant offboarding is being designed.** Whole-tenant export at offboarding satisfies Art 20 for every subject in the tenant simultaneously; per-subject export at subject-erasure satisfies it for that one subject. Both paths matter; both go through the same machinery.

- **A new processor / sub-processor is added or removed.** Art 20 "transmit to another controller without hindrance" implies that the export format must be portable enough that a competing SaaS could import it.

## When NOT to Use

Skip these patterns when:

- **The data is not "provided by the data subject" within Art 20's narrow scope.** Art 20 covers data the subject actively provided (form input, uploaded content) and observed-from-subject-activity data (clickstream, location). It does NOT cover data the controller derived (segmentation scores, ML predictions, risk ratings). Document the boundary in the export-scope manifest; do NOT include derived data unless the lawful basis is consent and the subject expects it.

- **The lawful basis is legitimate-interest (Art 6(1)(f)) only.** Art 20 doesn't attach. The subject still has Art 15 access right; that's a different export shape (read-only, no portability obligation).

- **The data is fully anonymized at collection.** No subject is identifiable → no Art 20 obligation.

- **The export would expose another subject's data (third-party-data conflict).** Art 20(4) carves out conflicts with rights of others. The export MUST omit fields that contain other subjects' identifiers; this is a content-scope decision, not an opt-out of Art 20 entirely.

---

## Architecture

### Export-scope manifest

Each tenant offboarding (or per-subject erasure) emits an export-scope manifest that defines what's in the bundle:

```yaml
export_scope:
  tenant_id: t_42
  subject_id: u_19   # null for whole-tenant export
  formats: [json, csv]   # at least one machine-readable + one human-readable common
  categories:
    - subject_provided:
        tables: [user_profile, user_preferences, uploaded_files]
    - observed_activity:
        tables: [login_events, feature_use_events]
        retention_window_days: 90
  excluded:
    - third_party_references: "comments where author_id != $subject"
    - derived: "user_segmentation_scores; user_risk_rating"
  delivery:
    channel: signed_url   # signed_url | email | api_pull
    expiry_hours: 168     # 7 days
  signature:
    algo: ed25519
    public_key_ref: "https://example.com/.well-known/portability-pubkey.pem"
```

### Format choices

Art 20 says "structured, commonly used, machine-readable". The Article 29 WP guidance suggests JSON, XML, CSV. Best practice:

| Format | Use case |
|---|---|
| **JSON** | Primary machine-readable export; one file or zip per category |
| **CSV** | Tabular data (event logs, billing history); 1 file per table |
| **PDF** | Human-readable summary index (NOT machine-readable; supplementary) |
| **Parquet/Avro** | When the importing controller is also a data-platform; document in manifest |

Avoid:
- Custom proprietary binary formats
- HTML (not "machine-readable" per WP guidance)
- Encrypted-only formats without a clear decrypt path documented in the manifest

### Completeness contract

The export bundle MUST include:

1. **The data itself** — every field listed in the scope manifest's `categories.tables[]`.
2. **A scope manifest** (the YAML above) as a top-level file.
3. **A schema file** per table — `schema.json` (JSON Schema or similar) documenting field names, types, format conventions.
4. **A README** in human-readable form explaining how to interpret the bundle.
5. **A signature manifest** — SHA-256 hashes of every file, signed with the platform's portability key, for tamper-evidence.

The bundle MUST exclude:

- Other subjects' identifiers (comments on the subject's post by other users; the *content* may stay but the *author identifiers* are pseudonymized or redacted)
- Derived data without consent (segmentation, risk scores, ML embeddings) — unless explicitly opted-in
- Data covered by a legal-hold (it stays; export the rest with a note that some data is held)
- Data outside the tenant's lawful retention scope (don't export data the tenant shouldn't have had in the first place)

### Sequencing relative to deletion

Step ordering for an erasure-request:

```
T+0    erasure request received
T+0    export-scope manifest emitted (synchronous; ≤ 60s)
T+0..2 export bundle assembled (async; may take minutes for large tenants)
T+5m   export bundle delivered (signed URL emailed to subject's stored email)
T+24h  delivery acknowledged (subject downloads OR delivery-failure-retry exhausts)
T+7d   (max) export delivery window closes (signed URL expires)
T+7d   deletion-handoff chain begins (the orchestrator's step 2+)
T+30d  (max) all deletion handoffs complete; final platform tear-down fires
```

The critical invariant: **deletion handoff chain MUST NOT start before export delivery is confirmed**. Without this sequencing, the subject loses the portability right; Art 17 deletion proceeds, the data is gone, the Art 20 obligation was violated.

Edge case — subject does NOT acknowledge / does NOT download:
- Make 3 delivery attempts over 7 days (email, then alternate channel if available)
- Document the attempts in the audit log
- Then proceed with deletion; the obligation is to *offer* the export, not to *force* the subject to take it
- The audit log is the regulatory-defensibility evidence

### Encryption + integrity

The export bundle MUST be:

- **Encrypted at rest** (server-side; the bundle in S3 / blob store)
- **Encrypted in transit** (signed URL is HTTPS-only)
- **Integrity-signed** — the signature manifest's signature MUST verify against the platform's published portability public key
- **Access-limited** — the signed URL is single-subject + expiring; downloads are logged

### ASCII diagram — export-then-delete flow

```
   erasure-request received
            │
            ▼
   ┌─────────────────────────────┐
   │ 1. emit scope manifest      │
   │    (sync; ≤ 60s)            │
   └──────────────┬──────────────┘
                  │
                  ▼
   ┌─────────────────────────────┐
   │ 2. assemble export bundle   │
   │    (async; minutes)         │
   └──────────────┬──────────────┘
                  │
                  ▼
   ┌─────────────────────────────┐
   │ 3. deliver via signed URL   │
   │    (3 attempts × 7d window) │
   └──────────────┬──────────────┘
                  │
                  ▼   ── subject downloads (or window closes) ──
                  │
                  ▼
   ┌─────────────────────────────┐
   │ 4. deletion-handoff chain   │  ← begins ONLY after step 3 closes
   │    (see gdpr-right-to-      │
   │     deletion fragment)      │
   └─────────────────────────────┘
```

---

## Trade-offs

| Axis | Eager export (always) | Lazy export (on request only) |
|---|---|---|
| Latency to deletion | High — must assemble export first | Low after request — bundle ready |
| Storage cost | Lower (no pre-built bundles) | Higher (pre-built export per tenant) |
| Delivery confidence | Higher (fresh data) | Risk of stale data (export drifts from current state) |
| Recommended | DEFAULT — assemble on erasure-request | Only for whole-tenant scheduled offboarding with stable data |

| Axis | Signed-URL delivery | Email-attached delivery | API-pull delivery |
|---|---|---|---|
| Bundle size handled | Large (S3 storage; URL pointer only) | Small (email attachment limits) | Large + scriptable |
| Subject-side complexity | Click link, download | Receive email, save attachment | Scripted (developer-tier) |
| Audit clarity | Strong (download logged) | Weak (email read state unreliable) | Strong (API call logged) |
| Recommended | DEFAULT for size | Fallback when email is primary channel | For technical subjects + B2B-only platforms |

---

## Implementation Patterns

### Pattern 1 — Export-orchestrator activity

```python
@activity
def export_subject_data(tenant_id, subject_id):
    scope = build_scope_manifest(tenant_id, subject_id)
    bundle = []
    for cat in scope["categories"]:
        for tbl in cat["tables"]:
            rows = db.query(f"SELECT * FROM {tbl} WHERE tenant_id = $1 AND subject_id = $2",
                            tenant_id, subject_id)
            # Strip third-party identifiers
            rows = redact_third_party_refs(rows, scope["excluded"])
            bundle.append(write_jsonl(rows, f"{cat['name']}_{tbl}.jsonl"))

    bundle.append(write_yaml(scope, "scope_manifest.yaml"))
    bundle.append(write_json(emit_schemas(scope), "schema.json"))
    bundle.append(write_md(render_readme(scope), "README.md"))

    manifest_sig = sign_bundle(bundle, signing_key())
    bundle.append(write_json(manifest_sig, "signature.json"))

    zip_path = zip_bundle(bundle)
    signed_url = upload_and_sign(zip_path, expiry_hours=168)

    return {"ref": zip_path, "signed_url": signed_url, "expires_at": now() + timedelta(hours=168)}
```

### Pattern 2 — Delivery + retry

```python
def deliver_export(subject_id, signed_url, channel="email"):
    for attempt in range(1, 4):
        try:
            if channel == "email":
                send_email(subject_id_to_email(subject_id),
                           subject="Your data export from <platform>",
                           body=f"Download: {signed_url} (expires in 7 days).")
            elif channel == "signed_url":
                publish_to_dsr_portal(subject_id, signed_url)
            audit("export_delivered", subject_id, channel, attempt)
            return True
        except DeliveryError as e:
            audit("export_delivery_failed", subject_id, channel, attempt, str(e))
            wait_exponential(attempt)
    # 3 attempts exhausted; log + proceed (Art 17 obligation is to offer, not force)
    audit("export_delivery_exhausted", subject_id, channel)
    return False
```

### Pattern 3 — Schema-file emission

```python
def emit_schemas(scope):
    schemas = {}
    for cat in scope["categories"]:
        for tbl in cat["tables"]:
            schemas[tbl] = inspect_table_schema(tbl)
            # JSON Schema-ish output:
            # { "type": "object", "properties": { "col1": {"type": "string"}, ... } }
    return schemas
```

### Pattern 4 — Sign + verify

```python
def sign_bundle(file_paths, signing_key):
    hashes = {p: sha256_file(p) for p in file_paths}
    canonical = json.dumps(hashes, sort_keys=True)
    return {
        "hashes": hashes,
        "signature_alg": "ed25519",
        "signature": ed25519_sign(signing_key, canonical),
        "public_key_ref": "https://example.com/.well-known/portability-pubkey.pem",
        "signed_at": now_rfc3339(),
    }

# Subject (or destination controller) verifies:
def verify_bundle(bundle_zip):
    sig = read_json_from_zip(bundle_zip, "signature.json")
    canonical = json.dumps(sig["hashes"], sort_keys=True)
    pubkey = fetch_public_key(sig["public_key_ref"])
    assert ed25519_verify(pubkey, canonical, sig["signature"])
    # Plus: verify each file's actual hash matches the recorded hash
    for fname, expected_hash in sig["hashes"].items():
        assert expected_hash == sha256_file_in_zip(bundle_zip, fname)
```

### Pattern 5 — Whole-tenant export (offboarding path)

When the tenant offboards, the export aggregates every subject in the tenant:

```python
def export_whole_tenant(tenant_id):
    subjects = db.query("SELECT user_id FROM users WHERE tenant_id = $1", tenant_id)
    # Option A — one bundle per subject (preferred; legal portability is subject-level)
    for s in subjects:
        export_subject_data(tenant_id, s.user_id)
    # Option B — one aggregate bundle (only acceptable if the tenant is the legal data controller
    # AND the receiving controller accepts aggregate bundles; document in DPA)
```

---

## Quality Checks

- **Every Art 17 erasure-request emits Art 20 export before deletion fires.** The orchestrator's step 1 is the export; step 2+ is deletion; no deletion handoff starts before step 1 confirms.

- **Export bundle is machine-readable.** A test asserts that the JSON files parse, the CSV files parse, the schema.json is valid JSON Schema, the signature verifies.

- **Format coverage matches scope.** Every table named in `scope_manifest.categories[].tables[]` has a corresponding file in the bundle; no orphan tables; no missing tables.

- **Third-party data is redacted.** A test asserts that no field in the bundle contains another subject's identifier when the scope is per-subject.

- **Delivery is audit-logged.** Every delivery attempt + every download + every signed-URL access is logged; the audit log is queryable by `(tenant_id, subject_id, event_type)`.

- **Signature verifies end-to-end.** A test takes a fresh bundle, ships it through a "destination controller" mock, and verifies the signature against the published public key.

- **CRITICAL:** Export MUST emit BEFORE deletion/anonymization; without export, Art 17 deletion violates Art 20.

---

## Web Research Queries

(Use `{date}` to scope to current best practice; replace with the current year at query time.)

- `GDPR Article 20 data portability export format best practices {date}`
- `data portability bundle integrity signing {date}`
- `Art 20 vs Art 15 export scope differences {date}`
- `SaaS export-before-delete pattern implementation {date}`
- `data portability third-party data redaction {date}`

---

## Cross-references

- Fragment: `gdpr-right-to-deletion.md` — Art 17 erasure flow; sequencing constraint enforced here
- Fragment: `tenant-anonymization-techniques.md` — when the deletion-mode is anonymize, export still emits first
- Fragment: `legal-hold-and-retention-windows.md` — legal-hold may block both export AND deletion; document in scope manifest
- Anti-pattern: `delete-without-export.md` — the failure mode this fragment prevents
- Glossary: `data-portability`, `right-to-deletion`
- Gate: `QG-M2` (refined v1.1.0) — `offboarding-policy.json` `data_export_required: true` invariant sources from this fragment
- Skill: `bmad-bam-design-tenant-offboarding` — primary consumer; step-04 mandatory invariant + step-07 schema check enforced
