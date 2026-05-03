# BAM V2 BMAD Template Compatibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enable full BMAD Method workflow integration for all 48 BAM V2 templates with resume capability and progress tracking.

**Architecture:** Three-tier template system (Standards, Artifact-Dependency, Skill-Owned) with BMAD-compatible frontmatter. Templates migrate from centralized `data/templates/` to per-skill `templates/` directories, except FORMAT_STANDARD templates which move to `data/standards/`.

**Tech Stack:** Markdown, YAML frontmatter, TOML configuration, Bash scripting for validation

**Spec:** `docs/superpowers/specs/2026-05-03-bam-bmad-template-compatibility-design.md`

---

## File Structure Overview

```
src-v2/
├── data/
│   ├── standards/                    # NEW: 3 FORMAT_STANDARD templates
│   │   ├── std-validation-report.md
│   │   ├── std-convergence-report.md
│   │   └── std-gate-checklist.md
│   └── templates/                    # DEPRECATED: emptied after migration
│       └── .gitkeep
│
└── skills/
    ├── bmad-bam-mcp/                 # NEW SKILL
    │   ├── SKILL.md
    │   ├── bmad-skill-manifest.yaml
    │   ├── customize.toml
    │   ├── workflow.md
    │   ├── templates/
    │   │   └── mcp-server-config.md
    │   └── steps/
    ├── bmad-bam-rag/                 # NEW SKILL
    ├── bmad-bam-governance/          # NEW SKILL
    ├── bmad-bam-platform/            # NEW SKILL
    └── bmad-bam-{existing}/
        └── templates/                # NEW: per-skill templates
            └── {template}.md
```

---

## Phase 1: Add BMAD Frontmatter

### Task 1: Update FORMAT_STANDARD + ARTIFACT_DEPENDENCY Templates (10 files)

**Files:**
- Modify: `src-v2/data/templates/validation-report.md`
- Modify: `src-v2/data/templates/convergence-report.md`
- Modify: `src-v2/data/templates/gate-checklist.md`
- Modify: `src-v2/data/templates/master-architecture.md`
- Modify: `src-v2/data/templates/tenant-isolation.md`
- Modify: `src-v2/data/templates/agent-runtime.md`
- Modify: `src-v2/data/templates/billing-design.md`
- Modify: `src-v2/data/templates/testing-strategy.md`
- Modify: `src-v2/data/templates/module-architecture.md`
- Modify: `src-v2/data/templates/facade-contract.md`

- [ ] **Step 1: Update validation-report.md frontmatter**

Replace the existing frontmatter in `src-v2/data/templates/validation-report.md`:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-validation'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: validation-report
bam_description: Document validation results for quality gate
bam_category: quality
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 2: Update convergence-report.md frontmatter**

Replace the existing frontmatter in `src-v2/data/templates/convergence-report.md`:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-convergence'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: convergence-report
bam_description: Document integration verification results across modules
bam_category: integration
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 3: Update gate-checklist.md frontmatter**

Replace the existing frontmatter in `src-v2/data/templates/gate-checklist.md`:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-gate-checklist'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: gate-checklist
bam_description: Document quality gate checklist for validation workflows
bam_category: quality
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 4: Update master-architecture.md frontmatter**

Replace the existing frontmatter in `src-v2/data/templates/master-architecture.md`:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-master-architecture'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: master-architecture
bam_description: Document the frozen master architecture for multi-tenant AI SaaS platform
bam_category: architecture
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 5: Update tenant-isolation.md frontmatter**

Replace the existing frontmatter in `src-v2/data/templates/tenant-isolation.md`:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-tenant-isolation'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: tenant-isolation
bam_description: Document tenant isolation strategy and implementation
bam_category: architecture
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 6: Update agent-runtime.md frontmatter**

Replace the existing frontmatter in `src-v2/data/templates/agent-runtime.md`:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-agent-runtime'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: agent-runtime
bam_description: Document AI agent runtime architecture and safety guardrails
bam_category: ai-runtime
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 7: Update billing-design.md frontmatter**

Replace the existing frontmatter in `src-v2/data/templates/billing-design.md`:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-billing'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: billing-design
bam_description: Document usage metering and billing architecture
bam_category: monetization
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 8: Update testing-strategy.md frontmatter**

Replace the existing frontmatter in `src-v2/data/templates/testing-strategy.md`:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-testing'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: testing-strategy
bam_description: Document comprehensive testing strategy with tenant coverage
bam_category: quality
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 9: Update module-architecture.md frontmatter**

Replace the existing frontmatter in `src-v2/data/templates/module-architecture.md`:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-module-architecture'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: module-architecture
bam_description: Document module boundaries, facades, and internal structure
bam_category: architecture
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 10: Update facade-contract.md frontmatter**

Replace the existing frontmatter in `src-v2/data/templates/facade-contract.md`:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-facade-contract'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: facade-contract
bam_description: Document module facade contract and versioning
bam_category: integration
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 11: Verify frontmatter syntax**

Run: `head -20 src-v2/data/templates/{validation-report,convergence-report,gate-checklist,master-architecture,tenant-isolation,agent-runtime,billing-design,testing-strategy,module-architecture,facade-contract}.md`

Expected: All 10 files show BMAD-compatible frontmatter with `stepsCompleted`, `inputDocuments`, `workflowType`, and `bam_` prefixed fields.

- [ ] **Step 12: Commit Task 1**

```bash
git add src-v2/data/templates/{validation-report,convergence-report,gate-checklist,master-architecture,tenant-isolation,agent-runtime,billing-design,testing-strategy,module-architecture,facade-contract}.md
git commit -m "feat(templates): add BMAD frontmatter to FORMAT_STANDARD and ARTIFACT_DEPENDENCY templates

- Add stepsCompleted, inputDocuments, workflowType fields
- Namespace existing fields with bam_ prefix
- 10 templates updated: validation-report, convergence-report, gate-checklist,
  master-architecture, tenant-isolation, agent-runtime, billing-design,
  testing-strategy, module-architecture, facade-contract"
```

---

### Task 2: Update SKILL_OWNED Templates Batch 1 (12 files)

**Files:**
- Modify: `src-v2/data/templates/agent-debug-report.md`
- Modify: `src-v2/data/templates/agent-trace.md`
- Modify: `src-v2/data/templates/api-version.md`
- Modify: `src-v2/data/templates/auth-integration.md`
- Modify: `src-v2/data/templates/caching-strategy.md`
- Modify: `src-v2/data/templates/compliance-mapping.md`
- Modify: `src-v2/data/templates/cross-module-story.md`
- Modify: `src-v2/data/templates/data-residency.md`
- Modify: `src-v2/data/templates/disaster-recovery-plan.md`
- Modify: `src-v2/data/templates/event-architecture.md`
- Modify: `src-v2/data/templates/llm-version.md`
- Modify: `src-v2/data/templates/memory-tier.md`

- [ ] **Step 1: Update agent-debug-report.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-agent-debug'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: agent-debug-report
bam_description: Document AI agent debugging analysis and resolution
bam_category: ai-runtime
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 2: Update agent-trace.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-agent-tracing'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: agent-trace
bam_description: Document AI agent execution trace for analysis
bam_category: ai-runtime
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 3: Update api-version.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-api-versioning'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: api-version
bam_description: Document API versioning strategy and compatibility
bam_category: integration
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 4: Update auth-integration.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-auth-integration'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: auth-integration
bam_description: Authentication integration architecture template
bam_category: security
bam_version: 2.0.0
bam_type: template
bam_related_patterns: [zero-trust, secrets-management, tenant-isolation]
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 5: Update caching-strategy.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-caching'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: caching-strategy
bam_description: Document multi-level caching with tenant isolation
bam_category: operations
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 6: Update compliance-mapping.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-compliance'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: compliance-mapping
bam_description: Document compliance framework requirements and controls
bam_category: compliance
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 7: Update cross-module-story.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-cross-module-story'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: cross-module-story
bam_description: Document user stories spanning multiple modules
bam_category: planning
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 8: Update data-residency.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-data-residency'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: data-residency
bam_description: Document data residency requirements and geographic constraints
bam_category: compliance
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 9: Update disaster-recovery-plan.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-resilience'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: disaster-recovery-plan
bam_description: Disaster recovery and business continuity planning for multi-tenant SaaS
bam_category: operations
bam_version: 2.0.0
bam_type: template
bam_related_patterns: [disaster-recovery, backup-restore, tenant-recovery]
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 10: Update event-architecture.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-events'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: event-architecture
bam_description: Document event-driven architecture with tenant isolation
bam_category: architecture
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 11: Update llm-version.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-llm-versioning'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: llm-version
bam_description: Document LLM versioning and model management strategy
bam_category: ai-runtime
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 12: Update memory-tier.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-memory-tiers'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: memory-tier
bam_description: Document AI agent memory tier architecture
bam_category: ai-runtime
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 13: Verify frontmatter syntax**

Run: `for f in agent-debug-report agent-trace api-version auth-integration caching-strategy compliance-mapping cross-module-story data-residency disaster-recovery-plan event-architecture llm-version memory-tier; do echo "=== $f ===" && head -20 "src-v2/data/templates/$f.md"; done`

Expected: All 12 files show BMAD-compatible frontmatter.

- [ ] **Step 14: Commit Task 2**

```bash
git add src-v2/data/templates/{agent-debug-report,agent-trace,api-version,auth-integration,caching-strategy,compliance-mapping,cross-module-story,data-residency,disaster-recovery-plan,event-architecture,llm-version,memory-tier}.md
git commit -m "feat(templates): add BMAD frontmatter to SKILL_OWNED templates batch 1

- 12 templates updated with stepsCompleted, inputDocuments, workflowType
- Namespaced existing fields with bam_ prefix"
```

---

### Task 3: Update SKILL_OWNED Templates Batch 2 (12 files)

**Files:**
- Modify: `src-v2/data/templates/module-epic.md`
- Modify: `src-v2/data/templates/observability-design.md`
- Modify: `src-v2/data/templates/production-readiness.md`
- Modify: `src-v2/data/templates/requirements-analysis.md`
- Modify: `src-v2/data/templates/research-findings.md`
- Modify: `src-v2/data/templates/runbook.md`
- Modify: `src-v2/data/templates/scaling-design.md`
- Modify: `src-v2/data/templates/security-architecture.md`
- Modify: `src-v2/data/templates/tenant-offboarding.md`
- Modify: `src-v2/data/templates/tenant-onboarding.md`
- Modify: `src-v2/data/templates/tool-contract.md`
- Modify: `src-v2/data/templates/white-label-config.md`

- [ ] **Step 1: Update module-epic.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-module-epics'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: module-epic
bam_description: Document module epic with stories and acceptance criteria
bam_category: planning
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 2: Update observability-design.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-observability'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: observability-design
bam_description: Document tenant-aware observability architecture
bam_category: operations
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 3: Update production-readiness.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-production-readiness'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: production-readiness
bam_description: Document production readiness validation results
bam_category: operations
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 4: Update requirements-analysis.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-requirements'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: requirements-analysis
bam_description: Document requirements analysis and tenant context
bam_category: planning
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 5: Update research-findings.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-research'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'
lastStep: 1

# BAM EXTENSIONS
bam_name: research-findings
bam_description: Document research findings and recommendations
bam_category: planning
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 6: Update runbook.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-observability'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: runbook
bam_description: Document operational runbook for service operations
bam_category: operations
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 7: Update scaling-design.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-scaling'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: scaling-design
bam_description: Document multi-tenant scaling patterns and capacity planning
bam_category: architecture
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 8: Update security-architecture.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-security'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: security-architecture
bam_description: Document multi-tenant security architecture
bam_category: security
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 9: Update tenant-offboarding.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-tenant-offboarding'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: tenant-offboarding
bam_description: Document tenant offboarding workflow and data retention
bam_category: operations
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 10: Update tenant-onboarding.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-tenant-onboarding'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: tenant-onboarding
bam_description: Document tenant onboarding workflow and provisioning
bam_category: operations
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 11: Update tool-contract.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-tool-contracts'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: tool-contract
bam_description: Document AI agent tool interface contracts
bam_category: ai-runtime
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 12: Update white-label-config.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-white-labeling'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: white-label-config
bam_description: Document white-label configuration for tenant branding
bam_category: customization
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 13: Verify frontmatter syntax**

Run: `for f in module-epic observability-design production-readiness requirements-analysis research-findings runbook scaling-design security-architecture tenant-offboarding tenant-onboarding tool-contract white-label-config; do echo "=== $f ===" && head -20 "src-v2/data/templates/$f.md"; done`

Expected: All 12 files show BMAD-compatible frontmatter.

- [ ] **Step 14: Commit Task 3**

```bash
git add src-v2/data/templates/{module-epic,observability-design,production-readiness,requirements-analysis,research-findings,runbook,scaling-design,security-architecture,tenant-offboarding,tenant-onboarding,tool-contract,white-label-config}.md
git commit -m "feat(templates): add BMAD frontmatter to SKILL_OWNED templates batch 2

- 12 templates updated with stepsCompleted, inputDocuments, workflowType
- Namespaced existing fields with bam_ prefix"
```

---

### Task 4: Update ORPHAN Templates (14 files)

**Files:**
- Modify: `src-v2/data/templates/capacity-plan.md`
- Modify: `src-v2/data/templates/cost-model.md`
- Modify: `src-v2/data/templates/decision-log.md`
- Modify: `src-v2/data/templates/gdpr-compliance-report.md`
- Modify: `src-v2/data/templates/hipaa-compliance-report.md`
- Modify: `src-v2/data/templates/incident-response.md`
- Modify: `src-v2/data/templates/integration-test-plan.md`
- Modify: `src-v2/data/templates/migration-plan.md`
- Modify: `src-v2/data/templates/platform-architecture.md`
- Modify: `src-v2/data/templates/rollback-plan.md`
- Modify: `src-v2/data/templates/sla-definition.md`
- Modify: `src-v2/data/templates/soc2-audit-report.md`
- Modify: `src-v2/data/templates/mcp-server-config.md`
- Modify: `src-v2/data/templates/rag-pipeline-config.md`

- [ ] **Step 1: Update capacity-plan.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-scaling'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: capacity-plan
bam_description: Document capacity planning for multi-tenant growth
bam_category: operations
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 2: Update cost-model.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-billing'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: cost-model
bam_description: Document multi-tenant cost allocation and unit economics
bam_category: monetization
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 3: Update decision-log.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-governance'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: decision-log
bam_description: Document architecture decision records (ADRs)
bam_category: governance
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 4: Update gdpr-compliance-report.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-privacy-compliance'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: gdpr-compliance-report
bam_description: GDPR compliance documentation and data subject rights implementation
bam_category: compliance
bam_version: 2.0.0
bam_type: template
bam_related_patterns: [gdpr-compliance, consent-management, data-retention, anonymization]
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 5: Update hipaa-compliance-report.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-privacy-compliance'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: hipaa-compliance-report
bam_description: HIPAA compliance documentation for healthcare SaaS applications
bam_category: compliance
bam_version: 2.0.0
bam_type: template
bam_related_patterns: [hipaa-compliance, encryption-management, audit-trail]
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 6: Update incident-response.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-security-operations'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: incident-response
bam_description: Document incident response procedures with tenant impact assessment
bam_category: operations
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 7: Update integration-test-plan.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-testing'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: integration-test-plan
bam_description: Document integration testing strategy with tenant isolation
bam_category: quality
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 8: Update migration-plan.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-resilience'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: migration-plan
bam_description: Document data migration plan with tenant-aware execution
bam_category: operations
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 9: Update platform-architecture.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-platform'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: platform-architecture
bam_description: Platform architecture for extensibility, plugins, and partner ecosystem
bam_category: platform
bam_version: 2.0.0
bam_type: template
bam_related_patterns: [plugin-architecture, white-label, api-marketplace, partner-integration]
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 10: Update rollback-plan.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-resilience'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: rollback-plan
bam_description: Document deployment rollback procedures
bam_category: operations
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 11: Update sla-definition.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-production-readiness'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: sla-definition
bam_description: Document service level agreements per tenant tier
bam_category: operations
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 12: Update soc2-audit-report.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-compliance'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: soc2-audit-report
bam_description: SOC 2 Type II audit documentation and control mapping
bam_category: compliance
bam_version: 2.0.0
bam_type: template
bam_related_patterns: [soc2-compliance, audit-trail, compliance-reporting]
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 13: Update mcp-server-config.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-mcp'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: mcp-server-config
bam_description: MCP server configuration and multi-tenant isolation template
bam_category: mcp
bam_version: 2.0.0
bam_type: template
bam_related_patterns: [mcp-server-lifecycle, mcp-tenant-isolation, mcp-tool-discovery, mcp-authentication]
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 14: Update rag-pipeline-config.md frontmatter**

Replace frontmatter with:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-rag'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: rag-pipeline-config
bam_description: RAG pipeline configuration with multi-tenant vector storage
bam_category: rag
bam_version: 2.0.0
bam_type: template
bam_related_patterns: [rag-pipeline, vector-store-multi-tenant, semantic-chunking, embedding-lifecycle]
web_research_enabled: true
source_verification: true
---
```

- [ ] **Step 15: Verify all 14 templates**

Run: `for f in capacity-plan cost-model decision-log gdpr-compliance-report hipaa-compliance-report incident-response integration-test-plan migration-plan platform-architecture rollback-plan sla-definition soc2-audit-report mcp-server-config rag-pipeline-config; do head -5 "src-v2/data/templates/$f.md" | grep -q "stepsCompleted" && echo "$f: OK" || echo "$f: MISSING"; done`

Expected: All 14 files report "OK".

- [ ] **Step 16: Run tests**

Run: `npm test`

Expected: All tests pass.

- [ ] **Step 17: Commit Task 4**

```bash
git add src-v2/data/templates/{capacity-plan,cost-model,decision-log,gdpr-compliance-report,hipaa-compliance-report,incident-response,integration-test-plan,migration-plan,platform-architecture,rollback-plan,sla-definition,soc2-audit-report,mcp-server-config,rag-pipeline-config}.md
git commit -m "feat(templates): add BMAD frontmatter to ORPHAN templates

- 14 templates updated with stepsCompleted, inputDocuments, workflowType
- Assigned workflowTypes for future skill ownership
- Completes Phase 1: all 48 templates now have BMAD-compatible frontmatter"
```

---

## Phase 2: Create Standards Directory

### Task 5: Create data/standards/ and Move FORMAT_STANDARD Templates

**Files:**
- Create: `src-v2/data/standards/std-validation-report.md`
- Create: `src-v2/data/standards/std-convergence-report.md`
- Create: `src-v2/data/standards/std-gate-checklist.md`
- Delete: `src-v2/data/templates/validation-report.md`
- Delete: `src-v2/data/templates/convergence-report.md`
- Delete: `src-v2/data/templates/gate-checklist.md`
- Modify: Skills referencing these templates

- [ ] **Step 1: Create standards directory**

Run: `mkdir -p src-v2/data/standards`

- [ ] **Step 2: Move and rename validation-report.md**

Run: `mv src-v2/data/templates/validation-report.md src-v2/data/standards/std-validation-report.md`

- [ ] **Step 3: Update std-validation-report.md frontmatter for standard type**

Update the frontmatter in `src-v2/data/standards/std-validation-report.md`:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'standard'

# STANDARD METADATA
type: standard
standard_version: 2.0.0
consumers: [all-qg-skills]
breaking_change_policy: semver

# BAM EXTENSIONS
bam_name: std-validation-report
bam_description: Standard format for quality gate validation reports
bam_category: quality
---
```

- [ ] **Step 4: Move and rename convergence-report.md**

Run: `mv src-v2/data/templates/convergence-report.md src-v2/data/standards/std-convergence-report.md`

- [ ] **Step 5: Update std-convergence-report.md frontmatter**

Update the frontmatter in `src-v2/data/standards/std-convergence-report.md`:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'standard'

# STANDARD METADATA
type: standard
standard_version: 2.0.0
consumers: [bmad-bam-convergence, bmad-bam-triage]
breaking_change_policy: semver

# BAM EXTENSIONS
bam_name: std-convergence-report
bam_description: Standard format for module convergence reports
bam_category: integration
---
```

- [ ] **Step 6: Move and rename gate-checklist.md**

Run: `mv src-v2/data/templates/gate-checklist.md src-v2/data/standards/std-gate-checklist.md`

- [ ] **Step 7: Update std-gate-checklist.md frontmatter**

Update the frontmatter in `src-v2/data/standards/std-gate-checklist.md`:

```yaml
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'standard'

# STANDARD METADATA
type: standard
standard_version: 2.0.0
consumers: [all-qg-skills]
breaking_change_policy: semver

# BAM EXTENSIONS
bam_name: std-gate-checklist
bam_description: Standard format for quality gate checklists
bam_category: quality
---
```

- [ ] **Step 8: Update skill references to validation-report**

Run: `grep -rl "templates/validation-report" src-v2/skills/ | head -20`

For each file found, replace:
- `{project-root}/_bmad/bam/data/templates/validation-report.md`
with:
- `{project-root}/_bmad/bam/data/standards/std-validation-report.md`

- [ ] **Step 9: Update skill references to convergence-report**

Run: `grep -rl "templates/convergence-report" src-v2/skills/`

For each file found, replace:
- `{project-root}/_bmad/bam/data/templates/convergence-report.md`
with:
- `{project-root}/_bmad/bam/data/standards/std-convergence-report.md`

- [ ] **Step 10: Verify standards directory**

Run: `ls -la src-v2/data/standards/`

Expected:
```
std-validation-report.md
std-convergence-report.md
std-gate-checklist.md
```

- [ ] **Step 11: Run tests**

Run: `npm test`

Expected: All tests pass.

- [ ] **Step 12: Commit Task 5**

```bash
git add src-v2/data/standards/ src-v2/skills/
git commit -m "feat(standards): create data/standards/ and move FORMAT_STANDARD templates

- Create src-v2/data/standards/ directory
- Move and rename: validation-report → std-validation-report
- Move and rename: convergence-report → std-convergence-report
- Move and rename: gate-checklist → std-gate-checklist
- Update all skill references to new paths
- Completes Phase 2"
```

---

## Phase 3: Create New Skills

### Task 6: Create bmad-bam-mcp Skill

**Files:**
- Create: `src-v2/skills/bmad-bam-mcp/SKILL.md`
- Create: `src-v2/skills/bmad-bam-mcp/bmad-skill-manifest.yaml`
- Create: `src-v2/skills/bmad-bam-mcp/customize.toml`
- Create: `src-v2/skills/bmad-bam-mcp/workflow.md`
- Create: `src-v2/skills/bmad-bam-mcp/templates/mcp-server-config.md`
- Create: `src-v2/skills/bmad-bam-mcp/steps/step-01-c-start.md`
- Create: `src-v2/skills/bmad-bam-mcp/steps/step-05-c-document.md`
- Create: `src-v2/skills/bmad-bam-mcp/steps/step-22-v-report.md`

- [ ] **Step 1: Create skill directory structure**

Run: `mkdir -p src-v2/skills/bmad-bam-mcp/{templates,steps}`

- [ ] **Step 2: Create SKILL.md**

Create `src-v2/skills/bmad-bam-mcp/SKILL.md`:

```markdown
---
name: bmad-bam-mcp
description: 'Design MCP server configuration and multi-tenant isolation. Use when creating MCP server architectures for multi-tenant AI platforms.'
module: bam
tags: [mcp, ai-runtime, integration]
---

# MCP Server Configuration

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Validate | Check config | step-20-v to step-22-v |

## Overview

Design MCP (Model Context Protocol) server configuration for multi-tenant AI platforms. This workflow establishes server lifecycle management, tenant isolation, tool discovery, and authentication patterns.

**Your Role:** Guide decisions on MCP server architecture while ensuring tenant isolation and security.

## Prerequisites

- [ ] Master architecture document available
- [ ] Tenant isolation model selected
- [ ] **Load patterns:** `{project-root}/_bmad/bam/data/patterns/mcp-*.md`

## Outputs

- **MCP Server Config:** `{output_folder}/planning-artifacts/mcp-server-config.md`
- **Load template:** `./templates/mcp-server-config.md`

## Related Workflows

- `bmad-bam-master-architecture`
- `bmad-bam-agent-runtime`
- `bmad-bam-tool-contracts`

## On Activation

### Step 1: Load Persistent Facts

Load from `{project-root}/_bmad/bam/data/context/bam-core.md`

### Step 2: Greet User

Greet and confirm MCP configuration scope.

### Step 3: Begin Workflow

Read `workflow.md` to begin.
```

- [ ] **Step 3: Create bmad-skill-manifest.yaml**

Create `src-v2/skills/bmad-bam-mcp/bmad-skill-manifest.yaml`:

```yaml
type: workflow
name: bmad-bam-mcp
displayName: MCP Server Configuration
description: 'Design MCP server configuration and multi-tenant isolation'
module: bam
step_naming_convention: "step-NN-mode-description"
```

- [ ] **Step 4: Create customize.toml**

Create `src-v2/skills/bmad-bam-mcp/customize.toml`:

```toml
[workflow]

activation_steps_prepend = [
  "Loading MCP Server Configuration workflow context.",
]

activation_steps_append = [
  "Check for existing MCP patterns in pattern registry.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
  "file:{project-root}/_bmad/bam/data/patterns/mcp-*.md",
]

on_complete = """
MCP Server Configuration workflow complete.

**Next Steps:**
- Implement MCP server based on configuration
- Test tenant isolation
"""
```

- [ ] **Step 5: Create workflow.md**

Create `src-v2/skills/bmad-bam-mcp/workflow.md`:

```markdown
# MCP Server Configuration

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new config | `step-01-c-*` through `step-05-c-*` |
| **Validate** | Check configuration | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless config exists.

## Create Mode

1. **step-01-c-start** - Gather requirements
2. **step-02-c-server** - Design server architecture
3. **step-03-c-isolation** - Configure tenant isolation
4. **step-04-c-tools** - Define tool discovery
5. **step-05-c-document** - Generate configuration

## Validate Mode

1. **step-20-v-load** - Load configuration
2. **step-21-v-check** - Validate against patterns
3. **step-22-v-report** - Generate report
```

- [ ] **Step 6: Move mcp-server-config.md template**

Run: `mv src-v2/data/templates/mcp-server-config.md src-v2/skills/bmad-bam-mcp/templates/`

- [ ] **Step 7: Create step-01-c-start.md**

Create `src-v2/skills/bmad-bam-mcp/steps/step-01-c-start.md`:

```markdown
# Step 01: Gather MCP Requirements

## MANDATORY EXECUTION RULES

- 🛑 NEVER generate configuration without understanding requirements
- 📖 Load MCP patterns before proceeding
- ⏸️ Pause after gathering requirements for user confirmation

---

## YOUR TASK

Gather MCP server requirements including:
- Server scope (local, shared, enterprise)
- Tenant isolation requirements
- Tool categories to expose
- Authentication method

---

## Main Sequence

### 1. Load MCP Patterns

Read: `{project-root}/_bmad/bam/data/patterns/mcp-*.md`

### 2. Gather Requirements

| Dimension | Question |
|-----------|----------|
| Server Scope | Local per-user, shared per-tenant, or enterprise? |
| Isolation | How should tools be scoped per tenant? |
| Tool Types | What tool categories? (files, APIs, databases) |
| Auth | OAuth, API key, or service account? |

### 3. Confirm Requirements

Present summary and await user confirmation.

---

## NEXT STEP

Proceed to `step-02-c-server.md` for server architecture design.
```

- [ ] **Step 8: Create step-05-c-document.md**

Create `src-v2/skills/bmad-bam-mcp/steps/step-05-c-document.md`:

```markdown
# Step 05: Generate MCP Configuration Document

## YOUR TASK

Generate the final MCP server configuration document using the template.

---

## Main Sequence

### 1. Load Template

Load: `./templates/mcp-server-config.md`

### 2. Fill Configuration

Populate all sections based on gathered requirements and design decisions.

### 3. Write Document

Write to: `{output_folder}/planning-artifacts/mcp-server-config.md`

### 4. Verify

Confirm document completeness with user.

---

## SUCCESS METRICS

- ✅ All template sections populated
- ✅ Tenant isolation patterns documented
- ✅ Tool discovery configured
- ✅ Authentication method specified
```

- [ ] **Step 9: Create step-22-v-report.md**

Create `src-v2/skills/bmad-bam-mcp/steps/step-22-v-report.md`:

```markdown
# Step 22: Generate Validation Report

## YOUR TASK

Generate validation report for MCP configuration.

---

## Main Sequence

### 1. Load Standard

Load: `{project-root}/_bmad/bam/data/standards/std-validation-report.md`

### 2. Execute Checks

| Check | Criteria |
|-------|----------|
| Tenant Isolation | All tools scoped to tenant context |
| Authentication | Auth method configured |
| Tool Discovery | Discovery endpoint defined |

### 3. Generate Report

Write to: `{output_folder}/planning-artifacts/validation/mcp-validation-report.md`
```

- [ ] **Step 10: Verify skill structure**

Run: `ls -la src-v2/skills/bmad-bam-mcp/`

Expected: SKILL.md, bmad-skill-manifest.yaml, customize.toml, workflow.md, templates/, steps/

- [ ] **Step 11: Commit Task 6**

```bash
git add src-v2/skills/bmad-bam-mcp/
git commit -m "feat(skills): create bmad-bam-mcp skill

- MCP server configuration and multi-tenant isolation skill
- Includes SKILL.md, manifest, workflow, and step files
- Moved mcp-server-config.md template to skill"
```

---

### Task 7: Create bmad-bam-rag Skill

**Files:**
- Create: `src-v2/skills/bmad-bam-rag/SKILL.md`
- Create: `src-v2/skills/bmad-bam-rag/bmad-skill-manifest.yaml`
- Create: `src-v2/skills/bmad-bam-rag/customize.toml`
- Create: `src-v2/skills/bmad-bam-rag/workflow.md`
- Create: `src-v2/skills/bmad-bam-rag/templates/rag-pipeline-config.md`
- Create: `src-v2/skills/bmad-bam-rag/steps/step-01-c-start.md`
- Create: `src-v2/skills/bmad-bam-rag/steps/step-05-c-document.md`
- Create: `src-v2/skills/bmad-bam-rag/steps/step-22-v-report.md`

- [ ] **Step 1: Create skill directory structure**

Run: `mkdir -p src-v2/skills/bmad-bam-rag/{templates,steps}`

- [ ] **Step 2: Create SKILL.md**

Create `src-v2/skills/bmad-bam-rag/SKILL.md`:

```markdown
---
name: bmad-bam-rag
description: 'Design RAG pipeline with multi-tenant vector storage. Use when creating retrieval-augmented generation architectures for multi-tenant platforms.'
module: bam
tags: [rag, ai-runtime, vector-storage]
---

# RAG Pipeline Configuration

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Validate | Check config | step-20-v to step-22-v |

## Overview

Design RAG (Retrieval-Augmented Generation) pipeline configuration for multi-tenant AI platforms. This workflow establishes vector storage isolation, semantic chunking strategies, and embedding lifecycle management.

**Your Role:** Guide decisions on RAG architecture while ensuring tenant data isolation.

## Prerequisites

- [ ] Master architecture document available
- [ ] AI runtime selection made
- [ ] **Load patterns:** `{project-root}/_bmad/bam/data/patterns/rag-*.md`

## Outputs

- **RAG Pipeline Config:** `{output_folder}/planning-artifacts/rag-pipeline-config.md`
- **Load template:** `./templates/rag-pipeline-config.md`

## Related Workflows

- `bmad-bam-master-architecture`
- `bmad-bam-agent-runtime`
- `bmad-bam-memory-tiers`

## On Activation

### Step 1: Load Persistent Facts

Load from `{project-root}/_bmad/bam/data/context/bam-core.md`

### Step 2: Begin Workflow

Read `workflow.md` to begin.
```

- [ ] **Step 3: Create bmad-skill-manifest.yaml**

Create `src-v2/skills/bmad-bam-rag/bmad-skill-manifest.yaml`:

```yaml
type: workflow
name: bmad-bam-rag
displayName: RAG Pipeline Configuration
description: 'Design RAG pipeline with multi-tenant vector storage'
module: bam
step_naming_convention: "step-NN-mode-description"
```

- [ ] **Step 4: Create customize.toml**

Create `src-v2/skills/bmad-bam-rag/customize.toml`:

```toml
[workflow]

activation_steps_prepend = [
  "Loading RAG Pipeline Configuration workflow context.",
]

activation_steps_append = [
  "Check for existing RAG patterns in pattern registry.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
  "file:{project-root}/_bmad/bam/data/patterns/rag-*.md",
]

on_complete = """
RAG Pipeline Configuration workflow complete.

**Next Steps:**
- Implement vector storage
- Configure embedding pipeline
"""
```

- [ ] **Step 5: Create workflow.md**

Create `src-v2/skills/bmad-bam-rag/workflow.md`:

```markdown
# RAG Pipeline Configuration

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new config | `step-01-c-*` through `step-05-c-*` |
| **Validate** | Check configuration | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless config exists.

## Create Mode

1. **step-01-c-start** - Gather requirements
2. **step-02-c-pipeline** - Design pipeline architecture
3. **step-03-c-vector** - Configure vector storage
4. **step-04-c-chunking** - Define chunking strategy
5. **step-05-c-document** - Generate configuration

## Validate Mode

1. **step-20-v-load** - Load configuration
2. **step-21-v-check** - Validate against patterns
3. **step-22-v-report** - Generate report
```

- [ ] **Step 6: Move rag-pipeline-config.md template**

Run: `mv src-v2/data/templates/rag-pipeline-config.md src-v2/skills/bmad-bam-rag/templates/`

- [ ] **Step 7: Create step-01-c-start.md**

Create `src-v2/skills/bmad-bam-rag/steps/step-01-c-start.md`:

```markdown
# Step 01: Gather RAG Requirements

## MANDATORY EXECUTION RULES

- 🛑 NEVER generate configuration without understanding requirements
- 📖 Load RAG patterns before proceeding
- ⏸️ Pause after gathering requirements for user confirmation

---

## YOUR TASK

Gather RAG pipeline requirements including:
- Data sources and document types
- Embedding model selection
- Vector storage strategy (per-tenant, shared with isolation)
- Chunking approach

---

## Main Sequence

### 1. Load RAG Patterns

Read: `{project-root}/_bmad/bam/data/patterns/rag-*.md`

### 2. Gather Requirements

| Dimension | Question |
|-----------|----------|
| Data Sources | What document types? (PDF, web, code) |
| Embedding Model | OpenAI, Cohere, or local? |
| Vector Store | Pinecone, Weaviate, pgvector? |
| Tenant Isolation | Namespace, collection, or database per tenant? |

### 3. Confirm Requirements

Present summary and await user confirmation.

---

## NEXT STEP

Proceed to `step-02-c-pipeline.md` for pipeline architecture design.
```

- [ ] **Step 8: Create step-05-c-document.md and step-22-v-report.md**

Create minimal step files following the same pattern as Task 6.

- [ ] **Step 9: Verify skill structure**

Run: `ls -la src-v2/skills/bmad-bam-rag/`

- [ ] **Step 10: Commit Task 7**

```bash
git add src-v2/skills/bmad-bam-rag/
git commit -m "feat(skills): create bmad-bam-rag skill

- RAG pipeline configuration with multi-tenant vector storage
- Includes SKILL.md, manifest, workflow, and step files
- Moved rag-pipeline-config.md template to skill"
```

---

### Task 8: Create bmad-bam-governance Skill

**Files:**
- Create: `src-v2/skills/bmad-bam-governance/` (full structure)

- [ ] **Step 1: Create skill directory structure**

Run: `mkdir -p src-v2/skills/bmad-bam-governance/{templates,steps}`

- [ ] **Step 2: Create SKILL.md**

Create `src-v2/skills/bmad-bam-governance/SKILL.md`:

```markdown
---
name: bmad-bam-governance
description: 'Manage architecture decision records (ADRs) and governance documentation. Use when documenting architectural decisions and their rationale.'
module: bam
tags: [governance, architecture, documentation]
---

# Architecture Governance

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new ADR | step-01-c to step-05-c |
| Validate | Check governance | step-20-v to step-22-v |

## Overview

Document architecture decision records (ADRs) and governance documentation for multi-tenant AI platforms. This workflow captures decision context, options considered, and rationale.

## Prerequisites

- [ ] Architecture decision to document
- [ ] Stakeholders identified

## Outputs

- **Decision Log:** `{output_folder}/planning-artifacts/decision-log.md`
- **Load template:** `./templates/decision-log.md`

## On Activation

Load context and begin workflow.
```

- [ ] **Step 3: Create manifest, customize.toml, workflow.md**

Follow the same pattern as Tasks 6-7.

- [ ] **Step 4: Move decision-log.md template**

Run: `mv src-v2/data/templates/decision-log.md src-v2/skills/bmad-bam-governance/templates/`

- [ ] **Step 5: Create minimal step files**

Create step-01-c-start.md, step-05-c-document.md, step-22-v-report.md.

- [ ] **Step 6: Commit Task 8**

```bash
git add src-v2/skills/bmad-bam-governance/
git commit -m "feat(skills): create bmad-bam-governance skill

- Architecture decision records and governance documentation
- Moved decision-log.md template to skill"
```

---

### Task 9: Create bmad-bam-platform Skill

**Files:**
- Create: `src-v2/skills/bmad-bam-platform/` (full structure)

- [ ] **Step 1: Create skill directory structure**

Run: `mkdir -p src-v2/skills/bmad-bam-platform/{templates,steps}`

- [ ] **Step 2: Create SKILL.md**

Create `src-v2/skills/bmad-bam-platform/SKILL.md`:

```markdown
---
name: bmad-bam-platform
description: 'Design platform architecture for extensibility, plugins, and partner ecosystem. Use when creating platform extension and marketplace architectures.'
module: bam
tags: [platform, extensibility, marketplace]
---

# Platform Architecture

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Validate | Check architecture | step-20-v to step-22-v |

## Overview

Design platform architecture for extensibility including plugin systems, white-labeling, API marketplace, and partner integrations.

## Prerequisites

- [ ] Master architecture document available
- [ ] **Load patterns:** `{project-root}/_bmad/bam/data/patterns/plugin-*.md`

## Outputs

- **Platform Architecture:** `{output_folder}/planning-artifacts/platform-architecture.md`
- **Load template:** `./templates/platform-architecture.md`

## Related Workflows

- `bmad-bam-master-architecture`
- `bmad-bam-white-labeling`
```

- [ ] **Step 3: Create manifest, customize.toml, workflow.md**

Follow the same pattern as previous tasks.

- [ ] **Step 4: Move platform-architecture.md template**

Run: `mv src-v2/data/templates/platform-architecture.md src-v2/skills/bmad-bam-platform/templates/`

- [ ] **Step 5: Create minimal step files**

- [ ] **Step 6: Run tests**

Run: `npm test`

Expected: All tests pass.

- [ ] **Step 7: Commit Task 9**

```bash
git add src-v2/skills/bmad-bam-platform/
git commit -m "feat(skills): create bmad-bam-platform skill

- Platform architecture for extensibility and plugins
- Moved platform-architecture.md template to skill
- Completes Phase 3: all 4 new skills created"
```

---

## Phase 4: Restructure Templates to Per-Skill Directories

### Task 10: Move ARTIFACT_DEPENDENCY Templates (7 files)

**Files:**
- Move: `master-architecture.md` → `bmad-bam-master-architecture/templates/`
- Move: `tenant-isolation.md` → `bmad-bam-tenant-isolation/templates/`
- Move: `agent-runtime.md` → `bmad-bam-agent-runtime/templates/`
- Move: `billing-design.md` → `bmad-bam-billing/templates/`
- Move: `testing-strategy.md` → `bmad-bam-testing/templates/`
- Move: `module-architecture.md` → `bmad-bam-module-architecture/templates/`
- Move: `facade-contract.md` → `bmad-bam-facade-contract/templates/`

- [ ] **Step 1: Create templates directories**

Run: `for skill in master-architecture tenant-isolation agent-runtime billing testing module-architecture facade-contract; do mkdir -p "src-v2/skills/bmad-bam-$skill/templates"; done`

- [ ] **Step 2: Move master-architecture.md**

Run: `mv src-v2/data/templates/master-architecture.md src-v2/skills/bmad-bam-master-architecture/templates/`

- [ ] **Step 3: Update master-architecture skill references**

In `src-v2/skills/bmad-bam-master-architecture/SKILL.md`, change:
- From: `{project-root}/_bmad/bam/data/templates/master-architecture.md`
- To: `./templates/master-architecture.md`

- [ ] **Step 4: Move tenant-isolation.md**

Run: `mv src-v2/data/templates/tenant-isolation.md src-v2/skills/bmad-bam-tenant-isolation/templates/`

- [ ] **Step 5: Update tenant-isolation skill references**

Update path references in SKILL.md and step files.

- [ ] **Step 6: Move agent-runtime.md**

Run: `mv src-v2/data/templates/agent-runtime.md src-v2/skills/bmad-bam-agent-runtime/templates/`

- [ ] **Step 7: Move billing-design.md**

Run: `mv src-v2/data/templates/billing-design.md src-v2/skills/bmad-bam-billing/templates/`

- [ ] **Step 8: Move testing-strategy.md**

Run: `mv src-v2/data/templates/testing-strategy.md src-v2/skills/bmad-bam-testing/templates/`

- [ ] **Step 9: Move module-architecture.md**

Run: `mv src-v2/data/templates/module-architecture.md src-v2/skills/bmad-bam-module-architecture/templates/`

- [ ] **Step 10: Move facade-contract.md**

Run: `mv src-v2/data/templates/facade-contract.md src-v2/skills/bmad-bam-facade-contract/templates/`

- [ ] **Step 11: Update all skill internal references**

For each moved template, update the owning skill's SKILL.md and step files to use relative paths.

- [ ] **Step 12: Verify moves**

Run: `for skill in master-architecture tenant-isolation agent-runtime billing testing module-architecture facade-contract; do ls "src-v2/skills/bmad-bam-$skill/templates/"; done`

- [ ] **Step 13: Run tests**

Run: `npm test`

- [ ] **Step 14: Commit Task 10**

```bash
git add src-v2/skills/ src-v2/data/templates/
git commit -m "refactor(templates): move ARTIFACT_DEPENDENCY templates to producer skills

- 7 templates moved to their producer skill's templates/ directory
- Updated skill internal references to use relative paths"
```

---

### Task 11: Move SKILL_OWNED Templates Batch 1 (12 files)

Move the first batch of SKILL_OWNED templates following the same pattern as Task 10.

Templates to move:
- `agent-debug-report.md` → `bmad-bam-agent-debug/templates/`
- `agent-trace.md` → `bmad-bam-agent-tracing/templates/`
- `api-version.md` → `bmad-bam-api-versioning/templates/`
- `auth-integration.md` → `bmad-bam-auth-integration/templates/`
- `caching-strategy.md` → `bmad-bam-caching/templates/`
- `compliance-mapping.md` → `bmad-bam-compliance/templates/`
- `cross-module-story.md` → `bmad-bam-cross-module-story/templates/`
- `data-residency.md` → `bmad-bam-data-residency/templates/`
- `disaster-recovery-plan.md` → `bmad-bam-resilience/templates/`
- `event-architecture.md` → `bmad-bam-events/templates/`
- `llm-version.md` → `bmad-bam-llm-versioning/templates/`
- `memory-tier.md` → `bmad-bam-memory-tiers/templates/`

- [ ] **Step 1: Create templates directories**

Run: `for skill in agent-debug agent-tracing api-versioning auth-integration caching compliance cross-module-story data-residency resilience events llm-versioning memory-tiers; do mkdir -p "src-v2/skills/bmad-bam-$skill/templates"; done`

- [ ] **Step 2-13: Move each template and update references**

For each template:
1. Run: `mv src-v2/data/templates/{template}.md src-v2/skills/bmad-bam-{skill}/templates/`
2. Update skill's SKILL.md and step files to use `./templates/{template}.md`

- [ ] **Step 14: Run tests**

Run: `npm test`

- [ ] **Step 15: Commit Task 11**

```bash
git add src-v2/skills/ src-v2/data/templates/
git commit -m "refactor(templates): move SKILL_OWNED templates batch 1 to owning skills

- 12 templates moved to their owning skill's templates/ directory"
```

---

### Task 12: Move SKILL_OWNED Templates Batch 2 (12 files)

Move the remaining SKILL_OWNED templates:
- `module-epic.md` → `bmad-bam-module-epics/templates/`
- `observability-design.md` → `bmad-bam-observability/templates/`
- `production-readiness.md` → `bmad-bam-production-readiness/templates/`
- `requirements-analysis.md` → `bmad-bam-requirements/templates/`
- `research-findings.md` → `bmad-bam-research/templates/`
- `runbook.md` → `bmad-bam-observability/templates/`
- `scaling-design.md` → `bmad-bam-scaling/templates/`
- `security-architecture.md` → `bmad-bam-security/templates/`
- `tenant-offboarding.md` → `bmad-bam-tenant-offboarding/templates/`
- `tenant-onboarding.md` → `bmad-bam-tenant-onboarding/templates/`
- `tool-contract.md` → `bmad-bam-tool-contracts/templates/`
- `white-label-config.md` → `bmad-bam-white-labeling/templates/`

Follow the same pattern as Task 11.

- [ ] **Step 1-14: Move templates and update references**

- [ ] **Step 15: Commit Task 12**

```bash
git commit -m "refactor(templates): move SKILL_OWNED templates batch 2 to owning skills

- 12 templates moved to their owning skill's templates/ directory"
```

---

### Task 13: Move Assigned ORPHAN Templates (10 files)

Move ORPHAN templates to their assigned skills:
- `capacity-plan.md` → `bmad-bam-scaling/templates/`
- `cost-model.md` → `bmad-bam-billing/templates/`
- `gdpr-compliance-report.md` → `bmad-bam-privacy-compliance/templates/`
- `hipaa-compliance-report.md` → `bmad-bam-privacy-compliance/templates/`
- `incident-response.md` → `bmad-bam-security-operations/templates/`
- `integration-test-plan.md` → `bmad-bam-testing/templates/`
- `migration-plan.md` → `bmad-bam-resilience/templates/`
- `rollback-plan.md` → `bmad-bam-resilience/templates/`
- `sla-definition.md` → `bmad-bam-production-readiness/templates/`
- `soc2-audit-report.md` → `bmad-bam-compliance/templates/`

- [ ] **Step 1-10: Move each template**

- [ ] **Step 11: Add template references to skill SKILL.md files**

For each assigned skill, add template reference to SKILL.md Outputs section.

- [ ] **Step 12: Run tests**

Run: `npm test`

- [ ] **Step 13: Verify templates directory is empty**

Run: `ls src-v2/data/templates/`

Expected: Only `.gitkeep` remains.

- [ ] **Step 14: Commit Task 13**

```bash
git add src-v2/skills/ src-v2/data/templates/
git commit -m "refactor(templates): move ORPHAN templates to assigned skills

- 10 orphan templates assigned and moved to skills
- data/templates/ now empty (only .gitkeep)
- Completes Phase 4"
```

---

## Phase 5: Fix Broken References

### Task 14: Fix Broken References and Create chaos-engineering.md

**Files:**
- Modify: Skills referencing `disaster-recovery-template.md`
- Modify: Skills referencing `privacy-compliance-template.md`
- Create: `src-v2/skills/bmad-bam-resilience/templates/chaos-engineering.md`

- [ ] **Step 1: Find and fix disaster-recovery-template.md references**

Run: `grep -r "disaster-recovery-template" src-v2/skills/`

For each result, replace:
- From: `disaster-recovery-template.md`
- To: `disaster-recovery-plan.md`

- [ ] **Step 2: Find and fix privacy-compliance-template.md references**

Run: `grep -r "privacy-compliance-template" src-v2/skills/`

For each result, replace:
- From: `privacy-compliance-template.md`
- To: `gdpr-compliance-report.md`

- [ ] **Step 3: Check for chaos-engineering patterns**

Run: `ls src-v2/data/patterns/ | grep chaos`

- [ ] **Step 4: Create chaos-engineering.md template**

Create `src-v2/skills/bmad-bam-resilience/templates/chaos-engineering.md`:

```markdown
---
# BMAD WORKFLOW STATE
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-resilience'
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'

# BAM EXTENSIONS
bam_name: chaos-engineering
bam_description: Chaos engineering test plan for multi-tenant resilience validation
bam_category: operations
bam_version: 2.0.0
bam_type: template
web_research_enabled: true
source_verification: true
---

## Purpose

Document chaos engineering experiments for validating multi-tenant resilience

# Chaos Engineering Plan - {{project_name}}

> Generated by `bmad-bam-resilience` workflow.

**Project:** {{project_name}}
**Date:** {{date}}
**Author:** {{author}}

---

## Experiment Scope

<!-- FILL: Define blast radius and scope -->
| Property | Value |
|----------|-------|
| Environment | Staging / Production |
| Tenant Impact | Single / Multi / All |
| Duration | Minutes / Hours |
| Rollback | Automatic / Manual |

---

## Steady State Hypothesis

<!-- FILL: Define normal system behavior -->
| Metric | Expected Value | Tolerance |
|--------|----------------|-----------|
| API Latency p99 | < 200ms | +50% |
| Error Rate | < 0.1% | +0.5% |
| Tenant Isolation | 100% | 0% |

---

## Experiment Definition

<!-- FILL: Define chaos experiments -->
### Experiment 1: {{experiment_name}}

**Hypothesis:** {{expected_outcome}}

**Method:**
1. Inject failure: {{failure_type}}
2. Observe metrics: {{metrics}}
3. Verify tenant isolation maintained

**Rollback Trigger:**
- Error rate > {{threshold}}
- Tenant isolation breach detected

---

## Tenant Impact Assessment

<!-- FILL: Document per-tier impact -->
| Tier | Expected Impact | Mitigation |
|------|-----------------|------------|
| Free | Degraded performance | Rate limiting |
| Pro | No impact | Redundancy |
| Enterprise | No impact | Dedicated resources |

---

## Verification Checklist

- [ ] Steady state defined with measurable metrics
- [ ] Blast radius limited and documented
- [ ] Rollback triggers defined
- [ ] Tenant isolation verification included
- [ ] **CRITICAL:** No cross-tenant impact possible during experiments

---

## Web Research Queries

- "chaos engineering multi-tenant SaaS {{date}}"
- "tenant isolation chaos testing {{date}}"
- "resilience testing best practices {{date}}"

_Source: [URL]_ for key findings.
```

- [ ] **Step 5: Update resilience skill to reference chaos-engineering.md**

Add to `src-v2/skills/bmad-bam-resilience/SKILL.md` Outputs section:
- `./templates/chaos-engineering.md`

- [ ] **Step 6: Verify no broken references remain**

Run: `grep -r "template.md" src-v2/skills/ | grep -v "templates/" | grep -v ".gitkeep"`

Expected: No results (all template references should use relative paths or standards paths).

- [ ] **Step 7: Run full test suite**

Run: `npm test`

Expected: All tests pass.

- [ ] **Step 8: Final verification**

Run: `ls src-v2/data/standards/ && ls src-v2/data/templates/`

Expected:
- standards/: std-validation-report.md, std-convergence-report.md, std-gate-checklist.md
- templates/: .gitkeep only

- [ ] **Step 9: Commit Task 14**

```bash
git add src-v2/
git commit -m "fix(templates): fix broken references and create chaos-engineering template

- Fix disaster-recovery-template.md → disaster-recovery-plan.md
- Fix privacy-compliance-template.md → gdpr-compliance-report.md
- Create chaos-engineering.md based on resilience patterns
- Completes Phase 5: all broken references fixed"
```

---

## Final Validation

- [ ] **Run full test suite**

Run: `npm test`

Expected: All tests pass.

- [ ] **Verify template counts**

Run:
```bash
echo "Standards: $(ls src-v2/data/standards/*.md 2>/dev/null | wc -l)"
echo "Templates in data/templates: $(ls src-v2/data/templates/*.md 2>/dev/null | wc -l)"
echo "Templates in skills: $(find src-v2/skills -path "*/templates/*.md" | wc -l)"
```

Expected:
- Standards: 3
- Templates in data/templates: 0
- Templates in skills: 46 (45 original + 1 chaos-engineering)

- [ ] **Create final commit**

```bash
git commit --allow-empty -m "feat: complete BAM V2 BMAD template compatibility migration

Summary:
- 48 templates now have BMAD-compatible frontmatter
- 3 FORMAT_STANDARD templates in data/standards/
- 45 templates moved to per-skill templates/ directories
- 4 new skills created (mcp, rag, governance, platform)
- 1 new template created (chaos-engineering)
- All broken references fixed

Migration complete. BAM templates now fully integrate with BMAD workflows."
```

---

## Success Criteria

- [x] All 48 BAM templates have BMAD-compatible frontmatter
- [x] 3 FORMAT_STANDARD templates in `data/standards/`
- [x] All other templates in per-skill `templates/` directories
- [x] 4 new skills functional
- [x] No broken template references
- [x] `npm test` passes
- [x] BMAD workflows can load, track progress, and resume BAM templates

---

_Plan generated: 2026-05-03_
