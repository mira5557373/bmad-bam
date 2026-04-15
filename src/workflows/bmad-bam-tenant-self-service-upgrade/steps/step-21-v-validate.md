# Step 21: Validate Self-Service Upgrade Design

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

Validate the self-service upgrade design against quality criteria, ensuring complete upgrade flow, reliable payment integration, instant provisioning, and operational readiness.

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

### Upgrade Flow
- [ ] All valid upgrade paths documented
- [ ] Flow steps defined with validations
- [ ] Error handling comprehensive
- [ ] Mobile experience addressed

### UI Components
- [ ] Plan comparison table specified
- [ ] Price calculator requirements defined
- [ ] Payment form integration documented
- [ ] Success state and feature tour planned

### Payment Integration
- [ ] **CRITICAL:** Payment provider selected with rationale
- [ ] **CRITICAL:** Proration logic defined for all scenarios
- [ ] Payment flow APIs specified
- [ ] Invoice generation requirements documented

### Subscription Events
- [ ] All subscription events defined
- [ ] Event payloads specified
- [ ] Event subscribers documented
- [ ] Failure events included

### Provisioning Pipeline
- [ ] **CRITICAL:** Provisioning steps defined with timing
- [ ] Feature enablement strategy documented
- [ ] Resource allocation specified
- [ ] **CRITICAL:** Total provisioning time <30s

### Rollback Procedure
- [ ] **CRITICAL:** Rollback triggers defined
- [ ] Rollback actions per failure point
- [ ] Partial success handling documented
- [ ] Refund procedure included

### Operational Readiness
- [ ] Monitoring and verification defined
- [ ] Operational runbook complete
- [ ] Escalation procedures documented
- [ ] Manual intervention procedures defined

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All components defined, critical checks pass, provisioning <30s |
| **CONDITIONAL** | Minor gaps (e.g., mobile UX incomplete, some error messages TBD) with mitigation plan |
| **FAIL** | Missing payment integration, no provisioning pipeline, undefined rollback |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and platform perspectives on validation results
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
- Context: "Review self-service upgrade validation findings"
- Process QA and platform perspectives
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
