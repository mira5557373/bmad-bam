# Step 1: Analyze SSO Requirements

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

Analyze enterprise SSO requirements including protocol support, IdP landscape, authentication flows, and compliance requirements.

---

## Prerequisites

- Tenant model defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `sso-integration-patterns`

---

## Inputs

- User requirements and constraints for SSO integration
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Protocol Requirements Analysis

| Protocol | Use Case | Features | Considerations |
|----------|----------|----------|----------------|
| SAML 2.0 | Enterprise IdPs | Assertion-based, mature standard | XML-based, certificate management |
| OIDC | Modern apps, mobile | Token-based, REST-friendly | JWT validation, token refresh |
| Both | Maximum compatibility | Full enterprise support | Increased complexity |

### 2. Identity Provider Landscape

| IdP | Market Share | Protocol Support | Integration Complexity |
|-----|--------------|------------------|------------------------|
| Okta | Enterprise leader | SAML, OIDC, SCIM | Low - well-documented |
| Azure AD | Microsoft ecosystem | SAML, OIDC, SCIM | Low - enterprise standard |
| Google Workspace | SMB/Education | SAML, OIDC | Low - straightforward |
| PingIdentity | Large enterprise | SAML, OIDC, SCIM | Medium |
| OneLogin | Mid-market | SAML, OIDC, SCIM | Low |
| Custom SAML | Legacy systems | SAML | High - varies widely |

### 3. Authentication Flow Requirements

| Flow Type | Description | When to Use |
|-----------|-------------|-------------|
| SP-Initiated | User starts at Service Provider | Web app login, most common |
| IdP-Initiated | User starts at Identity Provider | Portal-based access |
| JIT Provisioning | Create user on first login | Reduce admin overhead |
| Pre-Provisioning | Sync users before login | Full directory control |

### 4. Compliance Requirements

| Requirement | Impact on SSO | Implementation Notes |
|-------------|---------------|---------------------|
| SOC 2 Type II | Audit logging, session control | Log all auth events |
| ISO 27001 | Access control documentation | Document SSO policies |
| GDPR | Data residency, consent | Region-aware IdP routing |
| HIPAA | PHI access controls | Enhanced session timeout |
| FedRAMP | Government standards | Specific IdP requirements |

**Verify current best practices with web search:**
Search the web: "enterprise SSO multi-tenant SaaS {date}"
Search the web: "SAML OIDC tenant integration {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the requirements analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into protocol selection and IdP requirements
- **P (Party Mode)**: Bring analyst and architect perspectives for SSO review
- **C (Continue)**: Accept requirements and proceed to IdP integration design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass requirements context: protocols, IdPs, compliance needs
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into requirements analysis
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review SSO requirements: {summary of protocols and IdPs}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save SSO requirements to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-idp-integration.md`

---

## Verification

- [ ] Protocol requirements documented (SAML/OIDC)
- [ ] Target IdPs identified
- [ ] Authentication flows defined
- [ ] Compliance requirements mapped
- [ ] Patterns align with pattern registry

---

## Outputs

- SSO requirements analysis
- Protocol selection matrix
- IdP compatibility assessment

---

## Next Step

Proceed to `step-02-c-design-idp-integration.md` to design IdP integration architecture.
