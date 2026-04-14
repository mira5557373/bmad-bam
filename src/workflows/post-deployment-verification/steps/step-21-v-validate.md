# Step 21: Validate Post-Deployment Verification

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Validate the post-deployment verification artifacts against QG-PD1 quality criteria and deployment readiness standards.

---

## Prerequisites

- Previous step completed (step-20-v-load-artifact.md)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `observability`
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-PD1`
- **Load checklist:** `{project-root}/_bmad/bam/checklists/qg-post-deployment.md`

---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

## Validation Checklist

### Smoke Test Coverage
- [ ] API health endpoint tested and passing
- [ ] Authentication flow tested and passing
- [ ] Tenant-aware endpoints tested with multiple tenants
- [ ] AI agent endpoints tested and responsive
- [ ] Response times within SLA thresholds
- [ ] All critical paths have test coverage

### Monitoring Activation
- [ ] Prometheus metrics being collected
- [ ] Grafana dashboards loading with live data
- [ ] Alert rules active in Alertmanager
- [ ] Log aggregation receiving application logs
- [ ] Tenant context present in logs

### Tenant Health
- [ ] All active tenants enumerated
- [ ] Per-tenant health checks executed
- [ ] All tenants showing healthy status
- [ ] Tier-specific features verified per tier
- [ ] No tenant-specific errors or warnings

### Rollback Readiness
- [ ] Previous version artifacts available
- [ ] Rollback procedure documented
- [ ] Database migrations reversible
- [ ] Rollback time estimated and within SLA
- [ ] Responsible parties identified

### QG-PD1 Post-Deployment Gate Verification
**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-PD1`

- [ ] **smoke_tests_passing** (REQUIRED): All critical path smoke tests pass
- [ ] **monitoring_active** (REQUIRED): Monitoring systems receiving data
- [ ] **alerting_verified**: Alert rules tested and notifications confirmed
- [ ] **tenant_health_green** (REQUIRED): All tenants healthy
- [ ] **rollback_ready** (REQUIRED): Rollback can execute within SLA

**QG-PD1 Required Patterns:**
| Pattern | Required | Status | Evidence |
|---------|----------|--------|----------|
| smoke_tests_passing | **YES** | [ ] Pass / [ ] Fail | Test execution report |
| monitoring_active | **YES** | [ ] Pass / [ ] Fail | Dashboard screenshots |
| alerting_verified | NO | [ ] Pass / [ ] Fail | Alert test results |
| tenant_health_green | **YES** | [ ] Pass / [ ] Fail | Per-tenant status |
| rollback_ready | **YES** | [ ] Pass / [ ] Fail | Rollback checklist |

**QG-PD1 Post-Deployment Gate:** [ ] SATISFIED / [ ] NOT SATISFIED

---

## Gate Decision

- **PASS**: All critical patterns verified, deployment confirmed successful
- **CONDITIONAL**: Minor gaps (e.g., alert testing incomplete) - document gaps, proceed with monitoring
- **FAIL**: Critical pattern failing (smoke tests, monitoring, tenant health, or rollback) - deployment not verified

### QG-PD1 Exit Criteria
This workflow validates QG-PD1. Upon PASS:
- Deployment verified successful
- Production traffic can be enabled
- On-call handoff can proceed

Present validation results with specific findings for each section.

---

## Error Handling

### FAIL Outcome Recovery Steps

#### Step 1: Categorize the Failure
Identify which category caused the FAIL:

| Failure Category | Severity | Recovery Path |
|------------------|----------|---------------|
| Smoke tests failing | CRITICAL | Debug failing tests, fix issues, re-run |
| Monitoring not active | CRITICAL | Verify monitoring configuration, restart collectors |
| Tenant health issues | CRITICAL | Investigate tenant-specific problems |
| Rollback not ready | HIGH | Prepare rollback artifacts, document procedure |

#### Step 2: Critical Failure Remediation

**For Smoke Test Failures:**
1. Identify which tests are failing
2. Check deployment logs for errors
3. Verify environment configuration
4. Fix issues and re-run tests
5. Re-validate

**For Monitoring Issues:**
1. Check Prometheus scrape targets
2. Verify application metrics endpoints
3. Check Grafana data source configuration
4. Restart monitoring components if needed
5. Re-validate

**For Tenant Health Issues:**
1. Identify affected tenants
2. Check tenant-specific configuration
3. Verify database connectivity
4. Check AI service availability
5. Remediate and re-validate

---

## COLLABORATION MENUS (A/P/C):

After completing validation checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings and edge cases
- **P (Party Mode)**: Bring DevOps and SRE perspectives for validation review
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass validation context: findings, gate decision, gaps identified
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review deployment validation: {summary of findings and gate decision}"
- Process collaborative analysis from DevOps and SRE personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All validation checklist items evaluated
- [ ] Gate decision determined (PASS/CONDITIONAL/FAIL)
- [ ] Findings documented with specific details

---

## Outputs

- Validation report with findings
- Gate decision with rationale
- Remediation recommendations (if CONDITIONAL or FAIL)

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate final validation report.
