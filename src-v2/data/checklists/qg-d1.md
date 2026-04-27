---
name: qg-d1-discovery
description: Discovery gate validation - stakeholder alignment, problem definition, scope boundaries
module: bam
tags: [discovery, quality-gate, multi-tenant, requirements, stakeholder]
version: "2.0.0"
---

# QG-D1: Discovery Gate Checklist

> **Gate ID:** QG-D1 (Discovery Validation)
> **Definition:** Discovery artifacts MUST be validated before entering Planning phase.
> **Scope:** Verifies stakeholder requirements, business context, and project scope are captured.
> **Recovery:** Gate failure requires additional stakeholder engagement before proceeding.

**Workflow:** bmad-bam-tenant-requirements-analysis, bmad-bam-requirement-ingestion
**Prerequisites:** None (first gate in the BAM workflow sequence)

---

## Purpose

The Discovery Gate (QG-D1) validates that stakeholder alignment, problem definition, and scope boundaries are established before planning begins. This gate ensures:

1. **Stakeholder requirements** are captured with measurable success criteria
2. **Multi-tenant context** is understood including tier definitions and isolation requirements
3. **AI/Agent requirements** are identified with autonomy levels and safety considerations
4. **Business context** is documented including market analysis and compliance requirements
5. **Project scope** is clearly defined with in-scope and out-of-scope boundaries

Passing QG-D1 unlocks the Planning phase (QG-PL1).

---

## Stakeholder Requirements

### Requirements Capture

- [ ] **CRITICAL:** Primary stakeholders identified and documented
- [ ] **CRITICAL:** Business objectives clearly articulated
- [ ] **CRITICAL:** Success criteria defined with measurable outcomes
- [ ] User personas documented (if applicable)
- [ ] Pain points and current challenges documented
- [ ] Constraints and limitations identified

### Multi-Tenant Context

- [ ] **CRITICAL:** Tenant types and tiers identified (Free/Pro/Enterprise)
- [ ] **CRITICAL:** Tenant isolation requirements discussed
- [ ] Per-tenant customization needs documented
- [ ] Tenant onboarding expectations captured
- [ ] Tenant data residency requirements identified
- [ ] Tenant SLA expectations documented

### AI/Agent Requirements

- [ ] **CRITICAL:** AI use cases identified and prioritized
- [ ] **CRITICAL:** Agent autonomy levels discussed
- [ ] Human-in-the-loop requirements defined
- [ ] AI safety and ethics considerations documented
- [ ] Model provider preferences captured
- [ ] AI cost budget constraints identified

---

## Business Context

### Market Analysis

- [ ] Target market segments identified
- [ ] Competitive landscape reviewed
- [ ] Differentiation strategy documented
- [ ] Go-to-market timeline expectations captured
- [ ] Revenue model considerations documented

### Compliance Context

- [ ] **CRITICAL:** Industry regulations identified (GDPR, HIPAA, SOC2, etc.)
- [ ] **CRITICAL:** Data sovereignty requirements documented
- [ ] Audit requirements identified
- [ ] Compliance certification timeline captured

---

## Project Scope

### Scope Definition

- [ ] **CRITICAL:** In-scope features documented
- [ ] **CRITICAL:** Out-of-scope items explicitly listed
- [ ] **CRITICAL:** MVP vs full-scope boundaries defined
- [ ] Phase/release boundaries identified
- [ ] Integration requirements documented

### Technical Context

- [ ] Existing systems and constraints documented
- [ ] Technology preferences captured
- [ ] Infrastructure requirements identified
- [ ] Performance expectations documented
- [ ] Scalability requirements defined

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items complete, stakeholder sign-off obtained |
| **CONDITIONAL** | Non-critical gaps exist, proceed with documented assumptions |
| **FAIL** | Any CRITICAL requirements missing, additional discovery needed |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Requirements Capture (core) | CRITICAL | Gaps in non-core reqs | Core reqs missing |
| Multi-Tenant Context | CRITICAL | Tier details unclear | Isolation reqs missing |
| AI/Agent Requirements | CRITICAL | Details incomplete | Use cases undefined |
| Market Analysis | Non-critical | Analysis incomplete | No analysis |
| Compliance Context | CRITICAL | Regs partially identified | Major regs unidentified |
| Scope Definition | CRITICAL | Boundaries fuzzy | Scope undefined |
| Technical Context | Non-critical | Partial documentation | No documentation |

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

**If QG-D1 triggers CONDITIONAL or FAIL status:**

### Attempt 1: Stakeholder Re-engagement (target: 3-5 days)

1. Schedule additional stakeholder interviews
2. Clarify missing requirements
3. Document assumptions for unclear areas
4. Obtain sign-off on documented assumptions
5. Re-evaluate gate status after clarifications
6. **Lock passed categories** - focus only on failing items

### Attempt 2: Extended Discovery Sprint (target: 1 week)

1. Engage additional stakeholders or SMEs
2. Conduct workshops for complex requirements
3. Create prototypes to clarify ambiguous requirements
4. Document trade-offs and decisions
5. Re-evaluate gate status after extended discovery
6. **Preserve locked categories** from Attempt 1

### Attempt 3: Mandatory Course Correction

1. Escalate to Project Sponsor and Product Owner
2. Document discovery blockers and risks
3. Consider scope reduction if requirements unclear
4. Define minimum viable discovery criteria
5. Schedule follow-up gate evaluation within 2 weeks

### Category-Specific Recovery

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Requirements Capture | Schedule interviews | Core reqs undefined after 1 week |
| Multi-Tenant Context | Workshop with architect | Isolation model unclear |
| AI/Agent Requirements | AI use case workshop | No defined AI use cases |
| Compliance Context | Engage legal/compliance | Regulations unidentified |
| Scope Definition | Scope workshop | MVP undefined |

---

## Related Workflows

- `bmad-bam-tenant-requirements-analysis` - Tenant-specific requirements gathering
- `bmad-bam-requirement-ingestion` - Requirements ingestion from external sources
- `bmad-bam-triage-module-complexity` - Complexity assessment and module identification

---

## Related Templates

| Template | Purpose | Location |
|----------|---------|----------|
| `stakeholder-map-template.md` | Stakeholder identification and roles | `{output_folder}/discovery-artifacts/` |
| `requirements-capture-template.md` | Requirements documentation | `{output_folder}/discovery-artifacts/` |
| `scope-definition-template.md` | In-scope/out-of-scope boundaries | `{output_folder}/discovery-artifacts/` |
| `compliance-checklist-template.md` | Regulatory requirements | `{output_folder}/discovery-artifacts/` |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Discovery patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter by category: `discovery-*`
- **Requirements patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter by category: `requirements-*`
- **Compliance frameworks:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### Web Research

- Search: "SaaS discovery phase best practices 2026-04-27"
- Search: "multi-tenant requirements gathering 2026-04-27"
- Search: "AI product discovery patterns 2026-04-27"

---

## Web Research Verification

- [ ] Search the web: "quality gate best practices enterprise SaaS 2026-04-27" - Verify gate criteria
- [ ] Search the web: "multi-tenant platform validation patterns 2026-04-27" - Confirm validation approach
- [ ] Search the web: "SaaS discovery phase checklist 2026-04-27" - Validate discovery completeness
- [ ] Search the web: "stakeholder requirements gathering AI products 2026-04-27" - Verify requirements approach
- [ ] _Source: [URL]_ citations documented for key decisions

---

**PASS CRITERIA:** All CRITICAL requirements documented with stakeholder sign-off
**OWNER:** Product Owner / Business Analyst
**REVIEWERS:** Project Sponsor, Technical Lead, Platform Architect

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM V2 Migration | Migrated from V1 qg-d1-discovery.md with BMAD format enhancements |
| 1.0.0 | 2026-04-27 | Business Analyst | Initial V1 discovery gate |
