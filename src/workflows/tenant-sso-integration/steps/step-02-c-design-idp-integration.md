# Step 2: Design IdP Integration

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

Design the identity provider integration architecture including connection management, metadata exchange, certificate handling, and multi-IdP support.

---

## Prerequisites

- SSO requirements defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. IdP Connection Architecture

| Component | Description | Tenant Scope |
|-----------|-------------|--------------|
| Connection Registry | Store IdP configurations | Per-tenant |
| Metadata Store | SAML metadata, OIDC discovery | Per-IdP per-tenant |
| Certificate Vault | X.509 certificates, signing keys | Per-IdP per-tenant |
| Routing Layer | Direct auth to correct IdP | Tenant-aware |

### 2. Tenant-IdP Mapping

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Single IdP per tenant | One IdP configuration per tenant | Standard enterprise |
| Multiple IdPs per tenant | Several IdPs for one tenant | Large enterprise, M&A |
| Shared IdP | Multiple tenants share one IdP | MSP model |
| Domain-based routing | Route by email domain | Multi-domain tenants |

### 3. Metadata Exchange Design

| SAML Metadata | Configuration |
|---------------|---------------|
| SP Entity ID | `https://{tenant}.{domain}/saml/metadata` |
| ACS URL | `https://{tenant}.{domain}/saml/acs` |
| SLO URL | `https://{tenant}.{domain}/saml/slo` |
| SP Certificate | Tenant-specific signing cert |

| OIDC Configuration | Configuration |
|-------------------|---------------|
| Redirect URI | `https://{tenant}.{domain}/oauth/callback` |
| Post-Logout URI | `https://{tenant}.{domain}/logout/callback` |
| Client ID | Per-IdP per-tenant |
| Client Secret | Encrypted, per-IdP per-tenant |

### 4. Certificate Management

| Aspect | Configuration |
|--------|---------------|
| Certificate Storage | Encrypted vault (HashiCorp Vault, AWS Secrets Manager) |
| Rotation Schedule | Annual rotation with 30-day overlap |
| Expiration Alerts | 90, 60, 30, 14, 7 days before expiry |
| Signing Algorithm | RS256 minimum, RS512 preferred |
| Key Size | RSA 2048 minimum, 4096 preferred |

### 5. Multi-IdP Support

| Feature | Implementation |
|---------|----------------|
| IdP Discovery | Domain-hint based or tenant selection screen |
| Fallback Chain | Primary IdP -> Secondary IdP -> Local auth |
| IdP Health Check | Periodic metadata refresh, availability probe |
| Graceful Degradation | Queue auth if IdP unreachable |

**Verify current best practices with web search:**
Search the web: "SAML IdP integration multi-tenant architecture {date}"
Search the web: "OIDC identity provider management SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the IdP integration design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into IdP architecture and security
- **P (Party Mode)**: Bring analyst and architect perspectives for integration review
- **C (Continue)**: Accept IdP integration and proceed to SAML/OIDC configuration
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass IdP context: connection architecture, metadata, certificates
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into IdP design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review IdP integration: {summary of architecture and security}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save IdP integration design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-configure-saml-oidc.md`

---

## Verification

- [ ] IdP connection architecture defined
- [ ] Tenant-IdP mapping strategy selected
- [ ] Metadata exchange design complete
- [ ] Certificate management procedures defined
- [ ] Multi-IdP support designed
- [ ] Patterns align with pattern registry

---

## Outputs

- IdP integration architecture
- Connection management design
- Certificate lifecycle procedures

---

## Next Step

Proceed to `step-03-c-configure-saml-oidc.md` to configure SAML/OIDC protocols.
