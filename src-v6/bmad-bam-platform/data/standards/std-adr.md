---
id: std-adr
title: BAM Architecture Decision Record Standard
category: standard
kind: fragment
qg_ref: null
last_reviewed: 2026-05-12
version: 1.0.0
status: active
author: atlas
references: ["docs/v6-final-architecture.md#43-sidecar-memory--adr-directory-format"]
tested-against: []
---

# ADR Standard (MADR-lite)

All ADRs MUST follow this format. One ADR per file. Append-only. Files live at:

```
_bmad/_memory/<persona>/architecture-decisions/<YYYY-MM-DD>-<NNN>-<title-kebab-case>.md
```

## Frontmatter (required, 11 fields)

```yaml
---
id: 2026-05-12-002
title: Activation Path A (npm postinstall) selected for v6.0
status: accepted              # proposed | accepted | superseded | deprecated
date: 2026-05-12
persona: atlas
related-personas: []          # other personas materially involved
modules: [bmad-bam-platform]  # affected modules
supersedes: null              # ADR id that this supersedes
superseded-by: null           # ADR id that supersedes this
assumptions: []               # bullet list; explicit assumptions made
dependencies-on-other-decisions: []  # array of ADR ids this depends on
generated-by: claude-opus-4-7        # AI model that drafted; null if user-written
authored-by: user             # user | <persona> | collaborative
---
```

## Body sections (required, in order)

```markdown
## Context

What we're deciding and why now. 2-5 sentences. Cite triggering events.

## Decision

What we picked. Be concrete; reference specific options.

## Consequences

What this means downstream. Both positive and negative. Cite affected modules / workflows.

## Alternatives Considered

What we rejected and why. Each alternative gets 1-2 sentences.
```

## Supersession

To supersede an existing ADR:
1. Create a new ADR file with the next sequential NNN
2. In the new ADR's frontmatter, set `supersedes: <old-id>`
3. Edit the old ADR's frontmatter: `status: superseded`, `superseded-by: <new-id>`
4. Add a note in the old ADR's body: "Superseded — see <new-id>"

Never delete an ADR. Sidecar memory is append-only.

## INDEX.md

Each persona's `architecture-decisions/` directory has an `INDEX.md`:

```markdown
# <Persona> — Architecture Decisions Index

| ID | Title | Status | Date |
|---|---|---|---|
| 2026-05-11-001 | Wave 0 plan selected | accepted | 2026-05-11 |
| 2026-05-12-002 | Activation Path A selected | accepted | 2026-05-12 |
```

`record-decision` workflow maintains INDEX.md automatically.
