# Step 5: Design Session Management

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

Design tenant-scoped session management including session creation, token lifecycle, cross-tenant isolation, and session revocation procedures.

---

## Prerequisites

- User provisioning designed (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Session Architecture

| Component | Description | Tenant Scope |
|-----------|-------------|--------------|
| Session Store | Redis/DynamoDB for session data | Tenant-prefixed keys |
| Access Token | Short-lived JWT (15 min) | Contains tenant_id claim |
| Refresh Token | Long-lived opaque token (7 days) | Stored with tenant association |
| Session Cookie | HttpOnly, Secure, SameSite=Strict | Domain-scoped |

### 2. Session Creation Flow

| Step | Action | Security Control |
|------|--------|------------------|
| 1. SSO Complete | Receive assertion/token | Validate signature |
| 2. Resolve User | Find or create user | Verify tenant match |
| 3. Generate Session | Create session ID | Cryptographic random |
| 4. Issue Access Token | Sign JWT with tenant_id | Short expiry |
| 5. Issue Refresh Token | Generate opaque token | Store in session |
| 6. Set Cookies | HttpOnly, Secure | SameSite=Strict |

### 3. Token Lifecycle Management

| Token Type | Lifetime | Refresh | Rotation |
|------------|----------|---------|----------|
| Access Token | 15 minutes | On API call | N/A |
| Refresh Token | 7 days | Silent refresh | Rotate on use |
| Session | 24 hours idle | Reset on activity | N/A |
| Remember Me | 30 days | On login | Full re-auth required |

### 4. Cross-Tenant Session Isolation

| Control | Implementation | Purpose |
|---------|----------------|---------|
| Tenant ID in Token | JWT claim `tenant_id` | Every API validates |
| Session Prefix | `session:{tenant_id}:{session_id}` | Prevent key collision |
| Cookie Domain | `{tenant}.{domain}` | Browser isolation |
| CORS Policy | Tenant-specific origins | Cross-origin protection |

### 5. Session Validation

| Check | Frequency | On Failure |
|-------|-----------|------------|
| Token Signature | Every request | 401 Unauthorized |
| Token Expiry | Every request | Attempt refresh |
| Tenant Match | Every request | 403 Forbidden |
| User Active | Every request | 401 Unauthorized |
| Session Exists | Every request | 401 Unauthorized |

### 6. Session Revocation Procedures

| Trigger | Scope | Action |
|---------|-------|--------|
| User Logout | Single session | Delete session, clear cookies |
| User Logout All | All user sessions | Delete all sessions for user |
| Admin Revoke | Single user | Delete sessions, force re-auth |
| Tenant Suspend | All tenant sessions | Bulk delete, block new sessions |
| Security Incident | All tenant sessions | Emergency revocation |
| Password Change | All user sessions | Force re-authentication |

### 7. Single Logout (SLO)

| Protocol | Implementation | Fallback |
|----------|----------------|----------|
| SAML SLO | POST/Redirect binding | Local logout only |
| OIDC Logout | RP-Initiated Logout | Local logout only |
| Session Timeout | Automatic expiry | Redirect to login |
| Cross-App SLO | Shared session store | Per-app logout |

### 8. Session Security Controls

| Control | Configuration | Purpose |
|---------|---------------|---------|
| IP Binding | Optional per tenant | Prevent session hijacking |
| Device Fingerprint | Browser metadata hash | Detect device change |
| Concurrent Session Limit | Configurable (e.g., 5) | Prevent sharing |
| Geo-Velocity Check | Track login locations | Detect compromised creds |
| Session Activity Log | Last access, IP, action | Audit trail |

**Verify current best practices with web search:**
Search the web: "multi-tenant session management security {date}"
Search the web: "JWT session token best practices SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the session management design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into session security and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for session review
- **C (Continue)**: Accept session design and finalize SSO integration
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass session context: token lifecycle, isolation, revocation
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into session design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review session management: {summary of lifecycle and security}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save session management design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Complete Create mode workflow

---

## Verification

- [ ] Session architecture defined
- [ ] Session creation flow documented
- [ ] Token lifecycle management designed
- [ ] Cross-tenant isolation enforced
- [ ] Session validation procedures defined
- [ ] Revocation procedures documented
- [ ] Single logout designed
- [ ] Security controls specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Session management design
- Token lifecycle specification
- Security controls documentation

---

## Workflow Complete

Create mode complete for tenant-sso-integration workflow.

**Generated Artifacts:**
- `{output_folder}/planning-artifacts/security/tenant-sso-integration.md`
- IdP integration architecture
- Protocol configuration specification
- User provisioning design
- Session management design

**Quality Gate Contribution:**
- QG-S5 (Security): SSO authentication architecture
- QG-M2 (Tenant Isolation): Cross-tenant session isolation
- QG-I2 (Tenant Safety): IdP integration safety

---

## Next Step

Create workflow complete. SSO integration design ready for validation using Validate mode (`step-20-v-*`).

**Next Steps:**
- Run validation mode to verify completeness
- Proceed to implementation planning
- Create detailed runbooks for each IdP
