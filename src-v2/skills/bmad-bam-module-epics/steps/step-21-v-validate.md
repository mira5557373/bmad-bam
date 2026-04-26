# Step 21: Validate Epic Document

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER skip CRITICAL checks** - All CRITICAL categories must be verified
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol
- 🔍 **Verify tenant context** in all stories

## EXECUTION PROTOCOLS

- 🎯 Focus: Execute validation checks against epic document
- 💾 Track: `stepsCompleted: [20, 21]` when complete
- 📖 Context: Each check produces PASS, CONDITIONAL, FAIL, or WAIVED
- 🚫 Do NOT: Skip any CRITICAL check; CRITICAL failures block progress
- 🔍 Use web search: Verify epic validation patterns against current best practices
- ⚠️ Gate: Any CRITICAL failure triggers recovery protocol

---

## Purpose

Execute systematic validation of the epic document against quality criteria. Verify epic structure, story completeness, tenant context, sprint allocation, and done criteria meet CRITICAL requirements for implementation readiness.

---

## Prerequisites

- Step 20 completed: Document and checklist loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: epic-*

---

## YOUR TASK

Execute all validation checks against the loaded epic document. Document each check result with evidence. Calculate the final validation decision based on CRITICAL and non-critical check outcomes.

---

## Main Sequence

### Action 1: Validate Epic Structure (CRITICAL)

Execute checks for epic structure:

| Check | Status | Evidence |
|-------|--------|----------|
| All epics have epic ID | [ ] | |
| All epics have title | [ ] | |
| All epics have category | [ ] | |
| All epics have priority | [ ] | |
| All epics have acceptance criteria | [ ] | |
| All epics have tenant considerations | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Minor section missing
- FAIL threshold: Epic without ID or acceptance criteria

### Action 2: Validate Story Completeness (CRITICAL)

Execute checks for story completeness:

| Check | Status | Evidence |
|-------|--------|----------|
| All stories have story ID | [ ] | |
| All stories have user story format | [ ] | |
| All stories have acceptance criteria | [ ] | |
| All stories reference parent epic | [ ] | |
| All stories have estimation | [ ] | |

**Story Format Validation:**

| Story ID | User Story | Acceptance Criteria | Estimation | Status |
|----------|------------|---------------------|------------|--------|
| S-{module}-001-01 | [ ] | [ ] | [ ] | |
| S-{module}-001-02 | [ ] | [ ] | [ ] | |
| S-{module}-002-01 | [ ] | [ ] | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Missing estimation
- FAIL threshold: Missing acceptance criteria

### Action 3: Validate Tenant Context (CRITICAL)

Execute checks for tenant context in all stories:

| Check | Status | Evidence |
|-------|--------|----------|
| All stories have tenant scope defined | [ ] | |
| All stories have tier availability | [ ] | |
| All stories have data isolation specified | [ ] | |
| All stories have tenant acceptance criteria | [ ] | |

**Tenant Context per Story:**

| Story ID | Tenant Scope | Tier Availability | Data Isolation | Tenant AC | Status |
|----------|--------------|-------------------|----------------|-----------|--------|
| S-{module}-001-01 | [ ] | [ ] | [ ] | [ ] | |
| S-{module}-001-02 | [ ] | [ ] | [ ] | [ ] | |
| S-{module}-002-01 | [ ] | [ ] | [ ] | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Tenant scope implicit but not explicit
- FAIL threshold: Story missing tenant context entirely

### Action 4: Validate Estimation (Non-Critical)

Execute checks for estimation completeness:

| Check | Status | Evidence |
|-------|--------|----------|
| All stories have point estimate | [ ] | |
| Estimates use Fibonacci scale | [ ] | |
| No stories estimated > 13 points | [ ] | |
| Total points calculated correctly | [ ] | |

**Estimation Summary:**

| Metric | Expected | Actual | Status |
|--------|----------|--------|--------|
| Stories with estimates | {total} | {actual} | |
| Fibonacci scale used | Yes | {actual} | |
| Max story size | <= 13 | {max} | |
| Total points | {expected} | {actual} | |

**Non-Critical:** Does not block validation pass, but should be addressed.

### Action 5: Validate Sprint Allocation (Non-Critical)

Execute checks for sprint allocation:

| Check | Status | Evidence |
|-------|--------|----------|
| All stories allocated to sprints | [ ] | |
| Sprint velocity respected | [ ] | |
| Dependencies ordered correctly | [ ] | |
| No sprint over capacity | [ ] | |

**Sprint Allocation Summary:**

| Sprint | Stories | Points | Capacity | Buffer | Status |
|--------|---------|--------|----------|--------|--------|
| Sprint 1 | {count} | {pts} | {cap} | {buf} | |
| Sprint 2 | {count} | {pts} | {cap} | {buf} | |
| Sprint 3 | {count} | {pts} | {cap} | {buf} | |

**Dependency Order Validation:**

| Story | Depends On | Sprint | Dependency Sprint | Valid |
|-------|------------|--------|-------------------|-------|
| S-002-01 | S-001-01 | 2 | 1 | YES/NO |
| S-003-01 | S-002-01 | 3 | 2 | YES/NO |

**Non-Critical:** Does not block validation pass, but should be addressed.

### Action 6: Validate Done Criteria (CRITICAL)

Execute checks for done criteria:

| Check | Status | Evidence |
|-------|--------|----------|
| Definition of Done exists | [ ] | |
| Quality gates mapped | [ ] | |
| Test coverage thresholds defined | [ ] | |
| Documentation requirements specified | [ ] | |
| Review checkpoints established | [ ] | |
| Tenant isolation in DoD | [ ] | |

**Quality Gate Mapping:**

| Story Type | Quality Gates | CRITICAL Checks | Status |
|------------|---------------|-----------------|--------|
| Core | QG-M1, QG-M2 | Tenant isolation | |
| Integration | QG-I1, QG-I2 | Facade compliance | |
| AI/Agent | QG-M3, QG-I3 | Agent isolation | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Minor criteria missing
- FAIL threshold: No DoD or missing tenant isolation criteria

### Action 7: Validate Dependencies (Non-Critical)

Execute checks for dependency mapping:

| Check | Status | Evidence |
|-------|--------|----------|
| Epic dependencies documented | [ ] | |
| Story dependencies documented | [ ] | |
| No circular dependencies | [ ] | |
| Cross-module dependencies identified | [ ] | |

**Non-Critical:** Does not block validation pass, but should be addressed.

### Action 8: Web Research Verification

**Verify current best practices with web search:**

Search the web: "epic validation best practices agile {date}"
Search the web: "user story quality criteria {date}"
Search the web: "multi-tenant story validation {date}"

Document findings and compare against validation criteria:

_Source: [URL]_

---

## Quality Gate Integration

### Calculate Validation Decision

Aggregate all check results:

| Category | Classification | Checks Passed | Checks Total | Result |
|----------|----------------|---------------|--------------|--------|
| Epic Structure | CRITICAL | /6 | | |
| Story Completeness | CRITICAL | /5 | | |
| Tenant Context | CRITICAL | /4 per story | | |
| Estimation | Non-critical | /4 | | |
| Sprint Allocation | Non-critical | /4 | | |
| Done Criteria | CRITICAL | /6 | | |
| Dependencies | Non-critical | /4 | | |
| **CRITICAL Total** | | /{total} | | |
| **Non-Critical Total** | | /{total} | | |

### Validation Decision Rules

| Outcome | Criteria |
|---------|----------|
| **PASS** | All CRITICAL pass, non-critical documented |
| **CONDITIONAL** | All CRITICAL pass, non-critical gaps with remediation plan |
| **FAIL** | Any CRITICAL check fails - block until resolved |
| **WAIVED** | Non-critical item waived with stakeholder sign-off |

### Recovery Protocol (If FAIL)

**3-Attempt Rule for CRITICAL Failures:**

**Attempt 1:** Immediate remediation (target: 1-2 days)
- Identify failed CRITICAL categories
- Add missing epic structure
- Add tenant context to stories
- Update done criteria
- Re-run validation after fixes
- **Lock passed categories** - do not re-test

**Attempt 2:** Deep investigation (target: 1 week)
- Review with Product Owner and Tech Lead
- Audit all stories for completeness
- Verify tenant model alignment
- Update quality gate mappings
- Re-run validation after remediation
- **Preserve locked categories** from Attempt 1

**Attempt 3 FAIL:** Mandatory Course Correction
- Escalate to project leadership
- Document epic planning blockers
- Consider running Create mode again
- Schedule planning workshop with full team

---

## COLLABORATION MENUS (A/P/C)

After completing validation, present options:

```
================================================================================
EPIC VALIDATION COMPLETE
================================================================================

VALIDATION DECISION: {PASS / CONDITIONAL / FAIL}

CRITICAL CHECKS:
- Epic Structure:     {PASS/FAIL}
- Story Completeness: {PASS/FAIL}
- Tenant Context:     {PASS/FAIL}
- Done Criteria:      {PASS/FAIL}

NON-CRITICAL CHECKS:
- Estimation:         {PASS/CONDITIONAL}
- Sprint Allocation:  {PASS/CONDITIONAL}
- Dependencies:       {PASS/CONDITIONAL}

================================================================================
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific failed checks
- **P (Party Mode)**: Product Owner and Tech Lead review of findings
- **C (Continue)**: Proceed to generate validation report

Select an option:
================================================================================
```

### If 'A' (Advanced Elicitation)

Invoke `bmad-advanced-elicitation` skill to explore:

| Topic | Questions to Explore |
|-------|---------------------|
| **Failed Checks** | What caused the failure? |
| **Remediation** | How to fix failed items? |
| **Tenant Context** | Why is tenant context missing? |
| **Estimation** | Are estimates accurate? |

Pass context: Validation results, failed checks, evidence gaps.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode)

Invoke `bmad-party-mode` skill with context:

```
Review epic validation results for module {module_name}:
- Decision: {PASS/CONDITIONAL/FAIL}
- CRITICAL passed: {count}/{total}
- Non-critical passed: {count}/{total}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| **Product Owner** | Scope | Are validation gaps acceptable? |
| **Tech Lead** | Quality | Can we proceed with conditions? |
| **QA Lead** | Testing | Are acceptance criteria sufficient? |
| **Scrum Master** | Process | Is the plan implementable? |

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue)

- Document validation decision
- Proceed to `step-22-v-report.md`

---

## SUCCESS METRICS

- ✅ All CRITICAL categories validated with evidence
- ✅ Tenant context verified for all stories
- ✅ CRITICAL check results documented
- ✅ Non-critical check results documented
- ✅ Validation decision calculated correctly
- ✅ Web research verification completed
- ✅ Recovery protocol activated (if FAIL)

---

## FAILURE MODES

- ❌ **CRITICAL category fails:** Enter recovery protocol, document gaps
- ❌ **Missing tenant context:** Add tenant context before proceeding
- ❌ **Stories without acceptance criteria:** Add criteria or reject stories
- ❌ **Recovery attempt exhausted:** Escalate to mandatory course correction

---

## Verification

- [ ] Epic structure checks completed
- [ ] Story completeness checks completed
- [ ] Tenant context checks completed
- [ ] Estimation checks completed
- [ ] Sprint allocation checks completed
- [ ] Done criteria checks completed
- [ ] Dependencies checks completed
- [ ] Validation decision calculated
- [ ] Web research verification completed

---

## Outputs

- Validation checklist results with evidence
- Validation decision: PASS / CONDITIONAL / FAIL
- List of issues found (if any)
- Recovery protocol status (if FAIL)

---

## NEXT STEP

Proceed to `step-22-v-report.md` to generate the formal validation report documenting all findings and the validation decision.
