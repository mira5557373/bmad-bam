# Step 4: Design User Provisioning

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

Design JIT (Just-In-Time) and SCIM-based user provisioning including user creation, attribute synchronization, role mapping, and deprovisioning procedures.

---

## Prerequisites

- SAML/OIDC configuration complete (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. JIT Provisioning Design

| Event | Action | Tenant Context |
|-------|--------|----------------|
| First Login | Create user from SSO attributes | Resolved from domain/claim |
| Subsequent Login | Update user attributes | Verified from token |
| Login with New Attributes | Update changed attributes | Re-sync on each login |
| Login Denied | No user created | Log attempt |

### 2. JIT User Creation Flow

| Step | Action | Failure Handling |
|------|--------|------------------|
| 1. Extract Claims | Parse SAML assertion or ID token | Reject if required claims missing |
| 2. Resolve Tenant | Map domain or tenant claim | Reject if tenant not found |
| 3. Check User Exists | Query by external ID + tenant | Proceed to create if not found |
| 4. Create User Record | Insert with tenant scope | Roll back on error |
| 5. Assign Default Role | Apply tenant default role | Use fallback role |
| 6. Create Session | Issue application session | User created, prompt retry |

### 3. SCIM 2.0 Provisioning

| Endpoint | Method | Action |
|----------|--------|--------|
| /Users | GET | List users (filtered by tenant) |
| /Users | POST | Create user in tenant |
| /Users/{id} | GET | Get user by ID |
| /Users/{id} | PUT | Replace user |
| /Users/{id} | PATCH | Update user attributes |
| /Users/{id} | DELETE | Soft-delete or deactivate |
| /Groups | GET | List groups (filtered by tenant) |
| /Groups | POST | Create group in tenant |
| /Groups/{id} | PATCH | Update group membership |

### 4. Attribute-to-Role Mapping

| IdP Attribute | Condition | Assigned Role |
|---------------|-----------|---------------|
| groups contains "admins" | Exact match | tenant_admin |
| groups contains "developers" | Exact match | developer |
| groups contains "viewers" | Exact match | viewer |
| department = "engineering" | Equals | developer |
| (default) | No match | member |

### 5. Role Sync Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| IdP-Authoritative | Roles always from IdP | Central role management |
| App-Authoritative | Local roles override | App-specific permissions |
| Merge | Combine IdP + local roles | Hybrid management |
| JIT-Only | Set on first login, no sync | Simple provisioning |

### 6. Deprovisioning Procedures

| Trigger | Action | Data Handling |
|---------|--------|---------------|
| SCIM DELETE | Soft-delete user | Retain for audit period |
| IdP Disable | Suspend user access | Preserve data |
| Group Removal | Revoke role | Maintain user record |
| Tenant Offboard | Cascade to all users | Follow tenant lifecycle |

### 7. Orphan User Handling

| Scenario | Detection | Action |
|----------|-----------|--------|
| User removed from IdP | SCIM sync, no JIT login | Mark inactive after 30 days |
| User moved to different group | Role sync mismatch | Update roles, notify admin |
| User domain changed | Email domain check | Require re-verification |

**Verify current best practices with web search:**
Search the web: "SCIM 2.0 user provisioning multi-tenant {date}"
Search the web: "JIT provisioning SSO best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the provisioning design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into provisioning flows and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for provisioning review
- **C (Continue)**: Accept provisioning design and proceed to session management
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass provisioning context: JIT flow, SCIM endpoints, role mapping
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into provisioning design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review provisioning design: {summary of JIT and SCIM flows}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save provisioning design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-design-session-management.md`

---

## Verification

- [ ] JIT provisioning flow defined
- [ ] SCIM 2.0 endpoints designed
- [ ] Attribute-to-role mapping defined
- [ ] Role sync strategy selected
- [ ] Deprovisioning procedures documented
- [ ] Orphan user handling defined
- [ ] Patterns align with pattern registry

---

## Outputs

- User provisioning design
- SCIM endpoint specification
- Role mapping configuration

---

## Next Step

Proceed to `step-05-c-design-session-management.md` to design session management.
