# Step 2: Design Tracking System

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Design token and latency tracking infrastructure.

---

## Prerequisites

- Step 1 completed (AI metrics defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `ai-runtime`

---

## Actions

### 1. Data Collection Pipeline

| Component | Purpose | Technology |
|-----------|---------|------------|
| Interceptor | Capture LLM calls | Middleware |
| Parser | Extract token counts | Provider SDK |
| Enricher | Add tenant context | Context propagation |
| Emitter | Send to analytics | Event stream |

### 2. Event Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| tenant_id | string | Yes | Tenant identifier |
| request_id | string | Yes | Unique request ID |
| model | string | Yes | Model identifier |
| input_tokens | int | Yes | Prompt tokens |
| output_tokens | int | Yes | Completion tokens |
| latency_ms | int | Yes | Total latency |
| ttfb_ms | int | Yes | Time to first byte |
| status | enum | Yes | success/error/timeout |
| timestamp | datetime | Yes | Event timestamp |

### 3. Storage Strategy

| Data Type | Storage | Retention | Query Pattern |
|-----------|---------|-----------|---------------|
| Raw Events | TimeSeries DB | 30 days | Ad-hoc analysis |
| Aggregates | OLAP | 2 years | Dashboards |
| Alerts | Redis | 7 days | Real-time |
| Billing | PostgreSQL | 7 years | Invoicing |

### 4. Real-time Processing

| Stage | Processing | Latency |
|-------|------------|---------|
| Ingestion | Kafka/Kinesis | <100ms |
| Enrichment | Stream processor | <500ms |
| Aggregation | Window functions | 1 min |
| Alerting | Threshold check | <10s |

**Verify current best practices with web search:**
Search the web: "LLM usage tracking architecture {date}"
Search the web: "real-time AI metrics pipeline {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tracking architecture
- **P (Party Mode)**: Bring data engineering and platform perspectives
- **C (Continue)**: Accept tracking design and proceed to cost attribution
```

#### If 'C' (Continue):
- Save tracking architecture to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-cost-attribution.md`

---

## Verification

- [ ] Collection pipeline defined
- [ ] Event schema documented
- [ ] Storage strategy established
- [ ] Real-time processing configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Tracking architecture specification
- Event schema definition
- Storage and retention policy

---

## Next Step

Proceed to `step-03-c-design-cost-attribution.md` to design cost attribution.
