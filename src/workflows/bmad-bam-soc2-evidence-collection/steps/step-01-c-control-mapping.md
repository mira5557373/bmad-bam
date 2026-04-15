# Step 1: Control Mapping

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Map platform controls to SOC2 Trust Services Criteria (TSC) to establish the foundation for evidence collection and demonstrate control effectiveness.

---

## Prerequisites

- Master architecture document loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: compliance

---

## Inputs

- User requirements for SOC2 audit scope
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define SOC2 Scope

Identify applicable Trust Services Categories:

| Category | Applicable | Justification |
|----------|------------|---------------|
| Security (CC) | Yes | Required for all SOC2 |
| Availability (A) | Yes/No | If uptime commitments exist |
| Processing Integrity (PI) | Yes/No | If processing accuracy critical |
| Confidentiality (C) | Yes/No | If confidential data processed |
| Privacy (P) | Yes/No | If personal data processed |

### 2. Map Security Controls (CC Series)

Map Common Criteria controls to platform capabilities:

**CC1 - Control Environment:**

| Control ID | Criteria | Platform Control | Evidence Source |
|------------|----------|------------------|-----------------|
| CC1.1 | COSO principles | Governance documentation | Policy documents |
| CC1.2 | Board oversight | Board meeting minutes | Meeting records |
| CC1.3 | Management structure | Org chart, RACI | HR system |
| CC1.4 | HR practices | Employee handbook | HR policies |
| CC1.5 | Accountability | Performance reviews | HR system |

**CC2 - Communication and Information:**

| Control ID | Criteria | Platform Control | Evidence Source |
|------------|----------|------------------|-----------------|
| CC2.1 | Internal communication | Internal wiki, Slack | Communication logs |
| CC2.2 | External communication | Status page, SLAs | Public documentation |
| CC2.3 | Security policies | Security policy docs | Policy repository |

**CC3 - Risk Assessment:**

| Control ID | Criteria | Platform Control | Evidence Source |
|------------|----------|------------------|-----------------|
| CC3.1 | Risk objectives | Risk register | GRC platform |
| CC3.2 | Risk identification | Threat modeling | Security reviews |
| CC3.3 | Fraud consideration | Fraud risk assessment | Audit reports |
| CC3.4 | Change analysis | Change management | JIRA/tickets |

**CC4 - Monitoring Activities:**

| Control ID | Criteria | Platform Control | Evidence Source |
|------------|----------|------------------|-----------------|
| CC4.1 | Ongoing evaluation | Continuous monitoring | Observability platform |
| CC4.2 | Deficiency communication | Incident management | PagerDuty/tickets |

**CC5 - Control Activities:**

| Control ID | Criteria | Platform Control | Evidence Source |
|------------|----------|------------------|-----------------|
| CC5.1 | Control selection | Control framework | Architecture docs |
| CC5.2 | Technology controls | Security tooling | Tool inventory |
| CC5.3 | Policies and procedures | Documented procedures | Runbooks |

### 3. Map Logical Access Controls (CC6)

| Control ID | Criteria | Platform Control | Evidence Source |
|------------|----------|------------------|-----------------|
| CC6.1 | Logical access security | IAM, SSO, MFA | Auth logs, IAM config |
| CC6.2 | User registration | Onboarding workflow | HR + IAM integration |
| CC6.3 | Access removal | Offboarding workflow | Deprovisioning logs |
| CC6.4 | Access review | Quarterly access review | Review artifacts |
| CC6.5 | Authenticated access | Auth requirements | Auth configuration |
| CC6.6 | Access restrictions | RBAC, tenant isolation | Permission matrix |
| CC6.7 | Data transmission | TLS, encryption | Certificate inventory |
| CC6.8 | Malicious software | Endpoint protection | EDR dashboards |

### 4. Map System Operations Controls (CC7)

| Control ID | Criteria | Platform Control | Evidence Source |
|------------|----------|------------------|-----------------|
| CC7.1 | Configuration management | IaC, Terraform | Git history, config |
| CC7.2 | Change detection | File integrity monitoring | SIEM alerts |
| CC7.3 | Security incidents | Incident response | Incident tickets |
| CC7.4 | Incident recovery | Disaster recovery | DR test results |
| CC7.5 | Data recovery | Backup/restore | Backup logs |

### 5. Map Change Management Controls (CC8)

| Control ID | Criteria | Platform Control | Evidence Source |
|------------|----------|------------------|-----------------|
| CC8.1 | Change authorization | PR approvals, CAB | Git, change tickets |

### 6. Map Risk Mitigation Controls (CC9)

| Control ID | Criteria | Platform Control | Evidence Source |
|------------|----------|------------------|-----------------|
| CC9.1 | Risk mitigation | Vendor management | Vendor assessments |
| CC9.2 | Risk assessment | Business risk analysis | Risk register |

**Verify current best practices with web search:**
Search the web: "SOC2 Trust Services Criteria mapping best practices {date}"
Search the web: "SOC2 Type II evidence requirements {date}"
Search the web: "multi-tenant SaaS SOC2 controls {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the control mapping above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific control areas
- **P (Party Mode)**: Bring auditor and compliance perspectives
- **C (Continue)**: Accept mapping and proceed to evidence sources
- **[Specific refinements]**: Describe mapping concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: control mappings, platform capabilities, evidence sources
- Process enhanced insights on control coverage
- Ask user: "Accept these refined control mappings? (y/n)"
- If yes, integrate into mapping
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review SOC2 control mapping for multi-tenant AI platform"
- Process auditor and compliance officer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save control mapping to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-evidence-sources.md`

---

## Verification

- [ ] SOC2 scope defined
- [ ] CC1-CC5 controls mapped
- [ ] CC6 logical access mapped
- [ ] CC7 system operations mapped
- [ ] CC8 change management mapped
- [ ] CC9 risk mitigation mapped
- [ ] Patterns align with pattern registry

---

## Outputs

- SOC2 scope definition
- Control mapping matrix
- Evidence source identification

---

## Next Step

Proceed to `step-02-c-evidence-sources.md` to identify detailed evidence sources.
