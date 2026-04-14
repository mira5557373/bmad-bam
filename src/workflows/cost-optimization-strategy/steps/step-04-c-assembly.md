# Step 4: Assembly

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

Assemble all components into final cost optimization strategy document.

---

## Prerequisites

- Steps 1-3 completed successfully
- All cost optimization components documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: cost

---

## Actions

### 1. Compile Document Structure

| Section | Content Source | Priority |
|---------|----------------|----------|
| Executive Summary | Synthesize from all steps | High |
| Cost Analysis | Step 1 output | High |
| Optimization Strategies | Step 2 output | High |
| FinOps Practices | Step 3 output | High |
| Implementation Roadmap | Prioritize strategies | Medium |
| Success Metrics | From unit economics | Medium |

### 2. Implementation Roadmap

| Phase | Timeline | Focus | Expected Savings |
|-------|----------|-------|------------------|
| Quick wins | 0-30 days | Right-sizing, cleanup | 10-20% |
| Optimization | 30-90 days | Reservations, caching | 20-40% |
| Transformation | 90-180 days | Architecture changes | 30-50% |
| Continuous | Ongoing | FinOps culture | 5-10% annual |

### 3. Save Document

Output to: `{output_folder}/planning-artifacts/operations/cost-optimization-strategy.md`

---

## COLLABORATION MENUS (A/P/C):

After completing assembly, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Refine specific sections
- **P (Party Mode)**: Final review with stakeholders
- **C (Continue)**: Complete Create mode and save document
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save final document to output location
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Create mode complete

---

**Verify current best practices with web search:**
Search the web: "assembly best practices {date}"
Search the web: "assembly multi-tenant SaaS {date}"

## Verification

- [ ] Executive summary compiled
- [ ] All sections integrated
- [ ] Implementation roadmap defined
- [ ] Success metrics documented
- [ ] Document saved to output location

---

## Outputs

- Cost optimization strategy at `{output_folder}/planning-artifacts/operations/cost-optimization-strategy.md`
- Updated frontmatter with completed steps

---

## Next Step

Create mode complete. Document saved to output location.

Based on needs:
- **Edit mode**: Run workflow again with Edit mode to modify
- **Validate mode**: Run workflow again with Validate mode to verify
