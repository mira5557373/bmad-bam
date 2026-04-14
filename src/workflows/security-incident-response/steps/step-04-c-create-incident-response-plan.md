# Step 4: Create Incident Response Plan

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- BOOK **CRITICAL: ALWAYS read the complete step file** before taking any action
- CYCLE **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- TARGET **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- MEMO Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array
- SEARCH Use web search to verify current best practices when making technology decisions
- CLIP Reference pattern registry `web_queries` for search topics


---

## Purpose

Assemble the comprehensive security incident response plan incorporating incident classification, response procedures, and tenant notification from previous steps.

## Prerequisites

- Incident classification defined in Step 1
- Response procedures defined in Step 2
- Tenant notification defined in Step 3
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security


---

## Inputs

- All outputs from Steps 1-3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Template: `{project-root}/_bmad/bam/templates/security-incident-response-template.md`

---

## Actions

### 1. Assemble Plan Document

Using the incident response template, compile:

| Section | Source | Status |
|---------|--------|--------|
| Executive Summary | New | Draft |
| Incident Classification | Step 1 | Complete |
| Response Team | Step 2 | Complete |
| Response Procedures | Step 2 | Complete |
| Tenant Notification | Step 3 | Complete |
| Playbooks | New | Draft |
| Communication Templates | New | Draft |
| Exercise Schedule | New | Draft |

### 2. Create Incident Playbooks

Define playbooks for common incidents:

| Playbook | Triggers | Key Actions | Decision Points |
|----------|----------|-------------|-----------------|
| Data Breach | Confirmed exfiltration | Contain, preserve, notify | Legal escalation |
| Ransomware | Encryption detected | Isolate, assess, recover | Pay/no-pay decision |
| Account Takeover | Compromised credentials | Revoke, investigate | Scope determination |
| DDoS Attack | Traffic spike | Mitigation, scaling | Provider escalation |
| AI Jailbreak | Guardrail bypass | Block, review, update | Model rollback |

### 3. Create Communication Templates

Define standard templates:

| Template | Use Case | Audience |
|----------|----------|----------|
| Initial Alert | First notification | Affected tenants |
| Status Update | Ongoing incident | Affected tenants |
| Resolution Notice | Incident closed | Affected tenants |
| Executive Brief | Leadership update | Internal |
| Regulatory Notice | Compliance notification | Authorities |

### 4. Schedule Tabletop Exercises

Define exercise calendar:

| Exercise Type | Frequency | Participants | Scenario |
|---------------|-----------|--------------|----------|
| Tabletop | Quarterly | CSIRT | Rotating scenarios |
| Functional | Semi-annual | CSIRT + Platform | Live simulation |
| Full-scale | Annual | All stakeholders | Multi-day exercise |

**Verify current best practices with web search:**
Search the web: "incident response playbook templates {date}"
Search the web: "security tabletop exercise best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A]nalyze Options
- **A1**: Review document structure completeness
- **A2**: Analyze playbook coverage
- **A3**: Evaluate communication templates
- **A4**: Assess exercise schedule feasibility

### [P]ropose Changes
- **P1**: Propose additional playbooks
- **P2**: Propose template improvements
- **P3**: Suggest exercise schedule modifications
- **P4**: Recommend document enhancements

### [C]ontinue
- **C1**: Finalize incident response plan
- **C2**: Mark workflow complete and output to `{output_folder}/planning-artifacts/security-incident-response-plan.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All sections from template populated
- [ ] Playbooks defined for key incident types
- [ ] Communication templates complete
- [ ] Exercise schedule documented
- [ ] Document ready for approval

## Outputs

- `{output_folder}/planning-artifacts/security-incident-response-plan.md`
- **Load template:** `{project-root}/_bmad/bam/templates/security-incident-response-template.md`

## Next Step

Workflow complete. Output security incident response plan to designated location.
