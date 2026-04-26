# Step 11: Apply Scaling Design Modifications (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply targeted modifications while preserving unchanged sections
- 💾 Track: Update document version and modification log
- 📖 Context: Reference original values when applying changes
- 🚫 Do NOT: Modify sections not identified in Step 10
- 🔍 Use web search: Verify significant changes against current best practices

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

## COLLABORATION MENUS (A/P/C)

After applying modifications, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Review specific changes in detail
- **P (Party Mode)**: Get architect validation of changes
- **C (Continue)**: Save modified document and complete Edit mode

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: modifications applied, consistency check results
- Process enhanced insights on change impact
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review modifications to scaling design for consistency"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Save modified document to: `{output_folder}/planning-artifacts/scaling-design.md`
- Edit mode complete

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
