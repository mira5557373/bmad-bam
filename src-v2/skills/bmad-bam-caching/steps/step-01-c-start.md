# Step 1: Initialize Tenant-Aware Caching Design

## MANDATORY EXECUTION RULES

- 🛑 **NEVER generate caching design without loading tenant model configuration first**
- 📖 **CRITICAL: ALWAYS read the complete step file before taking any action**
- 🔄 **CRITICAL: When loading next step with 'C', ensure entire file is read**
- ⏸️ **ALWAYS pause after presenting cache layer overview for user confirmation**
- 🎯 **Focus ONLY on cache initialization scope - do not design invalidation yet**
- ✅ PRESENT cache layer architecture template before proceeding
- 📋 CONFIRM tenant isolation strategy for each cache layer
- 🌐 USE web search to verify current caching best practices

---

## EXECUTION PROTOCOLS

- 🎯 **Focus:** Initialize tenant-aware caching design with multi-layer strategy
- 💾 **Track:** `stepsCompleted: [1]` when complete
- 📖 **Context:** Load tenant domain and master architecture first
- 🚫 **Do NOT:** Skip any cache layer identification
- 🔍 **Use web search:** Verify caching patterns against current best practices
- ⚠️ **Gate:** Caching design feeds into QG-M2 (Tenant Isolation) cache dimension

---

## CONTEXT BOUNDARIES

### Primary Domain

- **Caching Domain:** `{project-root}/_bmad/bam/data/domains/caching.md`
- Contains: Cache layer patterns, tenant-aware key strategies, invalidation patterns

### Required Artifacts

- **Master Architecture:** `{output_folder}/planning-artifacts/master-architecture.md`
- Contains: Selected tenant model (RLS, schema, database, hybrid)

### Pattern Registry

- **Caching Patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `caching-*`
- Contains: Cache strategy decision criteria, TTL patterns, web queries

---

## YOUR TASK

Initialize the caching design by loading configuration, identifying cache layers, and establishing the tenant-aware caching strategy foundation. Each cache layer must support tenant isolation according to the selected tenant model.

---

## Prerequisites

- [ ] Master architecture document exists with tenant model selected
- [ ] User has access to performance requirements
- [ ] Tenant tier definitions available (Free, Pro, Enterprise)

---

## Main Sequence

### Action 1: Load Caching Domain Context

**Read and internalize:**

```
{project-root}/_bmad/bam/data/domains/caching.md
```

Key concepts to understand:
- Multi-layer caching architecture (L1, L2, CDN)
- Tenant-aware cache key patterns
- Cache invalidation strategies

### Action 2: Load Master Architecture

**Read and extract tenant model:**

```
{output_folder}/planning-artifacts/master-architecture.md
```

Document the selected tenant model:

| Setting | Value |
|---------|-------|
| Tenant Model | (RLS / Schema / Database / Hybrid) |
| Cache Isolation Requirement | (from architecture) |
| Performance SLAs | (from architecture) |
| Expected Tenant Count | (from architecture) |

### Action 3: Load Caching Pattern Registry

**Read and filter relevant patterns:**

```
{project-root}/_bmad/bam/data/bam-patterns.csv
```

Filter by: `caching-*` patterns

Extract for the selected tenant model:
- Cache key structure patterns
- TTL strategy by tier
- Invalidation patterns
- Web queries for current best practices

### Action 4: Identify Cache Layers

Present the 3-layer caching architecture to the user:

#### Cache Layer Architecture Template

| Layer | Technology | Scope | Tenant Isolation | Use Case |
|-------|------------|-------|------------------|----------|
| **L1 (In-Memory)** | Application memory | Per-process | Process-isolated | Hot data, request-scoped |
| **L2 (Distributed)** | Redis/Memcached | Shared cluster | Key-prefixed | Session data, shared entities |
| **CDN** | CloudFront/Fastly | Edge network | Header-based | Static assets, API responses |

**For each layer, ask:**

1. What is the baseline isolation from the selected tenant model?
2. Are there tier-specific cache behaviors? (Free vs Pro vs Enterprise)
3. What are the TTL requirements?
4. What invalidation events affect this layer?

### Action 5: Establish Cache Key Strategy

Document the tenant-aware cache key pattern:

```
Cache Key Pattern: tenant:{tenant_id}:{type}:{key}
```

| Component | Description | Example |
|-----------|-------------|---------|
| `tenant` | Prefix namespace | `tenant` |
| `{tenant_id}` | Tenant identifier | `acme-corp` |
| `{type}` | Cache type | `session`, `entity`, `query` |
| `{key}` | Unique key | `user:123`, `product:456` |

**Example keys by type:**

| Type | Pattern | Example |
|------|---------|---------|
| Session | `tenant:{id}:session:{session_id}` | `tenant:acme:session:abc123` |
| Entity | `tenant:{id}:entity:{entity}:{pk}` | `tenant:acme:entity:user:42` |
| Query | `tenant:{id}:query:{hash}` | `tenant:acme:query:a1b2c3` |
| Aggregate | `tenant:{id}:agg:{metric}` | `tenant:acme:agg:daily-usage` |

### Action 6: Web Research Verification

**Verify current best practices with web search:**

Search the web: "multi-tenant caching patterns Redis {date}"
Search the web: "tenant-aware cache key design best practices {date}"
Search the web: "distributed cache isolation patterns {date}"

Use `web_queries` column from `bam-patterns.csv` for pattern-specific searches.

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-6 complete the caching initialization.**

Present the cache layer overview and ask for confirmation:

```
Caching Design Initialization Summary:
- Tenant Model: {selected}
- L1 (In-Memory): {scope and isolation}
- L2 (Distributed): {technology and isolation}
- CDN: {edge strategy}
- Key Pattern: tenant:{id}:{type}:{key}

Ready to proceed to tenant-scoped caching design? (y/n)
```

---

## SUCCESS METRICS

- ✅ Caching domain context loaded and understood
- ✅ Master architecture reviewed, tenant model extracted
- ✅ All 3 cache layers identified with scope
- ✅ Tenant-aware key pattern established
- ✅ Tier variations identified (if applicable)
- ✅ Web research performed for current patterns
- ✅ User confirmed initialization

---

## FAILURE MODES

- ❌ **No master architecture:** Cannot proceed without tenant model selection
- ❌ **Missing cache layer:** Each layer must have explicit isolation strategy
- ❌ **Key pattern conflict:** Cache keys must include tenant prefix
- ❌ **TTL undefined:** Each cache type needs TTL strategy
- ❌ **No invalidation plan:** Cache updates require invalidation events

---

## Outputs

- Cache layer architecture overview
- Tenant-aware key pattern definition
- Initialization confirmation

**Note:** Full caching design document created in later steps using:
`{project-root}/_bmad/bam/data/templates/caching-design-template.md`

---

## NEXT STEP

Proceed to `step-02-c-analyze.md` with:
- Cache layer architecture
- Tenant-aware key patterns
- Performance requirements

The analysis step will design tenant-scoped caching for each layer.
