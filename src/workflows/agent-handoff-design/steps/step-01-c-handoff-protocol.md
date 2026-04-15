# Step 1: Handoff Protocol Design

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

Design the handoff mechanisms between agents including synchronous/asynchronous patterns, message contracts, triggers, and tenant context propagation.

---

## Prerequisites

- Agent runtime architecture documented
- Multi-agent topology selected
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-orchestration
- **Web research (if available):** Search for current agent handoff patterns

---

## Inputs

- Agent runtime architecture
- Agent topology diagram
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Communication requirements

---

## Actions

### 1. Select Handoff Pattern

Choose handoff mechanism:

| Pattern | Type | Use Case | Latency | Complexity |
|---------|------|----------|---------|------------|
| Direct Invoke | Sync | Simple chain | Low | Low |
| Message Queue | Async | Decoupled agents | Medium | Medium |
| Event Bus | Async | Pub/sub patterns | Medium | Medium |
| Orchestrator | Sync/Async | Complex workflows | Variable | High |
| Blackboard | Shared | Collaborative | Medium | High |

### 2. Design Message Contract

Define handoff message structure:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| handoff_id | string | YES | Unique handoff identifier |
| source_agent | string | YES | Sending agent ID |
| target_agent | string | YES | Receiving agent ID |
| tenant_context | object | YES | Tenant isolation context |
| conversation_id | string | YES | Conversation thread |
| task | object | YES | Task specification |
| state | object | YES | Transferred state |
| priority | enum | NO | CRITICAL/HIGH/NORMAL/LOW |
| deadline | timestamp | NO | Completion deadline |
| metadata | object | NO | Additional context |

### 3. Define Handoff Triggers

Specify when handoffs occur:

| Trigger Type | Condition | Example |
|--------------|-----------|---------|
| Task Type | Task matches agent capability | "Code review" -> code-agent |
| Complexity | Exceeds current agent | Token count > threshold |
| Expertise | Requires specialization | Legal question -> legal-agent |
| User Request | Explicit escalation | "Talk to supervisor" |
| System Rule | Policy-based routing | PII detected -> privacy-agent |
| Failure | Current agent cannot handle | 3 failed attempts |

### 4. Design Priority and Preemption

Define priority handling:

| Priority | Queue Position | Preemption | Timeout |
|----------|----------------|------------|---------|
| CRITICAL | Immediate | YES | 30s |
| HIGH | Front | Conditional | 60s |
| NORMAL | FIFO | NO | 120s |
| LOW | Back | NO | 300s |

Preemption Rules:

| Current | Incoming | Action |
|---------|----------|--------|
| LOW | CRITICAL | Preempt immediately |
| LOW | HIGH | Preempt after checkpoint |
| NORMAL | HIGH | Queue next |
| HIGH | CRITICAL | Preempt after checkpoint |

### 5. Design Tenant Context Propagation

Ensure tenant isolation during handoff:

| Context Field | Propagation | Validation |
|---------------|-------------|------------|
| tenant_id | Always | Mandatory check |
| user_id | Always | Authorization |
| session_id | Always | Correlation |
| permissions | Always | Access control |
| tier | Always | Feature gating |
| region | Always | Data residency |
| custom_context | Optional | Schema validation |

Isolation Verification:

| Check | When | Action on Fail |
|-------|------|----------------|
| Tenant match | Pre-handoff | Reject |
| Permission check | Pre-handoff | Reject |
| Region compliance | Pre-handoff | Route to correct region |
| Rate limit | Pre-handoff | Queue or reject |

### 6. Design Handoff Acknowledgment

Define confirmation patterns:

| Ack Type | Timing | Purpose |
|----------|--------|---------|
| Receipt | On receive | Delivery confirmation |
| Accept | After validation | Capability confirmation |
| Progress | During execution | Status updates |
| Complete | On finish | Success confirmation |
| Reject | On failure | Error handling |

**Verify current best practices with web search:**
Search the web: "multi-agent handoff patterns LLM {date}"
Search the web: "agent communication protocols AI systems {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the handoff protocol design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into handoff patterns and edge cases
- **P (Party Mode)**: Bring distributed systems and AI architect perspectives
- **C (Continue)**: Accept handoff protocol and proceed to state sharing
- **[Specific refinements]**: Describe protocol concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save handoff protocol design to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-state-sharing.md`

---

## Verification

- [ ] Handoff pattern selected with justification
- [ ] Message contract defined
- [ ] Handoff triggers specified
- [ ] Priority and preemption rules defined
- [ ] Tenant context propagation designed
- [ ] Acknowledgment patterns documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Handoff protocol specification
- Message contract schema
- Trigger configuration
- Priority rules
- **Load template:** `{project-root}/_bmad/bam/data/templates/agent-handoff-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/agent-negotiation-template.md`

---

## Next Step

Proceed to `step-02-c-state-sharing.md` to design state management.
