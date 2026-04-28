# Step 11: Apply Scaling Design Modifications (Edit Mode)

## MANDATORY EXECUTION RULES

- 🛑 NEVER apply changes that violate scaling consistency or tier hierarchies
- 📖 ALWAYS validate changes against noisy neighbor prevention requirements
- 🔄 ALWAYS preserve document structure and unmodified sections
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ UPDATE frontmatter version after any successful edit
- 📋 DOCUMENT change rationale in Change Log section
- 💬 PRESENT diff summary before final save
- ⚠️ FLAG if changes require scaling policy re-validation
- 🔒 LOCK critical autoscaling thresholds without explicit user override

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply targeted modifications while preserving unchanged sections
- 💾 Track: Update document version and modification log
- 📖 Context: Reference original values when applying changes
- 🚫 Do NOT: Modify sections not identified in Step 10
- 🔍 Use web search: Verify significant changes against current best practices

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

Apply the user's requested changes to the scaling design, validate consistency across all scaling dimensions (horizontal, database, tenant-aware), update document metadata, and present a summary of modifications with any re-validation requirements.

---

## Purpose

Apply the requested modifications to the scaling design document while maintaining consistency with unmodified sections and documenting all changes.

---

## Prerequisites

- Step 10 complete with modification targets identified
- Original document loaded and parsed
- User confirmation of modification scope

**Web Research (If Significant Changes):**

Search the web: "{specific modification topic} best practices {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Review Modification Scope

Confirm the identified modifications:

| Section | Modification Type | Current Value | New Value |
|---------|-------------------|---------------|-----------|
| {section} | {add/update/remove} | {current} | {proposed} |

### 2. Apply Horizontal Scaling Changes

If modifying horizontal scaling:

| Setting | Before | After | Rationale |
|---------|--------|-------|-----------|
| Min replicas | {old} | {new} | {reason} |
| Max replicas | {old} | {new} | {reason} |
| Scale-up threshold | {old} | {new} | {reason} |
| Scale-down threshold | {old} | {new} | {reason} |

### 3. Apply Database Scaling Changes

If modifying database scaling:

| Setting | Before | After | Rationale |
|---------|--------|-------|-----------|
| Read replica count | {old} | {new} | {reason} |
| Pool size (Free) | {old} | {new} | {reason} |
| Pool size (Pro) | {old} | {new} | {reason} |
| Pool size (Enterprise) | {old} | {new} | {reason} |
| Shard count | {old} | {new} | {reason} |

### 4. Apply Tenant-Aware Scaling Changes

If modifying tenant-aware scaling:

| Setting | Before | After | Rationale |
|---------|--------|-------|-----------|
| Free quota | {old} | {new} | {reason} |
| Pro quota | {old} | {new} | {reason} |
| Enterprise quota | {old} | {new} | {reason} |
| Cache allocation | {old} | {new} | {reason} |
| Queue priority | {old} | {new} | {reason} |

### 5. Apply Capacity Planning Changes

If modifying capacity planning:

| Setting | Before | After | Rationale |
|---------|--------|-------|-----------|
| Growth projection | {old} | {new} | {reason} |
| Headroom buffer | {old} | {new} | {reason} |
| Review cadence | {old} | {new} | {reason} |

### 6. Apply Cost Optimization Changes

If modifying cost optimization:

| Setting | Before | After | Rationale |
|---------|--------|-------|-----------|
| Budget alerts | {old} | {new} | {reason} |
| Reserved ratio | {old} | {new} | {reason} |
| Optimization targets | {old} | {new} | {reason} |

### 7. Apply Runbook Changes

If modifying runbooks:

| Runbook | Change Type | Description |
|---------|-------------|-------------|
| Scale-up | {add/update/remove step} | {description} |
| Scale-down | {add/update/remove step} | {description} |
| Emergency | {add/update/remove step} | {description} |
| Database | {add/update/remove step} | {description} |

### 8. Update Document Metadata

Update the document header:

| Field | Value |
|-------|-------|
| Version | {increment} |
| Last Modified | {current date} |
| Modified By | {user/agent} |
| Change Summary | {brief description} |

### 9. Verify Consistency

Ensure modifications are consistent with unmodified sections:

| Check | Status | Notes |
|-------|--------|-------|
| Cross-references valid | PASS/FAIL | {details} |
| Tier alignment | PASS/FAIL | {details} |
| Runbook sync | PASS/FAIL | {details} |
| No orphaned sections | PASS/FAIL | {details} |

---

## SUCCESS METRICS

- ✅ All requested changes captured and validated
- ✅ Consistency checks passed or exceptions documented
- ✅ Autoscaling policies updated correctly with valid thresholds
- ✅ Tier-based resource limits maintain proper hierarchy (Free < Pro < Enterprise)
- ✅ Noisy neighbor prevention controls preserved
- ✅ Frontmatter version incremented appropriately
- ✅ Change Log updated with modification summary
- ✅ Document saved to correct location
- ✅ Re-validation requirements communicated

---

## FAILURE MODES

- ❌ **Consistency violation:** Block change, present resolution options
- ❌ **Tier hierarchy break:** Warn that lower tiers cannot exceed upper tier limits
- ❌ **Noisy neighbor gap:** Require isolation controls before saving
- ❌ **Invalid autoscaling thresholds:** Block scale-down threshold >= scale-up threshold
- ❌ **Save failure:** Retry with backup to alternate location

---

## Verification

- [ ] All identified modifications applied
- [ ] Change rationale documented for each modification
- [ ] Document version updated
- [ ] Consistency checks passed
- [ ] Unmodified sections preserved
- [ ] Document saved successfully

---

## Outputs

- Updated scaling design document
- Change log with before/after values
- Consistency verification results
- **Output to:** `{output_folder}/planning-artifacts/scaling-design.md`

---

## Next Step

Edit mode complete. The modified scaling design document has been saved.

Run Validate mode (`step-20-v-*`) to verify the modified design meets quality criteria.
