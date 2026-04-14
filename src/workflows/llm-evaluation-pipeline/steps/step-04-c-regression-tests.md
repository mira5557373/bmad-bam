# Step 4: Regression Tests

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

Design regression testing for LLM systems including baseline establishment, detection thresholds, CI/CD integration, and coverage requirements.

---

## Prerequisites

- Step 3 completed: A/B testing configured
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: regression-patterns
- **Web research (if available):** Search for current LLM regression testing practices

---

## Inputs

- A/B testing setup from Step 3
- Benchmark suite from Step 2
- Metrics from Step 1
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Establish Baselines

Define baseline measurement process:

| Baseline Type | Establishment | Update Trigger |
|---------------|---------------|----------------|
| Model Baseline | On model release | New model version |
| Prompt Baseline | On prompt deploy | Prompt change |
| System Baseline | Weekly snapshot | Major release |
| Safety Baseline | On policy change | Policy update |

Baseline Storage:

| Field | Type | Purpose |
|-------|------|---------|
| baseline_id | string | Identifier |
| version | semver | Version tracked |
| timestamp | datetime | When established |
| metrics | object | Metric values |
| test_set | reference | Tests used |
| approved_by | string | Approver |

### 2. Define Regression Detection Thresholds

Set detection criteria per metric:

| Metric Category | Regression Threshold | Alert Level | Action |
|-----------------|---------------------|-------------|--------|
| Accuracy | -3% | Critical | Block deploy |
| Safety | Any regression | Critical | Block deploy |
| Latency P95 | +20% | High | Review required |
| Cost | +30% | Medium | Notification |
| User Satisfaction | -5% | High | Review required |

Severity Matrix:

| Severity | Regression Size | Affected Area | Response Time |
|----------|----------------|---------------|---------------|
| Critical | >5% or safety | Core function | Immediate |
| High | 3-5% | Important feature | <1 hour |
| Medium | 1-3% | Secondary feature | <4 hours |
| Low | <1% | Minor feature | <24 hours |

### 3. Design Automated Alerts

Configure alerting pipeline:

| Alert Type | Trigger | Recipients | Channel |
|------------|---------|------------|---------|
| Regression Detected | Threshold exceeded | AI team | Slack |
| Critical Regression | Safety/core metric | On-call + Lead | PagerDuty |
| Trend Warning | 3 consecutive drops | AI team | Email |
| Baseline Drift | >10% from baseline | ML Ops | Slack |
| Test Failure | >5% test failures | QA | Slack |

Alert Configuration:

| Property | Value |
|----------|-------|
| Dedup Window | 1 hour |
| Escalation | After 30 min |
| Auto-Resolve | On fix deployed |
| Runbook Link | Included |

### 4. Integrate with CI/CD

Define CI/CD integration points:

| Pipeline Stage | Tests Run | Pass Criteria | Block on Fail |
|----------------|-----------|---------------|---------------|
| Pre-commit | Linting, format | 100% pass | Yes |
| PR | Unit, subset golden | >95% pass | Yes |
| Merge | Full golden suite | >98% pass | Yes |
| Pre-deploy | Regression suite | No regressions | Yes |
| Post-deploy | Smoke + canary | >99% pass | Rollback |

CI/CD Configuration:

| Setting | Value | Notes |
|---------|-------|-------|
| Timeout | 30 minutes | Full suite |
| Parallelism | 8x | Workers |
| Retry | 2 attempts | Flaky tests |
| Cache | Test data | Speed up |
| Reporting | JUnit + custom | Results |

### 5. Define Test Coverage Requirements

Specify coverage targets:

| Coverage Type | Target | Measurement |
|---------------|--------|-------------|
| Golden Tasks | 100% | All must pass |
| Safety Tests | 100% | All must pass |
| Domain Tests | >90% | By domain |
| Edge Cases | >80% | Critical paths |
| Tenant Scenarios | >85% | By tier |

Coverage Reporting:

| Report | Frequency | Audience |
|--------|-----------|----------|
| PR Coverage | On PR | Developers |
| Sprint Coverage | Weekly | Team |
| Release Coverage | On release | Leadership |
| Trend Report | Monthly | ML Ops |

### 6. Handle Test Flakiness

Define flaky test management:

| Flakiness Level | Detection | Action |
|-----------------|-----------|--------|
| <1% failure rate | Normal | Monitor |
| 1-5% failure rate | Flaky | Quarantine + fix |
| >5% failure rate | Broken | Disable + urgent fix |

Flaky Test Protocol:

| Step | Action | Owner |
|------|--------|-------|
| 1 | Auto-detect via history | CI system |
| 2 | Quarantine from blocking | CI system |
| 3 | Create fix ticket | Automated |
| 4 | Fix within SLA (3 days) | Developer |
| 5 | Restore to suite | QA approval |

**Verify current best practices with web search:**
Search the web: "LLM regression testing CI/CD {date}"
Search the web: "ML model quality gates deployment {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the regression tests design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into thresholds and CI/CD integration
- **P (Party Mode)**: Bring QA and DevOps perspectives
- **C (Continue)**: Accept regression tests and proceed to human evaluation
- **[Specific refinements]**: Describe testing concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save regression tests design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-human-evaluation.md`

---

## Verification

- [ ] Baselines established and documented
- [ ] Regression thresholds defined per metric
- [ ] Automated alerts configured
- [ ] CI/CD integration specified
- [ ] Coverage requirements set
- [ ] Flaky test handling defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Regression testing framework
- Threshold configuration
- CI/CD integration specification
- Coverage requirements
- Alert configuration

---

## Next Step

Proceed to `step-05-c-human-evaluation.md` to integrate human evaluation.
