# Step 2: Benchmark Suite

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

Design the benchmark infrastructure including golden task datasets, domain-specific tests, adversarial cases, and multi-tenant scenarios.

---

## Prerequisites

- Step 1 completed: Metrics defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: benchmark-patterns
- **Web research (if available):** Search for current LLM benchmarking practices

---

## Inputs

- Metric definitions from Step 1
- Use case requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Test data sources

---

## Actions

### 1. Design Golden Task Dataset

Create reference test cases:

| Category | Count | Format | Update Frequency |
|----------|-------|--------|------------------|
| Core Capabilities | 100 | JSON | Monthly |
| Edge Cases | 50 | JSON | Quarterly |
| Failure Modes | 30 | JSON | On incident |
| Regression | 200 | JSON | On release |
| Safety | 100 | JSON | Bi-weekly |

Golden Task Schema:

| Field | Type | Required | Example |
|-------|------|----------|---------|
| task_id | string | YES | "GT-001" |
| category | enum | YES | "generation" |
| input | object | YES | {"query": "..."} |
| expected_output | object | YES | {"response": "..."} |
| evaluation_criteria | array | YES | ["accuracy", "format"] |
| difficulty | enum | YES | "easy/medium/hard" |
| tenant_applicable | array | NO | ["all"] |

### 2. Create Domain-Specific Test Cases

Define domain test suites:

| Domain | Test Cases | Coverage | Owner |
|--------|------------|----------|-------|
| Customer Support | 50 | FAQ, complaints, escalations | CS team |
| Technical | 40 | Code, docs, debugging | Engineering |
| Financial | 30 | Analysis, reporting | Finance |
| Legal | 25 | Compliance, contracts | Legal |
| Custom per tenant | Variable | Tenant-defined | Tenant |

### 3. Design Adversarial Test Cases

Create security/robustness tests:

| Attack Type | Test Cases | Expected Behavior | Severity |
|-------------|------------|-------------------|----------|
| Prompt Injection | 50 | Block/refuse | Critical |
| Jailbreak | 30 | Refuse | Critical |
| Data Extraction | 25 | Block | Critical |
| Cross-tenant Probe | 20 | Isolate | Critical |
| Denial of Service | 15 | Rate limit | High |
| Output Manipulation | 20 | Validate | High |
| Context Confusion | 15 | Maintain context | Medium |

### 4. Define Multi-Tenant Test Scenarios

Create tenant isolation tests:

| Scenario | Test Focus | Pass Criteria |
|----------|------------|---------------|
| Memory Isolation | Tenant A data invisible to B | 0 leaks |
| Tool Access | Tenant-scoped permissions | Enforced |
| Rate Limits | Per-tenant throttling | Accurate |
| Custom Prompts | Tenant overrides work | Applied |
| Data Residency | Region compliance | Verified |
| Tier Features | Feature gating | Enforced |

### 5. Implement Automated Data Refresh

Design dataset maintenance:

| Activity | Frequency | Automation | Owner |
|----------|-----------|------------|-------|
| Drift detection | Weekly | Automated | ML Ops |
| New case addition | On PR | CI triggered | Dev |
| Obsolete removal | Monthly | Semi-auto | ML Eng |
| Coverage report | Weekly | Automated | QA |
| Quality audit | Quarterly | Manual | AI Lead |

### 6. Design Benchmark Execution Infrastructure

Define execution environment:

| Component | Technology | Purpose |
|-----------|------------|---------|
| Test Runner | pytest/pytest-benchmark | Execution |
| Data Store | S3 + DynamoDB | Test cases |
| Results Store | TimescaleDB | Metrics |
| Orchestration | Airflow/Prefect | Scheduling |
| Reporting | Grafana | Visualization |

Execution Configuration:

| Parameter | Value | Notes |
|-----------|-------|-------|
| Parallelism | 10 concurrent | Per environment |
| Timeout | 30s per test | Configurable |
| Retry | 3 attempts | With backoff |
| Sampling | 100% critical, 10% routine | Cost optimization |

**Verify current best practices with web search:**
Search the web: "LLM benchmark suite design {date}"
Search the web: "adversarial testing LLM production {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the benchmark suite design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into test case design and coverage
- **P (Party Mode)**: Bring QA and security perspectives
- **C (Continue)**: Accept benchmark suite and proceed to A/B testing setup
- **[Specific refinements]**: Describe benchmark concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save benchmark suite design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-ab-testing-setup.md`

---

## Verification

- [ ] Golden task dataset designed
- [ ] Domain-specific tests planned
- [ ] Adversarial tests defined
- [ ] Multi-tenant scenarios covered
- [ ] Data refresh process defined
- [ ] Execution infrastructure specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Benchmark suite specification
- Test case schemas
- Infrastructure requirements
- Maintenance procedures

---

## Next Step

Proceed to `step-03-c-ab-testing-setup.md` to configure A/B testing.
