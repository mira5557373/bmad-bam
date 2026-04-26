# Step 10: Load Existing Debug Report (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- :stop_sign: NEVER generate content without user input
- :open_book: CRITICAL: ALWAYS read the complete step file before taking any action
- :arrows_counterclockwise: CRITICAL: When loading next step with 'C', ensure entire file is read
- :pause_button: ALWAYS pause after presenting findings and await user direction
- :dart: Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- :dart: Show your analysis before taking any action
- :floppy_disk: Update document frontmatter after each section completion
- :memo: Maintain append-only document building
- :white_check_mark: Track progress in `stepsCompleted` array

---

## Purpose

Load and review existing agent debug report documents to identify sections requiring modification based on new findings or updated remediation strategies.

---

## Prerequisites

- Existing debug report to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `agent-runtime`

---

## Actions

### 1. Load Existing Documents

Load the existing debug report:
- `{output_folder}/planning-artifacts/agent-debug-report.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current document:

| Section | Status | Last Updated | Key Content |
|---------|--------|--------------|-------------|
| Report Information | Complete/Partial | {date} | {summary} |
| Issue Summary | Complete/Partial | {date} | {summary} |
| Agent Context | Complete/Partial | {date} | {summary} |
| Debug Analysis | Complete/Partial | {date} | {summary} |
| Root Cause Analysis | Complete/Partial | {date} | {summary} |
| Resolution | Complete/Partial | {date} | {summary} |
| Prevention | Complete/Partial | {date} | {summary} |

### 3. Assess Update Reasons

Identify why updates are needed:

| Update Reason | Sections Affected | Priority |
|---------------|-------------------|----------|
| New trace data available | Debug Analysis | High |
| Additional failure modes found | Root Cause Analysis | High |
| Remediation effectiveness data | Resolution | Medium |
| Updated monitoring metrics | Prevention | Medium |
| Stakeholder feedback | Various | Low |

### 4. Identify Modification Targets

Confirm with the user which sections need modification:

| Section | Current State | Modification Needed | Rationale |
|---------|---------------|---------------------|-----------|
| {section_1} | {state} | YES/NO | {reason} |
| {section_2} | {state} | YES/NO | {reason} |
| {section_3} | {state} | YES/NO | {reason} |

---

## COLLABORATION MENUS (A/P/C):

After loading and presenting the existing documents, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific report sections before editing
- **P (Party Mode)**: Bring review perspectives on proposed changes
- **C (Continue)**: Proceed to apply modifications
- **[Specific sections]**: Describe which sections to modify

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current document state, proposed modifications
- Process enhanced insights on change impact
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review proposed modifications to agent debug report"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Document identified modification targets
- Proceed to next step: `step-11-e-apply.md`

---

## Verification

- [ ] Existing debug report loaded successfully
- [ ] Document structure understood
- [ ] Sections for modification identified
- [ ] Update rationale documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current debug report state
- List of sections to modify with rationale
- Modification priority assessment

---

## Next Step

Proceed to `step-11-e-apply.md` with identified modifications.
