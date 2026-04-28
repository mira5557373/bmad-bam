# Step 21: Validate Caching Design (QG-M2 Cache Dimension)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER skip CRITICAL checks** - All CRITICAL categories must be verified
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol
- 🔍 **Verify current best practices** with web search before finalizing

## EXECUTION PROTOCOLS

- 🎯 Focus: Execute QG-M2 cache validation checks against caching design
- 💾 Track: `stepsCompleted: [20, 21]` when complete
- 📖 Context: Each check produces PASS, CONDITIONAL, FAIL, or WAIVED
- 🚫 Do NOT: Skip any CRITICAL check; CRITICAL failures block progress
- 🔍 Use web search: Verify caching patterns against current best practices
- ⚠️ Gate: QG-M2 - Any CRITICAL failure triggers recovery protocol

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading artifact and checklist
- Evaluating against criteria
- Documenting evidence

**OUT OF SCOPE:**
- Modifying the artifact
- Creating new content
## Purpose

Execute systematic validation of the caching design against QG-M2 cache dimension criteria. Verify all cache layers, key patterns, TTL policies, and invalidation strategies meet CRITICAL requirements for tenant isolation.

---

## Prerequisites

- Step 20 completed: Artifact and checklist loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `caching-*`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m2.md` (cache dimension)

---

## YOUR TASK

Execute all QG-M2 cache dimension validation checks against the loaded caching design artifact. Document each check result with evidence. Calculate the final gate decision based on CRITICAL and non-critical check outcomes.

---

## Validation Sequence

### Action 1: Validate Cache Key Isolation (CRITICAL)

Execute checks for tenant-prefixed cache keys:

| Check | Status | Evidence |
|-------|--------|----------|
| All keys include `tenant:{id}:` prefix | [ ] | |
| Session keys scoped to tenant | [ ] | |
| Entity keys scoped to tenant | [ ] | |
| Query keys scoped to tenant | [ ] | |
| No shared (non-tenant) keys for tenant data | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Partial key coverage
- FAIL threshold: Any tenant data in non-prefixed keys

### Action 2: Validate L1 Cache Isolation (CRITICAL)

Execute checks for in-memory cache isolation:

| Check | Status | Evidence |
|-------|--------|----------|
| L1 cache requires tenant context | [ ] | |
| Cache miss on absent tenant context | [ ] | |
| Process isolation documented | [ ] | |
| No cross-tenant reads possible | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Incomplete documentation
- FAIL threshold: Cross-tenant read possible

### Action 3: Validate L2 Cache Isolation (CRITICAL)

Execute checks for distributed cache isolation:

| Check | Status | Evidence |
|-------|--------|----------|
| All L2 keys include tenant prefix | [ ] | |
| No wildcard scans (KEYS *) documented | [ ] | |
| GET without tenant prefix blocked | [ ] | |
| Cross-tenant cache access prevented | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Missing enforcement details
- FAIL threshold: Cross-tenant access possible

### Action 4: Validate CDN Cache Isolation (CRITICAL)

Execute checks for CDN/edge cache isolation:

| Check | Status | Evidence |
|-------|--------|----------|
| Tenant header (X-Tenant-ID) required | [ ] | |
| Vary header includes tenant identifier | [ ] | |
| Private caching for tenant content | [ ] | |
| No shared tenant data with public cache | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Missing Vary header
- FAIL threshold: Tenant data with public cache

### Action 5: Validate Invalidation Strategy (CRITICAL)

Execute checks for event-driven invalidation:

| Check | Status | Evidence |
|-------|--------|----------|
| Event-driven invalidation configured | [ ] | |
| Entity events trigger cache invalidation | [ ] | |
| Tenant events trigger tenant-scoped invalidation | [ ] | |
| Invalidation scoped to tenant (no cross-tenant) | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Missing event types
- FAIL threshold: Cross-tenant invalidation possible

### Action 6: Validate TTL Policies (Non-Critical)

Execute checks for TTL policy configuration:

| Check | Status | Evidence |
|-------|--------|----------|
| TTL defined for all cache types | [ ] | |
| TTL varies by tier (Free/Pro/Enterprise) | [ ] | |
| L1 TTL <= L2 TTL (cache coherence) | [ ] | |

**Non-Critical:** Does not block gate pass, but should be addressed.

### Action 7: Validate Circuit Breaker (Non-Critical)

Execute checks for fault tolerance:

| Check | Status | Evidence |
|-------|--------|----------|
| Circuit breaker configured | [ ] | |
| Failure thresholds defined | [ ] | |
| Fallback behavior documented | [ ] | |

**Non-Critical:** Does not block gate pass, but improves reliability.

### Action 8: Validate Performance Monitoring (Non-Critical)

Execute checks for observability:

| Check | Status | Evidence |
|-------|--------|----------|
| Hit rate metrics by tenant | [ ] | |
| Hit rate targets by tier | [ ] | |
| Memory allocation by tier | [ ] | |
| Eviction policy documented | [ ] | |

**Non-Critical:** Does not block gate pass, required for operations.

### Action 9: Web Research Verification

**Verify current best practices with web search:**

Search the web: "Redis multi-tenant cache isolation best practices {date}"
Search the web: "CDN tenant isolation Vary header {date}"
Search the web: "cache invalidation event-driven patterns {date}"

Document findings and compare against artifact design:

_Source: [URL]_

---

## Quality Gate Integration

### Calculate Gate Decision

Aggregate all check results:

| Category | Classification | Checks Passed | Checks Total | Result |
|----------|----------------|---------------|--------------|--------|
| Cache Key Isolation | CRITICAL | /5 | | |
| L1 Cache Isolation | CRITICAL | /4 | | |
| L2 Cache Isolation | CRITICAL | /4 | | |
| CDN Cache Isolation | CRITICAL | /4 | | |
| Invalidation Strategy | CRITICAL | /4 | | |
| TTL Policies | Non-critical | /3 | | |
| Circuit Breaker | Non-critical | /3 | | |
| Performance Monitoring | Non-critical | /4 | | |
| **CRITICAL Total** | | /21 | | |
| **Non-Critical Total** | | /10 | | |

### Gate Decision Rules

| Outcome | Criteria |
|---------|----------|
| **PASS** | All CRITICAL pass (21/21), >=80% non-critical (>=8/10) |
| **CONDITIONAL** | All CRITICAL pass, <80% non-critical - remediation plan required |
| **FAIL** | Any CRITICAL check fails - block until resolved |
| **WAIVED** | Non-critical item waived with stakeholder sign-off |

### Recovery Protocol (If FAIL)

**3-Attempt Rule for CRITICAL Failures:**

**Attempt 1:** Immediate remediation (target: 1-2 days)
- Identify failed CRITICAL categories
- Review cache key patterns
- Verify tenant prefix enforcement
- Re-run QG-M2 cache validation after fixes
- **Lock passed categories** - do not re-test

**Attempt 2:** Deep investigation (target: 1-2 days)
- Engage Security team and caching specialists
- Analyze cross-tenant cache access tests
- Review invalidation event coverage
- Verify CDN Vary header configuration
- Re-run QG-M2 cache validation after remediation
- **Preserve locked categories** from Attempt 1

**Attempt 3 FAIL:** Mandatory Course Correction
- Escalate to Security Lead and Platform Architect
- Document cache isolation gaps with evidence
- Conduct security-focused architecture review
- Consider alternative caching strategy
- Create remediation plan with security sign-off
- Schedule penetration test for cache isolation

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
- Context: "Review QG-M2 cache validation results"
- Present security perspectives on CRITICAL failures
- Return to A/P/C menu

#### If 'C' (Continue):
- Document gate decision
- Proceed to `step-22-v-report.md`

---

## SUCCESS METRICS

- ✅ All 8 QG-M2 cache categories validated with evidence
- ✅ All cache layers verified for isolation
- ✅ CRITICAL check results documented
- ✅ Non-critical check results documented
- ✅ Gate decision calculated correctly
- ✅ Web research verification completed
- ✅ Recovery protocol activated (if FAIL)

---

## FAILURE MODES

- ❌ **CRITICAL category fails:** Enter recovery protocol, document gaps
- ❌ **Missing evidence:** Cannot validate without evidence
- ❌ **Cache layer incomplete:** Design missing required components
- ❌ **Recovery attempt exhausted:** Escalate to mandatory course correction

---

## Verification

- [ ] Cache Key Isolation checks completed
- [ ] L1 Cache Isolation checks completed
- [ ] L2 Cache Isolation checks completed
- [ ] CDN Cache Isolation checks completed
- [ ] Invalidation Strategy checks completed
- [ ] TTL Policies checks completed
- [ ] Circuit Breaker checks completed
- [ ] Performance Monitoring checks completed
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

Proceed to `step-22-v-report.md` to generate the formal QG-M2 cache dimension validation report documenting all findings and the gate decision.
