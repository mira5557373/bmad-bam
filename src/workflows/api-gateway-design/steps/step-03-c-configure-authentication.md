# Step 3: Configure Authentication

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

Design auth flows per endpoint type, configure token validation, plan tenant context extraction, and set up security policies.

## Prerequisites

- Step 2 completed: Rate limiting designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: authentication
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Inputs

- Output from Steps 1-2 (Requirements, rate limiting)
- Authentication strategy
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`

---

## Actions

**Verify current best practices with web search:**
Search the web: "API gateway JWT validation best practices {date}"
Search the web: "OAuth2 gateway integration patterns {date}"

_Source: [URL]_

### 1. Design Auth Flows Per Endpoint Type

| Endpoint Type | Auth Flow | Validation | Caching |
|---------------|-----------|------------|---------|
| Public API | API Key | Gateway lookup | Redis |
| Partner API | OAuth2 Client Credentials | JWT validation | Local cache |
| User API | OAuth2 Authorization Code | JWT + scope check | Session |
| Admin API | mTLS + JWT | Cert + token | No cache |

### 2. Configure Token Validation

| Token Type | Validation Method | Claims Required |
|------------|-------------------|-----------------|
| API Key | Database/Redis lookup | key_id, tenant_id |
| JWT | Signature + expiry | sub, tenant_id, scopes |
| Session | Server-side store | session_id, user_id |

### 3. Plan Tenant Context Extraction

| Source | Extraction Method | Propagation |
|--------|-------------------|-------------|
| JWT Claims | Decode token, extract tenant_id | X-Tenant-ID header |
| API Key | Lookup key, get tenant | Request context |
| Path | Parse /tenants/{id} | Route parameter |
| Subdomain | Parse {tenant}.api.com | Request context |

### 4. Set Up Security Policies

| Policy | Scope | Action |
|--------|-------|--------|
| CORS | All endpoints | Configurable origins |
| IP Allowlist | Partner APIs | Reject unknown IPs |
| Request Size | All | Max 10MB default |
| Header Validation | All | Required headers check |
| SQL Injection | All | WAF rules |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the authentication configuration above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into auth flows and security policies
- **P (Party Mode)**: Bring security and architect perspectives for auth review
- **C (Continue)**: Accept authentication config and proceed to routing rules
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass auth context: flows, validation, tenant extraction, policies
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into configuration
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review authentication configuration: {summary of flows and policies}"
- Process collaborative analysis from security and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save authentication configuration
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-define-routing.md`

---

## Verification

- [ ] Auth flows designed per endpoint type
- [ ] Token validation configured
- [ ] Tenant context extraction planned
- [ ] Security policies set up
- [ ] Patterns align with pattern registry

## Outputs

- Authentication flow specification
- Token validation configuration
- Security policy document

## Next Step

Proceed to `step-04-c-define-routing.md` to define routing rules.
