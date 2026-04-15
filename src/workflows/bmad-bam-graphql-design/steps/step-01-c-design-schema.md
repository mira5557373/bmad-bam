# Step 1: Design Schema Architecture

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

Define type system, plan schema organization, design federation boundaries, and configure directives.

## Prerequisites

- Domain models defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: graphql
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: api-design

---

## Actions

**Verify current best practices with web search:**
Search the web: "GraphQL schema design best practices {date}"
Search the web: "Apollo Federation architecture patterns {date}"

_Source: [URL]_

### 1. Define Type System

| Type Category | Examples | Conventions |
|---------------|----------|-------------|
| Entities | User, Tenant, Order | PascalCase, singular |
| Inputs | CreateUserInput | InputSuffix |
| Enums | UserStatus, TenantTier | SCREAMING_CASE values |
| Interfaces | Node, Timestamped | Common patterns |
| Unions | SearchResult | Polymorphic returns |

### 2. Plan Schema Organization

| Module | Types | Ownership |
|--------|-------|-----------|
| Identity | User, Role, Permission | user-service |
| Tenant | Tenant, Subscription, Tier | tenant-service |
| Commerce | Order, Payment, Invoice | billing-service |
| AI | Agent, Conversation, Tool | ai-runtime |

### 3. Design Federation Boundaries

| Subgraph | Entities | Extensions |
|----------|----------|------------|
| Users | User (key: id) | - |
| Tenants | Tenant (key: id) | User.tenant |
| Orders | Order (key: id) | User.orders, Tenant.orders |
| AI | Agent (key: id) | Tenant.agents |

### 4. Configure Directives

| Directive | Purpose | Usage |
|-----------|---------|-------|
| @auth | Authorization | Field-level |
| @tenant | Tenant context | Type-level |
| @deprecated | Deprecation | Field-level |
| @cost | Complexity | Field-level |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

---

## Verification

- [ ] Type system defined
- [ ] Schema organization planned
- [ ] Federation boundaries designed
- [ ] Directives configured
- [ ] Patterns align with pattern registry

## Outputs

- Schema architecture document
- Type definitions
- Federation specification

## Next Step

Proceed to `step-02-c-configure-resolvers.md` to configure resolvers.
