# Agent→Workflow Ownership Mapping

> **Single source of truth** for CSV routing, SKILL.md persona, agent YAML `workflows` section, and agent SKILL.md Capabilities table.
>
> All 27 BAM workflows are mapped to exactly one of 3 BAM agents. No workflow is unowned; no workflow has multiple owners.

## Ownership Table

| Workflow Skill Name | Display Name | Owning Agent | Agent Persona | Domain |
|---|---|---|---|---|
| bmad-bam-create-master-architecture | Create Master Architecture | Platform Architect (Atlas) | Platform Architect | foundation |
| bmad-bam-scaffold-foundation | Scaffold Foundation | Platform Architect (Atlas) | Platform Architect | foundation |
| bmad-bam-validate-foundation | Validate Foundation | Platform Architect (Atlas) | Platform Architect | foundation |
| bmad-bam-create-module-architecture | Create Module Architecture | Platform Architect (Atlas) | Platform Architect | module |
| bmad-bam-create-module-epics | Create Module Epics | Platform Architect (Atlas) | Platform Architect | module |
| bmad-bam-validate-module | Validate Module | Platform Architect (Atlas) | Platform Architect | module |
| bmad-bam-module-boundary-design | Module Boundary Design | Platform Architect (Atlas) | Platform Architect | module |
| bmad-bam-tenant-model-isolation | Tenant Model Isolation | Platform Architect (Atlas) | Platform Architect | tenant |
| bmad-bam-tenant-onboarding-design | Tenant Onboarding Design | Platform Architect (Atlas) | Platform Architect | tenant |
| bmad-bam-tenant-offboarding-design | Tenant Offboarding Design | Platform Architect (Atlas) | Platform Architect | tenant |
| bmad-bam-tenant-aware-observability | Tenant-Aware Observability | Platform Architect (Atlas) | Platform Architect | tenant |
| bmad-bam-usage-metering-design | Usage Metering Design | Platform Architect (Atlas) | Platform Architect | platform-ops |
| bmad-bam-requirement-ingestion | Requirement Ingestion | Platform Architect (Atlas) | Platform Architect | platform-ops |
| bmad-bam-triage-module-complexity | Module Complexity Triage | Platform Architect (Atlas) | Platform Architect | platform-ops |
| bmad-bam-api-version-release | API Version Release | Platform Architect (Atlas) | Platform Architect | platform-ops |
| bmad-bam-master-architecture-emergency-change | Master Architecture Emergency Change | Platform Architect (Atlas) | Platform Architect | foundation |
| bmad-bam-define-facade-contract | Define Facade Contract | Integration Architect (Kai) | Integration Architect | integration |
| bmad-bam-evolve-facade-contract | Evolve Facade Contract | Integration Architect (Kai) | Integration Architect | integration |
| bmad-bam-facade-mismatch-recovery | Facade Mismatch Recovery | Integration Architect (Kai) | Integration Architect | integration |
| bmad-bam-internal-contract-design | Internal Contract Design | Integration Architect (Kai) | Integration Architect | integration |
| bmad-bam-cross-module-story | Cross-Module Story | Integration Architect (Kai) | Integration Architect | integration |
| bmad-bam-convergence-verification | Convergence Verification | Integration Architect (Kai) | Integration Architect | integration |
| bmad-bam-agent-runtime-architecture | Agent Runtime Architecture | AI Runtime Architect (Nova) | AI Runtime Architect | ai-runtime |
| bmad-bam-ai-eval-safety-design | AI Eval Safety Design | AI Runtime Architect (Nova) | AI Runtime Architect | ai-runtime |
| bmad-bam-validate-tool-contract | Validate Tool Contract | AI Runtime Architect (Nova) | AI Runtime Architect | ai-runtime |
| bmad-bam-ai-agent-debug | AI Agent Debug | AI Runtime Architect (Nova) | AI Runtime Architect | ai-runtime |
| bmad-bam-list-tools | List Tools | AI Runtime Architect (Nova) | AI Runtime Architect | ai-runtime |

## Summary

| Owning Agent | Workflow Count | Core Domain |
|---|---|---|
| Platform Architect (Atlas) | 16 | Foundation, module lifecycle, tenant model, platform ops |
| Integration Architect (Kai) | 6 | Facade contracts, cross-module integration, convergence |
| AI Runtime Architect (Nova) | 5 | Agent runtime, eval/safety, tools, debug |
| **Total** | **27** | |

## Usage

This table is the canonical reference for:

- **module-help.csv** — the `skill` column maps to `Workflow Skill Name`; agent routing derives from `Owning Agent`
- **Workflow SKILL.md persona** — the `Act as` line uses `Agent Persona` with a task-specific qualifier
- **Agent YAML `workflows` section** — each agent lists only the workflows in its ownership set
- **Agent SKILL.md Capabilities table** — the `Skill` column lists owned `Workflow Skill Name` values
