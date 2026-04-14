# Step 5: Caching Strategy

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design embedding caching architecture to reduce API costs, improve latency, and optimize resource utilization while maintaining tenant isolation.

---

## Prerequisites

- Steps 1-4 completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: caching
- **Web research (if available):** Search for embedding caching strategies

---

## Inputs

- Previous step decisions
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Design Cache Key Schema

Content-addressable caching:

| Key Component | Format | Purpose |
|---------------|--------|---------|
| Tenant prefix | `emb:{tenant_id}:` | Isolation |
| Content hash | `sha256(text)[:16]` | Deduplication |
| Model version | `:v{model_version}` | Version safety |
| Full key | `emb:{tenant}:{hash}:v{ver}` | Unique identifier |

### 2. Configure Multi-Tier Cache

| Tier | Storage | TTL | Capacity | Use Case |
|------|---------|-----|----------|----------|
| L1 Local | Memory/LRU | 5 min | 1GB | Hot embeddings |
| L2 Distributed | Redis | 24 hours | 10GB | Shared cache |
| L3 Persistent | PostgreSQL/S3 | 30 days | 100GB+ | Cold storage |

### 3. Define Cache Invalidation

| Trigger | Action | Scope |
|---------|--------|-------|
| Model upgrade | Invalidate all | Global |
| Document update | Invalidate doc chunks | Document |
| Tenant request | Clear tenant cache | Tenant |
| TTL expiry | Auto-remove | Per-key |

### 4. Calculate Cache ROI

| Metric | Without Cache | With Cache | Savings |
|--------|---------------|------------|---------|
| API calls/month | [ ] | [ ] | [ ] % |
| API cost/month | [ ] USD | [ ] USD | [ ] USD |
| Avg latency | [ ] ms | [ ] ms | [ ] ms |
| Cache hit rate | N/A | Target [ ] % | N/A |

### 5. Design Cache Warming

| Strategy | Trigger | Priority |
|----------|---------|----------|
| On-demand | First access | Default |
| Pre-warm | Document upload | High-traffic docs |
| Background | Off-peak hours | Popular content |

**Verify current best practices with web search:**
Search the web: "embedding caching strategies LLM {date}"
Search the web: "content addressable cache embeddings {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the caching analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into cache architecture and ROI analysis
- **P (Party Mode)**: Bring platform engineer and cost analyst perspectives
- **C (Continue)**: Accept caching design and proceed to quality metrics
- **[Specific refinements]**: Describe caching concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: cache key schema, multi-tier design, ROI projections
- Process enhanced insights on cache optimization
- Ask user: "Accept these refined caching decisions? (y/n)"
- If yes, integrate into caching specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review embedding caching strategy for cost optimization"
- Process platform engineer and cost analyst perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save caching strategy to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Proceed to next step: `step-06-c-quality-metrics.md`

---

## Verification

- [ ] Cache key schema designed with tenant isolation
- [ ] Multi-tier cache configured
- [ ] Invalidation strategies defined
- [ ] Cache ROI calculated
- [ ] Cache warming strategy defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Caching strategy specification
- Cache key schema documentation
- ROI analysis
- Invalidation procedures

---

## Next Step

Proceed to `step-06-c-quality-metrics.md` to define quality metrics.
