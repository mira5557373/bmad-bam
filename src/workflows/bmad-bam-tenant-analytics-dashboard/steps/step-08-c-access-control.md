# Step 8: Access Control

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- READ **CRITICAL: ALWAYS read the complete step file** before taking any action
- LOAD **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- FOCUS **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- NOTES Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array
- SEARCH Use web search to verify current best practices when making technology decisions
- REFERENCE Reference pattern registry `web_queries` for search topics


---

## Purpose

Define access control for analytics dashboards including role-based access, data-level security, and audit requirements.

---

## Prerequisites

- Export capabilities defined (Step 7)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security,rbac

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define access control for tenant analytics:

## Role Hierarchy

```
Platform Roles
├── Platform Admin (full access)
├── Platform Analyst (anonymized cross-tenant)
├── Support Engineer (read-only per-tenant)
└── Security Auditor (audit logs only)

Tenant Roles
├── Tenant Admin (full tenant access)
├── Analytics Admin (dashboards + exports)
├── Report Viewer (view only)
└── Custom Roles (configurable)
```

## Role-Based Access Control Matrix

| Permission | Platform Admin | Platform Analyst | Tenant Admin | Analytics Admin | Report Viewer |
|------------|----------------|------------------|--------------|-----------------|---------------|
| View platform dashboards | Yes | Yes | No | No | No |
| View tenant dashboards | All | Anonymized | Own | Own | Own |
| Create dashboards | Yes | No | Yes | Yes | No |
| Edit dashboards | Yes | No | Yes | Yes | No |
| Export data | Yes | Aggregated | Yes | Yes | No |
| Schedule reports | Yes | No | Yes | Yes | No |
| Manage access | Yes | No | Yes | No | No |
| View audit logs | Yes | No | Yes | No | No |

## Permission Definitions

```yaml
permissions:
  # Dashboard permissions
  dashboard:
    - dashboard:view
    - dashboard:create
    - dashboard:edit
    - dashboard:delete
    - dashboard:share
    
  # Data permissions
  data:
    - data:view:own_tenant
    - data:view:all_tenants
    - data:view:anonymized
    - data:export
    - data:export:raw
    
  # Report permissions
  report:
    - report:view
    - report:schedule
    - report:manage
    
  # Admin permissions
  admin:
    - admin:manage_roles
    - admin:view_audit
    - admin:manage_data_sources
```

## Row-Level Security

```yaml
row_level_security:
  # Tenant isolation
  tenant_policy:
    name: tenant_data_access
    predicate: "tenant_id = current_user_tenant_id()"
    applies_to: all_tenant_tables
    
  # User-level filtering
  user_policy:
    name: user_data_access
    predicate: |
      user_id = current_user_id() OR
      current_user_role() IN ('tenant_admin', 'analytics_admin')
    applies_to: user_activity_tables
    
  # Time-based access
  time_policy:
    name: data_retention_access
    predicate: |
      event_timestamp > now() - tier_retention_limit()
    applies_to: historical_tables
```

## Dashboard Sharing

```yaml
dashboard_sharing:
  # Share modes
  modes:
    - private: creator_only
    - team: specific_users
    - tenant: all_tenant_users
    - public_link: anonymous_with_link
    
  # Public link controls
  public_links:
    enabled: enterprise_tier_only
    require_password: optional
    expiration: required
    max_duration: 30_days
    audit_access: true
    
  # Embed support
  embed:
    enabled: true
    authentication: signed_token
    allowed_domains: tenant_configured
    token_expiry: 1_hour
```

## Authentication Integration

```yaml
authentication:
  # Supported methods
  methods:
    - session_cookie
    - jwt_token
    - api_key
    
  # JWT claims required
  jwt_claims:
    - sub: user_id
    - tenant_id: required
    - roles: required
    - permissions: optional
    
  # Session management
  session:
    timeout_idle: 30_minutes
    timeout_absolute: 8_hours
    refresh_enabled: true
    
  # API key access
  api_keys:
    scopes: read_only
    rate_limit: 1000_per_minute
    audit_logged: true
```

## Audit Logging

```yaml
audit_logging:
  # Events to log
  events:
    - dashboard_viewed
    - dashboard_created
    - dashboard_edited
    - dashboard_deleted
    - dashboard_shared
    - data_exported
    - report_generated
    - permission_changed
    - login_success
    - login_failure
    
  # Log fields
  fields:
    - timestamp
    - user_id
    - tenant_id
    - action
    - resource_id
    - resource_type
    - ip_address
    - user_agent
    - result
    - metadata
    
  # Retention
  retention:
    default: 2_years
    security_events: 7_years
```

## Access Control Enforcement

| Layer | Enforcement | Mechanism |
|-------|-------------|-----------|
| API Gateway | Authentication | JWT validation |
| Application | Authorization | RBAC checks |
| Query Layer | Data filtering | RLS policies |
| Cache | Tenant scoping | Cache key prefix |
| Export | Permission check | Pre-export validation |

**Verify current best practices with web search:**
Search the web: "analytics dashboard access control best practices {date}"
Search the web: "row level security analytics multi-tenant {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After defining access control, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific permissions or RLS policies
- **P (Party Mode)**: Bring security architect and compliance perspectives on access control
- **C (Continue)**: Accept access control and proceed to documentation
- **[Specific refinements]**: Describe additional access control requirements

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: RBAC matrix, RLS policies, audit logging
- Process enhanced insights on access control
- Ask user: "Accept this detailed access control analysis? (y/n)"
- If yes, integrate into access control specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review access control for tenant analytics dashboards"
- Process security architect and compliance perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save access control specification to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]`
- Proceed to next step: `step-09-c-documentation.md`

---

## Verification

- [ ] Role hierarchy defined
- [ ] RBAC matrix documented
- [ ] Permission definitions complete
- [ ] Row-level security configured
- [ ] Dashboard sharing rules established
- [ ] Authentication integration specified
- [ ] Audit logging requirements documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Access control specification
- RBAC matrix document
- Audit logging configuration

---

## Next Step

Proceed to `step-09-c-documentation.md` to generate final documentation.
