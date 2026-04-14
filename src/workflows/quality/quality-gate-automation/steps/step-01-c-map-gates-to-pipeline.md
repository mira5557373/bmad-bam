# Step 1: Map Gates to Pipeline Stages

## Purpose

Map quality gates to appropriate CI/CD pipeline stages.

## Prerequisites

- Quality gates defined
- **Load patterns:** `{project-root}/_bmad/bam/data/quality-gates.csv`

## Actions

### 1. Define Pipeline Stages

| Stage | Purpose | Trigger |
|-------|---------|---------|
| Build | Compile and unit tests | Push |
| Test | Integration tests | PR |
| Security | Security scanning | PR |
| Deploy-Staging | Staging deployment | Merge |
| Gate-Check | Quality gate validation | Pre-deploy |
| Deploy-Production | Production deployment | Gate pass |

### 2. Map Gates to Stages

| Gate | Pipeline Stage | Blocking | Check Type |
|------|----------------|----------|------------|
| QG-M2 (Tenant Isolation) | Test | Yes | Automated |
| QG-I2 (Tenant Safety) | Security | Yes | Automated |
| QG-I3 (Agent Safety) | Security | Yes | Automated |
| QG-I1 (Convergence) | Gate-Check | Yes | Automated |
| QG-P1 (Production) | Gate-Check | Yes | Mixed |

### 3. Define Gate Dependencies

| Gate | Depends On | Must Pass Before |
|------|------------|------------------|
| QG-M2 | QG-M1 | Integration tests |
| QG-I1 | QG-M2, QG-M3 | Staging deploy |
| QG-P1 | QG-I1, QG-I2, QG-I3 | Production deploy |

## Web Research Verification

Search the web: "CI/CD quality gates best practices {date}"
Search the web: "pipeline stage quality gate integration {date}"

## Verification

- [ ] All gates mapped to stages
- [ ] Dependencies defined
- [ ] Blocking behavior specified

## Outputs

- Gate-to-pipeline mapping

## Next Step

Proceed to `step-02-c-design-automated-checks.md`.
