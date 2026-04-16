# BAM Tenant Isolation Context

**When to load:** During implementation phase when building tenant isolation, RLS policies, or context propagation.

**Integrates with:** Dev agents, QA agents

---

## Core Concepts for Tenant Isolation

### Isolation Matrix (8 Dimensions)

| Dimension | Strategy | Implementation |
|-----------|----------|----------------|
| Database | Row-Level Security | PostgreSQL RLS policies |
| Cache | Key prefix | `tenant:{id}:cache:key` |
| Memory | Scope tagging | session/user/tenant/global |
| Tools | Tier filtering | Permission middleware |
| Jobs | Context serialization | Job payload includes tenant |
| Vectors | Filter injection | Collection per tenant or filter |
| Logs | Field injection | Structured logging with tenant_id |
| Files | Path prefix | `tenants/{id}/files/` |

### RLS Policy Pattern

```sql
-- Enable and force RLS
ALTER TABLE {table} ENABLE ROW LEVEL SECURITY;
ALTER TABLE {table} FORCE ROW LEVEL SECURITY;

-- Tenant isolation policy
CREATE POLICY tenant_isolation ON {table}
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

-- Admin bypass (audit logged)
CREATE POLICY admin_bypass ON {table}
  FOR ALL
  USING (current_setting('app.is_admin')::boolean = true)
  WITH CHECK (current_setting('app.is_admin')::boolean = true);

-- Context guard (fail-safe)
CREATE POLICY require_context ON {table}
  USING (current_setting('app.current_tenant', true) IS NOT NULL);
```

### Context Propagation

```typescript
// Set context at request boundary
await db.query("SET LOCAL app.current_tenant = $1", [ctx.tenantId]);

// Never use SET (non-transactional) - always SET LOCAL
// Context automatically cleared at transaction end
```

### Cache Isolation Patterns

#### Redis Key Prefixing Strategy

All cache keys must follow the pattern:
```
tenant:{tenant_id}:{namespace}:{key}
```

Examples:
- User session: `tenant:abc123:session:user_456`
- Query cache: `tenant:abc123:query:users_list_page_1`
- Rate limit: `tenant:abc123:ratelimit:api_calls`

#### Isolated Redis Instances (Enterprise Tier)

For maximum isolation, ENTERPRISE tenants may have dedicated Redis instances:

| Tier | Redis Strategy | Connection |
|------|----------------|------------|
| FREE | Shared + key prefix | Default cluster |
| PRO | Shared + key prefix + larger quotas | Default cluster |
| ENTERPRISE | Dedicated instance | Custom connection string |

#### Cache Eviction by Tenant

```
# Evict all cache for a single tenant
SCAN 0 MATCH "tenant:abc123:*" COUNT 1000
DEL [matched keys]
```

### Vector Store Isolation

#### Namespace Strategy (Recommended)

Single vector store with tenant namespace filtering:

| Field | Description |
|-------|-------------|
| tenant_id | Partition key for filtering |
| collection | Logical grouping within tenant |
| document_id | Unique document identifier |
| embedding | Vector data |
| metadata | Document metadata |

Query pattern:
```
filter: { tenant_id: "abc123" }
```

#### Collection Per Tenant (High Isolation)

Separate collection for each tenant:
- Collection name: `tenant_{tenant_id}_vectors`
- Benefits: Complete isolation, independent scaling
- Drawbacks: More resources, complex migrations

#### Pinecone Implementation

```
Index: platform-vectors
Namespace: tenant-{tenant_id}

# Query always includes namespace
index.query(
  vector=[...],
  namespace=f"tenant-{tenant_id}",
  top_k=10
)
```

#### Qdrant Implementation

```
Collection: tenant_{tenant_id}
# Or use payload filtering on shared collection:
filter: {
  must: [
    { key: "tenant_id", match: { value: "abc123" } }
  ]
}
```

### File Storage Isolation

#### S3 Prefix Strategy

Directory structure:
```
s3://platform-bucket/
  └── tenants/
      ├── {tenant_id_1}/
      │   ├── uploads/
      │   ├── exports/
      │   └── agent-outputs/
      ├── {tenant_id_2}/
      │   └── ...
      └── {tenant_id_n}/
          └── ...
```

#### S3 Bucket Policies

IAM policy restricts access to tenant prefix:
```json
{
  "Effect": "Allow",
  "Action": ["s3:GetObject", "s3:PutObject"],
  "Resource": "arn:aws:s3:::bucket/tenants/${tenant_id}/*",
  "Condition": {
    "StringEquals": {
      "s3:prefix": "tenants/${tenant_id}/"
    }
  }
}
```

#### Presigned URLs

All file access through presigned URLs with tenant validation:
1. Verify tenant_id matches authenticated user
2. Generate presigned URL with short TTL (5-15 minutes)
3. Log access for audit trail

### Queue Isolation Patterns

#### Topic/Queue Naming

```
{module}.{event_type}.tenant.{tenant_id}
```

Examples:
- `billing.invoice.tenant.abc123`
- `agent.run_complete.tenant.abc123`

#### Message Headers

Every message must include:

| Header | Description |
|--------|-------------|
| X-Tenant-ID | Tenant identifier |
| X-Correlation-ID | Request tracing ID |
| X-User-ID | Originating user |
| X-Timestamp | Message timestamp |

#### Dead Letter Queue Per Tenant

Failed messages routed to tenant-specific DLQ:
```
dlq.{module}.tenant.{tenant_id}
```

### AI Model Isolation

#### Fine-Tuned Models Per Tenant (Enterprise)

| Tier | Model Access |
|------|--------------|
| FREE | Base models only |
| PRO | Base models + platform fine-tunes |
| ENTERPRISE | Base + platform + tenant fine-tunes |

#### Model Registry Per Tenant

```
tenant:{tenant_id}:models:{model_name}
  - version: 1.0.0
  - base_model: gpt-4
  - fine_tune_job: ft-abc123
  - training_data_ref: s3://bucket/tenants/{tenant_id}/training/
```

#### Inference Isolation

- Request routing includes tenant context
- Model selection based on tenant preferences
- Usage tracking per tenant per model
- Cost attribution to tenant

### Logging Isolation

#### Structured Log Fields

Every log entry must include:

| Field | Description |
|-------|-------------|
| tenant_id | Tenant identifier |
| user_id | User identifier |
| correlation_id | Request trace ID |
| module | Originating module |
| action | Action being performed |

#### Log Access Control

- Tenant admins: View own tenant logs only
- Platform admins: View all logs with audit trail
- Log retention: Per tenant configuration

---

## Application Guidelines

1. **RLS is mandatory** - No tenant data without RLS
2. **Test isolation** - Verify tenant A cannot see tenant B data
3. **Audit admin access** - Log all admin bypass operations
4. **Context propagation** - Every code path must have tenant context

---

## Related Patterns

Load these from pattern registry:
- `{project-root}/_bmad/bam/data/tenant-models.csv` → All isolation strategies
- `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `isolation`

**Related patterns from bam-patterns.csv:**
- `agent-runtime` - AI agent isolation requirements
- `tenant-lifecycle` - Tenant provisioning/deprovisioning isolation
- `observability` - Tenant-scoped metrics and logs
- `usage-metering` - Per-tenant usage tracking and billing isolation
- `customization` - Tenant-specific configuration isolation
- `experimentation` - A/B testing and feature flag isolation per tenant
- `disaster-recovery` - Tenant data backup and recovery isolation
- `local-dev` - Local development environment tenant simulation
- `tenant-routing` - Request routing to correct tenant context
- `file-storage` - Tenant file and asset isolation
- `session-management` - Tenant session and authentication isolation
- `search-indexing` - Tenant search index isolation

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant data isolation patterns {date}"
- Search: "tenant security boundary enforcement {date}"
- Search: "SaaS isolation compliance requirements {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which database isolation model should I choose for a new SaaS platform? | Row-Level Security (RLS) for <1000 tenants; schema-per-tenant for regulated industries | RLS is most cost-efficient and operationally simple; schema-per-tenant adds isolation for compliance |
| How should cache keys be structured for tenant isolation? | Use prefix pattern: `tenant:{tenant_id}:{namespace}:{key}` | Enables efficient per-tenant cache eviction; namespace allows logical grouping within tenant |
| Should vector stores use collection-per-tenant or namespace filtering? | Namespace filtering for most cases; collection-per-tenant only for Enterprise with compliance requirements | Namespace filtering is more efficient; dedicated collections add operational overhead but provide maximum isolation |
| How should file storage be isolated per tenant? | S3 prefix strategy with IAM policies restricting to `tenants/{tenant_id}/*` path | Prefix enables logical isolation with shared bucket; IAM policies provide access control enforcement |
| Should logs be accessible to tenant administrators? | Yes, with strict filtering to own tenant_id and audit trail for all access | Self-service log access reduces support burden; audit trail ensures accountability for data access |

---

## Integration with BAM Workflows

- `bmad-bam-tenant-model-isolation` → Design isolation strategy
- `validate-foundation` → Verify isolation implementation

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Design tenant isolation strategy
- `bmad-bam-security-review` - Audit isolation security boundaries
- `bmad-bam-chaos-engineering-design` - Verify RLS and isolation policies
- `bmad-bam-ai-eval-safety-design` - Ensure AI runtime isolation
- `validate-foundation` - Validate isolation implementation
