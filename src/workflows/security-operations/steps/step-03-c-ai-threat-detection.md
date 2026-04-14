# Step 3: AI Threat Detection Activation

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices


---

## Purpose

Enable AI-specific threat detection for the multi-tenant AI platform. This includes detecting prompt injection, model manipulation, agent escalation, and AI-powered attacks.

---

## Prerequisites

- Step 2 completed (correlation rules configured)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `ai-safety`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `guardrails`

---

## Actions

### 1. Define AI Threat Categories

Document AI-specific threats:

| Category | Threat | Description | Impact |
|----------|--------|-------------|--------|
| Prompt Injection | Jailbreak | User bypasses safety | Agent compromise |
| Prompt Injection | Data extraction | User extracts training data | Data leak |
| Model Abuse | Resource exhaustion | User consumes excessive tokens | Cost spike |
| Agent Escalation | Tool misuse | Agent accesses unauthorized tools | Security breach |
| Cross-Tenant | Context leak | Agent leaks tenant data | Privacy violation |

### 2. Configure AI Detection Rules

| Rule ID | Threat | Detection Method | Action |
|---------|--------|------------------|--------|
| AI-001 | Jailbreak | Pattern matching + classifier | Log + Alert |
| AI-002 | Data extraction | Output analysis | Block + Alert |
| AI-003 | Resource exhaustion | Token tracking | Throttle + Alert |
| AI-004 | Tool misuse | Permission check | Block + Critical |
| AI-005 | Context leak | Output inspection | Block + Critical |

### 3. AI Monitoring Infrastructure

Configure AI-specific monitoring:
- [ ] Prompt logging (with PII handling)
- [ ] Response monitoring
- [ ] Token usage tracking per tenant
- [ ] Tool invocation logging
- [ ] Agent state inspection

### 4. AI-Specific Alerting

| Alert | Condition | Severity | Response |
|-------|-----------|----------|----------|
| Jailbreak detected | Pattern match | High | Review + tune |
| Token spike | >200% baseline | Medium | Investigate |
| Unauthorized tool | Tool access denied | Critical | Block + alert |
| Context leak possible | Cross-tenant pattern | Critical | Block + review |

**Verify current best practices with web search:**
Search the web: "AI security threat detection LLM {date}"
Search the web: "prompt injection detection techniques {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing AI threat detection, if 'C' (Continue):
- Save AI detection configuration to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-hunting-capabilities.md`

---

## Verification

- [ ] AI threat categories defined
- [ ] AI detection rules configured
- [ ] AI monitoring infrastructure set up
- [ ] AI-specific alerting configured
- [ ] Patterns align with pattern registry

---

## Outputs

- AI threat detection configuration
- AI monitoring setup
- AI alerting rules

---

## Next Step

Proceed to `step-04-c-hunting-capabilities.md` to establish threat hunting processes.
