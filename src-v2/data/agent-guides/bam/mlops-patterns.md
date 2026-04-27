# BAM MLOps Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing MLOps infrastructure, model registries, feature stores, experiment tracking, or ML pipelines for multi-tenant platforms.

**Integrates with:** Architect (Nova persona), Dev agent, Data agent

---

## Core Concepts

### What is Multi-Tenant MLOps?

MLOps in multi-tenant SaaS provides the infrastructure for machine learning operations while maintaining strict tenant isolation. It encompasses experiment tracking, model registry, feature stores, and ML pipelines that respect tenant boundaries and support tiered resource allocation.

### MLOps Pillars

| Pillar | Purpose | Tenant Impact |
|--------|---------|---------------|
| Experiment Tracking | Track ML experiments | Tenant-scoped projects |
| Model Registry | Version and deploy models | Tenant model isolation |
| Feature Store | Manage ML features | Tenant feature partitions |
| ML Pipelines | Orchestrate ML workflows | Tenant resource quotas |
| Model Monitoring | Track model performance | Tenant-specific metrics |

---

## Application Guidelines

When implementing MLOps in multi-tenant systems:

1. **Isolate all ML artifacts by tenant**: Models, features, experiments, and pipelines must be tenant-scoped
2. **Implement resource quotas**: Prevent noisy neighbor problems in compute-intensive ML workloads
3. **Support shared platform models**: Allow platform-level models accessible to all tenants
4. **Enable tiered capabilities**: Differentiate MLOps features by tenant tier
5. **Maintain audit trails**: Track all ML operations for compliance and debugging

---

## Experiment Tracking Patterns

### Pattern 1: Tenant-Scoped Experiment Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│           Experiment Tracking Hierarchy                  │
│                                                          │
│   Tenant Level                                           │
│   └── Project Level                                      │
│       └── Experiment Level                               │
│           └── Run Level                                  │
│               ├── Parameters                             │
│               ├── Metrics                                │
│               ├── Artifacts                              │
│               └── Tags                                   │
│                                                          │
│   Example:                                               │
│   tenant_abc/                                            │
│   └── fraud-detection/                                   │
│       └── v2-feature-engineering/                        │
│           └── run-20260411-001/                          │
│               ├── params.json                            │
│               ├── metrics.json                           │
│               └── model.pkl                              │
└─────────────────────────────────────────────────────────┘
```

### Pattern 2: Experiment Metadata Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| run_id | UUID | Yes | Unique run identifier |
| tenant_id | UUID | Yes | Tenant context |
| experiment_id | UUID | Yes | Parent experiment |
| user_id | UUID | Yes | Initiating user |
| start_time | ISO8601 | Yes | Run start |
| end_time | ISO8601 | No | Run completion |
| status | enum | Yes | running/completed/failed |
| parameters | JSON | Yes | Hyperparameters |
| metrics | JSON | No | Performance metrics |
| artifacts | URI[] | No | Output locations |

### Pattern 3: Resource Quotas by Tier

| Resource | Free | Pro | Enterprise |
|----------|------|-----|------------|
| Concurrent experiments | 1 | 5 | 20+ |
| Experiment history | 30 days | 1 year | Unlimited |
| Artifact storage | 1 GB | 100 GB | Custom |
| GPU hours/month | 0 | 20 | Custom |
| Max run duration | 1 hour | 24 hours | Unlimited |

---

## Model Registry Patterns

### Pattern 1: Model Lifecycle States

```
┌─────────────────────────────────────────────────────────┐
│               Model Lifecycle States                     │
│                                                          │
│   ┌────────────┐                                        │
│   │ Registered │ Initial upload, not yet validated      │
│   └─────┬──────┘                                        │
│         │                                               │
│         ▼                                               │
│   ┌────────────┐                                        │
│   │  Staging   │ Pre-production testing                │
│   └─────┬──────┘                                        │
│         │                                               │
│    ┌────┴────┐                                          │
│    │         │                                          │
│    ▼         ▼                                          │
│ ┌──────┐ ┌────────┐                                     │
│ │ Prod │ │Archived│ Retired or superseded               │
│ └──────┘ └────────┘                                     │
│                                                          │
│   Transitions require:                                   │
│   - Staging → Production: Approval workflow              │
│   - Production → Archived: Replacement model ready       │
└─────────────────────────────────────────────────────────┘
```

### Pattern 2: Model Metadata Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| model_id | UUID | Yes | Unique identifier |
| tenant_id | UUID | Yes | Owning tenant |
| name | string | Yes | Model name |
| version | semver | Yes | Model version |
| framework | enum | Yes | tensorflow/pytorch/sklearn |
| stage | enum | Yes | Lifecycle state |
| created_at | ISO8601 | Yes | Creation time |
| created_by | UUID | Yes | Creating user |
| metrics | JSON | No | Evaluation metrics |
| signature | JSON | No | Input/output schema |
| lineage | JSON | No | Training data lineage |

### Pattern 3: Multi-Tenant Model Serving

```
┌─────────────────────────────────────────────────────────┐
│           Multi-Tenant Model Serving Options             │
│                                                          │
│   Shared Endpoint (Cost-Efficient)                       │
│   ┌─────────────────────────────────────────────┐       │
│   │              Load Balancer                   │       │
│   │                   │                          │       │
│   │    ┌──────────────┼──────────────┐          │       │
│   │    ▼              ▼              ▼          │       │
│   │ [Model A]    [Model B]     [Model C]        │       │
│   │  Tenant 1     Tenant 2      Tenant 3        │       │
│   │                                             │       │
│   │  Request routing via tenant_id header       │       │
│   └─────────────────────────────────────────────┘       │
│                                                          │
│   Dedicated Endpoint (Enterprise)                        │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│   │  Tenant 1   │  │  Tenant 2   │  │  Tenant 3   │    │
│   │  Endpoint   │  │  Endpoint   │  │  Endpoint   │    │
│   │  [Model]    │  │  [Model]    │  │  [Model]    │    │
│   └─────────────┘  └─────────────┘  └─────────────┘    │
│                                                          │
│   Full network and compute isolation                    │
└─────────────────────────────────────────────────────────┘
```

---

## Feature Store Patterns

### Pattern 1: Feature Store Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Feature Store Architecture                  │
│                                                          │
│   ┌─────────────────────────────────────────────┐       │
│   │           Feature Registry                   │       │
│   │   Definitions, Schemas, Metadata            │       │
│   └──────────────────┬──────────────────────────┘       │
│                      │                                   │
│        ┌─────────────┼─────────────┐                    │
│        │             │             │                    │
│        ▼             ▼             ▼                    │
│   ┌─────────┐   ┌─────────┐   ┌─────────┐              │
│   │ Offline │   │ Online  │   │   API   │              │
│   │  Store  │   │  Store  │   │ Server  │              │
│   │(Parquet)│   │ (Redis) │   │         │              │
│   └─────────┘   └─────────┘   └─────────┘              │
│       │             │             │                    │
│       │    Batch    │  Real-time  │   On-demand       │
│       │   Training  │  Inference  │   Features        │
│       └─────────────┴─────────────┘                    │
└─────────────────────────────────────────────────────────┘
```

### Pattern 2: Feature Types

| Type | Computation | Storage | Use Case |
|------|-------------|---------|----------|
| Batch | Scheduled ETL | Offline store | Training |
| Streaming | Real-time | Online store | Inference |
| On-demand | Request-time | Computed | Dynamic features |
| Point-in-time | Historical lookup | Offline store | Backtesting |

### Pattern 3: Multi-Tenant Feature Isolation

```
┌─────────────────────────────────────────────────────────┐
│           Feature Isolation Strategies                   │
│                                                          │
│   Offline Store (Parquet/Delta Lake)                    │
│   └── Partition by tenant_id                            │
│       tenant_id=abc/feature_group=users/                │
│       tenant_id=def/feature_group=users/                │
│                                                          │
│   Online Store (Redis)                                   │
│   └── Key prefix with tenant_id                         │
│       tenant:abc:user:123:features                      │
│       tenant:def:user:456:features                      │
│                                                          │
│   Feature Registry                                       │
│   └── RLS policies on tenant_id column                  │
│       SELECT * FROM features WHERE tenant_id = ?        │
└─────────────────────────────────────────────────────────┘
```

---

## ML Pipeline Patterns

### Pattern 1: Pipeline Architecture

```
┌─────────────────────────────────────────────────────────┐
│              ML Pipeline Architecture                    │
│                                                          │
│   ┌─────────────────────────────────────────────┐       │
│   │           Pipeline Orchestrator              │       │
│   │   (Airflow/Kubeflow/Prefect/Dagster)        │       │
│   └──────────────────┬──────────────────────────┘       │
│                      │                                   │
│   ┌──────────────────▼──────────────────────────┐       │
│   │              Pipeline Stages                 │       │
│   │                                              │       │
│   │   ┌──────┐   ┌──────┐   ┌──────┐   ┌─────┐ │       │
│   │   │ Data │──►│Prep  │──►│Train │──►│Eval │ │       │
│   │   │Ingest│   │      │   │      │   │     │ │       │
│   │   └──────┘   └──────┘   └──────┘   └──────┘│       │
│   │                                      │     │       │
│   │                               ┌──────▼────┐│       │
│   │                               │  Deploy   ││       │
│   │                               └───────────┘│       │
│   └─────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────┘
```

### Pattern 2: Tenant Resource Allocation

| Stage | Isolation | Resource Pool |
|-------|-----------|---------------|
| Data Ingestion | Tenant namespace | Shared cluster |
| Preprocessing | Tenant container | Per-tenant limits |
| Training | GPU allocation | Tier-based quota |
| Evaluation | Tenant namespace | Shared cluster |
| Deployment | Endpoint isolation | Per-tenant or shared |

### Pattern 3: Pipeline Triggers

| Trigger | Use Case | Tenant Scope |
|---------|----------|--------------|
| Manual | Ad-hoc training | User-initiated |
| Scheduled | Periodic retraining | Tenant cron config |
| Event-driven | New data arrival | Tenant event stream |
| Drift-based | Model degradation | Tenant metrics threshold |
| API | External trigger | Authenticated request |

---

## Model Governance Patterns

### Pattern 1: Model Approval Workflow

```
┌─────────────────────────────────────────────────────────┐
│           Model Promotion Workflow                       │
│                                                          │
│   Model Registered                                       │
│         │                                               │
│         ▼                                               │
│   ┌─────────────┐                                       │
│   │ Automated   │ Unit tests, integration tests        │
│   │   Tests     │ Performance benchmarks               │
│   └──────┬──────┘                                       │
│          │ Pass                                         │
│          ▼                                               │
│   ┌─────────────┐                                       │
│   │  Security   │ Bias checks, vulnerability scan      │
│   │   Review    │ Data leakage detection               │
│   └──────┬──────┘                                       │
│          │ Pass                                         │
│          ▼                                               │
│   ┌─────────────┐                                       │
│   │  Human      │ Required for production promotion    │
│   │  Approval   │ Per tenant governance policy         │
│   └──────┬──────┘                                       │
│          │ Approved                                     │
│          ▼                                               │
│   ┌─────────────┐                                       │
│   │  Deployed   │                                       │
│   │ to Staging  │                                       │
│   └─────────────┘                                       │
└─────────────────────────────────────────────────────────┘
```

### Pattern 2: Model Documentation Requirements

| Document | Required For | Contents |
|----------|--------------|----------|
| Model Card | All models | Purpose, performance, limitations |
| Data Sheet | Regulated industries | Training data documentation |
| Bias Report | High-risk models | Fairness analysis |
| Audit Trail | Enterprise tier | All model operations |

---

## Decision Framework

| Question | Recommendation |
|----------|----------------|
| Need reproducible experiments? | Implement experiment tracking with tenant isolation |
| Multiple model versions in prod? | Build model registry with lifecycle states |
| Feature reuse across models? | Deploy tenant-isolated feature store |
| Automated retraining needed? | Design ML pipelines with tenant quotas |
| Model governance required? | Implement approval workflows and audit trails |

---

## Related Workflows

- `bmad-bam-ai-model-registry` - Design model registry
- `bmad-bam-model-deployment-pipeline` - Design model deployment pipelines
- `bmad-bam-model-fine-tuning-design` - Design model fine-tuning workflows
- `bmad-bam-llm-evaluation-pipeline` - Design ML evaluation pipelines
- `bmad-bam-agent-runtime-architecture` - AI agent runtime patterns

## Related Patterns

- **ai-runtime:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`
- **tenant-isolation:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **llmops:** `{project-root}/_bmad/bam/data/agent-guides/bam/llmops.md`

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `mlops` | `MLOps multi-tenant SaaS architecture {date}` |
| `model-registry` | `model registry design patterns {date}` |
| `feature-store` | `feature store multi-tenant isolation {date}` |
| `ml-pipelines` | `ML pipeline orchestration best practices {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.
