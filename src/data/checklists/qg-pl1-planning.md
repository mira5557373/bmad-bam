# QG-PL1: Planning Gate Checklist

> Gate ID: QG-PL1 (Planning Validation)
> Planning artifacts MUST be validated before entering Solutioning phase.
> Gate definition: verifies project plan, resource allocation, and roadmap are defined.
> Workflow integration: BAM planning workflows feed into this gate.
> Executing workflow: `create-module-epics`
>
> **Phase Gate:** QG-PL1 is evaluated at the end of Planning phase (BMM Phase 2).
> Failures require planning refinement before proceeding to architecture.

## Project Planning

### Roadmap Definition

- [ ] Project milestones defined with target dates
- [ ] Phase boundaries clearly documented
- [ ] MVP scope finalized and approved
- [ ] Release cadence defined
- [ ] Dependencies between phases mapped
- [ ] Critical path identified

### Resource Planning

- [ ] Team composition defined
- [ ] Skill requirements documented
- [ ] Resource allocation timeline created
- [ ] External dependencies identified (vendors, partners)
- [ ] Training needs assessed
- [ ] Onboarding plan for new team members

### Risk Assessment

- [ ] Technical risks identified and rated
- [ ] Business risks documented
- [ ] Mitigation strategies defined
- [ ] Risk ownership assigned
- [ ] Contingency plans documented
- [ ] Risk review schedule established

## Multi-Tenant Planning

### Tenant Strategy

- [ ] Tenant tier definitions finalized (Free/Pro/Enterprise)
- [ ] Tier feature matrix documented
- [ ] Tenant isolation approach selected (RLS/Schema/Database)
- [ ] Tenant migration strategy planned
- [ ] Pilot tenant identification

### Capacity Planning

- [ ] Initial capacity estimates documented
- [ ] Growth projections modeled
- [ ] Infrastructure scaling strategy defined
- [ ] Cost projections per tenant tier
- [ ] Resource quotas per tier defined

## AI/Agent Planning

### AI Strategy

- [ ] AI model selection criteria defined
- [ ] Provider evaluation completed
- [ ] AI budget allocation approved
- [ ] Model versioning strategy planned
- [ ] AI safety review process defined

### Agent Architecture Planning

- [ ] Agent topology planned
- [ ] Tool requirements identified
- [ ] Agent communication patterns defined
- [ ] Human oversight touchpoints mapped
- [ ] Agent testing strategy outlined

## Epic and Story Planning

### Epic Structure

- [ ] Epics defined with clear boundaries
- [ ] Epic dependencies mapped
- [ ] Epic acceptance criteria documented
- [ ] Epic estimation completed (T-shirt sizing minimum)
- [ ] Epic prioritization completed

### Story Readiness

- [ ] User stories follow INVEST criteria
- [ ] Acceptance criteria defined for stories
- [ ] Story points estimated (for first sprint)
- [ ] Sprint 0 / foundation stories identified
- [ ] Technical debt stories captured

---

## Web Research Verification

- [ ] Search the web: "quality gate best practices enterprise SaaS {date}" - Verify gate criteria
- [ ] Search the web: "multi-tenant platform validation patterns {date}" - Confirm validation approach
- [ ] _Source: [URL]_ citations documented for key decisions

## Related Patterns

Load decision criteria from pattern registry:

- **Planning patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `planning-*`
- **Agile patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `agile-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS project planning best practices {date}"
- Search: "multi-tenant capacity planning {date}"
- Search: "AI project estimation techniques {date}"

## Gate Decision

| Outcome | Criteria |
|---------|----------|
| **PASS** | All CRITICAL items complete, roadmap approved |
| **CONDITIONAL** | Non-critical gaps exist, proceed with documented risks |
| **FAIL** | CRITICAL planning items missing, refinement needed |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

## Critical vs Non-Critical Classification

| Category                    | Classification | CONDITIONAL Threshold | FAIL Threshold |
| --------------------------- | -------------- | --------------------- | -------------- |
| Roadmap Definition          | CRITICAL       | Dates tentative       | No milestones |
| Resource Planning           | CRITICAL       | Partial allocation    | No team defined |
| Risk Assessment             | CRITICAL       | Incomplete mitigations | No risk assessment |
| Tenant Strategy             | CRITICAL       | Tiers not finalized   | No tenant strategy |
| Capacity Planning           | Non-critical   | Estimates rough       | No estimates |
| AI Strategy                 | CRITICAL       | Provider undecided    | No AI strategy |
| Agent Architecture Planning | Non-critical   | Details incomplete    | No architecture |
| Epic Structure              | CRITICAL       | Estimates missing     | No epics defined |
| Story Readiness             | Non-critical   | Stories not refined   | No stories |

## Recovery Protocol

**If QG-PL1 triggers CONDITIONAL or FAIL status:**

1. **Attempt 1:** Planning refinement (target: 3-5 days)
   - Address missing roadmap elements
   - Complete resource allocation gaps
   - Refine risk mitigations
   - Finalize tenant tier definitions
   - Re-evaluate gate status after refinements
   - **Lock passed categories** — focus on gaps

2. **Attempt 2:** Planning sprint (target: 1 week)
   - Engage PM and Technical Lead for deep planning
   - Conduct estimation workshops
   - Complete epic definitions
   - Finalize AI/agent strategy
   - Re-evaluate gate status after sprint
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to Project Sponsor and PMO
   - Document planning blockers
   - Consider timeline adjustment
   - Define minimum viable plan criteria
   - Schedule follow-up gate evaluation within 2 weeks

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Roadmap Definition | Workshop with stakeholders | No milestones after 1 week |
| Resource Planning | HR/staffing engagement | Team undefined |
| Risk Assessment | Risk workshop | Critical risks unmitigated |
| Tenant Strategy | Architecture review | Isolation undefined |
| AI Strategy | AI vendor evaluation | No provider selected |
| Epic Structure | Story mapping session | No epics defined |

## Related Workflows

- `bmad-bam-requirement-ingestion` - Requirements ingestion
- `bmad-bam-triage-module-complexity` - Complexity assessment
- `bmad-bam-create-module-epics` - Epic creation
- `bmad-bam-cross-module-story` - Cross-module stories

**PASS CRITERIA:** Roadmap approved, resources allocated, risks documented
**OWNER:** Project Manager / Product Owner
**REVIEWERS:** Project Sponsor, Technical Lead, Architect
