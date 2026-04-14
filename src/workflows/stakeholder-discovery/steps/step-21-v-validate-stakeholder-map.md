# Step 21: Validate Stakeholder Map Completeness

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

Perform comprehensive validation of the stakeholder map against completeness criteria, pattern alignment, and governance requirements.

## Prerequisites

- Stakeholder map loaded (Step 20)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: governance
- **Load checklist:** `{project-root}/_bmad/bam/checklists/foundation-gate.md`

## Validation Categories

### Category 1: Stakeholder Registry Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Internal stakeholders identified | Engineering, Product, Operations covered | |
| External stakeholders identified | Customers, Partners documented | |
| Contact information complete | All stakeholders have contacts | |
| Categories assigned | All stakeholders categorized | |
| Availability documented | Capacity constraints noted | |

**Validation Rules:**
- [ ] All key organizational groups represented
- [ ] External stakeholder coverage appropriate
- [ ] Contact information is current
- [ ] Category assignments are consistent

### Category 2: Interest-Influence Mapping Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Interests documented | All groups have interests mapped | |
| Concerns identified | Potential issues documented | |
| Influence assessed | High/Medium/Low assigned | |
| Matrix complete | All stakeholders in quadrants | |
| Strategies defined | Engagement approach per quadrant | |

**Validation Rules:**
- [ ] **CRITICAL:** Key decision-makers have high influence identified
- [ ] Interest mapping covers platform-relevant concerns
- [ ] Influence assessments are realistic
- [ ] Engagement strategies are actionable
- [ ] Conflicts of interest documented

### Category 3: Communication Plan Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Cadence defined | All categories have cadence | |
| Channels mapped | Primary/secondary channels assigned | |
| Templates available | Common communications templated | |
| Touchpoints scheduled | Regular meetings planned | |
| Escalation documented | Paths for urgency levels | |

**Validation Rules:**
- [ ] **CRITICAL:** Core stakeholders have regular touchpoints
- [ ] Channel selection is appropriate per stakeholder
- [ ] Templates cover critical communication types
- [ ] Escalation paths are realistic
- [ ] Timezone considerations addressed

### Category 4: RACI Matrix Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Architecture decisions covered | Tenant model, AI runtime, modules | |
| Operations decisions covered | Deployment, SLA, monitoring | |
| Product decisions covered | Features, tiers, roadmap | |
| Compliance decisions covered | Data residency, certifications | |
| One A per decision | No shared accountability | |

**Validation Rules:**
- [ ] **CRITICAL:** Every decision has exactly one Accountable
- [ ] All key platform decisions have RACI
- [ ] Responsible parties are capable
- [ ] Consulted parties are appropriate
- [ ] Informed parties receive updates

### Category 5: Governance Coverage

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Decision workflow defined | Stages documented | |
| Escalation paths clear | Who escalates to whom | |
| Dispute resolution documented | Process for disagreements | |
| Review schedule established | Regular governance reviews | |

**Validation Rules:**
- [ ] Decision workflow is practical
- [ ] Escalation timelines are realistic
- [ ] Dispute resolution has clear process
- [ ] Review cadence is appropriate

## Validation Summary

### Overall Assessment

| Category | Status | Critical Issues | Notes |
|----------|--------|-----------------|-------|
| Stakeholder Registry | | | |
| Interest-Influence Mapping | | | |
| Communication Plan | | | |
| RACI Matrix | | | |
| Governance Coverage | | | |

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
- **A1**: Deep-dive stakeholder registry validation
- **A2**: Analyze interest-influence mapping accuracy
- **A3**: Evaluate communication plan practicality
- **A4**: Assess RACI matrix coverage and consistency
- **A5**: Review governance coverage completeness
- **A6**: Analyze cross-stakeholder dependencies

### [P]ropose Changes
- **P1**: Propose stakeholder registry enhancements
- **P2**: Suggest interest-influence adjustments
- **P3**: Recommend communication plan improvements
- **P4**: Propose RACI reassignments
- **P5**: Suggest governance enhancements
- **P6**: Recommend escalation path updates

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

- Stakeholder Map Validation Report
- List of critical issues
- Improvement recommendations
- Overall pass/fail/conditional status

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the final validation report.

## QG-SD1 Exit Gate Verification

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-SD1`

### QG-SD1 Required Patterns

| Pattern | Required | Status | Evidence |
|---------|----------|--------|----------|
| `stakeholders_identified` | **YES** | [ ] Pass / [ ] Fail | Stakeholder registry complete |
| `interests_mapped` | **YES** | [ ] Pass / [ ] Fail | Category 2 validation above |
| `communication_planned` | **YES** | [ ] Pass / [ ] Fail | Category 3 validation above |
| `raci_defined` | **YES** | [ ] Pass / [ ] Fail | Category 4 validation above |

**QG-SD1 Stakeholder Discovery Gate:** [ ] SATISFIED / [ ] NOT SATISFIED

### Gate Decision

- **PASS**: All QG-SD1 required patterns satisfied, all critical checks pass
- **CONDITIONAL**: Non-critical gaps with mitigation plan documented
- **FAIL**: Any QG-SD1 critical pattern fails, requires remediation

If validation fails, document issues and recommend Edit mode to address gaps.
