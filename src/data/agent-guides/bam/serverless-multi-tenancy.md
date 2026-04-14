# Serverless Multi-Tenancy Patterns

**When to load:** When designing serverless architecture for multi-tenant SaaS, implementing Lambda/Functions-based workloads, or when user mentions cold starts, per-tenant isolation in functions, or serverless cost attribution.

**Integrates with:** Architect (Atlas persona), DevOps agent, Developer agent

---

## Core Concepts

### What is Serverless Multi-Tenancy?

Serverless multi-tenancy involves running tenant workloads on function-as-a-service platforms (AWS Lambda, Azure Functions, Google Cloud Functions) while maintaining isolation, performance, and cost visibility. Unlike traditional compute, serverless introduces unique challenges around cold starts, execution context, and ephemeral state management.

### Serverless Tenancy Models

| Model | Description | Isolation Level | Cost Efficiency |
|-------|-------------|-----------------|-----------------|
| Shared function | All tenants use same function | Low | Highest |
| Function per tenant | Dedicated function per tenant | High | Low |
| Account per tenant | Separate cloud account | Maximum | Lowest |
| Hybrid | Shared by default, dedicated for enterprise | Medium-High | Medium |

### Tenant Context Flow

```
+------------------------------------------------------------------+
|  API Gateway          Lambda Function         Downstream Services |
|  +-----------+       +----------------+       +------------------+|
|  | Extract   |  -->  | Validate       |  -->  | Propagate        ||
|  | Tenant ID |       | Tenant Context |       | Via Headers/Env  ||
|  +-----------+       +----------------+       +------------------+|
|  Sources: JWT, Header, Path, API Key                              |
+------------------------------------------------------------------+
```

---

## Lambda/Functions Per-Tenant Isolation

### Isolation Strategies

| Strategy | Implementation | Use Case | Complexity |
|----------|----------------|----------|------------|
| Runtime isolation | Tenant ID in execution context | Most SaaS apps | Low |
| VPC isolation | Tenant-specific VPC/subnet | Network security | Medium |
| Account isolation | AWS Organization per tenant | Regulated industries | High |
| Layer isolation | Tenant-specific Lambda layers | Custom dependencies | Medium |

### Per-Tenant Function Configuration

| Configuration | Shared Approach | Dedicated Approach |
|---------------|-----------------|-------------------|
| Memory | Single setting for all | Per-tenant sizing |
| Timeout | Fixed maximum | Tier-based limits |
| Concurrency | Shared pool | Reserved concurrency |
| Environment | Tenant lookup at runtime | Tenant-specific vars |
| IAM role | Cross-tenant with RLS | Per-tenant IAM |

### Execution Environment

| Component | Tenant Isolation Method | Verification |
|-----------|------------------------|--------------|
| Memory | Process isolation (automatic) | Runtime guarantee |
| Temp storage (/tmp) | Clear between invocations | Security audit |
| Global variables | Tenant-scoped namespacing | Code review |
| Database connections | Connection string per tenant | Config validation |

---

## Cold Start Mitigation Strategies

### Cold Start Impact by Tier

| Tier | Acceptable Latency | Mitigation Investment |
|------|-------------------|----------------------|
| Free | < 5s | Minimal (shared warming) |
| Pro | < 1s | Moderate (provisioned) |
| Enterprise | < 200ms | Maximum (dedicated) |

### Mitigation Techniques

| Technique | Description | Cost Impact | Effectiveness |
|-----------|-------------|-------------|---------------|
| Provisioned concurrency | Pre-warmed instances | High | Excellent |
| Scheduled warming | Periodic invocations | Low | Good |
| Smaller packages | Reduce init time | None | Moderate |
| Connection pooling | Reuse DB connections | None | Moderate |
| Layer optimization | Shared dependencies | Low | Good |
| Edge functions | Closer to users | Medium | Excellent |

### Provisioned Concurrency Strategy

| Scenario | Allocation Strategy | Cost Model |
|----------|---------------------|------------|
| Predictable traffic | Fixed provisioned | Flat rate |
| Variable traffic | Auto-scaling provisioned | Usage-based |
| Burst patterns | On-demand + provisioned baseline | Hybrid |
| Per-tenant SLA | Tenant-specific provisioning | Premium tier |

### Warming Schedule Patterns

| Traffic Pattern | Warming Frequency | Target Functions |
|-----------------|-------------------|-----------------|
| Business hours | Every 5 min (9-5) | User-facing APIs |
| 24/7 operations | Every 10 min | Critical paths |
| Batch processing | Before job start | Processing functions |
| Event-driven | Event pattern analysis | Triggered functions |

---

## Tenant Context in Function Invocations

### Context Injection Points

| Injection Point | Method | Persistence |
|-----------------|--------|-------------|
| API Gateway | Authorizer output | Per-request |
| Event source | Message attributes | Event lifetime |
| Environment | Lookup on cold start | Instance lifetime |
| Parameter Store | Cached retrieval | Configurable TTL |

### Context Validation

| Validation | Implementation | Failure Action |
|------------|----------------|----------------|
| Tenant exists | Database/cache lookup | 404 Not Found |
| Tenant active | Status check | 403 Forbidden |
| Tier permissions | Entitlement check | 403 Forbidden |
| Rate limit | Counter check | 429 Too Many |

### Propagation to Downstream Services

| Service Type | Propagation Method | Context Fields |
|--------------|-------------------|----------------|
| Lambda invoke | Payload/context | tenant_id, tier, user_id |
| SQS/SNS | Message attributes | tenant_id, correlation_id |
| Step Functions | Input/context | Full tenant context |
| HTTP services | Headers | X-Tenant-ID, X-Correlation-ID |
| Database | Session variable | app.current_tenant |

---

## Concurrency Limits Per Tenant

### Concurrency Allocation Model

| Tier | Reserved Concurrency | Burst Allowance | Throttle Behavior |
|------|---------------------|-----------------|-------------------|
| Free | 5 | 2x for 10s | Hard throttle |
| Pro | 50 | 3x for 30s | Soft throttle + queue |
| Enterprise | 500 | Custom | Overflow to dedicated |

### Implementation Approaches

| Approach | Mechanism | Granularity |
|----------|-----------|-------------|
| Account limits | AWS service quotas | Account-wide |
| Function limits | Reserved concurrency | Per-function |
| Custom limiting | Semaphore in cache | Per-tenant |
| Queue-based | SQS with visibility | Per-message |

### Noisy Neighbor Prevention

| Problem | Detection | Mitigation |
|---------|-----------|------------|
| Concurrency exhaustion | CloudWatch metrics | Reserved allocation |
| Memory pressure | Function monitoring | Per-tenant quotas |
| Downstream saturation | Connection pooling | Circuit breakers |
| Cold start cascade | Latency spikes | Provisioned concurrency |

---

## Cost Attribution for Serverless

### Cost Dimensions

| Dimension | Attribution Method | Accuracy |
|-----------|-------------------|----------|
| Invocations | Tagged per tenant | High |
| Duration | Execution time tracking | High |
| Memory | Allocated memory * time | Medium |
| Data transfer | Tagged traffic | Medium |
| Provisioned concurrency | Allocation percentage | High |
| Storage (S3, DynamoDB) | Resource tagging | High |

### Tagging Strategy

| Tag | Purpose | Example |
|-----|---------|---------|
| tenant_id | Primary attribution | t_abc123 |
| environment | Cost center | production |
| module | Feature attribution | billing |
| tier | Pricing validation | enterprise |

### Cost Allocation Methods

| Method | Implementation | Use Case |
|--------|----------------|----------|
| Direct attribution | Per-invocation tagging | Variable workloads |
| Time-based allocation | Execution duration | Compute-heavy |
| Request-based | Invocation counting | API-driven |
| Hybrid | Base + usage | Tiered pricing |

### Cost Optimization Strategies

| Strategy | Savings Potential | Implementation Effort |
|----------|------------------|----------------------|
| Right-sizing memory | 10-30% | Low |
| Provisioned vs on-demand | 20-40% | Medium |
| Batching invocations | 30-50% | Medium |
| Edge caching | 20-60% | Medium |
| Reserved capacity | 30-50% | Low |

---

## Application Guidelines

When designing serverless multi-tenant architecture:

1. Start with shared functions and tenant context injection
2. Use provisioned concurrency for SLA-bound tenants
3. Implement per-tenant concurrency limits early
4. Build cost attribution from day one
5. Monitor cold start impact by tenant tier
6. Design for horizontal scaling, not vertical

---

## Implementation Example

### Lambda Tenant Context Middleware

```python
# Example: Tenant context extraction and validation
import json
from functools import wraps

def tenant_context_middleware(handler):
    """Middleware to extract and validate tenant context"""
    @wraps(handler)
    def wrapper(event, context):
        # Extract tenant from JWT claims or headers
        tenant_id = extract_tenant_id(event)
        tier = get_tenant_tier(tenant_id)
        
        # Inject into execution context
        context.tenant_context = {
            "tenant_id": tenant_id,
            "tier": tier,
            "limits": get_tier_limits(tier)
        }
        
        # Validate tenant is active
        if not is_tenant_active(tenant_id):
            return {"statusCode": 403, "body": "Tenant inactive"}
        
        return handler(event, context)
    return wrapper

def extract_tenant_id(event):
    """Extract tenant ID from request"""
    # From authorizer context (API Gateway)
    if "requestContext" in event:
        authorizer = event["requestContext"].get("authorizer", {})
        if "claims" in authorizer:
            return authorizer["claims"].get("tenant_id")
    # From headers as fallback
    headers = event.get("headers", {})
    return headers.get("X-Tenant-ID")
```

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Tenant patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`, `tenant-routing`
- **Cost patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `cost-tracking`, `usage-metering`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "serverless multi-tenant isolation patterns {date}"
- Search: "AWS Lambda per-tenant cold start mitigation {date}"
- Search: "serverless cost attribution multi-tenant SaaS {date}"
- Search: "Lambda concurrency limits per tenant {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Should each tenant have dedicated Lambda functions? | No for most cases; use shared functions with tenant context injection | Function-per-tenant creates deployment complexity and cold start amplification; use dedicated only for Enterprise compliance |
| How should I handle cold starts for SLA-bound tenants? | Use provisioned concurrency for Pro/Enterprise tiers | Shared warming insufficient for strict latency SLAs; cost is justified by tier pricing |
| How should per-tenant concurrency limits be enforced? | Use custom semaphore in Redis with tenant-specific quotas | Lambda reserved concurrency is account-wide; custom limiting enables tenant-granular control |
| How should serverless costs be attributed to tenants? | Tag all resources with tenant_id; track invocations and duration per tenant | Enables accurate cost-per-tenant reporting for margin analysis and usage-based billing |
| When should I consider account-per-tenant isolation? | Only for Enterprise tenants with regulatory requirements (HIPAA, FedRAMP) | Maximum isolation but highest operational overhead; reserve for compliance-driven requirements |

---

## Related Workflows

- `bmad-bam-create-master-architecture` - Serverless architecture decisions
- `bmad-bam-tenant-model-isolation` - Isolation strategy selection
- `bmad-bam-validate-foundation` - Serverless implementation verification
