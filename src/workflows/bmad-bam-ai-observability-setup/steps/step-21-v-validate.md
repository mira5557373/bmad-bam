# Step 21: Validate Against Quality Criteria

## Purpose

Validate the AI observability configuration against QG-AI2 quality gate criteria.

## Prerequisites

- Step 20 complete (artifact loaded)
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-ai-observability.md`

## Actions

### 1. QG-AI2 Validation Checks

#### LLM Metrics Checks
- [ ] **CRITICAL:** Trace collection configured
- [ ] Prompt/completion logging active
- [ ] Per-tenant attribution working

#### Token Tracking Checks
- [ ] **CRITICAL:** Token counting implemented
- [ ] Per-tenant aggregation active
- [ ] Budget enforcement configured

#### Latency Checks
- [ ] **CRITICAL:** E2E latency tracked
- [ ] Per-model latency monitored
- [ ] SLOs configured

#### Cost Checks
- [ ] **CRITICAL:** Per-request cost calculated
- [ ] Tenant cost aggregation active
- [ ] Anomaly detection enabled

#### Quality Checks
- [ ] Accuracy metrics defined
- [ ] Safety metrics monitored
- [ ] User satisfaction tracked

### 2. Calculate Validation Score

| Category | Critical | Passed | Failed | Score |
|----------|----------|--------|--------|-------|
| LLM Metrics | 1 | {n} | {n} | {%} |
| Token Tracking | 1 | {n} | {n} | {%} |
| Latency | 1 | {n} | {n} | {%} |
| Cost | 1 | {n} | {n} | {%} |
| Quality | 0 | {n} | {n} | {%} |

### 3. Determine Gate Outcome

**Gate Outcome:** {PASS/CONDITIONAL/FAIL}

## COLLABORATION MENUS (A/P/C):

#### If 'C' (Continue):
- Proceed to next step: `step-22-v-generate-report.md`

## Verification

- [ ] Step actions completed successfully
- [ ] Output artifacts generated
- [ ] Quality criteria met
- [ ] Patterns align with pattern registry

## Outputs

- Updated configuration or artifact

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
