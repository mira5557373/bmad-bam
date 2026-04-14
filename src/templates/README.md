# BAM Templates

## Overview

424 templates for documenting multi-tenant AI SaaS architecture decisions, contracts, runbooks, and platform components.

> **Note:** This README provides a categorized overview of key templates. See individual template files for complete documentation with Web Research Queries and Verification Checklists.

## Template Types

### Architecture Templates
- `master-architecture-template.md` - Master platform architecture
- `module-architecture-template.md` - Module architecture
- `agent-runtime-architecture-template.md` - AI agent runtime architecture
- `module-context-template.md` - Module bounded context

### Contract Templates
- `facade-contract-template.md` - Facade contract specification
- `tool-contract-template.md` - Tool contract specification
- `internal-contract-spec.md` - Internal contract specification
- `tool-definition-template.md` - Tool definition
- `tool-inventory-template.md` - Tool inventory

### Migration Templates
- `facade-migration-template.md` - Facade migration planning
- `mismatch-recovery-template.md` - Contract mismatch recovery

### Epic and Story Templates
- `module-epic-template.md` - Module epic template
- `story-template.md` - User story template
- `cross-module-story-template.md` - Cross-module stories

### Runbook Templates
- `onboarding-runbook-template.md` - Tenant onboarding
- `offboarding-runbook-template.md` - Tenant offboarding
- `rollback-plan-template.md` - Rollback procedures
- `playbook-template.md` - Operations playbook

### Report Templates
- `quality-gate-report-template.md` - Quality gate reports
- `convergence-report-template.md` - Convergence reports
- `ai-eval-report-template.md` - AI evaluation reports
- `module-validation-report-template.md` - Validation reports
- `execution-context-report-template.md` - Execution context

### Assessment Templates
- `complexity-assessment-template.md` - Complexity assessment
- `security-assessment-template.md` - Security assessment
- `requirement-summary-template.md` - Requirement summary

### Specification Templates
- `context-propagation-spec.md` - Context propagation
- `logging-spec.md` - Logging specification
- `metering-event-spec.md` - Metering events
- `code-pattern-spec.md` - Code patterns

### Tenant Templates
- `tenant-lifecycle-template.md` - Tenant lifecycle
- `tenant-isolation-matrix.md` - Isolation matrix
- `tenant-tier-matrix.md` - Tier matrix

### Sidecar Templates
- `sidecar-architecture-decisions.md` - Architecture decisions
- `sidecar-runtime-preferences.md` - Runtime preferences
- `sidecar-contract-history.md` - Contract history

### Operations Templates
- `incident-response-template.md` - Incident response
- `postmortem-template.md` - Postmortem analysis
- `escalation-template.md` - Escalation procedures
- `disaster-recovery-plan-template.md` - DR planning
- `capacity-planning-template.md` - Capacity planning
- `change-request-template.md` - Change requests
- `emergency-change-template.md` - Emergency changes

### Compliance Templates
- `compliance-checklist-template.md` - Compliance checklist
- `sla-definition-template.md` - SLA definitions
- `cost-allocation-template.md` - Cost allocation

### Release Templates
- `api-version-release-template.md` - API version releases
- `api-release-notes-template.md` - Release notes

### Supporting Files
- `foundation-scaffold-template.md` - Foundation scaffold
- `evolution-backlog-template.md` - Evolution backlog
- `rls-policy.sql` - RLS policy SQL template
- `sprint-status-template.yaml` - Sprint status YAML

## Format

All markdown templates include:
- YAML frontmatter with `name` and `description`
- `## Purpose` section explaining when to use
- `{{placeholder}}` variables for customization

## Usage

Templates are loaded in workflow steps via:
```
**Load template:** `{project-root}/_bmad/bam/templates/{template}.md`
```
