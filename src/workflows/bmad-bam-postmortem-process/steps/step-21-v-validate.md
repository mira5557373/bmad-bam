# Step 21: Validate Postmortem Process

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Validate the postmortem process against operations criteria, ensuring complete template design, facilitation guide, action tracking, and knowledge base design.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: operations
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-operations-continuous.md`

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

### Template Design
- [ ] Template sections defined with clear structure
- [ ] Severity levels documented with criteria
- [ ] Impact categories specified with examples
- [ ] Required fields identified for incident details
- [ ] Timeline reconstruction template included

### Facilitation Guide
- [ ] Scheduling guidelines defined for postmortem timing
- [ ] Blameless principles documented and emphasized
- [ ] Facilitation techniques specified for productive discussions
- [ ] Roles and responsibilities assigned
- [ ] Psychological safety considerations addressed

### Action Tracking
- [ ] Priority levels defined with escalation criteria
- [ ] Owner assignment process documented
- [ ] Status reporting configured with cadence
- [ ] Escalation procedures specified
- [ ] Follow-through mechanisms established

### Knowledge Base
- [ ] Incident database designed for searchability
- [ ] Pattern identification configured for trend detection
- [ ] Trend analysis dashboards specified
- [ ] Cross-team learning processes defined
- [ ] Incident categorization taxonomy documented

### Cross-Cutting
- [ ] All components consistent with operational model
- [ ] Blameless culture principles embedded
- [ ] Continuous improvement mechanisms integrated

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All 4 components defined, blameless culture embedded, learning mechanisms verified |
| **CONDITIONAL** | Minor gaps (e.g., dashboard details not finalized, escalation timing not configured) - document gaps and proceed |
| **FAIL** | Missing template design, undefined facilitation guide, or no action tracking - return to Create mode |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and operations perspectives on validation results
- **C (Continue)**: Accept validation results and generate report
- **[Specific findings]**: Describe findings to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation findings, failed checks, gap analysis
- Process enhanced insights on operations gaps
- Ask user: "Accept this detailed analysis of findings? (y/n)"
- If yes, document enhanced findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review postmortem process validation findings"
- Process QA and operations perspectives
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
