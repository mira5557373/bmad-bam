# Step 11: Apply Changes to Data Residency Design (Edit Mode)

## MANDATORY EXECUTION RULES

- 🛑 NEVER apply changes that violate data sovereignty requirements
- 📖 ALWAYS validate changes against GDPR, CCPA, LGPD before applying
- 🔄 ALWAYS preserve document structure and unmodified sections
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ UPDATE frontmatter version after any successful edit
- 📋 DOCUMENT change rationale in ADR and Change Log sections
- 💬 PRESENT diff summary before final save
- ⚠️ FLAG if changes require data sovereignty re-assessment
- 🔒 LOCK critical cross-border transfer rules without explicit DPO override

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply user-requested changes while maintaining data sovereignty
- 💾 Track: Changes applied, version increment, compliance impact
- 📖 Context: Preserve all unmodified content exactly
- 🚫 Do NOT: Auto-modify unrelated sections or weaken residency controls
- ⚠️ Gate: Critical residency changes require GDPR/CCPA re-validation
- 🔍 Use web search: If user requests updated regional compliance patterns

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

Apply the user's requested changes to the data residency design, validate consistency across all regions and compliance zones, update document metadata and ADRs, and present a summary of modifications with any data sovereignty implications.

---

## Purpose

Apply targeted modifications to the data residency design, documenting changes with ADR rationale and ensuring compliance consistency.

---

## Prerequisites

- Step 10 completed: Existing document loaded
- Modification targets identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: data-residency
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Actions

### 1. Review Proposed Changes

Present each proposed change with impact analysis:

| Section | Current State | Proposed Change | Impact | Risk |
|---------|---------------|-----------------|--------|------|
| {section} | {current} | {proposed} | {impact} | {risk level} |

### 2. Assess Compliance Impact

For each change, verify compliance implications:

| Change | GDPR Impact | CCPA Impact | LGPD Impact | Other |
|--------|-------------|-------------|-------------|-------|
| {change} | {impact} | {impact} | {impact} | {impact} |

### 3. Create ADR for Changes

Document architectural decision for significant changes:

| Field | Value |
|-------|-------|
| ADR ID | ADR-DR-{number} |
| Title | {Change description} |
| Status | PROPOSED |
| Context | {Why change is needed} |
| Decision | {What we're changing} |
| Consequences | {Impact of change} |
| Compliance Review | {Compliance sign-off status} |

### 4. Apply Modifications

For each approved change:

| Step | Action | Verification |
|------|--------|--------------|
| 1 | Update the relevant section | Content matches intent |
| 2 | Update cross-references | All refs valid |
| 3 | Update compliance matrix | No violations |
| 4 | Update region mappings | Consistency check |
| 5 | Update DR configuration | DR still viable |
| 6 | Increment version | Version bumped |

### 5. Verify Change Consistency

Run consistency checks:

| Check | Status | Notes |
|-------|--------|-------|
| Region references consistent | {PASS/FAIL} | {notes} |
| Compliance zones aligned | {PASS/FAIL} | {notes} |
| DR strategy compatible | {PASS/FAIL} | {notes} |
| API routing updated | {PASS/FAIL} | {notes} |
| Edge config aligned | {PASS/FAIL} | {notes} |

### 6. Update Document Metadata

Update frontmatter:

```yaml
---
version: {incremented version}
lastModified: {date}
changeLog:
  - date: {date}
    change: {description}
    adr: ADR-DR-{number}
---
```

### 7. Present Change Summary

**Display modifications before save:**

```
================================================================================
DATA RESIDENCY EDIT SUMMARY
================================================================================
Document: data-residency-design.md
Previous Version: {old_version}
New Version: {new_version}
================================================================================

CHANGES APPLIED:

[Regional Changes]
{list of region modifications}

[Compliance Zone Changes]
{list of compliance zone modifications}

[Replication Policy Changes]
{list of cross-border transfer rule modifications}

[DR Strategy Changes]
{list of disaster recovery modifications}

================================================================================
DATA SOVEREIGNTY IMPACT:

GDPR Impact: {None|Minor|Major|Requires DPO Review}
CCPA Impact: {None|Minor|Major|Requires Legal Review}
Cross-Border: {transfers_affected} cross-border policies affected
Re-validation Required: {Yes/No}
{if yes: Run `bmad-bam-data-residency` Validate mode (step-20-v-*)}

================================================================================
[S] Save changes to {output_folder}/planning-artifacts/data-residency-design.md
[R] Review changes before saving
[U] Undo and return to edit selection
================================================================================
```

---

## SUCCESS METRICS

- ✅ All requested changes captured and validated
- ✅ Data sovereignty consistency checks passed or exceptions documented
- ✅ Regional configurations updated correctly
- ✅ Dependent replication policies propagated
- ✅ Frontmatter version incremented
- ✅ ADR created with compliance rationale
- ✅ Change Log updated with modification summary
- ✅ Document saved to correct location
- ✅ Data sovereignty implications communicated

---

## FAILURE MODES

- ❌ **Data sovereignty violation:** Block change, present resolution options
- ❌ **Cross-border gap created:** Require explicit DPO override with justification
- ❌ **Region conflict:** Warn that change creates compliance zone overlap
- ❌ **DR compliance break:** Require DR policy update before saving
- ❌ **Save failure:** Retry with backup to alternate location

---

## Verification

- [ ] All changes applied correctly
- [ ] Compliance impact assessed
- [ ] ADR created and linked
- [ ] Cross-references updated
- [ ] Version history updated
- [ ] Document consistency verified

---

## Outputs

- Updated data residency design document
- ADR for changes
- Change log entry
- Compliance impact assessment

---

## Next Step

Edit workflow complete. Run Validate mode (`step-20-v-*`) to verify changes meet quality criteria.

---

## Workflow Complete

Edit mode is complete. Changes have been applied with:
- ADR documentation
- Compliance impact assessment
- Version history update

Run Validate mode to verify changes meet quality criteria.
