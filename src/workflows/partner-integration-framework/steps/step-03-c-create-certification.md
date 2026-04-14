# Step 3: Create Certification Program

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

Define certification levels, design testing criteria, plan review process, and create badge system.

## Prerequisites

- Step 2 completed: Sandbox environment designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: certification
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: quality-gates

---

## Inputs

- Output from Steps 1-2 (Tiers, sandbox)
- Quality standards
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`

---

## Actions

**Verify current best practices with web search:**
Search the web: "partner certification program design {date}"
Search the web: "ISV app review process best practices {date}"

_Source: [URL]_

### 1. Define Certification Levels

| Level | Focus | Validity | Renewal |
|-------|-------|----------|---------|
| Foundation | API basics | 2 years | Exam only |
| Professional | Integration patterns | 1 year | Exam + project |
| Expert | Architecture design | 1 year | Review board |
| Master | Ecosystem leadership | Lifetime | Invitation only |

### 2. Design Testing Criteria

| Criterion | Weight | Automated | Manual |
|-----------|--------|-----------|--------|
| API usage correctness | 30% | Yes | No |
| Error handling | 20% | Yes | No |
| Security compliance | 25% | Partial | Yes |
| Performance | 15% | Yes | No |
| UX quality | 10% | No | Yes |

### 3. Plan Review Process

| Stage | Duration | Reviewers | Output |
|-------|----------|-----------|--------|
| Automated testing | 1 hour | System | Test report |
| Security scan | 24 hours | Security team | Risk assessment |
| Functional review | 3-5 days | Partner team | Approval/feedback |
| Final approval | 1-2 days | Partner lead | Certification |

### 4. Create Badge System

| Badge | Criteria | Display |
|-------|----------|---------|
| Certified | Pass certification | Profile, marketplace |
| Verified | Manual review passed | Marketplace listing |
| Featured | Editor's choice | Homepage, newsletters |
| Premier | Top tier partner | All channels |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the certification program above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into certification levels and review process
- **P (Party Mode)**: Bring QA and PM perspectives for certification review
- **C (Continue)**: Accept certification program and proceed to revenue model
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass certification context: levels, criteria, process, badges
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into program
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review certification program: {summary of levels and process}"
- Process collaborative analysis from QA and PM personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save certification program
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-plan-revenue.md`

---

## Verification

- [ ] Certification levels defined
- [ ] Testing criteria designed
- [ ] Review process planned
- [ ] Badge system created
- [ ] Patterns align with pattern registry

## Outputs

- Certification program document
- Testing criteria specification
- Review process guide

## Next Step

Proceed to `step-04-c-plan-revenue.md` to plan revenue model.
