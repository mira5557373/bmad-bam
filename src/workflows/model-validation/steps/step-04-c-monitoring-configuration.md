# Step 4: Monitoring Configuration

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices


---

## Purpose

Configure model-specific monitoring for the new release. This includes metrics collection, alerting, dashboards, and drift detection.

---

## Prerequisites

- Step 3 completed (rollback tested)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `observability`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `ai-monitoring`

---

## Actions

### 1. Define Model Metrics

Document metrics to collect:

| Metric | Type | Labels | Purpose |
|--------|------|--------|---------|
| `model_inference_latency` | Histogram | model, tenant | Performance |
| `model_token_usage` | Counter | model, tenant | Cost |
| `model_error_rate` | Counter | model, tenant, error_type | Reliability |
| `model_safety_score` | Gauge | model, tenant | Safety |
| `model_quality_score` | Gauge | model, tenant | Quality |

### 2. Configure Alerts

| Alert | Condition | Severity | Action |
|-------|-----------|----------|--------|
| High error rate | >5% for 5min | Critical | Page + rollback |
| Latency degradation | P95 >1s | Warning | Alert team |
| Token spike | >200% baseline | Warning | Review |
| Safety violation | Any critical | Critical | Block + alert |

### 3. Create Dashboards

| Dashboard | Panels | Audience |
|-----------|--------|----------|
| Model Overview | Latency, errors, traffic | SRE |
| Quality Monitoring | Scores, drift indicators | ML Team |
| Tenant Usage | Per-tenant metrics | Product |
| Cost Analysis | Token usage, API costs | Finance |

### 4. Configure Drift Detection

Monitor for model drift:
- [ ] Input distribution monitoring
- [ ] Output quality tracking
- [ ] Embedding drift detection
- [ ] Automated retraining triggers

**Soft Gate Checkpoint**

**Steps 1-4 complete model validation.** Present a summary of quality, rollout, rollback, and monitoring. Ask for confirmation before finalizing.

**Verify current best practices with web search:**
Search the web: "LLM monitoring production best practices {date}"
Search the web: "model drift detection techniques {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing monitoring configuration, if 'C' (Continue):
- Save monitoring configuration to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final model validation report

---

## Verification

- [ ] Model metrics defined
- [ ] Alerts configured
- [ ] Dashboards created
- [ ] Drift detection configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Model monitoring configuration
- Alert rules
- Dashboard definitions
- Model validation report (complete)
- **Load template:** `{project-root}/_bmad/bam/data/templates/model-monitoring-config-template.md`

---

## Next Step

Model validation complete. Recommend running validation mode to verify against QG-AI1 criteria if formal gate passage required.
