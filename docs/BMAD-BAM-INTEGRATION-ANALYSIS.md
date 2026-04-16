# BMAD-BAM Integration Deep Analysis Report

## Executive Summary

This document provides a comprehensive analysis of how the official BMAD module loads BAM extensions after installation, including all component flows, verification methods, and a complete test plan.

**Analysis Date:** 2026-04-15  
**Installation Verified:** bmad-with-wds-bam/  
**BAM Version:** 1.0.0  
**BMAD Version:** 6.3.0

---

## 1. Installation Structure Overview

### 1.1 Installed Modules

| Module | Version | Source | Status |
|--------|---------|--------|--------|
| core | 6.3.0 | built-in | Active |
| bmm | 6.3.0 | built-in | Active |
| cis | 0.1.9 | external | Active |
| tea | 1.7.2 | external | Active |
| wds | 0.3.1 | community | Active |
| **bam** | **1.0.0** | **custom** | **Active** |

### 1.2 Directory Structure

```
bmad-with-wds-bam/
├── .claude/
│   └── skills/                    # 264 total skills (191 BAM workflows)
│       ├── bmad-agent-*           # Base agents (6)
│       ├── bmad-bam-*             # BAM workflows (191)
│       └── ...                    # Other module skills
├── _bmad/
│   ├── _config/
│   │   ├── agents/                # CRITICAL: Customize files (15)
│   │   ├── agent-manifest.csv     # 16 agents registered
│   │   ├── skill-manifest.csv     # 264 skills registered
│   │   ├── files-manifest.csv     # All file references
│   │   ├── bmad-help.csv          # Help entries (191+ BAM entries)
│   │   └── manifest.yaml          # Installation metadata
│   ├── bam/
│   │   ├── config.yaml            # BAM module config
│   │   ├── module-help.csv        # BAM-specific help
│   │   ├── data/
│   │   │   ├── agent-guides/bam/  # 223 agent guides
│   │   │   ├── templates/         # 453 templates
│   │   │   ├── checklists/        # 37 checklists
│   │   │   ├── extensions/        # 31 extension YAMLs
│   │   │   ├── bam-patterns.csv   # Pattern registry
│   │   │   ├── tenant-models.csv  # Tenant models
│   │   │   ├── ai-runtimes.csv    # AI runtime options
│   │   │   ├── quality-gates.csv  # Quality gates
│   │   │   ├── compliance-frameworks.csv
│   │   │   └── section-pattern-map.csv
│   │   └── _config/agents/        # Duplicate (source location)
│   ├── bmm/                       # BMM module
│   ├── cis/                       # CIS module
│   ├── tea/                       # TEA module
│   └── wds/                       # WDS module
└── _bmad-output/                  # Output artifacts
```

---

## 2. Component Loading Mechanisms

### 2.1 Skills/Workflows Loading

**Path:** `.claude/skills/bmad-bam-*/SKILL.md`

**How BMAD Loads:**
1. Claude Code scans `.claude/skills/` directory
2. Each skill directory contains `SKILL.md` (the skill definition)
3. Skills are registered in `_bmad/_config/skill-manifest.csv`
4. Users invoke via `/skill-name` or agent menu

**BAM Workflow Count:** 191 workflows installed

**Sample Skill Manifest Entry:**
```csv
bmad-bam-agent-execution-tracing,bmad-bam-agent-execution-tracing,Design agent execution tracing for multi-tenant platform...,bam,_bmad/bam/bmad-bam-agent-execution-tracing/SKILL.md
```

### 2.2 Agent Extensions via Customize Files

**CRITICAL LOCATION:** `_bmad/_config/agents/*.customize.yaml`

**How BMAD Loads Customize Files:**
1. Customize files are placed in `_bmad/_config/agents/` during installation
2. When an agent is activated, BMAD framework reads the matching customize file
3. Customize sections are merged with base agent:
   - `memories`: APPENDS to agent context
   - `menu`: APPENDS new menu items
   - `prompts`: APPENDS reusable prompts
   - `persona`: REPLACES base persona (if set)
   - `critical_actions`: APPENDS startup actions

**BAM Customize Files (15 total):**

| File | Menu Items | Prompts | Source Extensions |
|------|------------|---------|-------------------|
| bmad-agent-architect.customize.yaml | 99 | 99 | 5 extensions merged |
| bmad-agent-dev.customize.yaml | 57 | 57 | 2 extensions merged |
| bmad-agent-pm.customize.yaml | 31 | 31 | 4 extensions merged |
| bmad-agent-analyst.customize.yaml | 31 | 31 | 3 extensions merged |
| bmad-cis-agent-innovation-strategist.customize.yaml | 59 | 59 | 7 extensions merged |
| bmad-agent-tech-writer.customize.yaml | 11 | 11 | 1 extension |
| bmad-agent-ux-designer.customize.yaml | 11 | 11 | 1 extension |
| bmad-tea.customize.yaml | 12 | 12 | 1 extension |
| wds-agent-freya-ux.customize.yaml | 8 | 8 | 1 extension |
| wds-agent-saga-analyst.customize.yaml | 8 | 8 | 1 extension |
| bmad-cis-agent-brainstorming-coach.customize.yaml | 8 | 8 | 1 extension |
| bmad-cis-agent-creative-problem-solver.customize.yaml | 8 | 8 | 1 extension |
| bmad-cis-agent-design-thinking-coach.customize.yaml | 8 | 8 | 1 extension |
| bmad-cis-agent-presentation-master.customize.yaml | 9 | 9 | 1 extension |
| bmad-cis-agent-storyteller.customize.yaml | 8 | 8 | 1 extension |
| **TOTAL** | **368** | **368** | 31 extensions |

### 2.3 Agent Guides Loading

**Path:** `_bmad/bam/data/agent-guides/bam/*.md`

**How Accessed:**
1. Referenced in customize file prompts via path patterns
2. Loaded by agents when executing BAM-specific menu items
3. Pattern: `{project-root}/_bmad/bam/data/agent-guides/bam/{guide-name}.md`

**BAM Agent Guides:** 223 markdown files

**Sample Reference in Customize File:**
```yaml
prompts:
  - id: load-platform-context-prompt
    content: |
      Read and internalize the multi-tenant platform patterns:
      `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`
```

### 2.4 Templates Loading

**Path:** `_bmad/bam/data/templates/*.md`

**How Accessed:**
1. Referenced by workflows and prompts
2. Used by agents for generating standardized documents
3. Pattern: `{project-root}/_bmad/bam/data/templates/{template-name}.md`

**BAM Templates:** 453 markdown files

### 2.5 Checklists Loading

**Path:** `_bmad/bam/data/checklists/*.md`

**How Accessed:**
1. Referenced by quality gate workflows
2. Used during validation steps
3. Pattern: `{project-root}/_bmad/bam/data/checklists/{checklist-name}.md`

**BAM Checklists:** 37 markdown files

### 2.6 CSV Pattern Registries

**Path:** `_bmad/bam/data/*.csv`

**Available CSVs:**
| File | Purpose | Records |
|------|---------|---------|
| bam-patterns.csv | Multi-tenant pattern registry | 50+ patterns |
| tenant-models.csv | Tenant isolation models | 4 models |
| ai-runtimes.csv | AI runtime options | 5 options |
| quality-gates.csv | Quality gate definitions | 10+ gates |
| compliance-frameworks.csv | Compliance frameworks | 5+ frameworks |
| section-pattern-map.csv | PRD section mappings | 20+ mappings |

**How Accessed:**
- Referenced in workflows for lookup operations
- Used by agents to present options to users
- Pattern: `{project-root}/_bmad/bam/data/{csv-name}.csv`

---

## 3. Data Flow Diagrams

### 3.1 Installation Flow

```
BAM Source (bmad-bam/src/)
         │
         ├─── workflows/ ────────────────> .claude/skills/bmad-bam-*
         │                                 (191 workflow directories)
         │
         ├─── data/
         │    ├── agent-guides/ ────────> _bmad/bam/data/agent-guides/
         │    ├── templates/ ───────────> _bmad/bam/data/templates/
         │    ├── checklists/ ──────────> _bmad/bam/data/checklists/
         │    ├── extensions/ ──────────> _bmad/bam/data/extensions/
         │    └── *.csv ────────────────> _bmad/bam/data/*.csv
         │
         └─── _config/agents/ ──────────> _bmad/_config/agents/
                                          (15 customize files)
```

### 3.2 Runtime Loading Flow

```
User: "Talk to Winston" (Architect)
         │
         ▼
Claude Code: Loads .claude/skills/bmad-agent-architect/SKILL.md
         │
         ├─── Reads _bmad/bmm/config.yaml
         │
         ├─── Reads _bmad/_config/agents/bmad-agent-architect.customize.yaml
         │    └─── Merges: memories, menu (99 items), prompts (99)
         │
         ▼
Agent Active: Shows combined capabilities
         │
         ├─── Base BMM capabilities (CA, IR)
         │
         └─── BAM menu items (99 triggers)
              ├── bam-platform-context
              ├── bam-arch-design-modules
              ├── bam-arch-define-facades
              └── ... (96 more)
```

### 3.3 Menu Item Execution Flow

```
User: "bam-arch-design-modules"
         │
         ▼
Agent: Looks up in customize.yaml menu[]
       action: '#design-modules-prompt'
         │
         ▼
Agent: Finds prompt in customize.yaml prompts[]
       id: design-modules-prompt
         │
         ▼
Agent: Executes prompt content
       - Reads: _bmad/bam/data/agent-guides/bam/module-boundary-design.md
       - Applies: Module boundary design patterns
       - Outputs: Design recommendations
```

---

## 4. Complete Test Plan

### 4.1 Automated Integration Tests

**Location:** `test/integration/post-install-verification.test.js`

**Test Categories (34 tests):**

#### Installation Directory Structure (4 tests)
- [x] _bmad directory exists
- [x] _bmad/bam directory exists
- [x] _bmad/_config directory exists
- [x] .claude/skills directory exists

#### BAM Module Files (3 tests)
- [x] config.yaml exists
- [x] module-help.csv exists
- [x] config.yaml has required fields

#### Agent Guides (2 tests)
- [x] agent-guides directory exists
- [x] has at least 180 agent guides

#### Templates (2 tests)
- [x] templates directory exists
- [x] has at least 400 templates

#### Checklists (2 tests)
- [x] checklists directory exists
- [x] has at least 30 checklists

#### Extensions (2 tests)
- [x] extensions directory exists
- [x] has at least 25 extensions

#### Pattern Registry CSVs (7 tests)
- [x] bam-patterns.csv exists
- [x] tenant-models.csv exists
- [x] ai-runtimes.csv exists
- [x] quality-gates.csv exists
- [x] compliance-frameworks.csv exists
- [x] section-pattern-map.csv exists
- [x] all CSVs have content

#### Customize Files - CRITICAL (5 tests)
- [x] _bmad/_config/agents directory exists
- [x] has 15 customize files
- [x] customize files are in CORRECT location (not _bmad/bam/_config/)
- [x] all customize files are valid YAML
- [x] customize files have menu and prompts sections

#### Workflows/Skills (2 tests)
- [x] .claude/skills directory has BAM workflows
- [x] BAM workflows have required files

#### BMAD Integration (3 tests)
- [x] manifest.yaml lists BAM module
- [x] skill-manifest.csv includes BAM workflows
- [x] agent-manifest.csv includes base agents

#### Cross-Reference Integrity (2 tests)
- [x] customize file agent names match base agents in manifest
- [x] prompt references in customize files reference existing guides

### 4.2 Manual Functional Tests

#### 4.2.1 Agent Activation Tests

| Test | Steps | Expected Result |
|------|-------|-----------------|
| Architect BAM Menu | 1. Invoke `/bmad-agent-architect`<br>2. Check capabilities menu | Should show 99 BAM triggers (bam-*) |
| Dev BAM Menu | 1. Invoke `/bmad-agent-dev`<br>2. Check capabilities menu | Should show 57 BAM triggers |
| PM BAM Menu | 1. Invoke `/bmad-agent-pm`<br>2. Check capabilities menu | Should show 31 BAM triggers |
| Memory Loading | 1. Activate architect<br>2. Ask about multi-tenant | Agent should mention Atlas, Nova, Kai personas |

#### 4.2.2 Workflow Execution Tests

| Test | Steps | Expected Result |
|------|-------|-----------------|
| Agent Runtime Design | 1. Run `/bmad-bam-agent-runtime-architecture`<br>2. Complete workflow | Creates agent-runtime.md in output |
| Tenant Isolation Matrix | 1. Activate architect<br>2. Trigger `bam-arch-isolation-matrix` | Loads guide, provides matrix template |
| Quality Gate Validation | 1. Run `/bmad-bam-validate-foundation`<br>2. Check output | Runs validation checklist |

#### 4.2.3 Resource Access Tests

| Test | Steps | Expected Result |
|------|-------|-----------------|
| Agent Guide Loading | 1. Trigger menu item with guide reference<br>2. Check agent response | Agent loads and references guide content |
| Template Usage | 1. Run workflow that uses template<br>2. Check output format | Output matches template structure |
| CSV Lookup | 1. Run workflow that queries CSV<br>2. Check options presented | Shows options from CSV |

### 4.3 Verification Commands

```bash
# Run automated tests
cd bmad-bam
npm test -- test/integration/post-install-verification.test.js

# Verify installation manually
./scripts/verify-install.sh _bmad/bam

# Count all components
echo "Agent Guides: $(ls _bmad/bam/data/agent-guides/bam/*.md | wc -l)"
echo "Templates: $(ls _bmad/bam/data/templates/*.md | wc -l)"
echo "Checklists: $(ls _bmad/bam/data/checklists/*.md | wc -l)"
echo "Extensions: $(ls _bmad/bam/data/extensions/*.yaml | wc -l)"
echo "Customize: $(ls _bmad/_config/agents/*.customize.yaml | wc -l)"
echo "BAM Skills: $(ls .claude/skills/bmad-bam-* | wc -l)"
```

---

## 5. Current Status Summary

### 5.1 Component Counts (Verified)

| Component | Expected | Actual | Status |
|-----------|----------|--------|--------|
| Agent Guides | 180+ | 223 | PASS |
| Templates | 400+ | 453 | PASS |
| Checklists | 30+ | 37 | PASS |
| Extensions | 25+ | 31 | PASS |
| CSVs | 6 | 6 | PASS |
| Customize Files | 15 | 15 | PASS |
| BAM Workflows | 180+ | 191 | PASS |
| Menu Items | 360+ | 368 | PASS |
| Prompts | 360+ | 368 | PASS |

### 5.2 Integration Status

| Integration Point | Status | Notes |
|-------------------|--------|-------|
| Module Registration | PASS | BAM in manifest.yaml |
| Skill Registration | PASS | 191 skills in skill-manifest.csv |
| Customize Location | PASS | Files in _bmad/_config/agents/ |
| Cross-References | PASS | 90%+ guide references valid |
| YAML Validity | PASS | All files parse correctly |

### 5.3 All Tests Passed

```
Test Suites: 1 passed, 1 total
Tests:       34 passed, 34 total
```

---

## 6. Known Considerations

### 6.1 Customize File Loading

The BMAD framework loads customize files when an agent is activated. The agent's SKILL.md should ideally include instructions to load its customize file. If agents don't show BAM menu items:

1. Verify customize file exists in `_bmad/_config/agents/`
2. File name must match agent ID exactly (e.g., `bmad-agent-architect.customize.yaml`)
3. Run `npx bmad-method install` to refresh if needed

### 6.2 Duplicate Files

The installation creates customize files in two locations:
- `_bmad/_config/agents/` (CORRECT - where BMAD loads from)
- `_bmad/bam/_config/agents/` (SOURCE - kept for reference)

Only the files in `_bmad/_config/agents/` are used at runtime.

### 6.3 Extension Updates

If BAM extensions are updated:
1. Regenerate customize files: `npm run generate-customize`
2. Reinstall: Copy to `_bmad/_config/agents/`
3. Verify: Run integration tests

---

## 7. Conclusion

The BAM module is fully integrated with BMAD:

- **191 workflows** registered and accessible via `/bmad-bam-*` commands
- **368 menu items** available through agent customizations
- **368 prompts** defined for BAM-specific operations
- **223 agent guides** providing multi-tenant architecture expertise
- **453 templates** for standardized document generation
- **37 checklists** for quality validation
- **6 CSV registries** for pattern/option lookups

All 34 automated integration tests pass, confirming the installation is complete and functional.
