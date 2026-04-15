# Step 2: Access Control Review

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


---

## Purpose

Review access controls and permissions across all systems in scope. This includes RBAC/ABAC policy review, service account audit, privileged access verification, and tenant isolation access controls.

---

## Prerequisites

- Step 1 completed (audit scope defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `authorization`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---

## Inputs

- Audit scope from previous step
- Current access control policies
- User/role inventories
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Review RBAC/ABAC Policies

Document and verify role-based access controls:

| Role | Permissions | Users Assigned | Last Reviewed |
|------|-------------|----------------|---------------|
| SuperAdmin | All | 2 | Today |
| TenantAdmin | Tenant-scoped all | Per tenant | Today |
| Developer | Read + Deploy | 15 | Today |
| ReadOnly | Read only | 8 | Today |

### 2. Audit Service Accounts

Review service account permissions:

| Service Account | Purpose | Permissions | Rotation |
|-----------------|---------|-------------|----------|
| api-gateway-sa | API routing | Network, Auth | 90 days |
| db-backup-sa | Database backups | DB read | 90 days |
| ai-runtime-sa | AI agent execution | LLM, Vector DB | 90 days |
| monitoring-sa | Metrics collection | Read all | 90 days |

### 3. Verify Privileged Access

Check privileged access controls:
- [ ] MFA required for all admin accounts
- [ ] JIT (Just-in-Time) access for elevated privileges
- [ ] Privileged access logging enabled
- [ ] Break-glass procedures documented
- [ ] Admin session timeout configured

### 4. Tenant Access Isolation

Verify tenant-to-tenant isolation:
- [ ] RLS policies enforced on all tenant tables
- [ ] Cross-tenant API access blocked
- [ ] Tenant context propagated in all requests
- [ ] No shared credentials between tenants
- [ ] Tenant admin cannot access other tenants

### 5. Document Findings

Record access control findings:

| Finding | Severity | Description | Recommendation |
|---------|----------|-------------|----------------|
| | | | |

**Verify current best practices with web search:**
Search the web: "access control audit checklist SaaS {date}"
Search the web: "RBAC review best practices cloud {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing access control review, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into access control gaps and risks
- **P (Party Mode)**: Bring security and IAM perspectives for review
- **C (Continue)**: Accept access review and proceed to vulnerability assessment
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass review context: roles, accounts, findings
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into access review
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review access controls: {summary of roles and findings}"
- Process collaborative analysis from security and IAM personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save access control review to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-vulnerability-assessment.md`

---

## Verification

- [ ] RBAC/ABAC policies reviewed
- [ ] Service accounts audited
- [ ] Privileged access verified
- [ ] Tenant isolation confirmed
- [ ] Findings documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Access control review report
- Role/permission matrix
- Service account inventory
- Access control findings

---

## Next Step

Proceed to `step-03-c-vulnerability-assessment.md` to execute vulnerability scans.
