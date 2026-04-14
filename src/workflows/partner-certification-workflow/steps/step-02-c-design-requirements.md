# Step 2: Design Requirements Per Tier

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
- Use web search to verify current best practices when designing requirements
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Design comprehensive technical and business requirements for each certification tier, establishing clear criteria partners must meet to achieve and maintain their certification level.

## Prerequisites

- Tier structure defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: partner-ecosystem
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: integration


---

## Inputs

- Tier definitions from Step 1
- API documentation and integration patterns
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Technical Requirements

Establish technical requirements per tier:

**Registered Tier:**
| Requirement | Description | Verification |
|-------------|-------------|--------------|
| API Authentication | OAuth 2.0 implementation | Automated test |
| Basic Integration | REST API connectivity | Sandbox validation |
| Error Handling | Standard error responses | Code review |
| Rate Limiting | Respect standard limits | Monitoring |
| Documentation | Basic integration docs | Manual review |

**Certified Tier:**
| Requirement | Description | Verification |
|-------------|-------------|--------------|
| All Registered + | | |
| Webhook Integration | Event subscription handling | Automated test |
| Data Validation | Input/output validation | Security scan |
| Security Standards | OWASP compliance | Penetration test |
| Performance | < 500ms response time | Load test |
| Idempotency | Retry-safe operations | Integration test |
| Tenant Isolation | Multi-tenant data handling | Security audit |

**Premier Tier:**
| Requirement | Description | Verification |
|-------------|-------------|--------------|
| All Certified + | | |
| SDK Integration | Official SDK adoption | Code review |
| Advanced Security | SOC 2 Type II compliance | Audit report |
| SLA Compliance | 99.9% uptime for integration | Monitoring |
| AI Integration | Agent runtime compatibility | Integration test |
| Custom Events | Advanced event handling | Architecture review |
| Data Residency | Regional data compliance | Compliance audit |

### 2. Define Business Requirements

Establish business requirements per tier:

**Registered Tier:**
| Requirement | Description | Evidence |
|-------------|-------------|----------|
| Company Profile | Complete business profile | Portal submission |
| Partner Agreement | Signed partner terms | DocuSign |
| Primary Contact | Designated partner contact | Registration |
| Use Case | Documented integration use case | Application form |

**Certified Tier:**
| Requirement | Description | Evidence |
|-------------|-------------|----------|
| All Registered + | | |
| Customer References | 3+ production customers | Reference calls |
| Support Plan | Defined support process | Documentation |
| Revenue Threshold | $10K+ annual revenue | Financial report |
| Insurance | Liability insurance | Certificate |
| Training Completion | Partner certification course | Badge/certificate |

**Premier Tier:**
| Requirement | Description | Evidence |
|-------------|-------------|----------|
| All Certified + | | |
| Strategic Plan | Joint go-to-market plan | Business review |
| Revenue Threshold | $100K+ annual revenue | Financial report |
| Executive Sponsor | Named executive contact | Agreement |
| Dedicated Resources | Assigned integration team | Org chart |
| Co-marketing Commitment | Marketing collaboration | Marketing plan |

### 3. Define Training Requirements

Establish training and education requirements:

| Tier | Required Training | Format | Duration |
|------|-------------------|--------|----------|
| Registered | API Fundamentals | Self-paced online | 2 hours |
| Registered | Integration Basics | Self-paced online | 2 hours |
| Certified | Advanced Integration | Instructor-led | 4 hours |
| Certified | Security Best Practices | Self-paced online | 2 hours |
| Premier | Architecture Deep Dive | Custom workshop | 8 hours |
| Premier | Executive Briefing | On-site session | 2 hours |

### 4. Define Support Requirements

Establish support commitments per tier:

| Support Aspect | Registered | Certified | Premier |
|----------------|------------|-----------|---------|
| Support Channel | Community forum | Email + chat | Dedicated TAM |
| Response SLA | Best effort | 24 hours | 4 hours |
| Escalation Path | Standard | Priority | Direct |
| Technical Reviews | Self-service | Quarterly | Monthly |
| Incident Bridge | None | On-request | Always-on |

### 5. Define Documentation Requirements

Establish documentation standards:

| Documentation | Registered | Certified | Premier |
|---------------|------------|-----------|---------|
| Integration Guide | Basic | Comprehensive | Reference implementation |
| API Usage Docs | Standard | Enhanced | Custom |
| Support Runbook | None | Required | Detailed |
| Architecture Diagram | Simple | Detailed | Full system |
| Security Assessment | Self-attestation | Third-party audit | SOC 2 report |

**Verify current best practices with web search:**
Search the web: "ISV partner technical requirements best practices {date}"
Search the web: "SaaS partner certification requirements design {date}"

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
- **A1**: Review technical requirements for achievability
- **A2**: Analyze business requirements against partner capacity
- **A3**: Evaluate training requirements effectiveness
- **A4**: Assess support requirements sustainability

### [P]ropose Changes
- **P1**: Propose technical requirement adjustments
- **P2**: Suggest business requirement modifications
- **P3**: Recommend training program enhancements
- **P4**: Propose support model revisions

### [C]ontinue
- **C1**: Accept current requirements and proceed to assessment design
- **C2**: Mark step complete and load `step-03-c-configure-assessment.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Technical requirements defined for all tiers
- [ ] Business requirements defined for all tiers
- [ ] Training requirements established
- [ ] Support requirements documented
- [ ] Documentation standards defined
- [ ] Patterns align with pattern registry

## Outputs

- Technical requirements matrix
- Business requirements matrix
- Training curriculum outline
- Support requirements documentation
- **Load template:** `{project-root}/_bmad/bam/templates/partner-certification-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/partner-framework-template.md`

## Next Step

Proceed to `step-03-c-configure-assessment.md` to configure the assessment process and scoring criteria.
