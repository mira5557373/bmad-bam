---
name: monthly-operations-trigger
displayName: Monthly Operations Trigger
description: 'Scheduled trigger for monthly operational reviews'
module: bam
web_bundle: false
tags: [operations, trigger, scheduled]
---

# Monthly Operations Trigger

## Overview

This is a scheduled event trigger workflow that initiates monthly operational reviews. It serves as an entry point for:
- QG-CS1 (Cost Optimization)
- Monthly compliance checks
- Budget reviews

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Initialize monthly review cycle | `step-01-c-*` |

## Prerequisites

- Production environment operational
- Previous monthly review completed

## Outputs

- Monthly review kickoff
- Cost review initiation

## Related Workflows

- `bmad-bam-cost-optimization-review` - Cost optimization
