# Step 4: Assign Complexity Scores

Calculate final complexity classification from assessment scores:

## Scoring Formula

**Total Score:** Sum of Q1 through Q8 (range: 0-16)

| Total Score | Classification |
|-------------|----------------|
| 0-4         | SIMPLE         |
| 5-10        | STANDARD       |
| 11-16       | COMPLEX        |

## One-Way Upgrade Rule

If ANY single question scores 2 (Complex) AND total score >= 5, upgrade classification to COMPLEX.

**Rationale:** A single highly complex factor (e.g., multi-agent AI, HIPAA compliance) dominates overall implementation complexity regardless of other simple factors.

## Score Summary Table

| Question | Factor | Score | Evidence |
|----------|--------|-------|----------|
| Q1 | Entity Count | | |
| Q2 | Business Rules | | |
| Q3 | AI Involvement | | |
| Q4 | Data Volume | | |
| Q5 | Dependency Count | | |
| Q6 | Event Complexity | | |
| Q7 | External Integrations | | |
| Q8 | Compliance Requirements | | |
| **Total** | | | |

**Classification:** [SIMPLE | STANDARD | COMPLEX]

**Output:** Completed score table and final classification with upgrade rule applied if applicable.
