# Step 01: Initialize Testing Strategy

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate testing strategy without loading master architecture first**
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- ✅ **VERIFY tenant model selection** from master architecture before proceeding
- 📋 **LOAD TEA integration configuration** if test_architecture enabled
- 🌐 **USE web search** to verify current testing best practices

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Initialize testing strategy with tenant-aware context
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Load master architecture, tenant model, and TEA configuration
- 🚫 Do NOT: Skip loading tenant isolation context
- 🔍 Use web search: Verify multi-tenant testing patterns
- ⚠️ Gate: QG-TC1/TC2/TC3 - Testing coverage gates govern this workflow

---

## CONTEXT BOUNDARIES

### Primary Domain

- **Testing Domain:** Multi-tenant SaaS testing strategy
- Contains: Test pyramid, tenant isolation testing, coverage thresholds

### Required Artifacts

- **Master Architecture:** `{output_folder}/planning-artifacts/master-architecture.md`
- **Tenant Isolation:** `{output_folder}/planning-artifacts/tenant-isolation.md`
- Contains: Selected tenant model (RLS, schema, database, hybrid)

### Pattern Registry

- **Testing Patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `testing-*`
- **Tenant Models:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- Contains: Testing patterns, tenant model characteristics, web queries

### TEA Integration

- **TEA Configuration:** `{project-root}/_bmad/bam/config.yaml` → `test_architecture`
- If enabled: TEA workflows are available for formal verification

---

## YOUR TASK

Initialize the testing strategy by loading all required context: master architecture, tenant model, and TEA configuration. Identify the testing scope (unit, integration, e2e, tenant isolation) and prepare for strategy design.

---

## Prerequisites

- [ ] Master architecture document exists with tenant model selected
- [ ] Tenant isolation design document exists (preferred but not required)
- [ ] TEA integration status known from config

---

## Main Sequence

### Action 1: Load Master Architecture

**Read and extract testing context:**

```
{output_folder}/planning-artifacts/master-architecture.md
```

Extract testing-relevant sections:

| Setting | Value |
|---------|-------|
| Tenant Model | (RLS / Schema / Database / Hybrid) |
| Module Boundaries | (list of modules) |
| AI Runtime | (if applicable) |
| API Contracts | (facade patterns used) |

### Action 2: Load Tenant Isolation Design

**Read and extract isolation context:**

```
{output_folder}/planning-artifacts/tenant-isolation.md
```

If not found, note that testing strategy must account for unspecified isolation:

| Dimension | Isolation Level | Testing Implication |
|-----------|-----------------|---------------------|
| Data | (RLS/Schema/DB) | Cross-tenant test scenarios |
| Cache | (Prefixed/Dedicated) | Cache isolation tests |
| Compute | (Shared/Dedicated) | Resource isolation tests |
| Network | (Shared/Isolated) | Network boundary tests |
| API | (Shared/Versioned) | API contract tests |
| Events | (Shared/Isolated) | Event isolation tests |

### Action 3: Load Pattern Registry

**Read and filter testing patterns:**

```
{project-root}/_bmad/bam/data/bam-patterns.csv
```

Filter for testing-related patterns:
- `testing-unit` - Unit test patterns
- `testing-integration` - Integration test patterns
- `testing-e2e` - End-to-end test patterns
- `testing-isolation` - Tenant isolation test patterns
- `testing-contract` - Contract testing patterns

Extract `web_queries` column for current best practices.

### Action 4: Check TEA Integration Configuration

**Read BAM configuration:**

```
{project-root}/_bmad/bam/config.yaml
```

Document TEA status:

| Configuration | Value |
|---------------|-------|
| `test_architecture` | (true/false) |
| TEA Workflows Available | (if true, list handoff points) |
| Formal Verification | (TEA-owned gates: QG-I2, QG-I3, QG-TC1-3) |

### Action 5: Identify Testing Scope

**Define testing scope based on context:**

| Test Category | Scope | Priority |
|---------------|-------|----------|
| **Unit Tests** | Module-level, mocked dependencies | P0 |
| **Integration Tests** | Cross-module with real dependencies | P0 |
| **E2E Tests** | User journey with full stack | P1 |
| **Tenant Isolation Tests** | Cross-tenant access verification | P0 (CRITICAL) |
| **Contract Tests** | Facade contract verification | P1 |
| **Performance Tests** | Tenant-aware load testing | P2 |
| **Security Tests** | Penetration and isolation | P0 (CRITICAL) |

### Action 6: Web Research Verification

**Verify current best practices with web search:**

Search the web: "multi-tenant testing strategy SaaS {date}"
Search the web: "tenant isolation testing patterns {date}"
Search the web: "PostgreSQL RLS testing best practices {date}"

Use `web_queries` column from `bam-patterns.csv` for pattern-specific searches.

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-6 complete the testing strategy initialization.**

Present the gathered context and await confirmation:

```
Testing Strategy Initialization Summary:
- Tenant Model: {selected}
- Module Count: {count}
- TEA Integration: {enabled/disabled}
- Testing Scope: Unit, Integration, E2E, Isolation, Contract

Ready to proceed to unit test strategy design? (y/n)
```

---

## SUCCESS METRICS

- ✅ Master architecture loaded and parsed
- ✅ Tenant isolation design loaded (or noted as missing)
- ✅ Pattern registry filtered for testing patterns
- ✅ TEA integration status confirmed
- ✅ Testing scope identified with priorities
- ✅ Web research performed for current patterns
- ✅ User confirmed testing scope

---

## FAILURE MODES

- ❌ **No master architecture:** Cannot proceed without tenant model selection
- ❌ **Unknown tenant model:** Testing strategy cannot be tailored
- ❌ **TEA config missing:** Assume test_architecture=false
- ❌ **Pattern registry unavailable:** Proceed with standard testing patterns

---

## Outputs

- Testing scope definition with priorities
- Tenant model testing implications
- TEA integration handoff points
- Pattern registry extracts for testing

**Note:** Full testing strategy document created in later steps using:
`{project-root}/_bmad/bam/data/templates/testing-strategy-template.md`

---

## NEXT STEP

Proceed to `step-02-c-analyze.md` with:
- Tenant model context
- Testing scope definition
- TEA integration status
- Pattern registry testing patterns

The unit test strategy step will design module-level testing with TenantContext mocking.
