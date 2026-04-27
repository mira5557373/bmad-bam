# Step 03: Design Integration Test Strategy

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER design integration tests without Step 01-02 context**
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- ✅ **PRESENT integration test strategy with A/P/C menu** for confirmation
- 📋 **VERIFY cross-module testing patterns** are included
- 🌐 **USE web search** to verify current integration testing best practices

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Design cross-module integration testing with real dependencies
- 💾 Track: `stepsCompleted: [1, 2, 3]` when complete
- 📖 Context: Reference unit test boundaries from Step 02
- 🚫 Do NOT: Include e2e test details (that is Step 04)
- 🔍 Use web search: Verify integration testing patterns for tenant isolation
- ⚠️ Gate: QG-TC2 (Integration Test Coverage) governs this design

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** Unit test strategy from Step 02 (boundaries, mocking patterns)
- **Pattern registry:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `testing-integration`
- **Output:** Integration test strategy with tenant-aware fixtures
- **Quality gate:** QG-TC2 (Integration Test Coverage)

---

## YOUR TASK

Design the integration test strategy covering cross-module testing, test database setup with tenant fixtures, contract testing for facades, and event flow testing. Present the complete strategy via A/P/C menu for user confirmation.

---

## Main Sequence

### 1. Define Integration Test Scope

Establish integration boundaries for multi-tenant context:

| Integration Type | Components Involved | Tenant Context |
|------------------|--------------------| ---------------|
| **Module-to-Module** | Two or more modules via facade | Real TenantContext |
| **Service-to-Database** | Service + actual DB with RLS | Real tenant_id in context |
| **API-to-Service** | HTTP endpoint to service layer | JWT with tenant claims |
| **Event-to-Handler** | Event publish to handler execution | Tenant in event payload |
| **Cache-to-Service** | Service with real cache layer | Tenant-prefixed keys |

### 2. Design Test Database Setup

Define database configuration for integration tests:

**Database Strategy by Tenant Model:**

| Tenant Model | Test DB Setup | Isolation Method |
|--------------|---------------|------------------|
| **RLS** | Shared test DB, RLS policies enabled | `SET app.current_tenant = 'test-tenant'` |
| **Schema** | Test schemas per tenant fixture | `CREATE SCHEMA test_tenant_001` |
| **Database** | Separate test databases | `test_db_tenant_001` |
| **Hybrid** | Tier-based: RLS for free, schema for enterprise | Mixed approach |

**Tenant Fixtures:**

| Fixture | Purpose | Data |
|---------|---------|------|
| `tenant_alpha` | Primary test tenant | Complete data set |
| `tenant_beta` | Secondary tenant for isolation tests | Minimal data |
| `tenant_gamma` | Enterprise tier tenant | Enterprise features |
| `tenant_orphan` | Tenant with no data | Edge case testing |

**Fixture Lifecycle:**

```
Before Test Suite:
  1. Create test database/schema
  2. Run migrations
  3. Seed tenant fixtures
  4. Verify RLS policies active

After Each Test:
  1. Rollback transaction (preferred) OR
  2. Truncate tenant-scoped data

After Test Suite:
  1. Drop test database/schema
  2. Clean up connections
```

### 3. Design Contract Testing for Facades

Define contract testing between modules:

| Contract Type | Test Approach | Verification |
|---------------|---------------|--------------|
| **Facade Interface** | Provider contract test | Facade returns expected types |
| **Event Schema** | Event contract test | Events match schema |
| **API Response** | Consumer contract test | Consumers can parse responses |
| **Error Handling** | Error contract test | Errors follow standard format |

**Contract Test Matrix:**

| Provider Module | Consumer Module | Contract | Test Type |
|-----------------|-----------------|----------|-----------|
| Billing | Tenant | `get_tenant_usage()` | Provider |
| Identity | All modules | `get_tenant_context()` | Provider |
| Events | Subscribers | `TenantEvent` schema | Schema |
| API Gateway | Clients | OpenAPI spec | Consumer |

**Tenant Context in Contract Tests:**

- Provider tests: Verify tenant-scoped responses
- Consumer tests: Verify tenant claims propagated
- Schema tests: Verify `tenant_id` in event payloads

### 4. Design Event Flow Testing

Define event-driven integration tests:

| Event Flow | Test Scenario | Tenant Verification |
|------------|---------------|---------------------|
| **Sync Event** | Event published, handler executes | Handler receives correct tenant_id |
| **Async Event** | Event queued, consumer processes | Consumer has tenant context |
| **Cross-Module Event** | Module A emits, Module B handles | Tenant context preserved |
| **Saga/Workflow** | Multi-step workflow | Tenant context across all steps |

**Event Test Patterns:**

| Pattern | Description | Use When |
|---------|-------------|----------|
| **In-Process** | Sync event bus, same process | Fast feedback, simple flows |
| **Testcontainers** | Real message broker in container | Async flows, production parity |
| **Mock Transport** | Mocked message transport | Unit-integration boundary |
| **Recorded Replay** | Record events, replay for testing | Regression testing |

### 5. Define Coverage Thresholds (QG-TC2)

Establish integration test coverage requirements:

| Integration Type | Coverage Target | Critical Paths |
|------------------|-----------------|----------------|
| **Module Facades** | 100% of public facades | All cross-module calls |
| **Database Operations** | 90% of CRUD operations | Tenant-scoped queries |
| **Event Handlers** | 90% of handlers | All tenant events |
| **API Endpoints** | 80% of endpoints | All tenant-aware endpoints |
| **Error Paths** | 70% of error scenarios | Tenant validation errors |

**QG-TC2 Pass Criteria:**

- [ ] **CRITICAL:** All module facades have integration tests
- [ ] **CRITICAL:** Tenant isolation verified in database tests
- [ ] **CRITICAL:** Event tenant context preserved in flow tests
- [ ] Contract tests pass for all facades
- [ ] ≥80% of integration paths covered
- [ ] No cross-tenant data leakage in tests

### 6. Web Research Verification

**Verify current best practices with web search:**

Search the web: "integration testing multi-tenant database {date}"
Search the web: "testcontainers PostgreSQL RLS testing {date}"
Search the web: "contract testing multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

After presenting integration test strategy:

```
================================================================================
INTEGRATION TEST STRATEGY SUMMARY
================================================================================
Scope: Cross-module testing with real dependencies
Database: {tenant_model} with tenant fixtures
Contract Testing: Facade contracts with tenant context
Event Testing: Flow testing with tenant preservation
Coverage Target: 100% facades, 90% DB ops, 80% endpoints
QG-TC2: Integration test coverage gate
================================================================================

Your options:
- **A (Advanced Elicitation)**: Deep dive into specific integration concerns
- **P (Party Mode)**: Bring QA, DevOps, and architect perspectives
- **C (Continue)**: Accept strategy and proceed to e2e tests

Select an option:
```

### If 'A' (Advanced Elicitation):

Invoke `bmad-advanced-elicitation` skill to explore:

- **Test data management:** How to manage tenant fixtures across tests?
- **Database isolation:** How to prevent test pollution across tenants?
- **CI/CD performance:** How to keep integration tests fast in pipeline?
- **Flaky tests:** What causes flakiness in multi-tenant integration tests?
- **Contract evolution:** How to handle facade contract changes?

Pass context: Step 02 unit test boundaries, current integration strategy, concerns.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode):

Invoke `bmad-party-mode` skill with context:

```
Review integration test strategy for multi-tenant SaaS with {tenant_model}
targeting {module_count} modules and {facade_count} facades
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| QA Engineer | Test coverage | Are integration boundaries clear and testable? |
| DevOps | CI/CD | Will database setup work in CI environment? |
| Architect | Module design | Do facades enable effective contract testing? |
| DBA | Data management | Is tenant fixture strategy sustainable? |

Process multi-perspective analysis and synthesize into refined recommendations.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue):

1. Record the integration test strategy in working document:

```yaml
# Add to testing-strategy-draft.md
integration_testing:
  scope: cross-module
  database_strategy: {tenant_model_approach}
  tenant_fixtures: [alpha, beta, gamma, orphan]
  contract_testing: facade_contracts
  event_testing: flow_with_tenant_context
  coverage_targets:
    facades: 100
    db_ops: 90
    endpoints: 80
  qg_tc2_criteria: defined
analysis_completed_at: {timestamp}
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze
  - step-03-c-design  # Add this
currentStep: step-04-c-document
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ Integration test scope defined for all integration types
- ✅ Test database setup documented for tenant model
- ✅ Tenant fixtures defined with lifecycle
- ✅ Contract testing strategy for facades specified
- ✅ Event flow testing patterns documented
- ✅ Coverage thresholds established (QG-TC2)
- ✅ Web search performed for current patterns
- ✅ User confirmed strategy via A/P/C menu

---

## FAILURE MODES

- ❌ **No database strategy:** Cannot test tenant isolation at integration level
- ❌ **Missing fixtures:** No tenant context for cross-module tests
- ❌ **Ignoring contracts:** Facade changes will break consumers silently
- ❌ **No event testing:** Tenant context loss in async flows undetected
- ❌ **Slow tests:** Integration tests must complete in reasonable time for CI

---

## NEXT STEP

After user confirms integration test strategy with 'C':

1. Record the integration test strategy in working document
2. Proceed to `step-04-c-document.md` to design e2e and tenant isolation tests
3. The integration test strategy informs:
   - E2E test scope (what is already covered by integration)
   - Tenant isolation verification approach
   - QG-TC2 checklist items

**Transition to Step 04 with:**
- Integration scope: `{cross_module_paths}`
- Database fixtures: `{tenant_fixtures}`
- Contract approach: `{facade_contracts}`

---

## Outputs

- Design decisions recorded
- Architecture patterns selected
- Implementation approach defined

