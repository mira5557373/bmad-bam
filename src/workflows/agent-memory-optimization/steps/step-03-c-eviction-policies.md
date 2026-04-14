# Step 3: Eviction Policies

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

Define memory eviction strategies for each tier to manage capacity while preserving important information and maintaining tenant isolation.

---

## Prerequisites

- Steps 1-2 completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: eviction
- **Web research (if available):** Search for memory eviction strategies

---

## Inputs

- Tier allocation from Step 2
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Select Eviction Algorithms

| Tier | Primary Algorithm | Fallback | Rationale |
|------|-------------------|----------|-----------|
| Session | TTL | LRU | Session-bound lifecycle |
| User | Importance-weighted LRU | TTL | Preserve high-value |
| Tenant | FIFO with importance | Archive | Shared knowledge |
| Global | Never evict | Manual | Platform knowledge |
| Episodic | Time-partitioned | Archive | Historical data |

### 2. Configure TTL Settings

| Tier | Base TTL | Extension Trigger | Max TTL |
|------|----------|-------------------|---------|
| Session | 30 min | User activity | 24 hours |
| User | 90 days | Access | 365 days |
| Tenant | 365 days | Admin action | Unlimited |
| Global | Unlimited | N/A | N/A |
| Episodic | 90 days | N/A | Archive |

### 3. Design Importance Scoring

| Factor | Weight | Calculation |
|--------|--------|-------------|
| Access frequency | 0.3 | Accesses / time |
| Recency | 0.3 | Decay function |
| User explicit | 0.2 | Bookmarked / pinned |
| Semantic relevance | 0.2 | Embedding similarity |

### 4. Configure Eviction Triggers

| Trigger | Threshold | Action | Notification |
|---------|-----------|--------|--------------|
| Memory pressure | 80% capacity | Start eviction | Alert ops |
| Quota exceeded | 100% tenant quota | Evict lowest score | Notify tenant |
| TTL expired | Time-based | Auto-remove | None |
| Manual | Admin action | Immediate | Audit log |

### 5. Define Archive Strategy

| Content Type | Archive Location | Retention | Restore Time |
|--------------|------------------|-----------|--------------|
| Session | S3 cold | 30 days | 5 min |
| User | S3 + index | 1 year | 1 min |
| Tenant | S3 + index | 5 years | 5 min |
| Episodic | S3 glacier | 7 years | 12 hours |

**Verify current best practices with web search:**
Search the web: "memory eviction policies LRU importance {date}"
Search the web: "cache eviction multi-tenant best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the eviction policies analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into importance scoring and archive strategy
- **P (Party Mode)**: Bring SRE and data architect perspectives on eviction
- **C (Continue)**: Accept eviction policies and proceed to tenant quotas
- **[Specific refinements]**: Describe eviction concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: algorithms, TTLs, importance scoring, archive strategy
- Process enhanced insights on eviction optimization
- Ask user: "Accept these refined eviction decisions? (y/n)"
- If yes, integrate into eviction specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review memory eviction policies for reliability and efficiency"
- Process SRE and data architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save eviction policies to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-tenant-quotas.md`

---

## Verification

- [ ] Eviction algorithms selected per tier
- [ ] TTL settings configured
- [ ] Importance scoring designed
- [ ] Eviction triggers defined
- [ ] Archive strategy documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Eviction policy specification
- TTL configuration
- Importance scoring algorithm
- Archive strategy documentation

---

## Next Step

Proceed to `step-04-c-tenant-quotas.md` to design quota system.
