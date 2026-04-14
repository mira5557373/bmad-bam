# ADR-003: Unified Steps Directory

## Status

Accepted

## Date

2026-04-01

## Context

The BMM (BMAD Method) standard suggests using separate directories for workflow steps:
- `steps-c/` for Create mode
- `steps-e/` for Edit mode  
- `steps-v/` for Validate mode

This structure, while explicit, creates challenges for extension modules:

1. **Navigation Overhead** - Developers must navigate multiple directories to understand a workflow
2. **File Duplication Risk** - Similar steps might be duplicated across directories
3. **Mode Relationship Unclear** - Hard to see how Create/Edit/Validate steps relate
4. **Installer Complexity** - BMB must handle multiple step directories

Additionally, the CEV (Create/Edit/Validate) step numbering convention reserves ranges:
- Create: 01-09
- Edit: 10-19
- Validate: 20-29

With explicit numbering, the directory separation becomes redundant.

## Decision

BAM uses a **unified `steps/` directory** with mode suffixes in filenames instead of separate directories.

### Step Naming Convention

```
step-NN-{mode}-{description}.md
```

Where:
- `NN` is the step number (01-29)
- `{mode}` is `c` (Create), `e` (Edit), or `v` (Validate)
- `{description}` is a kebab-case description

### Directory Structure

**BMM Standard (not used):**
```
workflow-name/
├── steps-c/
│   ├── 01-first-step.md
│   └── 02-second-step.md
├── steps-e/
│   ├── 01-load-existing.md
│   └── 02-apply-changes.md
└── steps-v/
    ├── 01-load-artifact.md
    └── 02-validate.md
```

**BAM Unified (adopted):**
```
workflow-name/
└── steps/
    ├── step-01-c-first-step.md
    ├── step-02-c-second-step.md
    ├── step-10-e-load-existing.md
    ├── step-11-e-apply-changes.md
    ├── step-20-v-load-artifact.md
    ├── step-21-v-validate.md
    └── step-22-v-report.md
```

### Mode Ranges

| Mode | Step Range | Suffix |
|------|------------|--------|
| Create | 01-09 (or 01-10 for complex workflows) | `-c-` |
| Edit | 10-19 | `-e-` |
| Validate | 20-29 | `-v-` |

### Complex Workflow Exception

For complex workflows like `create-module-architecture`, Create mode may extend to step-10. When this occurs, step-10 is shared:
- `step-10-c-finalize.md` for Create mode
- `step-10-e-load-existing.md` for Edit mode

The mode suffix (`-c-` vs `-e-`) distinguishes them.

## Consequences

### Positive

1. **Single Directory Navigation** - All steps visible in one location
2. **Clear Mode Association** - Mode suffix makes step purpose obvious
3. **Easier Comparison** - Can compare Create/Edit/Validate approaches side-by-side
4. **Simpler Installer** - BMB handles single `steps/` directory
5. **Natural Ordering** - Alphabetical sort shows logical step sequence

### Negative

1. **BMM Deviation** - Different from standard BMM structure
2. **Learning Curve** - Contributors must learn naming convention
3. **Longer Filenames** - Mode suffix adds characters

### Mitigations

- CLAUDE.md documents the unified steps convention
- CONTRIBUTING.md provides clear examples
- workflow.md router explicitly references step files by name
- Test suite validates step naming convention

## Implementation Notes

### Workflow.md Router

```markdown
## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new artifact | `step-01-c-*` through `step-09-c-*` |
| **Edit** | Modify existing artifact | `step-10-e-*` through `step-19-e-*` |
| **Validate** | Check against criteria | `step-20-v-*` through `step-29-v-*` |

### Create Mode
Follow Create steps sequentially: step-01-c → step-02-c → ... → step-09-c
```

### SKILL.md Reference

```markdown
## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new artifact | `step-01-c-*` to `step-09-c-*` |
| Edit | Modify existing artifact | `step-10-e-*` to `step-19-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-29-v-*` |
```

## Related Decisions

- ADR-001: Extension-Only Module Architecture
- ADR-002: Pattern Registry Design
