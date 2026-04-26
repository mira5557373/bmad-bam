# V2 Step Content Fill Design Spec

**Version:** 2.0.0  
**Date:** 2026-04-26  
**Status:** Ready for Implementation

## Summary

Fill 300 V2 stub step files (currently 28 lines each) with proper BMAD-method compatible content (target 150-200 lines each), using V1 step content as source material and following official BMAD conventions.

## Problem Statement

V2 step files are stubs created during initial implementation:
- **Current:** 300 files × 28 lines = 8,534 total lines
- **Target:** 300 files × 150-200 lines = 45,000-60,000 total lines
- **Gap:** ~40,000-50,000 lines of content missing

V1 has rich step content that needs to be migrated/consolidated into V2's 30 skills.

### Additional Gaps Identified

| Gap | Current State | Required State |
|-----|---------------|----------------|
| Step naming | Generic (start, analyze, design) | Descriptive (tenant-model-decisions) |
| Step count mismatch | V2: 5 Create steps | V1: 6-9 Create steps |
| Content mapping | None | V1→V2 step mapping table |
| Template references | Incomplete | All skills reference templates |
| Domain/pattern refs | Missing | Per-skill reference list |
| NEW skill content | No source | Domain-based composition |
| Tests | None | Structure validation tests |
| Validation tooling | None | BMAD compliance checker |

---

## BMAD Step File Convention

Based on analysis of official BMAD method, TEA, and WDS modules, step files must include:

### Required Sections

```markdown
# Step N: {Descriptive Title}

## MANDATORY EXECUTION RULES (READ FIRST)
- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS
- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices

---

## Purpose
{One paragraph describing what this step accomplishes}

---

## Prerequisites
- {Previous step completed}
- **Load patterns:** `{project-root}/_bmad/bam/data/{file}` → filter: `{criteria}`
- **Load domain:** `{project-root}/_bmad/bam/data/domains/{domain}.md`

---

## Inputs
- Output from previous step(s)
- Pattern registry: `{project-root}/_bmad/bam/data/*.csv`
- Templates: `{project-root}/_bmad/bam/data/templates/`

---

## Actions

### 1. {First Action Title}
{Detailed instructions with specific guidance}

### 2. {Second Action Title}
{Detailed instructions}

| Column1 | Column2 | Column3 |
|---------|---------|---------|
| Data    | Data    | Data    |

### 3. {Third Action Title}
{Detailed instructions}

---

## Verification Matrix

| Check | Expected | Actual | Status |
|-------|----------|--------|--------|
| {Check 1} | {Expected} | | [ ] |
| {Check 2} | {Expected} | | [ ] |

---

## Soft Gate Checkpoint (if applicable)
**Steps 1-N complete the {phase} design.**
Present summary and ask for confirmation before proceeding.

---

## Error Handling

### {Error Category 1}
#### {Specific Error}
If {condition}:
1. {Recovery step 1}
2. {Recovery step 2}

| Error | Cause | Fix |
|-------|-------|-----|
| {Error} | {Cause} | {Fix} |

### Escalation Path
If issues persist:
1. {Escalation step 1}
2. {Escalation step 2}

**Verify current best practices with web search:**
Search the web: "{topic} best practices {date}"

---

## COLLABORATION MENUS (A/P/C):

After completing the above, present:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into {topic}
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept and proceed to next step
- **[Specific refinements]**: Describe what you'd like to explore

Select an option:
```

### If 'A' (Advanced Elicitation):
- Invoke `bmad-advanced-elicitation` skill
- Process enhanced insights
- Return to A/P/C menu

### If 'P' (Party Mode):
- Invoke `bmad-party-mode` skill
- Process collaborative analysis
- Return to A/P/C menu

### If 'C' (Continue):
- Save to output document
- Update frontmatter `stepsCompleted`
- Proceed to next step

---

## Verification
- [ ] {Checklist item 1}
- [ ] {Checklist item 2}
- [ ] Patterns align with pattern registry

---

## Outputs
- {Output artifact 1}
- {Output artifact 2}
- **Load template:** `{project-root}/_bmad/bam/data/templates/{template}.md`

---

## Next Step
Proceed to `step-{NN}-{mode}-{name}.md` {with context}.
```

---

## Detailed Skill Specifications

### Skill 1: bmad-bam-master-architecture (QG-F1)

**V1 Source:** `foundation/create-master-architecture`

**Domain References:**
- `domains/tenant.md`
- `domains/ai-runtime.md`
- `domains/integration.md`
- `domains/security.md`

**Pattern References:**
- `patterns/rls.md`
- `patterns/schema-per-tenant.md`
- `patterns/langgraph.md`
- `patterns/facade.md`

**CSV References:**
- `tenant-models.csv`
- `ai-runtimes.csv`
- `quality-gates.csv`

**Template:** `templates/master-architecture.md`

**Step Mapping (V1 → V2):**

| V2 Step | V2 Name | V1 Source Steps | Content Focus |
|---------|---------|-----------------|---------------|
| step-01-c | context.md | step-01-c-discovery.md | Load project context, stakeholders |
| step-02-c | model.md | step-02-c-tenant-model-decisions.md | Select tenant isolation model |
| step-03-c | boundaries.md | step-03-c-ai-runtime-decisions.md + step-04-c-module-boundary-rules.md | AI runtime + module boundaries |
| step-04-c | patterns.md | step-05-c-shared-kernel.md + step-06-c-technology-stack.md + step-07-c-core-contracts.md | Shared kernel, tech stack, contracts |
| step-05-c | document.md | step-08-c-code-patterns.md + step-09-c-assembly.md | Patterns + final assembly |
| step-10-e | load.md | step-10-e-load-existing.md | Load existing architecture |
| step-11-e | apply.md | step-11-e-apply-changes.md | Apply modifications |
| step-20-v | load.md | step-20-v-load-artifact.md | Load for validation |
| step-21-v | validate.md | step-21-v-validate.md | Run QG-F1 checklist |
| step-22-v | report.md | step-22-v-generate-report.md | Generate gate report |

---

### Skill 2: bmad-bam-tenant-isolation (QG-M2)

**V1 Source:** `bmad-bam-tenant-model-isolation`

**Domain References:**
- `domains/tenant.md`
- `domains/security.md`
- `domains/compliance.md`
- `domains/storage.md`
- `domains/caching.md`

**Pattern References:**
- `patterns/rls.md`
- `patterns/schema-per-tenant.md`
- `patterns/database-per-tenant.md`

**CSV References:**
- `tenant-models.csv`

**Template:** `templates/tenant-isolation.md`

**Step Mapping (V1 → V2):**

| V2 Step | V2 Name (RENAME TO) | V1 Source | Content Focus |
|---------|---------------------|-----------|---------------|
| step-01-c | tenant-model-definition.md | step-01-c-tenant-model-definition.md | Define tenant hierarchy |
| step-02-c | isolation-matrix.md | step-02-c-isolation-matrix-creation.md | 8-dimension isolation matrix |
| step-03-c | context-propagation.md | step-03-c-context-propagation-design.md | Context flow all code paths |
| step-04-c | sharing-rules.md | step-04-c-sharing-rules.md | Cross-tenant sharing rules |
| step-05-c | compliance-mapping.md | step-05-c-compliance-mapping.md | Map to compliance frameworks |
| step-10-e | load.md | step-10-e-load-existing.md | Load existing model |
| step-11-e | apply.md | step-11-e-apply-changes.md | Apply modifications |
| step-20-v | load.md | step-20-v-load-artifact.md | Load for validation |
| step-21-v | validate.md | step-21-v-validate.md | Run QG-M2 checklist |
| step-22-v | report.md | step-22-v-generate-report.md | Generate gate report |

---

### Skill 3: bmad-bam-agent-runtime (QG-M3)

**V1 Source:** `bmad-bam-agent-runtime-architecture`

**Domain References:**
- `domains/ai-runtime.md`
- `domains/tenant.md`
- `domains/security.md`
- `domains/observability.md`

**Pattern References:**
- `patterns/langgraph.md`
- `patterns/crewai.md`
- `patterns/autogen.md`

**CSV References:**
- `ai-runtimes.csv`

**Template:** `templates/agent-runtime.md`

**Step Mapping (V1 → V2):**

| V2 Step | V2 Name (RENAME TO) | V1 Source | Content Focus |
|---------|---------------------|-----------|---------------|
| step-01-c | orchestration-selection.md | step-01-c-orchestration-model-selection.md | Select LangGraph/CrewAI/AutoGen |
| step-02-c | tool-registry.md | step-02-c-tool-registry-design.md | Tool registration and safety |
| step-03-c | memory-tiers.md | step-03-c-memory-tier-design.md | Working/episodic/semantic memory |
| step-04-c | approval-workflow.md | step-04-c-approval-workflow-design.md | Human-in-the-loop patterns |
| step-05-c | evaluation-safety.md | step-05-c-evaluation-foundation.md + step-06-c-kill-switch-design.md | Eval + kill switch |
| step-10-e | load.md | step-10-e-load-existing.md | Load existing runtime |
| step-11-e | apply.md | step-11-e-apply-changes.md | Apply modifications |
| step-20-v | load.md | step-20-v-load-artifact.md | Load for validation |
| step-21-v | validate.md | step-21-v-validate.md | Run QG-M3 checklist |
| step-22-v | report.md | step-22-v-generate-report.md | Generate gate report |

---

### Skill 4: bmad-bam-module-architecture (QG-M1)

**V1 Source:** `module/create-module-architecture`

**Domain References:**
- `domains/integration.md`
- `domains/events.md`
- `domains/testing.md`

**Pattern References:**
- `patterns/facade.md`
- `patterns/cqrs.md`
- `patterns/saga.md`

**Template:** `templates/module-architecture.md`

**Step Mapping (V1 → V2):**

| V2 Step | V2 Name (RENAME TO) | V1 Source | Content Focus |
|---------|---------------------|-----------|---------------|
| step-01-c | complexity-confirm.md | step-01-c-complexity-confirmation.md | Confirm module complexity |
| step-02-c | identity.md | step-02-c-identity.md | Module identity and ownership |
| step-03-c | domain-model.md | step-03-c-load-master + step-04-c-domain-model.md | Load context + domain model |
| step-04-c | facade-design.md | step-05-c-public-facade-design.md + step-06-c-dependencies.md | Public facade + dependencies |
| step-05-c | events-assembly.md | step-07-c-events + step-08-c-decisions + step-09-c-ai + step-10-c-assembly.md | Events, AI, assembly |
| step-10-e | load.md | step-10-e-load-existing.md | Load existing module |
| step-11-e | apply.md | step-11-e-apply-changes.md | Apply modifications |
| step-20-v | load.md | step-20-v-load-artifact.md | Load for validation |
| step-21-v | validate.md | step-21-v-validate.md | Run QG-M1 checklist |
| step-22-v | report.md | step-22-v-generate-report.md | Generate gate report |

---

### Skills 5-30: Reference Table

| # | Skill | V1 Source | Domains | Patterns | Template |
|---|-------|-----------|---------|----------|----------|
| 5 | facade-contract | integration/define-facade-contract | integration | facade | facade-contract.md |
| 6 | convergence | bmad-bam-convergence-verification | integration, testing | circuit-breaker | convergence-report.md |
| 7 | production-readiness | bmad-bam-production-readiness | observability, security | all | production-checklist.md |
| 8 | testing | bmad-bam-*-testing + TEA | testing | all | test-plan.md |
| 9 | tenant-onboarding | bmad-bam-tenant-onboarding-design | tenant, onboarding | rls | tenant-onboarding.md |
| 10 | tenant-offboarding | bmad-bam-tenant-offboarding-design | tenant, compliance | all | tenant-offboarding.md |
| 11 | billing | bmad-bam-usage-metering-design | billing | - | billing-design.md |
| 12 | white-labeling | bmad-bam-tenant-white-labeling-design | tenant | - | white-label.md |
| 13 | agent-debug | bmad-bam-ai-agent-debug | ai-runtime | langgraph,crewai | agent-debug-report.md |
| 14 | agent-tracing | bmad-bam-agent-execution-tracing | ai-runtime, observability | - | agent-trace.md |
| 15 | llm-versioning | bmad-bam-ai-model-* | ai-runtime | - | llm-version.md |
| 16 | memory-tiers | bmad-bam-agent-memory-optimization | ai-runtime | - | memory-design.md |
| 17 | tool-contracts | integration/validate-tool-contract | ai-runtime, integration | - | tool-contract.md |
| 18 | observability | bmad-bam-tenant-aware-observability | observability | - | observability-design.md |
| 19 | security | bmad-bam-security-* | security | - | security-architecture.md |
| 20 | compliance | bmad-bam-compliance-* | compliance | - | compliance-mapping.md |
| 21 | scaling | bmad-bam-auto-scaling-configuration | tenant | - | scaling-design.md |
| 22 | events | bmad-bam-event-streaming-design | events | saga,cqrs | event-architecture.md |
| 23 | caching | NEW (domain-based) | caching | - | caching-strategy.md |
| 24 | data-residency | bmad-bam-data-* + GDPR | compliance, storage | - | data-residency.md |
| 25 | api-versioning | bmad-bam-api-version-release | integration | - | api-version.md |
| 26 | module-epics | module/create-module-epics | - | - | module-epic.md |
| 27 | cross-module-story | bmad-bam-cross-module-story | - | - | cross-module-story.md |
| 28 | requirements | ingestion/requirement-ingestion | - | - | requirements.md |
| 29 | triage | ingestion/triage-module-complexity | - | - | triage-report.md |
| 30 | research | NEW | all | all | research-findings.md |

---

## NEW Skill Content Strategy

For skills without V1 source (caching, research), compose content from:

### Strategy 1: Domain-Based Composition

1. **Load primary domain file** - Extract core concepts, decision matrix
2. **Add BMAD execution rules** - Standard header sections
3. **Create action steps** - Based on domain's quality checks
4. **Add web research directives** - From domain's web queries
5. **Reference related patterns** - For implementation guidance

### Strategy 2: Pattern-Based Composition

1. **Identify relevant patterns** from CSVs
2. **Extract decision criteria** from pattern definitions
3. **Create comparison matrices** for selection
4. **Add implementation guidance** from pattern files

### Example: bmad-bam-caching (NEW skill)

**Source:** `domains/caching.md` + web research

**Step Content Derivation:**
```
step-01-c: Load caching domain context, identify requirements
step-02-c: Design cache key strategy (from domain Core Concepts)
step-03-c: Select cache tiers (from domain Cache Tiers table)
step-04-c: Design invalidation patterns (from domain Invalidation Patterns)
step-05-c: Document caching strategy (assemble all decisions)
```

---

## Step File Renaming Plan

V2 step files need descriptive names. Rename strategy:

### Naming Convention
```
step-{NN}-{mode}-{action-description}.md

Where:
- NN: 01-09 (Create), 10-19 (Edit), 20-29 (Validate)
- mode: c (Create), e (Edit), v (Validate)
- action-description: kebab-case describing the action
```

### Renaming Script

```bash
#!/bin/bash
# scripts/rename-v2-steps.sh

SKILLS_DIR="src-v2/skills"

# Master Architecture
cd "$SKILLS_DIR/bmad-bam-master-architecture/steps"
mv step-01-c-context.md step-01-c-load-context.md
mv step-02-c-model.md step-02-c-tenant-model-selection.md
mv step-03-c-boundaries.md step-03-c-module-boundaries.md
mv step-04-c-patterns.md step-04-c-technology-patterns.md
mv step-05-c-document.md step-05-c-architecture-assembly.md

# Tenant Isolation
cd "$SKILLS_DIR/bmad-bam-tenant-isolation/steps"
mv step-01-c-start.md step-01-c-tenant-model-definition.md
mv step-02-c-analyze.md step-02-c-isolation-matrix.md
mv step-03-c-design.md step-03-c-context-propagation.md
mv step-04-c-document.md step-04-c-sharing-rules.md
mv step-05-c-complete.md step-05-c-compliance-mapping.md

# ... continue for all 30 skills
```

---

## Implementation Phases

### Phase 1: Core Quality Gate Skills (Priority 1)
**8 skills, 80 step files**

| Skill | Quality Gate | V1 Source | Est. Lines |
|-------|--------------|-----------|------------|
| bmad-bam-master-architecture | QG-F1 | foundation/create-master-architecture | 1,800 |
| bmad-bam-module-architecture | QG-M1 | module/create-module-architecture | 1,800 |
| bmad-bam-tenant-isolation | QG-M2 | bmad-bam-tenant-model-isolation | 1,800 |
| bmad-bam-agent-runtime | QG-M3 | bmad-bam-agent-runtime-architecture | 1,800 |
| bmad-bam-facade-contract | QG-I1 | integration/define-facade-contract | 1,600 |
| bmad-bam-convergence | QG-I2/I3 | bmad-bam-convergence-verification | 1,600 |
| bmad-bam-production-readiness | QG-P1 | bmad-bam-production-readiness | 1,800 |
| bmad-bam-testing | TEA integration | bmad-bam-*-testing | 1,600 |
| **Subtotal** | | | **13,800** |

### Phase 2: Tenant Lifecycle Skills (Priority 2)
**4 skills, 40 step files**

| Skill | Function | V1 Source | Est. Lines |
|-------|----------|-----------|------------|
| bmad-bam-tenant-onboarding | Provisioning | bmad-bam-tenant-onboarding-design | 1,600 |
| bmad-bam-tenant-offboarding | Cleanup | bmad-bam-tenant-offboarding-design | 1,600 |
| bmad-bam-billing | Metering | bmad-bam-usage-metering-design | 1,600 |
| bmad-bam-white-labeling | Customization | bmad-bam-tenant-white-labeling-design | 1,400 |
| **Subtotal** | | | **6,200** |

### Phase 3: AI/Agent Skills (Priority 3)
**5 skills, 50 step files**

| Skill | Function | V1 Source | Est. Lines |
|-------|----------|-----------|------------|
| bmad-bam-agent-debug | Troubleshooting | bmad-bam-ai-agent-debug | 1,600 |
| bmad-bam-agent-tracing | Observability | bmad-bam-agent-execution-tracing | 1,600 |
| bmad-bam-llm-versioning | Model management | bmad-bam-ai-model-* | 1,600 |
| bmad-bam-memory-tiers | Agent memory | bmad-bam-agent-memory-optimization | 1,600 |
| bmad-bam-tool-contracts | Tool safety | integration/validate-tool-contract | 1,600 |
| **Subtotal** | | | **8,000** |

### Phase 4: Operations Skills (Priority 4)
**6 skills, 60 step files**

| Skill | Function | V1 Source | Est. Lines |
|-------|----------|-----------|------------|
| bmad-bam-observability | Monitoring | bmad-bam-tenant-aware-observability | 1,600 |
| bmad-bam-security | Security design | bmad-bam-security-* | 1,800 |
| bmad-bam-compliance | Compliance | bmad-bam-compliance-* | 1,800 |
| bmad-bam-scaling | Auto-scaling | bmad-bam-auto-scaling-configuration | 1,400 |
| bmad-bam-events | Event architecture | bmad-bam-event-streaming-design | 1,600 |
| bmad-bam-caching | Cache patterns | NEW (domain-based) | 1,400 |
| **Subtotal** | | | **9,600** |

### Phase 5: Planning Skills (Priority 5)
**4 skills, 40 step files**

| Skill | Function | V1 Source | Est. Lines |
|-------|----------|-----------|------------|
| bmad-bam-requirements | Requirement intake | ingestion/requirement-ingestion | 1,400 |
| bmad-bam-triage | Complexity triage | ingestion/triage-module-complexity | 1,400 |
| bmad-bam-cross-module-story | Story creation | bmad-bam-cross-module-story | 1,400 |
| bmad-bam-module-epics | Epic creation | module/create-module-epics | 1,400 |
| **Subtotal** | | | **5,600** |

### Phase 6: Specialized Skills (Priority 6)
**3 skills, 30 step files**

| Skill | Function | V1 Source | Est. Lines |
|-------|----------|-----------|------------|
| bmad-bam-data-residency | Data locality | bmad-bam-data-* + GDPR | 1,400 |
| bmad-bam-api-versioning | API lifecycle | bmad-bam-api-version-release | 1,400 |
| bmad-bam-research | Web research | NEW | 1,200 |
| **Subtotal** | | | **4,000** |

**GRAND TOTAL: 47,200 lines**

---

## Validation Tooling

### Test File: test/v2/step-content.test.js

```javascript
const fs = require('fs');
const path = require('path');

const SKILLS_DIR = 'src-v2/skills';
const MIN_LINES = 120;
const MAX_LINES = 250;

const REQUIRED_SECTIONS = [
  '## MANDATORY EXECUTION RULES',
  '## EXECUTION PROTOCOLS',
  '## Purpose',
  '## Prerequisites',
  '## Actions',
  '## Verification',
  '## Next Step'
];

const OPTIONAL_SECTIONS = [
  '## Error Handling',
  '## COLLABORATION MENUS',
  '## Soft Gate Checkpoint',
  '## Verification Matrix'
];

describe('V2 Step Content Validation', () => {
  const skills = fs.readdirSync(SKILLS_DIR)
    .filter(f => f.startsWith('bmad-bam-'));

  test.each(skills)('%s has properly filled step files', (skill) => {
    const stepsDir = path.join(SKILLS_DIR, skill, 'steps');
    const steps = fs.readdirSync(stepsDir).filter(f => f.endsWith('.md'));

    steps.forEach(step => {
      const content = fs.readFileSync(path.join(stepsDir, step), 'utf8');
      const lines = content.split('\n').length;

      // Check line count
      expect(lines).toBeGreaterThanOrEqual(MIN_LINES);
      expect(lines).toBeLessThanOrEqual(MAX_LINES);

      // Check required sections
      REQUIRED_SECTIONS.forEach(section => {
        expect(content).toContain(section);
      });

      // Check for web search directive (at least one)
      expect(content).toMatch(/Search the web:|web search/i);
    });
  });

  test.each(skills)('%s step files have descriptive names', (skill) => {
    const stepsDir = path.join(SKILLS_DIR, skill, 'steps');
    const steps = fs.readdirSync(stepsDir).filter(f => f.endsWith('.md'));

    steps.forEach(step => {
      // Should NOT have generic names
      expect(step).not.toMatch(/step-\d+-[cev]-start\.md/);
      expect(step).not.toMatch(/step-\d+-[cev]-analyze\.md/);
      expect(step).not.toMatch(/step-\d+-[cev]-design\.md/);
      expect(step).not.toMatch(/step-\d+-[cev]-complete\.md/);
    });
  });
});
```

### Validation Script: scripts/validate-step-content.sh

```bash
#!/bin/bash
# Validate step content compliance

SKILLS_DIR="src-v2/skills"
MIN_LINES=120
ERRORS=0

for skill in "$SKILLS_DIR"/bmad-bam-*/; do
  for step in "$skill/steps/"step-*.md; do
    lines=$(wc -l < "$step")
    
    if [ "$lines" -lt "$MIN_LINES" ]; then
      echo "ERROR: $step has only $lines lines (min: $MIN_LINES)"
      ERRORS=$((ERRORS + 1))
    fi
    
    # Check required sections
    for section in "MANDATORY EXECUTION RULES" "EXECUTION PROTOCOLS" "Purpose" "Actions" "Verification"; do
      if ! grep -q "## $section" "$step"; then
        echo "ERROR: $step missing ## $section"
        ERRORS=$((ERRORS + 1))
      fi
    done
  done
done

if [ "$ERRORS" -eq 0 ]; then
  echo "All step files valid!"
  exit 0
else
  echo "Found $ERRORS errors"
  exit 1
fi
```

---

## Example Filled Step File

### Before (stub - 28 lines):
```markdown
# Step 03 C Design

## Purpose

Design the solution based on analysis.

## Prerequisites

- Step 02 complete

## Actions

### 1. Apply Patterns

Apply identified patterns.

### 2. Design Solution

Create design decisions.

## Verification

- [ ] Design complete
- [ ] Decisions documented

## Next Step

Proceed to `step-04-c-document.md`
```

### After (filled - 180 lines):
```markdown
# Step 3: Context Propagation Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Design comprehensive tenant context propagation ensuring that tenant identity flows through ALL code paths—HTTP requests, background jobs, events, WebSockets, scheduled tasks, and AI agent runs.

---

## Prerequisites

- Isolation matrix complete (Step 2)
- Module boundaries defined
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv` → filter: `{tenant_model}`
- **Load domain:** `{project-root}/_bmad/bam/data/domains/tenant.md`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/tenant-models.csv`
- Templates: `{project-root}/_bmad/bam/data/templates/`

---

## Actions

### 1. Load Context Propagation Patterns

Read the TenantContext interface and propagation patterns from domain files:
- TenantContext interface definition
- Required fields: tenant_id, user_id, workspace_id, tier, permissions
- Optional fields: api_key_id, request_id, timestamp

### 2. Design Propagation for Each Code Path

For each code path type, apply the patterns from domain knowledge:

| Code Path | Pattern Reference | Key Mechanism |
|-----------|------------------|---------------|
| HTTP Requests | `domains/tenant.md` → Middleware Section | JWT extraction + SET LOCAL |
| Background Jobs | `domains/tenant.md` → Job Processing | Context in payload metadata |
| Event Handlers | `domains/events.md` → Event Publishing | Context in event headers |
| WebSocket | `domains/tenant.md` → Real-time Section | Connection state storage |
| AI Agent Runs | `domains/ai-runtime.md` → State Management | AgentState with context |

### 3. Document Context Flow Diagram

Create a visual representation showing:
- Entry points where context is established
- How context passes through layers
- Where context is used for enforcement (RLS, cache keys, etc.)

```
Request (X-Tenant-ID)
    │
    ▼
┌─────────────────┐
│ Middleware      │ ← Extract tenant from JWT
└────────┬────────┘
         │
    SET LOCAL app.current_tenant_id
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐ ┌───────┐
│Service│ │Service│ ← All queries auto-filtered by RLS
└───────┘ └───────┘
```

### 4. Design No-Context Guard

Implement defensive pattern to prevent execution without context:
- Reference guard pattern from `domains/security.md`
- Define which operations require mandatory context
- Specify behavior when context is missing (fail fast)

### 5. Create Verification Tests

For each code path, define test cases:
- Valid context propagation test
- Missing context rejection test
- Context tampering prevention test

---

## Verification Matrix

| Code Path | Context Source | DB Session Set | Tested |
|-----------|----------------|----------------|--------|
| HTTP Request | JWT Middleware | SET LOCAL | [ ] |
| Background Job | Job Payload | SET LOCAL | [ ] |
| Event Handler | Event Headers | SET LOCAL | [ ] |
| WebSocket | Connection State | Per message | [ ] |
| AI Agent Run | State Object | Tool wrapper | [ ] |

---

## Soft Gate Checkpoint

**Steps 1-3 complete the isolation model design.**

Present summary of:
1. Tenant model (hierarchy, billing entity)
2. Isolation matrix (all asset types)
3. Context propagation (all code paths)

Ask for confirmation before proceeding to sharing rules and compliance.

---

## Error Handling

### Context Propagation Failures

#### Missing Tenant Context at Runtime
If code executes without tenant context:
1. **HALT EXECUTION** - Never allow operations without tenant context
2. Check middleware order - tenant extraction must run early
3. Verify JWT contains required claims (tenant_id, user_id)
4. Review code path for context loss (async boundaries, event handlers)
5. Add explicit context guards at all entry points

| Error | Cause | Fix |
|-------|-------|-----|
| "tenant context required" | Guard triggered correctly | Trace back to find where context was lost |
| "invalid tenant_id" | Malformed or expired JWT | Validate JWT structure and expiry |
| "context not propagated" | Async boundary dropped context | Use AsyncLocalStorage or explicit propagation |

### Escalation Path
If issues persist:
1. Map complete request flow with context checkpoints
2. Identify all async boundaries and event handlers
3. Escalate to platform architect if middleware changes needed

**Verify current best practices with web search:**
Search the web: "tenant context propagation patterns {date}"
Search the web: "AsyncLocalStorage multi-tenant {date}"

---

## COLLABORATION MENUS (A/P/C):

After completing the context propagation design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into propagation edge cases and async boundaries
- **P (Party Mode)**: Bring analyst and architect perspectives for context flow review
- **C (Continue)**: Accept context propagation design and proceed to sharing rules
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass propagation context: code paths, verification matrix, guard design
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into context propagation design
- Return to A/P/C menu

### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review context propagation design: {summary of code paths and guards}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

### If 'C' (Continue):
- Save context propagation design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-sharing-rules.md`

---

## Verification

- [ ] TenantContext interface defined following domain pattern
- [ ] All code paths have propagation design
- [ ] No-context-guard approach documented
- [ ] Test cases defined for each path type
- [ ] Patterns align with pattern registry

---

## Outputs

- Context propagation design document
- Code path verification matrix
- Test case specifications
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-isolation.md`

---

## Next Step

After soft gate approval, proceed to `step-04-c-sharing-rules.md`.
```

---

## Rollback Strategy

If implementation fails partway:

1. **Git-based rollback:** All changes committed per-phase
   ```bash
   git revert HEAD~N  # Revert last N commits
   ```

2. **Partial state handling:**
   - Each phase is self-contained
   - Skills can be rolled back individually
   - Stub files preserved in git history

3. **Recovery procedure:**
   - Identify failed skill
   - Restore stub files from git
   - Re-run implementation for that skill only

---

## Skill Dependencies

Implementation order must respect dependencies:

```
Phase 1 (no dependencies):
  master-architecture → module-architecture → tenant-isolation → agent-runtime
                                                      ↓
Phase 1 (depends on above):                   facade-contract → convergence → production-readiness
                                                                                      ↓
Phase 2-6 (depends on Phase 1):                                               All remaining skills
```

---

## Quality Metrics

| Metric | Current | Target | Validation |
|--------|---------|--------|------------|
| Avg lines/step | 28 | 150-200 | Script check |
| Total step content | 8,534 | 47,200 | wc -l |
| BMAD sections present | ~20% | 100% | grep check |
| Web search directives | 0% | 100% | grep check |
| Collaboration menus | 0% | 100% | grep check |
| Error handling sections | 0% | 100% | grep check |
| Descriptive step names | 0% | 100% | regex check |

---

## Verification Checklist

For each filled step file:

- [ ] MANDATORY EXECUTION RULES section present with all 5 rules
- [ ] EXECUTION PROTOCOLS section present with all 5 protocols
- [ ] Purpose section with clear, specific description
- [ ] Prerequisites with domain/pattern references using correct paths
- [ ] Actions with 3-5 numbered, detailed steps
- [ ] Tables for decision matrices where applicable
- [ ] Verification Matrix with checkboxes (for design steps)
- [ ] Soft Gate Checkpoint (for mid-workflow decision points)
- [ ] Error Handling section with recovery procedures
- [ ] Collaboration Menus (A/P/C) section with all three options
- [ ] Web search directives with `{date}` placeholder
- [ ] Output section with template references
- [ ] Next Step section with correct file reference
- [ ] Line count between 120-250
- [ ] No generic step names (start, analyze, design, complete)

---

## Success Criteria

1. All 300 step files filled with BMAD-compatible content
2. Average line count per step: 150-200 (min 120, max 250)
3. All BMAD convention sections present in every step
4. All step files pass `scripts/validate-step-content.sh`
5. All step files pass `npm test -- test/v2/step-content.test.js`
6. All step files have descriptive names (no generic names)
7. All skills reference appropriate domain/pattern files
8. All skills have working V1→V2 content migration
