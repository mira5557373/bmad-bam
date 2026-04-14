# How to Add a New Extension

This guide covers creating a new extension in BAM following the WDS agent-guides pattern.

## Prerequisites

- BAM module installed
- Understanding of WDS extension pattern
- Target base agent identified (e.g., `bmad-agent-analyst`)

## Overview

BAM extensions enhance existing BMAD agents with multi-tenant SaaS capabilities. Extensions follow these principles:

- **Extend, never replace** - Add capabilities to existing agents
- **No memories field** - Use agent-guides pattern instead
- **Context loaders** - Each extension has a context loading menu item
- **Web research** - Each extension includes a research menu item

## Steps

### 1. Create Extension YAML File

Create the extension file in `src/extensions/`:

```bash
touch src/extensions/{agent}-bam.yaml
```

### 2. Define Required Fields

```yaml
# src/extensions/{agent}-bam.yaml

agent:
  metadata:
    extends: 'bmad-agent-{base}'    # REQUIRED: Base agent to extend
    module: 'bam'                    # REQUIRED: Always 'bam'
    description: 'Brief description' # OPTIONAL: What this extension adds

# NEVER include memories: field - use agent-guides instead

menu:
  # Context loader (REQUIRED - one per extension)
  - trigger: bam-{domain}-context
    action: "#load-{domain}-context-prompt"
    description: Load BAM {domain} context

  # Web research item (REQUIRED)
  - trigger: bam-{domain}-research
    action: "#web-research-{domain}-prompt"
    description: Conduct web research for {domain} decisions

  # Capability items (as many as needed)
  - trigger: {capability-name}
    action: "#{capability-name}-prompt"
    description: {What it does}

prompts:
  # Context loader prompt (REQUIRED)
  - id: load-{domain}-context-prompt
    content: |
      ## Load BAM {Domain} Context

      Read and internalize the BAM guide:
      `{project-root}/_bmad/bam/data/agent-guides/bam/{guide}.md`

      This guide provides context for:
      - {Context item 1}
      - {Context item 2}
      - {Context item 3}

      Confirm when loaded, then proceed with tasks.

  # Web research prompt (REQUIRED)
  - id: web-research-{domain}-prompt
    content: |
      ## BAM Web Research - {Domain}

      Conduct targeted web research to verify current best practices.

      **Research Focus:** {{research_topic}}

      Execute 2-3 targeted searches using pattern registry web_queries:
      Search the web: "{{research_topic}} best practices {date}"
      Search the web: "{{research_topic}} multi-tenant SaaS {date}"

      Return findings as structured summary with source citations:
      _Source: [URL]_

  # Capability prompts
  - id: {capability-name}-prompt
    content: |
      ## {Capability Title}

      Prerequisites: Ensure BAM context loaded via `bam-{domain}-context`

      **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `{pattern_id}`

      {Detailed instructions...}
```

### 3. Create Corresponding Agent Guide

Create the agent guide in `src/data/agent-guides/bam/`:

```markdown
# BAM {Domain} Guide

**When to load:** During Phase {N} ({Phase Name}) when {conditions},
or when user mentions {keywords}.

**Integrates with:** {Agent name} ({Role}), {capabilities}

---

## Core Concepts

### {Concept 1}

{Explanation relevant to this agent's perspective}

### {Concept 2}

{Explanation with agent-specific framing}

## Application Guidelines

When {doing specific task}:
1. {Guidance step 1}
2. {Guidance step 2}
3. {Guidance step 3}

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| {Case 1}  | {Action}      | {Why}     |
| {Case 2}  | {Action}      | {Why}     |

## Related Workflows

- `bmad-bam-{workflow}` - {When to use}

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **{Domain} patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter by category: `{category}-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "{domain} patterns {date}"
- Search: "{specific topic} multi-tenant {date}"
```

### 4. Required Menu Items

Every extension must include:

| Menu Item | Purpose | Trigger Pattern |
|-----------|---------|-----------------|
| Context loader | Load domain context | `bam-{domain}-context` |
| Web research | Research current practices | `bam-{domain}-research` |

### 5. What NOT To Do

```yaml
# WRONG - breaks BMB compatibility
memories:
  - "Some context to inject"
  - "Another memory"

# WRONG - arrays instead of strings for capabilities
capabilities:
  - "capability one"
  - "capability two"

# WRONG - hardcoded paths
prompts:
  - id: example
    content: |
      Read `/home/user/project/_bmad/bam/...`  # Use {project-root} instead
```

### 6. Run Tests to Validate

```bash
npm test
```

Tests verify:
- Extension has required metadata fields
- No `memories:` field present
- Menu items reference valid prompt IDs
- Prompts use `{project-root}` placeholder
- Agent guide exists for the extension

## Extension Base Agents

| Extension Pattern | Base Agent |
|-------------------|------------|
| analyst-bam | bmad-agent-analyst |
| architect-bam | bmad-agent-architect |
| dev-bam | bmad-agent-dev |
| pm-bam | bmad-agent-pm |
| ux-bam | bmad-agent-ux-designer |
| tech-writer-bam | bmad-agent-tech-writer |
| tea-bam | bmad-tea |
| wds-saga-bam | wds-agent-saga-analyst |
| wds-freya-bam | wds-agent-freya-ux |
| cis-*-bam | bmad-cis-agent-* |

## Example: Complete Extension

```yaml
# src/extensions/analyst-bam.yaml

agent:
  metadata:
    extends: 'bmad-agent-analyst'
    module: 'bam'
    description: "Adds multi-tenant SaaS discovery capabilities"

menu:
  - trigger: bam-context
    action: "#load-bam-context-prompt"
    description: Load BAM multi-tenant discovery context
  - trigger: bam-analyst-research
    action: "#web-research-analyst-prompt"
    description: Conduct web research for analyst decisions
  - trigger: bam-analyst-discover-contexts
    action: "#discover-contexts-prompt"
    description: Identify bounded contexts for multi-tenant SaaS

prompts:
  - id: load-bam-context-prompt
    content: |
      ## Load BAM Multi-Tenant Context

      Read and internalize the BAM discovery guide:
      `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-context.md`

      Confirm when loaded.

  - id: web-research-analyst-prompt
    content: |
      ## BAM Web Research - Analyst

      Conduct targeted web research to verify current best practices.

      **Research Focus:** {{research_topic}}

      Execute 2-3 targeted searches:
      Search the web: "{{research_topic}} best practices {date}"
      Search the web: "{{research_topic}} multi-tenant SaaS {date}"

      Return findings with source citations:
      _Source: [URL]_

  - id: discover-contexts-prompt
    content: |
      ## Bounded Context Discovery for Multi-Tenant SaaS

      Prerequisites: Ensure BAM context loaded via `bam-context`

      **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

      Analyze the domain and identify bounded contexts...
```

## Related

- [Add Workflow](add-workflow.md) - Creating workflows
- [Use Web Research](use-web-research.md) - Web search integration
- [CLAUDE.md](../../CLAUDE.md) - Full reference documentation
