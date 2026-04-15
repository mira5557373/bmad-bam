# Step 5: Recommend Module Assignment

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

Generate implementation recommendations based on complexity classification.

## Prerequisites

- Complexity scores assigned (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: module-boundaries`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: module-boundaries`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Generate implementation recommendations based on complexity classification:

## Classification Impact

| Complexity | Architecture Phases | Epic Granularity | Special Requirements |
|------------|---------------------|------------------|---------------------|
| SIMPLE | Skip phases 5-8 if not needed | 1-2 coarse epics | None |
| STANDARD | All phases | 3-5 standard epics | None |
| COMPLEX | All phases + extensions | 5+ fine-grained epics | Spike stories required |

## Recommendations by Classification

### SIMPLE Modules
- Fast-track implementation path
- Minimal documentation overhead
- Single developer can own end-to-end
- Skip optional architecture phases
- Combine related stories into larger epics

### STANDARD Modules
- Standard implementation path
- Full documentation per phase
- 1-2 developers, possible handoff points
- All architecture phases required
- Standard epic breakdown

### COMPLEX Modules
- Extended implementation path with spike stories
- Detailed documentation and ADRs
- Team effort, explicit ownership boundaries
- All phases plus risk mitigation extensions
- Fine-grained epics, frequent checkpoints
- Consider phased delivery (MVP first)

## Output Artifacts

Write complexity assessment to:
- `{output_folder}/planning-artifacts/modules/{module-name}/complexity-assessment.md`

Update sprint-status.yaml:
```yaml
modules:
  {module-name}:
    complexity: SIMPLE|STANDARD|COMPLEX
    score_breakdown:
      entity_count: 0|1|2
      business_rules: 0|1|2
      ai_involvement: 0|1|2
      data_volume: 0|1|2
      dependency_count: 0|1|2
      event_complexity: 0|1|2
      external_integrations: 0|1|2
      compliance_requirements: 0|1|2
    total_score: N
    upgrade_applied: true|false
```

**Quality gate:** Classification documented, sprint-status.yaml updated, recommendations aligned with classification.

## Verification

- [ ] Classification documented
- [ ] Recommendations generated
- [ ] sprint-status.yaml updated
- [ ] Recommendations aligned with classification
- [ ] Patterns align with pattern registry

## Outputs

- Complexity assessment document
- Implementation recommendations
- Updated sprint-status.yaml
- **Load template:** `{project-root}/_bmad/bam/data/templates/complexity-assessment-template.md`

## Next Step

Proceed to `bmad-bam-create-master-architecture` to design foundation architecture.

**Verify current best practices with web search:**
Search the web: "recommend module assignment best practices {date}"
Search the web: "recommend module assignment enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file
