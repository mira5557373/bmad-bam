# Step 3: Design Analytics Pipeline

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

Design analytics data pipeline architecture.

---

## Prerequisites

- Step 2 completed (Tracking plan created)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Pipeline Architecture

| Stage | Component | Purpose |
|-------|-----------|---------|
| Collection | SDK/API | Capture events |
| Ingestion | Kafka/Kinesis | Stream events |
| Processing | Spark/Flink | Transform/enrich |
| Storage | Data warehouse | Persist data |
| Serving | Query engine | Analytics access |

### 2. Data Flow

| Source | Destination | Latency | Volume |
|--------|-------------|---------|--------|
| Client SDK | Event stream | <100ms | High |
| Event stream | Raw storage | <1s | High |
| Raw storage | Data warehouse | <5min | Batch |
| Data warehouse | BI tools | <1min | Query |

### 3. Storage Strategy

| Layer | Technology | Retention | Purpose |
|-------|------------|-----------|---------|
| Hot | Redis/DynamoDB | 7 days | Real-time |
| Warm | S3/GCS | 90 days | Recent analysis |
| Cold | Glacier/Archive | 7 years | Compliance |
| OLAP | BigQuery/Snowflake | 2 years | Analytics |

### 4. Quality Assurance

| Check | Implementation | Frequency |
|-------|----------------|-----------|
| Schema validation | JSON Schema | Real-time |
| Duplicate detection | Event ID check | Real-time |
| Data quality | dbt tests | Daily |
| Completeness | Row counts | Hourly |

**Soft Gate:** Steps 1-3 complete core infrastructure. Present summary and confirm before proceeding to governance.

**Verify current best practices with web search:**
Search the web: "product analytics pipeline architecture {date}"
Search the web: "real-time analytics data platform {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into pipeline architecture
- **P (Party Mode)**: Bring data engineering and platform perspectives
- **C (Continue)**: Accept pipeline and proceed to governance
```

#### If 'C' (Continue):
- Save pipeline design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-establish-governance.md`

---

## Verification

- [ ] Pipeline architecture designed
- [ ] Data flow documented
- [ ] Storage strategy established
- [ ] QA checks defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Pipeline architecture specification
- Data flow diagrams
- Storage and retention policy
- **Load template:** `{project-root}/_bmad/bam/templates/gtm-scale-template.md`

---

## Next Step

Proceed to `step-04-c-establish-governance.md` to establish data governance.
