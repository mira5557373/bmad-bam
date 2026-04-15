# Step 2: Design Response Procedures

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

Design the incident response team structure, communication procedures, containment strategies, and evidence preservation workflows.

## Prerequisites

- Incident classification defined in Step 1
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security


---

## Inputs

- Incident classification from Step 1
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Incident Response Team

Create CSIRT (Computer Security Incident Response Team) structure:

| Role | Responsibility | On-Call | Escalation |
|------|----------------|---------|------------|
| Incident Commander | Overall coordination | 24/7 | CISO |
| Security Analyst | Triage and investigation | 24/7 | IC |
| Platform Engineer | System containment | On-call | IC |
| Legal Counsel | Regulatory compliance | Business hours | GC |
| Communications | Internal/external comms | Business hours | CMO |
| Executive Sponsor | Decision authority | On-call | CEO |

### 2. Define Response Phases

Using NIST framework, define response phases:

| Phase | Activities | Owner | Timeline |
|-------|------------|-------|----------|
| Detection | Alert triage, initial assessment | SOC | 0-15 min |
| Analysis | Scope determination, impact assessment | Security | 15-60 min |
| Containment | Isolate affected systems | Platform | 1-4 hours |
| Eradication | Remove threat, patch vulnerabilities | Security | 4-24 hours |
| Recovery | Restore services, validate security | Platform | 24-72 hours |
| Lessons Learned | Post-incident review | IC | 1-2 weeks |

### 3. Define Containment Strategies

Per incident type:

| Incident Type | Short-term Containment | Long-term Containment |
|---------------|------------------------|----------------------|
| Data Breach | Revoke access, block egress | Reset credentials, audit access |
| Account Compromise | Disable account, session termination | MFA enforcement, access review |
| Malware | Network isolation, kill processes | Reimage systems, update AV |
| DDoS | Rate limiting, CDN scaling | Block sources, firewall rules |
| AI Attack | Disable endpoint, block prompts | Update guardrails, retrain |

### 4. Define Evidence Preservation

Create forensic procedures:

| Evidence Type | Collection Method | Storage | Retention |
|---------------|-------------------|---------|-----------|
| System Logs | Centralized log export | WORM storage | 7 years |
| Network Traffic | Packet capture | Encrypted archive | 1 year |
| Memory Dumps | Live forensics tools | Secure storage | Until case closed |
| Disk Images | Bit-for-bit copy | Air-gapped storage | 7 years |
| AI Artifacts | Prompt logs, model state | Immutable storage | 7 years |

**Verify current best practices with web search:**
Search the web: "incident response procedures NIST {date}"
Search the web: "security forensics evidence preservation {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A]nalyze Options
- **A1**: Review team structure against organizational capacity
- **A2**: Analyze response phase timelines for feasibility
- **A3**: Evaluate containment strategies per incident type
- **A4**: Assess evidence preservation compliance

### [P]ropose Changes
- **P1**: Propose team structure adjustments
- **P2**: Propose response timeline modifications
- **P3**: Suggest containment strategy improvements
- **P4**: Recommend evidence handling enhancements

### [C]ontinue
- **C1**: Accept current response procedures and proceed to tenant notification
- **C2**: Mark step complete and load `step-03-c-design-tenant-notification.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Incident response team defined with roles
- [ ] Response phases documented with timelines
- [ ] Containment strategies defined per incident type
- [ ] Evidence preservation procedures documented
- [ ] Patterns align with pattern registry

## Outputs

- CSIRT team structure
- Response phase workflow
- Containment strategy matrix
- Evidence preservation procedures

## Next Step

Proceed to `step-03-c-design-tenant-notification.md` to design tenant notification.
