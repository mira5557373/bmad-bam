# Step 2: Map PRG Checks

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. Use web search when directed
> 4. DO NOT skip verification

## Purpose

Map the 10 PRG checks to specific validation methods and owners.

## Prerequisites

- Step 1 completed (component inventory)
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-prg-production.md`

## Actions

### 1. Define Check Methods

| # | Check | Method | Tool/Script | Owner |
|---|-------|--------|-------------|-------|
| 1 | Tenant isolation | Automated test | `test:tenant-isolation` | Platform |
| 2 | Action contracts | Schema validation | `validate:contracts` | AI Safety |
| 3 | Rollback tested | Manual + script | `test:rollback` | SRE |
| 4 | Audit trail | Log verification | `verify:audit-logs` | Compliance |
| 5 | Resource budgets | Config check | `check:budgets` | Platform |
| 6 | Confidence thresholds | Review + approve | Manual | AI Safety |
| 7 | Loop bindings | Config validation | `validate:loops` | AI Runtime |
| 8 | Observability | Metrics check | `check:observability` | SRE |
| 9 | Chaos test | Chaos runner | `chaos:agent-failure` | SRE |
| 10 | Human sign-off | Approval workflow | JIRA/GitHub | Release Mgr |

### 2. Define Critical vs Non-Critical

| Critical (Block on Fail) | Non-Critical (Warn Only) |
|-------------------------|-------------------------|
| 1, 2, 4, 6, 10 | 3, 5, 7, 8, 9 |

### 3. Map Check Dependencies

**Verify current best practices with web search:**
Search the web: "deployment gate dependency ordering {date}"

```
Check 1 (Isolation) ──► Check 2 (Contracts) ──► Check 6 (Thresholds)
                                              │
Check 7 (Loops) ◄─────────────────────────────┘
       │
       ▼
Check 8 (Observability) ──► Check 9 (Chaos) ──► Check 10 (Sign-off)
```

## Verification

- [ ] All 10 checks have methods defined
- [ ] Owners assigned
- [ ] Critical/non-critical classified
- [ ] Dependencies mapped

## Outputs

- Check method matrix
- Owner assignments
- Check dependency graph

## Next Step

Proceed to `step-03-c-design-gate-automation.md` with check mapping.
