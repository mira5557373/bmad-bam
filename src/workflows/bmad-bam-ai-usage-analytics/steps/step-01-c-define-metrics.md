# Step 1: Define AI Metrics

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Define comprehensive AI usage metrics for multi-tenant tracking.

---

## Prerequisites

- Agent runtime architecture exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `ai-runtime`

---

## Actions

### 1. Token Metrics

| Metric | Definition | Granularity | Collection |
|--------|------------|-------------|------------|
| Input Tokens | Prompt tokens consumed | Per-call | Real-time |
| Output Tokens | Completion tokens generated | Per-call | Real-time |
| Total Tokens | Input + Output | Per-call | Real-time |
| Token Rate | Tokens per minute | Per-tenant | Aggregated |

### 2. Latency Metrics

| Metric | Definition | Target | Collection |
|--------|------------|--------|------------|
| TTFB | Time to first byte | <500ms | Per-call |
| Total Latency | End-to-end response | <3s | Per-call |
| P50/P95/P99 | Percentile latencies | Varies | Aggregated |
| Streaming Rate | Tokens per second | >20 t/s | Per-call |

### 3. Quality Metrics

| Metric | Definition | Threshold | Collection |
|--------|------------|-----------|------------|
| Success Rate | Successful / Total calls | >99% | Real-time |
| Error Rate | Failed calls | <1% | Real-time |
| Retry Rate | Retried calls | <5% | Real-time |
| Timeout Rate | Timed out calls | <0.5% | Real-time |

### 4. Model Metrics

| Metric | Definition | Purpose | Collection |
|--------|------------|---------|------------|
| Model Distribution | Calls per model | Cost analysis | Hourly |
| Fallback Rate | Fallback to secondary | Reliability | Real-time |
| Context Length | Avg tokens per request | Optimization | Daily |
| Temperature Dist | Temperature settings used | Quality | Daily |

**Verify current best practices with web search:**
Search the web: "LLM observability metrics best practices {date}"
Search the web: "AI token tracking multi-tenant {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing metrics definition, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into metric selection
- **P (Party Mode)**: Bring AI platform and SRE perspectives
- **C (Continue)**: Accept metrics and proceed to tracking design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save metrics catalog to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-tracking.md`

---

## Verification

- [ ] Token metrics defined
- [ ] Latency metrics with targets
- [ ] Quality metrics established
- [ ] Model metrics included
- [ ] Patterns align with pattern registry

---

## Outputs

- AI metrics catalog
- Metric definitions with targets
- Collection strategy per metric

---

## Next Step

Proceed to `step-02-c-design-tracking.md` to design tracking system.
