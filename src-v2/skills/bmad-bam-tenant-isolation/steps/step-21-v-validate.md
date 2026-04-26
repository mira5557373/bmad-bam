# Step 21: Validate Tenant Isolation Design (QG-M2)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER skip CRITICAL checks** - All CRITICAL categories must be verified
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol
- 🔍 **Verify current best practices** with web search before finalizing

## EXECUTION PROTOCOLS

- 🎯 Focus: Execute QG-M2 validation checks against tenant isolation artifact
- 💾 Track: `stepsCompleted: [20, 21]` when complete
- 📖 Context: Each check produces PASS, CONDITIONAL, FAIL, or WAIVED
- 🚫 Do NOT: Skip any CRITICAL check; CRITICAL failures block progress
- 🔍 Use web search: Verify isolation patterns against current best practices
- ⚠️ Gate: QG-M2 - Any CRITICAL failure triggers recovery protocol

---

## Purpose

Execute systematic validation of the tenant isolation design against QG-M2 quality gate criteria. Verify all 8 isolation dimensions, context propagation, and sharing rules meet CRITICAL requirements.

---

## Prerequisites

- Step 20 completed: Artifact and checklist loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv` → filter: {tenant_model}
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m2.md`

---

## YOUR TASK

Execute all QG-M2 validation checks against the loaded tenant isolation artifact. Document each check result with evidence. Calculate the final gate decision based on CRITICAL and non-critical check outcomes.

---

## Validation Sequence

### Action 1: Validate Database Level (CRITICAL)

Execute checks from QG-M2 Database Level category:

| Check | Status | Evidence |
|-------|--------|----------|
| All tenant tables have tenant_id column | [ ] | |
| RLS policies created for all tenant tables | [ ] | |
| RLS policies enabled on all tenant tables | [ ] | |
| Bypass policy for admin roles documented | [ ] | |
| Cross-tenant query test fails appropriately | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: RLS partial coverage
- FAIL threshold: Cross-tenant query succeeds

### Action 2: Validate Application Level (CRITICAL)

Execute checks from QG-M2 Application Level category:

| Check | Status | Evidence |
|-------|--------|----------|
| Tenant context middleware implemented | [ ] | |
| JWT tenant_id claim extraction working | [ ] | |
| Database session tenant context set | [ ] | |
| Async job context propagation verified | [ ] | |
| API endpoints reject missing tenant context | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Middleware incomplete
- FAIL threshold: Missing tenant context enforcement

### Action 3: Validate Vector Store Level (CRITICAL)

Execute checks from QG-M2 Vector Store Level category:

| Check | Status | Evidence |
|-------|--------|----------|
| Collection tenant strategy implemented | [ ] | |
| Query filter injection verified | [ ] | |
| Cross-tenant retrieval blocked | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Filter injection partial
- FAIL threshold: Cross-tenant retrieval possible

### Action 4: Validate Cache Level (CRITICAL)

Execute checks from QG-M2 Cache Level category:

| Check | Status | Evidence |
|-------|--------|----------|
| Cache keys include tenant prefix | [ ] | |
| No cross-tenant cache pollution | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Key prefix inconsistent
- FAIL threshold: Cache key collision possible

### Action 5: Validate Memory Level (CRITICAL)

Execute checks from QG-M2 Memory Level category:

| Check | Status | Evidence |
|-------|--------|----------|
| Session memory isolated per conversation | [ ] | |
| User memory isolated per user+tenant | [ ] | |
| Tenant memory isolated per tenant | [ ] | |
| Global memory access audited | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Memory scope partial
- FAIL threshold: Memory scope leak detected

### Action 6: Validate Background Jobs (Non-Critical)

Execute checks from QG-M2 Background Jobs category:

| Check | Status | Evidence |
|-------|--------|----------|
| All jobs receive tenant context | [ ] | |
| Job results scoped to tenant | [ ] | |

**Non-Critical:** Does not block gate pass, but should be addressed.

### Action 7: Validate Audit (Non-Critical)

Execute checks from QG-M2 Audit category:

| Check | Status | Evidence |
|-------|--------|----------|
| Tenant actions logged | [ ] | |
| Cross-tenant access attempts logged | [ ] | |

**Non-Critical:** Does not block gate pass, but required for compliance.

### Action 8: Validate 8-Dimension Completeness

Verify all 8 isolation dimensions have explicit isolation levels:

| Dimension | Isolation Level | Tier Variations | Status |
|-----------|-----------------|-----------------|--------|
| Data | {RLS/Schema/Database} | {Free/Pro/Enterprise} | [ ] |
| Cache | {Tenant-prefixed} | | [ ] |
| Storage | {Tenant-scoped paths} | | [ ] |
| Compute | {Shared/Pooled/Dedicated} | | [ ] |
| Network | {Shared VPC/Dedicated} | | [ ] |
| API | {Tenant context header} | | [ ] |
| Events | {Tenant-scoped topics} | | [ ] |
| Logs | {Tenant ID injection} | | [ ] |

**CRITICAL:** All 8 dimensions must have explicit isolation level defined.

### Action 9: Web Research Verification

**Verify current best practices with web search:**

Search the web: "PostgreSQL RLS multi-tenant best practices {date}"
Search the web: "multi-tenant cache isolation Redis patterns {date}"
Search the web: "vector store tenant isolation patterns {date}"

Document findings and compare against artifact design:

_Source: [URL]_

---

## Quality Gate Integration

### Calculate Gate Decision

Aggregate all check results:

| Category | Classification | Checks Passed | Checks Total | Result |
|----------|----------------|---------------|--------------|--------|
| Database Level | CRITICAL | /5 | | |
| Application Level | CRITICAL | /5 | | |
| Vector Store Level | CRITICAL | /3 | | |
| Cache Level | CRITICAL | /2 | | |
| Memory Level | CRITICAL | /4 | | |
| Background Jobs | Non-critical | /2 | | |
| Audit | Non-critical | /2 | | |
| **CRITICAL Total** | | /19 | | |
| **Non-Critical Total** | | /4 | | |

### Gate Decision Rules

| Outcome | Criteria |
|---------|----------|
| **PASS** | All CRITICAL pass (19/19), ≥80% non-critical (≥4/4 or 3/4) |
| **CONDITIONAL** | All CRITICAL pass, <80% non-critical - remediation plan required |
| **FAIL** | Any CRITICAL check fails - block until resolved |
| **WAIVED** | Non-critical item waived with stakeholder sign-off |

### Recovery Protocol (If FAIL)

**3-Attempt Rule for CRITICAL Failures:**

**Attempt 1:** Immediate remediation (target: 1-2 days)
- Identify failed CRITICAL categories
- Review RLS policy definitions
- Verify tenant context middleware
- Execute cross-tenant isolation test suite
- Re-run QG-M2 validation after fixes
- **Lock passed categories** - do not re-test

**Attempt 2:** Deep investigation (target: 1-2 days)
- Engage Security team and database specialists
- Analyze cross-tenant query test failures
- Review JWT tenant_id claim extraction logic
- Verify async job context propagation
- Re-run QG-M2 validation after remediation
- **Preserve locked categories** from Attempt 1

**Attempt 3 FAIL:** Mandatory Course Correction
- Escalate to Security Lead and Platform Architect
- Document isolation gaps with evidence
- Conduct security-focused architecture review
- Consider tenant model change (e.g., RLS to schema-per-tenant)
- Create remediation plan with security sign-off
- Schedule penetration test for isolation validation

---

## COLLABORATION MENUS (A/P/C)

After completing validation, present options:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific failed checks
- **P (Party Mode)**: Security and architect review of validation findings
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
- Context: "Review QG-M2 validation results for tenant isolation"
- Present security perspectives on CRITICAL failures
- Return to A/P/C menu

#### If 'C' (Continue):
- Document gate decision
- Proceed to `step-22-v-report.md`

---

## SUCCESS METRICS

- ✅ All 7 QG-M2 categories validated with evidence
- ✅ All 8 isolation dimensions verified complete
- ✅ CRITICAL check results documented
- ✅ Non-critical check results documented
- ✅ Gate decision calculated correctly
- ✅ Web research verification completed
- ✅ Recovery protocol activated (if FAIL)

---

## FAILURE MODES

- ❌ **CRITICAL category fails:** Enter recovery protocol, document gaps
- ❌ **Missing evidence:** Cannot validate without evidence
- ❌ **Dimension incomplete:** 8-dimension matrix incomplete
- ❌ **Recovery attempt exhausted:** Escalate to mandatory course correction

---

## Verification

- [ ] Database Level checks completed
- [ ] Application Level checks completed
- [ ] Vector Store Level checks completed
- [ ] Cache Level checks completed
- [ ] Memory Level checks completed
- [ ] Background Jobs checks completed
- [ ] Audit checks completed
- [ ] 8-dimension completeness verified
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

Proceed to `step-22-v-report.md` to generate the formal QG-M2 validation report documenting all findings and the gate decision.
