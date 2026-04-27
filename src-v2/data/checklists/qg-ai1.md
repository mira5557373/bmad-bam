---
name: qg-ai1-runtime-config
description: AI runtime configuration gate - model registry, version management, fallback configuration
category: quality-gate
tags: [ai, quality-gate, multi-tenant, runtime, llm]
version: 2.0.0
---

# QG-AI1: AI Runtime Configuration Gate

> **Gate ID:** QG-AI1 (AI Runtime Configuration)
> **Phase:** 3-solutioning
> **Workflow:** bmad-bam-agent-runtime-architecture
> **Prerequisites:** QG-M1 (Module Architecture)

AI runtime configuration MUST be validated before agent development begins. This gate verifies model registry, version management, fallback configuration, and tenant-aware AI settings.

---

## Purpose

QG-AI1 validates that the AI runtime infrastructure meets multi-tenant requirements:

1. **Model inventory** is complete with all models documented
2. **Version registry** tracks model versions with deprecation policies
3. **Tenant assignment** logic routes tenants to appropriate models
4. **Fallback configuration** ensures resilience during outages
5. **Tenant-aware settings** enforce per-tenant customizations

---

## Model Inventory

### Model Registry

- [ ] **CRITICAL:** All production models registered in model catalog
- [ ] **CRITICAL:** Model capabilities documented (context window, modalities, costs)
- [ ] **CRITICAL:** Model access credentials stored securely (secrets manager)
- [ ] Model provider contracts documented (rate limits, SLAs)
- [ ] Model categories defined (chat, embedding, vision, code)
- [ ] Model latency benchmarks established
- [ ] Model cost per token documented

### Model Metadata

- [ ] **CRITICAL:** Each model has unique model_id
- [ ] Provider name and API version documented
- [ ] Maximum context window specified
- [ ] Input/output token limits documented
- [ ] Supported modalities listed (text, image, audio)
- [ ] Fine-tuning availability noted

### Multi-Tenant Model Access

- [ ] **CRITICAL:** Model access scoped to tenant tier
- [ ] **CRITICAL:** Enterprise tenants can access premium models
- [ ] Free tier model restrictions enforced
- [ ] Custom model endpoints per tenant supported (Enterprise)
- [ ] Model access audit logging enabled

---

## Version Registry

### Version Tracking

- [ ] **CRITICAL:** Model version registry implemented
- [ ] **CRITICAL:** Active versions tracked per environment (dev/staging/prod)
- [ ] Version changelog maintained for each model
- [ ] Breaking change notifications configured
- [ ] Version compatibility matrix documented

### Deprecation Management

- [ ] **CRITICAL:** Deprecation policy defined (90-day minimum notice)
- [ ] Deprecated versions flagged in registry
- [ ] Migration paths documented for deprecated models
- [ ] Tenant notification for upcoming deprecations automated
- [ ] Sunset date enforcement prevents use after expiry

### Version Pinning

- [ ] **CRITICAL:** Production workloads use pinned versions
- [ ] Version pinning configurable per tenant tier
- [ ] Enterprise tenants can override default versions
- [ ] Version rollback procedure documented
- [ ] Version testing in staging before promotion

---

## Tenant Assignment Logic

### Model Selection Rules

- [ ] **CRITICAL:** Default model assigned per tenant tier
- [ ] **CRITICAL:** Model selection rules engine operational
- [ ] Tier-based model routing enforced
- [ ] Cost-based routing available (route to cheaper model within limits)
- [ ] Latency-based routing supported (route to fastest available)

### Use Case Routing

- [ ] **CRITICAL:** Task-to-model mapping defined
- [ ] Chat tasks routed to chat models
- [ ] Embedding tasks routed to embedding models
- [ ] Code generation routed to code-optimized models
- [ ] RAG retrieval uses appropriate embedding model

### Dynamic Assignment

- [ ] Model availability checked before assignment
- [ ] Load balancing across equivalent models
- [ ] Regional routing for data residency compliance
- [ ] Peak load spillover to secondary models

---

## Fallback Configuration

### Primary Fallback Chain

- [ ] **CRITICAL:** Fallback model chain defined for each primary model
- [ ] **CRITICAL:** Fallback triggers on specific error codes
- [ ] **CRITICAL:** Fallback preserves tenant context
- [ ] Fallback attempts logged with reason codes
- [ ] Maximum fallback depth configured (recommend: 2)

### Provider Failover

- [ ] **CRITICAL:** Multi-provider strategy documented
- [ ] Failover from primary provider to secondary operational
- [ ] Provider health monitoring active
- [ ] Automatic provider switching on outage detection
- [ ] Provider SLA tracking for failover decisions

### Graceful Degradation

- [ ] **CRITICAL:** Degraded mode behavior documented
- [ ] Simpler model used when premium unavailable
- [ ] User notified of degraded service
- [ ] Degradation metrics tracked
- [ ] Auto-recovery when primary available

---

## Tenant-Aware AI Settings

### Per-Tenant Configuration

- [ ] **CRITICAL:** Temperature settings configurable per tenant
- [ ] **CRITICAL:** Max tokens configurable per tenant tier
- [ ] System prompt customization per tenant (Enterprise)
- [ ] Response format preferences stored
- [ ] Language/locale preferences honored

### Rate Limits

- [ ] **CRITICAL:** Requests per minute limit per tenant
- [ ] **CRITICAL:** Tokens per day limit per tenant tier
- [ ] Burst limit configuration available
- [ ] Rate limit headers returned in responses
- [ ] Rate limit exceeded notifications sent

### Cost Controls

- [ ] **CRITICAL:** Monthly cost cap per tenant
- [ ] **CRITICAL:** Cost cap enforcement blocks requests at limit
- [ ] Cost cap warnings at 50%, 80%, 95%
- [ ] Cost cap adjustable by tenant admin (Enterprise)
- [ ] Overage handling policy documented

### Prompt Configuration

- [ ] System prompts stored per tenant
- [ ] Prompt templates versioned
- [ ] Prompt injection safeguards applied to tenant prompts
- [ ] Prompt length limits enforced
- [ ] Prompt audit logging enabled

---

## Configuration Validation

### Schema Validation

- [ ] **CRITICAL:** Model configuration schema validated
- [ ] Required fields enforced (model_id, provider, version)
- [ ] Type validation for all configuration values
- [ ] Default values documented and applied

### Integration Testing

- [ ] **CRITICAL:** Model connectivity verified for all registered models
- [ ] Authentication validated for all providers
- [ ] Fallback chains tested end-to-end
- [ ] Tenant assignment rules tested with sample tenants
- [ ] Rate limit enforcement verified

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Model Registry | CRITICAL | Minor metadata gaps | No model catalog |
| Model Metadata | CRITICAL | Capabilities incomplete | Missing model_id |
| Multi-Tenant Access | CRITICAL | Access logging partial | No tier scoping |
| Version Tracking | CRITICAL | Changelog incomplete | No version registry |
| Deprecation Management | CRITICAL | Migration paths incomplete | No deprecation policy |
| Version Pinning | CRITICAL | Testing gaps | Production unpinned |
| Model Selection Rules | CRITICAL | Cost routing missing | No selection logic |
| Use Case Routing | CRITICAL | Task mapping incomplete | No task routing |
| Fallback Chain | CRITICAL | Logging incomplete | No fallback defined |
| Provider Failover | CRITICAL | Health monitoring partial | No multi-provider |
| Graceful Degradation | CRITICAL | Notification missing | No degraded mode |
| Per-Tenant Config | CRITICAL | Format preferences missing | No tenant settings |
| Rate Limits | CRITICAL | Headers missing | No rate limiting |
| Cost Controls | CRITICAL | Warnings incomplete | No cost cap |
| Prompt Configuration | Non-critical | Audit logging partial | N/A |
| Dynamic Assignment | Non-critical | Regional routing missing | N/A |

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items checked, >=80% standard items complete |
| **CONDITIONAL** | All CRITICAL items checked, <80% standard items + documented mitigation plan |
| **FAIL** | Any CRITICAL item unchecked - block agent development, enter recovery protocol |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

---

## Waiver Process

For non-critical items that cannot be addressed:

1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

---

## Recovery Protocol

**If gate triggers CONDITIONAL or FAIL status:**

### Attempt 1: Address Configuration Gaps (target: 1-2 days)

- Review failed checks and identify root cause
- Complete model registry with missing metadata
- Verify all provider credentials in secrets manager
- Test fallback chains in staging environment
- Configure missing rate limits and cost caps
- Re-run QG-AI1 validation
- **Lock passed categories**

### Attempt 2: Deeper Investigation (target: 3-5 days)

- Engage AI Runtime Architect (Nova persona)
- Review model selection logic against requirements
- Audit tenant assignment rules for edge cases
- Test provider failover scenarios
- Verify deprecation notifications work correctly
- Re-run validation after remediation
- **Preserve locked categories**

### Attempt 3: Mandatory Course Correction

- Escalate to AI Platform Lead and Engineering Leadership
- Document configuration blockers in ADR
- Reassess model provider strategy if gaps are systemic
- Consider phased rollout with reduced model options
- Create remediation plan with stakeholder sign-off
- Schedule follow-up validation within 1 week

### Category-Specific Recovery

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Model Registry | Complete catalog with all production models | No model catalog exists |
| Version Registry | Implement version tracking, pin production | No version control |
| Tenant Assignment | Define selection rules per tier | No tenant routing |
| Fallback Chain | Configure primary/secondary/tertiary fallback | No resilience |
| Rate Limits | Configure per-tenant limits | No rate limiting |
| Cost Controls | Implement cost caps with enforcement | No budget control |

---

## Automated Validation Script

```bash
# Run as part of QG-AI1 gate
./scripts/validate-ai-runtime-config.sh

# Validates:
# - Model registry completeness
# - Version registry integrity
# - Tenant assignment rules
# - Fallback chain configuration
# - Rate limit enforcement
# - Cost cap configuration
```

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Runtime configuration
- `bmad-bam-ai-agent-debug` - Runtime debugging
- `bmad-bam-tenant-model-isolation` - Tenant isolation design
- `bmad-bam-create-module-architecture` - Module design

## Related Templates

- `agent-runtime-template.md` - AI runtime architecture
- `model-registry-template.md` - Model catalog documentation
- `fallback-config-template.md` - Fallback chain configuration

## Related Patterns

- `ai-runtime.md` - AI runtime selection guidance
- `llm-versioning.md` - Model version management
- `tenant-model-routing.md` - Tenant-aware model selection

---

## Web Research Verification

- [ ] Search the web: "LLM model registry best practices {date}" - Verify catalog patterns
- [ ] Search the web: "AI model versioning enterprise {date}" - Confirm version management
- [ ] Search the web: "multi-tenant AI rate limiting patterns {date}" - Verify rate limit approaches
- [ ] Search the web: "LLM fallback configuration resilience {date}" - Confirm failover patterns
- [ ] _Source: [URL]_ citations documented for key configuration decisions

---

**PASS CRITERIA:** All CRITICAL checkboxes completed, model registry complete, fallback chains tested
**OWNER:** AI Runtime Architect (Nova persona)
**REVIEWERS:** Platform Architect (Atlas persona), Security Lead

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM | New V2 gate for AI runtime configuration; multi-tenant model management |
