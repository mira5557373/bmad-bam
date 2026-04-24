# Step 21: Validate Configuration (Validate Mode)

## Purpose

Validate agent execution tracing configuration against QG-AI2 criteria.

## Prerequisites

- Step 20 complete (configuration and criteria loaded)

## Actions

### 1. Validate Trace Hierarchy

- [ ] Session spans defined with tenant context
- [ ] Agent spans capture execution lifecycle
- [ ] LLM call spans include token counts
- [ ] Tool spans track execution and status
- [ ] Memory spans include tier context

### 2. Validate Span Attributes

- [ ] All required attributes documented
- [ ] Tenant context (tenant.id, tenant.tier) included
- [ ] Session context propagated
- [ ] Cost attributes (llm.cost_usd) defined

### 3. Validate Platform Integration

- [ ] Tracing platform configured (Langfuse/OTEL/LangSmith)
- [ ] Export settings documented
- [ ] Tenant isolation strategy defined

### 4. Validate Sampling Strategy

- [ ] Per-tier sampling rates defined
- [ ] Adaptive sampling rules documented
- [ ] Privacy-aware capture configured

### 5. Determine Gate Outcome

| Outcome | Criteria |
|---------|----------|
| PASS | All checklist items verified |
| CONDITIONAL | All CRITICAL items pass, non-critical gaps documented |
| FAIL | Any CRITICAL item fails |

## Verification

- [ ] All QG-AI2 tracing items evaluated
- [ ] Gate outcome determined
- [ ] Gaps documented

## Outputs

- Validation results
- Gate outcome determination
- Gap analysis documentation

## Next Step

Proceed to `step-22-v-report.md` with validation results.
