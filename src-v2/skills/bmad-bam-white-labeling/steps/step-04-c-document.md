# Step 04: Design Feature Customization

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 **NEVER skip feature flag override hierarchy** - Global < Tier < Tenant < User
- 📖 **CRITICAL: ALWAYS define UI component visibility schema** with tier requirements
- 🔄 **CRITICAL: Include menu customization by tier** - reorder, hide, rename, custom items
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **DOCUMENT role naming customization** - display names, descriptions, icons

## EXECUTION PROTOCOLS:

- 🎯 Focus: Design feature toggle and UI customization architecture
- 💾 Track: `stepsCompleted: [1, 2, 3, 4]` when complete
- 📖 Context: Feature customization enables tenant control over UI/UX
- 🔍 Use web search: Verify feature flag and tenant UI patterns
- ⚠️ Gate: Feature flag performance and cache invalidation

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
## YOUR TASK

Design the feature customization layer including: feature toggle system with multi-level override hierarchy (Global/Tier/Tenant/User), feature flag storage and evaluation flow, UI component visibility architecture (component schema with tierRequirement, featureFlag, roleRequirement, tenantOverride), menu customization levels by tier (reordering, hiding, renaming, custom items, full restructure), menu configuration schemas, and role naming customization (platform roles with customizable display names, descriptions, icons per tier).

---

## Purpose

Design the feature customization layer including per-tenant feature toggles, UI component visibility controls, menu customization, and role naming customization.

---

## Prerequisites

- Step 03 completed: Domain customization designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `customization`, `feature-flags`
- **Load guide:** `{project-root}/_bmad/bam/data/domains/customization.md`

**Web Research (Required):**

Search the web: "feature flags multi-tenant SaaS architecture {date}"
Search the web: "tenant-specific UI customization patterns {date}"
Search the web: "role-based access control naming customization {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Design Feature Toggle System

Feature flag architecture for multi-tenant:

| Flag Level | Scope | Override Order |
|------------|-------|----------------|
| Global | All tenants | Lowest priority |
| Tier | All tenants in tier | Medium priority |
| Tenant | Specific tenant | High priority |
| User | Specific user | Highest priority |

Feature flag evaluation flow:

| Step | Check | Result |
|------|-------|--------|
| 1 | User-level override? | Use if exists |
| 2 | Tenant-level override? | Use if exists |
| 3 | Tier-level setting? | Use if exists |
| 4 | Global default | Use as fallback |

Feature flag storage:

| Storage Type | Pros | Cons | Use Case |
|--------------|------|------|----------|
| Database | Persistent, queryable | Slower reads | Source of truth |
| Cache (Redis) | Fast reads | Cache invalidation | Runtime checks |
| Config file | Simple, versioned | Requires deploy | Static flags |
| Feature flag service | Full-featured | External dependency | Enterprise scale |

Feature flag categories:

| Category | Examples | Tenant Control |
|----------|----------|----------------|
| Tier features | Advanced analytics, API access | None (tier-based) |
| Optional features | Beta features, experiments | Tenant opt-in |
| Regulatory | GDPR tools, data residency | Tenant requirement |
| Customization | UI options, integrations | Full control |

### 2. Design UI Component Visibility

Component visibility architecture:

| Component Type | Visibility Control | Tier Dependency |
|----------------|-------------------|-----------------|
| Navigation items | Per-tenant config | Yes |
| Dashboard widgets | Per-tenant + per-user | Yes |
| Feature sections | Feature flag | Yes |
| Upsell prompts | Tier-based | Yes |
| Admin tools | Role + tier | Yes |

Visibility configuration schema:

| Field | Type | Purpose |
|-------|------|---------|
| `componentId` | string | Unique component identifier |
| `defaultVisibility` | boolean | Show by default |
| `tierRequirement` | string[] | Required tiers |
| `featureFlag` | string | Controlling feature flag |
| `roleRequirement` | string[] | Required roles |
| `tenantOverride` | boolean | Allow tenant customization |

Component visibility resolution:

| Check Order | Condition | Result |
|-------------|-----------|--------|
| 1 | Tier not met | Hidden |
| 2 | Feature flag off | Hidden |
| 3 | Role not authorized | Hidden |
| 4 | Tenant override = hide | Hidden |
| 5 | All checks pass | Visible |

### 3. Design Menu Customization

Menu customization levels:

| Level | Customization | Tier |
|-------|---------------|------|
| Reordering | Change menu item order | Pro+ |
| Hiding | Hide specific items | Pro+ |
| Renaming | Custom menu labels | Enterprise+ |
| Custom items | Add tenant-specific links | Enterprise+ |
| Full restructure | Complete menu control | OEM |

Menu configuration schema:

| Field | Type | Purpose |
|-------|------|---------|
| `menuItems` | array | Ordered list of items |
| `hiddenItems` | string[] | Items to hide |
| `renamedItems` | object | Label overrides |
| `customItems` | array | Tenant-added items |
| `inheritPlatform` | boolean | Inherit platform updates |

Custom menu item schema:

| Field | Type | Required |
|-------|------|----------|
| `id` | string | Yes |
| `label` | string | Yes |
| `url` | string | Yes |
| `icon` | string | No |
| `position` | number | No |
| `roles` | string[] | No |
| `newTab` | boolean | No |

Menu administration flow:

| Step | Action | Preview |
|------|--------|---------|
| 1 | Load current menu | Show current structure |
| 2 | Make modifications | Live preview |
| 3 | Save draft | Preview mode |
| 4 | Publish changes | Apply to all users |
| 5 | Rollback option | Restore previous |

### 4. Design Role Naming Customization

Role naming architecture:

| Platform Role | Default Label | Customizable |
|---------------|---------------|--------------|
| `tenant_admin` | Administrator | Yes |
| `manager` | Manager | Yes |
| `user` | User | Yes |
| `viewer` | Viewer | Yes |
| `billing_admin` | Billing Admin | Yes |
| `api_user` | API User | Yes |

Role customization schema:

| Field | Type | Purpose |
|-------|------|---------|
| `roleId` | string | Platform role identifier |
| `displayName` | string | Custom display name |
| `description` | string | Custom description |
| `icon` | string | Custom icon (optional) |

Role naming by tier:

| Tier | Customization | Examples |
|------|---------------|----------|
| Free | None | Platform defaults |
| Pro | Display name only | "Team Lead" instead of "Manager" |
| Enterprise | Full customization | Custom names, descriptions, icons |
| OEM | Role creation | Create new roles with custom names |

Role naming considerations:

| Aspect | Guidance |
|--------|----------|
| Consistency | Use same terminology in UI, docs, API |
| Reserved names | Prevent confusion with system roles |
| Character limits | Max 32 characters for display names |
| Localization | Support translated role names |
| Audit trail | Log role name changes |

---

## COLLABORATION MENUS (A/P/C):

After presenting the feature customization design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into feature flags or role architecture
- **P (Party Mode)**: Bring product/UX perspectives on customization options
- **C (Continue)**: Accept feature customization design and compile final document
- **[Specific components]**: Describe which components need refinement

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: feature toggle design, UI visibility, menu/role customization
- Process enhanced insights on feature flag architecture, tenant control boundaries
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review feature customization architecture for multi-tenant SaaS"
- Present synthesized recommendations from product and UX perspectives
- Return to A/P/C menu

#### If 'C' (Continue):
- Document feature customization decisions
- Update frontmatter: `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-complete.md`

---

## Verification

- [ ] Feature toggle system designed with multi-level overrides
- [ ] UI component visibility architecture defined
- [ ] Menu customization levels and schemas specified
- [ ] Role naming customization designed
- [ ] Tier-based availability documented for all features
- [ ] Configuration schemas defined
- [ ] Web research completed with citations

---

## Outputs

- Feature flag architecture specification
- UI component visibility configuration schema
- Menu customization design with schemas
- Role naming customization specification
- Tier-based feature availability matrix

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

Proceed to `step-05-c-complete.md` to compile the complete white-labeling design.
