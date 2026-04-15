# Step 1: Resource Analysis

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

Analyze compute, memory, and I/O resource patterns to understand tenant resource consumption and identify noisy neighbor risks.

---

## Prerequisites

- Tenant model defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `scaling`
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/scaling-patterns.md`

---

## Inputs

- User requirements and constraints for fair scheduling design
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Identify Resource Types

Catalog all shared resources that require fair scheduling:

| Resource Type | Description | Contention Risk | Measurement Unit |
|---------------|-------------|-----------------|------------------|
| CPU | Compute cycles | High | vCPU cores, millicores |
| Memory | RAM allocation | High | MB, GB |
| Disk I/O | Read/write bandwidth | Medium | IOPS, MB/s |
| Network I/O | Bandwidth, connections | Medium | Mbps, connections |
| GPU | AI/ML workloads | High | GPU %, VRAM |
| Database connections | Connection pool | Medium | Connections |
| API rate | Request throughput | Medium | Requests/sec |

### 2. Analyze Resource Consumption Patterns

For each resource type, define consumption patterns per tenant tier:

| Tier | CPU Pattern | Memory Pattern | I/O Pattern | Peak Multiplier |
|------|-------------|----------------|-------------|-----------------|
| Free | Burst, low sustained | Small footprint | Low | 2x |
| Starter | Moderate, variable | Medium | Moderate | 3x |
| Pro | Sustained, predictable | Large | High | 2x |
| Enterprise | High, stable | Very large | Very high | 1.5x |

### 3. Identify Noisy Neighbor Scenarios

Document scenarios where one tenant can impact others:

| Scenario | Resource | Impact | Detection Method |
|----------|----------|--------|------------------|
| CPU Spike | CPU | Latency for other tenants | CPU utilization > threshold |
| Memory Pressure | Memory | OOM risk, swapping | Memory usage > 80% |
| Disk Thrashing | Disk I/O | Slow queries, timeouts | IOPS > limit |
| Network Saturation | Network | Packet loss, latency | Bandwidth > 90% |
| Connection Exhaustion | DB Pool | Connection timeouts | Pool utilization > 90% |

### 4. Define Baseline Metrics

Establish baseline metrics for normal operation:

| Metric | Baseline | Warning | Critical | Action |
|--------|----------|---------|----------|--------|
| CPU per tenant | < 25% | 50% | 80% | Throttle |
| Memory per tenant | < 50% | 70% | 90% | Evict cache |
| IOPS per tenant | < 1000 | 2000 | 5000 | Queue |
| Connections per tenant | < 10 | 20 | 50 | Reject |

**Verify current best practices with web search:**
Search the web: "noisy neighbor detection multi-tenant SaaS {date}"
Search the web: "resource consumption analysis Kubernetes multi-tenant {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Step 1 completes the resource analysis phase.**

Present summary of:
- Resource types identified
- Consumption patterns per tier
- Noisy neighbor scenarios
- Baseline metrics

Ask for confirmation before proceeding to scheduling strategy.

---

## COLLABORATION MENUS (A/P/C):

After completing the resource analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into resource patterns and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for resource review
- **C (Continue)**: Accept resource analysis and proceed to scheduling strategy
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass resource context: types, patterns, scenarios
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into resource analysis
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review resource analysis: {summary of types and patterns}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save resource analysis to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-scheduling-strategy.md`

---

## Verification

- [ ] All resource types identified
- [ ] Consumption patterns documented per tier
- [ ] Noisy neighbor scenarios cataloged
- [ ] Baseline metrics defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Resource type catalog
- Consumption pattern matrix
- Noisy neighbor scenario documentation
- Baseline metrics table

---

## Next Step

Proceed to `step-02-c-scheduling-strategy.md` to define fair scheduling algorithms.
