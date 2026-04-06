# Workflow Reference

BAM provides 27 workflows organized by phase.

## Foundation Phase

| Code | Workflow | Description | Owner |
|------|----------|-------------|-------|
| CMAR | create-master-architecture | Create frozen master architecture | Atlas |
| SF | scaffold-foundation | Generate project scaffolding | Atlas |
| VF | validate-foundation | Validate against QG-F1 | Atlas |

## Module Phase

| Code | Workflow | Description | Owner |
|------|----------|-------------|-------|
| CMA | create-module-architecture | Design module bounded context | Atlas |
| CME | create-module-epics | Generate epic stories | Atlas |
| VM | validate-module | Validate against QG-M1/M2/M3 | Atlas |
| MBD | module-boundary-design | Define module boundaries | Atlas |
| TMI | tenant-model-isolation | Design isolation strategy | Atlas |

## Ingestion Phase

| Code | Workflow | Description | Owner |
|------|----------|-------------|-------|
| RI | requirement-ingestion | Ingest and map requirements | Atlas |
| TMC | triage-module-complexity | Assess and assign complexity | Atlas |

## Integration Phase

| Code | Workflow | Description | Owner |
|------|----------|-------------|-------|
| DFC | define-facade-contract | Create facade contract | Kai |
| EFC | evolve-facade-contract | Evolve with versioning | Kai |
| FMR | facade-mismatch-recovery | Recover from mismatches | Kai |
| VTC | validate-tool-contract | Validate tool contracts | Kai |
| CV | convergence-verification | Verify cross-module integration | Kai |
| ICD | internal-contract-design | Design internal contracts | Kai |
| CMS | cross-module-story | Create cross-module stories | Kai |

## AI Runtime Phase

| Code | Workflow | Description | Owner |
|------|----------|-------------|-------|
| ARA | agent-runtime-architecture | Design agent orchestration | Nova |
| AED | ai-eval-safety-design | Design safety evaluation | Nova |
| AAD | ai-agent-debug | Debug agent issues | Nova |

## Tenant Lifecycle Phase

| Code | Workflow | Description | Owner |
|------|----------|-------------|-------|
| TOD | tenant-onboarding-design | Design provisioning | Atlas |
| TOFD | tenant-offboarding-design | Design deprovisioning | Atlas |
| TAO | tenant-aware-observability | Design monitoring | Atlas |
| UMD | usage-metering-design | Design usage tracking | Atlas |

## Release Phase

| Code | Workflow | Description | Owner |
|------|----------|-------------|-------|
| AVR | api-version-release | Manage API versions | Kai |
| MAEC | master-architecture-emergency-change | Emergency changes | Atlas |

## Utility

| Code | Workflow | Description | Owner |
|------|----------|-------------|-------|
| LT | list-tools | List available BAM tools | Any |

---

## Workflow Structure

Each workflow follows the CEV pattern:

```
workflow-name/
├── bmad-skill-manifest.yaml   # Skill definition
├── SKILL.md                   # Full instructions
├── workflow.md                # Mode selection
├── workflow.yaml              # Configuration
├── steps-c/                   # Create mode
│   ├── 01-first-step.md
│   ├── 02-second-step.md
│   └── ...
├── steps-e/                   # Edit mode
│   ├── 01-load-existing.md
│   └── 02-apply-changes.md
└── steps-v/                   # Validate mode
    ├── 01-load-artifact.md
    └── 02-validate.md
```

## Mode Selection

| Mode | Use When |
|------|----------|
| Create | Starting fresh, no existing artifact |
| Edit | Modifying existing artifact |
| Validate | Checking quality criteria |

## Quality Gate Mapping

| Gate | Triggering Workflow |
|------|---------------------|
| QG-F1 | validate-foundation |
| QG-M1 | validate-module (architecture) |
| QG-M2 | validate-module (isolation) |
| QG-M3 | validate-module (readiness) |
| QG-I1 | convergence-verification |
| QG-I2 | convergence-verification |
| QG-I3 | ai-eval-safety-design |
| QG-P1 | All above pass |

## Workflow Dependencies

```
requirement-ingestion
        │
        ▼
triage-module-complexity
        │
        ▼
create-master-architecture ──► validate-foundation (QG-F1)
        │
        ▼
┌───────┴───────┐
│               │
▼               ▼
module-boundary  tenant-model-isolation
        │               │
        └───────┬───────┘
                ▼
create-module-architecture ──► validate-module (QG-M1/M2/M3)
                │
                ▼
        ┌───────┴───────┐
        │               │
        ▼               ▼
define-facade    agent-runtime
        │               │
        └───────┬───────┘
                ▼
convergence-verification ──► (QG-I1/I2/I3)
                │
                ▼
        PRODUCTION (QG-P1)
```
