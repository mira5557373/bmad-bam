# Step 1: Metric Selection

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

Define the evaluation metrics for LLM assessment including task-specific, safety, performance, and user satisfaction metrics.

---

## Prerequisites

- Agent runtime architecture documented
- AI runtime configuration (`{ai_runtime}`) resolved
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: evaluation-patterns
- **Web research (if available):** Search for current LLM evaluation metrics

---

## Inputs

- Agent runtime architecture
- Use case requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Quality targets

---

## Actions

### 1. Define Task-Specific Metrics

Select metrics based on task type:

| Task Type | Primary Metric | Secondary Metrics | Threshold |
|-----------|----------------|-------------------|-----------|
| Classification | Accuracy, F1 | Precision, Recall | >95% |
| Generation | BLEU, ROUGE | BERTScore | >0.7 |
| QA | Exact Match | F1 | >85% |
| Summarization | ROUGE-L | Coherence | >0.6 |
| Code Gen | Pass@k | Syntax valid | >80% |
| Conversation | Task Success | Turn Efficiency | >90% |

### 2. Define Safety Metrics

Specify safety evaluation criteria:

| Metric | Description | Measurement | Threshold |
|--------|-------------|-------------|-----------|
| Toxicity Score | Harmful content | 0-1 scale | <0.05 |
| Bias Detection | Demographic bias | Disparity ratio | <1.1 |
| Hallucination Rate | Factual errors | % of responses | <5% |
| Prompt Injection | Attack resistance | % blocked | >99.9% |
| PII Leakage | Data exposure | Incidents | 0 |
| Refusal Rate | Inappropriate refusals | % of valid queries | <2% |

### 3. Define Performance Metrics

Specify operational metrics:

| Metric | Description | Target | Alert Threshold |
|--------|-------------|--------|-----------------|
| Latency P50 | Median response time | <500ms | >750ms |
| Latency P95 | 95th percentile | <1500ms | >2000ms |
| Latency P99 | 99th percentile | <3000ms | >5000ms |
| Throughput | Requests per second | >1000 | <500 |
| Token Efficiency | Tokens per task | <500 | >1000 |
| Cost per Request | Dollar cost | <$0.01 | >$0.05 |
| Error Rate | Failed requests | <0.1% | >1% |

### 4. Define User Satisfaction Metrics

Specify user feedback metrics:

| Metric | Collection Method | Target | Frequency |
|--------|-------------------|--------|-----------|
| CSAT | Post-interaction | >4.5/5 | Per session |
| Thumbs Up/Down | In-context | >85% positive | Per response |
| Task Completion | Event tracking | >90% | Per task |
| Retry Rate | Usage analytics | <10% | Per task |
| NPS | Periodic survey | >50 | Monthly |

### 5. Define Tenant-Specific Metrics

Enable custom metrics per tenant:

| Tier | Custom Metrics | Override Thresholds | Reporting |
|------|----------------|---------------------|-----------|
| Free | None | No | Weekly digest |
| Pro | 5 custom | Limited | Daily |
| Enterprise | Unlimited | Full | Real-time |

Custom Metric Schema:

| Field | Type | Required | Example |
|-------|------|----------|---------|
| metric_name | string | YES | "domain_accuracy" |
| calculation | formula | YES | "correct/total" |
| threshold | number | YES | 0.95 |
| alert_enabled | boolean | NO | true |
| tenant_scope | array | YES | ["tenant_123"] |

### 6. Create Metric Dashboard Design

Design metric visualization:

| Dashboard | Metrics Displayed | Refresh Rate | Audience |
|-----------|-------------------|--------------|----------|
| Operations | Latency, Error, Throughput | 1 min | Ops |
| Quality | Task metrics, Safety | 5 min | AI team |
| Business | CSAT, Cost, Usage | 1 hour | Leadership |
| Tenant | Custom metrics | Configurable | Tenants |

**Verify current best practices with web search:**
Search the web: "LLM evaluation metrics best practices {date}"
Search the web: "AI safety metrics production {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the metric selection analysis, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into metric definitions and thresholds
- **P (Party Mode)**: Bring ML engineer and product perspectives
- **C (Continue)**: Accept metric selection and proceed to benchmark suite
- **[Specific refinements]**: Describe metric concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save metric selection to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-benchmark-suite.md`

---

## Verification

- [ ] Task-specific metrics defined per task type
- [ ] Safety metrics with thresholds specified
- [ ] Performance metrics with SLOs defined
- [ ] User satisfaction metrics planned
- [ ] Tenant-specific customization enabled
- [ ] Dashboard design documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Metric catalog
- Threshold definitions
- Dashboard requirements
- **Load template:** `{project-root}/_bmad/bam/templates/ai-eval-report-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/llm-evaluation-pipeline-template.md`

---

## Next Step

Proceed to `step-02-c-benchmark-suite.md` to design benchmark infrastructure.
