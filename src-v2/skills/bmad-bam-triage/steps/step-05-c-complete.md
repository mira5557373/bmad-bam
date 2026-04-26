# Step 05: Compile Triage Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 💬 **Present QG-PL1 soft gate checkpoint** before completion

## EXECUTION PROTOCOLS

- 🎯 Focus: Compile comprehensive triage report
- 💾 Track: `stepsCompleted: [1, 2, 3, 4, 5]` when complete
- 📖 Context: All triage findings from Steps 01-04
- 🚫 Do NOT: Re-analyze complexity (use existing findings)
- 🔍 Use web search: Verify report structure against industry standards
- ⚠️ Gate: QG-PL1 - Planning gate validation required

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Compiling all triage findings into report
- Generating executive summary
- Documenting recommendations
- Producing actionable roadmap

**OUT OF SCOPE:**
- Re-running complexity analysis (Steps 01-04)
- Detailed implementation planning
- Sprint-level breakdown

---

## Purpose

Compile the final module complexity triage report that synthesizes complexity scoring, prioritization decisions, and implementation phases into an actionable planning artifact.

---

## Prerequisites

- Step 04 completed: Implementation phases defined
- All triage data from Steps 01-04 available
- **Load template:** `{project-root}/_bmad/bam/data/templates/triage-report-template.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-pl1.md`

---

## Inputs

- Module list and complexity scores from Step 02
- Prioritized ordering from Step 03
- Phase definitions from Step 04
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Compile the comprehensive triage report and validate against QG-PL1.

---

## Main Sequence

### 1. Executive Summary

Compile high-level triage summary:

**Project:** {{project_name}}
**Date:** {{date}}
**Total Modules:** {{count}}
**Total Estimated Duration:** {{weeks}} weeks

| Complexity Band | Module Count | % of Total |
|-----------------|--------------|------------|
| High (7-10) | {{count}} | {{pct}}% |
| Medium (4-6) | {{count}} | {{pct}}% |
| Low (1-3) | {{count}} | {{pct}}% |

**Key Recommendations:**
1. {{recommendation_1}}
2. {{recommendation_2}}
3. {{recommendation_3}}

### 2. Module Complexity Summary

| Rank | Module | Composite Score | Risk Level | Phase | Est. Duration |
|------|--------|-----------------|------------|-------|---------------|
| 1 | {{module}} | {{score}} | High/Med/Low | {{phase}} | {{weeks}}w |
| 2 | {{module}} | {{score}} | High/Med/Low | {{phase}} | {{weeks}}w |
| ... | ... | ... | ... | ... | ... |

### 3. Dependency Analysis

**Dependency Graph Summary:**
- L0 Modules (no dependencies): {{count}}
- L1 Modules: {{count}}
- L2 Modules: {{count}}
- L3+ Modules: {{count}}

**Critical Path:**
{{module_a}} -> {{module_b}} -> {{module_c}} -> {{module_d}}

**Critical Path Duration:** {{weeks}} weeks

### 4. Implementation Roadmap

| Phase | Modules | Duration | Start | End | Quality Gates |
|-------|---------|----------|-------|-----|---------------|
| Phase 1 | {{modules}} | {{weeks}}w | Week 1 | Week {{n}} | QG-F1 |
| Phase 2 | {{modules}} | {{weeks}}w | Week {{n}} | Week {{n}} | QG-M1, QG-M2 |
| Phase 3 | {{modules}} | {{weeks}}w | Week {{n}} | Week {{n}} | QG-I1, QG-I2, QG-I3 |
| Phase 4 | {{modules}} | {{weeks}}w | Week {{n}} | Week {{n}} | QG-P1 |

### 5. Resource Requirements

| Phase | Team Size | Key Roles | Parallel Workstreams |
|-------|-----------|-----------|---------------------|
| Phase 1 | {{size}} | {{roles}} | {{streams}} |
| Phase 2 | {{size}} | {{roles}} | {{streams}} |
| Phase 3 | {{size}} | {{roles}} | {{streams}} |
| Phase 4 | {{size}} | {{roles}} | {{streams}} |

**Total Resource Summary:**
- Minimum team: {{min}} engineers
- Optimal team: {{optimal}} engineers
- Peak resource period: Phase {{n}}

### 6. Risk Assessment

| Risk Category | High Risk Modules | Mitigation Strategy |
|---------------|-------------------|---------------------|
| Technical | {{modules}} | {{strategy}} |
| Business | {{modules}} | {{strategy}} |
| Integration | {{modules}} | {{strategy}} |
| Multi-Tenant | {{modules}} | {{strategy}} |
| AI Runtime | {{modules}} | {{strategy}} |

### 7. QG-PL1 Validation

Validate triage report against planning gate requirements:

| Check | Status | Evidence |
|-------|--------|----------|
| All modules identified | PASS/FAIL | {{count}} modules documented |
| Complexity scored | PASS/FAIL | All 5 dimensions scored |
| Priorities assigned | PASS/FAIL | Ranked list complete |
| Dependencies mapped | PASS/FAIL | {{count}} dependencies documented |
| Phases defined | PASS/FAIL | {{count}} phases defined |
| Timeline estimated | PASS/FAIL | {{weeks}} weeks total |
| Resources estimated | PASS/FAIL | Team size recommendations |
| Risks documented | PASS/FAIL | {{count}} risks identified |

**QG-PL1 Status:** PASS / CONDITIONAL / FAIL

---

## Soft Gate Checkpoint (QG-PL1)

**Module Complexity Triage complete.**

Present summary to user:

```
TRIAGE SUMMARY:
- {{count}} modules analyzed
- {{high_count}} high-complexity modules identified
- {{phases}} implementation phases defined
- {{weeks}} weeks estimated total duration
- QG-PL1 Status: {{status}}

Accept this triage report and proceed?
```

---

## COLLABORATION MENUS (A/P/C):

After compiling the triage report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific findings or risk areas
- **P (Party Mode)**: Bring leadership perspectives on roadmap
- **C (Continue)**: Accept report and complete workflow
- **[Section]**: Describe specific section to refine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: triage report, risk areas, timeline concerns
- Process enhanced insights
- Ask user: "Accept these enhancements? (y/n)"
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review triage report and roadmap: {summary}"
- Process CTO, Product, and Engineering Manager perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Generate final triage report
- Write to: `{output_folder}/planning-artifacts/triage-report.md`
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Complete workflow

---

## SUCCESS METRICS:

- [ ] Executive summary captures key findings
- [ ] All modules included in roadmap
- [ ] Timeline estimates realistic
- [ ] Resource requirements documented
- [ ] Risk mitigation strategies defined
- [ ] QG-PL1 validated

---

## FAILURE MODES:

| Failure | Detection | Recovery |
|---------|-----------|----------|
| Missing modules | Module count mismatch | Return to Step 01 |
| Timeline unrealistic | Duration > 18 months | Reduce scope or add phases |
| QG-PL1 fails | Critical checks fail | Address failures before completing |

---

## Verification

- [ ] Triage report generated
- [ ] All sections populated
- [ ] QG-PL1 checkpoint completed
- [ ] Output file written

---

## Outputs

- Triage report: `{output_folder}/planning-artifacts/triage-report.md`
- Executive summary
- Implementation roadmap
- Risk assessment

---

## Next Step

Workflow complete. 

**Recommended next actions:**
1. Run `create-master-architecture` workflow to design system architecture
2. Use triage priorities to sequence module architecture work
3. Track progress against phase milestones

Run validation mode if quality gate verification required: `step-20-v-load.md`
