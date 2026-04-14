# AI Model Deprecation

**Goal:** Execute the deprecation and migration of AI models in a multi-tenant platform, including tenant impact assessment, migration planning, communication, safe decommissioning, and documentation.

**Phase:** 6 (Operations) - Critical for Operations phase balance

---

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new deprecation plan | `step-01-c-*` through `step-10-c-*` |
| **Edit** | Modify existing deprecation plan | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Check deprecation plan against criteria | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless deprecation plan exists.

### Create Mode
Follow Create steps sequentially: step-01-c → step-02-c → ... → step-10-c

### Edit Mode  
Follow Edit steps: step-10-e-load-deprecation-plan → step-11-e-apply-deprecation-changes

### Validate Mode
Follow Validate steps: step-20-v-load-deprecation-plan → step-21-v-validate-deprecation-plan → step-22-v-generate-report

---

## Create Mode Steps

| Step | File | Description |
|------|------|-------------|
| 1 | `steps/step-01-c-assess-model-usage.md` | Analyze model usage across tenants |
| 2 | `steps/step-02-c-identify-dependent-tenants.md` | Map tenant model dependencies |
| 3 | `steps/step-03-c-evaluate-replacement-models.md` | Identify migration targets |
| 4 | `steps/step-04-c-plan-migration-timeline.md` | Create deprecation schedule |
| 5 | `steps/step-05-c-notify-affected-tenants.md` | Communicate deprecation |
| 6 | `steps/step-06-c-provide-migration-support.md` | Assist tenant migrations |
| 7 | `steps/step-07-c-implement-fallback-routing.md` | Route to replacement models |
| 8 | `steps/step-08-c-monitor-migration-progress.md` | Track tenant migrations |
| 9 | `steps/step-09-c-decommission-deprecated-model.md` | Safe model removal |
| 10 | `steps/step-10-c-document-deprecation.md` | Final deprecation report |

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve:
   - Use `{user_name}` for greeting
   - Use `{communication_language}` for all communications
   - Use `{document_output_language}` for output documents
   - Use `{planning_artifacts}` for output location
   - Use `{project_knowledge}` for additional context scanning

2. **Load BAM config** and resolve:
   - Use `{ai_runtime}` for AI framework considerations
   - Use `{tenant_model}` for tenant-specific migration considerations
   - Use `{bam_artifacts}` for BAM-specific outputs

3. **Load project context** - Search for `**/project-context.md`.
   If found, load as foundational reference including BAM configuration section.

4. **Web Research Optional**
   Web search can help find current model deprecation best practices.
   Search queries: "AI model deprecation SaaS {date}", "LLM migration patterns multi-tenant {date}"

5. **EXECUTION**
   Read fully and follow: `./steps/step-01-c-assess-model-usage.md` to begin.

---

## Prerequisites

- **Required artifacts:** Master architecture document, AI runtime architecture
- **Required gates passed:** QG-F1 (Foundation Gate)
- **Config required:** `{ai_runtime}`, `{tenant_model}`

---

## Quality Gates

### Entry Gate
- QG-F1 (Foundation Gate) must pass before entering this workflow

### Exit Gate: QG-DEP1 (Model Deprecation Gate)
This workflow produces artifacts that satisfy model deprecation requirements. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `usage_inventory_complete` | Complete model usage inventory across tenants | Usage analysis document exists |
| `tenant_dependencies_mapped` | All tenant dependencies identified and categorized | Dependency matrix complete |
| `replacement_models_validated` | Replacement models tested and approved | Validation report exists |
| `migration_timeline_approved` | Migration schedule with milestones | Timeline document signed off |
| `tenant_communication_complete` | All tenants notified per tier requirements | Communication log complete |
| `migration_support_provided` | Support infrastructure operational | Support metrics captured |
| `fallback_routing_implemented` | Traffic routing to replacement models | Routing tests passed |
| `migration_progress_tracked` | Real-time migration tracking operational | Dashboard accessible |
| `deprecated_model_decommissioned` | Model safely removed from infrastructure | Decommission verification passed |
| `deprecation_documented` | Final report with lessons learned | Report published |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-DEP1`

### Contributes to: QG-P1 (Production Readiness)
This workflow contributes to QG-P1 by ensuring model lifecycle management:

| QG-P1 Pattern | This Workflow's Contribution |
|---------------|------------------------------|
| `model-lifecycle` | Complete deprecation plan with migration path |
| `tenant-communication` | Communication plan with tier-specific messaging |
| `rollback-strategy` | Documented rollback procedures and fallback routing |
| `testing-complete` | Migration testing with acceptance criteria |
| `operations-runbook` | Decommission runbook with verification |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-P1`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `ai-runtime`
- **Patterns:** Load from `{project-root}/_bmad/bam/data/ai-runtimes.csv`
- **Templates:** `{project-root}/_bmad/bam/templates/ai-model-deprecation-plan-template.md`
- **Templates:** `{project-root}/_bmad/bam/templates/deprecation-report-template.md`
- **Checklists:** `{project-root}/_bmad/bam/checklists/qg-m3-agent-runtime.md`
