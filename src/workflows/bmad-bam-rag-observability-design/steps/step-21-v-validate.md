# Step 21: Validate Configuration (Validate Mode)

## Purpose

Validate RAG observability configuration against QG-AI2 criteria.

## Prerequisites

- Step 20 complete (configuration and criteria loaded)

## Actions

### 1. Validate Retrieval Metrics

Check against QG-AI2 RAG Pipeline Observability:
- [ ] Retrieval latency tracked (p50, p95, p99) per tenant
- [ ] Chunks retrieved per query measured
- [ ] Empty retrieval rate monitored
- [ ] Relevance score distribution captured
- [ ] Retrieval recall tracked (sampled)

### 2. Validate RAG Quality Metrics

- [ ] Answer groundedness score measured
- [ ] Answer relevance score tracked
- [ ] Context utilization ratio monitored
- [ ] Context truncation events logged
- [ ] Faithfulness score calculated

### 3. Validate RAG Alerting

- [ ] Retrieval latency SLO alerts configured per tier
- [ ] Empty retrieval spike detection active
- [ ] Relevance score degradation alerts enabled
- [ ] Context truncation warnings configured

### 4. Determine Gate Outcome

| Outcome | Criteria |
|---------|----------|
| PASS | All checklist items verified |
| CONDITIONAL | All CRITICAL items pass, non-critical gaps documented |
| FAIL | Any CRITICAL item fails |

## Verification

- [ ] All QG-AI2 RAG items evaluated
- [ ] Gate outcome determined
- [ ] Gaps documented

## Outputs

- Validation results
- Gate outcome determination
- Gap analysis documentation

## Next Step

Proceed to `step-22-v-report.md` with validation results.
