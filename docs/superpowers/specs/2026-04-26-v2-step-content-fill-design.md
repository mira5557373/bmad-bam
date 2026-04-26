# V2 Step Content Fill Design Spec

**Version:** 6.0.0  
**Date:** 2026-04-26  
**Status:** Ready for Implementation

## Summary

Enhance 300 V2 step files from minimal stubs (28 lines) to BMAD-method compliant format, ensuring **seamless integration** with existing BMAD method capabilities including web queries, checkpoints, party mode, advanced elicitation, and module help system.

---

## BMAD Ecosystem Integration Requirements

### 1. Web Search Integration

**Pattern from `bmad-market-research/steps/step-04-customer-decisions.md`:**

```markdown
## MANDATORY EXECUTION RULES (READ FIRST):
- 🛑 NEVER generate content without web search verification
- ✅ Search the web to verify and supplement your knowledge with current facts

## EXECUTION PROTOCOLS:
- 🎯 Show web search analysis before presenting findings

### 2. Execute Web Research

**Execute multiple web searches simultaneously:**
Search the web: "{{research_topic}} customer decision process"
Search the web: "{{research_topic}} buying criteria factors"

**After executing comprehensive parallel web searches:**
- Always cite URLs for web search results
- _Source: [URL]_ for key findings
```

**V2 BAM Integration:** Steps must use V2's CSV `web_queries` column:
```markdown
**Load web queries from CSV:**
Read `{project-root}/_bmad/bam/data/tenant-models.csv` → web_queries column
Execute: Search the web: "{query} {date}"
```

### 2. Checkpoint/HALT Pattern

**Pattern from `bmad-quick-dev/step-02-plan.md`:**

```markdown
### CHECKPOINT 1

Present summary. Display the spec file path.

HALT and ask human: `[A] Approve` | `[E] Edit`

- **A**: Proceed to NEXT.
- **E**: Apply changes, return to CHECKPOINT 1.
```

**V2 BAM Integration:** Quality gate checkpoints:
```markdown
### CHECKPOINT: QG-F1 Soft Gate

Present foundation decisions summary.

HALT and ask: `[A] Approve` | `[E] Edit` | `[V] Validate against QG-F1`

- **A**: Record in output document, proceed.
- **E**: Revise decisions, return to checkpoint.
- **V**: Run `bmad-bam-validate-foundation` workflow.
```

### 3. Party Mode / Advanced Elicitation Integration

**Pattern from `bmad-create-architecture/steps/step-04-decisions.md`:**

```markdown
## COLLABORATION MENUS (A/P/C):

- **A (Advanced Elicitation)**: Use discovery protocols
- **P (Party Mode)**: Bring multiple perspectives
- **C (Continue)**: Save and proceed

## PROTOCOL INTEGRATION:

- When 'A' selected: Invoke the `bmad-advanced-elicitation` skill
- When 'P' selected: Invoke the `bmad-party-mode` skill
- PROTOCOLS always return to this step's A/P/C menu
- User accepts/rejects changes before proceeding

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill with {context}
- Pass context: {what's being explored}
- Process enhanced insights
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill with {context}
- Context: "{summary of current state}"
- Process multi-perspective analysis
- Return to A/P/C menu
```

**V2 BAM Integration:** Multi-tenant specific contexts:
```markdown
#### If 'P' (Party Mode):
- Invoke `bmad-party-mode` skill
- Context: "Review tenant isolation model: {tenant_model} for {tenant_count} tenants"
- Bring architect, security, compliance perspectives
- Return to A/P/C menu
```

### 4. Module Help CSV Integration

**BMAD module-help.csv pattern:**
```csv
module,skill,display-name,menu-code,description,action,args,phase,after,before,required,output-location,outputs
```

**V2 BAM must add entries to `src/module-help.csv`:**
```csv
bam,bmad-bam-master-architecture,Master Architecture,ZMA,Create master architecture with tenant model,create,,3-solutioning,,,true,planning_artifacts,master-architecture.md
bam,bmad-bam-tenant-isolation,Tenant Isolation,ZTI,Design tenant isolation model,create,,3-solutioning,bmad-bam-master-architecture,,true,planning_artifacts,tenant-isolation.md
```

### 5. Variable Substitution Patterns

**BMAD variable conventions:**

| Variable | Source | Usage |
|----------|--------|-------|
| `{project-root}` | Skill root | Path prefix |
| `{skill-root}` | Skill directory | Relative paths |
| `{planning_artifacts}` | config.yaml | Output location |
| `{user_name}` | config.yaml | Greeting |
| `{communication_language}` | config.yaml | Output language |
| `{{variable}}` | Runtime | Template substitution |
| `{if_condition}...{/if_condition}` | Runtime | Conditional blocks |

**V2 BAM additions:**
| Variable | Source | Usage |
|----------|--------|-------|
| `{tenant_model}` | config.yaml | Selected isolation model |
| `{ai_runtime}` | config.yaml | Selected AI framework |
| `{output_folder}` | config.yaml | BAM output location |

### 6. SKILL.md Enhancement Requirements

**Current V2 SKILL.md (minimal):**
```markdown
---
name: bmad-bam-master-architecture
description: 'Create master architecture'
---
# Master Architecture
## Modes
...
```

**Required BMAD-compliant SKILL.md:**
```markdown
---
name: bmad-bam-master-architecture
description: 'Create master architecture with tenant model and AI runtime foundation. Use when starting new multi-tenant SaaS project.'
module: bam
---

# Master Architecture Workflow

**Goal:** Create comprehensive master architecture decisions for multi-tenant SaaS with AI agent capabilities.

**Your Role:** You are an architectural facilitator collaborating with the user. Bring structured thinking about tenant isolation and AI runtime patterns while the user brings domain expertise.

## Conventions

- Bare paths resolve from skill root.
- `{project-root}/_bmad/bam/data/` contains domains, patterns, CSVs.
- Quality gate QG-F1 governs this workflow.

## On Activation

### Step 1: Load Config
Load from `{project-root}/_bmad/bam/config.yaml`:
- `{tenant_model}` - pre-selected isolation model
- `{ai_runtime}` - pre-selected AI framework
- `{user_name}`, `{communication_language}`

### Step 2: Load Persistent Facts
```toml
persistent_facts = [
  "file:{project-root}/_bmad/bam/data/domains/tenant.md",
  "file:{project-root}/_bmad/bam/data/domains/ai-runtime.md",
  "file:{project-root}/_bmad/bam/data/checklists/qg-f1.md",
]
```

### Step 3: Greet User
"Welcome {user_name}! Let's create your master architecture for multi-tenant SaaS."

## Execution

Read fully and follow: `./steps/step-01-c-discovery.md`

## Quality Gate

**Gate:** QG-F1 (Foundation Gate)
**Checklist:** `{project-root}/_bmad/bam/data/checklists/qg-f1.md`
```

### 7. customize.toml Enhancement

**Current V2 customize.toml:**
```toml
[workflow]
persistent_facts = [...]
on_complete = "..."
```

**Required BMAD-compliant customize.toml:**
```toml
[workflow]

# Pre-activation steps
activation_steps_prepend = []

# Post-greeting steps  
activation_steps_append = [
  "Verify tenant_model and ai_runtime are set in config.yaml",
]

# Persistent facts loaded for entire workflow
persistent_facts = [
  "file:{project-root}/_bmad/bam/data/domains/tenant.md",
  "file:{project-root}/_bmad/bam/data/domains/ai-runtime.md",
  "file:{project-root}/_bmad/bam/data/domains/integration.md",
  "file:{project-root}/_bmad/bam/data/checklists/qg-f1.md",
  "file:{project-root}/**/project-context.md",
]

# On workflow completion
on_complete = """
Master architecture complete.

**Next workflows:**
- ZMO (bmad-bam-module-architecture) - Design individual modules
- ZTI (bmad-bam-tenant-isolation) - Deep dive tenant isolation
- ZAR (bmad-bam-agent-runtime) - Configure AI agent runtime

**Quality Gate:** Run ZVF (bmad-bam-validate-foundation) to verify QG-F1.
"""

# Menu items for this workflow
[[workflow.menu]]
code = "ZMA"
name = "Create Master Architecture"
action = "create"

[[workflow.menu]]
code = "ZMA-E"
name = "Edit Master Architecture"
action = "edit"

[[workflow.menu]]
code = "ZMA-V"
name = "Validate Master Architecture"
action = "validate"
```

### 8. workflow.md Mode Router Enhancement

**Pattern from `bmad-create-architecture/workflow.md`:**

```markdown
# {Workflow Name}

## Variables
- `{{project_name}}` - From config.yaml
- `{{planning_artifacts}}` - Output location

## Create Mode
Follow steps in sequence:
1. Read fully and follow: `./steps/step-01-init.md`
2. After step completion, read: `./steps/step-02-capture.md`
...

## Edit Mode
1. Read: `./steps/step-10-e-load.md`
2. Read: `./steps/step-11-e-apply.md`

## Validate Mode
1. Read: `./steps/step-20-v-load.md`
2. Read: `./steps/step-21-v-check.md`
```

**V2 BAM workflow.md template:**
```markdown
# {Skill Name} Workflow

## Mode Selection

| Mode | Purpose | Steps |
|------|---------|-------|
| **Create** | Generate new {artifact} | `step-01-c` → `step-05-c` |
| **Edit** | Modify existing {artifact} | `step-10-e` → `step-11-e` |
| **Validate** | Check against QG-{gate} | `step-20-v` → `step-22-v` |

Default: **Create** unless {artifact} exists.

## Variables

- `{tenant_model}` - Selected isolation model (from config.yaml)
- `{ai_runtime}` - Selected AI framework (from config.yaml)
- `{output_folder}` - Output location (from config.yaml)
- `{{current_date}}` - Runtime date

## Create Mode

Execute in sequence. Do NOT skip steps.

### Step 1: {First Step Title}
Read fully and follow: `./steps/step-01-c-{name}.md`
Outputs: {What this step produces}

### Step 2: {Second Step Title}
Read fully and follow: `./steps/step-02-c-{name}.md`
Prerequisites: Step 1 complete
Outputs: {What this step produces}

...continue pattern...

### Step 5: {Final Step Title}
Read fully and follow: `./steps/step-05-c-{name}.md`
Prerequisites: Steps 1-4 complete
Final Output: `{output_folder}/planning_artifacts/{artifact}.md`

## Edit Mode

### Step 10: Load Existing
Read: `./steps/step-10-e-load.md`
Load: `{output_folder}/planning_artifacts/{artifact}.md`

### Step 11: Apply Changes
Read: `./steps/step-11-e-apply.md`
Merge edits with existing document.

## Validate Mode

### Step 20: Load for Validation
Read: `./steps/step-20-v-load.md`
Load: Target document + QG-{gate} checklist

### Step 21: Execute Validation
Read: `./steps/step-21-v-validate.md`
Run checklist against document.

### Step 22: Generate Report
Read: `./steps/step-22-v-report.md`
Output: `{output_folder}/planning_artifacts/{artifact}-validation.md`

## Quality Gate

**Gate:** QG-{gate}
**Checklist:** `{project-root}/_bmad/bam/data/checklists/qg-{gate}.md`
**Run via:** ZV{code} menu code
```

### 9. Step Navigation Pattern

**BMAD step-to-step navigation:**

```markdown
## NEXT STEP:

After user selects [C] and {artifact} is recorded:

1. Update frontmatter: `stepsCompleted: [1, 2]`
2. Announce: "Step {N} complete. Loading step {N+1}..."
3. Read fully and follow: `./step-{NN}-c-{name}.md`

**DO NOT** proceed until user explicitly selects [C]!
```

**Checkpoint navigation (for approval gates):**

```markdown
### CHECKPOINT: {Gate Name}

Present: {Summary of decisions}
Show: File path `{output_folder}/planning_artifacts/{artifact}.md`

HALT and ask:
```
[A] Approve - Accept and continue to step {N+1}
[E] Edit - Revise, return to this checkpoint
[V] Validate - Run QG-{gate} validation now
```

- **A**: Record decisions, load `./step-{NN}-c-{next}.md`
- **E**: User describes changes, agent revises, re-present checkpoint
- **V**: Invoke `bmad-bam-validate-{domain}`, return with results
```

### 10. Module Help Integration

Every V2 skill must have corresponding module-help.csv entry:

**Required columns for V2 BAM:**

| Column | Purpose | Example |
|--------|---------|---------|
| module | Always `bam` | bam |
| skill | Full skill name | bmad-bam-master-architecture |
| display-name | Human name | Master Architecture |
| menu-code | Z-prefixed code | ZMA |
| description | Brief purpose | Create master architecture |
| action | Mode | create, edit, validate |
| phase | BMAD phase | 3-solutioning |
| after | Prerequisites | - |
| before | Enables | bmad-bam-module-architecture |
| required | Mandatory | true |
| output-location | Where output goes | planning_artifacts |
| outputs | Output files | master-architecture.md |
| keywords | Search terms | architecture,tenant,foundation |

**Phase mapping for V2:**

| BAM Domain | BMAD Phase |
|------------|------------|
| Foundation skills | 3-solutioning |
| Module skills | 3-solutioning |
| Integration skills | 4-implementation |
| Validation skills | 5-quality |
| Operations skills | 6-operations |

---

## Official BMAD Method Analysis

### Step File Statistics (104 official files)

| Metric | Value |
|--------|-------|
| Total files | 104 |
| Total lines | 21,150 |
| **Average lines** | **203** |
| Minimum | 30 |
| Maximum | 493 |

### Line Count by Phase

| Phase | Step Range | Example Skills |
|-------|------------|----------------|
| Implementation | 30-100 lines | bmad-quick-dev, bmad-code-review |
| Solutioning | 80-380 lines | bmad-create-architecture, bmad-create-epics |
| Planning | 120-265 lines | bmad-create-prd, bmad-create-ux-design |
| Research | 130-493 lines | bmad-domain-research, bmad-market-research |

### BMAD Step File Sections (VERIFIED)

From `bmad-create-architecture/steps/step-01-init.md` (153 lines):

```markdown
# Step N: {Title}

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ✅ ALWAYS treat this as collaborative discovery
- 📋 YOU ARE A FACILITATOR, not a content generator
- 💬 FOCUS on {step scope} only - don't look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after completion
- 📖 Update frontmatter `stepsCompleted` before loading next step
- 🚫 FORBIDDEN to load next step until {condition}

## CONTEXT BOUNDARIES:

- Variables from workflow.md are available
- Previous context = what's in output document + frontmatter
- Don't assume knowledge from other steps

## YOUR TASK:

{Clear task description}

## {MAIN SEQUENCE}:

### 1. {First Action}
{Detailed instructions}

### 2. {Second Action}
{Detailed instructions}

### 3. {Third Action}
{Detailed instructions}

## SUCCESS METRICS:

✅ {Success condition 1}
✅ {Success condition 2}

## FAILURE MODES:

❌ {Failure condition 1}
❌ {Failure condition 2}

## NEXT STEP:

After user selects [C], load `./step-{NN}-{name}.md`
```

### COLLABORATION MENUS (A/P/C) - Official BMAD Pattern

From `bmad-create-architecture/steps/step-04-decisions.md`:

```markdown
## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols
- **P (Party Mode)**: Bring multiple perspectives
- **C (Continue)**: Save and proceed

## PROTOCOL INTEGRATION:

- When 'A' selected: Invoke `bmad-advanced-elicitation` skill
- When 'P' selected: Invoke `bmad-party-mode` skill
- PROTOCOLS always return to this step's A/P/C menu
- User accepts/rejects changes before proceeding
```

---

## V2 Step File Target Sizes

Based on BMAD method analysis, V2 steps should match these targets:

| Step Type | Target Lines | Rationale |
|-----------|--------------|-----------|
| Create (01-05) | 150-250 | Solutioning-equivalent, decision-heavy |
| Edit (10-11) | 80-120 | Simpler load/apply pattern |
| Validate (20-22) | 100-150 | Checklist-driven verification |
| **Weighted Average** | ~170 | Matches BMAD solutioning phase |

### Content Target

- **Current:** 300 files × 28 lines = 8,400 lines
- **Target:** 300 files × ~170 lines = 51,000 lines
- **Gap:** ~42,600 lines to add

---

## Required BMAD Sections by Step Type

### Create Mode Steps (step-01-c through step-05-c)

| Section | Required | Lines |
|---------|----------|-------|
| MANDATORY EXECUTION RULES | ✅ Yes | 10-15 |
| EXECUTION PROTOCOLS | ✅ Yes | 8-12 |
| CONTEXT BOUNDARIES | ✅ Yes | 5-8 |
| YOUR TASK | ✅ Yes | 3-5 |
| Main Sequence (3-5 actions) | ✅ Yes | 60-100 |
| COLLABORATION MENUS (A/P/C) | ✅ Yes (steps 2-5) | 20-30 |
| SUCCESS METRICS | ✅ Yes | 8-12 |
| FAILURE MODES | ✅ Yes | 8-12 |
| NEXT STEP | ✅ Yes | 5-8 |
| **Total** | | **150-250** |

### Edit Mode Steps (step-10-e, step-11-e)

| Section | Required | Lines |
|---------|----------|-------|
| MANDATORY EXECUTION RULES | ✅ Yes | 8-10 |
| EXECUTION PROTOCOLS | ✅ Yes | 6-8 |
| YOUR TASK | ✅ Yes | 3-5 |
| Load/Apply Sequence | ✅ Yes | 30-50 |
| SUCCESS METRICS | ✅ Yes | 5-8 |
| NEXT STEP | ✅ Yes | 3-5 |
| **Total** | | **80-120** |

### Validate Mode Steps (step-20-v through step-22-v)

| Section | Required | Lines |
|---------|----------|-------|
| MANDATORY EXECUTION RULES | ✅ Yes | 8-10 |
| EXECUTION PROTOCOLS | ✅ Yes | 6-8 |
| YOUR TASK | ✅ Yes | 3-5 |
| Validation Sequence | ✅ Yes | 40-60 |
| Quality Gate Integration | ✅ Yes | 15-25 |
| SUCCESS METRICS | ✅ Yes | 8-12 |
| NEXT STEP | ✅ Yes | 3-5 |
| **Total** | | **100-150** |

---

## V2 Resource Integration

### Domain Loading Pattern

Steps load V2 domain files for context:

```markdown
## CONTEXT BOUNDARIES:

- **Load domain:** `{project-root}/_bmad/bam/data/domains/tenant.md`
- **Load domain:** `{project-root}/_bmad/bam/data/domains/security.md`
- Decision matrix available from tenant.md
- Quality checks available from domain files
```

### Pattern Reference Pattern

Steps reference V2 pattern files for implementation:

```markdown
### 2. Select Isolation Pattern

**Load pattern options:**
- `{project-root}/_bmad/bam/data/patterns/rls.md` - Row-level security
- `{project-root}/_bmad/bam/data/patterns/schema-per-tenant.md` - Schema isolation
- `{project-root}/_bmad/bam/data/patterns/database-per-tenant.md` - Database isolation

Reference decision criteria from `tenant-models.csv`.
```

### CSV Web Query Pattern

Steps use CSV web_queries for current best practices:

```markdown
### 3. Verify Current Best Practices

**Web research from CSV:**
Load `{project-root}/_bmad/bam/data/tenant-models.csv`
Execute web_queries column for selected model:
- Search: "PostgreSQL RLS multi-tenant {date}"
- Search: "tenant isolation patterns SaaS {date}"

_Source: [URL]_ for key findings.
```

---

## Example Filled Step File

### step-01-c-tenant-model-definition.md (195 lines)

```markdown
# Step 1: Tenant Model Definition

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate tenant model without user input on requirements
- 📖 CRITICAL: ALWAYS read complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ✅ ALWAYS treat this as collaborative discovery with the architect
- 📋 YOU ARE A FACILITATOR guiding tenant model decisions
- 💬 FOCUS on tenant model definition only - don't design isolation yet
- 🌐 ALWAYS search web to verify current tenant patterns
- ✅ YOU MUST ALWAYS SPEAK OUTPUT in Agent communication style

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before recommending any model
- 🌐 Search web to verify current multi-tenant best practices
- ⚠️ Present A/P/C menu after gathering requirements
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update frontmatter `stepsCompleted: [1]` before loading next step
- 🚫 FORBIDDEN to load next step until C is selected

## CONTEXT BOUNDARIES:

- **Load domain:** `{project-root}/_bmad/bam/data/domains/tenant.md`
- Decision Matrix from tenant.md is available
- Quality Checks from tenant.md apply
- Don't assume isolation implementation yet - that's step 2

## YOUR TASK:

Facilitate collaborative tenant model definition by gathering requirements, analyzing options using the Decision Matrix, and guiding selection of the appropriate isolation strategy.

## TENANT MODEL SEQUENCE:

### 1. Gather Tenant Requirements

Ask user for critical inputs:

"Let's define your tenant model. I need to understand:

1. **Tenant Count**: Expected tenants now and in 2 years?
2. **Compliance**: Any requirements (SOC2, HIPAA, PCI-DSS, GDPR)?
3. **Tier Distribution**: % of free/pro/enterprise tenants?
4. **Data Sensitivity**: Classification level of tenant data?
5. **Isolation Expectation**: What do customers expect?"

Record responses for Decision Matrix matching.

### 2. Load Decision Criteria

**Load from domain:** Read Decision Matrix from `domains/tenant.md`:

| Tenants | Compliance | Tier | Recommendation |
|---------|------------|------|----------------|
| <1000 | Low | All | RLS |
| <1000 | High | Pro/Enterprise | Schema |
| Any | PCI/HIPAA | Enterprise | Database |
| >10000 | Low | All | RLS + Sharding |

**Load from CSV:** Read `tenant-models.csv` for detailed criteria.

### 3. Verify Current Best Practices

**Web research:**
Search the web: "multi-tenant isolation patterns SaaS {date}"
Search the web: "PostgreSQL RLS vs schema isolation {date}"

Integrate findings with Decision Matrix recommendations.
_Source: [URL]_ for key findings.

### 4. Present Model Recommendation

Based on requirements and Decision Matrix:

"**Tenant Model Recommendation**

Based on your inputs:
- Tenant count: {count} → suggests {model}
- Compliance: {level} → requires {model}
- Tier mix: {mix} → supports {model}

**Recommended Model:** {model}

**Rationale:**
{Why this model fits requirements}

**Trade-offs:**
{What you gain vs. what you sacrifice}

**Alternative Considered:**
{Other viable option and why not chosen}"

## COLLABORATION MENUS (A/P/C):

After presenting recommendation:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into isolation requirements
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept model and proceed to isolation matrix
- **[Specific refinements]**: Describe what to explore

Select an option:
```

### If 'A' (Advanced Elicitation):
- Invoke `bmad-advanced-elicitation` skill
- Pass context: requirements gathered, model considered
- Process enhanced insights
- Return to A/P/C menu

### If 'P' (Party Mode):
- Invoke `bmad-party-mode` skill
- Context: "Review tenant model decision: {summary}"
- Process multi-perspective analysis
- Return to A/P/C menu

### If 'C' (Continue):
- Record tenant model decision in output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to NEXT STEP

## SUCCESS METRICS:

✅ Tenant requirements gathered (count, compliance, tiers, sensitivity)
✅ Decision Matrix consulted with matching criteria
✅ Web research performed for current best practices
✅ Model recommendation presented with rationale
✅ User confirmed model selection via A/P/C menu
✅ Decision recorded in output document

## FAILURE MODES:

❌ Recommending model without gathering requirements
❌ Not consulting Decision Matrix from domain file
❌ Skipping web research for current practices
❌ Proceeding without user confirmation (C selection)
❌ Not recording decision in output document
❌ **CRITICAL**: Reading only partial step file

## NEXT STEP:

After user selects [C] and model is recorded, load `./step-02-c-isolation-matrix.md` to design the 8-dimension isolation matrix for the selected model.

Remember: Do NOT proceed until user explicitly selects [C]!
```

---

## Implementation Phases

### Phase 1: Core Quality Gate Skills (8 skills, 80 steps)
**Target: 80 × 170 avg = 13,600 lines**

| Skill | Steps | Create Target | Edit Target | Validate Target |
|-------|-------|---------------|-------------|-----------------|
| master-architecture | 10 | 200 | 100 | 130 |
| module-architecture | 10 | 200 | 100 | 130 |
| tenant-isolation | 10 | 220 | 100 | 130 |
| agent-runtime | 10 | 220 | 100 | 130 |
| facade-contract | 10 | 180 | 100 | 120 |
| convergence | 10 | 180 | 100 | 130 |
| production-readiness | 10 | 200 | 100 | 150 |
| testing | 10 | 180 | 100 | 120 |

### Phase 2: Tenant Lifecycle (4 skills, 40 steps)
**Target: 40 × 160 avg = 6,400 lines**

### Phase 3: AI/Agent (5 skills, 50 steps)
**Target: 50 × 170 avg = 8,500 lines**

### Phase 4: Operations (6 skills, 60 steps)
**Target: 60 × 160 avg = 9,600 lines**

### Phase 5: Planning (4 skills, 40 steps)
**Target: 40 × 150 avg = 6,000 lines**

### Phase 6: Specialized (3 skills, 30 steps)
**Target: 30 × 150 avg = 4,500 lines**

**GRAND TOTAL: ~48,600 lines** (aligns with BMAD ~200 avg)

---

## Step Naming Convention

Rename generic step names to descriptive names matching content:

| Skill | Current Generic | Rename To Descriptive |
|-------|-----------------|----------------------|
| tenant-isolation | step-01-c-start.md | step-01-c-tenant-model-definition.md |
| tenant-isolation | step-02-c-analyze.md | step-02-c-isolation-matrix.md |
| tenant-isolation | step-03-c-design.md | step-03-c-context-propagation.md |
| tenant-isolation | step-04-c-document.md | step-04-c-sharing-rules.md |
| tenant-isolation | step-05-c-complete.md | step-05-c-compliance-mapping.md |
| agent-runtime | step-01-c-start.md | step-01-c-orchestration-selection.md |
| agent-runtime | step-02-c-analyze.md | step-02-c-tool-registry.md |
| ... | ... | ... |

---

## Validation Tests

### test/v2/step-content.test.js

```javascript
const SKILLS_DIR = 'src-v2/skills';

// BMAD-aligned thresholds
const THRESHOLDS = {
  create: { min: 120, max: 280 },  // Solutioning-equivalent
  edit: { min: 60, max: 150 },     // Simpler
  validate: { min: 80, max: 180 }  // Moderate
};

const REQUIRED_SECTIONS = [
  '## MANDATORY EXECUTION RULES',
  '## EXECUTION PROTOCOLS',
  '## YOUR TASK',
  '## SUCCESS METRICS',
  '## FAILURE MODES',
  '## NEXT STEP'
];

const CREATE_REQUIRED = [
  '## COLLABORATION MENUS',  // A/P/C required for create steps
  '## CONTEXT BOUNDARIES'
];

describe('V2 Step Content (BMAD-Compliant)', () => {
  // Validate line counts per mode
  // Validate required sections
  // Validate A/P/C menus in create steps
  // Validate emoji usage in MANDATORY EXECUTION RULES
});
```

---

## Quality Metrics

| Metric | V2 Current | Target | BMAD Reference |
|--------|------------|--------|----------------|
| Avg lines (Create) | 28 | 180-220 | 200+ (solutioning) |
| Avg lines (Edit) | 28 | 80-120 | 100 (implementation) |
| Avg lines (Validate) | 28 | 100-150 | 130 (validation) |
| Total content | 8,400 | ~48,600 | 21,150 (104 files) |
| MANDATORY RULES | 0% | 100% | 100% |
| EXECUTION PROTOCOLS | 0% | 100% | 100% |
| A/P/C Menus (Create) | 0% | 100% | 100% |
| SUCCESS METRICS | 0% | 100% | 100% |
| FAILURE MODES | 0% | 100% | 100% |

---

## Success Criteria

1. All 300 step files enhanced to BMAD-compliant format
2. Create steps: 150-250 lines with A/P/C menus
3. Edit steps: 80-120 lines
4. Validate steps: 100-150 lines
5. All steps have MANDATORY EXECUTION RULES with emojis
6. All steps have EXECUTION PROTOCOLS with emojis
7. All steps have SUCCESS METRICS and FAILURE MODES
8. All Create steps (02-05) have COLLABORATION MENUS (A/P/C)
9. All steps reference appropriate domain/pattern files
10. All step file names are descriptive (no generic names)
11. Validation tests pass with BMAD-aligned thresholds

---

## What Changed from v5.0

| v5.0 | v6.0 (BMAD Ecosystem Integration) |
|------|-----------------------------------|
| Core step structure defined | Added full BMAD ecosystem integration |
| Basic line targets | Integration with web queries, checkpoints, party mode |
| Generic step content | customize.toml, SKILL.md, workflow.md enhancements |
| Standalone steps | Module help CSV integration for discovery |
| Manual navigation | Step navigation patterns with frontmatter updates |

**v6.0 Additions:**
1. Web Search Integration (CSV web_queries pattern)
2. Checkpoint/HALT Pattern (QG soft gates with A/E/V options)
3. Party Mode / Advanced Elicitation Integration (A/P/C menus)
4. Module Help CSV Integration (skill discovery)
5. Variable Substitution Patterns (config.yaml resolution)
6. SKILL.md Enhancement Requirements (activation sequence)
7. customize.toml Enhancement (persistent_facts, on_complete)
8. workflow.md Mode Router Enhancement (create/edit/validate routing)
9. Step Navigation Pattern (frontmatter updates, checkpoint gates)
10. Module Help Integration (Z-prefixed menu codes, phase mapping)

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-26 | Initial spec |
| 2.0.0 | 2026-04-26 | Added V1 mappings |
| 3.0.0 | 2026-04-26 | Expanded V1 mappings |
| 4.0.0 | 2026-04-26 | Wrong: targeted 60-80 lines, removed BMAD sections |
| 5.0.0 | 2026-04-26 | **Correct:** Verified against official BMAD method (104 files, 203 avg lines). Restored emoji MANDATORY RULES, COLLABORATION MENUS, EXECUTION PROTOCOLS. Target 80-250 lines by mode. |
| 6.0.0 | 2026-04-26 | **BMAD Ecosystem Integration:** Added 10 integration patterns (web queries, checkpoints, party mode, module help, variable substitution, SKILL.md/customize.toml/workflow.md enhancements, step navigation, module help CSV). Full seamless integration with existing BMAD method capabilities. |
