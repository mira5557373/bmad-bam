# Step 4: RAG Quality Baselines

## Purpose

Define RAG quality baselines including groundedness, relevance, and faithfulness metrics.

## Prerequisites

- Step 3 complete (embedding observability configured)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `rag-observability`

## Actions

### 1. Define Quality Metrics

| Metric | Definition | Calculation | Target |
|--------|------------|-------------|--------|
| Groundedness | Answer derived from context | LLM-as-judge | >= 0.8 |
| Answer Relevance | Answer addresses query | Semantic similarity | >= 0.85 |
| Faithfulness | No hallucination | Fact verification | >= 0.9 |
| Context Utilization | Retrieved context used | Token analysis | >= 0.5 |

### 2. Establish Baseline Thresholds

| Quality Level | Groundedness | Relevance | Faithfulness |
|---------------|--------------|-----------|--------------|
| Excellent | >= 0.9 | >= 0.9 | >= 0.95 |
| Good | >= 0.8 | >= 0.8 | >= 0.9 |
| Acceptable | >= 0.7 | >= 0.7 | >= 0.8 |
| Poor | < 0.7 | < 0.7 | < 0.8 |

### 3. Configure Quality Evaluation Pipeline

| Step | Method | Frequency | Sample Rate |
|------|--------|-----------|-------------|
| Groundedness Check | LLM-as-judge | Per request | 10% |
| Relevance Score | Embedding similarity | Per request | 100% |
| Faithfulness Check | Fact extraction | Hourly batch | 5% |

## Soft Gate Checkpoint

**Steps 1-3 complete the quality baseline definitions.**

Present quality baseline summary and ask for confirmation before proceeding.

## Web Research Verification

Search the web: "RAG quality evaluation metrics {date}"
Search the web: "LLM groundedness scoring {date}"

## Verification

- [ ] Groundedness metric defined with target
- [ ] Relevance scoring configured
- [ ] Faithfulness check implemented
- [ ] Context utilization tracking enabled
- [ ] Baseline thresholds documented

## Outputs

- Quality baseline specification
- Quality metrics configuration
- Evaluation pipeline design

## Next Step

Proceed to `step-05-c-tenant-dashboards.md` with quality baselines established.
