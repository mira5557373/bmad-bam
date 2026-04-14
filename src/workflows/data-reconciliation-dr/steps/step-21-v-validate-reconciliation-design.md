# Step 2: Validate Reconciliation Design Completeness

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

Perform comprehensive validation of the data reconciliation design against completeness criteria, pattern alignment, and DR readiness requirements.

## Prerequisites

- Reconciliation design loaded (Step 20)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: data-integrity
- **Load checklist:** `{project-root}/_bmad/bam/checklists/production-readiness.md`

## Validation Categories

### Category 1: Reconciliation Scope Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Critical data assets identified | All critical assets listed | |
| Priority tiers defined | P1-P4 tiers documented | |
| Data source mappings complete | All assets have sources | |
| Scope boundaries clear | In/out of scope defined | |
| Tier-specific requirements | Free/Pro/Enterprise covered | |

**Validation Rules:**
- [ ] All critical data assets from DR plan included
- [ ] Priority tiers align with RTO objectives
- [ ] Data source mappings are accurate
- [ ] Scope exclusions are justified

### Category 2: Verification Procedures Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Verification methods defined | Methods for all data types | |
| Method-to-data mapping complete | All assets have methods | |
| Tolerances specified | Thresholds documented | |
| Checklists created | P1-P3 checklists exist | |
| Manual steps documented | All manual steps listed | |
| Workflow defined | Phases documented | |

**Validation Rules:**
- [ ] **CRITICAL:** Verification methods support RPO validation
- [ ] Tolerances are realistic and achievable
- [ ] Manual steps have owners assigned
- [ ] Workflow phases have time estimates

### Category 3: Automated Checks Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Check types defined | All check types documented | |
| Scheduling configured | Normal and post-failover | |
| Alert thresholds set | Warning and critical | |
| Notification structure defined | All fields documented | |
| Automated remediation rules | Non-critical rules defined | |
| Check infrastructure specified | All components listed | |

**Validation Rules:**
- [ ] **CRITICAL:** Check scheduling supports SLA requirements
- [ ] Alert thresholds prevent false positives/negatives
- [ ] Automated remediation is safe (non-destructive)
- [ ] Infrastructure can support check load

### Category 4: Remediation Procedures Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Remediation categories defined | All categories covered | |
| Resolution procedures documented | Steps per category | |
| Rollback options defined | Multiple rollback types | |
| Escalation procedures complete | All levels documented | |
| Sign-off requirements clear | Approval levels defined | |
| Runbooks created | Index and structure | |

**Validation Rules:**
- [ ] **CRITICAL:** Remediation procedures prevent data loss
- [ ] Rollback options cover all scenarios
- [ ] Escalation paths have valid contacts
- [ ] Sign-off requirements are realistic

### Category 5: DR Integration

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| DR plan alignment | Scope matches DR plan | |
| RTO/RPO support | Reconciliation within targets | |
| Failover integration | Post-failover triggers defined | |
| Testing compatibility | Can test with DR drills | |

**Validation Rules:**
- [ ] Reconciliation scope covers DR plan data assets
- [ ] Reconciliation time within RTO targets
- [ ] Verification supports RPO validation
- [ ] Can be tested during DR drills

### Category 6: Tenant Isolation

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Per-tenant reconciliation | Tenant-aware checks | |
| Tenant prioritization | Enterprise first | |
| Tenant notification | Tier-appropriate alerts | |
| Tenant reporting | Per-tenant status | |

**Validation Rules:**
- [ ] **CRITICAL:** Reconciliation respects tenant isolation
- [ ] Enterprise tenants have priority verification
- [ ] Tenant-specific alerts configured
- [ ] Per-tenant reconciliation reports available

## Validation Summary

### Overall Assessment

| Category | Status | Critical Issues | Notes |
|----------|--------|-----------------|-------|
| Reconciliation Scope | | | |
| Verification Procedures | | | |
| Automated Checks | | | |
| Remediation Procedures | | | |
| DR Integration | | | |
| Tenant Isolation | | | |

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
- **A1**: Deep-dive reconciliation scope validation
- **A2**: Analyze verification procedures completeness
- **A3**: Evaluate automated check configuration
- **A4**: Assess remediation procedures safety
- **A5**: Review DR integration alignment
- **A6**: Analyze tenant isolation compliance

### [P]ropose Changes
- **P1**: Propose reconciliation scope adjustments
- **P2**: Suggest verification procedure improvements
- **P3**: Recommend automated check updates
- **P4**: Propose remediation procedure enhancements
- **P5**: Suggest DR integration fixes
- **P6**: Recommend tenant isolation improvements

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

- Reconciliation Design Validation Report
- List of critical issues
- Improvement recommendations
- Overall pass/fail/conditional status
- **Load template:** `{project-root}/_bmad/bam/templates/data-reconciliation-dr-template.md`

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.

## QG-REC1 Exit Gate Verification

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-REC1`

### QG-REC1 Required Patterns

| Pattern | Required | Status | Evidence |
|---------|----------|--------|----------|
| `reconciliation_scope_defined` | **YES** | [ ] Pass / [ ] Fail | Category 1 validation above |
| `verification_procedures_designed` | **YES** | [ ] Pass / [ ] Fail | Category 2 validation above |
| `automated_checks_configured` | **YES** | [ ] Pass / [ ] Fail | Category 3 validation above |
| `remediation_procedures_defined` | **YES** | [ ] Pass / [ ] Fail | Category 4 validation above |
| `tenant_isolation_verified` | **YES** | [ ] Pass / [ ] Fail | Category 6 validation above |

**QG-REC1 Data Reconciliation Gate:** [ ] SATISFIED / [ ] NOT SATISFIED

### Gate Decision

- **PASS**: All QG-REC1 required patterns satisfied, all critical checks pass
- **CONDITIONAL**: Non-critical gaps with mitigation plan documented
- **FAIL**: Any QG-REC1 critical pattern fails, requires remediation

If validation fails, document issues and recommend Edit mode to address gaps.
