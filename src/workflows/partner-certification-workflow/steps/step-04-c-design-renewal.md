# Step 4: Design Renewal and Maintenance

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
- Use web search to verify current best practices when designing renewal procedures
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Design renewal requirements, maintenance procedures, tier upgrade/downgrade processes, and recertification assessments to ensure ongoing partner quality and ecosystem health.

## Prerequisites

- Tier structure defined (Step 1)
- Requirements designed (Step 2)
- Assessment process configured (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: partner-ecosystem
- **Load template:** `{project-root}/_bmad/bam/data/templates/partner-certification-template.md`


---

## Inputs

- Complete certification program from Steps 1-3
- Assessment criteria and scoring
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Renewal Requirements

Establish renewal requirements per tier:

| Tier | Renewal Period | Renewal Fee | Renewal Requirements |
|------|----------------|-------------|----------------------|
| Registered | 12 months | $0 | Profile update, agreement renewal |
| Certified | 12 months | $2,500 | Re-assessment, training update |
| Premier | 12 months | $10,000 | Full review, strategic alignment |

**Renewal Assessment Scope:**

| Tier | Technical | Business | Documentation |
|------|-----------|----------|---------------|
| Registered | Automated health check | Profile verification | Self-attestation |
| Certified | Security scan, API review | Revenue verification, references | Updated runbooks |
| Premier | Full security audit | Financial review, strategic plan | Complete refresh |

### 2. Define Maintenance Requirements

Establish ongoing maintenance obligations:

| Maintenance Area | Frequency | Registered | Certified | Premier |
|------------------|-----------|------------|-----------|---------|
| Security Updates | Continuous | Self-managed | 30-day SLA | 14-day SLA |
| API Compatibility | Per release | 90-day window | 60-day window | Beta participation |
| Documentation | Quarterly | Self-update | Review required | Joint review |
| Training | Annual | Self-paced | Instructor-led | Custom program |
| Health Reporting | Monthly | None | Automated | Manual + auto |

**Continuous Monitoring:**
| Metric | Registered | Certified | Premier |
|--------|------------|-----------|---------|
| API Error Rate | < 5% | < 2% | < 1% |
| Response Time | < 2s | < 500ms | < 200ms |
| Uptime | None | 99% | 99.9% |
| Security Scan | Quarterly | Monthly | Weekly |

### 3. Define Tier Upgrade Procedures

Establish tier progression process:

**Registered to Certified:**
| Step | Action | Duration | Owner |
|------|--------|----------|-------|
| 1 | Expression of interest | - | Partner |
| 2 | Eligibility verification | 5 days | Partner team |
| 3 | Technical assessment scheduling | 3 days | Operations |
| 4 | Technical assessment | 10 days | Technical team |
| 5 | Business review | 5 days | Partner manager |
| 6 | Committee approval | 3 days | Certification board |
| 7 | Onboarding to Certified | 5 days | Partner success |

**Certified to Premier:**
| Step | Action | Duration | Owner |
|------|--------|----------|-------|
| 1 | Nomination or application | - | Partner/Account team |
| 2 | Strategic fit assessment | 10 days | Leadership |
| 3 | Advanced technical review | 15 days | Technical team |
| 4 | Executive alignment | 5 days | Executives |
| 5 | Committee approval | 5 days | Executive board |
| 6 | Strategic planning session | 10 days | Joint team |
| 7 | Premier onboarding | 10 days | Dedicated TAM |

### 4. Define Tier Downgrade Procedures

Establish tier reduction process:

| Trigger | Investigation | Grace Period | Downgrade |
|---------|---------------|--------------|-----------|
| Failed renewal assessment | 15 days | 30 days | Automatic |
| SLA breach (sustained) | 30 days | 60 days | Committee |
| Security incident | Immediate | Case-by-case | Immediate or committee |
| Revenue decline | 90 days | 180 days | Review board |
| Compliance violation | Immediate | None | Immediate |

**Downgrade Impact:**
| From | To | Impact |
|------|----|----|
| Premier | Certified | Lose TAM, reduced rate limits, standard support |
| Certified | Registered | Lose priority support, standard marketplace |
| Registered | Terminated | Remove from ecosystem, API revocation |

**Appeal Process:**
1. Written appeal within 15 days
2. Review by independent committee
3. Decision within 30 days
4. Final decision binding

### 5. Define Recertification Process

Establish recertification requirements:

| Scenario | Assessment Scope | Timeline | Fee |
|----------|------------------|----------|-----|
| Standard renewal | Maintenance + delta review | 30 days before expiry | Tier fee |
| Post-downgrade | Full assessment | After remediation | 50% tier fee |
| Post-incident | Security focus + full | After resolution | Full tier fee |
| Tier upgrade | Incremental + new requirements | On application | Delta fee |

**Recertification Timeline:**
- 90 days: Renewal reminder sent
- 60 days: Assessment scheduling required
- 30 days: Assessment completion deadline
- 15 days: Final decision communicated
- 0 days: Renewal effective or grace period starts
- +30 days: Grace period ends, downgrade if not renewed

**Verify current best practices with web search:**
Search the web: "partner certification renewal best practices {date}"
Search the web: "ISV partner tier maintenance requirements {date}"

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
- **A1**: Review renewal requirements feasibility
- **A2**: Analyze maintenance requirements sustainability
- **A3**: Evaluate upgrade procedures fairness
- **A4**: Assess downgrade procedures clarity
- **A5**: Review recertification process efficiency

### [P]ropose Changes
- **P1**: Propose renewal requirement adjustments
- **P2**: Suggest maintenance requirement modifications
- **P3**: Recommend upgrade procedure refinements
- **P4**: Propose downgrade procedure changes
- **P5**: Suggest recertification process improvements

### [C]ontinue
- **C1**: Accept renewal design and complete certification program
- **C2**: Mark Create mode complete and generate final document

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Renewal requirements defined for all tiers
- [ ] Maintenance requirements documented
- [ ] Upgrade procedures established
- [ ] Downgrade procedures defined
- [ ] Recertification process documented
- [ ] Appeal process established
- [ ] Patterns align with pattern registry

## Outputs

- Complete partner certification program document
- Renewal requirements matrix
- Maintenance obligations documentation
- Tier transition procedures
- `{output_folder}/planning-artifacts/partner-certification-program.md`

## Next Step

This completes the Create mode. Run `step-20-v-load-certification-program.md` to enter Validate mode and verify the certification program meets completeness criteria.

## Quality Gate Summary

Review the complete partner certification program:
- All tiers defined with clear differentiation
- Technical and business requirements documented
- Assessment process with scoring established
- Renewal and maintenance procedures complete
