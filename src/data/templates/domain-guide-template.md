---
name: domain-guide-template
description: Template for creating consolidated domain pattern guides in BAM
category: agent-guide
version: 1.0.0
---

# BAM {Domain} Patterns Guide

**When to load:** {When this guide should be loaded - list triggers and keywords}
**Integrates with:** {Which agents use this guide - list agent names and roles}

---

## Core Concepts

{High-level explanation of this domain and why it matters in multi-tenant contexts}

### Key Principles

| Principle | Description |
|-----------|-------------|
| {Principle 1} | {Description} |
| {Principle 2} | {Description} |
| {Principle 3} | {Description} |

### The {N} Dimensions of {Domain}

| Dimension | What to Consider | Strategy |
|-----------|------------------|----------|
| {Dimension 1} | {Description} | {Approach} |
| {Dimension 2} | {Description} | {Approach} |
| {Dimension 3} | {Description} | {Approach} |

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and MUST be followed exactly.

### {Convention Category 1}

| Item | Format | Example |
|------|--------|---------|
| {Item} | `{format}` | `{example}` |

### {Convention Category 2}

```
Pattern: {pattern}

Examples:
- {example 1}
- {example 2}
```

### {Convention Headers/Keys}

| Header/Key | Description |
|------------|-------------|
| `{Header}` | {Description} |

---

## Decision Framework

### Quick Decision Matrix

| Situation | Recommendation | Confidence |
|-----------|---------------|------------|
| {Situation 1} | {Pattern/Approach} | High |
| {Situation 2} | {Pattern/Approach} | Medium |
| {Situation 3} | {Pattern/Approach} | High |

### Decision Tree

```
START: {Initial Question}
│
├─► {Answer A}
│   │
│   └─► {Follow-up question?}
│       ├─► YES → {Recommendation A1}
│       └─► NO → {Recommendation A2}
│
└─► {Answer B}
    │
    └─► {Recommendation B}
```

### Trade-off Analysis

| Factor | {Option 1} | {Option 2} | {Option 3} |
|--------|------------|------------|------------|
| {Factor 1} | {Value} | {Value} | {Value} |
| {Factor 2} | {Value} | {Value} | {Value} |
| {Factor 3} | {Value} | {Value} | {Value} |

---

## §{pattern-1-id}

### Pattern: {Pattern 1 Name}

**When to use:** {decision_criteria from pattern registry}
**Phase:** {phase from registry}
**Variants:** {variant list if applicable}

#### Overview

{Brief description of this pattern and its purpose in multi-tenant context}

#### Pattern Structure

```{language}
// {Pattern description}
// Placeholders: {placeholder1}, {placeholder2}
// BAM Convention: {relevant convention}

{Code pattern with placeholders}
```

#### Placeholders

| Placeholder | Replace With | Example |
|-------------|--------------|---------|
| `{placeholder1}` | {Description} | `{example}` |
| `{placeholder2}` | {Description} | `{example}` |

#### Implementation Notes

- {Note 1 about tenant-specific considerations}
- {Note 2 about common pitfalls}
- {Note 3 about integration points}

#### Web Research

For current implementation details, search:
- "{pattern_name} best practices {date}"
- "{pattern_name} multi-tenant {date}"

---

## §{pattern-2-id}

### Pattern: {Pattern 2 Name}

**When to use:** {decision_criteria from pattern registry}
**Phase:** {phase from registry}

#### Overview

{Brief description}

#### Pattern Structure

```{language}
{Code pattern}
```

#### Placeholders

| Placeholder | Replace With | Example |
|-------------|--------------|---------|
| `{placeholder}` | {Description} | `{example}` |

---

## Quality Gates

| Gate | Key Checks | Related Patterns |
|------|------------|------------------|
| {QG-ID} | {Verification items} | §{pattern-id}, §{pattern-id} |
| {QG-ID} | {Verification items} | §{pattern-id} |

### Gate Verification Checklist

- [ ] {Check 1}
- [ ] {Check 2}
- [ ] **CRITICAL:** {Critical check}
- [ ] {Check 3}

---

## Web Research

| Topic | Query |
|-------|-------|
| Current best practices | "{domain} multi-tenant best practices {date}" |
| {Specific topic} | "{query} {date}" |
| {Specific topic} | "{query} {date}" |

---

## Related Patterns

Cross-references to other domain guides:

- `{related-guide-1}.md` §{section} - {Brief description of relationship}
- `{related-guide-2}.md` §{section} - {Brief description of relationship}

Load from pattern registry:
- `bam-patterns.csv` → filter: `{category}-*`

---

## Related Workflows

| Workflow | When to Use |
|----------|-------------|
| `bmad-bam-{workflow-1}` | {Trigger condition} |
| `bmad-bam-{workflow-2}` | {Trigger condition} |

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | {date} | Initial consolidated guide from {N} source files |
