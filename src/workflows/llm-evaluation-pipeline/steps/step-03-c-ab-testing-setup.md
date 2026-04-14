# Step 3: A/B Testing Setup

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

Configure A/B testing infrastructure for model and prompt experiments, including statistical analysis, feature flag integration, and rollout automation.

---

## Prerequisites

- Step 2 completed: Benchmark suite designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: experimentation-patterns
- **Web research (if available):** Search for current A/B testing for LLMs

---

## Inputs

- Benchmark suite from Step 2
- Metrics from Step 1
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Experimentation requirements

---

## Actions

### 1. Design Experiment Infrastructure

Define experimentation platform:

| Component | Technology | Purpose |
|-----------|------------|---------|
| Experiment Config | GrowthBook/Eppo | Experiment definition |
| Assignment | Deterministic hash | User/tenant assignment |
| Data Collection | Event stream | Metric collection |
| Analysis | Jupyter/Metabase | Statistical analysis |
| Reporting | Grafana | Real-time dashboards |

### 2. Configure Statistical Analysis Pipeline

Define analysis framework:

| Analysis Type | Method | Use Case |
|---------------|--------|----------|
| Frequentist | Two-sample t-test | Simple comparisons |
| Bayesian | Beta-Binomial | Small samples |
| Sequential | SPRT | Early stopping |
| Multi-Armed | Thompson Sampling | Multiple variants |

Statistical Parameters:

| Parameter | Value | Notes |
|-----------|-------|-------|
| Significance Level (α) | 0.05 | 95% confidence |
| Power (1-β) | 0.80 | 80% detection |
| MDE (Min Detectable Effect) | 5% | Practical significance |
| Sample Size | Calculated | Per metric |

### 3. Integrate Feature Flags

Connect to feature flag system:

| Flag Type | Scope | Integration |
|-----------|-------|-------------|
| Model Version | Global/Tenant | Model router |
| Prompt Version | Global/Tenant | Prompt selector |
| Parameter Tuning | Global | Config service |
| Feature Toggle | Tenant/User | Gateway |

Feature Flag Configuration:

| Property | Value |
|----------|-------|
| Provider | GrowthBook |
| SDK | Python/Node |
| Refresh Interval | 30 seconds |
| Fallback Behavior | Control variant |
| Audit Logging | Enabled |

### 4. Define Winner Determination Criteria

Specify decision framework:

| Outcome | Condition | Action |
|---------|-----------|--------|
| Clear Winner | p < 0.05, effect > MDE | Promote treatment |
| Neutral | p > 0.05 | Keep control (cheaper) |
| Loser | p < 0.05, effect < 0 | Abandon treatment |
| Inconclusive | Sample size insufficient | Extend experiment |
| Guardrail Fail | Safety metric violated | Stop experiment |

Multi-Metric Decision:

| Scenario | Primary | Secondary | Decision |
|----------|---------|-----------|----------|
| Both better | +5% | +3% | Promote |
| Primary better, secondary flat | +5% | 0% | Promote |
| Primary flat, secondary better | 0% | +5% | Review |
| Trade-off | +5% | -3% | Review cost |
| Both worse | -5% | -3% | Reject |

### 5. Design Rollout Automation

Define automated rollout pipeline:

| Phase | Traffic % | Duration | Gate |
|-------|-----------|----------|------|
| Experiment | 5-50% | Until significance | Stats |
| Winner Declaration | Manual | 1 day | Review |
| Canary | 10% | 24 hours | Auto-metrics |
| Staged Rollout | 25% -> 50% -> 100% | 1 week | Auto-metrics |
| Full Deployment | 100% | Permanent | Complete |

Rollout Automation Rules:

| Event | Trigger | Action |
|-------|---------|--------|
| Significant result | p < 0.01 | Notify team |
| Guardrail breach | Threshold exceeded | Pause experiment |
| Sample reached | N achieved | Run final analysis |
| Duration exceeded | T > max | Force decision |

### 6. Tenant-Specific Experimentation

Enable tenant-level experiments:

| Tier | Experiment Capability | Control |
|------|-----------------------|---------|
| Free | Opt-in to platform experiments | Platform |
| Pro | Request experiments | Platform + Tenant |
| Enterprise | Self-service experiments | Tenant |

**Verify current best practices with web search:**
Search the web: "A/B testing LLM models production {date}"
Search the web: "experiment platform ML systems {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the A/B testing setup, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into statistical methods and automation
- **P (Party Mode)**: Bring data science and platform perspectives
- **C (Continue)**: Accept A/B testing setup and proceed to regression tests
- **[Specific refinements]**: Describe experimentation concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save A/B testing setup to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-regression-tests.md`

---

## Verification

- [ ] Experiment infrastructure designed
- [ ] Statistical analysis pipeline configured
- [ ] Feature flags integrated
- [ ] Winner determination criteria defined
- [ ] Rollout automation designed
- [ ] Tenant experimentation enabled
- [ ] Patterns align with pattern registry

---

## Outputs

- A/B testing infrastructure specification
- Statistical analysis framework
- Feature flag configuration
- Rollout automation rules

---

## Next Step

Proceed to `step-04-c-regression-tests.md` to design regression testing.
