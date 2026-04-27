---
name: bmad-bam-white-labeling
description: 'Design white-label architecture'
module: bam
tags: [workflow]
---

# White Labeling

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize the white-labeling design workflow by loading tier configurations, pattern references, and identifying the customization dimensions relevant to the project. 

## Prerequisites


- Project context established
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `customization`
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/white-labeling-guide.md`

**Web Research (Required):**

Search the web: "white label SaaS architecture patterns {date}"
Search the web: "multi-tenant customization best practices {date}"

## Outputs


- **Primary output:** `{output_folder}/planning-artifacts/white-labeling-design.md`
- Executive summary of white-labeling capabilities
- Complete tier feature matrix
- Implementation architecture specification
- Phased implementation roadmap
- Architectural decision records

## Related Workflows



## Domain References

- `{project-root}/_bmad/bam/data/agent-guides/bam/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
