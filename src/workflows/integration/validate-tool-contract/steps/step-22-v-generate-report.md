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

## Purpose

Generate a comprehensive validation report summarizing findings from the tool contract validation and determining the workflow completion status.

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Tool contract validation performed

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
| Tool Definition | | Located, required fields present, category identified |
| Schema Validation | | Input/output schemas valid, descriptions quality |
| Permission Validation | | Permissions declared, levels appropriate, sandbox config |
| Tenant Context | | Context requirement verified, RLS integration confirmed |
| Contract Tests | | Schema, permission, isolation, integration tests passed |
| Report Quality | | All validation areas have results, recommendations actionable |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Critical validation areas missing, security issues unaddressed, or tenant isolation failures | Must fix before integration |
| WARNING | Minor gaps in validation coverage or documentation | Should address before release |
| INFO | Optional improvements to permission granularity or test coverage | Consider for completeness |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All validation areas covered, no critical failures, recommendations documented |
| **NEEDS REVISION** | Critical validation areas missing, security issues, or tenant isolation failures |

### 4. Generate Report

Create validation report summarizing:
- Tool contract validation outcome
- Schema compliance assessment
- Permission model verification
- Tenant isolation confirmation
- Test execution results
- Security assessment summary
- Required actions for any gaps

#### Checkpoint: Report Generated

Before finalizing, confirm:
- [ ] All findings compiled
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated

**STOP: Present the A/P/C menu to the user**

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with tool contract summary
- [ ] Patterns align with pattern registry

## Outputs

- Validation report document
- **Load template:** `{project-root}/_bmad/bam/templates/quality-gate-report-template.md`
- **Output to:** `{output_folder}/planning-artifacts/{tool-name}-contract-validation-report.md`

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Tool contract validated. Proceed to integration testing and agent runtime registration.
- **NEEDS REVISION:** Return to Edit mode to complete missing validation areas or address security/isolation gaps.

## Workflow Complete

Validation mode complete for tool contract validation workflow.
