# Step 9: Documentation

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Generate comprehensive documentation for the embedding strategy including architecture decisions, operations runbook, and model evaluation guide.

---

## Prerequisites

- Steps 1-8 completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: documentation
- **Load template:** `{project-root}/_bmad/bam/templates/embedding-strategy-template.md`

---

## Inputs

- All decisions from previous steps
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Template: `{project-root}/_bmad/bam/templates/embedding-strategy-template.md`

---

## Actions

### 1. Generate Strategy Document

Compile all decisions into embedding-strategy-design.md:

| Section | Source Step | Key Content |
|---------|-------------|-------------|
| Overview | Step 1 | Model selection summary |
| Model Selection | Step 1 | Models, tier mapping |
| Dimensions | Step 2 | Optimization approach |
| Tenant Isolation | Step 3 | Namespacing, guards |
| Batch Processing | Step 4 | Queues, rate limits |
| Caching | Step 5 | Cache tiers, ROI |
| Quality Metrics | Step 6 | Benchmarks, monitoring |
| Cost Optimization | Step 7 | Quotas, projections |
| Integration | Step 8 | API, RAG pipeline |

### 2. Create Operations Runbook

Document operational procedures:

| Procedure | Steps | Frequency |
|-----------|-------|-----------|
| Model upgrade | Evaluation, rollout, rollback | On new model |
| Cache warm-up | Pre-warm strategy | On deployment |
| Quality audit | Run eval suite, review | Monthly |
| Cost review | Usage analysis, optimization | Monthly |

### 3. Write Model Evaluation Guide

| Section | Content |
|---------|---------|
| Evaluation datasets | Golden set management |
| Benchmark procedures | How to run eval suite |
| Quality thresholds | Pass/fail criteria |
| A/B testing | Experiment setup |

### 4. Generate ADR Summary

Compile architecture decisions:

| ADR | Decision | Rationale |
|-----|----------|-----------|
| ADR-EMB-001 | Model selection | Quality/cost trade-offs |
| ADR-EMB-002 | Dimension optimization | Storage savings |
| ADR-EMB-003 | Caching strategy | Cost reduction |
| ADR-EMB-004 | Tier-based models | Cost differentiation |

### 5. Validate Documentation Completeness

| Component | Documented | Reviewed |
|-----------|------------|----------|
| Strategy overview | [ ] | [ ] |
| Model selection | [ ] | [ ] |
| Tenant isolation | [ ] | [ ] |
| Operations runbook | [ ] | [ ] |
| Evaluation guide | [ ] | [ ] |

**Verify current best practices with web search:**
Search the web: "embedding strategy documentation best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the documentation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific documentation sections
- **P (Party Mode)**: Bring tech writer and ML engineer perspectives
- **C (Continue)**: Accept documentation and complete Create mode
- **[Specific refinements]**: Describe documentation concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: documentation sections, runbook procedures, ADRs
- Process enhanced insights on documentation quality
- Ask user: "Accept these refined documentation decisions? (y/n)"
- If yes, integrate improvements
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review embedding strategy documentation for completeness"
- Process tech writer and ML engineer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save documentation to output locations
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9]`
- Complete Create mode workflow

---

## Verification

- [ ] Strategy document complete
- [ ] Operations runbook documented
- [ ] Model evaluation guide created
- [ ] ADRs compiled
- [ ] All sections reviewed
- [ ] Patterns align with pattern registry

---

## Outputs

- `{output_folder}/planning-artifacts/architecture/embedding-strategy-design.md`
- `{output_folder}/planning-artifacts/architecture/embedding-operations-runbook.md`
- `{output_folder}/planning-artifacts/architecture/adr-emb-*.md`

---

## Next Step

Create workflow complete. Embedding strategy design ready for validation using Validate mode (`step-20-v-*`).

---

## Workflow Complete

Create mode complete for embedding-strategy-design workflow.

**Next Steps:**
- Run Validate mode to verify against quality criteria
- Integrate with RAG pipeline implementation
- Set up monitoring and quality dashboards
