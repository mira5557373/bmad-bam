# Step 1: Analyze SLA Requirements

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead
- Use web search to verify current best practices when making technology decisions

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Gather and analyze SLA requirements for each tenant tier in the multi-tenant AI platform, establishing the foundation for uptime, latency, and service commitments.

---

## Prerequisites

- Master architecture document completed
- Tenant tier definitions established (Free, Pro, Enterprise, etc.)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `sla-contract`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---

## Inputs

- User requirements and constraints for SLA design
- Tenant tier definitions from master architecture
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Industry benchmarks for AI platform SLAs

---

## Actions

### 1. Identify Tenant Tiers and Service Levels

Enumerate all tenant tiers and their expected service level characteristics:

| Tier | Target Users | Expected Workload | Priority Level |
|------|--------------|-------------------|----------------|
| Free | Individual developers, POC | Low volume, burst | Lowest |
| Starter | Small teams, startups | Moderate, predictable | Medium |
| Pro | Growing businesses | High volume, consistent | High |
| Enterprise | Large organizations | Very high, mission-critical | Highest |

### 2. Gather SLA Requirements per Tier

For each tier, document requirements across key dimensions:

| Dimension | Description | Tier Variance |
|-----------|-------------|---------------|
| Availability | Uptime percentage target | Higher tiers = higher uptime |
| AI Response Latency | Time-to-first-token, completion time | Higher tiers = faster |
| Throughput | Requests per second/minute | Higher tiers = more capacity |
| Support Response | Time to initial support response | Higher tiers = faster |
| Data Isolation | Level of tenant data separation | Higher tiers = stronger isolation |
| Recovery Time | Time to recover from failures | Higher tiers = faster recovery |

### 3. Identify Stakeholder Requirements

Document stakeholder-specific SLA needs:

| Stakeholder | Key Requirements | Priority |
|-------------|------------------|----------|
| Engineering | Measurable, monitorable metrics | Critical |
| Sales | Competitive positioning, clear differentiation | High |
| Legal | Enforceable terms, clear liability limits | Critical |
| Finance | Predictable penalty costs, credit calculations | High |
| Customer Success | Clear communication, escalation paths | Medium |

### 4. Benchmark Against Industry Standards

**Verify current best practices with web search:**
Search the web: "AI platform SLA benchmarks {date}"
Search the web: "multi-tenant SaaS SLA best practices {date}"
Search the web: "LLM API SLA industry standards {date}"

_Source: [URL]_

Document competitive positioning:

| Competitor/Standard | Availability | Latency | Support |
|---------------------|--------------|---------|---------|
| Industry Standard | 99.9% | <500ms | 24h |
| Premium AI Providers | 99.95% | <200ms | 4h |
| Enterprise Standard | 99.99% | <100ms | 1h |

---

## COLLABORATION MENUS (A/P/C):

After completing the SLA requirements analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tier-specific requirements and stakeholder priorities
- **P (Party Mode)**: Bring analyst and architect perspectives for requirements review
- **C (Continue)**: Accept requirements analysis and proceed to uptime guarantee definition
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: tier definitions, stakeholder requirements, industry benchmarks
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into requirements document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review SLA requirements: {summary of tiers, dimensions, stakeholders}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save SLA requirements to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-define-uptime-guarantees.md`

---

## Verification

- [ ] All tenant tiers identified with service level characteristics
- [ ] Requirements documented for all SLA dimensions
- [ ] Stakeholder requirements captured and prioritized
- [ ] Industry benchmarks researched and documented
- [ ] Competitive positioning established
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant tier SLA requirements matrix
- Stakeholder requirements summary
- Industry benchmark comparison
- **Load template:** `{project-root}/_bmad/bam/templates/sla-template.md`

---

## Next Step

Proceed to `step-02-c-define-uptime-guarantees.md` to establish availability targets per tier.
