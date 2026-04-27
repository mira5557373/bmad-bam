# Fill Stub Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fill 11 domain stub files with complete Core Concepts and Decision Matrix content following the tenant.md reference pattern.

**Architecture:** Each domain file follows the same structure: Overview, Core Concepts (with tables/diagrams), Decision Matrix, Quality Checks, Web Research Queries. Content must be multi-tenant focused.

**Tech Stack:** Markdown with ASCII diagrams and tables.

**Note:** The 2 sidecar files (architecture-decisions.md, runtime-preferences.md) are session templates with intentional placeholders - they work correctly as-is.

---

## Reference Pattern

Use `src-v2/data/domains/tenant.md` as the quality reference:
- Core Concepts: Include a visual matrix/table and a diagram
- Decision Matrix: Table with conditions and recommendations

---

### Task 1: AI Runtime Domain

**Files:**
- Modify: `src-v2/data/domains/ai-runtime.md:13-18`

- [ ] **Step 1: Add Core Concepts section**

Replace `[To be filled]` in Core Concepts with:

```markdown
### Runtime Selection Criteria

| Criterion | LangGraph | CrewAI | AutoGen | Custom |
|-----------|-----------|--------|---------|--------|
| State Management | Built-in | External | Conversation | Custom |
| Multi-agent | Hierarchical | Role-based | Conversational | Custom |
| Tenant Isolation | Scoped state | Custom | Conversation isolation | Custom |
| Complexity | Medium-High | Medium | Medium-High | High |

### Tenant-Scoped Execution

```
Request (X-Tenant-ID)
    │
    ▼
┌─────────────────┐
│ Agent Router    │ ← Tenant tier determines resources
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐ ┌───────┐
│Free   │ │Pro+   │
│Shared │ │Dedicated│
│Pool   │ │Workers │
└───────┘ └───────┘
```
```

- [ ] **Step 2: Add Decision Matrix section**

Replace `[To be filled]` in Decision Matrix with:

```markdown
| Requirement | Recommended Runtime | Rationale |
|-------------|--------------------| ----------|
| Complex state machines | LangGraph | Native checkpointing |
| Role-based teams | CrewAI | Built-in delegation |
| Multi-agent debate | AutoGen | Conversation patterns |
| Existing infrastructure | Custom | Leverage investments |
| Rapid prototyping | LangGraph | Best tooling |
```

- [ ] **Step 3: Verify file structure**

Run: `head -30 src-v2/data/domains/ai-runtime.md`

- [ ] **Step 4: Commit**

```bash
git add src-v2/data/domains/ai-runtime.md
git commit -m "docs: Fill ai-runtime domain content"
```

---

### Task 2: Billing Domain

**Files:**
- Modify: `src-v2/data/domains/billing.md:13-18`

- [ ] **Step 1: Add Core Concepts section**

Replace `[To be filled]` in Core Concepts with:

```markdown
### Metering Pipeline

```
Usage Event → Aggregator → Ledger → Invoice
     │            │          │         │
     └── tenant_id included at every stage
```

### Billing Models

| Model | Description | Tenant Isolation |
|-------|-------------|------------------|
| Seat-based | Per-user pricing | User count per tenant |
| Usage-based | Pay-per-use | Metered by tenant_id |
| Tiered | Feature tiers | Tier stored on tenant |
| Hybrid | Seats + usage | Combined tracking |

### Credit System

| Component | Purpose |
|-----------|---------|
| Credit Pool | Pre-paid balance per tenant |
| Usage Debit | Real-time deduction |
| Overage | Post-paid overflow |
| Alerts | Threshold notifications |
```

- [ ] **Step 2: Add Decision Matrix section**

Replace `[To be filled]` in Decision Matrix with:

```markdown
| Scenario | Billing Model | Implementation |
|----------|---------------|----------------|
| Predictable workloads | Seat-based | Simple user counts |
| Variable AI usage | Usage-based | Event streaming |
| Enterprise customers | Tiered | Feature flags |
| Mixed workloads | Hybrid | Combined metering |
```

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/domains/billing.md
git commit -m "docs: Fill billing domain content"
```

---

### Task 3: Caching Domain

**Files:**
- Modify: `src-v2/data/domains/caching.md:13-18`

- [ ] **Step 1: Add Core Concepts section**

Replace `[To be filled]` in Core Concepts with:

```markdown
### Cache Key Pattern

All cache keys MUST include tenant prefix:
```
tenant:{tenant_id}:{resource}:{id}
tenant:{tenant_id}:{resource}:list:{hash}
```

### Cache Tiers

| Tier | Storage | TTL | Use Case |
|------|---------|-----|----------|
| L1 | In-memory | Seconds | Hot data |
| L2 | Redis | Minutes | Session data |
| L3 | CDN | Hours | Static assets |

### Invalidation Patterns

| Pattern | Scope | Trigger |
|---------|-------|---------|
| Key-based | Single item | Write |
| Tag-based | Related items | Bulk update |
| Tenant-wide | All tenant data | Offboarding |
```

- [ ] **Step 2: Add Decision Matrix section**

Replace `[To be filled]` in Decision Matrix with:

```markdown
| Data Type | Cache Tier | TTL | Invalidation |
|-----------|------------|-----|--------------|
| User sessions | L2 Redis | 30 min | On logout |
| Tenant config | L2 Redis | 5 min | On change |
| Static assets | L3 CDN | 24 hr | Deploy |
| AI responses | L1 Memory | 60 sec | None |
```

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/domains/caching.md
git commit -m "docs: Fill caching domain content"
```

---

### Task 4: Compliance Domain

**Files:**
- Modify: `src-v2/data/domains/compliance.md:13-18`

- [ ] **Step 1: Add Core Concepts section**

Replace `[To be filled]` in Core Concepts with:

```markdown
### Compliance Matrix

| Framework | Data Residency | Encryption | Audit | Isolation |
|-----------|----------------|------------|-------|-----------|
| SOC 2 | Recommended | Required | Required | Logical OK |
| HIPAA | Required | Required | Required | Schema+ |
| GDPR | Required | Required | Required | Logical OK |
| PCI-DSS | Required | Required | Required | Database |
| FedRAMP | Required | Required | Required | Database |

### Tenant Compliance Mapping

```
Tenant → Tier → Compliance Requirements
  │       │              │
  │       └── Free: SOC 2 only
  │       └── Pro: SOC 2 + GDPR
  │       └── Enterprise: All frameworks
  │
  └── compliance_level stored on tenant record
```
```

- [ ] **Step 2: Add Decision Matrix section**

Replace `[To be filled]` in Decision Matrix with:

```markdown
| Compliance Need | Tenant Model | Additional Controls |
|-----------------|--------------|---------------------|
| Basic (SOC 2) | RLS | Audit logging |
| Healthcare (HIPAA) | Schema | BAA, encryption |
| Financial (PCI) | Database | Network isolation |
| Government (FedRAMP) | Database | Dedicated infra |
```

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/domains/compliance.md
git commit -m "docs: Fill compliance domain content"
```

---

### Task 5: Events Domain

**Files:**
- Modify: `src-v2/data/domains/events.md:13-18`

- [ ] **Step 1: Add Core Concepts section**

Replace `[To be filled]` in Core Concepts with:

```markdown
### Event Envelope

Every event MUST include tenant context:
```json
{
  "tenant_id": "tenant_123",
  "event_type": "user.created",
  "timestamp": "2026-04-26T10:00:00Z",
  "payload": { ... },
  "metadata": {
    "correlation_id": "...",
    "tier": "pro"
  }
}
```

### Event Flow

```
Producer → Topic (partitioned by tenant) → Consumer
    │                  │                      │
    └── tenant_id ─────┴───── routing key ────┘
```

### Event Categories

| Category | Examples | Retention |
|----------|----------|-----------|
| Domain | user.created, order.placed | 90 days |
| System | tenant.provisioned | Forever |
| Audit | permission.changed | 7 years |
```

- [ ] **Step 2: Add Decision Matrix section**

Replace `[To be filled]` in Decision Matrix with:

```markdown
| Event Type | Delivery | Ordering | Tenant Isolation |
|------------|----------|----------|------------------|
| Domain events | At-least-once | Per-tenant | Partition key |
| Commands | Exactly-once | Strict | Dedicated queue |
| Notifications | Best-effort | None | Routing key |
```

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/domains/events.md
git commit -m "docs: Fill events domain content"
```

---

### Task 6: Integration Domain

**Files:**
- Modify: `src-v2/data/domains/integration.md:13-18`

- [ ] **Step 1: Add Core Concepts section**

Replace `[To be filled]` in Core Concepts with:

```markdown
### Facade Contract Pattern

```
Module A                    Module B
    │                           │
    └──► Facade Interface ◄─────┘
              │
         Contract defines:
         - Input/Output types
         - Tenant context requirements
         - Error contracts
```

### Integration Boundaries

| Boundary | Contract Type | Tenant Context |
|----------|---------------|----------------|
| Module-to-Module | Facade | Propagated |
| Service-to-Service | API | Header |
| External | Gateway | Mapped |

### Convergence Verification

| Check | Description |
|-------|-------------|
| Type Match | Input/output types align |
| Tenant Safety | No cross-tenant leaks |
| Error Handling | Failures don't expose data |
```

- [ ] **Step 2: Add Decision Matrix section**

Replace `[To be filled]` in Decision Matrix with:

```markdown
| Integration Type | Pattern | Tenant Handling |
|------------------|---------|-----------------|
| Synchronous | Facade call | Context propagation |
| Asynchronous | Event | Envelope tenant_id |
| External API | Gateway | Tenant mapping |
| Legacy system | Adapter | Context injection |
```

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/domains/integration.md
git commit -m "docs: Fill integration domain content"
```

---

### Task 7: Observability Domain

**Files:**
- Modify: `src-v2/data/domains/observability.md:13-18`

- [ ] **Step 1: Add Core Concepts section**

Replace `[To be filled]` in Core Concepts with:

```markdown
### Three Pillars + Tenant

| Pillar | Tenant Dimension | Example |
|--------|------------------|---------|
| Logs | `tenant_id` field | Structured JSON logs |
| Metrics | `tenant` label | Prometheus labels |
| Traces | `tenant.id` attribute | OpenTelemetry |

### Tenant-Aware Dashboards

```
┌─────────────────────────────────────┐
│ Platform Overview (all tenants)     │
├─────────────────────────────────────┤
│ Tenant Drilldown (single tenant)    │
├─────────────────────────────────────┤
│ Tier Comparison (by tier)           │
└─────────────────────────────────────┘
```

### Alert Routing

| Alert Type | Routing | Tenant Context |
|------------|---------|----------------|
| Platform | Ops team | Aggregate |
| Tenant-specific | Customer success | Single tenant |
| Billing | Finance | Per-tenant |
```

- [ ] **Step 2: Add Decision Matrix section**

Replace `[To be filled]` in Decision Matrix with:

```markdown
| Observability Need | Tool | Tenant Isolation |
|--------------------|------|------------------|
| Log aggregation | ELK/Loki | Index per tenant |
| Metrics | Prometheus | Label filtering |
| Tracing | Jaeger/Tempo | Trace attributes |
| APM | Datadog/New Relic | Tag-based |
```

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/domains/observability.md
git commit -m "docs: Fill observability domain content"
```

---

### Task 8: Onboarding Domain

**Files:**
- Modify: `src-v2/data/domains/onboarding.md:13-18`

- [ ] **Step 1: Add Core Concepts section**

Replace `[To be filled]` in Core Concepts with:

```markdown
### Onboarding Pipeline

```
Signup → Provision → Configure → Activate
   │         │           │          │
   └── Create tenant record         │
             └── Initialize storage  │
                       └── Apply defaults
                                  └── Enable access
```

### Provisioning by Tier

| Tier | Isolation | Resources | SLA |
|------|-----------|-----------|-----|
| Free | RLS | Shared pool | Best-effort |
| Pro | RLS | Reserved | 99.9% |
| Enterprise | Schema/DB | Dedicated | 99.99% |

### Onboarding Checklist

| Step | Auto/Manual | Rollback |
|------|-------------|----------|
| Tenant record | Auto | Delete |
| Storage paths | Auto | Remove |
| RLS policies | Auto | Drop |
| Initial users | Manual | Deactivate |
```

- [ ] **Step 2: Add Decision Matrix section**

Replace `[To be filled]` in Decision Matrix with:

```markdown
| Tenant Tier | Onboarding Time | Automation Level |
|-------------|-----------------|------------------|
| Free | < 30 seconds | Fully automated |
| Pro | < 5 minutes | Mostly automated |
| Enterprise | < 24 hours | Guided + custom |
```

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/domains/onboarding.md
git commit -m "docs: Fill onboarding domain content"
```

---

### Task 9: Security Domain

**Files:**
- Modify: `src-v2/data/domains/security.md:13-18`

- [ ] **Step 1: Add Core Concepts section**

Replace `[To be filled]` in Core Concepts with:

```markdown
### Defense in Depth

```
┌─────────────────────────────────────┐
│ Edge (WAF, DDoS)                    │
├─────────────────────────────────────┤
│ Gateway (AuthN, Rate Limit)         │
├─────────────────────────────────────┤
│ Service (AuthZ, Tenant Check)       │
├─────────────────────────────────────┤
│ Data (RLS, Encryption)              │
└─────────────────────────────────────┘
```

### Tenant Security Boundaries

| Layer | Control | Enforcement |
|-------|---------|-------------|
| Network | VPC/Subnet | Per-tier |
| Application | JWT claims | Every request |
| Database | RLS policies | Every query |
| Storage | Path prefixes | Every access |

### Secret Management

| Secret Type | Storage | Rotation |
|-------------|---------|----------|
| Platform | Vault | 90 days |
| Tenant API keys | Encrypted DB | On-demand |
| Customer-managed | External KMS | Customer-controlled |
```

- [ ] **Step 2: Add Decision Matrix section**

Replace `[To be filled]` in Decision Matrix with:

```markdown
| Security Requirement | Implementation | Tenant Impact |
|----------------------|----------------|---------------|
| Authentication | OAuth 2.0 / OIDC | Per-tenant IdP |
| Authorization | RBAC + tenant check | Scoped permissions |
| Encryption at rest | AES-256 | Tenant key option |
| Encryption in transit | TLS 1.3 | All traffic |
```

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/domains/security.md
git commit -m "docs: Fill security domain content"
```

---

### Task 10: Storage Domain

**Files:**
- Modify: `src-v2/data/domains/storage.md:13-18`

- [ ] **Step 1: Add Core Concepts section**

Replace `[To be filled]` in Core Concepts with:

```markdown
### Storage Path Convention

All tenant data uses prefixed paths:
```
tenants/{tenant_id}/uploads/
tenants/{tenant_id}/exports/
tenants/{tenant_id}/backups/
```

### Storage Tiers

| Tier | Storage | Access | Cost |
|------|---------|--------|------|
| Hot | SSD/NVMe | Milliseconds | $$$ |
| Warm | HDD/S3 | Seconds | $$ |
| Cold | Glacier | Minutes-Hours | $ |

### Data Lifecycle

| Stage | Retention | Storage Tier |
|-------|-----------|--------------|
| Active | Current | Hot |
| Archive | 1-7 years | Warm |
| Compliance | 7+ years | Cold |
| Deleted | 30-day grace | Marked |
```

- [ ] **Step 2: Add Decision Matrix section**

Replace `[To be filled]` in Decision Matrix with:

```markdown
| Data Type | Storage | Tenant Isolation | Encryption |
|-----------|---------|------------------|------------|
| User uploads | Object store | Path prefix | Server-side |
| Database | Managed DB | RLS/Schema | TDE |
| Backups | Cold storage | Separate files | Customer key |
| Logs | Log store | Index separation | Platform key |
```

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/domains/storage.md
git commit -m "docs: Fill storage domain content"
```

---

### Task 11: Testing Domain

**Files:**
- Modify: `src-v2/data/domains/testing.md:13-18`

- [ ] **Step 1: Add Core Concepts section**

Replace `[To be filled]` in Core Concepts with:

```markdown
### Test Pyramid + Tenant

```
        ┌───────┐
        │  E2E  │ ← Multi-tenant scenarios
       ┌┴───────┴┐
       │Integration│ ← Cross-tenant isolation
      ┌┴──────────┴┐
      │    Unit    │ ← Tenant context mocking
      └────────────┘
```

### Tenant Test Categories

| Category | Focus | Isolation Check |
|----------|-------|-----------------|
| Unit | Business logic | Mock tenant context |
| Integration | Module boundaries | Real tenant isolation |
| E2E | User journeys | Multi-tenant scenarios |
| Chaos | Failure modes | Cross-tenant blast radius |

### Test Data Strategy

| Environment | Tenant Data | Strategy |
|-------------|-------------|----------|
| Unit | Mocked | Factories |
| Integration | Seeded | Fixtures |
| Staging | Synthetic | Generated |
| Production | Real | Anonymized samples |
```

- [ ] **Step 2: Add Decision Matrix section**

Replace `[To be filled]` in Decision Matrix with:

```markdown
| Test Type | Tenant Isolation Check | Automation |
|-----------|------------------------|------------|
| Unit | Mock validation | CI on every commit |
| Integration | RLS verification | CI on PR |
| E2E | Cross-tenant attempt | Nightly |
| Security | Penetration | Quarterly |
```

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/domains/testing.md
git commit -m "docs: Fill testing domain content"
```

---

## Final Verification

- [ ] **Verify no stub placeholders remain**

```bash
grep -r "To be filled" src-v2/data/domains/
```
Expected: No output (all stubs filled)

- [ ] **Run tests**

```bash
npm test
```
Expected: All tests pass
