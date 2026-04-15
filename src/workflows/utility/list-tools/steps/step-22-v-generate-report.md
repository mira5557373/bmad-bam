> **Note:** This workflow is a console-only utility. Edit and Validate modes are not applicable.
> This step exists for CEV compliance but should not be executed.

# Step 22: Generate Validation Report

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

Generate a comprehensive validation report summarizing findings from the tool listing validation and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Tool listing validation performed

---


## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per component
- Recommendations for remediation (if applicable)

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | Status | Notes |
|----------|--------|-------|
| Tool Discovery | | All expected locations scanned, no scan errors |
| Tool Metadata | | Name, description, category, permissions, status |
| Tool Registration | | SKILL.md and instructions.md present, no duplicates |
| Output Quality | | Valid format, consistent sorting, filters applied |
| Freshness | | Scan date recent, no stale entries |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Tools missing, scan errors, or invalid output format | Must fix before consumption |
| WARNING | Minor metadata gaps like optional fields missing | Should address for completeness |
| INFO | Optional improvements to sorting or filtering | Consider for consistency |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All tools discovered, metadata complete, output valid |
| **NEEDS REVISION** | Tools missing, scan errors, or invalid output format |

### 4. Generate Report

Create validation report summarizing:
- Tool listing validation outcome
- Tool count summary (total, by category, by status)
- Discovery completeness assessment
- Metadata quality evaluation
- Output format verification
- Required actions for any gaps

---

## COLLABORATION MENUS (A/P/C):

After generating the report above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for report review
- **C (Continue)**: Accept report and complete Validate mode
- **[Specific refinements]**: Describe what you'd like to adjust in the report

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass report context: findings, recommendations
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced recommendations? (y/n)"
- If yes, integrate into final report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review validation report for tool listing: {summary of outcome}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report
- Update frontmatter `stepsCompleted: [20, 21, 22]`
- Validate mode complete

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with tool inventory summary
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report document
- **Load template:** `{project-root}/_bmad/bam/data/templates/quality-gate-report-template.md`
- **Output to:** `{output_folder}/planning-artifacts/tool-listing-validation-report.md`

---

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Tool inventory validated and ready for consumption by other workflows.
- **NEEDS REVISION:** Return to Edit mode to address missing tools, scan errors, or output format issues.

## Workflow Complete

Validation mode complete for tool listing workflow.
