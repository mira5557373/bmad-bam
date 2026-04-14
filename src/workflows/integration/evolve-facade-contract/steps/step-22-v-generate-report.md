# Step 22: Generate Validation Report

## Purpose

Generate a comprehensive validation report summarizing findings from the contract evolution validation and determining the workflow completion status.

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Contract evolution validation performed


---

## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per component
- Recommendations for remediation (if applicable)

---

## Actions

### 1. Compile Validation Results

Aggregate results from all validation checks:

| Category | Checks Passed | Checks Failed | Status |
|----------|---------------|---------------|--------|
| Version Strategy | {n} | {n} | {PASS/FAIL} |
| Breaking Changes | {n} | {n} | {PASS/FAIL} |
| Migration Guide | {n} | {n} | {PASS/FAIL} |
| Timeline | {n} | {n} | {PASS/FAIL} |

### 2. Calculate Overall Status

| Status | Criteria |
|--------|----------|
| **PASS** | All categories pass |
| **CONDITIONAL** | Non-critical gaps, all critical pass |
| **FAIL** | Any critical check fails |

### 3. Generate Report Document

Create validation report including:
- Executive summary
- Detailed findings by category
- Severity distribution
- Recommended actions
- Sign-off requirements

### 4. Determine Next Actions

Based on status:
- **PASS**: Proceed to contract release
- **CONDITIONAL**: Document mitigation plan, proceed with conditions
- **FAIL**: Return to Edit mode for remediation

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
- **A1**: Are all CRITICAL findings addressed or documented?
- **A2**: What is the overall evolution readiness score?
- **A3**: Which WARNING items should be elevated to CRITICAL?
- **A4**: Is the migration readiness assessment accurate?
- **A5**: Does the report capture all stakeholder concerns?

### [P]roceed
- **P1**: COMPLETE - proceed with contract release and consumer notification
- **P2**: Report generated - validation workflow finished
- **P3**: All findings documented - ready for stakeholder review

### [C]oncern
- **C1**: NEEDS REVISION - return to Edit mode for breaking change gaps
- **C2**: NEEDS REVISION - migration guide requires additional work
- **C3**: NEEDS REVISION - deprecation timeline adjustment needed
- **C4**: Report missing key validation categories
- **C5**: Severity assignments need stakeholder review

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Verification

- [ ] Validation results compiled
- [ ] Overall status calculated
- [ ] Report document generated
- [ ] Next actions determined

---

## Outputs

- Validation report document
- Status determination (PASS/CONDITIONAL/FAIL)
- Recommended next actions
- Mitigation plan (if CONDITIONAL)
- **Load template:** `{project-root}/_bmad/bam/templates/facade-migration-template.md`

---

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Proceed with contract version release and consumer notification.
- **NEEDS REVISION:** Return to Edit mode to address breaking change analysis, migration guide, or timeline gaps.

## Workflow Complete

Validation mode complete for contract evolution workflow.
