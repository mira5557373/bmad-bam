# Step 6: A/B Testing

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

Design the A/B testing infrastructure for catalog prompts, enabling data-driven prompt improvements through controlled experimentation across the multi-tenant platform.

---

## Prerequisites

- Step 5 completed: Prompt testing framework defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: prompt-management
- **Web research (if available):** Search for A/B testing best practices for AI

---

## Inputs

- Testing framework from Step 5
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Tenant isolation model from Step 3

---

## Actions

### 1. Design Experiment Configuration

Define A/B experiment structure:

| Experiment Field | Type | Required | Description |
|-----------------|------|----------|-------------|
| experiment_id | string | YES | Unique identifier |
| name | string | YES | Human-readable name |
| hypothesis | string | YES | What we're testing |
| control_prompt_id | string | YES | Baseline prompt |
| variant_prompt_ids | array | YES | Test variants |
| traffic_split | object | YES | Distribution percentages |
| start_date | timestamp | YES | Experiment start |
| end_date | timestamp | NO | Planned end date |
| status | enum | YES | DRAFT/RUNNING/CONCLUDED |

| Traffic Split Model | Description | Use Case |
|--------------------|--------------| ---------|
| Random | Random user assignment | General experiments |
| Tenant-Based | All users in tenant see same variant | B2B consistency |
| User-Based | Sticky per user | Consumer apps |
| Session-Based | Sticky per session | Short-term tests |

### 2. Define Traffic Splitting Per Tenant

Design tenant-aware traffic management:

| Tenant Configuration | Description | Default |
|---------------------|-------------|---------|
| Experiment Opt-In | Tenant must enable experiments | Required |
| Traffic Exclusion | Tenant can exclude from experiments | Allowed |
| Variant Pinning | Tenant can pin to specific variant | Allowed |
| Custom Split | Tenant can adjust split percentages | Enterprise only |

| Split Strategy | Description | Implementation |
|----------------|-------------|----------------|
| Global Split | Same percentage for all tenants | Default |
| Tier-Based Split | Different splits per tier | Configurable |
| Custom Per-Tenant | Individual tenant configuration | Enterprise |
| Holdout | Control group never sees variants | Configurable |

### 3. Define Metric Collection

Specify metrics for experiment evaluation:

| Metric Category | Metrics | Collection Method |
|----------------|---------|-------------------|
| Quality | Response accuracy, relevance, coherence | Human eval + LLM judge |
| Performance | Latency p50/p95/p99, token count | Automated |
| Cost | Cost per request, total experiment cost | Automated |
| User | Satisfaction, task completion, escalation | User feedback |
| Business | Conversion, retention, engagement | Analytics |

| Collection Point | Data Captured | Storage |
|-----------------|---------------|---------|
| Request Start | variant_id, tenant_id, user_id | Event stream |
| LLM Response | latency, tokens, model, cost | Metrics store |
| User Feedback | rating, comments | Feedback store |
| Business Event | outcome, conversion | Analytics |

### 4. Define Statistical Framework

Establish statistical rigor for experiments:

| Statistical Parameter | Default | Configurable |
|----------------------|---------|--------------|
| Significance Level | 95% (p<0.05) | YES |
| Minimum Sample Size | 1000 per variant | YES |
| Power | 80% | YES |
| Minimum Detectable Effect | 5% | YES |

| Analysis Method | Use Case | Timing |
|-----------------|----------|--------|
| Frequentist | Standard A/B | End of experiment |
| Bayesian | Early stopping | Continuous |
| Sequential | Adaptive sample | During experiment |
| Cuped | Variance reduction | End of experiment |

### 5. Define Winner Promotion

Establish promotion workflow:

| Promotion Stage | Actions | Approval |
|-----------------|---------|----------|
| Analysis Complete | Statistical review | Data team |
| Winner Declaration | Document results | Product + AI team |
| Staged Rollout | Gradual traffic shift | Platform admin |
| Full Promotion | Winner becomes default | Platform admin |

| Rollout Phase | Traffic | Duration | Monitoring |
|---------------|---------|----------|------------|
| Initial | 10% | 24 hours | High alert |
| Expansion | 50% | 48 hours | Standard |
| Full | 100% | Ongoing | Standard |

**Verify current best practices with web search:**
Search the web: "A/B testing LLM prompts production best practices {date}"
Search the web: "experiment design AI systems statistical significance {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the A/B testing design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into experiment design and statistics
- **P (Party Mode)**: Bring data science and product perspectives
- **C (Continue)**: Accept A/B testing design and proceed to performance tracking
- **[Specific refinements]**: Describe A/B testing concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: experiment configuration, statistical framework, promotion workflow
- Process enhanced insights on experimentation rigor
- Ask user: "Accept these refined A/B testing decisions? (y/n)"
- If yes, integrate into A/B testing specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review A/B testing design for prompt catalog"
- Process data science and product perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save A/B testing design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6]`
- Proceed to next step: `step-07-c-performance-tracking.md`

---

## Verification

- [ ] Experiment configuration structure defined
- [ ] Traffic splitting per tenant documented
- [ ] Metric collection comprehensive
- [ ] Statistical framework rigorous
- [ ] Winner promotion workflow established
- [ ] Patterns align with pattern registry

---

## Outputs

- A/B testing framework specification
- Experiment configuration schema
- Statistical analysis guidelines
- Promotion workflow documentation

---

## Next Step

Proceed to `step-07-c-performance-tracking.md` to define performance monitoring.
