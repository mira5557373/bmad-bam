> **Note:** This workflow is a console-only utility. Edit and Validate modes are not applicable.
> This step exists for CEV compliance but should not be executed.

# Step 21: Validate Tool Listing

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

Validate the tool inventory against completeness and quality criteria ensuring all tools are discovered, metadata is complete, and output format is valid for consumption by other workflows.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Tool inventory JSON parsed without errors
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tool-execution`



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

---

## Validation Checklist

### Tool Discovery
- [ ] All expected tool locations scanned
- [ ] No scan errors reported
- [ ] Tool count matches expected range

### Tool Metadata
- [ ] Each tool has name
- [ ] Each tool has description
- [ ] Each tool has category
- [ ] Each tool has permission level
- [ ] Each tool has status

### Tool Registration
- [ ] All tools have SKILL.md files
- [ ] All tools have instructions.md files
- [ ] No orphaned tool definitions
- [ ] No duplicate tool names

### Output Quality
- [ ] Output format is valid
- [ ] No malformed entries
- [ ] Sorting is consistent
- [ ] Filters applied correctly

### Freshness
- [ ] Scan date is recent (within configured threshold)
- [ ] No stale entries for removed tools
- [ ] New tools detected and included

### Cross-Cutting
- [ ] Patterns align with pattern registry

## Gate Decision

- **PASS**: All tools discovered, metadata complete, output valid
- **CONDITIONAL**: Minor metadata gaps (e.g., some tools missing optional fields)
- **FAIL**: Tools missing, scan errors, or invalid output format

Present validation results with specific findings.

---

## COLLABORATION MENUS (A/P/C):

After completing the validation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for validation review
- **C (Continue)**: Accept validation results and proceed to report generation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass validation context: findings, gate decision
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review validation findings for tool listing: {summary of gate decision}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per category
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report
- Pass/Fail determination
- Specific findings per validation category
- Tool count summary

---

## Next Step

Generate validation report and return results to user.
