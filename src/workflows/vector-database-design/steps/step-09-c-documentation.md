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

Generate comprehensive documentation for the vector database design including architecture decision records, operations runbook, and performance tuning guide.

---

## Prerequisites

- Steps 1-8 completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: documentation
- **Load template:** `{project-root}/_bmad/bam/templates/vector-database-template.md`

---

## Inputs

- All decisions from previous steps
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Template: `{project-root}/_bmad/bam/templates/vector-database-template.md`

---

## Actions

### 1. Generate Architecture Document

Compile all decisions into vector-database-design.md:

| Section | Source Step | Key Content |
|---------|-------------|-------------|
| Overview | Step 1 | Requirements summary |
| Index Strategy | Step 2 | Algorithm, parameters |
| Tenant Isolation | Step 3 | Isolation pattern, namespace |
| Query Optimization | Step 4 | Caching, filtering, hybrid |
| Scaling | Step 5 | Sharding, auto-scaling |
| Backup/Recovery | Step 6 | RPO/RTO, procedures |
| Monitoring | Step 7 | Metrics, alerts |
| Security | Step 8 | Encryption, access control |

### 2. Create Operations Runbook

Document operational procedures:

| Procedure | Steps | Frequency |
|-----------|-------|-----------|
| Index rebuild | Detailed steps | As needed |
| Capacity expansion | Scale-out process | On threshold |
| Tenant provisioning | Namespace creation | On onboarding |
| Incident response | Triage to resolution | On incident |

### 3. Write Performance Tuning Guide

| Scenario | Tuning Steps | Expected Impact |
|----------|--------------|-----------------|
| High latency | Increase efSearch, add cache | -30% latency |
| Low recall | Increase M, rebuild index | +5% recall |
| Memory pressure | Enable PQ compression | -50% memory |

### 4. Generate ADR Summary

Compile architecture decisions:

| ADR | Decision | Rationale |
|-----|----------|-----------|
| ADR-VDB-001 | Index algorithm | Trade-offs documented |
| ADR-VDB-002 | Isolation pattern | Compliance requirements |
| ADR-VDB-003 | Scaling strategy | Growth projections |

### 5. Validate Documentation Completeness

| Component | Documented | Reviewed |
|-----------|------------|----------|
| Architecture overview | [ ] | [ ] |
| Index configuration | [ ] | [ ] |
| Tenant isolation | [ ] | [ ] |
| Operations runbook | [ ] | [ ] |
| Security controls | [ ] | [ ] |

**Verify current best practices with web search:**
Search the web: "vector database architecture documentation best practices {date}"

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
- Context: "Review vector database documentation for completeness and clarity"
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

- [ ] Architecture document complete
- [ ] Operations runbook documented
- [ ] Performance tuning guide created
- [ ] ADRs compiled
- [ ] All sections reviewed
- [ ] Patterns align with pattern registry

---

## Outputs

- `{output_folder}/planning-artifacts/architecture/vector-database-design.md`
- `{output_folder}/planning-artifacts/architecture/vector-operations-runbook.md`
- `{output_folder}/planning-artifacts/architecture/adr-vdb-*.md`

---

## Next Step

Create workflow complete. Vector database design ready for validation using Validate mode (`step-20-v-*`).

---

## Workflow Complete

Create mode complete for vector-database-design workflow.

**Next Steps:**
- Run Validate mode to verify against quality criteria
- Proceed to `embedding-strategy-design` workflow
- Integrate with RAG pipeline implementation
