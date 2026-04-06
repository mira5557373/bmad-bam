# Step 5: Run Quality Gates

Execute final quality gate checks and generate validation report.

## Quality Gate Summary

### QG-M1: Module Identity Gate

| Criterion | Weight | Status |
|-----------|--------|--------|
| Bounded context defined | Required | |
| Business capability documented | Required | |
| Domain model complete | Required | |
| All entities have tenant_id | Required | |
| Entities extend BaseEntity | Required | |

**QG-M1 Result:** PASS / FAIL

### QG-M2: Module Interface Gate

| Criterion | Weight | Status |
|-----------|--------|--------|
| Public facade defined | Required | |
| All methods tenant-scoped | Required | |
| DTOs for input/output | Required | |
| Error contract followed | Required | |
| Facade template compliance | Required | |

**QG-M2 Result:** PASS / FAIL

### QG-M3: Module Integration Gate

| Criterion | Weight | Status |
|-----------|--------|--------|
| Dependencies declared | Required | |
| No circular dependencies | Required | |
| Facade-only cross-module access | Required | |
| Events include tenant_id | Required | |
| AI behaviors within policy | Conditional | |

**QG-M3 Result:** PASS / FAIL

## AI Validation (if applicable)

If module has AI behaviors:

- [ ] Agents defined with clear responsibilities
- [ ] Tool permissions within policy bounds
- [ ] Memory scope correctly declared (session/user/tenant)
- [ ] Kill switch mechanism documented
- [ ] Agent topology justified (single vs multi-agent)

**AI Validation Result:** PASS / FAIL / N/A

## Overall Gate Decision

| Result | Criteria | Action |
|--------|----------|--------|
| **PASS** | All required gates pass | Module ready for sprint planning |
| **CONDITIONAL** | Minor gaps, no blocking issues | Document gaps, proceed with caution |
| **FAIL** | Any blocking issue | Block sprint, fix architecture first |

## Validation Report

Generate validation report:

```markdown
# Module Validation Report: {module-name}

**Date:** {timestamp}
**Validator:** {user or automated}

## Summary

- **Overall Result:** PASS / CONDITIONAL / FAIL
- **QG-M1 (Identity):** PASS / FAIL
- **QG-M2 (Interface):** PASS / FAIL
- **QG-M3 (Integration):** PASS / FAIL
- **AI Validation:** PASS / FAIL / N/A

## Findings

### Blocking Issues
{list or "None"}

### Warnings
{list or "None"}

### Recommendations
{list or "None"}

## Next Steps

{Based on result}
```

## Output

Write report to: `{output_folder}/planning-artifacts/modules/{module-name}/validation-report.md`

Update sprint-status.yaml:
- If PASS: module status to 'validated'
- If FAIL: module status to 'validation-failed'

Present validation summary with clear next steps.
