# Step 5: Evaluation Foundation

## Purpose
Establish a systematic evaluation framework to measure agent performance, detect regressions, and ensure quality across deployments.

## Actions

- Create golden task templates:
  - Diverse test cases per agent type (simple, complex, edge cases)
  - Expected outputs and acceptable variations
  - Coverage across all supported tool combinations
  - Tenant-specific evaluation scenarios

- Define metric specifications:
  - Accuracy: task completion correctness
  - Relevance: response quality and context appropriateness
  - Latency: end-to-end response time (p50, p95, p99)
  - Cost: token usage and tool invocation costs
  - Safety: guardrail violation rate, harmful output detection

- Configure thresholds and alerts:
  - Per-metric pass/fail thresholds
  - Degradation alerts (percentage drop from baseline)
  - Tenant tier-specific quality targets

- Establish regression baselines:
  - Capture baseline metrics before each deployment
  - Automated comparison against historical performance
  - Rollback triggers when thresholds exceeded

- Implement LLM-as-judge evaluation:
  - Judge prompt templates for subjective quality
  - Multi-judge consensus for reliability
  - Human calibration of judge accuracy

## Outputs
- Golden task dataset per agent type
- Metric definition document with thresholds
- Evaluation pipeline configuration
- Baseline snapshot storage schema

## Questions to Consider
- How often should baselines be refreshed?
- What is the minimum test coverage for deployment approval?
- How do you handle evaluation of non-deterministic outputs?
