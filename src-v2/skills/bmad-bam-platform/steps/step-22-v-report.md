# Step 22: Generate Validation Report

## YOUR TASK

Generate validation report for platform architecture.

---

## Main Sequence

### 1. Load Standard

Load: `{project-root}/_bmad/bam/data/standards/std-validation-report.md`

### 2. Execute Checks

| Check | Criteria |
|-------|----------|
| Plugin Isolation | All plugins scoped to tenant context |
| White-label Isolation | No cross-tenant branding leakage |
| Partner API | API respects tenant boundaries |
| Marketplace | Listings respect visibility rules |
| **CRITICAL** | Plugin/partner isolation verified - no cross-tenant access |

### 3. Validate Architecture Completeness

| Section | Required |
|---------|----------|
| Platform Strategy | Extensibility approach documented |
| Plugin Architecture | Types, manifest, isolation defined |
| White-Label Configuration | Tiers and customization documented |
| API Marketplace | Structure and revenue model defined |
| Partner API | Tiers and onboarding documented |
| Governance | Review process defined |

### 4. Generate Report

Write to: `{output_folder}/planning-artifacts/validation/platform-validation-report.md`
