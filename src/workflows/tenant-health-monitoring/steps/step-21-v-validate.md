# Step 21: Validate Health Monitoring Design

## Purpose

Validate completeness and quality of health monitoring design.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all actions in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each action produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 20 completed successfully
- Health monitoring design artifact loaded
- Expected structure sections identified

---

## Actions

Execute validation checks against the loaded artifact.

---

## Verification

### Health Metrics
- [ ] Availability metrics defined with targets
- [ ] Performance metrics with percentiles
- [ ] Usage metrics identified
- [ ] Operational metrics established

### Health Scoring
- [ ] Scoring components with weights
- [ ] Algorithm documented
- [ ] Status mapping defined
- [ ] Trend analysis included

### Alerting Strategy
- [ ] Severity levels defined
- [ ] Alert rules documented
- [ ] Routing configured per tier
- [ ] Fatigue prevention addressed

### Remediation Procedures
- [ ] Auto-remediation rules defined
- [ ] Manual procedures documented
- [ ] Escalation path established
- [ ] Runbooks referenced

---

## Gate Decision

- **PASS**: All monitoring components complete
- **CONDITIONAL**: Minor gaps - document and proceed
- **FAIL**: Missing critical components - return to Create mode

---

## Outputs

- Validation checklist results
- Gate decision (PASS/CONDITIONAL/FAIL)
- Gap analysis if applicable

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Proceed to generate report
```

#### If 'C' (Continue):
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to: `step-22-v-generate-report.md`

---

## Next Step

Proceed to `step-22-v-generate-report.md`.
