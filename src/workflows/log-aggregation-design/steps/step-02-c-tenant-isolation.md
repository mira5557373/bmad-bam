# Step 2: Design Tenant Isolation

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design tenant-isolated log access and security controls.

---

## Prerequisites

- Step 1 completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant

---

## Actions

### 1. Isolation Strategies

| Strategy | Mechanism | Use Case |
|----------|-----------|----------|
| Index per tenant | Separate indices | Enterprise tier |
| Tenant filter | Query-time filter | Shared storage |
| Namespace prefix | Tenant prefixed index | Hybrid approach |
| Data stream | Tenant data streams | Time-series logs |

### 2. Access Control

| Role | Access Level | Scope |
|------|--------------|-------|
| Platform admin | All logs | Platform-wide |
| Tenant admin | Tenant logs only | Own tenant |
| Support | Read tenant logs | Assigned tenants |
| Developer | Application logs | Own services |
| Security | Audit/security logs | Platform-wide |

### 3. Query Security

| Control | Implementation | Purpose |
|---------|----------------|---------|
| Tenant context | Mandatory filter | Prevent cross-tenant |
| Rate limiting | Query throttling | Resource protection |
| Field masking | Sensitive data hiding | Privacy compliance |
| Audit logging | Query audit trail | Compliance |

### 4. Tenant Self-Service

| Feature | Capability | Tier |
|---------|------------|------|
| Log viewer | Web UI access | All |
| Search API | Programmatic access | Business+ |
| Export | Bulk download | Enterprise |
| Alerts | Custom log alerts | Business+ |
| Dashboards | Custom visualizations | Enterprise |

**Verify current best practices with web search:**
Search the web: "multi-tenant log isolation security {date}"
Search the web: "tenant log access control patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing tenant isolation design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into access controls
- **P (Party Mode)**: Bring security and compliance perspectives
- **C (Continue)**: Accept tenant isolation and proceed to assembly
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save tenant isolation to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-assembly.md`

---

## Verification

- [ ] Isolation strategies defined
- [ ] Access control documented
- [ ] Query security established
- [ ] Self-service features planned
- [ ] Patterns align with pattern registry

---

## Outputs

- Isolation strategy specification
- Access control matrix
- Self-service feature plan

---

## Next Step

Proceed to `step-03-c-assembly.md` to assemble final document.
