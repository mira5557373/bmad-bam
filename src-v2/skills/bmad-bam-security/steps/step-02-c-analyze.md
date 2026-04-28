# Step 2: Design Authentication Architecture

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol

## EXECUTION PROTOCOLS

- 🎯 Focus: Design JWT configuration, MFA, session management, and SSO integration
- 💾 Track: `stepsCompleted: [1, 2]` when complete
- 📖 Context: Security domains from Step 1
- 🚫 Do NOT: Design authorization (Step 3) or skip tenant-aware token claims
- 🔍 Use web search: Verify authentication patterns against OWASP ASVS
- ⚠️ Gate: QG-S1 (Authentication Security)

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Gathering required inputs for this step
- Making design decisions within step scope
- Documenting decisions with rationale

**OUT OF SCOPE:**
- Decisions from other steps
- Implementation details
- Validation (separate mode)
## Purpose

Design a comprehensive authentication architecture for multi-tenant SaaS, including JWT configuration with tenant claims, MFA enforcement by tier, session management, and enterprise SSO integration.

---

## Prerequisites

- Step 1 complete with security domains identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: security-authn
- **Load guide:** `{project-root}/_bmad/bam/data/domains/security.md`

---

## Actions

### 1. Design JWT Configuration with Tenant Claims

| Token Attribute | Description | Security Consideration |
|-----------------|-------------|------------------------|
| `sub` | User identifier | Unique across tenants |
| `tenant_id` | Tenant context | **CRITICAL:** Must be present in all tokens |
| `roles` | User roles within tenant | Scoped to tenant boundary |
| `tier` | Tenant subscription tier | Determines feature access |
| `iat` / `exp` | Issued/expiry timestamps | Short-lived tokens (15 min) |
| `jti` | JWT ID for revocation | Enable token blacklisting |

**Token Lifecycle Policies:**

| Token Type | Expiration | Refresh Strategy | Revocation |
|------------|------------|------------------|------------|
| Access Token | 15 minutes | Silent refresh | Blacklist on logout |
| Refresh Token | 7 days | Rotation on use | Revoke on password change |
| API Key | 90 days | Manual rotation | Admin revocation |
| Service Token | 1 hour | Automatic renewal | Credential rotation |

### 2. Design MFA Enforcement by Tier

| Tier | MFA Requirement | Supported Methods | Enforcement |
|------|-----------------|-------------------|-------------|
| Free | Optional | Email OTP, Authenticator App | User preference |
| Pro | Encouraged | Email OTP, Authenticator App, SMS | Nudge prompts |
| Enterprise | **Required** | Authenticator App, Hardware Keys, SSO | Policy-enforced |

**MFA Bypass Considerations:**

| Scenario | Policy | Risk Level |
|----------|--------|------------|
| Trusted device | 30-day remember | Low |
| API access | Service account exception | Medium |
| Recovery | Backup codes (10 single-use) | High |
| Emergency | Admin override with audit log | Critical |

### 3. Design Session Management

| Session Attribute | Configuration | Rationale |
|-------------------|---------------|-----------|
| Idle timeout | 30 minutes | Balance security/UX |
| Absolute timeout | 8 hours | Prevent stale sessions |
| Concurrent sessions | Tier-based (Free:1, Pro:3, Enterprise:unlimited) | Resource control |
| Session binding | IP + User-Agent fingerprint | Prevent session hijacking |
| Logout behavior | Revoke all tokens + clear cookies | Complete invalidation |

**Session Security Controls:**

| Control | Implementation | Purpose |
|---------|----------------|---------|
| Session ID rotation | On privilege change | Prevent fixation |
| Secure cookie flags | `Secure; HttpOnly; SameSite=Strict` | XSS/CSRF protection |
| Session storage | Server-side with Redis | Centralized revocation |
| Activity logging | All session events | Audit compliance |

### 4. Design SSO/SAML Integration for Enterprise

| Integration Type | Protocol | Enterprise Tier Feature |
|------------------|----------|-------------------------|
| SAML 2.0 | SP-initiated SSO | Corporate IdP integration |
| OIDC | Authorization Code + PKCE | Modern IdP support |
| SCIM 2.0 | User provisioning | Automated user lifecycle |
| Just-in-Time (JIT) | Auto-create on first login | Frictionless onboarding |

**Enterprise SSO Configuration:**

| Setting | Tenant-Configurable | Default |
|---------|---------------------|---------|
| IdP Metadata URL | Yes | None (required) |
| Certificate validation | Yes (strict/relaxed) | Strict |
| User attribute mapping | Yes | email, name, groups |
| Role mapping from groups | Yes | Custom mapping table |
| Force SSO | Yes | false (allow local + SSO) |

**Verify current best practices with web search:**
Search the web: "JWT multi-tenant security best practices {date}"
Search the web: "SAML SSO multi-tenant SaaS implementation {date}"
Search the web: "MFA tier-based enforcement patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

After completing authentication architecture design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into JWT claims, token rotation, or specific IdP integration
- **P (Party Mode)**: Bring security analyst, compliance officer, and DevOps perspectives
- **C (Continue)**: Accept authentication design and proceed to authorization
- **[Specific concerns]**: Describe concerns to investigate further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: Authentication architecture design including JWT configuration, MFA policies, session management, and SSO requirements
- Focus areas:
  - Which specific IdP integrations are required (Okta, Azure AD, Google)?
  - What are the compliance requirements for session management?
  - Are there specific MFA hardware key requirements (YubiKey, etc.)?
  - Token rotation strategies for high-security environments
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into authentication design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review authentication architecture for multi-tenant SaaS including JWT configuration, MFA enforcement, session management, and SSO integration"
- Process relevant personas:
  - **Security Analyst:** Evaluate token security and session binding
  - **Compliance Officer:** Validate against SOC 2 / HIPAA requirements
  - **DevOps:** Assess operational complexity and monitoring needs
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document authentication design to output artifact
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design.md`

---

## Verification

- [ ] JWT configuration includes `tenant_id` claim (CRITICAL)
- [ ] Token lifecycle policies defined for all token types
- [ ] MFA enforcement aligned with tier structure
- [ ] Session management includes timeout and concurrent session policies
- [ ] SSO/SAML integration supports enterprise requirements
- [ ] Web research completed with source citations

---

## Outputs

- JWT configuration specification
- MFA enforcement matrix by tier
- Session management policies
- SSO/SAML integration requirements

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Proceed to `step-03-c-design.md` to design authorization architecture.
