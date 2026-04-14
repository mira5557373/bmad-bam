# Step 3: Design Mitigation Measures

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

Design risk mitigation measures including technical and organizational controls, assess residual risk, and evaluate DPA consultation requirements.

## Prerequisites

- Risk assessment completed (Step 2 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance


---

## Actions

### 1. Define Technical Measures

| Risk ID | Technical Measure | Implementation | Effectiveness |
|---------|-------------------|----------------|---------------|
| PR-001 | Encryption at rest | AES-256 | High |
| PR-001 | Access controls | RBAC + MFA | High |
| PR-002 | Breach detection | SIEM monitoring | Medium |
| PR-003 | Algorithm audit | Fairness testing | Medium |
| PR-004 | Data minimization | Field-level controls | High |

### 2. Define Organizational Measures

| Risk ID | Organizational Measure | Implementation | Effectiveness |
|---------|------------------------|----------------|---------------|
| PR-001 | Access review | Quarterly review | Medium |
| PR-002 | Incident response | 72-hour procedure | High |
| PR-003 | Human oversight | Review process | High |
| PR-005 | Privacy notices | Clear communication | High |

### 3. Assess Residual Risk

| Risk ID | Original Score | Mitigation | Residual Score | Acceptable |
|---------|----------------|------------|----------------|------------|
| PR-001 | {Original} | {Measures} | {Residual} | {Yes/No} |
| PR-002 | {Original} | {Measures} | {Residual} | {Yes/No} |

### 4. Evaluate DPA Consultation

| Criterion | Assessment | DPA Consultation |
|-----------|------------|------------------|
| Residual risk high | {Yes/No} | Required if Yes |
| No effective mitigation | {Yes/No} | Required if Yes |
| Novel processing | {Yes/No} | Consider |
| **DPA Consultation Required** | {Yes/No} | {Rationale} |

**Verify current best practices with web search:**
Search the web: "DPIA mitigation measures best practices {date}"
Search the web: "GDPR DPA consultation requirements {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-3 complete the threshold analysis, risk assessment, and mitigation planning.**

Present summary to user:
- DPIA requirement decision
- Risk assessment results
- Mitigation measures

Ask for confirmation before proceeding to PIA/DPIA specification creation.

---

## COLLABORATION MENUS (A/P/C)

### [A] Analyse - Mitigation Analysis
- **A1**: Analyze technical measure effectiveness
- **A2**: Evaluate organizational measure adequacy
- **A3**: Assess residual risk acceptability
- **A4**: Review DPA consultation criteria

### [P] Propose - Mitigation Recommendations
- **P1**: Propose additional technical controls
- **P2**: Suggest organizational process improvements
- **P3**: Recommend residual risk acceptance criteria
- **P4**: Propose ongoing monitoring approach

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 4 (Create PIA Spec) - load `step-04-c-create-pia-spec.md`
- **C2**: Return to workflow overview
- **C3**: Export current mitigation design

---

## Verification

- [ ] Technical measures defined
- [ ] Organizational measures defined
- [ ] Residual risk assessed
- [ ] DPA consultation evaluated
- [ ] Patterns align with pattern registry

## Outputs

- Technical measures matrix
- Organizational measures matrix
- Residual risk assessment
- DPA consultation decision

## Next Step

Proceed to `step-04-c-create-pia-spec.md` to create the comprehensive PIA/DPIA specification.
