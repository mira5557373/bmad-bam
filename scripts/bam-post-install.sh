#!/bin/bash
# ============================================================================
# BAM v3 Post-Install Script
# ============================================================================
# Purpose:
#   1. Verify BAM v3 KB data is installed at _bmad/bam/data/
#   2. Generate _bmad/bam/project-context.md (the BMAD-native KB injection file)
#      that every BMAD skill auto-loads via its built-in glob:
#        persistent_facts = ["file:{project-root}/**/project-context.md"]
#   3. Verify all retained skills, pattern CSVs, and persona personas present
#
# WHY THIS IS NEEDED:
#   BAM v3 is a knowledge-base module. It does not ship workflow logic into
#   _bmad/custom/. Instead, it writes a single project-context.md at install
#   time that BMAD's existing customize.toml glob picks up automatically. This
#   makes every BMAD skill (bmad-create-architecture, bmad-create-prd, etc.)
#   tenant-aware without any user customization required.
#
# USAGE:
#   ./bam-post-install.sh                    # Auto-detect project paths
#   ./bam-post-install.sh /path/to/project   # Explicit project path
#   ./bam-post-install.sh --force            # Force regeneration
# ============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Parse arguments
FORCE=false
PROJECT_DIR=""

for arg in "$@"; do
    case $arg in
        --force|-f)
            FORCE=true
            ;;
        *)
            if [ -z "$PROJECT_DIR" ]; then
                PROJECT_DIR="$arg"
            fi
            ;;
    esac
done

# Determine project directory
if [ -z "$PROJECT_DIR" ]; then
    if [ -d "./_bmad" ]; then
        PROJECT_DIR="."
    elif [ -d "../_bmad" ]; then
        PROJECT_DIR=".."
    elif [ -d "../../_bmad" ]; then
        PROJECT_DIR="../.."
    else
        echo -e "${RED}ERROR: Could not auto-detect project directory.${NC}"
        echo "Usage: $0 /path/to/project"
        exit 1
    fi
fi

PROJECT_DIR=$(cd "$PROJECT_DIR" && pwd)
BMAD_DIR="$PROJECT_DIR/_bmad"
BAM_DIR="$BMAD_DIR/bam"
CONTEXT_FILE="$BAM_DIR/project-context.md"

echo -e "${BLUE}===========================================${NC}"
echo -e "${BLUE}BAM v3 Post-Install${NC}"
echo -e "${BLUE}===========================================${NC}"
echo ""
echo "Project: $PROJECT_DIR"
echo "BAM:     $BAM_DIR"
echo ""

# ============================================================================
# 1. Verify BAM module directory exists
# ============================================================================

if [ ! -d "$BAM_DIR" ]; then
    echo -e "${RED}ERROR: BAM module not found at $BAM_DIR${NC}"
    echo "Please run 'npx bmad-method install' first and select the BAM module."
    exit 1
fi

# ============================================================================
# 2. Verify BAM KB structure
# ============================================================================

echo -e "${CYAN}Verifying BAM KB structure...${NC}"

ERRORS=0

check_dir() {
    local path="$1"
    local name="$2"
    if [ -d "$path" ]; then
        local count=$(ls "$path" 2>/dev/null | wc -l)
        echo -e "  ${GREEN}[OK]${NC} $name ($count files)"
    else
        echo -e "  ${RED}[MISSING]${NC} $name at $path"
        ERRORS=$((ERRORS + 1))
    fi
}

check_file() {
    local path="$1"
    local name="$2"
    if [ -f "$path" ]; then
        echo -e "  ${GREEN}[OK]${NC} $name"
    else
        echo -e "  ${RED}[MISSING]${NC} $name at $path"
        ERRORS=$((ERRORS + 1))
    fi
}

# KB directories
check_dir "$BAM_DIR/data/patterns" "data/patterns/"
check_dir "$BAM_DIR/data/checklists" "data/checklists/"
check_dir "$BAM_DIR/data/domains" "data/domains/"
check_dir "$BAM_DIR/data/templates" "data/templates/"
check_dir "$BAM_DIR/data/personas" "data/personas/"
check_dir "$BAM_DIR/data/standards" "data/standards/"
check_dir "$BAM_DIR/data/context" "data/context/"

# Pattern registries
check_file "$BAM_DIR/data/bam-patterns.csv" "bam-patterns.csv"
check_file "$BAM_DIR/data/section-pattern-map.csv" "section-pattern-map.csv"
check_file "$BAM_DIR/data/quality-gates.csv" "quality-gates.csv"
check_file "$BAM_DIR/data/tenant-models.csv" "tenant-models.csv"
check_file "$BAM_DIR/data/ai-runtimes.csv" "ai-runtimes.csv"
check_file "$BAM_DIR/data/compliance-frameworks.csv" "compliance-frameworks.csv"

# Foundational context
check_file "$BAM_DIR/data/context/bam-core.md" "context/bam-core.md"

if [ $ERRORS -gt 0 ]; then
    echo ""
    echo -e "${RED}KB verification failed: $ERRORS missing files/dirs${NC}"
    exit 1
fi

# ============================================================================
# 3. Read BAM config (tenant_model, ai_runtime, compliance_frameworks)
# ============================================================================

echo ""
echo -e "${CYAN}Reading BAM config from _bmad/config.toml...${NC}"

TENANT_MODEL="rls"
AI_RUNTIME="langgraph"
COMPLIANCE=""

if [ -f "$BMAD_DIR/config.toml" ]; then
    # Naive TOML parser — extract values under [modules.bam]
    TENANT_MODEL=$(awk '/\[modules\.bam\]/{f=1; next} /^\[/{f=0} f && /^tenant_model/{gsub(/^[^=]*=[ ]*"|"$/, ""); print; exit}' "$BMAD_DIR/config.toml" 2>/dev/null || echo "rls")
    AI_RUNTIME=$(awk '/\[modules\.bam\]/{f=1; next} /^\[/{f=0} f && /^ai_runtime/{gsub(/^[^=]*=[ ]*"|"$/, ""); print; exit}' "$BMAD_DIR/config.toml" 2>/dev/null || echo "langgraph")
    COMPLIANCE=$(awk '/\[modules\.bam\]/{f=1; next} /^\[/{f=0} f && /^compliance_frameworks/{gsub(/^[^=]*=[ ]*"|"$/, ""); print; exit}' "$BMAD_DIR/config.toml" 2>/dev/null || echo "")
    [ -z "$TENANT_MODEL" ] && TENANT_MODEL="rls"
    [ -z "$AI_RUNTIME" ] && AI_RUNTIME="langgraph"
fi

echo "  tenant_model: $TENANT_MODEL"
echo "  ai_runtime:   $AI_RUNTIME"
echo "  compliance:   ${COMPLIANCE:-(none specified)}"

# ============================================================================
# 4. Generate _bmad/bam/project-context.md
#    (the file that every BMAD skill auto-loads via **/project-context.md glob)
# ============================================================================

if [ -f "$CONTEXT_FILE" ] && [ "$FORCE" = false ]; then
    echo ""
    echo -e "${YELLOW}project-context.md already exists at $CONTEXT_FILE${NC}"
    echo "Run with --force to regenerate."
else
    echo ""
    echo -e "${CYAN}Generating $CONTEXT_FILE...${NC}"

    DATE=$(date +%Y-%m-%d)
    PATTERN_COUNT=$(ls "$BAM_DIR/data/patterns" 2>/dev/null | grep -E '\.md$' | wc -l)
    CHECKLIST_COUNT=$(ls "$BAM_DIR/data/checklists" 2>/dev/null | grep -E '\.md$' | wc -l)
    DOMAIN_COUNT=$(ls "$BAM_DIR/data/domains" 2>/dev/null | grep -E '\.md$' | wc -l)

    cat > "$CONTEXT_FILE" <<EOF
---
type: bmad-project-context
source: bmad-bam-v3
generated: $DATE
auto_loaded_by: BMAD skills via persistent_facts glob \`file:{project-root}/**/project-context.md\`
---

# BAM v3 — Multi-Tenant Agentic AI SaaS Knowledge Context

> **This file is auto-loaded as foundational context by every BMAD skill.**
> When a user runs \`bmad-create-architecture\`, \`bmad-create-prd\`, or any other
> BMAD workflow, the patterns and constraints below become part of the agent's
> working memory automatically.

## Project Configuration

This project has the **BAM v3 (BMad Agentic Multi-tenant)** module installed,
which extends BMAD with multi-tenant SaaS + AI runtime patterns.

| Variable | Value | Source |
|---|---|---|
| Tenant isolation model | \`$TENANT_MODEL\` | \`_bmad/config.toml [modules.bam]\` |
| AI agent runtime | \`$AI_RUNTIME\` | \`_bmad/config.toml [modules.bam]\` |
| Compliance frameworks | \`${COMPLIANCE:-none specified}\` | \`_bmad/config.toml [modules.bam]\` |

## Multi-Tenancy is the Default Lens

When this context is loaded, treat **multi-tenancy as a first-class architectural concern**:

- Every data model needs tenant isolation (\`tenant_id\` column for RLS, schema namespace, or separate database)
- Every API endpoint must scope to the requesting tenant context
- Every AI agent invocation runs within a tenant-scoped runtime budget (\`run-contracts\` pattern)
- Every quality gate verifies cross-tenant isolation (QG-M2, QG-I2, QG-TC4)

## Foundational Pattern Catalog ($PATTERN_COUNT patterns available)

The full BAM pattern catalog is at \`_bmad/bam/data/patterns/\` and indexed in
\`_bmad/bam/data/bam-patterns.csv\`. Highlights:

### Tenant Isolation (apply when designing data layer)
- **ZTI** \`tenant-isolation.md\` — RLS / schema / database isolation strategies (decision matrix)
- **ZTRC** \`tenant-rbac.md\` — Tenant-scoped RBAC patterns
- **ZTQ** \`tenant-quotas.md\` — Per-tier rate limits and quotas

### AI Agent Runtime (apply when designing AI capabilities)
- **ZAO** \`agent-orchestration.md\` — Sequential / parallel / hierarchical / dynamic
- **ZAS** \`ai-safety.md\` — Output filtering, prompt-injection detection, red teaming
- **ZRL** \`runtime-loops.md\` — NEXUS 40-layer orchestration loops
- **ZGV** \`grounding-verifier.md\` — RAG hallucination prevention
- **ZKS** \`kill-switch-registry.md\` — Emergency shutdown controls

### Security & Compliance (apply when designing trust boundaries)
- **ZZT** \`zero-trust.md\` — Defense-in-depth with explicit verification
- **ZSF** \`semantic-firewall.md\` — Beyond regex content filtering
- **ZSL** \`secret-leak-detector.md\` — API key & PII detection in agent I/O
- **ZGD** \`gdpr-compliance.md\` — GDPR controls
- **ZHC** \`hipaa-compliance.md\` — HIPAA safeguards
- **ZS2** \`soc2-compliance.md\` — SOC 2 trust criteria

### Operations & Observability
- **ZIR** \`incident-response.md\` — Tenant-scoped incident response
- **ZDR** \`disaster-recovery.md\` — Geo-redundancy, RPO/RTO targets
- **ZOD** \`output-drift-monitor.md\` — Detect AI quality degradation over time
- **ZIF** \`invisible-failure-detector.md\` — Catch silent AI failures

### MCP & RAG (if AI agents use external tools)
- **ZML** \`mcp-server-lifecycle.md\` — MCP server pool management
- **ZMT** \`mcp-tenant-isolation.md\` — Tenant-isolated MCP servers
- **ZRP** \`rag-pipeline.md\` — Multi-tenant RAG architecture
- **ZVS** \`vector-store-multi-tenant.md\` — Tenant-isolated vector stores

> Look up any pattern by shortcode: \`_bmad/bam/data/patterns/<pattern_id>.md\`
> Or query the CSV: \`_bmad/bam/data/bam-patterns.csv\`

## Quality Gates ($CHECKLIST_COUNT checklists available)

Every BAM-flavored architecture decision passes through gates:

- **QG-F1** — Foundation Gate (architecture completeness, tenant model verified, AI runtime configured)
- **QG-M1/M2/M3** — Module / Tenant Isolation / Agent Runtime
- **QG-I1/I2/I3** — Integration / Tenant Safety / Agent Safety
- **QG-S5..S10** — Security baseline (zero-trust, AI security, network, identity, secrets, logging, endpoints)
- **QG-P1** — Production Readiness (PRG 10-check)
- **QG-TC1/TC3/TC4** — Test coverage (unit, cross-tenant, isolation)
- **QG-AI1/AI2/AI3** — AI deployment, observability, decision verification

Full checklists at \`_bmad/bam/data/checklists/qg-*.md\`.

## Domain Knowledge ($DOMAIN_COUNT domains available)

Detailed domain references at \`_bmad/bam/data/domains/\`:
- \`tenant.md\` — Multi-tenant SaaS fundamentals
- \`ai-runtime.md\` — Agent runtime selection criteria
- \`integration.md\` — Cross-module integration patterns
- \`compliance.md\` — Regulatory framework mapping
- \`mcp.md\` — Model Context Protocol overview
- \`rag.md\` — Retrieval-augmented generation overview
- \`security.md\` — Multi-tenant security patterns
- \`observability.md\` — Tenant-aware monitoring

## Agent Roster (Three Architects + 11 Specialists)

When invoking \`bmad-party-mode --team bam\`, you'll have access to BAM personas
declared in \`_bmad/config.toml [agents.*]\`:

**Three Primary Architects:**
- 🏛️ **Atlas** — Platform Architect (foundation, scaling, isolation)
- 🌟 **Nova** — AI Runtime Architect (orchestration, memory, safety)
- 🔗 **Kai** — Integration Architect (facades, contracts, convergence)

**11 Specialists** (multi-tenant overlays of standard BMAD agents):
- Vega (architect), Quinn (dev), Rune (devops), Cipher (security)
- Auditor (compliance), Helix (data), Bridge (mcp), Sage (rag)
- Lyra (pm), Echo (analyst), Iris (ux-designer)

Filter by team for focused roundtables:
- \`team: bam\` — Three Architects only
- \`team: bam-platform\` — All cross-functional specialists
- \`team: bam-runtime\` — MCP + RAG specialists

## How BMAD Skills Use This Context

The presence of this file at \`_bmad/bam/project-context.md\` means every BMAD
skill receives all of the above as foundational facts BEFORE it begins its
workflow. No customization required.

**Example flow with \`bmad-create-architecture\`:**
1. Skill resolves \`customize.toml\` → \`persistent_facts\` glob \`**/project-context.md\` matches THIS file
2. Skill loads this file as foundational context
3. Skill begins its 8-step architecture workflow
4. Output \`architecture.md\` automatically reflects multi-tenant SaaS patterns

## Customization (Optional Deeper Integration)

For workflows that need targeted BAM pattern injection beyond this index file,
BAM ships customize templates at \`_bmad/bam/customize-templates/\`. Use the
\`bmad-customize\` skill to copy them into \`_bmad/custom/\`.

Example: To make every \`bmad-create-prd\` invocation load BAM compliance patterns
\`\`\`
Run \`bmad-customize\` and choose:
  → Pick skill: bmad-create-prd
  → Apply BAM template: bmad-create-prd-compliance.toml.example
\`\`\`

---

*Generated by \`bmad-bam/scripts/bam-post-install.sh\` on $DATE.*
*Regenerate with \`./bam-post-install.sh --force\`.*
EOF

    echo -e "  ${GREEN}[CREATED]${NC} $CONTEXT_FILE"
fi

# ============================================================================
# Final summary
# ============================================================================

echo ""
echo -e "${BLUE}===========================================${NC}"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}BAM v3 Post-Install: SUCCESS${NC}"
    echo -e "${BLUE}===========================================${NC}"
    echo ""
    echo "✅ KB verified at $BAM_DIR/data/"
    echo "✅ project-context.md generated at $CONTEXT_FILE"
    echo "✅ Auto-loaded by every BMAD skill via **/project-context.md glob"
    echo ""
    echo "Next steps:"
    echo "  • Run any BMAD skill (e.g., \`bmad-create-architecture\`)"
    echo "  • Run \`bmad-customize\` to apply BAM customize templates"
    echo "  • Run \`bmad-party-mode --team bam\` for the Three Architects roundtable"
else
    echo -e "${RED}BAM v3 Post-Install: INCOMPLETE ($ERRORS issues)${NC}"
    echo -e "${BLUE}===========================================${NC}"
    exit 1
fi