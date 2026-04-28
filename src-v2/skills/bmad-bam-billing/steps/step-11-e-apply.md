# Step 11: Apply Billing Design Changes

## MANDATORY EXECUTION RULES

- 🛑 NEVER apply changes that violate billing data consistency or tenant isolation
- 📖 ALWAYS validate tier pricing changes against all dependent sections
- 🔄 ALWAYS preserve document structure and unmodified sections
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ UPDATE frontmatter version after any successful edit
- 📋 DOCUMENT change rationale in Change Log section
- 💬 PRESENT diff summary before final save
- ⚠️ FLAG if changes require billing re-validation or ASC 606 review
- 🔒 LOCK critical billing fields (tenant_id on invoices) without explicit user override

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply user-requested changes while maintaining billing consistency
- 💾 Track: `stepsCompleted: [10, 11]` when complete
- 📖 Context: Preserve all unmodified content exactly
- 🚫 Do NOT: Auto-modify unrelated sections or break tenant isolation
- ⚠️ Gate: Pricing or revenue recognition changes require compliance re-validation
- 🔍 Use web search: If user requests updated payment provider patterns for specific changes

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

Apply the user's requested changes to the billing design, validate consistency across metering events, subscription tiers, and invoicing rules, update document metadata, and present a summary of modifications with any re-validation requirements.

---

## Purpose

Apply requested changes to the existing billing design artifact while ensuring consistency across all sections and maintaining multi-tenant integrity.

## Prerequisites

- Step 10 complete (existing artifact loaded)
- User has specified changes to make
- Understanding of change impact on related sections

## Actions

### 1. Analyze Change Impact

Before applying changes, assess cross-section impact:

| Change Type | Affected Sections | Consistency Checks |
|-------------|-------------------|-------------------|
| **Tier pricing** | Overview, Subscription, Invoicing | Update all price references |
| **New feature flag** | Subscription, Feature Flags | Add to tier configs |
| **New usage metric** | Metering, Invoicing | Update event schema, invoice line items |
| **Payment provider** | Invoicing, Compliance | Update integration, webhooks |
| **Tax jurisdiction** | Compliance, Invoicing | Add nexus, update calculations |

### 2. Apply Requested Changes

For each requested change:

**Change Application Template:**
```markdown
### Change: [Description]

**Before:**
[Original content]

**After:**
[Modified content]

**Related Updates:**
- [Other section]: [Required update]
- [Other section]: [Required update]
```

### 3. Verify Cross-Section Consistency

After applying changes, verify:

| Check | Status | Notes |
|-------|--------|-------|
| Tier pricing consistent across sections | [PASS/FAIL] | |
| Feature flags match tier definitions | [PASS/FAIL] | |
| Metering events align with invoicing | [PASS/FAIL] | |
| Payment provider references consistent | [PASS/FAIL] | |
| Compliance requirements still met | [PASS/FAIL] | |

### 4. Update Artifact

Write changes to billing design:

**Update Location:** `{output_folder}/planning-artifacts/billing-design.md`

**Change Log Entry:**
```markdown
## Change Log

### [Date] - Edit Mode Update
- **Changed:** [Summary of changes]
- **Reason:** [User request]
- **Affected Sections:** [List]
- **Verified:** [Consistency checks passed]
```

### 5. Present Change Summary

Summarize applied changes:

```markdown
## Edit Summary

### Changes Applied:
1. [Change 1] - [Section affected]
2. [Change 2] - [Section affected]

### Consistency Verified:
- [x] Tier definitions consistent
- [x] Metering aligned with billing
- [x] Compliance maintained

### Artifact Updated:
Location: {output_folder}/planning-artifacts/billing-design.md
```

### 6. Display Modification Summary

**Display modifications before save:**

```
================================================================================
BILLING DESIGN EDIT SUMMARY
================================================================================
Document: billing-design.md
Previous Version: {old_version}
New Version: {new_version}
================================================================================

CHANGES APPLIED:

[Subscription Tier Changes]
{list of tier pricing/limit modifications}

[Metering Event Changes]
{list of billable event modifications}

[Payment Integration Changes]
{list of provider configuration modifications}

[Revenue Recognition Changes]
{list of ASC 606/IFRS 15 modifications}

================================================================================
VALIDATION STATUS:

Billing Validation: {PASS|CONDITIONAL|PENDING}
ASC 606 Compliance: {PASS|CONDITIONAL|PENDING}
Re-validation Required: {Yes/No}
{if yes: Run `bmad-bam-billing` Validate mode (step-20-v-*)}

================================================================================
[S] Save changes to {output_folder}/planning-artifacts/billing-design.md
[R] Review changes before saving
[U] Undo and return to edit selection
================================================================================
```

---

## SUCCESS METRICS

- ✅ All requested changes captured and validated
- ✅ Tier pricing consistency checks passed or exceptions documented
- ✅ Metering events aligned with invoice line items
- ✅ Payment provider webhooks updated for changed events
- ✅ Revenue recognition rules preserved or explicitly updated
- ✅ Tax jurisdiction changes propagated to invoice templates
- ✅ Frontmatter version incremented
- ✅ Change Log updated with modification summary
- ✅ Document saved to correct location

---

## FAILURE MODES

- ❌ **Tier consistency violation:** Block change, present resolution options
- ❌ **Metering gap created:** Require explicit override with justification
- ❌ **ASC 606 compliance break:** Require compliance review before saving
- ❌ **Payment webhook mismatch:** Require provider integration update
- ❌ **Save failure:** Retry with backup to alternate location

---

## Verification

- [ ] All requested changes applied
- [ ] Cross-section consistency verified
- [ ] No unintended modifications to unaffected sections
- [ ] Change log updated
- [ ] Artifact saved successfully
- [ ] Multi-tenant considerations preserved

## Outputs

- Updated billing design artifact
- Change log entry
- Edit summary

## Next Step

**Edit mode complete.**

To validate the updated billing design, run validation mode:
- `step-20-v-load.md` - Load artifact and checklist
- `step-21-v-validate.md` - Validate against criteria
- `step-22-v-report.md` - Generate validation report

---

**Navigation:** Edit complete. Enter 'V' to run validation or provide additional changes.
