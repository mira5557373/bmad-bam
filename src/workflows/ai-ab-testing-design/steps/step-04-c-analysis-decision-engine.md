# Step 4: Analysis and Decision Engine

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

Design the experiment analysis and decision engine including automated winner detection, early stopping rules, multi-armed bandit integration, and decision documentation.

---

## Prerequisites

- Steps 1-3 completed with framework, variants, and metrics
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-testing

---

## Inputs

- Experiment framework from Step 1
- Variant management from Step 2
- Metrics collection from Step 3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Design Winner Detection

Define automated winner detection:

| Detection Type | Criteria | Action |
|----------------|----------|--------|
| Clear Winner | 95% confidence, 5% lift | Auto-promote |
| Clear Loser | 95% confidence, -2% lift | Auto-rollback |
| Inconclusive | No significance after max duration | Manual review |
| Guardrail Breach | Any guardrail violated | Immediate stop |

### 2. Configure Early Stopping Rules

Specify early stopping criteria:

| Rule | Condition | Action |
|------|-----------|--------|
| Futility | <5% chance of winning | Stop experiment |
| Success | >99% posterior probability | Declare winner |
| Safety | Guardrail breached | Emergency stop |
| Duration | Max experiment length reached | Force decision |

### 3. Design Multi-Armed Bandit Integration

Configure adaptive allocation:

| Algorithm | Use Case | Trade-off |
|-----------|----------|-----------|
| Thompson Sampling | General optimization | Explore/exploit balance |
| UCB | Known variance | Optimistic exploration |
| Epsilon-greedy | Simple baseline | Fixed exploration |
| Contextual Bandit | Per-user optimization | Feature-based |

### 4. Implement Decision Documentation

Design decision audit trail:

| Record | Content | Retention |
|--------|---------|-----------|
| Experiment Summary | Hypothesis, variants, duration | Permanent |
| Statistical Results | p-values, confidence intervals | Permanent |
| Decision Rationale | Winner selection reasoning | Permanent |
| Impact Analysis | Measured vs expected impact | 2 years |
| Lessons Learned | What to improve | Permanent |

**Verify current best practices with web search:**
Search the web: "multi-armed bandit LLM optimization {date}"
Search the web: "experiment decision automation ML {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the analysis engine design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into bandit algorithms or decision logic
- **P (Party Mode)**: Bring data science and product perspectives
- **C (Continue)**: Accept analysis engine design and complete Create mode
- **[Specific refinements]**: Describe analysis concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save analysis engine design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final A/B testing architecture document
- Workflow Create mode complete

---

## Verification

- [ ] Winner detection rules defined
- [ ] Early stopping configured
- [ ] Bandit integration designed
- [ ] Decision documentation specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Analysis engine specification
- Decision automation rules
- Bandit algorithm configuration
- **Output to:** `{output_folder}/planning-artifacts/architecture/ai-ab-testing-design.md`

---

## Next Step

Create mode complete. Proceed to validation or downstream workflows.
