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

Load and review existing audit log design documents to identify sections requiring modification, new compliance requirements, or schema updates.

---

## Prerequisites

- Existing audit log design documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: audit
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Existing Documents

Load the existing audit log design documents:
- `{output_folder}/planning-artifacts/compliance/audit-log-design.md`
- `{output_folder}/planning-artifacts/compliance/audit-schema.md`
- `{output_folder}/planning-artifacts/compliance/retention-policy.md`

If the files do not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current documents:

| Component | Status | Key Content |
|-----------|--------|-------------|
| Audit schema | Yes/No | {field count} fields |
| Event categories | Yes/No | {category count} categories |
| Tenant isolation | Yes/No | {strategy} |
| Retention tiers | Yes/No | {tier count} tiers |
| Query patterns | Yes/No | {pattern count} patterns |
| Compliance mappings | Yes/No | {framework count} frameworks |

### 3. Summarize Current Design

| Section | Completeness | Last Updated |
|---------|--------------|--------------|
| Core schema | {percentage}% | {date} |
| AI agent extension | {percentage}% | {date} |
| Retention policies | {percentage}% | {date} |
| Query patterns | {percentage}% | {date} |
| Compliance mapping | {percentage}% | {date} |

### 4. Identify Modification Targets

Confirm with the user which sections need modification:
- Update schema fields
- Add new event categories
- Modify retention policies
- Add compliance framework mappings
- Update query patterns

---

## COLLABORATION MENUS (A/P/C):

After loading and presenting the existing documents, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific sections before editing
- **P (Party Mode)**: Bring compliance and architecture perspectives on changes
- **C (Continue)**: Proceed to apply modifications
- **[Specific components]**: Describe which components to modify

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current document state, proposed modifications
- Process enhanced insights on change impact
- Ask user: "Accept this analysis of proposed changes? (y/n)"
- If yes, document change impact assessment
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review proposed modifications to audit log design"
- Process compliance and architecture perspectives on change impact
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document identified modification targets
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] All existing documents loaded successfully
- [ ] Document structure understood
- [ ] Current design state known
- [ ] Sections for modification identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current audit log design state
- List of sections to modify
- Change impact assessment

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
