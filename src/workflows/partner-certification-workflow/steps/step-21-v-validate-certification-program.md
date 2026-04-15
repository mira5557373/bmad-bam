# Step 21: Validate Certification Program Completeness

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Perform comprehensive validation of the partner certification program against completeness criteria, pattern alignment, and partner ecosystem requirements.

## Prerequisites

- Certification program loaded (Step 20)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: partner-ecosystem
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/production-readiness.md`

## Validation Categories

### Category 1: Tier Structure Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| All tiers defined | Registered, Certified, Premier documented | |
| Benefits differentiated | Clear value progression across tiers | |
| Progression requirements | Upgrade path documented | |
| Branding guidelines | Badges and usage rules defined | |
| Commitments documented | Fees and obligations per tier | |

**Validation Rules:**
- [ ] Each tier has unique value proposition
- [ ] Benefits escalate appropriately
- [ ] Progression is achievable
- [ ] Branding is consistent

### Category 2: Requirements Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Technical requirements defined | All tiers have technical criteria | |
| Business requirements defined | All tiers have business criteria | |
| Training requirements | Curriculum per tier | |
| Support requirements | SLAs per tier | |
| Documentation standards | Requirements per tier | |

**Validation Rules:**
- [ ] **CRITICAL:** Technical requirements are testable
- [ ] Business requirements are verifiable
- [ ] Training is achievable
- [ ] Support commitments are sustainable
- [ ] Documentation standards are clear

### Category 3: Assessment Process Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Technical assessment criteria | Weights and thresholds defined | |
| Business assessment process | Stages and timeline documented | |
| Scoring methodology | Clear and objective | |
| Pass/fail thresholds | Per tier thresholds set | |
| Assessment timeline | Realistic durations | |

**Validation Rules:**
- [ ] **CRITICAL:** Scoring is objective and repeatable
- [ ] Thresholds are appropriate
- [ ] Timeline is achievable
- [ ] Appeal process defined
- [ ] Critical requirements identified

### Category 4: Renewal and Maintenance Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Renewal requirements | Per tier renewal criteria | |
| Maintenance obligations | Ongoing requirements documented | |
| Upgrade procedures | Clear progression process | |
| Downgrade procedures | Fair demotion process | |
| Recertification process | Re-assessment defined | |

**Validation Rules:**
- [ ] **CRITICAL:** Renewal timeline is reasonable
- [ ] Maintenance requirements are sustainable
- [ ] Upgrade path is clear
- [ ] Downgrade triggers are fair
- [ ] Grace periods defined

### Category 5: Partner Ecosystem Coverage

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| ISV coverage | Technology partners addressed | |
| Reseller coverage | Channel partners addressed | |
| Integration patterns | Common integrations documented | |
| API compatibility | Versioning and migration | |
| Communication plan | Partner notification process | |

**Validation Rules:**
- [ ] All partner types covered
- [ ] Integration patterns are comprehensive
- [ ] API compatibility requirements clear
- [ ] Communication channels defined

## Validation Summary

### Overall Assessment

| Category | Status | Critical Issues | Notes |
|----------|--------|-----------------|-------|
| Tier Structure | | | |
| Requirements | | | |
| Assessment Process | | | |
| Renewal & Maintenance | | | |
| Partner Ecosystem | | | |

### Critical Findings

List any CRITICAL validation failures:
1. 
2. 
3. 

### Recommendations

List improvement recommendations:
1. 
2. 
3. 



---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

### Menu Options

### [A]nalyze Options
- **A1**: Deep-dive tier structure validation
- **A2**: Analyze requirements completeness and achievability
- **A3**: Evaluate assessment process objectivity
- **A4**: Assess renewal and maintenance sustainability
- **A5**: Review partner ecosystem coverage
- **A6**: Analyze cross-tier consistency

### [P]ropose Changes
- **P1**: Propose tier structure enhancements
- **P2**: Suggest requirements adjustments
- **P3**: Recommend assessment process improvements
- **P4**: Propose renewal procedure refinements
- **P5**: Suggest ecosystem coverage expansion
- **P6**: Recommend communication improvements

### [C]ontinue
- **C1**: Accept validation results and proceed to report generation
- **C2**: Mark step complete and load `step-22-v-generate-report.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All categories validated
- [ ] Critical issues identified
- [ ] Recommendations documented
- [ ] Validation report complete
- [ ] Patterns align with pattern registry

## Outputs

- Certification Program Validation Report
- List of critical issues
- Improvement recommendations
- Overall pass/fail/conditional status

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the final validation report.

## QG-PC1 Exit Gate Verification

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-PC1`

### QG-PC1 Required Patterns

| Pattern | Required | Status | Evidence |
|---------|----------|--------|----------|
| `tiers_defined` | **YES** | [ ] Pass / [ ] Fail | Tier definitions complete |
| `requirements_documented` | **YES** | [ ] Pass / [ ] Fail | Category 2 validation above |
| `assessment_process` | **YES** | [ ] Pass / [ ] Fail | Category 3 validation above |
| `renewal_designed` | **YES** | [ ] Pass / [ ] Fail | Category 4 validation above |

**QG-PC1 Partner Certification Gate:** [ ] SATISFIED / [ ] NOT SATISFIED

### Gate Decision

- **PASS**: All QG-PC1 required patterns satisfied, all critical checks pass
- **CONDITIONAL**: Non-critical gaps with mitigation plan documented
- **FAIL**: Any QG-PC1 critical pattern fails, requires remediation

If validation fails, document issues and recommend Edit mode to address gaps.
