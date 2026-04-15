# Step 2: Validate Execution Report Completeness

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

Perform comprehensive validation of the failover execution report against completeness criteria, accuracy requirements, and operational documentation standards.

## Prerequisites

- Execution report loaded (Step 20)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: disaster-recovery
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/production-readiness.md`

## Validation Categories

### Category 1: Timeline Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| All phases documented | Phases 1-4 have entries | |
| Timestamps present | All events have times | |
| Durations calculated | Phase durations recorded | |
| Sequence correct | Chronological order | |
| Milestones marked | Key events highlighted | |

**Validation Rules:**
- [ ] Timeline has no gaps longer than 5 minutes
- [ ] Total duration matches sum of phases
- [ ] Critical milestones clearly identified
- [ ] Start and end times documented

### Category 2: Validation Results Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Health checks documented | All services checked | |
| Service availability verified | All journeys tested | |
| Data integrity validated | All data types checked | |
| Tenant access confirmed | All tiers tested | |
| Performance compared | Baseline comparison done | |

**Validation Rules:**
- [ ] **CRITICAL:** All critical services have health check results
- [ ] Service availability tests cover critical paths
- [ ] Data integrity checks identify any data loss
- [ ] All tenant tiers have access verification
- [ ] Performance metrics compared to baseline

### Category 3: Exception Documentation

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| All exceptions logged | No undocumented issues | |
| Severity assigned | All have severity levels | |
| Impact described | Business impact clear | |
| Resolution documented | Fix actions recorded | |
| Root cause analyzed | Cause identified | |

**Validation Rules:**
- [ ] **CRITICAL:** All critical exceptions have resolutions
- [ ] Exception severity matches actual impact
- [ ] Root causes are actionable
- [ ] Prevention steps documented
- [ ] Time to resolution recorded

### Category 4: RTO/RPO Documentation

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| RTO targets listed | All tiers have targets | |
| RTO achieved documented | Actual times recorded | |
| RPO targets listed | All tiers have targets | |
| RPO achieved documented | Actual data loss recorded | |
| Gap analysis complete | Shortfalls explained | |

**Validation Rules:**
- [ ] RTO/RPO calculations are accurate
- [ ] All tiers have achievement status
- [ ] Gaps have improvement recommendations
- [ ] Metrics match timeline data
- [ ] SLA implications noted

### Category 5: Lessons Learned Quality

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| What went well documented | Positive outcomes listed | |
| Improvement areas identified | Gaps clearly stated | |
| Unexpected challenges noted | Surprises documented | |
| Team input incorporated | Multiple perspectives | |
| Actionable insights | Clear next steps | |

**Validation Rules:**
- [ ] Lessons are specific, not generic
- [ ] Both successes and failures captured
- [ ] Insights lead to recommendations
- [ ] Team participation evident
- [ ] Historical context referenced

### Category 6: Recommendations Actionability

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Recommendations present | Improvement items listed | |
| Owners assigned | Each has responsible party | |
| Priorities set | Urgency levels defined | |
| Deadlines assigned | Target dates specified | |
| DR plan updates linked | Changes to DR plan clear | |

**Validation Rules:**
- [ ] Recommendations are specific and measurable
- [ ] Owners have authority to implement
- [ ] Priorities reflect risk/impact
- [ ] Deadlines are realistic
- [ ] DR plan updates are comprehensive

## Validation Summary

### Overall Assessment

| Category | Status | Critical Issues | Notes |
|----------|--------|-----------------|-------|
| Timeline Completeness | | | |
| Validation Results | | | |
| Exception Documentation | | | |
| RTO/RPO Documentation | | | |
| Lessons Learned Quality | | | |
| Recommendations Actionability | | | |

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
- **A1**: Deep-dive timeline validation for accuracy
- **A2**: Analyze validation results completeness
- **A3**: Evaluate exception documentation quality
- **A4**: Assess RTO/RPO achievement accuracy
- **A5**: Review lessons learned comprehensiveness
- **A6**: Analyze recommendations actionability

### [P]ropose Changes
- **P1**: Propose timeline corrections or additions
- **P2**: Suggest validation result improvements
- **P3**: Recommend exception documentation enhancements
- **P4**: Propose RTO/RPO documentation refinements
- **P5**: Suggest lessons learned additions
- **P6**: Recommend recommendation refinements

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

- Execution Report Validation Report
- List of critical issues
- Improvement recommendations
- Overall pass/fail/conditional status

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report and determine workflow completion status.

## QG-FE1 Exit Gate Verification

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-FE1`

### QG-FE1 Required Patterns

| Pattern | Required | Status | Evidence |
|---------|----------|--------|----------|
| `readiness_verified` | **YES** | [ ] Pass / [ ] Fail | Pre-failover checks documented |
| `failover_executed` | **YES** | [ ] Pass / [ ] Fail | Execution timeline complete |
| `validation_passed` | **YES** | [ ] Pass / [ ] Fail | Category 2 validation above |
| `documentation_complete` | **YES** | [ ] Pass / [ ] Fail | All sections present |
| `dr_plan_updated` | NO | [ ] Pass / [ ] Fail | Recommendations documented |

**QG-FE1 verification_tests (from CSV):** readiness_verified, failover_executed, validation_passed

**QG-FE1 Failover Execution Gate:** [ ] SATISFIED / [ ] NOT SATISFIED

### Gate Decision

- **PASS**: All QG-FE1 required patterns satisfied, all critical checks pass
- **CONDITIONAL**: Non-critical gaps with mitigation plan documented
- **FAIL**: Any QG-FE1 critical pattern fails, requires remediation

If validation fails, document issues and recommend Edit mode to address gaps.
