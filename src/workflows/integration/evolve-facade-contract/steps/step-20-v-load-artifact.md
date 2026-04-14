# Step 20: Load Artifact (Validate Mode)

## Purpose

Load the contract evolution artifacts including new contract version, migration guide, and breaking change assessment for validation of version strategy and consumer migration readiness.

## Prerequisites

- Contract evolution completed (Create or Edit mode)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`


---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Contract Evolution Artifacts

- Read updated facade contract from `{output_folder}/facade-contracts/`
- Load migration guide document
- Parse breaking change assessment
- Load version strategy

### 2. Verify Document Completeness

| Artifact | Required | Present | Status |
|----------|----------|---------|--------|
| Updated contract | Yes | {yes/no} | {PASS/FAIL} |
| Migration guide | Yes | {yes/no} | {PASS/FAIL} |
| Breaking change assessment | Yes | {yes/no} | {PASS/FAIL} |
| Version strategy | Yes | {yes/no} | {PASS/FAIL} |
| ADR | Conditional | {yes/no} | {PASS/FAIL/NA} |

### 3. Validate Document Consistency

- Verify all documents reference same version number
- Confirm breaking change counts match across documents
- Check timeline dates are consistent
- Validate consumer lists align

### 4. Prepare Validation Context

- Extract key metrics for validation checklist
- Identify validation focus areas
- Document any pre-validation concerns

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
- **A1**: Are all evolution documents from the same planning cycle?
- **A2**: Is the breaking change count consistent across documents?
- **A3**: Does the migration guide cover all breaking changes?
- **A4**: Are consumer counts accurate and up-to-date?
- **A5**: Is the version justification clearly documented?

### [P]roceed
- **P1**: All artifacts loaded - proceed to validation checklist
- **P2**: Validation context prepared - ready for Step 21
- **P3**: Document consistency verified - advance to validation

### [C]oncern
- **C1**: Evolution documents not found - need Create mode
- **C2**: Document versions inconsistent
- **C3**: Migration guide missing for breaking changes
- **C4**: Consumer list incomplete or outdated
- **C5**: Breaking change assessment gaps detected

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Verification

- [ ] All required artifacts loaded
- [ ] Document completeness verified
- [ ] Consistency checks passed
- [ ] Validation context prepared

---

## Outputs

- Loaded artifact inventory
- Document completeness report
- Consistency verification results
- Validation context summary
- **Load template:** `{project-root}/_bmad/bam/templates/facade-contract-template.md`

---

## Next Step

Proceed to `step-21-v-validate.md` to perform validation checks.
