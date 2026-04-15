# Step 2: Design Prediction Model

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Design prediction model architecture for churn detection.

---

## Prerequisites

- Step 1 completed (Indicators identified)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Model Architecture Options

| Approach | Pros | Cons | Use When |
|----------|------|------|----------|
| Rule-Based | Explainable, fast | Less adaptive | <1000 tenants |
| ML Classification | Adaptive, accurate | Black box | >1000 tenants |
| Hybrid | Best of both | Complex | Enterprise tier |
| Survival Analysis | Time-to-event | Requires history | Mature platform |

### 2. Feature Engineering

| Feature Category | Examples | Transformation |
|------------------|----------|----------------|
| Temporal | Login trend, usage decay | Rolling averages |
| Behavioral | Feature mix, path patterns | Embeddings |
| Comparative | Peer benchmarks | Percentile ranks |
| Derived | Health score delta | Calculations |

### 3. Model Pipeline

| Stage | Component | Purpose |
|-------|-----------|---------|
| Ingestion | Event stream | Real-time data |
| Features | Feature store | Computed metrics |
| Prediction | Model inference | Risk scores |
| Output | Score API | Downstream systems |

### 4. Training Strategy

| Aspect | Approach | Rationale |
|--------|----------|-----------|
| Training Data | 12+ months history | Seasonal patterns |
| Validation | Time-based split | Avoid leakage |
| Retraining | Monthly | Model drift |
| A/B Testing | Shadow scoring | Validate updates |

**Verify current best practices with web search:**
Search the web: "churn prediction model architecture SaaS {date}"
Search the web: "customer churn ML pipeline design {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into model selection
- **P (Party Mode)**: Bring ML engineering and data science perspectives
- **C (Continue)**: Accept model design and proceed to scoring
```

#### If 'C' (Continue):
- Save model architecture to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-scoring.md`

---

## Verification

- [ ] Model approach selected
- [ ] Features engineered
- [ ] Pipeline documented
- [ ] Training strategy defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Model architecture specification
- Feature engineering plan
- Training pipeline design

---

## Next Step

Proceed to `step-03-c-design-scoring.md` to design risk scoring.
