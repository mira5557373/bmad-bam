---
name: Event Streaming Configuration Template
description: Comprehensive event streaming architecture including event schemas, Kafka/EventBridge configuration, partitioning strategies, and tenant isolation for multi-tenant platforms
category: integration
version: 1.0.0
type: template
---

# {{project_name}} Event Streaming Architecture

## Purpose

This template defines the complete event streaming architecture for {{project_name}}, including event schema definitions, message broker configuration, partitioning strategies, tenant isolation patterns, and event processing pipelines. It ensures reliable, scalable, and tenant-aware event-driven communication across platform services.

## Document Metadata

| Field | Value |
|-------|-------|
| Document ID | `EVT-{{event_stream_id}}` |
| Architecture Version | {{architecture_version}} |
| Environment | {{environment}} |
| Author | {{author}} |
| Approver | {{approver}} |
| Classification | {{classification}} |
| Last Updated | {{last_updated}} |

## Table of Contents

1. [Event Architecture Overview](#event-architecture-overview)
2. [Event Schema Definitions](#event-schema-definitions)
3. [Kafka Configuration](#kafka-configuration)
4. [EventBridge Configuration](#eventbridge-configuration)
5. [Partitioning Strategy](#partitioning-strategy)
6. [Tenant Isolation](#tenant-isolation)
7. [Event Processing](#event-processing)
8. [Dead Letter Handling](#dead-letter-handling)
9. [Monitoring and Observability](#monitoring-and-observability)
10. [Web Research Queries](#web-research-queries)
11. [Verification Checklist](#verification-checklist)
12. [Change Log](#change-log)

## Event Architecture Overview

### Architecture Components

| Component | Technology | Purpose | SLA |
|-----------|------------|---------|-----|
| Message Broker | {{broker_technology}} | {{broker_purpose}} | {{broker_sla}} |
| Schema Registry | {{registry_technology}} | {{registry_purpose}} | {{registry_sla}} |
| Event Router | {{router_technology}} | {{router_purpose}} | {{router_sla}} |
| Stream Processor | {{processor_technology}} | {{processor_purpose}} | {{processor_sla}} |

### Event Flow Topology

| Flow Name | Source | Broker | Destination | Pattern |
|-----------|--------|--------|-------------|---------|
| {{flow_name_1}} | {{source_1}} | {{broker_1}} | {{dest_1}} | {{pattern_1}} |
| {{flow_name_2}} | {{source_2}} | {{broker_2}} | {{dest_2}} | {{pattern_2}} |
| {{flow_name_3}} | {{source_3}} | {{broker_3}} | {{dest_3}} | {{pattern_3}} |

## Event Schema Definitions

### Schema Registry Configuration

| Parameter | Value | Description |
|-----------|-------|-------------|
| Registry URL | {{registry_url}} | Schema registry endpoint |
| Compatibility Mode | {{compatibility_mode}} | Schema evolution strategy |
| Serialization | {{serialization_format}} | Event serialization format |
| Validation | {{validation_mode}} | Schema validation level |

### Core Event Types

| Event Type | Schema Version | Domain | Retention |
|------------|----------------|--------|-----------|
| {{event_type_1}} | {{schema_version_1}} | {{domain_1}} | {{retention_1}} |
| {{event_type_2}} | {{schema_version_2}} | {{domain_2}} | {{retention_2}} |
| tenant.created | v1 | Tenant | 365 days |
| agent.execution.completed | v1 | Agent | 90 days |
| billing.usage.recorded | v1 | Billing | 730 days |

### Event Envelope Schema

```json
{
  "event_id": "{{event_id_format}}",
  "event_type": "{{event_type}}",
  "event_version": "{{event_version}}",
  "timestamp": "{{timestamp_format}}",
  "tenant_id": "{{tenant_id}}",
  "correlation_id": "{{correlation_id}}",
  "causation_id": "{{causation_id}}",
  "source": {
    "service": "{{source_service}}",
    "instance": "{{source_instance}}"
  },
  "metadata": {
    "trace_id": "{{trace_id}}",
    "span_id": "{{span_id}}"
  },
  "payload": {}
}
```

### Domain Event Schemas

| Domain | Event | Key Fields | Payload Size Limit |
|--------|-------|------------|-------------------|
| {{domain_1}} | {{event_1}} | {{key_fields_1}} | {{size_limit_1}} |
| {{domain_2}} | {{event_2}} | {{key_fields_2}} | {{size_limit_2}} |
| {{domain_3}} | {{event_3}} | {{key_fields_3}} | {{size_limit_3}} |

## Kafka Configuration

### Cluster Configuration

| Parameter | Value | Description |
|-----------|-------|-------------|
| Bootstrap Servers | {{bootstrap_servers}} | Kafka broker addresses |
| Cluster ID | {{cluster_id}} | Kafka cluster identifier |
| Replication Factor | {{replication_factor}} | Data replication count |
| Min ISR | {{min_isr}} | Minimum in-sync replicas |

### Topic Configuration

| Topic Name | Partitions | Replication | Retention | Cleanup Policy |
|------------|------------|-------------|-----------|----------------|
| {{topic_name_1}} | {{partitions_1}} | {{replication_1}} | {{retention_1}} | {{cleanup_1}} |
| {{topic_name_2}} | {{partitions_2}} | {{replication_2}} | {{retention_2}} | {{cleanup_2}} |
| tenant-events | {{tenant_partitions}} | 3 | 7 days | delete |
| agent-executions | {{agent_partitions}} | 3 | 14 days | delete |
| billing-events | {{billing_partitions}} | 3 | 365 days | compact |

### Producer Configuration

| Parameter | Value | Description |
|-----------|-------|-------------|
| Acks | {{producer_acks}} | Acknowledgment level |
| Retries | {{producer_retries}} | Retry attempts |
| Batch Size | {{batch_size}} | Batch size in bytes |
| Linger MS | {{linger_ms}} | Batching delay |
| Compression | {{compression_type}} | Compression algorithm |
| Idempotence | {{idempotence_enabled}} | Exactly-once semantics |

### Consumer Configuration

| Parameter | Value | Description |
|-----------|-------|-------------|
| Group ID Pattern | {{group_id_pattern}} | Consumer group naming |
| Auto Offset Reset | {{offset_reset}} | Initial offset strategy |
| Max Poll Records | {{max_poll_records}} | Records per poll |
| Session Timeout | {{session_timeout}} | Consumer session timeout |
| Heartbeat Interval | {{heartbeat_interval}} | Heartbeat frequency |

## EventBridge Configuration

### Event Bus Configuration

| Bus Name | Account | Region | Archive | Retention |
|----------|---------|--------|---------|-----------|
| {{bus_name_1}} | {{account_1}} | {{region_1}} | {{archive_1}} | {{archive_retention_1}} |
| {{bus_name_2}} | {{account_2}} | {{region_2}} | {{archive_2}} | {{archive_retention_2}} |

### Event Rules

| Rule Name | Event Pattern | Target | Dead Letter Queue |
|-----------|---------------|--------|-------------------|
| {{rule_name_1}} | {{pattern_1}} | {{target_1}} | {{dlq_1}} |
| {{rule_name_2}} | {{pattern_2}} | {{target_2}} | {{dlq_2}} |
| {{rule_name_3}} | {{pattern_3}} | {{target_3}} | {{dlq_3}} |

### Cross-Account Configuration

| Source Account | Target Account | Bus | Permission |
|----------------|----------------|-----|------------|
| {{source_account_1}} | {{target_account_1}} | {{cross_bus_1}} | {{permission_1}} |
| {{source_account_2}} | {{target_account_2}} | {{cross_bus_2}} | {{permission_2}} |

## Partitioning Strategy

### Partition Key Strategy

| Event Type | Partition Key | Rationale | Ordering Guarantee |
|------------|---------------|-----------|-------------------|
| Tenant Events | tenant_id | Tenant isolation | Per-tenant |
| User Events | user_id | User ordering | Per-user |
| Agent Events | agent_id | Agent isolation | Per-agent |
| Billing Events | tenant_id | Billing isolation | Per-tenant |

### Partition Count Guidelines

| Traffic Volume | Partitions | Consumers | Throughput |
|----------------|------------|-----------|------------|
| Low (< 1K/min) | {{low_partitions}} | {{low_consumers}} | {{low_throughput}} |
| Medium (1K-10K/min) | {{medium_partitions}} | {{medium_consumers}} | {{medium_throughput}} |
| High (10K-100K/min) | {{high_partitions}} | {{high_consumers}} | {{high_throughput}} |
| Very High (> 100K/min) | {{very_high_partitions}} | {{very_high_consumers}} | {{very_high_throughput}} |

### Rebalancing Configuration

| Parameter | Value | Description |
|-----------|-------|-------------|
| Rebalance Protocol | {{rebalance_protocol}} | Consumer rebalancing strategy |
| Max Rebalance Delay | {{max_rebalance_delay}} | Maximum rebalance wait time |
| Static Membership | {{static_membership}} | Enable static group membership |

## Tenant Isolation

### Event Isolation Patterns

| Pattern | Implementation | Use Case | Overhead |
|---------|----------------|----------|----------|
| Topic per Tenant | {{topic_per_tenant_impl}} | {{topic_per_tenant_use}} | High |
| Partition Key | {{partition_key_impl}} | {{partition_key_use}} | Low |
| Header Filtering | {{header_filter_impl}} | {{header_filter_use}} | Medium |
| Consumer Groups | {{consumer_group_impl}} | {{consumer_group_use}} | Medium |

### Multi-Tenant Topic Structure

| Topic | Tenant Isolation Method | Access Control |
|-------|------------------------|----------------|
| {{mt_topic_1}} | {{isolation_method_1}} | {{access_control_1}} |
| {{mt_topic_2}} | {{isolation_method_2}} | {{access_control_2}} |

### Tenant Context Propagation

| Field | Location | Format | Validation |
|-------|----------|--------|------------|
| tenant_id | {{tenant_location}} | {{tenant_format}} | {{tenant_validation}} |
| organization_id | {{org_location}} | {{org_format}} | {{org_validation}} |
| environment | {{env_location}} | {{env_format}} | {{env_validation}} |

## Event Processing

### Consumer Groups

| Group Name | Topics | Instances | Processing Mode |
|------------|--------|-----------|-----------------|
| {{group_name_1}} | {{group_topics_1}} | {{group_instances_1}} | {{processing_mode_1}} |
| {{group_name_2}} | {{group_topics_2}} | {{group_instances_2}} | {{processing_mode_2}} |
| {{group_name_3}} | {{group_topics_3}} | {{group_instances_3}} | {{processing_mode_3}} |

### Stream Processing Jobs

| Job Name | Input Topics | Output Topics | Window | Aggregation |
|----------|--------------|---------------|--------|-------------|
| {{job_name_1}} | {{input_1}} | {{output_1}} | {{window_1}} | {{agg_1}} |
| {{job_name_2}} | {{input_2}} | {{output_2}} | {{window_2}} | {{agg_2}} |

### Processing Guarantees

| Guarantee Level | Implementation | Use Cases |
|-----------------|----------------|-----------|
| At-most-once | {{at_most_once_impl}} | {{at_most_once_use}} |
| At-least-once | {{at_least_once_impl}} | {{at_least_once_use}} |
| Exactly-once | {{exactly_once_impl}} | {{exactly_once_use}} |

## Dead Letter Handling

### DLQ Configuration

| Source Topic | DLQ Topic | Max Retries | Retry Delay |
|--------------|-----------|-------------|-------------|
| {{source_dlq_1}} | {{dlq_topic_1}} | {{max_retries_1}} | {{retry_delay_1}} |
| {{source_dlq_2}} | {{dlq_topic_2}} | {{max_retries_2}} | {{retry_delay_2}} |

### Error Classification

| Error Type | Action | DLQ | Alert |
|------------|--------|-----|-------|
| Transient | Retry with backoff | After max retries | Warning |
| Permanent | Send to DLQ | Immediate | Error |
| Poison | Send to DLQ + quarantine | Immediate | Critical |

### DLQ Processing

| Parameter | Value | Description |
|-----------|-------|-------------|
| Manual Review Queue | {{manual_queue}} | Queue for human review |
| Auto-Replay Schedule | {{replay_schedule}} | Automated replay timing |
| Retention Period | {{dlq_retention}} | DLQ message retention |

## Monitoring and Observability

### Key Metrics

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| consumer_lag | Consumer group lag | > {{lag_threshold}} |
| message_rate | Messages per second | < {{rate_threshold}} |
| error_rate | Processing errors/min | > {{error_threshold}} |
| partition_skew | Partition imbalance | > {{skew_threshold}}% |

### Dashboard Panels

| Panel | Visualization | Data | Refresh |
|-------|---------------|------|---------|
| Consumer Lag | {{viz_lag}} | {{data_lag}} | {{refresh_lag}} |
| Throughput | {{viz_throughput}} | {{data_throughput}} | {{refresh_throughput}} |
| Error Rate | {{viz_errors}} | {{data_errors}} | {{refresh_errors}} |
| Topic Size | {{viz_size}} | {{data_size}} | {{refresh_size}} |

### Distributed Tracing

| Component | Trace Header | Propagation |
|-----------|--------------|-------------|
| Producer | {{producer_trace}} | {{producer_propagation}} |
| Consumer | {{consumer_trace}} | {{consumer_propagation}} |
| Processor | {{processor_trace}} | {{processor_propagation}} |

## Web Research Queries

Use these queries to research current best practices:

1. "Kafka multi-tenant partitioning strategies best practices {date}" - Research tenant isolation patterns in Kafka
2. "EventBridge vs Kafka event streaming comparison {date}" - Compare event streaming technologies
3. "event schema evolution backward compatibility {date}" - Explore schema evolution strategies

## Verification Checklist

- [ ] Event schemas registered in schema registry
- [ ] Topic configurations validated for all environments
- [ ] Producer idempotence enabled
- [ ] Consumer groups configured with appropriate settings
- [ ] Partition key strategy documented and implemented
- [ ] Tenant isolation validated
- [ ] Dead letter queues configured
- [ ] Error handling tested
- [ ] Monitoring dashboards created
- [ ] Alert thresholds configured
- [ ] Distributed tracing enabled
- [ ] Disaster recovery tested
- [ ] Performance benchmarks established
- [ ] Security (encryption, ACLs) configured

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {{initial_date}} | {{initial_author}} | Initial event streaming architecture |
| {{version_2}} | {{date_2}} | {{author_2}} | {{changes_2}} |
| {{version_3}} | {{date_3}} | {{author_3}} | {{changes_3}} |
