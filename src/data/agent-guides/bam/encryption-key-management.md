# BAM Encryption Key Management Guide

**When to load:** During Phase 3 (Solutioning) when designing per-tenant encryption, key rotation, or customer-managed key (CMK) support.

**Integrates with:** Architect (Atlas persona), Security agent, DevOps agent

---

## Core Concepts

### Key Management Models

| Model | Ownership | Use Case |
|-------|-----------|----------|
| Shared Keys | Platform | Free tier |
| Per-Tenant Keys | Platform | Pro tier |
| Customer-Managed (CMK) | Customer | Enterprise |
| Bring Your Own Key | Customer | Hybrid |

### Encryption Layers

| Layer | Type | Purpose |
|-------|------|---------|
| Transport | TLS 1.3 | In-transit |
| Application | AES-256-GCM | Field-level |
| Database | TDE | At-rest |
| Storage | Server-side | Object encryption |

---

## Application Guidelines

When implementing encryption key management for multi-tenant systems:

1. **Use hierarchical key structure**: Master keys protect tenant key encryption keys which protect data encryption keys
2. **Support customer-managed keys for enterprise**: Allow tenants to control their own encryption
3. **Implement automated key rotation**: Keys should rotate without service disruption
4. **Audit all key operations**: Log key usage, rotation, and access for compliance
5. **Design for key revocation**: Tenant offboarding must include secure key destruction

---

## Implementation Patterns

### Key Hierarchy

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

### Per-Tier Key Strategy

| Tier | KEK | DEK | Rotation |
|------|-----|-----|----------|
| Free | Shared | Shared | Platform-wide |
| Pro | Per-tenant | Per-tenant | Per-tenant |
| Enterprise | CMK | Per-tenant | Customer-defined |

### CMK Integration

```
┌─────────────────────┐      ┌─────────────────────┐
│  Platform Account   │      │  Customer Account   │
│                     │      │                     │
│ ┌─────────────────┐ │ IAM  │ ┌─────────────────┐ │
│ │  Application    │ │ Role │ │  Customer KMS   │ │
│ │  ┌───────────┐  │─┼──────┼─│  ┌───────────┐  │ │
│ │  │KMS Client │  │ │      │ │  │Master Key │  │ │
│ │  └───────────┘  │ │      │ │  └───────────┘  │ │
│ └─────────────────┘ │      │ └─────────────────┘ │
└─────────────────────┘      └─────────────────────┘
```

### Key Rotation Process

```
1. Generate new key version
        │
        v
2. Mark new key as primary (encrypt)
        │
        v
3. Old key for decrypt only
        │
        v
4. Re-encrypt data (background)
        │
        v
5. Disable old key
```

### Rotation Schedule

| Key Type | Frequency | Method |
|----------|-----------|--------|
| Master | Annually | Manual + audit |
| Tenant KEK | Quarterly | Automated |
| DEK | Monthly | Transparent |
| CMK | Customer-defined | Customer action |

---

## Security Considerations

### Key Compromise Response

| Scenario | Action |
|----------|--------|
| DEK compromised | Rotate DEK, re-encrypt |
| KEK compromised | Rotate KEK + all DEKs |
| CMK compromised | Customer revokes |

---

## Related Patterns

- `security` pattern in `bam-patterns.csv`
- `encryption` pattern in `bam-patterns.csv`
- `data-residency.md` guide for regional key storage requirements
- `tenant-isolation.md` guide for per-tenant security boundaries
- `encryption-key-management-template.md` for output documentation

Load from pattern registry:
- `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `compliance`
- `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → encryption requirements

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `encryption-key-management` | `per-tenant encryption keys multi-tenant SaaS {date}` |
| `encryption-key-management` | `CMK multi-tenant KMS multi-tenant SaaS {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| Cost-sensitive? | Shared keys | Minimal overhead |
| Tenant isolation? | Per-tenant keys | Crypto separation |
| Compliance (SOC2)? | Per-tenant + audit | Regulatory |
| Enterprise customers? | CMK support | Customer control |

## Related Workflows

- `bmad-bam-security-review` - Review encryption key management implementation
- `bmad-bam-compliance-design` - Design compliance controls for key management requirements
- `bmad-bam-tenant-model-isolation` - Configure per-tenant key isolation strategies
