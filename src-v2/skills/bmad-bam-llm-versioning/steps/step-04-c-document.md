# Step 04: Design Version Monitoring

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Design quality metrics, cost comparison, latency tracking, and feedback collection per version
- 💾 Track: `stepsCompleted: [1, 2, 3, 4]` when complete
- 📖 Context: Rollout strategy and comparison metrics from Step 03
- 🚫 Do NOT: Compile final document (that's Step 05)
- 🔍 Use web search: Verify LLM monitoring patterns against current best practices
- ⚠️ Gate: QG-AI2 - AI/Agent operational monitoring

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Quality metrics per model version
- Cost comparison across versions
- Latency tracking and analysis
- Tenant feedback collection mechanisms

**OUT OF SCOPE:**
- Final document compilation (Step 05)
- Operational runbook creation
- Alerting infrastructure setup

---

## Purpose

Design the version monitoring strategy including quality metrics per model version, cost comparison dashboards, latency tracking, and tenant feedback collection. This ensures visibility into LLM version performance across the multi-tenant platform.

---

## Prerequisites

- Step 03 completed: Rollout strategy and comparison metrics defined
- Performance comparison metrics established
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/ai-observability.md`

---

## Inputs

- Rollout strategy from Step 03
- Performance comparison metrics from Step 03
- Rollback trigger definitions from Step 03
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Design monitoring strategy for LLM version performance tracking.

---

## Main Sequence

### 1. Design Quality Metrics per Version

Create quality measurement framework:

**Quality Metric Categories:**

| Category | Metrics | Measurement Method |
|----------|---------|-------------------|
| Accuracy | Factual correctness, relevance | Human eval + automated |
| Coherence | Logical flow, consistency | Automated scoring |
| Helpfulness | Task completion rate | User feedback |
| Safety | Content safety, PII detection | Automated filters |
| Format | Structure compliance | Schema validation |

**Per-Version Quality Dashboard:**

| Metric | Model A (v1.2) | Model B (v1.3) | Delta | Status |
|--------|----------------|----------------|-------|--------|
| Accuracy score | 94.2% | 95.1% | +0.9% | IMPROVED |
| Coherence score | 91.5% | 90.8% | -0.7% | WATCH |
| Helpfulness | 88.3% | 89.7% | +1.4% | IMPROVED |
| Safety pass rate | 99.9% | 99.95% | +0.05% | STABLE |
| Format compliance | 97.2% | 98.1% | +0.9% | IMPROVED |

**Quality Evaluation Pipeline:**

| Stage | Method | Sample Rate | Latency Impact |
|-------|--------|-------------|----------------|
| Real-time safety | Automated filter | 100% | < 10ms |
| Format validation | Schema check | 100% | < 5ms |
| Quality scoring | LLM-as-judge | 5% | Async |
| Human evaluation | Manual review | 0.5% | Offline |

**LLM-as-Judge Configuration:**

| Aspect | Prompt Pattern | Scale |
|--------|---------------|-------|
| Relevance | "Rate how relevant..." | 1-5 |
| Accuracy | "Verify factual claims..." | 1-5 |
| Helpfulness | "Rate how helpful..." | 1-5 |
| Overall | "Rate overall quality..." | 1-5 |

### 2. Design Cost Comparison Dashboard

Create cost tracking and comparison:

**Cost Metrics per Version:**

| Metric | Description | Granularity |
|--------|-------------|-------------|
| Input tokens | Tokens in prompt | Per-request |
| Output tokens | Tokens in response | Per-request |
| Total tokens | Input + Output | Per-request |
| Dollar cost | Provider pricing applied | Per-request |
| Cost per task | Normalized by task type | Per-task |

**Cost Comparison Dashboard:**

| Dimension | Model A (v1.2) | Model B (v1.3) | Delta |
|-----------|----------------|----------------|-------|
| Avg tokens/request | 1,250 | 1,180 | -5.6% |
| Avg cost/request | $0.0187 | $0.0195 | +4.3% |
| Daily cost (Pro tier) | $450 | $468 | +4.0% |
| Cost per completion | $0.0195 | $0.0201 | +3.1% |

**Cost Attribution:**

| Level | Breakdown | Purpose |
|-------|-----------|---------|
| Per-tenant | Cost attributed to tenant | Billing, capacity |
| Per-tier | Aggregated by tier | Pricing validation |
| Per-model | Aggregated by model | Version comparison |
| Per-task | Aggregated by task type | Optimization focus |

**Cost Alerting Thresholds:**

| Alert | Condition | Action |
|-------|-----------|--------|
| Tenant spike | > 2x 7-day average | Notify tenant admin |
| Tier spike | > 150% daily budget | Notify platform ops |
| Model spike | > 120% projected | Pause rollout |
| Global spike | > 110% monthly budget | Executive alert |

### 3. Design Latency Tracking

Create latency monitoring strategy:

**Latency Metrics:**

| Metric | Description | Target |
|--------|-------------|--------|
| TTFB | Time to first byte/token | < 500ms |
| Total latency | Full response time | < 5s (typical) |
| Tokens/second | Streaming throughput | > 50 t/s |
| Queue time | Time waiting for capacity | < 100ms |

**Latency Breakdown:**

| Component | Typical % | Optimization Lever |
|-----------|-----------|-------------------|
| Network (to provider) | 5-10% | Region selection |
| Queue wait | 5-15% | Capacity scaling |
| Inference time | 70-80% | Model selection |
| Network (return) | 5-10% | Streaming |
| Post-processing | 2-5% | Code optimization |

**Per-Version Latency Dashboard:**

| Percentile | Model A (v1.2) | Model B (v1.3) | Delta | SLA |
|------------|----------------|----------------|-------|-----|
| P50 | 1.2s | 1.1s | -8.3% | 2s |
| P95 | 3.5s | 3.2s | -8.6% | 5s |
| P99 | 5.8s | 5.2s | -10.3% | 10s |
| TTFB | 380ms | 350ms | -7.9% | 500ms |

**Latency by Tenant Tier:**

| Tier | P50 Target | P99 Target | Priority Queue |
|------|------------|------------|----------------|
| Enterprise | 800ms | 3s | Yes |
| Pro | 1.2s | 5s | No |
| Free | 2s | 10s | No |

### 4. Design Tenant Feedback Collection

Create feedback collection mechanisms:

**Feedback Channels:**

| Channel | Type | Collection Point | Data Captured |
|---------|------|------------------|---------------|
| Thumbs up/down | Explicit | After response | Binary rating |
| Star rating | Explicit | After session | 1-5 scale |
| Report issue | Explicit | Any time | Text + context |
| Regeneration | Implicit | User action | Request repeat |
| Edit response | Implicit | User action | Correction text |
| Abandon | Implicit | User behavior | Session drop-off |

**Feedback Schema:**

| Field | Type | Description |
|-------|------|-------------|
| feedback_id | UUID | Unique identifier |
| tenant_id | UUID | Tenant providing feedback |
| model_id | UUID | Model version used |
| model_version | SemVer | Specific version |
| request_id | UUID | Associated request |
| feedback_type | Enum | thumbs, rating, report, implicit |
| value | Variant | Rating value or text |
| context | JSON | Request/response excerpt |
| timestamp | Timestamp | When collected |

**Feedback Analysis Pipeline:**

| Stage | Process | Output |
|-------|---------|--------|
| Collection | Store feedback with context | Raw feedback |
| Aggregation | Group by model version | Version scores |
| Sentiment | NLP on text feedback | Sentiment trends |
| Categorization | Classify issues | Issue taxonomy |
| Alerting | Detect negative trends | Automated alerts |

**Feedback Dashboard:**

| Metric | Model A (v1.2) | Model B (v1.3) | Trend |
|--------|----------------|----------------|-------|
| Thumbs up rate | 78.5% | 81.2% | +2.7% |
| Average rating | 4.2/5 | 4.3/5 | +0.1 |
| Issue reports | 12/day | 8/day | -33% |
| Regeneration rate | 15% | 12% | -3% |
| Session completion | 85% | 88% | +3% |

**Feedback-Triggered Actions:**

| Trigger | Threshold | Action |
|---------|-----------|--------|
| Rating drop | < 3.5 avg over 24h | Alert + review |
| Issue spike | > 2x baseline | Pause rollout |
| Positive trend | > 10% improvement | Accelerate rollout |
| Enterprise complaint | Any negative | Immediate review |

---

## COLLABORATION MENUS (A/P/C):

After completing monitoring design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into quality evaluation or feedback analysis
- **P (Party Mode)**: Bring architect perspectives (Nova for AI, Atlas for observability)
- **C (Continue)**: Accept design and proceed to final compilation
- **[Specific component]**: Describe component to refine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: quality metrics, cost tracking, feedback mechanisms
- Process enhanced insights on LLM monitoring patterns
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review LLM version monitoring design: {summary}"
- Process AI Runtime Architect (Nova) perspective on model evaluation
- Process Platform Architect (Atlas) perspective on observability
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document monitoring design
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-complete.md`

---

## SUCCESS METRICS:

- [ ] Quality metrics defined with evaluation pipeline
- [ ] Cost comparison dashboard designed
- [ ] Latency tracking covers all percentiles
- [ ] Feedback collection mechanisms established
- [ ] Alert thresholds configured

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Quality eval too expensive | Reduce sampling rate |
| Cost attribution complex | Start with tier-level only |
| Feedback fatigue | Limit explicit prompts |
| Data volume overwhelming | Aggregate before storage |

---

## Verification

- [ ] Quality metrics measurable with existing tools
- [ ] Cost tracking aligns with billing system
- [ ] Latency targets match SLAs
- [ ] Feedback integrates with existing UX
- [ ] Patterns align with pattern registry

---

## Outputs

- Quality metrics framework
- Cost comparison dashboard design
- Latency tracking specification
- Feedback collection system design
- Alert and threshold configuration

---

## NEXT STEP:

Proceed to `step-05-c-complete.md` to compile the complete LLM versioning design document.
