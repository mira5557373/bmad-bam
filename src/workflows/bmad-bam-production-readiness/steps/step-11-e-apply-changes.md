# Step 11: Apply Targeted Modifications

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

This step applies the identified changes to the existing production readiness artifacts. Changes are applied incrementally while preserving document structure and ensuring the go-live decision is re-evaluated based on updated findings.

---

## Prerequisites

- Step 10 completed with identified changes
- **Load checklists:** `{project-root}/_bmad/bam/data/checklists/qg-prod-checklist.md`

---

## Inputs

- Loaded artifacts from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-prod-checklist.md`

---

## Actions

Based on the user's requested changes:

### 1. Update Gate Verification Status

If gate statuses have changed:
- Update gate verification tables
- Document new gate pass/fail dates
- Note any blocking dependencies resolved or introduced

### 2. Update Infrastructure Assessment

If infrastructure has changed:
- Update capacity and scaling assessments
- Revise HA verification status
- Document new infrastructure components

### 3. Update Observability Validation

If observability has changed:
- Update monitoring coverage status
- Add new alert rules or dashboards
- Revise logging/tracing verification

### 4. Update DR Test Results

If DR testing has been performed:
- Update RTO/RPO verification status
- Document new backup/restore test results
- Revise failover test outcomes

### 5. Update Operational Readiness

If operations have changed:
- Update runbook verification status
- Revise on-call schedule verification
- Document incident response procedure updates

### 6. Re-evaluate Go-Live Decision

Based on all updated findings:
- Recompile the readiness summary
- Update the risk assessment
- Re-determine go-live recommendation (GO/GO WITH CAUTION/NO GO)
- Regenerate the go-live checklist

### 7. Write Updated Documents

Write updated documents back to their original locations:
- `{output_folder}/operations/production-readiness-report.md`
- `{output_folder}/operations/go-live-checklist.md`
- `{output_folder}/operations/risk-assessment.md`

Present a diff summary of changes made and ask for confirmation.

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact and validation
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Accept changes and finalize production readiness update
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass change context: modifications applied, impact analysis
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into change validation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review production readiness changes: {summary of modifications and impact}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated production readiness artifacts
- Update frontmatter `stepsCompleted: [10, 11]`
- Suggest validation mode if significant changes

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Go-live decision re-evaluated based on changes
- [ ] All artifacts updated consistently
- [ ] Risk assessment reflects current state

---

## Outputs

- Updated production readiness report
- Updated go-live checklist
- Updated risk assessment

---

## Next Step

Run production readiness validation (QG-OC) to verify changes meet operational checklist requirements.
