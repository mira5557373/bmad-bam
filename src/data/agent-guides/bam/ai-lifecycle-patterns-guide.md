# BAM AI Lifecycle Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing AI/ML model lifecycle, versioning, prompt management, or model governance. Load when user mentions model versioning, prompt engineering, fine-tuning, model governance, AI lifecycle, agent versioning, or prompt catalog design.

**Integrates with:** Architect (Nova persona), Dev agent, ML Engineer roles, DevOps agent, Security agent

---

## Core Concepts

### AI Lifecycle Phases

| Phase | Activities | Multi-Tenant Consideration |
|-------|------------|---------------------------|
| Development | Training, fine-tuning, evaluation | Per-tenant test environments |
| Staging | Integration testing, bias evaluation | Tenant-representative data |
| Production | Deployment, monitoring | Tenant-scoped model routing |
| Maintenance | Updates, retraining | Coordinated tenant rollouts |
| Retirement | Deprecation, archival | Tenant migration support |

### Multi-Tenant Model Hierarchy

```
Platform Base Models (shared foundation)
        |
        v
Tenant Fine-tuned Models (tenant customization)
        |
        v
Agent-Specific Models (per-agent specialization)
        |
        v
Version History (complete lineage)
```

### Lifecycle Component Matrix

| Component | Versioned | Tenant-Scoped | Hot-Swappable |
|-----------|-----------|---------------|---------------|
| LLM Provider Version | Yes | Per-tier | No |
| Fine-tuned Adapters | Yes | Yes | Yes |
| Prompt Templates | Yes | Yes | Yes |
| Agent Code | Yes | No (shared) | No |
| Tool Definitions | Yes | Tier-limited | Yes |

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and must be followed for all AI lifecycle implementations in multi-tenant platforms.

### Model Versioning Format

```
{scope}:{model-type}-{name}@v{major}.{minor}.{patch}[-{prerelease}]

Examples:
- platform:llm-chat@v2.1.3
- tenant_abc:adapter-billing@v1.0.0-rc1
```

| Scope | Description | Versioning Authority |
|-------|-------------|---------------------|
| `platform:` | Shared across all tenants | Platform team |
| `tenant_{id}:` | Tenant-specific models | Tenant (with approval) |
| `agent_{id}:` | Agent-specific variants | Agent owner |

### Prompt Catalog Structure

```
prompts/
  platform/           # Platform-wide prompts (immutable)
  tiers/{tier}/       # Tier-specific defaults
  tenants/{id}/       # Tenant overrides
```

### Version Lifecycle States

| State | Traffic | Tenant Access |
|-------|---------|---------------|
| Draft | 0% | Author only |
| Testing | 0% (test env) | Test users |
| Staged | 1-5% (canary) | Select tenants |
| Active | 100% (primary) | All eligible |
| Deprecated | Declining | Legacy only |
| Retired | 0% | None |

### Per-Tier Configuration Bounds

| Configuration | Free | Pro | Enterprise |
|---------------|------|-----|------------|
| Temperature | Fixed | 0.1-0.9 | 0.0-1.0 |
| Max Tokens | 2K | 4K | 8K+ |
| System Prompt | Platform only | Additive | Full override |
| Custom Models | No | Base models | Full capability |
| Version Pinning | Platform-managed | Optional | Full control |

---

## Decision Framework

| Scenario | Pattern | Rationale |
|----------|---------|-----------|
| New tenant onboarding | Tier-default prompts | Consistent baseline |
| Enterprise customization | Tenant fine-tuning | Compliance/brand requirements |
| Poor task completion | Prompt A/B testing | Data-driven optimization |
| Model quality degradation | Automated rollback | Minimize tenant impact |
| Cross-tenant mentions | Response sanitization | Prevent data leakage |

### Model Isolation Decision Matrix

| Requirement | Shared Base | LoRA | Full Fine-Tune |
|-------------|-------------|------|----------------|
| Cost | Best | Good | Medium |
| Customization | None | Moderate | High |
| Data isolation | RLS | Training isolated | Complete |
| Recommended tier | Free | Pro | Enterprise |

---

## §model-versioning
### Pattern: Model Versioning

Model versioning tracks LLM provider versions, ML model artifacts, and tenant-specific adaptations.

### Model Registry Schema

| Field | Type | Description |
|-------|------|-------------|
| model_id | String | Unique identifier |
| version | String | Semantic version |
| tenant_id | UUID | Tenant scope (null for platform) |
| model_type | Enum | `llm`, `classifier`, `embeddings` |
| base_model_ref | String | Parent model reference |
| artifact_uri | URI | Storage location |
| status | Enum | Lifecycle status |
| approved_by | String | Approver identifier |
| deprecation_date | Date | Scheduled retirement |

### Multi-Tenant Registry Access

| Scope | Read | Write | Version Control |
|-------|------|-------|-----------------|
| Platform | All tenants | Platform team | Global |
| Tenant | Tenant only | Tenant (approved) | Per-tenant |
| Agent | Owning tenant | Agent owner | Agent-scoped |

### Rollout Strategies

| Strategy | Risk | Use Case |
|----------|------|----------|
| Canary (5%) | Low | Minor updates |
| Ring-based | Medium | Major changes |
| Feature flag | Low | Beta programs |
| Big bang | High | Security fixes |

### Deprecation Workflow

| Phase | Duration | Actions |
|-------|----------|---------|
| Announcement | 30 days | Notify tenants |
| Migration | 60 days | Provide tools |
| Soft deprecation | 30 days | Usage warnings |
| Hard deprecation | Final | Route to replacement |

---

## §prompt-management
### Pattern: Prompt Management

Prompt management encompasses catalogs, engineering practices, tenant customization, and A/B testing.

### Prompt Architecture

```
+-----------------------------------------------------+
|                 System Prompt                        |
|  +-----------------------------------------------+  |
|  | Platform Layer (Immutable)                     |  |
|  | - Safety guardrails, format rules              |  |
|  +-----------------------------------------------+  |
|  | Tenant Layer (Per-Tenant Config)               |  |
|  | - Brand voice, domain knowledge                |  |
|  +-----------------------------------------------+  |
|  | User Layer (Per-User Context)                  |  |
|  | - Role, permissions, preferences               |  |
|  +-----------------------------------------------+  |
+-----------------------------------------------------+
```

### Prompt Hierarchy

| Level | Scope | Override | Governance |
|-------|-------|----------|------------|
| Platform | All tenants | Immutable | Platform team |
| Tier | Tenant tier | Tier features | Platform rules |
| Tenant | Single tenant | Full customize | Approval required |
| User | Individual | Preferences | Automatic |

### Variable Injection Safety

| Risk | Mitigation |
|------|------------|
| Prompt injection | Input sanitization, length limits |
| Data leakage | Tenant ID validation |
| Privilege escalation | Role permission checks |
| Template tampering | Hash verification |

### A/B Testing Framework

| Element | Control | Variant |
|---------|---------|---------|
| Template | Production | Candidate |
| Traffic | 90% | 10% |
| Duration | - | 7+ days |

**Assignment:** `hash(tenant_id) % 100 < threshold -> variant`

| Result | Action |
|--------|--------|
| Variant wins (p < 0.05) | Promote |
| No difference | Reject |
| Inconclusive | Extend test |

### Prompt Metrics

| Metric | Target |
|--------|--------|
| Success rate | > 90% |
| Quality score | > 4.0/5.0 |
| Latency P95 | < 3s |
| User satisfaction | > 4.0/5.0 |

---

## §model-fine-tuning
### Pattern: Model Fine-Tuning

Tenant-specific fine-tuning enables customization while maintaining data isolation.

### Fine-Tuning Isolation Levels

| Level | Data Isolation | Use Case |
|-------|----------------|----------|
| Shared base | N/A | Free tier |
| LoRA adapters | Training isolated | Pro tier |
| Full fine-tune | Complete | Enterprise |
| Private hosting | Maximum | White-label |

### Training Data Isolation

| Component | Implementation |
|-----------|----------------|
| Training data | S3/GCS prefix isolation |
| Validation sets | Namespace partitioning |
| Model weights | Encrypted per-tenant keys |
| Training logs | Tenant-tagged aggregation |

### Training Quotas

| Tier | Jobs/Month | GPU Hours |
|------|------------|-----------|
| Free | 0 | N/A |
| Pro | 2 | 10 |
| Enterprise | Unlimited | 100+ |

### Security Considerations

| Risk | Mitigation |
|------|------------|
| Data leakage | Isolated storage, encryption |
| Model extraction | Rate limiting, monitoring |
| Poisoning attacks | Input validation, anomaly detection |
| Unauthorized access | RBAC on training APIs |

---

## §model-governance
### Pattern: Model Governance

Model governance ensures AI models meet quality, safety, and compliance requirements.

### Approval Workflow

| Stage | Reviewers | Duration |
|-------|-----------|----------|
| Technical | ML Engineer | 2-5 days |
| Security | Security Team | 3-5 days |
| Bias | Ethics Committee | 3-7 days |
| Business | Product Owner, Legal | 2-3 days |
| Final | ML Lead, Architect | 1-2 days |

### Approval Decisions

| Decision | Condition | Action |
|----------|-----------|--------|
| Approved | All pass | Deploy |
| Conditional | Minor issues | Proceed with plan |
| Revision | Major issues | Return to dev |
| Rejected | Fundamental issues | Halt |

### Bias Monitoring

| Bias Type | Metric | Threshold |
|-----------|--------|-----------|
| Demographic Parity | Selection rate ratio | 0.8-1.2 |
| Equalized Odds | TPR/FPR ratio | 0.8-1.2 |
| Predictive Parity | PPV ratio | 0.8-1.2 |
| Individual Fairness | Similarity score | >0.9 |

### Audit Requirements

| Event Category | Retention |
|----------------|-----------|
| Model Lifecycle | 7 years |
| Access | 3 years |
| Configuration | 7 years |
| Decisions | 3 years (or regulatory) |
| Incidents | 7 years |

### Compliance Mapping

| Regulation | Implementation |
|------------|----------------|
| EU AI Act | Risk assessment, model cards |
| GDPR | Training data audit, explainability |
| SOC 2 | Approval workflows, audit trails |
| ISO 27001 | RBAC, audit logging |

---

## §agent-versioning
### Pattern: Agent Versioning

Agent versioning manages the complete lifecycle including code, prompts, models, and tools.

### Agent Version Format

```
agent-name@v{major}.{minor}.{patch}[-{prerelease}]

Examples:
- billing-agent@v2.3.1
- support-agent@v1.0.0-rc1
```

### Version Increment Rules

| Component | Increment When |
|-----------|----------------|
| Major | Breaking changes |
| Minor | New features |
| Patch | Bug fixes |
| Prerelease | Testing |

### Multi-Tenant Strategies

| Strategy | Use Case |
|----------|----------|
| Global Version | Standard deployments |
| Tenant Pinning | Enterprise stability |
| Tier-Based | Feature differentiation |
| Opt-In Beta | Early adopters |

### Rollback Strategies

| Strategy | Speed | Use Case |
|----------|-------|----------|
| Instant | < 1 min | Feature flags |
| Container | < 5 min | Kubernetes |
| Database | 15-30 min | Schema changes |
| Full Restore | 1+ hour | Disaster recovery |

### Rollback Triggers

| Trigger | Auto-Rollback |
|---------|---------------|
| Error rate >5% | Yes |
| Latency >2x baseline | Yes |
| Bias violation | No (manual) |
| Security vulnerability | Yes |
| Compliance violation | No (manual) |

---

## Quality Gates

### QG-AI1: Model Governance Gate

| Check | Critical |
|-------|----------|
| Model card complete | Yes |
| Bias review passed | Yes |
| Security review passed | Yes |
| Performance baseline met | Yes |
| Approval workflow complete | Yes |
| Audit trail enabled | Yes |
| Rollback documented | Yes |

### QG-AI2: Prompt Safety Gate

| Check | Critical |
|-------|----------|
| Safety guardrails present | Yes |
| Tenant isolation verified | Yes |
| Input sanitization active | Yes |
| Output filtering enabled | Yes |
| A/B test complete | No |
| Performance within SLA | Yes |
| Regression tests passed | Yes |

### Recovery Protocol

1. **Attempt 1:** Address failures, re-run validation
2. **Attempt 2:** Review with senior ML engineer
3. **Attempt 3:** Course correction with leadership

---

## Web Research

| Topic | Query |
|-------|-------|
| Model versioning | "ML model versioning best practices {date}" |
| Multi-tenant models | "multi-tenant model registry patterns {date}" |
| LLM versioning | "LLMOps model versioning SaaS platforms {date}" |
| Prompt engineering | "prompt engineering multi-tenant AI {date}" |
| Prompt catalogs | "prompt management systems enterprise {date}" |
| Model fine-tuning | "LLM fine-tuning multi-tenant isolation {date}" |
| LoRA adapters | "LoRA adapter deployment multi-tenant {date}" |
| Model governance | "AI model governance framework enterprise {date}" |
| Bias monitoring | "ML model bias monitoring production {date}" |
| Agent versioning | "AI agent versioning patterns {date}" |
| Canary deployments | "LLM deployment canary strategies {date}" |
| Compliance AI | "EU AI Act model documentation requirements {date}" |

---

## Related Patterns

> **Note:** Use the `web_queries` column from pattern registry CSVs for current best practices searches.

Load decision criteria and web search queries from pattern registry:

- **AI runtime patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv` -> all rows
- **Quality gates:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-AI1`, `QG-AI2`, `QG-M3`
- **Platform patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `llmops`, `agent-runtime`, `ml-ops`
- **Compliance:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` -> filter for AI governance

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Design AI runtime with model governance
- `bmad-bam-ai-eval-safety-design` - Configure model safety and bias evaluation
- `bmad-bam-model-deployment-pipeline` - Design model deployment pipelines
- `bmad-bam-tenant-aware-observability` - Model monitoring infrastructure
- `bmad-bam-api-version-release` - Model and API version release management
- `bmad-bam-tenant-onboarding-design` - Tenant prompt and model customization
- `bmad-bam-tenant-tier-migration` - Model access during tier changes
- `validate-tool-contract` - Model-tool integration governance

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-25 | Initial consolidated guide from 7 source files: ai-model-governance.md, prompt-catalog-guide.md, prompt-engineering-guide.md, model-fine-tuning-guide.md, ml-model-versioning.md, agent-lifecycle-versioning-patterns.md, llm-versioning.md |
