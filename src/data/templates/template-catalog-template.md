---
name: template-catalog-template
description: Catalog of templates for a module or project
category: management
version: 1.0.0
---

# Template Catalog

| Metadata           | Value                 |
|--------------------|-----------------------|
| Project            | {{project_name}}      |
| Module             | {{module_name}}       |
| Version            | {{version}}           |
| Date               | {{date}}              |
| Author             | {{author}}            |

## Overview

This catalog documents all templates available for {{module_name}}, organized by category and purpose.

## Template Categories

| Category | Count | Description |
|----------|-------|-------------|
| Architecture | {{arch_count}} | System design and structure templates |
| Implementation | {{impl_count}} | Code and configuration templates |
| Quality | {{quality_count}} | Testing and validation templates |
| Operations | {{ops_count}} | Deployment and monitoring templates |

## Architecture Templates

| Template Name | Purpose | Output Location |
|---------------|---------|-----------------|
| {{template_name}} | {{template_purpose}} | {{output_path}} |

## Implementation Templates

| Template Name | Purpose | Variables |
|---------------|---------|-----------|
| {{template_name}} | {{template_purpose}} | {{template_vars}} |

## Quality Templates

| Template Name | Quality Gate | Required For |
|---------------|--------------|--------------|
| {{template_name}} | {{quality_gate}} | {{requirement}} |

## Operations Templates

| Template Name | Phase | Frequency |
|---------------|-------|-----------|
| {{template_name}} | {{phase}} | {{frequency}} |

## Template Dependencies

```
{{template_a}} ──depends-on──► {{template_b}}
                              │
                              ▼
                        {{template_c}}
```

## Usage Instructions

### Loading a Template

1. Identify the required template from the catalog above
2. Load using: `{project-root}/_bmad/bam/data/templates/{{template_file}}`
3. Replace all `{{variable}}` placeholders with actual values
4. Save to the specified output location

### Creating New Templates

1. Follow the BMAD template structure (frontmatter + sections)
2. Register in this catalog
3. Update category counts
4. Run validation tests

## Web Research Queries

- Search: "template management best practices {date}"
- Search: "document template standardization {date}"

## Verification Checklist

- [ ] All templates listed in catalog
- [ ] Category counts accurate
- [ ] Dependencies documented
- [ ] Output locations specified

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0   | {{date}} | {{author}} | Initial catalog |
