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

Assemble all components into final log aggregation design document.

---

## Prerequisites

- Steps 1-2 completed successfully
- All log aggregation components documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: observability

---

## Actions

### 1. Compile Document Structure

| Section | Content Source | Priority |
|---------|----------------|----------|
| Executive Summary | Synthesize from all steps | High |
| Collection Design | Step 1 output | High |
| Tenant Isolation | Step 2 output | High |
| Alerting | Log-based alerts | Medium |
| Compliance | Regulatory requirements | Medium |

### 2. Operational Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| Ingestion rate | Logs per second | By capacity |
| Query latency | P95 search time | < 2s |
| Storage efficiency | Compression ratio | > 10:1 |
| Retention compliance | Logs within policy | 100% |

### 3. Save Document

Output to: `{output_folder}/planning-artifacts/operations/log-aggregation-design.md`

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
- [ ] Operational metrics defined
- [ ] Compliance requirements addressed
- [ ] Document saved to output location

---

## Outputs

- Log aggregation design at `{output_folder}/planning-artifacts/operations/log-aggregation-design.md`
- Updated frontmatter with completed steps

---

## Next Step

Create mode complete. Document saved to output location.

Based on needs:
- **Edit mode**: Run workflow again with Edit mode to modify
- **Validate mode**: Run workflow again with Validate mode to verify
