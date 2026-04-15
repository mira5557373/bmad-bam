# Step 1: Baseline Comparison

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
- Use web search to verify current best practices when making operational decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Load historical performance baselines, compare current metrics against baselines, identify significant deviations, and perform trend analysis for performance review.

---

## Prerequisites

- Historical performance baselines available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: performance
- **Web research (if available):** Search for current performance baseline best practices

---

## Inputs

- Historical baseline data
- Current performance metrics
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Load Historical Baselines

Retrieve baseline metrics from the previous review period:

| Metric | Baseline (Previous) | Period |
|--------|---------------------|--------|
| API latency p50 | {value} ms | {date range} |
| API latency p95 | {value} ms | {date range} |
| API latency p99 | {value} ms | {date range} |
| Error rate | {value}% | {date range} |
| Availability | {value}% | {date range} |
| Throughput | {value} req/s | {date range} |
| AI response latency p50 | {value} ms | {date range} |
| AI response latency p95 | {value} ms | {date range} |
| Token consumption | {value}/day | {date range} |

### 2. Collect Current Metrics

Gather current performance metrics:

| Metric | Current | Change from Baseline | Status |
|--------|---------|---------------------|--------|
| API latency p50 | {value} ms | {+/-}% | Improved/Degraded/Stable |
| API latency p95 | {value} ms | {+/-}% | Improved/Degraded/Stable |
| API latency p99 | {value} ms | {+/-}% | Improved/Degraded/Stable |
| Error rate | {value}% | {+/-}% | Improved/Degraded/Stable |
| Availability | {value}% | {+/-}% | Improved/Degraded/Stable |
| Throughput | {value} req/s | {+/-}% | Improved/Degraded/Stable |
| AI response latency p50 | {value} ms | {+/-}% | Improved/Degraded/Stable |
| AI response latency p95 | {value} ms | {+/-}% | Improved/Degraded/Stable |
| Token consumption | {value}/day | {+/-}% | Improved/Degraded/Stable |

### 3. Identify Significant Deviations

Flag metrics with significant deviations (threshold: +/-10%):

| Metric | Deviation | Severity | Investigation Needed |
|--------|-----------|----------|---------------------|
| {metric} | {+/-}% | High/Medium/Low | Yes/No |

### 4. Perform Trend Analysis

Analyze trends over multiple review periods:

| Metric | 3-Period Trend | 6-Period Trend | Forecast |
|--------|----------------|----------------|----------|
| API latency | Improving/Stable/Degrading | Improving/Stable/Degrading | {projection} |
| Error rate | Improving/Stable/Degrading | Improving/Stable/Degrading | {projection} |
| Availability | Improving/Stable/Degrading | Improving/Stable/Degrading | {projection} |
| AI latency | Improving/Stable/Degrading | Improving/Stable/Degrading | {projection} |

**Verify current best practices with web search:**
Search the web: "SaaS performance baseline comparison best practices {date}"
Search the web: "multi-tenant performance monitoring metrics {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the baseline comparison above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into deviation analysis
- **P (Party Mode)**: Bring SRE and data engineering perspectives on trends
- **C (Continue)**: Accept comparison and proceed to capacity assessment
- **[Specific refinements]**: Describe concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: baseline data, current metrics, deviations
- Process enhanced insights on performance trends
- Ask user: "Accept these refined analysis findings? (y/n)"
- If yes, integrate into performance review
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review performance baseline comparison for multi-tenant AI platform"
- Process SRE and data engineering perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save baseline comparison to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-capacity-assessment.md`

---

## Verification

- [ ] Historical baselines loaded
- [ ] Current metrics collected
- [ ] Significant deviations identified
- [ ] Trend analysis completed

---

## Outputs

- Baseline comparison table
- Deviation analysis
- Trend analysis
- **Load template:** `{project-root}/_bmad/bam/data/templates/performance-review-template.md`

---

## Next Step

Proceed to `step-02-c-capacity-assessment.md` to assess capacity.
