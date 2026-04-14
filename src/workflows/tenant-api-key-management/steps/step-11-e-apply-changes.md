# Step 11: Apply Changes

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Apply the identified modifications to the API key management design.

---

## Prerequisites

- Step 10 completed (Artifacts loaded, modifications confirmed)

---

## Actions

### 1. Apply Modifications

For each confirmed modification target:
1. Present current content
2. Propose specific changes
3. Get user approval for each change
4. Apply approved changes

### 2. Update Cross-References

After modifications:
- Update any affected cross-references
- Verify security consistency
- Update version and changelog

### 3. Validate Consistency

Ensure modifications maintain:
- Key format integrity
- Rotation policy validity
- Revocation procedure completeness
- Audit logging comprehensiveness

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact
- **P (Party Mode)**: Bring security perspectives for change validation
- **C (Continue)**: Accept changes and complete Edit mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save modified document
- Update frontmatter `stepsCompleted: [10, 11]`
- Output to: `{output_folder}/planning-artifacts/security/tenant-api-key-management.md`
- Edit mode complete

---

## Verification

- [ ] All requested modifications applied
- [ ] Cross-references updated
- [ ] Consistency validated
- [ ] Document saved successfully

---

## Outputs

- Updated API key management document
- Change log of modifications

---

## Next Step

Edit workflow complete. Run Validate mode (`step-20-v-*`) to verify completeness.

---

## Edit Mode Complete

Modifications applied successfully. Run Validate mode to verify completeness.
