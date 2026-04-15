# Step 10: Load Existing Artifact (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Load and review existing penetration testing design documents to identify sections requiring modification, new test cases, or updated procedures.

---

## Prerequisites

- Existing penetration testing design documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Existing Documents

Load the existing penetration testing design documents:
- `{output_folder}/planning-artifacts/security/penetration-testing-plan.md`
- `{output_folder}/planning-artifacts/security/test-cases.md`
- `{output_folder}/planning-artifacts/security/reporting-procedures.md`

If the files do not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current documents:

| Component | Status | Key Content |
|-----------|--------|-------------|
| Scope definition | Yes/No | {system count} systems |
| Test categories | Yes/No | {category count} categories |
| Test cases | Yes/No | {test count} tests |
| Tenant isolation tests | Yes/No | {test count} tests |
| AI agent tests | Yes/No | {test count} tests |
| Reporting procedures | Yes/No | {present/absent} |

### 3. Identify Modification Targets

Confirm with the user which sections need modification:
- Update scope or rules of engagement
- Add new test categories
- Add or modify test cases
- Update tenant isolation tests
- Update reporting procedures

---

## COLLABORATION MENUS (A/P/C):

After loading the documents, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific sections before editing
- **P (Party Mode)**: Bring security and QA perspectives on changes
- **C (Continue)**: Proceed to apply modifications
- **[Specific components]**: Describe which components to modify

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Document identified modification targets
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] All existing documents loaded successfully
- [ ] Document structure understood
- [ ] Sections for modification identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current design state
- List of sections to modify

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
