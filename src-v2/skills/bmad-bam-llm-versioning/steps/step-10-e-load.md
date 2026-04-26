# Step 10: Load Existing LLM Versioning Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Load existing LLM versioning design for editing
- 💾 Track: `stepsCompleted: [10]` when complete
- 📖 Context: Parse existing document structure and identify sections
- 🚫 Do NOT: Make changes yet (that's Step 11)
- 🔍 Use web search: Not applicable for edit mode loading
- ⚠️ Gate: None - editing workflow

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading existing LLM versioning design document
- Parsing document structure
- Identifying user's requested changes
- Validating document format

**OUT OF SCOPE:**
- Making modifications (Step 11)
- Validation against quality gates
- Creating new sections

---

## Purpose

Load the existing LLM versioning design document for editing. Parse the document structure, identify all sections, and understand the user's requested modifications before applying changes.

---

## Prerequisites

- Existing LLM versioning design document at expected location
- Clear description of requested changes from user

---

## Inputs

- Existing document: `{output_folder}/planning-artifacts/ai/llm-versioning-design.md`
- User's requested changes

---

## YOUR TASK

Load the existing LLM versioning design document, parse its structure, extract the current model inventory and version configurations, and present a summary showing what can be edited. Enable the user to select specific sections for modification.

---

## Main Sequence

### 1. Load Existing Document

Load the LLM versioning design from:

```
{output_folder}/planning-artifacts/ai/llm-versioning-design.md
```

If document does not exist, inform user and offer to run Create mode instead.

### 2. Parse Document Structure

Identify all sections in the existing document:

| Section | Status | Line Range |
|---------|--------|------------|
| Executive Summary | Present/Missing | {{lines}} |
| Model Inventory | Present/Missing | {{lines}} |
| Version Management | Present/Missing | {{lines}} |
| Rollout Strategy | Present/Missing | {{lines}} |
| Version Monitoring | Present/Missing | {{lines}} |
| Implementation Checklist | Present/Missing | {{lines}} |
| Related Artifacts | Present/Missing | {{lines}} |
| Appendices | Present/Missing | {{lines}} |

### 3. Identify Current Version State

Extract document metadata:

| Metadata | Value |
|----------|-------|
| Document version | {{version}} |
| Last updated | {{date}} |
| Author | {{author}} |
| Models covered | {{count}} |
| Tenant tiers | {{count}} |

### 4. Understand Requested Changes

Clarify the user's requested modifications:

| Change Type | Section Affected | Description |
|-------------|------------------|-------------|
| Add | {{section}} | {{what to add}} |
| Modify | {{section}} | {{what to change}} |
| Remove | {{section}} | {{what to remove}} |
| Restructure | {{sections}} | {{how to reorganize}} |

**Change Categories:**

| Category | Examples |
|----------|----------|
| Model updates | Add new model, deprecate old model, update version |
| Rollout changes | Modify canary phases, update thresholds |
| Monitoring changes | Add metrics, update dashboards |
| Structure changes | Reorganize sections, add appendices |

### 5. Validate Edit Scope

Confirm the edit scope is valid:

- [ ] Requested sections exist in document
- [ ] Changes are within edit mode capabilities
- [ ] No Create-mode scope creep (full rewrites go to Create)
- [ ] Dependencies considered (changing model affects rollout)

### 6. Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
LLM VERSIONING DESIGN - EDIT MODE
================================================================================
Document: llm-versioning-design.md
Version: {version}
QG-AI1/QG-AI2 Status: {status}
================================================================================

MODEL INVENTORY:
- Active Models:      {count} models
- Deprecated Models:  {count} models
- Tenant Tiers:       {count} tiers with model assignments

VERSION MANAGEMENT: {registry_type} registry, {assignment_strategy} assignment

A/B TESTING: {enabled/disabled}, {experiment_count} active experiments

EDITABLE SECTIONS:
[1] Model Inventory - Add, update, deprecate, or remove models
[2] Version Management - Modify registry schema or assignment logic
[3] Rollout Strategy - Update canary phases, feature flags, thresholds
[4] A/B Testing - Configure experiments, modify allocation
[5] Version Monitoring - Add metrics, update dashboards
[6] Rollback Configuration - Update triggers and procedures
[7] Tenant Model Mapping - Reassign models to tenant tiers
[8] Full Document - Major restructure (requires QG-AI1/QG-AI2 re-validation)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- ✅ Document located and fully loaded
- ✅ Frontmatter parsed with all metadata extracted
- ✅ Model inventory parsed completely
- ✅ Version management configuration extracted
- ✅ A/B testing state documented
- ✅ Rollout strategy captured
- ✅ Edit summary presented to user
- ✅ User has selected edit target(s)
- ✅ QG-AI1/QG-AI2 impact assessment communicated

---

## FAILURE MODES

- ❌ **Document not found:** Redirect to Create mode or request alternate path
- ❌ **Invalid frontmatter:** Attempt recovery, flag missing fields
- ❌ **Corrupted model inventory:** Flag models needing completion before edit
- ❌ **QG-AI1/QG-AI2 already failed:** Warn that edits require full re-validation
- ❌ **Change scope too large:** Recommend Create mode for full restructure

---

## Verification

- [ ] Document exists and is readable
- [ ] Structure matches expected format
- [ ] Edit requests are clear
- [ ] Edit plan approved

---

## Outputs

- Loaded document content
- Parsed document structure
- Edit plan summary
- User confirmation

---

## NEXT STEP:

Proceed to `step-11-e-apply.md` to apply the requested changes to the LLM versioning design.
