# BAM Data Governance Guide

**When to load:** During Phase 3 (Solutioning) when designing data governance, lineage tracking, data quality frameworks, or data catalog architecture for multi-tenant platforms.

**Integrates with:** Architect (Atlas persona), Analyst (Mary), Dev agent

---

## Core Concepts

### What is Multi-Tenant Data Governance?

Data governance in multi-tenant SaaS ensures that data is properly managed, tracked, and protected across tenant boundaries. It encompasses data lineage, quality, cataloging, and lifecycle management while maintaining strict tenant isolation.

### Data Governance Pillars

| Pillar | Purpose | Tenant Impact |
|--------|---------|---------------|
| Data Lineage | Track data flow and transformations | Tenant-scoped lineage graphs |
| Data Quality | Ensure accuracy and completeness | Tenant-specific quality rules |
| Data Catalog | Enable discovery and understanding | Tenant-filtered search |
| Data Lifecycle | Manage retention and archival | Tenant-aware retention policies |
| Data Security | Protect sensitive data | Tenant isolation enforcement |

---

## Application Guidelines

When implementing data governance in multi-tenant systems:

1. **Isolate governance metadata by tenant**: Lineage, quality metrics, and catalog entries must respect tenant boundaries
2. **Design for compliance**: Build audit trails and evidence collection into governance workflows
3. **Support tier-based features**: Differentiate governance capabilities by tenant tier
4. **Enable self-service**: Allow tenants to manage their own data governance within boundaries
5. **Maintain platform-level oversight**: Provide admin visibility across all tenants

---

## Data Lineage Patterns

### Pattern 1: Tenant-Scoped Lineage Graph

```
Tenant A Lineage Graph          Tenant B Lineage Graph
┌────────────────────┐         ┌────────────────────┐
│  Source A1        │         │  Source B1        │
│       │           │         │       │           │
│       ▼           │         │       ▼           │
│  Transform A1     │         │  Transform B1     │
│       │           │         │       │           │
│       ▼           │         │       ▼           │
│  Sink A1         │         │  Sink B1         │
└────────────────────┘         └────────────────────┘
        │                              │
        └──────────────────────────────┘
                     │
              No Cross-Tenant Links
```

### Pattern 2: Lineage Event Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| event_id | UUID | Yes | Unique event identifier |
| tenant_id | UUID | Yes | Tenant context |
| timestamp | ISO8601 | Yes | Event time |
| event_type | enum | Yes | source/transform/sink |
| source_assets | UUID[] | Yes | Input asset IDs |
| target_assets | UUID[] | Yes | Output asset IDs |
| operation | string | Yes | Operation performed |
| metadata | JSON | No | Additional context |

### Pattern 3: Lineage Capture Points

```
┌─────────────────────────────────────────────────────────┐
│               Lineage Capture Architecture               │
│                                                          │
│   Data Ingestion                                         │
│   └── Capture: source system, format, schema            │
│                                                          │
│   ETL/ELT Processing                                     │
│   └── Capture: transformations, filters, joins          │
│                                                          │
│   API Operations                                         │
│   └── Capture: CRUD operations on business entities     │
│                                                          │
│   Report Generation                                      │
│   └── Capture: data sources, aggregations, outputs      │
│                                                          │
│   Data Export                                            │
│   └── Capture: destination, format, recipient           │
└─────────────────────────────────────────────────────────┘
```

---

## Data Quality Patterns

### Pattern 1: Quality Rule Framework

```
┌─────────────────────────────────────────────────────────┐
│              Quality Rule Categories                     │
│                                                          │
│   Schema Rules (Field-Level)                             │
│   ├── Type validation (string, int, date, etc.)         │
│   ├── Format validation (email, phone, UUID)            │
│   ├── Required field checks                              │
│   └── Range/length constraints                           │
│                                                          │
│   Business Rules (Record-Level)                          │
│   ├── Cross-field validation (start_date < end_date)    │
│   ├── Conditional requirements                          │
│   └── Calculation verification                          │
│                                                          │
│   Referential Rules (Relationship-Level)                 │
│   ├── Foreign key integrity                              │
│   ├── Parent-child relationships                        │
│   └── Orphan detection                                   │
│                                                          │
│   Statistical Rules (Dataset-Level)                      │
│   ├── Distribution checks (outliers, skew)              │
│   ├── Volume thresholds                                  │
│   └── Trend analysis                                     │
└─────────────────────────────────────────────────────────┘
```

### Pattern 2: Tenant-Specific Quality SLAs

| Tier | Completeness SLA | Accuracy SLA | Monitoring |
|------|------------------|--------------|------------|
| Free | Best effort | Best effort | Weekly summary |
| Pro | 98% | 99% | Daily alerts |
| Enterprise | Custom | Custom | Real-time |

### Pattern 3: Quality Metrics Dashboard

```
┌─────────────────────────────────────────────────────────┐
│              Quality Metrics by Dimension                │
│                                                          │
│   Completeness Score: ████████████░░░░ 75%              │
│   Accuracy Score:     ██████████████░░ 87%              │
│   Consistency Score:  ███████████████░ 93%              │
│   Timeliness Score:   █████████████░░░ 80%              │
│   Uniqueness Score:   ████████████████ 99%              │
│                                                          │
│   Overall Quality:    ████████████░░░░ 87%              │
└─────────────────────────────────────────────────────────┘
```

---

## Data Catalog Patterns

### Pattern 1: Catalog Architecture

```
┌─────────────────────────────────────────────────────────┐
│               Data Catalog Layers                        │
│                                                          │
│   ┌─────────────────────────────────────────────┐       │
│   │             Discovery Layer                  │       │
│   │   [Search] [Browse] [Recommendations]       │       │
│   └──────────────────────┬──────────────────────┘       │
│                          │                               │
│   ┌──────────────────────▼──────────────────────┐       │
│   │             Metadata Layer                   │       │
│   │   [Technical] [Business] [Operational]      │       │
│   └──────────────────────┬──────────────────────┘       │
│                          │                               │
│   ┌──────────────────────▼──────────────────────┐       │
│   │             Governance Layer                 │       │
│   │   [Ownership] [Access] [Classification]     │       │
│   └─────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────┘
```

### Pattern 2: Catalog Asset Types

| Asset Type | Metadata | Lineage | Discovery |
|------------|----------|---------|-----------|
| Database | Schema, stats | Yes | SQL-based |
| Table | Columns, indexes | Yes | Search |
| Column | Type, sensitivity | Yes | Filter |
| Pipeline | DAG, schedule | Yes | Browse |
| Report | Sources, outputs | Yes | Tags |
| API | Endpoints, schema | Yes | Documentation |

### Pattern 3: Multi-Tenant Catalog Access

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Asset discovery | Basic search | Full search | Federated |
| Metadata viewing | View only | View + comment | Edit |
| Custom tags | No | 10 tags | Unlimited |
| Data profiling | No | On-demand | Automated |
| Business glossary | Shared read | Shared read | Custom |
| Lineage view | No | Basic | Full |

---

## Data Lifecycle Management

### Pattern 1: Lifecycle States

```
┌─────────────────────────────────────────────────────────┐
│               Data Lifecycle States                      │
│                                                          │
│   Active ───► Archive ───► Purge                        │
│     │           │           │                            │
│     │           │           └─► Cryptographic erase     │
│     │           │                                        │
│     │           └─► Cold storage, compressed            │
│     │                                                    │
│     └─► Hot storage, full access                        │
│                                                          │
│   Retention Policy Application:                          │
│   [Tenant Config] + [Data Type] + [Regulation] = TTL    │
└─────────────────────────────────────────────────────────┘
```

### Pattern 2: Retention by Data Type

| Data Type | Active | Archive | Total Retention |
|-----------|--------|---------|-----------------|
| Transaction data | 1 year | 6 years | 7 years |
| Audit logs | 90 days | 6+ years | Per regulation |
| User data | Active use | +30 days | Per tenant |
| System logs | 30 days | 60 days | 90 days |
| Analytics | 2 years | 3 years | 5 years |

---

## Decision Framework

| Question | Recommendation |
|----------|----------------|
| Need to track data origins? | Implement lineage with tenant-scoped graphs |
| Data quality issues common? | Deploy quality rules per data domain |
| Users struggle to find data? | Build tenant-filtered catalog |
| Compliance requires audit trail? | Enable lineage + retention automation |
| Enterprise customers need governance? | Offer dedicated governance dashboard |

---

## Related Workflows

- `bmad-bam-tenant-data-migration` - Design data migration workflows
- `bmad-bam-data-encryption-design` - Define data encryption framework
- `bmad-bam-tenant-data-export` - Design data export catalog
- `bmad-bam-tenant-model-isolation` - Tenant isolation patterns

## Related Patterns

- **tenant-isolation:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **compliance:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **audit-logging:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `audit-logging`

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `data-governance` | `data governance multi-tenant SaaS {date}` |
| `data-lineage` | `data lineage tracking patterns {date}` |
| `data-quality` | `data quality framework enterprise {date}` |
| `data-catalog` | `data catalog architecture best practices {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.
