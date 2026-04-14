---
name: golden-dataset-management
displayName: Golden Dataset Management
description: Design golden dataset lifecycle for AI evaluation. Use when the user requests 'design golden dataset' or 'AI evaluation data'.
module: bam
tags: [ai-evaluation, mlops]
---

# Golden Dataset Management

## Overview

This workflow designs the golden dataset lifecycle for AI evaluation, including dataset schema design, curation workflows, version control, and test case management. It ensures AI systems have high-quality evaluation data that supports multi-tenant scenarios and continuous improvement. Run after runtime architecture is defined.

Act as an MLOps Engineer designing golden dataset management systems.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing golden dataset schema and structure
- Creating dataset curation workflows
- Building version control for evaluation data
- Defining test case management processes
- Setting up regression testing infrastructure

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Dataset Schema Design

Define golden dataset schema:

- Input/output format specifications
- Metadata requirements
- Annotation schema
- Tenant context fields

### Step 2: Curation Workflow

Design dataset curation process:

- Data collection methods
- Quality review procedures
- Expert annotation guidelines
- Tenant contribution handling

### Step 3: Version Control

Define dataset versioning:

- Versioning strategy
- Change tracking
- Rollback capabilities
- Lineage documentation

### Step 4: Test Case Management

Create test case organization:

- Test case categorization
- Coverage tracking
- Regression suite management
- Tenant-specific test cases

**Soft Gate:** Steps 1-4 complete the golden dataset design. Present a summary of schema, curation, versioning, and test management. Ask for confirmation.

### Quality Gates

- [ ] Dataset schema defined
- [ ] Curation workflow documented
- [ ] Version control implemented
- [ ] Test case management established

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime) - Golden datasets for agent evaluation

### Entry Gate
- QG-M3 (Agent Runtime) must pass before designing golden datasets
- Agent runtime architecture must be defined

### Exit Gate
- Dataset schema and versioning documented
- Curation workflow specified
- Test case management established

## Output

- `{output_folder}/planning-artifacts/quality/golden-dataset.md`
- Dataset schema specification
- Curation workflow documentation
- Test case management procedures

## References

- Knowledge: `bam/knowledge/testing-agent-safety.md`, `bam/knowledge/llmops.md`
- Patterns: `bam/data/bam-patterns.csv` (ai-testing, llmops, model-versioning)
- Checklist: `bam/checklists/qg-m3-agent-runtime.md`
