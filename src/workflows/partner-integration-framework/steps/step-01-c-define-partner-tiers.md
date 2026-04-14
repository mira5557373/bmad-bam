# Step 1: Define Partner Tiers

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

Catalog partner types, define tier benefits, plan access levels, and design certification paths.

## Prerequisites

- API documentation exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: partner-integration
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-tiers

---

## Inputs

- Business requirements for partner program
- API capabilities catalog
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

**Verify current best practices with web search:**
Search the web: "ISV partner program design best practices {date}"
Search the web: "SaaS partner tier models {date}"

_Source: [URL]_

### 1. Catalog Partner Types

| Partner Type | Description | Value Proposition |
|--------------|-------------|-------------------|
| Technology ISV | Build apps on platform | Extend functionality |
| Reseller | Sell to customers | Market reach |
| System Integrator | Implementation services | Enterprise deployment |
| Consulting | Advisory services | Customer success |

### 2. Define Tier Benefits

| Tier | API Limits | Support | Revenue Share | Requirements |
|------|-----------|---------|---------------|--------------|
| Registered | 1K calls/day | Community | 0% | Sign up |
| Silver | 10K calls/day | Email | 15% | Certification |
| Gold | 100K calls/day | Priority | 25% | Revenue threshold |
| Platinum | Unlimited | Dedicated | 35% | Strategic fit |

### 3. Plan Access Levels

| Access Level | APIs | Features | Data |
|--------------|------|----------|------|
| Basic | Public APIs | Standard | Read-only |
| Enhanced | Partner APIs | Beta features | Read/Write |
| Premium | All APIs | Early access | Full access |

### 4. Design Certification Paths

| Certification | Requirements | Validity | Badge |
|---------------|--------------|----------|-------|
| Registered Developer | API key, ToS | Lifetime | Basic |
| Certified Partner | Exam + app review | 1 year | Silver |
| Premier Partner | Revenue + certification | 1 year | Gold |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the partner tier analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into partner types and tier benefits
- **P (Party Mode)**: Bring analyst and PM perspectives for tier review
- **C (Continue)**: Accept partner tiers and proceed to sandbox design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass tier context: types, benefits, access, certification
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into tier definition
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review partner tiers: {summary of types and benefits}"
- Process collaborative analysis from analyst and PM personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save partner tier definition
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-sandbox.md`

---

## Verification

- [ ] Partner types cataloged
- [ ] Tier benefits defined
- [ ] Access levels planned
- [ ] Certification paths designed
- [ ] Patterns align with pattern registry

## Outputs

- Partner tier definition document
- Access level matrix
- Certification path overview
- **Load template:** `{project-root}/_bmad/bam/templates/partner-program-template.md`

## Next Step

Proceed to `step-02-c-design-sandbox.md` to design sandbox environment.
