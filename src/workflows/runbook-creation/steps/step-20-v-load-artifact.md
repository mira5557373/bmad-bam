# Step 20: Load Artifact

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

This step loads the runbook collection and individual runbooks for validation. These documents define the operational procedures for managing the multi-tenant AI platform including incident response, AI operations, and routine maintenance procedures.

---

## Prerequisites

- Previous step completed (workflow selection)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: operations`
- **Load checklist:** `{project-root}/_bmad/bam/checklists/production-checklist.md`

---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifacts

Load the runbook documents:
- `{output_folder}/planning-artifacts/runbook-collection.md`
- `{output_folder}/planning-artifacts/incident-response-runbook.md`
- `{output_folder}/planning-artifacts/ai-operations-runbook.md`

### 2. Validate Structure

Parse and validate structure:
- Check document integrity
- Verify all required sections present
- Confirm cross-references are valid

### 3. Generate Initial Findings

- Document any structural issues found
- Note missing sections or runbooks
- Categorize by severity (Critical/High/Medium/Low)

---

## Artifact Locations

Load the existing runbook documents from:
- `{output_folder}/planning-artifacts/runbook-collection.md` - Master runbook index
- `{output_folder}/planning-artifacts/incident-response-runbook.md` - Incident procedures
- `{output_folder}/planning-artifacts/ai-operations-runbook.md` - AI-specific operations

---

## Pre-Validation Checks

Before proceeding, verify the following conditions:
- Runbook collection file exists and contains valid markdown
- Individual runbooks referenced in collection exist
- Cross-references between runbooks are consistent
- Contact information is present in each runbook

---

## Expected Artifact Structure

The runbook-collection.md should contain:
- Index of all runbooks with links
- Runbook ownership and review cadence
- Quick reference table for incident types
- On-call escalation matrix

The incident-response-runbook.md should contain:
- Incident classification levels
- Response procedures per level
- Communication templates
- Post-incident review process

The ai-operations-runbook.md should contain:
- Model deployment procedures
- Model rollback procedures
- Kill switch activation
- LLM provider failover

---

## Error Handling Guidance

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If the collection exists but individual runbooks are missing, report which runbooks are absent and advise that all runbooks are required for complete validation.

---

## COLLABORATION MENUS (A/P/C):

After loading the artifacts, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into document structure and completeness
- **P (Party Mode)**: Bring analyst and architect perspectives for initial review
- **C (Continue)**: Proceed to detailed validation checks
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass document context: sections present, initial structure assessment
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation preparation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review runbook structure: {summary of sections and completeness}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm documents loaded successfully
- Update frontmatter `stepsCompleted: [20]`
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Runbook collection loaded successfully
- [ ] Individual runbooks loaded successfully
- [ ] All required sections present
- [ ] Patterns align with pattern registry

---

## Outputs

- Loaded runbooks for validation
- Validation checklist

---

## Next Step

Proceed to `step-21-v-validate.md` for detailed validation checks.
