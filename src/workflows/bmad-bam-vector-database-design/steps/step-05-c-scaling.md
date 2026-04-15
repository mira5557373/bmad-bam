# Step 5: Scaling Strategy

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

Plan horizontal and vertical scaling strategies for vector storage to handle growth in tenants, vectors, and query load while maintaining performance SLAs.

---

## Prerequisites

- Steps 1-4 completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: scaling
- **Web research (if available):** Search for vector database scaling patterns

---

## Inputs

- Requirements and optimization design from previous steps
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Design Sharding Strategy

Select sharding approach:

| Strategy | Description | Best For |
|----------|-------------|----------|
| Tenant-based | Each tenant on specific shards | Strong isolation |
| Hash-based | Distribute by vector ID hash | Even distribution |
| Range-based | By timestamp or ID range | Time-series data |
| Hybrid | Tenant + hash within tenant | Large tenants |

### 2. Configure Replica Sets

Design read replica configuration:

| Tier | Read Replicas | Write Strategy | Consistency |
|------|---------------|----------------|-------------|
| Free | 1 | Single primary | Eventual |
| Pro | 2-3 | Single primary | Eventual |
| Enterprise | 3+ | Multi-region | Strong/Tunable |

### 3. Define Auto-Scaling Policies

| Metric | Scale Up | Scale Down | Cooldown |
|--------|----------|------------|----------|
| CPU utilization | >70% | <30% | 5 min |
| Memory utilization | >80% | <40% | 10 min |
| Query latency p95 | >SLA | <50% SLA | 5 min |
| Queue depth | >1000 | <100 | 2 min |

### 4. Plan Capacity per Tier

| Tier | Max Vectors | Max Query QPS | Storage GB |
|------|-------------|---------------|------------|
| Free | [ ] K | [ ] QPS | [ ] GB |
| Pro | [ ] M | [ ] QPS | [ ] GB |
| Enterprise | [ ] M+ | [ ] QPS | [ ] GB |

### 5. Design Hot/Warm/Cold Tiering

| Tier | Access Pattern | Storage | Cost |
|------|----------------|---------|------|
| Hot | Recent 30 days | SSD/Memory | $$$ |
| Warm | 30-90 days | SSD | $$ |
| Cold | >90 days | Object storage | $ |

**Verify current best practices with web search:**
Search the web: "vector database scaling horizontal sharding {date}"
Search the web: "vector index auto-scaling Kubernetes {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the scaling analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into sharding decisions and capacity planning
- **P (Party Mode)**: Bring SRE and platform architect perspectives on scaling
- **C (Continue)**: Accept scaling strategy and proceed to backup design
- **[Specific refinements]**: Describe scaling concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: sharding strategy, replica config, auto-scaling policies
- Process enhanced insights on capacity planning
- Ask user: "Accept these refined scaling decisions? (y/n)"
- If yes, integrate into scaling specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review vector database scaling strategy for growth projections"
- Process SRE and platform architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save scaling strategy to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Proceed to next step: `step-06-c-backup.md`

---

## Verification

- [ ] Sharding strategy selected
- [ ] Replica configuration defined
- [ ] Auto-scaling policies configured
- [ ] Capacity limits per tier documented
- [ ] Storage tiering designed
- [ ] Patterns align with pattern registry

---

## Outputs

- Scaling strategy specification
- Sharding design document
- Auto-scaling policy configuration
- Capacity planning matrix

---

## Next Step

Proceed to `step-06-c-backup.md` to design backup and recovery.
