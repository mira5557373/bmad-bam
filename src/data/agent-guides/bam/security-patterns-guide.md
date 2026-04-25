# BAM Security Patterns Guide

**When to load:** During security architecture design, authentication/authorization implementation, encryption design, API key management, AI security hardening, or threat modeling for multi-tenant SaaS platforms.
**Integrates with:** Architect (Winston/Atlas), Security agents, Dev (James), DevOps agents, TEA agents

---

## Core Concepts

Multi-tenant security requires defense in depth across all architectural layers. A single gap in any layer can result in cross-tenant data leakage.

### Key Principles

| Principle | Description |
|-----------|-------------|
| Defense in Depth | Multiple isolation controls at each layer |
| Least Privilege | Minimum access required for each role |
| Never Trust Client | Extract tenant_id from authenticated session, never request params |
| Fail-Safe Default | Missing tenant context should deny access, not grant it |
| Audit Everything | Log all cross-tenant access and admin operations |

### The 7 Dimensions of Security

| Dimension | What to Secure | Strategy |
|-----------|----------------|----------|
| **Authentication** | User/system identity | JWT with tenant claims, mTLS |
| **Authorization** | Resource access | RBAC/ABAC with tenant scope |
| **Encryption** | Data at rest/transit | Per-tenant keys, TLS 1.3 |
| **Secrets** | API keys, credentials | Vault with tenant namespaces |
| **Network** | Traffic boundaries | Zero trust, micro-segmentation |
| **AI/Agents** | Model access, prompts | Guardrails, kill switches, TBAC |
| **Compliance** | Regulatory requirements | Automated evidence collection |

### Multi-Tenant Threat Model

| Threat Category | Single-Tenant Risk | Multi-Tenant Risk |
|-----------------|-------------------|-------------------|
| Data Exposure | Internal breach | Cross-tenant leakage |
| Privilege Escalation | Admin access | Tenant boundary bypass |
| Resource Abuse | Self-inflicted | Noisy neighbor / DoS |
| Injection Attacks | Application data | Tenant context manipulation |
| AI Memory Leakage | Context pollution | Cross-tenant knowledge bleed |

### Security Layers Matrix

| Layer | Control | Verification Method |
|-------|---------|---------------------|
| Database | RLS policies | Cross-tenant query test |
| API | Auth middleware | Token scope validation |
| Network | NetworkPolicy | Port scan + traffic analysis |
| Secrets | Vault namespaces | Access audit logs |
| Files | Bucket policies | Cross-tenant access test |
| Events | Topic ACLs | Subscription attempt test |
| AI Memory | Tenant scoping | Memory leak test |

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and MUST be followed exactly.

### Tenant Header

```
X-Tenant-ID: {tenant_uuid}
```

All inter-service communication MUST include the `X-Tenant-ID` header.

### Secret Path Format

```
Pattern: {tenant_id}/{service}/{secret_type}/{name}

Examples:
- tenant_abc123/billing/api_key/stripe
- tenant_abc123/ai/model_key/openai
- tenant_abc123/db/credentials/primary
```

### Permission Format

```
Pattern: {domain}:{resource}:{action}

Examples:
- billing:invoices:read
- agents:config:admin
- api:keys:rotate
- users:profile:write
```

### Runtime Context Access

```typescript
// Always use SET LOCAL for PostgreSQL context
await db.query("SET LOCAL app.current_tenant = $1", [ctx.tenantId]);

// Flask/FastAPI pattern
tenant_id = app.current_tenant  // Request-scoped
```

### Quality Gate IDs

| Gate | Purpose |
|------|---------|
| QG-S1 | Authentication verification |
| QG-S2 | Authorization patterns verified |
| QG-S3 | Encryption at rest confirmed |
| QG-S4 | Encryption in transit confirmed |
| QG-S5 | Secrets management verified |
| QG-S6 | API key lifecycle verified |
| QG-S7 | Network isolation confirmed |
| QG-S8 | AI security controls verified |
| QG-S9 | Compliance evidence automated |
| QG-S10 | Penetration testing complete |

---

## Decision Framework

### Quick Decision Matrix

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| API authentication | JWT with tenant_id claim | Stateless, scalable, carries context |
| Per-tenant encryption | Yes, KMS-managed keys | Secure deletion, compliance |
| Cross-tenant admin ops | MFA + audit + approval | High-risk needs elevated controls |
| Security monitoring tier | Basic for Free, SIEM for Enterprise | Balance cost with requirements |
| API rate limiting | Per-tenant quotas | Prevent noisy neighbor |
| Simple tenant auth | RBAC with tenant scope | Easier audit and management |
| Complex contextual rules | ABAC with tenant policies | Dynamic, fine-grained control |

### Decision Tree

```
START: What security control?
│
├─► Authentication
│   └─► API or Web?
│       ├─► API → JWT with tenant claim
│       └─► Web → OIDC/SAML per tenant IdP
│
├─► Authorization
│   └─► Simple or Complex?
│       ├─► Simple → Tenant-Scoped RBAC
│       └─► Complex → Hybrid RBAC+ABAC
│
├─► Encryption
│   └─► Compliance required?
│       ├─► HIPAA/FedRAMP → Per-tenant CMK
│       └─► Standard → Per-tenant platform keys
│
└─► AI Security
    └─► Agent autonomy?
        ├─► Low → Guardrails only
        └─► High → TBAC + Approval workflows
```

---

## §rbac

### Pattern: Role-Based Access Control

**When to use:** Simple permission models, audit-friendly access control
**Phase:** foundation

#### Overview

RBAC assigns permissions to roles, and users inherit permissions through role membership. In multi-tenant systems, roles exist at both platform and tenant levels.

#### Role Scopes

| Scope | Example Roles | Permission Assignment |
|-------|---------------|----------------------|
| Platform | SuperAdmin, Support, Billing | Global operations |
| Tenant | TenantAdmin, Manager, User | Tenant-scoped operations |
| Resource | ProjectOwner, Viewer | Resource-specific access |

#### RBAC vs ABAC Selection

| Factor | RBAC | ABAC | Hybrid |
|--------|------|------|--------|
| Simplicity | High | Low | Medium |
| Flexibility | Low | High | High |
| Audit complexity | Low | High | Medium |
| Performance | Fast | Variable | Balanced |
| Multi-tenant fit | Good | Excellent | Excellent |

#### Tenant-Scoped RBAC Implementation

| Component | Implementation | Multi-Tenant Consideration |
|-----------|---------------|---------------------------|
| Role definition | Platform + tenant-specific | Tenant can extend but not override platform roles |
| Permission assignment | Role-permission mapping | Scoped by tenant_id |
| Role hierarchy | Parent-child inheritance | Hierarchy is tenant-local |
| Default roles | Platform-defined templates | Cloned to tenant on onboarding |

#### Permission Caching

| Cache Key Pattern | TTL | Invalidation Trigger |
|-------------------|-----|---------------------|
| `perm:{tenant_id}:{user_id}` | 5 min | Role change, permission update |
| `role:{tenant_id}:{role_id}` | 15 min | Role definition change |
| `policy:{tenant_id}:{policy_id}` | 15 min | ABAC policy update |

#### Web Research

- "RBAC multi-tenant SaaS patterns {date}"
- "tenant-scoped role management best practices {date}"

---

## §abac

### Pattern: Attribute-Based Access Control

**When to use:** Complex contextual rules, data classification, time-based access
**Phase:** foundation

#### Overview

ABAC evaluates access decisions based on attributes of the subject, resource, action, and environment. This enables fine-grained, context-aware authorization.

#### Attribute Types

| Attribute Type | Examples | Use Case |
|----------------|----------|----------|
| Subject | role, department, clearance_level | User context |
| Resource | owner, classification, tenant_id | Data context |
| Action | read, write, delete, export | Operation type |
| Environment | time, location, device_type | Contextual factors |

#### ABAC Policy Structure

| Policy Element | Description | Example |
|----------------|-------------|---------|
| Subject attributes | User context | `{role: "analyst", department: "finance", tenant_id: "t123"}` |
| Resource attributes | Data context | `{classification: "confidential", owner: "u456", tenant_id: "t123"}` |
| Action | Operation | `read`, `export`, `delete` |
| Condition | Boolean expression | `subject.department == resource.department` |

#### Hybrid Authorization Flow

| Step | Check | Fail Action |
|------|-------|-------------|
| 1 | Tenant context valid | Reject (401) |
| 2 | User belongs to tenant | Reject (403) |
| 3 | RBAC permission check | Continue to ABAC |
| 4 | ABAC policy evaluation | Reject (403) if denied |
| 5 | Audit log | Log decision |

#### Use Cases for ABAC

| Scenario | ABAC Approach | Example |
|----------|---------------|---------|
| Data classification | Resource attributes | Only "public" docs accessible to viewers |
| Time-sensitive access | Environment attributes | Contractors only 9-5 weekdays |
| Cross-tenant sharing | Consent attributes | Explicit sharing agreements |
| Regulatory compliance | Policy rules | HIPAA minimum necessary |

#### Web Research

- "ABAC policy engine multi-tenant {date}"
- "attribute-based access control SaaS {date}"

---

## §encryption

### Pattern: Encryption Architecture

**When to use:** Data protection, compliance requirements (SOC2, HIPAA, PCI-DSS)
**Phase:** foundation

#### Encryption Layers

| Layer | Type | Purpose | Implementation |
|-------|------|---------|----------------|
| Transport | TLS 1.3 | In-transit | mTLS for service-to-service |
| Application | AES-256-GCM | Field-level | Sensitive fields |
| Database | TDE | At-rest | Database engine |
| Storage | Server-side | Object encryption | S3/GCS encryption |

#### Key Management Hierarchy

```
┌─────────────────────────────────────────────┐
│              Master Key (MK)                 │
│        (AWS KMS / Azure / GCP KMS)          │
└──────────────────┬──────────────────────────┘
        ┌──────────┼──────────┐
        v          v          v
   ┌────────┐ ┌────────┐ ┌────────┐
   │KEK     │ │KEK     │ │KEK     │
   │Tenant A│ │Tenant B│ │Tenant C│
   └───┬────┘ └───┬────┘ └───┬────┘
   ┌───┴───┐  ┌───┴───┐  ┌───┴───┐
   │DEK DB │  │DEK DB │  │DEK DB │
   │DEK S3 │  │DEK S3 │  │DEK S3 │
   └───────┘  └───────┘  └───────┘

MK=Master  KEK=Key Encryption  DEK=Data Encryption
```

#### Key Management Models

| Model | Ownership | Use Case |
|-------|-----------|----------|
| Shared Keys | Platform | Free tier |
| Per-Tenant Keys | Platform | Pro tier |
| Customer-Managed (CMK) | Customer | Enterprise |
| Bring Your Own Key | Customer | Hybrid |

#### Per-Tier Key Strategy

| Tier | KEK | DEK | Rotation |
|------|-----|-----|----------|
| Free | Shared | Shared | Platform-wide |
| Pro | Per-tenant | Per-tenant | Per-tenant |
| Enterprise | CMK | Per-tenant | Customer-defined |

#### Rotation Schedule

| Key Type | Frequency | Method |
|----------|-----------|--------|
| Master | Annually | Manual + audit |
| Tenant KEK | Quarterly | Automated |
| DEK | Monthly | Transparent |
| CMK | Customer-defined | Customer action |

#### Key Compromise Response

| Scenario | Action |
|----------|--------|
| DEK compromised | Rotate DEK, re-encrypt |
| KEK compromised | Rotate KEK + all DEKs |
| CMK compromised | Customer revokes |

#### Web Research

- "per-tenant encryption keys multi-tenant SaaS {date}"
- "CMK BYOK KMS multi-tenant implementation {date}"

---

## §secrets-management

### Pattern: Secrets Management

**When to use:** API keys, credentials, certificates storage
**Phase:** foundation

#### Secret Path Convention

```
Pattern: {tenant_id}/{service}/{secret_type}/{name}

Examples:
- tenant_abc123/billing/api_key/stripe_live
- tenant_abc123/ai/model_key/openai_gpt4
- tenant_abc123/db/credentials/postgres_primary
- tenant_abc123/auth/oauth/google_client
```

#### Secret Types

| Type | Rotation | Storage | Access Pattern |
|------|----------|---------|----------------|
| API Keys | 90 days | Vault | Runtime lookup |
| Credentials | 30 days | Vault | Connection pooler |
| Certificates | 365 days | Cert Manager | TLS termination |
| Tokens | Session | Memory | Request scope |

#### Vault Namespace Strategy

| Tier | Namespace | Isolation |
|------|-----------|-----------|
| Free | Shared with prefix | Logical |
| Pro | Per-tenant namespace | Logical |
| Enterprise | Dedicated mount | Physical |

#### Secret Lifecycle

| State | Description | Transitions |
|-------|-------------|-------------|
| Active | Fully functional | Rotating, Suspended, Revoked |
| Rotating | New active, old in grace | Active, Revoked |
| Suspended | Temporarily disabled | Active, Revoked |
| Revoked | Permanently disabled | Terminal |

#### Web Research

- "HashiCorp Vault multi-tenant patterns {date}"
- "secrets management SaaS best practices {date}"

---

## §api-key-security

### Pattern: API Key Security

**When to use:** External API access, machine-to-machine authentication
**Phase:** foundation

#### API Key Types

| Key Type | Scope | Use Case | Rotation |
|----------|-------|----------|----------|
| Tenant API Key | Tenant-wide | Server-to-server | 90 days |
| User API Key | User-scoped | Personal automation | User-controlled |
| Service Account | Service-to-service | Internal services | 30 days |
| Webhook Signing | Webhook verification | Event delivery | 180 days |

#### Key Format Convention

```
Prefix_Environment_TenantID_RandomBytes_Checksum

Example: pk_live_tn_abc123_k_x7Kj9mNp2Qr5_c3f8

Components:
- pk: Key type prefix (pk=production, sk=sandbox)
- live: Environment (live, test, dev)
- tn_abc123: Tenant identifier
- k_x7Kj9mNp2Qr5: Random key material (256-bit)
- c3f8: Checksum for validation
```

#### Scope Hierarchy

| Scope Level | Example | Description |
|-------------|---------|-------------|
| Resource | `users:read` | Single resource action |
| Resource group | `users:*` | All actions on resource |
| Module | `billing:*` | All billing operations |
| Full access | `*` | All operations (admin only) |

#### Tier-Based Scope Limits

| Tier | Available Scopes | Max Keys | Max Scopes/Key |
|------|------------------|----------|----------------|
| Free | `api:read`, `api:write` | 2 | 2 |
| Pro | Standard scopes | 10 | 10 |
| Enterprise | All scopes | Unlimited | Unlimited |

#### Key Validation Flow

```
API Request with Key
       │
       v
1. Extract key from header/query
       │
       v
2. Validate format (checksum)
       │
       v
3. Lookup in cache (< 1ms)
       │       │
       │       +-- Cache miss: DB lookup
       │
       v
4. Verify key state (active, not expired)
       │
       v
5. Extract tenant context
       │
       v
6. Validate scopes for endpoint
       │
       v
7. Apply rate limits
       │
       v
8. Log usage event
       │
       v
Request Proceeds
```

#### Rotation Process

```
Current Key Active
       │
       v
1. Generate new key (both keys active)
       │
       v
2. Notify tenant (email, webhook, dashboard)
       │
       v
3. Grace period begins (7 days default)
       │
       v
4. Monitor old key usage
       │
       v
5. Grace period ends
       │
       v
6. Old key revoked
       │
       v
New Key Only Active
```

#### Compromised Key Response

| Step | Timing | Action |
|------|--------|--------|
| 1 | Immediate | Revoke key (< 1 minute) |
| 2 | 5 minutes | Notify tenant admin |
| 3 | 15 minutes | Audit key usage |
| 4 | 1 hour | Impact assessment |
| 5 | 4 hours | Root cause analysis |
| 6 | 24 hours | Report to tenant |

#### Web Research

- "API key management best practices {date}"
- "API key rotation patterns SaaS {date}"

---

## §ai-security

### Pattern: AI/Agent Security

**When to use:** AI model deployment, agent orchestration, prompt security
**Phase:** solutioning

#### AI Security Domains

| Domain | Description | Controls |
|--------|-------------|----------|
| Model Security | Model protection, versioning | Access control, audit |
| Endpoint Protection | API security, rate limiting | DDoS, quotas |
| Prompt Injection | Direct, indirect, encoding | Guardrails, sanitization |
| Data Leakage | Cross-tenant, PII, prompts | Filtering, redaction |
| Access Controls | Model access, tool permissions | TBAC, tier limits |
| Inference Security | Input validation, output filtering | Scanning, monitoring |

#### Prompt Injection Categories

| Category | Attack Vector | Defense |
|----------|---------------|---------|
| Direct | "Ignore previous instructions" | System prompt hardening |
| Indirect | Malicious document content | Input sanitization |
| Encoding | Base64/Unicode payloads | Decoding + scanning |
| Multi-turn | Gradual trust escalation | Context monitoring |

#### AI Model Security Threats

| Threat | Description | Multi-Tenant Impact |
|--------|-------------|---------------------|
| Model extraction | Recreating model via queries | Cross-tenant model theft |
| Data poisoning | Corrupting training data | Shared pipeline risk |
| Adversarial inputs | Crafted misclassification | Per-tenant attack surface |
| Inference attacks | Extracting training data | PII leakage across tenants |
| Model inversion | Reconstructing inputs | Cross-tenant data exposure |

#### Multi-Tenant AI Security Layers

| Layer | Security Control | Tenant Isolation |
|-------|------------------|------------------|
| Input | Validation, sanitization | Per-tenant input filters |
| Model access | Authentication | Tenant-scoped model access |
| Inference | Rate limiting, monitoring | Per-tenant quotas |
| Output | Filtering, redaction | Tenant-specific output rules |
| Training | Data isolation | Per-tenant training data |
| Storage | Encryption | Tenant-specific keys |

#### AI Guardrails Architecture

| Control | Purpose | Implementation |
|---------|---------|----------------|
| Guardrails | Block harmful content | Input/output filters |
| Kill Switch | Emergency shutdown | Immediate response |
| Budget Limits | Prevent cost attacks | Token/spend limits |
| Rate Limiting | Prevent abuse | Per-tenant throttling |
| Output Filtering | Prevent data leakage | PII/secret redaction |

#### AI Incident Categories

| Category | Severity | Response Time |
|----------|----------|---------------|
| Data leakage (cross-tenant) | Critical | < 15 minutes |
| Prompt injection success | High | < 30 minutes |
| Model extraction confirmed | Critical | < 15 minutes |
| Training data breach | Critical | < 15 minutes |
| Model abuse (token consumption) | Medium | < 1 hour |

#### Web Research

- "LLM security best practices {date}"
- "prompt injection defense {date}"
- "AI model security multi-tenant {date}"

---

## §tbac

### Pattern: Tool-Based Access Control (TBAC)

**When to use:** AI agent tool governance, agent permissions
**Phase:** solutioning

#### Overview

Tool-Based Access Control (TBAC) governs which tools an AI agent can invoke based on agent identity, tenant context, and runtime constraints.

#### TBAC vs Traditional RBAC

| Aspect | Traditional RBAC | Agent TBAC |
|--------|------------------|------------|
| Subject | Human user | AI agent instance |
| Object | Data/resources | Tools/functions |
| Context | Static roles | Dynamic (tenant + run contract) |
| Verification | Login time | Per-invocation |
| Audit | Action logs | Full reasoning trace |

#### Agent Identity Registry

| Component | Description | Example |
|-----------|-------------|---------|
| Agent ID | Unique identifier | `agent_abc123` |
| Agent Type | Classification | `customer-support`, `data-analyst` |
| Tenant Binding | Associated tenant | `tenant_xyz789` |
| Capability Set | Authorized tools | `[read_kb, send_email]` |
| Trust Level | Authorization tier | `standard`, `elevated`, `restricted` |

#### Tool Permission Matrix

| Tool Category | Free Tier | Pro Tier | Enterprise |
|---------------|-----------|----------|------------|
| Read-only tools | All | All | All |
| Write tools | Limited | All | All + custom |
| External APIs | None | Selected | All + private |
| Admin tools | None | None | With approval |
| Custom tools | None | 5 max | Unlimited |

#### Runtime Authorization Checks

| Check | Description | Failure Action |
|-------|-------------|----------------|
| Tenant match | Tool tenant == agent tenant | Reject |
| Budget check | Within run contract limits | Pause/reject |
| Tool allowlist | Tool in agent capability set | Reject |
| Rate limit | Under rate threshold | Queue/reject |
| Approval check | Sensitive tools approved | Queue for approval |

#### Web Research

- "AI agent identity management patterns {date}"
- "tool-based access control LLM agents {date}"

---

## §zero-trust

### Pattern: Zero Trust Architecture

**When to use:** All multi-tenant systems, network security design
**Phase:** foundation

#### Zero Trust Principles

| Principle | Implementation | Multi-Tenant Consideration |
|-----------|----------------|---------------------------|
| Verify Explicitly | Authenticate every request | Include tenant context in every verification |
| Least Privilege | Minimal required permissions | Scope permissions to tenant boundaries |
| Assume Breach | Limit blast radius | Isolate tenant data to contain breaches |

#### Zero Trust Network Architecture

| Component | Implementation | Purpose |
|-----------|----------------|---------|
| Identity-based access | Service mesh with mTLS | No implicit network trust |
| Micro-segmentation | Kubernetes NetworkPolicy | Pod-to-pod restrictions |
| Continuous verification | Re-auth on boundaries | Session boundary checks |
| Least privilege | Explicit allowlists | Minimal access paths |

#### Defense in Depth Layers

| Layer | Controls |
|-------|----------|
| Network | Firewalls, segmentation, DDoS protection |
| Application | Input validation, authentication, authorization |
| Data | Encryption, access controls, data masking |
| Operational | Monitoring, incident response, security testing |

#### Web Research

- "zero trust architecture SaaS platforms {date}"
- "micro-segmentation multi-tenant {date}"

---

## §network-security

### Pattern: Network Security

**When to use:** PCI-DSS compliance, network segmentation, perimeter defense
**Phase:** foundation

#### Network Segmentation Zones

| Zone | Purpose | Typical Components | Access Policy |
|------|---------|-------------------|---------------|
| DMZ | Public-facing | Load balancers, WAF, API gateways | Internet ingress, controlled egress |
| Application | Business logic | Application servers, containers | DMZ ingress only, data tier egress |
| Data | Persistent storage | Databases, caches, object storage | Application tier only, no internet |
| Management | Operations | Bastion hosts, monitoring, CI/CD | VPN/private access only |

#### Multi-Tenant Network Isolation

| Isolation Level | Mechanism | Use Case | Overhead |
|-----------------|-----------|----------|----------|
| Shared network | Kubernetes NetworkPolicy | Standard tiers | Low |
| Virtual network | VPC/VNet per tenant | Enterprise, regulated | Medium |
| Physical network | Dedicated infrastructure | Government, maximum | High |

#### Implementation Patterns

| Pattern | Description | Frameworks |
|---------|-------------|------------|
| Network Segmentation | DMZ, application, data zones | PCI-DSS, FedRAMP |
| Web Application Firewall | Application-layer protection | PCI-DSS, SOC2 |
| DDoS Protection | Distributed denial of service mitigation | All frameworks |
| Intrusion Detection | Network traffic analysis | FedRAMP, PCI-DSS |
| Private Connectivity | VPC peering, private links | Enterprise, FedRAMP |

#### Web Research

- "PCI-DSS network segmentation requirements {date}"
- "multi-tenant network isolation patterns {date}"

---

## Quality Gates

| Gate | Key Checks | Related Patterns |
|------|------------|------------------|
| QG-S1 | JWT tenant claims validated | §rbac, §abac |
| QG-S2 | RBAC/ABAC policies enforced | §rbac, §abac |
| QG-S3 | Per-tenant encryption keys | §encryption |
| QG-S4 | TLS 1.3 enforced | §encryption, §network-security |
| QG-S5 | Secrets in Vault with tenant namespace | §secrets-management |
| QG-S6 | API key rotation automated | §api-key-security |
| QG-S7 | Network policies block cross-tenant | §network-security, §zero-trust |
| QG-S8 | AI guardrails and kill switches | §ai-security, §tbac |
| QG-S9 | Compliance evidence automated | All patterns |
| QG-S10 | Penetration test with tenant scope | All patterns |

### Gate Verification Checklist

- [ ] **CRITICAL:** Cross-tenant access tested and blocked at all layers
- [ ] JWT tokens include tenant_id claim
- [ ] RBAC policies scoped to tenant
- [ ] RLS policies enabled on all tenant tables
- [ ] Per-tenant encryption keys in place (Pro+)
- [ ] TLS 1.3 for all connections
- [ ] Secrets stored in Vault with tenant paths
- [ ] API keys have rotation schedule
- [ ] Network policies block cross-tenant traffic
- [ ] AI agents have kill switches
- [ ] TBAC enforced for agent tools
- [ ] Compliance evidence collection automated
- [ ] Penetration test completed with tenant focus

---

## Web Research

| Topic | Query |
|-------|-------|
| Multi-tenant security | "multi-tenant security architecture patterns {date}" |
| Tenant isolation | "tenant data isolation security {date}" |
| API key management | "API key security multi-tenant SaaS {date}" |
| AI security | "LLM security enterprise patterns {date}" |
| Zero trust | "zero trust networking SaaS {date}" |
| Compliance | "SOC2 compliance multi-tenant implementation {date}" |

---

## Related Patterns

Cross-references to other domain guides:

- `tenant-patterns-guide.md` §tenant-rls - Database isolation with RLS
- `ai-runtime-patterns-guide.md` §run-contracts - Agent resource limits
- `ai-runtime-patterns-guide.md` §kill-switch - Agent safety controls
- `observability-patterns-guide.md` §security-monitoring - Security event monitoring
- `compliance-patterns-guide.md` §compliance-frameworks - Regulatory requirements

Load from pattern registry:
- `bam-patterns.csv` → filter: `security-*`
- `compliance-frameworks.csv` → encryption, access control requirements

Use the `web_queries` column from pattern registry for current best practices.

---

## Related Workflows

| Workflow | When to Use |
|----------|-------------|
| `bmad-bam-security-review` | Comprehensive security control validation |
| `bmad-bam-data-encryption-design` | Design encryption strategy |
| `bmad-bam-secrets-management` | Configure secrets handling |
| `bmad-bam-ai-security` | Design AI/agent security controls |
| `bmad-bam-ddos-protection-design` | Implement DDoS protection |
| `bmad-bam-continuous-security-setup` | Implement security monitoring |
| `validate-foundation` | Verify QG-F1 security baseline |

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-25 | Initial consolidated guide from 12 source files |
