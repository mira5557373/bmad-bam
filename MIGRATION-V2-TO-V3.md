# BAM v2 → v3 Migration Guide

**Version:** v3.0 (released 2026-05-04)
**Branch:** `feat/bam-v3-pure-kb`
**Breaking change scope:** Major (38 → 5 BAM skills)

---

## TL;DR

BAM v3 is a **pure knowledge-base module**. It replaces 38 BAM-specific skills with **5 retained skills + native BMAD KB injection**. Users invoke standard BMAD skills (`bmad-create-architecture`, `bmad-create-prd`, etc.) and BAM patterns are auto-loaded as foundational context — no customize override required.

**No automated migration script.** v3 is breaking by design. This guide tells you what changed and how to adapt.

---

## What Changed

### Before (v2)
You invoked BAM skills directly:
```bash
# v2 — 38 BAM-specific skills
bmad-bam-master-architecture
bmad-bam-tenant-isolation
bmad-bam-agent-runtime
bmad-bam-compliance
bmad-bam-security
# ... 33 more
```

### After (v3)
You invoke standard BMAD skills. BAM patterns are auto-loaded:
```bash
# v3 — 5 BAM-specific skills + BMAD-native injection
bmad-create-architecture          # auto-loads BAM context via **/project-context.md glob
bmad-create-prd                   # same
bmad-create-story                 # same

# 5 BAM-only skills retained for genuinely unique workflows
bmad-bam-master-architecture       # tenant-aware top-level architecture
bmad-bam-tenant-onboarding         # multi-tenant lifecycle
bmad-bam-tenant-offboarding        # mirror with GDPR right-to-deletion
bmad-bam-mcp-server-config         # MCP server lifecycle
bmad-bam-rag-pipeline-design       # RAG pipeline architecture
```

---

## How v3 Auto-Loads BAM Patterns

When BAM v3 is installed, the post-install script writes:

```
_bmad/bam/project-context.md
```

This file is **automatically loaded by every BMAD skill** because each BMAD skill's `customize.toml` ships with:

```toml
persistent_facts = ["file:{project-root}/**/project-context.md"]
```

This is a **glob pattern** — any `project-context.md` anywhere in the project tree is loaded as foundational context. BAM v3 leverages this native mechanism instead of shipping customize overrides.

**Result:** Run `bmad-create-architecture` and BAM tenant + AI runtime + compliance patterns are auto-included.

---

## Skill-by-Skill Migration

### Skills That Stayed (5)

| v2 Skill | v3 Skill | Notes |
|---|---|---|
| `bmad-bam-master-architecture` | `bmad-bam-master-architecture` | Same name, hardened for BMAD validator |
| `bmad-bam-tenant-onboarding` | `bmad-bam-tenant-onboarding` | Same name |
| `bmad-bam-tenant-offboarding` | `bmad-bam-tenant-offboarding` | Same name |
| `bmad-bam-mcp` | `bmad-bam-mcp-server-config` | **Renamed** — update your invocations |
| `bmad-bam-rag` | `bmad-bam-rag-pipeline-design` | **Renamed** — update your invocations |

### Skills That Dissolved → Use Standard BMAD Skill (with optional customize template)

When you used to invoke a BAM skill, now invoke the BMAD equivalent. BAM patterns load automatically.

| v2 BAM Skill | v3 Replacement | Optional Customize Template |
|---|---|---|
| `bmad-bam-requirements` | `bmad-create-prd` | `_bmad/bam/customize-templates/bmad-create-prd.toml.example` |
| `bmad-bam-research` | `bmad-create-prd` (research mode) | (same template) |
| `bmad-bam-module-architecture` | `bmad-create-architecture` (module-scope) | `_bmad/bam/customize-templates/bmad-create-architecture.toml.example` |
| `bmad-bam-module-epics` | `bmad-create-epics` | (no template needed) |
| `bmad-bam-cross-module-story` | `bmad-create-story` | (no template needed) |
| `bmad-bam-testing` | `bmad-validate-prd` | (no template needed) |
| `bmad-bam-production-readiness` | `bmad-validate-prd` (PRG mode) | (no template needed) |
| `bmad-bam-triage` | `bmad-correct-course` | `_bmad/bam/customize-templates/bmad-correct-course.toml.example` |
| `bmad-bam-agent-debug` | `bmad-correct-course` | (same template) |
| `bmad-bam-security-operations` | `bmad-correct-course` | (same template) |

### Skills That Dissolved → Knowledge in Patterns

These skills' content is now in `data/patterns/`. Look up by shortcode in `_bmad/bam/data/patterns/_index.md`:

| v2 BAM Skill | Pattern Lookup |
|---|---|
| `bmad-bam-tenant-isolation` | ZTI — `tenant-isolation.md` |
| `bmad-bam-agent-runtime` | ZAO — `agent-orchestration.md`, ZRL — `runtime-loops.md` |
| `bmad-bam-resilience` | ZCB — `circuit-breaker.md`, ZFC — `fanout-circuit-breaker.md` |
| `bmad-bam-security` | ZZT — `zero-trust.md`, ZSF — `semantic-firewall.md`, ZSL — `secret-leak-detector.md` |
| `bmad-bam-observability` | ZOB — `ai-observability.md`, ZOD — `output-drift-monitor.md`, ZIF — `invisible-failure-detector.md` |
| `bmad-bam-compliance` | ZCR — `compliance-reporting.md`, ZRE — `regulatory-clock-engine.md` |
| `bmad-bam-privacy-compliance` | ZAY — `anonymization.md`, ZCM — `consent-management.md`, ZGD — `gdpr-compliance.md`, ZRD — `right-to-deletion.md` |
| `bmad-bam-data-residency` | ZDY — `data-residency.md` |
| `bmad-bam-events` | ZEA — `event-driven-agents.md` |
| `bmad-bam-caching` | ZCG — `cache-invalidation.md` |
| `bmad-bam-billing` | ZCA — `cost-attribution-engine.md` |
| `bmad-bam-scaling` | ZED — `edge-deployment.md`, ZGE — `geo-distribution.md`, ZPR — `predictive-scaling.md` |
| `bmad-bam-platform` | ZAM — `agent-marketplace.md`, ZPG — `plugin-architecture.md` |
| `bmad-bam-governance` | ZAW — `access-reviews.md` |
| `bmad-bam-tool-contracts` | ZTE — `tool-execution.md`, ZTP — `tool-permission-model.md`, ZTS — `tool-sbom-registry.md` |
| `bmad-bam-memory-tiers` | (Nova persona + agent-memory patterns) |
| `bmad-bam-llm-versioning` | ZFT — `fine-tuning-pipeline.md` |
| `bmad-bam-api-versioning` | ZTV — `tool-schema-versioning.md`, ZAI — `api-integration.md` |
| `bmad-bam-auth-integration` | ZSO — `sso-auth.md`, ZSI — `sso-integration.md` |
| `bmad-bam-facade-contract` | ZAX — `action-contract.md` |
| `bmad-bam-agent-tracing` | ZRX — `reasoning-trace-collector.md` |
| `bmad-bam-convergence` | (QG-I1 checklist) |
| `bmad-bam-white-labeling` | `_bmad/bam/data/runbooks/white-labeling-checklist.md` (operational runbook) |

---

## Step-by-Step Migration

### 1. Backup Your v2 Installation

```bash
cp -r _bmad _bmad.v2.backup
```

### 2. Uninstall BAM v2

```bash
rm -rf _bmad/bmad-bam   # remove old BAM data
rm -f  _bmad/custom/bmad-agent-*.toml   # remove old BAM persona overrides if you customized them
```

### 3. Install BAM v3

```bash
npx bmad-method install
# Select BAM module when prompted
# Answer prompts: tenant_model, ai_runtime, compliance_frameworks
```

### 4. Verify v3 Installation

```bash
ls _bmad/bam/                                    # should show: project-context.md, data/, etc.
cat _bmad/bam/project-context.md | head -20      # should show BAM v3 context header
ls _bmad/bam/customize-templates/                # 3 .toml.example files
ls _bmad/bam/data/patterns/_index.md             # shortcode lookup table
```

### 5. (Optional) Apply Customize Templates

For deeper integration into specific BMAD workflows:

```bash
# Use bmad-customize skill
bmad-customize
# → Choose: Workflow → bmad-create-architecture
# → Apply BAM template: bmad-create-architecture.toml.example
```

### 6. Test the Auto-Loading

Run any BMAD skill and verify BAM patterns appear:

```bash
bmad-create-architecture
# Look for "Loading project-context.md..." in agent's first message
# Architecture document should mention multi-tenant patterns automatically
```

---

## Updating Custom Scripts

If you have automation that invokes BAM v2 skills, update them per the mapping above.

**v2 example:**
```bash
# Old script
node my-pipeline.js && bmad-bam-tenant-isolation && bmad-bam-security
```

**v3 equivalent:**
```bash
# New script — BAM patterns auto-load via project-context.md
node my-pipeline.js && bmad-create-architecture
# (tenant-isolation + security patterns now load automatically)
```

---

## Updating CI/CD

If your CI checks for BAM v2 skills:

```yaml
# Old (v2)
- name: Verify BAM skills
  run: |
    test -d _bmad/skills/bmad-bam-tenant-isolation
    test -d _bmad/skills/bmad-bam-security

# New (v3)
- name: Verify BAM v3
  run: |
    test -f _bmad/bam/project-context.md           # KB injection file
    test -f _bmad/bam/data/patterns/_index.md      # shortcode lookup
    test -d _bmad/skills/bmad-bam-master-architecture  # 1 of 5 retained skills
```

---

## Why This Change?

After deep analysis of BMAD v6.4.0 (see `BAM-V3-PURE-KB-PLAN.md`), we discovered:

1. **Every BMAD skill auto-loads `**/project-context.md` via universal glob** — making BAM's 33 wrapper skills redundant
2. **BAM v2 violated v6.4.0 ownership rules** by shipping files into user-owned `_bmad/custom/`
3. **BMAD has dedicated tooling** (`bmad-customize`, `bmad-help`, `bmad-party-mode`) that BAM should leverage, not reinvent
4. **38 BAM skills require 27 × 38 = 1,026 validator rule checks** vs 5 × 27 = 135 in v3

The result: **simpler, faster, more BMAD-native, lower maintenance.**

---

## Help & Resources

- **Plan:** `BAM-V3-PURE-KB-PLAN.md` — full architecture rationale
- **Dissolution map:** `BAM-V3-DISSOLUTION-MAP.md` — every skill's fate documented
- **Validator baseline:** `BAM-V3-VALIDATOR-BASELINE.md` — pre-v3 compliance audit
- **Pattern index:** `_bmad/bam/data/patterns/_index.md` — shortcode lookup

For questions, open an issue at https://github.com/bmad-code-org/bmad-bam/issues