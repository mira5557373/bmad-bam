# Architecture Decision Records (ADRs)

This directory contains Architecture Decision Records (ADRs) for the BAM extension module. ADRs document significant architectural decisions made during the development of BAM.

## What is an ADR?

An Architecture Decision Record captures an important architectural decision made along with its context and consequences. ADRs help future maintainers understand why certain decisions were made.

## ADR Template

```markdown
# ADR-NNN: Title

## Status
[Proposed | Accepted | Deprecated | Superseded by ADR-XXX]

## Context
What is the issue that we're seeing that is motivating this decision?

## Decision
What is the change that we're proposing and/or doing?

## Consequences
What becomes easier or more difficult to do because of this change?
```

## ADR Index

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [ADR-001](ADR-001-extension-only-module.md) | Extension-Only Module Architecture | Accepted | 2026-04-01 |
| [ADR-002](ADR-002-pattern-registry-design.md) | Pattern Registry Design | Accepted | 2026-04-01 |
| [ADR-003](ADR-003-unified-steps-directory.md) | Unified Steps Directory | Accepted | 2026-04-01 |

## Categories

### Module Architecture
- ADR-001: Extension-Only Module Architecture

### Pattern System
- ADR-002: Pattern Registry Design

### Workflow Structure
- ADR-003: Unified Steps Directory

## Creating a New ADR

1. Copy the template above
2. Use the next available ADR number
3. Fill in all sections
4. Add to the index table
5. Submit PR for review
