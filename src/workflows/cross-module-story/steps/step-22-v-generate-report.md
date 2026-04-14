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

Generate a comprehensive validation report summarizing findings from the cross-module story validation and determining the workflow completion status.

## Prerequisites

- Step 20 completed: Cross-module story artifact loaded successfully
- Step 21 completed: Validation performed against story coordination criteria


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
| Module Identification | | All affected modules identified, ownership clear |
| Dependency Mapping | | Inter-module dependencies documented, sequence defined |
| Integration Points | | API contracts, events, shared data structures |
| Coordinated Stories | | Per-module stories aligned, acceptance criteria consistent |
| Cross-Cutting Concerns | | Transaction boundaries, error handling, rollback |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Blocks coordinated implementation | Must fix before sprint planning |
| WARNING | Non-critical coordination gap | Should address before development |
| INFO | Enhancement opportunity | Consider for story refinement |

**Critical Failure Examples:**
- Missing module in dependency chain
- Inconsistent API contracts between modules
- No coordination sequence defined
- Acceptance criteria conflict between module stories

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All modules identified, dependencies mapped, stories coordinated |
| **CONDITIONAL** | Minor coordination gaps with documented resolution plan |
| **NEEDS REVISION** | Critical dependency gaps or inconsistent integration points |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by coordination category
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

**[A]nalyze** - Report Analysis:
- A1: Analyze report completeness and clarity
- A2: Review finding severity assignments
- A3: Assess recommended actions appropriateness
- A4: Evaluate next steps alignment with outcomes

**[P]ropose** - Report Enhancements:
- P1: Propose additional findings to include
- P2: Suggest severity adjustments for specific items
- P3: Recommend action plan modifications
- P4: Propose stakeholder communication approach

**[C]ontinue** - Complete Validation mode:
- C1: Finalize report and complete workflow
- C2: Save report draft and pause for review

Select an option or provide feedback:

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with coordination readiness assessment
- [ ] Patterns align with pattern registry

## Outputs

- Cross-Module Story Validation Report
- Category-level findings summary
- Sprint planning readiness assessment

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Proceed to sprint planning with coordinated stories.
- **CONDITIONAL:** Document gaps and proceed with coordination meetings.
- **NEEDS REVISION:** Return to Edit mode (step-10-e-load-existing.md) to address coordination gaps.

## Workflow Complete

Validation mode complete for cross-module-story workflow.
