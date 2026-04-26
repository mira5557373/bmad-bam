# Step 02: Design Tenant-Scoped Caching

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER design caching without loading Step 01 initialization first**
- 📖 **CRITICAL: ALWAYS read the complete step file before taking any action**
- 🔄 **CRITICAL: When loading next step with 'C', ensure entire file is read**
- ⏸️ **ALWAYS pause after presenting cache design for user confirmation via A/P/C**
- 🎯 **Focus ONLY on tenant-scoped caching design - do not design invalidation yet**
- ✅ CRITICAL: Design caching for ALL 3 layers - do not skip any layer
- 📋 Document cache key patterns with tenant prefix for each cache type
- 🌐 Use web search to verify current tenant-scoped caching best practices

---

## EXECUTION PROTOCOLS

- 🎯 **Focus:** Design tenant-scoped caching with isolation verification
- 💾 **Track:** Record cache design decisions in working document for Step 03
- 📖 **Context:** Reference `domains/caching.md` and `bam-patterns.csv` for patterns
- 🚫 **Do NOT:** Proceed without explicit user confirmation via A/P/C
- 🔍 **Use web search:** Verify tenant-scoped caching patterns against current best practices
- ⚠️ **Gate:** Flag cache designs that may leak tenant data

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** Cache layer architecture from Step 01
- **Domain file:** `{project-root}/_bmad/bam/data/domains/caching.md`
- **Pattern registry:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `caching-*`
- **Output:** Tenant-scoped caching design for L1, L2, CDN
- **Quality gate:** Design informs QG-M2 (Tenant Isolation) cache dimension

---

## YOUR TASK

Design tenant-scoped caching for each cache layer established in Step 01. For each layer, define cache key patterns, isolation verification, TTL policies by tier, and cache warming strategies. Present the complete design via A/P/C menu for user confirmation.

---

## Main Sequence

### 1. Design L1 In-Memory Cache

Design the application-level in-memory cache:

| Aspect | Design | Notes |
|--------|--------|-------|
| Technology | (Local map, Caffeine, Guava) | |
| Scope | Per-process, request-scoped | |
| Isolation | Process isolation + tenant context | |
| TTL | {short duration} | |

**Cache Key Pattern (L1):**

```
Key: tenant:{tenant_id}:l1:{type}:{key}
```

| Cache Type | Pattern | TTL | Use Case |
|------------|---------|-----|----------|
| Request Context | `tenant:{id}:l1:ctx:{req}` | Request lifetime | Current user, permissions |
| Hot Data | `tenant:{id}:l1:hot:{entity}:{pk}` | 1-5 minutes | Frequently accessed entities |
| Computed | `tenant:{id}:l1:calc:{hash}` | 30-60 seconds | Expensive computations |

**Isolation Verification (L1):**

| Check | Verification Method |
|-------|---------------------|
| Tenant context required | Cache miss if tenant context absent |
| Process isolation | Each instance has isolated memory |
| No cross-tenant reads | Keys always scoped to tenant |

Search the web: "in-memory cache multi-tenant isolation {date}"

---

### 2. Design L2 Distributed Cache

Design the distributed Redis/Memcached cache:

| Aspect | Design | Notes |
|--------|--------|-------|
| Technology | (Redis, Memcached, ElastiCache) | |
| Cluster Mode | (Single, Sentinel, Cluster) | |
| Isolation | Tenant-prefixed keys | |
| TTL | {tier-based} | |

**Cache Key Pattern (L2):**

```
Key: tenant:{tenant_id}:l2:{type}:{key}
```

| Cache Type | Pattern | TTL (Free) | TTL (Pro) | TTL (Enterprise) |
|------------|---------|------------|-----------|------------------|
| Session | `tenant:{id}:l2:session:{sid}` | 15 min | 30 min | 60 min |
| Entity | `tenant:{id}:l2:entity:{type}:{pk}` | 5 min | 15 min | 30 min |
| Query | `tenant:{id}:l2:query:{hash}` | 1 min | 5 min | 15 min |
| Rate Limit | `tenant:{id}:l2:rate:{window}` | Window | Window | Window |

**TTL Policies by Tier:**

```markdown
### TTL Strategy

| Tier | Session TTL | Entity TTL | Query TTL | Rationale |
|------|-------------|------------|-----------|-----------|
| Free | 15 min | 5 min | 1 min | Resource conservation |
| Pro | 30 min | 15 min | 5 min | Balanced performance |
| Enterprise | 60 min | 30 min | 15 min | Maximum performance |
```

**Isolation Verification (L2):**

| Check | Verification Method |
|-------|---------------------|
| Tenant prefix mandatory | Key generator enforces `tenant:{id}:` prefix |
| No wildcard scans | `KEYS *` disabled, use `SCAN` with tenant prefix |
| Separate key namespaces | Tenant IDs are unique, no collision |
| Cross-tenant blocked | GET without tenant prefix returns null |

Search the web: "Redis multi-tenant cache key design {date}"

---

### 3. Design CDN Cache

Design the edge/CDN cache layer:

| Aspect | Design | Notes |
|--------|--------|-------|
| Technology | (CloudFront, Fastly, Cloudflare) | |
| Scope | Edge network | |
| Isolation | Header-based, path-based | |
| TTL | {content type based} | |

**Cache Key Components (CDN):**

| Component | Source | Purpose |
|-----------|--------|---------|
| Tenant ID | Header: `X-Tenant-ID` | Primary isolation |
| User Role | Header: `X-User-Role` | Role-based content |
| Region | Auto-detected | Data residency |
| Vary | `Accept-Encoding, X-Tenant-ID` | Cache variations |

**CDN Cache Strategy:**

| Content Type | TTL | Tenant Isolation | Cache-Control |
|--------------|-----|------------------|---------------|
| Static Assets | 1 year | Shared (no tenant data) | `public, max-age=31536000` |
| Tenant Branding | 1 day | Tenant-specific | `private, max-age=86400` |
| API Responses | 1-5 min | Tenant-specific | `private, max-age=300` |
| User Data | No cache | N/A | `no-store` |

**Isolation Verification (CDN):**

| Check | Verification Method |
|-------|---------------------|
| Tenant header required | Origin rejects requests without `X-Tenant-ID` |
| Vary header set | Cache varies by tenant header |
| Private caching | Tenant-specific content uses `Cache-Control: private` |
| No shared tenant data | API responses never cached with `public` |

Search the web: "CDN multi-tenant caching Vary header {date}"

---

### 4. Cache Warming Strategies

Design cache warming for each layer:

**Warming Triggers:**

| Trigger | Layer | Strategy |
|---------|-------|----------|
| Tenant Onboarding | L2 | Pre-populate tenant config, rate limits |
| App Startup | L1 | Load hot data from L2 |
| Cache Miss | L1 → L2 | Read-through from database |
| Scheduled | L2 | Refresh popular entities hourly |

**Warming Implementation:**

```markdown
### Cache Warming Sequence

1. **Tenant Onboarding Warming:**
   - Populate tenant configuration
   - Set default rate limits
   - Pre-fetch user preferences
   
2. **Scheduled Warming:**
   - Top 100 entities by access frequency
   - Tenant-level aggregates
   - Configuration values

3. **Lazy Warming:**
   - Read-through on cache miss
   - Write-through on entity update
   - Background refresh for stale data
```

Search the web: "distributed cache warming strategies {date}"

---

## COLLABORATION MENUS (A/P/C):

After presenting complete tenant-scoped cache design:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific cache layer requirements
- **P (Party Mode)**: Bring performance, security, and ops perspectives
- **C (Continue)**: Accept design and proceed to invalidation step

Select an option:
```

### If 'A' (Advanced Elicitation):

Invoke `bmad-advanced-elicitation` skill to explore:

- **Layer conflicts:** Where do cache layers conflict or duplicate?
- **Tier differentiation:** How should caching vary by tenant tier?
- **Performance targets:** What cache hit rates are required?
- **Memory constraints:** How much cache memory per tenant?
- **Cost optimization:** Which cache layers can be simplified?

Pass context: Step 01 initialization, current cache design, specific concerns.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode):

Invoke `bmad-party-mode` skill with context:

```
Review tenant-scoped cache design for {tenant_count} tenants
with tenant model: {tenant_model}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| Performance | Hit rates | Will cache design meet latency SLAs? |
| Security | Isolation | Can tenant data leak between caches? |
| DevOps | Operations | Can team monitor and manage caches? |
| Finance | Cost | What is the infrastructure cost per layer? |

Process multi-perspective analysis and synthesize into refined design.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue):

1. Record the cache design in working document:

```yaml
# Add to caching-design.md
cache_layers:
  l1:
    technology: {tech}
    isolation: process + tenant_context
    ttl_strategy: {strategy}
  l2:
    technology: {tech}
    isolation: tenant_prefixed_keys
    ttl_by_tier: {Free: X, Pro: Y, Enterprise: Z}
  cdn:
    technology: {tech}
    isolation: tenant_header_vary
    ttl_strategy: {strategy}
cache_warming:
  onboarding: {yes/no}
  scheduled: {yes/no}
  lazy: {yes/no}
design_completed_at: {timestamp}
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze  # Add this
currentStep: step-03-c-design
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ All 3 cache layers designed with isolation strategy
- ✅ Each layer has clear tenant-prefixed key patterns
- ✅ TTL policies defined by tier (Free, Pro, Enterprise)
- ✅ Cache warming strategies documented
- ✅ Isolation verification checks defined
- ✅ Web search performed for layer-specific best practices
- ✅ Step 01 requirements referenced in each design
- ✅ User confirmed design via A/P/C menu
- ✅ Cache design recorded in working document

---

## FAILURE MODES

- ❌ Skipping cache layers - incomplete caching design
- ❌ Designing without Step 01 context - design not grounded in requirements
- ❌ Missing tenant prefix - cache keys may collide across tenants
- ❌ No TTL by tier - all tenants get same cache behavior
- ❌ Missing isolation verification - cannot guarantee tenant data safety
- ❌ Proceeding without A/P/C confirmation - user not engaged in decisions
- ❌ Skipping web search - may miss current caching best practices

---

## NEXT STEP

After user confirms cache design with 'C':

1. Record the 3-layer cache design in working document
2. Proceed to `step-03-c-design.md` to design cache invalidation
3. The cache design informs:
   - Invalidation patterns per layer
   - Event-driven cache updates
   - Quality gate QG-M2 cache dimension checklist items

**Transition to Step 03 with:**
- Cache layers: `{l1: X, l2: Y, cdn: Z}`
- Key patterns: `tenant:{id}:{type}:{key}`
- TTL policies: `{by_tier_by_type}`
