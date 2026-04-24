---
name: template-management-template
description: Template lifecycle management specification
category: management
version: 1.0.0
---

# Template Management Specification

| Metadata           | Value                 |
|--------------------|-----------------------|
| Project            | {{project_name}}      |
| Module             | {{module_name}}       |
| Version            | {{version}}           |
| Date               | {{date}}              |
| Author             | {{author}}            |

## Overview

This document defines the lifecycle management process for templates in {{module_name}}.

## Template Lifecycle States

| State | Description | Allowed Transitions |
|-------|-------------|---------------------|
| **Draft** | Template under development | Review, Deprecated |
| **Review** | Awaiting approval | Active, Draft, Deprecated |
| **Active** | Approved for production use | Review, Deprecated |
| **Deprecated** | Scheduled for removal | Archived |
| **Archived** | Removed from active use | None |

```
Draft ──► Review ──► Active ──► Deprecated ──► Archived
  ▲          │         │            │
  └──────────┴─────────┴────────────┘
```

## Template Governance

### Ownership

| Role | Responsibilities |
|------|------------------|
| Template Owner | Create, maintain, deprecate templates |
| Reviewer | Approve template changes |
| Consumer | Use templates, report issues |

### Change Process

1. **Propose**: Create draft with changes
2. **Review**: Technical review by designated reviewer
3. **Test**: Validate template produces correct output
4. **Approve**: Reviewer approves for activation
5. **Release**: Template moves to Active state

### Version Control

| Change Type | Version Impact | Example |
|-------------|----------------|---------|
| New variable | Minor | 1.0.0 → 1.1.0 |
| Section restructure | Minor | 1.1.0 → 1.2.0 |
| Breaking change | Major | 1.2.0 → 2.0.0 |
| Bug fix | Patch | 1.2.0 → 1.2.1 |

## Template Standards

### Required Structure

```markdown
---
name: template-name
description: One-line description
category: category-name
version: X.Y.Z
---

# Template Title

| Metadata | Value |
|----------|-------|
| Project  | {{project_name}} |

## Overview
## Sections...
## Web Research Queries
## Verification Checklist
## Change Log
```

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| File name | `{domain}-{purpose}-template.md` | `tenant-onboarding-template.md` |
| Frontmatter name | Match file name (no .md) | `tenant-onboarding-template` |
| Variables | `{{lowercase_snake_case}}` | `{{tenant_id}}` |

## Quality Requirements

| Requirement | Threshold | Validation |
|-------------|-----------|------------|
| Frontmatter present | Required | Automated |
| Verification checklist | Required | Automated |
| Change log | Required | Automated |
| Word count | > 100 words | Automated |
| No TBD/TODO | 0 allowed | Automated |

## Deprecation Process

1. Mark template as Deprecated in catalog
2. Add deprecation notice to template header
3. Notify all known consumers
4. Provide migration guide to replacement
5. Archive after {{deprecation_period}} (minimum 30 days)

## Web Research Queries

- Search: "template lifecycle management {date}"
- Search: "documentation versioning best practices {date}"

## Verification Checklist

- [ ] Lifecycle states defined
- [ ] Governance roles assigned
- [ ] Change process documented
- [ ] Standards specified
- [ ] Deprecation process defined

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0   | {{date}} | {{author}} | Initial specification |
