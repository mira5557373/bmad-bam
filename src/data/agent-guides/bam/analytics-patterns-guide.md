# BAM Analytics Patterns Guide

**When to load:** During analytics design, usage metering implementation, dashboard development, or business intelligence tasks. Load when user mentions analytics, metrics, dashboards, cohorts, churn prediction, usage tracking, or tenant reporting.

**Integrates with:** bmad-agent-analyst (Business Analysis), bmad-agent-pm (Product Management), bmad-agent-architect (Platform Design)

---

## Core Concepts

Analytics in multi-tenant SaaS presents unique challenges that require careful architectural decisions. The system must balance platform-wide insights with strict tenant data isolation while providing real-time and historical analysis capabilities.

### Tenant Analytics Architecture

Key architectural requirements for multi-tenant analytics:

- **Tenant Data Isolation**: Each tenant sees only their data in dashboards and reports. RLS policies must extend to analytics queries, and caching must be tenant-aware to prevent data leakage.
- **Aggregation Layers**: Platform-wide metrics for internal use versus tenant-specific metrics for customer-facing dashboards. Aggregation strategies differ significantly between these contexts.
- **Real-time vs Batch**: Different latency requirements for operational metrics (real-time alerts) versus business metrics (daily/weekly rollups). Plan infrastructure accordingly.
- **Self-Service**: Tenant access to their own analytics through embedded dashboards, API access, and export capabilities. Consider customization options per tier.

### Key Metric Categories

Comprehensive analytics spans multiple metric categories serving different stakeholders:

| Category | Metrics | Stakeholders | Refresh Rate |
|----------|---------|--------------|--------------|
| Usage | API calls, storage, compute time, feature utilization | Billing, Product | Real-time to hourly |
| Engagement | DAU, MAU, session duration, feature adoption, journey completion | Product, Success | Daily |
| Revenue | MRR, ARR, LTV, CAC, churn rate, expansion revenue | Finance, Executive | Daily to weekly |
| Health | Composite scores, churn risk, expansion potential | Success, Sales | Daily |
| Performance | Response times, error rates, availability | Engineering, DevOps | Real-time |

### Analytics Pipeline Architecture

A well-designed analytics pipeline handles the data journey from event capture to visualization:

```
Events --> Collection --> Processing --> Storage --> Query --> Visualization
  |           |             |             |           |           |
Tracking    Kafka      Spark/Flink   ClickHouse    Cube     Embedded BI
```

| Stage | Technology Options | Multi-Tenant Consideration |
|-------|-------------------|---------------------------|
| Events | SDK, Server-side | Include tenant_id in all events |
| Collection | Kafka, Kinesis | Partition by tenant for isolation |
| Processing | Spark, Flink | Filter by tenant during jobs |
| Storage | ClickHouse, BigQuery | RLS or separate tables per tenant |
| Query | Cube.js, Presto | Enforce tenant context in queries |
| Visualization | Metabase, Superset | Tenant-scoped dashboards |

---

## BAM Conventions

> **CRITICAL:** BAM-specific conventions for tenant-scoped analytics

### Mandatory Analytics Requirements

1. **Tenant Context Propagation**: Every analytics event MUST include `tenant_id` as a first-class field
2. **Query Isolation**: All analytics queries MUST be filtered by tenant context before execution
3. **Cache Segmentation**: Analytics caches MUST be keyed by tenant to prevent cross-tenant data exposure
4. **Aggregation Boundaries**: Cross-tenant aggregation MUST only use anonymized or differential privacy methods
5. **Retention Compliance**: Analytics data MUST respect tenant-specific retention policies and GDPR requirements

### Event Schema Standards

All analytics events must conform to this base schema:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `event_id` | UUID | Yes | Unique event identifier |
| `tenant_id` | UUID | Yes | Tenant scope identifier |
| `user_id` | UUID | No | User within tenant (if applicable) |
| `event_type` | String | Yes | Event classification |
| `event_version` | Integer | Yes | Schema version for migrations |
| `timestamp` | ISO8601 | Yes | Event occurrence time |
| `properties` | JSON | Yes | Event-specific data |
| `context` | JSON | No | Session, device, location metadata |

### Tier-Based Analytics Access

| Tier | Dashboard Access | API Access | Data Export | Custom Reports |
|------|-----------------|------------|-------------|----------------|
| Free | Basic metrics only | None | None | None |
| Pro | Standard dashboards | Read-only | CSV weekly | Limited |
| Enterprise | Full dashboards | Full API | Real-time export | Unlimited |

---

## Decision Framework

### Analytics Storage Selection

| Scenario | Recommendation | Rationale |
|----------|---------------|-----------|
| High-volume events (>1M/day) | ClickHouse + Kafka | Optimized for analytics workloads |
| Low-volume, simple queries | PostgreSQL with RLS | Operational simplicity |
| ML/predictive analytics | Feature store + Data warehouse | Model training pipelines |
| Real-time dashboards | TimescaleDB or InfluxDB | Time-series optimized |
| Embedded BI for tenants | Cube.js or Metabase | Tenant-facing capabilities |

### Query Pattern Selection

| Query Type | Pattern | Multi-Tenant Safety |
|------------|---------|---------------------|
| Tenant dashboard | Direct query with RLS | Automatic isolation |
| Platform aggregation | Pre-aggregated tables | Anonymized only |
| Ad-hoc analysis | Query layer with tenant filter | Manual verification |
| Export/reporting | Materialized views per tenant | Scoped by design |

---

## §tenant-analytics

### Pattern: Tenant-Scoped Analytics

Ensures complete data isolation for tenant-facing analytics while maintaining platform visibility for operators.

#### Architecture

```
         +------------------+
         |  Analytics API   |
         +--------+---------+
                  |
         +--------v---------+
         | Tenant Context   |
         | Middleware       |
         +--------+---------+
                  |
    +-------------+-------------+
    |                           |
+---v---+                   +---v---+
|Tenant |                   |Platform|
|Queries|                   |Queries |
+---+---+                   +---+---+
    |                           |
+---v---+                   +---v---+
|RLS    |                   |Admin  |
|Filter |                   |Access |
+-------+                   +-------+
```

#### Implementation Requirements

| Requirement | Implementation | Verification |
|-------------|----------------|--------------|
| Query isolation | RLS policies on all analytics tables | Query audit logging |
| Cache isolation | Tenant-prefixed cache keys | Cache key inspection |
| API isolation | Tenant middleware on all endpoints | API security tests |
| Export isolation | Tenant-scoped export jobs | Export audit trail |

#### Access Control Matrix

| Role | Own Tenant Data | Other Tenant Data | Platform Aggregates |
|------|----------------|-------------------|---------------------|
| Tenant Admin | Full | None | None |
| Tenant User | Scoped | None | None |
| Platform Admin | Full | Full | Full |
| Platform Analyst | None | None | Anonymized only |

#### Anti-Patterns to Avoid

- Storing tenant_id only in application layer without database enforcement
- Sharing analytics cache across tenants without key segmentation
- Allowing direct database access without RLS policies
- Pre-aggregating data that includes identifiable tenant information

---

## §event-tracking

### Pattern: Event Tracking with Tenant Isolation

Captures user and system events with guaranteed tenant context for downstream analytics.

#### Event Taxonomy

| Event Category | Examples | Tenant Relevance |
|----------------|----------|------------------|
| User Actions | Click, Navigate, Submit | Direct tenant attribution |
| System Events | Job completed, Error occurred | Tenant context from trigger |
| Integration Events | Webhook received, API called | External tenant mapping |
| Billing Events | Subscription changed, Payment processed | Billing tenant context |

#### Event Flow Architecture

```
Client/Server --> Event SDK --> Event Queue --> Event Processor --> Event Store
                     |               |                |                |
               Add tenant_id   Partition by     Validate tenant   RLS-protected
                              tenant_id         context           storage
```

#### Event Enrichment Pipeline

| Stage | Enrichment | Source |
|-------|------------|--------|
| Collection | Tenant context | Authentication/API key |
| Processing | User metadata | User service lookup |
| Processing | Session data | Session store |
| Storage | Geo/device info | Request headers |
| Query time | Computed metrics | Aggregation layer |

#### Schema Evolution Strategy

| Change Type | Migration Approach | Backward Compatibility |
|-------------|-------------------|----------------------|
| Add field | Default value, optional | Compatible |
| Remove field | Deprecate, then remove | Requires version bump |
| Change type | New field, migrate data | Requires version bump |
| Rename field | Alias support | Compatible with alias |

#### Event Versioning

All events include `event_version` field to support schema evolution:

| Version | Changes | Migration |
|---------|---------|-----------|
| 1 | Initial schema | N/A |
| 2 | Added context field | Backfill nulls |
| 3 | Split user_id from properties | Transform on read |

---

## §usage-metering

### Pattern: Usage and Consumption Metering

Tracks resource consumption per tenant for billing, quota enforcement, and capacity planning.

#### Metering Dimensions

| Dimension | Unit | Aggregation | Billing Impact |
|-----------|------|-------------|----------------|
| API Calls | Count | Sum per period | Pay-per-use |
| Storage | Bytes | Max per period | Tiered pricing |
| Compute | CPU-seconds | Sum per period | Resource-based |
| Bandwidth | Bytes | Sum per period | Overage fees |
| Active Users | Count | Max per period | Seat-based |
| AI Tokens | Count | Sum per period | Token-based |

#### Metering Architecture

```
+-------------+     +----------------+     +---------------+
| Service     |---->| Metering       |---->| Metering      |
| (API/Worker)|     | Collector      |     | Aggregator    |
+-------------+     +----------------+     +-------+-------+
                                                   |
                    +----------------+     +-------v-------+
                    | Billing        |<----| Usage Store   |
                    | System         |     | (per tenant)  |
                    +----------------+     +---------------+
```

#### Real-time vs Batch Metering

| Approach | Use Case | Latency | Accuracy |
|----------|----------|---------|----------|
| Real-time | Quota enforcement | Milliseconds | Eventual |
| Near-real-time | Usage dashboards | Seconds | High |
| Batch | Billing calculation | Hours | Exact |

#### Quota Enforcement Strategies

| Strategy | Description | User Experience |
|----------|-------------|-----------------|
| Hard limit | Block at threshold | Clear but disruptive |
| Soft limit | Warn then block | Better UX, requires UI |
| Overage | Allow with charges | Flexible, billing complexity |
| Degraded | Reduce service quality | Maintains availability |

#### Metering Accuracy Requirements

| Metric Type | Accuracy | Reconciliation |
|-------------|----------|----------------|
| Billing metrics | 99.99% | Daily reconciliation |
| Dashboard metrics | 99% | Hourly aggregation |
| Real-time alerts | 95% | Eventual consistency acceptable |

---

## §dashboards

### Pattern: Dashboard and Reporting Patterns

Delivers tenant-facing and platform analytics through embedded and standalone dashboards.

#### Dashboard Tiers

| Dashboard Type | Audience | Data Scope | Customization |
|----------------|----------|------------|---------------|
| Tenant Overview | Tenant admins | Single tenant | Limited |
| User Analytics | Tenant users | Assigned scope | None |
| Platform Health | Platform ops | All tenants | Full |
| Executive | Leadership | Aggregated | Predefined |

#### Embedded Analytics Architecture

```
+------------------+     +------------------+     +------------------+
| Tenant App       |     | Analytics API    |     | BI Engine        |
| (iframe/embed)   |<--->| (auth + context) |<--->| (Cube/Metabase)  |
+------------------+     +------------------+     +------------------+
                                |
                         +------v------+
                         | Data Layer  |
                         | (RLS)       |
                         +-------------+
```

#### Dashboard Data Refresh Patterns

| Pattern | Latency | Resource Cost | Use Case |
|---------|---------|---------------|----------|
| Live query | Real-time | High | Small datasets |
| Scheduled refresh | Minutes-hours | Medium | Standard dashboards |
| Materialized views | On-demand | Low at query | Computed metrics |
| Pre-aggregated | Batch | Low | Historical reports |

#### Tenant Dashboard Customization

| Feature | Free Tier | Pro Tier | Enterprise |
|---------|-----------|----------|------------|
| Widget selection | Fixed | Configurable | Full customization |
| Date ranges | Last 30 days | Last 90 days | Unlimited |
| Export formats | None | CSV | CSV, PDF, API |
| Custom metrics | None | 3 | Unlimited |
| White-labeling | None | None | Full |

#### Report Generation Patterns

| Report Type | Generation | Delivery | Format |
|-------------|------------|----------|--------|
| Scheduled | Batch job | Email/webhook | PDF/CSV |
| On-demand | Async job | Download/email | PDF/CSV |
| Real-time | Stream | Dashboard | Visual |
| Embedded | On-load | Inline | HTML/iframe |

---

## §aggregation

### Pattern: Cross-Tenant Aggregation (Anonymized)

Enables platform-wide insights while preserving tenant privacy through anonymization and differential privacy techniques.

#### Aggregation Boundaries

| Data Type | Aggregation Allowed | Method |
|-----------|---------------------|--------|
| Usage metrics | Yes | Sum/Average |
| Feature adoption | Yes | Percentages |
| Performance data | Yes | Percentiles |
| User behavior | Limited | K-anonymity |
| Business metrics | No | Per-tenant only |

#### Privacy-Preserving Aggregation

| Technique | Use Case | Privacy Guarantee |
|-----------|----------|-------------------|
| K-anonymity | Behavioral data | Minimum group size k |
| L-diversity | Sensitive attributes | l distinct values per group |
| Differential privacy | Statistical queries | Epsilon-delta bounds |
| Aggregation thresholds | Small group suppression | Minimum n per bucket |

#### Platform Metrics Architecture

```
+---------------+     +------------------+     +----------------+
| Tenant Data   |---->| Anonymization    |---->| Platform       |
| (isolated)    |     | Pipeline         |     | Aggregates     |
+---------------+     +------------------+     +----------------+
                             |
                      +------v------+
                      | Privacy     |
                      | Enforcement |
                      +-------------+
```

#### Safe Aggregation Rules

| Rule | Description | Enforcement |
|------|-------------|-------------|
| Minimum bucket size | No bucket with <5 tenants | Query layer |
| No re-identification | Cannot link to specific tenant | Privacy audit |
| Noise injection | Add calibrated noise | Aggregation layer |
| Attribute generalization | Broaden specific values | ETL pipeline |

#### Cross-Tenant Analytics Use Cases

| Use Case | Aggregation Method | Output |
|----------|-------------------|--------|
| Benchmark reports | Percentile rankings | "You are in top 10%" |
| Industry trends | Anonymous averages | Trend charts |
| Feature popularity | Adoption percentages | Feature rankings |
| Best practices | Anonymized patterns | Recommendations |

---

## Data Retention and Compliance

Multi-tenant analytics must address data lifecycle requirements:

### Retention Policies by Tier

| Data Type | Free Tier | Pro Tier | Enterprise |
|-----------|-----------|----------|------------|
| Raw events | 7 days | 30 days | 90 days |
| Aggregates | 30 days | 1 year | 3 years |
| Audit logs | 30 days | 1 year | 7 years |
| Exports | 24 hours | 7 days | 30 days |

### GDPR Compliance Requirements

| Requirement | Implementation |
|-------------|----------------|
| Right to erasure | Analytics data deletion pipeline |
| Data minimization | Only collect defined purposes |
| Purpose limitation | Tagged data usage tracking |
| Retention limits | Automated data lifecycle management |

### Anonymization After Deletion

| Data Type | After Tenant Deletion |
|-----------|----------------------|
| Identifiable events | Deleted |
| Aggregated metrics | Retained (anonymized) |
| Platform statistics | Retained (no attribution) |
| Audit records | Retained per compliance |

---

## Quality Gates

### Analytics Quality Gate Checklist

| Gate | Check | Severity |
|------|-------|----------|
| QG-A1 | Tenant isolation verified in all analytics queries | CRITICAL |
| QG-A2 | Event schema includes tenant_id and version | CRITICAL |
| QG-A3 | Cache keys include tenant prefix | CRITICAL |
| QG-A4 | Aggregation respects privacy thresholds | CRITICAL |
| QG-A5 | Metering accuracy meets billing requirements | HIGH |
| QG-A6 | Dashboard performance under 3s load time | HIGH |
| QG-A7 | Data retention policies implemented | HIGH |
| QG-A8 | Export includes only authorized data | CRITICAL |

### Pre-Production Verification

- [ ] All analytics endpoints require tenant authentication
- [ ] RLS policies active on all analytics tables
- [ ] Cache invalidation tested across tenant boundaries
- [ ] Export functionality verified for data scope
- [ ] Metering reconciliation process documented
- [ ] Dashboard permissions matrix validated

---

## Web Research

| Topic | Query |
|-------|-------|
| Analytics Architecture | "SaaS analytics architecture multi-tenant {date}" |
| Embedded BI | "embedded analytics multi-tenant isolation {date}" |
| Usage Metering | "SaaS usage metering patterns {date}" |
| Event Tracking | "event tracking schema design SaaS {date}" |
| Privacy Techniques | "differential privacy analytics aggregation {date}" |
| Dashboard Performance | "analytics dashboard performance optimization {date}" |
| Churn Prediction | "churn prediction models SaaS {date}" |

---

## Related Patterns

> **Note:** Use the `web_queries` column from pattern registry CSVs for current best practices searches.

Load decision criteria from pattern registry:

- **Analytics patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` --> filter by category: `analytics`
- **Tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Compliance frameworks:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Related Workflows

- `bmad-bam-tenant-analytics-dashboard` - Dashboard design for tenant-facing analytics
- `bmad-bam-product-analytics-instrumentation` - Event tracking implementation
- `bmad-bam-cohort-analysis` - Cohort segmentation and analysis
- `bmad-bam-churn-prediction` - Churn modeling and prediction
- `bmad-bam-tenant-health-monitoring` - Health scoring and monitoring
- `bmad-bam-usage-metering-design` - Metering architecture design
- `bmad-bam-billing-integration` - Billing system integration

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-25 | Initial consolidated guide from analytics-guide.md |
