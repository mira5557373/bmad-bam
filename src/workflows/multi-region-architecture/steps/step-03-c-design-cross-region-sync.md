# Step 3: Design Cross-Region Sync Strategy

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Design data synchronization strategy between regions, defining what syncs, how it syncs, and conflict resolution.

---

## Prerequisites

- Data residency mapping completed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `event-driven`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design cross-region data synchronization:

---

## Sync Classification

| Data Type | Syncs Globally | Sync Pattern | Latency Budget |
|-----------|----------------|--------------|----------------|
| Global Config | Yes | Eventual (< 30s) | 30 seconds |
| Tenant Metadata | No (home region only) | N/A | N/A |
| Tenant Content | No (home region only) | N/A | N/A |
| Rate Limits | Yes | Eventual (< 5s) | 5 seconds |
| Feature Flags | Yes | Eventual (< 60s) | 60 seconds |
| Auth Tokens | Yes (for cross-region auth) | Strong | < 1 second |

---

## Global Data Sync (What Syncs Everywhere)

| Data | Source of Truth | Sync Mechanism | Consumers |
|------|-----------------|----------------|-----------|
| Platform Config | Primary (us-east-1) | Change Data Capture | All regions |
| Tier Definitions | Primary | CDC + Cache | All regions |
| Tool Registry | Primary | CDC + Cache | All regions |
| Global Rate Limits | Primary | Redis Cluster | All regions |

---

## Regional Data (Stays Local)

| Data | Home Region | Replicas | Access Pattern |
|------|-------------|----------|----------------|
| Tenant Database | Tenant's region | Regional DR only | Local only |
| Agent Conversations | Tenant's region | Regional DR only | Local only |
| Vector Embeddings | Tenant's region | Regional DR only | Local only |
| Object Storage | Tenant's region | Regional DR only | Local only |

---

## Sync Patterns

### Eventual Consistency (Most Data)
- Use CDC (Change Data Capture) from source database
- Publish to regional Kafka/EventBridge
- Apply changes with idempotent consumers
- Target latency: < 30 seconds

### Strong Consistency (Auth/Sessions)
- Use distributed cache (Redis Cluster)
- Synchronous replication
- Target latency: < 1 second

---

## Conflict Resolution

| Scenario | Resolution Strategy |
|----------|---------------------|
| Concurrent updates to global config | Last-writer-wins with vector clocks |
| Concurrent tenant operations | Not applicable (single region) |
| Feature flag race | Source of truth wins |
| Rate limit sync delay | Accept temporary over-limit |

**Verify current best practices with web search:**
Search the web: "design cross region sync strategy best practices {date}"
Search the web: "design cross region sync strategy enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the sync strategy above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into sync patterns and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for sync review
- **C (Continue)**: Accept sync strategy and proceed to regional routing
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass sync context: patterns, latency budgets, conflicts
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into sync strategy
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review sync strategy: {summary of patterns and resolution}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save sync strategy to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-design-regional-routing.md`

---

## Verification

- [ ] Sync classification complete
- [ ] Global data sync defined
- [ ] Regional data boundaries clear
- [ ] Sync patterns specified
- [ ] Conflict resolution documented
- [ ] Latency budgets defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Cross-region sync strategy
- Data sync classification matrix

---

## Next Step

Proceed to `step-04-c-design-regional-routing.md` to design tenant-to-region routing.
