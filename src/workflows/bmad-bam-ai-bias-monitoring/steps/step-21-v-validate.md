# Step 21: Validate

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Validate the AI bias monitoring document against QG-M3 (Agent Runtime) and QG-I3 (Agent Safety) quality gate criteria.

## Prerequisites

- Artifact loaded (Step 20)
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i3-agent-safety.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md`

---

## Inputs

- Loaded artifact from Step 20
- Quality gate checklists
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### QG-I3 Agent Safety Validation (Fairness)

Validate against fairness criteria from `qg-i3-agent-safety.md`:

**Bias Taxonomy Checks:**
- [ ] Protected attributes defined and documented
- [ ] Output bias types specified
- [ ] Interaction bias categories established
- [ ] Tenant-specific considerations addressed

**Detection Method Checks:**
- [ ] Statistical parity metrics defined with thresholds
- [ ] Equal opportunity metrics specified
- [ ] Calibration metrics documented
- [ ] Adversarial bias testing planned

**Monitoring Checks:**
- [ ] Real-time dashboard designed
- [ ] Alert thresholds configured
- [ ] Per-tenant reporting available
- [ ] Trend analysis capability

**Remediation Checks:**
- [ ] Escalation procedures documented
- [ ] Remediation actions defined
- [ ] Documentation requirements established
- [ ] Compliance reporting configured

### QG-M3 Agent Runtime Validation

Validate integration with agent runtime:
- [ ] Bias monitoring integrated with agent outputs
- [ ] Tenant context preserved in metrics
- [ ] Performance impact acceptable

### Findings Summary

| Category | Status | Critical Issues | Non-Critical Issues |
|----------|--------|-----------------|---------------------|
| Bias Taxonomy | PASS/FAIL | N | N |
| Detection Methods | PASS/FAIL | N | N |
| Monitoring | PASS/FAIL | N | N |
| Remediation | PASS/FAIL | N | N |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings and remediation options
- **P (Party Mode)**: Bring AI Ethics Lead, Compliance Auditor, and Data Scientist perspectives
- **C (Continue)**: Accept validation results and proceed to Step 22: Generate Report
- **Re-validate section**: Describe specific section to re-validate

Select an option:
```

#### If 'C' (Continue):
- Save validation results to session
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All QG-I3 fairness checks validated
- [ ] QG-M3 integration checks validated
- [ ] Findings categorized by severity
- [ ] Patterns align with pattern registry

## Outputs

- Validation results per category
- List of findings with severity

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
