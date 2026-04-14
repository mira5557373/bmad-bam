# Step 2: Detection Methods

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

Design bias detection methods and fairness metrics for the AI system.

## Prerequisites

- Bias taxonomy defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-testing, llmops
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design bias detection methods:

## Statistical Parity Metrics

**Demographic Parity:**
- Selection rate equality across groups
- Acceptance rate balance
- Recommendation frequency parity

**Formulas:**
| Metric | Definition | Threshold |
|--------|------------|-----------|
| Demographic Parity Ratio | P(Y=1|A=0) / P(Y=1|A=1) | 0.8 - 1.25 |
| Statistical Parity Difference | P(Y=1|A=0) - P(Y=1|A=1) | [-0.1, 0.1] |

## Equal Opportunity Metrics

**True Positive Rate Parity:**
- Equal accuracy across protected groups
- False negative rate balance
- Recall parity

**Equalized Odds:**
- TPR and FPR equality across groups
- Error rate balance

**Formulas:**
| Metric | Definition | Threshold |
|--------|------------|-----------|
| Equal Opportunity Difference | TPR(A=0) - TPR(A=1) | [-0.1, 0.1] |
| Equalized Odds Difference | max(TPR diff, FPR diff) | [-0.1, 0.1] |

## Calibration Metrics

**Predictive Value Parity:**
- Precision equality across groups
- Confidence calibration per group

**Sufficiency:**
- Outcome independence given prediction

## Adversarial Bias Testing

**Counterfactual Testing:**
- Input perturbation (change protected attributes)
- Output comparison for bias detection
- Sensitivity analysis

**Red Team Testing:**
- Intentional bias elicitation prompts
- Stereotype completion tests
- Controversial topic probing

**Test Coverage:**
| Bias Type | Test Method | Frequency |
|-----------|-------------|-----------|
| Selection | Demographic slicing | Daily |
| Ranking | Position analysis | Daily |
| Content | Counterfactual | Weekly |
| Interaction | A/B testing | Continuous |

Output: Detection methods document with metrics and thresholds.

**Verify current best practices with web search:**
Search the web: "AI fairness metrics best practices {date}"
Search the web: "bias detection methods LLM systems {date}"

_Source: [URL]_

## COLLABORATION MENUS (A/P/C):

After completing the detection methods design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into detection metrics and threshold calibration
- **P (Party Mode)**: Bring Data Scientist, AI Ethics Researcher, and QA Engineer perspectives
- **C (Continue)**: Accept detection methods and proceed to Step 3: Monitoring Dashboards
- **Refine metrics**: Describe specific metric concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: statistical metrics, adversarial testing, thresholds
- Process enhanced insights
- Ask user: "Accept these refined detection methods? (y/n)"
- If yes, integrate into detection document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review bias detection methods for AI fairness monitoring"
- Process Data Scientist, AI Ethics Researcher, QA Engineer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save detection methods to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-monitoring-dashboards.md`

---

## Verification

- [ ] Statistical parity metrics defined
- [ ] Equal opportunity metrics specified
- [ ] Calibration metrics documented
- [ ] Adversarial testing approaches established
- [ ] Thresholds calibrated
- [ ] Patterns align with pattern registry

## Outputs

- Detection methods document
- Metrics and thresholds
- **Load template:** `{project-root}/_bmad/bam/templates/bias-detection-template.md`

## Next Step

Proceed to `step-03-c-monitoring-dashboards.md` to design fairness monitoring interfaces.
