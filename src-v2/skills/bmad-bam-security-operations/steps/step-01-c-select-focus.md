# Step 01: Select Security Operations Focus (Create Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- STOP NEVER generate content without user input
- READ CRITICAL: ALWAYS read the complete step file before taking any action
- LOOP CRITICAL: When loading next step with 'C', ensure entire file is read
- PAUSE ALWAYS pause after presenting findings and await user direction
- TARGET Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- TARGET Focus: Select focus area for security operations design
- SAVE Track: Document focus selection and rationale
- READ Context: Sub-workflows ZSR (Secrets), ZST (Threat), ZIR (Incident)
- STOP Do NOT: Begin detailed design until focus confirmed
- SEARCH Use web search: Verify current security operations best practices

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Selecting focus area (ZSR, ZST, ZIR, or ALL)
- Gathering initial security requirements
- Understanding current security posture

**OUT OF SCOPE:**
- Detailed secrets design (step-02/03)
- Threat modeling (step-04/05)
- Incident response design (step-06/07)
- Validation (separate mode)

## YOUR TASK

Present the security operations sub-workflow options and gather user input on which focus area(s) to design. Enable the user to select ZSR (Secrets Management), ZST (Threat Modeling), ZIR (Incident Response), or ALL for comprehensive coverage.

---

## Purpose

Initialize security operations design by selecting the focus area and loading relevant patterns and domain context for the selected sub-workflow.

---

## Prerequisites

- Master architecture defined (QG-F1 passed)
- Tenant model selected: `{tenant_model}`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `security`
- **Load domain:** `{project-root}/_bmad/bam/data/domains/security.md`

**Web Research (Required):**

Search the web: "security operations multi-tenant SaaS {date}"
Search the web: "secrets management threat modeling incident response priorities {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Present Sub-Workflow Options

Present the security operations focus areas:

```
================================================================================
SECURITY OPERATIONS - FOCUS SELECTION
================================================================================
This workflow covers three security operations domains:

[ZSR] SECRETS MANAGEMENT
      - Tenant-scoped credentials and API keys
      - Secret rotation policies (zero-downtime)
      - Vault integration (HashiCorp, AWS, Azure, GCP)
      - Agent credential lifecycle
      Steps: step-02-c, step-03-c

[ZST] THREAT MODELING
      - STRIDE analysis per component
      - Attack tree construction
      - Threat mitigation design
      - AI-specific threat vectors
      Steps: step-04-c, step-05-c

[ZIR] INCIDENT RESPONSE
      - Severity classification matrix
      - Escalation procedures
      - Runbook design
      - Tenant notification procedures
      Steps: step-06-c, step-07-c

[ALL] COMPLETE COVERAGE
      - All three domains
      - Comprehensive security operations design
      Steps: step-01-c through step-07-c

================================================================================
Select focus: ZSR, ZST, ZIR, or ALL
```

### 2. Gather Security Context

Collect user input on security requirements:

| Question | Input Required |
|----------|----------------|
| Current secrets management? | (None, basic, vault-based) |
| Threat modeling completed? | (Yes/No, which methodology) |
| Incident response procedures? | (None, informal, documented) |
| Compliance requirements? | (SOC2, HIPAA, PCI-DSS, etc.) |
| AI components present? | (Yes/No) |
| Multi-tenant security concerns? | (tenant isolation, data protection) |

### 3. Load Focus-Specific Patterns

Based on selection, load relevant patterns:

| Focus | Patterns to Load |
|-------|------------------|
| ZSR | `secrets-management.md`, vault patterns |
| ZST | `zero-trust.md`, threat modeling frameworks |
| ZIR | `incident-response.md`, runbook patterns |
| ALL | All security patterns |

### 4. Assess Current Security Posture

| Security Domain | Current State | Gap | Priority |
|-----------------|---------------|-----|----------|
| Secrets Management | {state} | {gap} | {priority} |
| Threat Modeling | {state} | {gap} | {priority} |
| Incident Response | {state} | {gap} | {priority} |
| Multi-Tenant Isolation | {state} | {gap} | {priority} |

---

## COLLABORATION MENUS (A/P/C):

After focus selection, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into security requirements
- **P (Party Mode)**: Bring security architect, SRE, compliance perspectives
- **C (Continue)**: Proceed to selected focus area steps
- **[Change focus]**: Select different focus area

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: selected focus, current security posture
- Clarify security priorities and constraints
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review security operations focus selection"
- Present perspectives from Security Architect, SRE, Compliance
- Return to A/P/C menu

#### If 'C' (Continue):
- Document focus selection
- Update frontmatter `stepsCompleted: [1]`
- Proceed based on selection:
  - ZSR -> `step-02-c-secrets-analysis.md`
  - ZST -> `step-04-c-threat-stride.md`
  - ZIR -> `step-06-c-incident-classification.md`
  - ALL -> `step-02-c-secrets-analysis.md`

---

## Verification

- [ ] Focus area selected (ZSR, ZST, ZIR, or ALL)
- [ ] Security context gathered from user
- [ ] Current security posture assessed
- [ ] Relevant patterns loaded
- [ ] Web research citations documented

---

## Outputs

- Focus area selection with rationale
- Current security posture assessment
- Priority areas for design
- Loaded pattern references

---

## SUCCESS METRICS:

- [ ] User selected focus area via A/P/C menu
- [ ] Security context documented
- [ ] Gap analysis completed
- [ ] Output artifact initialized with focus selection
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Unclear focus:** Use Advanced Elicitation (A) to clarify priorities
- **Missing context:** Cannot proceed without tenant model and compliance requirements
- **Conflicting priorities:** Use Party Mode (P) for multi-perspective analysis

## Next Step

Based on selection:
- **ZSR:** Proceed to `step-02-c-secrets-analysis.md`
- **ZST:** Proceed to `step-04-c-threat-stride.md`
- **ZIR:** Proceed to `step-06-c-incident-classification.md`
- **ALL:** Proceed to `step-02-c-secrets-analysis.md`
