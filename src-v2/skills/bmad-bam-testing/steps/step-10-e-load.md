# Step 10: Load Existing Testing Strategy

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER proceed without locating the existing testing-strategy.md file**
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- ✅ **EXTRACT all test layer configurations** for edit selection
- 📋 **PRESENT edit options clearly** before accepting modifications
- 🔍 **IDENTIFY QG-TC status** from frontmatter to understand compliance state

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load and parse existing testing strategy for modification
- 💾 Track: Document load status and parse results
- 📖 Context: Extract test layers, coverage targets, quality gate statuses
- 🚫 Do NOT: Modify any content during load phase
- ⚠️ Gate: Changes may invalidate QG-TC1/TC2/TC3/QG-I2 status
- 🔍 Use web search: Only if user requests updated best practices

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading existing artifact
- Applying user-requested changes
- Preserving existing content

**OUT OF SCOPE:**
- Creating new artifacts (use Create mode)
- Validation (use Validate mode)
## YOUR TASK

Load the existing testing strategy document, parse its structure, extract the current test layer configurations, and present a summary showing what can be edited. Enable the user to select specific sections for modification.

---

## Load Sequence

### Action 1: Locate Document

**Search for existing artifact:**

```
{output_folder}/planning-artifacts/testing-strategy.md
```

If not found, check alternate locations:
- `{output_folder}/testing-strategy.md`
- `{project-root}/docs/testing-strategy.md`

**If document not found:**

```
================================================================================
EDIT MODE ERROR: No existing testing strategy found
================================================================================
Expected location: {output_folder}/planning-artifacts/testing-strategy.md

Options:
[C] Switch to Create mode to generate new strategy
[P] Specify alternate path to existing document
================================================================================
```

### Action 2: Parse Frontmatter

**Extract document metadata:**

```yaml
# Expected frontmatter structure
name: Testing Strategy
version: {semantic_version}
date: {last_modified_date}
tenant_model: {rls|schema|database|hybrid}
tea_integration: {enabled|disabled}
qg_tc1_status: {PASS|CONDITIONAL|PENDING|FAIL}
qg_tc2_status: {PASS|CONDITIONAL|PENDING|FAIL}
qg_tc3_status: {PASS|CONDITIONAL|PENDING|FAIL}
qg_i2_status: {PASS|CONDITIONAL|PENDING|FAIL}
stepsCompleted: [1, 2, 3, 4, 5]
```

Document current state:

| Metadata | Value |
|----------|-------|
| Document Version | |
| Last Modified | |
| Tenant Model | |
| TEA Integration | |
| QG-TC1 Status | |
| QG-TC2 Status | |
| QG-TC3 Status | |
| QG-I2 Status | |

### Action 3: Extract Test Layer Configurations

**Parse unit test strategy:**

| Setting | Current Value |
|---------|---------------|
| Mocking Pattern | |
| Coverage Target (Line) | |
| Coverage Target (Branch) | |
| Mutation Score Target | |

**Parse integration test strategy:**

| Setting | Current Value |
|---------|---------------|
| Database Strategy | |
| Tenant Fixtures | |
| Contract Testing | |
| Event Testing | |

**Parse e2e test strategy:**

| Setting | Current Value |
|---------|---------------|
| Critical Journeys | |
| Isolation Scenarios | |
| Performance Tests | |
| Security Tests | |

### Action 4: Extract Quality Gate Criteria

**Parse QG-TC1 criteria:**

| Check | Status | Classification |
|-------|--------|----------------|
| Line coverage ≥80% | | CRITICAL |
| Domain logic ≥90% | | CRITICAL |
| Branch coverage ≥75% | | Non-critical |
| Mutation score ≥70% | | Non-critical |

**Parse QG-TC2 criteria:**

| Check | Status | Classification |
|-------|--------|----------------|
| Facade coverage 100% | | CRITICAL |
| DB ops ≥90% | | CRITICAL |
| Event handlers ≥90% | | Non-critical |
| Contract tests | | CRITICAL |

**Parse QG-TC3 criteria:**

| Check | Status | Classification |
|-------|--------|----------------|
| Critical journeys | | CRITICAL |
| Journey coverage ≥80% | | Non-critical |
| Admin flows | | Non-critical |

**Parse QG-I2 criteria (CRITICAL):**

| Check | Status | Classification |
|-------|--------|----------------|
| Cross-tenant data blocked | | CRITICAL |
| Cross-tenant API blocked | | CRITICAL |
| Cross-tenant events blocked | | CRITICAL |
| RLS bypass fails | | CRITICAL |

### Action 5: Extract TEA Handoff Configuration

**Parse TEA integration:**

| Handoff Point | Configuration | Status |
|---------------|---------------|--------|
| tea-verify-strategy | | |
| tea-unit-coverage | | |
| tea-integration-coverage | | |
| tea-e2e-coverage | | |
| tea-isolation-verify | | |

### Action 6: Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
TESTING STRATEGY - EDIT MODE
================================================================================
Document: testing-strategy.md
Version: {version}
Tenant Model: {tenant_model}
TEA Integration: {status}
================================================================================

QUALITY GATE STATUS:
- QG-TC1 (Unit): {status}
- QG-TC2 (Integration): {status}
- QG-TC3 (E2E): {status}
- QG-I2 (Isolation): {status}

CURRENT TEST LAYERS:
1. Unit Tests:    Coverage {line}% / {branch}%
2. Integration:   {facade_count} facades, {fixture_count} fixtures
3. E2E Tests:     {journey_count} journeys
4. Isolation:     {scenario_count} scenarios

EDITABLE SECTIONS:
[1] Unit Test Strategy - Modify coverage targets, mocking patterns
[2] Integration Test Strategy - Update fixtures, contracts, events
[3] E2E Test Strategy - Change journeys, isolation scenarios
[4] CI/CD Integration - Update pipeline configuration
[5] TEA Handoff Points - Modify verification handoffs
[6] Quality Gate Criteria - Adjust thresholds (may invalidate status)
[7] Full Document - Major restructure (requires re-validation)

================================================================================
Select section(s) to edit (comma-separated) or 'X' to cancel:
```

---

## SUCCESS METRICS

- ✅ Document located and fully loaded
- ✅ Frontmatter parsed with all metadata extracted
- ✅ Test layer configurations parsed completely
- ✅ Quality gate criteria extracted and displayed
- ✅ TEA handoff points documented
- ✅ Edit summary presented to user
- ✅ User has selected edit target(s)

---

## FAILURE MODES

- ❌ **Document not found:** Redirect to Create mode or request alternate path
- ❌ **Invalid frontmatter:** Attempt recovery, flag missing fields
- ❌ **Incomplete layers:** Flag sections needing completion before edit
- ❌ **QG already failed:** Warn that edits require full re-validation

---

## Verification

- [ ] Document loaded from expected location
- [ ] Frontmatter parsed with version, tenant model, QG statuses
- [ ] All test layer configurations extracted
- [ ] Quality gate criteria parsed
- [ ] TEA handoff configuration documented
- [ ] Edit summary presented
- [ ] User selection received

---

## NEXT STEP

Proceed to `step-11-e-apply.md` with:
- Selected edit target(s)
- Current document state
- Parsed test configurations
- QG status for re-validation tracking
