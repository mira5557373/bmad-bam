# Step 03: Design Database Scaling

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Read replicas, connection pooling, sharding, query optimization
- 💾 Track: `stepsCompleted: [1, 2, 3]` when complete
- 📖 Context: Build on horizontal scaling from Step 2, consider tenant model
- 🚫 Do NOT: Address tenant-aware isolation (Step 4) or capacity planning (Step 5)
- 🔍 Use web search: Verify database scaling patterns against PostgreSQL/cloud DB best practices

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Gathering required inputs for this step
- Making design decisions within step scope
- Documenting decisions with rationale

**OUT OF SCOPE:**
- Decisions from other steps
- Implementation details
- Validation (separate mode)
## Purpose

Design the database scaling strategy including read replicas, connection pooling per tenant, sharding strategies for database-per-tenant models, and query optimization for RLS performance.

---

## Prerequisites

- Steps 01-02 complete
- Tenant model identified (RLS, schema-per-tenant, or database-per-tenant)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `scale-vertical`, `db-*`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

**Web Research (Required):**

Search the web: "PostgreSQL read replica multi-tenant scaling patterns {date}"
Search the web: "PgBouncer connection pooling per-tenant configuration {date}"
Search the web: "database sharding multi-tenant SaaS strategies {date}"
Search the web: "PostgreSQL RLS query optimization performance {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Read Replicas for Tenant Queries

**Read Replica Architecture:**

| Component | Primary | Read Replicas | Use Case |
|-----------|---------|---------------|----------|
| Write Operations | Yes | No | All mutations |
| Read Operations | Failover | Yes | Analytics, reports |
| Tenant Queries | Failover | Yes | List/search operations |
| Real-time | Yes | No | Consistency required |

**Replica Distribution by Tenant Model:**

| Tenant Model | Replica Strategy | Routing Logic |
|--------------|------------------|---------------|
| RLS | Shared replicas | Query type routing |
| Schema-per-Tenant | Shared replicas | Query type routing |
| Database-per-Tenant | Per-tenant replicas | Tenant ID routing |

**Replica Configuration:**

| Setting | Value | Rationale |
|---------|-------|-----------|
| Replica Lag Tolerance | 100ms | Balance consistency vs distribution |
| Max Connections per Replica | 100 | Prevent overload |
| Failover Priority | Weighted | Prefer low-latency replicas |
| Health Check Interval | 5s | Quick failover detection |

### 2. Connection Pooling per Tenant

**Pool Architecture:**

| Tier | Pool Size | Pool Mode | Timeout |
|------|-----------|-----------|---------|
| Free | 5 | Transaction | 10s |
| Pro | 20 | Transaction | 30s |
| Enterprise | 50 | Session | 60s |

**Pooler Configuration (PgBouncer):**

| Setting | Free | Pro | Enterprise |
|---------|------|-----|------------|
| default_pool_size | 5 | 20 | 50 |
| reserve_pool_size | 2 | 5 | 10 |
| max_client_conn | 100 | 500 | 1000 |
| pool_mode | transaction | transaction | session |

**Tenant-Aware Pool Routing:**

| Scenario | Pool Selection | Rationale |
|----------|----------------|-----------|
| Standard queries | Tier-based pool | Resource isolation |
| Long-running | Dedicated connection | Prevent blocking |
| Batch operations | Background pool | Queue management |
| Admin queries | Privileged pool | Bypass limits |

### 3. Sharding Strategies (Database-per-Tenant)

**Applicable when tenant_model = database-per-tenant:**

| Sharding Approach | Description | Use Case |
|-------------------|-------------|----------|
| Hash-based | tenant_id % shard_count | Even distribution |
| Range-based | tenant_id ranges | Geographic affinity |
| Lookup table | Explicit mapping | Enterprise customization |
| Hybrid | Hash + range | Large-scale deployment |

**Shard Management:**

| Operation | Automation | Downtime |
|-----------|------------|----------|
| Create shard | Automated | Zero |
| Move tenant | Semi-automated | Minutes |
| Rebalance | Manual | Maintenance window |
| Split shard | Manual | Maintenance window |

**Cross-Shard Query Handling:**

| Query Type | Strategy | Performance Impact |
|------------|----------|-------------------|
| Single tenant | Direct routing | None |
| Admin reports | Fan-out | Linear |
| Global search | Search service | Separate index |
| Analytics | Data warehouse | Async ETL |

### 4. Query Optimization for RLS

**Applicable when tenant_model = row-level-security:**

| Optimization | Implementation | Impact |
|--------------|----------------|--------|
| Tenant ID index | INCLUDE columns | 10-50x faster |
| Composite indexes | (tenant_id, ...) | Query coverage |
| Partition pruning | Range partitions | Reduced scan |
| Policy simplification | Single policy | Reduced overhead |

**RLS Performance Patterns:**

| Pattern | Description | When to Use |
|---------|-------------|-------------|
| Tenant-first index | tenant_id as leading column | All tenant queries |
| Covering index | Include frequently selected columns | High-volume queries |
| Partial index | Index only active tenants | Hot tenant optimization |
| Expression index | Index computed tenant context | Complex policies |

**Query Plan Verification:**

| Check | Method | Target |
|-------|--------|--------|
| Index usage | EXPLAIN ANALYZE | Seq scan = 0 |
| Policy overhead | pg_stat_statements | < 5% overhead |
| Buffer hits | pg_stat_user_tables | > 95% |
| Lock contention | pg_stat_activity | Minimal waits |

---

## COLLABORATION MENUS (A/P/C)

After presenting database scaling design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific database scaling aspects
- **P (Party Mode)**: Bring architect perspectives on database tradeoffs
- **C (Continue)**: Proceed to tenant-aware scaling design

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: database scaling design, tenant model
- Process enhanced insights on performance tradeoffs
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review database scaling strategy for multi-tenant SaaS"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Document database scaling decisions
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-document.md`

---

## Verification

- [ ] Read replica strategy designed
- [ ] Connection pooling configured per tier
- [ ] Sharding strategy defined (if database-per-tenant)
- [ ] RLS query optimization patterns documented
- [ ] Web research findings incorporated with citations

---

## Outputs

- Read replica architecture
- Connection pooling configuration by tier
- Sharding strategy (if applicable)
- RLS optimization guidelines

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Proceed to `step-04-c-document.md` to design tenant-aware scaling strategies.
