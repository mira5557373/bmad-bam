# Step 21: Validate Against Quality Criteria

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Validate the performance review against QG-PR1 quality gate criteria.

---

## Prerequisites

- Artifact loaded (Step 20)

---

## Actions

### 1. QG-PR1 Validation Checks

Execute validation against QG-PR1 criteria:

#### Baseline Checks
- [ ] **CRITICAL:** Baselines documented with timestamps
- [ ] Current metrics collected
- [ ] Deviations identified with analysis
- [ ] Trends documented

#### Capacity Checks
- [ ] **CRITICAL:** Resource utilization measured
- [ ] Peak load assessed
- [ ] Headroom calculated
- [ ] Scaling readiness evaluated

#### SLA Checks
- [ ] **CRITICAL:** All tiers verified
- [ ] Availability SLA checked
- [ ] Latency SLA checked
- [ ] Error rate SLA checked

#### Tenant Checks
- [ ] Per-tenant consumption analyzed
- [ ] Noisy neighbors identified
- [ ] Health scores calculated

#### Cost Checks
- [ ] Cost per request calculated
- [ ] AI costs broken down
- [ ] Optimization opportunities identified

### 2. Calculate Validation Score

| Category | Critical | Passed | Failed | Score |
|----------|----------|--------|--------|-------|
| Baseline | 1 | {n} | {n} | {%} |
| Capacity | 1 | {n} | {n} | {%} |
| SLA | 1 | {n} | {n} | {%} |
| Tenant | 0 | {n} | {n} | {%} |
| Cost | 0 | {n} | {n} | {%} |
| **Total** | 3 | {n} | {n} | {%} |

### 3. Determine Gate Outcome

**Gate Outcome:** {PASS/CONDITIONAL/FAIL}

---

## COLLABORATION MENUS (A/P/C):

After completing validation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation failures
- **P (Party Mode)**: Get QA perspectives on validation results
- **C (Continue)**: Accept validation and generate report
- **[Specific issues]**: Describe validation concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save validation results
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All validation checks executed
- [ ] Scores calculated
- [ ] Gate outcome determined

---

## Outputs

- Validation results
- Gate outcome

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
