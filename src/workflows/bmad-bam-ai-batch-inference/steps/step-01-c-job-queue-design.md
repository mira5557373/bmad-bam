# Step 1: Job Queue Design

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Design the job queue architecture including queue technology, priority levels, and tenant isolation for batch inference jobs.

---

## Prerequisites

- Agent runtime architecture document loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-operations

---

## Actions

### 1. Select Queue Technology

| Technology | Pros | Cons | Use Case |
|------------|------|------|----------|
| Redis + BullMQ | Fast, feature-rich | Memory-bound | Small-medium |
| RabbitMQ | Reliable, routing | Complexity | Medium-large |
| AWS SQS | Managed, scalable | Latency | Cloud-native |
| Kafka | High throughput | Overhead | Very large |

### 2. Design Priority Levels

| Priority | SLA | Use Case |
|----------|-----|----------|
| Critical | 5 min | Production pipeline |
| High | 30 min | Enterprise tenant |
| Normal | 2 hours | Standard requests |
| Low | 24 hours | Background tasks |

### 3. Configure Tenant Isolation

| Isolation | Method | Trade-off |
|-----------|--------|-----------|
| Queue per tenant | Separate queues | High isolation, high cost |
| Tenant priority | Weighted fair queue | Balanced |
| Shared queue | Single queue + tags | Low cost, noisy neighbor |

**Verify current best practices with web search:**
Search the web: "batch inference job queue architecture {date}"
Search the web: "multi-tenant job queue design {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into queue technology
- **P (Party Mode)**: Bring infrastructure and data perspectives
- **C (Continue)**: Accept queue design and proceed to execution engine
```

#### If 'C' (Continue):
- Save job queue design to output document
- Proceed to next step: `step-02-c-execution-engine-design.md`

---

## Verification

- [ ] Queue technology selected
- [ ] Priority levels defined
- [ ] Tenant isolation configured

---

## Outputs

- Job queue technology selection
- Priority level definitions
- Tenant isolation configuration

---

## Next Step

Proceed to `step-02-c-execution-engine-design.md` to design execution engine.
