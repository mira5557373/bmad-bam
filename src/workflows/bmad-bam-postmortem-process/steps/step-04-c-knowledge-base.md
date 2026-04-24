# Step 4: Knowledge Base

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices

---

## Purpose

Build incident learning repository for pattern identification and cross-team knowledge sharing.

---

## Prerequisites

- Step 1: Template Design completed
- Step 2: Facilitation Guide completed
- Step 3: Action Tracking completed

---

## Actions

### 1. Searchable Incident Database

Design database structure:

| Field | Type | Purpose |
|-------|------|---------|
| Incident ID | String | Unique identifier |
| Severity | Enum | SEV-1 to SEV-4 |
| Root Cause Category | Enum | Infrastructure, Code, Config, etc. |
| Affected Services | Array | Services involved |
| Affected Tenants | Array | Tenant IDs (anonymized for sharing) |
| Tags | Array | Searchable keywords |
| Resolution Time | Duration | Time to resolve |

### 2. Pattern Identification

Configure pattern detection:

| Pattern Type | Detection Method | Action |
|--------------|------------------|--------|
| Recurring Root Cause | >2 incidents same cause in 30 days | Mandatory architecture review |
| Service Hotspot | >3 incidents same service in 30 days | Service reliability review |
| Time-based Pattern | Incidents at specific times | Schedule optimization |
| Tenant Impact Pattern | Same tenant affected multiple times | Tenant-specific review |

### 3. Trend Analysis Dashboard

Define metrics and visualizations:

| Metric | Visualization | Frequency |
|--------|---------------|-----------|
| MTTR by severity | Line chart | Weekly |
| Incidents by category | Pie chart | Monthly |
| Action completion rate | Progress bar | Weekly |
| Recurrence rate | Trend line | Monthly |

### 4. Cross-Team Learning

Enable knowledge sharing:

- Weekly incident digest email
- Monthly learning session (20 min)
- Quarterly incident review meeting
- Integration with runbook updates
- Automatic runbook suggestions based on resolution

**Verify current best practices with web search:**
Search the web: "incident knowledge base design {date}"
Search the web: "SRE incident learning repository {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into knowledge management
- **P (Party Mode)**: Bring documentation perspectives
- **C (Continue)**: Finalize postmortem process
```

#### If 'C' (Continue):
- Save complete postmortem process to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final artifact

---

## Verification

- [ ] Incident database designed
- [ ] Pattern identification configured
- [ ] Trend analysis dashboards specified
- [ ] Cross-team learning processes defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Knowledge base design document
- Incident database schema specification
- Pattern identification configuration
- Trend analysis dashboard specification

---

## Workflow Complete

Create mode complete for postmortem-process workflow.
