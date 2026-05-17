---
step_id: 07-v-verify-completeness
auto_runnable: true
gate: machine-checkable
inputs: [test-catalogue.md, test-catalogue.json, ADR]
outputs: [QG-M2-test-catalogue-evidence.md]
gate_id: QG-M2
---

# Step 07-v — Verify completeness + emit evidence narrative

## Purpose

Schema-validate JSON output per spec §3.4 + enforce mandatory invariants (≥1 universal isolation test; rls-bypass coverage when applicable; coverage_report consistency; hybrid_resolution completeness when applicable) + emit `QG-M2-test-catalogue-evidence.md` human evidence narrative.

## Actions (Python 3.11+ stdlib)

```python
import json
import re

j = json.load(open('{project-root}/_bmad/bam/evidence/QG-M2/test-catalogue.json'))

# --- Schema version (E1: coerce non-string) ---
sv = j.get('schema_version')
if not isinstance(sv, str):
    print(f"WARN: schema_version was non-string ({type(sv).__name__}); coercing")
    sv = str(sv)
assert sv == "1.0", f"schema_version must be 1.0, got {sv!r}"

# --- decided_at RFC 3339 ---
assert re.match(r'^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$', j['decided_at']), "decided_at must match RFC 3339 UTC"

# --- tests[] non-empty (ERROR) ---
tests = j.get('tests', [])
assert isinstance(tests, list) and len(tests) > 0, "tests: [] is ERROR per spec §3.4"

# --- Closed enums ---
CATEGORIES = {"isolation", "noisy-neighbor", "quota", "rls-bypass", "cross-tenant-cache"}
SEVERITIES = {"must-have", "should-have", "nice-to-have"}
MODELS = {"row-level-security", "schema-per-tenant", "cell-based"}
TRACEABLE_PATTERN = re.compile(r'^QG-[A-Z]+\d+\.[CH]\d+$')

# --- Per-test validation ---
seen_ids = set()
universal_isolation_count = 0
warns = []

for t in tests:
    tid = t['id']
    # id unique within tests[]
    assert tid not in seen_ids, f"duplicate test id {tid!r}"
    seen_ids.add(tid)
    # name length ≥ 5
    name = t.get('name', '')
    assert isinstance(name, str) and len(name) >= 5, f"test {tid}: name length < 5 ({name!r})"
    # category closed enum
    cat = t.get('category')
    assert cat in CATEGORIES, f"test {tid}: category {cat!r} not in {CATEGORIES}"
    # severity closed enum
    sev = t.get('severity')
    assert sev in SEVERITIES, f"test {tid}: severity {sev!r} not in {SEVERITIES}"
    # universal: boolean (default false; per spec §3.4 every entry MUST have key explicitly per step-05)
    universal = t.get('universal', False)
    assert isinstance(universal, bool), f"test {tid}: universal must be bool"
    # applies_to subset of MODELS
    applies_to = t.get('applies_to', [])
    assert isinstance(applies_to, list), f"test {tid}: applies_to must be list"
    for m in applies_to:
        assert m in MODELS, f"test {tid}: applies_to entry {m!r} not in {MODELS} (no nested 'hybrid')"
    # evidence_signature length ≥ 20
    esig = t.get('evidence_signature', '')
    assert isinstance(esig, str) and len(esig) >= 20, \
        f"test {tid}: evidence_signature length < 20 ({len(esig)} chars: {esig!r})"
    # traceable_to pattern (forward-refs → WARN, not ERROR)
    traceable = t.get('traceable_to', [])
    assert isinstance(traceable, list), f"test {tid}: traceable_to must be list"
    for ref in traceable:
        if not TRACEABLE_PATTERN.match(ref):
            warns.append(f"test {tid}: traceable_to {ref!r} does not match ^QG-[A-Z]+\\d+\\.[CH]\\d+$ — forward-ref WARN")
    # Count universal isolation tests for C1/A5 check
    if cat == "isolation" and universal:
        universal_isolation_count += 1

# --- ≥1 universal isolation test (per spec §3.4 + QG-M2 C1) ---
assert universal_isolation_count >= 1, \
    "MUST have ≥1 entry with category: isolation AND universal: true (per spec §3.4 / QG-M2 C1)"

# --- coverage_report consistency: counts match tests[] filtered by category × severity ---
cov = j.get('coverage_report', {})
assert set(cov.keys()) == CATEGORIES, \
    f"coverage_report must have exactly these keys: {CATEGORIES}; got {set(cov.keys())}"

actual_counts = {c: {"must_have": 0, "should_have": 0, "nice_to_have": 0} for c in CATEGORIES}
SEV_KEY = {"must-have": "must_have", "should-have": "should_have", "nice-to-have": "nice_to_have"}
for t in tests:
    actual_counts[t['category']][SEV_KEY[t['severity']]] += 1

for cat in CATEGORIES:
    for sk in ("must_have", "should_have", "nice_to_have"):
        declared = cov[cat].get(sk, 0)
        actual = actual_counts[cat][sk]
        assert declared == actual, \
            f"coverage_report[{cat!r}][{sk!r}]: declared {declared} != actual {actual} (per tests[] filter)"

# --- cross-tenant-cache deferral note required when must_have == 0 ---
xtc = cov.get('cross-tenant-cache', {})
if xtc.get('must_have', 0) == 0:
    note = xtc.get('note', '')
    assert 'P5' in note or 'model-cache-isolation' in note, \
        f"cross-tenant-cache.must_have == 0 requires deferral note citing P5 ai; got {note!r}"

# --- hybrid_resolution validation ---
# Read project tenancy_model from upstream (best-effort; tool-aware fallback)
import os
tenancy_json_path = None
for p in [
    '{project-root}/docs/architecture/tenancy-decision.json',
    '{project-root}/_bmad/bam/evidence/QG-F1/tenancy-decision.json',
]:
    if os.path.exists(p):
        tenancy_json_path = p
        break

project_tenancy_model = None
if tenancy_json_path:
    project_tenancy_model = json.load(open(tenancy_json_path)).get('tenancy_model')

hr = j.get('hybrid_resolution')
if project_tenancy_model == 'hybrid':
    assert hr is not None and isinstance(hr, dict) and len(hr) > 0, \
        "tenancy_model == 'hybrid' requires non-empty hybrid_resolution"
    # Each value must be a base mechanism (no nested hybrid)
    for tid, mech in hr.items():
        assert mech in MODELS, \
            f"hybrid_resolution[{tid!r}] = {mech!r} not in {MODELS}"
    # If tier-model.json is reachable, hybrid_resolution keys must be subset of tier_ids
    tier_json_path = None
    for p in [
        '{project-root}/docs/architecture/tier-model.json',
        '{project-root}/_bmad/bam/evidence/QG-F1/tier-model.json',
    ]:
        if os.path.exists(p):
            tier_json_path = p
            break
    if tier_json_path:
        tm = json.load(open(tier_json_path))
        tier_ids = {t['id'] for t in tm.get('tiers', [])}
        missing = tier_ids - set(hr.keys())
        assert not missing, \
            f"hybrid_resolution missing tier(s): {missing} (must cover EVERY tier_id from tier-model)"
elif hr is not None:
    # Non-hybrid project must NOT emit hybrid_resolution
    print(f"WARN: hybrid_resolution present but project tenancy_model is {project_tenancy_model!r}; ignored")

# --- rls-bypass coverage when applicable to tenancy_model ---
rls_bypass_must_have = cov.get('rls-bypass', {}).get('must_have', 0)
applicable_to_rls = (
    project_tenancy_model == 'row-level-security' or
    (project_tenancy_model == 'hybrid' and hr and any(m == 'row-level-security' for m in hr.values()))
)
if applicable_to_rls:
    assert rls_bypass_must_have >= 1, \
        f"tenancy includes row-level-security but rls-bypass.must_have = {rls_bypass_must_have} (must be ≥1 per QG-M2 C5)"

# --- isolation must_have ≥ 1 (universal-counted entries already verified above; this re-checks coverage_report) ---
iso_must_have = cov.get('isolation', {}).get('must_have', 0)
assert iso_must_have >= 1, f"isolation.must_have = {iso_must_have} (must be ≥1 per QG-M2 C1)"

# --- Emit WARNs (not exit 70) ---
for w in warns:
    print(f"WARN: {w}")

print(f"VALID: test-catalogue.json schema 1.0 (model: {project_tenancy_model}, tests: {len(tests)}, "
      f"universal-isolation: {universal_isolation_count}, rls-bypass-must-have: {rls_bypass_must_have})")
```

Emit `_bmad/bam/evidence/QG-M2/QG-M2-test-catalogue-evidence.md` (human narrative) with:
- Decision summary (tenancy_model + coverage_profile + total test count + must-have count)
- Coverage report table (category × severity)
- Per-category test detail tables (id, name, applies_to, universal, severity, evidence_signature, traceable_to)
- Hybrid resolution (if applicable) — per-tier mechanism map
- Schema validation summary (universal-isolation count; rls-bypass coverage when applicable; coverage_report consistency confirmed)
- Cross-ref to QG-M2 C1 + C5 + H1 + waiver path
- Forward-references list (warns; e.g., `QG-D1.H1` if cited before QG-D1 ships)

## Gate

Machine-checkable.

## On failure

Exit 70 with detailed diagnostic; user re-runs step-04 to fix.
