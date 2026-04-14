# Step 22: Generate Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Generate a comprehensive validation report for the OpenAPI Spec Management design.

---

## Prerequisites

- Step 21 completed (Validate)
- Validation findings compiled

---

## Inputs

- Validation findings from Step 21
- Severity classifications
- Recommendations

---

## Actions

Generate validation report with the following sections:

### Report Structure

```markdown
# OpenAPI Spec Management Validation Report

## Executive Summary
- Overall Status: PASS | CONDITIONAL | FAIL
- Critical Issues: {count}
- High Issues: {count}
- Medium Issues: {count}
- Low Issues: {count}

## Validation Results

### Structure Standards
| Check | Status | Notes |
|-------|--------|-------|
| OpenAPI version | PASS/FAIL | |
| File organization | PASS/FAIL | |
| Naming conventions | PASS/FAIL | |
| Tenant patterns | PASS/FAIL | |
| Security schemes | PASS/FAIL | |

### Version Control
| Check | Status | Notes |
|-------|--------|-------|
| Versioning strategy | PASS/FAIL | |
| Breaking changes | PASS/FAIL | |
| Branch strategy | PASS/FAIL | |
| Review process | PASS/FAIL | |

### Validation Rules
| Check | Status | Notes |
|-------|--------|-------|
| Structural validation | PASS/FAIL | |
| Linting rules | PASS/FAIL | |
| Security validation | PASS/FAIL | |
| Tenant isolation | PASS/FAIL | |

### Publishing Pipeline
| Check | Status | Notes |
|-------|--------|-------|
| Build pipeline | PASS/FAIL | |
| Documentation | PASS/FAIL | |
| SDK generation | PASS/FAIL | |
| Multi-environment | PASS/FAIL | |

## Issues Found

### Critical
{List of critical issues}

### High
{List of high issues}

### Medium
{List of medium issues}

### Low
{List of low issues}

## Recommendations
{Prioritized recommendations}

## Next Steps
{Suggested actions}
```

---

## COLLABORATION MENUS (A/P/C):

After generating the report above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for report review
- **C (Continue)**: Accept report and complete validation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass report context: findings summary, recommendations
- Process enhanced insights from deep questioning
- Ask user: "Accept these report additions? (y/n)"
- If yes, integrate into final report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review validation report for OpenAPI Spec Management: {summary}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report
- Update frontmatter `stepsCompleted: [20, 21, 22]`
- Output to `{output_folder}/planning-artifacts/api/openapi-spec-management-validation.md`

---

## Verification

- [ ] Report generated with all sections
- [ ] Issues properly categorized
- [ ] Recommendations prioritized
- [ ] Next steps defined

---

## Outputs

- Validation report document
- Issue summary
- Prioritized recommendations

---

## Validate Mode Complete

The OpenAPI Spec Management validation report has been generated.
