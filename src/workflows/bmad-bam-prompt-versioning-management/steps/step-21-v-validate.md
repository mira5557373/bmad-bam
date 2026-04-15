# Step 21: Validate Prompt Versioning Architecture

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

Validate the prompt versioning architecture against QG-M3 quality gate criteria, ensuring complete version schema, A/B testing framework, rollback procedures, and deployment pipeline.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: prompt-management
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md`

---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules

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

### Version Schema
- [ ] Semantic versioning strategy defined
- [ ] Prompt metadata schema complete
- [ ] Tenant override mechanism documented
- [ ] Version history tracking designed
- [ ] Multi-language variant strategy defined

### A/B Testing Framework
- [ ] Experiment structure defined
- [ ] Traffic splitting strategies documented
- [ ] Metrics collection configured
- [ ] Statistical significance framework defined
- [ ] Winner declaration criteria specified
- [ ] Gradual rollout strategy designed

### Rollback Procedures
- [ ] Automatic rollback triggers defined
- [ ] Manual rollback workflow documented
- [ ] Version pinning for critical tenants specified
- [ ] Rollback verification tests defined
- [ ] Communication procedures documented

### Deployment Pipeline
- [ ] CI/CD pipeline stages defined
- [ ] Environment promotion flow documented
- [ ] Approval gates configured
- [ ] Canary deployment strategy designed
- [ ] Feature flag integration specified
- [ ] Post-deployment monitoring defined

### Cross-Cutting
- [ ] All components consistent with agent runtime architecture
- [ ] Tenant isolation maintained across all components
- [ ] Kill switch mechanism available for all deployments

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All 4 components defined, quality gates met, deployment safety verified |
| **CONDITIONAL** | Minor gaps (e.g., monitoring thresholds not calibrated) - document gaps and proceed |
| **FAIL** | Missing version schema, undefined rollback triggers, or no deployment pipeline - return to Create mode |

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
- Process enhanced insights on quality gaps
- Ask user: "Accept this detailed analysis of findings? (y/n)"
- If yes, document enhanced findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review QG-M3 validation findings for prompt versioning architecture"
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

- Validation results
- Pass/Fail determination
- Specific findings per component

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
