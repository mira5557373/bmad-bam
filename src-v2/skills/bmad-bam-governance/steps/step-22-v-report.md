# Step 22: Generate Governance Report

## YOUR TASK

Generate validation report for architecture governance documentation.

---

## Main Sequence

### 1. Load Standard

Load: `{project-root}/_bmad/bam/data/standards/std-validation-report.md`

### 2. Execute Checks

| Check | Criteria |
|-------|----------|
| ADR Completeness | All sections filled |
| Context Documented | Problem statement present |
| Alternatives Considered | Options documented |
| Consequences Identified | Positive/negative impacts |
| Tenant Impact | Multi-tenant considerations documented |
| Index Consistency | Decision index matches ADR entries |

### 3. Generate Report

Write to: `{output_folder}/planning-artifacts/validation/governance-validation-report.md`

---

## Validation Checklist

- [ ] All major decisions documented
- [ ] Context clearly explained
- [ ] Alternatives considered
- [ ] Consequences identified
- [ ] Decision index maintained
- [ ] Superseded decisions tracked
- [ ] **CRITICAL:** Decisions documented with tenant impact
