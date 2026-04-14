# Step 21: Validate M&A Consolidation Design

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

Validate the M&A consolidation design against quality criteria, ensuring complete merge scenarios, reliable data migration, and operational readiness.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle

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

### Merge Scenarios
- [ ] All scenario types documented
- [ ] Data requirements mapped per scenario
- [ ] Compliance considerations addressed
- [ ] Edge cases covered

### Data Migration
- [ ] **CRITICAL:** Migration pipeline defined with phases
- [ ] **CRITICAL:** User merging strategy documented
- [ ] Transformation rules specified
- [ ] Incremental sync approach (if needed)

### Account Unification
- [ ] Billing consolidation strategy defined
- [ ] Permission harmonization rules documented
- [ ] Hierarchy restructure planned
- [ ] Communication plan complete

### Data Integrity
- [ ] **CRITICAL:** Conflict resolution rules defined
- [ ] Integrity verification specified
- [ ] Referential consistency maintained
- [ ] Audit trail preservation

### Operational Readiness
- [ ] **CRITICAL:** Pre-flight checklist comprehensive
- [ ] **CRITICAL:** Rollback strategy for all phases
- [ ] Monitoring defined
- [ ] Operations checklist complete

### Compliance
- [ ] Data ownership consent addressed
- [ ] Regulatory requirements met
- [ ] Contractual obligations honored
- [ ] Audit requirements satisfied

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All components defined, critical checks pass, rollback tested |
| **CONDITIONAL** | Minor gaps (e.g., some edge cases incomplete, monitoring thresholds TBD) with mitigation plan |
| **FAIL** | Missing migration pipeline, no rollback strategy, undefined conflict resolution |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and data perspectives on validation results
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
- Context: "Review M&A consolidation validation findings"
- Process QA and data perspectives
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
