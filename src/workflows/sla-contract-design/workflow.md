# SLA Contract Design

**Goal:** Design comprehensive Service Level Agreements for multi-tenant AI platforms covering uptime guarantees, AI response latency, tenant isolation SLAs, and tiered service commitments.

**Phase:** 3 (Solutioning) - Addresses gap in Planning/Solutioning phases

---

## WORKFLOW ARCHITECTURE

This uses **micro-file architecture** for disciplined execution:

- Each step is a self-contained file with embedded rules
- Sequential progression with user control at each step
- Document state tracked in frontmatter
- Append-only document building through conversation
- You NEVER proceed to a step file if the current step file indicates the user must approve

**Step Naming Convention:** `step-NN-mode-description.md`
- `01-10`: Create mode (`step-0N-c-*`, `step-10-c-*`)
- `10-19`: Edit mode (`step-1N-e-*`)
- `20-29`: Validate mode (`step-2N-v-*`)

---

## Mode Selection

| Mode | Description | Entry Point |
|------|-------------|-------------|
| **Create** | Design new SLA contract | `steps/step-01-c-*` |
| **Edit** | Modify existing SLA design | `steps/step-10-e-*` |
| **Validate** | Check against SLA completeness criteria | `steps/step-20-v-*` |

Default: **Create** mode unless SLA artifact exists.

### Create Mode
Follow Create steps sequentially: step-01-c -> step-02-c -> ... -> step-10-c

### Edit Mode
Follow Edit steps: step-10-e-load -> step-11-e-apply

### Validate Mode
Follow Validate steps: step-20-v-load -> step-21-v-validate -> step-22-v-report

### Create Mode Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | `step-01-c-analyze-sla-requirements.md` | Gather SLA requirements per tenant tier |
| 2 | `step-02-c-define-uptime-guarantees.md` | Establish availability targets per tier |
| 3 | `step-03-c-design-latency-slas.md` | Define AI response latency commitments |
| 4 | `step-04-c-establish-isolation-guarantees.md` | Document tenant isolation SLAs |
| 5 | `step-05-c-create-support-tiers.md` | Design support response time tiers |
| 6 | `step-06-c-define-penalty-clauses.md` | Establish SLA breach remedies |
| 7 | `step-07-c-design-monitoring-requirements.md` | Define SLA monitoring approach |
| 8 | `step-08-c-document-reporting-obligations.md` | Create SLA reporting requirements |
| 9 | `step-09-c-validate-sla-feasibility.md` | Verify SLAs are achievable |
| 10 | `step-10-c-finalize-contract-templates.md` | Create final SLA contract templates |

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve:
   - Use `{user_name}` for greeting
   - Use `{communication_language}` for all communications
   - Use `{document_output_language}` for output documents
   - Use `{planning_artifacts}` for output location
   - Use `{project_knowledge}` for additional context scanning

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant-specific SLA considerations
   - Use `{bam_artifacts}` for BAM-specific outputs

3. **Load project context** - Search for `**/project-context.md`.
   If found, load as foundational reference including BAM configuration section.

4. **Web Research Optional**
   Web search can help find current SLA best practices.
   Search queries: "SaaS SLA best practices {date}", "multi-tenant SLA patterns {date}", "AI platform SLA benchmarks {date}"

5. **EXECUTION**
   Read fully and follow: `./steps/step-01-c-analyze-sla-requirements.md` to begin.

---

## Prerequisites

- **Required artifacts:** Master architecture document, Tenant tier definitions
- **Required gates passed:** QG-I1 (Convergence Gate)
- **Config required:** `{tenant_model}`
- **Recommended:** Disaster recovery plan, Infrastructure architecture

---

## Quality Gates

### Entry Gate
- QG-I1 (Convergence Gate) must pass before entering this workflow

### Exit Gate: QG-SLA1 (SLA Contract Gate)
This workflow produces artifacts that satisfy QG-SLA1. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `sla_tiers_defined` | Complete SLA tiers with uptime targets | Tier definitions exist with metrics |
| `latency_slas_defined` | AI response latency commitments per tier | TTFT and completion targets documented |
| `isolation_guarantees_documented` | Tenant isolation SLAs defined | Data, compute, network isolation documented |
| `support_tiers_established` | Support response time commitments | Priority levels and response times defined |
| `breach_remedies_configured` | Credit/refund calculations defined | Penalty formulas and caps documented |
| `monitoring_requirements_defined` | SLA metrics and alerting specified | Metrics catalog and thresholds documented |
| `reporting_obligations_documented` | Customer communication requirements | Report types and schedules defined |
| `feasibility_validated` | SLAs verified as achievable | Gap analysis and stakeholder approvals |
| `contract_templates_generated` | Customer-facing SLA contract complete | Contract documents with all sections |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-SLA1`

### Contributes to: QG-P1 (Production Readiness)
This workflow contributes to QG-P1 by establishing SLA commitments:

| QG-P1 Pattern | This Workflow's Contribution |
|---------------|------------------------------|
| `SLAs defined` | Complete SLA contract with tier-specific targets |
| `SLOs defined` | Service Level Objectives aligned with SLA commitments |
| `Monitoring complete` | Breach detection integrated with observability |
| `Customer contracts` | Customer-facing SLA documentation |
| `Support processes` | Support tier definitions and escalation paths |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-P1`

---

## Workflow Outputs

Upon completion, this workflow produces:

| Output | Description | Location |
|--------|-------------|----------|
| SLA Requirements Matrix | Tier-specific requirements | `{bam_artifacts}/sla-contract/requirements-matrix.md` |
| Uptime Guarantees | Availability targets and exclusions | `{bam_artifacts}/sla-contract/uptime-guarantees.md` |
| Latency SLAs | TTFT, completion, throughput targets | `{bam_artifacts}/sla-contract/latency-slas.md` |
| Isolation Guarantees | Data, compute, network isolation SLAs | `{bam_artifacts}/sla-contract/isolation-guarantees.md` |
| Support Tiers | Response times and escalation paths | `{bam_artifacts}/sla-contract/support-tiers.md` |
| Penalty Clauses | Service credits and termination rights | `{bam_artifacts}/sla-contract/penalty-clauses.md` |
| Monitoring Requirements | Metrics, alerts, dashboards | `{bam_artifacts}/sla-contract/monitoring-requirements.md` |
| Reporting Obligations | Reports, status page, communications | `{bam_artifacts}/sla-contract/reporting-obligations.md` |
| Feasibility Report | Gap analysis and stakeholder approvals | `{bam_artifacts}/sla-contract/feasibility-report.md` |
| Contract Templates | Per-tier SLA contract templates | `{bam_artifacts}/sla-contract/contracts/` |

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `sla-contract`
- **Templates:** `{project-root}/_bmad/bam/data/templates/sla-contract-template.md`
- **Checklists:** `{project-root}/_bmad/bam/data/checklists/production-readiness.md`
- **Related Workflows:**
  - `bmad-bam-sli-slo-definition` - Define SLIs/SLOs aligned with SLA commitments
  - `bmad-bam-tenant-sla-monitoring` - Implement SLA monitoring
  - `bmad-bam-incident-response-operations` - Align incident response with SLA obligations
