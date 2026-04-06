# Section Reference Map

## Purpose

Maps extension guide section numbers to BAM knowledge fragment files.
Use this when a checklist, workflow, or agent references a section number
(e.g., S4.6.1, S28.9) and you need to load the corresponding knowledge.

## Section-to-Fragment Mapping

| Section | Title                             | Fragment File                                                                                                                                                                                                                |
| ------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S4.3    | Modular-Monolith Structure        | ddd-module-patterns.md                                                                                                                                                                                                       |
| S4.4    | Module Boundary Rules             | module-facade-patterns.md                                                                                                                                                                                                    |
| S4.5    | Tenant Context                    | rls-best-practices.md, multi-tenant-patterns.md                                                                                                                                                                              |
| S4.6    | AI Runtime                        | agent-runtime-patterns.md                                                                                                                                                                                                    |
| S4.6.1  | 2026 Agent Execution Architecture | run-contract-patterns.md, context-compiler-patterns.md, action-gateway-patterns.md, agent-resilience-patterns.md, agent-lifecycle-versioning-patterns.md, agent-data-governance-patterns.md, agent-identity-tbac-patterns.md |
| S9.1    | Module Boundary Design            | ddd-module-patterns.md                                                                                                                                                                                                       |
| S9      | Workflow Sequence DAG             | workflow-sequence.md                                                                                                                                                                                                         |
| S9.2    | Tenant Isolation Matrix           | multi-tenant-patterns.md, rls-best-practices.md                                                                                                                                                                              |
| S9.3    | Agent Runtime Architecture        | agent-runtime-patterns.md                                                                                                                                                                                                    |
| S9.3.1  | LLM Model Upgrade Protocol        | ai-model-versioning.md                                                                                                                                                                                                       |
| S21.1   | Layered Architecture              | independent-development.md                                                                                                                                                                                                   |
| S21.5   | Emergency Change Protocol         | independent-development.md, shared-kernel-patterns.md                                                                                                                                                                        |
| S21.6   | Cross-Module Transactions         | saga-orchestration-patterns.md                                                                                                                                                                                               |
| S22     | Facade Contract Specification     | module-facade-patterns.md                                                                                                                                                                                                    |
| S22.4   | Facade Contract Evolution         | module-facade-patterns.md, api-version-routing.md                                                                                                                                                                            |
| S22.6   | Tool Registration Pattern         | tool-execution-middleware.md                                                                                                                                                                                                 |
| S22.7   | REST API Versioning               | api-version-routing.md                                                                                                                                                                                                       |
| S22.8   | Tenant Onboarding                 | saga-orchestration-patterns.md, provisioning-ui-patterns.md                                                                                                                                                                  |
| S22.9   | Tenant Tier Change Orchestration  | saga-orchestration-patterns.md, multi-tenant-patterns.md                                                                                                                                                                     |
| S25.7   | Testing Strategy                  | testing-tenant-isolation.md, testing-multi-tenant-fixtures.md, testing-agent-safety.md                                                                                                                                       |
| S12.2.1 | AI Output Validation Criteria     | testing-agent-safety.md                                                                                                                                                                                                      |
| S27     | Parallel Development              | parallel-development-guide.md                                                                                                                                                                                                |
| S27.5   | Database Migration                | local-development-setup.md                                                                                                                                                                                                   |
| S28.1   | Independent Module Development    | independent-development.md                                                                                                                                                                                                   |
| S28.2   | Parallel Development Guide        | parallel-development-guide.md                                                                                                                                                                                                |
| S28.3   | Module Facade Patterns            | module-facade-patterns.md                                                                                                                                                                                                    |
| S28.4   | Shared Kernel Patterns            | shared-kernel-patterns.md                                                                                                                                                                                                    |
| S28.5   | Event-Driven Patterns             | event-driven-patterns.md                                                                                                                                                                                                     |
| S28.6   | AI Model Versioning               | ai-model-versioning.md                                                                                                                                                                                                       |
| S28.7   | DDD Module Patterns               | ddd-module-patterns.md                                                                                                                                                                                                       |
| S28.8   | RLS Best Practices                | rls-best-practices.md                                                                                                                                                                                                        |
| S28.9   | Agent Runtime Patterns            | agent-runtime-patterns.md                                                                                                                                                                                                    |
| S28.10  | Memory Tier Patterns              | memory-tier-patterns.md                                                                                                                                                                                                      |
| S28.11  | Multi-Tenant Patterns             | multi-tenant-patterns.md                                                                                                                                                                                                     |
| S28.12  | Tool Execution Middleware         | tool-execution-middleware.md                                                                                                                                                                                                 |
| S28.13  | API Version Routing               | api-version-routing.md                                                                                                                                                                                                       |
| S28.14  | Saga Orchestration Patterns       | saga-orchestration-patterns.md                                                                                                                                                                                               |
| S28.15  | Provisioning UI Patterns          | provisioning-ui-patterns.md                                                                                                                                                                                                  |
| S28.16  | Local Development Setup           | local-development-setup.md                                                                                                                                                                                                   |
| S28.17  | Run Contract Patterns             | run-contract-patterns.md                                                                                                                                                                                                     |
| S28.18  | Context Compiler Patterns         | context-compiler-patterns.md                                                                                                                                                                                                 |
| S28.19  | Action Gateway Patterns           | action-gateway-patterns.md                                                                                                                                                                                                   |
| S28.20  | Agent Resilience Patterns         | agent-resilience-patterns.md                                                                                                                                                                                                 |
| S28.21  | Agent Lifecycle Versioning        | agent-lifecycle-versioning-patterns.md                                                                                                                                                                                       |
| S28.22  | Agent Data Governance             | agent-data-governance-patterns.md                                                                                                                                                                                            |
| S28.23  | Agent Identity & TBAC             | agent-identity-tbac-patterns.md                                                                                                                                                                                              |

## Quality Gate Section References

| Quality Gate                   | Sections Referenced        | Fragment Files                                                                                               |
| ------------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Foundation Gate (QG-M1)        | S4.6.1, S13.5, S13.7       | run-contract-patterns.md, action-gateway-patterns.md, context-compiler-patterns.md                           |
| QG-M2 Tenant Isolation         | S4.5, S9.2, S28.8          | rls-best-practices.md, multi-tenant-patterns.md                                                              |
| QG-M3 Agent Runtime            | S4.6, S9.3, S22.6          | agent-runtime-patterns.md, tool-execution-middleware.md                                                      |
| QG-I1 Cross-Module Convergence | S13.2, S13.3, S28.3, S28.5 | module-facade-patterns.md, event-driven-patterns.md, independent-development.md                              |
| QG-I2 Tenant Safety            | S13.1, S28.8, S28.11       | rls-best-practices.md, multi-tenant-patterns.md, testing-tenant-isolation.md                                 |
| QG-I3 Agent Safety             | S9.6, S4.6.1, S28.12       | agent-runtime-patterns.md, action-gateway-patterns.md, tool-execution-middleware.md, testing-agent-safety.md |

## BAM-Specific Knowledge (Not in Extension Guide Sections)

| Fragment File                    | Purpose                                 | Created For                     |
| -------------------------------- | --------------------------------------- | ------------------------------- |
| testing-tenant-isolation.md      | Tenant isolation test patterns          | P2-2 gap (multi-tenant testing) |
| testing-multi-tenant-fixtures.md | Multi-tenant test fixture patterns      | P2-2 gap (multi-tenant testing) |
| testing-agent-safety.md          | Agent safety test patterns              | P2-2 gap (multi-tenant testing) |
| wds-integration-patterns.md      | WDS integration with BAM                | P2-9 gap (WDS integration)      |
| bam-index.csv                    | Topic-to-fragment index                 | P1-12 gap (knowledge index)     |
| workflow-sequence.md             | Workflow execution DAG and dependencies | P1-13 gap (workflow DAG)        |
