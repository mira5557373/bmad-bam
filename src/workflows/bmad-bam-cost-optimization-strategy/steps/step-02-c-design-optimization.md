# Step 2: Design Optimization Strategies

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
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design comprehensive cost optimization strategies across all cost categories.

---

## Prerequisites

- Step 1 completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: optimization

---

## Actions

### 1. Compute Optimization

| Strategy | Implementation | Expected Savings |
|----------|----------------|------------------|
| Right-sizing | Analyze utilization, resize instances | 20-40% |
| Reserved capacity | Commit to 1-3 year reservations | 30-60% |
| Spot/preemptible | Use for fault-tolerant workloads | 60-90% |
| Auto-scaling | Scale based on demand | 15-30% |
| Container density | Optimize pod packing | 10-20% |

### 2. LLM Cost Optimization

| Strategy | Implementation | Expected Savings |
|----------|----------------|------------------|
| Model tiering | Use cheaper models for simple tasks | 40-70% |
| Prompt optimization | Reduce token count, improve efficiency | 15-30% |
| Semantic caching | Cache similar query responses | 30-50% |
| Batch processing | Aggregate requests where possible | 10-25% |
| Output limiting | Set max_tokens appropriately | 10-20% |

### 3. Storage Optimization

| Strategy | Implementation | Expected Savings |
|----------|----------------|------------------|
| Lifecycle policies | Auto-tier to cheaper storage | 30-50% |
| Compression | Enable compression algorithms | 20-40% |
| Deduplication | Eliminate redundant data | 15-35% |
| Archive inactive | Move cold data to archive | 70-90% |
| Delete orphaned | Remove unused resources | 5-15% |

### 4. Network Optimization

| Strategy | Implementation | Expected Savings |
|----------|----------------|------------------|
| CDN caching | Cache static content at edge | 30-60% |
| Regional affinity | Keep traffic within region | 20-40% |
| Compression | Enable transfer compression | 10-20% |
| Connection pooling | Reuse connections | 5-15% |
| VPC endpoints | Use private endpoints | 10-30% |

**Verify current best practices with web search:**
Search the web: "FinOps cost optimization strategies {date}"
Search the web: "multi-tenant resource optimization patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing optimization design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific optimization strategies
- **P (Party Mode)**: Bring cost and engineering perspectives for strategy review
- **C (Continue)**: Accept optimization strategies and proceed to FinOps design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save optimization strategies to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-finops.md`

---

## Verification

- [ ] Compute optimization defined
- [ ] LLM cost strategies documented
- [ ] Storage optimization planned
- [ ] Network optimization designed
- [ ] Patterns align with pattern registry

---

## Outputs

- Optimization strategies catalog
- Expected savings estimates
- Implementation priorities

---

## Next Step

Proceed to `step-03-c-design-finops.md` to design FinOps practices.
