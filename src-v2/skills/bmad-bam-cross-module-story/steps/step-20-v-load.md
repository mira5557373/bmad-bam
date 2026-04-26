# Step 20: Load Artifact (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER proceed without locating all cross-module story artifacts
- 📖 ALWAYS read the complete artifact including dependency graph
- 🔄 ALWAYS load the full coordination quality gate checklist
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ EXTRACT epic metadata for validation context
- 📋 PRESENT artifact summary before proceeding to validation
- 💬 CONFIRM artifact readiness with user
- 🎯 IDENTIFY any obvious gaps before formal validation

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load artifact and prepare validation context
- 💾 Track: Document load status and checklist preparation
- 📖 Context: Extract coordination state for validation
- 🚫 Do NOT: Run validation checks in this step - only load and prepare
- ⚠️ Gate: Missing artifacts may indicate incomplete epic
- 🔍 Use web search: Not applicable for Validate mode

---

## Purpose

Load the cross-module story artifact and quality gate checklist for validation against coordination criteria, preparing the context for systematic validation.

---

## YOUR TASK

Load all cross-module story artifacts, extract coordination metadata, load the appropriate quality gate checklists, and prepare the validation context. Present a summary showing what will be validated and confirm readiness to proceed.

---

## Prerequisites

- Cross-module story artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/cross-module-coordination.md`

---

## Actions

### 1. Locate and Load Artifacts

**Search for artifacts:**

```
{output_folder}/planning-artifacts/cross-module-stories.md
{output_folder}/planning-artifacts/stories/dependency-graph.md
{output_folder}/planning-artifacts/stories/module-stories/*.md
{output_folder}/planning-artifacts/stories/integration-tests.md
```

**If documents not found:**
```
================================================================================
VALIDATE MODE ERROR: No cross-module story artifacts found
================================================================================
Expected location: {output_folder}/planning-artifacts/cross-module-stories.md

Options:
[C] Switch to Create mode to generate epic
[E] Switch to Edit mode if partial artifact exists
[P] Specify alternate path to existing documents
================================================================================
```

### 2. Parse Artifact Metadata

**Extract document metadata:**

| Attribute | Value |
|-----------|-------|
| Epic ID | {epic_id} |
| Document Version | {version} |
| Last Modified | {date} |
| Modules Involved | {count} |
| Story Count | {count} |
| Dependency Count | {count} |
| Current Milestone | {milestone} |
| Overall Status | {status} |

### 3. Extract Validation Context

**Coordination scope summary:**

| Scope Item | Value |
|------------|-------|
| User journeys covered | {count} |
| Primary modules | {count} |
| Supporting modules | {count} |
| Facade contracts | {count} |
| Event schemas | {count} |
| Integration tests planned | {count} |

**Dependency health preview:**

| Metric | Value | Concern Level |
|--------|-------|---------------|
| Total dependencies | {count} | |
| Resolved dependencies | {count} | |
| Pending dependencies | {count} | {low/medium/high} |
| Blocking dependencies | {count} | {low/medium/high} |

### 4. Load Validation Checklists

**Cross-Module Coordination Checklist (QG-XMS):**

**Module Identification:**
- [ ] All necessary modules identified
- [ ] Module roles classified (primary/supporting/observing)
- [ ] Module owners identified and available
- [ ] No module boundary violations
- [ ] Each module has clear responsibility

**Dependencies:**
- [ ] All dependencies mapped (data/functional/temporal)
- [ ] Critical path identified
- [ ] No circular dependencies
- [ ] New contracts required are documented
- [ ] Dependency resolution sequence defined

**Integration Points:**
- [ ] All cross-module interactions specified
- [ ] Facade calls fully documented with signatures
- [ ] Event schemas defined with versioning
- [ ] Contract tests planned for each facade
- [ ] Tenant context propagation verified
- [ ] Error handling defined for cross-module calls

**Coordinated Stories:**
- [ ] Story for each primary module created
- [ ] Dependencies between stories linked
- [ ] Acceptance criteria include integration requirements
- [ ] Coordination schedule realistic
- [ ] Sync points defined with frequency
- [ ] Rollback scenarios documented

**Cross-Cutting Concerns:**
- [ ] Feature aligns with master architecture
- [ ] Tenant isolation maintained across modules
- [ ] No single module creates bottleneck
- [ ] Risk mitigation strategies documented

### 5. Present Validation Readiness

**Display validation preparation summary:**

```
================================================================================
CROSS-MODULE STORY VALIDATION - READY TO VALIDATE
================================================================================
Epic: {epic_name}
Version: {version}
Modules: {module_count}
Stories: {story_count}
Dependencies: {resolved}/{total} resolved
================================================================================

ARTIFACTS LOADED:
[✓] cross-module-stories.md
[✓] dependency-graph.md
[✓] module-stories/ ({count} files)
[✓] integration-tests.md

CHECKLISTS PREPARED:
[✓] Module Identification (5 criteria)
[✓] Dependencies (5 criteria)
[✓] Integration Points (6 criteria)
[✓] Coordinated Stories (6 criteria)
[✓] Cross-Cutting Concerns (4 criteria)

TOTAL VALIDATION CRITERIA: 26

================================================================================
[C] Continue to validation
[R] Review artifact details first
[X] Cancel validation
================================================================================
```

---

## SUCCESS METRICS

- ✅ All artifact files located and loaded
- ✅ Frontmatter parsed with full metadata
- ✅ Coordination scope extracted
- ✅ Dependency health assessed
- ✅ Validation checklists loaded
- ✅ Validation readiness confirmed with user

---

## FAILURE MODES

- ❌ **Artifacts not found:** Redirect to Create/Edit mode
- ❌ **Partial artifact set:** Warn about validation limitations
- ❌ **Invalid frontmatter:** Attempt recovery, flag issues
- ❌ **Dependency graph missing:** Validation will be incomplete for dependency checks
- ❌ **No module stories:** Critical gap - may fail dependency validation

---

## Verification

- [ ] All epic documents loaded successfully
- [ ] Document metadata captured
- [ ] Coordination scope documented
- [ ] Dependency health assessed
- [ ] Validation checklists loaded
- [ ] Ready for validation checks
- [ ] Patterns align with pattern registry

---

## Outputs

- Loaded artifact content
- Validation context summary
- Coordination scope assessment
- Loaded validation checklists
- Validation readiness confirmation

---

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks against quality criteria.
