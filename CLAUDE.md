# CLAUDE.md - BAM Extension Module

> **⚠️ READ FIRST — V6 IN PROGRESS (2026-05-11):**
> This file describes **BAM v3** (which still lives in `src-v2/`). v6 is being built fresh in `src-v6/`.
> - **Canonical v6 spec (LOCKED):** `docs/v6-final-architecture.md` (1538 lines, v0.4)
> - **Active implementation plan:** `docs/superpowers/plans/2026-05-11-wave-0-smoke-test.md`
> - **For fresh Claude Code sessions on RDP:** see `docs/v6-rdp-kickoff.md`
> - v3 conventions below remain valid for `src-v2/` only. For v6 work, treat this file as historical.

> **Quick Start (v3 only):** BAM is a **pure extension module** for multi-tenant SaaS. **14 TOMLs, 38 skills, 112 patterns, 20 domains, 37 checklists, 46 templates, 3 standards**. Run `npm test` before any PR. Never use TOML `memories` key.

> **Wave 0 outcome (2026-05-12):** BAM v6 selected **Plan A** for activation against BMAD v6.6.0 — the universal-glob string `file:{project-root}/**/project-context.md` survives BMAD's three-layer customize merge into core skills' resolved `agent.persistent_facts`. P2+ inherits this selection from `_bmad/bam/family.json`. See `_bmad/_memory/atlas/architecture-decisions/2026-05-11-001-wave-0-plan-selected.md` (Atlas ADR) and `tests/wave-0/WAVE-0-OUTCOME.md` (run output + Plan-A caveats) for detail. Task 0 mechanism note: BMAD's customize resolver is **Python** (`_bmad/scripts/resolve_customization.py`, requires Python 3.11+); it does string-level TOML merge only — `file:`/glob expansion happens at LLM activation, not in the resolver.

> **P3.2 outcome (2026-05-17):** ADR-016 landed; 4 Lifecycle skills active (tenant-onboarding ZON, tenant-offboarding ZOF, multi-tenant-testing ZMT, tenant-migration-tooling ZTG); QG-M2 refined to v1.1.0 (C6 auto-promote); QG-M1 promoted to blocking v1.0.0; QG-D1 partial v0.1.0 created; Atlas fragments 24→37; anti-patterns 4→8; glossary 6→13; menu codes 8→12. Marketplace bumped to v0.6.0.

---

## What is BAM?

BAM (BMAD Agentic Multi-tenant) adds multi-tenant SaaS architecture capabilities to BMAD agents.

**Key Facts:**
- **Pure extension** - 0 standalone agents, extends existing BMAD agents
- **3 personas** - Atlas (Platform), Nova (AI Runtime), Kai (Integration)
- **TOML config** - BMAD v6.4.0 format with Z/Y prefix menu codes
- **Pattern-driven** - 112 patterns with decision matrices and web queries

**Capabilities:**
- Multi-tenant isolation (RLS, schema-per-tenant, database-per-tenant)
- AI agent orchestration (LangGraph, CrewAI, AutoGen, DSPy, Instructor)
- 40 quality gates for SaaS readiness
- Web search integration with `{date}` placeholder for current practices

---

## Architecture

```
src-v2/
├── customize/           # 14 TOML files (agent extensions)
├── skills/              # 38 workflow skills (CEV modes)
│   └── bmad-bam-*/
│       └── templates/   # 46 templates (moved from data/templates/)
└── data/
    ├── context/         # bam-core.md (loaded by all TOMLs)
    ├── patterns/        # 112 pattern files with shortcodes
    ├── domains/         # 20 domain context files
    ├── checklists/      # 37 QG-* quality gate checklists
    ├── templates/       # Empty (templates moved to skills)
    ├── standards/       # 3 shared format standards (std-*)
    ├── personas/        # 3 architect personas
    ├── sidecar/         # 3 memory templates
    └── *.csv            # 6 registry files
```

### Asset Counts

| Asset | Count | Purpose |
|-------|-------|---------|
| TOML customize | 14 | Agent capability extensions |
| Workflow skills | 38 | CEV-mode workflows |
| Pattern files | 112 | Architecture patterns with shortcodes |
| Domain files | 20 | Multi-tenant context |
| Checklists | 37 | Quality gate verification |
| Templates | 46 | Output artifacts (in skill templates/) |
| Standards | 3 | Shared format standards (validation, convergence, gate) |
| CSV registries | 6 | Pattern/gate/compliance data |

---

## Workflow Skills

Skills use CEV (Create/Edit/Validate) modes in unified `steps/` directory:

| Mode | Step Range | Purpose |
|------|------------|---------|
| Create | `step-01-c-*` to `step-09-c-*` | Generate new artifact |
| Edit | `step-10-e-*` to `step-19-e-*` | Modify existing artifact |
| Validate | `step-20-v-*` to `step-29-v-*` | Check against criteria |

**Skill Structure:**
```
src-v2/skills/bmad-bam-{name}/
├── SKILL.md                    # Instructions
├── bmad-skill-manifest.yaml    # Metadata
├── customize.toml              # Skill-specific TOML
├── workflow.md                 # Mode router
├── templates/                  # Output artifact templates
└── steps/                      # CEV step files
```

**Key Skills:**
- `bmad-bam-master-architecture` - Foundation design (QG-F1)
- `bmad-bam-tenant-isolation` - Tenant isolation (QG-M2)
- `bmad-bam-agent-runtime` - AI orchestration (QG-M3)
- `bmad-bam-convergence` - Integration verification (QG-I1-I3)
- `bmad-bam-production-readiness` - Production gate (QG-P1)

---

## Pattern Files

Patterns provide decision guidance with YAML frontmatter:

```yaml
---
pattern_id: tenant-isolation
shortcode: ZTI
category: tenant-isolation
qg_ref: QG-M2
version: 1.0.0
last_reviewed: 2026-05-02
---
```

**Required Sections:**
- `## When to Use` - Conditions (3+ bullets)
- `## When NOT to Use` - Anti-conditions
- `## Architecture` - YAML schemas, ASCII diagrams
- `## Trade-offs` - Decision matrix table
- `## Quality Checks` - Including `**CRITICAL:**` item
- `## Web Research Queries` - With `{date}` placeholder

**Shortcode Prefixes:**
| Category | Prefix | Examples |
|----------|--------|----------|
| Tenant | ZT | ZTI, ZTQ |
| AI/Agent | ZA | ZAO, ZAH |
| MCP | ZM | ZML, ZMT |
| Security | ZS | ZSM, ZZT |
| RAG | ZR | ZRP, ZRS |

---

## TOML Format

```toml
[agent]
activation_steps_append = [
  "BAM capabilities available. Use ZTI for tenant isolation.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
]

principles = [
  "BAM: All data access is tenant-scoped.",
  "BAM Gates: QG-M2 (Tenant Isolation).",
]

[[agent.menu]]
code = "ZTI"
description = "Tenant Isolation: RLS, schema, database patterns"
skill = "bmad-bam-tenant-isolation"
```

**Rules:**
- All TOMLs reference `bam-core.md` in `persistent_facts`
- Menu codes use Z/Y prefix
- Never use `memories` field

---

## Quality Gates

| Gate | Skill | Purpose |
|------|-------|---------|
| QG-F1 | bmad-bam-master-architecture | Foundation complete |
| QG-M1 | bmad-bam-module-architecture | Module boundaries |
| QG-M2 | bmad-bam-tenant-isolation | Tenant isolation |
| QG-M3 | bmad-bam-agent-runtime | AI runtime safety |
| QG-I1-I3 | bmad-bam-convergence | Integration verification |
| QG-P1 | bmad-bam-production-readiness | Production ready |

---

## Configuration Variables

| Variable | Values | Usage |
|----------|--------|-------|
| `{tenant_model}` | `row-level-security`, `schema-per-tenant`, `database-per-tenant` | Isolation strategy |
| `{ai_runtime}` | `langgraph`, `crewai`, `autogen`, `dspy`, `instructor` | AI framework |
| `{project-root}` | Project directory | File paths |
| `{date}` | Current year | Web search queries |

---

## File Locations

| Need | Location |
|------|----------|
| Add TOML | `src-v2/customize/bmad-agent-{role}.toml` |
| Add skill | `src-v2/skills/bmad-bam-{name}/` |
| Add pattern | `src-v2/data/patterns/{pattern}.md` |
| Add domain | `src-v2/data/domains/{domain}.md` |
| Add checklist | `src-v2/data/checklists/qg-{id}.md` |
| Add template | `src-v2/skills/bmad-bam-{skill}/templates/{artifact}.md` |
| Add standard | `src-v2/data/standards/std-{name}.md` |
| Core context | `src-v2/data/context/bam-core.md` |
| Pattern CSV | `src-v2/data/bam-patterns.csv` |

---

## Anti-Patterns

| Anti-Pattern | Why Wrong | Correct Approach |
|--------------|-----------|------------------|
| `memories` in TOML | Not BMAD standard | Use `persistent_facts` |
| Code in patterns | Patterns describe WHAT | Use YAML schemas only |
| Hardcoded paths | Won't work after install | Use `{project-root}` |
| Hardcoded year | Becomes stale | Use `{date}` placeholder |
| Duplicate shortcode | Menu conflicts | Check uniqueness first |
| Missing CRITICAL | No safety gate | Add `**CRITICAL:**` check |

---

## Testing

```bash
npm test                    # All tests
npm test -- test/v2/        # V2 tests only
npm test -- --watch         # Watch mode
```

**Expected Counts:**
| Asset | Count |
|-------|-------|
| TOML files | 14 |
| Skills | 38 |
| Patterns | 112 |
| Domains | 20 |
| Checklists | 37 |
| Templates | 46 |
| Standards | 3 |

**Validation Commands:**
```bash
# Check shortcode uniqueness
grep "^shortcode:" src-v2/data/patterns/*.md | awk -F': ' '{print $2}' | sort | uniq -d

# Verify pattern has CSV entry
grep "^tenant-isolation," src-v2/data/bam-patterns.csv

# Find broken cross-references
for f in src-v2/data/patterns/*.md; do
  grep -oP '\]\(([a-z-]+\.md)\)' "$f" | tr -d ']()' | while read r; do
    [ ! -f "src-v2/data/patterns/$r" ] && echo "$f -> $r BROKEN"
  done
done
```

---

## Contributing

Before submitting changes:

- [ ] `npm test` passes
- [ ] No `memories` field in TOMLs
- [ ] Patterns have all required sections
- [ ] Patterns include `**CRITICAL:**` check
- [ ] Web queries use `{date}` placeholder
- [ ] Shortcodes are unique (check before assigning)
- [ ] CSV entry exists for new patterns
- [ ] Templates have YAML frontmatter

**Adding a Pattern:**
1. Check shortcode uniqueness
2. Create `src-v2/data/patterns/{name}.md` with frontmatter
3. Add CSV row to `src-v2/data/bam-patterns.csv`
4. Add TOML menu entry if needed
5. Run tests

**Adding a Skill:**
1. Create `src-v2/skills/bmad-bam-{name}/`
2. Add SKILL.md, bmad-skill-manifest.yaml, workflow.md
3. Add steps/ with CEV step files
4. Add templates/ with output artifact templates
5. Run tests

---

## Version Compatibility

| Component | Required |
|-----------|----------|
| Node.js | >= 20.0.0 |
| BMAD Method | >= 6.4.0 |
