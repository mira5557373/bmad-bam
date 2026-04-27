---
name: qg-rr1-research-report
description: Research report gate - findings documentation, recommendations, validation
module: bam
tags: [research, quality-gate, documentation, analysis]
version: 2.0.0
---

# QG-RR1: Research Report Gate

> **Gate ID:** QG-RR1 (Research Report)
> **Phase:** 2-planning, 3-solutioning
> **Workflow:** bmad-bam-requirement-ingestion, bmad-bam-tenant-requirements-analysis
> **Prerequisites:** None (can be used at any research phase)

Research reports MUST be validated before being used to inform architectural decisions. This gate ensures research findings are complete, sources are credible, recommendations are actionable, and conclusions are validated.

---

## Purpose

QG-RR1 validates that research reports meet quality standards for decision support:

1. **Findings** are complete and well-documented
2. **Sources** are credible and properly cited
3. **Analysis** is thorough and unbiased
4. **Recommendations** are clear and actionable
5. **Conclusions** are validated and supported by evidence

---

## Research Scope

### Scope Definition

- [ ] **CRITICAL:** Research question/objective clearly stated
- [ ] **CRITICAL:** Scope boundaries defined (in-scope vs out-of-scope)
- [ ] **CRITICAL:** Success criteria for research defined
- [ ] Target audience identified
- [ ] Time constraints documented
- [ ] Research methodology stated

### Context Establishment

- [ ] **CRITICAL:** Business context documented
- [ ] **CRITICAL:** Technical context documented
- [ ] Stakeholder concerns captured
- [ ] Prior research/decisions referenced
- [ ] Constraints and assumptions listed

### Multi-Tenant Considerations

- [ ] **CRITICAL:** Tenant isolation impact assessed (if applicable)
- [ ] Tier-specific implications documented
- [ ] Enterprise vs standard tenant differences noted
- [ ] Cross-tenant concerns identified
- [ ] Data residency/compliance implications noted

---

## Findings Documentation

### Finding Structure

- [ ] **CRITICAL:** Each finding has unique identifier
- [ ] **CRITICAL:** Finding summary provided (1-2 sentences)
- [ ] **CRITICAL:** Supporting evidence documented
- [ ] Finding category assigned (technical, business, operational)
- [ ] Confidence level indicated (high, medium, low)
- [ ] Implications described

### Evidence Quality

- [ ] **CRITICAL:** Primary sources cited for key findings
- [ ] **CRITICAL:** Multiple sources corroborate critical findings
- [ ] Data sources documented
- [ ] Sample sizes noted where applicable
- [ ] Date of evidence noted (currency verified)

### Finding Completeness

- [ ] **CRITICAL:** All research questions addressed
- [ ] **CRITICAL:** Gaps in findings explicitly noted
- [ ] Contradictory evidence acknowledged
- [ ] Limitations of findings documented
- [ ] Areas requiring further research identified

### Finding Presentation

- [ ] **CRITICAL:** Findings organized logically (by theme, priority, or chronology)
- [ ] Visual aids used where appropriate (tables, diagrams)
- [ ] Key findings highlighted/summarized
- [ ] Technical jargon explained or glossary provided
- [ ] Cross-references between related findings

---

## Source Citation

### Citation Requirements

- [ ] **CRITICAL:** All claims supported by citations
- [ ] **CRITICAL:** Citation format consistent throughout
- [ ] **CRITICAL:** Primary sources preferred over secondary
- [ ] URLs provided for web sources
- [ ] Access date noted for web sources
- [ ] Version/publication date noted

### Source Credibility

- [ ] **CRITICAL:** Source authority verified (credentials, reputation)
- [ ] **CRITICAL:** Source bias considered and documented
- [ ] Peer-reviewed sources preferred for technical claims
- [ ] Official documentation preferred for product/technology claims
- [ ] Vendor claims corroborated by independent sources

### Source Currency

- [ ] **CRITICAL:** Sources are current (within {date} relevance)
- [ ] Outdated sources flagged with rationale for inclusion
- [ ] Technology evolution considered
- [ ] Deprecated practices identified
- [ ] Future deprecation risks noted

### Source Diversity

- [ ] **CRITICAL:** Multiple source types used (documentation, papers, case studies)
- [ ] Vendor-independent sources included
- [ ] Community feedback/experiences considered
- [ ] Contrarian viewpoints included where relevant
- [ ] Geographic/industry diversity considered

---

## Analysis Quality

### Analysis Methodology

- [ ] **CRITICAL:** Analysis approach documented
- [ ] **CRITICAL:** Assumptions stated explicitly
- [ ] Analytical framework described
- [ ] Comparison criteria defined
- [ ] Weighting factors documented (if applicable)

### Analysis Depth

- [ ] **CRITICAL:** Root causes explored (not just symptoms)
- [ ] **CRITICAL:** Trade-offs analyzed comprehensively
- [ ] Alternatives considered fairly
- [ ] Edge cases addressed
- [ ] Failure modes examined

### Objectivity

- [ ] **CRITICAL:** Bias acknowledged and mitigated
- [ ] **CRITICAL:** Conflicting perspectives presented
- [ ] Analysis separates facts from opinions
- [ ] Counter-arguments addressed
- [ ] Author assumptions disclosed

### Multi-Tenant Analysis

- [ ] Tenant isolation implications analyzed
- [ ] Scalability analysis per tenant tier
- [ ] Cost implications per tenant analyzed
- [ ] Performance impact per tenant estimated
- [ ] Security implications per tenant assessed

---

## Recommendations

### Recommendation Structure

- [ ] **CRITICAL:** Each recommendation has unique identifier
- [ ] **CRITICAL:** Recommendation clearly stated (actionable verb)
- [ ] **CRITICAL:** Rationale links to specific findings
- [ ] Priority assigned (must-have, should-have, nice-to-have)
- [ ] Confidence level indicated
- [ ] Owner/responsible party suggested

### Recommendation Quality

- [ ] **CRITICAL:** Recommendations are actionable (clear next steps)
- [ ] **CRITICAL:** Recommendations are specific (not vague)
- [ ] **CRITICAL:** Recommendations are measurable (success criteria defined)
- [ ] Implementation complexity estimated
- [ ] Timeline suggested
- [ ] Resource requirements estimated

### Recommendation Completeness

- [ ] **CRITICAL:** All key findings lead to recommendations
- [ ] **CRITICAL:** No recommendation without supporting finding
- [ ] Alternative options presented where appropriate
- [ ] Dependencies between recommendations noted
- [ ] Risks of not implementing documented

### Trade-off Documentation

- [ ] **CRITICAL:** Trade-offs for each recommendation documented
- [ ] Pros and cons listed
- [ ] Risk vs benefit assessed
- [ ] Short-term vs long-term implications
- [ ] Reversibility assessed

---

## Validation

### Internal Validation

- [ ] **CRITICAL:** Findings verified against primary sources
- [ ] **CRITICAL:** Analysis logic reviewed for errors
- [ ] **CRITICAL:** Recommendations aligned with findings
- [ ] Calculations/data verified
- [ ] Consistency checks performed

### External Validation

- [ ] **CRITICAL:** Subject matter expert review completed
- [ ] Stakeholder review completed
- [ ] Technical accuracy verified by domain expert
- [ ] Business relevance confirmed by stakeholder
- [ ] Feedback incorporated

### Validation Documentation

- [ ] **CRITICAL:** Reviewers identified with roles
- [ ] Review comments documented
- [ ] Changes from review tracked
- [ ] Unresolved issues documented
- [ ] Sign-off obtained

---

## Report Quality

### Document Structure

- [ ] **CRITICAL:** Executive summary provided
- [ ] **CRITICAL:** Table of contents for reports >5 pages
- [ ] **CRITICAL:** Conclusion section synthesizes findings
- [ ] Logical flow from context to findings to recommendations
- [ ] Appendices for detailed data

### Clarity and Accessibility

- [ ] **CRITICAL:** Writing is clear and concise
- [ ] **CRITICAL:** Target audience can understand without clarification
- [ ] Technical terms defined or glossary provided
- [ ] Acronyms spelled out on first use
- [ ] Visual aids enhance understanding

### Completeness Checklist

- [ ] **CRITICAL:** Research objective addressed
- [ ] **CRITICAL:** All sections complete (no TBD/placeholder content)
- [ ] References/bibliography complete
- [ ] Version and date included
- [ ] Author(s) identified

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Scope Definition | CRITICAL | Boundaries unclear | No research question |
| Context Establishment | CRITICAL | Context incomplete | No context |
| Finding Structure | CRITICAL | Minor format issues | Findings unstructured |
| Evidence Quality | CRITICAL | Secondary sources only | No evidence |
| Citation Requirements | CRITICAL | Format inconsistent | Claims uncited |
| Source Credibility | CRITICAL | Some bias unaddressed | Unreliable sources |
| Source Currency | CRITICAL | Minor outdated sources | All sources outdated |
| Analysis Methodology | CRITICAL | Assumptions implicit | No methodology |
| Objectivity | CRITICAL | Minor bias detected | Severely biased |
| Recommendation Structure | CRITICAL | Minor format issues | No recommendations |
| Recommendation Quality | CRITICAL | Some vague | All vague/unactionable |
| Internal Validation | CRITICAL | Minor errors found | Major errors |
| External Validation | CRITICAL | No SME review | No review at all |
| Document Structure | CRITICAL | Minor organization issues | No structure |
| Finding Completeness | Non-critical | Some gaps noted | N/A |
| Source Diversity | Non-critical | Limited diversity | N/A |
| Trade-off Documentation | Non-critical | Incomplete trade-offs | N/A |

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items checked, >=80% standard items complete |
| **CONDITIONAL** | All CRITICAL items checked, <80% standard items + documented mitigation plan |
| **FAIL** | Any CRITICAL item unchecked - block decisions based on report, enter recovery protocol |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

---

## Waiver Process

For non-critical items that cannot be addressed:

1. Document the specific item and reason for waiver
2. Identify business justification (time constraints, scope limits)
3. Obtain stakeholder sign-off (Research Requester or Technical Lead)
4. Record waiver in report with expiration date (if applicable)
5. Create follow-up ticket for future remediation if needed

**Note:** CRITICAL items cannot be waived.

---

## Recovery Protocol

**If gate triggers CONDITIONAL or FAIL status:**

### Attempt 1: Address Documentation Gaps (target: 1-2 days)

- Review failed checks and identify root cause
- Add missing citations and sources
- Clarify vague recommendations
- Complete executive summary and structure
- Re-run QG-RR1 validation
- **Lock passed categories**

### Attempt 2: Deeper Investigation (target: 2-3 days)

- Engage additional subject matter experts
- Verify contentious findings with multiple sources
- Strengthen evidence for weak claims
- Add missing analysis sections
- Obtain additional reviews
- Re-run validation after remediation
- **Preserve locked categories**

### Attempt 3: Mandatory Course Correction

- Escalate to Research Requester and Project Leadership
- Document research quality blockers
- Reassess research scope and timeline
- Consider additional research cycles
- Create remediation plan with stakeholder sign-off
- Schedule follow-up validation within 1 week

### Category-Specific Recovery

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Scope | Define clear research question | No scope after review |
| Findings | Add structure and evidence | Findings unsupported |
| Sources | Add citations, verify credibility | Unreliable sources |
| Analysis | Document methodology, reduce bias | Severe bias detected |
| Recommendations | Make actionable with rationale | No recommendations |
| Validation | Obtain SME review | No validation |

---

## Automated Validation Script

```bash
# Run as part of QG-RR1 gate
./scripts/validate-research-report.sh

# Validates:
# - Document structure completeness
# - Citation presence and format
# - Finding-recommendation linkage
# - Required sections present
# - Review sign-off recorded
```

---

## Related Workflows

- `bmad-bam-requirement-ingestion` - Requirements research
- `bmad-bam-tenant-requirements-analysis` - Tenant-specific research
- `bmad-bam-triage-module-complexity` - Complexity assessment research
- `bmad-bam-create-master-architecture` - Architecture research

## Related Templates

- `research-report-template.md` - Research report structure
- `findings-matrix-template.md` - Findings documentation
- `recommendations-template.md` - Recommendation format
- `source-evaluation-template.md` - Source credibility assessment

## Related Patterns

- `research-methodology-patterns.md` - Research approaches
- `evidence-quality-patterns.md` - Evidence assessment
- `recommendation-patterns.md` - Actionable recommendations

---

## Web Research Verification

- [ ] Search the web: "technical research report best practices {date}" - Verify report structure
- [ ] Search the web: "source credibility assessment criteria {date}" - Confirm citation standards
- [ ] Search the web: "actionable recommendations writing {date}" - Verify recommendation quality
- [ ] Search the web: "research validation methodology {date}" - Confirm validation approaches
- [ ] _Source: [URL]_ citations documented for key methodology decisions

---

**PASS CRITERIA:** All CRITICAL checkboxes completed, findings documented, recommendations actionable
**OWNER:** Business Analyst (analyst-bam)
**REVIEWERS:** Subject Matter Expert, Research Requester, Technical Lead

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM | New V2 gate for research report quality; ensures decision support quality |
