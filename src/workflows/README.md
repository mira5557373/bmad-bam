# BAM Workflows

## Overview

BAM provides 191 workflows organized by domain for multi-tenant AI SaaS development.

## Directory Structure

- `foundation/` - Master architecture, scaffolding, validation
- `module/` - Module architecture, epics, validation
- `integration/` - Facade contracts, cross-module stories
- `ingestion/` - Requirement ingestion, complexity triage
- `utility/` - List tools and other utilities
- Top-level workflows for tenant, AI runtime, and platform operations

## Workflow Categories

### Foundation (3 workflows)
- `create-master-architecture` - Define master platform architecture
- `scaffold-foundation` - Generate foundation structure
- `validate-foundation` - Validate foundation artifacts

### Module (3 workflows)
- `create-module-architecture` - Define module bounded context
- `create-module-epics` - Generate module epics and stories
- `validate-module` - Validate module artifacts

### Integration (4 workflows)
- `define-facade-contract` - Create facade contracts
- `evolve-facade-contract` - Update existing contracts
- `facade-mismatch-recovery` - Handle contract mismatches
- `validate-tool-contract` - Validate tool contracts

### Ingestion (2 workflows)
- `requirement-ingestion` - Ingest and analyze requirements
- `triage-module-complexity` - Assess module complexity

### Utility (1 workflow)
- `list-tools` - List available tools

### Platform Operations (6 workflows)
- `agent-runtime-architecture` - AI agent runtime design
- `ai-agent-debug` - Agent debugging workflows
- `ai-eval-safety-design` - AI evaluation and safety
- `api-version-release` - API versioning and releases
- `convergence-verification` - Cross-module convergence
- `cross-module-story` - Cross-module user stories

### Tenant Operations (4 workflows)
- `tenant-model-isolation` - Tenant data isolation
- `tenant-onboarding-design` - Onboarding runbooks
- `tenant-offboarding-design` - Offboarding runbooks
- `tenant-aware-observability` - Observability patterns

### Additional (2 workflows)
- `internal-contract-design` - Internal contract specification
- `module-boundary-design` - Module boundary definition
- `master-architecture-emergency-change` - Emergency changes
- `usage-metering-design` - Usage metering patterns

## Workflow Pattern

Each workflow follows the CEV (Create/Edit/Validate) pattern with unified `steps/` directory:
- `steps/step-01-c-*` through `step-09-c-*` - Create mode steps
- `steps/step-10-e-*` through `step-11-e-*` - Edit mode steps (load-existing, apply-changes)
- `steps/step-20-v-*` through `step-22-v-*` - Validate mode steps (load-artifact, validate, report)

## Key Files

- `bmad-skill-manifest.yaml` - Workflow metadata
- `SKILL.md` - Full workflow documentation
- `workflow.md` - Mode selection guide
- `workflow.yaml` - Workflow configuration
