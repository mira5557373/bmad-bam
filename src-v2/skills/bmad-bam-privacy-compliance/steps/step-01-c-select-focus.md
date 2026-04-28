# Step 01: Select Privacy Compliance Focus

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Focus: Select compliance framework(s) and sub-workflow focus
- Track: `stepsCompleted: [1]` when complete
- Context: Maintain compliance requirements throughout workflow
- Do NOT: Jump ahead to implementation details
- Use web search: Verify current regulatory requirements and best practices

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Selecting applicable privacy frameworks (GDPR, CCPA, both)
- Choosing sub-workflow focus (ZGD, ZDE, ZCO)
- Gathering compliance requirements from stakeholders
- Documenting initial context

**OUT OF SCOPE:**
- Implementation details
- Technical architecture decisions
- Validation (separate mode)

## Purpose

Initialize the privacy compliance workflow by selecting applicable regulatory frameworks and sub-workflow focus areas based on the tenant model and geographic requirements.

## Prerequisites

- Master architecture document exists at `{output_folder}/planning-artifacts/master-architecture.md`
- Tenant model selection complete (`{tenant_model}` configured)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `privacy-*`
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

## Actions

### 1. Identify Applicable Regulations

Determine which privacy frameworks apply based on business context:

| Framework | Applies When | Key Requirements |
|-----------|--------------|------------------|
| **GDPR** | EU users, EU data processing | Data subject rights, lawful basis, DPA |
| **CCPA** | California residents (>50K) | Right to know, delete, opt-out |
| **LGPD** | Brazilian users | Similar to GDPR, local DPO |
| **PIPEDA** | Canadian users | Consent, access, correction |

**Web Research Directive:**
```
Search the web: "GDPR CCPA compliance multi-tenant SaaS {date}"
Search the web: "privacy by design SaaS architecture {date}"
```

### 2. Select Sub-Workflow Focus

Present sub-workflow options for user selection:

| Code | Sub-Workflow | Description | When to Use |
|------|--------------|-------------|-------------|
| **ZGD** | GDPR Compliance | Data subject rights, lawful basis, cross-border | EU users present |
| **ZDE** | Data Export | Data portability, export formats, tenant isolation | Data portability required |
| **ZCO** | Consent Management | Consent workflows, granular permissions, withdrawal | Consent-based processing |

**Selection Guidance:**
- New platforms: Start with ZGD for comprehensive GDPR foundation
- Adding portability: Focus on ZDE for export capabilities
- Consent overhaul: ZCO for consent workflow redesign
- Full compliance: All three in sequence

### 3. Gather Compliance Requirements

Collect the following from stakeholders:

**Geographic Scope:**
- Which regions have users? (EU, California, Brazil, Canada)
- Where is data processed and stored?
- Cross-border transfer requirements?

**Processing Activities:**
- What personal data categories are collected?
- What is the lawful basis for processing?
- Are there high-risk processing activities (profiling, automated decisions)?

**Existing Compliance:**
- Are there existing privacy policies?
- Is there a Data Protection Officer (DPO)?
- What compliance certifications exist?

### 4. Document Initial Compliance Context

Create initial context summary:

```markdown
## Privacy Compliance Context

**Tenant Model:** {tenant_model}
**Applicable Frameworks:** [GDPR | CCPA | Both | Other]
**Sub-Workflow Focus:** [ZGD | ZDE | ZCO | All]

### Geographic Scope
- **EU Users:** [Yes | No]
- **California Users:** [Yes | No]
- **Other Jurisdictions:** [List]
- **Data Processing Location:** [Region]
- **Cross-Border Transfers:** [Yes | No]

### Processing Context
- **Data Categories:** [List categories]
- **Lawful Basis:** [Consent | Contract | Legitimate Interest | Legal Obligation]
- **High-Risk Processing:** [Yes | No]
- **DPO Required:** [Yes | No]

### Existing Compliance
- **Privacy Policy:** [Exists | Needs Update | Missing]
- **Consent Management:** [Exists | Needs Update | Missing]
- **Data Export:** [Exists | Needs Update | Missing]
```

## Verification

- [ ] Applicable privacy frameworks identified
- [ ] Sub-workflow focus selected (ZGD, ZDE, ZCO, or all)
- [ ] Geographic scope documented
- [ ] Processing activities cataloged
- [ ] Initial context summary documented
- [ ] Web research completed for current best practices

## Outputs

- Privacy compliance context summary (in working memory)
- Selected sub-workflow focus
- Applicable framework list

---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Framework applicability determined
- [ ] Sub-workflow focus confirmed via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without geographic scope - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Proceed to `step-02-c-gdpr-rights.md` to design data subject rights implementation.

---

**Navigation:** Enter 'C' to continue to next step
