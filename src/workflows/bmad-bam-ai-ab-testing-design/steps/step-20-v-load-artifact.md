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

Load the AI A/B testing architecture documents for validation against experimentation best practices criteria.

---

## Prerequisites

- AI A/B testing architecture artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-testing

---

## Inputs

- Artifact file path for validation
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Existing Documents

Load the existing AI A/B testing architecture documents:
- `{output_folder}/planning-artifacts/architecture/ai-ab-testing-design.md`
- `{output_folder}/planning-artifacts/architecture/experiment-schema.md`

If the files do not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse the document structure and prepare for validation.

### 3. Pre-Validation Check

| Component | Present | Status |
|-----------|---------|--------|
| Experiment Framework | Yes/No | {ready/incomplete} |
| Variant Management | Yes/No | {ready/incomplete} |
| Metrics Collection | Yes/No | {ready/incomplete} |
| Analysis Engine | Yes/No | {ready/incomplete} |

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure concerns
- **P (Party Mode)**: Bring QA and data science perspectives on validation approach
- **C (Continue)**: Proceed to detailed validation
- **[Specific concerns]**: Describe pre-validation concerns

Select an option:
```

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

Proceed to `step-21-v-validate.md` to run validation checks.
