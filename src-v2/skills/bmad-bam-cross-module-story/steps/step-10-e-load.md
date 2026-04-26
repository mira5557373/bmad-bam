# Step 10: Load Existing Cross-Module Epic (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER proceed without locating all cross-module story artifacts
- 📖 ALWAYS read the complete dependency graph and module story files
- 🔄 ALWAYS parse the module involvement matrix for current state
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ EXTRACT all inter-module dependencies and facade contract references
- 📋 PRESENT a structured summary of epic coordination state before accepting edits
- 💬 PAUSE after summary presentation and await user edit selection
- 🎯 IDENTIFY blocked stories or unresolved dependencies that may affect edits

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load and parse existing cross-module story artifacts for modification
- 💾 Track: Document load status and dependency parse results
- 📖 Context: Extract module involvement, dependencies, story status, milestones
- 🚫 Do NOT: Modify any content during load phase
- ⚠️ Gate: Changes may affect multiple module teams' sprint planning
- 🔍 Use web search: Only if user requests updated coordination patterns

---

## Purpose

Load and review existing cross-module story documents to identify sections requiring modification based on scope changes, dependency updates, or coordination adjustments.

---

## YOUR TASK

Load the existing cross-module story artifacts, parse the dependency graph and module involvement, extract the current coordination state, and present a summary showing what can be edited. Enable the user to select specific sections for modification based on epic evolution needs.

---

## Prerequisites

- Existing cross-module story artifact to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts

---

## Actions

### 1. Locate Documents

**Search for existing artifacts:**

```
{output_folder}/planning-artifacts/cross-module-stories.md
{output_folder}/planning-artifacts/stories/dependency-graph.md
{output_folder}/planning-artifacts/stories/module-stories/*.md
{output_folder}/planning-artifacts/stories/integration-tests.md
```

If not found, check alternate locations:
- `{output_folder}/cross-module-stories.md`
- `{project-root}/docs/planning/cross-module-stories.md`

**If documents not found:**
```
================================================================================
EDIT MODE ERROR: No existing cross-module story artifacts found
================================================================================
Expected location: {output_folder}/planning-artifacts/cross-module-stories.md

Options:
[C] Switch to Create mode to generate new epic
[P] Specify alternate path to existing documents
================================================================================
```

### 2. Parse Frontmatter and Metadata

**Extract document metadata:**

| Metadata | Value |
|----------|-------|
| Epic ID | |
| Document Version | |
| Last Modified | |
| Modules Involved | {count} |
| Story Count | {count} |
| Dependency Count | {count} |
| Current Milestone | |
| Overall Status | {planning/in-progress/blocked} |

### 3. Parse Module Involvement Matrix

**Extract module participation:**

| Module | Role | Owner | Stories | Status |
|--------|------|-------|---------|--------|
| {module_1} | Primary/Supporting/Observing | {owner} | {count} | {status} |
| {module_2} | Primary/Supporting/Observing | {owner} | {count} | {status} |
| {module_3} | Primary/Supporting/Observing | {owner} | {count} | {status} |

**Flag coordination issues:** Mark modules with blocked stories or unresponsive owners.

### 4. Parse Dependency Graph

**Extract inter-module dependencies:**

| From Module | To Module | Dependency Type | Status | Blocking |
|-------------|-----------|-----------------|--------|----------|
| {module_a} | {module_b} | Contract/Data/Event | {resolved/pending} | {yes/no} |
| {module_b} | {module_c} | Contract/Data/Event | {resolved/pending} | {yes/no} |

**Critical path analysis:**

| Path | Modules | Total Dependencies | Blocking Dependencies |
|------|---------|-------------------|----------------------|
| Critical | {module_list} | {count} | {count} |
| Secondary | {module_list} | {count} | {count} |

### 5. Parse Story Status

**Extract coordinated stories:**

| Story ID | Module | Status | Dependencies | Blocked By |
|----------|--------|--------|--------------|------------|
| {story_1} | {module} | {status} | {dep_count} | {blocker} |
| {story_2} | {module} | {status} | {dep_count} | {blocker} |

**Sprint alignment:**

| Sprint | Stories Planned | Stories In Progress | Stories Blocked |
|--------|-----------------|---------------------|-----------------|
| Current | {count} | {count} | {count} |
| Next | {count} | {count} | {count} |

### 6. Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
CROSS-MODULE STORY EPIC - EDIT MODE
================================================================================
Document: cross-module-stories.md
Version: {version}
Epic: {epic_name}
Status: {planning/in-progress/blocked}
================================================================================

MODULE INVOLVEMENT:
1. {module_1}: {role} - {story_count} stories - {status}
2. {module_2}: {role} - {story_count} stories - {status}
3. {module_3}: {role} - {story_count} stories - {status}

DEPENDENCY STATUS: {resolved}/{total} dependencies resolved
CRITICAL PATH: {module_list}
BLOCKING ISSUES: {count}

EDITABLE SECTIONS:
[1] Module Involvement - Add/remove modules, change roles
[2] Dependency Graph - Add/update/remove dependencies
[3] Story Assignments - Add stories, reassign, update status
[4] Milestones - Adjust dates, add/remove milestones
[5] Communication Plan - Update sync schedules, contacts
[6] Full Epic - Major restructure (scope change)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- ✅ All epic documents located and loaded
- ✅ Frontmatter parsed with all metadata extracted
- ✅ Module involvement matrix parsed completely
- ✅ Dependency graph analyzed with critical path identified
- ✅ Story status and blocking issues documented
- ✅ Edit summary presented to user
- ✅ User has selected edit target(s)

---

## FAILURE MODES

- ❌ **Documents not found:** Redirect to Create mode or request alternate path
- ❌ **Partial artifact set:** Warn about missing files, offer partial load
- ❌ **Circular dependency detected:** Flag before edits, may need resolution first
- ❌ **Module owner unreachable:** Flag for coordination planning
- ❌ **Sprint misalignment:** Warn if stories span incompatible sprints

---

## Verification

- [ ] All epic documents loaded successfully
- [ ] Document structure understood
- [ ] Module involvement matrix extracted
- [ ] Dependency graph parsed
- [ ] Critical path identified
- [ ] Blocking issues documented
- [ ] Current state summarized
- [ ] Sections for modification identified
- [ ] User confirmed modification targets
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current cross-module epic state
- Module involvement matrix
- Dependency graph summary with critical path
- Story status overview
- List of sections to modify
- Change scope confirmation

---

## Next Step

Proceed to `step-11-e-apply.md` with:
- Selected edit target(s)
- Current document state
- Parsed dependency graph
- Module involvement matrix
- Blocking issues list
