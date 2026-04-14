# Step 2: A/B Testing Framework

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

Design the A/B testing framework for prompt experiments, enabling data-driven prompt improvements with proper statistical rigor and tenant-aware traffic splitting.

---

## Prerequisites

- Step 1 completed: Version schema designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: experimentation
- **Web research (if available):** Search for current A/B testing patterns for LLMs

---

## Inputs

- Version schema from Step 1
- Tenant tier configurations
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Experimentation requirements

---

## Actions

### 1. Define Experiment Structure

Design the experiment entity:

| Field | Type | Description |
|-------|------|-------------|
| experiment_id | string | Unique experiment identifier |
| name | string | Human-readable name |
| hypothesis | text | What we're testing |
| control_prompt | prompt_ref | Control version |
| treatment_prompt | prompt_ref | Treatment version |
| traffic_split | percentage | Treatment allocation |
| tenant_scope | array | Included tenants |
| start_date | timestamp | Experiment start |
| end_date | timestamp | Planned end |
| status | enum | DRAFT/RUNNING/PAUSED/COMPLETED |
| min_sample_size | int | Statistical minimum |

### 2. Configure Traffic Splitting

Define traffic allocation strategies:

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Random | Hash-based random assignment | Default |
| Tenant-Based | Entire tenants in treatment | Enterprise |
| User-Based | Per-user assignment | Consumer |
| Feature-Flag | Tied to feature flags | Staged rollout |
| Time-Based | Alternating time windows | Low traffic |

Traffic Split Configuration:

| Tenant Tier | Max Treatment % | Approval Required |
|-------------|-----------------|-------------------|
| Free | 50% | No |
| Pro | 30% | Tenant opt-in |
| Enterprise | 10% | Explicit approval |

### 3. Define Metrics Collection

Specify metrics to compare variants:

| Metric | Type | Description | Target |
|--------|------|-------------|--------|
| Task Success Rate | Primary | Correct completions | Higher is better |
| Response Latency | Secondary | P95 response time | Lower is better |
| Token Efficiency | Secondary | Tokens per response | Lower is better |
| User Satisfaction | Primary | Explicit feedback | Higher is better |
| Error Rate | Guardrail | Failure percentage | <2% |
| Safety Violations | Guardrail | Blocked outputs | 0 |

### 4. Statistical Significance Framework

Define when experiments conclude:

| Parameter | Value | Notes |
|-----------|-------|-------|
| Confidence Level | 95% | p < 0.05 |
| Minimum Effect Size | 5% | Meaningful difference |
| Power | 80% | Detect real effects |
| Sample Size Formula | Calculated | Per metric type |
| Sequential Testing | Optional | Early stopping allowed |

### 5. Winner Declaration Criteria

Define how winners are selected:

| Outcome | Condition | Action |
|---------|-----------|--------|
| Clear Winner | Treatment > Control (significant) | Promote treatment |
| No Difference | Within margin of error | Keep control (cheaper) |
| Treatment Worse | Treatment < Control (significant) | Keep control |
| Mixed Results | Some metrics better, some worse | Manual review |
| Guardrail Breach | Safety/error threshold exceeded | Stop experiment |

### 6. Gradual Rollout Strategy

Define post-experiment rollout:

| Phase | Traffic % | Duration | Rollback Trigger |
|-------|-----------|----------|------------------|
| Canary | 5% | 24 hours | Error rate > 5% |
| Limited | 25% | 48 hours | Error rate > 3% |
| Majority | 75% | 1 week | Error rate > 2% |
| Full | 100% | Permanent | Error rate > 1% |

**Verify current best practices with web search:**
Search the web: "A/B testing LLM prompts statistical methods {date}"
Search the web: "prompt experimentation framework best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the A/B testing framework analysis, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into statistical methods and edge cases
- **P (Party Mode)**: Bring data scientist and ML engineer perspectives
- **C (Continue)**: Accept A/B framework and proceed to rollback procedures
- **[Specific refinements]**: Describe testing concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: traffic splitting, metrics collection, statistical framework
- Process enhanced insights on experiment design
- Ask user: "Accept these refined A/B testing decisions? (y/n)"
- If yes, integrate into A/B specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review A/B testing framework for prompt experiments"
- Process data scientist and ML engineer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save A/B testing framework to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-rollback-procedures.md`

---

## Verification

- [ ] Experiment structure defined
- [ ] Traffic splitting strategies documented
- [ ] Metrics collection configured
- [ ] Statistical significance framework defined
- [ ] Winner declaration criteria specified
- [ ] Gradual rollout strategy designed
- [ ] Patterns align with pattern registry

---

## Outputs

- A/B testing framework specification
- Traffic splitting configuration
- Metrics and statistical requirements
- Rollout strategy definition

---

## Next Step

Proceed to `step-03-c-rollback-procedures.md` to define rollback mechanisms.
