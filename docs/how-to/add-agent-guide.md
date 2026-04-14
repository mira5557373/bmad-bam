---
title: How to Add an Agent Guide
description: Step-by-step guide to creating a new BAM agent guide
category: how-to
---

# How to Add an Agent Guide

This guide walks you through creating a new agent guide for BAM following the WDS agent-guides pattern.

## Overview

Agent guides provide domain-specific context that is loaded into agents via extension prompts. They replace the deprecated `memories:` field with a more flexible, file-based approach.

## Prerequisites

- Understanding of the domain you're documenting
- Knowledge of which agents will use this guide
- Familiarity with BAM patterns and workflows

## Step 1: Create the Guide File

Create a new markdown file in `src/data/agent-guides/bam/`:

```bash
touch src/data/agent-guides/bam/{domain-name}.md
```

## Step 2: Add Required Headers

Every agent guide must have these headers:

```markdown
# BAM {Domain} Guide

**When to load:** During Phase {N} ({Phase Name}) when {conditions},
or when user mentions {keywords}.

**Integrates with:** {Agent name} ({Role}), {capabilities}

---
```

## Step 3: Add Core Concepts Section

```markdown
## Core Concepts

### {Concept 1}

{Explanation relevant to this agent's perspective}

| Term | Definition | Example |
|------|------------|---------|
| {Term} | {Definition} | {Example} |

### {Concept 2}

{Explanation with agent-specific framing}
```

## Step 4: Add Decision Framework

```markdown
## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| {Case 1}  | {Action}      | {Why}     |
| {Case 2}  | {Action}      | {Why}     |
| {Case 3}  | {Action}      | {Why}     |
```

## Step 5: Add Related Workflows

```markdown
## Related Workflows

- `bmad-bam-{workflow-1}` - {When to use}
- `bmad-bam-{workflow-2}` - {When to use}
- `bmad-bam-{workflow-3}` - {When to use}
```

## Step 6: Add Related Patterns Section

```markdown
## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **{Domain} patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `{category}-*`
- **Tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "{domain} patterns {date}"
- Search: "{specific topic} multi-tenant {date}"
- Search: "{related technology} best practices {date}"
```

## Step 7: Reference from Extension

Add the guide reference to the appropriate extension's context-loader prompt:

```yaml
prompts:
  - id: load-{domain}-context-prompt
    content: |
      Read and internalize the BAM guide:
      `{project-root}/_bmad/bam/data/agent-guides/bam/{domain-name}.md`
      
      Confirm when loaded.
```

## Step 8: Update Test Count

Update `test/install.test.js` to expect the new guide count:

```javascript
test('has 112 agent guides', () => {  // Increment from 111
  const guides = fs.readdirSync(guidesDir)
    .filter(f => f.endsWith('.md'));
  expect(guides.length).toBe(112);
});
```

## Checklist

Before submitting:

- [ ] File created in `src/data/agent-guides/bam/`
- [ ] "When to load:" header present
- [ ] "Integrates with:" header present
- [ ] Core Concepts section with tables
- [ ] Decision Framework section with table
- [ ] Related Workflows section with 3+ workflows
- [ ] Related Patterns section with CSV references
- [ ] Web Research subsection
- [ ] Referenced in at least one extension prompt
- [ ] Test count updated
- [ ] `npm test` passes

## Examples

See existing guides for reference:
- `platform-architecture.md` - Comprehensive architecture guide
- `tenant-isolation.md` - Security-focused guide
- `ai-runtime.md` - Technical runtime guide
