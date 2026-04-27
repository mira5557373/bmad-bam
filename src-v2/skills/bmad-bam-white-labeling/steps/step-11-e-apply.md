# Step 11: Apply Changes to White-Labeling Design (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER apply changes that create tier inconsistencies (lower tier cannot exceed higher tier features)
- 📖 ALWAYS validate changes against tier hierarchy before applying
- 🔄 ALWAYS preserve document structure and unmodified sections
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ UPDATE frontmatter version after any successful edit
- 📋 DOCUMENT change rationale with tier impact analysis
- 💬 PRESENT diff summary before final save
- ⚠️ FLAG if changes affect multiple tenant configurations
- 🔒 LOCK OEM configurations without explicit user override

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply user-requested changes while maintaining tier consistency
- 💾 Track: Changes applied, version increment, affected tiers
- 📖 Context: Preserve all unmodified customization settings exactly
- 🚫 Do NOT: Auto-modify unrelated tiers or break tier hierarchy
- ⚠️ Gate: OEM/Enterprise changes may require tenant notification
- 🔍 Use web search: If user requests updated customization patterns

---

## Purpose

Apply targeted modifications to the white-labeling design, documenting changes with ADR rationale, maintaining version history, and ensuring tier hierarchy consistency across all customization layers.

---

## YOUR TASK

Apply the user's requested changes to the white-labeling design, validate consistency across tiers and customization layers, update document metadata, and present a summary of modifications with any tenant impact analysis.

---

## Prerequisites

- Step 10 completed: Existing document loaded, modifications identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `customization`
- **Load guide:** `{project-root}/_bmad/bam/data/domains/customization.md`

---

## Actions

### 1. Capture Change Requests

**Document requested modifications:**

| Section | Current Value | Requested Change | Impact Level |
|---------|---------------|------------------|--------------|
| | | | Low/Medium/High |

**Impact Level Definitions:**

| Level | Description | Tenant Impact |
|-------|-------------|---------------|
| **Low** | Documentation updates, minor additions | None |
| **Medium** | Feature availability change within tier | Existing tenants unaffected |
| **High** | Tier restructure, OEM changes | May require tenant migration |

### 2. Validate Tier Hierarchy Consistency

**Pre-flight tier hierarchy checks:**

| Check | Result | Notes |
|-------|--------|-------|
| Tier hierarchy preserved | | Free ⊂ Pro ⊂ Enterprise ⊂ OEM |
| No downgrade in higher tiers | | Feature available in lower tier must be in higher |
| OEM superset complete | | OEM includes all Enterprise features |
| New feature placement | | Assigned to appropriate minimum tier |

**If tier hierarchy violation detected:**

```
================================================================================
TIER HIERARCHY WARNING
================================================================================
Change: {description}
Violation: {violation_description}

This change would break tier hierarchy:
- {specific issue}

Tier rule: Free ⊂ Pro ⊂ Enterprise ⊂ OEM
(Higher tiers must have ALL features of lower tiers)

Options:
[A] Auto-propagate feature to higher tiers
[R] Revise change to respect hierarchy
[C] Cancel this change
================================================================================
```

### 3. Apply Branding Changes

**For branding customization edits:**

| Component | Before | After | Tier Impact |
|-----------|--------|-------|-------------|
| Logo handling | {prev} | {new} | {affected_tiers} |
| Color scheme | {prev} | {new} | {affected_tiers} |
| CSS injection | {prev} | {new} | {affected_tiers} |
| Email templates | {prev} | {new} | {affected_tiers} |
| Document watermarks | {prev} | {new} | {affected_tiers} |

**Propagate dependent changes:**

- If **Logo handling** changes: Update CDN storage references
- If **CSS injection** changes: Update security CSP guidelines
- If **Email templates** change: Update sender configuration references

### 4. Apply Domain Changes

**For domain customization edits:**

| Component | Before | After | Tier Impact |
|-----------|--------|-------|-------------|
| Domain mapping | {prev} | {new} | {affected_tiers} |
| SSL strategy | {prev} | {new} | {affected_tiers} |
| DNS guidance | {prev} | {new} | {affected_tiers} |
| Subdomain allocation | {prev} | {new} | {affected_tiers} |

**Propagate dependent changes:**

- If **SSL strategy** changes: Update certificate automation references
- If **Domain mapping** changes: Update DNS verification flow

### 5. Apply Feature Changes

**For feature customization edits:**

| Component | Before | After | Tier Impact |
|-----------|--------|-------|-------------|
| Feature flags | {prev} | {new} | {affected_tiers} |
| UI visibility | {prev} | {new} | {affected_tiers} |
| Menu customization | {prev} | {new} | {affected_tiers} |
| Role naming | {prev} | {new} | {affected_tiers} |
| Terminology | {prev} | {new} | {affected_tiers} |

### 6. Apply Tier Matrix Changes

**For tier matrix modifications:**

| Feature | Tier | Before | After | Cascade Required |
|---------|------|--------|-------|------------------|
| {feature} | {tier} | {prev} | {new} | {yes/no} |

**Auto-cascade rules:**
- Feature enabled for Free → Must enable for Pro, Enterprise, OEM
- Feature enabled for Pro → Must enable for Enterprise, OEM
- Feature enabled for Enterprise → Must enable for OEM

### 7. Create ADR for Significant Changes

**For significant changes, document architectural decision:**

| Field | Value |
|-------|-------|
| ADR ID | ADR-WL-{number} |
| Title | {Change description} |
| Status | PROPOSED |
| Context | {Why change is needed - business requirement, customer feedback, etc.} |
| Decision | {What we are changing in the white-labeling design} |
| Consequences | {Impact on existing tenants, migration requirements} |
| Supersedes | {Previous ADR if applicable} |
| Affected Tiers | {list of tiers} |

### 8. Update Frontmatter

**Increment version and update metadata:**

```yaml
# Before
version: 1.0.0
date: 2026-04-01

# After
version: 1.1.0
date: 2026-04-26
```

**Version increment rules:**

| Impact Level | Version Increment |
|--------------|-------------------|
| Low | Patch (1.0.0 -> 1.0.1) |
| Medium | Minor (1.0.0 -> 1.1.0) |
| High | Minor (1.0.0 -> 1.1.0) |

### 9. Update Change Log

**Add entry to Change Log section:**

```markdown
## Change Log

| Version | Date | Author | Changes | Affected Tiers |
|---------|------|--------|---------|----------------|
| 1.1.0 | 2026-04-26 | Edit Mode | {summary} | {tiers} |
| 1.0.0 | 2026-04-01 | Create Mode | Initial design | All |
```

### 10. Present Change Summary

**Display modifications before save:**

```
================================================================================
WHITE-LABELING EDIT SUMMARY
================================================================================
Document: white-labeling-design.md
Previous Version: {old_version}
New Version: {new_version}
================================================================================

CHANGES APPLIED:

[Branding Changes]
{list of branding modifications}

[Domain Changes]
{list of domain modifications}

[Feature Changes]
{list of feature modifications}

[Tier Matrix Changes]
{list of tier matrix modifications with cascade info}

================================================================================
TENANT IMPACT ANALYSIS:

Affected Tiers: {tier_list}
Existing Tenant Impact: {none/notification/migration}
{if migration required: List specific migration steps}

================================================================================
[S] Save changes to {output_folder}/planning-artifacts/white-labeling-design.md
[R] Review changes before saving
[U] Undo and return to edit selection
================================================================================
```

### 11. Save Updated Document

**Upon save confirmation:**

1. Write updated document to: `{output_folder}/planning-artifacts/white-labeling-design.md`
2. Preserve all unmodified sections exactly
3. Apply formatting consistently with original

**Post-save notification:**

```
================================================================================
EDIT COMPLETE
================================================================================
Document saved: white-labeling-design.md
Version: {new_version}

{if ADR created}
ADR Created: ADR-WL-{number}
{endif}

{if tenant impact}
IMPORTANT: Changes affect existing tenant configurations.
Review tenant impact analysis before deployment.
{endif}

Next steps:
- [V] Run validation workflow
- [E] Continue editing
- [X] Exit edit mode
================================================================================
```

---

## SUCCESS METRICS

- ✅ All requested changes captured and validated
- ✅ Tier hierarchy checks passed
- ✅ Changes applied to correct customization layers
- ✅ Cascading tier changes propagated correctly
- ✅ ADRs created for significant changes
- ✅ Frontmatter version incremented
- ✅ Change Log updated with tier impact
- ✅ Document saved to correct location
- ✅ Tenant impact analysis completed

---

## FAILURE MODES

- ❌ **Tier hierarchy violation:** Block change, offer auto-cascade or revision
- ❌ **OEM feature regression:** Require explicit override with justification
- ❌ **Cross-reference break:** Identify broken references, require fix
- ❌ **Inconsistent cascade:** Flag features that didn't propagate correctly
- ❌ **Save failure:** Retry with backup to alternate location

---

## Verification

- [ ] All proposed changes reviewed with user
- [ ] Tier hierarchy validated
- [ ] ADRs created for significant changes
- [ ] Modifications applied correctly
- [ ] Cascading changes propagated
- [ ] Version history updated
- [ ] Cross-references validated
- [ ] Tenant impact documented
- [ ] Document saved successfully

---

## Outputs

- Updated white-labeling design document
- New/updated ADR records (ADR-WL-{number})
- Change log entry with tier impact
- Tenant impact analysis (if applicable)
- Cross-reference validation report

---

## Next Step

Edit mode complete.

**If tenant impact identified:**
Review impact analysis and plan communication/migration before deployment.

**Standard next step:**
Run validation mode (`step-20-v-*`) to verify changes meet quality criteria.
