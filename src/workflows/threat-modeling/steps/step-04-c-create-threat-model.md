# Step 4: Create Threat Model Document

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

Assemble the comprehensive threat model document incorporating attack surface analysis, STRIDE threats, and mitigations from previous steps.

## Prerequisites

- Attack surface defined in Step 1
- STRIDE analysis in Step 2
- Mitigations defined in Step 3
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security


---

## Inputs

- All outputs from Steps 1-3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Template: `{project-root}/_bmad/bam/templates/threat-model-template.md`

---

## Actions

### 1. Assemble Document

Using the threat model template, compile:

| Section | Source | Status |
|---------|--------|--------|
| Executive Summary | New | Draft |
| System Overview | Step 1 | Complete |
| Attack Surface | Step 1 | Complete |
| STRIDE Analysis | Step 2 | Complete |
| Mitigation Strategies | Step 3 | Complete |
| Risk Register | New | Draft |
| Review Schedule | New | Draft |

### 2. Create Risk Register

Consolidate threats into risk register:

| ID | Threat | Risk | Status | Owner | Due Date |
|----|--------|------|--------|-------|----------|
| TM-001 | Prompt injection | High | Open | AI Team | Q1 |
| TM-002 | Cross-tenant leak | High | Open | Platform | Q1 |
| TM-003 | Token exhaustion | High | Open | Platform | Q2 |

### 3. Document Threat Scenarios

Create threat scenario narratives:

| Scenario | Actor | Goal | Steps | Impact |
|----------|-------|------|-------|--------|
| Tenant data theft | Malicious user | Access other tenant data | 1. Exploit RLS 2. Exfiltrate | Critical |
| AI jailbreak | Attacker | Bypass guardrails | 1. Craft prompt 2. Extract data | High |
| DoS attack | Competitor | Disrupt service | 1. Token flood 2. Exhaust resources | High |

### 4. Schedule Reviews

Define review cadence:

| Review Type | Frequency | Trigger | Participants |
|-------------|-----------|---------|--------------|
| Scheduled | Quarterly | Calendar | Security team |
| Change-driven | Per change | Major release | Dev + Security |
| Incident-driven | Per incident | Post-incident | CSIRT |

**Verify current best practices with web search:**
Search the web: "threat model documentation best practices {date}"
Search the web: "risk register management {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A]nalyze Options
- **A1**: Review document completeness
- **A2**: Analyze risk register accuracy
- **A3**: Evaluate threat scenarios
- **A4**: Assess review schedule

### [P]ropose Changes
- **P1**: Propose additional scenarios
- **P2**: Propose risk register additions
- **P3**: Suggest review modifications
- **P4**: Recommend document enhancements

### [C]ontinue
- **C1**: Finalize threat model
- **C2**: Mark workflow complete and output to `{output_folder}/planning-artifacts/threat-model.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All sections populated
- [ ] Risk register complete
- [ ] Threat scenarios documented
- [ ] Review schedule defined
- [ ] Document ready for approval

## Outputs

- `{output_folder}/planning-artifacts/threat-model.md`

## Next Step

Workflow complete. Output threat model to designated location.
