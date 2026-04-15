# Step 21: Validate Contract Renewal Design

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

Validate the contract renewal design against quality criteria, ensuring complete renewal automation, compliant notifications, and operational readiness.

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

### Contract Types
- [ ] All contract types documented
- [ ] Terms and auto-renewal defaults specified
- [ ] Notice periods defined per type
- [ ] Price lock policies documented

### Renewal Scenarios
- [ ] **CRITICAL:** All renewal scenarios mapped
- [ ] Actions defined per scenario
- [ ] Notification requirements per scenario
- [ ] Edge cases addressed

### Pricing Rules
- [ ] Price change effective dates defined
- [ ] Grandfathering policies documented
- [ ] Communication requirements specified
- [ ] Compliance with notice periods

### Notifications
- [ ] **CRITICAL:** Pre-renewal sequence complies with legal requirements
- [ ] Post-renewal communications defined
- [ ] All channels specified (email, in-app, SMS)
- [ ] Content requirements documented

### Renegotiation Workflow
- [ ] Trigger conditions defined
- [ ] SLAs for each step
- [ ] Escalation path included
- [ ] Contract finalization process

### Operational Readiness
- [ ] **CRITICAL:** Monitoring metrics defined
- [ ] Troubleshooting guide covers common issues
- [ ] Manual intervention procedures documented
- [ ] Escalation procedures defined

### Compliance
- [ ] **CRITICAL:** Auto-renewal disclosure compliant
- [ ] Price change notice periods met
- [ ] Cancellation rights honored
- [ ] Terms accessibility addressed

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All components defined, critical checks pass, compliance verified |
| **CONDITIONAL** | Minor gaps (e.g., some notification content TBD, edge cases incomplete) with mitigation plan |
| **FAIL** | Missing notification sequence, non-compliant notice periods, undefined renewal scenarios |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and legal perspectives on validation results
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
- Context: "Review contract renewal validation findings"
- Process QA and legal perspectives
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
