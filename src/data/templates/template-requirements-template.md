---
name: template-requirements-template
description: Requirements specification for new templates
category: management
version: 1.0.0
---

# Template Requirements Specification

| Metadata           | Value                 |
|--------------------|-----------------------|
| Project            | {{project_name}}      |
| Template Name      | {{template_name}}     |
| Requestor          | {{requestor}}         |
| Date               | {{date}}              |
| Priority           | {{priority}}          |

## Overview

This document specifies the requirements for creating a new template: **{{template_name}}**.

## Business Justification

### Problem Statement

{{problem_statement}}

### Expected Benefits

| Benefit | Measurement | Target |
|---------|-------------|--------|
| {{benefit_1}} | {{metric_1}} | {{target_1}} |
| {{benefit_2}} | {{metric_2}} | {{target_2}} |

### Stakeholders

| Role | Name | Interest |
|------|------|----------|
| Requestor | {{requestor}} | Primary user |
| Owner | {{owner}} | Will maintain template |
| Consumers | {{consumers}} | Will use template outputs |

## Functional Requirements

### Required Sections

| Section | Purpose | Required |
|---------|---------|----------|
| {{section_name}} | {{section_purpose}} | Yes/No |

### Required Variables

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `{{var_name}}` | {{type}} | {{description}} | {{example}} |

### Output Specification

| Attribute | Requirement |
|-----------|-------------|
| Format | Markdown |
| Location | {{output_location}} |
| Naming | {{naming_convention}} |

## Non-Functional Requirements

### Quality Standards

| Standard | Requirement |
|----------|-------------|
| BMAD Compliance | Must have frontmatter, verification checklist, change log |
| Word Count | Minimum {{min_words}} words |
| Placeholders | All `{{variables}}` must be documented |

### Integration Requirements

| Integration | Description |
|-------------|-------------|
| Workflow | Used by `{{workflow_name}}` |
| Quality Gate | Required for `{{gate_id}}` |
| Downstream | Feeds into `{{downstream_template}}` |

## Acceptance Criteria

- [ ] All required sections present
- [ ] All required variables documented
- [ ] Passes template validation tests
- [ ] Reviewed and approved by {{reviewer}}
- [ ] Added to template catalog
- [ ] Usage instructions provided

## Design Constraints

| Constraint | Description |
|------------|-------------|
| Compatibility | Must work with existing {{constraint_1}} |
| Format | Must follow BMAD template standards |
| Naming | Must follow `{domain}-{purpose}-template.md` pattern |

## Timeline

| Milestone | Target Date | Owner |
|-----------|-------------|-------|
| Requirements approved | {{date_1}} | Requestor |
| Draft complete | {{date_2}} | Owner |
| Review complete | {{date_3}} | Reviewer |
| Active status | {{date_4}} | Owner |

## Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| {{dependency_1}} | Required | {{status}} |
| {{dependency_2}} | Optional | {{status}} |

## Web Research Queries

- Search: "template requirements specification {date}"
- Search: "documentation template design {date}"

## Verification Checklist

- [ ] Problem statement clear
- [ ] Benefits measurable
- [ ] Required sections specified
- [ ] Required variables documented
- [ ] Acceptance criteria defined
- [ ] Timeline realistic

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0   | {{date}} | {{author}} | Initial requirements |
