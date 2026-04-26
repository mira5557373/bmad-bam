# Step 11: Apply Changes to Master Architecture

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER modify master architecture without explicit user change requests
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: Preserve ALL unchanged master architecture content exactly as-is
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ CRITICAL: Validate consistency before applying ANY changes to master architecture
- 📋 Document change rationale in the master architecture's revision history
- 💬 Confirm changes with user before saving master architecture
- 🔒 Update frontmatter version and timestamp after master architecture changes
- ⚠️ FROZEN section changes (tenant model, AI runtime) MUST trigger QG-F1 PENDING status
- 🔗 Module boundary changes MUST cascade to affected facade contracts
- 🎯 VALIDATE that changes maintain tenant-model-module alignment

---

## EXECUTION PROTOCOLS

- 🎯 Show change summary and impact analysis before applying
- 💾 Preserve document structure and formatting
- 📖 Reference pattern registry to validate pattern compatibility
- 🚫 DO NOT apply changes that break tenant-model-module alignment
- ⚠️ Flag consistency violations before proceeding
- 🔍 Use web search to verify updated patterns if tenant model or AI runtime changes

---

## YOUR TASK

Apply the user's selected changes to the master architecture document loaded in step-10. For FROZEN section changes (tenant model, AI runtime), validate cascading impacts and set QG-F1 to PENDING. For MUTABLE section changes (patterns, modules, appendices), validate consistency and apply directly. Update frontmatter version, add Change Log entry, present diff summary for user approval, and save the updated master architecture document.

---

## Apply Sequence

### 1. Capture Change Requests

Gather specific changes the user wants to make:

| Change Category | Description | Impact Level |
|-----------------|-------------|--------------|
| Tenant Model | Switch isolation strategy (RLS/Schema/Database) | HIGH - cascades to modules |
| AI Runtime | Change orchestration framework | HIGH - affects tool contracts |
| Module Boundary | Add/remove/merge modules | MEDIUM - affects contracts |
| Pattern Selection | Swap architectural patterns | MEDIUM - affects implementation |
| Tier Configuration | Modify tenant tier definitions | LOW - contained change |
| Metadata Update | Update version, author, dates | LOW - no architectural impact |

**Ask user:** "What changes do you want to make to the master architecture?"

**Capture changes in structured format:**

```yaml
changes:
  - category: {tenant_model|ai_runtime|module_boundary|pattern|tier|metadata}
    description: {what is changing}
    from: {current value}
    to: {new value}
    rationale: {why this change}
```

---

### 2. Validate Change Consistency

Before applying, validate changes don't break architectural consistency:

**Tenant Model Changes:**

| If Changing To | Verify |
|----------------|--------|
| RLS | Module boundaries don't require schema isolation |
| Schema-per-tenant | Connection pooling strategy updated |
| Database-per-tenant | Deployment automation accounts for DB provisioning |

**AI Runtime Changes:**

| If Changing To | Verify |
|----------------|--------|
| LangGraph | Tool contracts support state machine patterns |
| CrewAI | Agent definitions support role delegation |
| AutoGen | Conversation patterns defined |

**Module Boundary Changes:**

| Change Type | Verify |
|-------------|--------|
| Add module | No overlapping responsibility with existing modules |
| Remove module | Capabilities absorbed by other modules |
| Merge modules | Combined contracts don't conflict |

**Reference patterns from registry:**

Read: `{project-root}/_bmad/bam/data/patterns/bam-patterns.csv`

Filter for related patterns based on change category.

**If consistency violation detected:**

```markdown
## Consistency Warning

The requested change creates a conflict:
- **Issue:** {description of conflict}
- **Affected components:** {list}
- **Resolution options:**
  1. {option 1}
  2. {option 2}
  3. Cancel change
  
Which option do you prefer?
```

---

### 3. Apply Changes to Document

Update the master architecture document sections:

| Section | When to Update |
|---------|----------------|
| Frontmatter | Always (version, updated date) |
| Executive Summary | If tenant model or AI runtime changes |
| Tenant Model | If isolation strategy changes |
| Module Registry | If module boundaries change |
| Cross-Cutting Concerns | If patterns affecting all modules change |
| Quality Gates | If changes affect gate criteria |
| Change Log | Always (document this change) |

**Update frontmatter:**

```yaml
version: {increment_minor or increment_patch}
updated: {current_date}  # YYYY-MM-DD format
change_summary: "{brief description of changes}"
```

**Add to Change Log section:**

```markdown
### v{version} - {date}

- **Changed:** {what changed}
- **Rationale:** {why}
- **Impact:** {HIGH|MEDIUM|LOW}
- **Validated:** Consistency check passed
```

---

### 4. Verify Changes Applied

Confirm all changes were applied correctly:

| Check | Status |
|-------|--------|
| All requested changes applied | [ ] |
| No unintended modifications | [ ] |
| Frontmatter version updated | [ ] |
| Frontmatter date updated | [ ] |
| Change Log entry added | [ ] |
| Document structure preserved | [ ] |
| Cross-references still valid | [ ] |

**Present change summary to user:**

```markdown
## Change Summary

**Document:** master-architecture.md
**Previous Version:** {old_version}
**New Version:** {new_version}

### Changes Applied

1. {change 1 description}
2. {change 2 description}
...

### Unchanged Sections

- {list sections not modified}

Confirm these changes are correct before saving?
```

---

### 5. Save Updated Document

After user confirmation, save the document:

**Save to:** `{output_folder}/planning-artifacts/master-architecture.md`

Preserve original backup if requested:
- Backup: `{output_folder}/planning-artifacts/master-architecture.v{old_version}.md`

---

## SUCCESS METRICS

- ✅ All user-requested master architecture changes captured and understood
- ✅ Impact level (HIGH/MEDIUM/LOW) determined for each change
- ✅ Consistency validation passed (no tenant-model-module conflicts)
- ✅ FROZEN section changes flagged with QG-F1 re-validation warning
- ✅ Cascading updates identified and applied (module boundaries, contracts)
- ✅ Changes applied preserving document structure and formatting
- ✅ Frontmatter version incremented correctly (major/minor/patch)
- ✅ QG-F1 status updated appropriately (PENDING for HIGH impact)
- ✅ Change Log entry added with version, date, changes, rationale
- ✅ Diff summary presented showing before/after for each change
- ✅ User confirmed changes before saving
- ✅ Master architecture saved to correct location

---

## FAILURE MODES

- ❌ **Consistency violation detected:** Block change, present conflict description, offer resolution options (Revise/Override with justification/Cancel)
- ❌ **Tenant-model-module misalignment:** Schema-per-tenant modules cannot use RLS patterns - require explicit acknowledgment before proceeding
- ❌ **Module boundary overlap:** New module responsibility conflicts with existing module - require responsibility reassignment
- ❌ **AI runtime incompatibility:** Changed runtime incompatible with existing tool contracts - require contract updates
- ❌ **Save failure:** Retry with backup to alternate location, report error details

---

## Quality Gate

After edit completion, re-run QG-F1 (Foundation Gate) validation:

Run: `step-20-v-load.md` through `step-22-v-report.md`

This ensures the edited architecture still passes all quality criteria.

---

## NEXT STEP

Edit mode complete.

**Recommended next actions:**

1. **Validate changes:** Run Validate mode (steps 20-22) to verify QG-F1 compliance
2. **Update downstream:** If tenant model or AI runtime changed, update affected module architectures
3. **Notify stakeholders:** Share updated architecture with team

**To run validation:**

Proceed to `step-20-v-load.md` to validate the updated master architecture.
