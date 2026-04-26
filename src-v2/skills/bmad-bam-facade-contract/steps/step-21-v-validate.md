# Step 21: Validate Facade Contract (QG-I1)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER skip CRITICAL checks** - All CRITICAL categories must be verified
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol
- 🔍 **Verify current best practices** with web search before finalizing

## EXECUTION PROTOCOLS

- 🎯 Focus: Execute QG-I1 validation checks against facade contract artifact
- 💾 Track: `stepsCompleted: [20, 21]` when complete
- 📖 Context: Each check produces PASS, CONDITIONAL, FAIL, or WAIVED
- 🚫 Do NOT: Skip any CRITICAL check; CRITICAL failures block progress
- 🔍 Use web search: Verify contract patterns against current best practices
- ⚠️ Gate: QG-I1 - Any CRITICAL failure triggers recovery protocol

---

## Purpose

Execute systematic validation of the facade contract against QG-I1 quality gate criteria. Verify contract completeness, tenant isolation, schema definitions, and integration safety.

---

## Prerequisites

- Step 20 completed: Artifact and checklist loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` --> filter: facade-*
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i1.md`

---

## YOUR TASK

Execute all QG-I1 validation checks against the loaded facade contract artifact. Document each check result with evidence. Calculate the final gate decision based on CRITICAL and non-critical check outcomes.

---

## Validation Sequence

### Action 1: Validate Contract Completeness (CRITICAL)

Execute checks from QG-I1 Contract Completeness category:

| Check | Status | Evidence |
|-------|--------|----------|
| Source/target modules identified | [ ] | |
| All required operations defined | [ ] | |
| Operation signatures complete | [ ] | |
| Contract version specified | [ ] | |
| Contract scope documented | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Minor operation details missing
- FAIL threshold: No operations defined or missing module pairing

### Action 2: Validate Tenant Context (CRITICAL)

Execute checks from QG-I1 Tenant Context category:

| Check | Status | Evidence |
|-------|--------|----------|
| TenantContext required on all operations | [ ] | |
| tenant_id field present in context | [ ] | |
| Cross-tenant access rejected (403) | [ ] | |
| Tenant validation at facade entry | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Tenant context incomplete
- FAIL threshold: Operations allow calls without TenantContext

### Action 3: Validate Event Tenant Isolation (CRITICAL)

Execute checks from QG-I1 Event Isolation category:

| Check | Status | Evidence |
|-------|--------|----------|
| All events include tenant_id in envelope | [ ] | |
| Event envelope structure documented | [ ] | |
| Consumer tenant validation required | [ ] | |
| DLQ handling preserves tenant_id | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: DLQ handling incomplete
- FAIL threshold: Events missing tenant_id in envelope

### Action 4: Validate Schema Definitions (CRITICAL)

Execute checks from QG-I1 Schema category:

| Check | Status | Evidence |
|-------|--------|----------|
| Input schemas defined for all operations | [ ] | |
| Output schemas defined for all operations | [ ] | |
| Field types and validation specified | [ ] | |
| Required vs optional fields marked | [ ] | |
| Event payload schemas complete | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Minor fields undocumented
- FAIL threshold: Operations without input/output schemas

### Action 5: Validate Error Contracts (Non-Critical)

Execute checks from QG-I1 Error Contracts category:

| Check | Status | Evidence |
|-------|--------|----------|
| Standard error codes defined | [ ] | |
| Error response structure documented | [ ] | |
| Cross-tenant error (403) specified | [ ] | |
| Retry guidance provided | [ ] | |

**Non-Critical:** Does not block gate pass, but should be addressed.

### Action 6: Validate Versioning (Non-Critical)

Execute checks from QG-I1 Versioning category:

| Check | Status | Evidence |
|-------|--------|----------|
| Contract version format defined | [ ] | |
| Breaking change policy documented | [ ] | |
| Backward compatibility rules stated | [ ] | |
| Deprecation process defined | [ ] | |

**Non-Critical:** Does not block gate pass, but required for evolution.

### Action 7: Validate Testing Strategy (Non-Critical)

Execute checks from QG-I1 Testing category:

| Check | Status | Evidence |
|-------|--------|----------|
| Contract test approach defined | [ ] | |
| Tenant isolation tests specified | [ ] | |
| Integration test scenarios listed | [ ] | |
| Consumer/provider test ownership clear | [ ] | |

**Non-Critical:** Does not block gate pass, but required for quality.

### Action 8: Web Research Verification

**Verify current best practices with web search:**

Search the web: "facade contract validation best practices {date}"
Search the web: "API contract testing multi-tenant {date}"
Search the web: "integration contract patterns modular monolith {date}"

Document findings and compare against artifact design:

_Source: [URL]_

---

## Quality Gate Integration

### Calculate Gate Decision

Aggregate all check results:

| Category | Classification | Checks Passed | Checks Total | Result |
|----------|----------------|---------------|--------------|--------|
| Contract Completeness | CRITICAL | /5 | | |
| Tenant Context | CRITICAL | /4 | | |
| Event Tenant Isolation | CRITICAL | /4 | | |
| Schema Definitions | CRITICAL | /5 | | |
| Error Contracts | Non-critical | /4 | | |
| Versioning | Non-critical | /4 | | |
| Testing Strategy | Non-critical | /4 | | |
| **CRITICAL Total** | | /18 | | |
| **Non-Critical Total** | | /12 | | |

### Gate Decision Rules

| Outcome | Criteria |
|---------|----------|
| **PASS** | All CRITICAL pass (18/18), >=80% non-critical (>=10/12) |
| **CONDITIONAL** | All CRITICAL pass, <80% non-critical - remediation plan required |
| **FAIL** | Any CRITICAL check fails - block until resolved |
| **WAIVED** | Non-critical item waived with stakeholder sign-off |

### Recovery Protocol (If FAIL)

**3-Attempt Rule for CRITICAL Failures:**

**Attempt 1:** Immediate remediation (target: 1-2 days)
- Identify failed CRITICAL categories
- Review contract completeness
- Verify tenant context requirements
- Add missing schemas
- Re-run QG-I1 validation after fixes
- **Lock passed categories** - do not re-test

**Attempt 2:** Deep investigation (target: 1-2 days)
- Engage Integration Architect and module owners
- Analyze contract gaps
- Review module architectures for alignment
- Verify tenant isolation end-to-end
- Re-run QG-I1 validation after remediation
- **Preserve locked categories** from Attempt 1

**Attempt 3 FAIL:** Mandatory Course Correction
- Escalate to Platform Architect and Tech Lead
- Document contract gaps with evidence
- Conduct integration architecture review
- Consider contract redesign
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
- Context: "Review QG-I1 validation results for facade contract"
- Present architect perspectives on CRITICAL failures
- Return to A/P/C menu

#### If 'C' (Continue):
- Document gate decision
- Proceed to `step-22-v-report.md`

---

## SUCCESS METRICS

- ✅ All 7 QG-I1 categories validated with evidence
- ✅ Contract completeness verified
- ✅ Tenant context enforcement verified
- ✅ Event isolation verified
- ✅ CRITICAL check results documented
- ✅ Non-critical check results documented
- ✅ Gate decision calculated correctly
- ✅ Web research verification completed
- ✅ Recovery protocol activated (if FAIL)

---

## FAILURE MODES

- ❌ **CRITICAL category fails:** Enter recovery protocol, document gaps
- ❌ **Missing evidence:** Cannot validate without evidence
- ❌ **Tenant context missing:** Critical isolation failure
- ❌ **Events without tenant_id:** Critical isolation failure
- ❌ **Recovery attempt exhausted:** Escalate to mandatory course correction

---

## Verification

- [ ] Contract Completeness checks completed
- [ ] Tenant Context checks completed
- [ ] Event Tenant Isolation checks completed
- [ ] Schema Definitions checks completed
- [ ] Error Contracts checks completed
- [ ] Versioning checks completed
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

Proceed to `step-22-v-report.md` to generate the formal QG-I1 validation report documenting all findings and the gate decision.
