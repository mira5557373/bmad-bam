---
pattern_id: cross-tenant-agent
shortcode: ZXA
category: agent-communication
qg_ref: QG-AI1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Cross-Tenant Agent Federation - BAM Pattern

**Loaded by:** ZXA  
**Applies to:** Multi-agent multi-tenant systems requiring controlled cross-boundary operations  
**See also:** [federation.md](federation.md), [tenant-isolation.md](tenant-isolation.md)

---

## When to Use

- B2B integrations requiring agent collaboration across tenants
- Marketplace scenarios where agents from different tenants interact
- Enterprise customers with subsidiary tenant structures
- Federated learning or knowledge sharing scenarios
- Partner ecosystem integrations

## When NOT to Use

- Single-tenant deployments
- When strict tenant isolation is mandated (PCI-DSS, HIPAA without BAA)
- No business requirement for cross-tenant interaction
- When simpler API-based integration suffices

## Architecture

### Federation Topology

```
┌─────────────────────────────────────────────────────────────────────┐
│                  Cross-Tenant Federation Layer                       │
│                                                                      │
│  ┌─────────────────┐           ┌─────────────────┐                  │
│  │   Tenant A      │           │   Tenant B      │                  │
│  │  ┌──────────┐   │  Policy   │  ┌──────────┐   │                  │
│  │  │ Agent A1 │◄──┼───────────┼──►│ Agent B1 │   │                  │
│  │  └──────────┘   │  Gateway  │  └──────────┘   │                  │
│  │  ┌──────────┐   │           │  ┌──────────┐   │                  │
│  │  │ Agent A2 │   │           │  │ Agent B2 │   │                  │
│  │  └──────────┘   │           │  └──────────┘   │                  │
│  └─────────────────┘           └─────────────────┘                  │
│           │                             │                            │
│           ▼                             ▼                            │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │              Federation Policy Engine                        │    │
│  │  [Consent] [Access Control] [Data Filter] [Audit Log]       │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  CRITICAL: All cross-tenant operations require explicit consent     │
└─────────────────────────────────────────────────────────────────────┘
```

### Data Flow with Isolation

```
┌─────────────────────────────────────────────────────────────────────┐
│                      Cross-Tenant Request Flow                       │
│                                                                      │
│  Tenant A                    Gateway                    Tenant B     │
│  ┌────────┐            ┌─────────────────┐            ┌────────┐    │
│  │Request │───────────►│ 1. Verify       │◄───────────│Consent │    │
│  │from A  │            │    Consent      │            │Record  │    │
│  └────────┘            └────────┬────────┘            └────────┘    │
│                                 │                                    │
│                                 ▼                                    │
│                        ┌─────────────────┐                          │
│                        │ 2. Apply Policy │                          │
│                        │    - Field mask │                          │
│                        │    - Rate limit │                          │
│                        │    - Scope check│                          │
│                        └────────┬────────┘                          │
│                                 │                                    │
│                                 ▼                                    │
│                        ┌─────────────────┐                          │
│                        │ 3. Audit Log    │──────► Immutable Log     │
│                        │    Both Tenants │                          │
│                        └────────┬────────┘                          │
│                                 │                                    │
│                                 ▼                                    │
│  ┌────────┐            ┌─────────────────┐            ┌────────┐    │
│  │Response│◄───────────│ 4. Sanitize     │───────────►│Execute │    │
│  │to A    │            │    Response     │            │at B    │    │
│  └────────┘            └─────────────────┘            └────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

### Configuration Schema

```yaml
cross_tenant_agent:
  version: "1.0.0"
  bam_controlled: true
  
  federation_mode:
    enabled: bool
    topology: enum[hub_spoke, mesh, hierarchical]
    discovery: enum[explicit, directory, broadcast]
    
  consent_management:
    consent_required: enum[always, per_operation, trust_level]
    consent_storage: enum[local, distributed, blockchain]
    consent_expiry_days: int
    revocation_propagation_seconds: int
    
    consent_record:
      grantor_tenant: string
      grantee_tenant: string
      scope:
        agents: list[string]  # specific agents or "*"
        operations: list[string]  # allowed operation types
        data_fields: list[string]  # accessible fields
      valid_from: timestamp
      valid_until: timestamp
      revocable: bool
  
  access_control:
    policy_engine: enum[opa, cedar, custom]
    default_deny: bool
    
    trust_levels:
      - level: "untrusted"
        allowed_operations: []
        
      - level: "basic"
        allowed_operations: ["read_public"]
        rate_limit_per_hour: 100
        
      - level: "partner"
        allowed_operations: ["read_public", "read_shared", "collaborate"]
        rate_limit_per_hour: 1000
        
      - level: "subsidiary"
        allowed_operations: ["read_public", "read_shared", "collaborate", "write_shared"]
        rate_limit_per_hour: 10000
  
  data_protection:
    # CRITICAL: Data isolation in federated scenarios
    field_level_encryption: bool
    tenant_key_isolation: bool
    
    data_sanitization:
      enabled: bool
      pii_redaction: bool
      field_masking:
        - field: "email"
          mask_pattern: "***@***.***"
        - field: "phone"
          mask_pattern: "***-***-****"
      
    data_residency:
      respect_source_residency: bool
      allowed_regions: list[string]
      
  audit:
    log_all_requests: bool
    log_all_responses: bool
    immutable_storage: bool
    retention_days: int
    
    audit_fields:
      - source_tenant
      - target_tenant
      - operation
      - data_accessed
      - timestamp
      - consent_reference
      - policy_evaluation_result
```

### Consent Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Consent Establishment Flow                       │
│                                                                      │
│  Tenant A                   System                    Tenant B       │
│  (Requestor)                                          (Grantor)      │
│                                                                      │
│  ┌────────────┐       ┌──────────────┐       ┌────────────┐        │
│  │ 1. Request │──────►│ 2. Generate  │──────►│ 3. Review  │        │
│  │    Access  │       │    Proposal  │       │    Scope   │        │
│  └────────────┘       └──────────────┘       └──────┬─────┘        │
│                                                      │              │
│                              ┌───────────────────────┘              │
│                              ▼                                      │
│                       ┌──────────────┐                              │
│                       │ 4. Approve / │                              │
│                       │    Deny      │                              │
│                       └──────┬───────┘                              │
│                              │                                      │
│         ┌────────────────────┼────────────────────┐                │
│         ▼                    ▼                    ▼                │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │
│  │ If Approved: │    │ If Denied:   │    │ If Modified: │         │
│  │ Store Consent│    │ Notify + Log │    │ Counter-     │         │
│  │ Enable Access│    │              │    │ propose      │         │
│  └──────────────┘    └──────────────┘    └──────────────┘         │
└─────────────────────────────────────────────────────────────────────┘
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Hub-Spoke | Centralized control | Single point of failure | Enterprise with subsidiaries |
| Mesh | Resilient, scalable | Complex policy management | Partner ecosystems |
| Hierarchical | Clear authority | Rigid structure | Regulated industries |
| Explicit Consent | Maximum control | Operational overhead | High-security scenarios |
| Trust Levels | Flexible | Risk of over-permissioning | Partner tiers |

## Security Considerations

### CRITICAL: Data Isolation Requirements

```
┌─────────────────────────────────────────────────────────────────────┐
│                  CRITICAL SECURITY REQUIREMENTS                      │
│                                                                      │
│  1. CONSENT IS MANDATORY                                            │
│     - No implicit cross-tenant access                               │
│     - Consent must be explicit, scoped, and time-bound              │
│     - Revocation must be immediate                                  │
│                                                                      │
│  2. DATA NEVER CROSSES BOUNDARIES UNFILTERED                        │
│     - All data passes through sanitization layer                    │
│     - PII must be redacted unless explicitly consented              │
│     - Field-level encryption for sensitive data                     │
│                                                                      │
│  3. AUDIT EVERYTHING                                                │
│     - Both source and target tenant get audit records               │
│     - Immutable audit log (append-only)                             │
│     - Compliance reporting per tenant                               │
│                                                                      │
│  4. PRINCIPLE OF LEAST PRIVILEGE                                    │
│     - Default deny all cross-tenant operations                      │
│     - Minimal scope in consent grants                               │
│     - Time-limited access windows                                   │
│                                                                      │
│  5. TENANT KEY ISOLATION                                            │
│     - Each tenant has unique encryption keys                        │
│     - Cross-tenant data re-encrypted with target keys               │
│     - Key rotation must not break federation                        │
└─────────────────────────────────────────────────────────────────────┘
```

### Compliance Mapping

| Regulation | Requirement | Implementation |
|------------|-------------|----------------|
| GDPR | Data portability | Consent with field selection |
| GDPR | Right to erasure | Cascade delete across federation |
| SOC 2 | Access logging | Immutable audit trail |
| HIPAA | BAA required | Explicit consent + encryption |
| PCI-DSS | Cardholder isolation | Field masking + restricted scope |

## Web Research Queries

- "multi-tenant agent federation patterns {date}"
- "cross-tenant data sharing consent management {date}"
- "B2B API federation security patterns {date}"
- "zero trust cross-organization access {date}"
- "enterprise tenant federation governance {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI1 | Federation policies enforced, consent verified |
| QG-I2 | CRITICAL: No unauthorized cross-tenant data access |
| QG-S3 | Audit logging for all cross-tenant operations |
| QG-M2 | Tenant isolation maintained even in federated scenarios |

## Related Patterns

- [federation.md](federation.md) - General federation patterns
- [tenant-isolation.md](tenant-isolation.md) - Tenant isolation fundamentals
- [agent-negotiation.md](agent-negotiation.md) - Multi-agent agreement protocols
- [zero-trust.md](zero-trust.md) - Zero trust architecture
