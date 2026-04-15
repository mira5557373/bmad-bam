# Step 21: Validate Contract Evolution

## Purpose

Validate the contract evolution against quality criteria, ensuring semver compliance, complete breaking change assessment, consumer impact analysis, migration guide with code examples, and realistic deprecation timeline.

## Prerequisites

- Step 20 completed: Artifacts loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`


---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the contract evolution artifacts from `{output_folder}/facade-contracts/`
- Parse and validate structure
- Load associated metadata

### 2. Validate Content

Run validation checklist:

#### Version Strategy
- [ ] Semver compliance (MAJOR/MINOR/PATCH justified)
- [ ] Version bump matches breaking change severity
- [ ] Changelog entry complete

#### Breaking Change Assessment
- [ ] All breaking changes documented
- [ ] Severity levels assigned
- [ ] Consumer impact quantified
- [ ] Rollback procedures defined

#### Migration Guide
- [ ] Step-by-step instructions provided
- [ ] Code examples for all breaking changes
- [ ] Testing recommendations included
- [ ] Rollback procedures documented

#### Timeline
- [ ] Deprecation timeline realistic
- [ ] All consumers can meet deadlines
- [ ] Parallel support period adequate
- [ ] Sunset date communicated

### 3. Generate Findings

Document any issues found:

| Finding | Severity | Category | Recommendation |
|---------|----------|----------|----------------|
| {issue} | CRITICAL/HIGH/MEDIUM/LOW | {category} | {action} |

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
- **A1**: Which checklist items are failing or incomplete?
- **A2**: Are there CONDITIONAL gaps that could become CRITICAL?
- **A3**: Is the migration guide sufficient for the most complex changes?
- **A4**: Does the deprecation timeline account for all consumer constraints?
- **A5**: Are there hidden breaking changes not captured in assessment?

### [P]roceed
- **P1**: PASS - all validation criteria met, proceed to report generation
- **P2**: CONDITIONAL PASS - gaps documented, proceed with mitigation
- **P3**: Validation complete - advance to Step 22

### [C]oncern
- **C1**: FAIL - breaking change analysis incomplete
- **C2**: FAIL - migration guide missing for major changes
- **C3**: FAIL - deprecation timeline unrealistic
- **C4**: CONDITIONAL gaps may affect consumer migration
- **C5**: Contract quality validation failed

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Verification

- [ ] Artifact loaded and parsed
- [ ] All validation checks executed
- [ ] Findings documented with severity
- [ ] Gate decision determined (PASS/CONDITIONAL/FAIL)

---

## Outputs

- Validation checklist results
- Findings list with severity
- Gate decision recommendation
- **Load template:** `{project-root}/_bmad/bam/data/templates/facade-contract-template.md`

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
