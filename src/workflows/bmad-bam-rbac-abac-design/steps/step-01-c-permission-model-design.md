# Step 1: Permission Model Design

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Design the foundational permission model including taxonomy, resource-action mappings, and permission grouping strategies for multi-tenant AI platforms.

---

## Prerequisites

- Tenant model isolation document loaded
- Tenant model configuration (`{tenant_model}`) resolved
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: security
- **Web research (if available):** Search for current RBAC/ABAC best practices

---

## Inputs

- User requirements and constraints for access control
- Tenant model isolation document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Permission Taxonomy

Design permission naming conventions and categories:

| Category | Format | Example |
|----------|--------|---------|
| Resource Permissions | `{resource}:{action}` | `agents:create`, `agents:read` |
| Feature Permissions | `feature:{name}:{level}` | `feature:analytics:full` |
| Admin Permissions | `admin:{scope}:{action}` | `admin:tenant:manage` |
| System Permissions | `system:{component}:{action}` | `system:billing:override` |

### 2. Map Resources to Actions

Define resource-action mappings:

| Resource | Actions | Scope |
|----------|---------|-------|
| Agents | create, read, update, delete, execute | Tenant |
| Workflows | create, read, update, delete, trigger | Tenant |
| Users | invite, read, update, deactivate | Tenant |
| Settings | read, update | Tenant/Platform |
| Billing | read, manage | Tenant |
| Audit Logs | read, export | Tenant/Platform |

### 3. Design Permission Grouping

Define logical permission groups:

| Group | Permissions Included | Use Case |
|-------|---------------------|----------|
| Agent Operator | agents:read, agents:execute, workflows:trigger | Day-to-day AI usage |
| Agent Developer | Agent Operator + agents:create, agents:update | Building AI agents |
| Tenant Admin | All tenant permissions | Tenant administration |
| Platform Admin | All permissions | Platform operations |

### 4. Establish Cross-Tenant Boundaries

Define permission boundaries:

| Boundary | Rule | Enforcement |
|----------|------|-------------|
| Tenant Data | Never cross tenant boundaries | RLS + Application layer |
| Shared Resources | Explicit permission required | ABAC policy |
| Platform Features | Tier-gated access | Subscription check |
| Admin Escalation | Requires separate auth | MFA + Audit |

**Verify current best practices with web search:**
Search the web: "RBAC permission taxonomy best practices {date}"
Search the web: "multi-tenant authorization patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the permission model analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific permission categories or boundaries
- **P (Party Mode)**: Bring security and product perspectives on permission model
- **C (Continue)**: Accept permission model design and proceed to role hierarchy
- **[Specific refinements]**: Describe permission model concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: permission taxonomy, resource mappings, boundaries
- Process enhanced insights on authorization trade-offs
- Ask user: "Accept these refined permission model decisions? (y/n)"
- If yes, integrate into permission model specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review permission model design for multi-tenant platform security"
- Process security and product perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save permission model design to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-role-hierarchy-design.md`

---

## Verification

- [ ] Permission taxonomy defined
- [ ] Resource-action mappings documented
- [ ] Permission grouping established
- [ ] Cross-tenant boundaries defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Permission taxonomy specification
- Resource-action mapping table
- Permission grouping structure
- Cross-tenant boundary rules

---

## Next Step

Proceed to `step-02-c-role-hierarchy-design.md` to design role hierarchy.
