# BAM Tenant Patterns Guide

**When to load:** During any tenant-related design, implementation, or validation work. Triggered by keywords: tenant, multi-tenant, isolation, RLS, schema isolation, tenant lifecycle, onboarding, offboarding, tenant routing.
**Integrates with:** Architect (Winston/Atlas), Dev (James), Security agents, DevOps agents

---

## Core Concepts

Multi-tenancy enables a single application instance to serve multiple customers (tenants) while maintaining data isolation, security, and customization.

### Key Principles

| Principle | Description |
|-----------|-------------|
| Isolation by Default | No tenant can access another's data without explicit sharing |
| Context Propagation | Tenant identity flows through every layer of the stack |
| Fail-Safe Design | Missing tenant context should deny access, not grant it |

### The 8 Dimensions of Tenant Isolation

| Dimension | What to Isolate | Strategy |
|-----------|------------------|----------|
| **Database** | Rows, schemas, databases | RLS, schema-per-tenant, database-per-tenant |
| **Cache** | Cached values | Key prefix `tenant:{id}:...` |
| **Memory** | Agent memory/context | Scope tags (session/user/tenant/global) |
| **Tools** | Available tools per tenant | Permission middleware |
| **Jobs** | Background job execution | Context serialization |
| **Vectors** | Embeddings and indexes | Namespace filtering |
| **Logs** | Log entries and traces | Field injection |
| **Files** | Stored files and assets | Path prefix `tenants/{id}/...` |

### Isolation Models Overview

| Model | Isolation Level | Cost | Complexity | Tenant Scale |
|-------|-----------------|------|------------|--------------|
| Row-Level Security | Logical | Lowest | Low | < 10,000 |
| Schema-per-Tenant | Logical | Medium | Medium | 100s |
| Database-per-Tenant | Physical | Highest | High | Enterprise |
| Hybrid | Variable | Variable | High | Mixed tiers |

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and MUST be followed exactly.

### PostgreSQL Context Keys

| Key | Purpose | Type |
|-----|---------|------|
| `app.current_tenant` | Current tenant UUID | uuid |
| `app.is_admin` | Admin bypass flag | boolean |
| `app.tenant_tier` | Subscription tier | text |
| `app.user_id` | Current user UUID | uuid |
| `app.user_role` | User role in tenant | text |

### Cache Key Format

```
Pattern: tenant:{tenant_id}:{namespace}:{key}

Examples:
- tenant:abc123:cache:user_profile
- tenant:abc123:session:token_xyz
- tenant:abc123:rate_limit:api_calls
- tenant:abc123:query:orders_page_1
```

### File Storage Paths

```
Pattern: tenants/{tenant_id}/{category}/{filename}

Examples:
- tenants/abc123/uploads/document.pdf
- tenants/abc123/exports/report.csv
- tenants/abc123/avatars/user_123.png
- tenants/abc123/agent-outputs/run_456.json
```

### Memory Scope Tags

| Scope | Lifetime | Isolation |
|-------|----------|-----------|
| `session` | Request | Per-request |
| `user` | Session | Per-user |
| `tenant` | Persistent | Per-tenant |
| `global` | Persistent | Shared |

### Queue Naming

```
Pattern: {module}.{event_type}.tenant.{tenant_id}

Examples:
- billing.invoice.tenant.abc123
- agent.run_complete.tenant.abc123
- notification.email.tenant.abc123
```

### Message Headers (Required)

| Header | Description |
|--------|-------------|
| `X-Tenant-ID` | Tenant identifier |
| `X-Correlation-ID` | Request tracing ID |
| `X-User-ID` | Originating user |
| `X-Timestamp` | Message timestamp |

---

## Decision Framework

### Quick Decision Matrix

| Situation | Recommendation | Confidence |
|-----------|---------------|------------|
| < 1000 tenants, startup | RLS | High |
| 1000-10000 tenants, standard SaaS | RLS | High |
| Regulated industry (finance, health) | Schema-per-tenant | High |
| Enterprise with compliance requirements | Database-per-tenant | High |
| Mixed tiers (free + enterprise) | Hybrid | Medium |

### Decision Tree

```
START: How many tenants?
│
├─► < 1000 tenants
│   │
│   └─► Regulated industry?
│       ├─► YES → Schema-per-tenant
│       └─► NO → RLS (recommended)
│
├─► 1000-10000 tenants
│   │
│   └─► Need schema-level customization?
│       ├─► YES → Schema-per-tenant
│       └─► NO → RLS with sharding
│
└─► > 10000 tenants
    │
    └─► Enterprise tier?
        ├─► YES → Database-per-tenant
        └─► NO → RLS with sharding + caching
```

### Trade-off Analysis

| Factor | RLS | Schema | Database |
|--------|-----|--------|----------|
| Setup complexity | Low | Medium | High |
| Operational cost | Low | Medium | High |
| Isolation strength | Medium | High | Maximum |
| Query performance | Good | Good | Best |
| Backup granularity | Tenant-filtered | Per-schema | Per-database |
| Migration complexity | N/A | Medium | High |

---

## §tenant-rls

### Pattern: Row-Level Security (RLS)

**When to use:** < 1000 tenants AND shared-tables AND cost-efficient
**Phase:** foundation
**Variants:** basic-rls, composite-policies, per-operation-policies

#### Overview

Row-Level Security is a database feature that restricts which rows a user can access based on defined policies. In multi-tenant SaaS, RLS ensures tenants can only see their own data without application-level filtering.

#### RLS Policy Pattern

```sql
-- BAM Standard RLS Pattern
-- Placeholders: {table}, {tenant_column}
-- Convention: Uses app.current_tenant

ALTER TABLE {table} ENABLE ROW LEVEL SECURITY;
ALTER TABLE {table} FORCE ROW LEVEL SECURITY;

-- Primary isolation policy
CREATE POLICY tenant_isolation ON {table}
  USING ({tenant_column} = current_setting('app.current_tenant')::uuid);

-- Admin bypass (audit logged)
CREATE POLICY admin_bypass ON {table}
  FOR ALL
  USING (current_setting('app.is_admin')::boolean = true)
  WITH CHECK (current_setting('app.is_admin')::boolean = true);

-- Fail-safe: require context to be set
CREATE POLICY require_context ON {table}
  USING (current_setting('app.current_tenant', true) IS NOT NULL);
```

#### Context Propagation

```typescript
// Set context at request boundary - ALWAYS use SET LOCAL
await db.query("SET LOCAL app.current_tenant = $1", [ctx.tenantId]);

// Never use SET (non-transactional) - always SET LOCAL
// Context automatically cleared at transaction end
```

#### Per-Operation Policies

```sql
-- Read: All tenant users
CREATE POLICY tenant_read ON documents
    FOR SELECT
    USING (tenant_id = current_setting('app.current_tenant')::uuid);

-- Write: Only document owner
CREATE POLICY owner_write ON documents
    FOR UPDATE
    USING (
        tenant_id = current_setting('app.current_tenant')::uuid
        AND owner_id = current_setting('app.user_id')::uuid
    );

-- Delete: Only admins
CREATE POLICY admin_delete ON documents
    FOR DELETE
    USING (
        tenant_id = current_setting('app.current_tenant')::uuid
        AND current_setting('app.user_role') = 'admin'
    );
```

#### Index Strategy

| Index Type | Use Case | Example |
|------------|----------|---------|
| B-tree on tenant_id | Default, most queries | `CREATE INDEX ON tbl(tenant_id)` |
| Composite index | Tenant + common filter | `CREATE INDEX ON tbl(tenant_id, created_at)` |
| Partial index | Large tables, active subset | `CREATE INDEX ON tbl(tenant_id) WHERE status = 'active'` |
| Covering index | Avoid table lookups | `CREATE INDEX ON tbl(tenant_id) INCLUDE (name, email)` |

#### Web Research

- "PostgreSQL RLS performance optimization {date}"
- "row-level security multi-tenant patterns {date}"

---

## §tenant-schema

### Pattern: Schema-per-Tenant

**When to use:** Regulated industries, moderate isolation, 100s of tenants
**Phase:** foundation

#### Overview

Each tenant gets a dedicated PostgreSQL schema within a shared database. Provides stronger isolation than RLS while sharing database resources.

#### Implementation

```sql
-- Create tenant schema
CREATE SCHEMA tenant_abc123;

-- Set search path for queries
SET search_path TO tenant_abc123;

-- Tables created per schema
CREATE TABLE tenant_abc123.users (...);
CREATE TABLE tenant_abc123.documents (...);
```

#### Routing Pattern

```
Request → Tenant Resolver → Set search_path → Execute Query
```

#### Trade-offs

| Benefit | Drawback |
|---------|----------|
| Strong isolation | More migrations to manage |
| Schema-level backup | Connection routing complexity |
| Custom indexes | Schema count limits |

---

## §tenant-database

### Pattern: Database-per-Tenant

**When to use:** Enterprise tier, maximum isolation, compliance requirements
**Phase:** foundation

#### Overview

Each tenant gets a completely separate database instance. Maximum isolation for compliance-sensitive enterprise customers.

#### Connection Management

```
┌───────────────────────────────────────┐
│       Connection Pool Manager          │
│  ┌───────────────┐  ┌──────────────┐  │
│  │  Shared Pool  │  │Dedicated Pool│  │
│  │  (Free/Pro)   │  │ (Enterprise) │  │
│  └───────┬───────┘  └──────┬───────┘  │
└──────────┼─────────────────┼──────────┘
           v                 v
    ┌──────────┐      ┌──────────┐
    │ Shared   │      │ Tenant   │
    │ Database │      │ Database │
    └──────────┘      └──────────┘
```

#### Per-Tier Resources

| Resource | Free | Pro | Enterprise |
|----------|------|-----|------------|
| Database | Shared (RLS) | Shared (RLS) | Dedicated |
| Connections | 1-2 | 5-10 | 20-50 |
| Cache | Shared namespace | Shared namespace | Dedicated Redis |

---

## §tenant-routing

### Pattern: Tenant Routing

**When to use:** All multi-tenant systems
**Phase:** foundation

#### Routing Strategies

| Strategy | Identification | Complexity | Use Case |
|----------|---------------|------------|----------|
| Header-based | `X-Tenant-ID` header | Low | Public API |
| Subdomain-based | `tenant.example.com` | Medium | White-label SaaS |
| Path-based | `/api/v1/{tenant}/...` | Low | Simple multi-tenant |
| JWT Claim | Token contains tenant | Medium | High security |

#### Resolution Priority

```
1. JWT tenant claim (if auth required)
2. X-Tenant-ID header
3. X-Tenant-Slug header (lookup)
4. Default tenant (if allowed)
```

#### Security Considerations

| Attack | Vector | Mitigation |
|--------|--------|------------|
| Tenant spoofing | Forged header | Validate against JWT |
| Subdomain hijack | Unclaimed subdomain | Validate tenant exists |
| Path traversal | `/../other-tenant/` | Strict path parsing |
| Connection reuse | Stale context | Reset per request |

---

## §tenant-lifecycle

### Pattern: Tenant Lifecycle Management

**When to use:** All multi-tenant systems
**Phase:** solutioning

#### Lifecycle Phases

| Phase | Description | Key Activities |
|-------|-------------|----------------|
| Pending | Signup initiated | Validation |
| Active | Normal operation | Usage, billing, support |
| Suspended | Temporary hold | Access restriction |
| Offboarding | Tenant exit | Data export, deletion |
| Archived | Compliance retention | Read-only storage |

#### State Machine

```
┌─────────┐    provision    ┌────────┐
│ Pending │ ─────────────> │ Active │
└─────────┘                └────┬───┘
                                │
                    ┌───────────┼───────────┐
                    │           │           │
                    v           │           v
              ┌───────────┐    │    ┌──────────────┐
              │ Suspended │<───┘    │ Offboarding  │
              └─────┬─────┘         └──────┬───────┘
                    │                      │
                    └──────────────────────┘
                               │
                               v
                        ┌──────────┐
                        │ Archived │
                        └──────────┘
```

#### Per-Tier Lifecycle

| Tier | Onboarding | Support | Offboarding Notice |
|------|------------|---------|-------------------|
| Free | Self-service | Community | 7 days |
| Pro | Self-service | Email | 30 days |
| Enterprise | Assisted | Dedicated | 90 days |

---

## §tenant-onboarding

### Pattern: Tenant Onboarding

**When to use:** During tenant creation flows
**Phase:** solutioning

#### Onboarding Saga

| Step | Action | Timeout | Critical |
|------|--------|---------|----------|
| 1 | Create tenant record | 5s | Yes |
| 2 | Provision database resources | 30s | Yes |
| 3 | Initialize default config | 10s | No |
| 4 | Create admin user | 5s | Yes |
| 5 | Send welcome email | 10s | No |
| 6 | Start trial period | 5s | No |

#### Provisioning Strategies

| Strategy | When to Use | Trade-off |
|----------|-------------|-----------|
| Eager | High-touch, enterprise | More resources, faster UX |
| Lazy | Self-service, scale | Slower first use, efficient |
| Hybrid | Common case eager, edge lazy | Balanced |

#### Resource Pool Pre-provisioning

| Resource | Pre-provision Count | Replenish Trigger |
|----------|---------------------|-------------------|
| Database schemas | 10 warm | < 5 available |
| Storage buckets | 5 warm | < 2 available |
| API keys | 20 generated | < 10 available |

---

## §tenant-cache-isolation

### Pattern: Cache Isolation

**When to use:** Any tenant with caching
**Phase:** foundation

#### Redis Key Strategy

```
tenant:{tenant_id}:{namespace}:{key}
```

#### Tier-Based Strategy

| Tier | Redis Strategy | Connection |
|------|----------------|------------|
| FREE | Shared + key prefix | Default cluster |
| PRO | Shared + key prefix + larger quotas | Default cluster |
| ENTERPRISE | Dedicated instance | Custom connection string |

#### Cache Eviction

```
# Evict all cache for a single tenant
SCAN 0 MATCH "tenant:abc123:*" COUNT 1000
DEL [matched keys]
```

---

## §tenant-vector-isolation

### Pattern: Vector Store Isolation

**When to use:** RAG systems with tenant data
**Phase:** solutioning

#### Namespace Strategy (Recommended)

| Field | Description |
|-------|-------------|
| tenant_id | Partition key for filtering |
| collection | Logical grouping within tenant |
| document_id | Unique document identifier |
| embedding | Vector data |
| metadata | Document metadata |

#### Query Pattern

```python
# Pinecone
index.query(
  vector=[...],
  namespace=f"tenant-{tenant_id}",
  top_k=10
)

# Qdrant
filter: {
  must: [
    { key: "tenant_id", match: { value: "abc123" } }
  ]
}
```

---

## §tenant-file-isolation

### Pattern: File Storage Isolation

**When to use:** Any tenant file storage
**Phase:** foundation

#### S3 Prefix Strategy

```
s3://platform-bucket/
  └── tenants/
      ├── {tenant_id_1}/
      │   ├── uploads/
      │   ├── exports/
      │   └── agent-outputs/
      └── {tenant_id_n}/
```

#### IAM Policy

```json
{
  "Effect": "Allow",
  "Action": ["s3:GetObject", "s3:PutObject"],
  "Resource": "arn:aws:s3:::bucket/tenants/${tenant_id}/*"
}
```

---

## Quality Gates

| Gate | Key Checks | Related Patterns |
|------|------------|------------------|
| QG-F1 | Isolation model selected, context propagation designed | §tenant-rls, §tenant-routing |
| QG-M2 | RLS policies implemented, tested cross-tenant | §tenant-rls, §tenant-cache-isolation |
| QG-I2 | Tenant safety verification, penetration testing | All isolation patterns |

### Gate Verification Checklist

- [ ] RLS policies enabled on ALL tenant-scoped tables
- [ ] **CRITICAL:** Cross-tenant access tested and blocked
- [ ] Cache keys prefixed with tenant ID
- [ ] File paths include tenant prefix
- [ ] Queue messages include X-Tenant-ID header
- [ ] Logs include tenant_id field
- [ ] Admin bypass audit logged

---

## Web Research

| Topic | Query |
|-------|-------|
| Current RLS practices | "PostgreSQL RLS multi-tenant best practices {date}" |
| Schema isolation | "schema-per-tenant PostgreSQL {date}" |
| Cache isolation | "Redis multi-tenant key isolation {date}" |
| Vector isolation | "vector database multi-tenant patterns {date}" |

---

## Related Patterns

Cross-references to other domain guides:

- `security-patterns-guide.md` §rbac-abac - Role-based access within tenant
- `data-patterns-guide.md` §data-classification - Tenant data handling
- `observability-patterns-guide.md` §tenant-metrics - Per-tenant monitoring
- `cost-patterns-guide.md` §usage-metering - Tenant usage tracking

Load from pattern registry:
- `bam-patterns.csv` → filter: `tenant-*`
- `tenant-models.csv` → all isolation strategies

Use the `web_queries` column from pattern registry for current best practices.

---

## Related Workflows

| Workflow | When to Use |
|----------|-------------|
| `bmad-bam-tenant-model-isolation` | Select and implement isolation strategy |
| `bmad-bam-tenant-onboarding-design` | Design tenant provisioning flow |
| `bmad-bam-tenant-offboarding-design` | Design tenant exit process |
| `validate-foundation` | Verify isolation implementation (QG-F1) |
| `validate-module` | Verify tenant safety (QG-M2) |

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-24 | Initial consolidated guide from 18 source files |
