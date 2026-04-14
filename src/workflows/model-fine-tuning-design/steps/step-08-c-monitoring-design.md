# Step 8: Monitoring and Evaluation Design

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Define comprehensive monitoring infrastructure covering fine-tuning job execution, model quality evaluation, drift detection, and cost tracking per tenant.

---

## Prerequisites

- Rollback strategy complete (Step 7)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: ai-runtime,observability

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Design Fine-tuning Job Monitoring

Establish training observability:

| Metric | Collection | Visualization | Alert |
|--------|------------|---------------|-------|
| Training loss | Per step | Real-time chart | Divergence |
| Validation loss | Per epoch | Comparison chart | No improvement |
| GPU utilization | Per minute | Gauge | < 50% sustained |
| Memory usage | Per minute | Time series | > 90% |
| Throughput (samples/sec) | Per minute | Gauge | < baseline |
| ETA to completion | Per epoch | Progress bar | Exceeds limit |

Job status tracking:
| Status | Description | Tenant Visibility |
|--------|-------------|-------------------|
| Queued | Waiting for resources | Yes + position |
| Initializing | Setting up environment | Yes |
| Training | Active training | Yes + metrics |
| Evaluating | Running evaluation | Yes |
| Uploading | Saving artifacts | Yes |
| Completed | Successfully finished | Yes + results |
| Failed | Error occurred | Yes + error code |
| Cancelled | User cancelled | Yes |

### 2. Implement Model Quality Evaluation

Define evaluation pipeline:

| Evaluation Type | Frequency | Metrics | Threshold |
|-----------------|-----------|---------|-----------|
| Post-training | On completion | Loss, perplexity | Configurable |
| Golden set | On completion | Task accuracy | > baseline |
| A/B comparison | On promotion | Win rate | > 50% |
| Production | Continuous | Quality score | > 90% baseline |

Evaluation metrics:

| Metric | Tool | Description |
|--------|------|-------------|
| Perplexity | Built-in | Language model quality |
| Task accuracy | Custom eval | Domain-specific tasks |
| Relevance | Ragas | Response relevance |
| Faithfulness | Ragas | Factual accuracy |
| Safety score | NeMo | Safety compliance |
| Latency | Prometheus | Inference speed |

### 3. Configure Drift Detection

Design drift monitoring:

| Drift Type | Detection Method | Frequency | Action |
|------------|------------------|-----------|--------|
| Data drift | Distribution comparison | Daily | Alert |
| Concept drift | Performance degradation | Continuous | Alert + retrain |
| Model drift | Embedding similarity | Weekly | Report |
| Output drift | Response distribution | Continuous | Alert |

Drift thresholds:
| Metric | Warning | Critical | Action |
|--------|---------|----------|--------|
| KL divergence | > 0.1 | > 0.3 | Retrain suggestion |
| Quality drop | > 5% | > 15% | Auto-rollback |
| Latency increase | > 20% | > 50% | Performance alert |

### 4. Implement Cost Tracking

Design per-tenant cost monitoring:

| Cost Category | Tracking Granularity | Attribution |
|---------------|---------------------|-------------|
| GPU compute | Per second | Per job |
| Storage | Per GB-month | Per model |
| Inference | Per request | Per model |
| Data transfer | Per GB | Per job |

Cost dashboard:
| View | Metrics | Drill-down |
|------|---------|------------|
| Tenant summary | Total spend, trend | By model, by period |
| Job breakdown | Cost per job | By resource type |
| Model TCO | Lifetime cost | Training + serving |
| Budget status | Used vs allocated | By category |

### 5. Design Alerting System

Configure alert routing:

| Severity | Channels | Response Time | Escalation |
|----------|----------|---------------|------------|
| Critical | PagerDuty + Slack | Immediate | Auto |
| High | Slack + Email | 15 minutes | 30 min |
| Medium | Email + Dashboard | 1 hour | None |
| Low | Dashboard only | Next business day | None |

Tenant-facing alerts:
| Event | Notification | Channel |
|-------|--------------|---------|
| Job completed | Success details | In-app + email |
| Job failed | Error + guidance | In-app + email |
| Quota warning | Usage + upgrade | In-app |
| Quality alert | Degradation notice | Email |

**Verify current best practices with web search:**
Search the web: "ML model monitoring production best practices {date}"
Search the web: "LLM drift detection monitoring {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the monitoring design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into drift detection or cost tracking strategies
- **P (Party Mode)**: Bring SRE and data science perspectives on monitoring design
- **C (Continue)**: Accept monitoring design and proceed to documentation
- **[Specific refinements]**: Describe monitoring concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: job monitoring, evaluation pipeline, drift detection, cost tracking
- Process enhanced insights on monitoring strategies
- Ask user: "Accept these refined monitoring decisions? (y/n)"
- If yes, integrate into monitoring specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review monitoring infrastructure for fine-tuning platform"
- Process SRE and data science perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save monitoring design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]`
- Proceed to next step: `step-09-c-documentation.md`

---

## Verification

- [ ] Fine-tuning job monitoring configured
- [ ] Model quality evaluation pipeline designed
- [ ] Drift detection implemented
- [ ] Cost tracking per tenant established
- [ ] Alerting system configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Job monitoring specification
- Evaluation pipeline design
- Drift detection configuration
- Cost tracking architecture
- Alerting rules and routing
- **Load template:** `{project-root}/_bmad/bam/templates/observability-spec-template.md`

---

## Next Step

Proceed to `step-09-c-documentation.md` to complete documentation.
