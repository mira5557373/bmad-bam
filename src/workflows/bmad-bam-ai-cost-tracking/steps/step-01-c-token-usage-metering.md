# Step 1: Token Usage Metering Design

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

Design token counting and metering infrastructure for accurate AI cost attribution across tenants, models, and usage patterns.

---

## Prerequisites

- Agent runtime architecture document loaded
- AI runtime configuration (`{ai_runtime}`) resolved
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-operations
- **Web research (if available):** Search for current LLM token metering best practices

---

## Inputs

- User requirements for cost tracking
- Agent runtime architecture document
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Token Counting Strategy

Design token counting approach:

| Component | Method | Accuracy |
|-----------|--------|----------|
| Input Tokens | Pre-request tokenization | Exact |
| Output Tokens | Post-response count | Exact |
| Cached Tokens | Cache hit tracking | Estimated |
| System Tokens | Template measurement | Pre-calculated |

### 2. Design Model Pricing Configuration

Define pricing schema:

| Field | Type | Description |
|-------|------|-------------|
| model_id | string | Model identifier |
| provider | string | LLM provider |
| input_price_per_1k | decimal | Input token cost |
| output_price_per_1k | decimal | Output token cost |
| effective_date | datetime | Price start date |
| tier_overrides | object | Per-tier pricing |

### 3. Configure Real-time Metering

Specify metering pipeline:

| Stage | Latency | Processing |
|-------|---------|------------|
| Request Intercept | <1ms | Sync |
| Token Count | <5ms | Sync |
| Cost Calculate | <1ms | Sync |
| Emit Event | <1ms | Async |
| Aggregate | Batch | Async |

### 4. Design Tenant Attribution

Ensure proper cost attribution:

| Attribution | Source | Granularity |
|-------------|--------|-------------|
| Tenant ID | Request context | Per-request |
| User ID | Auth token | Per-request |
| Agent ID | Agent config | Per-request |
| Session ID | Conversation | Per-session |

**Verify current best practices with web search:**
Search the web: "LLM token counting metering best practices {date}"
Search the web: "AI cost attribution multi-tenant {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the token metering analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into token counting or pricing
- **P (Party Mode)**: Bring FinOps and engineering perspectives
- **C (Continue)**: Accept metering design and proceed to compute costs
- **[Specific refinements]**: Describe metering concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save token metering design to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-compute-cost-attribution.md`

---

## Verification

- [ ] Token counting strategy defined
- [ ] Pricing schema documented
- [ ] Real-time metering designed
- [ ] Tenant attribution specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Token metering specification
- Pricing configuration schema
- **Load template:** `{project-root}/_bmad/bam/data/templates/llm-cost-tracking-template.md`

---

## Next Step

Proceed to `step-02-c-compute-cost-attribution.md` to design compute costs.
