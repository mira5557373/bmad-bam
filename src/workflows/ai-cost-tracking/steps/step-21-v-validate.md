# Step 21: Validate AI Cost Tracking Architecture

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

---

## Purpose

Validate the AI cost tracking architecture against FinOps best practices, ensuring complete metering, attribution, aggregation, and billing integration.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-operations

---

## Inputs

- Loaded artifact from validation step 20
- Pattern registry for validation rules

---

## Actions

Perform the following validation checks:

### Validation Checklist

### Token Metering
- [ ] Token counting strategy defined
- [ ] Pricing schema documented
- [ ] Real-time metering designed
- [ ] Tenant attribution specified

### Compute Attribution
- [ ] Cost categories cataloged
- [ ] Attribution rules defined
- [ ] Tier multipliers configured
- [ ] Cost event schema specified

### Aggregation Pipeline
- [ ] Streaming architecture designed
- [ ] Aggregation windows configured
- [ ] Allocation rules specified
- [ ] Multi-currency supported

### Billing Integration
- [ ] Export formats specified
- [ ] Invoice workflow defined
- [ ] Budget alerts configured
- [ ] Anomaly detection designed

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All 4 components defined, attribution verified, billing ready |
| **CONDITIONAL** | Minor gaps with mitigation plan |
| **FAIL** | Missing metering, undefined attribution, or no billing integration |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and FinOps perspectives on validation results
- **C (Continue)**: Accept validation results and generate report
- **[Specific findings]**: Describe findings to investigate further

Select an option:
```

#### If 'C' (Continue):
- Document validation results
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per component

---

## Outputs

- Validation report
- Pass/Fail determination
- Specific findings per component

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
