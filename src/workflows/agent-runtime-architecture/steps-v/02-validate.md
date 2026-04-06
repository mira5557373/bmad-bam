# Step 2: Validate Agent Runtime Architecture

## Validation Checklist

### Orchestration Model
- [ ] Orchestration pattern selected and justified with ADR
- [ ] Escalation criteria documented (tool count, prompt conflicts, quality degradation)
- [ ] Kill switch fallback defined for chosen topology
- [ ] Prompt management strategy documented

### Tool Registry
- [ ] Tool catalog structure defined (name, description, module owner, permissions)
- [ ] Permission model defined (role-based, tenant-scoped, approval-required)
- [ ] Sandbox configuration defined for untrusted tools
- [ ] Policy engine rules documented
- [ ] Pre-tool safety checks defined

### Memory Tiers
- [ ] All 5 tiers defined (Session, User, Tenant, Global, Episodic)
- [ ] Each tier has scope, storage, and retention defined
- [ ] Tenant memory isolation rules explicit (no cross-tenant leakage)
- [ ] Memory tier consistent with master architecture

### Approval Workflows
- [ ] Trigger conditions defined (risk level, cost threshold, sensitivity)
- [ ] Queue design documented (per-tenant)
- [ ] Timeout handling defined
- [ ] Escalation rules documented

### Evaluation Foundation
- [ ] Golden task template defined
- [ ] Metric definitions present (accuracy, relevance, latency, cost, safety)
- [ ] Threshold configuration per metric
- [ ] Regression baseline approach documented

### Kill Switch Design
- [ ] Feature flag integration defined
- [ ] Circuit breaker configuration per agent/tool
- [ ] Manual override mechanism documented
- [ ] Rollback procedure defined

### Cross-Cutting
- [ ] All components consistent with master architecture AI runtime section
- [ ] Tenant isolation maintained across all components
- [ ] No single point of failure without fallback

## Gate Decision

- **PASS**: All 6 components defined, quality gates met, tenant isolation verified
- **CONDITIONAL**: Minor gaps (e.g., evaluation thresholds TBD) — document gaps and proceed
- **FAIL**: Missing orchestration pattern, undefined tool permissions, or no kill switch — return to Create mode

Present validation results with specific findings for each component.
