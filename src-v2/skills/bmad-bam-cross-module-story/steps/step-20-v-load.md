# Step 20: Load Artifact (Validate Mode)

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

Load the cross-module story artifact and quality gate checklist for validation against coordination criteria.

---

## Prerequisites

- Cross-module story artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts

---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifact

Load the cross-module story documents:
- `{output_folder}/planning-artifacts/cross-module-stories.md`
- `{output_folder}/planning-artifacts/stories/dependency-graph.md`
- `{output_folder}/planning-artifacts/stories/module-stories/*.md`
- `{output_folder}/planning-artifacts/stories/integration-tests.md`

If the files do not exist, inform the user and suggest switching to Create mode.

### 2. Display Artifact Summary

Present artifact overview:

| Attribute | Value |
|-----------|-------|
| Document Path | {path} |
| Version | {version} |
| Last Modified | {date} |
| Status | {status} |

### 3. Load Validation Checklist

Load the cross-module story validation criteria:

**Module Identification:**
- [ ] All necessary modules identified
- [ ] Module roles classified (primary/supporting/observing)
- [ ] Module owners identified and available
- [ ] No module boundary violations

**Dependencies:**
- [ ] All dependencies mapped (data/functional/temporal)
- [ ] Critical path identified
- [ ] No circular dependencies
- [ ] New contracts required are documented

**Integration Points:**
- [ ] All cross-module interactions specified
- [ ] Facade calls fully documented
- [ ] Event schemas defined
- [ ] Contract tests planned
- [ ] Tenant context propagation verified

**Coordinated Stories:**
- [ ] Story for each primary module created
- [ ] Dependencies between stories linked
- [ ] Acceptance criteria include integration requirements
- [ ] Coordination schedule realistic
- [ ] Sync points defined

### 4. Prepare for Validation

Confirm the artifact is ready for validation checks.

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Document metadata captured
- [ ] Validation checklist loaded
- [ ] Ready for validation checks
- [ ] Patterns align with pattern registry

---

## Outputs

- Loaded artifact content
- Validation checklist
- Validation readiness confirmation

---

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks against quality criteria.
