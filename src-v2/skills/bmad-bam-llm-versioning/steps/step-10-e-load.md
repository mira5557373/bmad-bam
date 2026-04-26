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

## YOUR TASK:

Load existing document and prepare for editing.

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

### 6. Present Edit Plan

Summarize the edit plan for user confirmation:

```
Edit Plan Summary:
- Sections to modify: {{count}}
- New content to add: {{count}} items
- Content to remove: {{count}} items
- Estimated impact: Low/Medium/High

Proceed with edit? (y/n)
```

---

## SUCCESS METRICS:

- [ ] Document loaded successfully
- [ ] Structure parsed and validated
- [ ] User's requested changes understood
- [ ] Edit plan confirmed by user

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Document not found | Offer Create mode |
| Document corrupted | Attempt partial recovery or Create |
| Change scope too large | Recommend Create mode |
| Section not found | Clarify section name with user |

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
