# Step 8: Access Control

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

Design the access control model for the prompt catalog, defining role-based permissions, API key scoping, and comprehensive audit logging to ensure secure and compliant prompt management.

---

## Prerequisites

- Step 7 completed: Performance tracking defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: access-control
- **Web research (if available):** Search for RBAC best practices for AI platforms

---

## Inputs

- Performance tracking design from Step 7
- Tenant isolation model from Step 3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Role-Based Permissions

Establish RBAC model for prompt catalog:

| Role | Scope | Description |
|------|-------|-------------|
| Platform Admin | Global | Full access to all prompts |
| Platform Viewer | Global | Read-only access to all prompts |
| Tenant Admin | Tenant | Full access to tenant prompts |
| Tenant Editor | Tenant | Create/edit tenant prompts |
| Tenant Viewer | Tenant | Read-only tenant prompts |
| Agent Developer | Module | Prompts for assigned modules |
| AI Reviewer | Tenant | Review/approve prompt changes |

| Permission | Description | Roles |
|------------|-------------|-------|
| prompt:create | Create new prompts | Platform Admin, Tenant Admin, Tenant Editor |
| prompt:read | View prompt content | All |
| prompt:update | Modify existing prompts | Platform Admin, Tenant Admin, Tenant Editor |
| prompt:delete | Remove prompts | Platform Admin, Tenant Admin |
| prompt:publish | Promote to production | Platform Admin, Tenant Admin, AI Reviewer |
| prompt:execute | Use prompt in runtime | All (scope-limited) |
| experiment:create | Create A/B tests | Platform Admin, Tenant Admin |
| experiment:manage | Start/stop experiments | Platform Admin, Tenant Admin |

### 2. Define Tenant Admin Capabilities

Specify tenant administrator powers:

| Capability | Description | Override by Platform |
|------------|-------------|---------------------|
| User Management | Add/remove users, assign roles | YES |
| Prompt Ownership | Assign prompt ownership | NO |
| Collection Management | Create/organize collections | NO |
| Experiment Control | Run A/B tests | YES |
| API Key Management | Create/revoke API keys | YES |
| Audit Access | View tenant audit logs | YES |

| Tenant Setting | Controlled By | Default |
|----------------|---------------|---------|
| require_approval | Tenant Admin | true |
| allow_experiments | Platform Admin | true |
| max_prompts | Platform Admin | tier-based |
| allow_sharing | Platform Admin | true |

### 3. Define Platform Admin Overrides

Establish platform-level controls:

| Override Type | Trigger | Actions |
|--------------|---------|---------|
| Emergency Block | Safety violation | Disable prompt globally |
| Compliance Hold | Legal/regulatory | Freeze prompt modifications |
| Performance Quarantine | Resource abuse | Rate limit tenant |
| Security Lock | Security incident | Revoke all API keys |

| Admin Action | Audit Level | Notification |
|--------------|-------------|--------------|
| Global disable | CRITICAL | All affected tenants |
| Tenant override | HIGH | Tenant admin |
| Permission change | MEDIUM | Affected users |
| Config update | LOW | System log only |

### 4. Define API Key Scoping

Establish API key access model:

| Key Type | Scope | Capabilities |
|----------|-------|--------------|
| Platform Key | Global | All operations |
| Tenant Key | Tenant | Tenant operations only |
| Agent Key | Module | Execute assigned prompts |
| Read-Only Key | Configurable | Read operations only |

| Key Field | Description | Required |
|-----------|-------------|----------|
| key_id | Unique identifier | YES |
| key_hash | Hashed key value | YES |
| tenant_id | Owning tenant | YES |
| scope | Permission scope | YES |
| rate_limit | Requests per minute | YES |
| expires_at | Expiration timestamp | NO |
| allowed_prompts | Whitelist of prompt IDs | NO |
| ip_allowlist | Allowed IP ranges | NO |

### 5. Define Audit Logging

Establish comprehensive audit trail:

| Log Category | Events | Retention |
|-------------|--------|-----------|
| Authentication | Login, logout, key use | 1 year |
| Authorization | Permission checks, denials | 1 year |
| Data Access | Prompt read, execute | 90 days |
| Data Modification | Create, update, delete | Indefinite |
| Admin Actions | Role changes, overrides | Indefinite |
| Security Events | Violations, blocks | Indefinite |

| Audit Field | Description | Required |
|------------|-------------|----------|
| event_id | Unique identifier | YES |
| timestamp | Event time (UTC) | YES |
| actor_type | user/api_key/system | YES |
| actor_id | Identifier of actor | YES |
| tenant_id | Context tenant | YES |
| action | Action performed | YES |
| resource_type | prompt/experiment/etc | YES |
| resource_id | Target resource | YES |
| outcome | success/failure | YES |
| details | Additional context | NO |

**Verify current best practices with web search:**
Search the web: "RBAC best practices AI platform security {date}"
Search the web: "API key management multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the access control design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into security edge cases and compliance
- **P (Party Mode)**: Bring security and compliance perspectives
- **C (Continue)**: Accept access control and proceed to documentation
- **[Specific refinements]**: Describe access control concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: RBAC model, API key scoping, audit logging
- Process enhanced insights on security completeness
- Ask user: "Accept these refined access control decisions? (y/n)"
- If yes, integrate into access control specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review access control design for prompt catalog"
- Process security and compliance perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save access control design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]`
- Proceed to next step: `step-09-c-documentation.md`

---

## Verification

- [ ] Role-based permissions comprehensive
- [ ] Tenant admin capabilities defined
- [ ] Platform admin overrides documented
- [ ] API key scoping established
- [ ] Audit logging requirements specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Access control specification
- RBAC model documentation
- API key management guidelines
- Audit logging requirements

---

## Next Step

Proceed to `step-09-c-documentation.md` to create documentation standards.
