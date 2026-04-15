# Step 1: Conduct Threshold Analysis

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

Conduct threshold analysis to determine whether a DPIA is required per GDPR Article 35 criteria, including high-risk processing evaluation.

## Prerequisites

- Processing activity description available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance


---

## Actions

### 1. Evaluate High-Risk Criteria (Article 35(3))

| Criterion | Description | Applicable |
|-----------|-------------|------------|
| Systematic evaluation | Profiling with legal/significant effects | {Yes/No} |
| Large-scale special categories | Art. 9/10 data processing | {Yes/No} |
| Public monitoring | Systematic monitoring of public area | {Yes/No} |

### 2. Assess WP29 Guidelines Criteria

| WP29 Criterion | Description | Score |
|----------------|-------------|-------|
| Evaluation/scoring | Performance assessment, profiling | {0-1} |
| Automated decision | Legal or similar significant effects | {0-1} |
| Systematic monitoring | Observation, tracking, surveillance | {0-1} |
| Sensitive data | Special categories, Art. 9 | {0-1} |
| Large scale | Volume, geographic, data subjects | {0-1} |
| Matching/combining | Multiple datasets, unexpected purposes | {0-1} |
| Vulnerable subjects | Children, employees, patients | {0-1} |
| Innovative use | New technologies, novel approaches | {0-1} |
| Blocking effect | Prevents exercise of right/access | {0-1} |

**DPIA Required if 2+ criteria score 1**

### 3. Check Supervisory Authority Lists

| List Type | Processing Activity | On List |
|-----------|---------------------|---------|
| Blacklist (must DPIA) | {Activity description} | {Yes/No} |
| Whitelist (no DPIA) | {Activity description} | {Yes/No} |

### 4. Document Threshold Decision

| Decision Element | Value |
|------------------|-------|
| Article 35(3) triggered | {Yes/No} |
| WP29 criteria score | {X}/9 |
| Blacklist match | {Yes/No} |
| **DPIA Required** | {Yes/No} |
| Rationale | {Justification} |

**Verify current best practices with web search:**
Search the web: "GDPR DPIA threshold analysis criteria {date}"
Search the web: "Article 35 high risk processing guidance {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### [A] Analyse - Threshold Analysis
- **A1**: Analyze AI/ML processing high-risk indicators
- **A2**: Evaluate profiling and automated decision-making
- **A3**: Assess large-scale processing criteria
- **A4**: Review innovative technology triggers

### [P] Propose - Threshold Recommendations
- **P1**: Propose conservative DPIA approach
- **P2**: Suggest threshold documentation template
- **P3**: Recommend ongoing monitoring criteria
- **P4**: Propose DPIA scheduling for borderline cases

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 2 (Assess Privacy Risks) - load `step-02-c-assess-risks.md`
- **C2**: Return to workflow overview
- **C3**: Export current threshold analysis

---

## Verification

- [ ] Article 35(3) criteria evaluated
- [ ] WP29 guidelines assessed
- [ ] Supervisory authority lists checked
- [ ] Threshold decision documented
- [ ] Patterns align with pattern registry

## Outputs

- Threshold analysis checklist
- WP29 criteria scoring
- DPIA requirement decision

## Next Step

Proceed to `step-02-c-assess-risks.md` to assess privacy risks.
