# Deep Analysis: BAM V2 (src-v2) vs BMAD Method Pattern Systems

**Date:** 2026-05-03 | **Scope:** Cross-system pattern architecture, structural compatibility, integration gaps

---

## Executive Summary

| Dimension | BAM V2 (src-v2) | BMAD Method (bmm) | Compatibility |
|-----------|-----------------|-------------------|---------------|
| **Manifest** | `bmad-skill-manifest.yaml` (YAML, flat, 5 fields) | `bmad-manifest.json` (JSON, capability graph, 10+ fields) | **Incompatible schemas** |
| **Workflow** | `workflow.md` + `steps/` (CEV tri-mode, 01-29) | `SKILL.md` stages + `references/` (1-5 stages) | **Different progression models** |
| **Agents** | Inline only (no `agents/` dir) | Dedicated `agents/` (artifact-analyzer, web-researcher) | **BAM cannot reuse BMAD subagents** |
| **Patterns** | CSV registries (`bam-patterns.csv`, 292 rows, `web_queries`) | Document references + inline research | **Data-driven vs agent-driven** |
| **Gates** | 8 explicit QG-* gates with standalone checklists | Implicit stage validation | **BAM more explicit** |
| **Config** | `_bmad/bam/config.yaml` (`tenant_model`, `ai_runtime`) | `_bmad/bmm/config.yaml` (standard vars) | **Namespace isolation** |
| **Overall** | — | — | **~55% structural; 40% behavioral** |

---

## 1. Manifest System Comparison

### BAM V2 (`bmad-skill-manifest.yaml`)
```yaml
type: workflow
name: bmad-bam-master-architecture
displayName: Master Architecture
description: 'Create frozen master architecture...'
module: bam
step_naming_convention: "step-NN-mode-description"
```
- Flat YAML, no dependencies, no menu codes, no headless flag

### BMAD (`bmad-manifest.json`)
```json
{
  "module-code": "bmm",
  "capabilities": [{
    "name": "working-backwards",
    "menu-code": "WB",
    "supports-headless": true,
    "phase-name": "1-analysis",
    "preceded-by": ["brainstorming"],
    "followed-by": ["create-prd"],
    "is-required": false,
    "output-location": "{planning_artifacts}"
  }]
}
```
- Capability graph with dependency chains, menu codes, phase classification

### Gap Table
| Feature | BAM | BMAD | Impact |
|---------|-----|------|--------|
| `preceded-by`/`followed-by` | No | Yes | BMAD installer cannot sequence BAM workflows |
| `menu-code` | No | Yes | No CLI shorthand for BAM skills |
| `supports-headless` | No | Yes | BAM cannot run in CI/automation |
| `is-required` | No | Yes | Cannot enforce core vs optional |
| `output-location` | No | Yes | No standard artifact destination |
| `phase-name` | No | Yes | Cannot filter by dev phase |

---

## 2. Workflow Structure Comparison

### BAM V2: CEV Tri-Mode
```
skill/
├── SKILL.md          # Activation protocol + domain context
├── workflow.md       # CEV routing table (Create 01-09 / Edit 10-19 / Validate 20-29)
├── customize.toml    # Customization surface
├── templates/        # Output templates
└── steps/
    ├── step-01-c-context.md
    ├── step-02-c-model.md
    ├── step-03-c-boundaries.md
    ├── step-04-c-patterns.md
    ├── step-05-c-document.md
    ├── step-10-e-load.md
    ├── step-11-e-apply.md
    ├── step-20-v-load.md
    ├── step-21-v-validate.md
    └── step-22-v-report.md
```
- Atomic, deterministic, sequential steps
- Every step: MANDATORY EXECUTION RULES, CONTEXT BOUNDARIES, SUCCESS METRICS, FAILURE MODES

### BMAD: Stage-Based Conversation
```
skill/
├── SKILL.md              # Stage table + inline Stage 1 (Ignition)
├── customize.toml        # Customization surface
├── bmad-manifest.json    # Capability graph
├── agents/
│   ├── artifact-analyzer.md    # JSON-output subagent
│   └── web-researcher.md       # Search subagent
├── references/
│   ├── press-release.md    # Stage 2
│   ├── customer-faq.md     # Stage 3
│   ├── internal-faq.md     # Stage 4
│   └── verdict.md          # Stage 5
└── assets/
    └── template.md
```
- Conversational, dynamic stage routing
- Resume detection via frontmatter `stage` field
- Subagent fan-out (parallel artifact + web research)

### Gap Table
| Aspect | BAM CEV | BMAD Stages | Impact |
|--------|---------|-------------|--------|
| Granularity | Atomic steps (10+ files) | 4-5 stages | Different abstraction levels |
| Resume | `stepsCompleted` array (missing) | Frontmatter `stage` field | Neither can resume the other |
| UX | Pause after each step | Continuous coaching | Different interaction models |
| Subagents | Inline only | Dedicated `agents/` dir | Cannot parallelize analysis |
| Mode switch | Explicit C/E/V | `--headless` vs default | No cross-system mode switching |

---

## 3. Pattern Registry Comparison

### BAM V2: CSV-Driven + Web Search
- `bam-patterns.csv`: 292 rows, 17 columns (pattern_id, category, decision_criteria, web_queries, verification_gate, shortcode)
- `section-pattern-map.csv`: 25 sections mapping patterns -> workflows -> checklists
- Every pattern has `web_queries` with `{date}` placeholder for live search

### BMAD: Document References + Agent Instructions
- No CSV registry; patterns embedded in SKILL.md and reference docs
- `agents/web-researcher.md`: Procedural web search instructions
- `agents/artifact-analyzer.md`: JSON schema for document analysis output

### Gap Table
| Aspect | BAM | BMAD | Impact |
|--------|-----|------|--------|
| Storage | CSV with IDs | Inline narrative | Cannot cross-reference |
| Web search | Declarative (`web_queries` column) | Procedural (subagent) | Data-driven vs agent-driven |
| Shortcodes | Yes (`ZTI`, `ZCB`, etc.) | No | No mnemonic routing |
| Verification gate linkage | Explicit QG-* column | None | Patterns cannot auto-verify |

---

## 4. Quality Gate Comparison

### BAM V2: Explicit Gate Taxonomy
- **QG-F1**: Foundation Gate (architecture)
- **QG-M1/M2/M3**: Module / Tenant / Agent Runtime
- **QG-I1/I2/I3**: Integration / Tenant Safety / Agent Safety
- **QG-P1**: Production Readiness
- Standalone checklist files: `data/checklists/qg-*.md`

### BMAD: Implicit Validation
- Stage-specific completion criteria in `references/verdict.md`
- No cross-skill gate taxonomy

---

## 5. Config & Namespace Comparison

| System | Config Path | Variables | Collision |
|--------|-------------|-----------|-----------|
| BAM V2 | `_bmad/bam/config.yaml` | `tenant_model`, `ai_runtime` (BAM-specific) | None |
| BMAD | `_bmad/bmm/config.yaml` | `user_name`, `planning_artifacts` (standard) | None |
| Both | `{skills-path}/` | BAM: `bmad-bam-*`, BMAD: `bmad-*` | Semantic overlap |

**Risk:** BAM requires `tenant_model` and `ai_runtime` config variables not declared in BMAD's schema.

---

## 6. Critical Gaps (Ranked)

### 🔴 C1: Manifest Schema Mismatch
BAM V2 uses YAML manifest (5 fields); BMAD requires JSON manifest with capability graph. BMAD installer cannot discover, sequence, or route to BAM skills.

### 🔴 C2: No Dependency Chains
BAM skills declare no `preceded-by`/`followed-by`. Cannot auto-route between BAM and BMAD workflows (e.g., BAM `tenant-isolation` -> BMAD `create-prd`).

### 🔴 C3: No Subagent Architecture
BAM has no `agents/` directory. Cannot reuse BMAD's `artifact-analyzer` (JSON schema output) or `web-researcher` (parallel search). BAM step files embed web search as inline text.

### 🔴 C4: Template Frontmatter Gap
BAM templates lack `stepsCompleted`, `inputDocuments`, `workflowType`, `lastStep`. Cannot participate in BMAD's workflow state tracking or resume logic.

### 🔴 C5: CEV vs Stage Progression Mismatch
BAM: sequential deterministic steps (01-05 create, 20-22 validate). BMAD: conversational dynamic stages with resume detection. Cannot convert a BMAD stage position to a BAM step number.

### 🟠 H1: No Menu Codes
BAM skills have no `menu-code` (e.g., `WB`, `CB`). No CLI/UI shorthand routing.

### 🟠 H2: Missing Config Variables
`tenant_model`, `ai_runtime` used by BAM but not declared in any manifest config_variables.

### 🟠 H3: No Headless Mode
BAM skills lack `supports-headless` flag. Cannot run in automation/CI.

### 🟡 M1: Pattern Registry Isolation
BAM CSV patterns cannot be consumed by BMAD skills; BMAD document patterns cannot be consumed by BAM step files.

### 🟡 M2: Step Section Headers Non-Standard
BAM uses `## MANDATORY EXECUTION RULES`, `## SUCCESS METRICS`, `## FAILURE MODES`. BMAD expects `## Purpose`, `## Actions`, `## Outputs`.

---

## 7. Remediation Roadmap

### Phase 1: Manifest Bridge (2-3h)
For each of 38 BAM skills, create `bmad-manifest.json` alongside existing YAML:
```json
{
  "module-code": "bam",
  "capabilities": [{
    "name": "master-architecture",
    "menu-code": "BA",
    "phase-name": "3-solutioning",
    "preceded-by": ["create-prd", "create-ux-design"],
    "followed-by": ["create-module-architecture"],
    "is-required": false,
    "supports-headless": false,
    "output-location": "{planning_artifacts}"
  }]
}
```

### Phase 2: Subagent Wrapper (3-4h)
Create `src-v2/agents/` with BMAD-compatible wrappers:
- `artifact-analyzer.md`: JSON schema matching BMAD format, but reading BAM pattern CSVs
- `web-researcher.md`: Uses BAM `web_queries` column for search queries

### Phase 3: Template Frontmatter (1-2h)
Add to all BAM skill templates:
```yaml
---
stepsCompleted: []
inputDocuments: []
workflowType: 'bam-master-architecture'
lastStep: 1   # where applicable
---
```

### Phase 4: Config Variable Declaration (30m)
Add to BAM module.yaml or manifests:
```yaml
config_variables:
  - tenant_model
  - ai_runtime
```

### Phase 5: Pattern Registry Adapter (4-6h)
Create `bmad-pattern-adapter.md` agent that:
- Reads BAM CSV registries
- Outputs BMAD-compatible narrative pattern descriptions
- Enables BMAD skills to reference BAM patterns by shortcode

---

## 8. Conclusion

The two pattern systems are **complementary in domain coverage** (BAM extends BMAD into multi-tenant SaaS + AI runtime) but **incompatible in execution model**:

- **BAM V2** is a deterministic, data-driven, step-based system optimized for complex architectural decisions with explicit quality gates and pattern registries.
- **BMAD Method** is a conversational, agent-driven, stage-based system optimized for product discovery and iterative refinement.

**Full interoperability requires:**
1. Dual manifest system (YAML for BAM internal, JSON for BMAD integration)
2. Subagent bridge for cross-system agent reuse
3. Template frontmatter alignment for workflow state tracking
4. Pattern registry adapter for cross-referencing

**Estimated effort: ~12-16 hours for full bidirectional compatibility.**

---
*Generated via deep structural analysis of src-v2/ and external/bmad-method/src/bmm-skills/*
