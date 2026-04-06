# Step 0: Complexity Confirmation

## Purpose
Verify and confirm the module's complexity classification before proceeding with architecture design.

## Actions

1. **Load existing classification** from `sprint-status.yaml` if available
2. **Review module scope** against the 8-question complexity assessment:
   - Q1-Q4: Technical complexity (entities, rules, AI, data volume)
   - Q5-Q8: Integration complexity (dependencies, events, external, compliance)
3. **Apply one-way upgrade rule**: Classification can only increase, never decrease
4. **Confirm classification**: SIMPLE | STANDARD | COMPLEX

## Classification Triggers

| Classification | Criteria |
|----------------|----------|
| SIMPLE | Score 0-8, single aggregate, no AI |
| STANDARD | Score 9-16, multiple aggregates, basic AI |
| COMPLEX | Score 17+, cross-module deps, advanced AI |

## Output
Confirmed complexity classification to guide subsequent architecture steps.
