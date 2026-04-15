# QG-D1: Discovery Gate Checklist

> Gate ID: QG-D1 (Discovery Validation)
> Discovery artifacts MUST be validated before entering Planning phase.
> Gate definition: verifies stakeholder requirements, business context, and project scope are captured.
> Workflow integration: BAM discovery workflows feed into this gate.
> Executing workflow: `tenant-requirements-analysis`
>
> **Phase Gate:** QG-D1 is evaluated at the end of Discovery phase (BMM Phase 1).
> Failures require additional stakeholder engagement before proceeding.

## Stakeholder Requirements

### Requirements Capture

- [ ] Primary stakeholders identified and documented
- [ ] Business objectives clearly articulated
- [ ] Success criteria defined with measurable outcomes
- [ ] User personas documented (if applicable)
- [ ] Pain points and current challenges documented
- [ ] Constraints and limitations identified

### Multi-Tenant Context

- [ ] Tenant types and tiers identified (Free/Pro/Enterprise)
- [ ] Tenant isolation requirements discussed
- [ ] Per-tenant customization needs documented
- [ ] Tenant onboarding expectations captured
- [ ] Tenant data residency requirements identified
- [ ] Tenant SLA expectations documented

### AI/Agent Requirements

- [ ] AI use cases identified and prioritized
- [ ] Agent autonomy levels discussed
- [ ] Human-in-the-loop requirements defined
- [ ] AI safety and ethics considerations documented
- [ ] Model provider preferences captured
- [ ] AI cost budget constraints identified

## Business Context

### Market Analysis

- [ ] Target market segments identified
- [ ] Competitive landscape reviewed
- [ ] Differentiation strategy documented
- [ ] Go-to-market timeline expectations captured
- [ ] Revenue model considerations documented

### Compliance Context

- [ ] Industry regulations identified (GDPR, HIPAA, SOC2, etc.)
- [ ] Data sovereignty requirements documented
- [ ] Audit requirements identified
- [ ] Compliance certification timeline captured

## Project Scope

### Scope Definition

- [ ] In-scope features documented
- [ ] Out-of-scope items explicitly listed
- [ ] MVP vs full-scope boundaries defined
- [ ] Phase/release boundaries identified
- [ ] Integration requirements documented

### Technical Context

- [ ] Existing systems and constraints documented
- [ ] Technology preferences captured
- [ ] Infrastructure requirements identified
- [ ] Performance expectations documented
- [ ] Scalability requirements defined

---

## Web Research Verification

- [ ] Search the web: "quality gate best practices enterprise SaaS {date}" - Verify gate criteria
- [ ] Search the web: "multi-tenant platform validation patterns {date}" - Confirm validation approach
- [ ] _Source: [URL]_ citations documented for key decisions

## Related Patterns

Load decision criteria from pattern registry:

- **Discovery patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `discovery-*`
- **Requirements patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `requirements-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS discovery phase best practices {date}"
- Search: "multi-tenant requirements gathering {date}"
- Search: "AI product discovery patterns {date}"

## Gate Decision

| Outcome | Criteria |
|---------|----------|
| **PASS** | All CRITICAL items complete, stakeholder sign-off obtained |
| **CONDITIONAL** | Non-critical gaps exist, proceed with documented assumptions |
| **FAIL** | CRITICAL requirements missing, additional discovery needed |
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
| Stakeholder Requirements    | CRITICAL       | Gaps in non-core reqs | Core reqs missing |
| Multi-Tenant Context        | CRITICAL       | Tier details unclear  | Isolation reqs missing |
| AI/Agent Requirements       | CRITICAL       | Details incomplete    | Use cases undefined |
| Market Analysis             | Non-critical   | Analysis incomplete   | No analysis |
| Compliance Context          | CRITICAL       | Regs partially identified | Major regs unidentified |
| Scope Definition            | CRITICAL       | Boundaries fuzzy      | Scope undefined |
| Technical Context           | Non-critical   | Partial documentation | No documentation |

## Recovery Protocol

**If QG-D1 triggers CONDITIONAL or FAIL status:**

1. **Attempt 1:** Stakeholder re-engagement (target: 3-5 days)
   - Schedule additional stakeholder interviews
   - Clarify missing requirements
   - Document assumptions for unclear areas
   - Obtain sign-off on documented assumptions
   - Re-evaluate gate status after clarifications
   - **Lock passed categories** — focus on gaps

2. **Attempt 2:** Extended discovery sprint (target: 1 week)
   - Engage additional stakeholders or SMEs
   - Conduct workshops for complex requirements
   - Create prototypes to clarify ambiguous requirements
   - Document trade-offs and decisions
   - Re-evaluate gate status after extended discovery
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to Project Sponsor and Product Owner
   - Document discovery blockers and risks
   - Consider scope reduction if requirements unclear
   - Define minimum viable discovery criteria
   - Schedule follow-up gate evaluation within 2 weeks

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Stakeholder Requirements | Schedule interviews | Core reqs undefined after 1 week |
| Multi-Tenant Context | Workshop with architect | Isolation model unclear |
| AI/Agent Requirements | AI use case workshop | No defined AI use cases |
| Compliance Context | Engage legal/compliance | Regulations unidentified |
| Scope Definition | Scope workshop | MVP undefined |

## Related Workflows

- `bmad-bam-tenant-requirements-analysis` - Requirements gathering
- `bmad-bam-requirement-ingestion` - Requirements ingestion
- `bmad-bam-triage-module-complexity` - Complexity assessment

**PASS CRITERIA:** All CRITICAL requirements documented with stakeholder sign-off
**OWNER:** Product Owner / Business Analyst
**REVIEWERS:** Project Sponsor, Technical Lead, Architect
