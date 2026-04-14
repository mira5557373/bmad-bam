# Step 1: Template Design

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions

---

## Purpose

Create a comprehensive post-mortem document template that captures all relevant incident information.

---

## Prerequisites

- Incident management process defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: operations`

---

## Actions

### 1. Template Structure

Define post-mortem document sections:

| Section | Purpose | Required |
|---------|---------|----------|
| Incident Summary | Brief description, severity, duration | Yes |
| Impact Analysis | Affected tenants, services, metrics | Yes |
| Timeline | Chronological event sequence | Yes |
| Root Cause | Technical root cause identification | Yes |
| Contributing Factors | Process/system weaknesses | Yes |
| What Went Well | Effective response actions | Yes |
| What Could Improve | Areas for improvement | Yes |
| Action Items | Remediation with owners and deadlines | Yes |
| Appendix | Logs, graphs, supporting evidence | Optional |

### 2. Severity Classification

Define severity levels:

| Severity | Criteria | Review Timeline |
|----------|----------|-----------------|
| SEV-1 | Platform-wide outage, data loss risk | 24 hours |
| SEV-2 | Major feature unavailable, >10% tenants affected | 48 hours |
| SEV-3 | Minor feature degradation, <10% tenants affected | 72 hours |
| SEV-4 | Internal incident, no customer impact | 1 week |

### 3. Impact Categories

Define impact measurement:

| Category | Metrics |
|----------|---------|
| Availability | Uptime %, error rate |
| Tenant Impact | Number of tenants, tier distribution |
| Financial | Revenue impact, SLA credits |
| Reputation | Customer communications, ticket volume |

**Verify current best practices with web search:**
Search the web: "incident postmortem template best practices {date}"
Search the web: "blameless postmortem Google SRE {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into template sections
- **P (Party Mode)**: Bring operations and engineering perspectives
- **C (Continue)**: Accept template and proceed to facilitation guide
```

#### If 'C' (Continue):
- Save template design to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-facilitation-guide.md`

---

## Verification

- [ ] Template sections defined
- [ ] Severity levels documented
- [ ] Impact categories specified
- [ ] Patterns align with pattern registry

---

## Next Step

Proceed to `step-02-c-facilitation-guide.md` to create facilitation guidelines.
