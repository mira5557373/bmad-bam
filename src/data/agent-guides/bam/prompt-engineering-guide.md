# BAM Prompt Engineering Guide

**When to load:** During Phase 3 (Solutioning) when designing AI agent prompts,
or when user mentions prompt design, tenant context, prompt templates, A/B testing, prompt versioning.

**Integrates with:** Architect (AI Runtime), Dev (Implementation), QA (Testing)

---

## Core Concepts

### Tenant Context Injection

Multi-tenant AI systems must safely inject tenant-specific context into prompts without cross-contamination.

| Context Layer | Content | Injection Point |
|---------------|---------|-----------------|
| System | Platform rules, safety guardrails | System prompt (immutable) |
| Tenant | Tenant config, preferences, brand voice | System prompt (tenant section) |
| User | User profile, history, permissions | System prompt (user section) |
| Session | Current task, conversation history | User messages |

### Prompt Architecture for Multi-Tenant

```
┌─────────────────────────────────────────────────┐
│                 System Prompt                    │
│  ┌─────────────────────────────────────────┐    │
│  │ Platform Layer (Immutable)               │    │
│  │ - Safety guardrails                      │    │
│  │ - Response format requirements           │    │
│  │ - Tool usage rules                       │    │
│  └─────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────┐    │
│  │ Tenant Layer (Per-Tenant Config)         │    │
│  │ - Brand voice and tone                   │    │
│  │ - Domain knowledge                       │    │
│  │ - Allowed capabilities                   │    │
│  │ - Tenant ID: {{tenant_id}}               │    │
│  └─────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────┐    │
│  │ User Layer (Per-User Context)            │    │
│  │ - Role and permissions                   │    │
│  │ - Preferences                            │    │
│  │ - Session context                        │    │
│  └─────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

### Prompt Template Management

| Template Type | Scope | Customization Level |
|---------------|-------|---------------------|
| Platform | All tenants | None (locked) |
| Tier-specific | Tenant tier | Limited (tier features) |
| Tenant-custom | Single tenant | Full (enterprise only) |

---

## Application Guidelines

When designing prompts for multi-tenant AI:

1. **Isolate tenant context** - Never mix tenant data in shared prompt sections
2. **Use template variables** - `{{tenant_id}}`, `{{user_role}}`, `{{allowed_tools}}`
3. **Implement prompt guards** - Prevent prompt injection attacks
4. **Version all prompts** - Track changes with semantic versioning
5. **Test across tenants** - Validate behavior isolation between tenants

---

## Prompt Template Structure

### Base Template Schema

```yaml
prompt_template:
  id: "agent-task-v1.0.0"
  version: "1.0.0"
  tier_minimum: "pro"
  
  system:
    platform_section: |
      You are an AI assistant for {{platform_name}}.
      Always identify yourself as helping tenant {{tenant_id}}.
      Never reference other tenants or their data.
      
    tenant_section: |
      Tenant Configuration:
      - Name: {{tenant_name}}
      - Industry: {{tenant_industry}}
      - Brand Voice: {{brand_voice}}
      
    user_section: |
      User Context:
      - Role: {{user_role}}
      - Permissions: {{user_permissions}}
      
  variables:
    - name: tenant_id
      source: context.tenant
      required: true
    - name: brand_voice
      source: tenant.config.brand_voice
      default: "professional"
```

### Variable Injection Safety

| Risk | Mitigation | Implementation |
|------|------------|----------------|
| Prompt injection | Input sanitization | Strip control characters, limit length |
| Data leakage | Context isolation | Tenant ID validation before injection |
| Privilege escalation | Permission validation | Check user role against allowed actions |
| Template tampering | Immutable platform layer | Hash verification of platform prompts |

---

## A/B Testing Framework

### Test Configuration

| Test Parameter | Options | Measurement |
|----------------|---------|-------------|
| System prompt | Variants A, B | Task completion rate |
| Temperature | 0.1, 0.3, 0.7 | Response quality score |
| Few-shot examples | 0, 2, 5 | Accuracy |
| Context length | 2K, 4K, 8K | Relevance score |

### Tenant-Aware A/B Testing

```
┌─────────────────────────────────────────────────┐
│            A/B Test Assignment                   │
│  ┌─────────────────────────────────────────┐    │
│  │ Variant A (50% of tenants)              │    │
│  │ - Prompt v1.0.0                          │    │
│  │ - Temperature: 0.3                       │    │
│  └─────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────┐    │
│  │ Variant B (50% of tenants)              │    │
│  │ - Prompt v1.1.0                          │    │
│  │ - Temperature: 0.5                       │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│  Assignment: hash(tenant_id) % 100 < 50 → A     │
└─────────────────────────────────────────────────┘
```

### Metrics Collection

| Metric | Description | Target |
|--------|-------------|--------|
| Task success rate | Completed tasks / Total attempts | > 85% |
| User satisfaction | Thumbs up / Total responses | > 80% |
| Latency P95 | 95th percentile response time | < 3s |
| Token efficiency | Output tokens / Task completion | Minimize |

---

## Version Management

### Semantic Versioning for Prompts

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| Bug fix | Patch (0.0.X) | Fix typo, clarify instruction |
| Feature add | Minor (0.X.0) | Add new capability, tool |
| Breaking change | Major (X.0.0) | Change response format, remove feature |

### Prompt Deployment Pipeline

| Stage | Actions | Duration |
|-------|---------|----------|
| Development | Author, review, test locally | Days |
| Canary | 5% of free tier tenants | 24-48 hours |
| Staged rollout | 25%, 50%, 100% by tier | 1-2 weeks |
| Production | All tenants, monitoring | Ongoing |

### Rollback Strategy

| Trigger | Action | Recovery Time |
|---------|--------|---------------|
| Error rate > 5% | Auto-rollback to previous | < 5 min |
| User complaints spike | Manual rollback decision | < 1 hour |
| A/B test failure | Terminate test, use control | Immediate |

---

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|----------------|-----------|
| New tenant onboarding | Use tier-default prompts | Consistent baseline experience |
| Enterprise customization | Allow prompt overrides | Meet enterprise requirements |
| Poor task completion | A/B test prompt variants | Data-driven optimization |
| Prompt injection detected | Block request, alert security | Protect system integrity |
| Cross-tenant mention | Sanitize response, log event | Prevent data leakage |

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Prompt integration with agent framework
- `bmad-bam-ai-agent-debug` - Debug prompt-related issues
- `bmad-bam-create-module-architecture` - AI module design

## Related Patterns

Load decision criteria and web search queries from pattern registry:
- **Patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `ai-runtime`

### Web Research

Use the `web_queries` column from pattern registry:
- Search: "prompt engineering multi-tenant AI {date}"
- Search: "LLM prompt versioning best practices {date}"
- Search: "prompt injection prevention patterns {date}"
