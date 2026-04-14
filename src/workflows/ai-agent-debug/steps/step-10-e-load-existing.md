# Step 10: Load Existing Artifact (Edit Mode)

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

Load and review existing debug report to identify sections requiring modification or additional investigation.

---

## Prerequisites

- Existing debug report to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime

---


## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Existing Report

Load the existing debug report from `{output_folder}/planning-artifacts/debug/agent-debug-report.md`.

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Report Structure

Parse and display a summary of the current report:

| Section | Status | Summary |
|---------|--------|---------|
| Agent and execution context | ✅/❌ | {summary} |
| Previously identified failure point | ✅/❌ | {summary} |
| Previous recommendations | ✅/❌ | {summary} |
| Resolution status | ✅/❌ | {summary} |

### 3. Identify Modification Targets

Confirm with the user which sections need modification or additional investigation.

---

## COLLABORATION MENUS (A/P/C):

After loading and presenting the existing report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific sections before editing
- **P (Party Mode)**: Bring AI engineer perspectives on proposed changes
- **C (Continue)**: Proceed to apply modifications
- **[Specific sections]**: Describe which sections to modify

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current report state, proposed modifications
- Process enhanced insights on change impact
- Ask user: "Accept this analysis of proposed changes? (y/n)"
- If yes, document change impact assessment
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review proposed modifications to AI agent debug report"
- Process AI engineer and SRE perspectives on change impact
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document identified modification targets
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] Debug report loaded successfully
- [ ] Report structure understood
- [ ] Sections for modification identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current debug report state
- List of sections to modify or investigate

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
