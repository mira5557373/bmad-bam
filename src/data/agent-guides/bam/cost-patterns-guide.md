# BAM Cost Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing cost attribution, usage-based billing, quota enforcement, LLM cost tracking, or billing integration. Load when user mentions billing, metering, quotas, cost optimization, token budgets, or reseller revenue.

**Integrates with:** Architect (Atlas persona), Dev agent, PM agent, DevOps agent

---

## Core Concepts

### Cost Attribution Model

Multi-tenant cost management requires tracking costs at multiple layers with accurate tenant attribution:

| Layer | Examples | Attribution Method |
|-------|----------|-------------------|
| Infrastructure | Compute, storage | Resource tagging |
| Platform | Database, cache | Usage metering |
| Third-party | AI APIs, SMS | Direct API costs |
| Shared | Load balancers | Proportional allocation |

### Metering Dimensions

| Dimension | Description | Example Metrics |
|-----------|-------------|-----------------|
| Request-based | API calls, agent runs | Requests/month |
| Storage-based | Data volume, files | GB stored |
| Compute-based | Processing time, tokens | CPU-hours, tokens |
| Feature-based | Feature access | Active features |

### Billing Models

| Model | Description | Use Case |
|-------|-------------|----------|
| Subscription | Fixed recurring fee | Base platform access |
| Usage-based | Pay per consumption | AI tokens, API calls |
| Hybrid | Base + overage | Most SaaS platforms |
| Tiered | Volume discounts | High-volume tenants |
| Credit-based | Prepaid consumption | Enterprise commitments |

---

## BAM Conventions

### Rate Limit Key Format

```
ratelimit:{tenant}:{endpoint}
```

### Per-Tenant Cost Tracking

| Metric | Measurement | Granularity |
|--------|-------------|-------------|
| API Calls | Per-request counter | Per-tenant, per-endpoint |
| Compute Time | Container CPU-seconds | Per-tenant, per-service |
| Storage | GB-months | Per-tenant, per-type |
| LLM Tokens | Input + output tokens | Per-tenant, per-model |

### Per-Tier Quota Matrix

| Resource | Free | Pro | Enterprise |
|----------|------|-----|------------|
| API calls/min | 60 | 600 | 6000 |
| Storage (GB) | 1 | 50 | 500 |
| AI tokens/month | 10K | 500K | 5M |
| Agent runs/month | 100 | 5000 | Unlimited |

---

## Decision Framework

### Billing Model Selection

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| AI/LLM features? | Usage-based with optional credits | Aligns cost with value |
| Simple tier pricing? | Averaged cost model | Less complexity |
| Metering latency tolerance? | Real-time for quota, batch for invoicing | Balance accuracy with cost |
| Free tier billing? | Yes, capture usage | Enables upgrade prompts |
| Grace period length? | 7 days with escalation | Balance retention with revenue |

### Provider Selection

| Scenario | Recommendation | Rationale |
|----------|----------------|-----------|
| < 1000 tenants | Stripe/Paddle | Lower complexity |
| Enterprise focus | Custom billing | Flexible contracts |
| International | Paddle | Tax handling |
| High compliance | Custom + Audit | Full control |

---

## §cost-tracking

### Pattern: Cost Tracking

**When to use:** Attributing infrastructure, platform, and third-party costs to tenants
**Phase:** solutioning

#### Attribution Flow

```
Resource Usage --> Metering Pipeline --> Cost Engine
     |                   |                   |
     v                   v                   v
   Tags              Events            Rate Cards
```

### Resource Tagging Strategy

| Tag Key | Purpose | Example |
|---------|---------|---------|
| `tenant_id` | Primary attribution | `tenant_abc123` |
| `tier` | Pricing tier | `pro` |
| `module` | Feature attribution | `ai-runtime` |

### Shared Resource Allocation

| Model | Formula | Best For |
|-------|---------|----------|
| Equal split | Cost / tenant_count | Simple |
| Usage-weighted | Cost * (tenant_usage / total) | Metered |
| Tier-weighted | Cost * tier_weight | Tiered pricing |

### Third-Party Pass-Through

| Service | Margin | Model |
|---------|--------|-------|
| OpenAI/LLM | 1.2x | Usage-based |
| Twilio/SMS | 1.5x | Usage-based |
| SendGrid | Included | Bundled |

---

## §usage-metering

### Pattern: Usage Metering

**When to use:** Capturing, aggregating, and storing tenant resource consumption
**Phase:** solutioning

#### Metering Pipeline

| Stage | Responsibility | Latency |
|-------|----------------|---------|
| Capture | Emit usage events | Real-time |
| Enrich | Add tenant/user context | < 100ms |
| Aggregate | Hourly/daily rollups | Batch |
| Store | Persist to usage store | Async |
| Rate | Apply pricing rules | On-demand |
| Invoice | Generate billing records | Monthly |

### Aggregation Hierarchy

| Level | Retention | Query Access |
|-------|-----------|--------------|
| Raw events | 7 days | Debug only |
| Hourly | 90 days | Analytics |
| Daily | 2 years | Reports |
| Billing period | 7 years | Compliance |

### Accuracy Guarantees

| Guarantee | Implementation |
|-----------|----------------|
| At-least-once delivery | Retry with idempotency |
| Eventual consistency | Async reconciliation |
| Audit trail | Immutable event log |
| Dispute resolution | Raw event access |

---

## §quota-management

### Pattern: Quota Management

**When to use:** Enforcing resource limits and handling overage scenarios
**Phase:** solutioning

#### Overage Handling Strategies

| Strategy | Behavior | Use Case |
|----------|----------|----------|
| Hard Block | Reject at limit | Free tier |
| Soft Cap | Allow with warning | Pro tier |
| Pay-as-you-go | Charge overage | Enterprise |
| Burst Pool | Temporary allowance | All tiers |

### Grace Period Flow

```
NORMAL --(80%)--> WARNING --(100%)--> GRACE --(110%)--> BLOCKED
   ^                                       |
   +-----------(period reset)-------------+
```

### HTTP Response Patterns

| Scenario | Status | Header |
|----------|--------|--------|
| Within quota | 200 | `X-Quota-Remaining: N` |
| Near limit | 200 | `X-Quota-Warning: true` |
| Rate limited | 429 | `Retry-After: N` |
| Quota exceeded | 402 | `X-Quota-Reset: timestamp` |

---

## §llm-cost

### Pattern: LLM Cost Optimization

**When to use:** Optimizing AI/LLM token costs through caching, routing, and budget enforcement
**Phase:** solutioning

#### Token Metering

| Model | Input Cost (per 1K) | Output Cost (per 1K) |
|-------|---------------------|----------------------|
| GPT-4o | $0.005 | $0.015 |
| GPT-4o-mini | $0.00015 | $0.0006 |
| Claude 3.5 Sonnet | $0.003 | $0.015 |

### Optimization Strategies

| Strategy | Implementation | Savings Potential |
|----------|----------------|-------------------|
| Semantic caching | Cache similar prompts | 30-50% |
| Model tiering | Route by complexity | 20-40% |
| Prompt compression | Reduce context size | 10-20% |
| Batch processing | Aggregate requests | 15-25% |

### Model Routing

| Request Type | Recommended Model | Cost Profile |
|--------------|-------------------|--------------|
| Simple queries | GPT-4o-mini | Low |
| Complex reasoning | GPT-4o | Medium |
| Critical tasks | Claude 3.5 Sonnet | Medium-High |
| Bulk processing | Batched lower-tier | Very Low |

### Budget Enforcement

| Budget Type | Enforcement Level | Action on Exceed |
|-------------|-------------------|------------------|
| Soft limit | Warning | Alert tenant, continue |
| Hard limit | Blocking | Reject requests |
| Rate limit | Per-minute | Queue or throttle |
| Daily cap | Per-day | Block until reset |

---

## §billing-integration

### Pattern: Billing Integration

**When to use:** Integrating with payment providers for subscription and usage billing
**Phase:** integration

#### Stripe Integration Points

| Stripe Object | SaaS Mapping | Tenant Data |
|---------------|--------------|-------------|
| Customer | Tenant account | tenant_id |
| Subscription | Service plan | tier, features |
| Price | Pricing tier | rate, model |
| Invoice | Billing period | usage summary |
| UsageRecord | Metered usage | dimension, quantity |

### Subscription Lifecycle

```
TRIAL --> ACTIVE --> PAST_DUE --> CANCELED
            |
          PAUSED
```

| State | Billing Action | Access Level |
|-------|---------------|--------------|
| TRIAL | No charge | Full features |
| ACTIVE | Regular billing | Full features |
| PAST_DUE | Retry payment | Degraded |
| PAUSED | No charge | Read-only |
| CANCELED | Final invoice | None |

### Grace Period Handling

| Event | Grace Period | Actions |
|-------|--------------|---------|
| Payment failed | 7 days | Notify, retry 3x |
| Card expiring | 30 days | Warning emails |
| Subscription lapsed | 14 days | Read-only mode |
| Final notice | 7 days | Data export offered |

---

## §reseller

### Pattern: Reseller Billing

**When to use:** Implementing partner/reseller billing models and white-label invoicing
**Phase:** integration

#### Partner Revenue Models

| Model | Description | Best For |
|-------|-------------|----------|
| Referral Fee | One-time payment per customer | Lead generation |
| Revenue Share | Percentage of recurring revenue | Resellers |
| Wholesale | Discounted pricing, reseller sets price | Full white-label |
| Hybrid | Base plus commission | Strategic partnerships |

### Partner Tier Commission

| Tier | Requirements | Commission |
|------|--------------|------------|
| Registered | Basic agreement | 10% |
| Silver | 5+ customers | 20% |
| Gold | 20+ customers | 30% |
| Platinum | Enterprise commitment | 40% |

### White-Label Billing Layers

| Layer | Customization | Tier Required |
|-------|---------------|---------------|
| Domain | Custom URLs | Silver+ |
| Branding | Logo, colors | Silver+ |
| Email templates | Custom sender | Gold+ |
| Invoice branding | Custom invoices | Platinum |

---

## Quality Gates

### Cost Tracking Verification

- [ ] All resources tagged with tenant_id
- [ ] Usage events include full context (tenant, user, feature)
- [ ] Shared resource allocation formula documented
- [ ] Third-party costs tracked with margin applied
- [ ] Cost dashboards available per tenant

### Billing Integration Verification

- [ ] Webhook handlers are idempotent
- [ ] Payment retry logic with exponential backoff
- [ ] Grace periods configured per tier
- [ ] Dunning notifications automated
- [ ] PCI compliance verified (no raw card storage)

### LLM Cost Verification

- [ ] Token metering at request level
- [ ] Model routing rules documented
- [ ] Budget alerts configured (50%, 75%, 90%, 100%)
- [ ] Semantic caching evaluated
- [ ] Per-tenant cost attribution accurate

---

## Web Research

Use the `web_queries` column from pattern registry to search for current best practices:

| Topic | Web Search Query |
|-------|------------------|
| Cost tracking | `cost allocation multi-tenant SaaS {date}` |
| Usage metering | `usage-based billing patterns multi-tenant SaaS {date}` |
| Billing integration | `Stripe multi-tenant SaaS integration {date}` |
| LLM costs | `LLM cost optimization multi-tenant {date}` |
| Quota management | `quota management SaaS multi-tenant {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Cost patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `cost-*`, `usage-metering`, `quota-management`
- **Billing patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `billing-*`
- **LLM patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `llm-cost-tracking`, `token-budgeting`

---

## Related Workflows

- `bmad-bam-usage-metering-design` - Design usage metering for cost attribution
- `bmad-bam-tenant-model-isolation` - Implement tenant-scoped cost tracking
- `bmad-bam-tenant-onboarding-design` - Configure billing during tenant provisioning
- `bmad-bam-tenant-offboarding-design` - Handle billing during tenant offboarding
- `bmad-bam-tenant-tier-migration` - Adjust cost tracking during tier changes
- `bmad-bam-tenant-aware-observability` - Monitor cost metrics per tenant

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | {date} | Initial consolidated guide from 8 source files |
