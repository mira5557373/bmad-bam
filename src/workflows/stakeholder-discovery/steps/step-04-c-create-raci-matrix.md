# Step 4: Create RACI Matrix

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
- Use web search to verify current best practices when creating RACI matrices
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Create a comprehensive RACI (Responsible, Accountable, Consulted, Informed) matrix for key platform decisions, establishing clear ownership and decision-making authority for the multi-tenant SaaS initiative.

## Prerequisites

- Stakeholders identified (Step 1)
- Interests and influence mapped (Step 2)
- Communication plan defined (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: governance
- **Load template:** `{project-root}/_bmad/bam/templates/stakeholder-map-template.md`


---

## Inputs

- Complete stakeholder documentation from Steps 1-3
- Interest-influence matrix
- Communication plan
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Key Platform Decisions

Identify decisions requiring RACI assignment:

| Decision Category | Key Decisions |
|-------------------|---------------|
| Architecture | Tenant model selection, AI runtime choice, module boundaries |
| Technical | Database selection, API design, security controls |
| Product | Feature prioritization, tier definition, roadmap |
| Operations | Deployment strategy, SLA commitments, monitoring |
| Compliance | Data residency, certifications, audit scope |
| Commercial | Pricing model, partner terms, customer tiers |

### 2. Define RACI Roles

Clarify role definitions:

| Role | Definition | Constraints |
|------|------------|-------------|
| **R**esponsible | Does the work to complete the task | Multiple allowed per decision |
| **A**ccountable | Ultimate authority, approves deliverable | One and only one per decision |
| **C**onsulted | Provides input before decision | Two-way communication |
| **I**nformed | Notified after decision | One-way communication |

### 3. Create Architecture RACI

| Decision | CTO | VP Eng | Architect | Tech Lead | PM | Security |
|----------|-----|--------|-----------|-----------|----|----|
| Tenant Model | A | C | R | R | C | C |
| AI Runtime | C | A | R | R | C | I |
| Module Boundaries | I | A | R | R | C | I |
| API Design | I | C | R | A | C | C |
| Security Model | C | I | R | R | I | A |
| Data Architecture | C | A | R | R | I | C |

### 4. Create Operations RACI

| Decision | VP Ops | SRE Lead | DevOps | Engineering | Support | Security |
|----------|--------|----------|--------|-------------|---------|----------|
| Deployment Strategy | A | R | R | C | I | C |
| SLA Commitments | A | C | I | C | R | I |
| Monitoring Design | C | A | R | C | I | C |
| Incident Response | A | R | R | C | R | C |
| Capacity Planning | A | R | C | C | I | I |
| DR Strategy | A | R | R | C | I | C |

### 5. Create Product RACI

| Decision | CPO | PM | Engineering | UX | Sales | Support |
|----------|-----|----|----|----|----|--------|
| Feature Priority | A | R | C | C | C | C |
| Tier Definition | A | R | C | R | C | I |
| Roadmap | A | R | C | C | C | I |
| Pricing Model | A | C | I | I | R | I |
| Customer Feedback | I | A | C | C | I | R |

### 6. Create Compliance RACI

| Decision | CISO | Legal | Engineering | Operations | Product |
|----------|------|-------|-------------|------------|---------|
| Data Residency | A | C | R | C | I |
| Certifications | A | C | R | R | I |
| Audit Scope | A | R | C | C | I |
| Privacy Policy | C | A | R | I | C |
| Security Standards | A | C | R | R | I |

### 7. Document Decision Workflow

Define how decisions flow through RACI:

| Stage | Activities | Stakeholders |
|-------|------------|--------------|
| Initiation | Identify decision need, gather context | Responsible party |
| Analysis | Research options, assess impact | Responsible + Consulted |
| Proposal | Draft recommendation with rationale | Responsible |
| Review | Gather feedback, address concerns | Consulted parties |
| Approval | Make final decision | Accountable party |
| Communication | Notify all informed parties | Accountable -> Informed |
| Execution | Implement decision | Responsible parties |

### 8. Define Escalation for Disputes

Establish dispute resolution:

| Scenario | Escalation Path | Timeline |
|----------|-----------------|----------|
| R disagrees with A | Mediation by A's manager | 48 hours |
| Multiple A's claimed | Escalate to executive sponsor | 24 hours |
| C not consulted | Re-open decision with C input | 72 hours |
| Deadlock | Executive committee review | 1 week |

**Verify current best practices with web search:**
Search the web: "RACI matrix best practices SaaS {date}"
Search the web: "technology decision governance framework {date}"

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
- **A1**: Review architecture RACI for completeness
- **A2**: Analyze operations RACI for clarity
- **A3**: Evaluate product RACI assignments
- **A4**: Assess compliance RACI coverage
- **A5**: Review decision workflow effectiveness

### [P]ropose Changes
- **P1**: Propose RACI assignment adjustments
- **P2**: Suggest additional decision categories
- **P3**: Recommend decision workflow refinements
- **P4**: Propose escalation path modifications

### [C]ontinue
- **C1**: Accept RACI matrix and complete stakeholder discovery
- **C2**: Mark Create mode complete and generate final stakeholder map

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Key platform decisions identified
- [ ] RACI roles clearly defined
- [ ] Architecture decisions have RACI assignments
- [ ] Operations decisions have RACI assignments
- [ ] Product decisions have RACI assignments
- [ ] Compliance decisions have RACI assignments
- [ ] Decision workflow documented
- [ ] Escalation paths defined
- [ ] Patterns align with pattern registry

## Outputs

- Complete RACI matrix for platform decisions
- Decision workflow documentation
- Escalation procedures
- `{output_folder}/planning-artifacts/stakeholder-map.md`

## Next Step

This completes the Create mode. Run `step-20-v-load-stakeholder-map.md` to enter Validate mode and verify the stakeholder map meets completeness criteria.

## Quality Gate Summary

Review the complete stakeholder discovery output:
- All stakeholder groups identified and categorized
- Interests and influence properly mapped
- Communication plan covers all stakeholder needs
- RACI matrix assigns clear ownership for key decisions
