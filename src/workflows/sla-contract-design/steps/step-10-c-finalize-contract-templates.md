# Step 10: Finalize Contract Templates

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead
- Use web search to verify current best practices when making technology decisions

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Create final SLA contract templates incorporating all design elements from previous steps, ready for legal review and customer distribution.

---

## Prerequisites

- Step 9 (Validate SLA Feasibility) completed
- Feasibility validation passed
- All stakeholder approvals obtained
- **Load template:** `{project-root}/_bmad/bam/data/templates/sla-contract-template.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `contract`
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Inputs

- All SLA design outputs from Steps 1-9
- Feasibility assessment and approvals
- Template: `{project-root}/_bmad/bam/data/templates/sla-contract-template.md`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Contract Document Structure

Establish the standard SLA contract structure:

| Section | Content | Source Step |
|---------|---------|-------------|
| 1. Definitions | Key terms and concepts | All steps |
| 2. Service Scope | Covered services | Step 1 |
| 3. Availability | Uptime commitments | Step 2 |
| 4. Performance | Latency commitments | Step 3 |
| 5. Isolation | Data protection guarantees | Step 4 |
| 6. Support | Support levels and response times | Step 5 |
| 7. Remedies | Credits and penalties | Step 6 |
| 8. Monitoring | Measurement methodology | Step 7 |
| 9. Reporting | Communication obligations | Step 8 |
| 10. Exclusions | What is not covered | Steps 2, 3, 5, 6 |
| 11. Term and Termination | Contract duration and exit | Step 6 |
| 12. Limitations | Liability caps | Step 6 |

### 2. Create Tier-Specific Contract Templates

Generate contract templates for each tier:

| Tier | Template Name | Key Differentiators |
|------|---------------|---------------------|
| Free | sla-free-terms.md | No SLA commitments (Terms of Service only) |
| Starter | sla-starter-contract.md | Basic availability, email support |
| Pro | sla-pro-contract.md | Enhanced latency, priority support |
| Enterprise | sla-enterprise-contract.md | Full SLA, dedicated support, custom terms |
| Premium | sla-premium-contract.md | Maximum commitments, negotiable terms |

### 3. Define Key Contract Terms

Establish standard definitions:

| Term | Definition |
|------|------------|
| Availability | Percentage of time Services are operational and accessible |
| Downtime | Period when Services are not Available, excluding Scheduled Maintenance |
| Monthly Uptime Percentage | (Total Minutes - Downtime Minutes) / Total Minutes x 100 |
| Service Credit | Percentage of monthly fee credited for SLA breach |
| Error Rate | Percentage of requests resulting in server errors |
| P95/P99 Latency | 95th/99th percentile response time |
| Scheduled Maintenance | Planned maintenance with minimum 72-hour advance notice |
| Force Majeure | Events beyond reasonable control (natural disasters, war, etc.) |

### 4. Create Contract Amendment Process

Define how contract changes are handled:

| Change Type | Process | Notice Period |
|-------------|---------|---------------|
| SLA Improvement | Notification only | 30 days |
| SLA Reduction | Opt-out right | 90 days |
| New Service Addition | Updated terms | 30 days |
| Service Deprecation | Migration support | 180 days |
| Pricing Change | Renewal terms | Per contract term |
| Material Change | Consent required | 60 days |

### 5. Define Version Control

Establish contract versioning:

| Element | Format | Example |
|---------|--------|---------|
| Version Number | YYYY.MM.vN | 2026.04.v1 |
| Effective Date | ISO date | 2026-04-15 |
| Previous Version | Reference | 2026.01.v2 |
| Change Log | Summary | Added Premium tier |
| Archive Location | URL | /legal/sla/archive/ |

### 6. Create Supporting Documents

Define additional documents needed:

| Document | Purpose | Audience |
|----------|---------|----------|
| SLA Summary | Quick reference card | Sales, Customers |
| Technical Appendix | Detailed specifications | Engineering |
| FAQ | Common questions | Support, Customers |
| Comparison Matrix | Tier comparison | Sales, Prospects |
| Credit Calculator | Self-service credit lookup | Customers |

### 7. Define Review and Approval Workflow

Establish the review process:

| Stage | Reviewer | Focus Area | Timeframe |
|-------|----------|------------|-----------|
| Draft | Product | Completeness | 1 week |
| Technical Review | Engineering | Feasibility | 1 week |
| Legal Review | Legal | Compliance, liability | 2 weeks |
| Finance Review | Finance | Credit exposure | 1 week |
| Executive Approval | Leadership | Strategic alignment | 1 week |
| Final Publication | Legal | Version control | 3 days |

### 8. Define Publication and Distribution

Establish how contracts are distributed:

| Channel | Content | Update Frequency |
|---------|---------|------------------|
| Website | Current SLA terms | Immediate |
| Customer Portal | Tenant-specific SLA | Real-time |
| API | Machine-readable SLA | Real-time |
| Sales Materials | SLA summary | Quarterly |
| Support Knowledge Base | FAQ, procedures | Monthly |

### 9. Create Contract Monitoring

Define ongoing contract management:

| Activity | Frequency | Owner |
|----------|-----------|-------|
| SLA Performance Review | Monthly | Operations |
| Credit Exposure Report | Monthly | Finance |
| Competitive Analysis | Quarterly | Product |
| Customer Feedback | Quarterly | Customer Success |
| Legal Compliance Audit | Annually | Legal |
| Contract Refresh | Annually | Product + Legal |

**Verify current best practices with web search:**
Search the web: "SLA contract template best practices {date}"
Search the web: "SaaS service level agreement structure {date}"
Search the web: "enterprise SLA contract terms {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the contract templates above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific contract language and legal considerations
- **P (Party Mode)**: Bring legal and product perspectives for final contract review
- **C (Continue)**: Accept contract templates and finalize the SLA design workflow
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: contract structure, terms, review process
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into contract templates
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review contract templates: {summary of structure, terms, processes}"
- Process collaborative analysis from legal and product personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save contract templates to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`
- Mark workflow as complete

---

## Verification

- [ ] Document structure defined
- [ ] Tier-specific templates created
- [ ] Key terms defined
- [ ] Amendment process established
- [ ] Version control implemented
- [ ] Supporting documents specified
- [ ] Review workflow documented
- [ ] Publication channels defined
- [ ] Monitoring activities scheduled
- [ ] Patterns align with pattern registry
- [ ] All QG-SLA1 criteria satisfied

---

## Outputs

- Tier-specific SLA contract templates
- Key terms glossary
- Contract amendment procedures
- Supporting documentation list
- Review and approval workflow
- **Load template:** `{project-root}/_bmad/bam/data/templates/error-budget-template.md`

---

## Workflow Complete

The SLA Contract Design workflow is now complete. The following artifacts have been created:

1. **Tenant Tier SLA Requirements Matrix** (Step 1)
2. **Availability/Uptime Guarantees** (Step 2)
3. **AI Latency SLA Specifications** (Step 3)
4. **Tenant Isolation Guarantees** (Step 4)
5. **Support Tier Definitions** (Step 5)
6. **Penalty/Credit Clauses** (Step 6)
7. **Monitoring Requirements** (Step 7)
8. **Reporting Obligations** (Step 8)
9. **Feasibility Validation Report** (Step 9)
10. **Final Contract Templates** (Step 10)

**Quality Gate Satisfied:** QG-SLA1 (SLA Contract Gate)

**Next Workflow Recommendations:**
- `bmad-bam-sli-slo-definition` - Define SLIs/SLOs aligned with SLA commitments
- `bmad-bam-tenant-sla-monitoring` - Implement SLA monitoring per these requirements
- `bmad-bam-incident-response-operations` - Align incident response with SLA obligations
