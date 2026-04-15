# Step 2: Index Strategy Selection

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

Select the appropriate vector indexing strategy based on scale, latency, and accuracy requirements gathered in Step 1.

---

## Prerequisites

- Step 1 completed with requirements documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: vector-index
- **Web research (if available):** Search for current indexing algorithm comparisons

---

## Inputs

- Requirements from Step 1
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Evaluate Indexing Algorithms

Compare primary indexing strategies:

| Algorithm | Recall | Speed | Memory | Build Time | Best For |
|-----------|--------|-------|--------|------------|----------|
| HNSW | 95-99% | Fast | High | Slow | Production default |
| IVF-Flat | 90-95% | Medium | Medium | Fast | Large datasets |
| IVF-PQ | 85-90% | Fast | Low | Fast | Cost-sensitive |
| Flat | 100% | Slow | Low | None | Small datasets |
| ScaNN | 95-99% | Fast | Medium | Medium | Google ecosystem |

### 2. Select Primary Index Type

Based on requirements from Step 1, select index type:

| Factor | Weight | Your Assessment |
|--------|--------|-----------------|
| Recall requirements | [ ] Critical/Important/Nice | [ ] Algorithm choice |
| Query latency | [ ] Critical/Important/Nice | [ ] Algorithm choice |
| Memory constraints | [ ] Critical/Important/Nice | [ ] Algorithm choice |
| Update frequency | [ ] Critical/Important/Nice | [ ] Algorithm choice |

### 3. Configure Index Parameters

For selected algorithm, define parameters:

**HNSW Parameters:**
| Parameter | Value | Rationale |
|-----------|-------|-----------|
| M (connections) | [ ] 16-64 | Trade-off recall vs memory |
| efConstruction | [ ] 100-500 | Build quality |
| efSearch | [ ] 50-200 | Query quality vs speed |

**IVF Parameters:**
| Parameter | Value | Rationale |
|-----------|-------|-----------|
| nlist (clusters) | [ ] sqrt(n) | Cluster count |
| nprobe | [ ] 1-100 | Search clusters |

### 4. Plan Index Maintenance

Define index maintenance strategy:
- Rebuild frequency (daily, weekly, on threshold)
- Compaction triggers
- Index versioning approach
- Zero-downtime update strategy

### 5. Document Trade-offs

Create ADR documenting:
- Selected algorithm with justification
- Parameter choices and rationale
- Expected recall vs latency trade-offs
- Maintenance requirements

**Verify current best practices with web search:**
Search the web: "HNSW vs IVF vector index comparison {date}"
Search the web: "vector index tuning production {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the index strategy analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into algorithm trade-offs and parameter tuning
- **P (Party Mode)**: Bring ML engineer and SRE perspectives on index selection
- **C (Continue)**: Accept index strategy and proceed to tenant isolation
- **[Specific refinements]**: Describe index concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: algorithm options, parameter choices, trade-offs
- Process enhanced insights on index optimization
- Ask user: "Accept these refined index decisions? (y/n)"
- If yes, integrate into index specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review vector index strategy for multi-tenant AI platform"
- Process ML engineer and SRE perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save index strategy to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-tenant-isolation.md`

---

## Verification

- [ ] Index algorithm selected with justification
- [ ] Parameters configured for requirements
- [ ] Maintenance strategy defined
- [ ] Trade-offs documented in ADR
- [ ] Patterns align with pattern registry

---

## Outputs

- Index strategy specification
- Index parameters configuration
- ADR for index selection

---

## Next Step

Proceed to `step-03-c-tenant-isolation.md` to design tenant isolation.
