# Step 1: Model Quality Validation

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

Validate AI model quality against defined thresholds. This includes accuracy metrics, safety evaluations, performance benchmarks, and tenant-specific requirements.

---

## Prerequisites

- Model artifacts available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `ai-runtime`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `evaluation`

---

## Actions

### 1. Define Quality Metrics

Document quality metrics to evaluate:

| Metric Category | Metrics | Threshold | Weight |
|-----------------|---------|-----------|--------|
| Accuracy | Exact match, F1, BLEU | >0.85 | 30% |
| Latency | P50, P95, P99 | <500ms | 20% |
| Safety | Refusal rate, guardrail triggers | <5% false | 25% |
| Cost | Token usage, API cost | Within budget | 15% |
| Tenant-Specific | Custom metrics per tier | Tier-dependent | 10% |

### 2. Run Evaluation Suite

Execute evaluations on holdout dataset:

| Evaluation | Dataset | Model | Result | Status |
|------------|---------|-------|--------|--------|
| Accuracy | eval_v2 | model_v3 | | [ ] |
| Safety | safety_bench | model_v3 | | [ ] |
| Latency | perf_test | model_v3 | | [ ] |
| Regression | prod_samples | model_v3 | | [ ] |

### 3. Compare Against Baseline

Compare with current production model:

| Metric | Production | Candidate | Delta | Accept |
|--------|------------|-----------|-------|--------|
| Accuracy | 0.87 | | | [ ] |
| P95 Latency | 450ms | | | [ ] |
| Safety Score | 0.98 | | | [ ] |

### 4. Tenant-Specific Validation

For enterprise tenants with custom requirements:
- [ ] Custom prompt testing
- [ ] Domain-specific evaluation
- [ ] SLA verification

**Verify current best practices with web search:**
Search the web: "LLM model validation best practices {date}"
Search the web: "AI model quality metrics production {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing model validation, if 'C' (Continue):
- Save validation results to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-tenant-rollout-planning.md`

---

## Verification

- [ ] Quality metrics defined
- [ ] Evaluation suite executed
- [ ] Baseline comparison complete
- [ ] Tenant-specific validation done
- [ ] Patterns align with pattern registry

---

## Outputs

- Model validation report
- Evaluation results
- Baseline comparison
- **Load template:** `{project-root}/_bmad/bam/data/templates/model-validation-report-template.md`

---

## Next Step

Proceed to `step-02-c-tenant-rollout-planning.md` to plan tenant-specific rollout.
