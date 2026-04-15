# Step 1: Identify Deprecation Candidates

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Catalog endpoints for deprecation, analyze usage patterns, identify affected consumers, and assess migration complexity.

## Prerequisites

- Current API documentation exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: api-versioning
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: facade-contracts

---

## Inputs

- API documentation and OpenAPI spec
- Usage analytics data
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

**Verify current best practices with web search:**
Search the web: "API deprecation best practices {date}"
Search the web: "REST API sunset header standards {date}"

_Source: [URL]_

### 1. Catalog Deprecation Candidates

| Endpoint | Version | Reason | Replacement |
|----------|---------|--------|-------------|
| /api/v1/users | v1 | Replaced by v2 | /api/v2/users |
| /api/v1/legacy/* | v1 | Obsolete | None |

### 2. Analyze Usage Patterns

| Endpoint | Daily Calls | Unique Consumers | Trend |
|----------|-------------|------------------|-------|
| | | | Declining/Stable/Growing |

### 3. Identify Affected Consumers

| Consumer Type | Count | Tier | Migration Effort |
|---------------|-------|------|------------------|
| Internal Services | | | Low/Medium/High |
| Partner Integrations | | | Low/Medium/High |
| Public API Users | | | Low/Medium/High |
| Enterprise Tenants | | | Low/Medium/High |

### 4. Assess Migration Complexity

| Factor | Low | Medium | High |
|--------|-----|--------|------|
| Schema Changes | No changes | Minor updates | Breaking changes |
| Auth Changes | Same | Token format | New scheme |
| Endpoint Changes | Path only | Parameters | Full redesign |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the deprecation analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into usage patterns and consumer impact
- **P (Party Mode)**: Bring analyst and architect perspectives for deprecation review
- **C (Continue)**: Accept deprecation candidates and proceed to timeline design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass deprecation context: candidates, usage, consumers
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into analysis
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review API deprecation candidates: {summary of endpoints and impact}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save deprecation candidate analysis
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-timeline.md`

---

## Verification

- [ ] All deprecation candidates cataloged
- [ ] Usage patterns analyzed
- [ ] Affected consumers identified
- [ ] Migration complexity assessed
- [ ] Patterns align with pattern registry

## Outputs

- Deprecation candidate catalog
- Usage analysis summary
- Consumer impact assessment

## Next Step

Proceed to `step-02-c-design-timeline.md` to design deprecation timeline.
