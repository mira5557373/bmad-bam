# Step 03: Design Cache Invalidation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER design invalidation without loading Step 02 cache design first**
- 📖 **CRITICAL: ALWAYS read the complete step file before taking any action**
- 🔄 **CRITICAL: When loading next step with 'C', ensure entire file is read**
- ⏸️ **ALWAYS pause after presenting invalidation design for user confirmation via A/P/C**
- 🎯 **Focus ONLY on cache invalidation - do not design performance monitoring yet**
- ✅ CRITICAL: Design invalidation for ALL cache layers - do not skip any
- 📋 Document event-driven invalidation triggers for each cache type
- 🌐 Use web search to verify current cache invalidation best practices

---

## EXECUTION PROTOCOLS

- 🎯 **Focus:** Design event-driven cache invalidation with tenant-scope awareness
- 💾 **Track:** Record invalidation design in working document for Step 04
- 📖 **Context:** Reference `domains/caching.md` and `bam-patterns.csv` for patterns
- 🚫 **Do NOT:** Proceed without explicit user confirmation via A/P/C
- 🔍 **Use web search:** Verify cache invalidation patterns against current best practices
- ⚠️ **Gate:** Flag invalidation designs that may cause cache inconsistency

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** Tenant-scoped cache design from Step 02
- **Domain file:** `{project-root}/_bmad/bam/data/domains/caching.md`
- **Pattern registry:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `caching-invalidation-*`
- **Output:** Cache invalidation strategy for L1, L2, CDN
- **Quality gate:** Design ensures cache consistency for QG-M2

---

## YOUR TASK

Design cache invalidation strategy for each cache layer. Define event-driven invalidation triggers, cross-module cache coordination, tenant-scoped invalidation patterns, and circuit breaker behavior for cache failures. Present the complete design via A/P/C menu for user confirmation.

---

## Main Sequence

### 1. Design Event-Driven Invalidation

Define events that trigger cache invalidation:

**Entity Events:**

| Event | Affected Cache Types | Invalidation Scope |
|-------|---------------------|-------------------|
| Entity Created | Entity cache, Query cache | Tenant-scoped |
| Entity Updated | Entity cache, Query cache, Aggregates | Tenant-scoped |
| Entity Deleted | Entity cache, Query cache, Aggregates | Tenant-scoped |
| Bulk Update | All entity caches, Query caches | Tenant-scoped |

**Tenant Events:**

| Event | Affected Cache Types | Invalidation Scope |
|-------|---------------------|-------------------|
| Tenant Config Change | Config cache, Feature flags | Single tenant |
| Tenant Tier Upgrade | TTL policies, Rate limits | Single tenant |
| Tenant Offboarding | ALL tenant caches | Single tenant (purge) |
| Tenant Data Migration | ALL tenant caches | Single tenant (rebuild) |

**System Events:**

| Event | Affected Cache Types | Invalidation Scope |
|-------|---------------------|-------------------|
| Schema Migration | All entity caches | Global (all tenants) |
| Feature Toggle | Feature cache | Global or tenant-specific |
| Security Patch | Session cache | Global (force re-auth) |

**Invalidation Event Schema:**

```markdown
### Invalidation Event

| Field | Type | Description |
|-------|------|-------------|
| event_type | string | `entity.updated`, `tenant.config.changed` |
| tenant_id | string | Target tenant (null for global) |
| entity_type | string | Entity type for entity events |
| entity_id | string | Specific entity ID (null for type-wide) |
| cache_layers | string[] | `[l1, l2, cdn]` - affected layers |
| timestamp | datetime | Event timestamp |
| correlation_id | string | For tracing |
```

Search the web: "event-driven cache invalidation patterns {date}"

---

### 2. Design Cross-Module Cache Coordination

Define how modules coordinate cache invalidation:

**Module Dependency Matrix:**

| Source Module | Target Module | Invalidation Event | Cache Type |
|---------------|---------------|-------------------|------------|
| User | Session | `user.updated` | Session cache |
| User | Permissions | `user.role.changed` | Permission cache |
| Billing | Entitlements | `subscription.changed` | Feature cache |
| Tenant | All Modules | `tenant.config.changed` | Config caches |

**Coordination Patterns:**

| Pattern | Use Case | Implementation |
|---------|----------|----------------|
| Event Bus | Async coordination | Publish invalidation event to message bus |
| Facade Callback | Sync coordination | Facade method triggers invalidation |
| Cache Tags | Related entities | Tag-based invalidation (Redis) |
| Change Data Capture | Database-driven | CDC triggers invalidation events |

**Cross-Module Invalidation Flow:**

```markdown
### Invalidation Sequence

1. **Source Module** publishes entity event
2. **Event Bus** routes to subscribed modules
3. **Target Modules** receive event:
   - Identify affected cache keys
   - Invalidate L1 (local process)
   - Invalidate L2 (distributed)
   - Invalidate CDN (if applicable)
4. **Cache Coordinator** logs invalidation metrics
```

Search the web: "cross-service cache invalidation microservices {date}"

---

### 3. Design Tenant-Scoped Invalidation Patterns

Define tenant-specific invalidation behaviors:

**Invalidation Scope Hierarchy:**

| Scope | Pattern | Use Case |
|-------|---------|----------|
| Key | `DEL tenant:{id}:l2:entity:user:123` | Single entity |
| Type | `DEL tenant:{id}:l2:entity:user:*` | All entities of type |
| Module | `DEL tenant:{id}:l2:billing:*` | All module caches |
| Tenant | `DEL tenant:{id}:*` | All tenant caches |

**Tenant Invalidation Commands:**

| Operation | L1 (In-Memory) | L2 (Redis) | CDN |
|-----------|----------------|------------|-----|
| Single Key | `cache.delete(key)` | `DEL key` | Purge by URL |
| Pattern | `cache.deleteByPrefix(prefix)` | `SCAN + DEL` | Purge by tag |
| All Tenant | `cache.clearTenant(tenantId)` | `SCAN tenant:{id}:* + DEL` | Purge by header |

**Invalidation by Tenant Tier:**

| Tier | Invalidation Behavior | Rationale |
|------|----------------------|-----------|
| Free | Immediate, no retry | Resource conservation |
| Pro | Immediate with 1 retry | Reliability balance |
| Enterprise | Immediate with 3 retries, DLQ | Maximum reliability |

Search the web: "Redis SCAN pattern delete tenant cache {date}"

---

### 4. Design Circuit Breaker for Cache Failures

Define fault tolerance for cache operations:

**Circuit Breaker States:**

| State | Behavior | Transition |
|-------|----------|------------|
| **Closed** | Normal operation | Open after N failures |
| **Open** | Bypass cache, direct to source | Half-Open after timeout |
| **Half-Open** | Test cache, single request | Closed on success, Open on fail |

**Circuit Breaker Configuration:**

| Layer | Failure Threshold | Reset Timeout | Fallback |
|-------|-------------------|---------------|----------|
| L1 | 5 failures / 30s | 10 seconds | Skip L1, use L2 |
| L2 | 10 failures / 60s | 30 seconds | Skip L2, use database |
| CDN | N/A (edge handles) | N/A | Origin fallback |

**Cache Failure Handling:**

```markdown
### Failure Scenarios

| Scenario | Detection | Response |
|----------|-----------|----------|
| L2 (Redis) unreachable | Connection timeout | Open circuit, bypass L2 |
| L2 (Redis) slow | Latency > threshold | Degrade to L1 only |
| Invalidation failed | Event not processed | Retry with exponential backoff |
| CDN purge failed | API error | Retry, alert on repeated failure |

### Fallback Hierarchy

1. L1 (In-Memory) - fastest, process-local
2. L2 (Distributed) - shared, consistent
3. Database - source of truth, slowest
4. Error Response - when all fail
```

**Metrics for Circuit Breaker:**

| Metric | Purpose | Alert Threshold |
|--------|---------|-----------------|
| `cache.circuit.state` | Current state | Open for > 5 min |
| `cache.fallback.count` | Fallback activations | > 100 / min |
| `cache.invalidation.failed` | Failed invalidations | > 10 / min |

Search the web: "cache circuit breaker pattern resilience4j {date}"

---

## COLLABORATION MENUS (A/P/C):

After presenting complete invalidation design:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific invalidation scenarios
- **P (Party Mode)**: Bring reliability, performance, and ops perspectives
- **C (Continue)**: Accept design and proceed to performance step

Select an option:
```

### If 'A' (Advanced Elicitation):

Invoke `bmad-advanced-elicitation` skill to explore:

- **Consistency requirements:** How stale can cache data be?
- **Invalidation latency:** How fast must invalidation propagate?
- **Failure recovery:** How to rebuild cache after extended outage?
- **Cross-region:** How to handle multi-region cache invalidation?
- **Cost optimization:** Which invalidation patterns are most efficient?

Pass context: Step 02 cache design, current invalidation design, specific concerns.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode):

Invoke `bmad-party-mode` skill with context:

```
Review cache invalidation design for {tenant_count} tenants
with cache layers: {l1, l2, cdn}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| Reliability | Consistency | Will invalidation ensure data consistency? |
| Performance | Latency | Does invalidation impact request latency? |
| DevOps | Operations | Can team monitor invalidation health? |
| Security | Isolation | Can invalidation leak tenant data? |

Process multi-perspective analysis and synthesize into refined design.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue):

1. Record the invalidation design in working document:

```yaml
# Add to caching-design.md
invalidation:
  event_driven:
    entity_events: [created, updated, deleted]
    tenant_events: [config_changed, tier_upgrade, offboarding]
    system_events: [schema_migration, feature_toggle]
  cross_module:
    pattern: event_bus
    coordination: async
  tenant_scoped:
    key: immediate
    type: scan_delete
    module: scan_delete
    all: full_purge
  circuit_breaker:
    l1_threshold: 5
    l2_threshold: 10
    reset_timeout_seconds: 30
invalidation_design_completed_at: {timestamp}
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze
  - step-03-c-design  # Add this
currentStep: step-04-c-document
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ Event-driven invalidation triggers defined
- ✅ Cross-module coordination pattern established
- ✅ Tenant-scoped invalidation patterns documented
- ✅ Circuit breaker configuration defined
- ✅ Failure handling and fallback documented
- ✅ Web search performed for invalidation best practices
- ✅ Step 02 cache design referenced
- ✅ User confirmed design via A/P/C menu
- ✅ Invalidation design recorded in working document

---

## FAILURE MODES

- ❌ Skipping event types - incomplete invalidation coverage
- ❌ No cross-module coordination - modules have stale data
- ❌ Missing tenant scope - invalidation may affect wrong tenant
- ❌ No circuit breaker - cache failure cascades to system failure
- ❌ No fallback strategy - no degraded mode on cache failure
- ❌ Proceeding without A/P/C confirmation - user not engaged
- ❌ Skipping web search - may miss current invalidation patterns

---

## NEXT STEP

After user confirms invalidation design with 'C':

1. Record the invalidation design in working document
2. Proceed to `step-04-c-document.md` to design cache performance monitoring
3. The invalidation design informs:
   - Cache hit rate monitoring
   - Invalidation latency tracking
   - Quality gate QG-M2 cache consistency checks

**Transition to Step 04 with:**
- Invalidation triggers: `{events}`
- Coordination pattern: `{event_bus/facade}`
- Circuit breaker: `{thresholds}`
