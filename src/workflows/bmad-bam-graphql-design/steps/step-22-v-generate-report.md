# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Generate a comprehensive validation report.

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Validation performed

---

## Actions

Compile validation results, assign severity, determine completion status, generate report.

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

- GraphQL Design Validation Report
- Category-level findings summary
- Go/no-go recommendation

## Next Step

Workflow complete. Present GraphQL Design Validation Report to user for review and approval.
