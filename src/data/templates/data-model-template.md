---
name: data-model-template
description: Document domain entities, aggregates, value objects, and relationships for multi-tenant systems
category: architecture
version: 1.0.0
type: template
priority: HIGH
---

# Data Model - {{project_name}}

## Purpose

Use this template to document the domain model including entities, aggregates, value objects, and their relationships. This artifact captures the ubiquitous language of the bounded context and ensures consistent multi-tenant data modeling across the platform.

## Document Control

| Field | Value |
|-------|-------|
| Version | {{version}} |
| Date | {{date}} |
| Author | {{author}} |
| Module | {{module_name}} |
| Status | DRAFT / APPROVED / FINAL |

---

## Domain Model Overview

**Project:** {{project_name}}
**Module:** {{module_name}}
**Bounded Context:** {{bounded_context}}
**Tenant Model:** {{tenant_model}}

### Domain Description

{{domain_description}}

### Ubiquitous Language Glossary

| Term | Definition | Context |
|------|------------|---------|
| {{term_1}} | {{definition_1}} | {{context_1}} |
| {{term_2}} | {{definition_2}} | {{context_2}} |
| {{term_3}} | {{definition_3}} | {{context_3}} |

---

## Entities

### Entity: {{entity_name}}

**Description:** {{entity_description}}
**Aggregate:** {{parent_aggregate}}
**Tenant-Scoped:** YES / NO

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| {{tenant_id_field}} | UUID | NOT NULL, INDEX | Tenant identifier for isolation |
| {{field_1}} | {{type_1}} | {{constraints_1}} | {{field_desc_1}} |
| {{field_2}} | {{type_2}} | {{constraints_2}} | {{field_desc_2}} |
| {{field_3}} | {{type_3}} | {{constraints_3}} | {{field_desc_3}} |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Record creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last modification timestamp |
| created_by | UUID | NULLABLE | User who created the record |
| updated_by | UUID | NULLABLE | User who last modified the record |

**Business Rules:**
- {{business_rule_1}}
- {{business_rule_2}}

**Lifecycle:**
```
{{lifecycle_state_1}} --> {{lifecycle_state_2}} --> {{lifecycle_state_3}}
```

---

### Entity: {{entity_name_2}}

**Description:** {{entity_description_2}}
**Aggregate:** {{parent_aggregate_2}}
**Tenant-Scoped:** YES / NO

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| {{tenant_id_field}} | UUID | NOT NULL, INDEX | Tenant identifier for isolation |
| {{field_1}} | {{type_1}} | {{constraints_1}} | {{field_desc_1}} |
| {{field_2}} | {{type_2}} | {{constraints_2}} | {{field_desc_2}} |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Record creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last modification timestamp |

---

## Aggregates

### Aggregate: {{aggregate_name}}

**Root Entity:** {{root_entity}}
**Description:** {{aggregate_description}}
**Consistency Boundary:** {{consistency_boundary}}

| Entity | Role | Lifecycle |
|--------|------|-----------|
| {{root_entity}} | Root | Independent |
| {{child_entity_1}} | Child | Dependent on root |
| {{child_entity_2}} | Child | Dependent on root |

**Invariants:**
- {{invariant_1}}
- {{invariant_2}}
- {{invariant_3}}

**Transactional Scope:**
- All entities within this aggregate are modified in a single transaction
- Cross-aggregate operations use eventual consistency via domain events

---

### Aggregate: {{aggregate_name_2}}

**Root Entity:** {{root_entity_2}}
**Description:** {{aggregate_description_2}}

| Entity | Role | Lifecycle |
|--------|------|-----------|
| {{root_entity_2}} | Root | Independent |
| {{child_entity}} | Child | Dependent on root |

---

## Value Objects

### Value Object: {{value_object_name}}

**Description:** {{value_object_description}}
**Immutable:** YES
**Used By:** {{used_by_entities}}

| Component | Type | Validation |
|-----------|------|------------|
| {{component_1}} | {{type_1}} | {{validation_1}} |
| {{component_2}} | {{type_2}} | {{validation_2}} |

**Equality:**
Two {{value_object_name}} instances are equal if all components match.

---

### Value Object: {{value_object_name_2}}

**Description:** {{value_object_description_2}}
**Immutable:** YES
**Used By:** {{used_by_entities_2}}

| Component | Type | Validation |
|-----------|------|------------|
| {{component_1}} | {{type_1}} | {{validation_1}} |
| {{component_2}} | {{type_2}} | {{validation_2}} |

---

### Value Object: TenantContext

**Description:** Runtime context for multi-tenant operations
**Immutable:** YES (per request)
**Used By:** All tenant-scoped entities

| Component | Type | Validation |
|-----------|------|------------|
| tenant_id | UUID | Required, valid tenant |
| user_id | UUID | Optional |
| tier | ENUM | FREE, PRO, ENTERPRISE |
| permissions | STRING[] | Valid permission set |

---

## Entity Relationships

### Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    {{project_name}} Domain Model                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐         ┌──────────────────┐              │
│  │  {{aggregate_1}} │         │  {{aggregate_2}} │              │
│  │  ┌────────────┐  │         │  ┌────────────┐  │              │
│  │  │ {{root_1}} │  │────────►│  │ {{root_2}} │  │              │
│  │  └────────────┘  │  1:N    │  └────────────┘  │              │
│  │       │          │         │       │          │              │
│  │       │ 1:N      │         │       │ 1:N      │              │
│  │       ▼          │         │       ▼          │              │
│  │  ┌────────────┐  │         │  ┌────────────┐  │              │
│  │  │ {{child}}  │  │         │  │ {{child}}  │  │              │
│  │  └────────────┘  │         │  └────────────┘  │              │
│  └──────────────────┘         └──────────────────┘              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Relationship Matrix

| From Entity | To Entity | Cardinality | Type | Description |
|-------------|-----------|-------------|------|-------------|
| {{entity_a}} | {{entity_b}} | 1:N | Composition | {{relationship_desc}} |
| {{entity_c}} | {{entity_d}} | N:M | Association | {{relationship_desc}} |
| {{entity_e}} | {{entity_f}} | 1:1 | Reference | {{relationship_desc}} |

### Cross-Aggregate References

| Source Aggregate | Target Aggregate | Reference Type | Consistency |
|-----------------|------------------|----------------|-------------|
| {{aggregate_a}} | {{aggregate_b}} | ID Reference | Eventual |
| {{aggregate_c}} | {{aggregate_d}} | ID Reference | Eventual |

---

## Invariants

### Domain Invariants

| ID | Invariant | Scope | Enforcement |
|----|-----------|-------|-------------|
| INV-001 | {{invariant_description_1}} | {{aggregate}} | Application Layer |
| INV-002 | {{invariant_description_2}} | {{aggregate}} | Domain Layer |
| INV-003 | {{invariant_description_3}} | Cross-Aggregate | Event Handler |

### Business Rules

| ID | Rule | Entities Affected | Validation Point |
|----|------|-------------------|------------------|
| BR-001 | {{business_rule_1}} | {{entities}} | Command Handler |
| BR-002 | {{business_rule_2}} | {{entities}} | Domain Service |
| BR-003 | {{business_rule_3}} | {{entities}} | Repository |

### Constraints

| ID | Constraint | Type | Implementation |
|----|------------|------|----------------|
| CON-001 | {{constraint_1}} | Uniqueness | Database Index |
| CON-002 | {{constraint_2}} | Referential | Foreign Key |
| CON-003 | {{constraint_3}} | Check | Database Constraint |

---

## Multi-Tenant Considerations

### Tenant Scoping Matrix

| Entity | Tenant-Scoped | {{tenant_id_field}} Location | RLS Policy |
|--------|---------------|------------------------------|------------|
| {{entity_1}} | YES | Direct column | tenant_read_policy |
| {{entity_2}} | YES | Direct column | tenant_rw_policy |
| {{entity_3}} | NO (Shared) | N/A | None (control plane) |
| {{entity_4}} | YES | Via parent FK | tenant_inherited_policy |

### Tenant Isolation Strategy

**Model:** {{tenant_model}}

| Aspect | Implementation |
|--------|----------------|
| Data Isolation | {{isolation_implementation}} |
| Query Filtering | {{query_filter_approach}} |
| Write Protection | {{write_protection}} |
| Audit Trail | {{audit_approach}} |

### Cross-Tenant Operations

| Operation | Allowed | Safeguard |
|-----------|---------|-----------|
| Read across tenants | NO | RLS policies |
| Write across tenants | NO | Application + RLS |
| Admin read (control plane) | YES | Elevated context |
| Reporting aggregation | CONDITIONAL | Anonymization required |

### Tenant Context Propagation

```
Request
    │
    ▼
┌─────────────────┐
│  Auth Middleware │──► Extract tenant_id from JWT
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  TenantContext  │──► Create immutable context
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Repository    │──► Set session variable: SET app.tenant_id = ?
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Database     │──► RLS policy uses current_setting('app.tenant_id')
└─────────────────┘
```

---

## Domain Events

### Events Published

| Event | Trigger | Payload Fields |
|-------|---------|----------------|
| {{event_1}} | {{trigger_1}} | {{payload_fields_1}} |
| {{event_2}} | {{trigger_2}} | {{payload_fields_2}} |
| {{event_3}} | {{trigger_3}} | {{payload_fields_3}} |

### Events Consumed

| Event | Source | Handler |
|-------|--------|---------|
| {{event_a}} | {{source_a}} | {{handler_a}} |
| {{event_b}} | {{source_b}} | {{handler_b}} |

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Domain Expert | {{name}} | {{date}} | Pending |
| Architect | {{name}} | {{date}} | Pending |
| Tech Lead | {{name}} | {{date}} | Pending |

---

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "domain data model best practices {date}"
- "DDD aggregate design multi-tenant SaaS patterns {date}"
- "entity relationship modeling enterprise implementation {date}"

Incorporate relevant findings into the document sections above.

---

## Verification Checklist

- [ ] Ubiquitous language glossary is complete with all domain terms
- [ ] All entities include tenant_id column for multi-tenant isolation
- [ ] Aggregates define clear consistency boundaries with invariants
- [ ] Value objects are immutable with proper equality semantics
- [ ] Entity relationships are documented with cardinality and type
- [ ] Cross-aggregate references use ID-only eventual consistency
- [ ] Tenant scoping matrix identifies all tenant-scoped entities
- [ ] TenantContext value object is defined for runtime isolation
- [ ] RLS policies are mapped to each tenant-scoped entity
- [ ] Domain events are documented with triggers and payload fields
- [ ] Business rules are mapped to appropriate enforcement layers
- [ ] Lifecycle state machines are documented for stateful entities

---

## Related Documents

- Master Architecture: `{output_folder}/planning-artifacts/master-architecture.md`
- Database Schema: `{output_folder}/planning-artifacts/database-schema.md`
- Module Architecture: `{output_folder}/planning-artifacts/module-architecture.md`
- Multi-Tenant Patterns: `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: multi-tenant-patterns.md`
- DDD Module Patterns: `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: ddd-module-patterns.md`

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
