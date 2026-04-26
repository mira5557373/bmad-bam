# Step 02: Design Version Management Strategy

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Design model version registry, per-tenant assignment, A/B testing, and fallback configuration
- 💾 Track: `stepsCompleted: [1, 2]` when complete
- 📖 Context: Model inventory and tenant tier definitions from Step 01
- 🚫 Do NOT: Design rollout strategy (that's Step 03)
- 🔍 Use web search: Verify model registry patterns against current best practices
- ⚠️ Gate: QG-AI1 - AI/Agent runtime configuration

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Model version registry design
- Per-tenant model assignment logic
- A/B testing configuration structure
- Fallback model configuration

**OUT OF SCOPE:**
- Rollout strategy design (Step 03)
- Monitoring design (Step 04)
- Final compilation (Step 05)

---

## Purpose

Design the version management strategy including model registry structure, tenant-aware model assignment, A/B testing framework, and fallback configurations. This ensures controlled LLM version management across tenant tiers.

---

## Prerequisites

- Step 01 completed: Model inventory and tenant mapping available
- Tenant tier definitions established
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-runtime
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv` → all

---

## Inputs

- LLM model inventory from Step 01
- Tenant-model mapping from Step 01
- Version dependency analysis from Step 01
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Design version management components for tenant-aware LLM versioning.

---

## Main Sequence

### 1. Design Model Version Registry

Create the model version registry schema:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| model_id | UUID | Unique model identifier | `m-001-gpt4o` |
| provider | Enum | LLM provider | OpenAI, Anthropic, Custom |
| model_name | String | Provider model name | `gpt-4o-2024-08-06` |
| version | SemVer | Internal version | `1.2.0` |
| status | Enum | Deployment status | draft, canary, stable, deprecated |
| config | JSON | Model configuration | Temperature, max_tokens, etc. |
| prompt_template_version | SemVer | Compatible prompt version | `2.1.0` |
| created_at | Timestamp | Version creation time | - |
| deprecated_at | Timestamp | Deprecation date (if any) | - |

**Registry Storage Options:**

| Option | Pros | Cons | Recommendation |
|--------|------|------|----------------|
| Database table | ACID, queryable | Requires migration for changes | Multi-tenant apps |
| Configuration file | Simple, versioned in git | No runtime updates | Simple deployments |
| Feature flag service | Dynamic updates | External dependency | Enterprise setups |

### 2. Design Per-Tenant Model Assignment

Create tenant-model assignment structure:

| Assignment Field | Type | Description |
|------------------|------|-------------|
| tenant_id | UUID | Tenant identifier |
| tier | Enum | Free / Pro / Enterprise |
| primary_model_id | UUID | Primary model for tenant |
| fallback_model_id | UUID | Fallback if primary unavailable |
| ab_experiment_id | UUID | Active A/B experiment (nullable) |
| override_config | JSON | Tenant-specific config overrides |
| effective_date | Timestamp | When assignment takes effect |

**Assignment Resolution Logic:**

```
1. Check tenant-specific override → Use if exists
2. Check A/B experiment assignment → Use if enrolled
3. Use tier default → Primary model for tier
4. Fallback → Use fallback model if primary unavailable
```

### 3. Design A/B Testing Configuration

Create A/B testing framework structure:

| Experiment Field | Type | Description |
|------------------|------|-------------|
| experiment_id | UUID | Unique experiment ID |
| name | String | Experiment name |
| description | String | What we're testing |
| control_model_id | UUID | Control group model |
| treatment_model_id | UUID | Treatment group model |
| allocation_percent | Integer | % of traffic to treatment (0-100) |
| eligible_tiers | Array | Which tiers can participate |
| metrics | Array | Metrics to compare |
| start_date | Timestamp | Experiment start |
| end_date | Timestamp | Experiment end |
| status | Enum | draft, running, concluded, cancelled |

**A/B Assignment Algorithm:**

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Random | Hash-based random assignment | General experiments |
| Sticky | Same assignment per tenant | Consistency required |
| Progressive | Gradually increase treatment % | Risk mitigation |
| Tier-specific | Different allocation per tier | Enterprise risk avoidance |

**Metrics to Track:**

| Metric | Description | Comparison Method |
|--------|-------------|-------------------|
| Response quality | LLM output quality score | Statistical significance |
| Latency | Response time | P50, P95, P99 |
| Cost | Token usage / API cost | Per-request average |
| Error rate | Failed completions | Percentage |
| User satisfaction | Feedback/ratings | Average rating |

### 4. Design Fallback Configuration

Create fallback model configuration:

| Fallback Scenario | Trigger | Fallback Action |
|-------------------|---------|-----------------|
| Primary unavailable | API timeout / 5xx | Switch to fallback model |
| Rate limited | 429 response | Queue or switch provider |
| Context overflow | Token limit exceeded | Truncate or chunk |
| Model deprecated | Deprecation date reached | Migrate to successor |
| Cost threshold | Daily budget exceeded | Switch to lower-cost model |

**Fallback Chain Design:**

```
Primary Model (GPT-4o)
    ↓ (on failure)
Fallback Model (GPT-4o-mini)
    ↓ (on failure)
Emergency Model (GPT-3.5-turbo)
    ↓ (on failure)
Graceful Degradation (cached response / error message)
```

**Circuit Breaker Configuration:**

| Parameter | Value | Description |
|-----------|-------|-------------|
| failure_threshold | 5 | Failures before opening |
| success_threshold | 3 | Successes to close |
| timeout | 30s | Half-open test interval |
| window | 60s | Sliding window for counting |

### 5. Design Version Transition Rules

Define rules for version transitions:

| Transition | From Status | To Status | Requirements |
|------------|-------------|-----------|--------------|
| Promote to canary | draft | canary | Tests pass, config complete |
| Promote to stable | canary | stable | Canary metrics pass thresholds |
| Deprecate | stable | deprecated | Successor model stable |
| Retire | deprecated | retired | No active tenants assigned |

**Deprecation Timeline:**

| Phase | Duration | Actions |
|-------|----------|---------|
| Announcement | 30 days | Notify affected tenants |
| Warning | 14 days | Log warnings, show migration guides |
| Forced migration | 7 days | Auto-migrate remaining tenants |
| Retirement | 0 days | Remove model from registry |

---

## COLLABORATION MENUS (A/P/C):

After completing version management design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into registry design or assignment logic
- **P (Party Mode)**: Bring architect perspectives (Nova for AI runtime, Atlas for platform)
- **C (Continue)**: Accept design and proceed to rollout strategy
- **[Specific component]**: Describe component to refine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: registry schema, assignment logic, A/B testing design
- Process enhanced insights on version management patterns
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review LLM version management design: {summary}"
- Process AI Runtime Architect (Nova) perspective on model versioning
- Process Platform Architect (Atlas) perspective on multi-tenant aspects
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document version management design
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design.md`

---

## SUCCESS METRICS:

- [ ] Model version registry schema designed
- [ ] Per-tenant assignment logic defined
- [ ] A/B testing configuration structured
- [ ] Fallback configuration complete
- [ ] Version transition rules documented

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Registry too complex | Simplify to essential fields only |
| A/B testing scope creep | Limit to model comparison, not feature flags |
| Fallback chain too deep | Maximum 3 levels recommended |
| Assignment logic unclear | Create decision flowchart |

---

## Verification

- [ ] Registry schema supports all identified models
- [ ] Assignment covers all tenant tiers
- [ ] A/B testing supports required metrics
- [ ] Fallback handles all failure scenarios
- [ ] Patterns align with pattern registry

---

## Outputs

- Model version registry schema
- Per-tenant assignment logic
- A/B testing configuration structure
- Fallback configuration design
- Version transition rules

---

## NEXT STEP:

Proceed to `step-03-c-design.md` to design the rollout strategy with canary deployment, feature flags, and rollback triggers.
