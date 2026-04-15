# Step 5: Quality Metrics Definition

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

---

## Purpose

Define accuracy metrics, relevance scoring, safety metrics, and user satisfaction tracking for AI quality management.

---

## Prerequisites

- Cost calculation configured (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: ai-quality

---

## Actions

### 1. Accuracy Metrics

| Metric | Measurement | Target | Evaluation |
|--------|-------------|--------|------------|
| Task completion | End-state validation | > 90% | Automated |
| Factual accuracy | Ground truth comparison | > 95% | LLM-as-judge |
| Format compliance | Schema validation | > 99% | Automated |
| Citation accuracy | Source verification | > 90% | LLM-as-judge |

Evaluation cadence:
| Evaluation Type | Frequency | Sample Size |
|-----------------|-----------|-------------|
| Automated checks | Continuous | 100% |
| LLM-as-judge | Daily | 1% sample |
| Human evaluation | Weekly | 100 requests |

### 2. Relevance Scoring

| Dimension | Method | Scale | Target |
|-----------|--------|-------|--------|
| Query relevance | Embedding similarity | 0-1 | > 0.8 |
| Context relevance | RAG precision | 0-1 | > 0.85 |
| Response coherence | LLM-as-judge | 1-5 | > 4.0 |
| Helpfulness | User feedback | 1-5 | > 4.0 |

### 3. Safety Metrics

| Metric | Detection | Target | Action |
|--------|-----------|--------|--------|
| Toxicity | Content filter | < 0.1% | Block |
| PII leakage | Regex + ML | 0% | Block + Alert |
| Prompt injection | Pattern matching | 0% | Block + Log |
| Hallucination | Fact checking | < 5% | Flag |
| Jailbreak attempts | Classifier | 0% success | Block + Log |

### 4. User Satisfaction Tracking

| Signal | Collection | Metric | Target |
|--------|------------|--------|--------|
| Thumbs up/down | In-app | Approval rate | > 80% |
| Regeneration rate | System | Regen % | < 10% |
| Conversation length | System | Avg turns | Baseline |
| Abandonment | System | Drop-off % | < 5% |

Satisfaction aggregation:
| Level | Aggregation | Purpose |
|-------|-------------|---------|
| Per-request | Individual | Debugging |
| Per-agent | Agent type | Optimization |
| Per-tenant | Tenant-wide | Account health |
| Platform | Global | Overall quality |

**Verify current best practices with web search:**
Search the web: "LLM quality metrics evaluation {date}"
Search the web: "AI observability quality measurement {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into quality evaluation
- **P (Party Mode)**: Bring AI and product perspectives
- **C (Continue)**: Finalize AI observability setup
- **[Specific refinements]**: Describe quality metric concerns

Select an option:
```

#### If 'C' (Continue):
- Save quality metrics to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Mark workflow as complete

---

## Verification

- [ ] Accuracy metrics defined
- [ ] Relevance scoring active
- [ ] Safety metrics monitored
- [ ] User satisfaction tracked

---

## Outputs

- Quality metrics configuration
- AI observability setup complete
- **Load template:** `{project-root}/_bmad/bam/data/templates/ai-observability-template.md`

---

## Workflow Complete

The AI observability setup workflow is complete. Key artifacts produced:
- AI observability configuration: `{output_folder}/operations/ai/ai-observability-config.md`
- AI dashboards: `{output_folder}/operations/ai/ai-dashboards.md`

Next steps:
- Create dashboards from configuration
- Set up alert routing
- Establish baseline metrics
- Consider running `validate` mode to verify QG-AI2 compliance
