# Step 3: Design Gate Automation

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. Use web search when directed
> 4. DO NOT skip verification

## Purpose

Design automation for the 6 automatable PRG checks.

## Prerequisites

- Step 2 completed (check mapping)

## Actions

### 1. Design CI/CD Integration

```yaml
prg_gate:
  trigger: on_release_branch
  
  automated_checks:
    - name: tenant_isolation
      script: npm run test:tenant-isolation
      timeout: 300s
      critical: true
    
    - name: action_contracts
      script: npm run validate:contracts
      timeout: 60s
      critical: true
    
    - name: audit_trail
      script: npm run verify:audit-logs
      timeout: 120s
      critical: true
    
    - name: loop_bindings
      script: npm run validate:loops
      timeout: 60s
      critical: false
    
    - name: observability
      script: npm run check:observability
      timeout: 60s
      critical: false
    
    - name: resource_budgets
      script: npm run check:budgets
      timeout: 30s
      critical: false
```

### 2. Design Semi-Automated Checks

**Verify current best practices with web search:**
Search the web: "chaos engineering automated testing {date}"

| Check | Automation Level | Human Step |
|-------|------------------|------------|
| Rollback (3) | Script runs | Verify recovery |
| Chaos (9) | Chaos runner | Analyze results |

### 3. Design Manual Check Workflow

| Check | Workflow | SLA |
|-------|----------|-----|
| Confidence thresholds (6) | PR review + approval | 4 hours |
| Human sign-off (10) | Release approval | 2 hours |

## Verification

- [ ] CI/CD pipeline configured
- [ ] Semi-auto checks defined
- [ ] Manual workflow designed
- [ ] SLAs documented

## Outputs

- CI/CD pipeline configuration
- Semi-automated check scripts
- Manual workflow specification

## Next Step

Proceed to `step-04-c-configure-thresholds.md` with automation design.
