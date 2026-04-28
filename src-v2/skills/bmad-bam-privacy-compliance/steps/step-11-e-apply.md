# Step 11: Apply Privacy Compliance Changes

## MANDATORY EXECUTION RULES

- NEVER modify sections not selected for edit
- ALWAYS preserve existing content in non-edited sections
- ALWAYS maintain tenant isolation in all changes
- **ALWAYS pause after applying changes** and await user confirmation
- VALIDATE changes don't break QG-CC compliance
- UPDATE frontmatter with new version and modification date
- PRESENT diff summary showing what changed
- FLAG if changes require re-validation

---

## EXECUTION PROTOCOLS

- Focus: Apply user-requested changes to privacy compliance design
- Track: `stepsCompleted: [10, 11]` when complete
- Context: Maintain privacy compliance integrity
- Do NOT: Modify unselected sections
- Gate: Major changes invalidate QG-CC status
- Use web search: If user requests updated compliance patterns

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Applying requested changes
- Preserving existing content
- Updating version metadata

**OUT OF SCOPE:**
- Creating new artifacts (use Create mode)
- Validation (use Validate mode)
- Loading artifacts (previous step)

## YOUR TASK

Apply the user's requested changes to the selected sections of the privacy compliance design. Preserve all non-selected sections. Update frontmatter with new version. Present a summary of changes for user confirmation.

---

## Purpose

Apply requested changes to the privacy compliance artifact while preserving integrity of non-modified sections and maintaining tenant isolation.

## Prerequisites

- Step 10 completed with artifact loaded
- User has selected sections to edit
- User has provided change instructions

## Actions

### 1. Validate Change Request

Verify the requested changes:

| Validation | Check | Status |
|------------|-------|--------|
| Section exists | Selected section is in document | [Pass/Fail] |
| Change scope | Changes within section boundaries | [Pass/Fail] |
| Tenant isolation | Changes maintain isolation | [Pass/Fail] |
| Compliance impact | Changes don't break requirements | [Pass/Fail] |

### 2. Apply Section Changes

For each selected section, apply changes:

**Section Change Protocol:**
```
1. Load current section content
2. Apply user modifications
3. Validate changes:
   - Consent proof still captured
   - Lawful basis still documented
   - Rights still implementable
   - Tenant isolation preserved
4. Update section content
5. Mark section as modified
```

### 3. Handle Compliance-Sensitive Changes

Changes that require special handling:

| Change Type | Impact | Required Action |
|-------------|--------|-----------------|
| New processing activity | Lawful basis needed | Add to basis tracking |
| Remove consent purpose | Withdrawal needed | Document migration |
| Change export format | Portability affected | Verify compliance |
| New framework | Additional requirements | Add to checklist |
| Remove right | Compliance risk | Block without justification |

### 4. Update Document Metadata

```yaml
frontmatter_updates:
  version: increment_minor
  modified_at: current_timestamp
  modified_by: user_identifier
  sections_modified:
    - section_name_1
    - section_name_2
  validation_status: "requires_revalidation"  # If major changes
  change_summary: "Brief description of changes"
```

### 5. Present Change Summary

**Display changes for confirmation:**

```
================================================================================
PRIVACY COMPLIANCE - CHANGES APPLIED
================================================================================

MODIFIED SECTIONS:
1. [Section Name]
   - Change: [Description]
   - Impact: [None | Minor | Major]

2. [Section Name]
   - Change: [Description]
   - Impact: [None | Minor | Major]

PRESERVED SECTIONS:
- [List of unchanged sections]

VALIDATION STATUS:
- Previous: {previous_status}
- Current: {new_status}
- Re-validation: [Required | Recommended | Not Required]

VERSION:
- Previous: {old_version}
- New: {new_version}

================================================================================
Confirm changes? [Y/N]
```

### 6. Write Updated Artifact

Save the modified document:

```
{output_folder}/planning-artifacts/compliance/privacy-compliance.md
```

**Backup Protocol:**
- Create backup at `privacy-compliance.{timestamp}.bak.md`
- Write new version
- Verify write success
- Log change event

---

## SUCCESS METRICS

- All requested changes applied
- Non-selected sections preserved
- Tenant isolation maintained
- Frontmatter updated with new version
- Change summary presented and confirmed
- Artifact written successfully
- Backup created

---

## FAILURE MODES

- **Invalid change:** Reject change, explain why, request alternative
- **Breaks compliance:** Block change, explain impact, suggest compliant alternative
- **Section not found:** Verify section name, suggest corrections
- **Write failure:** Retry, or escalate to user
- **Backup failure:** Warn user, proceed with caution

---

## Verification

- [ ] All requested changes applied correctly
- [ ] Non-modified sections unchanged
- [ ] Tenant isolation verified
- [ ] Frontmatter updated
- [ ] User confirmed changes
- [ ] Artifact saved successfully

## Outputs

- Updated privacy compliance artifact
- Backup of previous version
- Change log entry

## Next Step

Edit mode complete. Run **Validate mode** to verify QG-CC compliance after changes.

---

**Navigation:** Enter 'V' to validate, or 'C' to continue editing
