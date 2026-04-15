# Step 1: Define Gateway Requirements

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

Identify traffic patterns, catalog API endpoints, map authentication requirements, and define tenant routing needs for the API gateway.

## Prerequisites

- API specifications exist
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: api-gateway
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-routing

---

## Inputs

- API specifications and OpenAPI docs
- Traffic estimates and SLAs
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

**Verify current best practices with web search:**
Search the web: "API gateway architecture patterns {date}"
Search the web: "Kong vs AWS API Gateway vs Envoy comparison {date}"

_Source: [URL]_

### 1. Identify Traffic Patterns

| Pattern | Volume | Peak Times | Latency SLA |
|---------|--------|------------|-------------|
| Synchronous API | | | |
| Async/Webhook | | | |
| Streaming | | | |
| Batch | | | |

### 2. Catalog API Endpoints

| Endpoint Group | Count | Auth Required | Rate Limit Tier |
|----------------|-------|---------------|-----------------|
| Public APIs | | | |
| Partner APIs | | | |
| Internal APIs | | | |
| Admin APIs | | | |

### 3. Map Authentication Requirements

| Auth Type | Endpoints | Token Source | Validation Method |
|-----------|-----------|--------------|-------------------|
| API Key | | Header/Query | Gateway lookup |
| OAuth2 | | Bearer token | JWT validation |
| mTLS | | Client cert | Certificate chain |
| None | | N/A | Public endpoints |

### 4. Define Tenant Routing Needs

| Routing Type | Use Case | Configuration |
|--------------|----------|---------------|
| Header-based | Tenant ID in header | X-Tenant-ID |
| Path-based | Tenant in URL path | /tenants/{id}/* |
| Subdomain | Tenant subdomain | {tenant}.api.com |
| Token-based | Tenant in JWT claims | tenant_id claim |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the requirements analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into traffic patterns and auth requirements
- **P (Party Mode)**: Bring analyst and architect perspectives for gateway review
- **C (Continue)**: Accept requirements and proceed to rate limiting design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass requirements context: traffic, endpoints, auth, routing
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into requirements
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review API gateway requirements: {summary of patterns and needs}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save requirements to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-rate-limiting.md`

---

## Verification

- [ ] Traffic patterns identified
- [ ] API endpoints cataloged
- [ ] Authentication requirements mapped
- [ ] Tenant routing needs defined
- [ ] Patterns align with pattern registry

## Outputs

- Gateway requirements document
- Endpoint catalog
- Authentication mapping
- **Load template:** `{project-root}/_bmad/bam/data/templates/api-gateway-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/api-strategy-template.md`

## Next Step

Proceed to `step-02-c-design-rate-limiting.md` to design rate limiting policies.
