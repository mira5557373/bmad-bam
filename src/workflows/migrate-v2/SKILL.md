---
name: migrate-v2
displayName: BAM Migration v2
description: Migrate BAM project from v1 (knowledge fragments) to v2 (pattern registry). Use when upgrading existing BAM projects.
module: bam
tags: [migration, upgrade]
---

# BAM Migration v2

## Overview

This workflow migrates existing BAM v1 projects (using static knowledge fragments) to BAM v2 architecture (using pattern registry + web research). It transforms knowledge directives to pattern references, updates step files, and validates the migration.

Act as a Platform Architect migrating a BAM project to the new pattern-driven architecture.

**Args:** Accepts project path. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Migrating from BAM v1 to v2 format
- Upgrading existing BAM module configurations
- Converting legacy workflow structures

## Modes

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Perform full migration from v1 to v2 |
| **Edit** | Resume partial migration |
| **Validate** | Check migration completeness |

Default: **Create** mode. In headless mode, always use Create.

## Prerequisites

- BAM v1 project with knowledge fragments
- BAM v2 module installed
- Pattern registry CSV files present

## Workflow

### Step 1: Inventory v1 Artifacts

- Scan for knowledge fragment references
- Identify affected step files
- Map knowledge files to pattern IDs
- Generate migration inventory

### Step 2: Transform Knowledge Directives

For each knowledge directive found:
- Map `**Load knowledge:** {file}.md` to pattern ID
- Transform to `**Load patterns:** bam-patterns.csv → filter: {pattern_id}`
- Update A/P/C menu context references

### Step 3: Update Step Files

- Apply MANDATORY EXECUTION RULES header
- Add COLLABORATION MENUS (A/P/C) section
- Update PROTOCOL INTEGRATION handlers

### Step 4: Fix Template Variables

- Transform {{UPPERCASE}} to {{lowercase}}
- Verify variable mappings
- Update template references

### Step 5: Validate Migration

- Run pattern registry validation
- Check step file structure
- Verify no orphaned knowledge references
- Generate migration report

**Soft Gate:** Present migration summary and ask for confirmation before finalizing.

### Step 6: Cleanup (Optional)

- Remove migrated knowledge fragments
- Update module-help.csv
- Archive v1 backup

## Outputs

- Migrated step files with pattern references
- Migration report at `{output_folder}/planning-artifacts/migration-report.md`
- Optional: Backup of v1 artifacts

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-F1** | Contributes | Foundation alignment with v2 architecture |

- **Entry Gate:** None - Migration can start from any state
- **Exit Gate:** QG-F1 (Foundation) - Migrated project must pass foundation validation

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-validate-patterns` | Post-migration | Validate pattern registry after migration |
| `bmad-bam-extend-project-context` | Related | Update project context with v2 configuration |

## References

- Patterns: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Migration mapping in workflow steps

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.
