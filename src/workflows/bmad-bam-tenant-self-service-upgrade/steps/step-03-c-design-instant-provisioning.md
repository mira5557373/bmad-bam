# Step 3: Design Instant Provisioning

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Design instant provisioning for self-service upgrades, ensuring immediate feature enablement, resource allocation, and seamless tier transition without downtime.

---

## Prerequisites

- Step 2 completed: Payment integration design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability
- **Load template:** `{project-root}/_bmad/bam/data/templates/runbook-template.md`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Design Provisioning Pipeline

Define the instant provisioning sequence:

| Step | Action | Timing | Rollback |
|------|--------|--------|----------|
| 1 | Update tier in database | <100ms | Revert tier |
| 2 | Enable feature flags | <500ms | Disable flags |
| 3 | Update entitlements | <500ms | Revert entitlements |
| 4 | Allocate additional resources | <30s | Release resources |
| 5 | Update API quotas | <500ms | Revert quotas |
| 6 | Sync billing system | Async (<5s) | Manual reconciliation |
| 7 | Invalidate cached permissions | <1s | N/A |
| 8 | Send confirmation | Async | N/A |

### 2. Define Feature Enablement Strategy

Specify how features are enabled:

| Feature Type | Enablement Method | Timing | Visibility |
|--------------|-------------------|--------|------------|
| Core Features | Feature flag toggle | Instant | Immediate |
| Quota Increases | Entitlement update | Instant | On next usage check |
| Premium Integrations | Config update | <5s | After page refresh |
| Advanced AI | Model access grant | <10s | On next AI request |
| Priority Support | Support tier update | Async | Reflected in tickets |

### 3. Design Resource Allocation

Plan resource scaling for upgrades:

| Resource | FREE | PRO | ENTERPRISE | Allocation Time |
|----------|------|-----|------------|-----------------|
| Compute | Shared | Dedicated pod | Dedicated cluster | <30s / <5min |
| Storage | 1GB | 50GB | 500GB | Instant quota update |
| Database connections | 10 | 100 | 1000 | Instant |
| AI model access | Basic | Advanced | Custom | <10s |
| Support SLA | Community | 24h | 4h | Instant |

### 4. Design Rollback Procedure

Define rollback for failed provisioning:

| Failure Point | Detection | Rollback Action | User Impact |
|---------------|-----------|-----------------|-------------|
| Feature flag fail | Flag service error | Revert tier, refund | Full rollback, notify |
| Resource allocation fail | K8s/Cloud error | Retry 3x, then rollback | Delayed features |
| Entitlement fail | Entitlement API error | Revert, refund | Full rollback, notify |
| Partial success | Health check | Complete pending, or rollback | Depends on scope |

### 5. Define Monitoring and Verification

Specify post-upgrade verification:

| Check | Method | Success Criteria | SLA |
|-------|--------|------------------|-----|
| Tier updated | Database query | tier = new_tier | <1s |
| Features accessible | Feature flag API | flags enabled | <2s |
| Quotas applied | Quota service | limits increased | <2s |
| User notified | Notification log | email sent | <30s |
| Dashboard updated | Cache invalidation | new tier shown | <5s |

### 6. Design Operational Runbook

Document operational procedures:

| Scenario | Detection | Action | Owner |
|----------|-----------|--------|-------|
| Provisioning stuck | >30s in progress | Manual intervention | Ops |
| Partial upgrade | Health check failure | Complete or rollback | Ops |
| Feature not visible | User report | Cache clear, verify flags | Support |
| Billing mismatch | Audit job | Reconciliation | Finance |
| Mass upgrade event | Spike detection | Auto-scale provisioning | SRE |

**Verify current best practices with web search:**
Search the web: "instant feature provisioning SaaS patterns {date}"
Search the web: "zero-downtime tier upgrade implementation {date}"

_Source: [URL]_

---

## Quality Gates

- [ ] Provisioning pipeline <30s total
- [ ] Rollback procedure comprehensive
- [ ] Monitoring covers all steps
- [ ] Operational runbook complete
- [ ] Feature enablement documented
- [ ] Resource allocation tested

---

## COLLABORATION MENUS (A/P/C):

After completing the provisioning design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into provisioning pipeline or rollback
- **P (Party Mode)**: Bring SRE and platform perspectives on provisioning design
- **C (Continue)**: Accept provisioning design and complete Create mode
- **[Specific refinements]**: Describe provisioning concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: provisioning pipeline, feature enablement, rollback
- Process enhanced insights on provisioning reliability
- Ask user: "Accept these refined provisioning specs? (y/n)"
- If yes, integrate into provisioning design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review instant provisioning for self-service upgrade"
- Process SRE and platform perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save complete self-service upgrade design
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Complete Create mode workflow

---

## Verification

- [ ] Provisioning pipeline defined with timings
- [ ] Feature enablement strategy documented
- [ ] Resource allocation specified
- [ ] Rollback procedure comprehensive
- [ ] Monitoring and verification defined
- [ ] Operational runbook complete
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete self-service upgrade design
- Payment integration specification
- Instant provisioning documentation
- Operational runbook
- **Output to:** `{output_folder}/planning-artifacts/operations/self-service-upgrade-design.md`
- **Output to:** `{output_folder}/planning-artifacts/operations/upgrade-payment-integration.md`

---

## Next Step

**Workflow Complete.**

The Create mode workflow is finished. To modify the output, use Edit mode (`step-10-e-*`). To verify the output meets quality criteria, use Validate mode (`step-20-v-*`).

---

## Workflow Complete (Create Mode)

Create mode complete for tenant-self-service-upgrade workflow. The following artifacts have been produced:

1. Upgrade flow UX design
2. Payment integration specifications
3. Instant provisioning pipeline
4. Operational runbook with rollback procedures
