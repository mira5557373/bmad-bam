# V2 Step Content Fill Design Spec

**Version:** 1.0.0  
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

## V2 Skill to V1 Workflow Mapping

| V2 Skill | V1 Source Workflow(s) | Step Count |
|----------|----------------------|------------|
| bmad-bam-master-architecture | foundation/create-master-architecture | 10 |
| bmad-bam-tenant-isolation | bmad-bam-tenant-model-isolation | 10 |
| bmad-bam-module-architecture | module/create-module-architecture | 10 |
| bmad-bam-agent-runtime | bmad-bam-agent-runtime-architecture | 10 |
| bmad-bam-facade-contract | integration/define-facade-contract | 10 |
| bmad-bam-convergence | bmad-bam-convergence-verification | 10 |
| bmad-bam-production-readiness | bmad-bam-production-readiness | 10 |
| bmad-bam-tenant-onboarding | bmad-bam-tenant-onboarding-design | 10 |
| bmad-bam-tenant-offboarding | bmad-bam-tenant-offboarding-design | 10 |
| bmad-bam-observability | bmad-bam-tenant-aware-observability | 10 |
| bmad-bam-security | bmad-bam-security-* (multiple) | 10 |
| bmad-bam-compliance | bmad-bam-compliance-* (multiple) | 10 |
| bmad-bam-billing | bmad-bam-usage-metering-design + billing-* | 10 |
| bmad-bam-agent-debug | bmad-bam-ai-agent-debug | 10 |
| bmad-bam-scaling | bmad-bam-auto-scaling-configuration | 10 |
| bmad-bam-white-labeling | bmad-bam-tenant-white-labeling-design | 10 |
| bmad-bam-cross-module-story | bmad-bam-cross-module-story | 10 |
| bmad-bam-agent-tracing | bmad-bam-agent-execution-tracing | 10 |
| bmad-bam-events | bmad-bam-event-streaming-design | 10 |
| bmad-bam-caching | NEW (domain-based) | 10 |
| bmad-bam-data-residency | bmad-bam-data-* + GDPR patterns | 10 |
| bmad-bam-llm-versioning | bmad-bam-ai-model-* (multiple) | 10 |
| bmad-bam-memory-tiers | bmad-bam-agent-memory-optimization | 10 |
| bmad-bam-api-versioning | bmad-bam-api-version-release | 10 |
| bmad-bam-module-epics | module/create-module-epics | 10 |
| bmad-bam-tool-contracts | integration/validate-tool-contract | 10 |
| bmad-bam-testing | bmad-bam-ai-security-testing + TEA | 10 |
| bmad-bam-requirements | ingestion/requirement-ingestion | 10 |
| bmad-bam-triage | ingestion/triage-module-complexity | 10 |
| bmad-bam-research | NEW (web research workflow) | 10 |

**Total: 30 skills × 10 steps = 300 step files**

## Implementation Phases

### Phase 1: Core Quality Gate Skills (Priority 1)
**8 skills, 80 step files**

These map directly to QG-F1 through QG-P1:

| Skill | Quality Gate | V1 Source |
|-------|--------------|-----------|
| bmad-bam-master-architecture | QG-F1 | foundation/create-master-architecture |
| bmad-bam-module-architecture | QG-M1 | module/create-module-architecture |
| bmad-bam-tenant-isolation | QG-M2 | bmad-bam-tenant-model-isolation |
| bmad-bam-agent-runtime | QG-M3 | bmad-bam-agent-runtime-architecture |
| bmad-bam-facade-contract | QG-I1 | integration/define-facade-contract |
| bmad-bam-convergence | QG-I2/I3 | bmad-bam-convergence-verification |
| bmad-bam-production-readiness | QG-P1 | bmad-bam-production-readiness |
| bmad-bam-testing | TEA integration | bmad-bam-*-testing |

### Phase 2: Tenant Lifecycle Skills (Priority 2)
**4 skills, 40 step files**

| Skill | Function | V1 Source |
|-------|----------|-----------|
| bmad-bam-tenant-onboarding | Provisioning | bmad-bam-tenant-onboarding-design |
| bmad-bam-tenant-offboarding | Cleanup | bmad-bam-tenant-offboarding-design |
| bmad-bam-billing | Metering | bmad-bam-usage-metering-design |
| bmad-bam-white-labeling | Customization | bmad-bam-tenant-white-labeling-design |

### Phase 3: AI/Agent Skills (Priority 3)
**5 skills, 50 step files**

| Skill | Function | V1 Source |
|-------|----------|-----------|
| bmad-bam-agent-debug | Troubleshooting | bmad-bam-ai-agent-debug |
| bmad-bam-agent-tracing | Observability | bmad-bam-agent-execution-tracing |
| bmad-bam-llm-versioning | Model management | bmad-bam-ai-model-* |
| bmad-bam-memory-tiers | Agent memory | bmad-bam-agent-memory-optimization |
| bmad-bam-tool-contracts | Tool safety | integration/validate-tool-contract |

### Phase 4: Operations Skills (Priority 4)
**6 skills, 60 step files**

| Skill | Function | V1 Source |
|-------|----------|-----------|
| bmad-bam-observability | Monitoring | bmad-bam-tenant-aware-observability |
| bmad-bam-security | Security design | bmad-bam-security-* |
| bmad-bam-compliance | Compliance | bmad-bam-compliance-* |
| bmad-bam-scaling | Auto-scaling | bmad-bam-auto-scaling-configuration |
| bmad-bam-events | Event architecture | bmad-bam-event-streaming-design |
| bmad-bam-caching | Cache patterns | NEW (domain-based) |

### Phase 5: Planning Skills (Priority 5)
**4 skills, 40 step files**

| Skill | Function | V1 Source |
|-------|----------|-----------|
| bmad-bam-requirements | Requirement intake | ingestion/requirement-ingestion |
| bmad-bam-triage | Complexity triage | ingestion/triage-module-complexity |
| bmad-bam-cross-module-story | Story creation | bmad-bam-cross-module-story |
| bmad-bam-module-epics | Epic creation | module/create-module-epics |

### Phase 6: Specialized Skills (Priority 6)
**3 skills, 30 step files**

| Skill | Function | V1 Source |
|-------|----------|-----------|
| bmad-bam-data-residency | Data locality | bmad-bam-data-* + GDPR |
| bmad-bam-api-versioning | API lifecycle | bmad-bam-api-version-release |
| bmad-bam-research | Web research | NEW |

## Step Content Migration Strategy

### For Each V2 Skill Step:

1. **Identify V1 Source**
   - Find matching V1 workflow step(s)
   - If no direct match, compose from domain + patterns

2. **Extract Core Content**
   - MANDATORY EXECUTION RULES (standard)
   - EXECUTION PROTOCOLS (standard)
   - Purpose (from V1)
   - Prerequisites (from V1 + domain refs)
   - Actions (from V1, adapted)
   - Verification Matrix (from V1)
   - Error Handling (from V1)
   - Collaboration Menus (standard A/P/C)

3. **Adapt for V2 Context**
   - Update file paths to V2 structure
   - Reference V2 domain/pattern files
   - Add web search directives
   - Ensure CEV mode consistency

4. **Verify BMAD Compliance**
   - Check section presence
   - Verify line count (150-200 target)
   - Confirm collaboration menus

## Step File Naming Convention

```
step-{NN}-{mode}-{description}.md

Where:
- NN: 01-09 (Create), 10-19 (Edit), 20-29 (Validate)
- mode: c (Create), e (Edit), v (Validate)
- description: kebab-case action description
```

Examples:
- `step-01-c-load-context.md`
- `step-02-c-select-model.md`
- `step-10-e-load-existing.md`
- `step-20-v-load-artifact.md`

## Quality Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Avg lines/step | 28 | 150-200 |
| Total step content | 8,534 lines | 45,000-60,000 lines |
| BMAD sections present | ~20% | 100% |
| Web search directives | 0% | 100% |
| Collaboration menus | 0% | 100% |
| Error handling sections | 0% | 100% |

## Verification Checklist

For each filled step file:

- [ ] MANDATORY EXECUTION RULES section present
- [ ] EXECUTION PROTOCOLS section present
- [ ] Purpose section with clear description
- [ ] Prerequisites with domain/pattern references
- [ ] Actions with numbered, detailed steps
- [ ] Tables for decision matrices where applicable
- [ ] Verification Matrix with checkboxes
- [ ] Error Handling section with recovery procedures
- [ ] Collaboration Menus (A/P/C) section
- [ ] Web search directives present
- [ ] Output section with template references
- [ ] Next Step section with correct file reference
- [ ] Line count between 150-200

## Estimated Effort

| Phase | Skills | Steps | Est. Lines | Priority |
|-------|--------|-------|------------|----------|
| Phase 1 | 8 | 80 | 14,000 | P1 |
| Phase 2 | 4 | 40 | 7,000 | P2 |
| Phase 3 | 5 | 50 | 8,750 | P3 |
| Phase 4 | 6 | 60 | 10,500 | P4 |
| Phase 5 | 4 | 40 | 7,000 | P5 |
| Phase 6 | 3 | 30 | 5,250 | P6 |
| **Total** | **30** | **300** | **52,500** | - |

## Success Criteria

1. All 300 step files filled with BMAD-compatible content
2. Average line count per step: 150-200
3. All BMAD convention sections present
4. All step files pass lint/validation
5. Tests verify step file structure compliance
