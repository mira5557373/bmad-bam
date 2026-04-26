# Step 03: Design Tenant Context Propagation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER generate content without user input - Wait for explicit direction
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 ALWAYS pause after presenting findings and await user direction
- 💬 Focus ONLY on current step scope - do not look ahead
- ✅ ALWAYS treat this as collaborative discovery
- 📋 YOU ARE A FACILITATOR guiding context propagation design

## EXECUTION PROTOCOLS

- 🌐 Use web search to verify current best practices when making technology decisions
- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📖 Track progress in `stepsCompleted` array
- ⚠️ Present A/P/C menu after presenting recommendations
- 🚫 FORBIDDEN to load next step until user selects Continue

---

## Purpose

Design how tenant identity flows through the system - from request entry to database query.

---

## CONTEXT BOUNDARIES

**From Step 01:** Requirements gathered, config variables loaded (`{tenant_model}`, `{ai_runtime}`)
**From Step 02:** Isolation dimensions identified, tenant model pattern selected

---

## Prerequisites

- Step 02 complete with isolation pattern selected
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv` -> filter: `{tenant_model}`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `context-propagation`

---

## YOUR TASK

Design complete tenant context propagation: TenantContext structure, propagation mechanisms, isolation mapping, and cross-service flow.

---

## Context Propagation Flow

```
Request -> API Gateway (extract tenant from subdomain/header)
        -> Auth Middleware (validate JWT, extract tenant_id claim)
        -> TenantContext Init (create immutable context)
        -> Service Layer (access via DI)
        -> Repository (apply to queries)
        -> Database (SET LOCAL / schema switch / connection routing)
```

---

## Actions

### 1. Design TenantContext Structure

Define immutable tenant context type:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `tenant_id` | UUID string | Yes | Immutable after init |
| `tenant_tier` | FREE/PRO/ENTERPRISE | Yes | Determines limits |
| `user_id` | string | Yes | Current user |
| `roles` | string[] | Yes | User roles |
| `request_id` | string | Yes | Correlation ID |
| `timestamp` | datetime | Yes | Request time |

### 2. Define Propagation Mechanisms

| Entry Point | Mechanism | Validation |
|-------------|-----------|------------|
| JWT | Extract claims (tenant_id, tier, sub, roles) | Signature + expiry |
| Subdomain | `{tenant}.api.example.com` | Tenant exists |
| Header | X-Tenant-ID, X-Tenant-Signature | HMAC-SHA256 verify |

**Middleware Order:**
1. authenticate_request
2. extract_tenant_claims
3. validate_tenant_exists
4. initialize_tenant_context
5. set_request_scope

### 3. Map Context to Each Isolation Dimension

| Dimension | Mechanism | Application |
|-----------|-----------|-------------|
| Data (RLS) | `SET LOCAL app.tenant_id = '{tenant_id}'` | Per request |
| Data (Schema) | `SET search_path TO tenant_{id}, shared` | Per request |
| Data (DB) | Connection pool routing by tenant_id | Per connection |
| Cache | Key prefix `tenant:{tenant_id}:` | All cache ops |
| Storage | Path prefix `/{tenant_id}/` | All file ops |
| Queues | Queue naming `queue_{tenant_id}_{type}` | Per task |

### 4. Design Cross-Service Propagation

**Synchronous (HTTP/gRPC):**
- Required headers: X-Tenant-ID, X-Tenant-Tier, X-Request-ID, X-Tenant-Signature
- gRPC: tenant_context_interceptor for metadata propagation

**Asynchronous (Messages):**
- Message envelope with metadata: tenant_id, tenant_tier, correlation_id
- Worker restoration: extract -> validate -> init context -> process

**Event Streaming:**
- Partition key: tenant_id (ensures ordering)
- Event headers: tenant_id, event_type, correlation_id

### 5. Security Requirements

| Requirement | Implementation |
|-------------|----------------|
| Immutability | Context frozen after initialization |
| Boundary enforcement | Cross-tenant access forbidden |
| Tampering detection | Signature verification on headers |
| Audit logging | Log tenant_id, user_id, action, timestamp |

---

**Verify current best practices with web search:**
Search the web: "multi-tenant context propagation patterns {date}"
Search the web: "JWT tenant claims best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

Present to user after completing design:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into context propagation edge cases
- **P (Party Mode)**: Analyst/architect review of security and performance
- **C (Continue)**: Accept design and proceed to documentation
- **[Specific refinements]**: Describe what to explore further
```

**If 'A':** Invoke `bmad-advanced-elicitation`, explore context restoration failures
**If 'P':** Invoke `bmad-party-mode`, focus on security and failure modes
**If 'C':** Save design, update `stepsCompleted: [1, 2, 3]`, proceed to step-04

---

## SUCCESS METRICS

:white_check_mark: TenantContext structure defined with all required fields
:white_check_mark: Propagation mechanisms cover JWT, subdomain, headers
:white_check_mark: All isolation dimensions mapped to context
:white_check_mark: Cross-service propagation covers sync and async
:white_check_mark: Security requirements specified

---

## FAILURE MODES

:x: Missing tenant_id - Downstream queries bypass isolation
:x: Mutable context - Tenant spoofing vulnerability
:x: Incomplete propagation - Async workers lack context
:x: No signature verification - Forged headers accepted

---

## Verification

- [ ] TenantContext structure is immutable and complete
- [ ] All entry points covered (JWT, subdomain, header)
- [ ] Middleware order prevents bypass
- [ ] Each isolation dimension has context mapping
- [ ] Cross-service propagation documented
- [ ] Patterns align with pattern registry

---

## Next Step

Proceed to `step-04-c-document.md` to generate the formal tenant isolation design document.
