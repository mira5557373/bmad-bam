# Step 21: Validate Trial Conversion Design

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

Validate the trial conversion design against quality criteria, ensuring complete trial configuration, effective engagement tracking, optimized conversion workflows, and operational readiness.

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

### Trial Configuration
- [ ] Trial duration defined with rationale
- [ ] Trial type specified (freemium/time-limited/feature-limited)
- [ ] Feature access levels documented
- [ ] Usage limits defined per trial tier

### Conversion Triggers
- [ ] **CRITICAL:** All conversion triggers identified with weights
- [ ] Trigger-to-action mapping complete
- [ ] Negative signals defined (churn risk)
- [ ] Trigger thresholds specified

### Engagement Tracking
- [ ] **CRITICAL:** Engagement events defined with properties
- [ ] Event categories align with conversion goals
- [ ] Data pipeline specified with SLAs
- [ ] Tenant isolation for tracking documented

### Scoring Model
- [ ] Scoring factors defined with point values
- [ ] Score decay rules documented (if applicable)
- [ ] **CRITICAL:** Score thresholds mapped to actions
- [ ] Score calculation frequency specified

### Nurture Sequences
- [ ] Sequences defined for each user segment
- [ ] Email/notification content outlined
- [ ] Timing documented per sequence step
- [ ] A/B test plan for sequence optimization

### Self-Service Flow
- [ ] **CRITICAL:** All conversion steps documented
- [ ] Error handling for each step
- [ ] Payment integration specified
- [ ] Confirmation and provisioning defined

### Sales Handoff
- [ ] Handoff triggers defined with qualification criteria
- [ ] SLAs for handoff response
- [ ] Sales enablement materials referenced
- [ ] Feedback loop to marketing documented

### Operational Readiness
- [ ] **CRITICAL:** Monitoring checklist comprehensive
- [ ] Manual intervention procedures documented
- [ ] Troubleshooting guide covers common issues
- [ ] Escalation procedures defined

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All components defined, critical checks pass, workflows tested |
| **CONDITIONAL** | Minor gaps (e.g., A/B test plan incomplete, some nurture content TBD) with mitigation plan |
| **FAIL** | Missing conversion triggers, no scoring model, undefined self-service flow |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and growth perspectives on validation results
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
- Context: "Review trial conversion validation findings"
- Process QA and growth perspectives
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
