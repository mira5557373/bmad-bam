---
step_id: 07-v-verify-completeness
auto_runnable: true
gate: machine-checkable
inputs: [onboarding-flow.md, onboarding-flow.json, ADR]
outputs: [QG-M2-onboarding-evidence.md]
gate_id: QG-M2
---

# Step 07-v — Verify completeness + emit evidence narrative

## Purpose

Schema-validate JSON output + emit `QG-M2-onboarding-evidence.md` human evidence narrative.

## Actions (Python 3.11+ stdlib)

```python
import json
import re

j = json.load(open('{project-root}/_bmad/bam/evidence/QG-M2/onboarding-flow.json'))

# Schema version (E1: coerce non-string)
sv = j.get('schema_version')
if not isinstance(sv, str):
    print(f"WARN: schema_version was non-string ({type(sv).__name__}); coercing")
    sv = str(sv)
assert sv == "1.0"

# decided_at RFC 3339
assert re.match(r'^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$', j['decided_at']), "decided_at must match RFC 3339"

# flow_count consistency
assert j['flow_count'] == len(j['flows'])

# Per-flow validation
hook_ids = set()
for f in j['flows']:
    # tier_id format
    assert re.match(r'^[a-z][a-z0-9_-]*$', f['tier_id']), f"tier_id {f['tier_id']} invalid"
    # flow_type closed enum
    assert f['flow_type'] in {'self_serve', 'assisted_signup', 'sales_led'}, f"flow_type {f['flow_type']} invalid"
    # live_traffic + blocking constraint
    if f.get('live_traffic', True):
        assert f['isolation_verification_step']['blocking'] is True, \
            f"tier {f['tier_id']}: live_traffic==true requires blocking==true"
    # provisioning_mode closed
    assert f['provisioning_mode'] in {'auto', 'scripted', 'manual'}
    # isolation_verification_step lengths
    assert len(f['isolation_verification_step']['step_name']) >= 5
    assert len(f['isolation_verification_step']['test_artifact']) >= 10
    # provisioning_hooks global uniqueness
    for h in f['provisioning_hooks']:
        assert h['id'] not in hook_ids, f"duplicate hook_id {h['id']}"
        hook_ids.add(h['id'])
        assert re.match(r'^[a-z][a-z0-9_]*$', h['module']), f"module {h['module']} invalid"

print(f"VALID: onboarding-flow.json schema 1.0 (flows: {j['flow_count']})")
```

Emit `_bmad/bam/evidence/QG-M2/QG-M2-onboarding-evidence.md` (human narrative) with:
- Decision summary
- Per-tier flow table
- Schema validation summary
- Cross-ref to QG-M2 H2 + C6

## Gate

Machine-checkable.

## On failure

Exit 70 with detailed diagnostic; user re-runs step-04 to fix.
