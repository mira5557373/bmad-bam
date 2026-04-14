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

Generate comprehensive documentation for the memory optimization design including architecture decisions, operations runbook, and tuning guide.

---

## Prerequisites

- Steps 1-8 completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: documentation
- **Load template:** `{project-root}/_bmad/bam/templates/memory-tiers-template.md`

---

## Inputs

- All decisions from previous steps
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Template: `{project-root}/_bmad/bam/templates/memory-tiers-template.md`

---

## Actions

### 1. Generate Optimization Document

Compile all decisions into agent-memory-optimization.md:

| Section | Source Step | Key Content |
|---------|-------------|-------------|
| Overview | Step 1 | Audit findings summary |
| Tier Allocation | Step 2 | Storage design |
| Eviction Policies | Step 3 | Algorithms, TTLs |
| Tenant Quotas | Step 4 | Limits, handling |
| Performance | Step 5 | Hot paths, tuning |
| Cost Controls | Step 6 | Tiering, cleanup |
| Monitoring | Step 7 | Metrics, alerts |
| Testing | Step 8 | Test plan |

### 2. Create Operations Runbook

Document operational procedures:

| Procedure | Steps | Frequency |
|-----------|-------|-----------|
| Capacity expansion | Scale-out process | On threshold |
| Eviction storm response | Triage + mitigation | On incident |
| Quota adjustment | Admin procedure | On request |
| Performance tuning | Optimization steps | Quarterly |

### 3. Write Tuning Guide

| Scenario | Symptoms | Tuning Steps |
|----------|----------|--------------|
| High latency | p99 > SLA | Adjust pooling, add replicas |
| Memory pressure | >80% utilization | Enable compression, tier cold |
| Eviction rate | High eviction count | Adjust TTLs, increase capacity |
| Cost overrun | Budget exceeded | Aggressive tiering, cleanup |

### 4. Generate ADR Summary

Compile architecture decisions:

| ADR | Decision | Rationale |
|-----|----------|-----------|
| ADR-MEM-001 | Tier allocation | Performance vs cost |
| ADR-MEM-002 | Eviction algorithm | Data importance |
| ADR-MEM-003 | Quota design | Fair usage |
| ADR-MEM-004 | Storage tiering | Cost optimization |

### 5. Validate Documentation Completeness

| Component | Documented | Reviewed |
|-----------|------------|----------|
| Optimization overview | [ ] | [ ] |
| Tier allocation | [ ] | [ ] |
| Eviction policies | [ ] | [ ] |
| Operations runbook | [ ] | [ ] |
| Tuning guide | [ ] | [ ] |

**Verify current best practices with web search:**
Search the web: "memory architecture documentation best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the documentation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific documentation sections
- **P (Party Mode)**: Bring tech writer and SRE perspectives on documentation
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
- Context: "Review memory optimization documentation for completeness"
- Process tech writer and SRE perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save documentation to output locations
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9]`
- Complete Create mode workflow

---

## Verification

- [ ] Optimization document complete
- [ ] Operations runbook documented
- [ ] Tuning guide created
- [ ] ADRs compiled
- [ ] All sections reviewed
- [ ] Patterns align with pattern registry

---

## Outputs

- `{output_folder}/planning-artifacts/architecture/agent-memory-optimization.md`
- `{output_folder}/planning-artifacts/architecture/memory-operations-runbook.md`
- `{output_folder}/planning-artifacts/architecture/adr-mem-*.md`

---

## Next Step

Create workflow complete. Agent memory optimization design ready for validation using Validate mode (`step-20-v-*`).

---

## Workflow Complete

Create mode complete for agent-memory-optimization workflow.

**Next Steps:**
- Run Validate mode to verify against quality criteria
- Implement memory optimization changes
- Set up monitoring dashboards
- Run testing suite
