# Step 22: Generate Validation Report

## YOUR TASK

Generate validation report for RAG pipeline configuration.

---

## Main Sequence

### 1. Load Standard

Load: `{project-root}/_bmad/bam/data/standards/std-validation-report.md`

### 2. Execute Checks

| Check | Criteria |
|-------|----------|
| Tenant Isolation | Vector retrieval scoped to tenant_id |
| Embedding Model | Model and dimensions specified |
| Chunking Strategy | Strategy documented with parameters |
| Retrieval Pipeline | Top-k and filters configured |
| CRITICAL | No cross-tenant retrieval possible |

### 3. Generate Report

Write to: `{output_folder}/planning-artifacts/validation/rag-validation-report.md`
