# Step 1: Define Certification Tiers

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
- Use web search to verify current best practices when making certification decisions
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Define the certification tier structure for the partner ecosystem, establishing clear levels of partnership with associated benefits, requirements, and progression paths.

## Prerequisites

- Master architecture approved or in progress
- API documentation available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: partner-ecosystem
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: integration


---

## Inputs

- User requirements and constraints for partner program design
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Tier Structure

Using partner ecosystem patterns from knowledge, define certification tiers:

| Tier | Description | Target Partners |
|------|-------------|-----------------|
| Registered | Entry-level, self-service onboarding | ISVs exploring integration |
| Certified | Validated integration, verified capabilities | ISVs with production integrations |
| Premier | Strategic partners, deep integration | Key ecosystem partners |

Considerations:
- Clear differentiation between tiers
- Progressive value proposition
- Achievable progression path
- Sustainable for partner operations

### 2. Define Tier Benefits

Establish benefits matrix per tier:

| Benefit Category | Registered | Certified | Premier |
|------------------|------------|-----------|---------|
| **Branding** | Partner badge | Certified badge | Premier badge |
| **Marketplace** | Listed | Featured placement | Premium placement |
| **API Access** | Standard rate limits | Elevated limits | Unlimited/dedicated |
| **Support** | Community forums | Priority support | Dedicated TAM |
| **Co-marketing** | Logo usage | Joint webinars | Co-branded campaigns |
| **Training** | Self-service docs | Partner training | Custom workshops |
| **Revenue Share** | Standard | Enhanced | Premium |
| **Early Access** | None | Beta features | Alpha features |
| **Integration** | REST API | Webhooks + SDKs | Custom integrations |

### 3. Define Tier Progression

Map tier progression requirements:

| Progression | From | To | Requirements |
|-------------|------|----|--------------| 
| Initial | None | Registered | Sign agreement, complete profile |
| Upgrade | Registered | Certified | Pass technical assessment, 3+ customers |
| Upgrade | Certified | Premier | Revenue threshold, strategic alignment |
| Downgrade | Premier | Certified | Revenue decline, assessment failure |
| Downgrade | Certified | Registered | Assessment failure, compliance issue |
| Termination | Any | None | Policy violation, non-renewal |

### 4. Document Tier Branding

Establish visual and messaging guidelines:

| Tier | Badge Design | Color | Tagline |
|------|-------------|-------|---------|
| Registered | Basic shield | Silver | "Integration Ready" |
| Certified | Verified checkmark | Gold | "Certified Integration" |
| Premier | Premium crown | Platinum | "Premier Partner" |

**Usage Guidelines:**
- Badge usage rights and restrictions
- Co-branding requirements
- Marketing material templates
- Brand compliance rules

### 5. Define Tier Commitments

Establish partner commitments per tier:

| Commitment | Registered | Certified | Premier |
|------------|------------|-----------|---------|
| Annual fee | $0 | $2,500/year | $10,000/year |
| Training required | Self-service | 4 hours/year | 8 hours/year |
| Customer success | None | Quarterly review | Monthly review |
| Integration maintenance | Self-managed | SLA response | Dedicated support |
| Marketing participation | Optional | 1 event/year | 2 events/year |

**Verify current best practices with web search:**
Search the web: "SaaS partner certification tiers best practices {date}"
Search the web: "ISV partner program tier design {date}"

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
- **A1**: Review tier structure against industry benchmarks
- **A2**: Analyze benefits matrix for competitive positioning
- **A3**: Evaluate progression requirements feasibility
- **A4**: Assess commitment levels vs partner value

### [P]ropose Changes
- **P1**: Propose tier structure modifications
- **P2**: Suggest benefits adjustments
- **P3**: Recommend progression path changes
- **P4**: Propose commitment level revisions

### [C]ontinue
- **C1**: Accept current tier definitions and proceed to requirements design
- **C2**: Mark step complete and load `step-02-c-design-requirements.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Tier structure defined with clear differentiation
- [ ] Benefits mapped per tier
- [ ] Progression requirements documented
- [ ] Branding guidelines established
- [ ] Commitments defined per tier
- [ ] Patterns align with pattern registry

## Outputs

- Certification tier definitions
- Benefits matrix by tier
- Progression requirements
- Branding guidelines
- **Load template:** `{project-root}/_bmad/bam/data/templates/partner-certification-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/ecosystem-mapping-template.md`

## Next Step

Proceed to `step-02-c-design-requirements.md` to design technical and business requirements per tier.
