---
name: qg-pl1-planning
description: Planning gate validation - requirements, roadmap, resources, risk documentation
module: bam
tags: [planning, quality-gate, multi-tenant, requirements, roadmap]
version: "2.0.0"
---

# QG-PL1: Planning Gate Checklist

> **Gate ID:** QG-PL1 (Planning Validation)
> **Definition:** Planning artifacts MUST be validated before entering Solutioning phase.
> **Scope:** Verifies project plan, resource allocation, and roadmap are defined.
> **Recovery:** Gate failure requires planning refinement before proceeding to architecture.

**Workflow:** bmad-bam-create-module-epics, bmad-bam-cross-module-story
**Prerequisites:** QG-D1 (Discovery Gate must pass before planning can begin)

---

## Purpose

The Planning Gate (QG-PL1) validates that requirements are complete, roadmap is approved, resources are allocated, and risks are documented before solutioning begins. This gate ensures:

1. **Project milestones** are defined with target dates and critical path identified
2. **Resource planning** includes team composition, skill requirements, and allocation timeline
3. **Risk assessment** covers technical and business risks with mitigation strategies
4. **Tenant strategy** defines tiers, isolation approach, and capacity planning
5. **AI strategy** includes model selection, provider evaluation, and safety review process
6. **Epic structure** is complete with dependencies mapped and acceptance criteria defined

Passing QG-PL1 unlocks architecture development (QG-F1, QG-M1).

---

## Project Planning

### Roadmap Definition

- [ ] **CRITICAL:** Project milestones defined with target dates
- [ ] **CRITICAL:** Phase boundaries clearly documented
- [ ] **CRITICAL:** MVP scope finalized and approved
- [ ] Release cadence defined
- [ ] Dependencies between phases mapped
- [ ] Critical path identified

### Resource Planning

- [ ] **CRITICAL:** Team composition defined
- [ ] **CRITICAL:** Skill requirements documented
- [ ] Resource allocation timeline created
- [ ] External dependencies identified (vendors, partners)
- [ ] Training needs assessed
- [ ] Onboarding plan for new team members

### Risk Assessment

- [ ] **CRITICAL:** Technical risks identified and rated
- [ ] **CRITICAL:** Business risks documented
- [ ] **CRITICAL:** Mitigation strategies defined
- [ ] Risk ownership assigned
- [ ] Contingency plans documented
- [ ] Risk review schedule established

---

## Multi-Tenant Planning

### Tenant Strategy

- [ ] **CRITICAL:** Tenant tier definitions finalized (Free/Pro/Enterprise)
- [ ] **CRITICAL:** Tier feature matrix documented
- [ ] **CRITICAL:** Tenant isolation approach selected (RLS/Schema/Database)
- [ ] Tenant migration strategy planned
- [ ] Pilot tenant identification

### Capacity Planning

- [ ] Initial capacity estimates documented
- [ ] Growth projections modeled
- [ ] Infrastructure scaling strategy defined
- [ ] Cost projections per tenant tier
- [ ] Resource quotas per tier defined

---

## AI/Agent Planning

### AI Strategy

- [ ] **CRITICAL:** AI model selection criteria defined
- [ ] **CRITICAL:** Provider evaluation completed
- [ ] AI budget allocation approved
- [ ] Model versioning strategy planned
- [ ] AI safety review process defined

### Agent Architecture Planning

- [ ] Agent topology planned
- [ ] Tool requirements identified
- [ ] Agent communication patterns defined
- [ ] Human oversight touchpoints mapped
- [ ] Agent testing strategy outlined

---

## Epic and Story Planning

### Epic Structure

- [ ] **CRITICAL:** Epics defined with clear boundaries
- [ ] **CRITICAL:** Epic dependencies mapped
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

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items complete, roadmap approved, resources allocated |
| **CONDITIONAL** | Non-critical gaps exist, proceed with documented risks and remediation plan |
| **FAIL** | Any CRITICAL planning items missing, refinement needed |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Roadmap Definition | CRITICAL | Dates tentative | No milestones defined |
| Resource Planning | CRITICAL | Partial allocation | No team defined |
| Risk Assessment | CRITICAL | Incomplete mitigations | No risk assessment |
| Tenant Strategy | CRITICAL | Tiers not finalized | No tenant strategy |
| Capacity Planning | Non-critical | Estimates rough | No estimates |
| AI Strategy | CRITICAL | Provider undecided | No AI strategy |
| Agent Architecture Planning | Non-critical | Details incomplete | No architecture |
| Epic Structure | CRITICAL | Estimates missing | No epics defined |
| Story Readiness | Non-critical | Stories not refined | No stories |

---

## Waiver Process

For non-critical items that cannot be addressed:

1. **Document** the specific item and reason for waiver request
2. **Justify** the business rationale for proceeding without this item
3. **Obtain** stakeholder sign-off (Product Owner or Technical Lead)
4. **Record** waiver in gate report with expiration date (if applicable)
5. **Create** follow-up ticket for future remediation with priority

**Note:** CRITICAL items cannot be waived. All CRITICAL items must pass for gate approval.

---

## Recovery Protocol

**If QG-PL1 triggers CONDITIONAL or FAIL status:**

### Attempt 1: Planning Refinement (target: 3-5 days)

1. Address missing roadmap elements
2. Complete resource allocation gaps
3. Refine risk mitigations
4. Finalize tenant tier definitions
5. Re-evaluate gate status after refinements
6. **Lock passed categories** - focus only on failing items

### Attempt 2: Planning Sprint (target: 1 week)

1. Engage PM and Technical Lead for deep planning
2. Conduct estimation workshops
3. Complete epic definitions
4. Finalize AI/agent strategy
5. Re-evaluate gate status after sprint
6. **Preserve locked categories** from Attempt 1

### Attempt 3: Mandatory Course Correction

1. Escalate to Project Sponsor and PMO
2. Document planning blockers
3. Consider timeline adjustment
4. Define minimum viable plan criteria
5. Schedule follow-up gate evaluation within 2 weeks

### Category-Specific Recovery

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Roadmap Definition | Workshop with stakeholders | No milestones after 1 week |
| Resource Planning | HR/staffing engagement | Team undefined |
| Risk Assessment | Risk workshop | Critical risks unmitigated |
| Tenant Strategy | Architecture review | Isolation undefined |
| AI Strategy | AI vendor evaluation | No provider selected |
| Epic Structure | Story mapping session | No epics defined |

---

## Related Workflows

- `bmad-bam-requirement-ingestion` - Requirements ingestion from external sources
- `bmad-bam-triage-module-complexity` - Complexity assessment and module identification
- `bmad-bam-create-module-epics` - Epic creation from requirements
- `bmad-bam-cross-module-story` - Cross-module story creation

---

## Related Templates

| Template | Purpose | Location |
|----------|---------|----------|
| `roadmap-template.md` | Project roadmap documentation | `{output_folder}/planning-artifacts/` |
| `risk-assessment-template.md` | Risk documentation | `{output_folder}/planning-artifacts/` |
| `epic-template.md` | Epic structure and acceptance criteria | `{output_folder}/planning-artifacts/` |
| `tenant-tier-template.md` | Tenant tier definitions | `{output_folder}/planning-artifacts/` |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Planning patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter by category: `planning-*`
- **Agile patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter by category: `agile-*`
- **Tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`

### Web Research

- Search: "SaaS project planning best practices 2026-04-27"
- Search: "multi-tenant capacity planning 2026-04-27"
- Search: "AI project estimation techniques 2026-04-27"

---

## Web Research Verification

- [ ] Search the web: "quality gate best practices enterprise SaaS 2026-04-27" - Verify gate criteria
- [ ] Search the web: "multi-tenant platform validation patterns 2026-04-27" - Confirm validation approach
- [ ] Search the web: "SaaS project planning checklist 2026-04-27" - Validate planning completeness
- [ ] Search the web: "AI product roadmap best practices 2026-04-27" - Verify AI planning approach
- [ ] _Source: [URL]_ citations documented for key decisions

---

**PASS CRITERIA:** Roadmap approved, resources allocated, risks documented, tenant strategy defined
**OWNER:** Project Manager / Product Owner
**REVIEWERS:** Project Sponsor, Technical Lead, Platform Architect

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM V2 Migration | Migrated from V1 qg-pl1-planning.md with BMAD format enhancements |
| 1.0.0 | 2026-04-27 | Project Manager | Initial V1 planning gate |
