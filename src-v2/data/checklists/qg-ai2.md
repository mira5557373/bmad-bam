---
name: qg-ai2-observability
description: AI observability gate - quality metrics, cost tracking, latency monitoring, feedback collection
module: bam
tags: [ai, quality-gate, multi-tenant, observability, monitoring]
version: 2.0.0
---

# QG-AI2: AI Observability Gate

> **Gate ID:** QG-AI2 (AI Observability)
> **Phase:** 4-implementation
> **Workflow:** bmad-bam-tenant-aware-observability
> **Prerequisites:** QG-AI1 (AI Runtime Configuration), QG-M3 (Agent Runtime)

AI observability MUST be verified before production deployment. This gate verifies quality metrics, cost tracking, latency monitoring, and feedback collection for multi-tenant AI systems.

---

## Purpose

QG-AI2 validates that AI observability meets multi-tenant production requirements:

1. **Quality metrics** track model performance and response quality
2. **Cost tracking** enables per-tenant billing and budget management
3. **Latency monitoring** ensures SLO compliance across tiers
4. **Feedback collection** enables continuous improvement
5. **Model performance** comparison supports optimization decisions

---

## Quality Metrics

### Response Quality

- [ ] **CRITICAL:** Relevance score tracked per response (target: >=0.8)
- [ ] **CRITICAL:** Completion rate measured (target: >=0.9)
- [ ] **CRITICAL:** Hallucination detection metrics implemented
- [ ] Factual accuracy scoring available (where ground truth exists)
- [ ] Response coherence measured
- [ ] Response length appropriateness tracked

### Model Performance

- [ ] **CRITICAL:** Success rate tracked per model
- [ ] **CRITICAL:** Error rate tracked by error type
- [ ] Retry rate and retry success monitored
- [ ] Model degradation detection active
- [ ] Model comparison metrics available

### Golden Task Evaluation

- [ ] **CRITICAL:** Golden task evaluation suite defined
- [ ] Evaluation runs scheduled (daily/weekly)
- [ ] Baseline scores established for each model
- [ ] Regression detection alerts configured
- [ ] A/B testing metrics infrastructure ready

### Agent Performance

- [ ] Task success rate tracked per agent type
- [ ] Tool usage effectiveness measured
- [ ] Multi-step completion rate tracked
- [ ] Human escalation rate monitored
- [ ] Memory utilization efficiency tracked

---

## Cost Tracking

### Token Usage

- [ ] **CRITICAL:** Input tokens counted per request
- [ ] **CRITICAL:** Output tokens counted per request
- [ ] **CRITICAL:** Total tokens aggregated per tenant
- [ ] Token usage per user within tenant tracked
- [ ] Token usage per agent type tracked
- [ ] Token usage per workflow/conversation tracked
- [ ] Historical token usage queryable (30+ days)

### Cost Attribution

- [ ] **CRITICAL:** Cost per token calculated accurately
- [ ] **CRITICAL:** Cost per request tracked
- [ ] **CRITICAL:** Cost per tenant aggregated in real-time
- [ ] Cost per agent type tracked
- [ ] Cost trend analysis available
- [ ] Cost anomaly detection active
- [ ] Monthly cost reports generated automatically

### Budget Management

- [ ] **CRITICAL:** Tier-based token budgets configured
- [ ] **CRITICAL:** Budget alerts at 50%, 80%, 95% thresholds
- [ ] Real-time budget balance visible to tenant admin
- [ ] Budget overage handling defined (block/notify/allow)
- [ ] Budget forecasting operational
- [ ] Budget adjustment history maintained

### Billing Integration

- [ ] Cost data exportable for billing systems
- [ ] Invoice line items match tracked costs
- [ ] Cost reconciliation reports available
- [ ] Disputed charges traceable to requests

---

## Latency Monitoring

### Request/Response Latency

- [ ] **CRITICAL:** End-to-end latency tracked (P50, P95, P99)
- [ ] **CRITICAL:** Time to first token (TTFT) measured
- [ ] **CRITICAL:** LLM API latency isolated from total
- [ ] Tokens per second throughput tracked
- [ ] Network latency isolated
- [ ] Request queue wait time measured

### Component Latency

- [ ] Tool execution latency tracked per tool
- [ ] Memory retrieval latency measured
- [ ] RAG retrieval latency tracked (P50, P95, P99)
- [ ] Context compilation latency measured
- [ ] Embedding generation latency tracked

### SLO Compliance

- [ ] **CRITICAL:** Agent response SLO defined per tier
- [ ] **CRITICAL:** SLO breach alerting configured
- [ ] SLO compliance dashboard available
- [ ] Per-tier SLO tracking (Enterprise vs Standard vs Free)
- [ ] SLO burn rate monitoring active
- [ ] SLO error budget tracking operational

### Latency Alerting

- [ ] **CRITICAL:** P95 latency spike alerts configured
- [ ] Sustained latency degradation alerts
- [ ] Per-model latency anomaly detection
- [ ] Regional latency variance tracking

---

## Feedback Collection

### User Feedback

- [ ] **CRITICAL:** Thumbs up/down capture implemented
- [ ] **CRITICAL:** Feedback linked to request trace
- [ ] Detailed feedback form available (optional)
- [ ] Feedback categorization (accuracy, relevance, speed)
- [ ] Feedback aggregation per model/agent

### Implicit Feedback

- [ ] Conversation continuation rate tracked
- [ ] Task abandonment rate monitored
- [ ] Retry/regeneration rate tracked
- [ ] Edit/correction detection implemented
- [ ] Follow-up question analysis available

### Feedback Loop

- [ ] **CRITICAL:** Feedback review workflow implemented
- [ ] Low-rated responses flagged for review
- [ ] Feedback informs model selection decisions
- [ ] Feedback trends reported weekly
- [ ] Feedback-driven improvement tracking

### Ground Truth Collection

- [ ] Corrected responses captured (where applicable)
- [ ] Expert annotations stored
- [ ] Training data pipeline from feedback operational
- [ ] Data quality validation before training use

---

## Tenant-Specific Observability

### Per-Tenant Dashboards

- [ ] **CRITICAL:** Tenant-specific usage dashboard available
- [ ] **CRITICAL:** Tenant can view their own metrics (self-service)
- [ ] Tenant usage export capability (CSV/API)
- [ ] Tenant alert configuration (Enterprise tier)
- [ ] Tenant SLA dashboard (Enterprise tier)

### Cross-Tenant Isolation

- [ ] **CRITICAL:** Metrics aggregation respects tenant boundaries
- [ ] **CRITICAL:** No cross-tenant metric leakage
- [ ] Admin dashboards aggregate without exposing tenant data
- [ ] Compliance reporting per tenant available

### Noisy Neighbor Detection

- [ ] Per-tenant resource usage tracked
- [ ] Noisy neighbor alerts configured
- [ ] Tenant throttling metrics visible
- [ ] Fair-share enforcement metrics tracked

---

## RAG Pipeline Observability

### Retrieval Metrics

- [ ] **CRITICAL:** Retrieval latency tracked per tenant
- [ ] **CRITICAL:** Chunks retrieved per query measured
- [ ] Empty retrieval rate monitored
- [ ] Relevance score distribution captured
- [ ] Retrieval recall tracked (sampled)

### RAG Quality Metrics

- [ ] **CRITICAL:** Answer groundedness score measured
- [ ] Answer relevance score tracked
- [ ] Context utilization ratio monitored
- [ ] Context truncation events logged
- [ ] Faithfulness score calculated

### RAG Alerting

- [ ] Retrieval latency SLO alerts per tier
- [ ] Empty retrieval spike detection
- [ ] Relevance score degradation alerts
- [ ] Context truncation warnings

---

## Safety and Guardrail Metrics

### Guardrail Effectiveness

- [ ] **CRITICAL:** Input guardrail trigger rate tracked
- [ ] **CRITICAL:** Output guardrail trigger rate tracked
- [ ] Prompt injection attempt rate measured
- [ ] Blocked request rate by category
- [ ] False positive rate for guardrails monitored
- [ ] Guardrail bypass attempt detection

### Kill Switch Metrics

- [ ] Kill switch activation events logged
- [ ] Kill switch response time measured (<100ms)
- [ ] Recovery from kill switch tracked

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Response Quality | CRITICAL | Scoring partial | No quality tracking |
| Model Performance | CRITICAL | Error tracking incomplete | No success/error rates |
| Golden Task Evaluation | CRITICAL | Evaluation incomplete | No evaluation suite |
| Token Usage | CRITICAL | Aggregation incomplete | No token counting |
| Cost Attribution | CRITICAL | Cost calculation partial | No cost tracking |
| Budget Management | CRITICAL | Alerts missing | No budget enforcement |
| Request/Response Latency | CRITICAL | Component breakdown missing | No latency tracking |
| SLO Compliance | CRITICAL | Dashboard incomplete | No SLO monitoring |
| User Feedback | CRITICAL | Categorization missing | No feedback capture |
| Feedback Loop | CRITICAL | Review workflow incomplete | No feedback analysis |
| Per-Tenant Dashboards | CRITICAL | Export missing | No tenant visibility |
| Cross-Tenant Isolation | CRITICAL | Admin aggregation leaks | Cross-tenant visible |
| Retrieval Metrics | CRITICAL | Relevance scoring missing | No retrieval tracking |
| RAG Quality | CRITICAL | Faithfulness missing | No groundedness |
| Guardrail Effectiveness | CRITICAL | False positive unknown | No guardrail logging |
| Agent Performance | Non-critical | Partial tracking | N/A |
| Implicit Feedback | Non-critical | Incomplete signals | N/A |
| Billing Integration | Non-critical | Reconciliation gaps | N/A |

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items checked, >=80% standard items complete |
| **CONDITIONAL** | All CRITICAL items checked, <80% standard items + documented mitigation plan |
| **FAIL** | Any CRITICAL item unchecked - block production deployment, enter recovery protocol |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

---

## Waiver Process

For non-critical items that cannot be addressed:

1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

---

## Recovery Protocol

**If gate triggers CONDITIONAL or FAIL status:**

### Attempt 1: Address Observability Gaps (target: 2-3 days)

- Identify missing metrics collection points
- Verify LangSmith/Langfuse/Phoenix tracing is operational
- Check token counting implementation accuracy
- Validate latency measurement instrumentation
- Review guardrail logging configuration
- Configure missing feedback collection endpoints
- Re-run QG-AI2 validation
- **Lock passed categories**

### Attempt 2: Deeper Investigation (target: 3-5 days)

- Engage AI Platform and SRE teams
- Review observability architecture against patterns
- Validate cost attribution calculations
- Verify quality baseline metrics accuracy
- Test alert configurations end-to-end
- Audit tenant dashboard isolation
- Re-run validation after remediation
- **Preserve locked categories**

### Attempt 3: Mandatory Course Correction

- Escalate to AI Platform Lead and Engineering Leadership
- Document observability gaps with impact assessment
- Consider observability tooling changes if gaps are systemic
- Create remediation plan with SRE sign-off
- Define minimum viable observability for production
- Schedule follow-up validation within 1 week

### Category-Specific Recovery

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Quality Metrics | Add quality scoring, configure baselines | No quality tracking |
| Token Usage | Fix token counting, verify per-tenant aggregation | Cost attribution broken |
| Latency Monitoring | Add measurement points, configure SLO alerts | SLO breach undetected |
| Feedback Collection | Implement capture endpoints, link to traces | No feedback system |
| Tenant Dashboards | Build tenant-scoped views, verify isolation | No tenant visibility |
| RAG Observability | Add retrieval instrumentation | No retrieval tracking |
| Guardrail Metrics | Enable guardrail event logging | Guardrail events not logged |

---

## Automated Validation Script

```bash
# Run as part of QG-AI2 gate
./scripts/validate-ai-observability.sh

# Validates:
# - Metrics collection operational
# - Token counting accuracy
# - Latency tracking completeness
# - Feedback pipeline functional
# - Tenant dashboard isolation
# - Alert configurations
```

---

## Related Workflows

- `bmad-bam-tenant-aware-observability` - Observability design
- `bmad-bam-agent-runtime-architecture` - AI runtime setup
- `bmad-bam-ai-agent-debug` - Agent debugging
- `bmad-bam-rag-observability-design` - RAG observability

## Related Templates

- `observability-dashboard-template.md` - Dashboard design
- `slo-definition-template.md` - SLO configuration
- `cost-tracking-template.md` - Cost attribution setup

## Related Patterns

- `tenant-aware-observability.md` - Multi-tenant metrics
- `ai-cost-management.md` - Cost tracking patterns
- `feedback-loops.md` - Feedback collection design

---

## Web Research Verification

- [ ] Search the web: "LLM observability best practices {date}" - Verify observability patterns
- [ ] Search the web: "AI cost tracking multi-tenant {date}" - Confirm cost attribution
- [ ] Search the web: "AI quality metrics production {date}" - Verify quality measurement
- [ ] Search the web: "LLM feedback collection patterns {date}" - Confirm feedback approaches
- [ ] _Source: [URL]_ citations documented for key observability decisions

---

**PASS CRITERIA:** All CRITICAL checkboxes completed, metrics operational, tenant isolation verified
**OWNER:** AI Platform Lead
**REVIEWERS:** SRE Lead, Platform Architect (Atlas persona), Finance

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM | Consolidated from V1 qg-ai-observability.md; enhanced multi-tenant cost tracking and feedback |
