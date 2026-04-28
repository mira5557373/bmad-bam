---
name: qg-s2-module-implementation-readiness
description: Module Implementation Readiness - validates module ready for sprint
module: bam
tags: [quality-gate, module, sprint, stories]
version: 2.0.0
---

# QG-S2: Module Implementation Readiness Checklist

> **Gate ID:** QG-S2 (Module Implementation Readiness)
> **Definition:** Validates module is ready for implementation sprint.
> **Scope:** Stories defined, acceptance criteria clear, test plan ready.
> **Recovery:** Run create-module-epics workflow.

**Workflow:** bmad-bam-create-module-epics, bmad-bam-validate-module
**Prerequisites:** QG-S1

---

## Purpose

Validates that a module has complete stories with acceptance criteria before sprint begins.

---

## Stories & Acceptance Criteria

- [ ] **CRITICAL:** All stories have acceptance criteria defined
- [ ] **CRITICAL:** Story estimates provided (story points or t-shirt)
- [ ] Stories mapped to module boundaries
- [ ] Dependencies between stories documented
- [ ] Technical debt stories included if applicable

---

## Test Plan

- [ ] **CRITICAL:** Test plan exists for module
- [ ] Unit test coverage targets defined
- [ ] Integration test scenarios documented
- [ ] Tenant isolation test cases included

---

## Sprint Readiness

- [ ] Sprint backlog prioritized
- [ ] Team capacity confirmed
- [ ] Dependencies with other modules identified
- [ ] Definition of Done agreed

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL pass, stories ready for sprint |
| **CONDITIONAL** | All CRITICAL pass, minor gaps with mitigation |
| **FAIL** | Any CRITICAL fails |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-28 | BAM V2 | Initial V2 checklist |
