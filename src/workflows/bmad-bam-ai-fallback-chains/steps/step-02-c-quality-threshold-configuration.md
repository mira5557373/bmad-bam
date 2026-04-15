# Step 2: Quality Threshold Configuration

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

Design quality thresholds including response quality metrics, latency thresholds, error rate limits, and degradation triggers for intelligent fallback decisions.

---

## Prerequisites

- Step 1 completed with provider catalog
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-operations

---

## Actions

### 1. Define Quality Metrics

Specify quality measurement:

| Metric | Measurement | Target | Fallback Trigger |
|--------|-------------|--------|------------------|
| Response Quality | LLM-as-judge score | >0.85 | <0.70 |
| Relevance | Semantic similarity | >0.80 | <0.65 |
| Completeness | Output coverage | >0.90 | <0.75 |
| Safety Score | Guardrail pass rate | >0.99 | <0.95 |

### 2. Configure Latency Thresholds

Define latency requirements:

| Operation | p50 Target | p99 Target | Fallback Trigger |
|-----------|------------|------------|------------------|
| Simple Query | 200ms | 1s | >2s |
| Complex Query | 500ms | 3s | >5s |
| Streaming First Token | 100ms | 500ms | >1s |
| Batch Processing | 2s | 10s | >15s |

### 3. Set Error Rate Limits

Specify error thresholds:

| Error Type | Acceptable Rate | Warning | Critical |
|------------|-----------------|---------|----------|
| Timeout | 0.5% | 1% | 2% |
| Rate Limit | 0.1% | 0.5% | 1% |
| Server Error | 0.1% | 0.5% | 1% |
| Invalid Response | 0.01% | 0.1% | 0.5% |

### 4. Design Degradation Triggers

Define trigger conditions:

| Condition | Detection Window | Action |
|-----------|-----------------|--------|
| Sustained High Latency | 5 min rolling | Soft fallback |
| Error Spike | 1 min rolling | Hard fallback |
| Quality Degradation | 10 requests | Quality fallback |
| Provider Outage | Health check fail | Immediate failover |

**Verify current best practices with web search:**
Search the web: "LLM quality metrics monitoring {date}"
Search the web: "AI provider SLA monitoring best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into quality metrics or thresholds
- **P (Party Mode)**: Bring SRE and ML engineering perspectives
- **C (Continue)**: Accept quality thresholds and proceed to failover logic
```

#### If 'C' (Continue):
- Save quality threshold configuration to output document
- Proceed to next step: `step-03-c-failover-logic-design.md`

---

## Verification

- [ ] Quality metrics defined
- [ ] Latency thresholds configured
- [ ] Error rate limits set
- [ ] Degradation triggers designed

---

## Outputs

- Quality threshold specification
- Degradation trigger configuration

---

## Next Step

Proceed to `step-03-c-failover-logic-design.md` to design failover logic.
