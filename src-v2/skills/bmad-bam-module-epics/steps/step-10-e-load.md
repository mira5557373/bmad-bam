# Step 10: Load Existing Epic Document (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📋 **VERIFY artifact exists** before proceeding to modifications

## EXECUTION PROTOCOLS

- 🎯 Focus: Load existing epic document for modification
- 💾 Track: `stepsCompleted: [10]` when complete
- 📖 Context: Edit mode modifies existing artifact without full recreation
- 🚫 Do NOT: Generate new content; load existing content for editing

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading existing artifact
- Applying user-requested changes
- Preserving existing content

**OUT OF SCOPE:**
- Creating new artifacts (use Create mode)
- Validation (use Validate mode)
## Purpose

Load the existing module epic document for modification. Edit mode allows adding new epics, modifying existing stories, updating estimates, changing sprint allocation, or adjusting done criteria without recreating the entire document from scratch.

---

## Prerequisites

- Existing epic document to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: epic-*
- Module architecture available for context

---

## Inputs

- Existing artifact: `{output_folder}/planning-artifacts/modules/{module}/epics.md`
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK

Load the existing epic document and identify modification scope. Present current state summary and gather user requirements for modifications.

---

## Main Sequence

### Action 1: Load Epic Document

Load the existing epic document:

```
{output_folder}/planning-artifacts/modules/{module}/epics.md
```

**If artifact does not exist:**
- Inform user: "Epic document not found. Please run Create mode first."
- Suggest: `bmad-bam-module-epics` Create mode (step-01-c-*)
- HALT edit workflow

**If artifact exists, extract metadata:**

| Attribute | Value |
|-----------|-------|
| Document Path | `{output_folder}/planning-artifacts/modules/{module}/epics.md` |
| Module | {module_name from frontmatter} |
| Version | {from frontmatter} |
| Last Modified | {date} |
| Total Epics | {epic_count} |
| Total Stories | {story_count} |
| Total Points | {total_points} |

### Action 2: Parse and Display Summary

Extract and present current state:

#### Epic Summary

| Epic ID | Title | Category | Stories | Points | Status |
|---------|-------|----------|---------|--------|--------|
| E-{module}-001 | {title} | Core | {count} | {pts} | Active |
| E-{module}-002 | {title} | Integration | {count} | {pts} | Active |
| E-{module}-003 | {title} | AI/Agent | {count} | {pts} | Active |

#### Story Summary

| Story ID | Epic | Title | Points | Sprint | Status |
|----------|------|-------|--------|--------|--------|
| S-{module}-001-01 | E-001 | {title} | 3 | Sprint 1 | Planned |
| S-{module}-001-02 | E-001 | {title} | 5 | Sprint 1 | Planned |
| S-{module}-002-01 | E-002 | {title} | 8 | Sprint 2 | Planned |

#### Sprint Allocation

| Sprint | Stories | Points | Capacity | Status |
|--------|---------|--------|----------|--------|
| Sprint 1 | {count} | {pts} | {capacity} | Planned |
| Sprint 2 | {count} | {pts} | {capacity} | Planned |
| Sprint 3 | {count} | {pts} | {capacity} | Planned |

#### Document Metadata

| Attribute | Value |
|-----------|-------|
| Document Path | {path} |
| Version | {version} |
| Tenant Model | {tenant_model} |
| Last Modified | {date} |
| Author | {author} |

### Action 3: Identify Modification Scope

Ask the user which sections need modification:

**Epic Modifications:**
- [ ] Add new epic
- [ ] Modify existing epic scope
- [ ] Remove epic
- [ ] Change epic priority
- [ ] Update epic acceptance criteria

**Story Modifications:**
- [ ] Add new stories to epic
- [ ] Modify existing story
- [ ] Remove story
- [ ] Update story estimate
- [ ] Change story priority
- [ ] Add/update tenant context

**Sprint Modifications:**
- [ ] Re-allocate stories to different sprints
- [ ] Add/remove sprints
- [ ] Update velocity assumptions
- [ ] Rebalance sprint capacity

**Done Criteria Modifications:**
- [ ] Update quality gate mappings
- [ ] Modify test coverage thresholds
- [ ] Change documentation requirements
- [ ] Update review checkpoints

**Capture the specific changes requested before proceeding.**

### Action 4: Validate Current State

Before editing, verify:

| Check | Status |
|-------|--------|
| Document format valid | YES/NO |
| All epic sections present | YES/NO |
| All stories have tenant context | YES/NO |
| Sprint allocation consistent | YES/NO |
| Done criteria documented | YES/NO |

### Action 5: Present Edit Options

Display modification options to user:

```
================================================================================
EPIC DOCUMENT LOADED FOR EDITING
================================================================================

MODULE: {module_name}
VERSION: {version}
LAST MODIFIED: {date}

CURRENT STATE:
- Epics: {epic_count}
- Stories: {story_count}
- Total Points: {total_points}
- Sprints: {sprint_count}

================================================================================
What would you like to modify?

1. ADD new epic or stories
2. MODIFY existing content (epics, stories, estimates)
3. REMOVE epics or stories
4. RE-ALLOCATE sprint assignments
5. UPDATE done criteria

Please describe the changes you need:
================================================================================
```

---

## SUCCESS METRICS

- ✅ Epic document loaded successfully
- ✅ Current state extracted and displayed
- ✅ Modification scope identified
- ✅ User confirmed changes to make

---

## FAILURE MODES

| Failure | Recovery |
|---------|----------|
| Document not found | Switch to Create mode |
| Document format invalid | Regenerate from template |
| Missing sections | Add missing sections during edit |
| Inconsistent data | Flag for user resolution |

---

## Verification

- [ ] Epic document loaded correctly
- [ ] Summary accurately reflects current state
- [ ] Modification scope clearly identified
- [ ] User confirmed changes to make
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current epic document
- Confirmed modification scope from user

---

## NEXT STEP

Proceed to `step-11-e-apply.md` with confirmed modification scope.
