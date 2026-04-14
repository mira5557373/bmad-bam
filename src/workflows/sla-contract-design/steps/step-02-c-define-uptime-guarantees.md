# Step 2: Define Uptime Guarantees

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

Establish availability targets and uptime guarantees for each tenant tier, defining what constitutes downtime and how availability is measured.

---

## Prerequisites

- Step 1 (Analyze SLA Requirements) completed
- Tenant tier SLA requirements matrix available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `high-availability`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `disaster-recovery`

---

## Inputs

- SLA requirements matrix from Step 1
- Infrastructure architecture documentation
- Historical uptime data (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Availability Tiers

Establish uptime percentages for each tier with corresponding allowed downtime:

| Tier | Availability Target | Monthly Downtime Allowed | Annual Downtime Allowed |
|------|--------------------|-----------------------------|----------------------------|
| Free | 99.0% | 7h 18m | 87h 36m (3.65 days) |
| Starter | 99.5% | 3h 39m | 43h 48m (1.83 days) |
| Pro | 99.9% | 43m 50s | 8h 46m |
| Enterprise | 99.95% | 21m 55s | 4h 23m |
| Premium Enterprise | 99.99% | 4m 23s | 52m 36s |

### 2. Define Downtime Exclusions

Specify events that do NOT count against availability:

| Exclusion Category | Description | Rationale |
|--------------------|-------------|-----------|
| Scheduled Maintenance | Pre-announced maintenance windows (min 72h notice) | Allows for necessary updates |
| Customer-Caused Outages | Issues caused by customer misuse or misconfiguration | Not platform responsibility |
| Third-Party Failures | External provider outages beyond reasonable control | Shared responsibility model |
| Force Majeure | Natural disasters, acts of war, government actions | Standard legal protection |
| Beta/Preview Features | Non-GA features explicitly marked as beta | Sets expectations for new features |
| External Dependencies | Customer-provided integrations or webhooks | Isolates platform responsibility |

### 3. Define Availability Measurement

Specify how availability is calculated:

| Metric | Definition | Measurement Method |
|--------|------------|-------------------|
| Uptime | Platform responds to requests within SLA latency | Synthetic monitoring probes |
| Measurement Period | Rolling 30-day calendar month | Aligned to billing cycle |
| Calculation Formula | ((Total Minutes - Downtime Minutes) / Total Minutes) x 100 | Automated monitoring |
| Probe Locations | Multiple geographic regions | At least 3 independent monitors |
| Probe Frequency | Every 60 seconds | Continuous monitoring |
| Failure Threshold | 3 consecutive failed probes | Reduces false positives |

### 4. Define Regional Availability

For multi-region deployments, specify regional guarantees:

| Region Scope | Tier | Availability |
|--------------|------|--------------|
| Single Region | Free/Starter | 99.5% |
| Multi-Region | Pro | 99.9% |
| Global (Active-Active) | Enterprise | 99.95% |

**Verify current best practices with web search:**
Search the web: "SaaS availability SLA measurement best practices {date}"
Search the web: "multi-region high availability patterns {date}"
Search the web: "cloud platform uptime calculation methods {date}"

_Source: [URL]_

### 5. Document Availability Dependencies

| Dependency | Impact on SLA | Mitigation |
|------------|---------------|------------|
| Cloud Provider | Foundation for all guarantees | Multi-AZ deployment |
| LLM Provider | AI response availability | Multiple provider fallback |
| Database | Data access availability | Replication and failover |
| CDN | Static asset delivery | Multi-CDN strategy |

---

## COLLABORATION MENUS (A/P/C):

After completing the uptime guarantees above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into measurement methodology and exclusion edge cases
- **P (Party Mode)**: Bring operations and legal perspectives for uptime review
- **C (Continue)**: Accept uptime guarantees and proceed to latency SLA design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: availability tiers, exclusions, measurement methodology
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into uptime guarantees
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review uptime guarantees: {summary of tiers, exclusions, measurement}"
- Process collaborative analysis from operations and legal personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save uptime guarantees to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-latency-slas.md`

---

## Verification

- [ ] Availability targets defined for all tiers
- [ ] Downtime exclusions clearly documented
- [ ] Measurement methodology specified
- [ ] Regional availability addressed
- [ ] Dependencies identified with mitigations
- [ ] Patterns align with pattern registry

---

## Outputs

- Tier-specific availability targets
- Downtime exclusion policy
- Availability measurement specification

---

## Next Step

Proceed to `step-03-c-design-latency-slas.md` to define AI response latency commitments.
