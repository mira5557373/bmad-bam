# Integration - BAM Domain Context

**Loaded by:** ZIF, ZIC  
**Related Workflows:** bmad-bam-define-facade-contract, bmad-bam-convergence-verification

---

## Overview

Integration patterns define how modules communicate across boundaries while maintaining tenant isolation and system coherence.

## Core Concepts

### Facade Contract Pattern

```
Module A                    Module B
    │                           │
    └──► Facade Interface ◄─────┘
              │
         Contract defines:
         - Input/Output types
         - Tenant context requirements
         - Error contracts
```

### Integration Boundaries

| Boundary | Contract Type | Tenant Context |
|----------|---------------|----------------|
| Module-to-Module | Facade | Propagated |
| Service-to-Service | API | Header |
| External | Gateway | Mapped |

### Convergence Verification

| Check | Description |
|-------|-------------|
| Type Match | Input/output types align |
| Tenant Safety | No cross-tenant leaks |
| Error Handling | Failures don't expose data |

## Decision Matrix

| Integration Type | Pattern | Tenant Handling |
|------------------|---------|-----------------|
| Synchronous | Facade call | Context propagation |
| Asynchronous | Event | Envelope tenant_id |
| External API | Gateway | Tenant mapping |
| Legacy system | Adapter | Context injection |

## Quality Checks

- [ ] Facade contracts defined for all module boundaries
- [ ] Integration tests cover cross-module flows
- [ ] **CRITICAL:** Tenant context propagates across all integrations

## Web Research Queries

- "facade pattern multi-tenant {date}"
- "module integration patterns SaaS {date}"
