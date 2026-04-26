# V2 Step Content Fill Design Spec

**Version:** 3.0.0  
**Date:** 2026-04-26  
**Status:** Ready for Implementation

## Summary

Fill 300 V2 stub step files (currently 28 lines each) with proper BMAD-method compatible content (target 150-200 lines each), using V1 step content as source material and following official BMAD conventions.

## Problem Statement

V2 step files are stubs created during initial implementation:
- **Current:** 300 files × 28 lines = 8,534 total lines
- **Target:** 300 files × 150-200 lines = 45,000-60,000 total lines
- **Gap:** ~40,000-50,000 lines of content missing

V1 has 179 `bmad-bam-*` workflows + 8 container directories that need consolidation into V2's 30 skills.

### Comprehensive Gap Analysis

| Gap | Current State | Required State | Priority |
|-----|---------------|----------------|----------|
| Step naming | Generic (start, analyze, design) | Descriptive (tenant-model-decisions) | P1 |
| V1→V2 consolidation | 179 workflows unmapped | Full consolidation table | P1 |
| Step content | 28 lines/stub | 150-200 lines/step | P1 |
| CSV references | Spec references 6 CSVs | Only 3 exist in V2 | P1 |
| Quality gates | 8 checklists exist | 43 gates in CSV need checklists | P2 |
| Edit/Validate modes | Generic content | Mode-specific patterns | P2 |
| Soft gate integration | Not utilized | CSV soft_gate_steps column used | P2 |
| TOML menu integration | Not addressed | Z-prefix codes documented | P3 |
| Template utilization | 30 mapped | 40 templates (10 unmapped) | P3 |
| Domain coverage | Partial | All 12 domains mapped | P2 |
| Pattern coverage | Partial | All 10 patterns mapped | P2 |

---

## V1→V2 Workflow Consolidation Map

V1 has **179 bmad-bam-* workflows** that consolidate into **30 V2 skills**. This is the authoritative mapping.

### Consolidation by V2 Skill

#### bmad-bam-master-architecture (QG-F1)
**V1 Sources (9 workflows):**
- `foundation/create-master-architecture` (primary)
- `bmad-bam-stakeholder-discovery`
- `bmad-bam-module-boundary-design`
- `bmad-bam-zero-trust-architecture`
- `bmad-bam-multi-region-architecture`
- `bmad-bam-service-mesh-configuration`
- `bmad-bam-cicd-pipeline-design`
- `bmad-bam-change-management-process`
- `bmad-bam-master-architecture-emergency-change`

#### bmad-bam-tenant-isolation (QG-M2)
**V1 Sources (15 workflows):**
- `bmad-bam-tenant-model-isolation` (primary)
- `bmad-bam-tenant-hierarchy-design`
- `bmad-bam-tenant-network-isolation-design`
- `bmad-bam-tenant-fair-scheduling`
- `bmad-bam-tenant-capacity-planning`
- `bmad-bam-tenant-sandbox-provisioning`
- `bmad-bam-tenant-feature-rollout`
- `bmad-bam-tenant-tier-migration`
- `bmad-bam-tenant-health-monitoring`
- `bmad-bam-tenant-health-scoring`
- `bmad-bam-tenant-sla-monitoring`
- `bmad-bam-tenant-analytics-dashboard`
- `bmad-bam-tenant-cost-attribution`
- `bmad-bam-tenant-audit-log-design`
- `bmad-bam-tenant-api-key-management`

#### bmad-bam-agent-runtime (QG-M3)
**V1 Sources (18 workflows):**
- `bmad-bam-agent-runtime-architecture` (primary)
- `bmad-bam-agent-execution-tracing`
- `bmad-bam-agent-memory-optimization`
- `bmad-bam-agent-handoff-design`
- `bmad-bam-agent-safety`
- `bmad-bam-action-contract-design`
- `bmad-bam-ai-guardrails-implementation`
- `bmad-bam-ai-eval-safety-design`
- `bmad-bam-ai-context-management`
- `bmad-bam-ai-fallback-chains`
- `bmad-bam-ai-streaming-design`
- `bmad-bam-ai-batch-inference`
- `bmad-bam-ai-cost-tracking`
- `bmad-bam-ai-usage-analytics`
- `bmad-bam-ai-ab-testing-design`
- `bmad-bam-ai-feedback-loop`
- `bmad-bam-ai-bias-monitoring`
- `bmad-bam-prg-gate-setup`

#### bmad-bam-module-architecture (QG-M1)
**V1 Sources (5 workflows):**
- `module/create-module-architecture` (primary)
- `bmad-bam-module-boundary-design`
- `bmad-bam-internal-contract-design`
- `bmad-bam-validate-internal-contract`
- `bmad-bam-validate-patterns`

#### bmad-bam-facade-contract (QG-I1)
**V1 Sources (4 workflows):**
- `integration/define-facade-contract` (primary)
- `integration/evolve-facade-contract`
- `bmad-bam-validate-facade-contract`
- `bmad-bam-graphql-design`

#### bmad-bam-convergence
**V1 Sources (3 workflows):**
- `bmad-bam-convergence-verification` (primary)
- `bmad-bam-tenant-safety`
- `bmad-bam-validate-production-readiness`

#### bmad-bam-production-readiness (QG-P1)
**V1 Sources (7 workflows):**
- `bmad-bam-production-readiness` (primary)
- `bmad-bam-post-deployment-verification`
- `bmad-bam-performance-baseline`
- `bmad-bam-chaos-engineering-design`
- `bmad-bam-runbook-creation`
- `bmad-bam-runbook-automation`
- `bmad-bam-maintenance-window-design`

#### bmad-bam-testing
**V1 Sources (3 workflows):**
- TEA integration (primary)
- `bmad-bam-ai-security-testing`
- `bmad-bam-golden-dataset-management`

#### bmad-bam-tenant-onboarding
**V1 Sources (4 workflows):**
- `bmad-bam-tenant-onboarding-design` (primary)
- `bmad-bam-tenant-trial-conversion`
- `bmad-bam-tenant-sso-integration`
- `bmad-bam-tenant-custom-domain-design`

#### bmad-bam-tenant-offboarding
**V1 Sources (5 workflows):**
- `bmad-bam-tenant-offboarding-design` (primary)
- `bmad-bam-tenant-suspension-design`
- `bmad-bam-tenant-reactivation-design`
- `bmad-bam-tenant-data-export`
- `bmad-bam-tenant-data-anonymization`

#### bmad-bam-billing
**V1 Sources (9 workflows):**
- `bmad-bam-usage-metering-design` (primary)
- `bmad-bam-tenant-billing-integration`
- `bmad-bam-pricing-tier-configuration`
- `bmad-bam-invoice-generation`
- `bmad-bam-payment-processing`
- `bmad-bam-credit-management`
- `bmad-bam-billing-disputes`
- `bmad-bam-refund-processing`
- `bmad-bam-revenue-recognition`

#### bmad-bam-white-labeling
**V1 Sources (3 workflows):**
- `bmad-bam-tenant-white-labeling-design` (primary)
- `bmad-bam-tenant-portal-design`
- `bmad-bam-tenant-notification-system`

#### bmad-bam-agent-debug
**V1 Sources (2 workflows):**
- `bmad-bam-ai-agent-debug` (primary)
- `bmad-bam-distributed-tracing-design`

#### bmad-bam-agent-tracing
**V1 Sources (3 workflows):**
- `bmad-bam-agent-execution-tracing` (primary)
- `bmad-bam-ai-observability-setup`
- `bmad-bam-log-aggregation-design`

#### bmad-bam-llm-versioning
**V1 Sources (5 workflows):**
- `bmad-bam-ai-model-registry` (primary)
- `bmad-bam-ai-model-deprecation`
- `bmad-bam-ai-model-security`
- `bmad-bam-model-deployment-pipeline`
- `bmad-bam-model-fine-tuning-design`

#### bmad-bam-memory-tiers
**V1 Sources (3 workflows):**
- `bmad-bam-agent-memory-optimization` (primary)
- `bmad-bam-vector-database-design`
- `bmad-bam-embedding-strategy-design`

#### bmad-bam-tool-contracts
**V1 Sources (2 workflows):**
- `integration/validate-tool-contract` (primary)
- `bmad-bam-action-contract-design`

#### bmad-bam-observability
**V1 Sources (5 workflows):**
- `bmad-bam-tenant-aware-observability` (primary)
- `bmad-bam-sli-slo-definition`
- `bmad-bam-usage-alerts-design`
- `bmad-bam-usage-forecasting`
- `bmad-bam-product-analytics-instrumentation`

#### bmad-bam-security
**V1 Sources (12 workflows):**
- `bmad-bam-security-baseline-config` (primary)
- `bmad-bam-security-review`
- `bmad-bam-security-operations`
- `bmad-bam-security-operations-verification`
- `bmad-bam-security-incident-response`
- `bmad-bam-security-audit-execution`
- `bmad-bam-continuous-security-setup`
- `bmad-bam-threat-modeling`
- `bmad-bam-vulnerability-management`
- `bmad-bam-penetration-testing-design`
- `bmad-bam-ddos-protection-design`
- `bmad-bam-ai-security`

#### bmad-bam-compliance
**V1 Sources (11 workflows):**
- `bmad-bam-compliance-design` (primary)
- `bmad-bam-compliance-verification`
- `bmad-bam-compliance-continuous-verification`
- `bmad-bam-compliance-training-tracking`
- `bmad-bam-audit-readiness-preparation`
- `bmad-bam-soc2-evidence-collection`
- `bmad-bam-hipaa-compliance-design`
- `bmad-bam-pci-dss-compliance`
- `bmad-bam-gdpr-consent-management`
- `bmad-bam-privacy-impact-assessment`
- `bmad-bam-right-to-deletion`

#### bmad-bam-scaling
**V1 Sources (4 workflows):**
- `bmad-bam-auto-scaling-configuration` (primary)
- `bmad-bam-capacity-planning-review`
- `bmad-bam-cost-optimization-strategy`
- `bmad-bam-cost-optimization-review`

#### bmad-bam-events
**V1 Sources (4 workflows):**
- `bmad-bam-event-streaming-design` (primary)
- `bmad-bam-webhook-management-design`
- `bmad-bam-data-synchronization-design`
- `bmad-bam-etl-pipeline-design`

#### bmad-bam-caching
**V1 Sources:** None (NEW - compose from domains/caching.md)

#### bmad-bam-data-residency
**V1 Sources (6 workflows):**
- `bmad-bam-data-protection` (primary)
- `bmad-bam-data-encryption-design`
- `bmad-bam-data-retention-policy-design`
- `bmad-bam-pii-detection-redaction`
- `bmad-bam-tenant-data-migration`
- `bmad-bam-tenant-backup-restore`

#### bmad-bam-api-versioning
**V1 Sources (5 workflows):**
- `bmad-bam-api-version-release` (primary)
- `bmad-bam-api-deprecation-strategy`
- `bmad-bam-api-documentation-automation`
- `bmad-bam-openapi-spec-management`
- `bmad-bam-sdk-generation`

#### bmad-bam-module-epics
**V1 Sources (2 workflows):**
- `module/create-module-epics` (primary)
- `bmad-bam-customer-journey-analytics`

#### bmad-bam-cross-module-story
**V1 Sources (2 workflows):**
- `bmad-bam-cross-module-story` (primary)
- `bmad-bam-cohort-analysis`

#### bmad-bam-requirements
**V1 Sources (2 workflows):**
- `ingestion/requirement-ingestion` (primary)
- `bmad-bam-extend-project-context`

#### bmad-bam-triage
**V1 Sources (2 workflows):**
- `ingestion/triage-module-complexity` (primary)
- `bmad-bam-churn-prediction`

#### bmad-bam-research
**V1 Sources:** None (NEW - compose from all domains)

### Remaining V1 Workflows (Operations/Triggers)

These V1 workflows map to operational triggers, not design skills:
- `bmad-bam-dev-trigger` → Dev commit gate
- `bmad-bam-monthly-operations-trigger` → Monthly ops
- `bmad-bam-quarterly-operations-trigger` → Quarterly ops
- `bmad-bam-incident-response-operations` → Incident handling
- `bmad-bam-postmortem-process` → Post-incident
- `bmad-bam-on-call-rotation` → Operations
- `bmad-bam-disaster-recovery-drill` → DR testing
- `bmad-bam-cross-region-failover-execution` → Failover
- `bmad-bam-data-reconciliation-dr` → DR data
- `bmad-bam-database-migration-pipeline` → Migrations
- `bmad-bam-performance-review-execution` → Performance
- `bmad-bam-tenant-communication-design` → Comms
- `bmad-bam-tenant-contract-renewal` → Contracts
- `bmad-bam-tenant-merge-acquisition` → M&A
- `bmad-bam-tenant-incident-response` → Tenant incidents
- `bmad-bam-tenant-self-service-reporting` → Self-service
- `bmad-bam-tenant-self-service-upgrade` → Self-service
- `bmad-bam-secrets-management` → Ops security
- `bmad-bam-rbac-abac-design` → Access control
- `bmad-bam-oauth-provider-design` → Auth
- `bmad-bam-sla-contract-design` → Contracts
- `bmad-bam-api-gateway-design` → Infrastructure
- `bmad-bam-api-throttling-design` → Rate limiting
- `bmad-bam-rate-limiting-design` → Rate limiting
- `bmad-bam-marketplace-design` → Business
- `bmad-bam-partner-integration-framework` → Partners
- `bmad-bam-partner-certification-workflow` → Partners
- `bmad-bam-rag-pipeline-design` → AI infrastructure
- `bmad-bam-rag-observability-design` → AI ops
- `bmad-bam-llm-evaluation-pipeline` → AI ops
- `bmad-bam-llm-gateway-configuration` → AI infrastructure
- `bmad-bam-prompt-catalog-design` → AI ops
- `bmad-bam-prompt-versioning-management` → AI ops
- `bmad-bam-model-validation` → AI ops
- `bmad-bam-migrate-v2` → Migration utility

---

## V2 Resource Inventory (Actual State)

### CSV Files (3 files)
| File | Purpose | Columns |
|------|---------|---------|
| `tenant-models.csv` | Tenant isolation patterns | model, use_case, pros, cons |
| `ai-runtimes.csv` | AI framework selection | runtime, use_case, strengths |
| `quality-gates.csv` | 43 quality gates | gate_id, checklist_file, soft_gate_steps, web_queries |

**Note:** Spec v2.0 referenced 6 CSVs but only 3 exist. Update all step file references accordingly.

### Domain Files (12 files)
| Domain | Primary Skills | Key Concepts |
|--------|---------------|--------------|
| ai-runtime.md | agent-runtime, llm-versioning, memory-tiers | Orchestration, state, memory |
| billing.md | billing | Metering, invoicing, revenue |
| caching.md | caching | Cache tiers, invalidation |
| compliance.md | compliance | GDPR, SOC2, HIPAA |
| events.md | events | Event sourcing, CQRS |
| integration.md | facade-contract, convergence | Contracts, compatibility |
| observability.md | observability, agent-tracing | Metrics, traces, logs |
| onboarding.md | tenant-onboarding, tenant-offboarding | Provisioning, cleanup |
| security.md | security | Defense-in-depth, secrets |
| storage.md | data-residency | Encryption, retention |
| tenant.md | tenant-isolation, master-architecture | RLS, context, isolation |
| testing.md | testing, convergence | Test pyramid, isolation |

### Pattern Files (10 files)
| Pattern | Primary Skills | Decision Criteria |
|---------|---------------|-------------------|
| autogen.md | agent-runtime | Multi-agent conversations |
| circuit-breaker.md | convergence, facade-contract | Fault tolerance |
| cqrs.md | events, module-architecture | Read/write separation |
| crewai.md | agent-runtime | Role-based crews |
| database-per-tenant.md | tenant-isolation | Max isolation |
| facade.md | facade-contract, module-architecture | Public contracts |
| langgraph.md | agent-runtime | State machines |
| rls.md | tenant-isolation | Row-level security |
| saga.md | events | Distributed transactions |
| schema-per-tenant.md | tenant-isolation | Schema isolation |

### Template Files (40 files)
| Template | Skills Using It | Output Type |
|----------|----------------|-------------|
| agent-debug-report.md | agent-debug | Report |
| agent-runtime.md | agent-runtime | Design doc |
| agent-trace.md | agent-tracing | Trace doc |
| api-version.md | api-versioning | Version plan |
| billing-design.md | billing | Design doc |
| caching-strategy.md | caching | Strategy doc |
| capacity-plan.md | scaling, production-readiness | Plan |
| compliance-mapping.md | compliance | Mapping doc |
| convergence-report.md | convergence | Report |
| cost-model.md | billing, scaling | Model |
| cross-module-story.md | cross-module-story | Story |
| data-residency.md | data-residency | Design doc |
| decision-log.md | master-architecture | Log |
| event-architecture.md | events | Design doc |
| facade-contract.md | facade-contract | Contract |
| gate-checklist.md | All validation steps | Checklist |
| incident-response.md | security, production-readiness | Playbook |
| integration-test-plan.md | testing, convergence | Test plan |
| llm-version.md | llm-versioning | Version doc |
| master-architecture.md | master-architecture | Design doc |
| memory-tier.md | memory-tiers | Design doc |
| migration-plan.md | data-residency, tenant-onboarding | Plan |
| module-architecture.md | module-architecture | Design doc |
| module-epic.md | module-epics | Epic |
| observability-design.md | observability | Design doc |
| production-readiness.md | production-readiness | Checklist |
| requirements-analysis.md | requirements | Analysis |
| research-findings.md | research | Findings |
| rollback-plan.md | production-readiness | Plan |
| runbook.md | production-readiness | Runbook |
| scaling-design.md | scaling | Design doc |
| security-architecture.md | security | Design doc |
| sla-definition.md | observability, production-readiness | SLA doc |
| tenant-isolation.md | tenant-isolation | Design doc |
| tenant-offboarding.md | tenant-offboarding | Plan |
| tenant-onboarding.md | tenant-onboarding | Plan |
| testing-strategy.md | testing | Strategy |
| tool-contract.md | tool-contracts | Contract |
| validation-report.md | All validate modes | Report |
| white-label-config.md | white-labeling | Config |

### Checklist Files (8 exist, 35 missing)
**Existing:**
- qg-f1.md, qg-i1.md, qg-i2.md, qg-i3.md
- qg-m1.md, qg-m2.md, qg-m3.md, qg-p1.md

**Missing (referenced in quality-gates.csv):**
- qg-d1-discovery.md, qg-pl1-planning.md
- qg-s1 through qg-s10 (security gates)
- qg-ai1 through qg-ai3 (AI safety gates)
- qg-tc1 through qg-tc3 (test coverage gates)
- qg-bv1, qg-ce1, qg-lt1, qg-prg (validation gates)
- qg-ir1, qg-sa1, qg-pr1, qg-dr1 (operations gates)
- Plus 10+ more operational checklists

**Action:** Create missing checklists as part of Phase 7 (post step content fill)

---

## BMAD Step File Convention

Based on analysis of official BMAD method, TEA, and WDS modules, step files must include:

### Required Sections

```markdown
# Step N: {Descriptive Title}

## MANDATORY EXECUTION RULES (READ FIRST)
- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS
- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices

---

## Purpose
{One paragraph describing what this step accomplishes}

---

## Prerequisites
- {Previous step completed}
- **Load patterns:** `{project-root}/_bmad/bam/data/{file}` → filter: `{criteria}`
- **Load domain:** `{project-root}/_bmad/bam/data/domains/{domain}.md`

---

## Inputs
- Output from previous step(s)
- Pattern registry: `{project-root}/_bmad/bam/data/*.csv`
- Templates: `{project-root}/_bmad/bam/data/templates/`

---

## Actions

### 1. {First Action Title}
{Detailed instructions with specific guidance}

### 2. {Second Action Title}
{Detailed instructions}

| Column1 | Column2 | Column3 |
|---------|---------|---------|
| Data    | Data    | Data    |

### 3. {Third Action Title}
{Detailed instructions}

---

## Verification Matrix

| Check | Expected | Actual | Status |
|-------|----------|--------|--------|
| {Check 1} | {Expected} | | [ ] |
| {Check 2} | {Expected} | | [ ] |

---

## Soft Gate Checkpoint (if applicable)
**Steps 1-N complete the {phase} design.**
Present summary and ask for confirmation before proceeding.

---

## Error Handling

### {Error Category 1}
#### {Specific Error}
If {condition}:
1. {Recovery step 1}
2. {Recovery step 2}

| Error | Cause | Fix |
|-------|-------|-----|
| {Error} | {Cause} | {Fix} |

### Escalation Path
If issues persist:
1. {Escalation step 1}
2. {Escalation step 2}

**Verify current best practices with web search:**
Search the web: "{topic} best practices {date}"

---

## COLLABORATION MENUS (A/P/C):

After completing the above, present:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into {topic}
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept and proceed to next step
- **[Specific refinements]**: Describe what you'd like to explore

Select an option:
```

### If 'A' (Advanced Elicitation):
- Invoke `bmad-advanced-elicitation` skill
- Process enhanced insights
- Return to A/P/C menu

### If 'P' (Party Mode):
- Invoke `bmad-party-mode` skill
- Process collaborative analysis
- Return to A/P/C menu

### If 'C' (Continue):
- Save to output document
- Update frontmatter `stepsCompleted`
- Proceed to next step

---

## Verification
- [ ] {Checklist item 1}
- [ ] {Checklist item 2}
- [ ] Patterns align with pattern registry

---

## Outputs
- {Output artifact 1}
- {Output artifact 2}
- **Load template:** `{project-root}/_bmad/bam/data/templates/{template}.md`

---

## Next Step
Proceed to `step-{NN}-{mode}-{name}.md` {with context}.
```

---

## Detailed Skill Specifications

### Skill 1: bmad-bam-master-architecture (QG-F1)

**V1 Source:** `foundation/create-master-architecture`

**Domain References:**
- `domains/tenant.md`
- `domains/ai-runtime.md`
- `domains/integration.md`
- `domains/security.md`

**Pattern References:**
- `patterns/rls.md`
- `patterns/schema-per-tenant.md`
- `patterns/langgraph.md`
- `patterns/facade.md`

**CSV References:**
- `tenant-models.csv`
- `ai-runtimes.csv`
- `quality-gates.csv`

**Template:** `templates/master-architecture.md`

**Step Mapping (V1 → V2):**

| V2 Step | V2 Name | V1 Source Steps | Content Focus |
|---------|---------|-----------------|---------------|
| step-01-c | context.md | step-01-c-discovery.md | Load project context, stakeholders |
| step-02-c | model.md | step-02-c-tenant-model-decisions.md | Select tenant isolation model |
| step-03-c | boundaries.md | step-03-c-ai-runtime-decisions.md + step-04-c-module-boundary-rules.md | AI runtime + module boundaries |
| step-04-c | patterns.md | step-05-c-shared-kernel.md + step-06-c-technology-stack.md + step-07-c-core-contracts.md | Shared kernel, tech stack, contracts |
| step-05-c | document.md | step-08-c-code-patterns.md + step-09-c-assembly.md | Patterns + final assembly |
| step-10-e | load.md | step-10-e-load-existing.md | Load existing architecture |
| step-11-e | apply.md | step-11-e-apply-changes.md | Apply modifications |
| step-20-v | load.md | step-20-v-load-artifact.md | Load for validation |
| step-21-v | validate.md | step-21-v-validate.md | Run QG-F1 checklist |
| step-22-v | report.md | step-22-v-generate-report.md | Generate gate report |

---

### Skill 2: bmad-bam-tenant-isolation (QG-M2)

**V1 Source:** `bmad-bam-tenant-model-isolation`

**Domain References:**
- `domains/tenant.md`
- `domains/security.md`
- `domains/compliance.md`
- `domains/storage.md`
- `domains/caching.md`

**Pattern References:**
- `patterns/rls.md`
- `patterns/schema-per-tenant.md`
- `patterns/database-per-tenant.md`

**CSV References:**
- `tenant-models.csv`

**Template:** `templates/tenant-isolation.md`

**Step Mapping (V1 → V2):**

| V2 Step | V2 Name (RENAME TO) | V1 Source | Content Focus |
|---------|---------------------|-----------|---------------|
| step-01-c | tenant-model-definition.md | step-01-c-tenant-model-definition.md | Define tenant hierarchy |
| step-02-c | isolation-matrix.md | step-02-c-isolation-matrix-creation.md | 8-dimension isolation matrix |
| step-03-c | context-propagation.md | step-03-c-context-propagation-design.md | Context flow all code paths |
| step-04-c | sharing-rules.md | step-04-c-sharing-rules.md | Cross-tenant sharing rules |
| step-05-c | compliance-mapping.md | step-05-c-compliance-mapping.md | Map to compliance frameworks |
| step-10-e | load.md | step-10-e-load-existing.md | Load existing model |
| step-11-e | apply.md | step-11-e-apply-changes.md | Apply modifications |
| step-20-v | load.md | step-20-v-load-artifact.md | Load for validation |
| step-21-v | validate.md | step-21-v-validate.md | Run QG-M2 checklist |
| step-22-v | report.md | step-22-v-generate-report.md | Generate gate report |

---

### Skill 3: bmad-bam-agent-runtime (QG-M3)

**V1 Source:** `bmad-bam-agent-runtime-architecture`

**Domain References:**
- `domains/ai-runtime.md`
- `domains/tenant.md`
- `domains/security.md`
- `domains/observability.md`

**Pattern References:**
- `patterns/langgraph.md`
- `patterns/crewai.md`
- `patterns/autogen.md`

**CSV References:**
- `ai-runtimes.csv`

**Template:** `templates/agent-runtime.md`

**Step Mapping (V1 → V2):**

| V2 Step | V2 Name (RENAME TO) | V1 Source | Content Focus |
|---------|---------------------|-----------|---------------|
| step-01-c | orchestration-selection.md | step-01-c-orchestration-model-selection.md | Select LangGraph/CrewAI/AutoGen |
| step-02-c | tool-registry.md | step-02-c-tool-registry-design.md | Tool registration and safety |
| step-03-c | memory-tiers.md | step-03-c-memory-tier-design.md | Working/episodic/semantic memory |
| step-04-c | approval-workflow.md | step-04-c-approval-workflow-design.md | Human-in-the-loop patterns |
| step-05-c | evaluation-safety.md | step-05-c-evaluation-foundation.md + step-06-c-kill-switch-design.md | Eval + kill switch |
| step-10-e | load.md | step-10-e-load-existing.md | Load existing runtime |
| step-11-e | apply.md | step-11-e-apply-changes.md | Apply modifications |
| step-20-v | load.md | step-20-v-load-artifact.md | Load for validation |
| step-21-v | validate.md | step-21-v-validate.md | Run QG-M3 checklist |
| step-22-v | report.md | step-22-v-generate-report.md | Generate gate report |

---

### Skill 4: bmad-bam-module-architecture (QG-M1)

**V1 Source:** `module/create-module-architecture`

**Domain References:**
- `domains/integration.md`
- `domains/events.md`
- `domains/testing.md`

**Pattern References:**
- `patterns/facade.md`
- `patterns/cqrs.md`
- `patterns/saga.md`

**Template:** `templates/module-architecture.md`

**Step Mapping (V1 → V2):**

| V2 Step | V2 Name (RENAME TO) | V1 Source | Content Focus |
|---------|---------------------|-----------|---------------|
| step-01-c | complexity-confirm.md | step-01-c-complexity-confirmation.md | Confirm module complexity |
| step-02-c | identity.md | step-02-c-identity.md | Module identity and ownership |
| step-03-c | domain-model.md | step-03-c-load-master + step-04-c-domain-model.md | Load context + domain model |
| step-04-c | facade-design.md | step-05-c-public-facade-design.md + step-06-c-dependencies.md | Public facade + dependencies |
| step-05-c | events-assembly.md | step-07-c-events + step-08-c-decisions + step-09-c-ai + step-10-c-assembly.md | Events, AI, assembly |
| step-10-e | load.md | step-10-e-load-existing.md | Load existing module |
| step-11-e | apply.md | step-11-e-apply-changes.md | Apply modifications |
| step-20-v | load.md | step-20-v-load-artifact.md | Load for validation |
| step-21-v | validate.md | step-21-v-validate.md | Run QG-M1 checklist |
| step-22-v | report.md | step-22-v-generate-report.md | Generate gate report |

---

### Skills 5-30: Reference Table

| # | Skill | V1 Source | Domains | Patterns | Template |
|---|-------|-----------|---------|----------|----------|
| 5 | facade-contract | integration/define-facade-contract | integration | facade | facade-contract.md |
| 6 | convergence | bmad-bam-convergence-verification | integration, testing | circuit-breaker | convergence-report.md |
| 7 | production-readiness | bmad-bam-production-readiness | observability, security | all | production-checklist.md |
| 8 | testing | bmad-bam-*-testing + TEA | testing | all | test-plan.md |
| 9 | tenant-onboarding | bmad-bam-tenant-onboarding-design | tenant, onboarding | rls | tenant-onboarding.md |
| 10 | tenant-offboarding | bmad-bam-tenant-offboarding-design | tenant, compliance | all | tenant-offboarding.md |
| 11 | billing | bmad-bam-usage-metering-design | billing | - | billing-design.md |
| 12 | white-labeling | bmad-bam-tenant-white-labeling-design | tenant | - | white-label.md |
| 13 | agent-debug | bmad-bam-ai-agent-debug | ai-runtime | langgraph,crewai | agent-debug-report.md |
| 14 | agent-tracing | bmad-bam-agent-execution-tracing | ai-runtime, observability | - | agent-trace.md |
| 15 | llm-versioning | bmad-bam-ai-model-* | ai-runtime | - | llm-version.md |
| 16 | memory-tiers | bmad-bam-agent-memory-optimization | ai-runtime | - | memory-design.md |
| 17 | tool-contracts | integration/validate-tool-contract | ai-runtime, integration | - | tool-contract.md |
| 18 | observability | bmad-bam-tenant-aware-observability | observability | - | observability-design.md |
| 19 | security | bmad-bam-security-* | security | - | security-architecture.md |
| 20 | compliance | bmad-bam-compliance-* | compliance | - | compliance-mapping.md |
| 21 | scaling | bmad-bam-auto-scaling-configuration | tenant | - | scaling-design.md |
| 22 | events | bmad-bam-event-streaming-design | events | saga,cqrs | event-architecture.md |
| 23 | caching | NEW (domain-based) | caching | - | caching-strategy.md |
| 24 | data-residency | bmad-bam-data-* + GDPR | compliance, storage | - | data-residency.md |
| 25 | api-versioning | bmad-bam-api-version-release | integration | - | api-version.md |
| 26 | module-epics | module/create-module-epics | - | - | module-epic.md |
| 27 | cross-module-story | bmad-bam-cross-module-story | - | - | cross-module-story.md |
| 28 | requirements | ingestion/requirement-ingestion | - | - | requirements.md |
| 29 | triage | ingestion/triage-module-complexity | - | - | triage-report.md |
| 30 | research | NEW | all | all | research-findings.md |

---

## NEW Skill Content Strategy

For skills without V1 source (caching, research), compose content from:

### Strategy 1: Domain-Based Composition

1. **Load primary domain file** - Extract core concepts, decision matrix
2. **Add BMAD execution rules** - Standard header sections
3. **Create action steps** - Based on domain's quality checks
4. **Add web research directives** - From domain's web queries
5. **Reference related patterns** - For implementation guidance

### Strategy 2: Pattern-Based Composition

1. **Identify relevant patterns** from CSVs
2. **Extract decision criteria** from pattern definitions
3. **Create comparison matrices** for selection
4. **Add implementation guidance** from pattern files

### Example: bmad-bam-caching (NEW skill)

**Source:** `domains/caching.md` + web research

**Step Content Derivation:**
```
step-01-c: Load caching domain context, identify requirements
step-02-c: Design cache key strategy (from domain Core Concepts)
step-03-c: Select cache tiers (from domain Cache Tiers table)
step-04-c: Design invalidation patterns (from domain Invalidation Patterns)
step-05-c: Document caching strategy (assemble all decisions)
```

---

## Step File Renaming Plan

V2 step files need descriptive names. Rename strategy:

### Naming Convention
```
step-{NN}-{mode}-{action-description}.md

Where:
- NN: 01-09 (Create), 10-19 (Edit), 20-29 (Validate)
- mode: c (Create), e (Edit), v (Validate)
- action-description: kebab-case describing the action
```

### Renaming Script

```bash
#!/bin/bash
# scripts/rename-v2-steps.sh

SKILLS_DIR="src-v2/skills"

# Master Architecture
cd "$SKILLS_DIR/bmad-bam-master-architecture/steps"
mv step-01-c-context.md step-01-c-load-context.md
mv step-02-c-model.md step-02-c-tenant-model-selection.md
mv step-03-c-boundaries.md step-03-c-module-boundaries.md
mv step-04-c-patterns.md step-04-c-technology-patterns.md
mv step-05-c-document.md step-05-c-architecture-assembly.md

# Tenant Isolation
cd "$SKILLS_DIR/bmad-bam-tenant-isolation/steps"
mv step-01-c-start.md step-01-c-tenant-model-definition.md
mv step-02-c-analyze.md step-02-c-isolation-matrix.md
mv step-03-c-design.md step-03-c-context-propagation.md
mv step-04-c-document.md step-04-c-sharing-rules.md
mv step-05-c-complete.md step-05-c-compliance-mapping.md

# ... continue for all 30 skills
```

---

## Implementation Phases

### Phase 1: Core Quality Gate Skills (Priority 1)
**8 skills, 80 step files**

| Skill | Quality Gate | V1 Source | Est. Lines |
|-------|--------------|-----------|------------|
| bmad-bam-master-architecture | QG-F1 | foundation/create-master-architecture | 1,800 |
| bmad-bam-module-architecture | QG-M1 | module/create-module-architecture | 1,800 |
| bmad-bam-tenant-isolation | QG-M2 | bmad-bam-tenant-model-isolation | 1,800 |
| bmad-bam-agent-runtime | QG-M3 | bmad-bam-agent-runtime-architecture | 1,800 |
| bmad-bam-facade-contract | QG-I1 | integration/define-facade-contract | 1,600 |
| bmad-bam-convergence | QG-I2/I3 | bmad-bam-convergence-verification | 1,600 |
| bmad-bam-production-readiness | QG-P1 | bmad-bam-production-readiness | 1,800 |
| bmad-bam-testing | TEA integration | bmad-bam-*-testing | 1,600 |
| **Subtotal** | | | **13,800** |

### Phase 2: Tenant Lifecycle Skills (Priority 2)
**4 skills, 40 step files**

| Skill | Function | V1 Source | Est. Lines |
|-------|----------|-----------|------------|
| bmad-bam-tenant-onboarding | Provisioning | bmad-bam-tenant-onboarding-design | 1,600 |
| bmad-bam-tenant-offboarding | Cleanup | bmad-bam-tenant-offboarding-design | 1,600 |
| bmad-bam-billing | Metering | bmad-bam-usage-metering-design | 1,600 |
| bmad-bam-white-labeling | Customization | bmad-bam-tenant-white-labeling-design | 1,400 |
| **Subtotal** | | | **6,200** |

### Phase 3: AI/Agent Skills (Priority 3)
**5 skills, 50 step files**

| Skill | Function | V1 Source | Est. Lines |
|-------|----------|-----------|------------|
| bmad-bam-agent-debug | Troubleshooting | bmad-bam-ai-agent-debug | 1,600 |
| bmad-bam-agent-tracing | Observability | bmad-bam-agent-execution-tracing | 1,600 |
| bmad-bam-llm-versioning | Model management | bmad-bam-ai-model-* | 1,600 |
| bmad-bam-memory-tiers | Agent memory | bmad-bam-agent-memory-optimization | 1,600 |
| bmad-bam-tool-contracts | Tool safety | integration/validate-tool-contract | 1,600 |
| **Subtotal** | | | **8,000** |

### Phase 4: Operations Skills (Priority 4)
**6 skills, 60 step files**

| Skill | Function | V1 Source | Est. Lines |
|-------|----------|-----------|------------|
| bmad-bam-observability | Monitoring | bmad-bam-tenant-aware-observability | 1,600 |
| bmad-bam-security | Security design | bmad-bam-security-* | 1,800 |
| bmad-bam-compliance | Compliance | bmad-bam-compliance-* | 1,800 |
| bmad-bam-scaling | Auto-scaling | bmad-bam-auto-scaling-configuration | 1,400 |
| bmad-bam-events | Event architecture | bmad-bam-event-streaming-design | 1,600 |
| bmad-bam-caching | Cache patterns | NEW (domain-based) | 1,400 |
| **Subtotal** | | | **9,600** |

### Phase 5: Planning Skills (Priority 5)
**4 skills, 40 step files**

| Skill | Function | V1 Source | Est. Lines |
|-------|----------|-----------|------------|
| bmad-bam-requirements | Requirement intake | ingestion/requirement-ingestion | 1,400 |
| bmad-bam-triage | Complexity triage | ingestion/triage-module-complexity | 1,400 |
| bmad-bam-cross-module-story | Story creation | bmad-bam-cross-module-story | 1,400 |
| bmad-bam-module-epics | Epic creation | module/create-module-epics | 1,400 |
| **Subtotal** | | | **5,600** |

### Phase 6: Specialized Skills (Priority 6)
**3 skills, 30 step files**

| Skill | Function | V1 Source | Est. Lines |
|-------|----------|-----------|------------|
| bmad-bam-data-residency | Data locality | bmad-bam-data-* + GDPR | 1,400 |
| bmad-bam-api-versioning | API lifecycle | bmad-bam-api-version-release | 1,400 |
| bmad-bam-research | Web research | NEW | 1,200 |
| **Subtotal** | | | **4,000** |

**GRAND TOTAL: 47,200 lines**

---

## Validation Tooling

### Test File: test/v2/step-content.test.js

```javascript
const fs = require('fs');
const path = require('path');

const SKILLS_DIR = 'src-v2/skills';
const MIN_LINES = 120;
const MAX_LINES = 250;

const REQUIRED_SECTIONS = [
  '## MANDATORY EXECUTION RULES',
  '## EXECUTION PROTOCOLS',
  '## Purpose',
  '## Prerequisites',
  '## Actions',
  '## Verification',
  '## Next Step'
];

const OPTIONAL_SECTIONS = [
  '## Error Handling',
  '## COLLABORATION MENUS',
  '## Soft Gate Checkpoint',
  '## Verification Matrix'
];

describe('V2 Step Content Validation', () => {
  const skills = fs.readdirSync(SKILLS_DIR)
    .filter(f => f.startsWith('bmad-bam-'));

  test.each(skills)('%s has properly filled step files', (skill) => {
    const stepsDir = path.join(SKILLS_DIR, skill, 'steps');
    const steps = fs.readdirSync(stepsDir).filter(f => f.endsWith('.md'));

    steps.forEach(step => {
      const content = fs.readFileSync(path.join(stepsDir, step), 'utf8');
      const lines = content.split('\n').length;

      // Check line count
      expect(lines).toBeGreaterThanOrEqual(MIN_LINES);
      expect(lines).toBeLessThanOrEqual(MAX_LINES);

      // Check required sections
      REQUIRED_SECTIONS.forEach(section => {
        expect(content).toContain(section);
      });

      // Check for web search directive (at least one)
      expect(content).toMatch(/Search the web:|web search/i);
    });
  });

  test.each(skills)('%s step files have descriptive names', (skill) => {
    const stepsDir = path.join(SKILLS_DIR, skill, 'steps');
    const steps = fs.readdirSync(stepsDir).filter(f => f.endsWith('.md'));

    steps.forEach(step => {
      // Should NOT have generic names
      expect(step).not.toMatch(/step-\d+-[cev]-start\.md/);
      expect(step).not.toMatch(/step-\d+-[cev]-analyze\.md/);
      expect(step).not.toMatch(/step-\d+-[cev]-design\.md/);
      expect(step).not.toMatch(/step-\d+-[cev]-complete\.md/);
    });
  });
});
```

### Validation Script: scripts/validate-step-content.sh

```bash
#!/bin/bash
# Validate step content compliance

SKILLS_DIR="src-v2/skills"
MIN_LINES=120
ERRORS=0

for skill in "$SKILLS_DIR"/bmad-bam-*/; do
  for step in "$skill/steps/"step-*.md; do
    lines=$(wc -l < "$step")
    
    if [ "$lines" -lt "$MIN_LINES" ]; then
      echo "ERROR: $step has only $lines lines (min: $MIN_LINES)"
      ERRORS=$((ERRORS + 1))
    fi
    
    # Check required sections
    for section in "MANDATORY EXECUTION RULES" "EXECUTION PROTOCOLS" "Purpose" "Actions" "Verification"; do
      if ! grep -q "## $section" "$step"; then
        echo "ERROR: $step missing ## $section"
        ERRORS=$((ERRORS + 1))
      fi
    done
  done
done

if [ "$ERRORS" -eq 0 ]; then
  echo "All step files valid!"
  exit 0
else
  echo "Found $ERRORS errors"
  exit 1
fi
```

---

## Example Filled Step File

### Before (stub - 28 lines):
```markdown
# Step 03 C Design

## Purpose

Design the solution based on analysis.

## Prerequisites

- Step 02 complete

## Actions

### 1. Apply Patterns

Apply identified patterns.

### 2. Design Solution

Create design decisions.

## Verification

- [ ] Design complete
- [ ] Decisions documented

## Next Step

Proceed to `step-04-c-document.md`
```

### After (filled - 180 lines):
```markdown
# Step 3: Context Propagation Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Design comprehensive tenant context propagation ensuring that tenant identity flows through ALL code paths—HTTP requests, background jobs, events, WebSockets, scheduled tasks, and AI agent runs.

---

## Prerequisites

- Isolation matrix complete (Step 2)
- Module boundaries defined
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv` → filter: `{tenant_model}`
- **Load domain:** `{project-root}/_bmad/bam/data/domains/tenant.md`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/tenant-models.csv`
- Templates: `{project-root}/_bmad/bam/data/templates/`

---

## Actions

### 1. Load Context Propagation Patterns

Read the TenantContext interface and propagation patterns from domain files:
- TenantContext interface definition
- Required fields: tenant_id, user_id, workspace_id, tier, permissions
- Optional fields: api_key_id, request_id, timestamp

### 2. Design Propagation for Each Code Path

For each code path type, apply the patterns from domain knowledge:

| Code Path | Pattern Reference | Key Mechanism |
|-----------|------------------|---------------|
| HTTP Requests | `domains/tenant.md` → Middleware Section | JWT extraction + SET LOCAL |
| Background Jobs | `domains/tenant.md` → Job Processing | Context in payload metadata |
| Event Handlers | `domains/events.md` → Event Publishing | Context in event headers |
| WebSocket | `domains/tenant.md` → Real-time Section | Connection state storage |
| AI Agent Runs | `domains/ai-runtime.md` → State Management | AgentState with context |

### 3. Document Context Flow Diagram

Create a visual representation showing:
- Entry points where context is established
- How context passes through layers
- Where context is used for enforcement (RLS, cache keys, etc.)

```
Request (X-Tenant-ID)
    │
    ▼
┌─────────────────┐
│ Middleware      │ ← Extract tenant from JWT
└────────┬────────┘
         │
    SET LOCAL app.current_tenant_id
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐ ┌───────┐
│Service│ │Service│ ← All queries auto-filtered by RLS
└───────┘ └───────┘
```

### 4. Design No-Context Guard

Implement defensive pattern to prevent execution without context:
- Reference guard pattern from `domains/security.md`
- Define which operations require mandatory context
- Specify behavior when context is missing (fail fast)

### 5. Create Verification Tests

For each code path, define test cases:
- Valid context propagation test
- Missing context rejection test
- Context tampering prevention test

---

## Verification Matrix

| Code Path | Context Source | DB Session Set | Tested |
|-----------|----------------|----------------|--------|
| HTTP Request | JWT Middleware | SET LOCAL | [ ] |
| Background Job | Job Payload | SET LOCAL | [ ] |
| Event Handler | Event Headers | SET LOCAL | [ ] |
| WebSocket | Connection State | Per message | [ ] |
| AI Agent Run | State Object | Tool wrapper | [ ] |

---

## Soft Gate Checkpoint

**Steps 1-3 complete the isolation model design.**

Present summary of:
1. Tenant model (hierarchy, billing entity)
2. Isolation matrix (all asset types)
3. Context propagation (all code paths)

Ask for confirmation before proceeding to sharing rules and compliance.

---

## Error Handling

### Context Propagation Failures

#### Missing Tenant Context at Runtime
If code executes without tenant context:
1. **HALT EXECUTION** - Never allow operations without tenant context
2. Check middleware order - tenant extraction must run early
3. Verify JWT contains required claims (tenant_id, user_id)
4. Review code path for context loss (async boundaries, event handlers)
5. Add explicit context guards at all entry points

| Error | Cause | Fix |
|-------|-------|-----|
| "tenant context required" | Guard triggered correctly | Trace back to find where context was lost |
| "invalid tenant_id" | Malformed or expired JWT | Validate JWT structure and expiry |
| "context not propagated" | Async boundary dropped context | Use AsyncLocalStorage or explicit propagation |

### Escalation Path
If issues persist:
1. Map complete request flow with context checkpoints
2. Identify all async boundaries and event handlers
3. Escalate to platform architect if middleware changes needed

**Verify current best practices with web search:**
Search the web: "tenant context propagation patterns {date}"
Search the web: "AsyncLocalStorage multi-tenant {date}"

---

## COLLABORATION MENUS (A/P/C):

After completing the context propagation design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into propagation edge cases and async boundaries
- **P (Party Mode)**: Bring analyst and architect perspectives for context flow review
- **C (Continue)**: Accept context propagation design and proceed to sharing rules
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass propagation context: code paths, verification matrix, guard design
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into context propagation design
- Return to A/P/C menu

### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review context propagation design: {summary of code paths and guards}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

### If 'C' (Continue):
- Save context propagation design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-sharing-rules.md`

---

## Verification

- [ ] TenantContext interface defined following domain pattern
- [ ] All code paths have propagation design
- [ ] No-context-guard approach documented
- [ ] Test cases defined for each path type
- [ ] Patterns align with pattern registry

---

## Outputs

- Context propagation design document
- Code path verification matrix
- Test case specifications
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-isolation.md`

---

## Next Step

After soft gate approval, proceed to `step-04-c-sharing-rules.md`.
```

---

## Rollback Strategy

If implementation fails partway:

1. **Git-based rollback:** All changes committed per-phase
   ```bash
   git revert HEAD~N  # Revert last N commits
   ```

2. **Partial state handling:**
   - Each phase is self-contained
   - Skills can be rolled back individually
   - Stub files preserved in git history

3. **Recovery procedure:**
   - Identify failed skill
   - Restore stub files from git
   - Re-run implementation for that skill only

---

## Skill Dependencies

Implementation order must respect dependencies:

```
Phase 1 (no dependencies):
  master-architecture → module-architecture → tenant-isolation → agent-runtime
                                                      ↓
Phase 1 (depends on above):                   facade-contract → convergence → production-readiness
                                                                                      ↓
Phase 2-6 (depends on Phase 1):                                               All remaining skills
```

---

## Quality Metrics

| Metric | Current | Target | Validation |
|--------|---------|--------|------------|
| Avg lines/step | 28 | 150-200 | Script check |
| Total step content | 8,534 | 47,200 | wc -l |
| BMAD sections present | ~20% | 100% | grep check |
| Web search directives | 0% | 100% | grep check |
| Collaboration menus | 0% | 100% | grep check |
| Error handling sections | 0% | 100% | grep check |
| Descriptive step names | 0% | 100% | regex check |

---

## Verification Checklist

For each filled step file:

- [ ] MANDATORY EXECUTION RULES section present with all 5 rules
- [ ] EXECUTION PROTOCOLS section present with all 5 protocols
- [ ] Purpose section with clear, specific description
- [ ] Prerequisites with domain/pattern references using correct paths
- [ ] Actions with 3-5 numbered, detailed steps
- [ ] Tables for decision matrices where applicable
- [ ] Verification Matrix with checkboxes (for design steps)
- [ ] Soft Gate Checkpoint (for mid-workflow decision points)
- [ ] Error Handling section with recovery procedures
- [ ] Collaboration Menus (A/P/C) section with all three options
- [ ] Web search directives with `{date}` placeholder
- [ ] Output section with template references
- [ ] Next Step section with correct file reference
- [ ] Line count between 120-250
- [ ] No generic step names (start, analyze, design, complete)

---

## Success Criteria

1. All 300 step files filled with BMAD-compatible content
2. Average line count per step: 150-200 (min 120, max 250)
3. All BMAD convention sections present in every step
4. All step files pass `scripts/validate-step-content.sh`
5. All step files pass `npm test -- test/v2/step-content.test.js`
6. All step files have descriptive names (no generic names)
7. All skills reference appropriate domain/pattern files
8. All skills have working V1→V2 content migration
9. Edit/Validate modes have mode-specific content patterns
10. Soft gates integrated at correct step positions
11. All 43 quality gates have corresponding checklist files

---

## Edit/Validate Mode Content Strategy

### Edit Mode Steps (10-19)

Edit mode loads existing artifacts and applies targeted modifications.

#### step-10-e-load Pattern
```markdown
# Step 10: Load Existing {Artifact}

## MANDATORY EXECUTION RULES (READ FIRST)
[Standard rules]

## EXECUTION PROTOCOLS
[Standard protocols]

---

## Purpose
Load the existing {artifact} document for modification.

---

## Prerequisites
- {Artifact} exists at `{output_folder}/planning-artifacts/{artifact}.md`
- User has specified what changes are needed

---

## Actions

### 1. Locate Existing Artifact
Search for the artifact in:
1. `{output_folder}/planning-artifacts/{artifact}.md`
2. `{project-root}/docs/architecture/{artifact}.md`
3. Ask user for path if not found

### 2. Parse Document Structure
Extract:
- Frontmatter (version, date, status)
- Section headers
- Decision tables
- Configuration values

### 3. Identify Modification Points
Based on user's change request:
| Section | Current Value | Requested Change |
|---------|---------------|------------------|
| {Section} | {Current} | {New} |

### 4. Confirm Understanding
Present summary of planned changes and await user confirmation.

---

## Verification
- [ ] Artifact located and loaded
- [ ] Current state documented
- [ ] Modification points identified
- [ ] User confirmed change scope

---

## Outputs
- Loaded artifact in memory
- Modification plan

---

## Next Step
Proceed to `step-11-e-apply.md` to apply changes.
```

#### step-11-e-apply Pattern
```markdown
# Step 11: Apply Changes

## Purpose
Apply the requested modifications to the loaded artifact.

---

## Actions

### 1. Apply Modifications
For each identified modification point:
- Locate section in document
- Apply change
- Update related sections for consistency

### 2. Increment Version
Update frontmatter:
- Increment version number
- Update date to current
- Add change note

### 3. Validate Consistency
Ensure:
- No broken internal references
- Decision tables remain valid
- All sections still coherent

### 4. Generate Diff Summary
Present changes:
```diff
- Old value
+ New value
```

---

## Verification
- [ ] All requested changes applied
- [ ] Document internally consistent
- [ ] Version incremented
- [ ] Change summary generated

---

## COLLABORATION MENUS (A/P/C):
After applying changes, present options to review or continue.

---

## Outputs
- Modified artifact
- Change summary

---

## Next Step
Save artifact and optionally run validation mode.
```

### Validate Mode Steps (20-29)

Validate mode checks artifacts against quality gate criteria.

#### step-20-v-load Pattern
```markdown
# Step 20: Load Artifact for Validation

## Purpose
Load the artifact and corresponding quality gate checklist for validation.

---

## Actions

### 1. Load Target Artifact
Load from `{output_folder}/planning-artifacts/{artifact}.md`

### 2. Load Quality Gate Checklist
Load from `{project-root}/_bmad/bam/data/checklists/{qg-id}.md`

### 3. Extract Validation Criteria
Parse checklist for:
- CRITICAL checks (must all pass)
- Standard checks (80% must pass)
- Recovery procedures

---

## Outputs
- Artifact content
- Validation criteria list
```

#### step-21-v-validate Pattern
```markdown
# Step 21: Execute Validation

## Purpose
Run quality gate checks against the artifact.

---

## Actions

### 1. Execute CRITICAL Checks
For each CRITICAL check:
| Check | Expected | Found | Status |
|-------|----------|-------|--------|
| {Check} | {Expected} | {Found} | [ ] |

Any CRITICAL failure → FAIL gate

### 2. Execute Standard Checks
For each standard check, verify compliance.

### 3. Calculate Gate Status
| Outcome | Criteria |
|---------|----------|
| PASS | All CRITICAL + 80% standard |
| CONDITIONAL | All CRITICAL, <80% standard |
| FAIL | Any CRITICAL fails |

### 4. Document Gaps
For failed checks:
| Check | Gap | Remediation |
|-------|-----|-------------|
| {Check} | {Gap} | {Fix} |

---

## Verification
- [ ] All CRITICAL checks evaluated
- [ ] All standard checks evaluated
- [ ] Gate status determined
- [ ] Gaps documented with remediation

---

## Outputs
- Validation result (PASS/CONDITIONAL/FAIL)
- Gap analysis

---

## Next Step
Proceed to `step-22-v-report.md` to generate report.
```

#### step-22-v-report Pattern
```markdown
# Step 22: Generate Validation Report

## Purpose
Generate formal quality gate report.

---

## Actions

### 1. Generate Report
**Load template:** `{project-root}/_bmad/bam/data/templates/validation-report.md`

Fill sections:
- Gate ID and name
- Artifact validated
- Date and validator
- CRITICAL check results
- Standard check results
- Overall status
- Remediation required (if any)

### 2. Record Gate Passage
If PASS or CONDITIONAL:
- Update artifact frontmatter with gate passage
- Record in project decision log

### 3. Trigger Next Workflow
Based on gate type:
| Gate | On PASS | On FAIL |
|------|---------|---------|
| QG-F1 | Enable QG-M1/M2/M3 | Block all module work |
| QG-M1 | Enable QG-I1 | Block integration |
| QG-P1 | Enable production | Block deployment |

---

## Outputs
- Validation report document
- Updated artifact frontmatter
- Decision log entry
```

---

## Soft Gate Integration

The quality-gates.csv includes `soft_gate_steps` column indicating where to pause for user confirmation.

### Soft Gate Mapping

| Quality Gate | soft_gate_steps | Checkpoint Description |
|--------------|-----------------|------------------------|
| QG-F1 | 3,5,7 | After step 3 (tenant model), step 5 (boundaries), step 7 (stack) |
| QG-M1 | 2,4 | After step 2 (identity), step 4 (facade) |
| QG-M2 | 3,5 | After step 3 (isolation matrix), step 5 (compliance) |
| QG-M3 | 4,6 | After step 4 (tool registry), step 6 (evaluation) |
| QG-I1 | 2 | After step 2 (contract compatibility) |
| QG-I2 | 1 | After step 1 (tenant safety tests) |
| QG-I3 | 1 | After step 1 (agent safety tests) |
| QG-P1 | N/A | Final gate, no soft checkpoints |

### Soft Gate Content Template

Insert at specified steps:
```markdown
---

## Soft Gate Checkpoint

**Steps 1-{N} complete the {phase_name}.**

Present summary:
1. {Key decision 1}
2. {Key decision 2}
3. {Key decision 3}

```
Checkpoint: {N} of {total} design decisions complete.
Continue to {next_phase}? (y/n)
```

If 'n': Return to previous step for refinement.
If 'y': Proceed to next step.

---
```

---

## Complete Step Renaming Plan

All 30 skills require step file renaming from generic to descriptive names.

### Renaming Table (All 30 Skills)

#### Phase 1: Core Quality Gate Skills

**bmad-bam-master-architecture:**
| Current | Rename To |
|---------|-----------|
| step-01-c-context.md | step-01-c-discovery.md |
| step-02-c-model.md | step-02-c-tenant-model-decisions.md |
| step-03-c-boundaries.md | step-03-c-ai-runtime-decisions.md |
| step-04-c-patterns.md | step-04-c-technology-patterns.md |
| step-05-c-document.md | step-05-c-architecture-assembly.md |

**bmad-bam-module-architecture:**
| Current | Rename To |
|---------|-----------|
| step-01-c-start.md | step-01-c-complexity-confirmation.md |
| step-02-c-analyze.md | step-02-c-identity-ownership.md |
| step-03-c-design.md | step-03-c-domain-model.md |
| step-04-c-document.md | step-04-c-public-facade-design.md |
| step-05-c-complete.md | step-05-c-events-assembly.md |

**bmad-bam-tenant-isolation:**
| Current | Rename To |
|---------|-----------|
| step-01-c-start.md | step-01-c-tenant-model-definition.md |
| step-02-c-analyze.md | step-02-c-isolation-matrix-creation.md |
| step-03-c-design.md | step-03-c-context-propagation-design.md |
| step-04-c-document.md | step-04-c-sharing-rules.md |
| step-05-c-complete.md | step-05-c-compliance-mapping.md |

**bmad-bam-agent-runtime:**
| Current | Rename To |
|---------|-----------|
| step-01-c-start.md | step-01-c-orchestration-model-selection.md |
| step-02-c-analyze.md | step-02-c-tool-registry-design.md |
| step-03-c-design.md | step-03-c-memory-tier-design.md |
| step-04-c-document.md | step-04-c-approval-workflow-design.md |
| step-05-c-complete.md | step-05-c-evaluation-safety-design.md |

**bmad-bam-facade-contract:**
| Current | Rename To |
|---------|-----------|
| step-01-c-start.md | step-01-c-contract-identification.md |
| step-02-c-analyze.md | step-02-c-interface-design.md |
| step-03-c-design.md | step-03-c-versioning-strategy.md |
| step-04-c-document.md | step-04-c-compatibility-rules.md |
| step-05-c-complete.md | step-05-c-contract-assembly.md |

**bmad-bam-convergence:**
| Current | Rename To |
|---------|-----------|
| step-01-c-start.md | step-01-c-contract-inventory.md |
| step-02-c-analyze.md | step-02-c-compatibility-analysis.md |
| step-03-c-design.md | step-03-c-integration-test-design.md |
| step-04-c-document.md | step-04-c-gap-remediation.md |
| step-05-c-complete.md | step-05-c-convergence-report.md |

**bmad-bam-production-readiness:**
| Current | Rename To |
|---------|-----------|
| step-01-c-start.md | step-01-c-readiness-inventory.md |
| step-02-c-analyze.md | step-02-c-observability-verification.md |
| step-03-c-design.md | step-03-c-disaster-recovery-check.md |
| step-04-c-document.md | step-04-c-runbook-verification.md |
| step-05-c-complete.md | step-05-c-production-checklist.md |

**bmad-bam-testing:**
| Current | Rename To |
|---------|-----------|
| step-01-c-start.md | step-01-c-test-strategy-load.md |
| step-02-c-analyze.md | step-02-c-coverage-analysis.md |
| step-03-c-design.md | step-03-c-tenant-isolation-tests.md |
| step-04-c-document.md | step-04-c-agent-safety-tests.md |
| step-05-c-complete.md | step-05-c-test-plan-assembly.md |

#### Phase 2: Tenant Lifecycle Skills

**bmad-bam-tenant-onboarding:**
| Current | Rename To |
|---------|-----------|
| step-01-c-start.md | step-01-c-onboarding-requirements.md |
| step-02-c-analyze.md | step-02-c-provisioning-pipeline.md |
| step-03-c-design.md | step-03-c-tier-configuration.md |
| step-04-c-document.md | step-04-c-activation-workflow.md |
| step-05-c-complete.md | step-05-c-onboarding-assembly.md |

**bmad-bam-tenant-offboarding:**
| Current | Rename To |
|---------|-----------|
| step-01-c-start.md | step-01-c-offboarding-requirements.md |
| step-02-c-analyze.md | step-02-c-data-retention-rules.md |
| step-03-c-design.md | step-03-c-cleanup-pipeline.md |
| step-04-c-document.md | step-04-c-export-procedures.md |
| step-05-c-complete.md | step-05-c-offboarding-assembly.md |

**bmad-bam-billing:**
| Current | Rename To |
|---------|-----------|
| step-01-c-start.md | step-01-c-metering-requirements.md |
| step-02-c-analyze.md | step-02-c-pricing-model.md |
| step-03-c-design.md | step-03-c-invoice-generation.md |
| step-04-c-document.md | step-04-c-payment-integration.md |
| step-05-c-complete.md | step-05-c-billing-assembly.md |

**bmad-bam-white-labeling:**
| Current | Rename To |
|---------|-----------|
| step-01-c-start.md | step-01-c-branding-requirements.md |
| step-02-c-analyze.md | step-02-c-theme-configuration.md |
| step-03-c-design.md | step-03-c-domain-mapping.md |
| step-04-c-document.md | step-04-c-asset-management.md |
| step-05-c-complete.md | step-05-c-white-label-assembly.md |

#### Phase 3: AI/Agent Skills

**bmad-bam-agent-debug:**
| Current | Rename To |
|---------|-----------|
| step-01-c-start.md | step-01-c-issue-identification.md |
| step-02-c-analyze.md | step-02-c-trace-analysis.md |
| step-03-c-design.md | step-03-c-root-cause-investigation.md |
| step-04-c-document.md | step-04-c-fix-implementation.md |
| step-05-c-complete.md | step-05-c-debug-report.md |

**bmad-bam-agent-tracing:**
| Current | Rename To |
|---------|-----------|
| step-01-c-start.md | step-01-c-tracing-requirements.md |
| step-02-c-analyze.md | step-02-c-instrumentation-points.md |
| step-03-c-design.md | step-03-c-span-design.md |
| step-04-c-document.md | step-04-c-context-propagation.md |
| step-05-c-complete.md | step-05-c-tracing-assembly.md |

**bmad-bam-llm-versioning:**
| Current | Rename To |
|---------|-----------|
| step-01-c-start.md | step-01-c-model-inventory.md |
| step-02-c-analyze.md | step-02-c-version-strategy.md |
| step-03-c-design.md | step-03-c-deployment-pipeline.md |
| step-04-c-document.md | step-04-c-rollback-procedures.md |
| step-05-c-complete.md | step-05-c-versioning-assembly.md |

**bmad-bam-memory-tiers:**
| Current | Rename To |
|---------|-----------|
| step-01-c-start.md | step-01-c-memory-requirements.md |
| step-02-c-analyze.md | step-02-c-tier-selection.md |
| step-03-c-design.md | step-03-c-storage-strategy.md |
| step-04-c-document.md | step-04-c-retention-policies.md |
| step-05-c-complete.md | step-05-c-memory-assembly.md |

**bmad-bam-tool-contracts:**
| Current | Rename To |
|---------|-----------|
| step-01-c-start.md | step-01-c-tool-inventory.md |
| step-02-c-analyze.md | step-02-c-contract-validation.md |
| step-03-c-design.md | step-03-c-permission-design.md |
| step-04-c-document.md | step-04-c-safety-guardrails.md |
| step-05-c-complete.md | step-05-c-contract-assembly.md |

#### Phase 4-6: Remaining Skills

(Similar renaming pattern for: observability, security, compliance, scaling, events, caching, data-residency, api-versioning, module-epics, cross-module-story, requirements, triage, research)

### Automated Renaming Script

```bash
#!/bin/bash
# scripts/rename-v2-steps.sh
# Comprehensive step file renaming for all 30 skills

SKILLS_DIR="src-v2/skills"

rename_steps() {
  local skill=$1
  shift
  cd "$SKILLS_DIR/$skill/steps" || return
  
  # Process rename pairs: old new old new ...
  while [[ $# -ge 2 ]]; do
    if [[ -f "$1" ]]; then
      mv "$1" "$2"
      echo "Renamed: $skill/$1 → $2"
    fi
    shift 2
  done
  
  cd - > /dev/null
}

# Master Architecture
rename_steps "bmad-bam-master-architecture" \
  "step-01-c-context.md" "step-01-c-discovery.md" \
  "step-02-c-model.md" "step-02-c-tenant-model-decisions.md" \
  "step-03-c-boundaries.md" "step-03-c-ai-runtime-decisions.md" \
  "step-04-c-patterns.md" "step-04-c-technology-patterns.md" \
  "step-05-c-document.md" "step-05-c-architecture-assembly.md"

# Continue for all 30 skills...
# (Full script generated during implementation)

echo "Step renaming complete!"
```

---

## TOML Menu Integration

V2 uses TOML customization with Z-prefix menu codes per CLAUDE.md.

### Menu Code Convention
```
Z{Category}{Number} - {Skill Name}

Categories:
- ZMA: Master Architecture
- ZMO: Module
- ZTI: Tenant Isolation
- ZAR: Agent Runtime
- ZFC: Facade Contract
- ZCV: Convergence/Validation
- ZPR: Production Readiness
- ZTT: Testing
- ZON: Onboarding
- ZOF: Offboarding
- ZBI: Billing
- ZWL: White Labeling
- ZAD: Agent Debug
- ZAT: Agent Tracing
- ZLV: LLM Versioning
- ZMT: Memory Tiers
- ZTC: Tool Contracts
- ZOB: Observability
- ZSC: Security
- ZCM: Compliance
- ZSL: Scaling
- ZEV: Events
- ZCA: Caching
- ZDR: Data Residency
- ZAV: API Versioning
- ZME: Module Epics
- ZCS: Cross-module Story
- ZRQ: Requirements
- ZTR: Triage
- ZRS: Research
```

### Step File TOML Reference

Each step file should reference its TOML menu entry:
```markdown
## Prerequisites
...
- **TOML Menu:** `Z{Code}` → triggers this skill workflow
```

---

## Implementation Phase Dependencies

```
Phase 1 (Foundation) ────────────────────────────────────────►
    master-architecture → module-architecture → tenant-isolation
                                  │                    │
                                  └──── agent-runtime ─┘
                                              │
                                              ▼
                              facade-contract → convergence → production-readiness → testing
                                                                                         │
Phase 2 (Tenant Lifecycle) ◄─────────────────────────────────────────────────────────────┘
    tenant-onboarding → tenant-offboarding → billing → white-labeling
                                                           │
Phase 3 (AI/Agent) ◄───────────────────────────────────────┘
    agent-debug → agent-tracing → llm-versioning → memory-tiers → tool-contracts
                                                                        │
Phase 4 (Operations) ◄──────────────────────────────────────────────────┘
    observability → security → compliance → scaling → events → caching
                                                                  │
Phase 5 (Planning) ◄──────────────────────────────────────────────┘
    requirements → triage → cross-module-story → module-epics
                                                      │
Phase 6 (Specialized) ◄───────────────────────────────┘
    data-residency → api-versioning → research

Legend:
─► Dependency (must complete before)
◄─ Phase boundary
```

---

## Missing Checklist Creation (Phase 7)

After step content fill, create missing checklists from quality-gates.csv.

### Checklist Generation Script

```bash
#!/bin/bash
# scripts/generate-missing-checklists.sh

CHECKLISTS_DIR="src-v2/data/checklists"
QG_CSV="src-v2/data/quality-gates.csv"

# Extract unique checklist_file values from CSV
tail -n +2 "$QG_CSV" | cut -d',' -f8 | sort -u | while read checklist; do
  if [[ ! -f "$CHECKLISTS_DIR/$checklist" ]]; then
    echo "Creating: $checklist"
    # Generate from CSV row data
    gate_id=$(grep "$checklist" "$QG_CSV" | cut -d',' -f1)
    gate_name=$(grep "$checklist" "$QG_CSV" | cut -d',' -f2)
    
    cat > "$CHECKLISTS_DIR/$checklist" << EOF
# ${gate_id}: ${gate_name}

**Workflow:** bmad-bam-{workflow}
**Prerequisites:** {dependencies}

## Critical Checks (All Must Pass)

- [ ] **CRITICAL:** {Critical check from verification_tests}

## Standard Checks

- [ ] {Standard check from verification_tests}

## Recovery Protocol

On FAIL: {fail_recovery from CSV}

## Outcome

| Result | Criteria |
|--------|----------|
| PASS | All critical + 80% standard |
| CONDITIONAL | All critical, <80% standard + mitigation plan |
| FAIL | Any critical fails |
EOF
  fi
done

echo "Generated $(ls $CHECKLISTS_DIR/*.md | wc -l) checklists"
```

---

## Revised Success Criteria

1. All 300 step files filled with BMAD-compatible content
2. Average line count per step: 150-200 (min 120, max 250)
3. All BMAD convention sections present in every step
4. All step files pass `scripts/validate-step-content.sh`
5. All step files pass `npm test -- test/v2/step-content.test.js`
6. All step files have descriptive names (no generic names)
7. All skills reference appropriate domain/pattern files
8. All skills have working V1→V2 content migration
9. **Edit/Validate modes have mode-specific content patterns**
10. **Soft gates integrated at CSV-specified step positions**
11. **All 43 quality gates have corresponding checklist files**
12. **TOML menu codes documented in step prerequisites**
13. **V1→V2 consolidation complete (179 workflows → 30 skills)**
14. **All 12 domains and 10 patterns referenced appropriately**
15. **All 40 templates mapped to skills**

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-26 | Initial spec |
| 2.0.0 | 2026-04-26 | Added V1→V2 mapping, validation tools, example step |
| 3.0.0 | 2026-04-26 | Comprehensive V1 consolidation (179 workflows), Edit/Validate modes, Soft gates, Complete renaming plan, TOML integration, Missing checklist generation, Revised success criteria |
