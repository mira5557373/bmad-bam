# Step 2: Design Topic Architecture

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

Create topic naming conventions, define partition strategies, plan tenant isolation, and configure retention policies.

## Prerequisites

- Step 1 completed: Event domains defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: kafka-patterns
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation

---

## Inputs

- Output from Step 1 (Event domains)
- Platform selection (Kafka, EventBridge, etc.)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`

---

## Actions

**Verify current best practices with web search:**
Search the web: "Kafka topic design best practices {date}"
Search the web: "multi-tenant Kafka partition strategies {date}"

_Source: [URL]_

### 1. Create Topic Naming Conventions

| Pattern | Example | Use Case |
|---------|---------|----------|
| {domain}.{entity}.{action} | identity.user.created | Domain events |
| {env}.{domain}.{entity} | prod.commerce.orders | Environment separation |
| {tenant}.{domain}.{entity} | acme.billing.invoices | Tenant isolation |
| {domain}.{entity}.{version} | identity.user.v2 | Versioned topics |

### 2. Define Partition Strategies

| Strategy | Key Selection | Ordering Guarantee | Use Case |
|----------|---------------|-------------------|----------|
| Tenant-based | tenant_id | Per-tenant ordering | Multi-tenant isolation |
| Entity-based | entity_id | Per-entity ordering | Aggregate consistency |
| Random | None | No ordering | High throughput |
| Composite | tenant_id:entity_id | Tenant + entity | Complex ordering |

### 3. Plan Tenant Isolation

| Approach | Implementation | Pros | Cons |
|----------|----------------|------|------|
| Topic-per-tenant | tenant-{id}.events | Strong isolation | Topic proliferation |
| Partition-per-tenant | Partition key = tenant_id | Moderate isolation | Limited partitions |
| Filter-in-consumer | Header filtering | Simple | Shared consumption |
| ACL-based | Topic ACLs | Security isolation | Management overhead |

### 4. Configure Retention Policies

| Topic Type | Retention | Compaction | Replication |
|------------|-----------|------------|-------------|
| Commands | 7 days | Delete | 3 |
| Events | 30 days | Delete | 3 |
| State | Infinite | Compact | 3 |
| Audit | 1 year | Delete | 3 |

---

## Soft Gate Checkpoint

**Steps 1-2 complete the domain and topic design phase.**

Present summary of:
- Event domain catalog
- Topic naming conventions
- Partition and isolation strategy

Ask for confirmation before proceeding to schema registry configuration.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the topic architecture above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into partition and isolation strategies
- **P (Party Mode)**: Bring DevOps and architect perspectives for topic review
- **C (Continue)**: Accept topic architecture and proceed to schema registry
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass topic context: naming, partitions, isolation, retention
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into architecture
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review topic architecture: {summary of naming and isolation}"
- Process collaborative analysis from DevOps and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save topic architecture
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-configure-schema-registry.md`

---

## Verification

- [ ] Topic naming conventions created
- [ ] Partition strategies defined
- [ ] Tenant isolation planned
- [ ] Retention policies configured
- [ ] Patterns align with pattern registry

## Outputs

- Topic architecture document
- Naming convention guide
- Partition strategy

## Next Step

Proceed to `step-03-c-configure-schema-registry.md` to configure schema registry.
