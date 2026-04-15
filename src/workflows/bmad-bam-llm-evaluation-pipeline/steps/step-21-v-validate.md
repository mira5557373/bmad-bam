# Step 21: Validate LLM Evaluation Pipeline

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

Validate the LLM evaluation pipeline against QG-I3 (Agent Safety) quality gate criteria.

---

## Prerequisites

- Step 20 completed: Artifact loaded
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i3-agent-safety.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: evaluation-patterns

---

## Inputs

- Loaded artifact from Step 20
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/qg-i3-agent-safety.md`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Perform the following validation checks:

### Validation Checklist

### Metric Selection
- [ ] Task-specific metrics defined per task type
- [ ] Safety metrics with thresholds specified
- [ ] Performance metrics with SLOs defined
- [ ] User satisfaction metrics planned

### Benchmark Suite
- [ ] Golden task dataset designed
- [ ] Domain-specific tests planned
- [ ] Adversarial tests defined
- [ ] Multi-tenant scenarios covered

### A/B Testing
- [ ] Experiment infrastructure designed
- [ ] Statistical analysis pipeline configured
- [ ] Feature flags integrated
- [ ] Winner determination criteria defined

### Regression Tests
- [ ] Baselines established
- [ ] Regression thresholds defined
- [ ] CI/CD integration specified
- [ ] Coverage requirements set

### Human Evaluation
- [ ] Evaluation workflow designed
- [ ] Annotator guidelines created
- [ ] Inter-rater reliability defined
- [ ] Feedback pipeline designed

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All 5 components defined, CI/CD integration complete |
| **CONDITIONAL** | Minor gaps - document and proceed |
| **FAIL** | Missing metrics, no regression tests, or no CI/CD integration |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings
- **P (Party Mode)**: Bring QA and architect perspectives on gaps
- **C (Continue)**: Accept validation and generate report
- **[Specific concerns]**: Describe validation concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Document validation results
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Gaps documented with remediation
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation checklist results
- Gate decision (PASS/CONDITIONAL/FAIL)
- Gap analysis with remediation steps

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
