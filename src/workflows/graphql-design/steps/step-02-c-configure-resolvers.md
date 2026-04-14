# Step 2: Configure Resolvers

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Design resolver architecture, plan data loaders, configure tenant context, and optimize N+1 queries.

## Prerequisites

- Step 1 completed: Schema designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: resolver-patterns
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: data-loading

---

## Actions

**Verify current best practices with web search:**
Search the web: "GraphQL resolver patterns best practices {date}"
Search the web: "DataLoader batching optimization {date}"

_Source: [URL]_

### 1. Design Resolver Architecture

| Resolver Type | Pattern | Error Handling |
|---------------|---------|----------------|
| Query | Service delegation | GraphQL errors |
| Mutation | Command pattern | Union types |
| Subscription | PubSub | Connection errors |
| Field | Lazy loading | Null coalescing |

### 2. Plan Data Loaders

| Loader | Batching | Caching | TTL |
|--------|----------|---------|-----|
| UserLoader | By ID | Request-scoped | - |
| TenantLoader | By ID | Request-scoped | - |
| OrderLoader | By User | Request-scoped | - |

### 3. Configure Tenant Context

| Context Element | Source | Validation |
|-----------------|--------|------------|
| Tenant ID | JWT claims | Required |
| User ID | JWT claims | Required |
| Permissions | Token scopes | Per-field |

### 4. Optimize N+1 Queries

| Pattern | Problem | Solution |
|---------|---------|----------|
| DataLoader | N+1 selects | Batch loading |
| Field selection | Over-fetching | Projection |
| Deferred | Waterfall | @defer directive |

---

## Soft Gate Checkpoint

**Steps 1-2 complete the schema and resolver design phase.**

Present summary and ask for confirmation before proceeding to query optimization.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

---

## Verification

- [ ] Resolver architecture designed
- [ ] Data loaders planned
- [ ] Tenant context configured
- [ ] N+1 optimization addressed
- [ ] Patterns align with pattern registry

## Outputs

- Resolver architecture document
- Data loader configuration
- Tenant context handling

## Next Step

Proceed to `step-03-c-plan-optimization.md` to plan query optimization.
