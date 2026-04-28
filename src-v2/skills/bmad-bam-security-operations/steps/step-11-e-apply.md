# Step 11: Apply Changes to Security Operations Design (Edit Mode)

## MANDATORY EXECUTION RULES

- STOP NEVER apply changes without user confirmation
- READ ALWAYS preserve existing content not being modified
- LOOP ALWAYS update document version in frontmatter
- PAUSE **ALWAYS pause after presenting changes** and await user approval
- CHECK VALIDATE changes against QG-S3 and QG-IR requirements
- LIST PRESENT diff summary before finalizing
- WARN FLAG if changes may invalidate quality gate status
- TARGET MAINTAIN document structure and cross-references

---

## EXECUTION PROTOCOLS

- TARGET Focus: Apply user-requested changes to security operations design
- SAVE Track: Document all modifications with timestamps
- READ Context: Build on step-10 edit targets
- STOP Do NOT: Remove content without explicit user request
- WARN Gate: Significant changes require QG-S3/QG-IR re-validation
- SEARCH Use web search: Verify changes align with current best practices

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Applying user-requested modifications
- Updating document version
- Preserving existing content

**OUT OF SCOPE:**
- Creating new sections not requested
- Validation (use Validate mode after edits)
- Deleting entire sub-workflows

## YOUR TASK

Apply the user-requested changes to the security operations design document. Preserve all content not being modified, update version information, and flag any changes that may impact quality gate compliance.

---

## Purpose

Apply modifications to the security operations design while preserving existing content, maintaining document integrity, and flagging compliance implications.

---

## Prerequisites

- Step 10 completed: Edit targets identified
- User has selected specific sections to modify
- **Load artifact:** `{output_folder}/planning-artifacts/security-operations.md`

**Web Research (Conditional):**

If updating security practices:
Search the web: "secrets management best practices {date}"
Search the web: "incident response SaaS updates {date}"

---

## Actions

### 1. Apply Section-Specific Changes

Based on user selection from step-10:

#### If Secrets Management (ZSR) Selected:

| Modification Type | Action | Impact |
|-------------------|--------|--------|
| Add secret type | Append to secret inventory | Low |
| Update rotation policy | Modify rotation schedule | Medium |
| Change vault provider | Update provider config | High - requires re-validation |
| Update agent credentials | Modify token policies | Medium |

#### If Threat Modeling (ZST) Selected:

| Modification Type | Action | Impact |
|-------------------|--------|--------|
| Add component | Add to STRIDE matrix | Low |
| Update threat rating | Modify risk assessment | Medium |
| Add attack tree | Append to attack trees | Low |
| Update mitigation | Modify control mapping | Medium |

#### If Incident Response (ZIR) Selected:

| Modification Type | Action | Impact |
|-------------------|--------|--------|
| Update SLA | Modify response times | High - notify stakeholders |
| Update escalation | Modify contact list | Medium |
| Add runbook | Append new runbook | Low |
| Update notification | Modify templates | Medium |

### 2. Preserve Existing Content

For each section NOT being modified:
- [ ] Content unchanged
- [ ] Cross-references intact
- [ ] Version history preserved

### 3. Update Document Metadata

Update frontmatter:

```yaml
---
version: {increment version}
lastModified: {current date}
modifiedSections: [{list of modified sections}]
qgStatus:
  QG-S3: {pending re-validation if significant changes}
  QG-IR: {pending re-validation if significant changes}
changeLog:
  - date: {current date}
    sections: [{modified sections}]
    summary: "{brief description of changes}"
---
```

### 4. Validate Cross-References

Ensure all cross-references remain valid:

| Reference Type | Check | Status |
|----------------|-------|--------|
| Pattern references | Paths still valid | OK/BROKEN |
| Checklist references | QG files exist | OK/BROKEN |
| Runbook links | Internal links work | OK/BROKEN |
| Template references | Templates exist | OK/BROKEN |

### 5. Quality Gate Impact Assessment

Assess impact on quality gates:

| Change | QG-S3 Impact | QG-IR Impact | Re-validation Needed |
|--------|--------------|--------------|---------------------|
| {change 1} | {none/minor/major} | {none/minor/major} | {yes/no} |
| {change 2} | {none/minor/major} | {none/minor/major} | {yes/no} |

**Re-validation Triggers:**
- Vault provider change -> QG-S3 re-validation
- Rotation policy change -> QG-S3 re-validation
- SLA change -> QG-IR re-validation
- Escalation path change -> QG-IR re-validation
- Any "major" impact change -> Full re-validation

### 6. Present Change Summary

Display diff summary:

```
================================================================================
SECURITY OPERATIONS - CHANGE SUMMARY
================================================================================
Document: security-operations.md
Previous Version: {old_version}
New Version: {new_version}
================================================================================

CHANGES APPLIED:

Section: {section_name}
- ADDED: {description}
- MODIFIED: {description}
- REMOVED: {description}

Section: {section_name}
- ADDED: {description}
- ...

================================================================================

QUALITY GATE STATUS:
- QG-S3: {current status} -> {new status}
- QG-IR: {current status} -> {new status}

RE-VALIDATION REQUIRED: {yes/no}
{If yes, list specific gates}

================================================================================
Options:
- **A (Accept)**: Save changes and proceed
- **R (Revert)**: Discard changes and return to edit selection
- **M (Modify)**: Make additional changes before saving

Select an option:
```

---

## COLLABORATION MENUS (A/R/M):

After presenting change summary:

### If 'A' (Accept):
- Save modified document
- Update version history
- Flag for re-validation if needed
- Complete edit mode

### If 'R' (Revert):
- Discard all changes
- Return to step-10 for new edit selection

### If 'M' (Modify):
- Allow additional changes
- Re-present change summary

---

## SUCCESS METRICS

- CHECK All requested changes applied
- CHECK Existing content preserved
- CHECK Document metadata updated
- CHECK Cross-references validated
- CHECK Quality gate impact assessed
- CHECK Change summary presented and accepted
- CHECK Document saved with new version

---

## FAILURE MODES

- X **Conflicting changes:** Present conflict and request resolution
- X **Broken references:** Offer to fix or flag for manual review
- X **Invalid structure:** Reject changes that break document format
- X **User rejection:** Revert to previous version

---

## Verification

- [ ] Requested changes applied correctly
- [ ] Unmodified sections preserved
- [ ] Document version incremented
- [ ] Change log updated
- [ ] Quality gate impact documented
- [ ] User accepted changes

---

## Outputs

- Updated security operations document
- Change log entry
- Quality gate status update
- Re-validation flags (if applicable)

---

## Next Step

Based on quality gate impact:
- **No re-validation:** Edit complete, document updated
- **Re-validation needed:** Proceed to `step-20-v-load.md` for validation mode
