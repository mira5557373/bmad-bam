# Step 21: Validate Debug Report

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Validate completeness and quality of the agent debug report against QG-AI1 (Agent Safety) criteria and established quality standards.

---

## YOUR TASK

Execute all QG-AI1 validation checks against the loaded debug report. Verify issue documentation, debug analysis, root cause identification, remediation plan, prevention measures, and tenant isolation compliance. Calculate the gate decision based on CRITICAL and non-critical check outcomes.

---

## Prerequisites

- Step 20 completed: Artifact loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `agent-safety`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i3-agent-safety.md`

---

## Actions

### 1. Validate Issue Documentation

- [ ] **CRITICAL:** Problem statement clearly defined
- [ ] Reproduction steps documented
- [ ] Expected vs actual behavior documented
- [ ] Severity level assigned and justified
- [ ] Affected scope (agents, tenants) identified

### 2. Validate Debug Analysis

- [ ] **CRITICAL:** Execution traces analyzed
- [ ] Timeline reconstructed with timestamps
- [ ] Token usage documented with budget comparison
- [ ] Decision points identified
- [ ] Tool invocation sequence traced
- [ ] Memory state captured (if relevant)

### 3. Validate Root Cause Analysis

- [ ] **CRITICAL:** Root cause identified with evidence
- [ ] Contributing factors documented
- [ ] Failure mode classified (prompt/tool/memory/context/isolation)
- [ ] Severity assessment justified
- [ ] Impact scope determined

### 4. Validate Remediation Plan

- [ ] **CRITICAL:** Immediate fix documented
- [ ] Long-term solution defined
- [ ] Implementation priority assigned
- [ ] Owner assigned for each action
- [ ] Timeline specified (immediate/short-term/long-term)
- [ ] Dependencies identified

### 5. Validate Prevention Measures

- [ ] Guard rails specified
- [ ] Monitoring improvements documented
- [ ] Alert conditions defined
- [ ] Escalation path documented
- [ ] Fallback behaviors specified

### 6. Validate Tenant Isolation

- [ ] **CRITICAL:** No cross-tenant data exposure confirmed
- [ ] Tenant context properly scoped
- [ ] RLS implications addressed
- [ ] Multi-tenant impact assessed

### 7. Calculate Gate Decision

Based on validation results:

| Outcome | Criteria |
|---------|----------|
| **PASS** | All CRITICAL checks pass, all sections complete |
| **CONDITIONAL** | All CRITICAL checks pass, non-critical gaps exist |
| **FAIL** | Any CRITICAL check fails |

**Gate Decision Matrix:**

| Check Category | CRITICAL Passed | Non-Critical Passed | Decision |
|----------------|-----------------|---------------------|----------|
| Issue Documentation | YES | YES | PASS candidate |
| Issue Documentation | YES | NO | CONDITIONAL candidate |
| Issue Documentation | NO | ANY | FAIL |
| Root Cause Analysis | YES | YES | PASS candidate |
| Root Cause Analysis | YES | NO | CONDITIONAL candidate |
| Root Cause Analysis | NO | ANY | FAIL |
| Remediation Plan | YES | YES | PASS candidate |
| Remediation Plan | YES | NO | CONDITIONAL candidate |
| Remediation Plan | NO | ANY | FAIL |
| Tenant Isolation | YES | ANY | Continue |
| Tenant Isolation | NO | ANY | FAIL (Critical) |

---

## SUCCESS METRICS

- ✅ All 6 validation categories executed
- ✅ CRITICAL checks identified and verified
- ✅ Tenant isolation validated (no cross-tenant exposure)
- ✅ Gate decision calculated correctly
- ✅ Issues documented with severity classification

---

## FAILURE MODES

- ❌ **CRITICAL check fails:** Enter recovery protocol, document gaps
- ❌ **Missing evidence:** Cannot validate without supporting data
- ❌ **Tenant isolation breach detected:** Automatic FAIL, immediate escalation
- ❌ **Incomplete debug analysis:** Cannot validate root cause

---

## Verification

- [ ] All CRITICAL validation checks completed
- [ ] All non-critical checks completed
- [ ] Gate decision calculated correctly
- [ ] Issues documented with remediation guidance
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation checklist results (all categories)
- Gate decision (PASS/CONDITIONAL/FAIL)
- List of issues found with severity
- Remediation guidance for any gaps

---

## Next Step

Proceed to `step-22-v-report.md` to generate the validation report.
