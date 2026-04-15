# Step 11: Apply Changes (Edit Mode)

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

Apply targeted modifications to the incident report based on identified change requirements.

---

## Prerequisites

- Existing incident report loaded (Step 10)
- Modification targets identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: incident-response

---

## Inputs

- Loaded incident report from Step 10
- User modification requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Apply Status Updates

Update incident status fields:

| Field | Previous | New | Reason |
|-------|----------|-----|--------|
| Status | {old} | {new} | {reason} |
| Severity | {old} | {new} | {reason} |
| Impact | {old} | {new} | {reason} |

### 2. Add Investigation Updates

If adding investigation findings:

| Time | Finding | Source |
|------|---------|--------|
| {timestamp} | {new finding} | {log/analysis} |

### 3. Update Mitigation Actions

If updating mitigation:

| Action | Previous Status | New Status | Result |
|--------|-----------------|------------|--------|
| {action} | {old} | {new} | {outcome} |

### 4. Update Resolution Status

If modifying resolution:

| Field | Previous | New |
|-------|----------|-----|
| Resolution status | {old} | {new} |
| Resolution time | {old} | {new} |
| Resolution summary | {old} | {new} |

### 5. Create Change Log Entry

Document the modification:

```
## Change Log

### {date} - {modifier}
- Changed: {field} from {old} to {new}
- Reason: {justification}
```

---

## COLLABORATION MENUS (A/P/C):

After applying modifications, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Review change impact in detail
- **P (Party Mode)**: Get SRE perspective on changes
- **C (Continue)**: Finalize changes and save
- **[Additional changes]**: Describe more changes to apply

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: applied changes, change log
- Process enhanced insights on change completeness
- Ask user: "Accept these changes? (y/n)"
- If yes, finalize changes
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review incident report modifications"
- Process SRE perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save modified incident report
- Update document timestamps
- Mark edit workflow as complete

---

## Verification

- [ ] All requested modifications applied
- [ ] Change log entry created
- [ ] Document timestamps updated
- [ ] No data integrity issues

---

## Outputs

- Updated incident report
- Change log entry

---

## Workflow Complete

Edit mode complete. Updated artifact saved to:
- `{output_folder}/operations/incidents/incident-{id}-report.md`
