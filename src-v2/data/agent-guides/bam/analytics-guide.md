# BAM Analytics Guide

**When to load:** During analytics design, usage metering implementation, or business intelligence tasks. Load when user mentions analytics, metrics, dashboards, cohorts, or churn prediction.

**Integrates with:** bmad-agent-analyst (Business Analysis), bmad-agent-pm (Product Management)

---

## Core Concepts

### Tenant Analytics Architecture

Analytics in multi-tenant SaaS presents unique challenges that require careful architectural decisions. The system must balance platform-wide insights with strict tenant data isolation while providing real-time and historical analysis capabilities.

Key architectural requirements:

- **Tenant Data Isolation**: Each tenant sees only their data in dashboards and reports. RLS policies must extend to analytics queries, and caching must be tenant-aware to prevent data leakage.
- **Aggregation Layers**: Platform-wide metrics for internal use versus tenant-specific metrics for customer-facing dashboards. Aggregation strategies differ significantly between these contexts.
- **Real-time vs Batch**: Different latency requirements for operational metrics (real-time alerts) versus business metrics (daily/weekly rollups). Plan infrastructure accordingly.
- **Self-Service**: Tenant access to their own analytics through embedded dashboards, API access, and export capabilities. Consider customization options per tier.

### Key Metric Categories

Comprehensive analytics spans multiple metric categories serving different stakeholders:

1. **Usage Metrics**: API calls, storage consumption, compute time, feature utilization. These drive billing calculations and capacity planning.
2. **Engagement Metrics**: DAU (Daily Active Users), MAU (Monthly Active Users), session duration, feature adoption rates, user journey completion. Critical for product decisions.
3. **Revenue Metrics**: MRR (Monthly Recurring Revenue), ARR (Annual Recurring Revenue), LTV (Lifetime Value), CAC (Customer Acquisition Cost), churn rate, expansion revenue. Essential for business health assessment.
4. **Health Metrics**: Composite scores combining multiple signals to predict tenant success, churn risk, and expansion potential. Used for proactive customer success interventions.

### Analytics Pipeline Architecture

A well-designed analytics pipeline handles the data journey from event capture to visualization:

```
Events → Collection → Processing → Storage → Query → Visualization
  ↓         ↓           ↓           ↓         ↓          ↓
Tracking  Kafka    Spark/Flink   ClickHouse  Cube    Embedded BI
```

| Stage | Technology Options | Multi-Tenant Consideration |
|-------|-------------------|---------------------------|
| Events | SDK, Server-side | Include tenant_id in all events |
| Collection | Kafka, Kinesis | Partition by tenant for isolation |
| Processing | Spark, Flink | Filter by tenant during jobs |
| Storage | ClickHouse, BigQuery | RLS or separate tables per tenant |
| Query | Cube.js, Presto | Enforce tenant context in queries |
| Visualization | Metabase, Superset | Tenant-scoped dashboards |

### Data Retention and Compliance

Multi-tenant analytics must address data lifecycle requirements:

- **Retention Policies**: Different retention periods by data type and tenant tier
- **GDPR Compliance**: Right to erasure must include analytics data
- **Data Minimization**: Only collect what is needed for defined purposes
- **Anonymization**: Aggregate metrics can be retained after tenant deletion

## Application Guidelines

When designing analytics systems:

1. **Define Metric Taxonomy Upfront**: Establish naming conventions, dimensions, and hierarchies before implementation. Changes are expensive after data is flowing.

2. **Implement Event Versioning**: Schema changes are inevitable. Version events from day one to handle migrations gracefully.

3. **Plan Data Retention Policies**: Define retention periods per metric type and tier. Storage costs grow quickly with analytics data.

4. **Consider GDPR for Analytics**: Analytics data often contains PII. Plan for deletion requests and ensure tenant isolation in all queries.

5. **Build for Query Performance**: Analytics queries can be expensive. Use pre-aggregation, materialized views, and query caching strategically.

## Decision Framework

| Scenario | Recommendation | Rationale |
|----------|---------------|-----------|
| Real-time needed | ClickHouse + Kafka | Low latency, high throughput |
| Embedded BI | Cube.js or Metabase | Tenant-facing capabilities |
| ML/Predictions | Feature store | Model training pipelines |
| Simple dashboards | Built-in charting | Faster delivery, lower complexity |
| High data volume | Column store + partitioning | Efficient queries at scale |

## Related Workflows

- `bmad-bam-tenant-analytics-dashboard` - Dashboard design
- `bmad-bam-product-analytics-instrumentation` - Event tracking
- `bmad-bam-cohort-analysis` - Cohort segmentation
- `bmad-bam-churn-prediction` - Churn modeling
- `bmad-bam-tenant-health-monitoring` - Health scoring

## Related Patterns

Load decision criteria from pattern registry:

- **Analytics patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `analytics`

### Web Research

Use the `web_queries` column from pattern registry:
- Search: "SaaS analytics architecture {date}"
- Search: "embedded analytics multi-tenant {date}"
- Search: "churn prediction models SaaS {date}"
