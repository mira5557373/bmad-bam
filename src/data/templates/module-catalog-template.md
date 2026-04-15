---
name: module-catalog-template
description: Template for documenting module catalog for modular monolith multi-tenant platforms
category: platform-architecture
version: "1.0.0"
---

# Module Catalog Template

## Document Information

| Field | Value |
|-------|-------|
| **Project** | {{project_name}} |
| **Catalog Version** | {{version}} |
| **Last Updated** | {{date}} |
| **Author** | {{author}} |
| **Status** | Draft |

## Purpose

This template documents the module catalog for a modular monolith multi-tenant platform, tracking all bounded contexts, their dependencies, ownership, and deployment characteristics.

## Module Inventory

### Core Modules

| Module ID | Name | Domain | Owner | Status |
|-----------|------|--------|-------|--------|
| M-001 | {{module_1}} | {{domain_1}} | {{team_1}} | {{status_1}} |
| M-002 | {{module_2}} | {{domain_2}} | {{team_2}} | {{status_2}} |
| M-003 | {{module_3}} | {{domain_3}} | {{team_3}} | {{status_3}} |

### Module Classification

| Module | Complexity | Tenant Awareness | AI Enabled |
|--------|------------|------------------|------------|
| {{module_1}} | {{low|medium|high}} | {{full|partial|none}} | {{yes|no}} |
| {{module_2}} | {{low|medium|high}} | {{full|partial|none}} | {{yes|no}} |

## Module Details

### {{Module Name}}

| Attribute | Value |
|-----------|-------|
| **Module ID** | {{module_id}} |
| **Bounded Context** | {{bounded_context}} |
| **Domain** | {{domain}} |
| **Owner Team** | {{team}} |
| **Tech Lead** | {{tech_lead}} |

#### Responsibilities

- {{responsibility_1}}
- {{responsibility_2}}
- {{responsibility_3}}

#### Public APIs

| API | Type | Version | Documentation |
|-----|------|---------|---------------|
| {{api_1}} | REST | v1 | {{docs_url_1}} |
| {{api_2}} | gRPC | v1 | {{docs_url_2}} |
| {{api_3}} | Event | v1 | {{docs_url_3}} |

#### Dependencies

| Depends On | Type | Contract |
|------------|------|----------|
| {{dep_1}} | Sync | {{contract_url_1}} |
| {{dep_2}} | Async | {{contract_url_2}} |

#### Depended By

| Consumed By | Type | Contract |
|-------------|------|----------|
| {{consumer_1}} | Sync | {{contract_url_1}} |
| {{consumer_2}} | Async | {{contract_url_2}} |

## Dependency Graph

```
                    ┌─────────────┐
                    │   Gateway   │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
    ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
    │   Module A  │ │   Module B  │ │   Module C  │
    └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
           │               │               │
           └───────────────┼───────────────┘
                           │
                    ┌──────▼──────┐
                    │   Shared    │
                    │   Kernel    │
                    └─────────────┘
```

## Module Boundaries

### Communication Patterns

| Pattern | Modules | Use Case |
|---------|---------|----------|
| Sync REST | {{module_a}} → {{module_b}} | {{use_case_1}} |
| Async Event | {{module_a}} → {{module_c}} | {{use_case_2}} |
| Shared DB | {{modules}} | {{use_case_3}} |

### Anti-Corruption Layers

| Module | ACL Type | Translates From |
|--------|----------|-----------------|
| {{module}} | Adapter | {{external_system}} |

## Tenant Context

### Tenant-Aware Modules

| Module | Isolation Model | RLS Enabled | Schema |
|--------|-----------------|-------------|--------|
| {{module_1}} | {{model_1}} | Yes | {{schema_1}} |
| {{module_2}} | {{model_2}} | Yes | {{schema_2}} |

### Cross-Tenant Modules

| Module | Data Scope | Access Control |
|--------|------------|----------------|
| {{module}} | Platform-wide | Admin only |

## Deployment Configuration

### Module Sizing

| Module | CPU Request | Memory Request | Replicas |
|--------|-------------|----------------|----------|
| {{module_1}} | {{cpu_1}} | {{memory_1}} | {{replicas_1}} |
| {{module_2}} | {{cpu_2}} | {{memory_2}} | {{replicas_2}} |

### Scaling Policies

| Module | Metric | Target | Min | Max |
|--------|--------|--------|-----|-----|
| {{module}} | CPU | 70% | 2 | 10 |
| {{module}} | Custom | {{target}} | {{min}} | {{max}} |

## Module Lifecycle

### Status Definitions

| Status | Description |
|--------|-------------|
| Draft | Design in progress |
| Active | In production |
| Deprecated | Scheduled for removal |
| Archived | No longer maintained |

### Versioning Strategy

| Module | Version | Breaking Changes | Deprecation Date |
|--------|---------|------------------|------------------|
| {{module}} | {{version}} | {{changes}} | {{date}} |

## Verification Checklist

- [ ] All modules have unique IDs
- [ ] Ownership assigned to each module
- [ ] Dependencies documented
- [ ] Public APIs defined
- [ ] Tenant awareness specified
- [ ] Deployment config complete
- [ ] No circular dependencies
- [ ] Shared kernel boundaries clear

## Web Research Queries

- Search: "modular monolith module catalog patterns {date}"
- Search: "bounded context documentation {date}"
- Search: "module dependency management {date}"

## Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | {{date}} | Initial template | Platform Team |
