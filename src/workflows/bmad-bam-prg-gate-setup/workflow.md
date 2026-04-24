# PRG Gate Setup

## When to Use

- After completing `bmad-bam-convergence-verification`
- When preparing AI agents for production
- Before first production deployment

## Prerequisites

- Convergence verification passed
- Action contracts validated
- Load: `prg-gate-implementation.md`

## Workflow Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    PRG Gate Setup                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  step-01 ──► step-02 ──► step-03 ──► step-04 ──► step-05│
│  Inventory   Map PRG     Design      Configure  Generate │
│  Components  Checks      Automation  Thresholds Spec     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new PRG configuration | `step-01-c-*` through `step-05-c-*` |
| **Edit** | Modify existing configuration | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Check PRG against QG-PRG | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless artifact exists.

### Create Mode
Follow Create steps sequentially: step-01-c → step-02-c → step-03-c → step-04-c → step-05-c

### Edit Mode
Follow Edit steps: step-10-e-load → step-11-e-apply

### Validate Mode
Follow Validate steps: step-20-v-load → step-21-v-validate → step-22-v-report
