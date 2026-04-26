# Step 21: Execute Validation Checks (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 **Focus:** Execute all validation checks and calculate gate decision
- 💾 **Track:** `stepsCompleted: [20, 21]` when complete
- 📖 **Context:** Step 20 confirmed scope - execute checks against loaded artifact
- 🚫 **Do NOT:** Skip critical security checks or modify artifact during validation
- 🔍 **Use web search:** Not applicable for Validate mode - verify against defined criteria only

---

## Purpose

Execute validation checks against the white-labeling design to verify completeness, consistency, and quality gate compliance.

---

## Prerequisites

- Step 20 completed: Artifact and checklist loaded
- Validation scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `customization`

---

## Actions

### 1. Validate Branding Completeness

| Check | Status | Notes |
|-------|--------|-------|
| Logo handling defined for all tiers | {PASS/FAIL} | {notes} |
| Color scheme configuration documented | {PASS/FAIL} | {notes} |
| CSS injection strategy specified | {PASS/FAIL} | {notes} |
| Email template branding designed | {PASS/FAIL} | {notes} |
| Document watermark approach defined | {PASS/FAIL} | {notes} |
| Asset storage architecture specified | {PASS/FAIL} | {notes} |
| CDN delivery strategy documented | {PASS/FAIL} | {notes} |

### 2. Validate Domain Architecture

| Check | Status | Notes |
|-------|--------|-------|
| Custom domain mapping defined | {PASS/FAIL} | {notes} |
| SSL certificate strategy documented | {PASS/FAIL} | {notes} |
| Certificate automation approach specified | {PASS/FAIL} | {notes} |
| DNS configuration guidance provided | {PASS/FAIL} | {notes} |
| Domain verification flow documented | {PASS/FAIL} | {notes} |
| Subdomain allocation strategy defined | {PASS/FAIL} | {notes} |
| Reserved subdomains identified | {PASS/FAIL} | {notes} |

### 3. Validate Feature Customization

| Check | Status | Notes |
|-------|--------|-------|
| Feature toggle architecture defined | {PASS/FAIL} | {notes} |
| Multi-level override system specified | {PASS/FAIL} | {notes} |
| UI component visibility documented | {PASS/FAIL} | {notes} |
| Menu customization levels defined | {PASS/FAIL} | {notes} |
| Role naming customization specified | {PASS/FAIL} | {notes} |
| Configuration schemas documented | {PASS/FAIL} | {notes} |

### 4. Validate Tier Alignment

| Check | Status | Notes |
|-------|--------|-------|
| All tiers have defined capabilities | {PASS/FAIL} | {notes} |
| Progressive feature enablement documented | {PASS/FAIL} | {notes} |
| Tier upgrade paths specified | {PASS/FAIL} | {notes} |
| Feature availability matrix complete | {PASS/FAIL} | {notes} |
| No tier capability gaps | {PASS/FAIL} | {notes} |

### 5. Validate Implementation Feasibility

| Check | Status | Notes |
|-------|--------|-------|
| Architecture decisions documented (ADRs) | {PASS/FAIL} | {notes} |
| Implementation roadmap defined | {PASS/FAIL} | {notes} |
| Dependencies identified | {PASS/FAIL} | {notes} |
| Effort estimates provided | {PASS/FAIL} | {notes} |
| No technical blockers identified | {PASS/FAIL} | {notes} |

### 6. Validate Security Considerations

| Check | Status | Notes |
|-------|--------|-------|
| **CRITICAL:** Tenant isolation maintained | {PASS/FAIL} | {notes} |
| **CRITICAL:** CSS injection sanitized | {PASS/FAIL} | {notes} |
| **CRITICAL:** Custom domain ownership verified | {PASS/FAIL} | {notes} |
| Asset upload validation specified | {PASS/FAIL} | {notes} |
| Feature flag security documented | {PASS/FAIL} | {notes} |
| Role naming does not expose internals | {PASS/FAIL} | {notes} |

### 7. Calculate Gate Decision

Compile validation results:

| Category | Passed | Failed | Critical Failures |
|----------|--------|--------|-------------------|
| Branding | {count} | {count} | {count} |
| Domain | {count} | {count} | {count} |
| Features | {count} | {count} | {count} |
| Tiers | {count} | {count} | {count} |
| Implementation | {count} | {count} | {count} |
| Security | {count} | {count} | {count} |
| **TOTAL** | {total} | {total} | {total} |

Gate decision logic:

| Condition | Decision |
|-----------|----------|
| Any critical failure | **FAIL** |
| All critical pass, non-critical failures exist | **CONDITIONAL** |
| All checks pass | **PASS** |

---

## COLLABORATION MENUS (A/P/C):

After completing validation checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation failures
- **P (Party Mode)**: Bring perspectives on remediation approaches
- **C (Continue)**: Proceed to generate validation report
- **[Specific checks]**: Describe which checks need discussion

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation results, failures, critical items
- Process enhanced insights on remediation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review white-labeling validation results and remediation options"
- Present synthesized recommendations from multiple perspectives
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation results
- Update frontmatter: `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-report.md`

---

## Verification

- [ ] All branding checks executed
- [ ] All domain checks executed
- [ ] All feature checks executed
- [ ] All tier alignment checks executed
- [ ] All implementation checks executed
- [ ] All security checks executed
- [ ] Gate decision calculated
- [ ] Critical failures flagged

---

## Outputs

- Validation check results by category
- Critical failure identification
- Gate decision recommendation
- Remediation suggestions for failures

---

## Next Step

Proceed to `step-22-v-report.md` to generate the validation report.
