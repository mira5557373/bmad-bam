# Step 4: Remediation Workflows

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Define bias incident response and remediation workflows.

## Prerequisites

- Monitoring dashboards designed (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: resilience

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define bias incident remediation workflows:

## Escalation Procedures

**Severity-Based Escalation:**
```
CRITICAL (Metric < 0.7)
    │
    ├── 0-15 min: AI Ethics Lead notified
    ├── 15-30 min: ML Engineering engaged
    ├── 30-60 min: Product Lead + Legal consulted
    └── 60+ min: CISO + Executive escalation
```

**Escalation Matrix:**
| Severity | Initial Responder | Escalation 1 | Escalation 2 | Executive |
|----------|-------------------|--------------|--------------|-----------|
| Critical | AI Ethics | ML Lead | CPO | CEO/CISO |
| High | ML Engineer | AI Ethics | Product Lead | CPO |
| Medium | QA Engineer | ML Engineer | AI Ethics | - |
| Low | Automated | QA Engineer | - | - |

## Remediation Actions

**Immediate Actions:**
| Severity | Action | Timeframe |
|----------|--------|-----------|
| Critical | Model rollback | < 1 hour |
| Critical | Feature flag disable | < 15 min |
| High | Output filtering | < 4 hours |
| Medium | Model retrain schedule | < 1 week |
| Low | Documentation update | < 2 weeks |

**Long-Term Remediation:**
- Training data augmentation
- Model architecture changes
- Prompt engineering updates
- Guardrail configuration tuning
- Evaluation metric refinement

## Documentation Requirements

**Incident Report Template:**
- Incident ID and timestamp
- Affected protected groups
- Metrics that triggered alert
- Root cause analysis
- Remediation actions taken
- Verification of fix
- Prevention measures

**Audit Trail:**
- All bias incidents logged immutably
- Decision rationale documented
- Remediation verification recorded
- Post-incident review scheduled

## Compliance Reporting

**Regulatory Requirements:**
| Regulation | Reporting Requirement | Frequency |
|------------|----------------------|-----------|
| EU AI Act | High-risk incident disclosure | As needed |
| GDPR | Automated decision auditing | Quarterly |
| ECOA | Fair lending compliance | Annual |
| EEOC | Employment decision fairness | Annual |

**Stakeholder Reports:**
- Board/executive summary (quarterly)
- Regulatory filing support
- Customer transparency reports (enterprise)

## Soft Gate Checkpoint

**Steps 1-4 complete the bias monitoring design.**

Present summary of:
- Bias taxonomy with protected attributes
- Detection methods and metrics
- Monitoring dashboards and alerts
- Remediation workflows and compliance

Ask for confirmation before completing the workflow.

Output: Remediation workflow documentation with compliance reporting.

**Verify current best practices with web search:**
Search the web: "AI bias incident response best practices {date}"
Search the web: "ML fairness remediation workflows {date}"

_Source: [URL]_

## COLLABORATION MENUS (A/P/C):

After completing the remediation workflows design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into incident response and compliance requirements
- **P (Party Mode)**: Bring Legal Counsel, Compliance Officer, and AI Ethics Lead perspectives
- **C (Continue)**: Accept remediation workflows and finalize bias monitoring document
- **Refine escalation**: Describe specific workflow concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: escalation matrix, remediation actions, compliance
- Process enhanced insights
- Ask user: "Accept these refined workflows? (y/n)"
- If yes, integrate into workflow document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review bias remediation workflows for AI fairness compliance"
- Process Legal Counsel, Compliance Officer, AI Ethics Lead perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save complete bias monitoring document to output location
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final `bias-monitoring.md` artifact
- Present quality gate validation summary

---

## Verification

- [ ] Escalation procedures defined
- [ ] Remediation actions specified
- [ ] Documentation requirements established
- [ ] Compliance reporting configured
- [ ] Audit trail requirements met
- [ ] Patterns align with pattern registry

## Outputs

- `{output_folder}/planning-artifacts/quality/bias-monitoring.md`
- Remediation workflow documentation
- Compliance reporting templates
- **Load template:** `{project-root}/_bmad/bam/templates/ai-bias-monitoring-template.md`

## Workflow Complete

Bias monitoring design complete. Run `bmad-bam-ai-eval-safety-design` to integrate with overall safety strategy.
