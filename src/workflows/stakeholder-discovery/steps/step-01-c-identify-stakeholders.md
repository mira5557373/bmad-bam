# Step 1: Identify Stakeholders

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making stakeholder decisions
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Identify all internal and external stakeholders for the multi-tenant SaaS platform initiative, establishing the foundation for governance and decision-making processes.

## Prerequisites

- Project context or initiative brief available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: governance
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: stakeholder


---

## Inputs

- Project context document (if available)
- Organizational structure information
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Identify Internal Stakeholders

Map internal stakeholder groups within the organization:

| Group | Typical Roles | Involvement Level |
|-------|---------------|-------------------|
| Engineering | CTO, VP Engineering, Tech Leads, Platform Engineers | High |
| Product | CPO, Product Managers, Product Owners | High |
| Operations | VP Operations, DevOps, SRE, Support | High |
| Security | CISO, Security Engineers, Compliance | High |
| Business | CEO, CFO, Business Development | Medium |
| Sales | VP Sales, Account Managers, Customer Success | Medium |
| Legal | General Counsel, Contract Managers | Low-Medium |
| HR | CHRO, Talent Acquisition | Low |

Considerations:
- Identify decision-makers vs contributors
- Note reporting structures and dependencies
- Document availability and capacity constraints
- Capture historical context and tribal knowledge holders

### 2. Identify External Stakeholders

Map external stakeholder groups:

| Group | Typical Roles | Involvement Level |
|-------|---------------|-------------------|
| Enterprise Customers | IT Directors, Technical Buyers, End Users | High |
| Pro Customers | Department Heads, Team Leads | Medium |
| Free Tier Users | Individual Contributors | Low |
| Technology Partners | Integration Partners, ISVs | Medium |
| Resellers | Channel Partners, Distributors | Medium |
| Vendors | Cloud Providers, Tool Vendors | Low-Medium |
| Investors | Board Members, VC Partners | Low |
| Regulators | Compliance Bodies, Auditors | Low-Medium |

Considerations:
- Prioritize by revenue impact
- Factor in contractual obligations
- Account for regulatory requirements
- Consider future strategic relationships

### 3. Create Stakeholder Registry

Build a comprehensive stakeholder registry:

| ID | Name | Role | Organization | Group | Category | Contact | Availability |
|----|------|------|--------------|-------|----------|---------|--------------|
| STK-001 | {Name} | {Role} | {Org} | Engineering | Internal | {Email} | {Schedule} |
| STK-002 | {Name} | {Role} | {Org} | Customer | External | {Email} | {Schedule} |

### 4. Define Stakeholder Categories

Establish categorization framework:

| Category | Definition | Communication Priority |
|----------|------------|----------------------|
| Core | Direct involvement in platform decisions | Daily/Weekly |
| Advisory | Provides guidance and expertise | Weekly/Bi-weekly |
| Informed | Needs updates on progress | Monthly |
| Peripheral | Occasional involvement as needed | Quarterly |

### 5. Document Initial Stakeholder Map

Create visual stakeholder map showing:
- Organizational groupings
- Hierarchical relationships
- Cross-functional dependencies
- External relationship types

**Verify current best practices with web search:**
Search the web: "SaaS stakeholder identification best practices {date}"
Search the web: "multi-tenant platform governance stakeholders {date}"

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

### Menu Options

### [A]nalyze Options
- **A1**: Review internal stakeholder coverage for completeness
- **A2**: Analyze external stakeholder prioritization criteria
- **A3**: Evaluate stakeholder categorization framework
- **A4**: Assess organizational dependencies and gaps

### [P]ropose Changes
- **P1**: Propose additional stakeholder groups to consider
- **P2**: Suggest stakeholder prioritization adjustments
- **P3**: Recommend categorization refinements
- **P4**: Propose stakeholder registry enhancements

### [C]ontinue
- **C1**: Accept current stakeholder identification and proceed to interest mapping
- **C2**: Mark step complete and load `step-02-c-map-interests.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All internal stakeholder groups identified
- [ ] All external stakeholder groups identified
- [ ] Stakeholder registry created with contact information
- [ ] Categories defined with communication priority
- [ ] Initial stakeholder map documented
- [ ] Patterns align with pattern registry

## Outputs

- Stakeholder registry with all identified stakeholders
- Stakeholder categorization framework
- Initial stakeholder map
- **Load template:** `{project-root}/_bmad/bam/templates/stakeholder-map-template.md`

## Next Step

Proceed to `step-02-c-map-interests.md` to map stakeholder interests, concerns, and influence levels.
