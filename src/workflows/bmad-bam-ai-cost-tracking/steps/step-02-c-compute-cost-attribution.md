# Step 2: Compute Cost Attribution

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

Design compute cost allocation for GPU/inference, embeddings, vector search, and storage costs beyond token-based pricing.

---

## Prerequisites

- Step 1 completed with token metering design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-operations

---

## Inputs

- Token metering design from Step 1
- Infrastructure cost data
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Catalog Compute Cost Categories

Identify all cost components:

| Category | Source | Pricing Model |
|----------|--------|---------------|
| Inference | LLM API calls | Per-token |
| Embedding | Vector generation | Per-token |
| Vector Search | Query execution | Per-query |
| Storage | Vector DB, caches | Per-GB/month |
| Fine-tuning | Training jobs | Per-GPU-hour |

### 2. Design Attribution Rules

Define cost allocation:

| Cost Type | Attribution | Granularity |
|-----------|-------------|-------------|
| Direct API | Request metadata | Per-request |
| Shared Infra | Proportional usage | Per-tenant |
| Batch Jobs | Job ownership | Per-job |
| Background | Equal split or usage-based | Per-tenant |

### 3. Configure Cost Multipliers

Define tier-based pricing:

| Tier | Multiplier | Rationale |
|------|------------|-----------|
| Free | 0.0 | Included |
| Starter | 1.0 | Base rate |
| Pro | 0.9 | Volume discount |
| Enterprise | 0.75 | Custom negotiated |

### 4. Design Cost Events

Specify cost event schema:

| Field | Type | Description |
|-------|------|-------------|
| event_id | string | Unique identifier |
| tenant_id | string | Cost owner |
| category | enum | Cost category |
| quantity | decimal | Usage amount |
| unit_cost | decimal | Per-unit cost |
| total_cost | decimal | Calculated cost |
| timestamp | datetime | Event time |

**Verify current best practices with web search:**
Search the web: "AI infrastructure cost attribution cloud {date}"
Search the web: "GPU cost allocation multi-tenant {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the compute cost analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into attribution rules or multipliers
- **P (Party Mode)**: Bring FinOps and infrastructure perspectives
- **C (Continue)**: Accept compute cost design and proceed to aggregation
- **[Specific refinements]**: Describe compute cost concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save compute cost design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-cost-aggregation-pipeline.md`

---

## Verification

- [ ] Cost categories cataloged
- [ ] Attribution rules defined
- [ ] Tier multipliers configured
- [ ] Cost event schema specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Compute cost attribution specification
- Cost event schema
- **Load template:** `{project-root}/_bmad/bam/data/templates/cost-allocation-template.md`

---

## Next Step

Proceed to `step-03-c-cost-aggregation-pipeline.md` to design cost aggregation.
