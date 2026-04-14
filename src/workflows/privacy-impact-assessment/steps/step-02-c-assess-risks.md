# Step 2: Assess Privacy Risks

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Evaluate privacy risks associated with the processing activity including impact assessment, likelihood evaluation, and risk scoring.

## Prerequisites

- Threshold analysis completed (Step 1 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance


---

## Actions

### 1. Identify Privacy Risks

| Risk ID | Risk Description | Data Subjects Affected | Rights Impacted |
|---------|------------------|------------------------|-----------------|
| PR-001 | Unauthorized access to personal data | {Group} | Confidentiality |
| PR-002 | Data breach/disclosure | {Group} | Security |
| PR-003 | Inaccurate profiling decisions | {Group} | Accuracy |
| PR-004 | Excessive data collection | {Group} | Minimization |
| PR-005 | Lack of transparency | {Group} | Information rights |

### 2. Assess Impact Severity

| Impact Level | Description | Examples |
|--------------|-------------|----------|
| Critical | Severe, irreversible harm | Identity theft, discrimination |
| High | Significant harm, difficult recovery | Financial loss, reputation |
| Medium | Noticeable harm, recoverable | Inconvenience, minor distress |
| Low | Minimal harm | Minor annoyance |

### 3. Evaluate Likelihood

| Likelihood | Description | Probability |
|------------|-------------|-------------|
| Very High | Almost certain to occur | >90% |
| High | Likely to occur | 60-90% |
| Medium | Possible to occur | 30-60% |
| Low | Unlikely to occur | <30% |

### 4. Calculate Risk Score

| Risk ID | Impact | Likelihood | Risk Score | Priority |
|---------|--------|------------|------------|----------|
| PR-001 | {Level} | {Level} | {Score} | {High/Medium/Low} |
| PR-002 | {Level} | {Level} | {Score} | {High/Medium/Low} |

Risk Score Matrix:
- Critical + Very High = Extreme (unacceptable)
- Critical + High = Very High (mitigation required)
- High + Very High = High (mitigation required)
- Medium + Medium = Medium (consider mitigation)

**Verify current best practices with web search:**
Search the web: "DPIA risk assessment methodology {date}"
Search the web: "privacy risk scoring framework {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### [A] Analyse - Risk Analysis
- **A1**: Analyze AI-specific privacy risks
- **A2**: Evaluate multi-tenant data isolation risks
- **A3**: Assess cross-border transfer risks
- **A4**: Review automated decision-making risks

### [P] Propose - Risk Recommendations
- **P1**: Propose risk scoring calibration
- **P2**: Suggest risk registry template
- **P3**: Recommend risk monitoring approach
- **P4**: Propose risk acceptance criteria

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 3 (Design Mitigation) - load `step-03-c-design-mitigation.md`
- **C2**: Return to workflow overview
- **C3**: Export current risk assessment

---

## Verification

- [ ] All privacy risks identified
- [ ] Impact severity assessed
- [ ] Likelihood evaluated
- [ ] Risk scores calculated
- [ ] Patterns align with pattern registry

## Outputs

- Privacy risk inventory
- Impact assessment matrix
- Risk scoring results

## Next Step

Proceed to `step-03-c-design-mitigation.md` to design mitigation measures.
