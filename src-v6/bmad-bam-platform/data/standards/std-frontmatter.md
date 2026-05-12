---
id: std-frontmatter
title: BAM Fragment / Pattern Frontmatter Standard
category: standard
kind: fragment
qg_ref: null
last_reviewed: 2026-05-12
version: 1.0.0
status: active
author: atlas
references: ["docs/v6-final-architecture.md#62-fragment--pattern-frontmatter-schema"]
tested-against: []
---

# Frontmatter Standard

All BAM fragments and patterns MUST have YAML frontmatter with these 10 fields.

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
| `tested-against` | array of {platform, verified} objects | Platforms where the pattern was empirically verified, with verification dates |

## Validation

Every fragment/pattern file MUST be parseable by `python3 -c "import yaml; yaml.safe_load(open(f).read().split('---')[1])"`. CI enforces this.

## Updates

When a fragment's content changes:
- Bump `version` per the rules above
- Update `last_reviewed`
- Add entries to `tested-against` if newly verified against a platform
- Update `status` if deprecating or marking experimental
