# Step 4: Tenant Scoping

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

Design tenant-aware access control including tenant isolation in authorization, cross-tenant access patterns, tenant admin capabilities, and comprehensive audit trail requirements.

---

## Prerequisites

- Steps 1-3 completed with permission model, role hierarchy, and attribute policies
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: security
- **Web research (if available):** Search for tenant isolation in authorization patterns

---

## Inputs

- Permission model design from Step 1
- Role hierarchy design from Step 2
- Attribute policies design from Step 3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Design Tenant Authorization Isolation

Define tenant isolation enforcement:

| Layer | Isolation Mechanism | Enforcement |
|-------|---------------------|-------------|
| Request Context | Tenant ID in JWT/session | API Gateway |
| Policy Evaluation | Tenant-scoped policies | PDP |
| Data Access | Tenant context in queries | ORM/RLS |
| Resource URLs | Tenant prefix validation | Routing |

### 2. Define Cross-Tenant Access Patterns

Design controlled cross-tenant scenarios:

| Pattern | Use Case | Authorization Model |
|---------|----------|---------------------|
| Platform Support | Customer assistance | Elevated platform role + audit |
| Data Sharing | Partner integrations | Explicit grant + time-limited |
| Aggregated Analytics | Platform metrics | Anonymized + aggregated only |
| Migration | Tenant consolidation | Temporary dual-access + audit |

### 3. Configure Tenant Admin Capabilities

Define tenant admin permissions:

| Capability | Scope | Constraints |
|------------|-------|-------------|
| Role Creation | Custom roles within tenant | Cannot exceed own permissions |
| User Management | Add/remove/modify users | Cannot create platform roles |
| Policy Customization | Tenant-specific ABAC rules | Platform policies immutable |
| Audit Access | Tenant audit logs only | No cross-tenant visibility |
| Delegation | Sub-admin assignment | Max depth configurable |

### 4. Design Audit Trail Requirements

Specify authorization audit logging:

| Event | Data Captured | Retention |
|-------|---------------|-----------|
| Permission Check | Subject, resource, action, decision, reason | 90 days |
| Role Assignment | Assigner, assignee, role, effective date | 365 days |
| Policy Change | Author, before/after, approval chain | 365 days |
| Cross-Tenant Access | Accessor, accessed tenant, justification | 365 days |
| Privilege Escalation | Requester, escalated permissions, approval | Indefinite |

**Verify current best practices with web search:**
Search the web: "multi-tenant authorization audit logging {date}"
Search the web: "tenant isolation access control patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tenant scoping analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tenant isolation or audit requirements
- **P (Party Mode)**: Bring compliance and security perspectives on tenant scoping
- **C (Continue)**: Accept tenant scoping design and complete Create mode
- **[Specific refinements]**: Describe tenant scoping concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: tenant isolation, cross-tenant patterns, admin capabilities, audit
- Process enhanced insights on tenant scoping trade-offs
- Ask user: "Accept these refined tenant scoping decisions? (y/n)"
- If yes, integrate into tenant scoping specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant scoping design for multi-tenant access control compliance"
- Process compliance and security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant scoping design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final RBAC/ABAC architecture document
- Workflow Create mode complete

---

## Verification

- [ ] Tenant authorization isolation designed
- [ ] Cross-tenant patterns defined
- [ ] Tenant admin capabilities configured
- [ ] Audit trail requirements documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant isolation enforcement specification
- Cross-tenant access pattern design
- Tenant admin capability matrix
- Audit trail requirements document
- **Output to:** `{output_folder}/planning-artifacts/architecture/rbac-abac-design.md`

---

## Next Step

Create mode complete. Proceed to validation or downstream workflows.
