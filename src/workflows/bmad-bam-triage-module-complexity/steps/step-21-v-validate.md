# Step 21: Validate Module Complexity Triage

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

Validate the module complexity assessment against quality criteria, ensuring all 8 questions are scored with evidence, classification matches the score range with correct upgrade rules applied, and sprint status is consistent.

## Prerequisites

- Step 20 (Load Artifact) completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: module-boundaries`

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
- [ ] One-way upgrade rule correctly applied (any score=2 AND total>=5 → COMPLEX)
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

## Verification

- [ ] Artifact loaded successfully
- [ ] All required sections present
- [ ] Patterns align with pattern registry

## Outputs

- Validation findings by category
- Gate decision (PASS/CONDITIONAL/FAIL)

## Next Step

Proceed to `step-22-v-generate-report.md`



---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

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
