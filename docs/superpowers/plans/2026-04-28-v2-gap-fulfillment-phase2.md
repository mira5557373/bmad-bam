# V2 Gap Fulfillment Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close remaining content gaps in BAM V2 by creating 4 patterns, enriching 3 domains, adding 3 consolidated skills, and 4 TOML extensions.

**Architecture:** Layered dependency approach - patterns first (foundational knowledge), then domains (consolidated context), then skills (workflows referencing patterns/domains), then TOMLs (agent menu items referencing skills).

**Tech Stack:** Markdown files, YAML manifests, TOML configurations, Jest tests

---

## File Structure

### New Files to Create

**Patterns (4 files):**
- `src-v2/data/patterns/zero-trust.md` - Zero trust architecture pattern
- `src-v2/data/patterns/disaster-recovery.md` - DR pattern with RTO/RPO
- `src-v2/data/patterns/secrets-management.md` - Tenant-scoped secrets
- `src-v2/data/patterns/incident-response.md` - Incident classification and escalation

**Skills (3 directories, ~30 files):**
- `src-v2/skills/bmad-bam-security-operations/` - Consolidates secrets, threat modeling, incident response
- `src-v2/skills/bmad-bam-resilience/` - Consolidates DR and chaos engineering
- `src-v2/skills/bmad-bam-privacy-compliance/` - GDPR and privacy workflows

**TOMLs (4 files):**
- `src-v2/customize/bmad-agent-devops.toml` - DevOps resilience capabilities
- `src-v2/customize/bmad-agent-security.toml` - Security operations capabilities
- `src-v2/customize/bmad-agent-compliance.toml` - Privacy compliance capabilities
- `src-v2/customize/bmad-agent-data.toml` - Data and tenant lifecycle capabilities

### Files to Modify

**Domains (3 files):**
- `src-v2/data/domains/compliance.md` - Enhance from 55 to 300+ lines
- `src-v2/data/domains/tenant.md` - Enhance from 58 to 200+ lines
- `src-v2/data/domains/security.md` - Enhance from 171 to 280+ lines

**Tests (1 file):**
- `test/v2/file-counts.test.js` - Update assertions

---

## Task 1: Create Zero Trust Pattern

**Files:**
- Create: `src-v2/data/patterns/zero-trust.md`

- [ ] **Step 1: Create the zero-trust pattern file**

```bash
cat > src-v2/data/patterns/zero-trust.md << 'EOF'
# Zero Trust Architecture - BAM Pattern

**Loaded by:** ZZT  
**Applies to:** Never trust, always verify - tenant and service level

---

## When to Use

- Multi-tenant SaaS with sensitive data
- Microservices with inter-service calls
- AI agents accessing tenant resources
- External API integrations
- Healthcare, financial, or government compliance requirements

## When NOT to Use

- Single-tenant deployments with network isolation
- Internal tools with trusted networks only
- Development/testing environments (may be relaxed)
- Latency-critical paths where verification overhead is unacceptable

## Architecture

### Trust Boundary Model

```
┌─────────────────────────────────────────────────────────────┐
│                     UNTRUSTED ZONE                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              API Gateway (JWT + tenant_id)             │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │          Service Mesh (mTLS + identity)         │  │  │
│  │  │  ┌───────────────────────────────────────────┐  │  │  │
│  │  │  │        Database (RLS + context)           │  │  │  │
│  │  │  │  ┌───────────────────────────────────┐    │  │  │  │
│  │  │  │  │    AI Agent (tools + budget)      │    │  │  │  │
│  │  │  │  └───────────────────────────────────┘    │  │  │  │
│  │  │  └───────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Verification Points

| Layer | Verification | Enforcement | Failure Action |
|-------|-------------|-------------|----------------|
| API Gateway | JWT + tenant_id claim | Block | 401 Unauthorized |
| Service Mesh | mTLS + service identity | Block | Connection refused |
| Database | RLS + connection context | Filter | Empty result set |
| AI Agent | Tool permissions + budget | Throttle | 429 or graceful degrade |

### Request Flow

```
Client Request
      │
      ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ API Gateway │────▶│   Service   │────▶│  Database   │
│  JWT Check  │     │ mTLS+AuthZ  │     │ RLS Filter  │
└─────────────┘     └─────────────┘     └─────────────┘
      │                   │                   │
      ▼                   ▼                   ▼
   tenant_id          service_id          tenant_id
   extracted          verified            in context
```

### Implementation Schema

```yaml
zero_trust_config:
  identity_provider:
    type: string  # oidc, saml, custom
    issuer: string
    jwks_uri: string
    
  token_validation:
    issuer: string
    audience: string
    tenant_claim: "tenant_id"
    required_claims: ["sub", "tenant_id", "scope"]
    clock_skew_seconds: 30
    
  service_mesh:
    mtls_enabled: true
    service_accounts:
      - name: string
        namespace: string
        allowed_services: string[]
    cert_rotation_hours: 24
    
  database_context:
    rls_enabled: true
    context_propagation: "session_variable"  # or "jwt_claim"
    context_variable: "app.tenant_id"
    
  ai_agent:
    tool_permissions:
      - tool: string
        allowed_scopes: string[]
    budget_enforcement:
      tokens_per_request: int
      cost_limit_per_tenant: float
```

### Tenant-Aware Zero Trust

| Tier | Gateway Verification | Service Verification | Data Verification |
|------|---------------------|---------------------|-------------------|
| Free | JWT only | Shared service identity | RLS |
| Pro | JWT + MFA option | Dedicated service identity | RLS + audit |
| Enterprise | JWT + MFA + IP allowlist | Isolated service mesh | Schema isolation + encryption |

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Full zero trust | Maximum security, compliance-ready | Performance overhead, complexity | Regulated industries |
| Perimeter + internal trust | Better latency, simpler | Single breach exposure | Internal tools |
| Selective zero trust | Balanced security/performance | Complex configuration | Hybrid deployments |
| Gateway-only verification | Fastest, simplest | No defense in depth | Low-risk applications |

## Quality Checks

- [ ] JWT validation at API gateway with tenant_id claim
- [ ] mTLS between all services in mesh
- [ ] RLS policies on all tenant-scoped tables
- [ ] Service-to-service authentication enforced
- [ ] **CRITICAL:** No implicit trust between components

## Web Research Queries

- "zero trust architecture multi-tenant SaaS {date}"
- "service mesh mTLS patterns kubernetes {date}"
- "AI agent permission boundaries enterprise {date}"
- "NIST zero trust architecture guidelines {date}"
- "BeyondCorp implementation patterns {date}"
EOF
```

- [ ] **Step 2: Verify the file was created correctly**

Run: `wc -l src-v2/data/patterns/zero-trust.md && head -20 src-v2/data/patterns/zero-trust.md`
Expected: ~150 lines, header shows "Zero Trust Architecture - BAM Pattern"

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/patterns/zero-trust.md
git commit -m "feat(patterns): add zero-trust architecture pattern

Includes:
- Trust boundary model with ASCII diagram
- Verification points matrix (gateway, mesh, DB, agent)
- Implementation YAML schema
- Tenant-tier specific verification levels
- Trade-offs analysis

Loaded by: ZZT"
```

---

## Task 2: Create Disaster Recovery Pattern

**Files:**
- Create: `src-v2/data/patterns/disaster-recovery.md`

- [ ] **Step 1: Create the disaster-recovery pattern file**

```bash
cat > src-v2/data/patterns/disaster-recovery.md << 'EOF'
# Disaster Recovery - BAM Pattern

**Loaded by:** ZDR  
**Applies to:** Business continuity, tenant data protection, failover automation

---

## When to Use

- Production multi-tenant SaaS deployments
- Systems with defined SLA/SLO requirements
- Regulated industries requiring documented DR plans
- Any system where data loss is unacceptable
- AI platforms with stateful agent executions

## When NOT to Use

- Development/staging environments (simplified DR sufficient)
- Stateless services with no persistent data
- Systems where brief outages are acceptable
- Internal tools with relaxed availability requirements

## Architecture

### RTO/RPO Tier Matrix

| Tier | RTO Target | RPO Target | Backup Frequency | Retention |
|------|------------|------------|------------------|-----------|
| Free | 24 hours | 24 hours | Daily | 7 days |
| Pro | 4 hours | 1 hour | Hourly | 30 days |
| Enterprise | 1 hour | 15 minutes | Continuous | 90 days |
| Critical | 15 minutes | Near-zero | Real-time replication | 365 days |

### Backup Strategy Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    HOT STANDBY (Active-Active)               │
│                  RTO: <15min | RPO: Near-zero                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                 WARM STANDBY (Active-Passive)          │  │
│  │               RTO: 1-4 hours | RPO: 15min-1hr          │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │              COLD STANDBY (Restore)              │  │  │
│  │  │            RTO: 4-24 hours | RPO: Daily           │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Failover Flow

```
Incident Detected
       │
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Health     │────▶│  Decision   │────▶│  Failover   │
│   Check     │     │   Point     │     │  Execute    │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
   3 failures          Auto/Manual         DNS switch
   in 5 min            threshold           + traffic
                                            redirect
       │
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Tenant    │────▶│    Data     │────▶│   Verify    │
│   Notify    │     │   Sync      │     │  Recovery   │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Tenant Data Priority Matrix

| Data Category | Priority | Recovery Order | Max Data Loss |
|---------------|----------|----------------|---------------|
| Tenant credentials | P0 | First | Zero |
| Billing/payment data | P0 | First | Zero |
| User data | P1 | Second | Per RPO |
| Agent state | P2 | Third | Current session |
| Audit logs | P1 | Second | Per RPO |
| Cache/temporary | P3 | Last | Acceptable loss |

### Implementation Schema

```yaml
disaster_recovery:
  tenant_id: uuid
  tier: enum[free, pro, enterprise, critical]
  
  rto_rpo:
    rto_minutes: int
    rpo_minutes: int
    backup_frequency: string  # daily, hourly, continuous
    retention_days: int
    
  backup_config:
    strategy: enum[cold, warm, hot]
    primary_region: string
    secondary_region: string
    cross_region_replication: bool
    encryption_key_id: string
    
  failover:
    auto_failover_enabled: bool
    health_check_interval_seconds: int
    failure_threshold: int
    notification_channels: string[]
    
  recovery:
    recovery_point_selection: enum[latest, specific_time, specific_backup]
    data_validation_required: bool
    tenant_notification_template: string
    
  testing:
    dr_drill_frequency: string  # quarterly, monthly
    last_drill_date: timestamp
    last_drill_result: enum[pass, fail, partial]
    next_drill_scheduled: timestamp
```

### Cross-Region Replication

```
Primary Region (us-east-1)          Secondary Region (eu-west-1)
┌──────────────────────┐            ┌──────────────────────┐
│  ┌────────────────┐  │            │  ┌────────────────┐  │
│  │   Database     │──┼── sync ───▶│  │   Database     │  │
│  │   (Primary)    │  │            │  │   (Replica)    │  │
│  └────────────────┘  │            │  └────────────────┘  │
│  ┌────────────────┐  │            │  ┌────────────────┐  │
│  │   Blob Store   │──┼── sync ───▶│  │   Blob Store   │  │
│  │   (Primary)    │  │            │  │   (Replica)    │  │
│  └────────────────┘  │            │  └────────────────┘  │
└──────────────────────┘            └──────────────────────┘
         │                                    │
         └──────────── DNS Failover ──────────┘
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Hot-hot active-active | Near-zero downtime | 2x infrastructure cost | Critical enterprise |
| Hot-warm active-passive | Balance of cost/RTO | 1-4 hour RTO | Pro tier |
| Cold backup/restore | Lowest cost | 4-24 hour RTO | Free tier, dev |
| Multi-region active | Best availability | Complexity, latency | Global enterprise |

## Quality Checks

- [ ] RTO/RPO targets defined per tenant tier
- [ ] Automated backup verification (restore test)
- [ ] Failover runbook documented and tested
- [ ] Tenant notification procedures in place
- [ ] **CRITICAL:** DR drill completed within last quarter

## Web Research Queries

- "disaster recovery patterns multi-tenant SaaS {date}"
- "RTO RPO best practices cloud {date}"
- "cross-region database replication PostgreSQL {date}"
- "chaos engineering DR testing {date}"
- "tenant data recovery prioritization {date}"
EOF
```

- [ ] **Step 2: Verify the file was created correctly**

Run: `wc -l src-v2/data/patterns/disaster-recovery.md && head -20 src-v2/data/patterns/disaster-recovery.md`
Expected: ~200 lines, header shows "Disaster Recovery - BAM Pattern"

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/patterns/disaster-recovery.md
git commit -m "feat(patterns): add disaster-recovery pattern

Includes:
- RTO/RPO tier matrix (Free to Critical)
- Backup strategy hierarchy with ASCII diagram
- Failover flow with decision points
- Tenant data priority matrix
- Cross-region replication architecture
- Implementation YAML schema

Loaded by: ZDR
Quality Gate: QG-DR"
```

---

## Task 3: Create Secrets Management Pattern

**Files:**
- Create: `src-v2/data/patterns/secrets-management.md`

- [ ] **Step 1: Create the secrets-management pattern file**

```bash
cat > src-v2/data/patterns/secrets-management.md << 'EOF'
# Secrets Management - BAM Pattern

**Loaded by:** ZSM  
**Applies to:** Tenant-scoped credentials, API keys, encryption keys, agent tokens

---

## When to Use

- Multi-tenant SaaS with tenant-specific credentials
- Systems requiring secret rotation without downtime
- AI agents needing scoped access tokens
- Integration with external services per tenant
- Compliance requirements for key management

## When NOT to Use

- Environment variables are sufficient (single-tenant, simple)
- Secrets don't require tenant isolation
- No rotation requirements
- Development environments (use simplified secrets)

## Architecture

### Secret Isolation Model

```
┌─────────────────────────────────────────────────────────────┐
│                    PLATFORM SECRETS                          │
│           (Infrastructure, shared services)                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                 TENANT NAMESPACE                       │  │
│  │            (Tenant-scoped secrets)                     │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │              USER SECRETS                        │  │  │
│  │  │         (User-managed keys)                      │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Secret Lifecycle

```
Create          Distribute        Rotate           Revoke
   │                │                │                │
   ▼                ▼                ▼                ▼
┌──────┐      ┌──────────┐     ┌──────────┐     ┌──────────┐
│Vault │─────▶│ Service  │─────▶│ Rotate   │─────▶│ Revoke   │
│Store │      │  Inject  │      │ (Zero    │      │ (Audit   │
└──────┘      └──────────┘      │ Downtime)│      │  Trail)  │
                                └──────────┘      └──────────┘
   │                │                │                │
   ▼                ▼                ▼                ▼
Encrypted      Ephemeral         Dual-key          Immediate
at rest        in memory         transition        invalidate
```

### Vault Integration Patterns

| Provider | Use Case | Tenant Isolation | Rotation |
|----------|----------|------------------|----------|
| HashiCorp Vault | Self-hosted, full control | Namespace per tenant | Auto with TTL |
| AWS Secrets Manager | AWS-native | Resource policies + tags | Lambda rotation |
| Azure Key Vault | Azure-native | RBAC + managed identity | Auto-rotate |
| GCP Secret Manager | GCP-native | IAM + labels | Cloud Functions |

### Zero-Downtime Rotation Flow

```
Step 1: Generate New          Step 2: Dual Active         Step 3: Deprecate Old
┌─────────────────┐           ┌─────────────────┐         ┌─────────────────┐
│  Secret v1      │           │  Secret v1 ✓    │         │  Secret v1 ✗    │
│  (active)       │           │  Secret v2 ✓    │         │  Secret v2 ✓    │
│                 │           │  (both valid)   │         │  (only valid)   │
└─────────────────┘           └─────────────────┘         └─────────────────┘
        │                             │                           │
        └──────── 5 min ──────────────┴──────── 24 hr ────────────┘
```

### Implementation Schema

```yaml
secrets_management:
  provider: enum[vault, aws, azure, gcp]
  
  platform_secrets:
    path: "platform/"
    rotation_days: 90
    access: ["infrastructure", "ci-cd"]
    
  tenant_secrets:
    path_template: "tenants/{tenant_id}/"
    isolation: enum[namespace, path, policy]
    default_rotation_days: 30
    
    categories:
      - name: "api_keys"
        rotation_days: 90
        max_per_tenant: 10
        
      - name: "encryption_keys"
        rotation_days: 365
        kms_backed: true
        
      - name: "oauth_credentials"
        rotation_days: 30
        include_refresh_token: true
        
  agent_credentials:
    type: "short_lived_token"
    ttl_minutes: 15
    renewable: true
    max_ttl_minutes: 60
    scopes: ["read", "execute"]
    
  rotation:
    strategy: enum[automatic, manual, scheduled]
    zero_downtime: true
    dual_active_period_hours: 24
    notification_before_days: 7
    
  audit:
    log_all_access: true
    alert_on_suspicious: true
    retention_days: 365
```

### Agent Credential Flow

```
Agent Execution Request
         │
         ▼
┌─────────────────┐
│  Request Token  │
│  (tenant_id,    │
│   scope, ttl)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│  Vault Issues   │────▶│  Short-Lived    │
│  Scoped Token   │     │  Token (15min)  │
└─────────────────┘     └────────┬────────┘
                                 │
         ┌───────────────────────┴───────────────────────┐
         ▼                                               ▼
┌─────────────────┐                           ┌─────────────────┐
│  Tool Access    │                           │  Renew Before   │
│  (Scoped)       │                           │  Expiry         │
└─────────────────┘                           └─────────────────┘
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Centralized Vault | Full control, audit trail | Operational overhead | Enterprise, compliance |
| Cloud-native SM | Managed, integrated | Vendor lock-in | Single-cloud |
| Env vars + rotation | Simple | No tenant isolation | Single-tenant |
| Customer-managed keys | Customer control | Complex key ceremony | Enterprise tier |

## Quality Checks

- [ ] All secrets encrypted at rest (AES-256 or better)
- [ ] Tenant secrets isolated by namespace/path
- [ ] Rotation automation in place
- [ ] Agent tokens are short-lived (<1 hour)
- [ ] **CRITICAL:** No secrets in code, logs, or environment dumps

## Web Research Queries

- "secrets management multi-tenant SaaS {date}"
- "HashiCorp Vault tenant isolation patterns {date}"
- "zero downtime secret rotation {date}"
- "AI agent credential management {date}"
- "cloud secrets manager comparison {date}"
EOF
```

- [ ] **Step 2: Verify the file was created correctly**

Run: `wc -l src-v2/data/patterns/secrets-management.md && head -20 src-v2/data/patterns/secrets-management.md`
Expected: ~180 lines, header shows "Secrets Management - BAM Pattern"

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/patterns/secrets-management.md
git commit -m "feat(patterns): add secrets-management pattern

Includes:
- Secret isolation model (platform/tenant/user)
- Secret lifecycle with zero-downtime rotation
- Vault integration patterns (HashiCorp, AWS, Azure, GCP)
- Agent credential flow with short-lived tokens
- Implementation YAML schema

Loaded by: ZSM
Quality Gate: QG-S3"
```

---

## Task 4: Create Incident Response Pattern

**Files:**
- Create: `src-v2/data/patterns/incident-response.md`

- [ ] **Step 1: Create the incident-response pattern file**

```bash
cat > src-v2/data/patterns/incident-response.md << 'EOF'
# Incident Response - BAM Pattern

**Loaded by:** ZIR  
**Applies to:** Security incidents, outages, data breaches, tenant-impacting events

---

## When to Use

- Production multi-tenant SaaS operations
- Any system requiring structured incident handling
- Compliance requirements for incident documentation
- AI platforms with potential safety incidents
- Systems with defined SLAs requiring incident tracking

## When NOT to Use

- Development/staging environments (simplified process)
- Non-production issues (use standard bug tracking)
- Planned maintenance windows

## Architecture

### Severity Classification

| Severity | Impact | Response Time | Escalation | Example |
|----------|--------|---------------|------------|---------|
| P0 - Critical | All tenants down, data breach | 15 min | Immediate exec | Platform outage, security breach |
| P1 - High | Multiple tenants impacted | 1 hour | Manager | Feature broken for segment |
| P2 - Medium | Single tenant impacted | 4 hours | Team lead | Tenant-specific bug |
| P3 - Low | Minor issue, workaround exists | 24 hours | On-call | UI glitch, minor performance |

### Tenant Impact Matrix

| Incident Type | Free Tier | Pro Tier | Enterprise Tier |
|---------------|-----------|----------|-----------------|
| Outage notification | Email (24h) | Email + Dashboard (1h) | Phone + Email (15min) |
| Status updates | Dashboard | Dashboard + Email | Dedicated channel |
| RCA delivery | Self-service | 5 business days | 2 business days |
| SLA credits | None | Automatic | Automatic + review |

### Incident Timeline

```
Detection           Triage              Response            Resolution
    │                  │                   │                    │
    ▼                  ▼                   ▼                    ▼
┌────────┐       ┌──────────┐       ┌──────────┐       ┌──────────┐
│ Alert  │──────▶│ Classify │──────▶│ Execute  │──────▶│ Verify   │
│ Fired  │       │ Severity │       │ Runbook  │       │ Resolved │
└────────┘       └──────────┘       └──────────┘       └──────────┘
    │                  │                   │                    │
    ▼                  ▼                   ▼                    ▼
 T+0 min           T+15 min           T+varies            T+varies
                                                               │
                                                               ▼
                                                        ┌──────────┐
                                                        │Postmortem│
                                                        │ (48-72h) │
                                                        └──────────┘
```

### Escalation Path

```
On-Call Engineer
       │
       │ P2-P3: Own resolution
       │ P1: Escalate after 1 hour
       │ P0: Immediate escalation
       ▼
Team Lead / Manager
       │
       │ P1: Own with updates
       │ P0: Escalate to leadership
       ▼
Engineering Leadership
       │
       │ P0: Own with exec updates
       │ Security breach: Legal + Security
       ▼
Executive Team + Legal (P0 Security)
```

### Implementation Schema

```yaml
incident_response:
  incident_id: string
  tenant_impact: uuid[]
  
  classification:
    severity: enum[p0, p1, p2, p3]
    category: enum[outage, security, performance, data, ai_safety]
    affected_services: string[]
    affected_tenants: uuid[]
    tenant_tier_impact: enum[free, pro, enterprise, all]
    
  timeline:
    detected_at: timestamp
    acknowledged_at: timestamp
    mitigated_at: timestamp
    resolved_at: timestamp
    postmortem_due: timestamp
    
  communication:
    status_page_updated: bool
    tenant_notifications_sent: bool
    internal_channel: string
    external_updates: object[]
    
  response:
    runbook_id: string
    runbook_executed: bool
    rollback_performed: bool
    on_call_engineer: string
    escalation_chain: string[]
    
  resolution:
    root_cause: string
    fix_description: string
    prevention_actions: string[]
    postmortem_url: string
    
  ai_specific:
    agent_involved: bool
    prompt_injection_suspected: bool
    model_behavior_issue: bool
    safety_guardrail_triggered: bool
```

### Communication Templates

**P0 - Initial (15 min)**
```
Subject: [P0 INCIDENT] {service} - {brief description}

SEVERITY: P0 - Critical
IMPACT: {tenant count} tenants affected
STATUS: Investigating

We are aware of an issue affecting {description}.
Our team is actively investigating.

Next update in 30 minutes.
```

**P0 - Resolution**
```
Subject: [RESOLVED] {service} - {brief description}

SEVERITY: P0 - Critical
STATUS: Resolved
DURATION: {duration}

Issue has been resolved. Full service restored.

Root cause analysis will be provided within 48 hours.

Affected tenants will receive SLA credit review.
```

### AI Safety Incident Specifics

| AI Incident Type | Severity | Immediate Action | Investigation |
|------------------|----------|------------------|---------------|
| Prompt injection detected | P1 | Block user, log attempt | Review guardrails |
| Model hallucination | P2 | Flag output, notify user | Tune confidence |
| Data leak in output | P0 | Kill switch, audit trail | Security review |
| Runaway agent | P1 | Kill switch, budget freeze | Trace execution |

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Full incident management | Comprehensive, compliant | Overhead for small issues | Enterprise, regulated |
| Simplified triage | Fast response | May miss patterns | Startups, small teams |
| Automated classification | Consistent, fast | May misclassify | High-volume alerts |
| Manual escalation | Human judgment | Slower response | Complex incidents |

## Quality Checks

- [ ] Severity classification matrix documented
- [ ] Escalation paths defined for all severities
- [ ] Tenant notification templates prepared
- [ ] Runbooks exist for common incidents
- [ ] **CRITICAL:** Postmortem process enforced for P0/P1

## Web Research Queries

- "incident response multi-tenant SaaS {date}"
- "incident severity classification {date}"
- "tenant communication during outage {date}"
- "AI safety incident response {date}"
- "postmortem blameless culture {date}"
EOF
```

- [ ] **Step 2: Verify the file was created correctly**

Run: `wc -l src-v2/data/patterns/incident-response.md && head -20 src-v2/data/patterns/incident-response.md`
Expected: ~200 lines, header shows "Incident Response - BAM Pattern"

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/patterns/incident-response.md
git commit -m "feat(patterns): add incident-response pattern

Includes:
- Severity classification (P0-P3) with response times
- Tenant impact matrix by tier
- Incident timeline with checkpoints
- Escalation path diagram
- Communication templates
- AI safety incident specifics
- Implementation YAML schema

Loaded by: ZIR
Quality Gate: QG-IR"
```

---

## Task 5: Enhance Compliance Domain

**Files:**
- Modify: `src-v2/data/domains/compliance.md`

- [ ] **Step 1: Read current file to preserve existing content**

Run: `cat src-v2/data/domains/compliance.md`
Note: Preserve all existing content and append new sections

- [ ] **Step 2: Append GDPR section**

```bash
cat >> src-v2/data/domains/compliance.md << 'EOF'

---

## GDPR Compliance

### Data Subject Rights (GDPR Articles 15-22)

| Right | Article | Implementation | Automation Level |
|-------|---------|----------------|------------------|
| Access | Art. 15 | Export API per tenant | Full |
| Rectification | Art. 16 | Edit API + audit | Partial |
| Erasure | Art. 17 | Soft delete + purge job | Full |
| Portability | Art. 20 | JSON/CSV export | Full |
| Objection | Art. 21 | Processing flag | Partial |
| No profiling | Art. 22 | AI opt-out flag | Partial |

### Lawful Basis Tracking

```yaml
lawful_basis:
  consent:
    granular: true
    withdrawable: true
    recorded_at: timestamp
    purpose: string[]
    
  legitimate_interest:
    assessment_documented: bool
    opt_out_available: true
    
  contract:
    service_agreement_signed: bool
    necessary_processing_only: true
```

### Cross-Border Transfer

| Mechanism | When to Use | Documentation |
|-----------|-------------|---------------|
| Adequacy decision | EU-approved countries | None required |
| SCCs | US, other countries | Signed agreement |
| BCR | Intra-group transfers | Regulatory approval |
| Consent | Individual transfers | Explicit consent |

### DPO Integration

- Data Protection Officer contact in tenant portal
- DPIA required for high-risk processing
- Annual compliance audit per tenant

---

## CCPA Compliance

### Consumer Rights (California)

| Right | Implementation | Timeline |
|-------|----------------|----------|
| Right to Know | Disclosure API | 45 days |
| Right to Delete | Erasure workflow | 45 days |
| Right to Opt-Out | "Do Not Sell" toggle | Immediate |
| Non-Discrimination | Pricing parity | Ongoing |

### Do Not Sell Implementation

```yaml
ccpa_preferences:
  tenant_id: uuid
  do_not_sell: bool
  opt_out_date: timestamp
  data_categories_disclosed: string[]
  third_party_sharing: bool
```

### 12-Month Lookback

- Maintain data collection records for 12 months
- Disclosure must include categories collected
- Track all third-party data sharing

---

## SOC 2 Type II

### Trust Service Criteria

| Category | Criteria | BAM Implementation |
|----------|----------|-------------------|
| Security | CC1-CC9 | Tenant isolation, encryption, access control |
| Availability | A1 | SLA monitoring, DR plans, uptime tracking |
| Confidentiality | C1 | Data classification, encryption, access logs |
| Processing Integrity | PI1 | Input validation, audit trails, error handling |
| Privacy | P1-P8 | Consent management, data retention, disclosure |

### Evidence Collection Automation

```yaml
soc2_evidence:
  automated_collection:
    - access_logs
    - encryption_status
    - vulnerability_scans
    - uptime_metrics
    
  manual_review:
    - policy_documents
    - training_records
    - vendor_assessments
    
  collection_frequency:
    continuous: ["access_logs", "uptime_metrics"]
    weekly: ["vulnerability_scans"]
    quarterly: ["policy_review", "access_review"]
```

### Continuous Compliance Monitoring

- Real-time control monitoring dashboard
- Automated evidence collection
- Gap alerts with remediation guidance
- Audit-ready report generation

---

## HIPAA Compliance (If Applicable)

### PHI Handling Requirements

| Requirement | Implementation | Verification |
|-------------|----------------|--------------|
| BAA required | Agreement before PHI access | Legal review |
| Minimum necessary | Role-based data access | Access audit |
| Audit controls | All PHI access logged | Log review |
| Encryption | At rest and in transit | Scan verification |

### Breach Notification

- 60-day notification requirement
- Tenant notification within 24 hours of discovery
- HHS notification for breaches >500 records
- Media notification for state-wide breaches

---

## PCI-DSS Compliance (If Applicable)

### Cardholder Data Scope

| Data Element | Can Store | Encryption Required |
|--------------|-----------|---------------------|
| PAN | Yes (encrypted) | Yes |
| Cardholder name | Yes | Recommended |
| Service code | Yes | Yes |
| Expiration | Yes | Yes |
| CVV/CVC | No | N/A |
| Full track data | No | N/A |

### Scope Reduction

- Tokenization with PCI-compliant provider
- No CHD in logs or backups
- Segment cardholder data environment
- Quarterly ASV scans

---

## Compliance Automation

### Continuous Monitoring Dashboard

```
Compliance Score: 94%

SOC 2: ████████████░░ 92%
GDPR:  █████████████░ 96%
HIPAA: ████████████░░ 91%

Outstanding Items: 3
- Access review overdue (2 days)
- Vulnerability scan pending
- Policy update required
```

### Pattern References

- **Security:** `{project-root}/_bmad/bam/data/patterns/zero-trust.md`
- **Frameworks:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
EOF
```

- [ ] **Step 3: Verify the file was enhanced**

Run: `wc -l src-v2/data/domains/compliance.md`
Expected: 250+ lines (was 56)

- [ ] **Step 4: Commit**

```bash
git add src-v2/data/domains/compliance.md
git commit -m "feat(domains): enhance compliance domain with GDPR, CCPA, SOC2

Adds comprehensive coverage for:
- GDPR data subject rights (Art. 15-22)
- CCPA consumer rights with Do Not Sell
- SOC 2 Type II trust service criteria
- HIPAA PHI handling requirements
- PCI-DSS cardholder data scope
- Continuous compliance monitoring dashboard

Grows domain from 55 to 300+ lines"
```

---

## Task 6: Enhance Tenant Domain

**Files:**
- Modify: `src-v2/data/domains/tenant.md`

- [ ] **Step 1: Read current file to preserve existing content**

Run: `cat src-v2/data/domains/tenant.md`
Note: Preserve all existing content and append new sections

- [ ] **Step 2: Append advanced isolation and lifecycle sections**

```bash
cat >> src-v2/data/domains/tenant.md << 'EOF'

---

## Advanced Isolation Patterns

### Hybrid Isolation (RLS + Schema)

For sensitive data requiring extra isolation within RLS tenants:

```
Tenant Database (RLS)
├── public schema (shared tables, RLS policies)
│   ├── users (tenant_id column, RLS)
│   ├── settings (tenant_id column, RLS)
│   └── audit_logs (tenant_id column, RLS)
│
└── tenant_{id} schema (sensitive data)
    ├── financial_records (no RLS needed)
    ├── medical_data (no RLS needed)
    └── encryption_keys (no RLS needed)
```

### Tenant Hierarchy Models

| Model | Structure | Use Case |
|-------|-----------|----------|
| Flat | Tenant → Users | Standard SaaS |
| Parent-Child | Org → Departments | Enterprise |
| Reseller | Partner → Tenants | White-label |
| Enterprise | Corp → BUs → Teams | Large enterprise |

```yaml
tenant_hierarchy:
  type: enum[flat, parent_child, reseller, enterprise]
  
  parent_child:
    parent_tenant_id: uuid
    child_tenants: uuid[]
    shared_resources: string[]
    isolation_override: bool
    
  reseller:
    reseller_id: uuid
    branding: object
    billing_relationship: enum[direct, through_reseller]
    support_tier: enum[reseller, platform]
```

### Resource Quotas by Tier

Reference: `{project-root}/_bmad/bam/data/patterns/tenant-quotas.md`

| Resource | Free | Pro | Enterprise |
|----------|------|-----|------------|
| API calls/day | 10,000 | 100,000 | Unlimited |
| Storage GB | 5 | 50 | 500+ |
| Users | 5 | 50 | Unlimited |
| Agent executions/day | 100 | 1,000 | 10,000+ |
| Token budget/day | 50K | 500K | 5M+ |

---

## Tenant Lifecycle Events

### Provisioning Sequence

```
Step 1              Step 2              Step 3
Create Record       Setup Storage       Seed Data
     │                   │                  │
     ▼                   ▼                  ▼
┌──────────┐       ┌──────────┐       ┌──────────┐
│ Tenant   │──────▶│ Schema/  │──────▶│ Default  │
│ Record   │       │ Namespace│       │ Config   │
└──────────┘       └──────────┘       └──────────┘
     │                   │                  │
     ▼                   ▼                  ▼
  tenant_id          storage_path       seed_complete
  created            provisioned        flag set

Step 4              Step 5
Integrations        Welcome
     │                  │
     ▼                  ▼
┌──────────┐       ┌──────────┐
│ Webhooks │──────▶│ Welcome  │
│ + APIs   │       │ Email    │
└──────────┘       └──────────┘
     │                  │
     ▼                  ▼
  integrations_     onboarding_
  configured        complete
```

### Suspension Flow

| Stage | Access Level | Duration | Reactivation |
|-------|--------------|----------|--------------|
| Grace period | Full (warning shown) | 7 days | Auto on payment |
| Limited access | Read-only | 14 days | Payment + review |
| Suspended | Admin-only | 30 days | Payment + contact |
| Pre-termination | Export only | 14 days | Contact required |

```yaml
suspension:
  reason: enum[non_payment, tos_violation, security, requested]
  suspended_at: timestamp
  grace_period_ends: timestamp
  access_level: enum[full, limited, admin_only, export_only]
  reactivation_requirements: string[]
```

### Termination Flow

```
Request           Export Window       Backup Retention     Hard Delete
   │                   │                    │                   │
   ▼                   ▼                    ▼                   ▼
┌──────────┐     ┌──────────┐        ┌──────────┐        ┌──────────┐
│ Request  │────▶│ 30-day   │───────▶│ 90-day   │───────▶│ Purge    │
│ Received │     │ Export   │        │ Backup   │        │ All Data │
└──────────┘     └──────────┘        └──────────┘        └──────────┘
                      │                    │
                      ▼                    ▼
                 User can export     Admin can restore
                 all data            if requested
```

---

## Cross-Tenant Operations

### Admin Access Patterns

| Role | Access Scope | Audit Level | Approval |
|------|--------------|-------------|----------|
| Super-admin | All tenants | Full audit | MFA + reason |
| Support | Assigned tenants | Full audit | Ticket required |
| Tenant-admin | Own tenant | Standard | Self |
| Impersonation | Single session | Full audit | Tenant consent |

### Data Migration Scenarios

**Tenant-to-Tenant Copy**
```yaml
migration:
  type: tenant_copy
  source_tenant: uuid
  target_tenant: uuid
  data_categories: string[]
  transform_rules:
    - field: "user_id"
      action: "regenerate"
    - field: "created_at"
      action: "preserve"
```

**Tenant Merge**
```yaml
migration:
  type: merge
  source_tenants: uuid[]
  target_tenant: uuid
  conflict_resolution: enum[source_wins, target_wins, manual]
  post_merge_action: enum[archive_source, delete_source]
```

**Tenant Split**
```yaml
migration:
  type: split
  source_tenant: uuid
  split_criteria:
    - field: "department"
      values: ["sales", "engineering"]
  target_tenants:
    - criteria: "department = sales"
      new_tenant_name: "Acme Sales"
    - criteria: "department = engineering"
      new_tenant_name: "Acme Engineering"
```

### Tenant Impersonation

```yaml
impersonation:
  impersonator_id: uuid
  target_tenant_id: uuid
  session_id: uuid
  started_at: timestamp
  expires_at: timestamp
  reason: string
  consent_token: string  # Signed by tenant admin
  audit_trail: bool  # Always true
```

All actions during impersonation:
- Logged with impersonator context
- Tagged in audit trail
- Tenant notified post-session

---

## Quality Checks (Enhanced)

- [ ] Tenant provisioning <30 seconds
- [ ] Suspension flow graceful with user communication
- [ ] Termination data export works correctly
- [ ] Admin access fully audited
- [ ] **CRITICAL:** Cross-tenant data migration validated
EOF
```

- [ ] **Step 3: Verify the file was enhanced**

Run: `wc -l src-v2/data/domains/tenant.md`
Expected: 200+ lines (was 58)

- [ ] **Step 4: Commit**

```bash
git add src-v2/data/domains/tenant.md
git commit -m "feat(domains): enhance tenant domain with lifecycle and operations

Adds comprehensive coverage for:
- Hybrid isolation (RLS + Schema)
- Tenant hierarchy models (flat, parent-child, reseller)
- Resource quotas by tier
- Provisioning sequence (5-step flow)
- Suspension and termination flows
- Cross-tenant operations (migration, merge, split)
- Tenant impersonation with audit

Grows domain from 58 to 200+ lines"
```

---

## Task 7: Enhance Security Domain

**Files:**
- Modify: `src-v2/data/domains/security.md`

- [ ] **Step 1: Read current file to preserve existing content**

Run: `cat src-v2/data/domains/security.md`
Note: Preserve all existing content and append new sections

- [ ] **Step 2: Append AI security and threat modeling sections**

```bash
cat >> src-v2/data/domains/security.md << 'EOF'

---

## AI-Specific Security

### Prompt Injection Prevention

| Attack Type | Detection Method | Mitigation |
|-------------|------------------|------------|
| Direct injection | Pattern matching, classifier | Input sanitization, hard block |
| Indirect injection | Output analysis, canary tokens | Response filtering, flag |
| Jailbreak attempts | Behavior classifier | Model refusal, alert |
| Data extraction | Output scanning | PII filter, truncation |

### Detection Flow

```
User Input
    │
    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Pattern    │────▶│  Classifier │────▶│  Canary     │
│  Matching   │     │  Model      │     │  Token      │
└─────────────┘     └─────────────┘     └─────────────┘
    │                     │                   │
    ▼                     ▼                   ▼
 Known patterns      Behavior score      Token in output?
    │                     │                   │
    └─────────────────────┴───────────────────┘
                          │
                          ▼
                   Risk Score > Threshold?
                          │
              ┌───────────┴───────────┐
             YES                      NO
              │                        │
              ▼                        ▼
         Block + Alert            Process
```

### AI Red Teaming Checklist

- [ ] Test known prompt injection patterns
- [ ] Attempt jailbreak techniques
- [ ] Test data extraction attempts
- [ ] Verify PII detection in outputs
- [ ] Test budget limit bypass attempts
- [ ] Test kill switch response time
- [ ] Test tool permission boundaries
- [ ] **CRITICAL:** No unauthorized data access via AI

### LLM Security Controls

```yaml
llm_security:
  input_controls:
    max_input_tokens: 4096
    sanitization_enabled: true
    injection_classifier: true
    
  output_controls:
    pii_detection: true
    pii_action: enum[redact, block, flag]
    max_output_tokens: 4096
    response_filtering: true
    
  execution_controls:
    token_budget_per_request: int
    cost_limit_per_tenant: float
    kill_switch_enabled: true
    kill_switch_latency_ms: 100
    
  audit:
    log_all_interactions: true
    log_prompts: bool  # Configurable for compliance
    retention_days: 90
```

---

## Threat Modeling Integration

### STRIDE Analysis per Component

| Component | S | T | R | I | D | E | Priority |
|-----------|---|---|---|---|---|---|----------|
| API Gateway | ● | ● | ○ | ● | ○ | ● | High |
| Auth Service | ● | ● | ● | ● | ● | ○ | Critical |
| Tenant Service | ● | ○ | ● | ● | ● | ○ | Critical |
| Database | ● | ● | ○ | ● | ● | ○ | Critical |
| AI Agent | ● | ● | ● | ● | ● | ● | Critical |
| Cache | ● | ○ | ○ | ● | ● | ○ | Medium |

Legend: ● = Applicable threat, ○ = Lower risk

### Attack Tree Methodology

```
Goal: Access other tenant's data
├── Via Application
│   ├── IDOR vulnerability
│   │   └── Mitigation: Tenant context validation
│   ├── SQL injection
│   │   └── Mitigation: Parameterized queries + RLS
│   └── Business logic bypass
│       └── Mitigation: Authorization checks
├── Via AI Agent
│   ├── Prompt injection
│   │   └── Mitigation: Input sanitization
│   ├── Tool permission bypass
│   │   └── Mitigation: Scoped tool access
│   └── Memory leak
│       └── Mitigation: Isolated memory per tenant
└── Via Infrastructure
    ├── Network sniffing
    │   └── Mitigation: mTLS everywhere
    └── Database access
        └── Mitigation: RLS + encryption
```

### Threat-to-Control Mapping

| Threat | Control | Implementation | Verification |
|--------|---------|----------------|--------------|
| Cross-tenant access | RLS | PostgreSQL policies | Integration tests |
| Prompt injection | Input filter | Classifier + rules | Red team exercise |
| Data exfiltration | Output filter | PII detection | Output scanning |
| Privilege escalation | RBAC | Role checks | Access audit |

---

## Security Operations

### Vulnerability Management

```
CVE Discovered
      │
      ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Assess     │────▶│  Prioritize │────▶│  Patch      │
│  Impact     │     │  by Tenant  │     │  Deploy     │
└─────────────┘     └─────────────┘     └─────────────┘
      │                   │                   │
      ▼                   ▼                   ▼
  CVSS score         Tenant tier          Rollout plan
  + exploitability   + data sensitivity   + monitoring
```

### Patch Priority Matrix

| CVSS Score | Exploitable | Enterprise Tenants | Patch Window |
|------------|-------------|-------------------|--------------|
| 9.0+ | Yes | Yes | 24 hours |
| 9.0+ | Yes | No | 72 hours |
| 7.0-8.9 | Yes | Any | 1 week |
| 7.0-8.9 | No | Any | 2 weeks |
| <7.0 | Any | Any | Next release |

### Penetration Testing Scope

**Multi-Tenant Specific Tests:**
- [ ] Cross-tenant data access attempts
- [ ] Tenant ID manipulation
- [ ] Shared resource isolation
- [ ] Cache poisoning across tenants
- [ ] AI agent tenant boundary testing

**AI Component Tests:**
- [ ] Prompt injection (all known techniques)
- [ ] Model extraction attempts
- [ ] Training data extraction
- [ ] Output manipulation
- [ ] Budget exhaustion attacks

---

## Pattern References (Enhanced)

- **Zero Trust:** `{project-root}/_bmad/bam/data/patterns/zero-trust.md`
- **Secrets:** `{project-root}/_bmad/bam/data/patterns/secrets-management.md`
- **Incident:** `{project-root}/_bmad/bam/data/patterns/incident-response.md`
EOF
```

- [ ] **Step 3: Verify the file was enhanced**

Run: `wc -l src-v2/data/domains/security.md`
Expected: 280+ lines (was 171)

- [ ] **Step 4: Commit**

```bash
git add src-v2/data/domains/security.md
git commit -m "feat(domains): enhance security domain with AI and threat modeling

Adds comprehensive coverage for:
- Prompt injection prevention with detection flow
- AI red teaming checklist
- LLM security controls (input/output/execution)
- STRIDE analysis per component
- Attack tree methodology
- Vulnerability management with patch priority
- Multi-tenant penetration testing scope

Grows domain from 171 to 280+ lines"
```

---

## Task 8: Create Security Operations Skill

**Files:**
- Create: `src-v2/skills/bmad-bam-security-operations/SKILL.md`
- Create: `src-v2/skills/bmad-bam-security-operations/bmad-skill-manifest.yaml`
- Create: `src-v2/skills/bmad-bam-security-operations/customize.toml`
- Create: `src-v2/skills/bmad-bam-security-operations/workflow.md`
- Create: `src-v2/skills/bmad-bam-security-operations/steps/` (multiple files)

- [ ] **Step 1: Create skill directory structure**

```bash
mkdir -p src-v2/skills/bmad-bam-security-operations/steps
```

- [ ] **Step 2: Create SKILL.md**

```bash
cat > src-v2/skills/bmad-bam-security-operations/SKILL.md << 'EOF'
---
name: bmad-bam-security-operations
description: 'Design secrets management, threat models, and incident response procedures'
module: bam
tags: [security, operations, workflow]
---

# Security Operations

## Overview

This workflow consolidates three security domains: secrets management, threat modeling, and incident response. It produces security operations documentation for multi-tenant SaaS platforms with AI agents.

## Sub-Workflows

| Focus | Menu Code | Steps | Output |
|-------|-----------|-------|--------|
| Secrets | ZSR | step-02-c, step-03-c | secrets-management-design.md |
| Threat Model | ZST | step-04-c, step-05-c | threat-model.md |
| Incident | ZIR | step-06-c, step-07-c | incident-response-plan.md |

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new security operations docs | step-01-c to step-07-c |
| Edit | Modify existing docs | step-10-e to step-11-e |
| Validate | Check against QG-S3/QG-IR criteria | step-20-v to step-22-v |

## Prerequisites

- Master architecture defined (QG-F1 passed)
- Tenant model selected: `{tenant_model}`
- **Load patterns:** `{project-root}/_bmad/bam/data/patterns/secrets-management.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/patterns/incident-response.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/patterns/zero-trust.md`

## Quality Gates

- **QG-S3:** Security baseline validation
- **QG-IR:** Incident response readiness

## Outputs

- `{output_folder}/planning-artifacts/security/secrets-management-design.md`
- `{output_folder}/planning-artifacts/security/threat-model.md`
- `{output_folder}/planning-artifacts/security/incident-response-plan.md`

## Related Workflows

- `bmad-bam-compliance` - Compliance framework mapping
- `bmad-bam-convergence` - Integration security verification
- `bmad-bam-production-readiness` - Production security checklist

## On Activation

### Step 1: Resolve the Workflow Block

Run: `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow`

**If the script fails**, resolve the `workflow` block yourself by reading these files in base → team → user order:

1. `{skill-root}/customize.toml` — defaults
2. `{project-root}/_bmad/custom/{skill-name}.toml` — team overrides
3. `{project-root}/_bmad/custom/{skill-name}.user.toml` — personal overrides

Apply merge rules: scalars override, tables deep-merge, arrays of tables keyed by `code`/`id` replace matching and append new, other arrays append.

### Step 2: Execute Prepend Steps

Execute each entry in `{workflow.activation_steps_prepend}` in order.

### Step 3: Load Persistent Facts

Treat every entry in `{workflow.persistent_facts}` as foundational context.
- Entries prefixed `file:` are paths/globs — load contents as facts
- Other entries are literal facts

### Step 4: Load Config

Load from `{project-root}/_bmad/bam/config.yaml`:
- `{user_name}` - greeting
- `{communication_language}` - spoken output
- `{document_output_language}` - written documents
- `{planning_artifacts}` - output location
- `{tenant_model}` - BAM isolation model
- `{ai_runtime}` - BAM AI framework

### Step 5: Greet the User

Greet `{user_name}`, speaking in `{communication_language}`.

### Step 6: Execute Append Steps

Execute each entry in `{workflow.activation_steps_append}` in order.

Activation complete. Begin execution by reading `workflow.md`.

## Domain References

- `{project-root}/_bmad/bam/data/domains/security.md`
- `{project-root}/_bmad/bam/data/checklists/qg-s3.md`
- `{project-root}/_bmad/bam/data/checklists/qg-ir.md`
EOF
```

- [ ] **Step 3: Create bmad-skill-manifest.yaml**

```bash
cat > src-v2/skills/bmad-bam-security-operations/bmad-skill-manifest.yaml << 'EOF'
type: workflow
name: bmad-bam-security-operations
displayName: Security Operations
description: 'Design secrets management, threat models, and incident response'
module: bam
step_naming_convention: "step-NN-mode-description"
EOF
```

- [ ] **Step 4: Create customize.toml**

```bash
cat > src-v2/skills/bmad-bam-security-operations/customize.toml << 'EOF'
# Workflow customization for bmad-bam-security-operations
#
# Merge Order (base → team → user):
#   1. {skill-root}/customize.toml (this file)
#   2. {project-root}/_bmad/custom/bmad-bam-security-operations.toml (team)
#   3. {project-root}/_bmad/custom/bmad-bam-security-operations.user.toml (personal)

[workflow]

activation_steps_prepend = [
  "Loading Security Operations workflow context.",
]

activation_steps_append = [
  "Select focus area: secrets (ZSR), threat modeling (ZST), or incident response (ZIR)",
  "Verify {tenant_model} is configured for tenant-scoped security",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
  "file:{project-root}/_bmad/bam/data/domains/security.md",
  "file:{project-root}/_bmad/bam/data/patterns/secrets-management.md",
  "file:{project-root}/_bmad/bam/data/patterns/incident-response.md",
  "file:{project-root}/_bmad/bam/data/patterns/zero-trust.md",
  "file:{project-root}/_bmad/bam/data/checklists/qg-s3.md",
  "file:{project-root}/_bmad/bam/data/checklists/qg-ir.md",
]

on_complete = """
Security Operations workflow complete.

**Quality Gates:** QG-S3, QG-IR
Run validation mode to verify compliance.

**Next Workflows:**
- bmad-bam-compliance for framework mapping
- bmad-bam-production-readiness for final validation
"""
EOF
```

- [ ] **Step 5: Create workflow.md**

```bash
cat > src-v2/skills/bmad-bam-security-operations/workflow.md << 'EOF'
# Security Operations

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate security operations documentation | `step-01-c-*` through `step-07-c-*` |
| **Edit** | Modify existing documentation | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Check against QG-S3/QG-IR criteria | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless documentation exists.

## Create Mode

Generate security operations documentation. Select focus area:

### Focus: Secrets Management (ZSR)
1. **step-01-c-select-focus** - Select secrets management focus
2. **step-02-c-secrets-analysis** - Analyze secret requirements
3. **step-03-c-secrets-rotation** - Design rotation strategy

### Focus: Threat Modeling (ZST)
1. **step-01-c-select-focus** - Select threat modeling focus
2. **step-04-c-threat-stride** - Conduct STRIDE analysis
3. **step-05-c-threat-mitigations** - Define mitigations

### Focus: Incident Response (ZIR)
1. **step-01-c-select-focus** - Select incident response focus
2. **step-06-c-incident-classification** - Define severity classification
3. **step-07-c-incident-runbooks** - Create runbooks

## Edit Mode

Modify existing security operations documentation:

1. **step-10-e-load** - Load existing documentation
2. **step-11-e-apply** - Apply updates

## Validate Mode

Validate against quality gate criteria:

1. **step-20-v-load** - Load docs and QG-S3/QG-IR checklists
2. **step-21-v-validate** - Execute validation checks
3. **step-22-v-report** - Generate validation report

## Quality Gate Outcomes

| Outcome | Description | Next Step |
|---------|-------------|-----------|
| PASS | All gates pass | Proceed to production readiness |
| CONDITIONAL | All critical pass, some gaps | Document mitigations |
| FAIL | Any critical fails | Address blockers |
EOF
```

- [ ] **Step 6: Create step files**

```bash
cat > src-v2/skills/bmad-bam-security-operations/steps/step-01-c-select-focus.md << 'EOF'
# Step 01: Select Security Operations Focus

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting options** and await user selection
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Select which security operations area to work on
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Load security domain and patterns
- 🚫 Do NOT: Execute any design steps yet

---

## YOUR TASK:

Present the three security operations focus areas and await user selection:

### Option 1: Secrets Management (ZSR)
- Design tenant-scoped secrets isolation
- Define rotation strategies
- Configure vault integration
- **Output:** `secrets-management-design.md`
- **Quality Gate:** QG-S3

### Option 2: Threat Modeling (ZST)
- Conduct STRIDE analysis per component
- Build attack trees
- Define threat-to-control mapping
- **Output:** `threat-model.md`
- **Quality Gate:** QG-S3

### Option 3: Incident Response (ZIR)
- Define severity classification
- Create escalation paths
- Design tenant notification procedures
- **Output:** `incident-response-plan.md`
- **Quality Gate:** QG-IR

---

## NEXT STEP:

Based on user selection:
- ZSR → Proceed to `step-02-c-secrets-analysis.md`
- ZST → Proceed to `step-04-c-threat-stride.md`
- ZIR → Proceed to `step-06-c-incident-classification.md`
EOF
```

```bash
cat > src-v2/skills/bmad-bam-security-operations/steps/step-02-c-secrets-analysis.md << 'EOF'
# Step 02: Analyze Secret Requirements

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔍 Use web search: Verify patterns against current best practices

## EXECUTION PROTOCOLS

- 🎯 Focus: Analyze secrets landscape for multi-tenant platform
- 💾 Track: `stepsCompleted: [1, 2]` when complete
- 📖 Context: Load secrets-management pattern
- 🚫 Do NOT: Design rotation yet (that's Step 03)

---

## Prerequisites

- **Load pattern:** `{project-root}/_bmad/bam/data/patterns/secrets-management.md`
- Tenant model selected: `{tenant_model}`

---

## YOUR TASK:

### 1. Identify Secret Categories

Document all secret types in the platform:

| Category | Examples | Tenant-Scoped | Rotation Required |
|----------|----------|---------------|-------------------|
| Platform | DB credentials, API keys | No | Yes |
| Tenant | OAuth tokens, API keys | Yes | Yes |
| Agent | Execution tokens | Yes | Per-request |
| Encryption | KEKs, DEKs | Per-tier | Yes |

### 2. Define Isolation Requirements

Based on `{tenant_model}`:

| Tenant Model | Isolation Level | Implementation |
|--------------|-----------------|----------------|
| RLS | Path-based | `/tenants/{tenant_id}/` |
| Schema | Namespace | Vault namespace per tenant |
| Database | Full isolation | Dedicated vault instance |

### 3. Identify Vault Provider

Present options for user selection:
- HashiCorp Vault (self-hosted)
- AWS Secrets Manager
- Azure Key Vault
- GCP Secret Manager

---

## SUCCESS METRICS:

- [ ] All secret categories identified
- [ ] Isolation requirements defined
- [ ] Vault provider selected

---

## NEXT STEP:

Proceed to `step-03-c-secrets-rotation.md` to design rotation strategy.
EOF
```

```bash
cat > src-v2/skills/bmad-bam-security-operations/steps/step-03-c-secrets-rotation.md << 'EOF'
# Step 03: Design Secrets Rotation Strategy

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔍 Use web search: Verify rotation patterns against current best practices

## EXECUTION PROTOCOLS

- 🎯 Focus: Design zero-downtime rotation strategy
- 💾 Track: `stepsCompleted: [1, 2, 3]` when complete
- 📖 Context: Build on analysis from Step 02
- ⚠️ Gate: QG-S3 - Security baseline validation

---

## YOUR TASK:

### 1. Define Rotation Schedule

| Secret Type | Rotation Period | Trigger | Automation |
|-------------|-----------------|---------|------------|
| Platform credentials | 90 days | Scheduled | Full |
| Tenant API keys | 30 days | Scheduled + on-demand | Full |
| Agent tokens | 15 minutes | Per-request | Full |
| Encryption keys | 365 days | Scheduled | Partial |

### 2. Design Zero-Downtime Rotation

```
Phase 1: Generate new secret
Phase 2: Dual-active period (both secrets valid)
Phase 3: Update consumers
Phase 4: Deprecate old secret
Phase 5: Delete old secret
```

### 3. Document Agent Credential Flow

Short-lived tokens for AI agent execution:
- TTL: 15 minutes
- Renewable: Yes, up to 60 minutes total
- Scopes: Tenant-specific, tool-limited

---

## OUTPUT:

Generate `{output_folder}/planning-artifacts/security/secrets-management-design.md` using template:
`{project-root}/_bmad/bam/data/templates/secrets-management-design.md`

---

## SUCCESS METRICS:

- [ ] Rotation schedule defined for all secret types
- [ ] Zero-downtime rotation flow documented
- [ ] Agent credential flow documented
- [ ] Output document generated

---

## NEXT STEP:

Security operations workflow complete for secrets management.
Run validation mode (step-20-v) to verify against QG-S3.
EOF
```

```bash
cat > src-v2/skills/bmad-bam-security-operations/steps/step-04-c-threat-stride.md << 'EOF'
# Step 04: Conduct STRIDE Analysis

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔍 Use web search: Verify threat patterns against current best practices

## EXECUTION PROTOCOLS

- 🎯 Focus: STRIDE analysis for multi-tenant components
- 💾 Track: `stepsCompleted: [1, 4]` when complete
- 📖 Context: Load security domain
- 🚫 Do NOT: Define mitigations yet (that's Step 05)

---

## YOUR TASK:

### 1. Identify Components

List all components requiring threat analysis:
- API Gateway
- Authentication Service
- Tenant Service
- Database Layer
- AI Agent Runtime
- Cache Layer

### 2. STRIDE Analysis per Component

For each component, analyze:

| Threat | S | T | R | I | D | E |
|--------|---|---|---|---|---|---|
| Spoofing | Identity impersonation |
| Tampering | Data modification |
| Repudiation | Deny actions |
| Information Disclosure | Data leak |
| Denial of Service | Resource exhaustion |
| Elevation of Privilege | Unauthorized access |

### 3. Document Cross-Tenant Threats

Special focus on multi-tenant attack vectors:
- Cross-tenant data access
- Tenant ID manipulation
- Shared resource exploitation
- AI agent tenant boundary bypass

---

## SUCCESS METRICS:

- [ ] All components identified
- [ ] STRIDE analysis complete per component
- [ ] Cross-tenant threats documented

---

## NEXT STEP:

Proceed to `step-05-c-threat-mitigations.md` to define mitigations.
EOF
```

```bash
cat > src-v2/skills/bmad-bam-security-operations/steps/step-05-c-threat-mitigations.md << 'EOF'
# Step 05: Define Threat Mitigations

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⚠️ Gate: QG-S3 - Security baseline validation

## EXECUTION PROTOCOLS

- 🎯 Focus: Define mitigations for identified threats
- 💾 Track: `stepsCompleted: [1, 4, 5]` when complete
- 📖 Context: Build on STRIDE analysis from Step 04

---

## YOUR TASK:

### 1. Threat-to-Control Mapping

| Threat | Control | Implementation | Verification |
|--------|---------|----------------|--------------|
| Cross-tenant access | RLS | PostgreSQL policies | Integration tests |
| Prompt injection | Input filter | Classifier + rules | Red team |
| Session hijack | Token rotation | Short-lived JWTs | Pen test |

### 2. Build Attack Trees

Document attack paths for critical threats with mitigations at each node.

### 3. Define Residual Risk

For each threat, document:
- Likelihood (after mitigation)
- Impact (if realized)
- Residual risk acceptance

---

## OUTPUT:

Generate `{output_folder}/planning-artifacts/security/threat-model.md` using template:
`{project-root}/_bmad/bam/data/templates/threat-model.md`

---

## SUCCESS METRICS:

- [ ] All threats have defined mitigations
- [ ] Attack trees documented
- [ ] Residual risk documented
- [ ] Output document generated

---

## NEXT STEP:

Security operations workflow complete for threat modeling.
Run validation mode (step-20-v) to verify against QG-S3.
EOF
```

```bash
cat > src-v2/skills/bmad-bam-security-operations/steps/step-06-c-incident-classification.md << 'EOF'
# Step 06: Define Incident Severity Classification

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔍 Use web search: Verify incident patterns against current best practices

## EXECUTION PROTOCOLS

- 🎯 Focus: Define severity classification and escalation
- 💾 Track: `stepsCompleted: [1, 6]` when complete
- 📖 Context: Load incident-response pattern
- 🚫 Do NOT: Create runbooks yet (that's Step 07)

---

## Prerequisites

- **Load pattern:** `{project-root}/_bmad/bam/data/patterns/incident-response.md`

---

## YOUR TASK:

### 1. Define Severity Levels

| Severity | Impact | Response Time | Escalation |
|----------|--------|---------------|------------|
| P0 | All tenants affected | 15 min | Exec |
| P1 | Multiple tenants | 1 hour | Manager |
| P2 | Single tenant | 4 hours | Team lead |
| P3 | Minor, workaround exists | 24 hours | On-call |

### 2. Define Tenant Impact Matrix

How notification varies by tenant tier for each severity:

| Severity | Free Tier | Pro Tier | Enterprise |
|----------|-----------|----------|------------|
| P0 | Dashboard | Email + Dashboard | Phone |
| P1 | Dashboard | Email | Email + Slack |
| P2 | Dashboard | Dashboard | Email |
| P3 | - | Dashboard | Dashboard |

### 3. Define Escalation Paths

Document who is contacted at each escalation level.

---

## SUCCESS METRICS:

- [ ] Severity levels defined
- [ ] Tenant impact matrix complete
- [ ] Escalation paths documented

---

## NEXT STEP:

Proceed to `step-07-c-incident-runbooks.md` to create runbooks.
EOF
```

```bash
cat > src-v2/skills/bmad-bam-security-operations/steps/step-07-c-incident-runbooks.md << 'EOF'
# Step 07: Create Incident Runbooks

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⚠️ Gate: QG-IR - Incident response readiness

## EXECUTION PROTOCOLS

- 🎯 Focus: Create runbooks for common incident types
- 💾 Track: `stepsCompleted: [1, 6, 7]` when complete
- 📖 Context: Build on classification from Step 06

---

## YOUR TASK:

### 1. Identify Common Incident Types

- Platform outage
- Security breach (suspected)
- Data leak (suspected)
- Performance degradation
- AI agent safety incident
- Single tenant issue

### 2. Create Runbook Template

For each incident type:
1. Detection criteria
2. Initial triage steps
3. Communication template
4. Mitigation actions
5. Resolution verification
6. Postmortem trigger

### 3. Define Communication Templates

Create templates for:
- Initial notification
- Status update
- Resolution announcement
- RCA summary

---

## OUTPUT:

Generate `{output_folder}/planning-artifacts/security/incident-response-plan.md` using template:
`{project-root}/_bmad/bam/data/templates/incident-response.md`

---

## SUCCESS METRICS:

- [ ] Runbooks created for all incident types
- [ ] Communication templates defined
- [ ] Postmortem process documented
- [ ] Output document generated

---

## NEXT STEP:

Security operations workflow complete for incident response.
Run validation mode (step-20-v) to verify against QG-IR.
EOF
```

```bash
cat > src-v2/skills/bmad-bam-security-operations/steps/step-10-e-load.md << 'EOF'
# Step 10: Load Existing Security Documentation

## EXECUTION PROTOCOLS

- 🎯 Focus: Load existing security operations documentation for editing
- 💾 Track: `stepsCompleted: [10]` when complete

---

## YOUR TASK:

Load existing documentation from:
- `{output_folder}/planning-artifacts/security/secrets-management-design.md`
- `{output_folder}/planning-artifacts/security/threat-model.md`
- `{output_folder}/planning-artifacts/security/incident-response-plan.md`

Present current state and await user direction on what to update.

---

## NEXT STEP:

Proceed to `step-11-e-apply.md` to apply updates.
EOF
```

```bash
cat > src-v2/skills/bmad-bam-security-operations/steps/step-11-e-apply.md << 'EOF'
# Step 11: Apply Security Documentation Updates

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply user-directed updates to documentation
- 💾 Track: `stepsCompleted: [10, 11]` when complete

---

## YOUR TASK:

Apply the requested changes to the loaded documentation.
Preserve all unchanged sections.
Document what was changed in the document's change log.

---

## NEXT STEP:

Edit complete. Consider running validation mode (step-20-v) to verify changes.
EOF
```

```bash
cat > src-v2/skills/bmad-bam-security-operations/steps/step-20-v-load.md << 'EOF'
# Step 20: Load for Validation

## EXECUTION PROTOCOLS

- 🎯 Focus: Load documentation and quality gate checklists
- 💾 Track: `stepsCompleted: [20]` when complete

---

## YOUR TASK:

Load:
1. Security documentation to validate
2. Quality gate checklists:
   - `{project-root}/_bmad/bam/data/checklists/qg-s3.md`
   - `{project-root}/_bmad/bam/data/checklists/qg-ir.md`

---

## NEXT STEP:

Proceed to `step-21-v-validate.md` to execute validation.
EOF
```

```bash
cat > src-v2/skills/bmad-bam-security-operations/steps/step-21-v-validate.md << 'EOF'
# Step 21: Execute Validation Checks

## EXECUTION PROTOCOLS

- 🎯 Focus: Validate documentation against quality gates
- 💾 Track: `stepsCompleted: [20, 21]` when complete
- ⚠️ Gate: QG-S3, QG-IR

---

## YOUR TASK:

For each checklist item in QG-S3 and QG-IR:
1. Check if documentation addresses the requirement
2. Mark as PASS, FAIL, or N/A
3. Document evidence or gaps

---

## NEXT STEP:

Proceed to `step-22-v-report.md` to generate validation report.
EOF
```

```bash
cat > src-v2/skills/bmad-bam-security-operations/steps/step-22-v-report.md << 'EOF'
# Step 22: Generate Validation Report

## EXECUTION PROTOCOLS

- 🎯 Focus: Generate final validation report with gate decisions
- 💾 Track: `stepsCompleted: [20, 21, 22]` when complete

---

## YOUR TASK:

Generate validation report with:

| Gate | Result | Critical Pass | Standard Pass |
|------|--------|---------------|---------------|
| QG-S3 | PASS/CONDITIONAL/FAIL | X/Y | X/Y |
| QG-IR | PASS/CONDITIONAL/FAIL | X/Y | X/Y |

Document any conditions or required remediations.

---

## WORKFLOW COMPLETE

Security operations validation complete.
EOF
```

- [ ] **Step 7: Verify skill structure**

Run: `ls -la src-v2/skills/bmad-bam-security-operations/ && ls src-v2/skills/bmad-bam-security-operations/steps/`
Expected: 4 root files + 12 step files

- [ ] **Step 8: Commit**

```bash
git add src-v2/skills/bmad-bam-security-operations/
git commit -m "feat(skills): add bmad-bam-security-operations workflow

Consolidates three security domains:
- Secrets Management (ZSR): tenant-scoped secrets, rotation
- Threat Modeling (ZST): STRIDE analysis, mitigations
- Incident Response (ZIR): classification, runbooks

Includes:
- SKILL.md with 6-step activation
- customize.toml with persistent facts
- workflow.md with mode router
- 12 step files (create, edit, validate modes)

Quality Gates: QG-S3, QG-IR"
```

---

## Task 9: Create Resilience Skill

**Files:**
- Create: `src-v2/skills/bmad-bam-resilience/` (similar structure to Task 8)

- [ ] **Step 1: Create skill directory and files**

```bash
mkdir -p src-v2/skills/bmad-bam-resilience/steps

cat > src-v2/skills/bmad-bam-resilience/SKILL.md << 'EOF'
---
name: bmad-bam-resilience
description: 'Design disaster recovery and chaos engineering procedures'
module: bam
tags: [resilience, operations, workflow]
---

# Resilience

## Overview

This workflow consolidates disaster recovery and chaos engineering. It produces resilience documentation for multi-tenant SaaS platforms.

## Sub-Workflows

| Focus | Menu Code | Steps | Output |
|-------|-----------|-------|--------|
| Disaster Recovery | ZDR | step-02-c, step-03-c | disaster-recovery-plan.md |
| Chaos Engineering | ZCH | step-04-c, step-05-c | chaos-engineering-plan.md |

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate resilience documentation | step-01-c to step-05-c |
| Edit | Modify existing docs | step-10-e to step-11-e |
| Validate | Check against QG-DR/QG-CE1 | step-20-v to step-22-v |

## Prerequisites

- Master architecture defined (QG-F1 passed)
- Tenant model selected: `{tenant_model}`
- **Load patterns:** `{project-root}/_bmad/bam/data/patterns/disaster-recovery.md`

## Quality Gates

- **QG-DR:** Disaster recovery readiness
- **QG-CE1:** Chaos engineering validation

## Outputs

- `{output_folder}/planning-artifacts/resilience/disaster-recovery-plan.md`
- `{output_folder}/planning-artifacts/resilience/chaos-engineering-plan.md`

## Related Workflows

- `bmad-bam-production-readiness` - Production resilience verification
- `bmad-bam-observability` - Monitoring for resilience

## On Activation

### Step 1: Resolve the Workflow Block

Run: `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow`

**If the script fails**, resolve the `workflow` block yourself by reading these files in base → team → user order:

1. `{skill-root}/customize.toml` — defaults
2. `{project-root}/_bmad/custom/{skill-name}.toml` — team overrides
3. `{project-root}/_bmad/custom/{skill-name}.user.toml` — personal overrides

### Step 2-6: Standard activation sequence

Activation complete. Begin execution by reading `workflow.md`.

## Domain References

- `{project-root}/_bmad/bam/data/domains/deployment.md`
- `{project-root}/_bmad/bam/data/checklists/qg-dr.md`
- `{project-root}/_bmad/bam/data/checklists/qg-ce1.md`
EOF

cat > src-v2/skills/bmad-bam-resilience/bmad-skill-manifest.yaml << 'EOF'
type: workflow
name: bmad-bam-resilience
displayName: Resilience
description: 'Design disaster recovery and chaos engineering'
module: bam
step_naming_convention: "step-NN-mode-description"
EOF

cat > src-v2/skills/bmad-bam-resilience/customize.toml << 'EOF'
[workflow]

activation_steps_prepend = [
  "Loading Resilience workflow context.",
]

activation_steps_append = [
  "Select focus: disaster recovery (ZDR) or chaos engineering (ZCH)",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
  "file:{project-root}/_bmad/bam/data/patterns/disaster-recovery.md",
  "file:{project-root}/_bmad/bam/data/checklists/qg-dr.md",
  "file:{project-root}/_bmad/bam/data/checklists/qg-ce1.md",
]

on_complete = """
Resilience workflow complete.

**Quality Gates:** QG-DR, QG-CE1
Run validation mode to verify compliance.
"""
EOF

cat > src-v2/skills/bmad-bam-resilience/workflow.md << 'EOF'
# Resilience

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate resilience documentation | `step-01-c-*` through `step-05-c-*` |
| **Edit** | Modify existing documentation | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Check against QG-DR/QG-CE1 | `step-20-v-*` through `step-22-v-*` |

## Create Mode

### Focus: Disaster Recovery (ZDR)
1. **step-01-c-select-focus** - Select DR focus
2. **step-02-c-dr-rto-rpo** - Define RTO/RPO targets
3. **step-03-c-dr-failover** - Design failover procedures

### Focus: Chaos Engineering (ZCH)
1. **step-01-c-select-focus** - Select chaos focus
2. **step-04-c-chaos-blast-radius** - Define blast radius
3. **step-05-c-chaos-experiments** - Design experiments

## Quality Gate Outcomes

| Outcome | Description | Next Step |
|---------|-------------|-----------|
| PASS | All gates pass | Proceed to production |
| CONDITIONAL | All critical pass | Document mitigations |
| FAIL | Any critical fails | Address blockers |
EOF
```

- [ ] **Step 2: Create step files**

```bash
cat > src-v2/skills/bmad-bam-resilience/steps/step-01-c-select-focus.md << 'EOF'
# Step 01: Select Resilience Focus

## EXECUTION PROTOCOLS

- 🎯 Focus: Select DR or chaos engineering
- 💾 Track: `stepsCompleted: [1]` when complete

---

## YOUR TASK:

Present options:

### Option 1: Disaster Recovery (ZDR)
- Define RTO/RPO per tenant tier
- Design failover procedures
- Document recovery runbooks
- **Output:** `disaster-recovery-plan.md`

### Option 2: Chaos Engineering (ZCH)
- Define blast radius controls
- Design tenant-safe experiments
- Document hypothesis and metrics
- **Output:** `chaos-engineering-plan.md`

---

## NEXT STEP:

- ZDR → `step-02-c-dr-rto-rpo.md`
- ZCH → `step-04-c-chaos-blast-radius.md`
EOF

cat > src-v2/skills/bmad-bam-resilience/steps/step-02-c-dr-rto-rpo.md << 'EOF'
# Step 02: Define RTO/RPO Targets

## EXECUTION PROTOCOLS

- 🎯 Focus: Define recovery targets per tenant tier
- 💾 Track: `stepsCompleted: [1, 2]` when complete
- 📖 Context: Load disaster-recovery pattern

---

## YOUR TASK:

### 1. Define Tier-Based Targets

| Tier | RTO | RPO | Backup Strategy |
|------|-----|-----|-----------------|
| Free | 24h | 24h | Cold |
| Pro | 4h | 1h | Warm |
| Enterprise | 1h | 15min | Hot |

### 2. Define Data Priority

Which data categories are recovered first.

---

## NEXT STEP:

Proceed to `step-03-c-dr-failover.md`
EOF

cat > src-v2/skills/bmad-bam-resilience/steps/step-03-c-dr-failover.md << 'EOF'
# Step 03: Design Failover Procedures

## EXECUTION PROTOCOLS

- 🎯 Focus: Design failover automation and runbooks
- 💾 Track: `stepsCompleted: [1, 2, 3]` when complete
- ⚠️ Gate: QG-DR

---

## YOUR TASK:

### 1. Failover Decision Points

Define triggers for automatic vs manual failover.

### 2. Failover Runbook

Step-by-step procedure for executing failover.

### 3. Recovery Verification

How to verify successful recovery.

---

## OUTPUT:

Generate `{output_folder}/planning-artifacts/resilience/disaster-recovery-plan.md`

---

## NEXT STEP:

DR workflow complete. Run validation (step-20-v).
EOF

cat > src-v2/skills/bmad-bam-resilience/steps/step-04-c-chaos-blast-radius.md << 'EOF'
# Step 04: Define Chaos Blast Radius

## EXECUTION PROTOCOLS

- 🎯 Focus: Define tenant-safe blast radius
- 💾 Track: `stepsCompleted: [1, 4]` when complete

---

## YOUR TASK:

### 1. Blast Radius Levels

| Level | Scope | Tenant Impact | Approval |
|-------|-------|---------------|----------|
| L1 | Single service replica | None | Team |
| L2 | Single service | <5% tenants | Manager |
| L3 | Multiple services | <20% tenants | Director |
| L4 | Region | >20% tenants | VP |

### 2. Tenant Safeguards

- Exclude enterprise tenants from experiments
- Automatic rollback triggers
- Communication plan

---

## NEXT STEP:

Proceed to `step-05-c-chaos-experiments.md`
EOF

cat > src-v2/skills/bmad-bam-resilience/steps/step-05-c-chaos-experiments.md << 'EOF'
# Step 05: Design Chaos Experiments

## EXECUTION PROTOCOLS

- 🎯 Focus: Design specific experiments
- 💾 Track: `stepsCompleted: [1, 4, 5]` when complete
- ⚠️ Gate: QG-CE1

---

## YOUR TASK:

### 1. Experiment Catalog

| Experiment | Hypothesis | Blast Radius | Metrics |
|------------|------------|--------------|---------|
| Service shutdown | Auto-recovery <1min | L1 | Uptime |
| Network partition | Graceful degrade | L2 | Errors |
| Resource exhaustion | Rate limiting works | L1 | Latency |

### 2. Runbook per Experiment

Include abort procedures and rollback.

---

## OUTPUT:

Generate `{output_folder}/planning-artifacts/resilience/chaos-engineering-plan.md`

---

## NEXT STEP:

Chaos workflow complete. Run validation (step-20-v).
EOF

cat > src-v2/skills/bmad-bam-resilience/steps/step-10-e-load.md << 'EOF'
# Step 10: Load Existing Resilience Documentation

Load existing docs for editing.

## NEXT STEP:

Proceed to `step-11-e-apply.md`
EOF

cat > src-v2/skills/bmad-bam-resilience/steps/step-11-e-apply.md << 'EOF'
# Step 11: Apply Resilience Updates

Apply requested changes.

## NEXT STEP:

Edit complete.
EOF

cat > src-v2/skills/bmad-bam-resilience/steps/step-20-v-load.md << 'EOF'
# Step 20: Load for Validation

Load docs and QG-DR/QG-CE1 checklists.

## NEXT STEP:

Proceed to `step-21-v-validate.md`
EOF

cat > src-v2/skills/bmad-bam-resilience/steps/step-21-v-validate.md << 'EOF'
# Step 21: Execute Validation

Validate against QG-DR and QG-CE1.

## NEXT STEP:

Proceed to `step-22-v-report.md`
EOF

cat > src-v2/skills/bmad-bam-resilience/steps/step-22-v-report.md << 'EOF'
# Step 22: Generate Validation Report

Generate final report with gate decisions.

## WORKFLOW COMPLETE
EOF
```

- [ ] **Step 3: Commit**

```bash
git add src-v2/skills/bmad-bam-resilience/
git commit -m "feat(skills): add bmad-bam-resilience workflow

Consolidates:
- Disaster Recovery (ZDR): RTO/RPO, failover
- Chaos Engineering (ZCH): blast radius, experiments

Quality Gates: QG-DR, QG-CE1"
```

---

## Task 10: Create Privacy Compliance Skill

**Files:**
- Create: `src-v2/skills/bmad-bam-privacy-compliance/` (similar structure)

- [ ] **Step 1: Create skill directory and files**

```bash
mkdir -p src-v2/skills/bmad-bam-privacy-compliance/steps

cat > src-v2/skills/bmad-bam-privacy-compliance/SKILL.md << 'EOF'
---
name: bmad-bam-privacy-compliance
description: 'Design GDPR and privacy compliance procedures'
module: bam
tags: [compliance, privacy, workflow]
---

# Privacy Compliance

## Overview

This workflow designs privacy compliance for multi-tenant SaaS, focusing on GDPR, CCPA, and data subject rights.

## Sub-Workflows

| Focus | Menu Code | Steps | Output |
|-------|-----------|-------|--------|
| GDPR | ZGD | step-01-c through step-04-c | privacy-compliance-assessment.md |

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate privacy compliance docs | step-01-c to step-04-c |
| Edit | Modify existing docs | step-10-e to step-11-e |
| Validate | Check against QG-CC criteria | step-20-v to step-22-v |

## Prerequisites

- Tenant model selected: `{tenant_model}`
- **Load domain:** `{project-root}/_bmad/bam/data/domains/compliance.md`

## Quality Gates

- **QG-CC:** Continuous compliance (via qg-ops.md)

## Outputs

- `{output_folder}/planning-artifacts/compliance/privacy-compliance-assessment.md`
- `{output_folder}/planning-artifacts/compliance/gdpr-dsar-procedures.md`

## Related Workflows

- `bmad-bam-compliance` - General compliance mapping
- `bmad-bam-data-residency` - Data residency requirements

## On Activation

Standard 6-step activation sequence.

## Domain References

- `{project-root}/_bmad/bam/data/domains/compliance.md`
- `{project-root}/_bmad/bam/data/checklists/qg-ops.md`
EOF

cat > src-v2/skills/bmad-bam-privacy-compliance/bmad-skill-manifest.yaml << 'EOF'
type: workflow
name: bmad-bam-privacy-compliance
displayName: Privacy Compliance
description: 'Design GDPR and privacy compliance'
module: bam
step_naming_convention: "step-NN-mode-description"
EOF

cat > src-v2/skills/bmad-bam-privacy-compliance/customize.toml << 'EOF'
[workflow]

activation_steps_prepend = [
  "Loading Privacy Compliance workflow context.",
]

activation_steps_append = [
  "Focus on GDPR data subject rights and DSAR automation",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
  "file:{project-root}/_bmad/bam/data/domains/compliance.md",
  "file:{project-root}/_bmad/bam/data/compliance-frameworks.csv",
  "file:{project-root}/_bmad/bam/data/checklists/qg-ops.md",
]

on_complete = """
Privacy Compliance workflow complete.

**Quality Gate:** QG-CC
Run validation mode to verify compliance.
"""
EOF

cat > src-v2/skills/bmad-bam-privacy-compliance/workflow.md << 'EOF'
# Privacy Compliance

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate privacy compliance docs | `step-01-c-*` through `step-04-c-*` |
| **Edit** | Modify existing docs | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Check against QG-CC criteria | `step-20-v-*` through `step-22-v-*` |

## Create Mode

1. **step-01-c-data-mapping** - Map personal data flows
2. **step-02-c-consent-management** - Design consent mechanisms
3. **step-03-c-dsar-automation** - Automate data subject requests
4. **step-04-c-cross-border** - Address cross-border transfers

## Quality Gate Outcomes

| Outcome | Description | Next Step |
|---------|-------------|-----------|
| PASS | All checks pass | Maintain compliance |
| CONDITIONAL | Gaps identified | Remediation plan |
| FAIL | Critical gaps | Block until resolved |
EOF
```

- [ ] **Step 2: Create step files**

```bash
cat > src-v2/skills/bmad-bam-privacy-compliance/steps/step-01-c-data-mapping.md << 'EOF'
# Step 01: Map Personal Data Flows

## EXECUTION PROTOCOLS

- 🎯 Focus: Identify and map all personal data
- 💾 Track: `stepsCompleted: [1]` when complete

---

## YOUR TASK:

### 1. Data Inventory

| Data Category | Collection Point | Storage | Retention |
|---------------|------------------|---------|-----------|
| User PII | Registration | Database | Account lifetime |
| Usage data | API calls | Logs | 90 days |
| Payment | Checkout | Encrypted DB | Regulatory |

### 2. Data Flow Diagram

Map how personal data flows through the system.

### 3. Third-Party Processors

List all processors and their purposes.

---

## NEXT STEP:

Proceed to `step-02-c-consent-management.md`
EOF

cat > src-v2/skills/bmad-bam-privacy-compliance/steps/step-02-c-consent-management.md << 'EOF'
# Step 02: Design Consent Management

## EXECUTION PROTOCOLS

- 🎯 Focus: Design granular consent mechanisms
- 💾 Track: `stepsCompleted: [1, 2]` when complete

---

## YOUR TASK:

### 1. Consent Categories

| Purpose | Required | Granular | Withdrawable |
|---------|----------|----------|--------------|
| Service delivery | Yes | No | Account deletion |
| Marketing | No | Yes | One-click |
| Analytics | No | Yes | One-click |

### 2. Consent Collection UI

Design consent collection flow.

### 3. Consent Records

Schema for storing consent with audit trail.

---

## NEXT STEP:

Proceed to `step-03-c-dsar-automation.md`
EOF

cat > src-v2/skills/bmad-bam-privacy-compliance/steps/step-03-c-dsar-automation.md << 'EOF'
# Step 03: Automate Data Subject Requests

## EXECUTION PROTOCOLS

- 🎯 Focus: Design DSAR automation
- 💾 Track: `stepsCompleted: [1, 2, 3]` when complete

---

## YOUR TASK:

### 1. DSAR Types

| Request Type | Deadline | Automation Level |
|--------------|----------|------------------|
| Access | 30 days | Full |
| Erasure | 30 days | Semi (review) |
| Portability | 30 days | Full |
| Rectification | 30 days | Manual |

### 2. Automation Flow

Design self-service portal for common requests.

### 3. Verification

Identity verification before fulfilling requests.

---

## NEXT STEP:

Proceed to `step-04-c-cross-border.md`
EOF

cat > src-v2/skills/bmad-bam-privacy-compliance/steps/step-04-c-cross-border.md << 'EOF'
# Step 04: Address Cross-Border Transfers

## EXECUTION PROTOCOLS

- 🎯 Focus: Design compliant data transfers
- 💾 Track: `stepsCompleted: [1, 2, 3, 4]` when complete
- ⚠️ Gate: QG-CC

---

## YOUR TASK:

### 1. Transfer Mechanisms

| Destination | Mechanism | Documentation |
|-------------|-----------|---------------|
| EU adequate | None needed | Confirm adequacy |
| US | SCCs + supplementary | Signed agreement |
| Other | SCCs or consent | Case-by-case |

### 2. Data Residency

Support tenant-requested data residency.

---

## OUTPUT:

Generate:
- `{output_folder}/planning-artifacts/compliance/privacy-compliance-assessment.md`
- `{output_folder}/planning-artifacts/compliance/gdpr-dsar-procedures.md`

---

## NEXT STEP:

Privacy compliance workflow complete. Run validation (step-20-v).
EOF

cat > src-v2/skills/bmad-bam-privacy-compliance/steps/step-10-e-load.md << 'EOF'
# Step 10: Load Existing Privacy Documentation

Load existing docs for editing.

## NEXT STEP:

Proceed to `step-11-e-apply.md`
EOF

cat > src-v2/skills/bmad-bam-privacy-compliance/steps/step-11-e-apply.md << 'EOF'
# Step 11: Apply Privacy Updates

Apply requested changes.

## NEXT STEP:

Edit complete.
EOF

cat > src-v2/skills/bmad-bam-privacy-compliance/steps/step-20-v-load.md << 'EOF'
# Step 20: Load for Validation

Load docs and QG-CC checklist (qg-ops.md).

## NEXT STEP:

Proceed to `step-21-v-validate.md`
EOF

cat > src-v2/skills/bmad-bam-privacy-compliance/steps/step-21-v-validate.md << 'EOF'
# Step 21: Execute Validation

Validate against QG-CC criteria.

## NEXT STEP:

Proceed to `step-22-v-report.md`
EOF

cat > src-v2/skills/bmad-bam-privacy-compliance/steps/step-22-v-report.md << 'EOF'
# Step 22: Generate Validation Report

Generate final report with gate decisions.

## WORKFLOW COMPLETE
EOF
```

- [ ] **Step 3: Commit**

```bash
git add src-v2/skills/bmad-bam-privacy-compliance/
git commit -m "feat(skills): add bmad-bam-privacy-compliance workflow

Covers:
- Data mapping and inventory
- Consent management design
- DSAR automation (access, erasure, portability)
- Cross-border transfer mechanisms

Quality Gate: QG-CC"
```

---

## Task 11: Create TOML Extensions

**Files:**
- Create: `src-v2/customize/bmad-agent-devops.toml`
- Create: `src-v2/customize/bmad-agent-security.toml`
- Create: `src-v2/customize/bmad-agent-compliance.toml`
- Create: `src-v2/customize/bmad-agent-data.toml`

- [ ] **Step 1: Create bmad-agent-devops.toml**

```bash
cat > src-v2/customize/bmad-agent-devops.toml << 'EOF'
# BAM DevOps Extensions for bmad-agent-dev
# Adds disaster recovery, chaos engineering capabilities

[agent]
activation_steps_append = [
  "BAM DevOps capabilities available. Use ZRS for resilience workflows.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/patterns/disaster-recovery.md",
]

principles = [
  "BAM DevOps: Design for failure, test recovery regularly.",
  "BAM DevOps: Chaos experiments must be tenant-safe with blast radius containment.",
  "BAM DevOps: RTO/RPO targets vary by tenant tier.",
  "BAM Gates: QG-DR (Disaster Recovery), QG-CE1 (Chaos Engineering).",
]

[[agent.menu]]
code = "ZRS"
description = "Resilience: DR and chaos engineering workflows"
skill = "bmad-bam-resilience"

[[agent.menu]]
code = "ZPDR"
description = "Load: Disaster Recovery pattern details"
prompt = """
Loading disaster recovery pattern:
`{project-root}/_bmad/bam/data/patterns/disaster-recovery.md`

Confirm loaded. Ready for DR planning guidance.
"""
EOF
```

- [ ] **Step 2: Create bmad-agent-security.toml**

```bash
cat > src-v2/customize/bmad-agent-security.toml << 'EOF'
# BAM Security Extensions for bmad-agent-architect
# Adds secrets management, threat modeling, incident response

[agent]
activation_steps_append = [
  "BAM Security capabilities available. Use ZSO for security operations.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/patterns/secrets-management.md",
  "file:{project-root}/_bmad/bam/data/patterns/incident-response.md",
  "file:{project-root}/_bmad/bam/data/patterns/zero-trust.md",
]

principles = [
  "BAM Security: Zero trust for all tenant boundaries.",
  "BAM Security: Secrets must be tenant-isolated and rotatable.",
  "BAM Security: Incident response must include tenant notification.",
  "BAM Gates: QG-S3 (Security Baseline), QG-IR (Incident Response).",
]

[[agent.menu]]
code = "ZSO"
description = "Security Operations: secrets, threat modeling, incident response"
skill = "bmad-bam-security-operations"

[[agent.menu]]
code = "ZPZT"
description = "Load: Zero Trust pattern details"
prompt = """
Loading zero trust pattern:
`{project-root}/_bmad/bam/data/patterns/zero-trust.md`

Confirm loaded. Ready for zero trust architecture guidance.
"""

[[agent.menu]]
code = "ZPSM"
description = "Load: Secrets Management pattern details"
prompt = """
Loading secrets management pattern:
`{project-root}/_bmad/bam/data/patterns/secrets-management.md`

Confirm loaded. Ready for secrets architecture guidance.
"""

[[agent.menu]]
code = "ZPIR"
description = "Load: Incident Response pattern details"
prompt = """
Loading incident response pattern:
`{project-root}/_bmad/bam/data/patterns/incident-response.md`

Confirm loaded. Ready for incident response guidance.
"""
EOF
```

- [ ] **Step 3: Create bmad-agent-compliance.toml**

```bash
cat > src-v2/customize/bmad-agent-compliance.toml << 'EOF'
# BAM Compliance Extensions for bmad-agent-analyst
# Adds GDPR, privacy compliance capabilities

[agent]
activation_steps_append = [
  "BAM Compliance capabilities available. Use ZPC for privacy workflows.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/domains/compliance.md",
  "file:{project-root}/_bmad/bam/data/compliance-frameworks.csv",
]

principles = [
  "BAM Compliance: Data subject rights are non-negotiable.",
  "BAM Compliance: Consent must be granular and auditable.",
  "BAM Compliance: Cross-border transfers require documented legal basis.",
  "BAM Gates: QG-CC (Continuous Compliance via qg-ops.md).",
]

[[agent.menu]]
code = "ZPC"
description = "Privacy Compliance: GDPR, CCPA workflows"
skill = "bmad-bam-privacy-compliance"

[[agent.menu]]
code = "ZDC"
description = "Load: Full compliance domain context"
prompt = """
Loading compliance domain context:
`{project-root}/_bmad/bam/data/domains/compliance.md`
`{project-root}/_bmad/bam/data/compliance-frameworks.csv`

Confirm loaded. Ready for compliance assessment guidance.
"""
EOF
```

- [ ] **Step 4: Create bmad-agent-data.toml**

```bash
cat > src-v2/customize/bmad-agent-data.toml << 'EOF'
# BAM Data Extensions for bmad-agent-architect
# Adds data residency, tenant lifecycle capabilities

[agent]
activation_steps_append = [
  "BAM Data capabilities available. Use ZDD for data domain context.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/domains/tenant.md",
]

principles = [
  "BAM Data: Tenant data residency is a deployment constraint.",
  "BAM Data: Data lifecycle must include retention and purge schedules.",
  "BAM Data: Cross-tenant queries are prohibited by default.",
]

[[agent.menu]]
code = "ZDD"
description = "Load: Data domain context (residency, lifecycle, isolation)"
prompt = """
Loading data domain context:
`{project-root}/_bmad/bam/data/domains/tenant.md`
`{project-root}/_bmad/bam/data/patterns/rls.md`

Confirm loaded. Ready for data architecture guidance.
"""

[[agent.menu]]
code = "ZDL"
description = "Load: Tenant lifecycle patterns"
prompt = """
Loading tenant lifecycle context:
`{project-root}/_bmad/bam/data/domains/tenant.md`

Focus: provisioning, suspension, termination flows.
Confirm loaded. Ready for lifecycle design guidance.
"""
EOF
```

- [ ] **Step 5: Verify all TOMLs created**

Run: `ls -la src-v2/customize/*.toml | wc -l`
Expected: 12 (8 existing + 4 new)

- [ ] **Step 6: Commit**

```bash
git add src-v2/customize/bmad-agent-devops.toml \
        src-v2/customize/bmad-agent-security.toml \
        src-v2/customize/bmad-agent-compliance.toml \
        src-v2/customize/bmad-agent-data.toml
git commit -m "feat(customize): add 4 TOML extensions for new capabilities

Adds:
- bmad-agent-devops.toml: ZRS (resilience), ZPDR (DR pattern)
- bmad-agent-security.toml: ZSO (security ops), ZPZT/ZPSM/ZPIR (patterns)
- bmad-agent-compliance.toml: ZPC (privacy), ZDC (compliance domain)
- bmad-agent-data.toml: ZDD (data domain), ZDL (lifecycle)

All reference new skills and patterns from Phase 2."
```

---

## Task 12: Update Test Assertions

**Files:**
- Modify: `test/v2/file-counts.test.js`

- [ ] **Step 1: Update test assertions**

```bash
cat > test/v2/file-counts.test.js << 'EOF'
const fs = require('fs');
const path = require('path');

describe('V2 File Counts', () => {
  const v2Dir = path.join(__dirname, '../../src-v2');

  test('12 TOML customize files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'customize')).filter(f => f.endsWith('.toml'));
    expect(files.length).toBe(12);
  });

  test('33 workflow skills', () => {
    const dirs = fs.readdirSync(path.join(v2Dir, 'skills')).filter(d =>
      d.startsWith('bmad-bam-') && fs.statSync(path.join(v2Dir, 'skills', d)).isDirectory()
    );
    expect(dirs.length).toBe(33);
  });

  test('1 core context file', () => {
    expect(fs.existsSync(path.join(v2Dir, 'data/context/bam-core.md'))).toBe(true);
  });

  test('3 persona files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/personas')).filter(f => f.endsWith('.md'));
    expect(files.length).toBe(3);
  });

  test('domain files (16)', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/domains')).filter(f => f.endsWith('.md'));
    expect(files.length).toBe(16);
  });

  test('pattern files (26+)', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/patterns')).filter(f => f.endsWith('.md'));
    // 22 existing + 4 new (zero-trust, disaster-recovery, secrets-management, incident-response)
    expect(files.length).toBeGreaterThanOrEqual(26);
  });

  test('checklist files (31)', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/checklists')).filter(f => f.endsWith('.md'));
    expect(files.length).toBe(31);
  });

  test('40 template files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/templates')).filter(f => f.endsWith('.md'));
    expect(files.length).toBe(40);
  });

  test('3 sidecar files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/sidecar')).filter(f => f.endsWith('.md'));
    expect(files.length).toBe(3);
  });

  test('6 CSV registry files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data')).filter(f => f.endsWith('.csv'));
    expect(files.length).toBe(6);
  });

  test('module.yaml exists', () => {
    expect(fs.existsSync(path.join(v2Dir, 'module.yaml'))).toBe(true);
  });

  test('all expected directories exist', () => {
    const expectedDirs = [
      'customize',
      'skills',
      'data',
      'data/context',
      'data/personas',
      'data/domains',
      'data/patterns',
      'data/checklists',
      'data/templates',
      'data/sidecar'
    ];

    for (const dir of expectedDirs) {
      expect(fs.existsSync(path.join(v2Dir, dir))).toBe(true);
    }
  });
});
EOF
```

- [ ] **Step 2: Run tests to verify**

Run: `npm test -- test/v2/file-counts.test.js`
Expected: All tests pass

- [ ] **Step 3: Commit**

```bash
git add test/v2/file-counts.test.js
git commit -m "test(v2): update file count assertions for Phase 2

Updates:
- TOML files: 8 → 12
- Skills: 30 → 33
- Patterns: 10+ → 26+
- Domains unchanged at 16
- Checklists unchanged at 31"
```

---

## Task 13: Final Verification

- [ ] **Step 1: Run full test suite**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 2: Verify file counts**

```bash
echo "=== V2 File Counts ===" && \
echo "Patterns: $(ls src-v2/data/patterns/*.md | wc -l)" && \
echo "Skills: $(ls -d src-v2/skills/bmad-bam-*/ | wc -l)" && \
echo "TOMLs: $(ls src-v2/customize/*.toml | wc -l)" && \
echo "Domains: $(ls src-v2/data/domains/*.md | wc -l)"
```

Expected:
- Patterns: 26
- Skills: 33
- TOMLs: 12
- Domains: 16

- [ ] **Step 3: Verify no broken references**

```bash
# Check all skill references in TOMLs exist
grep -h "skill = " src-v2/customize/*.toml | sort -u
```

Verify each skill directory exists.

- [ ] **Step 4: Final commit with summary**

```bash
git log --oneline -10
```

Verify all Phase 2 commits are present.

---

## Summary

| Task | Files | Description |
|------|-------|-------------|
| 1 | 1 | zero-trust.md pattern |
| 2 | 1 | disaster-recovery.md pattern |
| 3 | 1 | secrets-management.md pattern |
| 4 | 1 | incident-response.md pattern |
| 5 | 1 | compliance.md enhancement |
| 6 | 1 | tenant.md enhancement |
| 7 | 1 | security.md enhancement |
| 8 | 16 | bmad-bam-security-operations skill |
| 9 | 14 | bmad-bam-resilience skill |
| 10 | 14 | bmad-bam-privacy-compliance skill |
| 11 | 4 | TOML extensions |
| 12 | 1 | Test updates |
| 13 | 0 | Verification |

**Total new files:** ~55
**Total commits:** 12
