# Step 3: Configure Log Context

Define tenant-aware logging configuration:

## Structured Log Format

```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "level": "info",
  "message": "Agent invocation completed",
  "tenant": {
    "id": "tenant_abc123",
    "slug": "acme-corp",
    "tier": "PRO"
  },
  "request": {
    "id": "req_xyz789",
    "user_id": "user_456",
    "session_id": "sess_012"
  },
  "context": {
    "agent_id": "agent_def",
    "conversation_id": "conv_ghi",
    "module": "ai-runtime"
  },
  "metrics": {
    "duration_ms": 1234,
    "tokens_used": 500
  }
}
```

## Log Context Injection

```python
# Middleware pattern for automatic context injection
class TenantLoggingMiddleware:
    def inject_context(self, log_record):
        tenant_ctx = get_current_tenant_context()
        log_record["tenant"] = {
            "id": tenant_ctx.tenant_id,
            "slug": tenant_ctx.tenant_slug,
            "tier": tenant_ctx.tenant_tier
        }
        log_record["request"] = {
            "id": get_request_id(),
            "user_id": get_current_user_id(),
            "session_id": get_session_id()
        }
```

## Log Levels by Context

| Context | Debug | Info | Warn | Error |
|---------|-------|------|------|-------|
| Development | All | All | All | All |
| Production (Platform) | Off | All | All | All |
| Production (Tenant) | Off | Sampled | All | All |

## Tenant Log Isolation

```yaml
log_routing:
  # All logs tagged with tenant_id
  default:
    labels:
      - tenant_id
      - tenant_tier
      - module
      
  # Tenant-specific log streams (Loki)
  tenant_streams:
    selector: '{tenant_id=~".+"}'
    
  # Access control
  tenant_access:
    rule: "Tenant users can only query logs with their tenant_id"
    implementation: "Loki multi-tenancy or query rewriting"
```

## Sensitive Data Handling

| Field Type | Handling | Example |
|------------|----------|---------|
| PII | Redact or hash | email -> "***@domain.com" |
| Secrets | Never log | API keys, tokens |
| Tenant data | Log with tenant_id | Business data |
| User input | Truncate + sanitize | Conversation text |

```yaml
sensitive_fields:
  redact:
    - password
    - api_key
    - secret
    - token
    - credit_card
  hash:
    - email
    - phone
  truncate:
    - user_message (max 500 chars)
    - agent_response (max 1000 chars)
```

## Log Retention by Tier

| Tier | Retention | Query Access |
|------|-----------|--------------|
| FREE | 7 days | Last 24 hours |
| PRO | 30 days | Full retention |
| ENTERPRISE | 90 days (or custom) | Full retention |

## Audit Log Requirements

Audit logs are separate from operational logs:

```yaml
audit_events:
  - user_login
  - user_logout
  - permission_change
  - data_export
  - data_delete
  - api_key_created
  - agent_created
  - settings_changed
  
audit_retention: 7_years  # Regulatory requirement
audit_immutability: true  # Cannot be modified or deleted
```
