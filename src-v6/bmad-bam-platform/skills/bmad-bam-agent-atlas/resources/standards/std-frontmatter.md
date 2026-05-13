---
id: std-frontmatter
title: BAM Fragment / Pattern Frontmatter Standard
category: standard
kind: fragment
qg_ref: null
last_reviewed: 2026-05-13
version: 1.1.0
status: active
author: atlas
references: ["docs/v6-final-architecture.md#62-fragment--pattern-frontmatter-schema"]
tested_against: []
---

# Frontmatter Standard

All BAM fragments and patterns MUST have YAML frontmatter with these 10 fields. Field names use snake_case throughout (see convention map below).

## Required fields

| Field | Type | Purpose |
|---|---|---|
| `id` | kebab-case string | Unique identifier; referenced from CSV index and cross-refs |
| `title` | string | Human-readable title for indexes and search |
| `category` | string | Grouping for navigation (e.g., `tenant-isolation`, `ai-runtime`) |
| `kind` | enum | `pattern` / `anti-pattern` / `fragment` |
| `qg_ref` | string or null | Quality gate the artifact informs (e.g., `QG-M2`) |
| `last_reviewed` | ISO date (YYYY-MM-DD) | When content was last reviewed; drives §6.8 staleness |
| `version` | semver | Major = breaking decision change; minor = additions; patch = wording |
| `status` | enum | `active` / `deprecated` / `experimental` |
| `author` | persona code or `community` | Who maintains this artifact |
| `references` | array of strings | External citations (URLs, doc paths) |
| `tested_against` | array of {platform, verified} objects | Platforms where the pattern was empirically verified, with verification dates |

## Validation

Every fragment/pattern file MUST be parseable by `python3 -c "import yaml; yaml.safe_load(open(f).read().split('---')[1])"`. CI enforces this.

## Updates

When a fragment's content changes:
- Bump `version` per the rules above
- Update `last_reviewed`
- Add entries to `tested_against` if newly verified against a platform
- Update `status` if deprecating or marking experimental

## Convention map (empirically grounded against BMM)

BMAD ecosystem uses different frontmatter conventions by context. BAM follows the per-context convention rather than forcing a single global rule.

| Context | Convention | Example | Rationale |
|---|---|---|---|
| Step file frontmatter (`step_id`, `auto_runnable`, `gate`, `inputs`, `outputs`) | snake_case | `auto_runnable: true` | BMAD step-file precedent |
| Skill manifest fields (`latency_budget`, `recommended_capabilities`, `minimum_persona_version`) | snake_case | `latency_budget: "45min"` | BMAD manifest precedent |
| customize.toml keys (`persistent_facts`, `activation_steps_append`) | snake_case | `persistent_facts = [...]` | TOML community idiom + BMM convention |
| Fragment/pattern frontmatter (THIS standard) | snake_case | `tested_against: []` | Internal consistency with above |
| ADR frontmatter (per `std-adr.md` / MADR-lite external convention) | kebab-case | `related-personas: [cipher]` | MADR-lite is a well-known external standard with its own tooling; kebab compat preserved |
| Enum VALUES where natural | kebab-case | `status: 'in-progress'` | Multi-word values read more naturally with hyphens |

**Why mixed conventions:** empirical BMM analysis (`external/bmad-method/src/bmm-skills/`) shows BMAD itself uses camelCase for template metadata (`stepsCompleted`, `workflowType`), snake_case for template variables (`project_name`, `sections_completed`), and kebab-case for enum values (`ready-for-dev`, `in-progress`). There is no canonical "BMAD snake_case" rule; each context picks what reads best.

**Why ADRs are the kebab exception:** MADR-lite is BAM's chosen ADR convention. Its tooling ecosystem expects kebab-case keys. Forcing snake_case on ADRs would break MADR-tooling compatibility for no internal benefit.
