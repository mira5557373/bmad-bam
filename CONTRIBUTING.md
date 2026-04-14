# Contributing to BAM

Thank you for your interest in contributing to BAM (BMAD Agentic Multi-tenant). This guide outlines how to contribute effectively.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Code Style Guidelines](#code-style-guidelines)
3. [PR Process](#pr-process)
4. [Testing Requirements](#testing-requirements)
5. [Extension Pattern Requirements](#extension-pattern-requirements)
6. [Knowledge Fragment Requirements](#knowledge-fragment-requirements)
7. [Template Requirements](#template-requirements)
8. [Workflow Requirements](#workflow-requirements)

---

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Run tests to ensure everything works: `npm test`
5. Create a feature branch: `git checkout -b feature/your-feature-name`

---

## Code Style Guidelines

### YAML Files

- Use 2-space indentation
- Use lowercase with hyphens for file names (e.g., `analyst-bam.yaml`)
- Always include required metadata fields
- Use comma-separated strings, NOT arrays for capabilities

### Markdown Files

- Use ATX-style headers (`#`, `##`, `###`)
- Include a single H1 title at the top
- Use fenced code blocks with language specifiers
- Use tables for structured data
- Include "Purpose" and "Related" sections where applicable

### File Naming Conventions

| Component | Pattern | Example |
|-----------|---------|---------|
| Extensions | `{agent}-bam.yaml` | `architect-bam.yaml` |
| Workflows | `{action}-{noun}/` | `create-master-architecture/` |
| Knowledge | `{topic}-patterns.md` | `multi-tenant-patterns.md` |
| Templates | `{artifact}-template.md` | `facade-contract-template.md` |
| Checklists | `{gate-name}.md` | `foundation-gate.md` |
| Agent Guides | `{domain}.md` | `platform-architecture.md` |

---

## PR Process

1. **Before submitting:**
   - Run `npm test` and ensure all tests pass
   - Update documentation if adding new components
   - Add entry to module-help.csv for new workflows

2. **PR title format:**
   - `feat: Add {component} for {purpose}`
   - `fix: Correct {issue} in {component}`
   - `docs: Update {document}`

3. **PR description must include:**
   - What changes were made
   - Why the changes were needed
   - How to test the changes
   - Any breaking changes

4. **Review process:**
   - All PRs require at least one approval
   - CI must pass before merging
   - Address all review comments

---

## Testing Requirements

### Running Tests

```bash
npm test                    # Run all tests (must pass)
npm test -- --watch         # Watch mode during development
npm test -- --verbose       # Detailed output
npm test -- test/schema.test.js  # Run specific test file
```

### Test Coverage

All contributions must pass the existing test suite:

| Test File | What It Tests |
|-----------|---------------|
| `test/schema.test.js` | Agent/extension YAML format, no memories field |
| `test/extension.test.js` | WDS pattern compliance, prompt references |
| `test/workflow.test.js` | CEV structure, manifest presence |
| `test/install.test.js` | BMB compatibility, package.json, module.yaml |
| `test/integration.test.js` | Ecosystem integration (BMM, TEA, WDS, CIS) |

### Pre-submission Checklist

- [ ] `npm test` passes (all 169 tests)
- [ ] No linting errors
- [ ] New components have corresponding tests
- [ ] Documentation is updated

---

## Extension Pattern Requirements

Extensions **MUST** follow the WDS (Workflow Design System) pattern.

### Required Structure

```yaml
agent:
  metadata:
    extends: 'bmad-agent-{base}'    # REQUIRED
    module: 'bam'                    # REQUIRED
    description: 'Brief description' # OPTIONAL

# NEVER include memories: field - this breaks BMB compatibility

menu:
  - trigger: bam-{domain}-context
    action: "#load-{domain}-context-prompt"
    description: Load BAM {domain} context

prompts:
  - id: load-{domain}-context-prompt
    content: |
      Read and internalize the BAM guide:
      `{project-root}/_bmad/bam/data/agent-guides/bam/{guide}.md`
      
      Confirm when loaded.
```

### What NOT To Do

```yaml
# WRONG - breaks BMB compatibility
memories:
  - "Some context to inject"

# WRONG - use comma-separated strings instead
capabilities:
  - "capability one"
  - "capability two"
```

### Validation

Extensions are validated by `test/schema.test.js` for:
- Presence of required metadata fields
- Absence of `memories:` field
- Valid prompt references

---

## Knowledge Fragment Requirements

Knowledge fragments contain the actual code patterns and implementation examples. Step files should reference these, not embed code.

### Required Structure

```markdown
# {Pattern Name} Patterns

## Purpose

{Why these patterns exist and when to use them}

## Core Concepts

### {Concept 1}

{Explanation with context}

## Pattern Catalog

### Pattern: {Pattern Name}

**When to use:** {Conditions}

**Structure:**
```typescript
// Code examples BELONG HERE, not in step files
interface Example {
  field: string;
}
```

**Key points:**
- {Important consideration 1}
- {Important consideration 2}

## Anti-Patterns

### Anti-Pattern: {Name}

**Problem:** {What goes wrong}

**Wrong approach:**
```typescript
// Show what NOT to do
```

**Correct approach:**
```typescript
// Show the right way
```

## Related Knowledge

- `{related-patterns}.md` - {Why related}
```

### Requirements

1. **Code examples required** - Knowledge fragments MUST contain actual code examples
2. **Anti-patterns included** - Show what NOT to do alongside correct patterns
3. **Cross-references** - Link to related knowledge fragments
4. **Language-specific** - Use appropriate language for the pattern (TypeScript, SQL, etc.)

---

## Template Requirements

Templates are output artifacts filled during workflow execution.

### Required Format

Templates use double-brace placeholders: `{{variable_name}}`

### Standard Variables

Templates use **lowercase** variable placeholders:

| Variable | Description |
|----------|-------------|
| `{{project_name}}` | Project name |
| `{{date}}` | Current date |
| `{{version}}` | Document version |
| `{{author}}` | Document author |
| `{{module_name}}` | Current module |
| `{{tenant_model}}` | Selected isolation strategy |
| `{{ai_runtime}}` | Selected orchestration framework |

### Example Template Structure

```markdown
# {{project_name}} - {Artifact Title}

**Version:** {{version}}
**Date:** {{date}}
**Author:** {{author}}

## Overview

{Description section}

## {Main Content Section}

{{generated_content}}

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial creation |
```

### Requirements

1. All variable placeholders use double braces with **lowercase** names: `{{variable_name}}`
2. Include standard metadata section (version, date, author)
3. Include revision history table
4. Use consistent formatting with other templates

---

## Workflow Requirements

All workflows must follow the CEV (Create/Edit/Validate) structure.

### Required Directory Structure

BAM uses a **unified steps/ directory** with mode suffixes:

```
src/workflows/{workflow-name}/
├── bmad-skill-manifest.yaml  # Workflow metadata
├── SKILL.md                   # Workflow documentation
├── workflow.md                # Mode routing table
├── bmad-manifest.json         # Dependency chain (optional)
└── steps/                     # Unified steps directory
    ├── step-01-c-{first-step}.md    # Create mode (01-09)
    ├── step-02-c-{second-step}.md
    ├── ...
    ├── step-10-e-load-existing.md   # Edit mode (10-19)
    ├── step-11-e-apply-changes.md
    ├── step-20-v-load-artifact.md   # Validate mode (20-29)
    ├── step-21-v-validate.md
    └── step-22-v-report.md
```

> **Note:** Step files use naming convention `step-NN-{mode}-{description}.md` where mode is `c` (Create), `e` (Edit), or `v` (Validate).

### Required Files

1. **bmad-skill-manifest.yaml** - Workflow metadata
2. **SKILL.md** - Agent-facing documentation
3. **workflow.md** - Mode routing table
4. **steps/** - Unified steps directory with:
   - At least one Create step (`step-01-c-*.md`)
   - Edit mode steps (`step-10-e-*.md`, `step-11-e-*.md`)
   - Validate mode steps (`step-20-v-*.md`, `step-21-v-*.md`, `step-22-v-*.md`)

### module-help.csv Entry

Every workflow MUST have a corresponding entry in `src/workflows/module-help.csv` with all 14 columns:

```
module,skill,display-name,menu-code,description,action,args,phase,after,before,required,output-location,outputs
```

---

## Questions?

If you have questions about contributing, please open an issue with the `question` label.
