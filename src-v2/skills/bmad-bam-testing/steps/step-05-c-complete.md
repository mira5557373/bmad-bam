# Step 05: Compile Testing Strategy Document

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER compile document without Steps 01-04 complete**
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting document outline** and await user direction
- 🎯 **Focus ONLY on current step scope** - compile, do not redesign
- ✅ **PRESENT final document with A/P/C menu** for approval
- 📋 **INCLUDE all QG-TC1/TC2/TC3 and QG-I2 criteria** in document
- 🌐 **USE web search** for any final verification of testing tools/frameworks

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Compile all testing strategies into single document
- 💾 Track: `stepsCompleted: [1, 2, 3, 4, 5]` when complete
- 📖 Context: Consolidate all Step 01-04 outputs
- 🚫 Do NOT: Redesign strategies; this step compiles only
- 🔍 Use web search: Verify CI/CD integration patterns
- ⚠️ Gate: QG-TC1/TC2/TC3 + QG-I2 - Testing gates summarized in document

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** All testing strategies from Steps 01-04
- **Template:** `{project-root}/_bmad/bam/data/templates/testing-strategy-template.md`
- **Output:** `{output_folder}/planning-artifacts/testing-strategy.md`
- **Quality gates:** QG-TC1, QG-TC2, QG-TC3, QG-I2 - all documented

---

## YOUR TASK

Compile the complete testing strategy document from all previous steps, including executive summary, test pyramid with tenant-aware layers, CI/CD integration guidance, and TEA handoff points. Present the final document via A/P/C menu for approval before writing to output folder.

---

## Main Sequence

### 1. Load Testing Strategy Template

**Read template:**

```
{project-root}/_bmad/bam/data/templates/testing-strategy-template.md
```

Prepare document structure based on template.

### 2. Compile Executive Summary

**Summarize the testing strategy:**

```markdown
## Executive Summary

This testing strategy defines a comprehensive, tenant-aware approach for 
testing the {project_name} multi-tenant SaaS platform.

### Key Highlights

| Aspect | Decision |
|--------|----------|
| Tenant Model | {tenant_model} |
| Test Pyramid | Unit → Integration → E2E with tenant isolation |
| Critical Gates | QG-TC1 (Unit), QG-TC2 (Integration), QG-TC3 (E2E), QG-I2 (Isolation) |
| TEA Integration | {enabled/disabled} |

### Testing Scope Summary

| Test Type | Coverage Target | Tenant Focus |
|-----------|-----------------|--------------|
| Unit Tests | ≥80% line coverage | TenantContext mocking |
| Integration Tests | 100% facades, 90% DB ops | Real tenant fixtures |
| E2E Tests | 80% critical journeys | Multi-tenant scenarios |
| Isolation Tests | 100% cross-tenant scenarios | CRITICAL - no leakage |
| Performance Tests | Per-tenant SLA verification | Noisy neighbor detection |
| Security Tests | OWASP Top 10 tenant-aware | Cross-tenant attacks blocked |
```

### 3. Compile Test Pyramid with Tenant-Aware Layers

**Document the test pyramid:**

```markdown
## Test Pyramid

```
          /\
         /  \
        / E2E\           ← User journeys, multi-tenant isolation
       /------\
      /  Int   \         ← Cross-module, facades, events
     /----------\
    /    Unit    \       ← Module logic, TenantContext mocked
   /--------------\
  /   Isolation    \     ← Cross-tenant access blocked (CRITICAL)
 /------------------\
```

### Layer 1: Unit Tests (Foundation)

| Attribute | Value |
|-----------|-------|
| Scope | Module-level with mocked dependencies |
| Tenant Context | `TenantContextFactory` mocking |
| Isolation | In-memory implementations |
| Coverage | ≥80% line, ≥75% branch |
| Speed | <100ms per test |
| Gate | QG-TC1 |

### Layer 2: Integration Tests

| Attribute | Value |
|-----------|-------|
| Scope | Cross-module with real dependencies |
| Tenant Context | Real fixtures (alpha, beta, gamma) |
| Database | {tenant_model} with RLS/schema |
| Coverage | 100% facades, 90% DB operations |
| Gate | QG-TC2 |

### Layer 3: E2E Tests (Apex)

| Attribute | Value |
|-----------|-------|
| Scope | Critical user journeys |
| Tenant Context | Full authentication flow |
| Environment | Staging with tenant data |
| Coverage | ≥80% critical journeys |
| Gate | QG-TC3 |

### Cross-Cutting: Isolation Tests (CRITICAL)

| Attribute | Value |
|-----------|-------|
| Scope | Cross-tenant access attempts |
| Test Scenarios | 6 isolation scenarios |
| Expected Result | 100% blocked/denied |
| Gate | QG-I2 (CRITICAL) |
```

### 4. Compile CI/CD Integration Guidance

**Document CI/CD pipeline integration:**

```markdown
## CI/CD Integration

### Pipeline Stages

| Stage | Tests Run | Tenant Config | Duration |
|-------|-----------|---------------|----------|
| **Pre-commit** | Unit tests (affected modules) | Mocked | <2 min |
| **PR Build** | Unit + Integration (affected) | Fixtures | <10 min |
| **Main Build** | Full unit + integration | Full fixtures | <20 min |
| **Nightly** | E2E + Isolation + Performance | Staging | <2 hours |
| **Release** | Full suite + Security | Production-like | <4 hours |

### Test Database Management

| Stage | Database Strategy | Tenant Fixtures |
|-------|-------------------|-----------------|
| Unit | None (mocked) | Factory-generated |
| Integration | Ephemeral {tenant_model} DB | Seeded fixtures |
| E2E | Staging environment | Persistent fixtures |
| Performance | Load test environment | Scaled fixtures |

### Parallelization Strategy

| Test Type | Parallelization | Tenant Isolation |
|-----------|-----------------|------------------|
| Unit | Per-file parallel | N/A (mocked) |
| Integration | Per-module parallel | Separate schemas/DBs |
| E2E | Per-journey parallel | Separate tenants |
| Isolation | Sequential | Test tenants A, B, C |

### Failure Handling

| Failure Type | Action |
|--------------|--------|
| Unit test failure | Block PR merge |
| Integration failure | Block PR merge |
| E2E failure | Block release, alert QA |
| Isolation failure | **CRITICAL** - Block all, alert security |
| Performance regression | Alert, non-blocking |
```

### 5. Compile TEA Handoff Points

**Document TEA (Test Engineering Agent) integration:**

```markdown
## TEA Integration

### Handoff Points

| BAM Workflow | TEA Handoff | TEA Responsibility |
|--------------|-------------|-------------------|
| Testing Strategy | `tea-verify-strategy` | Validate coverage targets |
| QG-TC1 Check | `tea-unit-coverage` | Verify unit test coverage |
| QG-TC2 Check | `tea-integration-coverage` | Verify integration coverage |
| QG-TC3 Check | `tea-e2e-coverage` | Verify e2e coverage |
| QG-I2 Check | `tea-isolation-verify` | Execute isolation test suite |

### TEA-Owned Quality Gates

| Gate | TEA Workflow | Pass Criteria |
|------|--------------|---------------|
| QG-TC1 | `tea-trace` | Unit coverage ≥80%, mutation ≥70% |
| QG-TC2 | `tea-trace` | Integration coverage meets targets |
| QG-TC3 | `tea-trace` | E2E critical journeys pass |
| QG-I2 | `tea-isolation` | Zero cross-tenant access allowed |

### Handoff Protocol

1. BAM completes testing strategy document
2. TEA `tea-verify-strategy` validates completeness
3. Development implements tests per strategy
4. TEA `tea-trace` verifies coverage gates
5. TEA `tea-isolation` runs formal isolation verification
6. TEA signs off on QG-TC1, QG-TC2, QG-TC3, QG-I2
```

### 6. Compile Quality Gate Summary

**Document all quality gates:**

```markdown
## Quality Gates Summary

### QG-TC1: Unit Test Coverage

| Check | Criteria | Classification |
|-------|----------|----------------|
| Line coverage | ≥80% overall | **CRITICAL** |
| Domain logic | ≥90% coverage | **CRITICAL** |
| Branch coverage | ≥75% | Non-critical |
| Mutation score | ≥70% | Non-critical |

### QG-TC2: Integration Test Coverage

| Check | Criteria | Classification |
|-------|----------|----------------|
| Facade coverage | 100% public facades | **CRITICAL** |
| Database ops | ≥90% CRUD operations | **CRITICAL** |
| Event handlers | ≥90% handlers | Non-critical |
| Contract tests | All facades have contracts | **CRITICAL** |

### QG-TC3: E2E Test Coverage

| Check | Criteria | Classification |
|-------|----------|----------------|
| Critical journeys | All covered | **CRITICAL** |
| Journey coverage | ≥80% | Non-critical |
| Admin flows | All covered | Non-critical |
| API journeys | All covered | Non-critical |

### QG-I2: Tenant Safety (CRITICAL)

| Check | Criteria | Classification |
|-------|----------|----------------|
| Cross-tenant data | Blocked in all scenarios | **CRITICAL** |
| Cross-tenant API | 403/404 in all scenarios | **CRITICAL** |
| Cross-tenant events | Not received | **CRITICAL** |
| RLS bypass | All attempts fail | **CRITICAL** |
| Noisy neighbor | Isolation verified | Non-critical |
```

### 7. Write Document to Output Folder

**Output location:**

```
{output_folder}/planning-artifacts/testing-strategy.md
```

**Document frontmatter:**

```yaml
---
name: Testing Strategy
version: 1.0.0
date: {current_date}
tenant_model: {tenant_model}
tea_integration: {enabled/disabled}
qg_tc1_status: PENDING
qg_tc2_status: PENDING
qg_tc3_status: PENDING
qg_i2_status: PENDING
stepsCompleted: [1, 2, 3, 4, 5]
---
```

---

## COLLABORATION MENUS (A/P/C)

After presenting compiled document:

```
================================================================================
TESTING STRATEGY DOCUMENT COMPILED
================================================================================
Output: {output_folder}/planning-artifacts/testing-strategy.md

Document Sections:
1. Executive Summary
2. Test Pyramid with Tenant-Aware Layers
3. Unit Test Strategy (QG-TC1)
4. Integration Test Strategy (QG-TC2)
5. E2E Test Strategy (QG-TC3)
6. Tenant Isolation Tests (QG-I2 - CRITICAL)
7. Performance Testing
8. Security Testing
9. CI/CD Integration
10. TEA Handoff Points
11. Quality Gates Summary

================================================================================

Your options:
- **A (Advanced Elicitation)**: Refine specific sections before finalizing
- **P (Party Mode)**: Final review from all stakeholder perspectives
- **C (Continue)**: Approve and write document to output folder

Select an option:
```

### If 'A' (Advanced Elicitation):

Invoke `bmad-advanced-elicitation` skill to explore:

- **Section refinement:** Which sections need more detail?
- **Missing coverage:** Are there test scenarios not addressed?
- **Implementation guidance:** Should specific tooling be recommended?
- **Timeline:** What is the testing implementation sequence?
- **Resources:** What team capacity is needed for this strategy?

Pass context: Compiled document sections, specific concerns.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode):

Invoke `bmad-party-mode` skill with context:

```
Final review of testing strategy document for {project_name}
targeting {tenant_model} multi-tenant SaaS
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| QA Lead | Completeness | Does strategy cover all testing needs? |
| Dev Lead | Feasibility | Can team implement this strategy? |
| Security | Isolation | Are isolation tests comprehensive? |
| DevOps | CI/CD | Can pipeline support this strategy? |
| PM | Timeline | Is strategy achievable in project timeline? |

Process multi-perspective analysis and synthesize final recommendations.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue):

1. Write the compiled document to output folder:

```
{output_folder}/planning-artifacts/testing-strategy.md
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze
  - step-03-c-design
  - step-04-c-document
  - step-05-c-complete  # Add this
currentStep: complete
create_mode_complete: true
```

3. Present completion summary.

---

## SUCCESS METRICS

- ✅ All Step 01-04 strategies consolidated
- ✅ Executive summary captures key decisions
- ✅ Test pyramid documented with tenant-aware layers
- ✅ CI/CD integration guidance complete
- ✅ TEA handoff points defined
- ✅ All quality gates (QG-TC1/2/3, QG-I2) documented
- ✅ Document written to output folder
- ✅ User approved final document

---

## FAILURE MODES

- ❌ **Missing steps:** Cannot compile without Steps 01-04
- ❌ **Incomplete sections:** All sections must have content
- ❌ **Missing gates:** QG-TC1/2/3 and QG-I2 must be documented
- ❌ **No TEA handoff:** If TEA enabled, handoff points required
- ❌ **Write failure:** Verify output folder exists

---

## Outputs

- **Primary:** `{output_folder}/planning-artifacts/testing-strategy.md`
- **Frontmatter:** Version, tenant model, TEA status, gate statuses
- **Sections:** All 11 sections as documented above

---

## Create Mode Complete

The testing strategy Create mode is now complete. The document is ready for:

1. **Implementation:** Development team implements tests per strategy
2. **Validation:** Run `step-20-v-load.md` to validate against QG-TC criteria
3. **TEA Verification:** Handoff to TEA for formal coverage verification
4. **Edit Mode:** Use `step-10-e-load.md` to modify strategy as needed

---

## NEXT STEP

**Create mode is complete.** Options:

1. **Implement tests** - Begin implementing tests per strategy
2. **Validate strategy** - Run Validate mode (step-20-v-*)
3. **TEA handoff** - Invoke TEA workflows for formal verification
4. **Edit strategy** - Run Edit mode (step-10-e-*) if changes needed

**No automatic next step - user direction required.**
