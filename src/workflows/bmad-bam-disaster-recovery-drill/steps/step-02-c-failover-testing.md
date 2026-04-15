# Step 2: Failover Testing

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions


---

## Purpose

Test failover to the disaster recovery environment. This includes verifying all systems come online in DR region, traffic routing works correctly, and services are accessible.

---

## Prerequisites

- Step 1 completed (DR plan execution started)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `high-availability`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `failover`

---

## Inputs

- DR plan execution log from previous step
- DR environment endpoints
- Health check definitions
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Infrastructure Failover

Verify infrastructure components are active in DR:

| Component | Primary Status | DR Status | Failover Time |
|-----------|----------------|-----------|---------------|
| Load Balancer | Down (simulated) | Active | |
| API Servers | Down (simulated) | Active | |
| Database | Down (simulated) | Active | |
| Cache | Down (simulated) | Active | |
| Message Queue | Down (simulated) | Active | |

### 2. Traffic Routing Verification

Verify traffic is routed to DR:
- [ ] DNS failover completed
- [ ] Load balancer routing to DR
- [ ] SSL certificates valid in DR
- [ ] CDN edge locations updated

### 3. Service Health Checks

Execute health checks on DR services:

| Service | Endpoint | Expected | Actual | Status |
|---------|----------|----------|--------|--------|
| API Gateway | /health | 200 | | [ ] |
| Auth Service | /health | 200 | | [ ] |
| Tenant Service | /health | 200 | | [ ] |
| AI Runtime | /health | 200 | | [ ] |

### 4. Tenant Accessibility

Verify tenants can access platform:
- [ ] Tenant portal accessible
- [ ] API authentication working
- [ ] Tenant data accessible
- [ ] AI features functional

**Verify current best practices with web search:**
Search the web: "failover testing methodology cloud {date}"
Search the web: "multi-tenant failover verification {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing failover testing, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into failover issues
- **P (Party Mode)**: Bring SRE and network perspectives for review
- **C (Continue)**: Accept failover results and proceed to recovery validation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

#### If 'C' (Continue):
- Save failover results to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-recovery-validation.md`

---

## Verification

- [ ] Infrastructure failover completed
- [ ] Traffic routing verified
- [ ] Service health checks passing
- [ ] Tenant accessibility confirmed
- [ ] Patterns align with pattern registry

---

## Outputs

- Failover test results
- Service health status
- Tenant accessibility report

---

## Next Step

Proceed to `step-03-c-recovery-validation.md` to validate recovery and data integrity.
