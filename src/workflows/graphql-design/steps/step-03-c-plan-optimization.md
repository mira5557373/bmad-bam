# Step 3: Plan Query Optimization

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

Design query complexity limits, plan caching strategy, configure rate limiting, and set up monitoring.

## Prerequisites

- Steps 1-2 completed: Schema and resolvers designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: performance
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: caching

---

## Actions

**Verify current best practices with web search:**
Search the web: "GraphQL query complexity analysis {date}"
Search the web: "GraphQL caching strategies Apollo {date}"

_Source: [URL]_

### 1. Design Query Complexity Limits

| Limit Type | Value | Enforcement |
|------------|-------|-------------|
| Max depth | 10 | Query validation |
| Max complexity | 1000 | Cost analysis |
| Max aliases | 20 | Query parsing |
| Timeout | 30s | Execution |

### 2. Plan Caching Strategy

| Cache Level | Implementation | TTL |
|-------------|----------------|-----|
| CDN | Edge caching | 5 min |
| Response | Apollo Cache | Request |
| Entity | Redis | Varies |
| DataLoader | Request-scoped | Request |

### 3. Configure Rate Limiting

| Limit Type | Scope | Quota |
|------------|-------|-------|
| Requests | Per-tenant | 1000/min |
| Complexity | Per-tenant | 10000/min |
| Mutations | Per-user | 100/min |

### 4. Set Up Monitoring

| Metric | Collection | Alerting |
|--------|------------|----------|
| Query latency | Per-operation | P99 > 1s |
| Error rate | Per-field | > 1% |
| Complexity | Per-query | > 80% limit |
| Cache hit | Per-type | < 50% |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

---

## Verification

- [ ] Query complexity limits designed
- [ ] Caching strategy planned
- [ ] Rate limiting configured
- [ ] Monitoring set up
- [ ] Patterns align with pattern registry

## Outputs

- Query optimization specification
- Caching configuration
- Monitoring dashboard

## Next Step

Workflow complete. Present GraphQL Design with optimization configuration to user for review and approval.
