---
step_id: 03-c-decision-matrix
auto_runnable: false
gate: human-approval
inputs: [testing-context.json, testing-options.json]
outputs: [decision-matrix.json]
---

# Step 03 — Coverage tradeoffs decision matrix

## Purpose

Score the applicable-test set against three coverage tradeoff axes: depth-vs-breadth × severity-bands × must-have-ratio. User reviews + may up- or down-severity individual entries with rationale.

## Tradeoff axes

| Axis | Question | Weight |
|---|---|---|
| Depth-vs-breadth | Few exhaustive per-model tests (depth) vs. many shallow cross-cutting tests (breadth)? | Medium |
| Severity bands | Must-have / should-have / nice-to-have ratio appropriate to the project's risk posture? | High |
| Must-have-ratio | Is the must-have set so large that CI runtime kills release cadence — or so small that QG-M2 sign-off is decorative? | High |
| Per-tier noisy-neighbor severity | Does the per-tier severity-from-tier-map produce expected coverage (enterprise must-have; free nice-to-have)? | Medium |

## Reference fitness table

| Coverage profile | depth | breadth | must-have-ratio | risk posture |
|---|---|---|---|---|
| Minimal (CI-cycle priority) | Low | Medium | ~30% | Risk-tolerant; release-cadence-priority; only critical leaks would fail CI |
| Balanced (recommended default) | High | High | ~50% | Pre-launch posture; QG-M2 sign-off requires full must-have suite green |
| Maximal (regulated / high-stakes) | Very High | Very High | ~70% | Healthcare / fintech; full bypass + lifecycle + quota coverage required pre-launch |

## Process

1. **Show applicable_tests_for_this_model coverage report** (counts per category × severity):

   ```
   category               must_have  should_have  nice_to_have  TOTAL
   isolation                 5            1             0          6
   noisy-neighbor            1            2             2          5
   quota                     3            1             0          4
   rls-bypass                5            1             0          6
   cross-tenant-cache        0            2             1          3   (DEFERRED to P5 ai)
   ────────────────────────────────────────────────────────────────
   TOTAL                    14            7             3         24
   must-have-ratio: 58%
   ```

2. **Present coverage profile recommendation** (Balanced) + reference fitness comparison.

3. **User reviews per-test severity overrides** (zero-or-more):
   - Up-severity (should-have → must-have): capture rationale
   - Down-severity (must-have → should-have OR should-have → nice-to-have): capture rationale; warn that QG-M2 sign-off may be at risk if isolation/rls-bypass categories drop below baseline
   - Up-severity rls-bypass entries from should-have → must-have on hybrid models that introduce RLS in any tier (regulatory or paranoia driver)

4. **Compute updated coverage report** after overrides; verify:
   - `coverage_report.isolation.must_have ≥ 1` (else step-07-v will fail per QG-M2 C1)
   - `coverage_report.rls-bypass.must_have ≥ 1` when ANY mechanism in scope == row-level-security (else step-07-v will fail per QG-M2 C5)
   - At least one entry has `category: isolation` AND `universal: true` (else step-07-v will fail per spec §3.4 validation)

5. **User signs off** on the coverage profile + per-test severity overrides.

## Output

`_bmad/bam/cache/bmad-bam-design-multi-tenant-testing/{date}/decision-matrix.json`:

```json
{
  "coverage_profile": "balanced",
  "coverage_report": {
    "isolation":          {"must_have": 5, "should_have": 1, "nice_to_have": 0},
    "noisy-neighbor":     {"must_have": 1, "should_have": 2, "nice_to_have": 2},
    "quota":              {"must_have": 3, "should_have": 1, "nice_to_have": 0},
    "rls-bypass":         {"must_have": 5, "should_have": 1, "nice_to_have": 0},
    "cross-tenant-cache": {"must_have": 0, "should_have": 2, "nice_to_have": 1, "note": "Deferred to P5 ai"}
  },
  "must_have_ratio": 0.58,
  "severity_overrides": [
    {"test_id": "NN-001", "from": "must-have", "to": "should-have", "rationale": "no enterprise tier active in v1"}
  ],
  "user_signed_off": true
}
```

## Gate

Human approval — user signs off on coverage profile + severity overrides.

## Next step

`step-04-c-recommendation.md`
