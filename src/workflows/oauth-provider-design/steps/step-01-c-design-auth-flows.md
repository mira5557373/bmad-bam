# Step 1: Design Authorization Flows

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

Configure OAuth2 grant types, design consent experience, plan redirect handling, and set up PKCE support.

## Prerequisites

- Security requirements defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: oauth2
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: authentication

---

## Actions

**Verify current best practices with web search:**
Search the web: "OAuth2.1 best practices authorization server {date}"
Search the web: "PKCE implementation patterns {date}"

_Source: [URL]_

### 1. Configure OAuth2 Grant Types

| Grant Type | Use Case | PKCE Required | Refresh Token |
|------------|----------|---------------|---------------|
| Authorization Code | Web apps | Recommended | Yes |
| Authorization Code + PKCE | SPAs, Mobile | Required | Yes |
| Client Credentials | M2M | N/A | No |
| Refresh Token | Token renewal | N/A | Issues new |

### 2. Design Consent Experience

| Consent Element | Description | Tenant Customization |
|-----------------|-------------|---------------------|
| Scope display | Human-readable scope names | Brand colors |
| App info | Developer, privacy policy | N/A |
| Permissions | Requested access | Custom scope text |
| Remember | Skip consent option | Tenant policy |

### 3. Plan Redirect Handling

| Redirect Type | Validation | Security |
|---------------|------------|----------|
| Registered URIs | Exact match | Required |
| Localhost | Port wildcard | Dev only |
| Custom scheme | App-specific | Mobile apps |

### 4. Set Up PKCE Support

| PKCE Method | Recommendation | Implementation |
|-------------|----------------|----------------|
| S256 | Required | SHA256 hash |
| Plain | Discouraged | Fallback only |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

---

## Verification

- [ ] OAuth2 grant types configured
- [ ] Consent experience designed
- [ ] Redirect handling planned
- [ ] PKCE support set up
- [ ] Patterns align with pattern registry

## Outputs

- Authorization flow specification
- Consent UI requirements
- PKCE configuration

## Next Step

Proceed to `step-02-c-configure-tokens.md` to configure token management.
