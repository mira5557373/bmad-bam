# Step 1: Gather Gate Evidence

## Purpose

Collect evidence from all quality gates to establish the baseline for comprehensive QA review.

## Prerequisites

- Master architecture document exists
- Quality gate checklists completed
- **Load patterns:** `{project-root}/_bmad/bam/data/quality-gates.csv`
- **Load checklists:** `{project-root}/_bmad/bam/data/checklists/`

## Actions

### 1. Identify Completed Gates

Query gate status from all validation workflows:

| Gate | Source Workflow | Evidence Location | Status |
|------|-----------------|-------------------|--------|
| QG-F1 | validate-foundation | `{output_folder}/planning-artifacts/foundation-gate-report.md` | |
| QG-M1 | validate-module | `{output_folder}/planning-artifacts/module-architecture-report.md` | |
| QG-M2 | validate-module | `{output_folder}/planning-artifacts/tenant-isolation-report.md` | |
| QG-M3 | validate-module | `{output_folder}/planning-artifacts/agent-runtime-report.md` | |
| QG-I1 | convergence-verification | `{output_folder}/planning-artifacts/convergence-report.md` | |
| QG-I2 | convergence-verification | `{output_folder}/planning-artifacts/tenant-safety-report.md` | |
| QG-I3 | convergence-verification | `{output_folder}/planning-artifacts/agent-safety-report.md` | |
| QG-P1 | (this workflow) | `{output_folder}/quality-artifacts/production-readiness.md` | |

### 2. Collect Gate Artifacts

For each completed gate, collect:
- Gate validation report
- PASS/FAIL/CONDITIONAL status
- Critical findings
- Remediation status

### 3. Identify Missing Evidence

| Missing Gate | Required Before | Blocking? |
|--------------|-----------------|-----------|
| ... | ... | ... |

### 4. Document Evidence Matrix

Create evidence matrix showing:
- Gate ID and name
- Validation date
- Validator
- Outcome (PASS/FAIL/CONDITIONAL)
- Artifact references

## Web Research Verification

Search the web: "quality gate evidence collection best practices {date}"
Search the web: "SaaS quality assurance audit patterns {date}"

## Verification

- [ ] All applicable gates identified
- [ ] Evidence collected for completed gates
- [ ] Missing evidence documented
- [ ] Evidence matrix created

## Outputs

- Gate evidence matrix
- Missing evidence list

## Next Step

Proceed to `step-02-c-assess-tenant-isolation.md` with gate evidence.
