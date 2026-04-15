# Step 21: Validate SLA Monitoring Design

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

Validate completeness and quality of the SLA monitoring design against established criteria.

---

## Prerequisites

- Step 20 completed: Artifact loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: sla-monitoring

---

## Actions

### 1. Validate SLA Structure

- [ ] SLA metrics defined per tier
- [ ] Calculation windows specified
- [ ] Exclusions documented

### 2. Validate Monitoring

- [ ] Measurement infrastructure defined
- [ ] Dashboard panels specified
- [ ] Error budget calculation documented

### 3. Validate Breach Handling

- [ ] Breach detection thresholds defined
- [ ] Notification matrix documented
- [ ] Compensation framework established
- [ ] RCA requirements specified

### 4. Validate Reporting

- [ ] Report types defined
- [ ] Self-service access documented
- [ ] Audit trail requirements met

### 5. Calculate Gate Decision

Based on validation results:

| Outcome | Criteria |
|---------|----------|
| **PASS** | All SLA monitoring components complete |
| **CONDITIONAL** | Non-critical gaps, all critical pass |
| **FAIL** | Missing critical components |

---

## COLLABORATION MENUS (A/P/C):

After completing validation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings
- **P (Party Mode)**: Bring perspectives on gate decision
- **C (Continue)**: Proceed to generate report
- **[Specific concerns]**: Describe concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation results, gate decision
- Process enhanced insights
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review SLA monitoring validation results"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Document gate decision
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All validation checks completed
- [ ] Gate decision calculated
- [ ] Issues documented

---

## Outputs

- Validation checklist results
- Gate decision (PASS/CONDITIONAL/FAIL)
- List of issues found

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
