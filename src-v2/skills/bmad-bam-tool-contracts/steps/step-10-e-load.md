# Step 10: Load Existing Tool Contract Design (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER allow tool schema without TenantContext as first parameter**
- 📖 **CRITICAL: ALWAYS verify permission matrix** covers all tools
- 🔄 **CRITICAL: Parse rate limits** for all three tiers (Free/Pro/Enterprise)
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **EXTRACT sandbox isolation configuration** - critical for tool execution safety
- 📋 **VERIFY input/output schemas** defined for every tool

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
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3.md`

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Load the existing tool contract design document, parse the tool catalog by category (Data Access, External API, File System, Computation, Agent-to-Agent), extract TenantContext schema specification, permission matrix with approval gates, rate limit configurations per tier (Free/Pro/Enterprise), execution environment settings (retry, timeout, circuit breaker), and sandbox isolation rules. Present a summary and identify which sections the user wants to modify.

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

### 4. Present Edit Options

Display edit menu to user:

```
================================================================================
TOOL CONTRACT DESIGN - EDIT MODE
================================================================================
Document: tool-contracts-design.md
Version: {{version}}
AI Runtime: {{ai_runtime}}
Total Tools: {{count}}
================================================================================

EDITABLE SECTIONS:
[1] Tool Definitions - Add new tools, update schemas
[2] Permission Requirements - Modify access controls, approval gates
[3] Rate Limits - Adjust quotas by tier (Free/Pro/Enterprise)
[4] Execution Configuration - Update retry, timeout, circuit breaker
[5] Tool Categories - Add, rename, or reorganize categories
[6] TenantContext Specification - Update context propagation
[7] Error Response Codes - Add or modify error handling
[8] Monitoring Configuration - Update metrics, alerts, dashboards
[9] Tool Deprecation - Mark tools for deprecation with migration path
[10] Full Redesign - Major restructure (rare)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
================================================================================
```

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

- ✅ Tool contract design loaded with all categories parsed
- ✅ TenantContext schema specification extracted
- ✅ Permission matrix with approval gates documented
- ✅ Rate limits verified for all tiers (Free/Pro/Enterprise)
- ✅ Sandbox isolation configuration documented
- ✅ Affected tools identified with breaking change assessment

---

## FAILURE MODES:

- ❌ **TenantContext missing from tool schema:** CRITICAL - all tools require tenant context
- ❌ **Permission matrix incomplete:** Block edits until all tools have permissions
- ❌ **Rate limits undefined for tier:** Quota enforcement will fail
- ❌ **Sandbox isolation not configured:** Tool execution safety compromised
- ❌ **Design not found:** Switch to Create mode

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
