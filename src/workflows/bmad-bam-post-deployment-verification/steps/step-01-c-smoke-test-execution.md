# Step 1: Smoke Test Execution

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
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Execute post-deployment smoke tests to verify critical system paths are functioning correctly after deployment. This includes API health checks, authentication flows, and tenant-aware endpoint verification.

---

## Prerequisites

- Deployment completed to target environment
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `observability`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `health-check`

---

## Inputs

- Deployment manifest with target environment
- List of critical API endpoints
- Tenant identifiers for multi-tenant verification
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Critical Path Tests

Document critical paths requiring smoke test coverage:

| Critical Path | Endpoint | Expected Response | Tenant-Aware |
|---------------|----------|-------------------|--------------|
| API Health | `/health` | 200 OK | No |
| Auth Flow | `/auth/token` | JWT returned | Yes |
| Tenant Context | `/api/v1/tenant/me` | Tenant info | Yes |
| AI Agent | `/api/v1/agent/status` | Agent ready | Yes |

### 2. Execute Smoke Tests

For each critical path:
- Execute HTTP request with appropriate authentication
- Verify response status code
- Validate response payload structure
- Check response time within SLA thresholds

### 3. Multi-Tenant Verification

For tenant-aware endpoints:
- Test with multiple tenant contexts
- Verify tenant isolation (no cross-tenant data leakage)
- Confirm tenant-specific configuration applied

### 4. Document Results

Record smoke test execution:
- Test execution timestamp
- Pass/Fail status per endpoint
- Response times
- Any anomalies detected

**Verify current best practices with web search:**
Search the web: "post-deployment smoke test best practices {date}"
Search the web: "API health check patterns production {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing smoke test execution, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into test coverage and edge cases
- **P (Party Mode)**: Bring DevOps and QA perspectives for test review
- **C (Continue)**: Accept smoke test results and proceed to monitoring activation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass test context: critical paths, results, coverage gaps
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into smoke test report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review smoke test execution: {summary of tests and results}"
- Process collaborative analysis from DevOps and QA personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save smoke test results to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-monitoring-activation.md`

---

## Verification

- [ ] All critical path endpoints tested
- [ ] Multi-tenant isolation verified
- [ ] Response times within SLA thresholds
- [ ] Test results documented with timestamps
- [ ] Patterns align with pattern registry

---

## Outputs

- Smoke test execution report
- Critical path status summary
- Response time measurements
- **Load template:** `{project-root}/_bmad/bam/data/templates/smoke-test-report-template.md`

---

## Next Step

Proceed to `step-02-c-monitoring-activation.md` to verify monitoring and alerting systems.
