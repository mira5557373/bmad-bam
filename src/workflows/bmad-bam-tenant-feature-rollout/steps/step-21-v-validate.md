# Step 21: Validate Feature Rollout Design

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

Validate completeness and quality of the feature rollout design against established criteria.

---

## Prerequisites

- Step 20 completed: Artifact loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: feature-management

---

## Actions

### 1. Validate Feature Flags

- [ ] Flag types defined
- [ ] Schema documented
- [ ] Targeting rules specified
- [ ] Evaluation context established

### 2. Validate Rollout Strategy

- [ ] Rollout stages defined
- [ ] Tenant selection criteria specified
- [ ] Templates documented
- [ ] Gate criteria established

### 3. Validate Monitoring

- [ ] Rollout metrics defined
- [ ] Dashboard elements specified
- [ ] Alerting configured
- [ ] Analysis methods documented

### 4. Validate Rollback

- [ ] Rollback triggers defined
- [ ] Rollback types specified
- [ ] Procedures documented
- [ ] State management addressed

### 5. Calculate Gate Decision

Based on validation results:

| Outcome | Criteria |
|---------|----------|
| **PASS** | Complete rollout infrastructure |
| **CONDITIONAL** | Non-critical gaps, all critical pass |
| **FAIL** | Missing critical rollout capabilities |

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
- Context: "Review feature rollout validation results"
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
