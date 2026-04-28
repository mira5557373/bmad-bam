# Step 20: Load Testing Strategy for Validation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER validate without loading the testing strategy artifact first**
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🔍 **LOAD QG-TC1/TC2/TC3 and QG-I2 checklists** - These are validation gates
- 📋 **VERIFY artifact exists** before proceeding to validation checks

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load testing strategy artifact and quality gate checklists
- 💾 Track: `stepsCompleted: [20]` when complete
- 📖 Context: Validate mode verifies existing artifact against QG-TC criteria
- 🚫 Do NOT: Generate new content; Edit mode handles modifications
- 🔍 Use web search: Verify current testing best practices
- ⚠️ Gate: QG-TC1, QG-TC2, QG-TC3, QG-I2 - CRITICAL checks must pass

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading artifact and checklist
- Evaluating against criteria
- Documenting evidence

**OUT OF SCOPE:**
- Modifying the artifact
- Creating new content
## Purpose

Load the existing testing strategy artifact and all testing quality gate checklists in preparation for formal quality gate verification.

---

## Prerequisites

- Testing strategy artifact exists at `{output_folder}/planning-artifacts/testing-strategy.md`
- **Load checklists:**
  - `{project-root}/_bmad/bam/data/checklists/qg-tc1.md` (Unit Test Coverage)
  - `{project-root}/_bmad/bam/data/checklists/qg-tc2.md` (Integration Test Coverage)
  - `{project-root}/_bmad/bam/data/checklists/qg-tc3.md` (E2E Test Coverage)
  - `{project-root}/_bmad/bam/data/checklists/qg-i2.md` (Tenant Safety)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `testing-*`

---

## YOUR TASK

Load the testing strategy artifact created in Create mode. If the artifact does not exist, inform the user and suggest switching to Create mode. Prepare all validation criteria from QG-TC checklists for systematic verification.

---

## Validation Sequence

### Action 1: Load Testing Strategy Artifact

**Attempt to read:**

```
{output_folder}/planning-artifacts/testing-strategy.md
```

**If artifact does not exist:**
- Inform user: "Testing strategy not found. Please run Create mode first."
- Suggest: `bmad-bam-testing` Create mode (step-01-c-*)
- HALT validation workflow

**If artifact exists, extract metadata:**

| Attribute | Value |
|-----------|-------|
| Document Path | `{output_folder}/planning-artifacts/testing-strategy.md` |
| Version | {from frontmatter} |
| Tenant Model | {tenant_model from frontmatter} |
| TEA Integration | {tea_integration from frontmatter} |
| Last Modified | {date} |
| Create Steps Completed | {stepsCompleted array} |

### Action 2: Load QG-TC1 Validation Checklist (Unit Tests)

**Read and internalize:**

```
{project-root}/_bmad/bam/data/checklists/qg-tc1.md
```

Extract the validation criteria:

| Check | Classification | Pass Criteria |
|-------|----------------|---------------|
| Overall line coverage | CRITICAL | ≥80% |
| Domain logic coverage | CRITICAL | ≥90% |
| Branch coverage | Non-critical | ≥75% |
| Mutation score | Non-critical | ≥70% |
| TenantContext mocking | CRITICAL | Documented |
| Isolation strategy | Non-critical | In-memory implementations |

### Action 3: Load QG-TC2 Validation Checklist (Integration Tests)

**Read and internalize:**

```
{project-root}/_bmad/bam/data/checklists/qg-tc2.md
```

Extract the validation criteria:

| Check | Classification | Pass Criteria |
|-------|----------------|---------------|
| Module facade coverage | CRITICAL | 100% public facades |
| Database operations | CRITICAL | ≥90% CRUD operations |
| Tenant isolation in DB tests | CRITICAL | Verified |
| Event handler coverage | Non-critical | ≥90% |
| Contract tests | CRITICAL | All facades have contracts |

### Action 4: Load QG-TC3 Validation Checklist (E2E Tests)

**Read and internalize:**

```
{project-root}/_bmad/bam/data/checklists/qg-tc3.md
```

Extract the validation criteria:

| Check | Classification | Pass Criteria |
|-------|----------------|---------------|
| Critical user journeys | CRITICAL | All covered |
| Journey coverage | Non-critical | ≥80% |
| Cross-tier flows | Non-critical | Tested |
| Admin flows | Non-critical | All covered |
| API journeys | Non-critical | All covered |

### Action 5: Load QG-I2 Validation Checklist (Tenant Safety - CRITICAL)

**Read and internalize:**

```
{project-root}/_bmad/bam/data/checklists/qg-i2.md
```

Extract the validation criteria:

| Check | Classification | Pass Criteria |
|-------|----------------|---------------|
| Cross-tenant data access | CRITICAL | Blocked in all scenarios |
| Cross-tenant API access | CRITICAL | Returns 403/404 |
| Cross-tenant events | CRITICAL | Not received |
| Cross-tenant cache | CRITICAL | Cache miss / denied |
| Cross-tenant files | CRITICAL | 404 / 403 |
| RLS bypass attempts | CRITICAL | All fail |
| Tenant ID spoofing | CRITICAL | Detected and rejected |
| Noisy neighbor test | Non-critical | Isolation verified |

### Action 6: Verify Test Layer Coverage

Check artifact contains all test layers:

| Layer | Present | Status |
|-------|---------|--------|
| Unit Test Strategy | [ ] | |
| Integration Test Strategy | [ ] | |
| E2E Test Strategy | [ ] | |
| Isolation Test Strategy | [ ] | |
| Performance Test Strategy | [ ] | |
| Security Test Strategy | [ ] | |

**If any layer missing:**
- Document which layers are incomplete
- This will result in FAIL at respective QG gate

### Action 7: Prepare Validation Summary

Present artifact overview to user:

```
================================================================================
TESTING STRATEGY ARTIFACT LOADED
================================================================================
Path: {output_folder}/planning-artifacts/testing-strategy.md
Tenant Model: {tenant_model}
Version: {version}
TEA Integration: {enabled/disabled}

TEST LAYERS:
- Unit Tests: {present/missing}
- Integration Tests: {present/missing}
- E2E Tests: {present/missing}
- Isolation Tests: {present/missing}
- Performance Tests: {present/missing}
- Security Tests: {present/missing}

QUALITY GATES TO VALIDATE:
- QG-TC1 (Unit Coverage): {checklist_loaded/not_found}
- QG-TC2 (Integration Coverage): {checklist_loaded/not_found}
- QG-TC3 (E2E Coverage): {checklist_loaded/not_found}
- QG-I2 (Tenant Safety): {checklist_loaded/not_found}

================================================================================
Ready for validation? [Y/N]
================================================================================
```

---

## Quality Gate Integration

**Testing Validation Scope:**

This validation workflow verifies the testing strategy meets all QG-TC criteria. The gates validate:

- **QG-TC1:** Unit test coverage and mocking patterns
- **QG-TC2:** Integration test coverage and tenant fixtures
- **QG-TC3:** E2E test coverage and user journeys
- **QG-I2:** Tenant isolation testing (CRITICAL)

**Gate Outcomes:**

| Outcome | Definition |
|---------|------------|
| **PASS** | All CRITICAL checks pass, ≥80% non-critical pass |
| **CONDITIONAL** | All CRITICAL pass, <80% non-critical - remediation plan required |
| **FAIL** | Any CRITICAL check fails - block until resolved |
| **WAIVED** | Non-critical waived with stakeholder sign-off |

---

## SUCCESS METRICS

- ✅ Testing strategy artifact loaded successfully
- ✅ Document metadata extracted and displayed
- ✅ QG-TC1, QG-TC2, QG-TC3 checklists loaded
- ✅ QG-I2 (Tenant Safety) checklist loaded
- ✅ All test layers verified present
- ✅ Validation readiness confirmed by user
- ✅ Create mode steps (1-5) completed in artifact

---

## FAILURE MODES

- ❌ **Artifact not found:** Redirect to Create mode
- ❌ **Missing frontmatter:** Cannot extract version/model
- ❌ **Incomplete Create mode:** stepsCompleted missing steps 1-5
- ❌ **Checklist not found:** Verify BAM installation
- ❌ **Missing test layers:** Cannot validate incomplete strategy

---

## Verification

- [ ] Artifact loaded from correct path
- [ ] Document metadata captured
- [ ] QG-TC1 checklist loaded
- [ ] QG-TC2 checklist loaded
- [ ] QG-TC3 checklist loaded
- [ ] QG-I2 checklist loaded
- [ ] All test layers verified present
- [ ] User confirmed ready for validation

---

## Outputs

- Loaded artifact content with metadata
- QG-TC validation criteria prepared
- Validation readiness confirmation

---

## NEXT STEP

Proceed to `step-21-v-validate.md` to run QG-TC validation checks against the testing strategy. The validation step will systematically verify all CRITICAL and non-critical criteria for each gate.
