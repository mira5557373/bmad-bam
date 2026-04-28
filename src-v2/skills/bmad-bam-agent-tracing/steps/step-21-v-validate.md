# Step 21: Validate Tracing Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 **Focus:** Execute quality gate validation checks
- 💾 **Track:** `stepsCompleted: 21` when complete
- 📖 **Context:** Validate mode - checking against QG-M3, QG-I2, QG-P1 criteria
- 🚫 **Do NOT:** Skip critical checks or generate report in this step


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading artifact and checklist
- Evaluating against criteria
- Documenting evidence

**OUT OF SCOPE:**
- Modifying the artifact
- Creating new content
## YOUR TASK

Execute all QG-M3 and QG-I2 validation checks against the loaded agent tracing design artifact. Document each check result with evidence. Verify span hierarchies, tenant context propagation, sampling strategies, and token metrics. Calculate the final gate decision based on CRITICAL and non-critical check outcomes.

---

## Purpose

Validate agent tracing design specification against quality gate criteria.

---

## Prerequisites

- Step 20 completed (artifact loaded)
- Quality gate checklists available

---

## Actions

### 1. Validate Trace Schema (QG-M3.1)

- [ ] **CRITICAL:** All agent operations have defined spans
- [ ] **CRITICAL:** Span naming follows conventions
- [ ] **CRITICAL:** Token metrics defined for LLM spans
- [ ] Event types documented
- [ ] Attribute schema complete

### 2. Validate Tenant Isolation (QG-I2)

- [ ] **CRITICAL:** `tenant_id` required on ALL spans
- [ ] **CRITICAL:** Tenant isolation in query layer
- [ ] **CRITICAL:** No cross-tenant data leakage possible
- [ ] Tenant tier affects retention/limits
- [ ] Tenant context propagation defined

### 3. Validate Context Propagation (QG-M3.2)

- [ ] **CRITICAL:** Cross-agent context defined
- [ ] **CRITICAL:** Tool execution captures context
- [ ] Context preserved across async boundaries
- [ ] External API calls include context
- [ ] Baggage contents specified

### 4. Validate Analysis Capabilities (QG-P1)

- [ ] **CRITICAL:** Tenant-scoped queries defined
- [ ] **CRITICAL:** Error tracking designed
- [ ] Latency dashboards specified
- [ ] Alert rules documented
- [ ] Performance comparison supported

### 5. Validate Cost Integration

- [ ] Token usage tracked per span
- [ ] Cost attributes defined
- [ ] Cost aggregation by tenant
- [ ] Budget alert integration

### 6. Validate Implementation Plan

- [ ] Phases defined with dependencies
- [ ] Effort estimates provided
- [ ] Risk assessment included
- [ ] Quality gate alignment documented

---

## Validation Results

| Check | Status | Notes |
|-------|--------|-------|
| QG-M3.1 Trace Schema | PASS/FAIL | |
| QG-I2 Tenant Isolation | PASS/FAIL | |
| QG-M3.2 Context Propagation | PASS/FAIL | |
| QG-P1 Analysis Capabilities | PASS/FAIL | |
| Cost Integration | PASS/FAIL | |
| Implementation Plan | PASS/FAIL | |

---

## SUCCESS METRICS

- ✅ All 6 QG-M3 categories validated with evidence
- ✅ All QG-I2 tenant isolation checks verified
- ✅ Span hierarchy consistency validated
- ✅ Tenant context propagation verified across all span types
- ✅ Sampling strategy validated against platform capabilities
- ✅ Token metrics aligned with LLM span definitions
- ✅ Gate decision calculated correctly
- ✅ Web research verification completed

---

## FAILURE MODES

- ❌ **CRITICAL category fails:** Enter recovery protocol, document gaps
- ❌ **Missing tenant_id on spans:** Cannot validate without tenant context
- ❌ **Span hierarchy broken:** Parent-child relationships inconsistent
- ❌ **Sampling config invalid:** Rates exceed OpenTelemetry limits
- ❌ **Recovery attempt exhausted:** Escalate to mandatory course correction

---

## Verification

- [ ] All QG-M3 checks performed
- [ ] All QG-I2 checks performed
- [ ] All QG-P1 checks performed
- [ ] Results documented

---

## Outputs

- Validation results per check
- List of failures (if any)
- Remediation recommendations

---

## Next Step

Proceed to `step-22-v-report.md` to generate validation report.
