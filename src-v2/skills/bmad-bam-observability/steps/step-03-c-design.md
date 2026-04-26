# Step 03: Design Logging Strategy

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Structured logging with tenant_id injection, log aggregation, retention by tier, PII handling
- 💾 Track: `stepsCompleted: [1, 2, 3]` when complete
- 📖 Context: Tenant dimensions from Step 01, metrics patterns from Step 02
- 🚫 Do NOT: Design tracing yet - that comes in Step 04
- 🔍 Use web search: Verify structured logging and tenant isolation patterns
- ⚠️ Gate: QG-OC (Observability Completeness)

---

## Purpose

Design tenant-aware logging strategy covering structured logging with tenant_id injection, log aggregation with tenant filtering, tier-based retention policies, and PII handling rules for compliance.

---

## Prerequisites

- Step 02 complete: Metrics collection designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `observability`, `tenant-isolation`

---

## Inputs

- Tenant dimension catalog from Step 01
- Metrics specification from Step 02
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Compliance requirements (GDPR, SOC2, HIPAA if applicable)

---

## Actions

### 1. Define Structured Log Format

Design JSON log format with tenant context:

```yaml
log_format:
  # Standard fields (always present)
  required:
    timestamp: "ISO8601 format with timezone"
    level: "enum: DEBUG, INFO, WARN, ERROR, FATAL"
    message: "Human-readable log message"
    service: "Service name producing the log"
    version: "Service version"
    
  # Tenant context (auto-injected)
  tenant:
    tenant.id: "Unique tenant identifier"
    tenant.slug: "Human-readable tenant name"
    tenant.tier: "FREE | PRO | ENTERPRISE"
    tenant.region: "Data residency region (if applicable)"
    
  # Request context (per-request)
  request:
    request.id: "Unique request identifier (trace correlation)"
    request.user_id: "User identifier (hashed for FREE tier)"
    request.session_id: "Session identifier"
    request.ip: "Anonymized IP address"
    
  # Error context (when applicable)
  error:
    error.type: "Exception class name"
    error.message: "Error message (sanitized)"
    error.stack: "Stack trace (DEBUG only)"
```

### 2. Design Tenant Context Injection

Configure middleware for automatic tenant context:

```yaml
context_injection:
  # Middleware injects tenant context from TenantContext
  auto_inject:
    source: "TenantContext (from JWT/session)"
    fields:
      - tenant.id
      - tenant.slug
      - tenant.tier
      - tenant.region
    fallback: "Log warning if tenant context missing"
    
  # Request context from headers/session
  request_extract:
    - field: request.id
      source: "X-Request-ID header or generate UUID"
    - field: request.user_id
      source: "JWT sub claim"
      transform: "Hash for FREE tier"
    - field: request.session_id
      source: "Session cookie or X-Session-ID header"
      
  # Runtime context from execution
  runtime_derive:
    - field: agent.id
      source: "Agent execution context"
    - field: conversation.id
      source: "Conversation state"
```

### 3. Configure Log Aggregation with Tenant Filtering

Design tenant-isolated log aggregation:

```yaml
log_aggregation:
  # Backend: Loki (recommended for multi-tenant)
  backend: "Grafana Loki"
  
  # Label extraction for efficient querying
  labels:
    static:
      - service
      - environment
      - region
    dynamic:
      - tenant_id  # Primary tenant filter
      - tenant_tier
      - level
      
  # Stream selectors for tenant isolation
  streams:
    platform_logs:
      selector: '{service=~".+"}'
      access: "Platform operators only"
    tenant_logs:
      selector: '{tenant_id="$tenant_id"}'
      access: "Tenant users see only their logs"
      
  # Query restrictions
  query_enforcement:
    tenant_users:
      required_filter: 'tenant_id="$current_user_tenant_id"'
      max_query_range: "7d (FREE), 30d (PRO), 90d (ENTERPRISE)"
    platform_operators:
      required_filter: null
      max_query_range: "365d"
```

### 4. Define Retention Policies by Tier

Configure tier-based log retention:

| Tier | Hot Storage | Warm Storage | Cold Storage | Total Retention |
|------|-------------|--------------|--------------|-----------------|
| FREE | 24 hours | 7 days | None | 7 days |
| PRO | 7 days | 30 days | 90 days archive | 90 days |
| ENTERPRISE | 30 days | 90 days | 1 year archive | 1 year |

```yaml
retention_policies:
  free_tier:
    hot_retention: "24h"
    warm_retention: "7d"
    archive: false
    log_level_filter: "INFO and above only"
    
  pro_tier:
    hot_retention: "7d"
    warm_retention: "30d"
    archive: true
    archive_retention: "90d"
    log_level_filter: "DEBUG and above"
    
  enterprise_tier:
    hot_retention: "30d"
    warm_retention: "90d"
    archive: true
    archive_retention: "1y"
    log_level_filter: "All levels"
    compliance_archive: "7y (audit logs only)"
```

### 5. Define PII Handling Rules

Configure sensitive data handling:

```yaml
pii_handling:
  # Fields to redact
  redact:
    - pattern: "email addresses"
      action: "Replace with hash: email_[hash]"
    - pattern: "phone numbers"
      action: "Replace with masked: ***-***-XXXX"
    - pattern: "SSN/national IDs"
      action: "Never log"
      
  # Fields to hash
  hash:
    - field: "user_id"
      condition: "FREE tier only"
      algorithm: "SHA-256 (first 12 chars)"
    - field: "IP address"
      action: "Anonymize last octet"
      
  # Fields to never log
  blocklist:
    - "password"
    - "api_key"
    - "credit_card"
    - "auth_token"
    - "secret"
    
  # Audit trail (separate from operational logs)
  audit_logs:
    events:
      - "user.login"
      - "user.logout"
      - "tenant.settings_changed"
      - "data.exported"
      - "data.deleted"
    retention: "7 years (regulatory)"
    immutable: true
```

### 6. Define Log Level Configuration

```yaml
log_levels:
  # By environment
  environments:
    development:
      default: DEBUG
      tenant_sampling: 100%
    staging:
      default: DEBUG
      tenant_sampling: 100%
    production:
      default: INFO
      tenant_sampling: "10% DEBUG, 100% INFO+"
      
  # Dynamic per-tenant override
  tenant_override:
    enabled: true
    duration: "Max 1 hour"
    approval_required: "Enterprise tier only"
    audit_logged: true
```

**Verify current best practices with web search:**
Search the web: "structured logging multi-tenant SaaS best practices {date}"
Search the web: "PII handling logs GDPR compliance {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After designing logging strategy, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into PII handling, retention policies, or log aggregation
- **P (Party Mode)**: Bring security architect and compliance perspectives on logging design
- **C (Continue)**: Accept logging strategy and proceed to distributed tracing
- **[Specific refinements]**: Describe specific logging aspects to refine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: log format, PII handling, retention policies, tenant isolation
- Process enhanced insights on logging strategy
- Ask user: "Accept this detailed logging analysis? (y/n)"
- If yes, integrate into logging specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review logging strategy for tenant-aware observability"
- Process security architect and compliance perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save logging specification to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-document.md`

---

## Verification

- [ ] Structured log format defined with tenant fields
- [ ] Context injection mechanism designed
- [ ] Log aggregation configured with tenant filtering
- [ ] Retention policies defined per tier
- [ ] PII handling rules documented
- [ ] Audit log requirements specified
- [ ] Log level configuration complete
- [ ] Patterns align with pattern registry

---

## Outputs

- Log format specification
- Context injection design
- Retention policy configuration
- PII handling rules
- **Load template:** `{project-root}/_bmad/bam/data/templates/logging-spec.md`

---

## Next Step

Proceed to `step-04-c-document.md` to design distributed tracing.
