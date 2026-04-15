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

Generate a comprehensive QG-M2 validation report for the White-Labeling Design.

---

## Prerequisites

- Step 21 completed (Validate)
- Validation findings compiled

---

## Inputs

- Validation findings from Step 21
- QG-M2 checklist results
- Severity classifications
- Recommendations

---

## Actions

Generate validation report with the following sections:

### Report Structure

```markdown
# White-Labeling Design - QG-M2 Validation Report

## Executive Summary
- Overall Status: PASS | CONDITIONAL | FAIL
- QG-M2 (Tenant Isolation): PASS | FAIL
- Critical Issues: {count}
- High Issues: {count}
- Medium Issues: {count}
- Low Issues: {count}

## QG-M2 Tenant Isolation Results

### Branding Assets
| Check | Status | Notes |
|-------|--------|-------|
| Tenant-isolated storage | PASS/FAIL | **CRITICAL** |
| CDN access control | PASS/FAIL | **CRITICAL** |
| Asset versioning | PASS/FAIL | |
| Upload validation | PASS/FAIL | |

### Theme Customization
| Check | Status | Notes |
|-------|--------|-------|
| CSS variable scoping | PASS/FAIL | **CRITICAL** |
| No theme leakage | PASS/FAIL | **CRITICAL** |
| Dark/light isolation | PASS/FAIL | |
| Preview sandbox | PASS/FAIL | |

### Domain Mapping
| Check | Status | Notes |
|-------|--------|-------|
| Verification security | PASS/FAIL | **CRITICAL** |
| SSL isolation | PASS/FAIL | **CRITICAL** |
| DNS configuration | PASS/FAIL | |
| Error handling | PASS/FAIL | |

### Portal Theming
| Check | Status | Notes |
|-------|--------|-------|
| Admin portal isolation | PASS/FAIL | **CRITICAL** |
| End-user scoping | PASS/FAIL | **CRITICAL** |
| Email template safety | PASS/FAIL | |
| Widget isolation | PASS/FAIL | |

## Issues Found

### Critical
{List of critical issues - must be fixed for QG-M2 pass}

### High
{List of high issues}

### Medium
{List of medium issues}

### Low
{List of low issues}

## QG-M2 Gate Decision

**Status:** PASS | CONDITIONAL | FAIL

**Rationale:** {Explanation of gate decision}

## Recommendations
{Prioritized recommendations for any issues}

## Next Steps
{Required actions before proceeding}
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
- Pass report context: QG-M2 status, findings summary
- Process enhanced insights from deep questioning
- Ask user: "Accept these report additions? (y/n)"
- If yes, integrate into final report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review QG-M2 validation report for White-Labeling Design: {summary}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report
- Update frontmatter `stepsCompleted: [20, 21, 22]`
- Output to `{output_folder}/planning-artifacts/tenant/white-labeling-design-validation.md`

---

## Verification

- [ ] Report generated with all sections
- [ ] QG-M2 gate decision documented
- [ ] Issues properly categorized
- [ ] Recommendations prioritized
- [ ] Next steps defined

---

## Outputs

- QG-M2 validation report document
- Gate decision summary
- Prioritized recommendations

---

## Validate Mode Complete

The White-Labeling Design QG-M2 validation report has been generated.
