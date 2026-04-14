---
name: GraphQL API Configuration Template
description: Comprehensive GraphQL API design including schema definitions, resolvers, tenant context management, and security configurations for multi-tenant platforms
category: integration
version: 1.0.0
type: template
---

# {{project_name}} GraphQL API Specification

## Purpose

This template defines the complete GraphQL API architecture for {{project_name}}, including schema definitions, resolver implementations, tenant context propagation, authorization directives, and performance optimization strategies. It ensures a consistent, secure, and efficient GraphQL API layer across the multi-tenant platform.

## Document Metadata

| Field | Value |
|-------|-------|
| Document ID | `GQL-{{graphql_id}}` |
| Schema Version | {{schema_version}} |
| Environment | {{environment}} |
| Author | {{author}} |
| Approver | {{approver}} |
| Classification | {{classification}} |
| Last Updated | {{last_updated}} |

## Table of Contents

1. [GraphQL Architecture](#graphql-architecture)
2. [Schema Design](#schema-design)
3. [Resolver Implementation](#resolver-implementation)
4. [Tenant Context Management](#tenant-context-management)
5. [Authorization and Security](#authorization-and-security)
6. [Performance Optimization](#performance-optimization)
7. [Error Handling](#error-handling)
8. [Subscriptions](#subscriptions)
9. [Monitoring and Observability](#monitoring-and-observability)
10. [Web Research Queries](#web-research-queries)
11. [Verification Checklist](#verification-checklist)
12. [Change Log](#change-log)

## GraphQL Architecture

### Server Configuration

| Parameter | Value | Description |
|-----------|-------|-------------|
| Endpoint | {{graphql_endpoint}} | GraphQL API endpoint |
| Framework | {{graphql_framework}} | GraphQL server framework |
| Schema Stitching | {{schema_stitching}} | Federation/stitching approach |
| Introspection | {{introspection_enabled}} | Schema introspection setting |
| Playground | {{playground_enabled}} | GraphQL playground setting |

### Federation Architecture

| Service | Schema | Entities | Gateway Integration |
|---------|--------|----------|---------------------|
| {{service_name_1}} | {{schema_1}} | {{entities_1}} | {{integration_1}} |
| {{service_name_2}} | {{schema_2}} | {{entities_2}} | {{integration_2}} |
| {{service_name_3}} | {{schema_3}} | {{entities_3}} | {{integration_3}} |

### Schema Registry

| Parameter | Value | Description |
|-----------|-------|-------------|
| Registry URL | {{registry_url}} | Schema registry endpoint |
| Version Control | {{version_control}} | Schema versioning strategy |
| Breaking Change Detection | {{breaking_detection}} | Automated breaking change detection |

## Schema Design

### Type Definitions

| Type | Category | Description | Tenant Scoped |
|------|----------|-------------|---------------|
| {{type_name_1}} | {{category_1}} | {{description_1}} | {{scoped_1}} |
| {{type_name_2}} | {{category_2}} | {{description_2}} | {{scoped_2}} |
| Tenant | Entity | Tenant organization type | Yes |
| Agent | Entity | AI agent configuration | Yes |
| Execution | Entity | Agent execution record | Yes |

### Core Schema

```graphql
# Tenant Context
type Tenant {
  id: ID!
  name: String!
  tier: TenantTier!
  settings: TenantSettings!
  agents: [Agent!]!
  users: [User!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

# Agent Type
type Agent {
  id: ID!
  tenantId: ID!
  name: String!
  description: String
  configuration: AgentConfiguration!
  executions(first: Int, after: String): ExecutionConnection!
  status: AgentStatus!
}

# Execution Type
type Execution {
  id: ID!
  agentId: ID!
  tenantId: ID!
  status: ExecutionStatus!
  input: JSON!
  output: JSON
  metrics: ExecutionMetrics!
  startedAt: DateTime!
  completedAt: DateTime
}
```

### Input Types

| Input Type | Fields | Validation | Usage |
|------------|--------|------------|-------|
| {{input_type_1}} | {{input_fields_1}} | {{validation_1}} | {{usage_1}} |
| {{input_type_2}} | {{input_fields_2}} | {{validation_2}} | {{usage_2}} |
| CreateAgentInput | name, config, tools | Required fields | Mutation |
| ExecuteAgentInput | agentId, input, options | Valid agent ID | Mutation |

### Query Root

| Query | Arguments | Return Type | Description |
|-------|-----------|-------------|-------------|
| tenant | id: ID | Tenant | Get current tenant |
| agent | id: ID! | Agent | Get agent by ID |
| agents | filter: AgentFilter | [Agent!]! | List agents |
| execution | id: ID! | Execution | Get execution by ID |
| executions | filter: ExecutionFilter | ExecutionConnection! | List executions |

### Mutation Root

| Mutation | Input | Return Type | Description |
|----------|-------|-------------|-------------|
| createAgent | input: CreateAgentInput! | Agent! | Create new agent |
| updateAgent | id: ID!, input: UpdateAgentInput! | Agent! | Update agent |
| deleteAgent | id: ID! | Boolean! | Delete agent |
| executeAgent | input: ExecuteAgentInput! | Execution! | Start execution |
| cancelExecution | id: ID! | Execution! | Cancel execution |

## Resolver Implementation

### Resolver Structure

| Resolver | Data Source | Caching | Batching |
|----------|-------------|---------|----------|
| {{resolver_1}} | {{source_1}} | {{caching_1}} | {{batching_1}} |
| {{resolver_2}} | {{source_2}} | {{caching_2}} | {{batching_2}} |
| Agent | PostgreSQL | Redis | DataLoader |
| Execution | PostgreSQL + TimescaleDB | None | DataLoader |

### DataLoader Configuration

| Loader | Batch Key | Max Batch Size | Cache |
|--------|-----------|----------------|-------|
| {{loader_name_1}} | {{batch_key_1}} | {{batch_size_1}} | {{cache_1}} |
| {{loader_name_2}} | {{batch_key_2}} | {{batch_size_2}} | {{cache_2}} |
| agentLoader | id | 100 | Per-request |
| executionLoader | id | 200 | Per-request |

### Field Resolvers

| Type | Field | Resolver | N+1 Prevention |
|------|-------|----------|----------------|
| {{parent_type_1}} | {{field_1}} | {{resolver_impl_1}} | {{n1_prevention_1}} |
| {{parent_type_2}} | {{field_2}} | {{resolver_impl_2}} | {{n1_prevention_2}} |
| Agent | executions | executionsByAgentLoader | DataLoader |
| Tenant | agents | agentsByTenantLoader | DataLoader |

## Tenant Context Management

### Context Extraction

| Source | Header/Field | Extraction Method | Validation |
|--------|--------------|-------------------|------------|
| JWT | Authorization | {{jwt_extraction}} | {{jwt_validation}} |
| API Key | X-API-Key | {{api_key_extraction}} | {{api_key_validation}} |
| Session | Cookie | {{session_extraction}} | {{session_validation}} |

### Context Structure

```typescript
interface GraphQLContext {
  tenantId: string;
  userId: string;
  organizationId: string;
  permissions: string[];
  tier: TenantTier;
  requestId: string;
  traceId: string;
  dataloaders: DataLoaders;
}
```

### Tenant Scoping

| Operation | Scoping Method | Enforcement |
|-----------|----------------|-------------|
| Query | {{query_scoping}} | {{query_enforcement}} |
| Mutation | {{mutation_scoping}} | {{mutation_enforcement}} |
| Subscription | {{subscription_scoping}} | {{subscription_enforcement}} |

### Cross-Tenant Access

| Scenario | Allowed | Validation | Audit |
|----------|---------|------------|-------|
| Platform Admin | {{admin_allowed}} | {{admin_validation}} | {{admin_audit}} |
| Partner Access | {{partner_allowed}} | {{partner_validation}} | {{partner_audit}} |
| Support Access | {{support_allowed}} | {{support_validation}} | {{support_audit}} |

## Authorization and Security

### Authorization Directives

| Directive | Arguments | Behavior | Example |
|-----------|-----------|----------|---------|
| @auth | roles: [String!] | Role-based access | @auth(roles: ["admin"]) |
| @tenant | - | Tenant scope check | @tenant |
| @permission | permission: String! | Permission check | @permission(permission: "agents:write") |
| @rateLimit | limit: Int!, window: String! | Rate limiting | @rateLimit(limit: 100, window: "1m") |

### Field-Level Security

| Type | Field | Directive | Condition |
|------|-------|-----------|-----------|
| {{type_field_1}} | {{field_name_1}} | {{directive_1}} | {{condition_1}} |
| {{type_field_2}} | {{field_name_2}} | {{directive_2}} | {{condition_2}} |
| Agent | configuration | @permission | agents:config:read |
| Execution | input | @permission | executions:input:read |

### Query Complexity

| Parameter | Value | Description |
|-----------|-------|-------------|
| Max Depth | {{max_depth}} | Maximum query depth |
| Max Complexity | {{max_complexity}} | Maximum query complexity |
| Field Cost | {{field_cost_default}} | Default field cost |
| Connection Cost | {{connection_cost}} | Pagination connection cost |

### Security Headers

| Header | Value | Purpose |
|--------|-------|---------|
| X-Content-Type-Options | nosniff | Prevent MIME sniffing |
| X-Frame-Options | DENY | Prevent clickjacking |
| Content-Security-Policy | {{csp_policy}} | Content security |

## Performance Optimization

### Query Analysis

| Metric | Threshold | Action |
|--------|-----------|--------|
| Query Depth | > {{depth_threshold}} | Reject with error |
| Query Complexity | > {{complexity_threshold}} | Reject with error |
| Execution Time | > {{time_threshold}} | Log warning |
| Response Size | > {{size_threshold}} | Log warning |

### Caching Strategy

| Cache Level | Implementation | TTL | Invalidation |
|-------------|----------------|-----|--------------|
| Response | {{response_cache}} | {{response_ttl}} | {{response_invalidation}} |
| Resolver | {{resolver_cache}} | {{resolver_ttl}} | {{resolver_invalidation}} |
| DataLoader | {{loader_cache}} | Request-scoped | Request end |

### Pagination Configuration

| Connection | Default Limit | Max Limit | Cursor Type |
|------------|---------------|-----------|-------------|
| agents | {{agent_default}} | {{agent_max}} | Opaque |
| executions | {{exec_default}} | {{exec_max}} | Opaque |
| {{connection_1}} | {{default_1}} | {{max_1}} | {{cursor_1}} |

## Error Handling

### Error Classification

| Error Code | Category | HTTP Status | Retryable |
|------------|----------|-------------|-----------|
| UNAUTHENTICATED | Auth | 401 | No |
| FORBIDDEN | Auth | 403 | No |
| NOT_FOUND | Client | 404 | No |
| VALIDATION_ERROR | Client | 400 | No |
| TENANT_NOT_FOUND | Client | 404 | No |
| RATE_LIMITED | Client | 429 | Yes |
| INTERNAL_ERROR | Server | 500 | Yes |

### Error Extensions

```json
{
  "errors": [{
    "message": "{{error_message}}",
    "extensions": {
      "code": "{{error_code}}",
      "field": "{{error_field}}",
      "timestamp": "{{error_timestamp}}",
      "requestId": "{{request_id}}",
      "tenantId": "{{tenant_id}}"
    }
  }]
}
```

## Subscriptions

### Subscription Types

| Subscription | Event | Filter | Authorization |
|--------------|-------|--------|---------------|
| {{sub_name_1}} | {{event_1}} | {{filter_1}} | {{auth_1}} |
| {{sub_name_2}} | {{event_2}} | {{filter_2}} | {{auth_2}} |
| executionUpdated | Execution status change | agentId | @tenant |
| agentStatusChanged | Agent status change | agentId | @tenant |

### WebSocket Configuration

| Parameter | Value | Description |
|-----------|-------|-------------|
| Protocol | {{ws_protocol}} | WebSocket sub-protocol |
| Heartbeat Interval | {{heartbeat_interval}} | Keep-alive interval |
| Connection Timeout | {{connection_timeout}} | Connection timeout |
| Max Connections per Tenant | {{max_connections}} | Connection limit |

## Monitoring and Observability

### Metrics

| Metric | Type | Labels | Alert Threshold |
|--------|------|--------|-----------------|
| graphql_query_duration | Histogram | operation, status | p99 > {{duration_threshold}}ms |
| graphql_query_complexity | Histogram | operation | avg > {{complexity_alert}} |
| graphql_errors_total | Counter | code, operation | rate > {{error_rate}} |
| graphql_active_subscriptions | Gauge | tenant | > {{sub_threshold}} |

### Query Logging

| Log Level | Content | Retention |
|-----------|---------|-----------|
| DEBUG | Full query + variables | {{debug_retention}} |
| INFO | Operation name + duration | {{info_retention}} |
| ERROR | Query + errors + context | {{error_retention}} |

### Tracing Integration

| Component | Span Name | Attributes |
|-----------|-----------|------------|
| Request | graphql.request | operation, complexity |
| Resolver | graphql.resolve | fieldName, parentType |
| DataLoader | graphql.dataloader | loaderName, batchSize |

## Web Research Queries

Use these queries to research current best practices:

1. "GraphQL multi-tenant authorization patterns {date}" - Research tenant isolation in GraphQL APIs
2. "GraphQL federation vs schema stitching comparison {date}" - Compare GraphQL composition approaches
3. "GraphQL query complexity analysis performance {date}" - Explore complexity limiting strategies

## Verification Checklist

- [ ] Schema types defined with proper descriptions
- [ ] All resolvers implemented with DataLoaders
- [ ] Tenant context extraction configured
- [ ] Authorization directives applied to all fields
- [ ] Query complexity limits configured
- [ ] Pagination implemented for list queries
- [ ] Error handling standardized
- [ ] Subscriptions secured with tenant context
- [ ] Caching strategy implemented
- [ ] Metrics and logging configured
- [ ] Introspection disabled in production
- [ ] Security headers configured
- [ ] Load testing completed
- [ ] Documentation generated from schema

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {{initial_date}} | {{initial_author}} | Initial GraphQL API specification |
| {{version_2}} | {{date_2}} | {{author_2}} | {{changes_2}} |
| {{version_3}} | {{date_3}} | {{author_3}} | {{changes_3}} |
