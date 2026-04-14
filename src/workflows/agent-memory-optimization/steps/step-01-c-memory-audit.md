# Step 1: Memory Audit

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

Audit current memory usage patterns across all tiers to identify optimization opportunities, bottlenecks, and inefficiencies in agent memory systems.

---

## Prerequisites

- Agent runtime architecture document loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: memory-tier
- **Web research (if available):** Search for agent memory optimization patterns

---

## Inputs

- Agent runtime architecture document (if available)
- Current memory usage metrics (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Inventory Memory Tiers

Document current memory tier configuration:

| Tier | Storage | Current Size | Retention | Purpose |
|------|---------|--------------|-----------|---------|
| Session | Redis | [ ] MB/session | Session duration | Conversation context |
| User | Mem0 | [ ] MB/user | [ ] days | Cross-session memory |
| Tenant | Mem0 + Redis | [ ] GB/tenant | Tenant lifecycle | Shared knowledge |
| Global | Mem0 | [ ] GB | Permanent | Platform knowledge |
| Episodic | PostgreSQL | [ ] GB | Configurable | Event snapshots |

### 2. Analyze Usage Patterns

| Tier | Read Rate | Write Rate | Hit Rate | Growth Rate |
|------|-----------|------------|----------|-------------|
| Session | [ ] /sec | [ ] /sec | [ ] % | N/A |
| User | [ ] /sec | [ ] /sec | [ ] % | [ ] %/month |
| Tenant | [ ] /sec | [ ] /sec | [ ] % | [ ] %/month |
| Global | [ ] /sec | [ ] /sec | [ ] % | [ ] %/month |
| Episodic | [ ] /sec | [ ] /sec | [ ] % | [ ] %/month |

### 3. Identify Hot Spots

| Hot Spot | Tier | Impact | Root Cause |
|----------|------|--------|------------|
| [ ] Description | [ ] | [ ] High/Med/Low | [ ] Analysis |

### 4. Assess Bottlenecks

| Bottleneck | Tier | Symptom | Recommendation |
|------------|------|---------|----------------|
| [ ] Description | [ ] | [ ] Latency/Size/Cost | [ ] Fix |

### 5. Document Baseline Metrics

| Metric | Current Value | Target | Gap |
|--------|---------------|--------|-----|
| Total memory cost | [ ] USD/month | [ ] | [ ] % |
| Avg session size | [ ] KB | [ ] KB | [ ] |
| User memory p95 | [ ] MB | [ ] MB | [ ] |
| Tenant memory avg | [ ] GB | [ ] GB | [ ] |

**Verify current best practices with web search:**
Search the web: "agent memory optimization patterns {date}"
Search the web: "LLM agent context management best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the memory audit above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into usage patterns and bottleneck analysis
- **P (Party Mode)**: Bring SRE and ML engineer perspectives on memory audit
- **C (Continue)**: Accept audit findings and proceed to tier allocation
- **[Specific refinements]**: Describe audit concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: tier inventory, usage patterns, bottlenecks
- Process enhanced insights on optimization opportunities
- Ask user: "Accept these refined audit findings? (y/n)"
- If yes, integrate into audit specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review agent memory audit for optimization opportunities"
- Process SRE and ML engineer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save audit findings to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-tier-allocation.md`

---

## Verification

- [ ] All memory tiers inventoried
- [ ] Usage patterns analyzed
- [ ] Hot spots identified
- [ ] Bottlenecks documented
- [ ] Baseline metrics established
- [ ] Patterns align with pattern registry

---

## Outputs

- Memory audit report
- Usage pattern analysis
- Bottleneck identification
- Baseline metrics documentation

---

## Next Step

Proceed to `step-02-c-tier-allocation.md` to design tier allocation.
