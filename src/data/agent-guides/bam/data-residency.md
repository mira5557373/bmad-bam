# BAM Data Residency Guide

**When to load:** During Phase 3 (Solutioning) when designing geographic data storage, cross-region architectures, or compliance with data localization laws.

**Integrates with:** Architect (Atlas persona), Security agent, DevOps agent

---

## Core Concepts

### Key Terminology

| Term | Definition |
|------|------------|
| Data Residency | Where data is stored at rest |
| Data Sovereignty | Legal jurisdiction over data |
| Data Localization | Processing must occur in region |
| Cross-border transfer | Data moving between regions |

### Compliance Framework Matrix

| Regulation | Region | Requirement |
|------------|--------|-------------|
| GDPR | EU/EEA | Data protection, transfer rules |
| LGPD | Brazil | Local processing preferred |
| PIPL | China | Strict localization |
| CCPA | California | Consumer rights |

---

## Application Guidelines

When implementing data residency in multi-tenant systems:

1. **Pin tenant data at signup**: Require region selection during onboarding and enforce throughout lifecycle
2. **Separate control plane from data plane**: Global routing and auth should not contain tenant PII
3. **Validate data flows**: Audit that all data paths respect residency requirements
4. **Design for cross-region restrictions**: Some tenants may not allow any cross-border data transfer
5. **Document compliance mapping**: Maintain clear mapping between regulations and technical controls

---

## Implementation Patterns

### Region Architecture

```
┌───────────────────────────────────────────────┐
│              Global Architecture               │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│  │US Region│  │EU Region│  │APAC     │       │
│  │         │  │         │  │Region   │       │
│  │ ┌─────┐ │  │ ┌─────┐ │  │ ┌─────┐ │       │
│  │ │Data │ │  │ │Data │ │  │ │Data │ │       │
│  │ └─────┘ │  │ └─────┘ │  │ └─────┘ │       │
│  └─────────┘  └─────────┘  └─────────┘       │
│  ┌─────────────────────────────────────────┐ │
│  │       Global Control Plane              │ │
│  │    (Routing, Auth - no tenant data)     │ │
│  └─────────────────────────────────────────┘ │
└───────────────────────────────────────────────┘
```

### Region Pinning Rules

| Data Type | Pinning | Storage |
|-----------|---------|---------|
| Tenant PII | Required | Regional DB only |
| Usage logs | Required | Regional storage |
| Aggregated metrics | Optional | Global allowed |
| Backups | Required | Same region |

### Geo-Routing Flow

```
User ──> Global LB ──> Geo Router
                          │
         ┌────────────────┼────────────────┐
         v                v                v
    ┌────────┐      ┌────────┐      ┌────────┐
    │US Edge │      │EU Edge │      │APAC    │
    │        │      │        │      │Edge    │
    └────┬───┘      └────┬───┘      └────┬───┘
         v               v               v
    US Origin       EU Origin      APAC Origin
```

### Data Classification for Sync

| Category | Sync Allowed | Examples |
|----------|--------------|----------|
| GLOBAL OK | Yes | Tenant ID, feature flags, metrics |
| REGION-LOCKED | No | User PII, documents, AI training data |

### Localization Enforcement

| Layer | Enforcement | Implementation |
|-------|-------------|----------------|
| DNS | GeoDNS routing | Route53/CloudFlare |
| API | Region validation | Middleware |
| Database | Connection routing | Regional strings |
| Storage | Bucket location | Region-locked |

---

## Related Workflows

- `bmad-bam-compliance-design` - Design data residency compliance controls
- `bmad-bam-tenant-onboarding-design` - Configure regional data placement during onboarding
- `bmad-bam-create-master-architecture` - Design multi-region architecture foundation

## Related Patterns

- `compliance` pattern in `bam-patterns.csv`
- `data-sovereignty` pattern in `bam-patterns.csv`
- `encryption-key-management.md` guide for regional key storage
- `tenant-routing.md` guide for geo-routing implementation
- `data-residency-template.md` for output documentation
- **file-storage:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `file-storage`

Load from pattern registry:
- `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `compliance`
- `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → residency requirements

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `data-residency` | `data residency multi-tenant SaaS {date}` |
| `data-residency` | `GDPR data sovereignty patterns multi-tenant SaaS {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| Serve EU customers? | EU region required | GDPR |
| China market? | Dedicated China region | PIPL |
| Brazil customers? | LATAM region | LGPD |
| Cost priority? | Single region + controls | Less infra |
