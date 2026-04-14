# Step 3: Latency Monitoring Configuration

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

---

## Purpose

Configure end-to-end latency tracking, per-model latency monitoring, queue time monitoring, and SLO configuration for AI performance management.

---

## Prerequisites

- Token usage tracking set up (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: performance

---

## Actions

### 1. End-to-End Latency Tracking

| Latency Segment | Measurement Point | Metric Name |
|-----------------|-------------------|-------------|
| Total request | API entry to response | ai_request_duration_ms |
| Provider call | SDK call to response | ai_provider_duration_ms |
| Processing | Pre/post processing | ai_processing_duration_ms |
| Queue wait | Queue entry to pickup | ai_queue_wait_ms |

Percentile tracking:
| Percentile | Purpose | Alert Threshold |
|------------|---------|-----------------|
| p50 | Baseline | N/A |
| p90 | Performance | > 2x baseline |
| p95 | SLO target | > SLO |
| p99 | Tail latency | > 3x baseline |

### 2. Per-Model Latency

| Model | p50 Baseline | p95 SLO | Alert Threshold |
|-------|--------------|---------|-----------------|
| GPT-4 | 500ms | 2000ms | > 3000ms |
| GPT-3.5 | 200ms | 800ms | > 1200ms |
| Claude | 400ms | 1500ms | > 2500ms |
| Embeddings | 50ms | 200ms | > 400ms |

### 3. Queue Time Monitoring

| Queue | Max Wait | Alert | Action |
|-------|----------|-------|--------|
| High priority (Enterprise) | 100ms | > 200ms | Scale up |
| Normal priority (Pro) | 500ms | > 1000ms | Scale up |
| Low priority (Free) | 2000ms | > 5000ms | Alert |
| Batch queue | 30s | > 60s | Alert |

### 4. SLO Configuration

| SLO | Target | Window | Error Budget |
|-----|--------|--------|--------------|
| AI availability | 99.9% | 30 days | 43 min/month |
| AI p95 latency | < 2s | 30 days | 5% of requests |
| AI success rate | > 99% | 30 days | 1% failures |

Alerting:
| Burn Rate | Window | Alert | Severity |
|-----------|--------|-------|----------|
| 14.4x | 1 hour | Critical | P1 |
| 6x | 6 hours | High | P2 |
| 1x | 3 days | Warning | P3 |

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into SLO configuration
- **P (Party Mode)**: Bring SRE and product perspectives
- **C (Continue)**: Accept monitoring and proceed to cost calculation
- **[Specific refinements]**: Describe concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save latency monitoring to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-cost-calculation.md`

---

**Verify current best practices with web search:**
Search the web: "latency monitoring best practices {date}"
Search the web: "latency monitoring multi-tenant SaaS {date}"

## Verification

- [ ] E2E latency tracking active
- [ ] Per-model latency monitored
- [ ] Queue time monitored
- [ ] SLOs configured

---

## Outputs

- Latency monitoring configuration

---

## Next Step

Proceed to `step-04-c-cost-calculation.md` to configure cost calculation.
