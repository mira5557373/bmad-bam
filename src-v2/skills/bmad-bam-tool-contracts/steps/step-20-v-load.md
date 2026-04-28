# Step 20: Load Artifacts for Validation (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🔍 **LOAD QG-M3 checklist** - Required for validation

## EXECUTION PROTOCOLS

- 🎯 Focus: Load tool contract design and quality gate checklist
- 💾 Track: `stepsCompleted: [20]` when complete
- 📖 Context: Validate mode verifies existing artifact against criteria
- 🚫 Do NOT: Generate new content; Edit mode handles modifications
- ⚠️ Gate: QG-M3 (Agent Runtime) - Primary validation focus

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading artifact and checklist
- Evaluating against criteria
- Documenting evidence

**OUT OF SCOPE:**
- Modifying the artifact
- Creating new content
## Purpose

Load the tool contract design document and QG-M3 (Agent Runtime) checklist for formal validation. This step prepares all artifacts needed to verify tool contracts meet agent runtime quality requirements.

---

## Prerequisites

- Existing tool contract design to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tool-contract
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3.md`

---

## Inputs

- Tool contract design: `{output_folder}/planning-artifacts/tool-contracts-design.md`
- Quality gate checklist from `{project-root}/_bmad/bam/data/checklists/`
- Supporting architecture documents

---

## YOUR TASK:

Load all artifacts required for tool contract validation.

---

## Validation Sequence

### 1. Load Tool Contract Design

Load the tool contract design:

```
{output_folder}/planning-artifacts/tool-contracts-design.md
```

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Load Quality Gate Checklist

Load the QG-M3 (Agent Runtime) checklist:

| Checklist | Path | Status |
|-----------|------|--------|
| QG-M3 | `checklists/qg-m3.md` | Loaded/Missing |

Extract tool contract validation criteria from QG-M3.

### 3. Load Supporting Documents

Load context documents for cross-reference:

| Document | Path | Status |
|----------|------|--------|
| Agent Runtime Architecture | `agents/agent-runtime-architecture.md` | Loaded/Missing |
| Master Architecture | `architecture/master-architecture.md` | Loaded/Missing |
| Module Architectures | `modules/*/architecture.md` | {{count}} loaded |

### 4. Display Design Summary

| Attribute | Value |
|-----------|-------|
| Document Path | {{path}} |
| Version | {{version}} |
| Last Modified | {{date}} |
| Total Tools | {{count}} |

#### Tool Categories Summary

| Category | Count | With Schema | With Permissions |
|----------|-------|-------------|------------------|
| Data Access | {{count}} | {{count}} | {{count}} |
| External API | {{count}} | {{count}} | {{count}} |
| File System | {{count}} | {{count}} | {{count}} |
| Computation | {{count}} | {{count}} | {{count}} |
| Agent-to-Agent | {{count}} | {{count}} | {{count}} |

#### Configuration Status

| Component | Documented | Complete |
|-----------|------------|----------|
| TenantContext Schema | YES/NO | YES/NO |
| Tool Schemas | YES/NO | YES/NO |
| Permission Matrix | YES/NO | YES/NO |
| Rate Limits | YES/NO | YES/NO |
| Sandbox Config | YES/NO | YES/NO |
| Error Responses | YES/NO | YES/NO |
| Monitoring | YES/NO | YES/NO |

### 5. Identify Validation Scope

Determine which aspects to validate:

- [ ] Validate all tool schemas
- [ ] Validate TenantContext compliance
- [ ] Validate permission mappings
- [ ] Validate rate limit configuration
- [ ] Validate execution environment
- [ ] Validate error response standards
- [ ] Full QG-M3 validation

Default: Full QG-M3 validation for tool contracts

### 6. Prepare Validation Criteria

Extract critical checks from QG-M3:

#### Tool Contract Critical Checks

- [ ] **CRITICAL:** All tools define input schema
- [ ] **CRITICAL:** All tools define output schema
- [ ] **CRITICAL:** All tools require TenantContext as first parameter
- [ ] **CRITICAL:** All tools have permission requirements documented
- [ ] **CRITICAL:** Execution sandbox isolation documented

#### Tool Contract Standard Checks

- [ ] Rate limits defined for all tiers
- [ ] Error response codes standardized
- [ ] Monitoring metrics specified
- [ ] Tool versioning strategy documented
- [ ] Deprecation policy defined
- [ ] Capability-to-tool mapping complete

---

## SUCCESS METRICS:

- [ ] Tool contract design loaded successfully
- [ ] Quality gate checklist loaded
- [ ] Supporting documents loaded
- [ ] Validation scope confirmed
- [ ] Ready for validation execution

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Design not found | Run Create mode first |
| Checklist missing | Check BAM installation |
| Supporting docs missing | Document as validation gap |
| Invalid document format | Regenerate from template |

---

## Verification

- [ ] Tool contract design loaded correctly
- [ ] Quality gate checklist available
- [ ] Validation criteria prepared
- [ ] User confirmed validation scope

---

## Outputs

- Loaded tool contract design
- Quality gate checklist ready
- Validation scope confirmed
- Critical checks identified

---

## NEXT STEP:

Proceed to `step-21-v-validate.md` to execute tool contract validation checks.
