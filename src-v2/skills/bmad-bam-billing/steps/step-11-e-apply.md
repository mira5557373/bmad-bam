# Step 11: Apply Billing Design Changes

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply specific changes to billing design while maintaining consistency
- 💾 Track: `stepsCompleted: [10, 11]` when complete
- 📖 Context: Maintain overall design coherence when applying changes
- 🚫 Do NOT: Make changes beyond user request; preserve unaffected sections
- 🔍 Use web search: Verify changes against current best practices if significant

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
