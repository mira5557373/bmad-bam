# BAM AI Observability Patterns Guide

**When to load:** During AI monitoring setup, LLM observability design, agent debugging infrastructure, or when implementing AI observability for multi-tenant SaaS platforms.

**Integrates with:** Winston (Architect), Nova (AI Runtime), SRE teams, ml-bam extension.

---

## Core Concepts

### AI Observability Pillars

| Pillar | Traditional | AI-Specific |
|--------|-------------|-------------|
| Metrics | Latency, errors, throughput | Token usage, model latency, hallucination rate |
| Logs | Request/response logs | Prompt/completion logs, reasoning traces |
| Traces | Service-to-service | LLM call chains, agent tool usage |
| Evaluation | N/A | Quality scores, accuracy metrics |

### Multi-Tenant AI Metrics

| Metric | Scope | Purpose |
|--------|-------|---------|
| Token consumption | Per-tenant | Cost allocation |
| Model latency (p50/p95/p99) | Per-tenant | SLA monitoring |
| Completion rate | Per-tenant | Quality tracking |
| Error rate | Per-tenant | Reliability |
| Tool call success | Per-agent | Agent health |

### LLM Observability Stack

```
┌─────────────────────────────────────────────────┐
│              AI Observability Stack              │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  LLM     │  │  Agent   │  │  RAG     │      │
│  │ Gateway  │  │ Runtime  │  │ Pipeline │      │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘      │
│       │             │             │             │
│       └──────┬──────┴──────┬──────┘             │
│              │             │                    │
│       ┌──────▼──────┐ ┌────▼─────┐             │
│       │Trace Collector│ │ Metrics │             │
│       │ (OpenTelemetry)│ │Aggregator│            │
│       └──────┬──────┘ └────┬─────┘             │
│              │             │                    │
│       ┌──────▼─────────────▼─────┐             │
│       │   Tenant-Scoped Storage   │             │
│       │   + Cost Attribution      │             │
│       └──────────────────────────┘             │
└─────────────────────────────────────────────────┘
```

### Prompt/Completion Logging

| Field | Description | Privacy |
|-------|-------------|---------|
| Prompt hash | Deduplicated prompt reference | Safe |
| Prompt text | Full prompt content | PII risk |
| Completion | Model response | PII risk |
| Token count | Input/output tokens | Safe |
| Model ID | Which model used | Safe |
| Latency | Processing time | Safe |
| Tenant ID | Tenant context | Required |

### Cost Attribution Model

| Cost Component | Attribution Method | Granularity |
|----------------|-------------------|-------------|
| LLM tokens | Per-request metering | Per-tenant |
| Embedding tokens | Per-document tracking | Per-tenant |
| Vector storage | Namespace-based | Per-tenant |
| Compute time | Resource monitoring | Per-agent |

### Evaluation Metrics

| Metric | Description | Measurement |
|--------|-------------|-------------|
| Relevance | Answer matches query | Human eval + automated |
| Faithfulness | Grounded in context | RAG evaluation |
| Helpfulness | User satisfaction | Feedback signals |
| Safety | No harmful content | Classifier-based |
| Accuracy | Factually correct | Ground truth comparison |

---

## Application Guidelines

When implementing AI observability in a multi-tenant context:

1. **Instrument LLM gateway** - Capture all model calls with tenant context
2. **Log prompts carefully** - Consider PII and store securely
3. **Track cost per tenant** - Enable usage-based billing
4. **Implement trace context** - Correlate agent calls across services
5. **Set up quality evaluations** - Automated quality scoring per tenant
6. **Alert on anomalies** - Unusual usage patterns may indicate issues

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Log full prompts? | Yes with encryption + access controls | Debugging requires prompt visibility |
| Real-time or batch metrics? | Real-time for alerts, batch for analytics | Balance speed with cost |
| Where to store AI traces? | Dedicated observability store, tenant-partitioned | Query performance + isolation |
| How to measure quality? | Automated + sampled human eval | Scale with coverage |
| Cost attribution granularity? | Per-request with tenant ID | Accurate billing |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **AI observability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `ai-observability-*`
- **Monitoring patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `monitoring-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "LLM observability multi-tenant {date}"
- Search: "AI agent monitoring patterns {date}"
- Search: "LangSmith Langfuse observability {date}"

---

## Related Workflows

- `bmad-bam-tenant-aware-observability` - Configure tenant monitoring
- `bmad-bam-agent-runtime-architecture` - Design agent instrumentation
- `bmad-bam-distributed-tracing-design` - Set up distributed tracing
