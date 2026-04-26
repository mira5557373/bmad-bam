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

---

## Prerequisites

- Step 20 completed: Cross-module story artifact loaded
- Step 21 completed: Validation performed against coordination criteria

---

## Inputs

- Validation results from Step 21
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per component
- Recommendations for remediation (if applicable)

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21 validation:

| Category | Status | Notes |
|----------|--------|-------|
| Module Identification | PASS/FAIL | All affected modules identified, ownership clear |
| Dependency Mapping | PASS/FAIL | Inter-module dependencies documented, sequence defined |
| Integration Points | PASS/FAIL | API contracts, events, shared data structures |
| Coordinated Stories | PASS/FAIL | Per-module stories aligned, acceptance criteria consistent |
| Cross-Cutting Concerns | PASS/FAIL | Transaction boundaries, error handling, rollback |

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
- Circular dependencies detected

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All modules identified, dependencies mapped, stories coordinated |
| **CONDITIONAL** | Minor coordination gaps with documented resolution plan |
| **NEEDS REVISION** | Critical dependency gaps or inconsistent integration points |

### 4. Generate Report

Create validation report:

```markdown
# Cross-Module Story Validation Report

## Executive Summary
- **Artifact:** {artifact_path}
- **Validation Date:** {date}
- **Gate Decision:** {PASS/CONDITIONAL/FAIL}

## Validation Results by Category

### Module Identification
| Criterion | Result | Notes |
|-----------|--------|-------|
| {criterion} | {result} | {notes} |

### Dependency Mapping
| Criterion | Result | Notes |
|-----------|--------|-------|
| {criterion} | {result} | {notes} |

### Integration Points
| Criterion | Result | Notes |
|-----------|--------|-------|
| {criterion} | {result} | {notes} |

### Coordinated Stories
| Criterion | Result | Notes |
|-----------|--------|-------|
| {criterion} | {result} | {notes} |

## Findings Summary

### Critical Issues
- {issue}: {recommendation}

### Warnings
- {issue}: {recommendation}

### Recommendations
- {recommendation}

## Next Steps
Based on gate decision: {recommended_action}
```

### 5. Save Report

Save validation report to:
`{output_folder}/planning-artifacts/validation/cross-module-story-validation-report.md`

### 6. Present Summary

Display gate outcome:

| Gate | Decision | Notes |
|------|----------|-------|
| Cross-Module Story | {PASS/CONDITIONAL/FAIL} | {summary} |

---

## COLLABORATION MENUS (A/P/C)

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings
- **P (Party Mode)**: Bring perspectives on next steps
- **C (Continue)**: Complete validation workflow
- **[Specific concerns]**: Describe concerns to address

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: report contents, gate decision
- Process enhanced insights
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review cross-module story validation report"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Mark Validate mode complete

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
- [ ] Report saved to correct location
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report: `{output_folder}/planning-artifacts/validation/cross-module-story-validation-report.md`
- Category-level findings summary
- Sprint planning readiness assessment

---

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Proceed to sprint planning with coordinated stories.
- **CONDITIONAL:** Document gaps and proceed with coordination meetings.
- **NEEDS REVISION:** Return to Edit mode (`step-10-e-load.md`) to address coordination gaps.

---

## Workflow Complete

Validation mode complete for cross-module-story workflow.

**Based on gate decision:**
- **PASS**: Proceed to sprint planning with coordinated stories
- **CONDITIONAL**: Address documented gaps, then proceed with risk awareness
- **FAIL**: Return to Create/Edit mode to address critical coordination issues
