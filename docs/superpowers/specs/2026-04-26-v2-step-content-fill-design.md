# V2 Step Content Fill Design Spec

**Version:** 5.0.0  
**Date:** 2026-04-26  
**Status:** Ready for Implementation

## Summary

Enhance 300 V2 step files from minimal stubs (28 lines) to BMAD-method compliant format, following official BMAD conventions verified from `/external/bmad-method/src/bmm-skills/`.

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

## What Changed from v4.0

| v4.0 (Wrong) | v5.0 (Correct - BMAD Verified) |
|--------------|--------------------------------|
| Target 60-80 lines | Target 80-250 lines (by mode) |
| Remove emoji MANDATORY RULES | ✅ KEEP - official BMAD standard |
| Remove COLLABORATION MENUS | ✅ KEEP - official BMAD standard |
| Remove EXECUTION PROTOCOLS | ✅ KEEP - official BMAD standard |
| Use simple CHECKPOINT | Use full A/P/C pattern |
| 18,000-24,000 total lines | ~48,600 total lines |
| Called V1 "over-engineered" | V1 followed BMAD correctly |

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-26 | Initial spec |
| 2.0.0 | 2026-04-26 | Added V1 mappings |
| 3.0.0 | 2026-04-26 | Expanded V1 mappings |
| 4.0.0 | 2026-04-26 | Wrong: targeted 60-80 lines, removed BMAD sections |
| 5.0.0 | 2026-04-26 | **Correct:** Verified against official BMAD method (104 files, 203 avg lines). Restored emoji MANDATORY RULES, COLLABORATION MENUS, EXECUTION PROTOCOLS. Target 80-250 lines by mode. |
