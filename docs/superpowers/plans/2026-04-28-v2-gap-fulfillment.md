# V2 Gap Fulfillment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete all remaining gaps in the BAM V2 implementation to achieve full BMAD v6.4.0 compliance.

**Architecture:** Three-phase approach: (1) Create module-help.csv for V2 workflow discovery, (2) Enhance SKILL.md files with 6-step activation sequence, (3) Add missing sections to step files and enhance customize.toml files.

**Tech Stack:** Markdown, TOML, CSV, Bash scripting for batch operations

---

## File Structure

| File Type | Count | Purpose |
|-----------|-------|---------|
| `src-v2/module-help.csv` | 1 (create) | Workflow discovery CSV |
| `src-v2/skills/*/SKILL.md` | 30 (modify) | Add 6-step activation |
| `src-v2/skills/*/customize.toml` | 30 (modify) | Add activation hooks |
| `src-v2/skills/*/steps/*.md` | 75 (modify) | Add SUCCESS METRICS |
| `scripts/add-step-sections.sh` | 1 (create) | Batch add sections |

---

## Phase 1: Module Help CSV

### Task 1.1: Create V2 module-help.csv

**Files:**
- Create: `src-v2/module-help.csv`

- [ ] **Step 1: Create module-help.csv with header and all 30 workflows**

```bash
cat > src-v2/module-help.csv << 'EOF'
module,skill,display-name,menu-code,description,action,args,phase,after,before,required,output-location,outputs
bam,bmad-bam-master-architecture,Master Architecture,ZM,Create master architecture with tenant model and foundation design,run,,3-solutioning,,,true,{output_folder}/planning-artifacts,master-architecture.md
bam,bmad-bam-module-architecture,Module Architecture,ZB,Design module boundaries and responsibilities,run,,3-solutioning,bmad-bam-master-architecture,,true,{output_folder}/planning-artifacts,module-architecture.md
bam,bmad-bam-tenant-isolation,Tenant Isolation,ZT,Design tenant isolation model - RLS/Schema/Database,run,,3-solutioning,bmad-bam-master-architecture,,true,{output_folder}/planning-artifacts,tenant-isolation.md
bam,bmad-bam-agent-runtime,Agent Runtime,ZR,Configure AI runtime with LangGraph/CrewAI/AutoGen,run,,3-solutioning,bmad-bam-tenant-isolation,,true,{output_folder}/planning-artifacts,agent-runtime.md
bam,bmad-bam-facade-contract,Facade Contract,ZF,Define module integration contracts,run,,3-solutioning,bmad-bam-module-architecture,,true,{output_folder}/planning-artifacts,facade-contract.md
bam,bmad-bam-convergence,Convergence Verification,ZC,Verify integration safety for QG-I2/I3,run,,4-implementation,bmad-bam-facade-contract,,true,{output_folder}/planning-artifacts,convergence-report.md
bam,bmad-bam-production-readiness,Production Readiness,ZP,Final production validation for QG-P1,run,,4-implementation,bmad-bam-convergence,,true,{output_folder}/planning-artifacts,production-readiness.md
bam,bmad-bam-requirements,Requirements Ingestion,ZWR,Ingest and analyze project requirements,run,,2-planning,,,false,{output_folder}/planning-artifacts,requirements.md
bam,bmad-bam-triage,Module Triage,ZWT,Triage module complexity and prioritization,run,,2-planning,bmad-bam-requirements,,false,{output_folder}/planning-artifacts,triage-report.md
bam,bmad-bam-module-epics,Module Epics,ZWE,Create epics for module implementation,run,,2-planning,bmad-bam-triage,,false,{output_folder}/planning-artifacts,module-epics.md
bam,bmad-bam-cross-module-story,Cross-Module Story,ZWS,Create stories spanning multiple modules,run,,2-planning,bmad-bam-module-epics,,false,{output_folder}/planning-artifacts,cross-module-story.md
bam,bmad-bam-tenant-onboarding,Tenant Onboarding,ZWO,Design tenant onboarding workflow,run,,3-solutioning,bmad-bam-tenant-isolation,,false,{output_folder}/planning-artifacts,tenant-onboarding.md
bam,bmad-bam-tenant-offboarding,Tenant Offboarding,ZWX,Design tenant offboarding and data retention,run,,3-solutioning,bmad-bam-tenant-onboarding,,false,{output_folder}/planning-artifacts,tenant-offboarding.md
bam,bmad-bam-observability,Observability,ZOB,Design tenant-aware observability,run,,3-solutioning,bmad-bam-master-architecture,,false,{output_folder}/planning-artifacts,observability.md
bam,bmad-bam-scaling,Scaling Design,ZSC,Design horizontal and vertical scaling,run,,3-solutioning,bmad-bam-master-architecture,,false,{output_folder}/planning-artifacts,scaling.md
bam,bmad-bam-events,Event Architecture,ZEV,Design event-driven architecture,run,,3-solutioning,bmad-bam-module-architecture,,false,{output_folder}/planning-artifacts,events.md
bam,bmad-bam-agent-debug,Agent Debug,ZAD,Debug tenant-scoped agent issues,run,,4-implementation,bmad-bam-agent-runtime,,false,{output_folder}/planning-artifacts,agent-debug.md
bam,bmad-bam-agent-tracing,Agent Tracing,ZAT,Configure agent execution tracing,run,,3-solutioning,bmad-bam-agent-runtime,,false,{output_folder}/planning-artifacts,agent-tracing.md
bam,bmad-bam-tool-contracts,Tool Contracts,ZTC,Define MCP tool contracts,run,,3-solutioning,bmad-bam-agent-runtime,,false,{output_folder}/planning-artifacts,tool-contracts.md
bam,bmad-bam-memory-tiers,Memory Tiers,ZMT,Design agent memory tier architecture,run,,3-solutioning,bmad-bam-agent-runtime,,false,{output_folder}/planning-artifacts,memory-tiers.md
bam,bmad-bam-llm-versioning,LLM Versioning,ZLV,Design LLM model versioning strategy,run,,3-solutioning,bmad-bam-agent-runtime,,false,{output_folder}/planning-artifacts,llm-versioning.md
bam,bmad-bam-caching,Caching Strategy,ZCA,Design tenant-aware caching,run,,3-solutioning,bmad-bam-tenant-isolation,,false,{output_folder}/planning-artifacts,caching.md
bam,bmad-bam-security,Security Architecture,ZSE,Design tenant security architecture,run,,3-solutioning,bmad-bam-tenant-isolation,,false,{output_folder}/planning-artifacts,security.md
bam,bmad-bam-compliance,Compliance Mapping,ZCO,Map compliance requirements,run,,3-solutioning,bmad-bam-security,,false,{output_folder}/planning-artifacts,compliance.md
bam,bmad-bam-data-residency,Data Residency,ZDR,Design data residency and sovereignty,run,,3-solutioning,bmad-bam-compliance,,false,{output_folder}/planning-artifacts,data-residency.md
bam,bmad-bam-white-labeling,White Labeling,ZWL,Design white-labeling for enterprise tier,run,,3-solutioning,bmad-bam-tenant-isolation,,false,{output_folder}/planning-artifacts,white-labeling.md
bam,bmad-bam-billing,Billing Architecture,ZBI,Design usage metering and billing,run,,3-solutioning,bmad-bam-tenant-isolation,,false,{output_folder}/planning-artifacts,billing.md
bam,bmad-bam-testing,Testing Strategy,ZTE,Design tenant testing with TEA integration,run,,3-solutioning,bmad-bam-tenant-isolation,,false,{output_folder}/planning-artifacts,testing.md
bam,bmad-bam-research,Research,ZRS,Conduct technology and market research,run,,anytime,,,false,{output_folder}/planning-artifacts,research.md
bam,bmad-bam-api-versioning,API Versioning,ZAV,Design API versioning strategy,run,,3-solutioning,bmad-bam-facade-contract,,false,{output_folder}/planning-artifacts,api-versioning.md
EOF
```

- [ ] **Step 2: Verify CSV format**

Run: `head -5 src-v2/module-help.csv && wc -l src-v2/module-help.csv`

Expected: Header + 30 rows = 31 lines total

- [ ] **Step 3: Commit**

```bash
git add src-v2/module-help.csv
git commit -m "feat(v2): add module-help.csv with 30 workflow entries

- Z-prefix menu codes for collision-free discovery
- 13-column BMAD standard format
- Phase mapping for workflow ordering

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 2: SKILL.md 6-Step Activation

### Task 2.1: Create SKILL.md enhancement script

**Files:**
- Create: `scripts/enhance-skill-md.sh`

- [ ] **Step 1: Create the enhancement script**

```bash
cat > scripts/enhance-skill-md.sh << 'SCRIPT'
#!/bin/bash
# Enhance SKILL.md files with 6-step activation sequence

SKILL_DIR="$1"
if [ -z "$SKILL_DIR" ]; then
  echo "Usage: $0 <skill-directory>"
  exit 1
fi

SKILL_FILE="$SKILL_DIR/SKILL.md"
if [ ! -f "$SKILL_FILE" ]; then
  echo "SKILL.md not found in $SKILL_DIR"
  exit 1
fi

# Extract skill name from directory
SKILL_NAME=$(basename "$SKILL_DIR")

# Check if already has On Activation
if grep -q "## On Activation" "$SKILL_FILE"; then
  echo "Already has activation sequence: $SKILL_FILE"
  exit 0
fi

# Find the line after "## Domain References" or end of file
INSERTION_POINT=$(grep -n "^## Domain References" "$SKILL_FILE" | head -1 | cut -d: -f1)

if [ -z "$INSERTION_POINT" ]; then
  # No Domain References, append at end
  INSERTION_POINT=$(wc -l < "$SKILL_FILE")
fi

# Create the activation section
ACTIVATION_SECTION=$(cat << 'ACTIVATION'

## On Activation

### Step 1: Resolve the Workflow Block

Run: `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow`

**If the script fails**, resolve the `workflow` block yourself by reading these files in base → team → user order:

1. `{skill-root}/customize.toml` — defaults
2. `{project-root}/_bmad/custom/{skill-name}.toml` — team overrides
3. `{project-root}/_bmad/custom/{skill-name}.user.toml` — personal overrides

Apply merge rules: scalars override, tables deep-merge, arrays of tables keyed by `code`/`id` replace matching and append new, other arrays append.

### Step 2: Execute Prepend Steps

Execute each entry in `{workflow.activation_steps_prepend}` in order.

### Step 3: Load Persistent Facts

Treat every entry in `{workflow.persistent_facts}` as foundational context.
- Entries prefixed `file:` are paths/globs — load contents as facts
- Other entries are literal facts

### Step 4: Load Config

Load from `{project-root}/_bmad/bam/config.yaml`:
- `{user_name}` - greeting
- `{communication_language}` - spoken output
- `{document_output_language}` - written documents
- `{planning_artifacts}` - output location
- `{tenant_model}` - BAM isolation model
- `{ai_runtime}` - BAM AI framework

### Step 5: Greet the User

Greet `{user_name}`, speaking in `{communication_language}`.

### Step 6: Execute Append Steps

Execute each entry in `{workflow.activation_steps_append}` in order.

Activation complete. Begin execution by reading `workflow.md`.
ACTIVATION
)

# Insert before Domain References (or at end)
{
  head -n "$((INSERTION_POINT - 1))" "$SKILL_FILE"
  echo "$ACTIVATION_SECTION"
  echo ""
  tail -n "+$INSERTION_POINT" "$SKILL_FILE"
} > "$SKILL_FILE.tmp" && mv "$SKILL_FILE.tmp" "$SKILL_FILE"

echo "Enhanced: $SKILL_FILE"
SCRIPT
chmod +x scripts/enhance-skill-md.sh
```

- [ ] **Step 2: Run script on all 30 workflows**

```bash
for dir in src-v2/skills/bmad-bam-*/; do
  ./scripts/enhance-skill-md.sh "$dir"
done
```

- [ ] **Step 3: Verify all SKILL.md files have activation**

Run: `grep -l "## On Activation" src-v2/skills/*/SKILL.md | wc -l`

Expected: 30

- [ ] **Step 4: Commit**

```bash
git add scripts/enhance-skill-md.sh src-v2/skills/*/SKILL.md
git commit -m "feat(v2): add 6-step activation sequence to all SKILL.md files

- Step 1: Resolve workflow customization
- Step 2: Execute prepend steps
- Step 3: Load persistent facts
- Step 4: Load config variables
- Step 5: Greet user
- Step 6: Execute append steps

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 3: Enhance customize.toml Files

### Task 3.1: Create customize.toml enhancement script

**Files:**
- Create: `scripts/enhance-customize-toml.sh`

- [ ] **Step 1: Create the enhancement script**

```bash
cat > scripts/enhance-customize-toml.sh << 'SCRIPT'
#!/bin/bash
# Enhance customize.toml files with activation hooks

SKILL_DIR="$1"
if [ -z "$SKILL_DIR" ]; then
  echo "Usage: $0 <skill-directory>"
  exit 1
fi

TOML_FILE="$SKILL_DIR/customize.toml"
if [ ! -f "$TOML_FILE" ]; then
  echo "customize.toml not found in $SKILL_DIR"
  exit 1
fi

# Extract skill name
SKILL_NAME=$(basename "$SKILL_DIR")
DISPLAY_NAME=$(echo "$SKILL_NAME" | sed 's/bmad-bam-//' | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')

# Check if already has activation_steps_prepend
if grep -q "activation_steps_prepend" "$TOML_FILE"; then
  echo "Already enhanced: $TOML_FILE"
  exit 0
fi

# Get the quality gate from SKILL.md
QG=$(grep -o "QG-[A-Z][0-9]*" "$SKILL_DIR/SKILL.md" | head -1)
if [ -z "$QG" ]; then
  QG="QG-F1"
fi

# Create enhanced TOML
cat > "$TOML_FILE" << TOML
# Workflow customization for $SKILL_NAME
#
# Merge Order (base → team → user):
#   1. {skill-root}/customize.toml (this file)
#   2. {project-root}/_bmad/custom/$SKILL_NAME.toml (team)
#   3. {project-root}/_bmad/custom/$SKILL_NAME.user.toml (personal)
#
# Merge Rules:
#   - Scalars: override wins
#   - Tables: deep-merge
#   - Arrays of tables with code/id: replace matching, append new
#   - Other arrays: append

[workflow]

# Pre-activation steps (before config load)
activation_steps_prepend = [
  "Loading $DISPLAY_NAME workflow context.",
]

# Post-greeting steps (before workflow begins)
activation_steps_append = [
  "Verify {tenant_model} and {ai_runtime} are configured in config.yaml",
  "Check for existing artifact at {output_folder}/planning-artifacts/",
]

# Persistent facts loaded for entire workflow
persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
  "file:{project-root}/_bmad/bam/data/checklists/${QG,,}.md",
]

# On workflow completion
on_complete = """
$DISPLAY_NAME workflow complete.

**Quality Gate:** $QG
Run validation mode to verify compliance.

**Next Workflows:**
See Related Workflows in SKILL.md for recommendations.
"""
TOML

echo "Enhanced: $TOML_FILE"
SCRIPT
chmod +x scripts/enhance-customize-toml.sh
```

- [ ] **Step 2: Run script on all 30 workflows**

```bash
for dir in src-v2/skills/bmad-bam-*/; do
  ./scripts/enhance-customize-toml.sh "$dir"
done
```

- [ ] **Step 3: Verify all customize.toml files have activation hooks**

Run: `grep -l "activation_steps_prepend" src-v2/skills/*/customize.toml | wc -l`

Expected: 30

- [ ] **Step 4: Commit**

```bash
git add scripts/enhance-customize-toml.sh src-v2/skills/*/customize.toml
git commit -m "feat(v2): enhance customize.toml with activation hooks

- activation_steps_prepend for pre-config messages
- activation_steps_append for post-greeting verification
- Enhanced persistent_facts with core context
- Improved on_complete with next steps

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 4: Add Missing Step Sections

### Task 4.1: Create step section addition script

**Files:**
- Create: `scripts/add-step-sections.sh`

- [ ] **Step 1: Create the script to add SUCCESS METRICS and FAILURE MODES**

```bash
cat > scripts/add-step-sections.sh << 'SCRIPT'
#!/bin/bash
# Add SUCCESS METRICS and FAILURE MODES sections to step files

STEP_FILE="$1"
if [ -z "$STEP_FILE" ] || [ ! -f "$STEP_FILE" ]; then
  echo "Usage: $0 <step-file.md>"
  exit 1
fi

# Check if already has SUCCESS METRICS
if grep -q "## SUCCESS METRICS\|## Success Metrics" "$STEP_FILE"; then
  echo "Already has SUCCESS METRICS: $STEP_FILE"
  exit 0
fi

# Extract step info from filename
FILENAME=$(basename "$STEP_FILE")
STEP_NUM=$(echo "$FILENAME" | grep -o "step-[0-9]*" | grep -o "[0-9]*")
MODE=$(echo "$FILENAME" | grep -o "\-[cev]\-" | tr -d '-')

# Determine appropriate metrics based on mode
case "$MODE" in
  c)
    METRICS=$(cat << 'METRICS'

---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance
METRICS
)
    ;;
  e)
    METRICS=$(cat << 'METRICS'

---

## SUCCESS METRICS:

- [ ] Existing artifact loaded successfully
- [ ] User changes clearly understood
- [ ] Changes applied without breaking existing content
- [ ] Updated artifact saved to correct location

## FAILURE MODES:

- **Artifact not found:** Cannot edit - run Create mode first
- **Conflicting changes:** Present conflicts to user for resolution
- **Invalid modifications:** Reject changes that break document structure
METRICS
)
    ;;
  v)
    METRICS=$(cat << 'METRICS'

---

## SUCCESS METRICS:

- [ ] Artifact loaded for validation
- [ ] All checklist items evaluated
- [ ] Evidence documented for each check
- [ ] Gate decision determined (PASS/CONDITIONAL/FAIL)
- [ ] Validation report generated

## FAILURE MODES:

- **Artifact not found:** Cannot validate - run Create mode first
- **Missing checklist:** Use embedded criteria as fallback
- **Ambiguous evidence:** Mark as CONDITIONAL, document uncertainty
METRICS
)
    ;;
  *)
    echo "Unknown mode for $STEP_FILE"
    exit 1
    ;;
esac

# Find insertion point - before "## NEXT STEP" or at end
NEXT_STEP_LINE=$(grep -n "^## NEXT STEP\|^## Next Step" "$STEP_FILE" | head -1 | cut -d: -f1)

if [ -n "$NEXT_STEP_LINE" ]; then
  # Insert before NEXT STEP
  {
    head -n "$((NEXT_STEP_LINE - 1))" "$STEP_FILE"
    echo "$METRICS"
    echo ""
    tail -n "+$NEXT_STEP_LINE" "$STEP_FILE"
  } > "$STEP_FILE.tmp" && mv "$STEP_FILE.tmp" "$STEP_FILE"
else
  # Append at end
  echo "$METRICS" >> "$STEP_FILE"
fi

echo "Added sections to: $STEP_FILE"
SCRIPT
chmod +x scripts/add-step-sections.sh
```

- [ ] **Step 2: Run script on all 75 files missing sections**

```bash
# Get list of files missing SUCCESS METRICS
for f in src-v2/skills/*/steps/*.md; do
  if ! grep -q "## SUCCESS METRICS\|## Success Metrics" "$f"; then
    ./scripts/add-step-sections.sh "$f"
  fi
done
```

- [ ] **Step 3: Verify all step files now have SUCCESS METRICS**

Run: `for f in src-v2/skills/*/steps/*.md; do grep -q "SUCCESS METRICS" "$f" || echo "$f"; done | wc -l`

Expected: 0 (no files missing)

- [ ] **Step 4: Commit**

```bash
git add scripts/add-step-sections.sh src-v2/skills/*/steps/*.md
git commit -m "feat(v2): add SUCCESS METRICS and FAILURE MODES to 75 step files

- Mode-specific metrics (Create, Edit, Validate)
- Clear failure recovery guidance
- Consistent format across all steps

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 5: Validation

### Task 5.1: Create validation script

**Files:**
- Create: `scripts/validate-v2-compliance.sh`

- [ ] **Step 1: Create comprehensive validation script**

```bash
cat > scripts/validate-v2-compliance.sh << 'SCRIPT'
#!/bin/bash
# Validate V2 BMAD compliance

echo "=== V2 BMAD Compliance Validation ==="
echo ""

PASS=0
FAIL=0

check() {
  local desc="$1"
  local expected="$2"
  local actual="$3"
  
  if [ "$actual" -eq "$expected" ]; then
    echo "✓ $desc: $actual (expected $expected)"
    PASS=$((PASS + 1))
  else
    echo "✗ $desc: $actual (expected $expected)"
    FAIL=$((FAIL + 1))
  fi
}

# File counts
echo "--- File Counts ---"
check "Workflows" 30 $(ls -d src-v2/skills/bmad-bam-*/ 2>/dev/null | wc -l)
check "Step files" 300 $(find src-v2/skills -name "step-*.md" | wc -l)
check "SKILL.md files" 30 $(ls src-v2/skills/*/SKILL.md 2>/dev/null | wc -l)
check "customize.toml files" 30 $(ls src-v2/skills/*/customize.toml 2>/dev/null | wc -l)
check "module-help.csv rows" 31 $(wc -l < src-v2/module-help.csv 2>/dev/null || echo 0)

echo ""
echo "--- Section Compliance ---"
check "SKILL.md with On Activation" 30 $(grep -l "## On Activation" src-v2/skills/*/SKILL.md 2>/dev/null | wc -l)
check "customize.toml with activation_steps" 30 $(grep -l "activation_steps_prepend" src-v2/skills/*/customize.toml 2>/dev/null | wc -l)
check "Steps with SUCCESS METRICS" 300 $(grep -l "SUCCESS METRICS" src-v2/skills/*/steps/*.md 2>/dev/null | wc -l)
check "Steps with MANDATORY RULES" 300 $(grep -l "MANDATORY EXECUTION RULES" src-v2/skills/*/steps/*.md 2>/dev/null | wc -l)

echo ""
echo "--- Data Files ---"
check "Domain files" 16 $(ls src-v2/data/domains/*.md 2>/dev/null | wc -l)
check "Persona files" 3 $(ls src-v2/data/personas/*.md 2>/dev/null | wc -l)
check "Pattern files" 10 $(ls src-v2/data/patterns/*.md 2>/dev/null | wc -l)
check "Checklist files" 29 $(ls src-v2/data/checklists/*.md 2>/dev/null | wc -l)
check "Template files" 40 $(ls src-v2/data/templates/*.md 2>/dev/null | wc -l)

echo ""
echo "=== Summary ==="
echo "Passed: $PASS"
echo "Failed: $FAIL"

if [ "$FAIL" -eq 0 ]; then
  echo ""
  echo "✓ V2 BMAD COMPLIANCE: PASS"
  exit 0
else
  echo ""
  echo "✗ V2 BMAD COMPLIANCE: FAIL"
  exit 1
fi
SCRIPT
chmod +x scripts/validate-v2-compliance.sh
```

- [ ] **Step 2: Run validation**

Run: `./scripts/validate-v2-compliance.sh`

Expected: All checks pass, exit code 0

- [ ] **Step 3: Commit validation script**

```bash
git add scripts/validate-v2-compliance.sh
git commit -m "feat(v2): add V2 BMAD compliance validation script

- Validates file counts (workflows, steps, SKILL.md, TOML)
- Validates section compliance (activation, metrics)
- Validates data files (domains, personas, patterns)
- Reports pass/fail summary

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Verification Checklist

After completing all tasks, verify:

- [ ] `src-v2/module-help.csv` exists with 31 lines (header + 30 workflows)
- [ ] All 30 `SKILL.md` files have "## On Activation" section
- [ ] All 30 `customize.toml` files have `activation_steps_prepend`
- [ ] All 300 step files have `## SUCCESS METRICS` section
- [ ] `./scripts/validate-v2-compliance.sh` passes with 0 failures

---

## Summary

| Task | Files Modified | Purpose |
|------|----------------|---------|
| 1.1 | 1 created | module-help.csv for discovery |
| 2.1 | 30 modified | SKILL.md 6-step activation |
| 3.1 | 30 modified | customize.toml enhancement |
| 4.1 | 75 modified | Step file sections |
| 5.1 | 1 created | Validation script |

**Total: 137 file operations**
