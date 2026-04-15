# Step 21: Validate Tenant Reactivation Design

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

Validate the tenant reactivation design against quality criteria, ensuring complete reactivation flows, reliable data restoration, and operational readiness.

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

### Suspension States
- [ ] All suspension states documented
- [ ] Data retention mapped per state
- [ ] Reactivation triggers identified
- [ ] Grace period rules defined

### Reactivation Flows
- [ ] **CRITICAL:** Self-service flow documented
- [ ] Assisted restoration flow defined
- [ ] Appeal process documented
- [ ] All flows have defined steps and validations

### Win-Back Campaigns
- [ ] Campaign triggers defined
- [ ] Offer structure documented
- [ ] Conversion paths specified
- [ ] Campaign timing appropriate

### Data Restoration
- [ ] **CRITICAL:** Restoration pipeline defined
- [ ] Progressive restoration phases documented
- [ ] **CRITICAL:** Integrity verification comprehensive
- [ ] Cold storage restoration specified

### Operational Readiness
- [ ] **CRITICAL:** Monitoring metrics defined
- [ ] Troubleshooting guide covers common issues
- [ ] Manual intervention procedures documented
- [ ] Escalation procedures defined

### Events
- [ ] All reactivation events defined
- [ ] Event payloads specified
- [ ] Event subscribers documented
- [ ] Failure events included

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All components defined, critical checks pass, restoration tested |
| **CONDITIONAL** | Minor gaps (e.g., win-back campaign content TBD, some error messages incomplete) with mitigation plan |
| **FAIL** | Missing self-service flow, no data restoration, undefined integrity verification |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and CS perspectives on validation results
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
- Context: "Review reactivation validation findings"
- Process QA and CS perspectives
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
