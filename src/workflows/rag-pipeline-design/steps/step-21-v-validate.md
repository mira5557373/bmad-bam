# Step 21: Validate RAG Pipeline Architecture

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

---

## Purpose

Validate the RAG pipeline architecture against QG-M3 quality gate criteria, ensuring complete ingestion, chunking, embedding, retrieval, and hybrid search components.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: rag-patterns
- **Load checklist:** `{project-root}/_bmad/bam/checklists/qg-m3-agent-runtime.md`

---

## Inputs

- Loaded artifact from Step 20
- Quality gate checklist: `{project-root}/_bmad/bam/checklists/qg-m3-agent-runtime.md`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

---

## Validation Checklist

### Ingestion Pipeline
- [ ] Data sources identified and documented
- [ ] Source connectors defined
- [ ] Preprocessing pipeline specified
- [ ] Tenant data segregation designed
- [ ] Incremental update strategy selected
- [ ] Data freshness requirements defined

### Chunking Strategy
- [ ] Chunk size configuration justified
- [ ] Chunking strategy per content type documented
- [ ] Metadata extraction fields specified
- [ ] Parent-child relationships designed
- [ ] Edge cases handled

### Embedding Management
- [ ] Embedding model selected with justification
- [ ] Batch processing configured
- [ ] Caching strategy designed
- [ ] Multi-model support planned
- [ ] Version management defined
- [ ] Performance targets established

### Retrieval Optimization
- [ ] Vector store selected with justification
- [ ] Dense retrieval configured
- [ ] Reranking pipeline designed
- [ ] Query expansion techniques selected
- [ ] Tenant-aware filtering implemented
- [ ] Quality targets defined

### Hybrid Search
- [ ] Dense + sparse architecture defined
- [ ] BM25 configuration complete
- [ ] Score fusion strategy selected
- [ ] Multi-index strategy designed
- [ ] Fallback mechanisms documented
- [ ] Performance targets established

### Cross-Cutting
- [ ] All components consistent with agent runtime architecture
- [ ] Tenant isolation maintained across all components
- [ ] Performance targets realistic and measurable

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All 5 components defined, tenant isolation verified, performance targets set |
| **CONDITIONAL** | Minor gaps (e.g., some metrics not yet benchmarked) - document gaps and proceed |
| **FAIL** | Missing ingestion design, no chunking strategy, or tenant isolation gaps - return to Create mode |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and ML perspectives on validation results
- **C (Continue)**: Accept validation results and generate report
- **[Specific findings]**: Describe findings to investigate further

Select an option:
```

#### If 'C' (Continue):
- Document validation results
- Determine preliminary gate decision
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per component

---

## Outputs

- Validation results
- Pass/Fail determination
- Specific findings per component

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
