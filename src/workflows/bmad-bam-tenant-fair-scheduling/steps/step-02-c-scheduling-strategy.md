# Step 2: Scheduling Strategy

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

Define fair scheduling algorithms to ensure equitable resource distribution across tenants while respecting tier-based priorities.

---

## Prerequisites

- Resource analysis completed (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `scaling`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/scaling-patterns.md`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Select Scheduling Algorithms

Evaluate and select appropriate scheduling algorithms:

| Algorithm | Use Case | Pros | Cons |
|-----------|----------|------|------|
| Weighted Fair Queue (WFQ) | CPU/Network scheduling | Fair distribution, priority support | Complex implementation |
| Token Bucket | API rate limiting | Burst support, smooth enforcement | State management |
| Leaky Bucket | Steady rate control | Simple, predictable | No burst allowance |
| Deficit Round Robin (DRR) | Packet scheduling | O(1) complexity, fair | Fixed quantum issues |
| Hierarchical Token Bucket (HTB) | Traffic shaping | Flexible, hierarchical | Configuration complexity |
| Completely Fair Scheduler (CFS) | CPU scheduling | Kernel-level, proven | Linux-specific |

### 2. Design Weighted Fair Queue Strategy

Define weight distribution based on tenant tier:

| Tier | Weight | Share of Resources | Burst Allowance |
|------|--------|-------------------|-----------------|
| Enterprise | 100 | 40% guaranteed | 150% of allocation |
| Pro | 60 | 30% guaranteed | 120% of allocation |
| Starter | 30 | 20% guaranteed | 110% of allocation |
| Free | 10 | 10% shared | 100% (no burst) |

### 3. Design Token Bucket Parameters

Configure token bucket for each resource type:

| Resource | Bucket Size | Refill Rate | Burst Tokens | Tier Multiplier |
|----------|-------------|-------------|--------------|-----------------|
| API Requests | 1000 | 100/sec | 200 | 1x-4x by tier |
| CPU Credits | 3600 | 1/sec | 300 | 1x-4x by tier |
| I/O Operations | 5000 | 500/sec | 1000 | 1x-4x by tier |
| Network Bandwidth | 10GB | 100MB/sec | 1GB | 1x-4x by tier |

### 4. Define Priority Classes

Establish priority classes for workload types:

| Priority | Class | Preemption | Examples |
|----------|-------|------------|----------|
| Critical (P0) | System | Non-preemptible | Health checks, billing |
| High (P1) | Enterprise | Preempts P2-P4 | Enterprise tenant requests |
| Normal (P2) | Pro | Preempts P3-P4 | Pro tenant requests |
| Low (P3) | Starter | Preempts P4 | Starter tenant requests |
| Best Effort (P4) | Free | Always preemptible | Free tier, batch jobs |

### 5. Design Scheduling Fairness Rules

Define rules for maintaining fairness:

| Rule | Description | Enforcement |
|------|-------------|-------------|
| Max Share | No tenant exceeds tier allocation for > 60s | Throttle to tier limit |
| Min Guarantee | Each tenant gets minimum allocation | Reserve capacity |
| Burst Budget | Burst limited by accumulated credits | Track credit balance |
| Starvation Prevention | Low-priority gets minimum time slice | Aging mechanism |
| Work Conservation | Unused capacity redistributed | Dynamic reallocation |

**Verify current best practices with web search:**
Search the web: "weighted fair queuing multi-tenant cloud {date}"
Search the web: "token bucket rate limiting Kubernetes {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Step 2 completes the scheduling strategy design.**

Present summary of:
- Selected scheduling algorithms
- Weight distribution per tier
- Token bucket parameters
- Priority classes
- Fairness rules

Ask for confirmation before proceeding to quota enforcement.

---

## COLLABORATION MENUS (A/P/C):

After completing the scheduling strategy above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into algorithm selection and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for strategy review
- **C (Continue)**: Accept scheduling strategy and proceed to quota enforcement
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass strategy context: algorithms, weights, priorities
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into scheduling strategy
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review scheduling strategy: {summary of algorithms and fairness rules}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save scheduling strategy to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-quota-enforcement.md`

---

## Verification

- [ ] Scheduling algorithms selected with rationale
- [ ] Weight distribution defined per tier
- [ ] Token bucket parameters configured
- [ ] Priority classes established
- [ ] Fairness rules documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Scheduling algorithm selection matrix
- Weight distribution configuration
- Token bucket configuration
- Priority class definitions
- Fairness rules documentation

---

## Next Step

Proceed to `step-03-c-quota-enforcement.md` to design per-tenant quota enforcement.
