# Tenant Onboarding Patterns

**When to load:** When designing tenant provisioning workflows, implementing self-service signup, or when user mentions tenant creation, welcome flows, or activation.

**Integrates with:** Architect (Atlas persona), Dev agent, PM agent

---

## Core Concepts

### What is Tenant Onboarding?

Tenant onboarding is the process of creating and configuring a new tenant in a multi-tenant SaaS platform. It includes account creation, resource provisioning, initial configuration, and user activation.

### Onboarding Models

| Model | User Experience | Implementation |
|-------|-----------------|----------------|
| Self-service | Instant signup | Automated flow |
| Assisted | Sales-guided | Manual + automated |
| Enterprise | Custom contract | Highly customized |

### Onboarding Flow Architecture

```
Signup Request
    │
    ├── Validate email/domain
    │
    ├── Check existing tenant
    │
    ├── Start onboarding saga
    │   ├── Create tenant record
    │   ├── Provision resources (DB, storage)
    │   ├── Initialize configuration
    │   ├── Create admin user
    │   ├── Set up billing
    │   └── Send welcome email
    │
    ├── Track activation milestones
    │
    └── Trigger engagement sequences
```

---

## Key Patterns

### Pattern 1: Onboarding Saga

| Step | Action | Rollback |
|------|--------|----------|
| 1 | Create tenant record | Delete tenant |
| 2 | Provision database resources | Cleanup resources |
| 3 | Initialize default config | N/A |
| 4 | Create admin user | Delete user |
| 5 | Send welcome email | N/A |
| 6 | Start trial period | N/A |

### Saga Step Details

| Step | Timeout | Retry Strategy | Critical |
|------|---------|----------------|----------|
| Create tenant | 5s | 3 retries | Yes |
| Provision DB | 30s | 2 retries | Yes |
| Initialize config | 10s | 3 retries | No |
| Create admin | 5s | 3 retries | Yes |
| Welcome email | 10s | 5 retries | No |
| Start trial | 5s | 3 retries | No |

### Pattern 2: Provisioning Strategies

| Strategy | When to Use | Trade-off |
|----------|-------------|-----------|
| Eager | High-touch, enterprise | More resources, faster UX |
| Lazy | Self-service, scale | Slower first use, efficient |
| Hybrid | Common case eager, edge lazy | Balanced |

### Resource Pool Pre-provisioning

| Resource | Pre-provision Count | Replenish Trigger |
|----------|---------------------|-------------------|
| Database schemas | 10 warm | <5 available |
| Storage buckets | 5 warm | <2 available |
| API keys | 20 generated | <10 available |
| Subdomain slots | 50 reserved | <20 available |

### Pattern 3: Progressive Onboarding

| Stage | Actions | User Milestone |
|-------|---------|----------------|
| Account | Create tenant + admin | Can login |
| Setup | Basic configuration | Can explore |
| Activation | First meaningful action | Experiencing value |
| Adoption | Regular usage | Retained |

---

## Decision Criteria

### Onboarding Model Selection

| Factor | Self-Service | Assisted | Enterprise |
|--------|--------------|----------|------------|
| Deal size | <$100/mo | $100-1000/mo | >$1000/mo |
| Technical complexity | Low | Medium | High |
| Customization needs | Standard | Some | Extensive |
| Security requirements | Standard | Enhanced | Custom |
| Integration count | 0-2 | 2-5 | 5+ |

### When to Block vs Async Provision

| Resource | Block Signup | Provision Async |
|----------|--------------|-----------------|
| Tenant record | Yes | - |
| Admin user | Yes | - |
| Database schema | Yes (RLS) / No (separate) | Schema-per-tenant |
| Welcome email | No | Yes |
| Analytics setup | No | Yes |
| AI model warming | No | Yes |

---

## Application Guidelines

- Implementing signup flows
- Designing trial experiences
- Building enterprise provisioning
- Creating onboarding analytics
- Optimizing time-to-value

---

## Per-Tier Onboarding

| Tier | Method | Provisioning | Support |
|------|--------|--------------|---------|
| Free | Self-service | Immediate, shared | Docs only |
| Pro | Self-service | Immediate, dedicated | Email |
| Enterprise | Sales-assisted | Scheduled | Dedicated CSM |

---

## Onboarding Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| Signup completion | % completing signup | >90% |
| Activation rate | % reaching first value | >70% |
| Time to first action | Duration to first use | <5 min |
| Setup completion | % finishing setup | >60% |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Monolithic signup | Single failure blocks all | Saga with compensation |
| No warm pool | Slow first experience | Pre-provision resources |
| Missing rollback | Orphaned partial tenants | Compensating transactions |
| Email before ready | User can't login | Sequence carefully |
| No progress indicator | User abandonment | Show onboarding progress |
| Blocking on non-critical | Unnecessary delays | Async for non-blocking |

### Onboarding Testing Checklist

- [ ] Full saga completes successfully
- [ ] Partial failure triggers rollback
- [ ] Duplicate signup handled gracefully
- [ ] Invalid data rejected with clear message
- [ ] Admin can login immediately after completion
- [ ] Metrics tracked for each milestone
- [ ] Load test concurrent signups

---

## Integration with BAM Patterns

| Pattern | Integration Point | Purpose |
|---------|-------------------|---------|
| Saga Orchestration | Onboarding workflow | Reliable provisioning |
| Tenant Isolation | Resource provisioning | Correct isolation setup |
| Event-Driven | Onboarding events | Trigger downstream actions |
| Feature Toggles | Initial feature set | Tier-appropriate features |
| Observability | Milestone tracking | Onboarding analytics |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Tenant patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-lifecycle`
- **Related guides:** `tenant-offboarding-patterns`, `saga-orchestration-patterns`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS tenant onboarding patterns {date}"
- Search: "self-service provisioning multi-tenant {date}"
- Search: "time-to-value optimization SaaS {date}"
- Search: "tenant provisioning saga pattern {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| Which onboarding model for each tier? | Free: self-service; Pro: self-service with optional assist; Enterprise: sales-assisted | Match investment to deal size; reduce friction for lower tiers |
| What to provision synchronously vs asynchronously? | Sync: tenant record, admin user (for login); Async: analytics, AI warming, welcome email | User must be able to login immediately; background tasks don't block first value |
| When to use pre-provisioned resource pools? | Always for database schemas, storage buckets; warm pool size = expected daily signups | Eliminates provisioning latency; improves user experience significantly |
| How to handle partial saga failures? | Compensating transactions for all critical steps; log and continue for non-critical | Prevents orphaned tenant state; non-critical failures shouldn't block onboarding |
| What activation milestones to track? | Account (can login), Setup (configured), Activation (first value), Adoption (regular use) | Progressive milestones identify drop-off points; enable targeted engagement |

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Design provisioning sagas and flows
- `bmad-bam-tenant-model-isolation` - Configure isolation during provisioning
- `bmad-bam-tenant-billing-integration` - Set up billing during onboarding
- `bmad-bam-agent-runtime-architecture` - Initialize AI runtime for tenant
- `bmad-bam-chaos-engineering-design` - Test onboarding saga reliability
