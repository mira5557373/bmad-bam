# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Generate a comprehensive validation report summarizing findings from the stakeholder map validation and determining the workflow completion status.

## Prerequisites

- Step 20 completed: Stakeholder map artifact loaded successfully
- Step 21 completed: Validation performed against completeness criteria


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
| Stakeholder Registry | | Internal/external coverage |
| Interest-Influence Mapping | | Interests, influence, conflicts |
| Communication Plan | | Cadence, channels, templates |
| RACI Matrix | | Decision coverage, A uniqueness |
| Governance Coverage | | Workflows, escalation |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Stakeholder governance will fail | Must fix before proceeding |
| WARNING | Non-critical governance gap | Should address before next review |
| INFO | Enhancement opportunity | Consider for continuous improvement |

**Critical Failure Examples:**
- Key decision-makers not identified
- No Accountable assigned for critical decisions
- Missing communication channels for core stakeholders
- RACI conflicts with multiple Accountables

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All categories pass, governance framework ready |
| **CONDITIONAL** | Non-critical gaps with documented mitigation plan |
| **NEEDS REVISION** | Critical governance gaps requiring immediate attention |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by governance category
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
- [ ] Report generated with governance readiness assessment
- [ ] Patterns align with pattern registry

## Outputs

- Stakeholder Discovery Validation Report
- Category-level findings summary
- Governance readiness assessment
- Next review schedule

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Stakeholder map ready for platform governance.
- **CONDITIONAL:** Document gaps with timeline and schedule governance review.
- **NEEDS REVISION:** Return to Edit mode (step-10-e-load-stakeholder-map.md) to address governance gaps.

## Workflow Complete

Validation mode complete for stakeholder-discovery workflow.
