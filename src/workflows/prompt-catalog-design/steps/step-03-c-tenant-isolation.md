# Step 3: Tenant Isolation

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design the tenant isolation model for the prompt catalog, ensuring secure separation of tenant prompts while enabling controlled sharing of platform-level resources.

---

## Prerequisites

- Step 2 completed: Prompt taxonomy defined
- Tenant model configuration (`{tenant_model}`) resolved
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Web research (if available):** Search for multi-tenant prompt isolation

---

## Inputs

- Prompt taxonomy from Step 2
- Tenant model configuration
- Pattern registry: `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Actions

### 1. Define Ownership Model

Establish prompt ownership hierarchy:

| Ownership Level | Scope | Managed By | Visibility |
|-----------------|-------|------------|------------|
| Platform | All tenants | Platform Admin | Configurable per prompt |
| Tenant | Single tenant | Tenant Admin | Tenant users only |
| User | Single user | User | User only (drafts) |
| Shared | Multiple tenants | Platform Admin | Explicit tenant list |

### 2. Design Visibility Controls

Define how prompt visibility is managed:

| Visibility | Description | Access Rules |
|------------|-------------|--------------|
| PUBLIC | Available to all tenants | Read-only for non-owners |
| TENANT | Tenant-specific prompt | Tenant members only |
| PRIVATE | Individual user prompt | Owner only |
| SHARED | Explicitly shared | Named tenants only |
| TEMPLATE | Clonable base | Read + Clone for allowed |

### 3. Design Permission Inheritance

Define how permissions flow through the hierarchy:

| Source | Permission | Inheritance Rule |
|--------|------------|-----------------|
| Platform Prompt | READ | All tenants inherit |
| Platform Prompt | CLONE | Configurable per prompt |
| Platform Prompt | MODIFY | Platform admin only |
| Tenant Prompt | READ | Tenant members inherit |
| Tenant Prompt | MODIFY | Tenant admin + owners |
| User Prompt | ALL | Owner only |

### 4. Define Cross-Tenant Sharing

Design controlled prompt sharing between tenants:

| Share Type | Mechanism | Audit |
|------------|-----------|-------|
| Direct Share | Explicit tenant-to-tenant grant | Full audit trail |
| Marketplace | Tenant publishes to marketplace | Download tracking |
| Template Clone | Tenant clones and owns copy | Source reference |
| Federation | Cross-org prompt federation | Federated audit |

| Share Permission | Description | Revocable |
|------------------|-------------|-----------|
| VIEW | Read prompt content | Yes |
| USE | Execute prompt in runtime | Yes |
| CLONE | Create owned copy | No (copy is owned) |
| MODIFY | Edit shared prompt | Yes |

### 5. Design Audit Trail

Define audit requirements for prompt access:

| Event | Captured Data | Retention |
|-------|---------------|-----------|
| prompt.view | tenant_id, user_id, prompt_id, timestamp | 90 days |
| prompt.execute | tenant_id, prompt_id, model, tokens, latency | 1 year |
| prompt.modify | tenant_id, user_id, prompt_id, diff, timestamp | Indefinite |
| prompt.share | source_tenant, target_tenant, permission, timestamp | Indefinite |
| prompt.clone | source_prompt, target_prompt, tenant_id | Indefinite |

**Verify current best practices with web search:**
Search the web: "multi-tenant data isolation patterns SaaS {date}"
Search the web: "prompt library access control enterprise AI {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tenant isolation design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into isolation edge cases and security
- **P (Party Mode)**: Bring security and compliance perspectives
- **C (Continue)**: Accept isolation design and proceed to versioning strategy
- **[Specific refinements]**: Describe isolation concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: ownership model, visibility controls, audit requirements
- Process enhanced insights on isolation trade-offs
- Ask user: "Accept these refined isolation decisions? (y/n)"
- If yes, integrate into isolation specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant isolation design for prompt catalog"
- Process security and compliance perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant isolation design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-versioning-strategy.md`

---

## Verification

- [ ] Ownership model covers all scenarios
- [ ] Visibility controls are comprehensive
- [ ] Permission inheritance documented
- [ ] Cross-tenant sharing mechanism defined
- [ ] Audit trail requirements specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant isolation specification
- Ownership and visibility model
- Permission inheritance hierarchy
- Audit trail requirements

---

## Next Step

Proceed to `step-04-c-versioning-strategy.md` to define catalog versioning approach.
