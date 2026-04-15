# Step 10: Load Existing Artifact (Edit Mode)

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

Load and review existing incident report to identify sections requiring modification or status updates.

---

## Prerequisites

- Existing incident report to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: incident-response

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Existing Documents

Load the existing incident documents:
- `{output_folder}/operations/incidents/incident-{id}-report.md`
- `{output_folder}/operations/incidents/incident-{id}-postmortem.md` (if exists)

If the files do not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current incident:

| Component | Status | Key Information |
|-----------|--------|-----------------|
| Incident ID | {id} | {value} |
| Classification | Complete/Incomplete | {severity, impact} |
| Response team | Active/Disbanded | {roster} |
| Investigation | Complete/In Progress | {root cause status} |
| Mitigation | Applied/Pending | {mitigation status} |
| Resolution | Resolved/Open | {resolution status} |
| Postmortem | Scheduled/Completed/Pending | {date/status} |

### 3. Identify Modification Targets

Confirm with the user which sections need modification:
- [ ] Update incident status
- [ ] Add investigation findings
- [ ] Update mitigation actions
- [ ] Modify resolution status
- [ ] Update postmortem details
- [ ] Add action items

---

## COLLABORATION MENUS (A/P/C):

After loading and presenting the existing documents, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific sections before editing
- **P (Party Mode)**: Bring SRE perspectives on proposed changes
- **C (Continue)**: Proceed to apply modifications
- **[Specific sections]**: Describe which sections to modify

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current incident state, proposed modifications
- Process enhanced insights on change impact
- Ask user: "Accept this analysis of proposed changes? (y/n)"
- If yes, document change targets
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review proposed modifications to incident report"
- Process SRE perspectives on change impact
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document identified modification targets
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] All existing documents loaded successfully
- [ ] Document structure understood
- [ ] Sections for modification identified

---

## Outputs

- Summary of current incident state
- List of sections to modify

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
