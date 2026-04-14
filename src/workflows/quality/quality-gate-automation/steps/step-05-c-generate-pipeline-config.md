# Step 5: Generate Pipeline Configuration

## Purpose

Generate CI/CD pipeline configuration files with quality gate integration.

## Prerequisites

- **Load template:** `{project-root}/_bmad/bam/templates/pipeline-config-template.yaml`

## Actions

### 1. Generate GitHub Actions Config

```yaml
# Example structure (not implementation code)
name: Quality Gates
on: [push, pull_request]

jobs:
  test-gates:
    steps:
      - run-unit-tests
      - run-integration-tests
      - run-isolation-tests
      
  security-gates:
    steps:
      - security-scan
      - agent-safety-tests
      
  quality-gate-check:
    needs: [test-gates, security-gates]
    steps:
      - aggregate-results
      - evaluate-thresholds
      - gate-decision
```

### 2. Generate Gate Check Script

| Script | Purpose | Output |
|--------|---------|--------|
| gate-evaluator.sh | Evaluate gate status | PASS/FAIL |
| threshold-checker.sh | Check thresholds | Results JSON |
| bypass-validator.sh | Validate bypass token | Boolean |

### 3. Generate Configuration Files

| File | Purpose |
|------|---------|
| .github/workflows/quality-gates.yaml | GitHub Actions |
| gitlab-ci-quality.yaml | GitLab CI |
| gate-thresholds.json | Threshold config |
| bypass-policy.yaml | Bypass rules |

## Web Research Verification

Search the web: "GitHub Actions quality gates configuration {date}"
Search the web: "GitLab CI quality gate automation {date}"

## Verification

- [ ] Pipeline configuration generated
- [ ] Gate check scripts defined
- [ ] All configs created

## Outputs

- `gate-automation-spec.md` - Complete specification
- Pipeline configuration files
