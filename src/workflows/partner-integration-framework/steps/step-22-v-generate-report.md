# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Generate a comprehensive validation report summarizing findings and determining workflow completion status.

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Validation performed

---

## Actions

Compile validation results, assign severity to findings, determine completion status, and generate report.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with readiness assessment
- [ ] Patterns align with pattern registry

## Outputs

- Partner Framework Validation Report
- Category-level findings summary
- Go/no-go recommendation

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Proceed with partner program launch.
- **CONDITIONAL:** Document gaps and proceed with limited scope.
- **NEEDS REVISION:** Return to Edit mode to address findings.

## Workflow Complete

Validation mode complete for partner-integration-framework workflow.
