# Step 11: Apply Changes to Compliance Design (Edit Mode)

## MANDATORY EXECUTION RULES

- 🛑 NEVER apply changes that break compliance framework consistency
- 📖 ALWAYS validate changes against QG-CC and QG-P1 critical checks before applying
- 🔄 ALWAYS preserve document structure and unmodified sections
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ UPDATE frontmatter version after any successful edit
- 📋 DOCUMENT change rationale in ADR and Change Log sections
- 💬 PRESENT diff summary before final save
- ⚠️ FLAG if changes require compliance re-certification
- 🔒 LOCK critical audit controls without explicit compliance officer override

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply user-requested changes while maintaining compliance consistency
- 💾 Track: Changes applied, version increment, QG-CC impact
- 📖 Context: Preserve all unmodified content exactly
- 🚫 Do NOT: Auto-modify unrelated sections or weaken controls
- ⚠️ Gate: Critical compliance changes require re-validation warning
- 🔍 Use web search: If user requests updated regulatory patterns for specific changes

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

Apply the user's requested changes to the compliance design, validate consistency across all frameworks, update document metadata and ADRs, and present a summary of modifications with any re-certification requirements.

---

## Purpose

Apply targeted modifications to the compliance design, documenting changes with ADR rationale and maintaining version history.

---

## Prerequisites

- Step 10 completed: Existing documents loaded, modifications identified
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

---

## Actions

### 1. Review Proposed Changes

Present each proposed change with impact:

| Section | Current State | Proposed Change | Impact | Risk |
|---------|---------------|-----------------|--------|------|
| {section} | {current} | {proposed} | {impact} | Low/Medium/High |

### 2. Create ADR for Changes

Document architectural decision for each significant change:

| Field | Value |
|-------|-------|
| ADR ID | ADR-COMP-{number} |
| Title | {Change description} |
| Status | PROPOSED -> ACCEPTED |
| Context | {Why change is needed - regulatory update, audit finding, etc.} |
| Decision | {What we're changing} |
| Consequences | {Impact of change on compliance posture} |
| Compliance Impact | {Frameworks affected} |

### 3. Apply Modifications by Category

#### Framework Updates

| Framework | Previous | Updated | Changes Applied |
|-----------|----------|---------|-----------------|
| {framework} | {old version/state} | {new version/state} | {specific changes} |

#### Data Governance Updates

| Data Type | Previous Classification | Updated Classification | Handling Changes |
|-----------|-------------------------|------------------------|------------------|
| {type} | {old} | {new} | {changes} |

#### Audit Control Updates

| Control Category | Previous State | Updated State | Justification |
|------------------|----------------|---------------|---------------|
| {category} | {old} | {new} | {reason} |

#### Monitoring Updates

| Check Type | Previous | Updated | Frequency Change |
|------------|----------|---------|------------------|
| {check} | {old} | {new} | {change} |

### 4. Update Control Mappings

Revise framework-to-control mappings:

| Control | SOC2 | GDPR | HIPAA | PCI-DSS | Change Type |
|---------|------|------|-------|---------|-------------|
| {control} | {mapping} | {mapping} | {mapping} | {mapping} | ADD/MODIFY/REMOVE |

### 5. Update Implementation Roadmap

Adjust roadmap for changes:

| Phase | Original Timeline | Updated Timeline | Justification |
|-------|-------------------|------------------|---------------|
| {phase} | {original} | {updated} | {reason} |

### 6. Version History Update

Add change log entry:

```markdown
## Change Log

### Version {X.Y.Z} - {{date}}
- **ADR-COMP-{N}**: {Change summary}
- Updated {framework} requirements per {regulation update}
- Modified {section} to address {audit finding/requirement}
- Author: {author}
- Approved by: {approver}
```

### 7. Verify Changes

Run verification checks:

- [ ] Changes applied correctly to all affected sections
- [ ] No broken cross-references
- [ ] ADR documented and linked
- [ ] Version incremented appropriately
- [ ] Control mappings updated
- [ ] Roadmap adjusted if needed

### 8. Present Change Summary

**Display modifications before save:**

```
================================================================================
COMPLIANCE DESIGN EDIT SUMMARY
================================================================================
Document: compliance-design.md
Previous Version: {old_version}
New Version: {new_version}
================================================================================

CHANGES APPLIED:

[Framework Changes]
{list of framework modifications}

[Data Governance Changes]
{list of data classification modifications}

[Audit Control Changes]
{list of audit control modifications}

[Monitoring Changes]
{list of monitoring modifications}

================================================================================
VALIDATION STATUS:

QG-CC Status: {PASS|CONDITIONAL|PENDING}
QG-P1 Impact: {None|Affected|Re-certification Required}
Re-validation Required: {Yes/No}
{if yes: Run `bmad-bam-compliance` Validate mode (step-20-v-*)}

================================================================================
[S] Save changes to {output_folder}/planning-artifacts/compliance-design.md
[R] Review changes before saving
[U] Undo and return to edit selection
================================================================================
```

---

## SUCCESS METRICS

- ✅ All requested changes captured and validated
- ✅ Compliance consistency checks passed or exceptions documented
- ✅ Framework mappings updated correctly
- ✅ Dependent control mappings propagated
- ✅ Frontmatter version incremented
- ✅ ADR created with compliance rationale
- ✅ Change Log updated with modification summary
- ✅ Document saved to correct location
- ✅ Re-certification requirements communicated

---

## FAILURE MODES

- ❌ **Compliance consistency violation:** Block change, present resolution options
- ❌ **Control gap created:** Require explicit compliance officer override with justification
- ❌ **Framework conflict:** Warn that control cannot satisfy both framework requirements
- ❌ **Audit trail break:** Require audit mechanism update before saving
- ❌ **Save failure:** Retry with backup to alternate location

---

## Verification

- [ ] All proposed changes applied correctly
- [ ] ADR created for each significant change
- [ ] Version history updated with change log
- [ ] Control mappings revised
- [ ] Implementation roadmap adjusted
- [ ] Document consistency verified
- [ ] No orphaned references

---

## Outputs

- Updated compliance design document
- ADRs for changes made
- Change log entry
- Updated control mappings

---

## Next Step

Edit workflow complete. Run Validate mode (`step-20-v-*`) to verify changes meet quality criteria and compliance requirements.

---

## Edit Mode Complete

Compliance design modifications have been applied. All changes are documented with ADR rationale and version history. Run validation to ensure the updated design meets all quality gate requirements.
