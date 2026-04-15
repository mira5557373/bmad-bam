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

Load the PII detection architecture documents for validation against privacy and compliance criteria.

---

## Prerequisites

- PII detection architecture artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-safety
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i3-agent-safety.md`

---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Existing Documents

Load the existing PII detection architecture documents:
- `{output_folder}/planning-artifacts/architecture/pii-detection-design.md`
- `{output_folder}/planning-artifacts/architecture/privacy-policy-schema.md`

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

### 2. Parse Document Structure

Parse the document structure and prepare for validation against privacy criteria.

### 3. Pre-Validation Check

| Component | Present | Status |
|-----------|---------|--------|
| PII Taxonomy | Yes/No | {ready/incomplete} |
| Detection Methods | Yes/No | {ready/incomplete} |
| Redaction Strategies | Yes/No | {ready/incomplete} |
| Tenant Policies | Yes/No | {ready/incomplete} |

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure concerns
- **P (Party Mode)**: Bring QA and privacy perspectives on validation approach
- **C (Continue)**: Proceed to detailed validation against privacy criteria
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
- Context: "Review PII detection architecture artifact readiness for validation"
- Process QA and privacy perspectives
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

Proceed to `step-21-v-validate.md` to run validation checks against privacy criteria.
