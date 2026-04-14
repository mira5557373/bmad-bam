# Step 2: Configure Token Management

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

Design token lifecycle, plan refresh strategy, configure token storage, and set up revocation.

## Prerequisites

- Step 1 completed: Auth flows designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: token-management
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

**Verify current best practices with web search:**
Search the web: "JWT access token best practices {date}"
Search the web: "OAuth token revocation patterns {date}"

_Source: [URL]_

### 1. Design Token Lifecycle

| Token Type | Format | TTL | Claims |
|------------|--------|-----|--------|
| Access Token | JWT | 15 min | sub, tenant_id, scopes |
| Refresh Token | Opaque | 7 days | Reference to session |
| ID Token | JWT | 1 hour | User info, auth time |

### 2. Plan Refresh Strategy

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Rotating | New refresh token each use | High security |
| Reusable | Same token until expiry | Simpler implementation |
| Sliding | Extend expiry on use | UX convenience |

### 3. Configure Token Storage

| Storage | Access Tokens | Refresh Tokens | Security |
|---------|---------------|----------------|----------|
| Stateless | Not stored | N/A | JWT validation |
| Redis | Optional | Required | Fast lookup |
| Database | Optional | Required | Audit trail |

### 4. Set Up Revocation

| Revocation Type | Scope | Implementation |
|-----------------|-------|----------------|
| Token | Single token | Blacklist/delete |
| Session | All user tokens | Session invalidation |
| Client | All client tokens | Client credential rotation |
| User | All user sessions | User action/admin |

---

## Soft Gate Checkpoint

**Steps 1-2 complete the auth flow and token design phase.**

Present summary and ask for confirmation before proceeding to scope definitions.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

---

## Verification

- [ ] Token lifecycle designed
- [ ] Refresh strategy planned
- [ ] Token storage configured
- [ ] Revocation set up
- [ ] Patterns align with pattern registry

## Outputs

- Token management specification
- Storage configuration
- Revocation procedures

## Next Step

Proceed to `step-03-c-define-scopes.md` to define scopes and permissions.
