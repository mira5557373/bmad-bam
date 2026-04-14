# Step 4: Establish Model Validation

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Establish model validation gates including pre-deployment checks, performance benchmarking, safety evaluation, and regression testing thresholds.

---

## Prerequisites

- Steps 1-3 completed with deployment and canary configuration
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `ai-lifecycle`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `model-deployment`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

---

## Inputs

- Deployment strategy from Steps 1-3
- Model quality requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Pre-Deployment Validation Checks

| Check Category | Checks | Pass Criteria | Blocking |
|----------------|--------|---------------|----------|
| Artifact Integrity | Checksum, signature | Valid signature | Yes |
| Model Format | Schema validation | Matches expected format | Yes |
| Dependencies | Version compatibility | All deps available | Yes |
| Configuration | Config validation | Valid config schema | Yes |
| Resource Fit | Memory/GPU requirements | Fits target infrastructure | Yes |
| Security Scan | Vulnerability check | No critical CVEs | Yes |

For each check, document:
- Validation method
- Timeout period
- Failure handling
- Bypass procedures (emergency only)

### 2. Configure Performance Benchmarking

| Benchmark Type | Metrics | Baseline Source | Pass Threshold |
|----------------|---------|-----------------|----------------|
| Latency | p50, p95, p99 | Production baseline | <= 110% baseline |
| Throughput | Requests/sec | Production baseline | >= 90% baseline |
| Memory | Peak usage, leaks | Previous version | <= 105% baseline |
| GPU Utilization | Avg, peak | Previous version | <= 110% baseline |
| Cold Start | Time to first response | Previous version | <= 120% baseline |

Establish:
- Benchmark dataset specifications
- Warm-up procedures
- Statistical confidence requirements
- Performance regression detection

### 3. Establish Safety Evaluation Criteria

| Safety Check | Method | Pass Criteria | Action on Fail |
|--------------|--------|---------------|----------------|
| Bias Detection | Fairness metrics | Disparity < 0.1 | Block deployment |
| Toxicity Screening | Content classifier | Score < 0.05 | Block deployment |
| Hallucination Rate | Factuality check | < 5% hallucination | Review required |
| PII Leakage | Detection scan | No PII in outputs | Block deployment |
| Prompt Injection | Red team tests | No bypass | Block deployment |
| Guardrail Compliance | NeMo validation | All guardrails pass | Block deployment |

Configure:
- Automated safety test suite
- Red team testing schedule
- Human review requirements
- Safety incident escalation

### 4. Define Regression Testing Thresholds

| Regression Area | Test Suite | Threshold | Comparison |
|-----------------|------------|-----------|------------|
| Model Accuracy | Golden dataset | > 98% of baseline | Previous version |
| Task Completion | End-to-end tests | > 95% success | Previous version |
| Edge Cases | Boundary tests | No new failures | Previous version |
| Multi-Tenant | Isolation tests | 100% isolation | Baseline |
| Integration | API contract tests | 100% pass | Contract spec |

**Verify current best practices with web search:**
Search the web: "ML model validation gates CI/CD {date}"
Search the web: "model safety evaluation LLM deployment {date}"
Search the web: "regression testing machine learning models {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the model validation configuration above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation gates and safety criteria
- **P (Party Mode)**: Bring analyst and architect perspectives for validation review
- **C (Continue)**: Accept model validation gates and proceed to rollback procedures
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass validation context: pre-deployment checks, benchmarks, safety
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation configuration
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review model validation: {summary of gates and criteria}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save model validation configuration to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-rollback-procedures.md`

---

## Verification

- [ ] Pre-deployment validation checks defined
- [ ] Performance benchmarking configured
- [ ] Safety evaluation criteria established
- [ ] Regression testing thresholds documented
- [ ] Bypass procedures documented (emergency only)
- [ ] Patterns align with pattern registry

---

## Outputs

- Model validation gate specification
- Performance benchmark requirements
- Safety evaluation checklist
- Regression testing matrix

---

## Next Step

Proceed to `step-05-c-rollback-procedures.md` to define rollback mechanisms.
