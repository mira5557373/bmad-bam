# Step 1: Inventory Components

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. Use web search when directed
> 4. DO NOT skip verification

## Purpose

Inventory all components requiring PRG validation before production.

## Prerequisites

- Convergence verification completed
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/prg-gate-implementation.md`

## Actions

### 1. List Deployable Components

| Component | Type | Risk Level | PRG Path |
|-----------|------|------------|----------|
| | Agent / Service / Config | High/Medium/Low | Full/Partial/Mini |

### 2. Identify Dependencies

```
Component A
    ├── depends on: Component B
    ├── depends on: Component C
    └── external: Service X
```

### 3. Determine PRG Scope

**Verify current best practices with web search:**
Search the web: "production readiness checklist AI deployment {date}"

| Scenario | PRG Scope | Checks Required |
|----------|-----------|-----------------|
| New agent | Full PRG | All 10 |
| Minor update | Partial PRG | 1, 2, 4, 7 |
| Config change | Mini PRG | 1, 7 |

## Verification

- [ ] All components inventoried
- [ ] Dependencies mapped
- [ ] PRG scope determined per component

## Outputs

- Component inventory
- Dependency graph
- PRG scope assignments

## Next Step

Proceed to `step-02-c-map-prg-checks.md` with component inventory.
