> **Note:** This workflow is a console-only utility. Edit and Validate modes are not applicable.
> This step exists for CEV compliance but should not be executed.

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

This step loads the Tool Inventory artifact for validation. The tool inventory is a JSON-formatted catalog of all available tools, utilities, and capabilities within the BMAD workflow system, enabling discovery and documentation of the tooling ecosystem.

---

## Prerequisites

- Tool inventory artifact exists to validate
- JSON parsing capabilities available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tool-execution`



---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure
- Verify document integrity

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

---

## Artifact Location

Load the existing tool inventory from:
- `{output_folder}/cache/tool-inventory.json`

## Pre-Validation Checks

Before proceeding, verify the following conditions:
- The file exists at the specified cache path
- The file contains valid JSON syntax
- The JSON structure is parseable without errors
- Required schema fields are present in each tool entry

## Expected Artifact Structure

The tool inventory JSON should contain these required elements:
- `tools` array with individual tool definitions
- Each tool entry must include: `name`, `description`, `category`
- Each tool entry should include: `parameters`, `usage_examples`
- `metadata` object with inventory version and generation timestamp
- `categories` summary listing all tool categories present

## Error Handling Guidance

If the file does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If the file exists but contains invalid JSON or is missing required schema fields, report the parsing errors or schema violations and suggest regenerating the inventory with the Create workflow.

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for pre-validation analysis
- **C (Continue)**: Proceed to validation checks
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass artifact context: JSON loaded, structure analysis
- Process enhanced insights from deep questioning
- Ask user: "Accept these pre-validation findings? (y/n)"
- If yes, integrate into validation context
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review loaded tool inventory for validation: {summary of structure}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm artifact loading complete
- Update frontmatter `stepsCompleted: [20]`
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] JSON syntax valid
- [ ] Required schema fields present
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation context prepared
- JSON structure parsed
- Tool count identified

---

## Next Step

Proceed to `step-21-v-validate.md` to perform detailed quality criteria checks on the tool inventory.
