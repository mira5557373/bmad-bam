# Step 3: Define Scopes and Permissions

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

Create scope taxonomy, map scopes to APIs, plan tenant-specific scopes, and design consent prompts.

## Prerequisites

- Steps 1-2 completed: Auth flows and tokens designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: authorization
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: rbac

---

## Actions

**Verify current best practices with web search:**
Search the web: "OAuth scope design best practices {date}"
Search the web: "API permission models multi-tenant {date}"

_Source: [URL]_

### 1. Create Scope Taxonomy

| Scope | Description | Sensitivity |
|-------|-------------|-------------|
| openid | OpenID Connect | Low |
| profile | Basic user info | Low |
| email | User email | Medium |
| read:users | Read user data | Medium |
| write:users | Modify user data | High |
| admin:tenant | Tenant administration | Critical |

### 2. Map Scopes to APIs

| API Endpoint | Required Scopes | Optional Scopes |
|--------------|-----------------|-----------------|
| GET /users | read:users | - |
| POST /users | write:users | admin:users |
| GET /me | openid, profile | email |
| DELETE /users/* | admin:users | - |

### 3. Plan Tenant-Specific Scopes

| Scope Type | Implementation | Example |
|------------|----------------|---------|
| Standard | Platform-wide | read:users |
| Tenant custom | Namespace prefix | tenant:{id}:custom |
| Tier restricted | Tier validation | enterprise:analytics |

### 4. Design Consent Prompts

| Scope | User-Facing Text | Risk Level |
|-------|------------------|------------|
| read:users | View your contacts | Low |
| write:users | Modify your contacts | Medium |
| admin:tenant | Full admin access | High |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

---

## Verification

- [ ] Scope taxonomy created
- [ ] Scopes mapped to APIs
- [ ] Tenant-specific scopes planned
- [ ] Consent prompts designed
- [ ] Patterns align with pattern registry

## Outputs

- Scope taxonomy document
- API permission mapping
- Consent prompt copy

## Next Step

Workflow complete. Present OAuth Provider Design with scope configuration to user for review and approval.
