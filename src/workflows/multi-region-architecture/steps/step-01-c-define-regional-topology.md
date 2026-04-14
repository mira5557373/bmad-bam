# Step 1: Define Regional Topology

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

Define the regional deployment topology including primary region selection, secondary regions, and edge locations.

---

## Prerequisites

- Master architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---


## Inputs

- User requirements and constraints for multi region architecture
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Define the regional deployment topology:

---

## Region Selection Criteria

| Criteria | Weight | Considerations |
|----------|--------|----------------|
| Customer Proximity | High | Latency requirements, user distribution |
| Data Residency | Critical | Legal requirements per jurisdiction |
| Infrastructure Cost | Medium | Compute, storage, egress pricing |
| Service Availability | High | Cloud provider feature parity |
| Disaster Recovery | High | Geographic separation, risk zones |

---

## Primary Regions

Define primary deployment regions:

| Region | Cloud Region | Purpose | Tenant Types |
|--------|-------------|---------|--------------|
| North America | us-east-1, us-west-2 | US customers, global control plane | All tiers |
| Europe | eu-west-1, eu-central-1 | EU customers, GDPR data residency | All tiers |
| Asia Pacific | ap-southeast-1, ap-northeast-1 | APAC customers | PRO, ENTERPRISE |

---

## Edge Locations

Define edge/CDN locations for static assets and API acceleration:

| Edge Type | Locations | Purpose |
|-----------|-----------|---------|
| CDN | Global | Static assets, UI bundles |
| API Acceleration | Regional | API latency reduction |
| DNS | Global | GeoDNS routing |

---

## Region Pairing for DR

Define region pairs for disaster recovery:

| Primary | Secondary | Failover Mode |
|---------|-----------|---------------|
| us-east-1 | us-west-2 | Active-Passive |
| eu-west-1 | eu-central-1 | Active-Passive |
| ap-southeast-1 | ap-northeast-1 | Active-Passive |

**Verify current best practices with web search:**
Search the web: "define regional topology best practices {date}"
Search the web: "define regional topology enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the regional topology above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into region selection trade-offs
- **P (Party Mode)**: Bring analyst and architect perspectives for topology review
- **C (Continue)**: Accept topology and proceed to data residency mapping
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass topology context: regions, criteria, pairing
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into regional topology
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review regional topology: {summary of regions and pairing}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save regional topology to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-map-data-residency.md`

---

## Verification

- [ ] Primary regions defined with justification
- [ ] Edge locations specified
- [ ] Region pairing established
- [ ] Selection criteria documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Regional topology definition
- Region selection criteria matrix

---

## Next Step

Proceed to `step-02-c-map-data-residency.md` to map data residency requirements.
