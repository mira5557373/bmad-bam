# Step 2: Role Hierarchy Design

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

Design the role-based access control structure including platform vs tenant roles, inheritance hierarchies, and separation of duties enforcement.

---

## Prerequisites

- Step 1 completed with permission model design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: security
- **Web research (if available):** Search for current role hierarchy best practices

---

## Inputs

- Permission model design from Step 1
- Tenant model isolation document
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Organizational hierarchy requirements

---

## Actions

### 1. Define Platform vs Tenant Roles

Distinguish role scopes:

| Role Type | Scope | Managed By | Example |
|-----------|-------|------------|---------|
| Platform Role | Global | Platform Admin | `platform:support`, `platform:billing` |
| Tenant Role | Per-Tenant | Tenant Admin | `tenant:admin`, `tenant:developer` |
| Custom Role | Per-Tenant | Tenant Admin | User-defined roles |
| Service Role | System | Platform | `service:agent-runtime`, `service:billing` |

### 2. Design Role Inheritance

Define role hierarchy and inheritance:

| Parent Role | Inherits From | Additional Permissions |
|-------------|---------------|------------------------|
| Tenant Owner | Tenant Admin | billing:manage, users:delete |
| Tenant Admin | Tenant Developer | users:manage, settings:update |
| Tenant Developer | Tenant Viewer | agents:create, workflows:create |
| Tenant Viewer | (base) | *:read |

### 3. Configure Role Assignment Rules

Define assignment constraints:

| Rule | Constraint | Enforcement |
|------|------------|-------------|
| Single Primary Role | One primary role per user per tenant | Application layer |
| Multiple Secondary | Additive permissions only | Permission aggregation |
| Role Limits | Max roles per user configurable | Tenant settings |
| Assignment Audit | All assignments logged | Audit service |

### 4. Enforce Separation of Duties

Define incompatible role combinations:

| Role A | Role B | Conflict Reason |
|--------|--------|-----------------|
| Billing Admin | Audit Admin | Financial oversight |
| User Admin | Security Admin | Access control separation |
| Agent Developer | Agent Approver | Change control |
| Data Admin | Compliance Officer | Data governance |

**Verify current best practices with web search:**
Search the web: "RBAC role hierarchy design patterns {date}"
Search the web: "separation of duties enterprise software {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the role hierarchy analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into role inheritance or separation of duties
- **P (Party Mode)**: Bring security and compliance perspectives on role design
- **C (Continue)**: Accept role hierarchy design and proceed to attribute policies
- **[Specific refinements]**: Describe role hierarchy concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: role types, inheritance, assignment rules, separation of duties
- Process enhanced insights on role design trade-offs
- Ask user: "Accept these refined role hierarchy decisions? (y/n)"
- If yes, integrate into role hierarchy specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review role hierarchy design for multi-tenant platform compliance"
- Process security and compliance perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save role hierarchy design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-attribute-policies.md`

---

## Verification

- [ ] Platform vs tenant roles defined
- [ ] Role inheritance designed
- [ ] Assignment rules documented
- [ ] Separation of duties enforced
- [ ] Patterns align with pattern registry

---

## Outputs

- Role type definitions
- Inheritance hierarchy specification
- Assignment rule configuration
- Separation of duties matrix

---

## Next Step

Proceed to `step-03-c-attribute-policies.md` to design attribute policies.
