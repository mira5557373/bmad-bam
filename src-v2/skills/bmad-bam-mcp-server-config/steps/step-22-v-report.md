# Step 22: Generate Validation Report

## YOUR TASK

Generate validation report for MCP configuration.

---

## Main Sequence

### 1. Load Standard

Load: `{project-root}/_bmad/bam/data/standards/std-validation-report.md`

### 2. Execute Checks

| Check | Criteria |
|-------|----------|
| Tenant Isolation | All tools scoped to tenant context |
| Authentication | Auth method configured |
| Tool Discovery | Discovery endpoint defined |

### 3. Generate Report

Write to: `{output_folder}/planning-artifacts/validation/mcp-validation-report.md`
