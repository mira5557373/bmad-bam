# Step 4: Recovery Patterns

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
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Define recovery strategies including failure detection, automatic recovery, manual intervention triggers, state reconciliation, and audit/replay capabilities.

---

## Prerequisites

- Step 3 completed: Circuit breaker designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: recovery-patterns
- **Web research (if available):** Search for current agent recovery patterns

---

## Inputs

- Circuit breaker design from Step 3
- State sharing from Step 2
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Recovery requirements

---

## Actions

### 1. Design Failure Detection

Define failure identification:

| Failure Type | Detection Method | Detection Time |
|--------------|------------------|----------------|
| Agent Crash | Heartbeat timeout | 10-30s |
| Hung Agent | Progress timeout | 60-120s |
| Degraded Performance | SLO violation | Real-time |
| Data Corruption | Checksum mismatch | On read |
| State Loss | Version gap | On handoff |
| Network Partition | Connectivity check | 5-10s |

Detection Configuration:

| Component | Heartbeat | Timeout | Alert |
|-----------|-----------|---------|-------|
| Agent Process | 5s | 15s | Page on-call |
| Database | 10s | 30s | Alert team |
| Queue | 10s | 30s | Alert team |
| External API | 30s | 60s | Log + retry |

### 2. Implement Automatic Recovery

Define self-healing mechanisms:

| Failure | Recovery Action | Max Attempts | Escalation |
|---------|-----------------|--------------|------------|
| Agent Crash | Restart process | 3 | Human review |
| Memory Overflow | Restart + cleanup | 2 | Scale up |
| State Corruption | Restore checkpoint | 2 | Human review |
| Connection Lost | Reconnect | 5 | Circuit breaker |
| Rate Limited | Back off | 10 | Notify user |

Recovery Sequence:

| Step | Action | Timeout | On Failure |
|------|--------|---------|------------|
| 1 | Detect failure | Immediate | N/A |
| 2 | Isolate (circuit open) | 1s | Skip |
| 3 | Save current state | 5s | Log + continue |
| 4 | Attempt recovery | 30s | Next attempt |
| 5 | Verify recovery | 10s | Rollback |
| 6 | Resume (circuit close) | Immediate | Manual |

### 3. Define Manual Intervention Triggers

Specify human escalation:

| Trigger | Condition | SLA | Notification |
|---------|-----------|-----|--------------|
| Critical Failure | Core function down | 15 min | PagerDuty |
| Data Loss | State unrecoverable | 30 min | PagerDuty |
| Security Incident | Attack detected | Immediate | Security team |
| Compliance Risk | Policy violation | 1 hour | Compliance |
| User Escalation | Explicit request | 4 hours | Support |
| Multiple Failures | 3+ agents affected | 30 min | Ops team |

Escalation Path:

| Level | Responder | Response Time | Authority |
|-------|-----------|---------------|-----------|
| L1 | On-call SRE | 15 min | Restart, isolate |
| L2 | Team Lead | 30 min | Config change |
| L3 | Architect | 1 hour | Code change |
| L4 | Leadership | 2 hours | Strategic decision |

### 4. Design State Reconciliation

Define state recovery:

| Reconciliation Type | Trigger | Method |
|---------------------|---------|--------|
| Checkpoint Restore | State loss | Load last checkpoint |
| Event Replay | Partial loss | Replay from event log |
| State Merge | Divergence | Conflict resolution |
| Full Rebuild | Corruption | Reconstruct from source |

Reconciliation Configuration:

| Component | Checkpoint Interval | Retention | Recovery Time |
|-----------|---------------------|-----------|---------------|
| Conversation | Per message | 24 hours | <1s |
| Task State | Per step | 7 days | <5s |
| Agent Memory | Every 5 min | 30 days | <10s |
| User Preferences | On change | Indefinite | <1s |

### 5. Implement Audit Trail

Design audit logging:

| Event Type | Data Captured | Retention | Access |
|------------|---------------|-----------|--------|
| Handoff | From/to agent, state | 90 days | Ops |
| State Change | Before/after, actor | 90 days | Ops |
| Failure | Error, context, trace | 1 year | Ops/Dev |
| Recovery | Action, result | 1 year | Ops |
| Manual Intervention | Actor, action, reason | 7 years | Compliance |

Audit Log Schema:

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| timestamp | datetime | YES | Event time |
| event_type | enum | YES | Event category |
| tenant_id | string | YES | Isolation |
| agent_id | string | YES | Source |
| correlation_id | string | YES | Trace linking |
| action | string | YES | What happened |
| result | enum | YES | Success/failure |
| details | object | NO | Additional data |
| actor | string | NO | Human/system |

### 6. Design Replay Capability

Enable event replay:

| Replay Type | Purpose | Trigger |
|-------------|---------|---------|
| Debug Replay | Reproduce issues | Manual |
| Recovery Replay | State reconstruction | Auto |
| Audit Replay | Compliance review | Manual |
| Test Replay | Regression testing | CI/CD |

Replay Configuration:

| Setting | Value | Notes |
|---------|-------|-------|
| Event Retention | 30 days | Replay window |
| Replay Speed | 1x-100x | Configurable |
| State Isolation | Sandbox | No production impact |
| Output Capture | Full | For comparison |

**Verify current best practices with web search:**
Search the web: "agent recovery patterns production systems {date}"
Search the web: "distributed system state reconciliation {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-4 complete the agent handoff design.**

Present a summary:
- Handoff protocols with tenant context propagation
- State sharing with versioning and conflict resolution
- Circuit breakers with fallback hierarchy
- Recovery patterns with automatic and manual escalation

Ask for confirmation before generating final output document.

---

## COLLABORATION MENUS (A/P/C):

After completing the recovery patterns design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into recovery scenarios and escalation
- **P (Party Mode)**: Bring SRE and platform engineering perspectives
- **C (Continue)**: Accept recovery patterns and generate final output
- **[Specific refinements]**: Describe recovery concerns to address

Select an option:
```

#### If 'C' (Continue):
- Generate final agent handoff architecture document
- Save to `{output_folder}/planning-artifacts/architecture/agent-handoff-architecture.md`
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Mark Create mode complete

---

## Verification

- [ ] Failure detection mechanisms defined
- [ ] Automatic recovery implemented
- [ ] Manual intervention triggers specified
- [ ] State reconciliation designed
- [ ] Audit trail configured
- [ ] Replay capability enabled
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete agent handoff architecture
- Recovery strategy specification
- Audit logging design
- Replay capability
- **Load template:** `{project-root}/_bmad/bam/data/templates/agent-handoff-template.md`

---

---

## Next Step

Create workflow complete. Agent handoff architecture ready for validation using Validate mode (`step-20-v-*`).

---

## Workflow Complete

Create mode is complete. The agent handoff architecture is now ready for validation using Validate mode (`step-20-v-*`).
