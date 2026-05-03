# BAM V2 BMAD Template Compatibility Design

**Date:** 2026-05-03  
**Status:** Draft  
**Author:** Claude (assisted)  
**Stakeholder:** Ajay

---

## Executive Summary

This document defines the architecture for full BMAD Method v6.4.0+ workflow integration of BAM V2 templates. The design enables BAM templates to participate in BMAD's step-by-step workflows with resume capability and progress tracking.

**Key Decisions:**
1. **Three-tier template architecture:** Standards, Artifact-Dependency, Skill-Owned
2. **Full skill encapsulation:** Templates move to per-skill `templates/` directories
3. **BMAD-compatible frontmatter:** All templates gain workflow state fields
4. **Four new skills:** `bmad-bam-mcp`, `bmad-bam-rag`, `bmad-bam-governance`, `bmad-bam-platform`

**Scope:** 48 templates, 34 existing skills, 4 new skills, 3 standards

---

## Problem Statement

BAM V2 templates are **syntactically compatible** with BMAD (both use `{{variable}}` placeholders) but **workflow-incompatible**:

| Gap | Impact |
|-----|--------|
| Missing `stepsCompleted: []` | Cannot track workflow progress |
| Missing `inputDocuments: []` | Cannot track input artifacts |
| Missing `workflowType:` | Cannot route to correct workflow |
| Centralized templates | Violates BMAD skill encapsulation |
| Shared template confusion | Unclear ownership and change management |

---

## Design Goals

1. **Full BMAD workflow integration** with resume capability
2. **Maximize BMAD compatibility** by adopting conventions fully
3. **Move templates to per-skill directories** for encapsulation
4. **Template-first migration** (Phase 1: frontmatter, Phase 2: restructure)
5. **No content splitting** between skills

---

## Template Classification

### Analysis Method

Templates were classified by analyzing PRODUCE vs CONSUME references:
- **PRODUCE:** Skill loads template to create output (`Load template:`)
- **CONSUME:** Skill reads output artifact as prerequisite (`{output_folder}/...`)

### Classification Results

| Type | Count | Definition | Destination |
|------|-------|------------|-------------|
| FORMAT_STANDARD | 3 | Multiple skills PRODUCE using same template | `data/standards/` |
| ARTIFACT_DEPENDENCY | 7 | ONE skill PRODUCES, many CONSUME output | Producer skill's `templates/` |
| SKILL_OWNED | 24 | 1:1 mapping to single skill | Owning skill's `templates/` |
| ORPHAN | 14 | No skill references | Assign to skills or create new |

---

## Architecture

### Directory Structure

```
src-v2/
├── data/
│   ├── standards/                              # OUTPUT CONTRACTS (NEW)
│   │   ├── std-validation-report.md            # 12 producer skills
│   │   ├── std-convergence-report.md           # 2 producer skills
│   │   └── std-gate-checklist.md               # All QG skills
│   │
│   ├── templates/                              # DEPRECATED after migration
│   │   └── .gitkeep
│   │
│   ├── patterns/                               # UNCHANGED
│   ├── checklists/                             # UNCHANGED
│   └── domains/                                # UNCHANGED
│
└── skills/
    └── bmad-bam-{skill}/
        └── templates/                          # SKILL-OWNED
            └── {template}.md
```

### Frontmatter Schema

#### BMAD-Compatible BAM Template Schema

```yaml
---
# BMAD WORKFLOW STATE (required)
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-{skill-name}'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# For research-style templates only:
# lastStep: 1
# web_research_enabled: true
# source_verification: true

# BAM EXTENSIONS (namespaced)
bam_name: {template-name}
bam_description: {description}
bam_category: {category}
bam_version: 2.0.0
bam_type: template
bam_related_patterns: []  # Only for templates that have this
---
```

#### Standard Template Schema

```yaml
---
# BMAD workflow state
stepsCompleted: []
inputDocuments: []
workflowType: 'standard'

# Standard metadata
type: standard
standard_version: 2.0.0
consumers: [all-qg-skills]
breaking_change_policy: semver

# BAM extensions
bam_name: std-{name}
bam_description: {description}
bam_category: quality
---
```

---

## Template Assignments

### FORMAT_STANDARD Templates (3)

| Current Name | New Name | Producers | Purpose |
|--------------|----------|-----------|---------|
| `validation-report.md` | `std-validation-report.md` | 12 skills | All QG validation outputs |
| `convergence-report.md` | `std-convergence-report.md` | 2 skills | Convergence/triage outputs |
| `gate-checklist.md` | `std-gate-checklist.md` | All QG skills | Gate checklist format |

### ARTIFACT_DEPENDENCY Templates (7)

| Template | Producer Skill | Consumer Count |
|----------|----------------|----------------|
| `master-architecture.md` | `bmad-bam-master-architecture` | 81 refs |
| `tenant-isolation.md` | `bmad-bam-tenant-isolation` | 26 refs |
| `agent-runtime.md` | `bmad-bam-agent-runtime` | ~10 refs |
| `billing-design.md` | `bmad-bam-billing` | 18 refs |
| `testing-strategy.md` | `bmad-bam-testing` | 22 refs |
| `module-architecture.md` | `bmad-bam-module-architecture` | ~7 refs |
| `facade-contract.md` | `bmad-bam-facade-contract` | ~6 refs |

### SKILL_OWNED Templates (24)

| Template | Owner Skill |
|----------|-------------|
| `agent-debug-report.md` | `bmad-bam-agent-debug` |
| `agent-trace.md` | `bmad-bam-agent-tracing` |
| `api-version.md` | `bmad-bam-api-versioning` |
| `auth-integration.md` | `bmad-bam-auth-integration` |
| `caching-strategy.md` | `bmad-bam-caching` |
| `compliance-mapping.md` | `bmad-bam-compliance` |
| `cross-module-story.md` | `bmad-bam-cross-module-story` |
| `data-residency.md` | `bmad-bam-data-residency` |
| `disaster-recovery-plan.md` | `bmad-bam-resilience` |
| `event-architecture.md` | `bmad-bam-events` |
| `llm-version.md` | `bmad-bam-llm-versioning` |
| `memory-tier.md` | `bmad-bam-memory-tiers` |
| `module-epic.md` | `bmad-bam-module-epics` |
| `observability-design.md` | `bmad-bam-observability` |
| `production-readiness.md` | `bmad-bam-production-readiness` |
| `requirements-analysis.md` | `bmad-bam-requirements` |
| `research-findings.md` | `bmad-bam-research` |
| `runbook.md` | `bmad-bam-observability` |
| `scaling-design.md` | `bmad-bam-scaling` |
| `security-architecture.md` | `bmad-bam-security` |
| `tenant-offboarding.md` | `bmad-bam-tenant-offboarding` |
| `tenant-onboarding.md` | `bmad-bam-tenant-onboarding` |
| `tool-contract.md` | `bmad-bam-tool-contracts` |
| `white-label-config.md` | `bmad-bam-white-labeling` |

### ORPHAN Templates (14) — Assignments

| Template | Assigned Skill | Rationale |
|----------|----------------|-----------|
| `capacity-plan.md` | `bmad-bam-scaling` | Capacity is part of scaling |
| `cost-model.md` | `bmad-bam-billing` | Cost model is billing-adjacent |
| `decision-log.md` | **NEW: `bmad-bam-governance`** | ADRs need dedicated governance skill |
| `gdpr-compliance-report.md` | `bmad-bam-privacy-compliance` | GDPR is privacy |
| `hipaa-compliance-report.md` | `bmad-bam-privacy-compliance` | HIPAA is privacy |
| `incident-response.md` | `bmad-bam-security-operations` | Incidents are SecOps |
| `integration-test-plan.md` | `bmad-bam-testing` | Testing strategy |
| `migration-plan.md` | `bmad-bam-resilience` | Migrations are resilience |
| `platform-architecture.md` | **NEW: `bmad-bam-platform`** | Platform needs dedicated skill |
| `rollback-plan.md` | `bmad-bam-resilience` | Rollback is resilience |
| `sla-definition.md` | `bmad-bam-production-readiness` | SLAs are prod requirement |
| `soc2-audit-report.md` | `bmad-bam-compliance` | SOC2 is compliance |
| `mcp-server-config.md` | **NEW: `bmad-bam-mcp`** | Create new skill |
| `rag-pipeline-config.md` | **NEW: `bmad-bam-rag`** | Create new skill |

---

## New Skills

### bmad-bam-mcp

**Purpose:** Design MCP server configuration and multi-tenant isolation

**Structure:**
```
src-v2/skills/bmad-bam-mcp/
├── SKILL.md
├── bmad-skill-manifest.yaml
├── customize.toml
├── workflow.md
├── templates/
│   └── mcp-server-config.md
└── steps/
    ├── step-01-c-start.md
    ├── step-02-c-server-design.md
    ├── step-03-c-isolation.md
    ├── step-04-c-tools.md
    ├── step-05-c-document.md
    └── step-22-v-report.md
```

**Patterns Referenced:**
- `mcp-server-lifecycle.md`
- `mcp-tenant-isolation.md`
- `mcp-tool-discovery.md`
- `mcp-authentication.md`

### bmad-bam-rag

**Purpose:** Design RAG pipeline with multi-tenant vector storage

**Structure:**
```
src-v2/skills/bmad-bam-rag/
├── SKILL.md
├── bmad-skill-manifest.yaml
├── customize.toml
├── workflow.md
├── templates/
│   └── rag-pipeline-config.md
└── steps/
    ├── step-01-c-start.md
    ├── step-02-c-pipeline.md
    ├── step-03-c-vector-store.md
    ├── step-04-c-chunking.md
    ├── step-05-c-document.md
    └── step-22-v-report.md
```

**Patterns Referenced:**
- `rag-pipeline.md`
- `vector-store-multi-tenant.md`
- `semantic-chunking.md`
- `embedding-lifecycle.md`

### bmad-bam-governance

**Purpose:** Manage architecture decision records (ADRs) and governance documentation

**Structure:**
```
src-v2/skills/bmad-bam-governance/
├── SKILL.md
├── bmad-skill-manifest.yaml
├── customize.toml
├── workflow.md
├── templates/
│   └── decision-log.md
└── steps/
    ├── step-01-c-start.md
    ├── step-02-c-decision-context.md
    ├── step-03-c-options.md
    ├── step-04-c-decision.md
    ├── step-05-c-document.md
    └── step-22-v-report.md
```

**Patterns Referenced:**
- Architecture decision record patterns
- Governance workflow patterns

### bmad-bam-platform

**Purpose:** Design platform architecture for extensibility, plugins, and partner ecosystem

**Structure:**
```
src-v2/skills/bmad-bam-platform/
├── SKILL.md
├── bmad-skill-manifest.yaml
├── customize.toml
├── workflow.md
├── templates/
│   └── platform-architecture.md
└── steps/
    ├── step-01-c-start.md
    ├── step-02-c-extensibility.md
    ├── step-03-c-plugins.md
    ├── step-04-c-marketplace.md
    ├── step-05-c-document.md
    └── step-22-v-report.md
```

**Patterns Referenced:**
- `plugin-architecture.md`
- `white-label.md`
- `api-marketplace.md`
- `partner-integration.md`

---

## Broken Reference Fixes

| Broken Reference | Skill | Fix |
|------------------|-------|-----|
| `disaster-recovery-template.md` | `bmad-bam-resilience` | Change to `disaster-recovery-plan.md` |
| `privacy-compliance-template.md` | `bmad-bam-privacy-compliance` | Change to `gdpr-compliance-report.md` |
| `chaos-engineering-template.md` | `bmad-bam-resilience` | CREATE NEW based on `data/patterns/chaos-engineering*.md` |

---

## Migration Phases

### Phase 1: Add BMAD Frontmatter (In-Place)

**Scope:** All 48 templates in current location

**Steps:**
1. Add BMAD workflow fields to frontmatter
2. Namespace existing BAM fields with `bam_` prefix
3. Validate frontmatter parses correctly
4. Run `npm test`

**Duration:** 2-3 hours

### Phase 2: Create Standards Directory

**Scope:** 3 FORMAT_STANDARD templates

**Steps:**
1. Create `src-v2/data/standards/` directory
2. Move and rename templates with `std-` prefix
3. Update all skill references to new paths
4. Run `npm test`

**Duration:** 1 hour

### Phase 3: Create New Skills

**Scope:** `bmad-bam-mcp`, `bmad-bam-rag`, `bmad-bam-governance`, `bmad-bam-platform`

**Steps:**
1. Create skill directory structure for all 4 new skills
2. Create SKILL.md, manifest, workflow, steps for each
3. Move templates to each skill's `templates/` directory
4. Create `chaos-engineering.md` template (based on existing patterns)
5. Run `npm test`

**Duration:** 4-5 hours

### Phase 4: Restructure to Per-Skill Templates

**Scope:** All remaining templates (31 templates across 31 skills)

**Steps:**
1. Create `templates/` directory in each owning skill
2. Move each template to its owning skill's `templates/` directory
3. Update producer skill references from `{project-root}/_bmad/bam/data/templates/{name}.md` to `templates/{name}.md` (local path)
4. Update consumer skill references from `Load template: .../templates/{name}.md` to `Prerequisite: {output_folder}/planning-artifacts/{name}.md` (artifact path)
5. Run `npm test`

**Duration:** 4-5 hours

### Phase 5: Fix Broken References

**Scope:** 3 broken references

**Steps:**
1. Fix `disaster-recovery-template.md` → `disaster-recovery-plan.md`
2. Fix `privacy-compliance-template.md` → `gdpr-compliance-report.md`
3. Verify all references resolve
4. Run `npm test`

**Duration:** 30 minutes

---

## Validation Checklist

### Phase 1 Validation
- [ ] All 48 templates have `stepsCompleted: []`
- [ ] All 48 templates have `inputDocuments: []`
- [ ] All 48 templates have `workflowType:`
- [ ] All BAM fields namespaced with `bam_` prefix
- [ ] `npm test` passes

### Phase 2 Validation
- [ ] `data/standards/` directory exists
- [ ] 3 standards have `std-` prefix
- [ ] All skill references updated
- [ ] `npm test` passes

### Phase 3 Validation
- [ ] `bmad-bam-mcp` skill complete
- [ ] `bmad-bam-rag` skill complete
- [ ] `bmad-bam-governance` skill complete
- [ ] `bmad-bam-platform` skill complete
- [ ] `chaos-engineering.md` template created (based on patterns)
- [ ] `npm test` passes

### Phase 4 Validation
- [ ] All skills have `templates/` directory
- [ ] All templates in owning skill's directory
- [ ] Consumer references point to artifacts, not templates
- [ ] `data/templates/` directory empty (except .gitkeep)
- [ ] `npm test` passes

### Phase 5 Validation
- [ ] No broken template references
- [ ] All `grep -r "template.md" src-v2/skills/` references resolve
- [ ] `npm test` passes

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking existing workflows | High | Phase 1 is in-place; validate before restructure |
| Consumer skills reference wrong paths | Medium | Systematic find/replace with validation |
| New skills incomplete | Low | Use existing skill as template |
| Tests fail after migration | Medium | Run tests after each phase; revert if needed |

---

## Success Criteria

1. All 48 BAM templates have BMAD-compatible frontmatter
2. All templates in per-skill directories (except standards)
3. 3 FORMAT_STANDARD templates in `data/standards/`
4. 4 new skills (`bmad-bam-mcp`, `bmad-bam-rag`, `bmad-bam-governance`, `bmad-bam-platform`) functional
5. No broken template references
6. `npm test` passes
7. BMAD workflows can load, track progress, and resume BAM templates

---

## Appendix: Template Type Definitions

### FORMAT_STANDARD

A template that defines an **output contract** used by multiple skills to produce their own documents.

**Characteristics:**
- Multiple skills PRODUCE outputs using this template
- Same structure, different content per skill
- Lives in shared `data/standards/` directory
- Named with `std-` prefix
- Changes affect all producer skills

**Example:** `std-validation-report.md` — 12 skills produce validation reports

### ARTIFACT_DEPENDENCY

A template that defines an **artifact** produced by ONE skill and consumed by many.

**Characteristics:**
- ONE skill PRODUCES the artifact using this template
- Many skills CONSUME the produced output
- Lives in producer skill's `templates/` directory
- Consumers reference output path, not template
- Changes only affect producer skill

**Example:** `master-architecture.md` — produced by `bmad-bam-master-architecture`, consumed by 20+ skills

### SKILL_OWNED

A template with **1:1 ownership** by a single skill.

**Characteristics:**
- Single skill owns and uses the template
- No sharing with other skills
- Lives in owning skill's `templates/` directory
- Changes only affect owning skill

**Example:** `caching-strategy.md` — owned exclusively by `bmad-bam-caching`

---

_Document generated: 2026-05-03_
