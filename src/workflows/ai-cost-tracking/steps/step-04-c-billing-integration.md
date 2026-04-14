# Step 4: Billing Integration Design

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

---

## Purpose

Design billing system integration including usage export formats, invoice generation, budget alerts, and cost anomaly detection.

---

## Prerequisites

- Steps 1-3 completed with metering, attribution, and aggregation
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-operations

---

## Inputs

- Cost aggregation design from Steps 1-3
- Billing system requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Design Usage Export Formats

Specify export schemas:

| Format | Purpose | Frequency |
|--------|---------|-----------|
| CSV | Manual review | On-demand |
| JSON | API integration | Real-time |
| Parquet | Analytics | Daily |
| Billing API | Invoice system | Hourly |

### 2. Configure Invoice Generation

Define invoicing workflow:

| Stage | Trigger | Output |
|-------|---------|--------|
| Usage Finalization | End of period | Locked usage |
| Cost Calculation | Post-finalization | Line items |
| Invoice Creation | Calculation complete | Draft invoice |
| Review Period | Creation + 3 days | Adjustments |
| Finalization | Review complete | Final invoice |

### 3. Design Budget Alerts

Specify alert configuration:

| Alert Type | Threshold | Action |
|------------|-----------|--------|
| Warning | 75% of budget | Email notification |
| Critical | 90% of budget | Email + Slack |
| Exceeded | 100% of budget | Email + escalation |
| Projected | Forecast exceeds | Weekly digest |

### 4. Implement Anomaly Detection

Design cost anomaly detection:

| Detection | Method | Response |
|-----------|--------|----------|
| Spike | >3x rolling average | Alert + investigate |
| Trend | Sustained increase | Weekly report |
| Pattern Break | ML anomaly detection | Alert + flag |
| Budget Risk | Forecast model | Proactive alert |

**Verify current best practices with web search:**
Search the web: "AI cost anomaly detection billing {date}"
Search the web: "usage-based billing integration SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the billing integration analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into invoicing or anomaly detection
- **P (Party Mode)**: Bring FinOps and product perspectives
- **C (Continue)**: Accept billing integration and complete Create mode
- **[Specific refinements]**: Describe billing concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save billing integration design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final cost tracking architecture document
- Workflow Create mode complete

---

## Verification

- [ ] Export formats specified
- [ ] Invoice workflow defined
- [ ] Budget alerts configured
- [ ] Anomaly detection designed
- [ ] Patterns align with pattern registry

---

## Outputs

- Billing integration specification
- Alert configuration
- Anomaly detection design
- **Output to:** `{output_folder}/planning-artifacts/architecture/ai-cost-tracking-design.md`

---

## Next Step

Create mode complete. Proceed to validation or downstream workflows.
