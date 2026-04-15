# Step 1: Define Incident Classification

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

Define comprehensive security incident classification framework covering incident types, severity levels, and tenant impact assessment for the multi-tenant AI platform.

## Prerequisites

- Master architecture approved or in progress
- Tenant tier model defined (Free/Pro/Enterprise)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation


---

## Inputs

- User requirements and constraints for incident response
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Incident Severity Levels

Using security patterns from knowledge, define severity classification:

| Severity | Description | Examples | Response Time |
|----------|-------------|----------|---------------|
| SEV-1 Critical | Active breach, data exfiltration | Ransomware, APT, mass data leak | 15 minutes |
| SEV-2 High | Confirmed intrusion, no data loss | Unauthorized access, malware found | 1 hour |
| SEV-3 Medium | Attempted attack, contained | Blocked intrusion, phishing attempt | 4 hours |
| SEV-4 Low | Minor security event | Failed login attempts, policy violation | 24 hours |

### 2. Define Incident Categories

Categorize security incidents by type:

| Category | Sub-types | Examples |
|----------|-----------|----------|
| Data Breach | Exfiltration, exposure, corruption | Customer data leaked, PII exposed |
| Unauthorized Access | Account compromise, privilege escalation | Admin takeover, lateral movement |
| Malware | Ransomware, trojan, cryptominer | Encrypted files, resource hijacking |
| DoS/DDoS | Application, network, volumetric | Service unavailable, API overload |
| Insider Threat | Malicious, negligent | Data theft, accidental exposure |
| AI-Specific | Prompt injection, model poisoning | Jailbreak, training data manipulation |

### 3. Define Tenant Impact Classification

For multi-tenant incidents:

| Impact Level | Scope | Tenants Affected | Priority Escalation |
|--------------|-------|------------------|---------------------|
| Platform-wide | All services affected | All tenants | SEV +1 |
| Tier-specific | Single tier compromised | Tier subset | SEV +0.5 |
| Multi-tenant | Multiple tenants affected | 2+ tenants | SEV +0.5 |
| Single-tenant | One tenant affected | 1 tenant | No change |
| Isolated | No tenant data affected | 0 tenants | SEV -0.5 |

### 4. Define AI-Specific Incident Types

For AI platform incidents:

| Incident Type | Description | Severity Default | Response |
|---------------|-------------|------------------|----------|
| Prompt Injection | Malicious prompt bypasses guardrails | SEV-2 | Immediate block |
| Model Extraction | Attempts to steal model weights | SEV-1 | Legal + technical |
| Training Poisoning | Malicious training data injected | SEV-1 | Model rollback |
| Jailbreak Success | Guardrails circumvented | SEV-3 | Update guardrails |
| Data Leakage | PII in model output | SEV-2 | Output filtering |

**Verify current best practices with web search:**
Search the web: "security incident classification framework {date}"
Search the web: "AI security incident response best practices {date}"

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
- **A1**: Review severity levels against industry standards
- **A2**: Analyze incident categories for completeness
- **A3**: Evaluate tenant impact classification
- **A4**: Assess AI-specific incident coverage

### [P]ropose Changes
- **P1**: Propose adjusted severity thresholds
- **P2**: Propose additional incident categories
- **P3**: Suggest tenant impact refinements
- **P4**: Recommend AI incident type additions

### [C]ontinue
- **C1**: Accept current incident classification and proceed to response procedures
- **C2**: Mark step complete and load `step-02-c-design-response-procedures.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Severity levels defined with response times
- [ ] Incident categories comprehensive
- [ ] Tenant impact classification documented
- [ ] AI-specific incidents addressed
- [ ] Patterns align with pattern registry

## Outputs

- Incident severity classification matrix
- Incident category taxonomy
- Tenant impact assessment criteria
- AI-specific incident definitions

## Next Step

Proceed to `step-02-c-design-response-procedures.md` to design response procedures.
