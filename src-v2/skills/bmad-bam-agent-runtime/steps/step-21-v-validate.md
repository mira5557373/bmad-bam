# Step 21: Validate Agent Runtime Architecture (QG-M3)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER skip CRITICAL checks** - All CRITICAL categories must be verified
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol
- 🔍 **Verify current best practices** with web search before finalizing

## EXECUTION PROTOCOLS

- 🎯 Focus: Execute QG-M3 validation checks against agent runtime artifact
- 💾 Track: `stepsCompleted: [20, 21]` when complete
- 📖 Context: Each check produces PASS, CONDITIONAL, FAIL, or WAIVED
- 🚫 Do NOT: Skip any CRITICAL check; CRITICAL failures block progress
- 🔍 Use web search: Verify AI runtime patterns against current best practices
- ⚠️ Gate: QG-M3 - Any CRITICAL failure triggers recovery protocol

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

Execute systematic validation of the agent runtime architecture against QG-M3 quality gate criteria. Verify orchestration, tool registry, memory tiers, and kill switches meet CRITICAL requirements for tenant-safe agent operations.

---

## Prerequisites

- Step 20 completed: Artifact and checklist loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv` → filter: {ai_runtime}
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3.md`

---

## YOUR TASK

Execute all QG-M3 validation checks against the loaded agent runtime artifact. Document each check result with evidence. Calculate the final gate decision based on CRITICAL and non-critical check outcomes.

---

## Validation Sequence

### Action 1: Validate Orchestration (CRITICAL)

Execute checks from QG-M3 Orchestration category:

| Check | Status | Evidence |
|-------|--------|----------|
| Orchestration pattern documented | [ ] | |
| Pattern justified for use case | [ ] | |
| Agent topology defined | [ ] | |
| AI runtime patterns verified current | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Pattern undocumented
- FAIL threshold: No orchestration defined

### Action 2: Validate Tool Registry (CRITICAL)

Execute checks from QG-M3 Tool Registry category:

| Check | Status | Evidence |
|-------|--------|----------|
| Tool catalog structure implemented | [ ] | |
| All tools registered with schemas | [ ] | |
| Permission model implemented | [ ] | |
| Policy engine operational | [ ] | |
| Tools are tenant-scoped | [ ] | |
| Cross-tenant tool access blocked | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Schema validation partial
- FAIL threshold: No tool registry or cross-tenant access possible

### Action 3: Validate Memory Tiers (CRITICAL)

Execute checks from QG-M3 Memory Tiers category:

| Check | Status | Evidence |
|-------|--------|----------|
| Session memory store configured | [ ] | |
| User memory store configured | [ ] | |
| Tenant memory store configured | [ ] | |
| Global memory store configured (if needed) | [ ] | |
| Scope enforcement implemented | [ ] | |
| No cross-tenant memory access | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Scope enforcement partial
- FAIL threshold: Memory scope leak detected

### Action 4: Validate Kill Switch (CRITICAL)

Execute checks from QG-M3 Kill Switch category:

| Check | Status | Evidence |
|-------|--------|----------|
| Feature flag integration complete | [ ] | |
| Circuit breaker configured | [ ] | |
| Manual override mechanism available | [ ] | |
| All agents have kill switch coverage | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Circuit breaker partial
- FAIL threshold: No kill switch mechanism

### Action 5: Validate Approval Workflow (Non-Critical)

Execute checks from QG-M3 Approval Workflow category:

| Check | Status | Evidence |
|-------|--------|----------|
| Approval triggers defined | [ ] | |
| Queue implementation complete | [ ] | |
| Timeout handling implemented | [ ] | |
| Escalation rules configured | [ ] | |

**Non-Critical:** Does not block gate pass, but should be addressed.

### Action 6: Validate Evaluation Foundation (Non-Critical)

Execute checks from QG-M3 Evaluation Foundation category:

| Check | Status | Evidence |
|-------|--------|----------|
| Metric definitions complete | [ ] | |
| Threshold configuration available | [ ] | |
| Golden task template ready | [ ] | |

**Non-Critical:** Does not block gate pass, but required for quality measurement.

### Action 7: Validate Agent Tenant Isolation (CRITICAL)

Verify all agent operations are tenant-scoped:

| Agent | Operations Tenant-Scoped | Memory Tenant-Isolated | Tools Tenant-Filtered | Status |
|-------|--------------------------|------------------------|----------------------|--------|
| | [ ] | [ ] | [ ] | |

**CRITICAL:** All agents must operate within tenant boundaries.

### Action 8: Web Research Verification

**Verify current best practices with web search:**

Search the web: "AI agent orchestration patterns {date}"
Search the web: "multi-tenant agent memory isolation patterns {date}"
Search the web: "{ai_runtime} best practices production {date}"

Document findings and compare against artifact design:

_Source: [URL]_

---

## Quality Gate Integration

### Calculate Gate Decision

Aggregate all check results:

| Category | Classification | Checks Passed | Checks Total | Result |
|----------|----------------|---------------|--------------|--------|
| Orchestration | CRITICAL | /4 | | |
| Tool Registry | CRITICAL | /6 | | |
| Memory Tiers | CRITICAL | /6 | | |
| Kill Switch | CRITICAL | /4 | | |
| Approval Workflow | Non-critical | /4 | | |
| Evaluation Foundation | Non-critical | /3 | | |
| Agent Tenant Isolation | CRITICAL | /per-agent | | |
| **CRITICAL Total** | | /20+ | | |
| **Non-Critical Total** | | /7 | | |

### Gate Decision Rules

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
- Review orchestration pattern and agent topology
- Verify tool registry tenant isolation
- Test memory tier scope enforcement
- Check kill switch functionality
- Re-run QG-M3 validation after fixes
- **Lock passed categories** - do not re-test

**Attempt 2:** Deep investigation (target: 1 week)
- Engage AI Runtime Architect (Nova) for architecture review
- Review orchestration pattern against runtime requirements
- Audit memory store configurations for all tiers
- Verify circuit breaker and feature flag integration
- Test agent operations across tenant boundaries
- Re-run QG-M3 validation after remediation
- **Preserve locked categories** from Attempt 1

**Attempt 3 FAIL:** Mandatory Course Correction
- Escalate to project leadership and Platform Architect
- Document runtime blockers in ADR (Architecture Decision Record)
- Reassess AI runtime selection if pattern fundamentally incompatible
- Consider phased module development with reduced agent capabilities
- Schedule penetration test for isolation validation

---

## COLLABORATION MENUS (A/P/C)

After completing validation, present options:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific failed checks
- **P (Party Mode)**: AI runtime and security architect review of findings
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
- Context: "Review QG-M3 validation results for agent runtime"
- Present AI runtime and security perspectives on CRITICAL failures
- Return to A/P/C menu

#### If 'C' (Continue):
- Document gate decision
- Proceed to `step-22-v-report.md`

---

## SUCCESS METRICS

- ✅ All QG-M3 categories validated with evidence
- ✅ Agent tenant isolation verified for all agents
- ✅ CRITICAL check results documented
- ✅ Non-critical check results documented
- ✅ Gate decision calculated correctly
- ✅ Web research verification completed
- ✅ Recovery protocol activated (if FAIL)

---

## FAILURE MODES

- ❌ **CRITICAL category fails:** Enter recovery protocol, document gaps
- ❌ **Missing evidence:** Cannot validate without evidence
- ❌ **Agent tenant leak:** Cross-tenant agent state detected
- ❌ **Recovery attempt exhausted:** Escalate to mandatory course correction

---

## Verification

- [ ] Orchestration checks completed
- [ ] Tool Registry checks completed
- [ ] Memory Tiers checks completed
- [ ] Kill Switch checks completed
- [ ] Approval Workflow checks completed
- [ ] Evaluation Foundation checks completed
- [ ] Agent tenant isolation verified
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

Proceed to `step-22-v-report.md` to generate the formal QG-M3 validation report documenting all findings and the gate decision.
