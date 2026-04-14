# Step 3: Cost Aggregation Pipeline

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

---

## Purpose

Design the cost aggregation pipeline for real-time streaming, daily/monthly rollups, allocation rules, and multi-currency support.

---

## Prerequisites

- Steps 1-2 completed with token and compute cost design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-operations

---

## Inputs

- Token metering design from Step 1
- Compute cost design from Step 2
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Design Real-time Streaming

Specify streaming architecture:

| Component | Technology | Latency |
|-----------|------------|---------|
| Event Ingestion | Kafka/Kinesis | <100ms |
| Stream Processing | Flink/Spark Streaming | <1s |
| Real-time Aggregates | Redis | <10ms |
| Persistent Store | ClickHouse/TimescaleDB | Batch |

### 2. Configure Aggregation Windows

Define rollup periods:

| Window | Purpose | Retention |
|--------|---------|-----------|
| Minute | Real-time dashboards | 7 days |
| Hourly | Usage trends | 90 days |
| Daily | Billing reports | 2 years |
| Monthly | Invoicing | 7 years |

### 3. Design Allocation Rules

Specify cost allocation logic:

| Rule Type | Description | Application |
|-----------|-------------|-------------|
| Direct | 100% to requestor | API calls |
| Proportional | By usage percentage | Shared resources |
| Fixed Split | Equal division | Platform costs |
| Custom | Tenant-defined | Enterprise |

### 4. Configure Multi-Currency Support

Design currency handling:

| Feature | Implementation | Refresh |
|---------|----------------|---------|
| Base Currency | USD | N/A |
| Exchange Rates | External API | Daily |
| Tenant Currency | Preference setting | On-demand |
| Historical Rates | Stored per-period | Immutable |

**Verify current best practices with web search:**
Search the web: "real-time cost aggregation streaming {date}"
Search the web: "usage metering pipeline architecture {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the aggregation pipeline analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into streaming or allocation rules
- **P (Party Mode)**: Bring data engineering and FinOps perspectives
- **C (Continue)**: Accept aggregation design and proceed to billing integration
- **[Specific refinements]**: Describe aggregation concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save aggregation pipeline design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-billing-integration.md`

---

## Verification

- [ ] Streaming architecture designed
- [ ] Aggregation windows configured
- [ ] Allocation rules specified
- [ ] Multi-currency supported
- [ ] Patterns align with pattern registry

---

## Outputs

- Aggregation pipeline specification
- Allocation rules documentation
- **Load template:** `{project-root}/_bmad/bam/templates/cost-tracking-design-template.md`

---

## Next Step

Proceed to `step-04-c-billing-integration.md` to design billing integration.
