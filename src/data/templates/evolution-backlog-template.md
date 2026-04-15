---
name: Evolution Backlog Template
description: Template for tracking proposed changes to frozen master architecture
category: architecture
version: 1.0.0
type: "documentation"
---

# Evolution Backlog

> Candidates for master architecture evolution. Managed by Platform Architect.
> See S21.11 (Master Architecture Evolution Protocol) for the evaluation process.

## Purpose

This backlog tracks proposed changes to the frozen master architecture. Changes are heavyweight by design - the master architecture is the platform foundation and must remain stable.

## Backlog Table

| ID      | Source              | Type             | Description       | Impact Score | Status   | Owner |
| ------- | ------------------- | ---------------- | ----------------- | ------------ | -------- | ----- |
| EVO-001 | Retro {{date}}      | PATTERN_ADDITION | {{description}}   | {{score_0_8}} | pending  | {{owner}} |
| EVO-002 | Module {{module_name}} | TECH_REFRESH  | {{description}}   | {{score_0_8}} | approved | {{owner}} |

## Field Definitions

| Field | Description |
|-------|-------------|
| **ID** | Unique identifier (EVO-XXX format) |
| **Source** | Origin: retro, module request, incident, compliance audit |
| **Type** | See type values below |
| **Description** | Concise change description (one sentence) |
| **Impact Score** | 0-8 scale, see scoring criteria |
| **Status** | Lifecycle state |
| **Owner** | Responsible architect |

## Type Values

| Type | Description | Typical Impact |
|------|-------------|----------------|
| **TECH_REFRESH** | Upgrade existing technology (e.g., Node 20 → 22) | 2-4 |
| **PATTERN_ADDITION** | Add new architectural pattern to the allowed set | 3-5 |
| **MAJOR_EVOLUTION** | Significant architectural change (e.g., add new shared kernel service) | 6-8 |
| **DEPRECATION** | Remove or phase out existing pattern/technology | 4-6 |

## Status Values

| Status | Description |
|--------|-------------|
| **pending** | Awaiting evaluation |
| **approved** | Accepted, scheduled for implementation |
| **deferred** | Valid but postponed to future cycle |
| **rejected** | Evaluated and declined with rationale |

## Impact Scoring Criteria (0-8)

| Score | Impact Level | Examples |
|-------|--------------|----------|
| 0-2 | Cosmetic/Low | Documentation update, minor tooling change |
| 3-4 | Moderate | Single module affected, no interface changes |
| 5-6 | Significant | Multiple modules affected, interface changes |
| 7-8 | Cross-cutting | All modules affected, requires ADR and migration |

## Review Process

1. Submit evolution candidate with complete fields
2. Platform Architect assigns impact score
3. Evolution committee review (for score ≥ 5)
4. Status update with rationale
5. If approved: create ADR, plan migration, update master architecture

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "architecture evolution backlog best practices {date}"
- "master architecture change management multi-tenant SaaS patterns {date}"
- "platform evolution governance enterprise implementation {date}"

Incorporate relevant findings into the document sections above.

---

## Verification Checklist

- [ ] All evolution candidates have unique IDs in EVO-XXX format
- [ ] Source of each candidate is documented (retro, module, incident, audit)
- [ ] Change type is categorized (TECH_REFRESH, PATTERN_ADDITION, MAJOR_EVOLUTION, DEPRECATION)
- [ ] Impact score is assigned using 0-8 scoring criteria
- [ ] Status reflects current lifecycle state
- [ ] Owner is assigned for each evolution candidate
- [ ] High-impact changes (score >= 5) have evolution committee review scheduled
- [ ] Approved changes have ADR created with migration plan
- [ ] Rejected changes have documented rationale
- [ ] Deferred changes have target review date
- [ ] Multi-tenant impact is considered in impact scoring
- [ ] Cross-cutting changes include module-level migration planning

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
