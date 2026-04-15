# Step 3: Investigation Procedures

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

---

## Purpose

Systematically investigate the incident by collecting logs and telemetry, identifying root cause hypothesis, mapping affected components and tenants, and documenting the timeline of events.

---

## Prerequisites

- Response team assembled (Step 2)
- Access to logging and monitoring systems
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: incident-response

---

## Inputs

- Incident classification and response initiation from Steps 1-2
- Logging systems access (DataDog, Splunk, etc.)
- Monitoring dashboards
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Collect Logs and Telemetry

Gather data from all relevant sources:

| Source | Data Type | Time Range | Status |
|--------|-----------|------------|--------|
| Application logs | Error/Warning logs | Incident start - 1h to now | [ ] Collected |
| Infrastructure logs | System events | Incident start - 1h to now | [ ] Collected |
| AI runtime logs | LLM calls, agent traces | Incident start - 1h to now | [ ] Collected |
| Database logs | Query logs, slow queries | Incident start - 1h to now | [ ] Collected |
| Network logs | Traffic, latency | Incident start - 1h to now | [ ] Collected |
| Security logs | Auth events, access logs | Incident start - 24h to now | [ ] Collected |

### 2. Identify Root Cause Hypothesis

Apply structured root cause analysis:

| Hypothesis | Evidence For | Evidence Against | Confidence |
|------------|--------------|------------------|------------|
| {Hypothesis 1} | {evidence} | {counter-evidence} | High/Med/Low |
| {Hypothesis 2} | {evidence} | {counter-evidence} | High/Med/Low |
| {Hypothesis 3} | {evidence} | {counter-evidence} | High/Med/Low |

Primary hypothesis: {description}

### 3. Map Affected Components

Document the blast radius:

| Component | Status | Impact | Tenants Affected |
|-----------|--------|--------|------------------|
| API Gateway | Normal/Degraded/Down | {description} | {count or list} |
| AI Runtime | Normal/Degraded/Down | {description} | {count or list} |
| Database | Normal/Degraded/Down | {description} | {count or list} |
| Message Queue | Normal/Degraded/Down | {description} | {count or list} |
| Cache Layer | Normal/Degraded/Down | {description} | {count or list} |
| External APIs | Normal/Degraded/Down | {description} | {count or list} |

### 4. Document Timeline of Events

Create detailed timeline:

| Time (UTC) | Event | Source | Actor |
|------------|-------|--------|-------|
| {timestamp} | {event description} | {log/alert/user} | {system/user} |
| {timestamp} | {event description} | {log/alert/user} | {system/user} |
| {timestamp} | {event description} | {log/alert/user} | {system/user} |

### 5. Assess AI-Specific Factors

For AI workload incidents, investigate:

| Factor | Finding | Implication |
|--------|---------|-------------|
| LLM provider status | {status} | {impact} |
| Token consumption pattern | {normal/abnormal} | {impact} |
| Agent execution traces | {findings} | {impact} |
| Memory/context leakage | {none/detected} | {impact} |
| Prompt injection attempts | {none/detected} | {impact} |

**Verify current best practices with web search:**
Search the web: "incident investigation root cause analysis SaaS {date}"
Search the web: "AI system incident investigation patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the investigation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into root cause analysis
- **P (Party Mode)**: Bring SRE and AI architect perspectives on investigation findings
- **C (Continue)**: Accept investigation findings and proceed to mitigation
- **[Specific refinements]**: Describe investigation areas to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: collected evidence, hypotheses, timeline
- Process enhanced insights on root cause analysis
- Ask user: "Accept these refined investigation findings? (y/n)"
- If yes, integrate into incident report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review incident investigation findings for multi-tenant AI platform"
- Process SRE and AI architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save investigation findings to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-mitigation-execution.md`

---

## Verification

- [ ] Logs and telemetry collected from all relevant sources
- [ ] Root cause hypothesis identified with evidence
- [ ] Affected components mapped
- [ ] Timeline documented
- [ ] AI-specific factors assessed

---

## Outputs

- Investigation findings document
- Root cause hypothesis
- Affected components map
- Event timeline

---

## Next Step

Proceed to `step-04-c-mitigation-execution.md` to execute mitigation.
