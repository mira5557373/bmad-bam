# QG-AI2: AI Observability Checklist

> Gate ID: QG-AI2 (AI Observability)
> AI system observability MUST be verified before production deployment.
> Gate definition: verifies LLM metrics, token tracking, latency monitoring, and quality baselines.
> Workflow integration: BAM AI operations workflows feed into this gate.
> Executing workflow: `agent-runtime-architecture` (observability phase)
>
> **Prerequisite Gate:** QG-AI2 must pass before QG-P1 (Production Readiness)
> for any system with AI agents.

## LLM Metrics Collection

### Request/Response Metrics

- [ ] Request latency tracked (P50, P95, P99)
- [ ] Response latency tracked per model
- [ ] Time to first token (TTFT) measured
- [ ] Tokens per second throughput tracked
- [ ] Request success rate monitored
- [ ] Error rate by error type captured
- [ ] Retry rate and retry success tracked
- [ ] Timeout rate per endpoint measured

### Model-Specific Metrics

- [ ] Metrics segmented by model provider
- [ ] Metrics segmented by model version
- [ ] Model switch fallback events tracked
- [ ] Model deprecation warnings monitored
- [ ] Model availability SLA tracked
- [ ] Model response quality variance detected

## Token Usage Tracking

### Per-Tenant Token Accounting

- [ ] Input tokens counted per request
- [ ] Output tokens counted per request
- [ ] Total tokens aggregated per tenant
- [ ] Token usage per user within tenant
- [ ] Token usage per agent type
- [ ] Token usage per workflow/conversation
- [ ] Historical token usage queryable

### Token Budget Management

- [ ] Tier-based token limits configured
- [ ] Token budget alerts configured (50%, 80%, 95%)
- [ ] Token overage handling defined
- [ ] Real-time token balance visible to tenant
- [ ] Token usage forecasting operational
- [ ] Token cost projection per tenant

### Cost Attribution

- [ ] Cost per token calculated accurately
- [ ] Cost per request tracked
- [ ] Cost per tenant aggregated
- [ ] Cost per agent type tracked
- [ ] Cost trend analysis available
- [ ] Cost anomaly detection active
- [ ] Monthly cost reports generated

## Latency Monitoring

### End-to-End Latency

- [ ] Agent response time (total) tracked
- [ ] LLM API latency isolated
- [ ] Tool execution latency tracked
- [ ] Memory retrieval latency measured
- [ ] Context compilation latency measured
- [ ] Network latency isolated

### SLO Compliance

- [ ] Agent response SLO defined (<3s P95)
- [ ] SLO breach alerting configured
- [ ] SLO compliance dashboard available
- [ ] Per-tier SLO tracking (Enterprise vs Free)
- [ ] SLO burn rate monitoring active

### Latency Alerting

- [ ] P95 latency spike alerts configured
- [ ] Sustained latency degradation alerts
- [ ] Per-model latency anomaly detection
- [ ] Regional latency variance tracking

## Quality Metrics

### Response Quality Baselines

- [ ] Golden task evaluation suite defined
- [ ] Relevance score baseline established (>=0.8)
- [ ] Completion rate baseline established (>=0.9)
- [ ] Factual accuracy metrics defined
- [ ] Response coherence measured
- [ ] Hallucination detection metrics

### Agent Performance Metrics

- [ ] Task success rate tracked per agent
- [ ] Tool usage effectiveness measured
- [ ] Memory utilization efficiency tracked
- [ ] Multi-step completion rate measured
- [ ] Human escalation rate tracked
- [ ] User satisfaction proxy metrics

### Quality Monitoring

- [ ] Quality score trend analysis available
- [ ] Quality degradation alerts configured
- [ ] A/B testing metrics infrastructure ready
- [ ] Prompt version performance comparison
- [ ] Model performance comparison

## Safety and Guardrail Metrics

### Guardrail Effectiveness

- [ ] Input guardrail trigger rate tracked
- [ ] Output guardrail trigger rate tracked
- [ ] Prompt injection attempt rate measured
- [ ] Blocked request rate by category
- [ ] False positive rate for guardrails
- [ ] Guardrail bypass attempt detection

### Kill Switch Metrics

- [ ] Kill switch activation events logged
- [ ] Kill switch response time measured (<100ms)
- [ ] Kill switch coverage verified (all agents)
- [ ] Recovery from kill switch tracked

## Tenant-Specific Observability

### Per-Tenant Dashboards

- [ ] Tenant-specific usage dashboard available
- [ ] Tenant can view their own metrics
- [ ] Tenant usage export capability
- [ ] Tenant alert configuration (Enterprise tier)
- [ ] Tenant SLA dashboard (Enterprise tier)

### Noisy Neighbor Detection

- [ ] Per-tenant resource usage tracked
- [ ] Noisy neighbor alerts configured
- [ ] Tenant throttling metrics visible
- [ ] Fair-share enforcement metrics

## RAG Pipeline Observability

### Retrieval Metrics

- [ ] Retrieval latency tracked (p50, p95, p99) per tenant
- [ ] Chunks retrieved per query measured
- [ ] Empty retrieval rate monitored
- [ ] Relevance score distribution captured
- [ ] Retrieval recall tracked (sampled)

### RAG Quality Metrics

- [ ] Answer groundedness score measured
- [ ] Answer relevance score tracked
- [ ] Context utilization ratio monitored
- [ ] Context truncation events logged
- [ ] Faithfulness score calculated

### RAG Alerting

- [ ] Retrieval latency SLO alerts configured per tier
- [ ] Empty retrieval spike detection active
- [ ] Relevance score degradation alerts enabled
- [ ] Context truncation warnings configured

---

## Tool Execution Observability

### Execution Metrics

- [ ] Tool execution latency tracked per tool
- [ ] Tool success/failure rate monitored
- [ ] Tool timeout events counted
- [ ] Tool retry attempts tracked
- [ ] Tool selection accuracy measured

### Permission and Security Metrics

- [ ] Permission checks logged with outcomes
- [ ] Permission denials tracked with reasons
- [ ] Approval workflow latency measured
- [ ] Approval required events counted

### Sandbox Monitoring

- [ ] Sandbox CPU usage tracked per execution
- [ ] Sandbox memory usage monitored
- [ ] Sandbox network I/O logged
- [ ] Sandbox violations trigger immediate alerts
- [ ] Sandbox resource limits enforced

---

## Agent Memory Observability

### Memory Tier Metrics

- [ ] Memory operations tracked per tier (session/user/tenant)
- [ ] Memory operation latency measured
- [ ] Memory storage bytes tracked per tenant
- [ ] Memory item counts monitored
- [ ] Memory eviction events logged

### Memory Isolation Verification

- [ ] Cross-tier isolation checks scheduled
- [ ] Isolation violation detection active
- [ ] Scope enforcement logged
- [ ] Memory access audit trail maintained

### GDPR Compliance Metrics

- [ ] Deletion request tracking active
- [ ] Deletion latency measured
- [ ] Deletion verification logged
- [ ] Deletion audit trail complete

---

## Context Window Observability

### Utilization Metrics

- [ ] Context tokens used per request tracked
- [ ] Context utilization ratio monitored
- [ ] Context headroom (remaining tokens) measured
- [ ] Context overflow events logged

### Context Composition Metrics

- [ ] System prompt tokens tracked
- [ ] Memory context tokens measured
- [ ] RAG context tokens tracked
- [ ] Conversation history tokens monitored
- [ ] Tool definition tokens measured

### Context Efficiency Metrics

- [ ] Context relevance ratio calculated
- [ ] Context duplication ratio monitored
- [ ] Context compression events tracked
- [ ] Context summarization events logged

---

## Web Research Verification

- [ ] Search the web: "quality gate best practices enterprise SaaS {date}" - Verify gate criteria
- [ ] Search the web: "multi-tenant platform validation patterns {date}" - Confirm validation approach
- [ ] _Source: [URL]_ citations documented for key decisions

## Related Patterns

Load decision criteria from pattern registry:

- **AI patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`
- **Observability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `observability-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "LLM observability best practices {date}"
- Search: "AI agent monitoring production {date}"
- Search: "token usage tracking multi-tenant {date}"
- Search: "LLM quality metrics baseline {date}"

## Gate Decision

| Classification | Criteria |
|---------------|----------|
| **PASS** | All CRITICAL items pass, >=80% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, <80% of non-critical items pass - remediation plan required |
| **FAIL** | Any CRITICAL item fails - block until resolved |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

## Critical vs Non-Critical Classification

| Category                       | Classification | CONDITIONAL Threshold | FAIL Threshold |
| ------------------------------ | -------------- | --------------------- | -------------- |
| LLM Metrics Collection         | CRITICAL       | Partial metrics | No latency tracking |
| Token Usage Tracking           | CRITICAL       | Aggregation incomplete | No token counting |
| Cost Attribution               | CRITICAL       | Cost calculation partial | Cost attribution broken |
| Latency Monitoring             | CRITICAL       | SLO alerts missing | SLO breach undetected |
| Quality Metrics                | CRITICAL       | Baselines undefined | No quality monitoring |
| Safety and Guardrail Metrics   | CRITICAL       | Guardrail logging partial | Guardrail events not logged |
| RAG Pipeline Observability     | CRITICAL       | Retrieval metrics partial | No retrieval tracking |
| Tool Execution Observability   | CRITICAL       | Execution metrics partial | No tool monitoring |
| Agent Memory Observability     | CRITICAL       | Memory metrics incomplete | No memory tracking |
| Context Window Observability   | Non-critical   | Composition tracking partial | N/A |
| Tenant-Specific Observability  | Non-critical   | Enterprise tier gaps | N/A |
| Per-Tenant Dashboards          | Non-critical   | Dashboard incomplete | N/A |
| Noisy Neighbor Detection       | Non-critical   | Detection partial | N/A |

## Recovery Protocol

**If QG-AI2 fails:**

1. **Attempt 1:** Immediate remediation (target: 2-3 days)
   - Identify missing metrics collection points
   - Verify LangSmith/Phoenix/custom tracing is operational
   - Check token counting implementation accuracy
   - Validate latency measurement instrumentation
   - Review guardrail logging configuration
   - Re-run QG-AI2 validation after fixes
   - **Lock passed categories** — do not re-test locked items

2. **Attempt 2:** Deep instrumentation review (target: 2-3 days)
   - Engage AI Platform and SRE teams
   - Review observability architecture against patterns
   - Validate cost attribution calculations
   - Verify quality baseline metrics accuracy
   - Test alert configurations end-to-end
   - Re-run QG-AI2 validation after remediation
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to AI Platform Lead and Engineering Leadership
   - Document observability gaps with impact assessment
   - Consider observability tooling changes if gaps are systemic
   - Create remediation plan with SRE sign-off
   - Define minimum viable observability for production
   - Schedule follow-up validation within 1 week

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| LLM Metrics | Add missing instrumentation | No latency tracking |
| Token Usage | Fix token counting, verify aggregation | Cost attribution broken |
| Latency Monitoring | Add measurement points, configure alerts | SLO breach undetected |
| Quality Metrics | Define baselines, add evaluation suite | No quality monitoring |
| Safety Metrics | Enable guardrail logging | Guardrail events not logged |
| Tenant Observability | Add tenant-scoped dashboards | Enterprise tier gap |
| RAG Pipeline | Add retrieval instrumentation, verify relevance tracking | No retrieval tracking |
| Tool Execution | Add tool instrumentation, verify sandbox monitoring | No tool monitoring |
| Agent Memory | Add memory tier tracking, verify isolation checks | No memory tracking |

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - AI runtime setup
- `bmad-bam-tenant-aware-observability` - Observability design
- `bmad-bam-ai-eval-safety-design` - Safety evaluation
- `bmad-bam-rag-observability-design` - RAG observability design
- `bmad-bam-agent-execution-tracing` - Agent tracing design

**PASS CRITERIA:** All CRITICAL metrics collected, baselines established
**OWNER:** AI Platform Lead
**REVIEWERS:** SRE, Platform Architect, Security
