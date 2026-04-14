# Saga Guide - BAM Extension

**When to load:** During Phase 3 (Solutioning) when designing cross-module workflows or compensation logic, or when user mentions saga orchestration, workflow patterns, or compensation strategies.
**Integrates with:** Saga Analyst (wds-agent-saga-analyst), persona development, user journey mapping

This guide provides BAM-specific context for saga orchestration specialists working on multi-tenant agentic AI platforms.

## Role Context

As a saga specialist on a BAM project, you focus on:
- Analyzing requirements for saga decomposition
- Documenting workflow patterns across modules
- Designing compensation strategies for failures
- Ensuring saga state respects tenant boundaries

## Core Concepts

### Saga Orchestration Pattern
Sagas coordinate long-running business processes that span multiple modules while maintaining data consistency without distributed transactions. In multi-tenant contexts, saga state must always include tenant_id and all participants must validate tenant context before executing steps.

### Compensation Strategy
Every saga step that modifies state requires a defined compensating action for rollback scenarios. Compensations must be idempotent (safe to retry), must preserve audit trails, and must remain strictly within tenant boundaries even during failure recovery.

### Tenant-Scoped State Management
Saga state storage must be tenant-isolated using the same patterns as application data. This ensures that saga queries, state transitions, and monitoring dashboards never leak information across tenant boundaries.

## Application Guidelines

When designing multi-tenant sagas:
1. Include tenant_id as a required field in all saga state and event payloads
2. Design compensating actions for every step that modifies state
3. Implement timeout handling with tier-appropriate limits
4. Ensure all saga steps are idempotent to handle retry scenarios
5. Test failure paths as thoroughly as happy paths

## Trigger Mapping Methodology

Use this methodology to identify and map triggers for cross-module sagas:

### Trigger Identification Framework

| Trigger Type | Source | Example | Multi-Tenant Consideration |
|-------------|--------|---------|---------------------------|
| **User Action** | UI event | "Create workspace" button | Tenant context from session |
| **API Call** | External system | POST /api/v1/orders | Tenant from auth header |
| **Scheduled** | Cron/timer | Daily report generation | Iterate per-tenant |
| **Event-Driven** | Domain event | "PaymentReceived" | Tenant in event payload |
| **Threshold** | Metric crossing | Usage > 80% | Per-tenant thresholds |
| **Webhook** | External service | Stripe invoice.paid | Map webhook to tenant |

### Saga vs Choreography Decision

| Factor | Favor Saga (Orchestration) | Favor Choreography |
|--------|---------------------------|-------------------|
| **Coordination Complexity** | Many steps, complex ordering | Few steps, simple flow |
| **Visibility Needs** | Central monitoring required | Distributed monitoring OK |
| **Failure Handling** | Complex compensation logic | Simple rollback/retry |
| **Tenant Isolation** | Strict isolation required | Looser coupling acceptable |
| **Team Structure** | Single team owns flow | Multiple independent teams |
| **Testing** | E2E testing priority | Unit/integration sufficient |

## Actionable Guidance

### Analyzing Requirements for Saga Decomposition

1. **Identify Business Process** - Map the end-to-end business capability
2. **List All Steps** - Document every action in the process
3. **Identify Module Boundaries** - Mark where steps cross modules
4. **Determine Consistency Needs** - Identify which steps must be atomic
5. **Map Failure Points** - Document what can fail at each step
6. **Define Compensation Actions** - Specify rollback for each step
7. **Validate with Stakeholders** - Confirm decomposition meets business needs

### Designing Multi-Tenant Saga State

1. **Include Tenant in State** - Saga state always includes tenant_id
2. **Isolate State Storage** - Use tenant-scoped tables for saga state
3. **Validate Context at Start** - Verify tenant context before saga begins
4. **Propagate Through Steps** - Pass tenant context to each participant
5. **Audit State Changes** - Log state transitions with tenant context
6. **Handle Tenant Suspension** - Define behavior if tenant suspended mid-saga
7. **Support Tenant Migration** - Plan for sagas during tenant data migration

### Implementing Compensation Strategies

1. **Design Compensating Actions** - For each step, define its reverse
2. **Ensure Idempotency** - Compensation must be safely retriable
3. **Handle Partial Compensation** - Plan for compensation that fails
4. **Preserve Audit Trail** - Log compensation with full context
5. **Notify on Failure** - Alert appropriate parties when compensation runs
6. **Test Compensation Paths** - Exercise all failure scenarios in tests
7. **Document Manual Recovery** - Prepare runbook for compensation failures

## Key Considerations

### Requirement Analysis
- Identify steps that span module boundaries
- Determine saga vs choreography patterns
- Document rollback requirements

### Workflow Documentation
- Clear step-by-step saga documentation
- Compensation actions for each step
- Tenant context preservation across steps

### Saga Design
- Tenant isolation in saga state
- Timeout handling per tenant tier
- Idempotency for saga steps

## SaaS-Specific Considerations

### Multi-Tenant Saga Patterns

**Tenant Provisioning Saga:**
```
Trigger: "CreateTenant" command
Steps:
1. Create tenant record → Compensation: Delete tenant record
2. Create database schema → Compensation: Drop schema
3. Seed default data → Compensation: (covered by step 2)
4. Create admin user → Compensation: Delete user
5. Send welcome email → Compensation: None (non-critical)
6. Enable billing → Compensation: Disable billing
```

**Tenant Offboarding Saga:**
```
Trigger: "DeleteTenant" command or subscription expiry
Steps:
1. Disable tenant access → Compensation: Re-enable (if cancelled)
2. Export tenant data → Compensation: None (idempotent)
3. Cancel integrations → Compensation: Re-enable
4. Archive audit logs → Compensation: None (compliance)
5. Delete tenant data → Compensation: None (irreversible)
6. Remove tenant record → Compensation: None (final)
```

### Tier-Based Saga Configuration

| Saga Aspect | Free Tier | Pro Tier | Enterprise Tier |
|------------|-----------|----------|-----------------|
| Timeout | 1 minute | 5 minutes | 30 minutes |
| Retry attempts | 2 | 5 | 10 |
| Retry backoff | Fixed | Linear | Exponential |
| Parallel steps | None | Up to 3 | Unlimited |
| Priority queue | Background | Normal | Priority |
| Monitoring | Basic | Detailed | Full trace |

### Cross-Module Saga Coordination

**Module Participation Contract:**
Each module participating in a saga must:
- Accept saga context including tenant_id
- Execute step idempotently
- Report success/failure definitively
- Support compensation request
- Log all state changes

**Saga State Machine:**
```
PENDING → RUNNING → COMPLETED
    ↓         ↓
    └─────────┴──→ COMPENSATING → COMPENSATED
                          ↓
                    COMPENSATION_FAILED
```

### Saga Observability

**Metrics to Track:**
- Saga duration by type
- Completion rate by outcome
- Step failure frequency
- Compensation trigger rate
- Stuck saga count per tenant

**Alerting Thresholds:**
- Saga running > 2x expected duration
- Compensation rate > 5%
- Compensation failure (immediate alert)
- Saga stuck in COMPENSATING > 10 minutes

### Common Saga Patterns in Multi-Tenant SaaS

**Subscription Change Saga:**
- Trigger: User changes subscription tier
- Involves: Billing, Feature Flags, Usage Limits, Notifications
- Tenant consideration: Immediate effect vs billing period

**Data Export Saga:**
- Trigger: User requests data export (GDPR, etc.)
- Involves: All modules with tenant data
- Tenant consideration: Resource limits, scheduling

**Integration Setup Saga:**
- Trigger: User connects external service
- Involves: Auth, Integration module, Notifications
- Tenant consideration: Per-tenant OAuth tokens

### Saga Testing Strategy

**Test Scenarios:**
1. Happy path completion
2. Failure at each step (all failure points)
3. Compensation for each failure
4. Timeout handling
5. Concurrent sagas same tenant
6. Tenant suspension during saga
7. System crash during saga (recovery)

**Multi-Tenant Test Cases:**
- Saga cannot affect other tenant data
- Compensation is tenant-isolated
- Concurrent sagas from different tenants
- Tenant context preserved through all steps

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Process spans 3+ modules | Use saga orchestration | Central coordination simplifies monitoring and debugging |
| Steps are loosely coupled | Consider choreography | Event-driven approach reduces central bottleneck |
| Strict consistency required | Saga with synchronous steps | Ensures all-or-nothing completion |
| Tenant provisioning workflow | Dedicated provisioning saga | Critical path requires robust compensation |
| Compensation keeps failing | Escalate to manual recovery | Automated retry has limits; preserve audit trail |
| High-throughput scenario | Async saga with queuing | Prevents blocking during peak loads |

## Related Workflows

- `bmad-bam-tenant-requirements-analysis` - Analyze tenant requirements for saga decomposition
- `bmad-bam-tenant-onboarding-design` - Design tenant onboarding sagas

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Persona patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `persona-*`
- **Tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS user persona development {date}"
- Search: "multi-tenant persona segmentation {date}"
- Search: "B2B SaaS journey mapping tiers {date}"
