# Step 1: Domain Architecture

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
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design the domain hierarchy and routing structure for tenant-specific branding and custom domains.

---

## Prerequisites

- Tenant model defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: infrastructure`

---

## Inputs

- User requirements for custom domain support
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Domain Hierarchy

Design the domain structure for the platform:

| Domain Type | Pattern | Example |
|-------------|---------|---------|
| Platform Primary | `app.{platform}.com` | `app.aiplatform.com` |
| Tenant Subdomain | `{tenant}.{platform}.com` | `acme.aiplatform.com` |
| Custom Domain | `{custom-domain}` | `app.customer.com` |
| API Endpoint | `api.{platform}.com` | `api.aiplatform.com` |

### 2. Define Routing Strategy

Configure how requests are routed to tenants:

- Host header inspection for tenant resolution
- Path-based routing fallback (for legacy compatibility)
- Default tenant handling for unknown domains
- Redirect rules for domain canonicalization

### 3. Wildcard Certificate Planning

Plan wildcard certificate strategy:

| Certificate Scope | Coverage | Renewal Strategy |
|-------------------|----------|------------------|
| Platform wildcard | `*.platform.com` | Auto-renew (ACM) |
| Per-tenant custom | `customer.com` | Auto-provision (Let's Encrypt) |

**Verify current best practices with web search:**
Search the web: "multi-tenant custom domain routing patterns {date}"
Search the web: "wildcard SSL certificate multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the domain architecture above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into domain resolution edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for domain review
- **C (Continue)**: Accept domain architecture and proceed to SSL/TLS management
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass domain context: hierarchy, routing strategy, certificate planning
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into domain architecture
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review domain architecture: {summary of hierarchy and routing}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save domain architecture to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-ssl-tls-management.md`

---

## Verification

- [ ] Domain hierarchy documented
- [ ] Routing strategy defined
- [ ] Certificate scope planned
- [ ] Patterns align with pattern registry

---

## Outputs

- Domain hierarchy design
- Routing strategy matrix

---

## Next Step

Proceed to `step-02-c-ssl-tls-management.md` to define SSL/TLS certificate management.
