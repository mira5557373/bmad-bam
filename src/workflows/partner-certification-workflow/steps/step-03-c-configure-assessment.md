# Step 3: Configure Assessment Process

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
- Use web search to verify current best practices when configuring assessments
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Configure the assessment process for partner certification, including technical evaluation criteria, business assessment processes, scoring methodology, and pass/fail thresholds.

## Prerequisites

- Tier structure defined (Step 1)
- Requirements designed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: partner-ecosystem
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: assessment


---

## Inputs

- Tier definitions and requirements from Steps 1-2
- API documentation and integration patterns
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Technical Assessment Criteria

Establish technical evaluation criteria per tier:

**Registered Technical Assessment:**
| Criteria | Weight | Assessment Method | Pass Threshold |
|----------|--------|-------------------|----------------|
| API Authentication | 25% | Automated test | 100% |
| Basic Integration | 25% | Sandbox validation | 100% |
| Error Handling | 20% | Code review | 80% |
| Documentation | 15% | Manual review | 70% |
| Rate Limiting | 15% | Monitoring | 100% |

**Certified Technical Assessment:**
| Criteria | Weight | Assessment Method | Pass Threshold |
|----------|--------|-------------------|----------------|
| All Registered | 30% | Previous assessment | Pass |
| Security Compliance | 25% | Penetration test | 90% |
| Performance | 20% | Load test | 95% |
| Webhook Integration | 15% | Automated test | 100% |
| Tenant Isolation | 10% | Security audit | 100% |

**Premier Technical Assessment:**
| Criteria | Weight | Assessment Method | Pass Threshold |
|----------|--------|-------------------|----------------|
| All Certified | 30% | Previous assessment | Pass |
| SOC 2 Compliance | 25% | Audit report | Pass |
| AI Runtime Integration | 20% | Architecture review | 90% |
| SLA Achievement | 15% | Monitoring | 99.9% |
| Advanced Events | 10% | Integration test | 95% |

### 2. Define Business Assessment Process

Establish business evaluation process:

| Assessment Stage | Activities | Duration | Participants |
|------------------|------------|----------|--------------|
| Application Review | Document verification | 3 days | Partner team |
| Reference Checks | Customer interviews | 5 days | Partner manager |
| Financial Review | Revenue verification | 2 days | Finance |
| Strategic Alignment | Business review | 3 days | Leadership |
| Final Approval | Committee decision | 2 days | Certification board |

**Business Scoring Rubric:**

| Criteria | Weight | Scoring Scale |
|----------|--------|---------------|
| Customer References | 25% | 1-5 (quantity and quality) |
| Revenue Performance | 20% | 1-5 (vs threshold) |
| Support Capability | 20% | 1-5 (resources/process) |
| Strategic Fit | 20% | 1-5 (market alignment) |
| Training Completion | 15% | Pass/Fail |

### 3. Establish Scoring Methodology

Define comprehensive scoring system:

| Score Range | Grade | Outcome | Next Steps |
|-------------|-------|---------|------------|
| 90-100% | A | Pass | Immediate certification |
| 80-89% | B | Pass with conditions | Minor remediation required |
| 70-79% | C | Provisional pass | 30-day remediation window |
| 60-69% | D | Fail | Re-assessment after 60 days |
| < 60% | F | Fail | Re-assessment after 90 days |

**Weighted Score Calculation:**
```
Total Score = (Technical Score * 0.6) + (Business Score * 0.4)
```

For Premier tier:
```
Total Score = (Technical Score * 0.5) + (Business Score * 0.3) + (Strategic Score * 0.2)
```

### 4. Define Pass/Fail Thresholds

Establish clear thresholds:

| Tier | Technical Minimum | Business Minimum | Overall Minimum | Critical Requirements |
|------|-------------------|------------------|-----------------|----------------------|
| Registered | 80% | 70% | 75% | API Auth = 100% |
| Certified | 85% | 80% | 82% | Security = 90%, Tenant = 100% |
| Premier | 90% | 85% | 88% | SOC 2 = Pass, SLA = 99.9% |

**Automatic Fail Conditions:**
- Any critical requirement not met
- Security vulnerability identified
- Customer reference issues
- Active compliance violations
- Previous termination history

### 5. Define Assessment Timeline

Establish assessment process timeline:

| Tier | Submission to Decision | Assessment Validity |
|------|------------------------|---------------------|
| Registered | 5 business days | 6 months |
| Certified | 15 business days | 12 months |
| Premier | 30 business days | 12 months |

**Assessment Process Flow:**
1. Application submission
2. Documentation review (automated + manual)
3. Technical assessment (automated tests)
4. Security review (if applicable)
5. Business assessment (references, financials)
6. Committee review (Certified/Premier only)
7. Decision notification
8. Onboarding (if approved)

**Soft Gate:** Steps 1-3 complete the core certification design.

Present summary of tiers, requirements, and assessment process. Ask for confirmation before proceeding to renewal design.

**Verify current best practices with web search:**
Search the web: "partner certification assessment process design {date}"
Search the web: "ISV technical assessment scoring methodology {date}"

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
- **A1**: Review technical assessment criteria for fairness
- **A2**: Analyze business assessment process efficiency
- **A3**: Evaluate scoring methodology objectivity
- **A4**: Assess pass/fail thresholds appropriateness

### [P]ropose Changes
- **P1**: Propose technical assessment adjustments
- **P2**: Suggest business assessment process improvements
- **P3**: Recommend scoring methodology refinements
- **P4**: Propose threshold modifications

### [C]ontinue
- **C1**: Accept assessment configuration and proceed to renewal design
- **C2**: Mark step complete and load `step-04-c-design-renewal.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Technical assessment criteria defined for all tiers
- [ ] Business assessment process documented
- [ ] Scoring methodology established
- [ ] Pass/fail thresholds set
- [ ] Assessment timeline defined
- [ ] Patterns align with pattern registry

## Outputs

- Technical assessment criteria matrix
- Business assessment process documentation
- Scoring methodology and rubrics
- Pass/fail threshold definitions
- **Load template:** `{project-root}/_bmad/bam/templates/partner-certification-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/partner-portal-template.md`

## Next Step

Proceed to `step-04-c-design-renewal.md` to design renewal and maintenance requirements.
