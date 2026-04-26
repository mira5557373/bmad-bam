# Step 21: Validate Module Architecture Design (QG-M1)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER skip CRITICAL checks** - All CRITICAL categories must be verified
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol
- 🔍 **Verify current best practices** with web search before finalizing

## EXECUTION PROTOCOLS

- 🎯 Focus: Execute QG-M1 validation checks against module architecture artifact
- 💾 Track: `stepsCompleted: [20, 21]` when complete
- 📖 Context: Each check produces PASS, CONDITIONAL, FAIL, or WAIVED
- 🚫 Do NOT: Skip any CRITICAL check; CRITICAL failures block progress
- 🔍 Use web search: Verify module patterns against current best practices
- ⚠️ Gate: QG-M1 - Any CRITICAL failure triggers recovery protocol

---

## Purpose

Execute systematic validation of the module architecture against QG-M1 quality gate criteria. Verify module boundary, public API contracts, dependencies, and tenant context meet CRITICAL requirements.

---

## Prerequisites

- Step 20 completed: Artifact and checklist loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` --> filter: module-*
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m1.md`

---

## YOUR TASK

Execute all QG-M1 validation checks against the loaded module architecture artifact. Document each check result with evidence. Calculate the final gate decision based on CRITICAL and non-critical check outcomes.

---

## Validation Sequence

### Action 1: Validate Module Boundary (CRITICAL)

Execute checks from QG-M1 Module Boundary category:

| Check | Status | Evidence |
|-------|--------|----------|
| Module has single clear responsibility | [ ] | |
| Responsibility documented and scoped | [ ] | |
| Boundary does not overlap other modules | [ ] | |
| Module name reflects responsibility | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Responsibility unclear
- FAIL threshold: No defined responsibility or boundary overlap

### Action 2: Validate Public API Contracts (CRITICAL)

Execute checks from QG-M1 API category:

| Check | Status | Evidence |
|-------|--------|----------|
| Facade contract is well-defined | [ ] | |
| All public endpoints documented | [ ] | |
| Input/output schemas specified | [ ] | |
| Error codes and handling defined | [ ] | |
| Contract versioning strategy present | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Partial documentation
- FAIL threshold: No facade contract defined

### Action 3: Validate Dependencies (CRITICAL)

Execute checks from QG-M1 Dependencies category:

| Check | Status | Evidence |
|-------|--------|----------|
| Dependencies are through facades only | [ ] | |
| No circular dependencies exist | [ ] | |
| Dependencies are explicit and minimal | [ ] | |
| No tight coupling to external modules | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Some loose coupling issues
- FAIL threshold: Direct dependencies bypass facades

### Action 4: Validate Tenant Context (CRITICAL)

Execute checks from QG-M1 Tenant Context category:

| Check | Status | Evidence |
|-------|--------|----------|
| Tenant context requirements identified | [ ] | |
| Context propagation defined | [ ] | |
| Multi-tenant data access scoped | [ ] | |
| Tenant isolation maintained in module | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Partial context integration
- FAIL threshold: No tenant context consideration

### Action 5: Validate Internal Structure (Non-Critical)

Execute checks from QG-M1 Internal Structure category:

| Check | Status | Evidence |
|-------|--------|----------|
| Internal layers follow clean architecture | [ ] | |
| Domain/Application/Infrastructure separated | [ ] | |
| No internal circular dependencies | [ ] | |
| Component responsibilities clear | [ ] | |

**Non-Critical:** Does not block gate pass, but should be addressed.

### Action 6: Validate Events (Non-Critical)

Execute checks from QG-M1 Events category:

| Check | Status | Evidence |
|-------|--------|----------|
| Events documented | [ ] | |
| Event contracts specified | [ ] | |
| Publishing/subscribing patterns defined | [ ] | |

**Non-Critical:** Does not block gate pass, but required for integration.

### Action 7: Validate Testing Strategy (Non-Critical)

Execute checks from QG-M1 Testing category:

| Check | Status | Evidence |
|-------|--------|----------|
| Testing strategy defined | [ ] | |
| Unit test coverage targets set | [ ] | |
| Integration test approach documented | [ ] | |
| Contract test strategy present | [ ] | |

**Non-Critical:** Does not block gate pass, but required for quality.

### Action 8: Web Research Verification

**Verify current best practices with web search:**

Search the web: "module architecture best practices modular monolith {date}"
Search the web: "facade pattern API design {date}"
Search the web: "dependency management microservices {date}"

Document findings and compare against artifact design:

_Source: [URL]_

---

## Quality Gate Integration

### Calculate Gate Decision

Aggregate all check results:

| Category | Classification | Checks Passed | Checks Total | Result |
|----------|----------------|---------------|--------------|--------|
| Module Boundary | CRITICAL | /4 | | |
| Public API Contracts | CRITICAL | /5 | | |
| Dependencies | CRITICAL | /4 | | |
| Tenant Context | CRITICAL | /4 | | |
| Internal Structure | Non-critical | /4 | | |
| Events | Non-critical | /3 | | |
| Testing Strategy | Non-critical | /4 | | |
| **CRITICAL Total** | | /17 | | |
| **Non-Critical Total** | | /11 | | |

### Gate Decision Rules

| Outcome | Criteria |
|---------|----------|
| **PASS** | All CRITICAL pass (17/17), >=80% non-critical (>=9/11) |
| **CONDITIONAL** | All CRITICAL pass, <80% non-critical - remediation plan required |
| **FAIL** | Any CRITICAL check fails - block until resolved |
| **WAIVED** | Non-critical item waived with stakeholder sign-off |

### Recovery Protocol (If FAIL)

**3-Attempt Rule for CRITICAL Failures:**

**Attempt 1:** Immediate remediation (target: 1-2 days)
- Identify failed CRITICAL categories
- Review module boundary definition
- Verify facade contract completeness
- Check dependency direction
- Re-run QG-M1 validation after fixes
- **Lock passed categories** - do not re-test

**Attempt 2:** Deep investigation (target: 1-2 days)
- Engage Senior Architect and module owner
- Analyze boundary overlap issues
- Review dependency graph
- Verify tenant context propagation
- Re-run QG-M1 validation after remediation
- **Preserve locked categories** from Attempt 1

**Attempt 3 FAIL:** Mandatory Course Correction
- Escalate to Platform Architect and Tech Lead
- Document architecture gaps with evidence
- Conduct architecture review session
- Consider module split or merge
- Create remediation plan with architect sign-off
- Schedule architecture review before proceeding

---

## COLLABORATION MENUS (A/P/C)

After completing validation, present options:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific failed checks
- **P (Party Mode)**: Architecture review of validation findings
- **C (Continue)**: Proceed to generate validation report
- **[Specific concerns]**: Describe concerns about validation results

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: failed checks, CRITICAL categories, evidence gaps
- Explore root causes and remediation approaches
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review QG-M1 validation results for module architecture"
- Present architect perspectives on CRITICAL failures
- Return to A/P/C menu

#### If 'C' (Continue):
- Document gate decision
- Proceed to `step-22-v-report.md`

---

## SUCCESS METRICS

- ✅ All 7 QG-M1 categories validated with evidence
- ✅ Module boundary verified complete
- ✅ CRITICAL check results documented
- ✅ Non-critical check results documented
- ✅ Gate decision calculated correctly
- ✅ Web research verification completed
- ✅ Recovery protocol activated (if FAIL)

---

## FAILURE MODES

- ❌ **CRITICAL category fails:** Enter recovery protocol, document gaps
- ❌ **Missing evidence:** Cannot validate without evidence
- ❌ **Boundary incomplete:** Module boundary not defined
- ❌ **Recovery attempt exhausted:** Escalate to mandatory course correction

---

## Verification

- [ ] Module Boundary checks completed
- [ ] Public API Contract checks completed
- [ ] Dependencies checks completed
- [ ] Tenant Context checks completed
- [ ] Internal Structure checks completed
- [ ] Events checks completed
- [ ] Testing Strategy checks completed
- [ ] Gate decision calculated
- [ ] Web research verification completed

---

## Outputs

- Validation checklist results with evidence
- Gate decision: PASS / CONDITIONAL / FAIL
- List of issues found (if any)
- Recovery protocol status (if FAIL)

---

## NEXT STEP

Proceed to `step-22-v-report.md` to generate the formal QG-M1 validation report documenting all findings and the gate decision.
