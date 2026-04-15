# Step 4: Create DDoS Protection Plan

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- BOOK **CRITICAL: ALWAYS read the complete step file** before taking any action
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- TARGET **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- SEARCH Use web search to verify current best practices when making technology decisions

---

## Purpose

Assemble the comprehensive DDoS protection plan document.

## Prerequisites

- All previous steps completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Assemble Document

| Section | Source | Status |
|---------|--------|--------|
| Executive Summary | New | Draft |
| Attack Vector Analysis | Step 1 | Complete |
| Defense Layers | Step 2 | Complete |
| Tenant Fairness | Step 3 | Complete |
| Runbooks | New | Draft |
| Testing Schedule | New | Draft |

### 2. Define Runbooks

| Runbook | Trigger | Actions |
|---------|---------|---------|
| Volumetric Attack | >10Gbps traffic | Scale CDN, enable scrubbing |
| Application Attack | >10x normal RPS | Enable rate limits, scale |
| AI Exhaustion | Cost spike | Enable circuit breaker |
| Tenant Attack | Single tenant spike | Isolate, communicate |

### 3. Schedule Testing

| Test Type | Frequency | Scope |
|-----------|-----------|-------|
| Tabletop | Quarterly | Response procedures |
| Synthetic Attack | Semi-annual | Defense effectiveness |
| Chaos Engineering | Monthly | Resilience testing |
| Third-party Audit | Annual | Full assessment |

**Verify current best practices with web search:**
Search the web: "DDoS response runbook template {date}"
Search the web: "DDoS testing methodology {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### Menu Options

### [A]nalyze Options
- **A1**: Review document completeness
- **A2**: Analyze runbooks
- **A3**: Evaluate testing schedule

### [P]ropose Changes
- **P1**: Propose document additions
- **P2**: Propose runbook changes
- **P3**: Suggest testing adjustments

### [C]ontinue
- **C1**: Finalize DDoS protection plan
- **C2**: Mark workflow complete and output

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All sections populated
- [ ] Runbooks defined
- [ ] Testing schedule documented
- [ ] Document ready for approval

## Outputs

- `{output_folder}/planning-artifacts/ddos-protection-design.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/ddos-protection-template.md`

## Next Step

Workflow complete.
