# Step 11: Apply Changes to LLM Versioning Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply approved changes to LLM versioning design
- 💾 Track: `stepsCompleted: [10, 11]` when complete
- 📖 Context: Edit plan from Step 10
- 🚫 Do NOT: Add changes beyond approved scope
- 🔍 Use web search: Only if new patterns are needed for additions
- ⚠️ Gate: None - editing workflow

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Applying approved modifications
- Updating document version
- Maintaining document consistency
- Verifying changes applied correctly

**OUT OF SCOPE:**
- Changes beyond approved edit plan
- Full document restructuring
- Quality gate validation (use Validate mode)

---

## Purpose

Apply the approved changes from Step 10 to the LLM versioning design document. Ensure consistency across sections and update the document version.

---

## Prerequisites

- Step 10 completed: Edit plan approved
- Document structure understood
- Approved changes list available

---

## Inputs

- Loaded document from Step 10
- Approved edit plan from Step 10
- Pattern registry (if adding new patterns)

---

## YOUR TASK:

Apply approved changes to the LLM versioning design document.

---

## Main Sequence

### 1. Apply Section Modifications

For each approved change in the edit plan:

#### 1.1 Model Inventory Changes

If modifying model inventory:

| Action | Details | Status |
|--------|---------|--------|
| Add model | {{model_name}}, {{version}} | Pending/Done |
| Update model | {{model_id}} → {{new_version}} | Pending/Done |
| Deprecate model | {{model_id}}, reason: {{reason}} | Pending/Done |
| Remove model | {{model_id}} | Pending/Done |

Update related sections:
- [ ] Tenant-model mapping updated
- [ ] Version dependencies updated
- [ ] Fallback configuration updated

#### 1.2 Version Management Changes

If modifying version management:

| Component | Change | Status |
|-----------|--------|--------|
| Registry schema | {{change}} | Pending/Done |
| Assignment logic | {{change}} | Pending/Done |
| A/B testing | {{change}} | Pending/Done |
| Fallback config | {{change}} | Pending/Done |

#### 1.3 Rollout Strategy Changes

If modifying rollout strategy:

| Component | Change | Status |
|-----------|--------|--------|
| Canary phases | {{change}} | Pending/Done |
| Feature flags | {{change}} | Pending/Done |
| Metrics | {{change}} | Pending/Done |
| Rollback triggers | {{change}} | Pending/Done |

#### 1.4 Monitoring Changes

If modifying monitoring:

| Component | Change | Status |
|-----------|--------|--------|
| Quality metrics | {{change}} | Pending/Done |
| Cost tracking | {{change}} | Pending/Done |
| Latency tracking | {{change}} | Pending/Done |
| Feedback collection | {{change}} | Pending/Done |

### 2. Ensure Cross-Section Consistency

Verify changes don't break other sections:

| Dependency | From Section | To Section | Consistent |
|------------|--------------|------------|------------|
| Model references | Inventory | Assignment | YES/NO |
| Tier definitions | Management | Rollout | YES/NO |
| Metric names | Rollout | Monitoring | YES/NO |
| Threshold values | Rollback | Monitoring | YES/NO |

If inconsistencies detected, resolve before proceeding.

### 3. Update Document Metadata

Update document header:

```markdown
**Version:** {{new_version}}
**Date:** {{today_date}}
**Last Modified By:** {{user}}
**Change Summary:** {{brief_summary}}
```

### 4. Add Change Log Entry

Append to change log:

```markdown
## Change Log

### {{version}} - {{date}}
- {{change_1}}
- {{change_2}}
- {{change_3}}

### Previous versions...
```

### 5. Write Updated Document

Save the modified document to:

```
{output_folder}/planning-artifacts/ai/llm-versioning-design.md
```

### 6. Verify Changes Applied

Review that all changes were applied:

| Planned Change | Applied | Verified |
|----------------|---------|----------|
| {{change_1}} | YES/NO | YES/NO |
| {{change_2}} | YES/NO | YES/NO |
| {{change_3}} | YES/NO | YES/NO |

---

## SUCCESS METRICS:

- [ ] All approved changes applied
- [ ] Cross-section consistency maintained
- [ ] Document metadata updated
- [ ] Change log entry added
- [ ] Document saved successfully

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Change breaks consistency | Fix related sections |
| Cannot apply change | Clarify with user |
| File write error | Check permissions, retry |
| Version conflict | Merge or overwrite with confirmation |

---

## Verification

- [ ] All edit plan items completed
- [ ] No orphaned references
- [ ] Version number incremented
- [ ] Change log updated
- [ ] Document valid markdown

---

## Outputs

- Updated LLM versioning design document
- Change log entry
- Applied changes summary

---

## EDIT WORKFLOW COMPLETE:

The LLM versioning design has been updated.

**Output Location:** `{output_folder}/planning-artifacts/ai/llm-versioning-design.md`

**Recommended Next Steps:**
- Run Validate mode (`step-20-v-load.md`) to verify changes against quality gates
- Review change log for audit trail
- Update related artifacts if needed
