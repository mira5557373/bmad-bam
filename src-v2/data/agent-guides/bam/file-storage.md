# File Storage Patterns

**When to load:** When designing tenant file storage, blob storage, or when user mentions file uploads, document management, or object storage.

**Integrates with:** Architect (Atlas persona), Dev agent, DevOps agent

---

## Core Concepts

### What is Tenant-Scoped File Storage?

Tenant-scoped file storage ensures that files uploaded by one tenant are isolated from other tenants. This includes proper access controls, storage organization, and lifecycle management.

### Storage Strategy Comparison

| Strategy | Isolation | Complexity | Use Case |
|----------|-----------|------------|----------|
| Prefix-based | Logical | Low | Most SaaS |
| Bucket-per-tenant | Physical | Medium | Compliance |
| Metadata-tagging | Logical | Low | Flexible queries |
| Account-per-tenant | Complete | High | Enterprise |

---

## Key Patterns

### Pattern 1: Prefix-Based Isolation

Organize files using tenant prefixes in shared bucket.

| Component | Pattern | Example |
|-----------|---------|---------|
| Key Format | `{tenant}/{type}/{id}/{file}` | `tenant_abc/docs/123/report.pdf` |
| List Scope | Prefix filter | `tenant_abc/*` |
| Access | IAM + application check | Validate tenant context |

### Prefix Structure

```
shared-bucket/
├── tenant_abc/
│   ├── documents/
│   │   └── report.pdf
│   └── images/
│       └── logo.png
├── tenant_xyz/
│   ├── documents/
│   └── images/
```

### Pattern 2: Bucket-Per-Tenant

Dedicated bucket for each tenant.

| Component | Description | Tenant Consideration |
|-----------|-------------|---------------------|
| Bucket Naming | `{app}-{tenant}-{env}` | Unique per tenant |
| IAM Policy | Per-bucket access | Tenant-specific |
| Lifecycle Rules | Per-bucket config | Tenant preferences |
| Cross-Region | Per-bucket replication | Data residency |

### Bucket Architecture

```
┌─────────────────────────────────────────┐
│          Bucket-Per-Tenant              │
│                                          │
│  ┌──────────────┐  ┌──────────────┐     │
│  │  Bucket:     │  │  Bucket:     │     │
│  │  app-abc-prd │  │  app-xyz-prd │     │
│  │  ┌────────┐  │  │  ┌────────┐  │     │
│  │  │ files  │  │  │  │ files  │  │     │
│  │  └────────┘  │  │  └────────┘  │     │
│  │  IAM: abc    │  │  IAM: xyz    │     │
│  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────┘
```

### Pattern 3: Signed URL Access

Temporary access URLs for secure file delivery.

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| URL Generation | Create signed URL | Validate tenant ownership |
| Expiration | Time-limited access | Per-tier duration |
| Scope | Single file | Verify tenant file access |
| Logging | Access audit | Tenant access tracking |

### Signed URL Flow

```
Request File
    │
    ├── Validate tenant ownership
    │
    ├── Generate signed URL
    │   └── Expiration: 15 minutes
    │
    └── Return URL to client
            │
            └── Client accesses storage directly
```

### Pattern 4: CDN Distribution

Edge caching for file delivery.

| Component | Description | Tenant Consideration |
|-----------|-------------|---------------------|
| Origin | Storage bucket | Tenant-partitioned |
| Cache Key | Include tenant | `/{tenant}/...` |
| Cache Invalidation | Per-tenant purge | Tenant cache clear |
| Access Control | Signed URLs | Tenant-scoped |

---

## Application Guidelines

When implementing file storage:

1. **Always validate tenant** - Before any file operation
2. **Use signed URLs** - Never expose storage directly
3. **Implement quotas** - Per-tenant storage limits
4. **Track usage** - Metering for billing
5. **Plan lifecycle** - Archival and deletion policies

---

## Per-Tier Storage Configuration

| Tier | Storage Quota | Upload Limit | CDN |
|------|---------------|--------------|-----|
| Free | 1 GB | 10 MB | None |
| Pro | 100 GB | 100 MB | Static |
| Enterprise | 1 TB+ | 1 GB | Full |

---

## File Metadata Structure

| Field | Required | Description |
|-------|----------|-------------|
| file_id | Yes | Unique identifier |
| tenant_id | Yes | Tenant context |
| storage_key | Yes | Storage location |
| filename | Yes | Original name |
| content_type | Yes | MIME type |
| size_bytes | Yes | File size |
| uploaded_by | Yes | User reference |
| uploaded_at | Yes | Upload timestamp |
| checksum | Yes | Integrity hash |

---

## Lifecycle Policies

| Policy | Description | Tenant Consideration |
|--------|-------------|---------------------|
| Expiration | Delete after time | Per-file or tenant default |
| Archival | Move to cold storage | Based on access patterns |
| Versioning | Keep history | Per-tier feature |
| Retention | Compliance hold | Per-tenant regulations |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Direct bucket access | No tenant validation | Always use application layer |
| Missing tenant prefix | Cross-tenant access | Enforce key structure |
| No quota enforcement | Storage abuse | Per-tenant limits |
| Missing virus scan | Security risk | Scan on upload |
| No encryption | Compliance issue | Encrypt at rest |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Prefix vs bucket-per-tenant? | Prefix for most; bucket for compliance | Simpler management vs stronger isolation |
| How to handle large files? | Multipart upload with presigned URLs | Better reliability and user experience |
| CDN for all files? | CDN for public/static; signed URLs for private | Balance performance vs security |
| Encryption? | Always encrypt at rest and in transit | Security and compliance requirement |

---

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Configure file isolation
- `bmad-bam-tenant-onboarding-design` - Provision storage
- `bmad-bam-compliance-design` - File compliance requirements

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **File storage:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `file-storage`
- **Tenant isolation:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Data residency:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `data-residency`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "tenant isolated file storage {date}"
- Search: "multi-tenant blob storage patterns {date}"
- Search: "S3 multi-tenant best practices {date}"
