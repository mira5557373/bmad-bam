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

Generate a comprehensive validation report summarizing findings from the failover execution report validation and determining the workflow completion status.

## Prerequisites

- Step 20 completed: Execution report artifact loaded successfully
- Step 21 completed: Validation performed against execution report completeness criteria


---

## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per component
- Recommendations for remediation (if applicable)

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21 validation:

| Category | Status | Notes |
|----------|--------|-------|
| Timeline Completeness | | Phases, timestamps, durations |
| Validation Results | | Health checks, service availability, data integrity |
| Exception Documentation | | Issues, resolutions, root causes |
| RTO/RPO Documentation | | Targets, achievements, gaps |
| Lessons Learned Quality | | Insights, team input, actionability |
| Recommendations Actionability | | Owners, priorities, deadlines |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Report fails to document key execution aspects | Must fix before archiving |
| WARNING | Non-critical documentation gap | Should address before final review |
| INFO | Enhancement opportunity | Consider for future reports |

**Critical Failure Examples:**
- Missing execution timeline phases
- No validation results documented
- Critical exceptions without resolutions
- RTO/RPO achievement not calculated

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All categories pass, documentation comprehensive |
| **CONDITIONAL** | Non-critical gaps with documented follow-up plan |
| **NEEDS REVISION** | Critical documentation gaps or missing sections |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by documentation category
- Required actions for each critical/warning item
- Next steps based on outcome

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

### Menu Options

### [A]nalyze Options
- **A1**: Review compiled validation results for accuracy
- **A2**: Analyze severity assignments for consistency
- **A3**: Evaluate completion status determination
- **A4**: Assess report completeness and clarity
- **A5**: Review next steps recommendations

### [P]ropose Changes
- **P1**: Propose validation result adjustments
- **P2**: Suggest severity reclassifications
- **P3**: Recommend completion status modification
- **P4**: Propose additional report sections
- **P5**: Suggest enhanced next steps guidance

### [C]ontinue
- **C1**: Accept validation report and complete workflow
- **C2**: Mark Validate mode complete
- **C3**: Return to Edit mode if NEEDS REVISION status

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with documentation assessment
- [ ] Patterns align with pattern registry

## Outputs

- Execution Report Validation Report
- Category-level findings summary
- Documentation completeness assessment
- Archive readiness determination

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Execution report ready for archiving and stakeholder distribution.
- **CONDITIONAL:** Document gaps with timeline and schedule follow-up review.
- **NEEDS REVISION:** Return to Edit mode (step-10-e-load-execution-report.md) to address documentation gaps.

## Workflow Complete

Validation mode complete for cross-region-failover-execution workflow.
