# Step 2: Testing Stages

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Design comprehensive testing stages including unit testing, integration testing, tenant isolation testing, performance testing, and security scanning.

---

## Prerequisites

- Step 1 completed with pipeline architecture design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: devops
- **Web research (if available):** Search for current CI/CD testing best practices

---

## Inputs

- Pipeline architecture design from Step 1
- Module architecture document
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Testing requirements

---

## Actions

### 1. Design Unit and Integration Testing

Define testing layers:

| Test Type | Scope | Tools | Coverage Target |
|-----------|-------|-------|-----------------|
| Unit Tests | Single function/method | Jest/pytest/Go test | 80%+ |
| Component Tests | Single service | Testing library | 70%+ |
| Integration Tests | Service interactions | Testcontainers | Critical paths |
| Contract Tests | API contracts | Pact/Prism | All public APIs |
| E2E Tests | Full user flows | Playwright/Cypress | Happy paths |

### 2. Design Tenant Isolation Testing

Define multi-tenant specific tests:

| Test Category | Validation | Frequency |
|---------------|------------|-----------|
| Data Isolation | Cross-tenant query returns empty | Every PR |
| RLS Verification | Policy enforcement correct | Every PR |
| Resource Isolation | Tenant limits enforced | Daily |
| Auth Boundary | Token scope validated | Every PR |
| API Isolation | Tenant header required | Every PR |

### 3. Design Performance Testing

Define performance validation:

| Test Type | Metrics | Threshold | When Run |
|-----------|---------|-----------|----------|
| Load Test | p95 latency | <200ms | Pre-staging |
| Stress Test | Max throughput | 10k req/s | Weekly |
| Soak Test | Memory leaks | <5% growth/hr | Weekly |
| Spike Test | Recovery time | <30s | Pre-release |
| Tenant Load | Per-tenant isolation | No cross-impact | Pre-release |

### 4. Design Security Scanning

Define security validation stages:

| Scan Type | Tool | Blocking | Frequency |
|-----------|------|----------|-----------|
| SAST | Semgrep/CodeQL | Critical/High | Every PR |
| DAST | OWASP ZAP | Critical | Pre-staging |
| Dependency | Snyk/Dependabot | Critical | Daily |
| Container | Trivy/Clair | Critical/High | Every build |
| Secrets | TruffleHog/GitLeaks | All findings | Every PR |
| IaC | Checkov/tfsec | High | Every PR |

**Verify current best practices with web search:**
Search the web: "multi-tenant testing strategies CI/CD {date}"
Search the web: "security scanning pipeline integration {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the testing stages analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific testing types or coverage
- **P (Party Mode)**: Bring QA and security perspectives on testing design
- **C (Continue)**: Accept testing stages design and proceed to deployment strategies
- **[Specific refinements]**: Describe testing concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: test types, coverage, tenant isolation, security scanning
- Process enhanced insights on testing trade-offs
- Ask user: "Accept these refined testing stage decisions? (y/n)"
- If yes, integrate into testing stages specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review CI/CD testing stages for multi-tenant AI platform"
- Process QA and security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save testing stages design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-deployment-strategies.md`

---

## Verification

- [ ] Unit and integration testing designed
- [ ] Tenant isolation testing specified
- [ ] Performance testing defined
- [ ] Security scanning configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Testing layer specification
- Tenant isolation test suite
- Performance test plan
- Security scanning configuration

---

## Next Step

Proceed to `step-03-c-deployment-strategies.md` to design deployment strategies.
