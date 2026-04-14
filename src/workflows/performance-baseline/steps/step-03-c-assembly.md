# Step 3: Assembly

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

Assemble all components into final performance baseline design document.

---

## Prerequisites

- Steps 1-2 completed successfully
- All performance baseline components documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: observability

---

## Actions

### 1. Compile Document Structure

| Section | Content Source | Priority |
|---------|----------------|----------|
| Executive Summary | Synthesize from all steps | High |
| Metric Selection | Step 1 output | High |
| Baseline Collection | Step 2 output | High |
| Dashboard Design | Visualization specs | Medium |
| Alerting Rules | Alert configuration | Medium |

### 2. Performance SLOs

| Metric | SLO Target | Measurement Window |
|--------|------------|-------------------|
| Availability | 99.9% | 30-day rolling |
| P95 latency | < 200ms | 5-minute window |
| Error rate | < 0.1% | 1-hour window |
| Throughput | Within tier limit | Real-time |

### 3. Save Document

Output to: `{output_folder}/planning-artifacts/operations/performance-baseline-design.md`

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
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Create mode complete

---

**Verify current best practices with web search:**
Search the web: "assembly best practices {date}"
Search the web: "assembly multi-tenant SaaS {date}"

## Verification

- [ ] Executive summary compiled
- [ ] All sections integrated
- [ ] SLOs defined
- [ ] Dashboard specs included
- [ ] Document saved to output location

---

## Outputs

- Performance baseline design at `{output_folder}/planning-artifacts/operations/performance-baseline-design.md`
- Updated frontmatter with completed steps

---

## Next Step

Create mode complete. Document saved to output location.

Based on needs:
- **Edit mode**: Run workflow again with Edit mode to modify
- **Validate mode**: Run workflow again with Validate mode to verify
