---
title: How to Troubleshoot Quality Gate Failures
description: Guide to diagnosing and resolving BAM quality gate failures
category: how-to
---

# How to Troubleshoot Quality Gate Failures

This guide helps you diagnose and resolve quality gate failures in BAM workflows.

## Overview

Quality gates can fail for various reasons. This guide covers common failure patterns, root cause analysis, and recovery strategies.

## Gate Failure Outcomes

| Outcome | Meaning | Next Steps |
|---------|---------|------------|
| ✅ PASS | All checks pass | Proceed to next phase |
| ⚠️ CONDITIONAL | Non-critical gaps | Proceed with mitigation plan + deadline |
| ❌ FAIL | Critical check(s) failed | Enter recovery protocol |

## Step 1: Identify the Failed Gate

Check the gate report for which gate failed:

```
{output_folder}/planning-artifacts/quality/{gate-id}-report.md
```

Common gates and their focus:

| Gate | Focus Area | Common Failures |
|------|------------|-----------------|
| QG-F1 | Foundation | Missing artifacts, incomplete tenant model |
| QG-M1 | Module Architecture | Unclear boundaries, missing facades |
| QG-M2 | Tenant Isolation | RLS gaps, cross-tenant access |
| QG-M3 | Agent Runtime | Unregistered tools, missing kill switch |
| QG-I1 | Convergence | Contract mismatches, breaking changes |
| QG-I2 | Tenant Safety | Integration isolation failures |
| QG-I3 | Agent Safety | Guardrail failures, prompt injection |
| QG-P1 | Production | SLO misses, DR gaps |

## Step 2: Classify Root Cause

Use the SCOPE/SKILL/TECH/DESIGN/QUALITY framework:

| Classification | Description | Examples |
|---------------|-------------|----------|
| **SCOPE** | Requirements unclear or changed | Missing requirements, scope creep |
| **SKILL** | Team capability gap | New technology, complex pattern |
| **TECH** | Technical blocker | Infrastructure issue, dependency |
| **DESIGN** | Architecture issue | Wrong pattern, scaling problem |
| **QUALITY** | Implementation bug | Code defect, test gap |

## Step 3: Lock Passed Categories

When a gate fails, categories that passed are "locked":

```markdown
## Gate Status

### Locked Categories (PASS)
- ✅ Artifacts - All present
- ✅ Shared Kernel - Implemented

### Failed Categories
- ❌ Tenant Isolation - RLS policies missing
- ❌ Tests - Cross-tenant tests failing
```

**Do NOT re-test locked categories** during recovery.

## Step 4: Generate Salvage Report

Create a salvage report documenting:

1. What was completed successfully
2. What failed and why
3. Session context that should be preserved
4. Recommended recovery path

## Step 5: Select Recovery Path

| Root Cause | Recovery Action |
|------------|-----------------|
| SCOPE | Re-run discovery with stakeholders |
| SKILL | Add expertise, pair programming |
| TECH | Spike to resolve blocker |
| DESIGN | Architecture review, ADR |
| QUALITY | Focused fix, add tests |

## Step 6: Time-Box Recovery Sprint

Set a deadline for recovery:

| Gate | Recommended Time-Box |
|------|---------------------|
| QG-F1 | 2-3 days |
| QG-M* | 1-2 days |
| QG-I* | 1 day |
| QG-P1 | 4 hours (rollback if exceeded) |

## Step 7: Re-Gate Failed Categories Only

Run validation only on failed categories:

```bash
# Run targeted validation
bmad-bam-validate-{phase} --categories="tenant-isolation,tests"
```

## Recovery Limits

| Attempt | Action |
|---------|--------|
| 1st FAIL | Fix issues, re-gate failed categories |
| 2nd FAIL | Escalate, deeper investigation |
| 3rd FAIL | **MANDATORY COURSE CORRECTION** |

After 3 failures, escalate to project leadership for:
- Scope reduction
- Timeline adjustment
- Architecture pivot
- Resource allocation

## Common Failures and Fixes

### QG-F1: Foundation Gate

| Failure | Cause | Fix |
|---------|-------|-----|
| Missing master-architecture.md | Workflow not run | Run `create-master-architecture` |
| Tenant model incomplete | Decisions not documented | Complete tenant-model-isolation steps |
| Agent runtime undefined | Skipped | Run `agent-runtime-architecture` |

### QG-M2: Tenant Isolation

| Failure | Cause | Fix |
|---------|-------|-----|
| RLS policies missing | Not implemented | Add RLS to all tenant tables |
| Cross-tenant test fails | Isolation gap | Fix authorization, add tenant_id checks |
| Audit logging absent | Not configured | Add tenant-aware audit events |

### QG-M3: Agent Runtime

| Failure | Cause | Fix |
|---------|-------|-----|
| Tools not registered | Missing registry | Register all tools in tool-registry |
| Kill switch > 100ms | Slow implementation | Optimize kill switch path |
| Missing guardrails | NeMo not configured | Add guardrail action rails |

### QG-I1: Convergence

| Failure | Cause | Fix |
|---------|-------|-----|
| Contract mismatch | Breaking change | Run facade-mismatch-recovery |
| Event schema drift | Uncoordinated change | Align event schemas |
| Integration test fails | Interface change | Update consumers |

## Escalation Path

If you cannot resolve within time-box:

1. **Immediate:** Notify PM and tech lead
2. **4 hours:** Escalate to architect
3. **1 day:** Escalate to project leadership
4. **2 days:** Consider scope reduction or pivot

## Related Workflows

- `bmad-bam-facade-mismatch-recovery` - Recover from contract mismatches
- `bmad-bam-ai-agent-debug` - Debug agent runtime issues
- `bmad-bam-validate-foundation` - Re-run foundation validation
- `bmad-bam-validate-module` - Re-run module validation

## Related Patterns

Load recovery patterns from registry:
- `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `recovery-*`
- `{project-root}/_bmad/bam/data/quality-gates.csv` → recovery column
