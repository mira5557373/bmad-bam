# Step 02: Gather BAM Configuration

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Gather BAM configuration choices from the user including tenant model, AI runtime, and tier structure.

---

## Prerequisites

- Step 01 completed: Project-context.md located
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation,agent-runtime
- **Load tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Load AI runtimes:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Present Tenant Model Options

| Model | When to Use | Complexity |
|-------|-------------|------------|
| Row-Level Security | <1000 tenants, cost efficiency | Low |
| Schema-Per-Tenant | Regulated industries, moderate isolation | Medium |
| Database-Per-Tenant | Enterprise tier, maximum isolation | High |

Ask user to select tenant model.

### 2. Present AI Runtime Options

| Runtime | When to Use | Best For |
|---------|-------------|----------|
| LangGraph | Recommended default | State machines, conditional workflows |
| CrewAI | Role-based collaboration | Task delegation, hierarchies |
| AutoGen | Multi-agent conversations | Debate, consensus building |
| Custom | Existing framework | Integration with proprietary systems |

Ask user to select AI runtime.

### 3. Gather Tier Structure

Default tiers: Free, Pro, Enterprise

Ask user to confirm or customize tier structure.

### 4. Document Configuration

Record all selections for BAM section generation.

**Verify current best practices with web search:**
Search the web: "gather bam configuration best practices {date}"
Search the web: "gather bam configuration enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After gathering configuration, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into configuration trade-offs
- **P (Party Mode)**: Bring architect and security perspectives on choices
- **C (Continue)**: Accept configuration and proceed to generate BAM section
- **[Specific concerns]**: Describe concerns about configuration choices

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: tenant model selection, AI runtime selection, tier structure
- Process enhanced insights on configuration implications
- Ask user: "Accept this detailed analysis? (y/n)"
- If yes, document additional insights
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review BAM configuration choices for multi-tenant AI SaaS"
- Process architect, security, and DevOps perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm all configuration choices
- Document final selections
- Proceed to next step: `step-03-c-generate-section.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the configuration gathering phase.**

Present summary of:
- Tenant model selection and rationale
- AI runtime selection and rationale
- Tier structure definition

Ask for confirmation before proceeding to BAM section generation.

---

## Verification

- [ ] Tenant model selected
- [ ] AI runtime selected
- [ ] Tier structure confirmed
- [ ] Configuration documented

---

## Outputs

- Tenant model selection
- AI runtime selection
- Tier structure definition
- Configuration summary

---

## Next Step

Proceed to `step-03-c-generate-section.md` to generate the BAM configuration section.
