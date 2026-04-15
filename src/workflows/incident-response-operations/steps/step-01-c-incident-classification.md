# Step 1: Incident Classification

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
- Use web search to verify current best practices when making operational decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Classify the incoming incident based on severity, impact scope, and affected components to determine appropriate response level and resource allocation.

---

## Prerequisites

- Incident alert or report received
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: incident-response
- **Web research (if available):** Search for current incident classification best practices

---

## Inputs

- Incident alert or user report
- Monitoring data and logs
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Gather Initial Information

Collect and document the following:

| Field | Information | Source |
|-------|-------------|--------|
| Incident ID | Auto-generated or assigned | System/Manual |
| Report time | When incident was reported | Alert/User |
| Reporter | Who reported the incident | Alert/User |
| Initial description | What is happening | Alert/User |
| Affected systems | Which components involved | Alert/Logs |

### 2. Assess Severity Level

Apply severity classification matrix:

| Severity | Definition | SLA Response | Examples |
|----------|------------|--------------|----------|
| P1 - Critical | Full outage, data loss risk, security breach | 15 min | Platform down, data exfiltration |
| P2 - Major | Partial outage, significant degradation | 30 min | Single tenant outage, AI failures |
| P3 - Minor | Limited impact, workaround available | 4 hours | Feature degradation, slow response |
| P4 - Low | Informational, no immediate action | 24 hours | Minor bugs, documentation issues |

### 3. Evaluate Tenant Impact

Assess multi-tenant impact scope:

| Factor | Assessment | Impact Level |
|--------|------------|--------------|
| Tenants affected | Single / Multiple / All | [ ] Low / [ ] Medium / [ ] High |
| Tier affected | Free / Pro / Enterprise | [ ] Low / [ ] Medium / [ ] High |
| Data at risk | None / Limited / Critical | [ ] Low / [ ] Medium / [ ] High |
| AI workload impact | None / Degraded / Failed | [ ] Low / [ ] Medium / [ ] High |

### 4. Classify AI-Specific Impact

For AI workload incidents, assess:

| AI Factor | Status | Action Required |
|-----------|--------|-----------------|
| LLM availability | [ ] Normal / [ ] Degraded / [ ] Down | {action} |
| Token budget consumption | [ ] Normal / [ ] Elevated / [ ] Exhausted | {action} |
| Agent execution | [ ] Normal / [ ] Failing / [ ] Blocked | {action} |
| Memory isolation | [ ] Intact / [ ] Compromised | {action} |

### 5. Document Classification Decision

Record final classification:

- Severity: P{1-4}
- Impact scope: {description}
- Escalation required: Yes/No
- Initial response team: {roles needed}

**Verify current best practices with web search:**
Search the web: "incident classification SaaS best practices {date}"
Search the web: "multi-tenant incident response classification {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the incident classification above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into severity assessment factors
- **P (Party Mode)**: Bring SRE and security perspectives on classification
- **C (Continue)**: Accept classification and proceed to response initiation
- **[Specific refinements]**: Describe classification concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: incident details, classification factors, tenant impact
- Process enhanced insights on severity assessment
- Ask user: "Accept these refined classification decisions? (y/n)"
- If yes, integrate into incident report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review incident classification for multi-tenant AI platform"
- Process SRE and security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save incident classification to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-response-initiation.md`

---

## Verification

- [ ] Incident details gathered
- [ ] Severity level assigned with justification
- [ ] Tenant impact assessed
- [ ] AI-specific impact evaluated
- [ ] Classification documented

---

## Outputs

- Incident classification document
- Severity assignment
- Impact scope assessment
- **Load template:** `{project-root}/_bmad/bam/data/templates/incident-report-template.md`

---

## Next Step

Proceed to `step-02-c-response-initiation.md` to assemble response team.
