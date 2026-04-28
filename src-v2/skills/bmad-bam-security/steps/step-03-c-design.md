# Step 3: Design Authorization Architecture

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol

## EXECUTION PROTOCOLS

- 🎯 Focus: Design RBAC model, permission inheritance, cross-tenant admin, API keys
- 💾 Track: `stepsCompleted: [1, 2, 3]` when complete
- 📖 Context: Authentication design from Step 2
- 🚫 Do NOT: Design data encryption (Step 4) or skip tenant boundary enforcement
- 🔍 Use web search: Verify authorization patterns against OWASP recommendations
- ⚠️ Gate: QG-S2 (Authorization Security)

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
## Purpose

Design a comprehensive authorization architecture for multi-tenant SaaS, including RBAC with tenant scoping, permission inheritance, cross-tenant admin capabilities, and API key management.

---

## Prerequisites

- Step 2 complete with authentication design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: security-authz
- **Load guide:** `{project-root}/_bmad/bam/data/domains/security.md`

---

## Actions

### 1. Design RBAC Model with Tenant Scoping

**Core Principle:** All permissions are tenant-scoped by default. Cross-tenant access requires explicit platform-level roles.

| Role Category | Scope | Description |
|---------------|-------|-------------|
| Tenant Roles | Within single tenant | User, Admin, Owner |
| Platform Roles | Across tenants | Platform Admin, Support |
| System Roles | Infrastructure | Service Account |

**Tenant Role Hierarchy:**

| Role | Inherits From | Key Permissions |
|------|---------------|-----------------|
| `tenant:viewer` | - | Read-only access to tenant resources |
| `tenant:member` | `tenant:viewer` | Create/update own resources |
| `tenant:admin` | `tenant:member` | Manage users, billing, settings |
| `tenant:owner` | `tenant:admin` | Transfer ownership, delete tenant |

**Platform Role Matrix:**

| Role | Tenant Access | Purpose | Audit Level |
|------|---------------|---------|-------------|
| `platform:support` | Read-only impersonation | Customer support | Full audit trail |
| `platform:admin` | Full management | Platform operations | Enhanced logging |
| `platform:billing` | Billing data only | Revenue operations | Financial audit |

### 2. Define Permission Inheritance

| Permission Pattern | Syntax | Example |
|--------------------|--------|---------|
| Resource:Action | `{resource}:{action}` | `project:read` |
| Wildcard Action | `{resource}:*` | `project:*` |
| Hierarchical | `{parent}:{child}:{action}` | `workspace:project:delete` |
| Conditional | `{resource}:{action}:{condition}` | `project:read:own` |

**Inheritance Rules:**

| Rule | Behavior | Override |
|------|----------|----------|
| Role inheritance | Child roles inherit parent permissions | Explicit deny |
| Resource hierarchy | Parent resource grants child access | Scope limitation |
| Tenant boundary | Platform roles don't auto-grant tenant access | Explicit assignment |
| Deny precedence | Explicit deny overrides implicit allow | No override |

**Permission Resolution Order:**
1. Check explicit deny
2. Check explicit allow
3. Check inherited permissions
4. Default deny

### 3. Design Cross-Tenant Admin Capabilities

| Capability | Requirement | Security Control |
|------------|-------------|------------------|
| Tenant impersonation | Support troubleshooting | Time-limited, audit logged |
| Cross-tenant reporting | Platform analytics | Aggregated, no PII access |
| Tenant management | Provisioning/deprovisioning | Platform admin only |
| Configuration override | Emergency fixes | Requires approval workflow |

**Impersonation Security:**

| Control | Implementation | Purpose |
|---------|----------------|---------|
| Time limit | Max 1 hour per session | Limit exposure |
| Notification | Email to tenant admin | Transparency |
| Audit trail | All actions logged with impersonator ID | Accountability |
| Scope limit | Cannot modify security settings | Prevent privilege abuse |
| Approval | Requires ticket reference | Authorization trail |

### 4. Design API Key Management

| Key Type | Scope | Rotation | Revocation |
|----------|-------|----------|------------|
| Tenant API Key | Full tenant access | 90 days | Admin action |
| Scoped API Key | Specific resources | 30 days | Admin or creator |
| Service API Key | System integration | On deployment | Automated |
| Read-only Key | Analytics/reporting | 180 days | Admin action |

**API Key Security Controls:**

| Control | Implementation | Requirement |
|---------|----------------|-------------|
| Prefix identification | `bam_live_`, `bam_test_` | Distinguish environments |
| Secret hashing | bcrypt/argon2 | Never store plaintext |
| Rate limiting | Per-key quotas | Prevent abuse |
| IP allowlist | Optional per key | Enterprise tier |
| Usage logging | All API calls | Audit compliance |

**Key Lifecycle Management:**

| Event | Action | Notification |
|-------|--------|--------------|
| Creation | Generate, hash, return once | Creator only |
| Rotation | Issue new, deprecate old (7 days) | Key owner |
| Expiration | Warn at 14/7/1 days | Key owner + admin |
| Revocation | Immediate invalidation | Key owner + admin |
| Compromise | Emergency revoke + audit | Admin + security team |

**Verify current best practices with web search:**
Search the web: "RBAC multi-tenant SaaS best practices {date}"
Search the web: "API key management security patterns {date}"
Search the web: "cross-tenant admin security controls {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

After completing authorization architecture design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into permission models, ABAC vs RBAC, or specific role requirements
- **P (Party Mode)**: Bring security architect, product owner, and customer success perspectives
- **C (Continue)**: Accept authorization design and proceed to data protection
- **[Specific concerns]**: Describe concerns to investigate further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: Authorization architecture design including RBAC model, permission inheritance, cross-tenant admin, and API key management
- Focus areas:
  - Are there specific compliance requirements affecting role design?
  - Do you need attribute-based access control (ABAC) in addition to RBAC?
  - What are the API key requirements for partner integrations?
  - Cross-tenant administrative access patterns
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into authorization design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review authorization architecture for multi-tenant SaaS including RBAC model with tenant scoping, permission inheritance, cross-tenant admin capabilities, and API key management"
- Process relevant personas:
  - **Security Architect:** Evaluate permission model completeness
  - **Product Owner:** Validate role alignment with product tiers
  - **Customer Success:** Assess impersonation workflow usability
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document authorization design to output artifact
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-document.md`

---

## Verification

- [ ] RBAC model includes tenant scoping for all roles (CRITICAL)
- [ ] Permission inheritance rules defined with deny precedence
- [ ] Cross-tenant admin capabilities have security controls
- [ ] API key management includes rotation and revocation
- [ ] Tenant boundary enforcement documented (CRITICAL)
- [ ] Web research completed with source citations

---

## Outputs

- RBAC model specification
- Permission inheritance rules
- Cross-tenant admin capabilities and controls
- API key management policies

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

Proceed to `step-04-c-document.md` to design data protection architecture.
