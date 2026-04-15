---
title: How to Create a BAM Extension
description: Step-by-step guide to creating a new BAM extension for BMAD agents
category: how-to
---

# How to Create a BAM Extension

This guide walks you through creating a new BAM extension that follows WDS agent-guides pattern and BMM compatibility requirements.

## Prerequisites

- Understanding of YAML syntax
- Familiarity with the base agent you're extending
- Knowledge of BAM multi-tenant patterns

## Step 1: Create the Extension File

Create a new YAML file in `src/data/extensions/`:

```bash
touch src/data/extensions/{agent}-bam.yaml
```

## Step 2: Define Extension Metadata

```yaml
# src/data/extensions/{agent}-bam.yaml

agent:
  metadata:
    extends: 'bmad-agent-{base}'    # REQUIRED: Base agent to extend
    module: 'bam'                    # REQUIRED: Always 'bam'
    description: 'Brief description' # What this extension adds
```

**Important:** Do NOT include a `memories:` field. BAM uses the WDS agent-guides pattern instead.

## Step 3: Add Menu Items

Every extension needs:
1. A context loader menu item
2. Capability-specific menu items (5-8 recommended)
3. A web research menu item

```yaml
menu:
  # Context loader (REQUIRED)
  - trigger: bam-{domain}-context
    action: "#load-{domain}-context-prompt"
    description: Load BAM {domain} context

  # Capability items
  - trigger: bam-{capability-1}
    action: "#{capability-1}-prompt"
    description: {What it does}

  - trigger: bam-{capability-2}
    action: "#{capability-2}-prompt"
    description: {What it does}

  # Web research (REQUIRED)
  - trigger: bam-{domain}-research
    action: "#bam-{domain}-research-prompt"
    description: Research {domain} best practices
```

## Step 4: Define Prompts

```yaml
prompts:
  # Context loader prompt (REQUIRED)
  - id: load-{domain}-context-prompt
    content: |
      Read and internalize the BAM guide:
      `{project-root}/_bmad/bam/data/agent-guides/bam/{guide}.md`
      
      Confirm when loaded.

  # Capability prompts
  - id: {capability-1}-prompt
    content: |
      ## {Capability Title}
      
      Prerequisites: Ensure BAM context loaded via `bam-{domain}-context`
      
      {Detailed instructions...}

  # Web research prompt (REQUIRED)
  - id: bam-{domain}-research-prompt
    content: |
      ## BAM {Domain} Research
      
      Search for current best practices:
      
      Search the web: "{domain} multi-tenant patterns {date}"
      Search the web: "{domain} SaaS best practices {date}"
      
      Summarize findings with source citations.
      _Source: [URL]_
```

## Step 5: Create Agent Guide

Create the corresponding agent guide in `src/data/agent-guides/bam/`:

```markdown
# BAM {Domain} Guide

**When to load:** During Phase {N} when {conditions}.

**Integrates with:** {Agent name}, {capabilities}

---

## Core Concepts

{Domain-specific concepts}

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| {Case 1}  | {Action}      | {Why}     |

## Related Workflows

- `bmad-bam-{workflow}` - {When to use}

## Related Patterns

Load from pattern registry:
- `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `{pattern}`

### Web Research

- Search: "{domain} patterns {date}"
```

## Step 6: Update Tests

Run tests to verify your extension:

```bash
npm test
```

The test suite validates:
- No `memories:` field present
- Valid `extends:` field
- Menu triggers are unique
- Prompts are properly referenced

## Anti-Patterns to Avoid

| Anti-Pattern | Why Wrong | Correct Approach |
|--------------|-----------|------------------|
| `memories:` field | Breaks BMM compatibility | Use agent-guides pattern |
| Array capabilities | Not BMAD standard | Use comma-separated strings |
| Hardcoded paths | Won't work across installs | Use `{project-root}` placeholder |
| Missing research menu | Inconsistent capability | Always include web research |

## Checklist

Before submitting:

- [ ] Extension file in `src/data/extensions/{agent}-bam.yaml`
- [ ] No `memories:` field
- [ ] Valid `extends:` field pointing to base agent
- [ ] Context loader menu item
- [ ] 5-8 capability menu items
- [ ] Web research menu item
- [ ] All prompts defined and referenced correctly
- [ ] Corresponding agent guide created
- [ ] Tests pass (`npm test`)

## Examples

See existing extensions for reference:
- `architect-bam.yaml` - Complex extension with 24 prompts
- `analyst-bam.yaml` - Standard extension with 6 prompts
- `cis-value-bam.yaml` - CIS innovation extension pattern
