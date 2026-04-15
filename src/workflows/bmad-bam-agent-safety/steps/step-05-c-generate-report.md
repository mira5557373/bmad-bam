# Step 5: Generate Safety Validation Report

## Purpose

Compile all safety test results into a comprehensive validation report and determine QG-I3 gate readiness.

## Prerequisites

- Steps 1-4 complete
- All test results available
- **Load template:** `{project-root}/_bmad/bam/data/templates/agent-test-report-template.md`

## Actions

### 1. Compile Test Results

Aggregate results from all test categories:

| Category | Tests Run | Passed | Failed | Pass Rate |
|----------|-----------|--------|--------|-----------|
| Input Guardrails | | | | |
| Output Guardrails | | | | |
| Budget Enforcement | | | | |
| Kill Switch | | | | |
| Adversarial Tests | | | | |
| **Total** | | | | |

### 2. Determine Gate Decision

| Criteria | Requirement | Actual | Status |
|----------|-------------|--------|--------|
| Guardrail pass rate | 100% | | |
| Kill switch response | < 100ms | | |
| Adversarial pass rate | 100% | | |
| Budget enforcement | Working | | |

**Gate Decision Matrix:**

| Outcome | Criteria |
|---------|----------|
| **PASS** | All criteria met |
| **CONDITIONAL** | Minor gaps, no critical failures |
| **FAIL** | Any critical failure |

### 3. Document Recommendations

For any failures or gaps:

| Finding | Severity | Recommendation | Owner |
|---------|----------|----------------|-------|
| | | | |

### 4. Generate Report

Using `agent-test-report-template.md`, produce:
- Executive summary
- Detailed test results
- Gate decision
- Remediation plan (if needed)

## TEA Handoff (QG-I3)

**BAM produces criteria → TEA executes verification → TEA reports results → BAM makes gate decision**

### Handoff Items

| Item | Handoff To | TEA Action | Return |
|------|------------|------------|--------|
| Safety test plan | TEA `tea-trace` | Execute agent safety tests | Test results |
| Guardrail verification | TEA isolation testing | Verify guardrails work | Pass/fail |
| Kill switch test | TEA cross-tenant | Test response time | Timing results |
| Adversarial scenarios | TEA security testing | Execute attack simulations | Attack outcomes |
| Budget enforcement | TEA chaos testing | Test budget limits | Enforcement results |

### TEA Integration Commands

```
# Load TEA BAM context
bam-tea-context

# Execute isolation verification
bam-tea-isolation-testing

# Run security testing
bam-tea-security-testing
```

### Gate Decision Authority

- **TEA** executes tests and provides results
- **BAM** interprets results against QG-I3 criteria
- **BAM** makes final gate decision (PASS/CONDITIONAL/FAIL/WAIVED)

**Verify current best practices with web search:**
Search the web: "generate report best practices {date}"
Search the web: "generate report multi-tenant SaaS {date}"

## Verification

- [ ] All results compiled
- [ ] Gate decision documented
- [ ] Recommendations provided
- [ ] Report generated
- [ ] TEA handoff completed (if applicable)

## Outputs

- `agent-safety-report.md` in `{output_folder}/quality-gates/`
- `safety-test-results.md` in `{output_folder}/testing/`

## Next Step

If PASS: Proceed to `bmad-bam-production-readiness`
If FAIL: Address gaps and re-run validation
