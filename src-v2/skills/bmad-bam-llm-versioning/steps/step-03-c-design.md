# Step 03: Design Rollout Strategy

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Design canary deployment, feature flag integration, performance metrics, and rollback triggers
- 💾 Track: `stepsCompleted: [1, 2, 3]` when complete
- 📖 Context: Version management design from Step 02
- 🚫 Do NOT: Design monitoring (that's Step 04)
- 🔍 Use web search: Verify rollout patterns against current best practices
- ⚠️ Gate: QG-AI1 - AI/Agent runtime configuration

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Canary deployment by tenant tier
- Feature flag integration for model selection
- Performance comparison metrics
- Rollback triggers and automation

**OUT OF SCOPE:**
- Version monitoring design (Step 04)
- Final compilation (Step 05)
- Operational runbooks

---

## Purpose

Design the LLM rollout strategy including tier-aware canary deployments, feature flag integration for controlled rollouts, performance comparison metrics, and automated rollback triggers. This ensures safe, controlled LLM version transitions.

---

## Prerequisites

- Step 02 completed: Version management design available
- Version registry schema defined
- A/B testing configuration established
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: deployment
- **Load guide:** `{project-root}/_bmad/bam/data/domains/deployment.md`

---

## Inputs

- Version management design from Step 02
- Tenant tier definitions
- Fallback configuration from Step 02
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Design rollout strategy for safe LLM version deployments.

---

## Main Sequence

### 1. Design Canary Deployment by Tier

Create tier-aware canary deployment strategy:

**Canary Rollout Phases:**

| Phase | Name | Duration | Traffic % | Eligible Tiers | Success Criteria |
|-------|------|----------|-----------|----------------|------------------|
| 1 | Internal | 24h | 0% external | Internal only | No critical errors |
| 2 | Canary | 48h | 5% | Enterprise | Error rate < 0.1% |
| 3 | Early Adopter | 72h | 20% | Pro + Enterprise | Latency within 10% |
| 4 | Gradual | 1 week | 50% | All tiers | Quality parity |
| 5 | Full | 1 week | 100% | All tiers | All metrics pass |

**Tier-Specific Rollout Order:**

| Order | Tier | Rationale | Risk Level |
|-------|------|-----------|------------|
| 1 | Internal | Catch obvious issues | Lowest |
| 2 | Enterprise | Dedicated support, direct feedback | Low |
| 3 | Pro | Paid users, moderate support | Medium |
| 4 | Free | Largest volume, least risk tolerance | Higher |

**Enterprise Protection:**

| Protection | Description |
|------------|-------------|
| Opt-out period | 14 days to delay rollout |
| Dedicated canary | Separate canary group for enterprise |
| Direct escalation | Immediate escalation path for issues |
| Rollback priority | First to rollback on issues |

### 2. Design Feature Flag Integration

Create feature flag structure for model selection:

**Feature Flag Schema:**

| Flag Name | Type | Description | Default |
|-----------|------|-------------|---------|
| `llm.model.{{model_id}}.enabled` | Boolean | Enable/disable model | true |
| `llm.model.{{model_id}}.rollout_percent` | Integer | Rollout percentage (0-100) | 0 |
| `llm.model.{{model_id}}.tier_override` | JSON | Tier-specific overrides | {} |
| `llm.model.{{model_id}}.tenant_allow` | Array | Specific tenant allowlist | [] |
| `llm.model.{{model_id}}.tenant_block` | Array | Specific tenant blocklist | [] |

**Flag Evaluation Order:**

```
1. Check tenant blocklist → Block if present
2. Check tenant allowlist → Allow if present
3. Check tier override → Use tier-specific rollout %
4. Check global rollout_percent → Apply percentage
5. Fall through → Use current stable model
```

**Feature Flag Service Integration:**

| Service | Integration Pattern | Caching |
|---------|---------------------|---------|
| LaunchDarkly | SDK with streaming | Real-time |
| Split.io | SDK with events | Near real-time |
| Flagsmith | REST API | 5-min cache |
| Custom | Database polling | Configurable |

### 3. Design Performance Comparison Metrics

Define metrics for comparing model versions:

**Primary Comparison Metrics:**

| Metric | Description | Threshold | Measurement |
|--------|-------------|-----------|-------------|
| Latency P50 | Median response time | ≤ baseline + 10% | Per-request |
| Latency P99 | Tail latency | ≤ baseline + 20% | Per-request |
| Error rate | Failed completions | ≤ 0.1% | Per-model |
| Quality score | Output quality metric | ≥ baseline - 5% | Sampled |
| Cost per request | Average token cost | ≤ baseline + 15% | Per-request |

**Secondary Comparison Metrics:**

| Metric | Description | Measurement |
|--------|-------------|-------------|
| Token utilization | Input/output token ratio | Per-request |
| Context efficiency | How well context is used | Sampled eval |
| Hallucination rate | Factual accuracy | Sampled eval |
| Safety score | Content safety | Per-request |

**Statistical Comparison Methods:**

| Method | Use Case | Sample Size |
|--------|----------|-------------|
| Chi-squared | Error rate comparison | 1000+ requests |
| T-test | Latency comparison | 1000+ requests |
| Mann-Whitney | Quality scores | 500+ evaluations |
| Bayesian | Early stopping | 100+ requests |

**Comparison Dashboard Structure:**

| Panel | Metrics | Visualization |
|-------|---------|---------------|
| Latency | P50, P95, P99 | Time series + histogram |
| Errors | Rate, types | Bar chart + breakdown |
| Quality | Score distribution | Box plot |
| Cost | Per-request, cumulative | Line chart |

### 4. Design Rollback Triggers

Define automated rollback triggers:

**Automatic Rollback Conditions:**

| Trigger | Threshold | Window | Action |
|---------|-----------|--------|--------|
| Error spike | > 1% error rate | 5 min | Immediate rollback |
| Latency degradation | P99 > 2x baseline | 10 min | Gradual rollback |
| Quality drop | Score < 80% baseline | 15 min | Pause + alert |
| Cost spike | > 2x cost projection | 30 min | Pause + alert |
| Safety violation | Any safety flag | Immediate | Emergency stop |

**Rollback Automation Flow:**

```
Metric Breach Detected
    ↓
Verify (not a fluke - 3 consecutive breaches)
    ↓
Alert On-Call + Stakeholders
    ↓
Initiate Rollback
    ↓
Verify Rollback Success
    ↓
Post-Incident Analysis Trigger
```

**Rollback Types:**

| Type | Speed | Use Case | Data Preservation |
|------|-------|----------|-------------------|
| Immediate | Seconds | Safety / security | Preserve all requests |
| Gradual | Minutes | Performance issues | Normal logging |
| Scheduled | Hours | Non-critical issues | Standard |

**Rollback Scope:**

| Scope | Description | When to Use |
|-------|-------------|-------------|
| Tenant-specific | Single tenant rollback | Tenant-specific issue |
| Tier-specific | Roll back entire tier | Tier-affecting issue |
| Full | All tenants | Global issue |

### 5. Design Rollout Communication

Create communication plan for rollouts:

| Event | Audience | Channel | Timing |
|-------|----------|---------|--------|
| Planned rollout | All affected tenants | Email + In-app | 7 days before |
| Rollout start | Enterprise tenants | Email + Slack | At start |
| Rollout complete | All tenants | In-app notification | At completion |
| Rollback initiated | Affected tenants | Email + Status page | Immediately |
| Post-incident | All tenants | Email + Blog | Within 24h |

---

## COLLABORATION MENUS (A/P/C):

After completing rollout strategy design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into canary phases or rollback automation
- **P (Party Mode)**: Bring architect perspectives (Nova for AI, Atlas for platform)
- **C (Continue)**: Accept design and proceed to monitoring design
- **[Specific component]**: Describe component to refine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: canary design, feature flags, rollback triggers
- Process enhanced insights on deployment patterns
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review LLM rollout strategy design: {summary}"
- Process AI Runtime Architect (Nova) perspective on model deployment
- Process Platform Architect (Atlas) perspective on multi-tenant rollout
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document rollout strategy design
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-document.md`

---

## SUCCESS METRICS:

- [ ] Canary deployment phases defined with tier awareness
- [ ] Feature flag integration designed
- [ ] Performance comparison metrics established
- [ ] Rollback triggers and automation documented
- [ ] Communication plan created

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Canary phases too aggressive | Extend durations, reduce traffic % |
| Feature flag complexity | Simplify to essential flags only |
| Metrics not measurable | Choose metrics with existing instrumentation |
| Rollback too slow | Pre-stage rollback configurations |

---

## Verification

- [ ] Canary phases protect enterprise tenants
- [ ] Feature flags enable granular control
- [ ] Metrics enable statistical comparison
- [ ] Rollback triggers are actionable
- [ ] Patterns align with pattern registry

---

## Outputs

- Canary deployment phase design
- Feature flag schema and integration
- Performance comparison metrics definition
- Rollback trigger configuration
- Communication plan

---

## NEXT STEP:

Proceed to `step-04-c-document.md` to design version monitoring with quality metrics, cost comparison, and feedback collection.
