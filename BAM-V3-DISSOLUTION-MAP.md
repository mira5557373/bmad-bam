# BAM v3 — Skill Dissolution Map

**Phase 3 deliverable for Wave 2 of `BAM-V3-PURE-KB-PLAN.md`**
**Date:** 2026-05-04

This document maps each of the 38 BAM v2 skills to its v3 disposition.

---

## Disposition Categories

- 🟢 **RETAIN** — genuinely BAM-specific workflow, no BMAD equivalent (5 skills)
- 🔵 **RENAME** — keep but rename to v3 conventions (none)
- 🔴 **DELETE → KB** — pure data, dissolves into `data/patterns/` and `project-context.md` (29 skills)
- 🟡 **DELETE → CUSTOMIZE-TEMPLATE** — workflow exists in BMAD; ship a customize template instead (3 skills)
- 🟠 **DELETE → RUNBOOK** — operational procedure, becomes `data/runbooks/<name>.md` (1 skill)

---

## The Five Retained Skills (🟢)

These five workflows have **no BMAD equivalent** and remain as BAM-specific skills.

| Skill | Why Retained |
|---|---|
| `bmad-bam-master-architecture` | Tenant-aware top-level architecture overlay. The canonical BAM entry point. |
| `bmad-bam-tenant-onboarding` | Multi-tenant lifecycle workflow. BMAD has no tenant concept. |
| `bmad-bam-tenant-offboarding` | Mirror of onboarding, with GDPR right-to-deletion. |
| `bmad-bam-mcp` | MCP server lifecycle + tool federation. BMAD has no MCP workflow. (Will be renamed to `bmad-bam-mcp-server-config` in Phase 4.) |
| `bmad-bam-rag` | RAG pipeline design + multi-tenant vector stores. BMAD has no RAG workflow. (Will be renamed to `bmad-bam-rag-pipeline-design` in Phase 4.) |

---

## The 33 Dissolved Skills

### → DELETE → KB (29 skills)
These skills are pure pattern documentation. Their content lives in `data/patterns/`, `data/checklists/`, and `_bmad/bam/project-context.md`. BMAD skills auto-load this via the universal glob.

| Skill | Replaced By (in `data/patterns/`) |
|---|---|
| `bmad-bam-agent-debug` | `data/patterns/agent-handoff-protocol.md`, `agent-orchestration.md` |
| `bmad-bam-agent-runtime` | `data/patterns/agent-orchestration.md`, `runtime-loops.md`, `state-management.md` |
| `bmad-bam-agent-tracing` | `data/patterns/reasoning-trace-collector.md`, `ai-observability.md` |
| `bmad-bam-api-versioning` | `data/patterns/tool-schema-versioning.md`, `api-integration.md` |
| `bmad-bam-auth-integration` | `data/patterns/sso-auth.md`, `sso-integration.md` |
| `bmad-bam-billing` | `data/patterns/cost-attribution-engine.md`, plus 4 monetization patterns |
| `bmad-bam-caching` | `data/patterns/cache-invalidation.md` |
| `bmad-bam-compliance` | `data/patterns/compliance-reporting.md`, `regulatory-clock-engine.md` |
| `bmad-bam-convergence` | `data/checklists/qg-i1-convergence.md` (already exists) |
| `bmad-bam-cross-module-story` | `data/checklists/qg-i1-convergence.md` |
| `bmad-bam-data-residency` | `data/patterns/data-residency.md` |
| `bmad-bam-events` | `data/patterns/event-driven-agents.md` |
| `bmad-bam-facade-contract` | `data/patterns/action-contract.md`, plus integration patterns |
| `bmad-bam-governance` | `data/patterns/access-reviews.md`, plus governance patterns |
| `bmad-bam-llm-versioning` | (covered by `data/patterns/fine-tuning-pipeline.md`) |
| `bmad-bam-memory-tiers` | (covered by Nova persona + agent-memory patterns) |
| `bmad-bam-module-architecture` | (covered by retained `master-architecture` skill) |
| `bmad-bam-module-epics` | (covered by BMAD's `bmad-create-epics` + customize-template) |
| `bmad-bam-observability` | `data/patterns/ai-observability.md`, `output-drift-monitor.md`, `invisible-failure-detector.md` |
| `bmad-bam-platform` | `data/patterns/agent-marketplace.md`, `plugin-architecture.md` |
| `bmad-bam-privacy-compliance` | `data/patterns/anonymization.md`, `consent-management.md`, `gdpr-compliance.md`, `right-to-deletion.md` |
| `bmad-bam-production-readiness` | `data/checklists/production-readiness.md` (already exists) |
| `bmad-bam-resilience` | `data/patterns/circuit-breaker.md`, `fanout-circuit-breaker.md` |
| `bmad-bam-scaling` | `data/patterns/predictive-scaling.md`, `vertical-scaling.md`, `geo-distribution.md` |
| `bmad-bam-security` | `data/patterns/zero-trust.md`, `semantic-firewall.md`, `secret-leak-detector.md` |
| `bmad-bam-security-operations` | `data/patterns/incident-response.md`, `kill-switch-registry.md`, `incident-correlation-engine.md` |
| `bmad-bam-tenant-isolation` | `data/patterns/tenant-isolation.md`, `tenant-chaos-injector.md` |
| `bmad-bam-testing` | `data/patterns/tenant-chaos-injector.md`, `testing-isolation.md` |
| `bmad-bam-tool-contracts` | `data/patterns/tool-execution.md`, `tool-permission-model.md`, `tool-sbom-registry.md` |

### → DELETE → CUSTOMIZE-TEMPLATE (3 skills)
These workflows exist in BMAD but BAM enriches them. Ship a `data/customize-templates/<bmad-skill>.toml.example` for users to opt in via `bmad-customize`.

| BAM Skill | Maps to BMAD Skill | Customize Template |
|---|---|---|
| `bmad-bam-requirements` | `bmad-create-prd` | `data/customize-templates/bmad-create-prd.toml.example` |
| `bmad-bam-research` | `bmad-create-prd` (research mode) | (same template) |
| `bmad-bam-triage` | `bmad-correct-course` | `data/customize-templates/bmad-correct-course.toml.example` |

### → DELETE → RUNBOOK (1 skill)
This is operational procedure documentation, not a workflow.

| BAM Skill | Becomes |
|---|---|
| `bmad-bam-white-labeling` | `data/runbooks/white-labeling-checklist.md` |

---

## Sanity Check: Math

- 38 BAM v2 skills total
- 5 retained 🟢
- 29 dissolved → KB 🔴
- 3 dissolved → customize-template 🟡
- 1 dissolved → runbook 🟠
- **Total: 5 + 29 + 3 + 1 = 38 ✓**

---

## Execution Plan (Phase 3)

1. Delete the 33 skill directories from `src-v2/skills/`
2. Rename `bmad-bam-mcp` → `bmad-bam-mcp-server-config`
3. Rename `bmad-bam-rag` → `bmad-bam-rag-pipeline-design`
4. Update `src-v2/skills/bmad-bam-master-architecture/customize.toml` to load relevant patterns via `persistent_facts`
5. Same for `tenant-onboarding`, `tenant-offboarding`, `mcp-server-config`, `rag-pipeline-design`
6. Update `module-help.csv` to reflect new skill set
7. Re-run validator on the 5 retained skills (target: zero CRITICAL/HIGH)

---

## Reverse-Lookup: KB Coverage Verification

The 33 dissolved skills' knowledge MUST be preserved somewhere. This lookup confirms it is.

| Knowledge Area (was a skill) | Lives now in |
|---|---|
| Multi-tenant agent debugging | `data/patterns/agent-handoff-protocol.md`, Nova persona |
| AI agent runtime selection | `data/patterns/agent-orchestration.md`, `runtime-loops.md`, Nova persona |
| Reasoning traces / observability | `data/patterns/reasoning-trace-collector.md`, `ai-observability.md` |
| API versioning strategies | `data/patterns/tool-schema-versioning.md`, `api-integration.md` |
| SSO / auth integration | `data/patterns/sso-auth.md`, `sso-integration.md` |
| Usage metering / billing | `data/patterns/cost-attribution-engine.md`, `usage-analytics.md`, `pricing-strategies.md` |
| Cache invalidation strategies | `data/patterns/cache-invalidation.md` |
| Compliance reporting | `data/patterns/compliance-reporting.md`, `regulatory-clock-engine.md` |
| Cross-module convergence | `data/checklists/qg-i1-convergence.md` |
| Data residency / sovereignty | `data/patterns/data-residency.md` |
| Event-driven architecture | `data/patterns/event-driven-agents.md` |
| Facade contracts | `data/patterns/action-contract.md` |
| Governance / access reviews | `data/patterns/access-reviews.md` |
| LLM versioning / fine-tuning | `data/patterns/fine-tuning-pipeline.md` |
| Memory tiers (working/episodic/semantic) | Nova persona, `data/patterns/agent-orchestration.md` |
| Module architecture | retained: `bmad-bam-master-architecture` skill |
| Module epics | BMAD's `bmad-create-epics` + customize-template |
| AI observability | `data/patterns/ai-observability.md`, `output-drift-monitor.md`, `invisible-failure-detector.md` |
| Platform / marketplace | `data/patterns/agent-marketplace.md`, `plugin-architecture.md` |
| Privacy compliance (GDPR) | `data/patterns/anonymization.md`, `consent-management.md`, `gdpr-compliance.md`, `right-to-deletion.md` |
| Production readiness gate | `data/checklists/production-readiness.md` |
| Resilience patterns | `data/patterns/circuit-breaker.md`, `fanout-circuit-breaker.md` |
| Scaling strategies | `data/patterns/predictive-scaling.md`, `vertical-scaling.md`, `geo-distribution.md` |
| Security operations | `data/patterns/incident-response.md`, `kill-switch-registry.md`, `incident-correlation-engine.md` |
| Security architecture | `data/patterns/zero-trust.md`, `semantic-firewall.md`, `secret-leak-detector.md` |
| Tenant isolation | `data/patterns/tenant-isolation.md`, `tenant-chaos-injector.md` |
| Testing strategies | `data/patterns/tenant-chaos-injector.md`, `testing-isolation.md` |
| Tool contracts | `data/patterns/tool-execution.md`, `tool-permission-model.md`, `tool-sbom-registry.md` |
| Requirements analysis | BMAD's `bmad-create-prd` + customize-template |
| Research workflows | BMAD's `bmad-create-prd` + customize-template |
| Triage workflows | BMAD's `bmad-correct-course` + customize-template |
| White-labeling ops | `data/runbooks/white-labeling-checklist.md` |

✅ **All 33 dissolved knowledge areas have a documented home in v3.**

---

*Phase 3 will now execute these deletions/renames and update the 5 retained skills' `customize.toml` to load relevant patterns.*