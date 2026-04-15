---
name: sidecar-contract-history
description: Persistent memory for facade contracts and integration decisions
category: integration
version: 1.0.0
type: template
---

# BAM Contract History Sidecar

## Purpose

Use this sidecar template to persist facade contract history and cross-module integration decisions. The BAM-extended architect loads this when working on integration tasks to track published contracts, version evolution, and dependency changes.

This file tracks facade contract decisions made during this project.
Winston (Architect) with BAM extension loads this when working on integration tasks.

**Persisted at:** `{project-root}/_bmad/_memory/bam-architect-sidecar/contract-history.md`

---

## Published Contracts Index

| Contract | Provider Module | Consumer(s) | Version | Methods | Tests | Status |
|----------|-----------------|-------------|---------|---------|-------|--------|
| AuthFacade | auth | billing, ai | v1.0.0 | 5 | ✅ | Active |
| - | - | - | - | - | - | - |

## Contract Evolution History

| Contract | Change Type | From | To | Date | Migration Guide |
|----------|-------------|------|-----|------|-----------------|
| - | additive/breaking | v1.0 | v1.1 | - | link |

## Dependency Matrix

| Module | Depends On | Type | Circular? | Notes |
|--------|------------|------|-----------|-------|
| - | - | facade/event | no | - |

## Circular Dependency Resolution Log

| Detected | Modules | Resolution | Status |
|----------|---------|------------|--------|
| - | A → B → A | Introduced event | Resolved |

## Cross-Module Stories

| Story ID | Title | Modules Involved | Decomposition | Status |
|----------|-------|------------------|---------------|--------|
| - | - | - | Tasks assigned | - |

## Event Contracts

| Event | Publisher | Subscribers | Schema Version | Status |
|-------|-----------|-------------|----------------|--------|
| tenant.created | platform | billing, notifications | v1 | Active |
| - | - | - | - | - |

## Convergence Verification Log

| Milestone | Date | Verified By | Status | Issues Found |
|-----------|------|-------------|--------|--------------|
| Sprint 1 | - | - | ✅/❌ | None / List |

## Breaking Changes Pending

| Contract | Change | Current | Target | Consumers to Migrate | ETA |
|----------|--------|---------|--------|---------------------|-----|
| - | - | v1.x | v2.0 | list | - |

## QG-I1 (Facade Compatibility) Checklist

- [ ] All contracts versioned with semver
- [ ] No circular dependencies detected
- [ ] All facade methods accept TenantContext
- [ ] All facade methods return DTOs (no entities)
- [ ] Contract tests exist for all facades
- [ ] Breaking changes have migration guides
- [ ] Cross-module stories decomposed to module tasks
- [ ] QG-I1 checklist passed

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "facade contract versioning best practices {date}"
- "API contract evolution multi-tenant SaaS {date}"
- "module integration patterns modular monolith {date}"
- "dependency management microservices {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

- [ ] All published contracts indexed with current version
- [ ] Contract evolution history complete and accurate
- [ ] All provider and consumer modules identified
- [ ] Dependency matrix shows no circular dependencies
- [ ] Circular dependency resolutions documented if any existed
- [ ] Cross-module stories tracked with decomposition status
- [ ] Event contracts documented with schema versions
- [ ] Convergence verification log up to date
- [ ] Breaking changes have documented migration paths
- [ ] Multi-tenant context (TenantContext) required in all facades
- [ ] Contract tests exist and pass for all facades
- [ ] Sidecar reflects latest session decisions

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |

---

*Last updated: {{date}}*
