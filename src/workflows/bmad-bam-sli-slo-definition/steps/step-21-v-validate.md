# Step 21: Validate SLI/SLO Definition

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

Validate the SLI/SLO definition artifact against quality criteria and production readiness standards (QG-P1).

---

## Prerequisites

- Previous step completed (step-20-v-load-artifact.md)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: sre`
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv -> filter: QG-P1`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-p1-production-readiness.md`

---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

## Validation Checklist

### SLI Identification
- [ ] SLI categories defined for all critical services
- [ ] SLI specifications include measurement methodology
- [ ] User journey to SLI mapping documented
- [ ] All service types covered (API, Auth, AI, DB, Queue)

### SLO Target Setting
- [ ] SLO targets set for all SLIs
- [ ] Measurement windows defined (rolling/calendar)
- [ ] Burn rate thresholds established
- [ ] Alerting rules created per SLO

### Error Budget Design
- [ ] Error budgets calculated from SLO targets
- [ ] Consumption policies defined per budget level
- [ ] Exhaustion procedures documented
- [ ] Reporting cadence established
- [ ] Dashboard specification complete

### Tenant-Tier SLAs
- [ ] SLA commitments defined per tier (Enterprise/Pro/Free)
- [ ] SLA to SLO mapping documented with buffer
- [ ] Breach remediation procedures defined
- [ ] Tier-specific monitoring configured
- [ ] Service credit structure documented

### Cross-Cutting Validation
- [ ] SLO targets are more stringent than SLA commitments
- [ ] Error budget calculations mathematically correct
- [ ] Burn rate thresholds align with budget consumption
- [ ] All tiers have consistent metric definitions

### QG-P1 Production Readiness Verification
**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv -> filter: QG-P1`

- [ ] **slis_defined** (REQUIRED): SLIs defined for all critical services
- [ ] **slos_configured** (REQUIRED): SLO targets set with measurement windows
- [ ] **error_budget_active** (REQUIRED): Error budget policies documented
- [ ] **tier_slas_aligned** (REQUIRED): Tenant-tier SLAs aligned with SLOs

**QG-P1 Required Patterns:**
| Pattern | Required | Status | Evidence |
|---------|----------|--------|----------|
| slis_defined | **YES** | [ ] Pass / [ ] Fail | SLI catalog complete |
| slos_configured | **YES** | [ ] Pass / [ ] Fail | SLO target matrix |
| error_budget_active | **YES** | [ ] Pass / [ ] Fail | Budget policies |
| tier_slas_aligned | **YES** | [ ] Pass / [ ] Fail | SLA-SLO mapping |

**QG-P1 Production Readiness (SLI/SLO):** [ ] SATISFIED / [ ] NOT SATISFIED

---

## Gate Decision

- **PASS**: All SLIs defined, SLO targets set, error budgets configured, tier SLAs aligned
- **CONDITIONAL**: Minor gaps (e.g., dashboard incomplete) - document gaps, proceed
- **FAIL**: Missing SLIs for critical services, no error budget policy, SLA-SLO misalignment - return to Create mode

Present validation results with specific findings for each section.

---

## COLLABORATION MENUS (A/P/C):

After completing validation checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for validation review
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass validation context: findings, gate decision, gaps identified
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review SLI/SLO validation: {summary of findings and gate decision}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All validation checklist items evaluated
- [ ] Gate decision determined (PASS/CONDITIONAL/FAIL)
- [ ] Findings documented with specific details

---

## Outputs

- Validation report with findings
- Gate decision with rationale
- Remediation recommendations (if CONDITIONAL or FAIL)

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
