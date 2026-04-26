# V2 Step Content Fill Design Spec

**Version:** 4.0.0  
**Date:** 2026-04-26  
**Status:** Ready for Implementation

## Summary

Enhance 300 V2 step files from minimal stubs (28 lines) to BMAD-method compliant format (60-80 lines), using V2's domain/pattern files as context sources and following official BMAD conventions.

**Critical Correction:** This spec aligns with V2's C³ design philosophy and official BMAD method—NOT the over-engineered V1 format.

---

## V2 Design Philosophy (C³ Approach)

V2 implements **Context-Conscious Consolidation**:

| Aspect | V1 (Legacy) | V2 (C³) | BMAD Standard |
|--------|-------------|---------|---------------|
| Step file size | 150-200 lines | 60-80 lines | 40-100 lines |
| Content location | Embedded in steps | Domains/patterns | External context |
| Workflow count | 179 workflows | 30 skills | Skill-based |
| Context loading | Inline | `**Load domain:**` | External files |
| Decision criteria | Embedded tables | CSV + web queries | Registry pattern |

V2's 28-line stubs are intentionally minimal because:
1. **Domain files** (12 files) contain core concepts and decision matrices
2. **Pattern files** (10 files) contain implementation guidance
3. **CSV files** (3 files) provide decision criteria + web queries
4. **Step files** orchestrate these resources, not duplicate them

---

## Official BMAD Step File Format

Based on analysis of `/external/bmad-method/src/bmm-skills/`:

```markdown
---
domain_file: '{project-root}/_bmad/bam/data/domains/{domain}.md'
pattern_file: '{project-root}/_bmad/bam/data/patterns/{pattern}.md'
output_file: '{output_folder}/planning-artifacts/{artifact}.md'
---

# Step N: {Title}

## RULES

- {Agent behavior rule 1}
- {Agent behavior rule 2}
- Do NOT skip steps or generate without user input.

## INSTRUCTIONS

1. **Load context.** Read `{domain_file}` and `{pattern_file}`.
2. **{Action 1}.** {Specific guidance referencing loaded context.}
3. **{Action 2}.** {Specific guidance.}
4. **{Action 3}.** {Specific guidance.}

### CHECKPOINT

Present summary of findings/decisions. HALT and ask:
`[A] Approve` | `[E] Edit` | `[?] Questions`

- **A**: Save to `{output_file}`, proceed to NEXT.
- **E**: Apply changes, return to CHECKPOINT.
- **?**: Answer questions, return to CHECKPOINT.

## NEXT

Read fully and follow `./step-{NN}-{mode}-{name}.md`
```

**Line count: 40-80 lines** (NOT 150-200)

---

## What V2 Steps Need (Gap Analysis)

| Section | V2 Current | BMAD Required | Action |
|---------|------------|---------------|--------|
| Frontmatter | Missing | Variables for paths | Add 5-8 lines |
| RULES | Missing | Agent behavior | Add 8-12 lines |
| INSTRUCTIONS | Minimal (10 lines) | Numbered steps | Enhance to 20-30 lines |
| CHECKPOINT | Missing | User approval point | Add 10-15 lines |
| NEXT | Present (2 lines) | Next step pointer | Keep |
| **Total** | 28 lines | 60-80 lines | Add ~40 lines |

**What V2 Steps Do NOT Need:**
- ❌ 🛑 Emoji-heavy "MANDATORY EXECUTION RULES" (V1 over-engineering)
- ❌ "EXECUTION PROTOCOLS" section (V1 addition)
- ❌ "COLLABORATION MENUS (A/P/C)" (V1 addition, use CHECKPOINT instead)
- ❌ "Verification Matrix" tables (use CSV + domain quality checks)
- ❌ "Error Handling" tables (handle at skill level, not step)
- ❌ Embedded decision matrices (use domain files)
- ❌ Embedded implementation code (use pattern files)

---

## V2 Resource Utilization

### Domain Files (12 files, ~60 lines each)

Steps load these via `**Load domain:**` directive:

| Domain | Content | Used By Steps |
|--------|---------|---------------|
| tenant.md | Isolation matrix, context propagation, quality checks | tenant-isolation steps |
| ai-runtime.md | Orchestration models, state management, memory tiers | agent-runtime steps |
| billing.md | Metering, invoicing, revenue patterns | billing steps |
| compliance.md | GDPR, SOC2, HIPAA requirements | compliance steps |
| security.md | Defense-in-depth, secret management | security steps |
| events.md | Event sourcing, CQRS patterns | events steps |
| integration.md | Facade contracts, compatibility | facade-contract steps |
| observability.md | Metrics, traces, logs | observability steps |
| onboarding.md | Provisioning pipeline, tier config | onboarding steps |
| storage.md | Encryption, retention | data-residency steps |
| caching.md | Cache tiers, invalidation | caching steps |
| testing.md | Test pyramid, isolation testing | testing steps |

### Pattern Files (10 files, ~60 lines each)

Steps load these for implementation guidance:

| Pattern | Content | Used By Steps |
|---------|---------|---------------|
| rls.md | RLS implementation, SQL examples | tenant-isolation (RLS path) |
| schema-per-tenant.md | Schema isolation | tenant-isolation (schema path) |
| database-per-tenant.md | DB isolation | tenant-isolation (DB path) |
| langgraph.md | State machine patterns | agent-runtime |
| crewai.md | Crew orchestration | agent-runtime |
| autogen.md | Multi-agent conversations | agent-runtime |
| facade.md | Contract design | facade-contract |
| saga.md | Distributed transactions | events |
| cqrs.md | Command/query separation | events |
| circuit-breaker.md | Fault tolerance | convergence |

### CSV Files (3 files)

Steps reference for decision criteria and web queries:

| CSV | Columns | Usage |
|-----|---------|-------|
| tenant-models.csv | model, use_case, pros, cons, web_queries | Tenant model selection |
| ai-runtimes.csv | runtime, use_case, strengths, web_queries | Runtime selection |
| quality-gates.csv | gate_id, checklist_file, soft_gate_steps, web_queries | Gate verification |

---

## Step Enhancement Template

### Before (V2 Stub - 28 lines)

```markdown
# Step 01 C Start

## Purpose

Initialize workflow and gather requirements.

## Prerequisites

- Required context loaded

## Actions

### 1. Load Context

Read relevant domain and pattern files.

### 2. Gather Requirements

Collect input from user.

## Verification

- [ ] Context loaded
- [ ] Requirements gathered

## Next Step

Proceed to `step-02-c-analyze.md`
```

### After (BMAD-Compliant - 65 lines)

```markdown
---
domain_file: '{project-root}/_bmad/bam/data/domains/tenant.md'
csv_file: '{project-root}/_bmad/bam/data/tenant-models.csv'
output_file: '{output_folder}/planning-artifacts/tenant-isolation.md'
---

# Step 1: Tenant Model Definition

## RULES

- Load domain context before making decisions.
- Do NOT generate isolation strategy without user confirmation.
- Reference CSV decision criteria, not assumptions.
- Use web queries from CSV for current best practices.

## INSTRUCTIONS

1. **Load tenant domain context.** Read `{domain_file}`. Extract:
   - Isolation Matrix (8 dimensions)
   - Decision Matrix (tenants × compliance × tier)
   - Quality Checks

2. **Gather tenant requirements.** Ask user:
   - Expected tenant count (now and 2-year projection)
   - Compliance requirements (SOC2, HIPAA, PCI-DSS, GDPR)
   - Tenant tier distribution (free/pro/enterprise %)
   - Data sensitivity classification

3. **Load decision criteria.** Read `{csv_file}`. Match requirements to model:
   | Tenants | Compliance | Tier | Recommendation |
   |---------|------------|------|----------------|
   | <1000 | Low | All | RLS |
   | <1000 | High | Pro+ | Schema |
   | Any | PCI/HIPAA | Enterprise | Database |

4. **Execute web research.** Use `web_queries` from CSV:
   - Search: "PostgreSQL RLS multi-tenant {date}"
   - Search: "tenant isolation patterns SaaS {date}"

5. **Propose tenant model.** Present recommendation with rationale.

### CHECKPOINT

Present:
- Requirements summary
- Recommended model with rationale
- Trade-offs vs alternatives

HALT and ask: `[A] Approve model` | `[E] Edit requirements` | `[?] Questions`

- **A**: Record decision, proceed to NEXT.
- **E**: Revise requirements, re-run INSTRUCTIONS from step 3.
- **?**: Answer, return to CHECKPOINT.

## NEXT

Read fully and follow `./step-02-c-isolation-matrix.md`
```

---

## Implementation Strategy

### Phase 1: Core Quality Gate Skills (8 skills, 80 steps)
**Target: 60-80 lines per step = 4,800-6,400 total lines**

| Skill | Steps | Domain | Pattern | CSV |
|-------|-------|--------|---------|-----|
| master-architecture | 10 | tenant, ai-runtime, integration | facade, langgraph | All 3 |
| module-architecture | 10 | integration, events | facade, cqrs | quality-gates |
| tenant-isolation | 10 | tenant, security | rls, schema-per-tenant | tenant-models |
| agent-runtime | 10 | ai-runtime | langgraph, crewai, autogen | ai-runtimes |
| facade-contract | 10 | integration | facade | quality-gates |
| convergence | 10 | integration, testing | circuit-breaker | quality-gates |
| production-readiness | 10 | observability, security | all | quality-gates |
| testing | 10 | testing | all | quality-gates |

### Phase 2: Tenant Lifecycle (4 skills, 40 steps)
**Target: 2,400-3,200 lines**

| Skill | Domain | Pattern |
|-------|--------|---------|
| tenant-onboarding | onboarding, tenant | rls |
| tenant-offboarding | onboarding, compliance | rls |
| billing | billing | - |
| white-labeling | tenant | - |

### Phase 3: AI/Agent (5 skills, 50 steps)
**Target: 3,000-4,000 lines**

| Skill | Domain | Pattern |
|-------|--------|---------|
| agent-debug | ai-runtime | langgraph, crewai |
| agent-tracing | ai-runtime, observability | - |
| llm-versioning | ai-runtime | - |
| memory-tiers | ai-runtime | - |
| tool-contracts | ai-runtime, integration | - |

### Phase 4: Operations (6 skills, 60 steps)
**Target: 3,600-4,800 lines**

### Phase 5: Planning (4 skills, 40 steps)
**Target: 2,400-3,200 lines**

### Phase 6: Specialized (3 skills, 30 steps)
**Target: 1,800-2,400 lines**

**GRAND TOTAL: 18,000-24,000 lines** (NOT 47,000 - that was V1-inspired over-engineering)

---

## Step Naming Convention

Keep V2's descriptive naming where it exists. Enhance generic names:

| Current (Generic) | Rename To (Descriptive) |
|-------------------|-------------------------|
| step-01-c-start.md | step-01-c-{skill-specific}.md |
| step-02-c-analyze.md | step-02-c-{skill-specific}.md |
| step-03-c-design.md | step-03-c-{skill-specific}.md |

**Example for tenant-isolation:**
| Current | Rename To |
|---------|-----------|
| step-01-c-start.md | step-01-c-tenant-model-definition.md |
| step-02-c-analyze.md | step-02-c-isolation-matrix.md |
| step-03-c-design.md | step-03-c-context-propagation.md |
| step-04-c-document.md | step-04-c-sharing-rules.md |
| step-05-c-complete.md | step-05-c-compliance-mapping.md |

---

## Validation

### Test: test/v2/step-content.test.js

```javascript
const SKILLS_DIR = 'src-v2/skills';
const MIN_LINES = 50;  // BMAD minimum
const MAX_LINES = 100; // BMAD maximum (NOT 250)

const REQUIRED_SECTIONS = [
  '## RULES',
  '## INSTRUCTIONS', 
  '## NEXT'
];

const REQUIRED_FRONTMATTER = [
  'domain_file:',
  'output_file:'
];

// CHECKPOINT required for Create mode steps 01-05
const CHECKPOINT_REQUIRED_FOR = /step-0[1-5]-c/;

describe('V2 Step Content (BMAD-Compliant)', () => {
  // Validate line count 50-100
  // Validate required sections
  // Validate frontmatter
  // Validate CHECKPOINT in create steps
});
```

### Script: scripts/validate-step-content.sh

```bash
#!/bin/bash
MIN_LINES=50
MAX_LINES=100  # BMAD standard, NOT 250

for step in src-v2/skills/bmad-bam-*/steps/step-*.md; do
  lines=$(wc -l < "$step")
  
  if [ "$lines" -lt "$MIN_LINES" ] || [ "$lines" -gt "$MAX_LINES" ]; then
    echo "WARN: $step has $lines lines (target: $MIN_LINES-$MAX_LINES)"
  fi
  
  # Check for BMAD sections
  if ! grep -q "## RULES" "$step"; then
    echo "ERROR: $step missing ## RULES"
  fi
  if ! grep -q "## INSTRUCTIONS" "$step"; then
    echo "ERROR: $step missing ## INSTRUCTIONS"
  fi
done
```

---

## Quality Metrics

| Metric | V2 Current | Target | V1 (Wrong Target) |
|--------|------------|--------|-------------------|
| Lines per step | 28 | 60-80 | 150-200 ❌ |
| Total step content | 8,400 | 18,000-24,000 | 47,000 ❌ |
| Sections per step | 5 | 4-5 | 10+ ❌ |
| Embedded content | None | None (load from domain) | Heavy ❌ |
| BMAD compliance | Partial | Full | Over-engineered ❌ |

---

## Success Criteria

1. All 300 step files enhanced to 60-80 lines
2. All steps have BMAD sections: RULES, INSTRUCTIONS, NEXT
3. All Create steps (01-05) have CHECKPOINT sections
4. All steps reference domain/pattern files via frontmatter
5. NO embedded decision matrices (use domains)
6. NO embedded implementation code (use patterns)
7. NO V1-style emoji headers or COLLABORATION MENUS
8. All step file names are descriptive (no generic names)
9. Validation tests pass at 50-100 line threshold

---

## What This Spec Does NOT Include

Removed from v3.0 spec (V1-inspired over-engineering):

- ❌ V1→V2 workflow consolidation map (V2 is its own design)
- ❌ 150-200 line target (BMAD is 40-100)
- ❌ COLLABORATION MENUS (A/P/C) (use CHECKPOINT)
- ❌ MANDATORY EXECUTION RULES with emojis (use RULES)
- ❌ EXECUTION PROTOCOLS (not BMAD standard)
- ❌ Verification Matrix tables (use domain quality checks)
- ❌ Error Handling tables (handle at skill level)
- ❌ 47,000 line total (actual: 18,000-24,000)
- ❌ Missing checklist generation (separate task)
- ❌ TOML menu integration (separate concern)

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-26 | Initial spec |
| 2.0.0 | 2026-04-26 | Added V1 mappings (wrong approach) |
| 3.0.0 | 2026-04-26 | Expanded V1 mappings (still wrong) |
| 4.0.0 | 2026-04-26 | **Complete rewrite** - Aligned with V2 C³ design and official BMAD method. Target 60-80 lines (not 150-200). Removed V1-inspired over-engineering. |
