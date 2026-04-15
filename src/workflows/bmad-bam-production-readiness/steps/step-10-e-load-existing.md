# Step 10: Load Existing Artifact

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

This step loads the existing production readiness artifacts for modification. Edit mode allows updates to assessment findings, risk analysis, or go-live recommendations without recreating the entire assessment from scratch.

---

## Prerequisites

- Existing production readiness artifacts to modify
- **Load checklists:** `{project-root}/_bmad/bam/data/checklists/production-checklist.md`

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Checklist: `{project-root}/_bmad/bam/data/checklists/production-checklist.md`

---

## Actions

### 1. Load Artifacts

Load the existing production readiness documents:
- `{output_folder}/operations/production-readiness-report.md`
- `{output_folder}/operations/go-live-checklist.md`
- `{output_folder}/operations/risk-assessment.md`

If the files do not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current documents:
- Previous go-live decision (GO/GO WITH CAUTION/NO GO)
- Gate verification status from last assessment
- Infrastructure, observability, DR, and operations findings
- Risk assessment summary
- Date of last assessment

### 3. Identify Changes Since Last Assessment

Determine what has changed since the last production readiness assessment:
- New gate results or status changes
- Infrastructure changes (capacity, HA, scaling)
- Observability updates (new alerts, dashboards)
- DR test results (new tests, RTO/RPO changes)
- Operational updates (runbook changes, on-call updates)

### 4. Confirm Modification Targets

Confirm with the user which sections need modification based on identified changes.

---

## COLLABORATION MENUS (A/P/C):

After loading and parsing the artifacts, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into modification requirements and impact analysis
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Proceed to apply identified modifications
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass artifact context: current state, proposed changes
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into modification scope
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review production readiness modification: {summary of current state and proposed changes}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm modification targets with user
- Update frontmatter `stepsCompleted: [10]`
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] Existing artifacts loaded successfully
- [ ] Document structure parsed correctly
- [ ] Changes since last assessment identified
- [ ] Modification scope confirmed with user

---

## Outputs

- Summary of current production readiness status
- List of changes since last assessment
- Confirmed list of sections to modify

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modification targets.
