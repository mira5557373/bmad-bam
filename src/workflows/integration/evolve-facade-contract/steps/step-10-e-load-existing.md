# Step 10: Load Existing Artifact (Edit Mode)

## Purpose

This step loads the existing contract evolution artifacts for modification. Edit mode allows updates to the migration timeline, breaking change assessments, or deprecation strategies without restarting the evolution planning process from scratch.

## Prerequisites

- Existing contract evolution artifacts to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`


---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Locate Evolution Artifacts

- Search for contract evolution documents at `{output_folder}/facade-contracts/`
- Identify evolution plan by module name
- Verify all required documents present

### 2. Load Evolution State

- Read contract baseline document
- Load change manifest
- Parse breaking change assessment
- Load version strategy and timeline

### 3. Verify Document Consistency

| Document | Status | Last Modified |
|----------|--------|---------------|
| Contract baseline | {present/missing} | {date} |
| Change manifest | {present/missing} | {date} |
| Breaking change assessment | {present/missing} | {date} |
| Version strategy | {present/missing} | {date} |

### 4. Confirm Modification Scope

- Identify specific sections to modify
- Document reason for modifications
- Verify no conflicting edits in progress

---

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

## COLLABORATION MENUS (A/P/C)

### [A]sk
- **A1**: What specific aspects of the evolution plan need modification?
- **A2**: Are there new breaking changes discovered since initial planning?
- **A3**: Has consumer feedback changed migration requirements?
- **A4**: Is the deprecation timeline still realistic?
- **A5**: Were there gaps in the initial evolution assessment?

### [P]roceed
- **P1**: Evolution state loaded - proceed to apply modifications
- **P2**: Modification scope confirmed - ready to edit
- **P3**: All artifacts present - advance to Step 11

### [C]oncern
- **C1**: Evolution documents not found - may need Create mode
- **C2**: Documents from different planning cycles - inconsistency risk
- **C3**: Migration already in progress - edits may cause confusion
- **C4**: Breaking change count differs from expected
- **C5**: Timeline milestones have already passed

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Verification

- [ ] All evolution artifacts located
- [ ] Evolution state loaded successfully
- [ ] Document consistency verified
- [ ] Modification scope confirmed

---

## Outputs

- Loaded evolution state
- Document inventory
- Modification scope document
- **Load template:** `{project-root}/_bmad/bam/data/templates/facade-contract-template.md`

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with confirmed modification scope.
