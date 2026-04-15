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

Load the RAG pipeline architecture documents for validation against the QG-M3 quality gate criteria.

---

## Prerequisites

- RAG pipeline architecture artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: rag-patterns
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md`

---

## Inputs

- Artifact file path for validation
- Quality gate checklist
- Pattern registry

---

## Actions

### 1. Load Existing Documents

Load the existing RAG pipeline architecture documents:
- `{output_folder}/planning-artifacts/architecture/rag-pipeline-architecture.md`
- `{output_folder}/planning-artifacts/architecture/vector-store-design.md`

If the files do not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and prepare for validation.

### 3. Pre-Validation Check

| Component | Present | Status |
|-----------|---------|--------|
| Ingestion Pipeline | YES/NO | {ready/incomplete} |
| Chunking Strategy | YES/NO | {ready/incomplete} |
| Embedding Management | YES/NO | {ready/incomplete} |
| Retrieval Optimization | YES/NO | {ready/incomplete} |
| Hybrid Search | YES/NO | {ready/incomplete} |
| Tenant Isolation | YES/NO | {ready/incomplete} |

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure concerns
- **P (Party Mode)**: Bring QA perspectives on validation approach
- **C (Continue)**: Proceed to detailed validation against QG-M3 criteria
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

---

## Outputs

- Validation context prepared
- Document structure parsed

---

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks.
