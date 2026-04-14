# Step 7: Performance Tracking

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

Define comprehensive performance monitoring for the prompt catalog, enabling tracking of prompt effectiveness, cost attribution, quality scoring, and operational health metrics.

---

## Prerequisites

- Step 6 completed: A/B testing defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: prompt-management
- **Web research (if available):** Search for LLM observability best practices

---

## Inputs

- A/B testing design from Step 6
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Tenant isolation model from Step 3

---

## Actions

### 1. Define Effectiveness Metrics

Establish prompt effectiveness measurement:

| Metric | Description | Measurement Method |
|--------|-------------|-------------------|
| Task Success Rate | % of tasks completed successfully | Outcome tracking |
| Response Accuracy | Correctness of information | Human eval + LLM judge |
| Response Relevance | Alignment with user intent | User feedback + semantic |
| User Satisfaction | Direct user rating | Post-response survey |
| Escalation Rate | % requiring human intervention | Escalation tracking |

| Quality Dimension | Weight | Evaluation |
|------------------|--------|------------|
| Accuracy | 30% | Fact verification |
| Completeness | 20% | Coverage of requirements |
| Clarity | 20% | Readability and structure |
| Safety | 20% | Guardrail compliance |
| Tone | 10% | Brand voice alignment |

### 2. Define Latency and Token Tracking

Establish performance monitoring:

| Performance Metric | Description | Alert Threshold |
|-------------------|-------------|-----------------|
| Time to First Token | Latency until streaming starts | >2s |
| Total Latency | End-to-end response time | >10s |
| Input Tokens | Prompt token count | >context limit |
| Output Tokens | Response token count | >max_tokens |
| Total Tokens | Combined usage | Budget threshold |

| Latency Percentile | Target | SLO |
|-------------------|--------|-----|
| p50 | <1s | 99.9% |
| p95 | <3s | 99.5% |
| p99 | <5s | 99.0% |

### 3. Define Cost Attribution

Establish cost tracking per prompt:

| Cost Dimension | Calculation | Attribution |
|----------------|-------------|-------------|
| Token Cost | tokens * rate_per_token | Per request |
| Model Cost | Based on model tier | Per request |
| Compute Cost | Infrastructure allocation | Per tenant |
| Storage Cost | Prompt + history storage | Per tenant |

| Cost Attribution Level | Granularity | Use Case |
|-----------------------|-------------|----------|
| Platform | Total cost | Finance |
| Tenant | Tenant-specific cost | Billing |
| Agent | Per-agent breakdown | Optimization |
| Prompt | Per-prompt cost | ROI analysis |

### 4. Define Quality Score Aggregation

Establish quality scoring system:

| Score Component | Range | Aggregation |
|----------------|-------|-------------|
| Accuracy Score | 0-100 | Weighted average |
| Latency Score | 0-100 | Based on p95 vs target |
| Cost Efficiency | 0-100 | Cost per successful task |
| User Satisfaction | 0-100 | NPS-derived |
| Safety Score | 0-100 | Guardrail pass rate |

| Aggregate Score | Formula | Use |
|----------------|---------|-----|
| Prompt Health | 0.3*accuracy + 0.2*latency + 0.2*cost + 0.2*satisfaction + 0.1*safety | Dashboard |
| Tier Score | Average of prompt health scores | Comparison |
| Catalog Score | Weighted average by usage | Platform health |

### 5. Define Alerting Thresholds

Establish alerting configuration:

| Alert Category | Condition | Severity | Response |
|----------------|-----------|----------|----------|
| Latency Spike | p95 > 2x baseline | WARNING | Investigate |
| Error Rate | >5% errors | CRITICAL | Immediate |
| Quality Drop | >10% quality decline | HIGH | Review within 4h |
| Cost Overrun | >150% budget | WARNING | Notify finance |
| Safety Violation | Any guardrail breach | CRITICAL | Immediate block |

| Alert Channel | Audience | Latency |
|--------------|----------|---------|
| PagerDuty | On-call engineer | <1 min |
| Slack | Team channel | <5 min |
| Email | Stakeholders | <1 hour |
| Dashboard | All users | Real-time |

**Verify current best practices with web search:**
Search the web: "LLM observability metrics production best practices {date}"
Search the web: "AI prompt cost optimization tracking {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the performance tracking design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into metrics and alerting configuration
- **P (Party Mode)**: Bring SRE and finance perspectives on monitoring
- **C (Continue)**: Accept performance tracking and proceed to access control
- **[Specific refinements]**: Describe tracking concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: effectiveness metrics, cost attribution, alerting thresholds
- Process enhanced insights on monitoring completeness
- Ask user: "Accept these refined tracking decisions? (y/n)"
- If yes, integrate into performance tracking specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review performance tracking for prompt catalog"
- Process SRE and finance perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save performance tracking design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]`
- Proceed to next step: `step-08-c-access-control.md`

---

## Verification

- [ ] Effectiveness metrics comprehensive
- [ ] Latency and token tracking defined
- [ ] Cost attribution model established
- [ ] Quality score aggregation documented
- [ ] Alerting thresholds configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Performance tracking specification
- Metrics definition document
- Cost attribution model
- Alerting configuration

---

## Next Step

Proceed to `step-08-c-access-control.md` to design access control model.
