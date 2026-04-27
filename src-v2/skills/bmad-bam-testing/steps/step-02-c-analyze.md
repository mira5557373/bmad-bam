# Step 02: Design Unit Test Strategy

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER design unit tests without loading Step 01 context first**
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- ✅ **PRESENT unit test strategy with A/P/C menu** for user confirmation
- 📋 **VERIFY TenantContext mocking patterns** are included
- 🌐 **USE web search** to verify current unit testing best practices

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Design module-level unit testing with TenantContext mocking
- 💾 Track: `stepsCompleted: [1, 2]` when complete
- 📖 Context: Reference Step 01 tenant model and testing scope
- 🚫 Do NOT: Include integration or e2e test details (those are later steps)
- 🔍 Use web search: Verify unit testing patterns for selected tenant model
- ⚠️ Gate: QG-TC1 (Unit Test Coverage) governs this design

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** Testing scope from Step 01 (tenant model, modules, TEA status)
- **Pattern registry:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `testing-unit`
- **Output:** Unit test strategy with TenantContext mocking patterns
- **Quality gate:** QG-TC1 (Unit Test Coverage ≥80%)

---

## YOUR TASK

Design the unit test strategy covering module-level testing, TenantContext mocking, dependency isolation patterns, and coverage thresholds. Present the complete strategy via A/P/C menu for user confirmation.

---

## Main Sequence

### 1. Define Unit Test Scope

Establish what constitutes a "unit" in the multi-tenant context:

| Unit Type | Scope | Tenant Context |
|-----------|-------|----------------|
| **Domain Logic** | Business rules within a module | Mocked TenantContext |
| **Services** | Application services | Mocked repositories, TenantContext |
| **Repositories** | Data access layer | Mocked DB, injected tenant_id |
| **Handlers** | Event/message handlers | Mocked dependencies, tenant claims |
| **Utilities** | Helper functions | Tenant-agnostic or mocked |

### 2. Design TenantContext Mocking Strategy

Define how TenantContext is mocked across unit tests:

**Mocking Patterns:**

| Pattern | Use Case | Implementation |
|---------|----------|----------------|
| **Factory Pattern** | Create test tenants with specific attributes | `TenantContextFactory.create(tier='pro', org_id='test-org')` |
| **Fixture Pattern** | Reusable tenant contexts | `@pytest.fixture def tenant_context()` |
| **Builder Pattern** | Complex tenant configuration | `TenantContextBuilder().with_tier('enterprise').with_features(['sso']).build()` |
| **Mock Pattern** | Dependency injection | `mock.patch('app.context.get_tenant_context')` |

**TenantContext Attributes to Mock:**

| Attribute | Test Values | Purpose |
|-----------|-------------|---------|
| `tenant_id` | `test-tenant-001`, `test-tenant-002` | Isolation verification |
| `tier` | `free`, `pro`, `enterprise` | Feature gating tests |
| `org_id` | `test-org-001` | Organization-level isolation |
| `user_id` | `test-user-001` | User-level attribution |
| `permissions` | `['read', 'write', 'admin']` | RBAC testing |
| `feature_flags` | `{'sso': True, 'api_v2': False}` | Feature toggle tests |

### 3. Design Dependency Isolation Patterns

Define how dependencies are isolated in unit tests:

| Dependency Type | Isolation Strategy | Example |
|-----------------|--------------------| --------|
| **Database** | In-memory/mock repository | `InMemoryTenantRepository` |
| **External APIs** | Mock HTTP client | `httpx.MockTransport` |
| **Message Queues** | In-memory queue | `InMemoryEventBus` |
| **Cache** | In-memory cache | `InMemoryTenantCache` |
| **AI Runtime** | Mocked LLM responses | `MockLLMClient` |
| **File Storage** | In-memory filesystem | `InMemoryStorageBackend` |

**Isolation Principles:**

- Unit tests MUST NOT hit external services
- Unit tests MUST NOT share state between tests
- Unit tests MUST be deterministic (no random, no real time)
- Unit tests MUST complete in <100ms each

### 4. Define Coverage Thresholds (QG-TC1)

Establish coverage requirements per module type:

| Module Type | Line Coverage | Branch Coverage | Mutation Score |
|-------------|---------------|-----------------|----------------|
| **Domain Logic** | ≥90% | ≥85% | ≥80% |
| **Services** | ≥85% | ≥80% | ≥75% |
| **Repositories** | ≥80% | ≥75% | ≥70% |
| **Handlers** | ≥85% | ≥80% | ≥75% |
| **Utilities** | ≥90% | ≥85% | ≥80% |
| **Overall** | ≥80% | ≥75% | ≥70% |

**QG-TC1 Pass Criteria:**

- [ ] **CRITICAL:** Overall line coverage ≥80%
- [ ] **CRITICAL:** All domain logic modules ≥90%
- [ ] Branch coverage ≥75%
- [ ] No module below 70% coverage
- [ ] Mutation testing enabled (mutation score ≥70%)

### 5. Web Research Verification

**Verify current best practices with web search:**

Search the web: "Python unit testing best practices {date}"
Search the web: "TenantContext mocking patterns multi-tenant {date}"
Search the web: "pytest fixtures multi-tenant testing {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

After presenting unit test strategy:

```
================================================================================
UNIT TEST STRATEGY SUMMARY
================================================================================
Scope: Module-level testing with mocked dependencies
TenantContext Mocking: Factory + Fixture patterns
Dependency Isolation: In-memory implementations
Coverage Target: ≥80% line, ≥75% branch, ≥70% mutation
QG-TC1: Unit test coverage gate
================================================================================

Your options:
- **A (Advanced Elicitation)**: Deep dive into specific testing concerns
- **P (Party Mode)**: Bring QA, security, and developer perspectives
- **C (Continue)**: Accept strategy and proceed to integration tests

Select an option:
```

### If 'A' (Advanced Elicitation):

Invoke `bmad-advanced-elicitation` skill to explore:

- **Edge cases:** What tenant scenarios need special test coverage?
- **Flaky tests:** How to ensure deterministic tenant context in tests?
- **Performance:** How to keep unit tests fast with complex tenant logic?
- **Coverage gaps:** Which areas are hardest to unit test?
- **Mocking complexity:** When is mocking too complex vs integration test?

Pass context: Step 01 tenant model, current unit test strategy, specific concerns.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode):

Invoke `bmad-party-mode` skill with context:

```
Review unit test strategy for multi-tenant SaaS with {tenant_model} isolation
and {module_count} modules
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| QA Engineer | Test coverage | Are coverage thresholds achievable and meaningful? |
| Security | Isolation testing | Are tenant boundary tests adequate at unit level? |
| Developer | DX | Is the mocking strategy maintainable? |
| DevOps | CI/CD | Will unit tests run fast enough in CI? |

Process multi-perspective analysis and synthesize into refined recommendations.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue):

1. Record the unit test strategy in working document:

```yaml
# Add to testing-strategy-draft.md
unit_testing:
  scope: module-level
  mocking_pattern: factory
  isolation_strategy: in-memory
  coverage_targets:
    line: 80
    branch: 75
    mutation: 70
  qg_tc1_criteria: defined
analysis_completed_at: {timestamp}
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze  # Add this
currentStep: step-03-c-design
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ Unit test scope defined for all module types
- ✅ TenantContext mocking strategy documented
- ✅ Dependency isolation patterns specified
- ✅ Coverage thresholds established (QG-TC1)
- ✅ Web search performed for current patterns
- ✅ User confirmed strategy via A/P/C menu

---

## FAILURE MODES

- ❌ **Skipping TenantContext mocking:** Cannot test tenant isolation at unit level
- ❌ **Coverage too low:** QG-TC1 will fail
- ❌ **Coverage too high:** Unrealistic targets cause team frustration
- ❌ **No isolation strategy:** Unit tests become integration tests
- ❌ **Proceeding without A/P/C confirmation:** User not engaged in decisions

---

## NEXT STEP

After user confirms unit test strategy with 'C':

1. Record the unit test strategy in working document
2. Proceed to `step-03-c-design.md` to design integration tests
3. The unit test strategy informs:
   - Integration test boundaries (where unit ends, integration begins)
   - Shared test utilities (TenantContext factories)
   - QG-TC1 checklist items

**Transition to Step 03 with:**
- Unit test scope: `{module_types_covered}`
- Mocking strategy: `{factory/fixture/builder}`
- Coverage targets: `{line/branch/mutation}`

---

## Outputs

- Analysis findings documented
- Options comparison completed
- Recommendation prepared

