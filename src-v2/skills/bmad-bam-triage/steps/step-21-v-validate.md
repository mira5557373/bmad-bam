# Step 21: Execute Validation Checks (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and report before continuing

## EXECUTION PROTOCOLS

- 🎯 Focus: Execute QG-PL1 validation checks
- 💾 Track: `stepsCompleted: [20, 21]` when complete
- 📖 Context: Validate against QG-PL1 criteria
- 🚫 Do NOT: Generate report (that's Step 22)

---

## Purpose

Execute the QG-PL1 (Planning Gate) validation checks against the triage report. Each check is evaluated and documented with evidence.

---

## Prerequisites

- Step 20 completed: Artifact and checklist loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: validation
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-pl1.md`

---

## Inputs

- Loaded triage report from Step 20
- QG-PL1 checklist criteria
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK

Execute all 8 QG-PL1 validation checks against the triage report: verify module coverage, complexity scoring completeness across all 5 dimensions, priority assignments, dependency mapping without cycles, phase definitions, timeline estimates, resource allocation, and risk documentation. Document evidence for each check and determine the preliminary gate decision (PASS/CONDITIONAL/FAIL).

---

## Validation Sequence

### 1. Module Coverage (CRITICAL)

**Check PL1-01:** All modules from requirements are present in triage.

| Requirement Module | In Triage | Status |
|--------------------|-----------|--------|
| {{module}} | YES/NO | PASS/FAIL |

**Evidence:** {{count}} of {{total}} modules present
**Status:** PASS / FAIL

### 2. Complexity Scoring (CRITICAL)

**Check PL1-02:** All five complexity dimensions scored for each module.

| Module | Technical | Business | Integration | Multi-Tenant | AI | Complete |
|--------|-----------|----------|-------------|--------------|----|----|
| {{module}} | YES/NO | YES/NO | YES/NO | YES/NO | YES/NO | PASS/FAIL |

**Evidence:** {{count}} of {{total}} modules fully scored
**Status:** PASS / FAIL

### 3. Prioritization (CRITICAL)

**Check PL1-03:** All modules have priority assignments.

| Module | Priority Assigned | Valid Range (1-N) | Status |
|--------|-------------------|-------------------|--------|
| {{module}} | YES/NO | YES/NO | PASS/FAIL |

**Evidence:** {{count}} of {{total}} priorities assigned
**Status:** PASS / FAIL

### 4. Dependency Mapping (CRITICAL)

**Check PL1-04:** Dependencies documented for all modules.

| Module | Dependencies Listed | No Circular Deps | Status |
|--------|--------------------|--------------------|--------|
| {{module}} | YES/NO | YES/NO | PASS/FAIL |

**Evidence:** Dependency graph complete, no cycles detected
**Status:** PASS / FAIL

### 5. Phase Definition (Standard)

**Check PL1-05:** Implementation phases defined.

| Criterion | Present | Valid | Status |
|-----------|---------|-------|--------|
| Phase structure defined | YES/NO | YES/NO | PASS/FAIL |
| Modules assigned to phases | YES/NO | YES/NO | PASS/FAIL |
| Phase milestones defined | YES/NO | YES/NO | PASS/FAIL |
| Exit criteria specified | YES/NO | YES/NO | PASS/FAIL |

**Evidence:** {{phases}} phases defined with {{pct}}% coverage
**Status:** PASS / FAIL

### 6. Timeline Estimation (Standard)

**Check PL1-06:** Duration estimates provided.

| Criterion | Present | Reasonable | Status |
|-----------|---------|------------|--------|
| Module durations estimated | YES/NO | YES/NO | PASS/FAIL |
| Phase totals calculated | YES/NO | YES/NO | PASS/FAIL |
| Critical path identified | YES/NO | YES/NO | PASS/FAIL |
| Go-live dates projected | YES/NO | YES/NO | PASS/FAIL |

**Evidence:** Total duration {{weeks}} weeks, critical path defined
**Status:** PASS / FAIL

### 7. Resource Estimation (Standard)

**Check PL1-07:** Resource requirements documented.

| Criterion | Present | Reasonable | Status |
|-----------|---------|------------|--------|
| Team size estimated | YES/NO | YES/NO | PASS/FAIL |
| Key roles identified | YES/NO | YES/NO | PASS/FAIL |
| Skills requirements listed | YES/NO | YES/NO | PASS/FAIL |
| Parallel workstreams planned | YES/NO | YES/NO | PASS/FAIL |

**Evidence:** Team size {{min}}-{{max}}, {{streams}} parallel streams
**Status:** PASS / FAIL

### 8. Risk Documentation (Standard)

**Check PL1-08:** Risks identified and mitigated.

| Criterion | Present | Complete | Status |
|-----------|---------|----------|--------|
| Technical risks documented | YES/NO | YES/NO | PASS/FAIL |
| Business risks documented | YES/NO | YES/NO | PASS/FAIL |
| Mitigation strategies defined | YES/NO | YES/NO | PASS/FAIL |
| Contingency plans noted | YES/NO | YES/NO | PASS/FAIL |

**Evidence:** {{count}} risks documented with mitigations
**Status:** PASS / FAIL

---

## Validation Summary

| Check | Category | Status | Critical |
|-------|----------|--------|----------|
| PL1-01 | Module Coverage | PASS/FAIL | YES |
| PL1-02 | Complexity Scoring | PASS/FAIL | YES |
| PL1-03 | Prioritization | PASS/FAIL | YES |
| PL1-04 | Dependency Mapping | PASS/FAIL | YES |
| PL1-05 | Phase Definition | PASS/FAIL | NO |
| PL1-06 | Timeline Estimation | PASS/FAIL | NO |
| PL1-07 | Resource Estimation | PASS/FAIL | NO |
| PL1-08 | Risk Documentation | PASS/FAIL | NO |

**Critical Checks:** {{passed}}/4 passed
**Standard Checks:** {{passed}}/4 passed
**Total Checks:** {{passed}}/8 passed

---

## Preliminary Gate Decision

Based on validation results:

| Outcome | Criteria | Applies |
|---------|----------|---------|
| **PASS** | All critical pass, all standard pass | YES/NO |
| **CONDITIONAL** | All critical pass, some standard fail | YES/NO |
| **FAIL** | Any critical fails | YES/NO |

**Preliminary Decision:** {{outcome}}

---

## SUCCESS METRICS

- ✅ All 4 critical checks (PL1-01 through PL1-04) executed with evidence
- ✅ All 4 standard checks (PL1-05 through PL1-08) executed with evidence
- ✅ Module coverage verified against requirements source
- ✅ All 5 complexity dimensions scored for each module
- ✅ No circular dependencies detected in dependency graph
- ✅ Preliminary gate decision determined based on results
- ✅ Issues identified and documented for report generation

---

## FAILURE MODES

- ❌ **Critical check fails:** HALT validation, document failure, preliminary decision = FAIL
- ❌ **Missing module coverage:** Cannot pass PL1-01, list missing modules
- ❌ **Incomplete scoring:** Cannot pass PL1-02, list modules with missing dimensions
- ❌ **Circular dependency:** Cannot pass PL1-04, show cycle path
- ❌ **Standard check fails:** Note failure, preliminary decision may be CONDITIONAL

---

## Verification

- [ ] All 8 checks executed
- [ ] Evidence documented for each check
- [ ] Preliminary decision determined
- [ ] Issues identified for report

---

## Outputs

- Validation results for all checks
- Evidence documentation
- Preliminary gate decision

---

## Next Step

Proceed to `step-22-v-report.md` to generate the validation report.
