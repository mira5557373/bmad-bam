# Step 21: Validate AI Usage Analytics Design

## Purpose

Validate completeness and quality of AI usage analytics design.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all actions in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each action produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 20 completed successfully
- AI usage analytics design artifact loaded
- Expected structure sections identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

Execute validation checks against the loaded artifact.

---

## Verification

### AI Metrics
- [ ] Token metrics defined with granularity
- [ ] Latency metrics with targets
- [ ] Quality metrics established
- [ ] Model metrics included

### Tracking Architecture
- [ ] Collection pipeline documented
- [ ] Event schema defined
- [ ] Storage strategy established
- [ ] Real-time processing configured

### Cost Attribution
- [ ] Cost components defined
- [ ] Pricing matrix documented
- [ ] Attribution rules established
- [ ] Billing integration planned

### Dashboards
- [ ] Tenant dashboards defined
- [ ] Operator dashboards defined
- [ ] Alerting configured
- [ ] Reports scheduled

---

## Gate Decision

- **PASS**: All analytics components complete
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
- Proceed to: `step-22-v-report.md`

---

## Next Step

Proceed to `step-22-v-report.md`.
