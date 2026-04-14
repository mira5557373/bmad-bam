# Step 2: Validate DR Plan Completeness

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

Perform comprehensive validation of the disaster recovery plan against completeness criteria, pattern alignment, and operational readiness requirements.

## Prerequisites

- DR plan loaded (Step 20)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: disaster-recovery
- **Load checklist:** `{project-root}/_bmad/bam/checklists/production-readiness.md`

## Validation Categories

### Category 1: RTO/RPO Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| RTO defined for all tiers | Free, Pro, Enterprise have RTO | |
| RPO defined for all tiers | Free, Pro, Enterprise have RPO | |
| Service criticality mapped | Critical, Standard, Non-critical defined | |
| SLA alignment verified | RTO/RPO within SLA bounds | |
| Recovery priorities documented | P1-P5 services listed with dependencies | |

**Validation Rules:**
- [ ] RTO values are realistic (Enterprise < Pro < Free)
- [ ] RPO values align with backup frequency
- [ ] SLA uptime percentage matches RTO allowance
- [ ] All tenant tiers have complete coverage

### Category 2: Backup Strategy Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Backup types defined | Full, incremental, CDC per tier | |
| Frequency specified | Schedule for each backup type | |
| Retention documented | Days/months per tier | |
| Storage locations | Primary and secondary regions | |
| Encryption configured | AES-256 minimum | |
| Verification procedures | Automated + manual tests | |

**Validation Rules:**
- [ ] **CRITICAL:** Backup frequency supports RPO targets
- [ ] Multi-region storage for Pro/Enterprise tiers
- [ ] All data types covered (PostgreSQL, Redis, Qdrant, S3, etc.)
- [ ] Tenant isolation maintained in backup/restore
- [ ] Retention meets compliance requirements

### Category 3: Failover Architecture Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| All components mapped | DB, cache, storage, DNS covered | |
| Failover triggers defined | Health checks with thresholds | |
| Automatic vs manual clear | Per component and tier | |
| Failover procedures documented | Step-by-step with owners | |
| Failback procedures documented | Return to primary process | |
| Replication monitoring | Lag alerts and thresholds | |

**Validation Rules:**
- [ ] **CRITICAL:** Failover time supports RTO targets
- [ ] Enterprise tier has automatic failover
- [ ] Pro tier has cross-region capability
- [ ] Failback procedure prevents data loss
- [ ] Health check intervals are appropriate

### Category 4: Recovery Procedures Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| All phases documented | Initial, Triage, Execution, Validation, Return | |
| Steps have owners | Each step assigned to role | |
| Checkpoints defined | Verification at each phase | |
| Duration estimates | Time expectations per phase | |
| Dependencies clear | What enables each step | |

**Validation Rules:**
- [ ] Total recovery time within RTO bounds
- [ ] No orphan steps (all have predecessors/successors)
- [ ] Owner roles are realistic and available
- [ ] Checkpoints are verifiable
- [ ] Escalation paths defined

### Category 5: Testing and Maintenance

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Testing schedule defined | Quarterly minimum | |
| Test types specified | Tabletop, component, partial, full | |
| Acceptance criteria clear | RTO/RPO achievement thresholds | |
| Test history tracking | Previous results documented | |
| Plan review schedule | Annual minimum | |

**Validation Rules:**
- [ ] Enterprise tier has monthly testing minimum
- [ ] Full DR test annually minimum
- [ ] Test results inform plan updates
- [ ] Next review date is within 12 months

### Category 6: Communication Plan

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| DR team contacts complete | Primary and backup for all roles | |
| Internal channels defined | Per audience and frequency | |
| External notification clear | Per tenant tier and trigger | |
| Templates available | Pre-approved messages | |
| Escalation paths documented | When to escalate and to whom | |

**Validation Rules:**
- [ ] Contact information is current
- [ ] Multiple contact methods available
- [ ] Enterprise tenants have direct contact path
- [ ] Status page integration defined

## Validation Summary

### Overall Assessment

| Category | Status | Critical Issues | Notes |
|----------|--------|-----------------|-------|
| RTO/RPO Completeness | | | |
| Backup Strategy | | | |
| Failover Architecture | | | |
| Recovery Procedures | | | |
| Testing & Maintenance | | | |
| Communication Plan | | | |

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
- **A1**: Deep-dive RTO/RPO validation against SLA requirements
- **A2**: Analyze backup strategy alignment with RPO targets
- **A3**: Evaluate failover architecture against RTO requirements
- **A4**: Assess recovery procedure completeness and ownership
- **A5**: Review testing schedule and acceptance criteria
- **A6**: Analyze communication plan coverage

### [P]ropose Changes
- **P1**: Propose RTO/RPO adjustments based on validation findings
- **P2**: Suggest backup strategy improvements
- **P3**: Recommend failover architecture enhancements
- **P4**: Propose recovery procedure refinements
- **P5**: Suggest testing schedule modifications
- **P6**: Recommend communication plan updates

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

- DR Plan Validation Report
- List of critical issues
- Improvement recommendations
- Overall pass/fail/conditional status

## Next Step

This completes the Validate mode. If validation passed, the DR plan is ready for operational use. If validation failed or returned conditional status, enter Edit mode via `step-10-e-load-dr-plan.md` to address identified gaps.

## QG-DR1 Exit Gate Verification

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-DR1`

### QG-DR1 Required Patterns

| Pattern | Required | Status | Evidence |
|---------|----------|--------|----------|
| `dr_plan_documented` | **YES** | [ ] Pass / [ ] Fail | DR plan document with all phases |
| `rto_rpo_defined` | **YES** | [ ] Pass / [ ] Fail | Category 1 validation above |
| `failover_tested` | **YES** | [ ] Pass / [ ] Fail | Category 3 validation above |
| `recovery_validated` | **YES** | [ ] Pass / [ ] Fail | Category 5 testing schedule |
| `runbook_verified` | NO | [ ] Pass / [ ] Fail | Category 4 recovery procedures |

**QG-DR1 verification_tests (from CSV):** failover_tested, recovery_validated

**QG-DR1 Disaster Recovery Gate:** [ ] SATISFIED / [ ] NOT SATISFIED

### Gate Decision

- **PASS**: All QG-DR1 required patterns satisfied, all critical checks pass
- **CONDITIONAL**: Non-critical gaps with mitigation plan documented
- **FAIL**: Any QG-DR1 critical pattern fails, requires remediation

If validation fails, document issues and recommend Edit mode to address gaps.
