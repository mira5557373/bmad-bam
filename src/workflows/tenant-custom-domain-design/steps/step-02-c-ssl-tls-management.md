# Step 2: SSL/TLS Management

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

Define certificate provisioning, renewal, and management strategies for all domain types.

---

## Prerequisites

- Step 1: Domain Architecture completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: security`

---

## Inputs

- Domain architecture from step 1
- Certificate authority preferences
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Certificate Strategy by Domain Type

Define certificate handling per domain type:

| Domain Type | Certificate Strategy | Provider | Renewal |
|-------------|---------------------|----------|---------|
| Platform Primary | Managed wildcard | AWS ACM | Auto (60 days) |
| Tenant Subdomain | Wildcard (shared) | AWS ACM | Auto (60 days) |
| Custom Domain | Auto-provisioned | Let's Encrypt | Auto (30 days) |
| API Endpoint | Managed | AWS ACM | Auto (60 days) |

### 2. Certificate Provisioning Flow

Design the provisioning workflow for custom domains:

1. Tenant adds custom domain in portal
2. System generates DNS verification challenge
3. Tenant configures CNAME record
4. System validates DNS propagation
5. Certificate request submitted to CA
6. Certificate issued and deployed
7. Domain activated for tenant

### 3. Certificate Storage and Security

Define secure certificate management:

- Private key storage (AWS Secrets Manager / HashiCorp Vault)
- Certificate rotation procedures
- Emergency revocation process
- Audit logging for certificate operations

**Verify current best practices with web search:**
Search the web: "SSL certificate automation multi-tenant {date}"
Search the web: "Let's Encrypt cert-manager Kubernetes {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the SSL/TLS management design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into certificate edge cases and failure modes
- **P (Party Mode)**: Bring security and operations perspectives for review
- **C (Continue)**: Accept SSL/TLS design and proceed to routing configuration
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass certificate context: strategies, provisioning flow, security
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into SSL/TLS design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review SSL/TLS management: {summary of certificate strategies}"
- Process collaborative analysis
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save SSL/TLS design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-routing-configuration.md`

---

## Verification

- [ ] Certificate strategy defined per domain type
- [ ] Provisioning flow documented
- [ ] Security measures specified
- [ ] Renewal automation configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Certificate strategy matrix
- Provisioning workflow diagram
- Security requirements

---

## Next Step

Proceed to `step-03-c-routing-configuration.md` to configure routing rules.
