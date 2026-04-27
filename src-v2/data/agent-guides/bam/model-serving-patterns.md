# Model Serving Patterns

**When to load:** When designing ML model serving infrastructure, implementing model deployment pipelines, or when user mentions model serving, model deployment, inference endpoints, or model scaling in multi-tenant agentic AI platforms.

**Integrates with:** Architect (Nova persona), DevOps agent, Security agent, Analyst agent

---

## Core Concepts

### What is Model Serving?

Model serving is the infrastructure and processes for deploying trained ML models to handle inference requests at scale. In multi-tenant agentic AI platforms, serving must balance tenant isolation, cost efficiency, latency requirements, and resource optimization.

### Serving Architecture Components

| Component | Description | Multi-Tenant Consideration |
|-----------|-------------|---------------------------|
| Model Server | Inference runtime (Triton, TorchServe, vLLM) | Shared vs dedicated |
| Load Balancer | Request distribution | Tenant-aware routing |
| Model Router | Version/model selection | Tenant model mapping |
| Autoscaler | Dynamic scaling | Per-tenant quotas |
| GPU Scheduler | Hardware allocation | Tenant resource isolation |

### Serving Topology Options

```
Shared Serving (cost-optimized)
┌─────────────────────────────────────┐
│         Shared Model Server          │
│  ┌─────────┐ ┌─────────┐ ┌────────┐│
│  │Model A  │ │Model B  │ │Model C ││
│  │(shared) │ │(shared) │ │(shared)││
│  └─────────┘ └─────────┘ └────────┘│
│      All tenants route here         │
└─────────────────────────────────────┘

Dedicated Serving (isolation-optimized)
┌──────────┐  ┌──────────┐  ┌──────────┐
│Tenant A  │  │Tenant B  │  │Tenant C  │
│Server    │  │Server    │  │Server    │
│(isolated)│  │(isolated)│  │(isolated)│
└──────────┘  └──────────┘  └──────────┘

Hybrid Serving (balanced)
┌─────────────────────────────────────┐
│    Shared Pool (Free/Pro tiers)      │
└─────────────────────────────────────┘
┌──────────────────┐ ┌────────────────┐
│  Dedicated (Ent) │ │ Dedicated (Ent)│
│   Tenant A       │ │   Tenant B     │
└──────────────────┘ └────────────────┘
```

---

## Key Patterns

### Pattern 1: Model Deployment Configuration

| Field | Description | Example |
|-------|-------------|---------|
| deployment_id | Unique identifier | `dpl_abc123` |
| model_version_ref | Model version to deploy | `mdl_xyz:2.1.3` |
| tenant_id | Tenant context (null for shared) | `tenant_xyz` |
| serving_config | Runtime configuration | `{"batch_size": 8, "max_batch_delay_ms": 50}` |
| resource_allocation | Compute resources | `{"gpu": "A100", "replicas": 2}` |
| scaling_policy | Autoscaling rules | `{"min": 1, "max": 10, "target_latency_ms": 100}` |
| traffic_allocation | A/B testing weights | `{"v2.1.3": 90, "v2.2.0-beta": 10}` |
| endpoint_url | Inference endpoint | `https://api.platform.com/v1/tenants/{tenant_id}/models/{model_id}/predict` |

### Pattern 2: Tenant Serving Tiers

| Tier | Serving Mode | GPU Access | Latency SLA | Throughput Limit |
|------|--------------|------------|-------------|------------------|
| Free | Shared queue | None (CPU) | Best effort | 100 req/day |
| Pro | Shared pool | Shared GPU | p99 < 500ms | 10K req/day |
| Enterprise | Dedicated | Dedicated GPU | p99 < 100ms | Unlimited |

### Pattern 3: Request Routing

| Routing Strategy | Implementation | Use Case |
|------------------|----------------|----------|
| Tenant header | `X-Tenant-ID` header routing | API gateway level |
| Path-based | `/tenants/{tenant_id}/models/...` | RESTful design |
| Model multiplexing | Model ID encodes tenant | Shared infrastructure |
| Dedicated endpoints | Tenant-specific domains | Maximum isolation |

---

## Application Guidelines

- Designing scalable model serving infrastructure
- Implementing multi-tenant inference endpoints
- Building model deployment automation pipelines
- Creating A/B testing frameworks for models
- Supporting canary deployments and rollbacks
- Optimizing GPU utilization across tenants

---

## Multi-Tenant Considerations

### Resource Isolation

| Isolation Aspect | Implementation | Verification |
|------------------|----------------|--------------|
| Compute isolation | Kubernetes namespaces + resource quotas | Resource monitoring |
| GPU isolation | MIG partitioning or dedicated GPUs | GPU utilization audit |
| Network isolation | Network policies, separate endpoints | Traffic analysis |
| Queue isolation | Per-tenant request queues | Queue depth monitoring |

### Cost Attribution

| Cost Element | Attribution Method | Reporting |
|--------------|-------------------|-----------|
| GPU time | Request metering | Per-tenant usage |
| Storage | Model artifact size | Monthly summary |
| Bandwidth | Egress metering | Per-request |
| Cold starts | Instance initialization | Amortized |

### Scaling Strategies

| Strategy | Description | Multi-Tenant Impact |
|----------|-------------|---------------------|
| Horizontal | Add more replicas | Shared scaling events |
| Vertical | Increase instance size | Tenant-specific upgrade |
| Predictive | Scale before demand | Cross-tenant pattern learning |
| Scheduled | Time-based scaling | Tenant schedule alignment |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Shared vs dedicated serving? | Hybrid: shared for lower tiers, dedicated for Enterprise | Balances cost efficiency with isolation requirements |
| How to handle GPU scarcity? | Priority queuing with tenant tier weighting | Ensures fair access while respecting SLAs |
| Warm vs cold model loading? | Keep frequently used models warm, cold load on-demand | Optimizes cost vs latency tradeoff |
| How to implement model updates? | Blue-green deployment with gradual traffic shift | Zero-downtime updates with rollback capability |
| Should tenants control scaling? | Enterprise tier only, within quotas | Prevents resource abuse while enabling optimization |
| How to handle inference failures? | Retry with exponential backoff, fallback to stable version | Resilient inference with graceful degradation |

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Integrate serving with agent runtime
- `bmad-bam-ai-model-registry` - Version management for served models
- `bmad-bam-ai-observability-setup` - Monitor serving performance
- `bmad-bam-ai-cost-tracking` - Attribute serving costs

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **AI runtime patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`
- **Platform patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `ai-runtime`, `infrastructure`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant model serving infrastructure {date}"
- Search: "LLM inference serving best practices {date}"
- Search: "GPU sharing multi-tenant ML platforms {date}"
