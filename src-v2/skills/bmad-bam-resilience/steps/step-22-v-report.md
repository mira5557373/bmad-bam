# Step 22: Generate Validation Report

## Purpose

Generate a comprehensive validation report documenting QG-DR and QG-CE1 results, including remediation guidance for any failures.

## Prerequisites

- Validation checks completed (Step 21 complete)
- Gate scores calculated

## Execution Protocols

```
📋 Generate structured report
🎯 Provide actionable remediation guidance
✅ Document gate outcomes
```

## Actions

### 1. Determine Gate Outcomes

Apply BMM-standard four outcomes:

| Gate | Outcome | Criteria |
|------|---------|----------|
| QG-DR | PASS / CONDITIONAL / FAIL / WAIVED | All critical checks pass |
| QG-CE1 | PASS / CONDITIONAL / FAIL / WAIVED | All critical checks pass |

Outcome definitions:
- **PASS**: All criteria met
- **CONDITIONAL**: Non-critical gaps, all critical pass
- **FAIL**: Any critical check fails
- **WAIVED**: Non-critical items waived by stakeholder

### 2. Generate Executive Summary

Create high-level summary:

```markdown
## Executive Summary

**Validation Date:** {date}
**Artifacts Validated:** {list}

### Gate Results

| Gate | Outcome | Score |
|------|---------|-------|
| QG-DR | {outcome} | {X/Y} |
| QG-CE1 | {outcome} | {X/Y} |

### Key Findings

- {Finding 1}
- {Finding 2}
```

### 3. Document Detailed Results

Create detailed findings section:

```markdown
## Detailed Results

### QG-DR Results

| Category | Checks | Passed | Notes |
|----------|--------|--------|-------|
| RTO/RPO | X | Y | {notes} |
| Failover | X | Y | {notes} |
| Testing | X | Y | {notes} |

### QG-CE1 Results

| Category | Checks | Passed | Notes |
|----------|--------|--------|-------|
| Blast Radius | X | Y | {notes} |
| Tenant Safety | X | Y | {notes} |
| Experiments | X | Y | {notes} |
```

### 4. Provide Remediation Guidance

For any failures, document remediation:

```markdown
## Remediation Required

### {Failed Check 1}

**Issue:** {description}
**Impact:** {severity}
**Remediation Steps:**
1. {step 1}
2. {step 2}

**Owner:** {role}
**Target Date:** {date}
```

### 5. Document Conditional Items

For conditional passes:

```markdown
## Conditional Items

| Item | Gap | Mitigation | Deadline |
|------|-----|------------|----------|
| {item} | {gap} | {mitigation} | {date} |
```

### 6. Write Validation Report

Output the complete report:

**Location:** `{output_folder}/resilience/resilience-validation-report.md`

## Verification

- [ ] Gate outcomes determined
- [ ] Executive summary complete
- [ ] Detailed results documented
- [ ] Remediation guidance provided (if failures)
- [ ] Conditional items documented (if applicable)
- [ ] Report written to output folder

## Outputs

- `{output_folder}/resilience/resilience-validation-report.md`

## Next Steps

Based on outcomes:

| Outcome | Next Action |
|---------|-------------|
| PASS (all gates) | Resilience design approved, proceed to implementation |
| CONDITIONAL | Proceed with mitigation plan and deadlines |
| FAIL | Enter recovery protocol, fix issues, re-validate |
| WAIVED | Document stakeholder approval, proceed with caveats |
