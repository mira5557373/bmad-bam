---
name: quarterly-operations-trigger
displayName: Quarterly Operations Trigger
description: 'Scheduled trigger for quarterly operational reviews and audits'
module: bam
web_bundle: false
tags: [operations, trigger, scheduled]
---

# Quarterly Operations Trigger

## Overview

This is a scheduled event trigger workflow that initiates quarterly operational reviews. It serves as an entry point for:
- QG-SA1 (Security Audit)
- QG-PR1 (Performance Review)
- QG-DR1 (Disaster Recovery Drill)
- QG-CP1 (Capacity Planning)

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Initialize quarterly review cycle | `step-01-c-*` |
| Edit | Modify quarterly schedule | `step-10-e-*` |
| Validate | Validate quarterly setup | `step-20-v-*` |

## Prerequisites

- Production environment operational
- Previous quarterly review completed
- Stakeholders availability confirmed

## Outputs

- Quarterly review kickoff notification
- Review schedule and assignments
- Gate evaluation initiation

## Related Workflows

- `bmad-bam-security-audit-execution` - Security audit process
- `bmad-bam-performance-review-execution` - Performance review
- `bmad-bam-disaster-recovery-drill` - DR testing
- `bmad-bam-capacity-planning-review` - Capacity assessment
