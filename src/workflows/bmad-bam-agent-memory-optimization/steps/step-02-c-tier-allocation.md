# Step 2: Tier Allocation

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

Design optimized memory tier allocation based on audit findings, balancing performance, cost, and tenant isolation requirements.

---

## Prerequisites

- Step 1 completed with audit findings
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: memory-allocation
- **Web research (if available):** Search for memory tier allocation patterns

---

## Inputs

- Audit findings from Step 1
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Tier Responsibilities

| Tier | Primary Use | Secondary Use | Never Store |
|------|-------------|---------------|-------------|
| Session | Current conversation | Tool state | Long-term facts |
| User | Preferences, history | Learned patterns | Tenant data |
| Tenant | Shared knowledge | Policies | User PII |
| Global | Platform knowledge | Defaults | Tenant data |
| Episodic | Event snapshots | Debugging | Secrets |

### 2. Design Storage Allocation

| Tier | Storage Technology | Capacity Plan | Scaling Strategy |
|------|-------------------|---------------|------------------|
| Session | Redis Cluster | [ ] GB per node | Horizontal |
| User | Mem0 | [ ] GB total | Tier-based |
| Tenant | Mem0 + Redis | [ ] GB per tenant | Vertical then horizontal |
| Global | Mem0 | [ ] GB | Rare scaling |
| Episodic | PostgreSQL | [ ] TB | Partitioning |

### 3. Configure Memory Boundaries

| Boundary | From Tier | To Tier | Allowed? | Mechanism |
|----------|-----------|---------|----------|-----------|
| Session -> User | Session | User | Yes | Promotion on save |
| User -> Tenant | User | Tenant | Admin only | Explicit share |
| Tenant -> Global | Tenant | Global | Never | Blocked |
| Global -> All | Global | All | Read only | Broadcast |

### 4. Design Promotion/Demotion

| Transition | Trigger | Process |
|------------|---------|---------|
| Session -> User | User action "remember" | Copy + tag |
| User -> Episodic | User inactive > X days | Archive |
| Episodic -> User | User returns | Restore |
| Tenant hot -> cold | Access count < threshold | Offload |

### 5. Document Isolation Guarantees

| Guarantee | Implementation | Verification |
|-----------|----------------|--------------|
| Tenant isolation | Namespace prefixes | Automated tests |
| User isolation | User ID scoping | Access controls |
| Session isolation | Session ID keys | TTL enforcement |

**Verify current best practices with web search:**
Search the web: "memory tier allocation patterns AI agents {date}"
Search the web: "Redis memory optimization multi-tenant {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tier allocation analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into storage allocation and boundaries
- **P (Party Mode)**: Bring platform architect and data engineer perspectives
- **C (Continue)**: Accept tier allocation and proceed to eviction policies
- **[Specific refinements]**: Describe allocation concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: tier responsibilities, storage allocation, boundaries
- Process enhanced insights on allocation strategy
- Ask user: "Accept these refined allocation decisions? (y/n)"
- If yes, integrate into allocation specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review memory tier allocation for performance and isolation"
- Process platform architect and data engineer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tier allocation to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-eviction-policies.md`

---

## Verification

- [ ] Tier responsibilities defined
- [ ] Storage allocation planned
- [ ] Memory boundaries configured
- [ ] Promotion/demotion designed
- [ ] Isolation guarantees documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Tier allocation specification
- Storage capacity plan
- Memory boundary design
- Isolation guarantee documentation

---

## Next Step

Proceed to `step-03-c-eviction-policies.md` to define eviction policies.
