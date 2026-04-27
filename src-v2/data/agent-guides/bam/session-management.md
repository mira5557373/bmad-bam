# Tenant Session Management Patterns

**When to load:** When designing session handling, session isolation, or when user mentions session tokens, session storage, or authentication state.

**Integrates with:** Architect (Atlas persona), Dev agent, Security architect

---

## Core Concepts

### What is Tenant Session Management?

Tenant session management handles user authentication state in a multi-tenant context, ensuring sessions are properly scoped and isolated between tenants.

### Session Strategy Comparison

| Strategy | Description | Tenant Isolation |
|----------|-------------|------------------|
| Scoped Sessions | Tenant in session data | Logical |
| Session-Per-Tenant | Separate session stores | Physical |
| Shared Store | Common store with tenant key | Logical |

---

## Key Patterns

### Pattern 1: Tenant-Scoped Session Token

Include tenant context in session.

| Component | Description | Implementation |
|-----------|-------------|----------------|
| Token Generation | Create session with tenant | Include tenant_id |
| Token Validation | Verify tenant match | Check on every request |
| Session Data | Tenant-scoped storage | tenant_id prefix |
| Cross-Tenant Prevention | Block tenant switching | Validate consistency |

### Session Token Structure

```
┌─────────────────────────────────────────┐
│           Session Token                  │
│                                          │
│  {                                       │
│    "session_id": "sess_abc123",         │
│    "tenant_id": "tenant_xyz",           │
│    "user_id": "user_456",               │
│    "created_at": "2026-04-09T10:00:00Z",│
│    "expires_at": "2026-04-09T22:00:00Z" │
│  }                                       │
│                                          │
│  Tenant context is always validated     │
└─────────────────────────────────────────┘
```

### Pattern 2: Session Store Isolation

Separate session storage by tenant.

| Component | Description | Tenant Consideration |
|-----------|-------------|---------------------|
| Store Key | Tenant-prefixed keys | `{tenant}:session:{id}` |
| Namespace | Logical separation | Per-tenant namespace |
| Dedicated Store | Physical separation | Enterprise tier |
| Encryption | Per-tenant keys | Session data encryption |

### Store Architecture

```
┌─────────────────────────────────────────┐
│           Session Store                  │
│                                          │
│  Key                     │ Value        │
│  ─────────────────────────┼─────────────│
│  tenant_a:session:s123   │ {user, ...} │
│  tenant_a:session:s456   │ {user, ...} │
│  tenant_b:session:s789   │ {user, ...} │
│                                          │
│  Tenant prefix ensures isolation         │
└─────────────────────────────────────────┘
```

### Pattern 3: Session Lifecycle

Manage session creation to termination.

| Phase | Action | Tenant Consideration |
|-------|--------|---------------------|
| Create | Generate session | Set tenant context |
| Validate | Check session | Verify tenant match |
| Refresh | Extend session | Maintain tenant context |
| Revoke | End session | Tenant-scoped cleanup |
| Audit | Log activity | Tenant audit trail |

### Lifecycle Flow

```
Login Request
     │
     ├── Authenticate user
     │
     ├── Identify tenant
     │
     ├── Create session (tenant-scoped)
     │
     └── Return session token
           │
           v
     Subsequent Requests
           │
           ├── Validate token
           │
           ├── Verify tenant consistency
           │
           └── Authorize action
```

### Pattern 4: Cross-Device Session

Handle sessions across multiple devices.

| Strategy | Description | Tenant Consideration |
|----------|-------------|---------------------|
| Single Session | One active session | Per tenant-user |
| Multi-Session | Multiple concurrent | Limit per tenant |
| Device Binding | Session per device | Device + tenant |
| Session Listing | View all sessions | Tenant-scoped view |

---

## Application Guidelines

When implementing session management:

1. **Always include tenant_id** - In session data and tokens
2. **Validate on every request** - Check tenant consistency
3. **Set appropriate timeouts** - Per-tier configuration
4. **Enable session revocation** - For security events
5. **Audit session activity** - Compliance requirements

---

## Per-Tier Session Configuration

| Tier | Session Timeout | Max Sessions | Refresh |
|------|-----------------|--------------|---------|
| Free | 2 hours | 2 devices | No |
| Pro | 12 hours | 5 devices | Yes |
| Enterprise | 24 hours | Unlimited | Yes |

---

## Session Security

| Concern | Mitigation | Implementation |
|---------|------------|----------------|
| Session Hijacking | Secure token | HTTPS, HttpOnly |
| Cross-Tenant Access | Tenant validation | Check on every request |
| Session Fixation | Regenerate on auth | New token post-login |
| Stale Sessions | Timeout and cleanup | TTL + job |

---

## Session Storage Options

| Store | Performance | Persistence | Use Case |
|-------|-------------|-------------|----------|
| Redis | Excellent | Optional | Most cases |
| Database | Good | Yes | Compliance |
| Memory | Best | No | Development |
| JWT (stateless) | N/A | N/A | Simple auth |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Missing tenant in session | Cross-tenant access | Always include tenant_id |
| No tenant validation | Security vulnerability | Validate every request |
| Shared session keys | Data leakage | Tenant-prefixed keys |
| No session timeout | Security risk | Configure TTL |
| No audit logging | Compliance gaps | Log session events |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Stateful vs stateless? | Stateful (Redis) for features; JWT for simplicity | Stateful enables revocation; JWT reduces storage |
| Session timeout? | Based on security requirements and UX | Balance security vs user convenience |
| Multi-device support? | Yes, with limits per tier | Modern user expectation |
| Session encryption? | Yes, especially for compliance | Protect session data at rest |

---

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Configure session isolation
- `bmad-bam-security-review` - Session security review
- `bmad-bam-compliance-design` - Session compliance requirements

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Session management:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `session-management`
- **Tenant isolation:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Compliance:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant session management {date}"
- Search: "session isolation SaaS {date}"
- Search: "secure session handling patterns {date}"
