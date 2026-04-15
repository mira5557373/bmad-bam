# Step 7: Rollback Strategy Design

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

Design rollback mechanisms that enable instant, gradual, or automatic reversion to previous model versions when quality issues, safety concerns, or operational problems arise.

---

## Prerequisites

- Versioning strategy complete (Step 6)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: ai-runtime

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Design Instant Rollback

Implement immediate version switching:

| Component | Action | Duration |
|-----------|--------|----------|
| LLM Gateway | Update routing rules | < 1 second |
| Feature flags | Disable new version | < 1 second |
| Load balancer | Drain connections | < 30 seconds |
| Inference cache | Invalidate | Immediate |

Instant rollback trigger:
```
POST /api/models/{model_id}/rollback
{
  "target_version": "1.0.0",
  "reason": "quality degradation",
  "initiated_by": "user_id"
}
```

### 2. Configure Gradual Rollback

Design traffic shifting rollback:

| Phase | Traffic to Previous | Duration | Monitoring |
|-------|---------------------|----------|------------|
| Phase 1 | 10% | 5 minutes | Compare metrics |
| Phase 2 | 50% | 15 minutes | Verify improvement |
| Phase 3 | 90% | 30 minutes | Confirm stability |
| Complete | 100% | - | Full rollback |

Gradual rollback controls:
- Pause at any phase
- Accelerate if issues detected
- Abort and revert to new version
- Automatic progression with gates

### 3. Implement Automatic Rollback Triggers

Define automatic triggers:

| Trigger | Threshold | Action | Cooldown |
|---------|-----------|--------|----------|
| Error rate | > 5% | Instant rollback | 1 hour |
| Latency p99 | > 2x baseline | Gradual rollback | 30 min |
| Quality score | < 90% baseline | Alert + gradual | 1 hour |
| Safety violation | Any | Instant + alert | Manual reset |
| Cost spike | > 150% baseline | Alert only | 15 min |

Automatic rollback flow:
1. Monitor detects threshold breach
2. Confirm breach persists (2+ checks)
3. Trigger appropriate rollback type
4. Notify operators and tenant
5. Log incident for review

### 4. Design Rollback Audit Trail

Implement comprehensive logging:

| Event | Data Captured | Retention |
|-------|---------------|-----------|
| Rollback initiated | Who, when, reason, target | 2 years |
| Traffic shift | Percentage, timestamp | 1 year |
| Metrics during rollback | All monitored metrics | 90 days |
| Rollback completed | Final state, duration | 2 years |
| Post-rollback analysis | Root cause, resolution | 2 years |

### 5. Define Rollback Runbook

Create operational procedures:

| Scenario | Procedure | Escalation |
|----------|-----------|------------|
| Quality degradation | 1. Verify metrics 2. Initiate gradual 3. Monitor | Tier 2 if no improvement |
| Safety incident | 1. Instant rollback 2. Disable model 3. Investigate | Immediate Tier 3 |
| Performance issue | 1. Assess impact 2. Gradual rollback 3. Analyze | Tier 2 if persistent |
| Tenant request | 1. Verify authorization 2. Execute rollback 3. Confirm | None unless blocked |

Rollback decision tree:
```
Is this a safety incident?
├── Yes → Instant rollback + disable
└── No → Is error rate > 5%?
    ├── Yes → Instant rollback
    └── No → Is quality < baseline?
        ├── Yes → Gradual rollback
        └── No → Monitor and alert
```

**Verify current best practices with web search:**
Search the web: "ML model rollback strategies production {date}"
Search the web: "canary deployment rollback machine learning {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the rollback strategy design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into automatic triggers or gradual rollback strategies
- **P (Party Mode)**: Bring SRE and ML ops perspectives on rollback design
- **C (Continue)**: Accept rollback strategy and proceed to monitoring design
- **[Specific refinements]**: Describe rollback concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: instant rollback, gradual rollback, automatic triggers
- Process enhanced insights on rollback strategies
- Ask user: "Accept these refined rollback decisions? (y/n)"
- If yes, integrate into rollback specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review rollback strategy for fine-tuned models in multi-tenant platform"
- Process SRE and ML ops perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save rollback strategy to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]`
- Proceed to next step: `step-08-c-monitoring-design.md`

---

## Verification

- [ ] Instant rollback mechanism designed
- [ ] Gradual rollback with traffic shifting configured
- [ ] Automatic rollback triggers defined
- [ ] Rollback audit trail implemented
- [ ] Rollback runbook documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Instant rollback specification
- Gradual rollback configuration
- Automatic trigger definitions
- Audit trail schema
- Rollback runbook
- **Load template:** `{project-root}/_bmad/bam/data/templates/rollback-plan-template.md`

---

## Next Step

Proceed to `step-08-c-monitoring-design.md` to define monitoring infrastructure.
