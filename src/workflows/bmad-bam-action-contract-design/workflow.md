# Action Contract Design

## When to Use

- After completing `bmad-bam-agent-runtime-architecture`
- When defining AI agent decision safety controls
- Before implementing agent actions

## Prerequisites

- Agent runtime architecture defined
- Tenant model selected
- Load: `8-field-action-contract-guide.md`

## Workflow Architecture

```
┌─────────────────────────────────────────────────────────┐
│                 Action Contract Design                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  step-01 ──► step-02 ──► step-03 ──► step-04           │
│  Assess      Define      Map         Design             │
│  Actions     Schema      Tenant      Proof              │
│                                                          │
│  step-04 ──► step-05 ──► step-06                        │
│  Design      Configure   Generate                        │
│  Proof       Loops       Spec                           │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new action contract spec | `step-01-c-*` through `step-06-c-*` |
| **Edit** | Modify existing contract spec | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Check contract against QG-AI2 | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless artifact exists.

### Create Mode
Follow Create steps sequentially: step-01-c → step-02-c → step-03-c → step-04-c → step-05-c → step-06-c

### Edit Mode
Follow Edit steps: step-10-e-load → step-11-e-apply

### Validate Mode
Follow Validate steps: step-20-v-load → step-21-v-validate → step-22-v-report
