# Step 2: Conduct Technology Evaluation

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

Conduct comprehensive technology evaluation including vendor/library comparison, multi-tenant support assessment, scalability evaluation, and cost analysis.

---

## Prerequisites

- Research scope initialized (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: technology-selection
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv` → for tenant isolation requirements

---

## Inputs

- Research plan from Step 1
- Evaluation criteria with weights
- Architecture constraints
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Vendor/Library Comparison Matrix

Build comparison matrix for candidate technologies:

| Criteria | Option A | Option B | Option C |
|----------|----------|----------|----------|
| **Multi-Tenant Support** | | | |
| - Native RLS support | Yes/No/Partial | | |
| - Per-tenant configuration | Yes/No/Partial | | |
| - Tenant isolation level | Row/Schema/Database | | |
| **Scalability** | | | |
| - Horizontal scaling | Native/Manual/None | | |
| - Performance benchmarks | {metrics} | | |
| - Connection pooling | Yes/No | | |
| **Maturity** | | | |
| - Version/Release | {version} | | |
| - Years in production | {years} | | |
| - Enterprise adoption | High/Medium/Low | | |
| **Support** | | | |
| - Documentation quality | Excellent/Good/Poor | | |
| - Community size | Large/Medium/Small | | |
| - Enterprise support | Yes/No/Cost | | |
| **Licensing** | | | |
| - License type | OSS/Commercial/Hybrid | | |
| - Compliance | SOC2/HIPAA/GDPR | | |

### 2. Multi-Tenant Support Assessment

For each candidate, evaluate tenant isolation capabilities:

#### 2.1 Data Isolation

| Aspect | Option A | Option B | Option C |
|--------|----------|----------|----------|
| Row-level security | | | |
| Schema separation | | | |
| Database-per-tenant | | | |
| Encryption at rest | | | |
| Encryption per tenant | | | |

#### 2.2 Configuration Isolation

| Aspect | Option A | Option B | Option C |
|--------|----------|----------|----------|
| Per-tenant settings | | | |
| Feature flags | | | |
| Rate limiting | | | |
| Resource quotas | | | |

#### 2.3 Runtime Isolation

| Aspect | Option A | Option B | Option C |
|--------|----------|----------|----------|
| Connection pooling | | | |
| Query performance isolation | | | |
| Noisy neighbor protection | | | |
| Tenant context propagation | | | |

### 3. Scalability Evaluation

Assess scaling characteristics:

#### 3.1 Horizontal Scaling

| Metric | Option A | Option B | Option C |
|--------|----------|----------|----------|
| Stateless design | Yes/No | | |
| Shard support | Native/Manual | | |
| Read replicas | Yes/No | | |
| Auto-scaling | Native/Manual | | |

#### 3.2 Performance Characteristics

| Metric | Option A | Option B | Option C |
|--------|----------|----------|----------|
| Latency (p50/p99) | {ms}/{ms} | | |
| Throughput | {ops/sec} | | |
| Memory footprint | {MB} | | |
| CPU efficiency | {metric} | | |

#### 3.3 Limits and Constraints

| Limit | Option A | Option B | Option C |
|-------|----------|----------|----------|
| Max connections | {n} | | |
| Max tenants | {n} | | |
| Data size limit | {GB/TB} | | |
| Rate limits | {req/sec} | | |

### 4. Cost Analysis

Build total cost of ownership model:

| Cost Component | Option A | Option B | Option C |
|----------------|----------|----------|----------|
| **Infrastructure** | | | |
| - Base cost (monthly) | ${amount} | | |
| - Per-tenant cost | ${amount} | | |
| - Storage cost | ${amount}/GB | | |
| **Licensing** | | | |
| - License fees | ${amount}/yr | | |
| - Per-seat cost | ${amount} | | |
| **Operational** | | | |
| - Support contract | ${amount}/yr | | |
| - Training estimate | ${amount} | | |
| **Development** | | | |
| - Integration effort | {person-weeks} | | |
| - Learning curve | {weeks} | | |
| **Total (Year 1)** | ${total} | | |
| **Total (3-Year)** | ${total} | | |

### 5. Score and Rank Candidates

Apply weighted scoring:

| Criterion | Weight | Option A Score | Option B Score | Option C Score |
|-----------|--------|----------------|----------------|----------------|
| Multi-tenant support | 25% | /5 | /5 | /5 |
| Scalability | 20% | /5 | /5 | /5 |
| Team expertise | 15% | /5 | /5 | /5 |
| Community/Support | 15% | /5 | /5 | /5 |
| Cost | 15% | /5 | /5 | /5 |
| Security | 10% | /5 | /5 | /5 |
| **Weighted Total** | 100% | {score} | {score} | {score} |

**Verify current best practices with web search:**
Search the web: "{technology_category} comparison enterprise SaaS {date}"
Search the web: "{option_a} vs {option_b} multi-tenant {date}"
Search the web: "{option_a} scalability benchmarks {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the technology evaluation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific evaluation criteria or candidates
- **P (Party Mode)**: Bring architect and devops perspectives on technology choices
- **C (Continue)**: Accept evaluation results and proceed to integration fit analysis
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: comparison matrix, scoring results, cost analysis
- Process enhanced insights on technology trade-offs
- Ask user: "Accept these enhanced evaluation findings? (y/n)"
- If yes, integrate into comparison matrix
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review technology evaluation for {research topic}: {summary of top candidates and scores}"
- Process collaborative analysis from architect and devops personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save evaluation results to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the technology evaluation phase.**

Present summary of:
- Research scope and criteria
- Candidate comparison matrix
- Weighted scores and ranking
- Cost analysis summary

Ask for confirmation before proceeding to integration fit analysis.

---

## Verification

- [ ] Comparison matrix completed for all candidates
- [ ] Multi-tenant support assessed
- [ ] Scalability evaluated with metrics
- [ ] Cost analysis completed (TCO)
- [ ] Weighted scoring applied
- [ ] Candidates ranked
- [ ] Patterns align with pattern registry

---

## Outputs

- Vendor/library comparison matrix
- Multi-tenant support assessment
- Scalability evaluation results
- Cost analysis (TCO)
- Candidate ranking with scores

---

## Next Step

Proceed to `step-03-c-design.md` to evaluate integration fit.
