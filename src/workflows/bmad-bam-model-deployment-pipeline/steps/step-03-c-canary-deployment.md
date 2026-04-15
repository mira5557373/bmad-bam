# Step 3: Configure Canary Deployment

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

Configure the canary release process including traffic percentage progression, metrics collection, automatic rollback triggers, and manual promotion gates.

---

## Prerequisites

- Steps 1-2 completed with deployment strategy and tenant rollout defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `model-deployment`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `observability`

---

## Inputs

- Deployment strategy from Step 1
- Tenant rollout design from Step 2
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Traffic Progression Stages

| Stage | Traffic % | Duration | Promotion Criteria | Rollback Trigger |
|-------|-----------|----------|-------------------|------------------|
| Initial | 1% | 30 min | Error rate < 0.1% | Error rate > 1% |
| Early | 5% | 1 hour | Latency p99 < 2x baseline | Latency p99 > 3x |
| Moderate | 25% | 2 hours | All SLOs met | Any SLO breach |
| Broad | 50% | 4 hours | All metrics green | Degradation > 10% |
| Full | 100% | Permanent | Bake time complete | Manual only |

For each stage, configure:
- Entry criteria
- Exit criteria (promotion)
- Rollback conditions
- Hold duration requirements

### 2. Configure Metrics Collection

| Metric Category | Metrics | Collection Method | Alerting Threshold |
|-----------------|---------|-------------------|-------------------|
| Latency | p50, p95, p99 | Prometheus | > 2x baseline |
| Error Rate | 4xx, 5xx, model errors | Prometheus | > 0.5% |
| Throughput | Requests/sec | Prometheus | < 80% baseline |
| Model Quality | Accuracy, F1, perplexity | Custom metrics | < 95% baseline |
| Resource | CPU, memory, GPU util | Node exporter | > 85% |

Establish:
- Baseline collection procedures
- Comparison windows (canary vs baseline)
- Statistical significance requirements
- Anomaly detection configuration

### 3. Define Automatic Rollback Triggers

| Trigger Type | Condition | Action | Recovery Time |
|--------------|-----------|--------|---------------|
| Error Spike | Error rate > 2% for 5 min | Immediate rollback | < 1 min |
| Latency Breach | p99 > 3x baseline for 10 min | Immediate rollback | < 1 min |
| Model Degradation | Quality < 90% baseline | Staged rollback | < 5 min |
| Resource Exhaustion | OOM or GPU exhaustion | Immediate rollback | < 2 min |
| Circuit Breaker | Downstream failure | Pause deployment | N/A |

Configure:
- Sensitivity thresholds per tier
- Grace periods before triggering
- Notification chains
- Post-rollback diagnostics

### 4. Establish Manual Promotion Gates

| Gate | Approvers | Criteria | Timeout |
|------|-----------|----------|---------|
| Initial to Early | Automated | All metrics green | Auto after duration |
| Early to Moderate | On-call engineer | Review metrics dashboard | 30 min |
| Moderate to Broad | Team lead | Sign-off on quality | 1 hour |
| Broad to Full | Product owner | Business approval | 4 hours |

**Soft Gate:** Steps 1-3 complete the core deployment design. Present a summary of deployment strategy, tenant rollout, and canary configuration. Ask for confirmation before proceeding to validation and safety procedures.

**Verify current best practices with web search:**
Search the web: "canary deployment ML models best practices {date}"
Search the web: "progressive delivery machine learning {date}"
Search the web: "automatic rollback triggers MLOps {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the canary deployment configuration above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into traffic progression and rollback trigger design
- **P (Party Mode)**: Bring analyst and architect perspectives for canary review
- **C (Continue)**: Accept canary deployment config and proceed to model validation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass canary context: traffic stages, metrics, rollback triggers
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into canary configuration
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review canary deployment: {summary of stages and triggers}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save canary deployment configuration to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-model-validation.md`

---

## Verification

- [ ] Traffic progression stages defined
- [ ] Metrics collection configured
- [ ] Automatic rollback triggers established
- [ ] Manual promotion gates documented
- [ ] Baseline comparison methodology defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Canary deployment configuration
- Traffic progression matrix
- Rollback trigger definitions
- Promotion gate requirements

---

## Next Step

Proceed to `step-04-c-model-validation.md` to establish model validation gates.
