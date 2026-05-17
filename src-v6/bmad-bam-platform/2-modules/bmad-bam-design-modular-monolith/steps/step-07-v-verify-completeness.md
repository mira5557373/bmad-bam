---
step_id: 07-v-verify-completeness
auto_runnable: true
gate: machine-checkable
inputs: [module-decomposition.md, module-decomposition.json, ADR]
outputs: [QG-M1-partial-evidence.md]
---

# Step 07 — Verify completeness + emit QG-M1 partial evidence

## Purpose

Validate-mode step: verify all design-time outputs of this skill exist, satisfy schema, and pass QG-M1 auto-criteria (schema_version present, decision is in the allowed enum, ≥2 bounded contexts, no circular dependencies among contexts). Emit partial QG-M1 evidence for the gate. (Full QG-M1 satisfaction also requires runtime checks from later P3.2 workflows.)

## Actions

1. Verify `module-decomposition.md` exists:

```bash
MD_PATH="{project-root}/docs/architecture/module-decomposition.md"
[ -f "$MD_PATH" ] && echo "[PASS] module-decomposition.md present" || { echo "[FAIL] module-decomposition.md missing"; exit 1; }
```

2. Verify `module-decomposition.json` exists at BOTH paths:

```bash
JSON_PRIMARY="{project-root}/docs/architecture/module-decomposition.json"
JSON_EVIDENCE="{project-root}/_bmad/bam/evidence/QG-F1/module-decomposition.json"
for p in "$JSON_PRIMARY" "$JSON_EVIDENCE"; do
    [ -f "$p" ] && echo "[PASS] $p present" || { echo "[FAIL] $p missing"; exit 1; }
done
```

3. Validate JSON schema + content (Python; checks schema_version, decision-enum, bounded_contexts length ≥ 2, per-context required fields):

```python
import json, sys
data = json.load(open("{project-root}/docs/architecture/module-decomposition.json"))
errors = []
if "schema_version" not in data:
    errors.append("missing schema_version")
allowed = {"ddd-pure", "ports-pure", "hybrid", "vertical-slice"}
if data.get("decision") not in allowed:
    errors.append(f"decision '{data.get('decision')}' not in {allowed}")
bc = data.get("bounded_contexts", [])
if len(bc) < 2:
    errors.append(f"bounded_contexts has {len(bc)} entries; need >= 2")
for i, c in enumerate(bc):
    for field in ("id", "purpose", "adapter_ports", "depends_on", "tenant_aware"):
        if field not in c:
            errors.append(f"bounded_contexts[{i}] missing '{field}'")
    if "adapter_ports" in c and not isinstance(c["adapter_ports"], list):
        errors.append(f"bounded_contexts[{i}].adapter_ports must be list")
    if "depends_on" in c and not isinstance(c["depends_on"], list):
        errors.append(f"bounded_contexts[{i}].depends_on must be list")
    if "tenant_aware" in c and not isinstance(c["tenant_aware"], bool):
        errors.append(f"bounded_contexts[{i}].tenant_aware must be bool")
if errors:
    print("[FAIL] schema validation:")
    for e in errors: print(f"  - {e}")
    sys.exit(1)
print("[PASS] schema validation")
```

4. Topo-sort check on `bounded_contexts[*].depends_on` to detect circular dependencies. Fail if any cycle:

```python
import json, sys
data = json.load(open("{project-root}/docs/architecture/module-decomposition.json"))
graph = {c["id"]: list(c.get("depends_on", [])) for c in data["bounded_contexts"]}
WHITE, GRAY, BLACK = 0, 1, 2
color = {n: WHITE for n in graph}
def dfs(n, stack):
    if color[n] == GRAY:
        print(f"[FAIL] cycle detected: {' -> '.join(stack + [n])}"); sys.exit(1)
    if color[n] == BLACK: return
    color[n] = GRAY
    for m in graph.get(n, []):
        if m not in graph:
            print(f"[FAIL] dependency '{m}' (from '{n}') is not a declared context"); sys.exit(1)
        dfs(m, stack + [n])
    color[n] = BLACK
for n in list(graph):
    dfs(n, [])
print("[PASS] no circular dependencies among bounded_contexts")
```

5. Verify the project-level ADR exists:

```bash
ADR_DIR="{project-root}/_bmad/_memory/atlas/architecture-decisions"
ADR_MATCH=$(ls -1 "$ADR_DIR" 2>/dev/null | grep -E '^[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{3}-modular-monolith-decision\.md$' | tail -1)
[ -n "$ADR_MATCH" ] && echo "[PASS] ADR present: $ADR_MATCH" || { echo "[FAIL] modular-monolith ADR missing"; exit 1; }
```

6. Emit partial QG-M1 evidence noting which auto-criteria are now satisfied + which require later P3.2 work:

Write `{project-root}/_bmad/bam/evidence/QG-M1/YYYY-MM-DD-NNN/criteria-met-partial.md`:

```markdown
---
gate_id: QG-M1
verified_at: <ISO>
verified_by: atlas
auto_checkable_pct: 40
human_review_pct: 20
result: pass-partial
---

## Criteria summary

| Criterion | Status | Evidence |
|---|---|---|
| Decomposition decision recorded | pass | docs/architecture/module-decomposition.md ## Decision |
| Schema-valid module-decomposition.json | pass | step-07 schema check |
| ≥2 bounded contexts declared | pass | step-07 schema check |
| No circular dependencies | pass | step-07 topo-sort |
| Adapter port catalog (hybrid / ports-pure) | partial | covered if `decision != ddd-pure` |
| Runtime module-boundary enforcement | deferred | requires P3.2 design-deployment-topology + design-multi-tenant-testing |

## Evidence

- docs/architecture/module-decomposition.md
- docs/architecture/module-decomposition.json
- _bmad/bam/evidence/QG-F1/module-decomposition.json
- _bmad/_memory/atlas/architecture-decisions/<id>-modular-monolith-decision.md
- _bmad/bam/cache/modular-monolith-design/<date>/* (intermediate cache)
```

## Output

Stdout: a sequence of `[PASS]` / `[FAIL]` lines, one per check. Non-zero exit code if any check fails.

Evidence file: `_bmad/bam/evidence/QG-M1/YYYY-MM-DD-NNN/criteria-met-partial.md` per std-validation.

## Gate

Machine-checkable: this step IS the gate verification for the skill's design-time portion. Exit-0 = pass; any FAIL halts.

## Workflow complete

`bmad-bam-design-modular-monolith` Create mode done.
