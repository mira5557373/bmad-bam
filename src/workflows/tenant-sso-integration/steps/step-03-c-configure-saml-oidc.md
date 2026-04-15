# Step 3: Configure SAML/OIDC

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

Design protocol-specific configurations for SAML 2.0 and OIDC including assertion handling, token validation, attribute mapping, and error flows.

---

## Prerequisites

- IdP integration designed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `sso-integration-patterns`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. SAML 2.0 Configuration

| Component | Configuration |
|-----------|---------------|
| Assertion Consumer Service | POST binding, signed assertions |
| Name ID Format | Email address (preferred) or persistent |
| Signature Algorithm | RSA-SHA256 minimum |
| Assertion Encryption | AES-256 when required |
| Clock Skew Tolerance | 5 minutes |

### 2. SAML Assertion Handling

| Validation Step | Action | On Failure |
|-----------------|--------|------------|
| Signature Verification | Verify against IdP certificate | Reject assertion |
| Issuer Validation | Match expected IdP entity ID | Reject assertion |
| Audience Check | Verify SP entity ID | Reject assertion |
| Time Validation | Check NotBefore/NotOnOrAfter | Reject assertion |
| Replay Prevention | Check InResponseTo, assertion ID | Reject assertion |
| Destination Check | Verify ACS URL matches | Reject assertion |

### 3. OIDC Configuration

| Component | Configuration |
|-----------|---------------|
| Response Type | `code` (Authorization Code flow) |
| Grant Type | `authorization_code` |
| Scopes | `openid`, `profile`, `email` |
| Token Endpoint Auth | `client_secret_post` or `private_key_jwt` |
| PKCE | Required for public clients |

### 4. OIDC Token Validation

| Validation Step | Action | On Failure |
|-----------------|--------|------------|
| Signature Verification | Verify JWT with IdP JWKS | Reject token |
| Issuer Validation | Match `iss` claim | Reject token |
| Audience Check | Verify `aud` claim | Reject token |
| Expiration Check | Validate `exp` claim | Reject token |
| Nonce Validation | Match state nonce | Reject token |
| at_hash Validation | Verify access token hash | Reject token |

### 5. Attribute Mapping

| IdP Attribute | Application Field | Required | Default |
|---------------|------------------|----------|---------|
| email | user.email | Yes | - |
| given_name | user.firstName | No | - |
| family_name | user.lastName | No | - |
| groups | user.roles | No | `member` |
| department | user.department | No | - |
| tenant_id | context.tenantId | No | From domain |

### 6. Error Handling Flows

| Error Type | User Experience | System Action |
|------------|-----------------|---------------|
| IdP Unreachable | "IdP temporarily unavailable" | Retry with backoff, alert ops |
| Invalid Assertion | "Authentication failed" | Log details, do not expose |
| User Not Authorized | "Access denied for this tenant" | Log, suggest contact admin |
| Session Expired | Redirect to login | Clear session, restart flow |
| Certificate Error | "Configuration error" | Alert ops, log details |

**Verify current best practices with web search:**
Search the web: "SAML 2.0 security best practices {date}"
Search the web: "OIDC token validation multi-tenant {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-3 complete the SSO protocol design.**

Present summary of:
- Protocol requirements and selection
- IdP integration architecture
- SAML/OIDC configuration details

Ask for confirmation before proceeding to user provisioning design.

---

## COLLABORATION MENUS (A/P/C):

After completing the SAML/OIDC configuration above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into protocol security and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for protocol review
- **C (Continue)**: Accept protocol configuration and proceed to provisioning
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass protocol context: SAML/OIDC configs, validation, attribute mapping
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into protocol configuration
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review SAML/OIDC configuration: {summary of protocols and validation}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save protocol configuration to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-design-provisioning.md`

---

## Verification

- [ ] SAML 2.0 configuration defined
- [ ] SAML assertion handling documented
- [ ] OIDC configuration defined
- [ ] Token validation procedures documented
- [ ] Attribute mapping defined
- [ ] Error handling flows specified
- [ ] Patterns align with pattern registry

---

## Outputs

- SAML 2.0 configuration specification
- OIDC configuration specification
- Attribute mapping schema

---

## Next Step

Proceed to `step-04-c-design-provisioning.md` to design user provisioning.
