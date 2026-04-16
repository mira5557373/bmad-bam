# Quality Assurance Review

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new QA review report | `step-01-c-*` through `step-06-c-*` |
| **Edit** | Update existing QA review | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Verify QA coverage | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless QA review report exists.

## Phase 5 - Quality Integration

This workflow is the **primary Phase 5-Quality workflow** for BAM. It consolidates quality activities that are embedded in validate-* workflows into a comprehensive quality assurance review.

### Quality Gate Coverage

| Gate | Validated By | Status Check |
|------|--------------|--------------|
| QG-F1 | validate-foundation | Foundation compliance |
| QG-M1 | validate-module | Module architecture |
| QG-M2 | validate-module | Tenant isolation |
| QG-M3 | validate-module | Agent runtime |
| QG-I1 | convergence-verification | Convergence |
| QG-I2 | convergence-verification | Tenant safety |
| QG-I3 | convergence-verification | Agent safety |
| QG-P1 | This workflow | Production readiness |

### Create Mode

Follow Create steps sequentially:
1. `step-01-c-gather-gate-evidence` - Collect evidence from all quality gates
2. `step-02-c-assess-tenant-isolation` - Review tenant isolation test coverage
3. `step-03-c-verify-integration-tests` - Analyze integration test coverage
4. `step-04-c-check-compliance-status` - Verify compliance requirements
5. `step-05-c-aggregate-quality-metrics` - Calculate quality metrics
6. `step-06-c-generate-qa-report` - Produce QA review report

### Edit Mode

Follow Edit steps:
1. `step-10-e-load-existing` - Load existing QA review
2. `step-11-e-apply-changes` - Apply updates to review

### Validate Mode

Follow Validate steps:
1. `step-20-v-load-artifact` - Load QA report
2. `step-21-v-validate` - Verify QA coverage completeness
3. `step-22-v-generate-report` - Generate validation report
