# Step 21: Validate

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Validate the White-Labeling Design against QG-M2 (Tenant Isolation) criteria and best practices.

---

## Prerequisites

- Step 20 completed (Load Artifact)
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m2-tenant-isolation.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---

## Inputs

- Loaded artifact from Step 20
- QG-M2 checklist
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### QG-M2 Tenant Isolation Validation Checklist

#### Branding Asset Validation
- [ ] **CRITICAL:** Assets stored in tenant-isolated paths
- [ ] **CRITICAL:** CDN delivery prevents cross-tenant access
- [ ] Asset versioning is tenant-scoped
- [ ] Validation rules prevent malicious uploads
- [ ] Rollback works per-tenant only

#### Theme Customization Validation
- [ ] **CRITICAL:** CSS variables scoped to tenant
- [ ] **CRITICAL:** No theme leakage between tenants
- [ ] Dark/light mode isolated per tenant
- [ ] Preview system sandboxed
- [ ] Theme inheritance respects boundaries

#### Domain Mapping Validation
- [ ] **CRITICAL:** Domain verification prevents hijacking
- [ ] **CRITICAL:** SSL certificates isolated per tenant
- [ ] DNS configuration tenant-specific
- [ ] Error handling doesn't expose tenant info
- [ ] Multi-region respects tenant preferences

#### Portal Theming Validation
- [ ] **CRITICAL:** Admin portal fully isolated
- [ ] **CRITICAL:** End-user portal tenant-scoped
- [ ] Email templates contain only tenant data
- [ ] Widget theming uses Shadow DOM
- [ ] Documentation portal tenant-filtered

### Severity Classification

| Finding Type | Severity |
|-------------|----------|
| Cross-tenant asset access | Critical |
| Theme leakage between tenants | Critical |
| Domain verification bypass | Critical |
| Incomplete isolation | High |
| Missing validation | Medium |
| Documentation gap | Low |

---

## COLLABORATION MENUS (A/P/C):

After completing validation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for validation analysis
- **C (Continue)**: Accept validation findings and proceed to report generation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass validation context: findings, QG-M2 status
- Process enhanced insights from deep questioning
- Ask user: "Accept these validation findings? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review QG-M2 validation findings for White-Labeling Design: {summary of findings}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Compile validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All QG-M2 checks performed
- [ ] Critical items verified
- [ ] Findings categorized by severity
- [ ] Recommendations documented
- [ ] Patterns align with pattern registry

---

## Outputs

- QG-M2 validation results
- Severity-categorized issues
- Recommendations for improvements

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
