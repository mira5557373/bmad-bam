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

Generate a comprehensive validation report summarizing findings from the partner certification program validation and determining the workflow completion status.

## Prerequisites

- Step 20 completed: Certification program artifact loaded successfully
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
| Tier Structure | | Tier definitions, benefits, progression |
| Requirements | | Technical, business, training, support |
| Assessment Process | | Criteria, scoring, thresholds |
| Renewal & Maintenance | | Renewal, maintenance, upgrade/downgrade |
| Partner Ecosystem | | ISV, reseller, integration coverage |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Partner program will fail to attract/retain partners | Must fix before launch |
| WARNING | Non-critical program gap | Should address before next review |
| INFO | Enhancement opportunity | Consider for continuous improvement |

**Critical Failure Examples:**
- Scoring methodology not objective
- Tier benefits not differentiated
- Renewal timeline unrealistic
- Technical requirements not testable
- Missing downgrade/appeal process

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All categories pass, program ready for launch |
| **CONDITIONAL** | Non-critical gaps with documented mitigation plan |
| **NEEDS REVISION** | Critical program gaps requiring immediate attention |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by program category
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
- [ ] Report generated with program readiness assessment
- [ ] Patterns align with pattern registry

## Outputs

- Partner Certification Program Validation Report
- Category-level findings summary
- Program readiness assessment
- Launch timeline recommendations

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Partner certification program ready for launch.
- **CONDITIONAL:** Document gaps with timeline and schedule program review.
- **NEEDS REVISION:** Return to Edit mode (step-10-e-load-certification-program.md) to address program gaps.

## Workflow Complete

Validation mode complete for partner-certification-workflow.
