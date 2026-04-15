# Step 3: Routing Configuration

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

Configure routing rules for tenant resolution based on domain and integrate with API gateway and CDN.

---

## Prerequisites

- Step 1: Domain Architecture completed
- Step 2: SSL/TLS Management completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: infrastructure`

---

## Inputs

- Domain architecture from step 1
- SSL/TLS configuration from step 2
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Tenant Resolution Logic

Define how tenant is resolved from incoming request:

| Resolution Method | Priority | Example |
|-------------------|----------|---------|
| Custom domain lookup | 1 | `app.customer.com` -> `tenant_abc` |
| Subdomain extraction | 2 | `acme.platform.com` -> `acme` |
| Path prefix | 3 | `/t/acme/*` -> `acme` |
| Header injection | 4 | `X-Tenant-ID: acme` |

### 2. API Gateway Integration

Configure API gateway for domain routing:

- Route53 / CloudFlare DNS integration
- ALB / API Gateway listener rules
- Custom domain mapping
- Health check endpoints per tenant

### 3. CDN Configuration

Design CDN integration for custom domains:

| CDN Feature | Configuration |
|-------------|---------------|
| Custom domain CNAME | Required for white-label |
| SSL termination | At edge |
| Cache key | Include tenant header |
| Origin selection | Based on tenant tier |

**Soft Gate:** Steps 1-3 complete the routing configuration. Present a summary of resolution logic and integrations. Ask for confirmation before proceeding to DNS integration.

**Verify current best practices with web search:**
Search the web: "multi-tenant domain routing API gateway {date}"
Search the web: "CloudFront custom domain multi-tenant {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the routing configuration above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into routing edge cases and failover
- **P (Party Mode)**: Bring infrastructure and security perspectives for review
- **C (Continue)**: Accept routing configuration and proceed to DNS integration
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass routing context: resolution logic, gateway config, CDN setup
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into routing configuration
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review routing configuration: {summary of resolution and integrations}"
- Process collaborative analysis
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save routing configuration to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-dns-integration.md`

---

## Verification

- [ ] Tenant resolution logic defined
- [ ] API gateway integration configured
- [ ] CDN configuration specified
- [ ] Failover scenarios documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant resolution matrix
- Gateway integration design
- CDN configuration

---

## Next Step

Proceed to `step-04-c-dns-integration.md` to define DNS integration patterns.
