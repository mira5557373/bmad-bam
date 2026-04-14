# Step 21: Validate CI/CD Pipeline Architecture

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

Validate the CI/CD pipeline architecture against production readiness criteria, ensuring complete pipeline design, testing stages, deployment strategies, and tenant-aware release management.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: devops
- **Load checklist:** `{project-root}/_bmad/bam/checklists/production-readiness.md`

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

### Pipeline Architecture
- [ ] Pipeline stages defined with triggers
- [ ] Artifact management configured
- [ ] Environment promotion flow documented
- [ ] Duration targets specified
- [ ] Infrastructure as Code integration planned

### Testing Stages
- [ ] Unit and integration testing designed
- [ ] Tenant isolation testing specified
- [ ] Performance testing planned
- [ ] Security scanning configured
- [ ] Coverage targets defined

### Deployment Strategies
- [ ] Blue-green deployment designed
- [ ] Canary release configured
- [ ] Rolling update specified
- [ ] Rollback procedures documented
- [ ] Recovery time targets defined

### Tenant-Aware Releases
- [ ] Release rings designed
- [ ] Feature flag integration configured
- [ ] Tenant-scoped rollbacks documented
- [ ] Release communication planned
- [ ] Success metrics defined

### Cross-Cutting
- [ ] All components consistent with platform architecture
- [ ] Tenant isolation maintained in deployments
- [ ] Security requirements addressed

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All 4 components defined, production readiness met, rollback procedures verified |
| **CONDITIONAL** | Minor gaps (e.g., communication plan incomplete, metrics not finalized) - document gaps and proceed |
| **FAIL** | Missing pipeline stages, undefined deployment strategy, or no tenant releases - return to Create mode |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and DevOps perspectives on validation results
- **C (Continue)**: Accept validation results and generate report
- **[Specific findings]**: Describe findings to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation findings, failed checks, gap analysis
- Process enhanced insights on production readiness gaps
- Ask user: "Accept this detailed analysis of findings? (y/n)"
- If yes, document enhanced findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review CI/CD pipeline validation findings"
- Process QA and DevOps perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation results with specific findings per component
- Determine preliminary gate decision
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per component

---

## Outputs

- Validation report
- Pass/Fail determination
- Specific findings per component

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
