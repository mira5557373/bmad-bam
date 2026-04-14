# Step 4: Design Regional Routing

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

Design the tenant-to-region routing strategy including DNS, API gateway, and CDN configuration.

---

## Prerequisites

- Cross-region sync strategy defined (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design regional routing for tenant requests:

---

## Tenant Region Assignment

| Assignment Method | When Used | Criteria |
|-------------------|-----------|----------|
| User Selection | Onboarding | ENTERPRISE tier, compliance requirement |
| Auto-Detection | Onboarding | FREE/PRO tiers, based on signup location |
| Admin Override | Post-onboarding | Migration, compliance change |

Stored in tenant record: `home_region: string`

---

## DNS Routing (GeoDNS)

| Hostname Pattern | Routing Logic | Example |
|------------------|---------------|---------|
| api.platform.com | GeoDNS to nearest edge | Global entry |
| {tenant}.api.platform.com | Direct to tenant's region | Tenant-specific |
| {region}.api.platform.com | Direct regional endpoint | eu.api.platform.com |

DNS Provider Configuration (Route53/CloudFlare):
- Latency-based routing for global endpoints
- Static routing for tenant-specific endpoints
- Health checks with automatic failover

---

## API Gateway Configuration

Each region has its own API Gateway deployment:

| Region | Gateway Endpoint | Traffic Source |
|--------|------------------|----------------|
| us-east-1 | api-us.platform.com | US tenants, global fallback |
| eu-west-1 | api-eu.platform.com | EU tenants |
| ap-southeast-1 | api-apac.platform.com | APAC tenants |

Gateway Routing Logic:
1. Extract tenant_id from request (header, JWT, path)
2. Lookup tenant's home_region
3. If current region != home_region, proxy to home region
4. Apply rate limits and authentication

---

## CDN Configuration

| Asset Type | CDN Behavior | Cache TTL |
|------------|--------------|-----------|
| Static UI | Edge cache, global | 1 hour |
| API Responses | No cache | N/A |
| Public Assets | Edge cache, global | 24 hours |
| Tenant Assets | Regional only | 1 hour |

---

## Cross-Region Request Handling

When user in Region A accesses tenant in Region B:

1. Request hits Region A gateway
2. Gateway identifies tenant's home region (B)
3. Gateway proxies request to Region B
4. Response returns via Region A
5. Latency overhead logged for monitoring

**Verify current best practices with web search:**
Search the web: "design regional routing best practices {date}"
Search the web: "design regional routing enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the regional routing design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into routing edge cases and optimization
- **P (Party Mode)**: Bring analyst and architect perspectives for routing review
- **C (Continue)**: Accept routing design and proceed to failover design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass routing context: DNS, gateway, CDN configurations
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into routing design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review regional routing: {summary of DNS and gateway config}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save routing design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-design-failover.md`

---

## Soft Gate Checkpoint

**Steps 1-4 complete the regional architecture design phase.**

Present summary of:
- Regional topology and data residency
- Cross-region sync strategy
- Regional routing configuration

Ask for confirmation before proceeding to failover design.

---

## Verification

- [ ] Tenant region assignment defined
- [ ] DNS routing configured
- [ ] API gateway routing specified
- [ ] CDN configuration complete
- [ ] Cross-region handling documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Regional routing configuration
- DNS and gateway specifications

---

## Next Step

Proceed to `step-05-c-design-failover.md` to design cross-region failover.
