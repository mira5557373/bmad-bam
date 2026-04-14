# Step 2: Design Permission Inheritance

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Design the permission inheritance model across the tenant hierarchy.

---

## Prerequisites

- Step 1 completed (Hierarchy structure defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`

---

## Actions

### 1. Define Permission Inheritance Model

| Level | Inherits From | Can Override | Override Direction | Scope |
|-------|---------------|--------------|-------------------|-------|
| Root | Platform defaults | Yes | Any | Full enterprise |
| BU | Root | Yes | Restrict only | Business unit scope |
| Department | BU | Yes | Restrict only | Department scope |
| Team | Department | Yes | Restrict only | Team scope |
| Project | Team | Limited | Restrict only | Project scope |

### 2. Permission Categories

Define permission categories that flow through hierarchy:

| Category | Description | Inheritance Behavior |
|----------|-------------|---------------------|
| Feature Access | Which features are enabled | Intersection (most restrictive wins) |
| Resource Quotas | Usage limits | Minimum of parent allocation |
| Data Access | Cross-tenant visibility | Explicit grant required |
| Admin Rights | Management capabilities | Downward delegation only |
| Compliance | Regulatory requirements | Union (all apply) |

### 3. Permission Resolution Algorithm

Define how effective permissions are calculated:

1. Start with platform defaults
2. Apply root tenant overrides
3. Walk down hierarchy path applying each level's overrides
4. For conflicts: Most restrictive wins (intersection)
5. Explicit denies override inherited allows
6. Cache effective permissions per user session

### 4. Special Permission Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| Break Glass | Emergency elevated access | Incident response |
| Delegation | Temporary permission grant | Cross-team collaboration |
| Impersonation | Admin acts as user | Support scenarios |
| Audit Mode | Read-only elevated access | Compliance review |

**Soft Gate:** Steps 1-2 complete hierarchy and permission design. Present summary of hierarchy levels and permission inheritance model. Ask for confirmation before proceeding to billing rollup.

**Verify current best practices with web search:**
Search the web: "RBAC permission inheritance multi-tenant {date}"
Search the web: "hierarchical permissions enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the permission inheritance design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into permission edge cases and conflict resolution
- **P (Party Mode)**: Bring analyst and architect perspectives for permission model review
- **C (Continue)**: Accept permission model and proceed to billing rollup design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass permission context: inheritance rules, categories, resolution algorithm
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into permission design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review permission inheritance: {summary of model and categories}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save permission inheritance model to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-billing-rollup.md`

---

## Verification

- [ ] Inheritance model defined for all levels
- [ ] Permission categories documented
- [ ] Resolution algorithm specified
- [ ] Special patterns addressed
- [ ] Patterns align with pattern registry

---

## Outputs

- Permission inheritance matrix
- Permission category definitions
- Resolution algorithm specification

---

## Next Step

Proceed to `step-03-c-design-billing-rollup.md` to design cost aggregation across hierarchy.
