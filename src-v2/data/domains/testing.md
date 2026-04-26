# Testing - BAM Domain Context

**Loaded by:** ZTT, ZTE  
**Related Workflows:** bmad-bam-tenant-testing, bmad-bam-integration-testing

---

## Overview

Testing multi-tenant systems requires isolation verification and cross-tenant boundary testing.

## Core Concepts

### Test Pyramid + Tenant

```
        ┌───────┐
        │  E2E  │ ← Multi-tenant scenarios
       ┌┴───────┴┐
       │Integration│ ← Cross-tenant isolation
      ┌┴──────────┴┐
      │    Unit    │ ← Tenant context mocking
      └────────────┘
```

### Tenant Test Categories

| Category | Focus | Isolation Check |
|----------|-------|-----------------|
| Unit | Business logic | Mock tenant context |
| Integration | Module boundaries | Real tenant isolation |
| E2E | User journeys | Multi-tenant scenarios |
| Chaos | Failure modes | Cross-tenant blast radius |

### Test Data Strategy

| Environment | Tenant Data | Strategy |
|-------------|-------------|----------|
| Unit | Mocked | Factories |
| Integration | Seeded | Fixtures |
| Staging | Synthetic | Generated |
| Production | Real | Anonymized samples |

## Decision Matrix

| Test Type | Tenant Isolation Check | Automation |
|-----------|------------------------|------------|
| Unit | Mock validation | CI on every commit |
| Integration | RLS verification | CI on PR |
| E2E | Cross-tenant attempt | Nightly |
| Security | Penetration | Quarterly |

## Quality Checks

- [ ] Tenant isolation tests in CI pipeline
- [ ] Cross-tenant access attempts tested
- [ ] Performance tests per tenant tier
- [ ] **CRITICAL:** No test data leakage to production

## Web Research Queries

- "multi-tenant testing patterns {date}"
- "tenant isolation testing automation {date}"
