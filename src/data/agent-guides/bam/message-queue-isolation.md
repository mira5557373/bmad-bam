# BAM Message Queue Isolation Guide

**When to load:** During implementation phase when building message queue infrastructure for multi-tenant systems. Load when designing Kafka topics, RabbitMQ vhosts, consumer groups, or dead-letter queue strategies per tenant.

**Integrates with:** Dev agents, DevOps agents, Platform Architect (Atlas)

---

## Core Concepts for Message Queue Isolation

### Isolation Strategy Overview

Message queue isolation is critical for preventing data leakage between tenants and ensuring fair resource allocation. The isolation strategy depends on tenant volume, compliance requirements, and operational complexity tolerance.

| Strategy | Isolation Level | Operational Cost | Best For |
|----------|-----------------|------------------|----------|
| Topic-per-tenant | High | High | Regulated industries, enterprise tenants |
| Partition-based | Medium | Medium | High-volume SaaS, cost-conscious deployments |
| Header-based filtering | Low | Low | Simple use cases, internal services |
| Vhost-per-tenant (RabbitMQ) | High | Medium | RabbitMQ deployments needing strong isolation |

### Kafka Topic-Per-Tenant Strategy

Creating dedicated topics for each tenant provides the strongest isolation guarantees in Kafka. This approach simplifies access control and enables per-tenant retention policies.

#### Topic Naming Convention

```
{domain}.{event-type}.tenant.{tenant_id}
```

Examples:
- `billing.invoice-created.tenant.abc123`
- `agent.run-completed.tenant.abc123`
- `notification.email-sent.tenant.abc123`

#### Topic Configuration Per Tier

| Configuration | FREE Tier | PRO Tier | ENTERPRISE Tier |
|---------------|-----------|----------|-----------------|
| Partitions | 1 | 3 | 6+ |
| Replication Factor | 1 | 2 | 3 |
| Retention (ms) | 86400000 (1 day) | 604800000 (7 days) | 2592000000 (30 days) |
| Max Message Size | 1MB | 5MB | 10MB |
| Segment Size | 100MB | 500MB | 1GB |

#### ACL Configuration for Topic Isolation

```
# Producer ACL for tenant
kafka-acls --add --allow-principal User:tenant-abc123 \
  --producer --topic '*.tenant.abc123' --cluster

# Consumer ACL for tenant
kafka-acls --add --allow-principal User:tenant-abc123 \
  --consumer --topic '*.tenant.abc123' --group 'tenant-abc123-*' --cluster
```

### Kafka Partition-Based Strategy

For cost-conscious deployments, partitioning by tenant within shared topics reduces infrastructure overhead while maintaining logical separation.

#### Partition Key Strategy

Use tenant ID as the partition key to ensure all messages for a tenant land in the same partition:

| Approach | Partition Key | Ordering Guarantee |
|----------|---------------|-------------------|
| Tenant-only | `{tenant_id}` | Per-tenant ordering |
| Tenant + Entity | `{tenant_id}:{entity_id}` | Per-entity within tenant |
| Tenant + Shard | `{tenant_id}:{shard_key}` | Distributed within tenant |

#### Consumer Assignment Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| Sticky Assignment | Consumer affinity to partitions | Cache locality |
| Round Robin | Even distribution | Stateless consumers |
| Custom Assignor | Tenant-aware assignment | Dedicated processing capacity |

### Message Metadata for Tenant Context

Every message must carry tenant context in headers for routing, filtering, and audit purposes.

#### Required Message Headers

| Header | Type | Description | Example |
|--------|------|-------------|---------|
| `X-Tenant-ID` | String | Tenant identifier | `abc123` |
| `X-Correlation-ID` | String | Request trace ID | `req-xyz789` |
| `X-User-ID` | String | Originating user | `user-456` |
| `X-Timestamp` | Long | Message creation time | `1712345678000` |
| `X-Source-Service` | String | Producing service | `billing-service` |
| `X-Message-Version` | String | Schema version | `1.2.0` |
| `X-Tier` | String | Tenant subscription tier | `pro` |

#### Schema Registry Per Tenant

For strongly-typed message contracts, consider tenant-namespaced schemas:

| Subject Naming | Example | Use Case |
|----------------|---------|----------|
| Topic-based | `billing.invoice-created.tenant.abc123-value` | Topic-per-tenant |
| Tenant-prefix | `tenant-abc123.invoice-created-value` | Shared topics |
| Global + Version | `invoice-created-v1-value` | Schema reuse across tenants |

### Consumer Group Isolation Per Tenant

Consumer groups must be isolated to prevent one tenant's consumers from processing another tenant's messages.

#### Consumer Group Naming Convention

```
{service}.{function}.tenant.{tenant_id}
```

Examples:
- `billing-service.invoice-processor.tenant.abc123`
- `notification-service.email-sender.tenant.abc123`
- `agent-runtime.task-executor.tenant.abc123`

#### Consumer Group Configuration Matrix

| Configuration | FREE Tier | PRO Tier | ENTERPRISE Tier |
|---------------|-----------|----------|-----------------|
| Max Consumers | 2 | 10 | 50+ |
| Session Timeout | 10s | 30s | 45s |
| Heartbeat Interval | 3s | 10s | 15s |
| Max Poll Records | 100 | 500 | 1000 |
| Auto Offset Reset | earliest | earliest | earliest |

### Dead-Letter Queue Per Tenant

Failed messages must be routed to tenant-specific dead-letter queues for isolation and separate retry policies.

#### DLQ Naming Convention

```
dlq.{domain}.{event-type}.tenant.{tenant_id}
```

Examples:
- `dlq.billing.invoice-created.tenant.abc123`
- `dlq.agent.run-completed.tenant.abc123`

#### DLQ Routing Strategy

| Failure Type | Action | Retry Policy |
|--------------|--------|--------------|
| Transient (timeout, network) | Route to DLQ with retry | Exponential backoff, max 5 retries |
| Permanent (validation, schema) | Route to DLQ, no retry | Manual intervention required |
| Poison pill | Route to quarantine | Human review required |
| Rate limited | Route to delay queue | Fixed delay, then retry |

#### DLQ Metadata Enrichment

Messages routed to DLQ must include failure context:

| Header | Description | Example |
|--------|-------------|---------|
| `X-DLQ-Reason` | Failure reason | `PROCESSING_TIMEOUT` |
| `X-DLQ-Original-Topic` | Source topic | `billing.invoice-created.tenant.abc123` |
| `X-DLQ-Retry-Count` | Retry attempt number | `3` |
| `X-DLQ-First-Failure` | Initial failure timestamp | `1712345678000` |
| `X-DLQ-Last-Failure` | Most recent failure | `1712346789000` |
| `X-DLQ-Exception` | Exception class | `java.lang.IllegalStateException` |

### RabbitMQ Virtual Host Isolation

RabbitMQ vhosts provide namespace-level isolation, ideal for tenant separation.

#### Vhost Naming Convention

```
tenant-{tenant_id}
```

Or for environment scoping:
```
{environment}-tenant-{tenant_id}
```

#### Vhost Configuration Per Tier

| Configuration | FREE Tier | PRO Tier | ENTERPRISE Tier |
|---------------|-----------|----------|-----------------|
| Max Connections | 5 | 25 | 100+ |
| Max Channels | 10 | 100 | 500+ |
| Max Queues | 20 | 100 | 500+ |
| Max Message Size | 128KB | 1MB | 10MB |
| Message TTL Default | 1 hour | 24 hours | 7 days |

#### RabbitMQ User Permissions Per Vhost

```bash
# Create tenant user
rabbitmqctl add_user tenant-abc123 {generated_password}

# Set permissions for tenant vhost only
rabbitmqctl set_permissions -p tenant-abc123 tenant-abc123 ".*" ".*" ".*"

# Set topic permissions for exchange routing
rabbitmqctl set_topic_permissions -p tenant-abc123 tenant-abc123 \
  amq.topic "^tenant\.abc123\." "^tenant\.abc123\."
```

#### Exchange and Queue Naming in Vhost

| Resource | Naming Pattern | Example |
|----------|----------------|---------|
| Exchange | `{domain}.exchange` | `billing.exchange` |
| Queue | `{service}.{function}` | `invoice-processor.queue` |
| Dead-letter Exchange | `dlx.{domain}` | `dlx.billing` |
| Dead-letter Queue | `dlq.{service}` | `dlq.invoice-processor` |

### Cross-Tenant Message Handling

Some scenarios require routing messages across tenant boundaries (platform events, admin notifications). These require special handling.

#### Platform Event Topics

Platform-level events should use a dedicated namespace:

```
platform.{event-type}
```

Examples:
- `platform.tenant-onboarded`
- `platform.maintenance-scheduled`
- `platform.feature-released`

#### Tenant Subscription to Platform Events

Tenants subscribe to platform events via filtered consumers:

| Event Type | Subscription Pattern | Filter Criteria |
|------------|---------------------|-----------------|
| Maintenance | Opt-out | `affected_regions` contains tenant region |
| Features | Opt-in | `enabled_tiers` includes tenant tier |
| Announcements | All tenants | No filter |

---

## Application Guidelines

When implementing message queue isolation:

1. **Choose isolation strategy early** - Topic-per-tenant vs partition-based decision impacts infrastructure significantly
2. **Enforce header requirements** - Reject messages missing mandatory tenant context headers
3. **Implement DLQ from day one** - Failed message handling is critical for operations
4. **Monitor per-tenant throughput** - Alert on unusual message volumes that may indicate issues
5. **Test cross-tenant isolation** - Verify tenant A cannot consume tenant B messages
6. **Document consumer group ownership** - Track which services own which consumer groups

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Event patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `event-driven`, `background-jobs`
- **Tenant patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`, `tenant-context-propagation`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "Kafka multi-tenant topic isolation patterns {date}"
- Search: "RabbitMQ vhost multi-tenancy best practices {date}"
- Search: "message queue tenant isolation SaaS architecture {date}"
- Search: "Kafka consumer group isolation patterns {date}"
- Search: "dead-letter queue patterns multi-tenant {date}"

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Do you have regulatory requirements for message isolation? | Use topic-per-tenant or vhost-per-tenant strategy | Regulated industries require strong isolation guarantees that partition-based cannot provide |
| Is operational cost a primary concern? | Use partition-based isolation with tenant ID as partition key | Shared topics with partition isolation reduce infrastructure overhead significantly |
| Do you need per-tenant retention policies? | Implement topic-per-tenant to enable custom retention | Topic-level configuration allows different retention per tenant tier |
| How do you handle failed message processing? | Implement tenant-scoped dead-letter queues with failure metadata | Isolated DLQs prevent one tenant's failures from affecting others' visibility |
| Should enterprise tenants have dedicated capacity? | Provision dedicated partitions or consumer groups for enterprise tier | Dedicated resources prevent noisy neighbor effects for premium tenants |

---

## Integration with BAM Workflows

- `bmad-bam-create-master-architecture` -> Define message queue topology for tenants
- `bmad-bam-tenant-model-isolation` -> Map tenant model to queue isolation strategy
- `bmad-bam-internal-contract-design` -> Design event flows with tenant context
- `bmad-bam-tenant-onboarding-design` -> Automate topic/vhost provisioning
- `bmad-bam-tenant-offboarding-design` -> Clean up tenant queues and messages

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Design tenant isolation strategy for message queues
- `bmad-bam-tenant-onboarding-design` - Automate queue/topic provisioning during tenant setup
- `bmad-bam-tenant-offboarding-design` - Handle queue cleanup during tenant removal
- `bmad-bam-security-review` - Validate message queue access controls and isolation
