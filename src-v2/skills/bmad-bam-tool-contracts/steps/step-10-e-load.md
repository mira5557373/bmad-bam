# Step 10: Load Existing Tool Contract Design (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📋 **VERIFY artifact exists** before proceeding to modifications

## EXECUTION PROTOCOLS

- 🎯 Focus: Load existing tool contract design for modification
- 💾 Track: `stepsCompleted: [10]` when complete
- 📖 Context: Edit mode modifies existing artifact without full recreation
- 🚫 Do NOT: Generate new content; load existing content for editing

---

## Purpose

Load the existing tool contract design document for modification. Edit mode allows updating tool schemas, adding new tools, modifying permissions, adjusting rate limits, or updating execution configuration without recreating the entire design from scratch.

---

## Prerequisites

- Existing tool contract design to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tool-contract
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md`

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Load the existing tool contract design and identify modification scope.

---

## Load Sequence

### 1. Load Tool Contract Design

Load the existing tool contract design:

```
{output_folder}/planning-artifacts/tool-contracts-design.md
```

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Load Context Documents

Also load for reference:
- Agent runtime architecture: `{output_folder}/planning-artifacts/agents/agent-runtime-architecture.md`
- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- Module architectures: `{output_folder}/planning-artifacts/modules/*/architecture.md`

### 3. Parse and Display Summary

Extract and present current state:

#### 3.1 Tool Catalog Summary

| Category | Tool Count | Last Modified |
|----------|------------|---------------|
| Data Access | {{count}} | {{date}} |
| External API | {{count}} | {{date}} |
| File System | {{count}} | {{date}} |
| Computation | {{count}} | {{date}} |
| Agent-to-Agent | {{count}} | {{date}} |

#### 3.2 Configuration Summary

| Configuration | Current Value |
|---------------|---------------|
| AI Runtime | {{ai_runtime}} |
| Total Tools | {{count}} |
| Permission Policies | {{count}} |
| Rate Limit Tiers | 3 (Free/Pro/Enterprise) |

#### 3.3 Document Metadata

| Attribute | Value |
|-----------|-------|
| Document Path | {{path}} |
| Version | {{version}} |
| Last Modified | {{date}} |
| Author | {{author}} |

### 4. Identify Modification Scope

Ask the user which sections need modification:

- [ ] Add new tool definitions
- [ ] Update existing tool schemas
- [ ] Modify permission requirements
- [ ] Adjust rate limits
- [ ] Update execution configuration
- [ ] Add new tool category
- [ ] Update TenantContext specification
- [ ] Modify error response codes
- [ ] Update monitoring configuration
- [ ] Deprecate existing tools

Capture the specific changes requested before proceeding.

### 5. Validate Current State

Before editing, verify:

| Check | Status |
|-------|--------|
| Document format valid | YES/NO |
| Tool catalog present | YES/NO |
| Schemas documented | YES/NO |
| Permissions mapped | YES/NO |
| Rate limits defined | YES/NO |
| Execution config present | YES/NO |

### 6. Display Affected Tools

Based on modification scope, list tools that will be affected:

| Tool ID | Current Version | Change Type | Impact |
|---------|-----------------|-------------|--------|
| {{tool}} | {{version}} | Schema update | Breaking/Non-breaking |
| {{tool}} | {{version}} | Permission change | Access affected |
| {{tool}} | {{version}} | Rate limit | Quota affected |

---

## SUCCESS METRICS:

- [ ] Tool contract design loaded successfully
- [ ] Current state summary extracted
- [ ] Modification scope identified
- [ ] User confirmed changes to make
- [ ] Affected tools identified

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Design not found | Switch to Create mode |
| Document format invalid | Regenerate from template |
| Missing sections | Add missing sections during edit |
| Version mismatch | Reconcile with current architecture |

---

## Verification

- [ ] Tool contract design loaded correctly
- [ ] Summary accurately reflects current state
- [ ] Modification scope clearly identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current tool contract design
- Confirmed modification scope from user
- List of affected tools

---

## NEXT STEP:

Proceed to `step-11-e-apply.md` with confirmed modification scope.
