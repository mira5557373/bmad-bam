# Step 1: Tenant Discovery

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

Identify tenant types, segments, and their unique requirements based on BMM discovery outputs.

## Prerequisites

- BMM product brief or PRD exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle


---

## Inputs

- User requirements and constraints for discovery - tenant requirements analysis
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Load BMM Discovery Outputs

Review existing discovery artifacts:
- Product brief
- PRD (if available)
- Market research findings

### 2. Identify Tenant Segments

Define tenant categories based on:
- Company size (SMB, Mid-Market, Enterprise)
- Industry vertical (Healthcare, Finance, etc.)
- Usage patterns (API-heavy, UI-heavy, mixed)
- Geographic distribution

### 3. Map Segment to Isolation Needs

| Segment | Data Sensitivity | Performance SLA | Isolation Level |
|---------|-----------------|-----------------|-----------------|
| SMB | Standard | 99.5% | Shared (RLS) |
| Enterprise | High | 99.99% | Dedicated |

**Verify current best practices with web search:**
Search the web: "tenant discovery best practices {date}"
Search the web: "tenant discovery enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the tenant discovery above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tenant segments and isolation requirements
- **P (Party Mode)**: Bring analyst and architect perspectives for segment review
- **C (Continue)**: Accept tenant discovery and proceed to personas
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass tenant context: segments identified, isolation requirements
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into tenant discovery
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant discovery for requirements analysis: {summary of segments and isolation}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant discovery to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-tenant-personas.md`

---

## Verification

- [ ] All target segments identified
- [ ] Each segment has clear isolation requirements
- [ ] Segments align with BMM personas
- [ ] Patterns align with pattern registry

## Outputs

- Tenant segment definitions
- Initial isolation requirements matrix
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-tier-matrix.md`

## Next Step

Proceed to `step-02-c-tenant-personas.md` with segment definitions.
