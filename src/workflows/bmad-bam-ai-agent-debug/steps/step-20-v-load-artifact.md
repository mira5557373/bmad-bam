# Step 20: Load Artifact (Validate Mode)

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

Load the AI Agent Debug Report artifact for validation. The debug report captures diagnostic information about agent behavior, failure modes, and resolution strategies that have been applied during debugging sessions.

---

## Prerequisites

- AI Agent Debug Report artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime

---


## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifact

Load the existing debug report from `{output_folder}/planning-artifacts/debug/agent-debug-report.md`.

### 2. Pre-Validation Checks

Before proceeding, verify the following conditions:

| Check | Status | Notes |
|-------|--------|-------|
| File exists at specified path | ✅/❌ | |
| File is readable and not corrupted | ✅/❌ | |
| File contains valid markdown structure | ✅/❌ | |
| Required sections are present | ✅/❌ | |

### 3. Expected Artifact Structure

The debug report should contain these required sections:
- Debug Session Summary with timestamp and scope
- Agent Identification and configuration details
- Observed Behavior describing the issue
- Root Cause Analysis with findings
- Resolution Steps applied or recommended
- Verification Results confirming the fix

### 4. Error Handling

If the file does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If the file exists but is malformed or missing required sections, report the specific structural issues found and allow the user to decide whether to proceed with partial validation or abort.

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure concerns
- **P (Party Mode)**: Bring QA perspectives on validation approach
- **C (Continue)**: Proceed to detailed validation
- **[Specific concerns]**: Describe pre-validation concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: loaded artifact structure, missing sections, pre-validation status
- Process enhanced insights on validation readiness
- Ask user: "Accept this validation readiness assessment? (y/n)"
- If yes, document any caveats for validation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI agent debug report readiness for validation"
- Process QA perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm artifact loaded successfully
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Validation criteria defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation context prepared
- Document structure confirmed

---

## Next Step

Once the artifact is successfully loaded and initial structure is confirmed, proceed to `step-21-v-validate.md` to perform detailed quality criteria checks.
