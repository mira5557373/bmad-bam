# Step 04: Design Cache Performance

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER design performance monitoring without loading Steps 02-03 first**
- 📖 **CRITICAL: ALWAYS read the complete step file before taking any action**
- 🔄 **CRITICAL: When loading next step with 'C', ensure entire file is read**
- ⏸️ **ALWAYS pause after presenting performance design for user confirmation via A/P/C**
- 🎯 **Focus ONLY on cache performance - do not compile final document yet**
- ✅ CRITICAL: Design monitoring for ALL cache layers - do not skip any
- 📋 Document cache hit rate targets and memory allocation by tier
- 🌐 Use web search to verify current cache performance monitoring practices

---

## EXECUTION PROTOCOLS

- 🎯 **Focus:** Design cache performance monitoring with tenant-level visibility
- 💾 **Track:** Record performance design in working document for Step 05
- 📖 **Context:** Reference `domains/caching.md` and `bam-patterns.csv` for patterns
- 🚫 **Do NOT:** Proceed without explicit user confirmation via A/P/C
- 🔍 **Use web search:** Verify cache performance monitoring patterns against current best practices
- ⚠️ **Gate:** Flag performance designs that may impact tenant isolation

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** Cache design and invalidation from Steps 02-03
- **Domain file:** `{project-root}/_bmad/bam/data/domains/caching.md`
- **Pattern registry:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `caching-performance-*`
- **Output:** Cache performance monitoring and optimization strategy
- **Quality gate:** Design informs QG-M2 cache performance requirements

---

## YOUR TASK

Design cache performance monitoring including hit rate tracking by tenant, memory allocation strategies by tier, hot key detection and mitigation, and cache eviction policies. Present the complete design via A/P/C menu for user confirmation.

---

## Main Sequence

### 1. Design Cache Hit Rate Monitoring by Tenant

Define tenant-scoped cache performance metrics:

**Hit Rate Metrics:**

| Metric | Dimensions | Purpose |
|--------|------------|---------|
| `cache.hit.rate` | layer, tenant_id, cache_type | Overall cache effectiveness |
| `cache.miss.rate` | layer, tenant_id, cache_type | Cache misses requiring fallback |
| `cache.latency.p99` | layer, tenant_id | Cache operation latency |
| `cache.eviction.count` | layer, tenant_id | Evictions due to memory pressure |

**Hit Rate Targets by Tier:**

| Tier | L1 Hit Rate | L2 Hit Rate | CDN Hit Rate | SLA |
|------|-------------|-------------|--------------|-----|
| Free | > 70% | > 60% | > 80% | Best effort |
| Pro | > 80% | > 75% | > 85% | 99% |
| Enterprise | > 90% | > 85% | > 95% | 99.9% |

**Monitoring Dashboard:**

```markdown
### Cache Performance Dashboard

Panels:
1. **Hit Rate by Layer** - Time series, grouped by l1/l2/cdn
2. **Hit Rate by Tenant** - Top 10 tenants by traffic
3. **Miss Rate by Cache Type** - entity/query/session
4. **Latency Distribution** - p50, p90, p99 by layer
5. **Eviction Rate** - Time series per layer
6. **Memory Usage** - Current vs allocated per layer
```

**Alert Configuration:**

| Alert | Condition | Severity | Action |
|-------|-----------|----------|--------|
| Low Hit Rate | L2 hit rate < 50% for 5 min | Warning | Investigate cache patterns |
| High Eviction | Evictions > 1000/min | Warning | Review memory allocation |
| Latency Spike | p99 > 100ms for 5 min | Critical | Check Redis health |
| Cache Down | No metrics for 1 min | Critical | Failover to fallback |

Search the web: "Redis cache hit rate monitoring Prometheus {date}"

---

### 2. Design Memory Allocation by Tier

Define tenant memory quotas and allocation strategy:

**Memory Allocation Model:**

| Tier | L1 Memory | L2 Memory (per tenant) | CDN Cache | Rationale |
|------|-----------|------------------------|-----------|-----------|
| Free | Shared pool | 50 MB | Shared | Resource conservation |
| Pro | Shared pool | 200 MB | Shared | Balanced allocation |
| Enterprise | Dedicated | 1 GB+ | Dedicated rules | Premium performance |

**L2 Memory Distribution:**

```markdown
### Redis Memory Strategy

| Component | Allocation | Purpose |
|-----------|------------|---------|
| System | 10% | Redis overhead, scripts |
| Shared Pool | 30% | Free tier tenants |
| Pro Pool | 40% | Pro tier tenants |
| Enterprise Reserved | 20% | Enterprise dedicated |

### Per-Tenant Quotas

| Tier | Max Keys | Max Memory | Eviction Policy |
|------|----------|------------|-----------------|
| Free | 10,000 | 50 MB | LRU (aggressive) |
| Pro | 100,000 | 200 MB | LRU (balanced) |
| Enterprise | Unlimited* | 1 GB+ | LFU or no eviction |

*Subject to contractual limits
```

**Memory Enforcement:**

| Mechanism | Layer | Behavior |
|-----------|-------|----------|
| Key Count Limit | L2 | Reject new keys when limit reached |
| Memory Quota | L2 | Evict LRU when memory exceeded |
| TTL Reduction | L2 | Auto-reduce TTL under pressure |
| Tenant Throttle | L2 | Rate limit cache operations |

Search the web: "Redis memory management multi-tenant quotas {date}"

---

### 3. Design Hot Key Detection and Mitigation

Define strategies for detecting and handling hot keys:

**Hot Key Detection:**

| Method | Implementation | Detection Criteria |
|--------|----------------|-------------------|
| Access Counting | Increment counter per key access | > 1000 accesses/min |
| Redis MONITOR | Sample operations (dev only) | Key appears frequently |
| Proxy Metrics | Track key access in proxy layer | Top N by frequency |
| Application Logging | Log high-frequency keys | Access spike detection |

**Hot Key Metrics:**

| Metric | Dimensions | Alert Threshold |
|--------|------------|-----------------|
| `cache.hotkey.access.rate` | key, tenant_id | > 1000/min |
| `cache.hotkey.cpu.impact` | key | > 10% of node CPU |
| `cache.hotkey.bandwidth` | key | > 100 MB/min |

**Mitigation Strategies:**

| Strategy | Use Case | Implementation |
|----------|----------|----------------|
| **Local Caching** | Read-heavy hot keys | L1 cache with short TTL |
| **Key Replication** | Single key bottleneck | Replicate key across nodes |
| **Key Sharding** | Large hash/set | Split key: `key:shard:{n}` |
| **Request Coalescing** | Thundering herd | Single flight for same key |
| **Rate Limiting** | Abuse prevention | Limit requests per tenant/key |

**Hot Key Response Flow:**

```markdown
### Hot Key Mitigation Flow

1. **Detection:** Monitor identifies key > threshold
2. **Classification:** Determine key type and access pattern
3. **Selection:** Choose mitigation strategy based on type
4. **Application:** Apply mitigation automatically or manually
5. **Verification:** Confirm load distribution improved

| Access Pattern | Mitigation | Auto-Apply |
|----------------|------------|------------|
| Read-heavy | L1 local cache | Yes |
| Write-heavy | Async batching | No |
| Mixed | Key sharding | No |
| Thundering herd | Request coalescing | Yes |
```

Search the web: "Redis hot key detection mitigation patterns {date}"

---

### 4. Design Cache Eviction Policies

Define eviction policies for each tier and cache type:

**Eviction Policy by Tier:**

| Tier | Policy | Behavior | Memory Pressure Response |
|------|--------|----------|--------------------------|
| Free | LRU | Evict least recently used | Aggressive eviction |
| Pro | LRU/LFU | Hybrid based on type | Balanced eviction |
| Enterprise | LFU | Evict least frequently used | Minimal eviction |

**Eviction Policy by Cache Type:**

| Cache Type | Policy | Rationale |
|------------|--------|-----------|
| Session | LRU | Recent sessions more relevant |
| Entity | LFU | Frequently accessed entities valuable |
| Query | TTL-based | Query results expire predictably |
| Config | No eviction | Config must remain available |

**Eviction Configuration:**

```markdown
### Redis Eviction Configuration

# Per-tier maxmemory-policy recommendations
Free tier:   allkeys-lru
Pro tier:    volatile-lru (with TTL on all keys)
Enterprise:  volatile-lfu (with extended TTL)

### Eviction Metrics

| Metric | Purpose | Alert Threshold |
|--------|---------|-----------------|
| `cache.eviction.keys` | Keys evicted/min | > 1000/min |
| `cache.eviction.bytes` | Memory freed/min | > 100 MB/min |
| `cache.memory.fragmentation` | Memory efficiency | > 1.5 ratio |
```

**Eviction Impact Handling:**

| Impact | Detection | Mitigation |
|--------|-----------|------------|
| High miss rate | Hit rate drop | Increase memory allocation |
| Latency spike | p99 increase | Scale cache cluster |
| Tenant starvation | Tenant miss rate spike | Rebalance quotas |

Search the web: "Redis eviction policy multi-tenant SaaS {date}"

---

## COLLABORATION MENUS (A/P/C):

After presenting complete performance design:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific performance scenarios
- **P (Party Mode)**: Bring SRE, performance, and capacity perspectives
- **C (Continue)**: Accept design and proceed to compilation step

Select an option:
```

### If 'A' (Advanced Elicitation):

Invoke `bmad-advanced-elicitation` skill to explore:

- **Scaling triggers:** When should cache cluster scale?
- **Cost optimization:** How to minimize cache infrastructure cost?
- **Tenant fairness:** How to prevent noisy neighbors?
- **Burst handling:** How to handle traffic spikes?
- **Capacity planning:** How to forecast cache growth?

Pass context: Steps 02-03 design, current performance design, specific concerns.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode):

Invoke `bmad-party-mode` skill with context:

```
Review cache performance design for {tenant_count} tenants
with tiers: Free, Pro, Enterprise
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| SRE | Reliability | Will performance monitoring catch issues early? |
| Performance | Optimization | Are hit rate targets achievable? |
| Capacity | Planning | Is memory allocation sufficient for growth? |
| Finance | Cost | What is the infrastructure cost for cache? |

Process multi-perspective analysis and synthesize into refined design.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue):

1. Record the performance design in working document:

```yaml
# Add to caching-design.md
performance:
  hit_rate_targets:
    free: {l1: 70, l2: 60, cdn: 80}
    pro: {l1: 80, l2: 75, cdn: 85}
    enterprise: {l1: 90, l2: 85, cdn: 95}
  memory_allocation:
    free: 50MB
    pro: 200MB
    enterprise: 1GB+
  hot_key_detection:
    threshold: 1000/min
    mitigation: [local_cache, sharding, coalescing]
  eviction_policy:
    free: allkeys-lru
    pro: volatile-lru
    enterprise: volatile-lfu
performance_design_completed_at: {timestamp}
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze
  - step-03-c-design
  - step-04-c-document  # Add this
currentStep: step-05-c-complete
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ Cache hit rate targets defined by tier
- ✅ Memory allocation strategy documented
- ✅ Hot key detection and mitigation designed
- ✅ Eviction policies defined by tier and type
- ✅ Monitoring metrics and alerts configured
- ✅ Web search performed for performance best practices
- ✅ Steps 02-03 design referenced
- ✅ User confirmed design via A/P/C menu
- ✅ Performance design recorded in working document

---

## FAILURE MODES

- ❌ Missing hit rate targets - no performance SLA baseline
- ❌ No memory allocation - tenants compete unfairly for cache
- ❌ Hot keys ignored - single key can degrade cache performance
- ❌ No eviction policy - cache fills up and fails
- ❌ Missing alerts - performance issues undetected
- ❌ Proceeding without A/P/C confirmation - user not engaged
- ❌ Skipping web search - may miss current performance patterns

---

## NEXT STEP

After user confirms performance design with 'C':

1. Record the performance design in working document
2. Proceed to `step-05-c-complete.md` to compile final caching design document
3. The performance design informs:
   - Final caching design template population
   - Quality gate QG-M2 cache performance checklist
   - Observability integration requirements

**Transition to Step 05 with:**
- Hit rate targets: `{by_tier}`
- Memory allocation: `{by_tier}`
- Eviction policies: `{by_tier_type}`
