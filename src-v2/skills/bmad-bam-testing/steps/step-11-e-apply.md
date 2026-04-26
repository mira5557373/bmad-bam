# Step 11: Apply Testing Strategy Changes

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER apply changes without Step 10 load complete**
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting changes** and await user confirmation
- 🎯 **Focus ONLY on current step scope** - apply selected changes only
- ✅ **VERIFY changes maintain QG-TC/QG-I2 compliance** before applying
- 📋 **DOCUMENT all modifications** with before/after comparison
- 🌐 **USE web search** only if user requests updated best practices

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply user-requested changes to testing strategy
- 💾 Track: `editApplied: true`, increment version
- 📖 Context: Reference Step 10 parsed configuration
- 🚫 Do NOT: Make changes beyond user selection
- ⚠️ Gate: Flag if changes may invalidate QG-TC1/TC2/TC3/QG-I2
- 🔍 Use web search: Verify new patterns if requested

---

## YOUR TASK

Apply the user-selected changes to the testing strategy document. Verify consistency, update version, and flag any quality gate impacts. Present the modified document for confirmation before saving.

---

## Edit Sequence

### Action 1: Review Selected Edits

**From Step 10, user selected:**

```
Selected Sections: {section_list}
Current State: {parsed_from_step_10}
Requested Changes: {user_input}
```

### Action 2: Apply Changes by Section

#### If [1] Unit Test Strategy Selected:

**Modifiable elements:**

| Element | Current | Proposed | Impact |
|---------|---------|----------|--------|
| Mocking Pattern | {current} | {new} | Low |
| Line Coverage Target | {current}% | {new}% | QG-TC1 impact if lowered |
| Branch Coverage Target | {current}% | {new}% | QG-TC1 impact if lowered |
| Mutation Score Target | {current}% | {new}% | QG-TC1 impact if lowered |
| Isolation Strategy | {current} | {new} | Low |

**QG-TC1 Impact Assessment:**

If coverage targets LOWERED:
```
================================================================================
⚠️ WARNING: QG-TC1 Impact Detected
================================================================================
Proposed change lowers coverage threshold from {current}% to {new}%.

Impact: QG-TC1 status will be set to PENDING for re-validation.

Proceed? [Y/N]
================================================================================
```

#### If [2] Integration Test Strategy Selected:

**Modifiable elements:**

| Element | Current | Proposed | Impact |
|---------|---------|----------|--------|
| Database Strategy | {current} | {new} | High - affects fixtures |
| Tenant Fixtures | {current_list} | {new_list} | Medium |
| Contract Testing | {current} | {new} | QG-TC2 impact |
| Event Testing | {current} | {new} | QG-TC2 impact |

#### If [3] E2E Test Strategy Selected:

**Modifiable elements:**

| Element | Current | Proposed | Impact |
|---------|---------|----------|--------|
| Critical Journeys | {current_list} | {new_list} | QG-TC3 impact |
| Isolation Scenarios | {current_count} | {new_count} | QG-I2 CRITICAL impact |
| Performance Tests | {current} | {new} | Low |
| Security Tests | {current} | {new} | QG-I2 impact |

**QG-I2 Impact Assessment (CRITICAL):**

If isolation scenarios REDUCED:
```
================================================================================
🛑 CRITICAL: QG-I2 Impact Detected
================================================================================
Proposed change reduces isolation test scenarios from {current} to {new}.

This is a CRITICAL security gate. Reducing coverage may allow cross-tenant
data leakage.

Impact: QG-I2 status will be set to FAIL until re-validated.

Are you CERTAIN? Type 'CONFIRM' to proceed:
================================================================================
```

#### If [4] CI/CD Integration Selected:

**Modifiable elements:**

| Element | Current | Proposed | Impact |
|---------|---------|----------|--------|
| Pre-commit Tests | {current} | {new} | Low |
| PR Build Tests | {current} | {new} | Low |
| Main Build Tests | {current} | {new} | Medium |
| Nightly Tests | {current} | {new} | Low |
| Release Tests | {current} | {new} | Medium |

#### If [5] TEA Handoff Points Selected:

**Modifiable elements:**

| Element | Current | Proposed | Impact |
|---------|---------|----------|--------|
| tea-verify-strategy | {current} | {new} | Medium |
| tea-unit-coverage | {current} | {new} | QG-TC1 impact |
| tea-integration-coverage | {current} | {new} | QG-TC2 impact |
| tea-e2e-coverage | {current} | {new} | QG-TC3 impact |
| tea-isolation-verify | {current} | {new} | QG-I2 CRITICAL |

#### If [6] Quality Gate Criteria Selected:

**Modifiable elements (HIGH IMPACT):**

| Gate | Element | Current | Proposed | Classification |
|------|---------|---------|----------|----------------|
| QG-TC1 | Line coverage | {current}% | {new}% | CRITICAL |
| QG-TC1 | Branch coverage | {current}% | {new}% | Non-critical |
| QG-TC2 | Facade coverage | {current}% | {new}% | CRITICAL |
| QG-TC3 | Journey coverage | {current}% | {new}% | Non-critical |
| QG-I2 | Cross-tenant blocked | {current} | {new} | CRITICAL |

**Warning for CRITICAL threshold changes:**

```
================================================================================
🛑 CRITICAL THRESHOLD CHANGE
================================================================================
You are modifying a CRITICAL quality gate threshold.

Gate: {gate_id}
Element: {element}
Current: {current}
Proposed: {new}

This may compromise tenant isolation or test coverage quality.

Approver Signature Required: _______________
Date: _______________
Justification: _______________

Proceed? Type 'I ACCEPT THE RISK' to continue:
================================================================================
```

### Action 3: Verify Consistency

After applying changes, verify document consistency:

| Check | Status |
|-------|--------|
| All test layers defined | [ ] |
| Coverage targets consistent | [ ] |
| QG criteria aligned with strategy | [ ] |
| TEA handoffs match gates | [ ] |
| No conflicting requirements | [ ] |

### Action 4: Update Document Metadata

**Update frontmatter:**

```yaml
---
name: Testing Strategy
version: {increment_version}  # e.g., 1.0.0 → 1.1.0
date: {current_date}
tenant_model: {unchanged or updated}
tea_integration: {unchanged or updated}
qg_tc1_status: {PENDING if affected, else unchanged}
qg_tc2_status: {PENDING if affected, else unchanged}
qg_tc3_status: {PENDING if affected, else unchanged}
qg_i2_status: {PENDING if affected, else unchanged}
stepsCompleted: [1, 2, 3, 4, 5]
last_edit: {current_timestamp}
edit_summary: "{brief_change_description}"
---
```

### Action 5: Present Modified Document

**Display changes for confirmation:**

```
================================================================================
TESTING STRATEGY - CHANGES APPLIED
================================================================================
Document: testing-strategy.md
Previous Version: {old_version}
New Version: {new_version}
================================================================================

CHANGES SUMMARY:

Section: {section_name}
  - {element}: {old_value} → {new_value}
  - {element}: {old_value} → {new_value}

QUALITY GATE IMPACT:
  - QG-TC1: {unchanged | PENDING}
  - QG-TC2: {unchanged | PENDING}
  - QG-TC3: {unchanged | PENDING}
  - QG-I2: {unchanged | PENDING | FAIL}

REQUIRED ACTIONS:
  {List of required follow-up actions if any gates affected}

================================================================================
Confirm and save changes? [Y/N/R(eview full document)]
================================================================================
```

### Action 6: Save Modified Document

**Write to output folder:**

```
{output_folder}/planning-artifacts/testing-strategy.md
```

**Create backup of previous version:**

```
{output_folder}/planning-artifacts/.backups/testing-strategy-{old_version}.md
```

---

## SUCCESS METRICS

- ✅ User-selected changes applied correctly
- ✅ Document consistency verified
- ✅ Version incremented appropriately
- ✅ QG impact assessed and flagged
- ✅ Changes presented for confirmation
- ✅ Document saved with backup
- ✅ Edit summary documented

---

## FAILURE MODES

- ❌ **Inconsistent changes:** Changes conflict with other sections
- ❌ **CRITICAL gate violated:** QG-I2 isolation requirements compromised
- ❌ **Missing confirmation:** User did not confirm changes
- ❌ **Write failure:** Could not save to output folder
- ❌ **No backup:** Previous version not preserved

---

## Verification

- [ ] Changes match user selection
- [ ] No unintended modifications
- [ ] Frontmatter updated correctly
- [ ] QG statuses reflect impact
- [ ] Backup created
- [ ] Document saved successfully

---

## NEXT STEP

**Edit mode is complete.** Recommended actions:

1. **Re-validate** - If QG status is PENDING, run Validate mode (step-20-v-*)
2. **TEA handoff** - If QG-I2 affected, invoke `tea-isolation-verify`
3. **Implementation update** - Update test implementation to match strategy
4. **Review changes** - Team review of modified strategy

**Output location:** `{output_folder}/planning-artifacts/testing-strategy.md`
