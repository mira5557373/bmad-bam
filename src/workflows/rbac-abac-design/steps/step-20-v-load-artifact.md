# Step 20: Load Artifact (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Load the RBAC/ABAC architecture documents for validation against security and compliance criteria.

---

## Prerequisites

- RBAC/ABAC architecture artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: security
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-security-continuous.md`

---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Existing Documents

Load the existing RBAC/ABAC architecture documents:
- `{output_folder}/planning-artifacts/architecture/rbac-abac-design.md`
- `{output_folder}/planning-artifacts/architecture/permission-model.md`

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

### 2. Parse Document Structure

Parse the document structure and prepare for validation against security criteria.

### 3. Pre-Validation Check

| Component | Present | Status |
|-----------|---------|--------|
| Permission Model | Yes/No | {ready/incomplete} |
| Role Hierarchy | Yes/No | {ready/incomplete} |
| Attribute Policies | Yes/No | {ready/incomplete} |
| Tenant Scoping | Yes/No | {ready/incomplete} |

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure concerns
- **P (Party Mode)**: Bring QA and security perspectives on validation approach
- **C (Continue)**: Proceed to detailed validation against security criteria
- **[Specific concerns]**: Describe pre-validation concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: loaded artifact structure, missing components, pre-validation status
- Process enhanced insights on validation readiness
- Ask user: "Accept this validation readiness assessment? (y/n)"
- If yes, document any caveats for validation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review RBAC/ABAC architecture artifact readiness for validation"
- Process QA and security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm artifact loaded successfully
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Validation criteria defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation context prepared
- Document structure parsed

---

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks against security criteria.
