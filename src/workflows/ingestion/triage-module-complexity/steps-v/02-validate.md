# Step 2: Validate Module Complexity Triage

## Validation Checklist

### Score Completeness
- [ ] All 8 questions (Q1-Q8) have assigned scores
- [ ] Each score is valid (0, 1, or 2)
- [ ] Total score correctly calculated (sum of Q1-Q8)
- [ ] Score breakdown matches documented total

### Evidence Quality
- [ ] Q1 (Entity Count): Specific entities listed as evidence
- [ ] Q2 (Business Rules): Complexity examples documented
- [ ] Q3 (AI Involvement): AI components identified or "none" confirmed
- [ ] Q4 (Data Volume): Volume estimates with rationale
- [ ] Q5 (Dependency Count): Dependencies enumerated
- [ ] Q6 (Event Complexity): Events listed or "none" confirmed
- [ ] Q7 (External Integrations): Third-party systems identified
- [ ] Q8 (Compliance Requirements): Regulations listed or "none" confirmed

### Classification Accuracy
- [ ] Classification matches score range (0-4: SIMPLE, 5-10: STANDARD, 11-16: COMPLEX)
- [ ] One-way upgrade rule correctly applied (any score=2 AND total>=5 -> COMPLEX)
- [ ] Classification documented with rationale
- [ ] No unjustified downgrade from higher classification

### Sprint Status Consistency
- [ ] Module exists in sprint-status.yaml
- [ ] Complexity field matches assessment
- [ ] Score breakdown recorded in sprint-status
- [ ] Implementation approach aligns with classification

### Cross-Module Consistency
- [ ] Similar modules have consistent scoring (no arbitrary variance)
- [ ] Shared dependencies scored consistently across modules
- [ ] Complexity rankings make intuitive sense

## Gate Decision

- **PASS**: All 8 questions scored, evidence provided, classification correct, sprint-status updated
- **CONDITIONAL**: Minor gaps (e.g., some evidence thin but scores defensible) - document and proceed
- **FAIL**: Missing scores, incorrect classification calculation, or sprint-status mismatch - return to Create/Edit mode

Present validation results with specific findings for each category.
