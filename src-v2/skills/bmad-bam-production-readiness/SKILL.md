---
name: bmad-bam-production-readiness
description: 'Validate production readiness'
module: bam
tags: [quality-gate, workflow]
---

# Production Readiness

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Quality Gate

**Gate:** QG-P1
