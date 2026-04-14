# Step 2: Design Baseline Collection

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design baseline collection methodology and anomaly detection.

---

## Prerequisites

- Step 1 completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: observability

---

## Actions

### 1. Collection Methodology

| Method | Use Case | Duration | Frequency |
|--------|----------|----------|-----------|
| Initial baseline | New system/metric | 2-4 weeks | One-time |
| Rolling baseline | Ongoing comparison | 7-30 days | Continuous |
| Seasonal baseline | Cyclical patterns | 1 year | Annual |
| Event baseline | Before/after comparison | Variable | Per event |

### 2. Statistical Analysis

| Technique | Purpose | Application |
|-----------|---------|-------------|
| Mean/median | Central tendency | Normal conditions |
| Standard deviation | Variability | Threshold calculation |
| Percentiles | Distribution analysis | SLO definition |
| Trend analysis | Direction detection | Capacity planning |
| Correlation | Relationship mapping | Root cause analysis |

### 3. Anomaly Detection

| Method | Detection Type | Alert Threshold |
|--------|----------------|-----------------|
| Static threshold | Fixed limits | > 2x baseline |
| Dynamic threshold | Adaptive limits | > 3 std dev |
| ML-based | Pattern deviation | Confidence score |
| Seasonal adjustment | Time-aware | Seasonal norm + margin |

### 4. Capacity Integration

| Integration | Purpose | Trigger |
|-------------|---------|---------|
| Auto-scaling | Resource adjustment | > 80% capacity |
| Capacity alerts | Planning notification | > 70% trend |
| Forecasting | Future prediction | Weekly projection |
| Budget alerts | Cost planning | Budget threshold |

**Verify current best practices with web search:**
Search the web: "performance baseline collection best practices {date}"
Search the web: "ML anomaly detection observability {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing baseline collection design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into anomaly detection
- **P (Party Mode)**: Bring data science and SRE perspectives
- **C (Continue)**: Accept baseline collection and proceed to assembly
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save baseline collection to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-assembly.md`

---

## Verification

- [ ] Collection methodology defined
- [ ] Statistical analysis documented
- [ ] Anomaly detection established
- [ ] Capacity integration addressed
- [ ] Patterns align with pattern registry

---

## Outputs

- Collection methodology
- Anomaly detection rules
- Capacity integration design

---

## Next Step

Proceed to `step-03-c-assembly.md` to assemble final document.
