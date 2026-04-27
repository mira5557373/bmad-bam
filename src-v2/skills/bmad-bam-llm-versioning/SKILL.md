---
name: bmad-bam-llm-versioning
description: 'Design LLM versioning strategy'
module: bam
tags: [workflow]
---

# LLM Versioning

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize the LLM versioning design by loading AI runtime configuration, identifying all model versions currently deployed, and establishing the versioning design scope. This step gathers context required for tenant-aware LLM version management. 

## Prerequisites


- Master architecture complete with AI runtime selection
- AI runtime configuration established
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv` → filter: `{ai_runtime}`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-versioning
- **Load guide:** `{project-root}/_bmad/bam/data/domains/llm-versioning.md`

## Outputs


- Complete LLM versioning design: `{output_folder}/planning-artifacts/ai/llm-versioning-design.md`
- Updated cross-references in related artifacts
- Quality gate pre-check results

## Related Workflows

- `bmad-bam-agent-runtime`
- `bmad-bam-convergence`
- `bmad-bam-tool-contracts`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
