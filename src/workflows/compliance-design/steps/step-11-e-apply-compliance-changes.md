# Step 11: Update Compliance Spec

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

Apply targeted modifications to the existing compliance specification based on the scope identified in the previous step.

## Prerequisites

- Compliance specification loaded (step-10-e-load-compliance.md completed)
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance


---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Apply Framework Updates (Option A)

If updating framework requirements:

| Action | Description | Validation |
|--------|-------------|------------|
| Add Framework | Add new compliance framework | Map existing controls |
| Remove Framework | Remove framework from scope | Update control mappings |
| Update Requirements | Modify framework-specific requirements | Verify control coverage |

When adding a new framework:
1. Document framework requirements
2. Map existing controls to new requirements
3. Identify new gaps
4. Update evidence requirements
5. Adjust retention policies if needed

### 2. Apply Audit Logging Updates (Option B)

If modifying audit logging architecture:

| Component | Modification Types |
|-----------|-------------------|
| Event Schema | Add/modify fields, change data types |
| Event Categories | Add/remove categories, update retention |
| Storage | Change storage tier thresholds, replication |
| Processing | Modify SLAs, add/remove processing stages |

Ensure all changes maintain:
- Tenant isolation requirements
- Immutability guarantees
- Framework compliance

### 3. Apply Control Updates (Option C)

If updating control mappings:

| Action | Description |
|--------|-------------|
| Add Control | Define new control, map to frameworks |
| Modify Control | Update implementation, evidence requirements |
| Retire Control | Document rationale, update mappings |
| Remap Control | Change framework associations |

For each control change:
1. Update control inventory
2. Update control-framework mapping
3. Update evidence requirements
4. Update ownership if needed

### 4. Apply Retention Policy Updates (Option D)

If revising retention policies:

| Policy Element | Considerations |
|----------------|----------------|
| Hot Retention | Query performance, storage costs |
| Cold Retention | Compliance minimums, legal holds |
| Deletion | Secure deletion procedures, verification |
| Archival | Compression, accessibility requirements |

Ensure retention changes satisfy the longest applicable framework requirement.

### 5. Apply Evidence Updates (Option E)

If updating evidence requirements:

| Evidence Element | Modification Types |
|------------------|-------------------|
| Collection Method | Manual to automated, frequency changes |
| Evidence Types | Add/remove evidence types |
| Storage | Location, retention, access controls |
| Review Process | Frequency, reviewers, approval workflow |

### 6. Apply Monitoring Updates (Option F)

If modifying compliance monitoring dashboards:

| Dashboard Element | Modification Types |
|-------------------|-------------------|
| Metrics | Add/remove/modify metrics |
| Visualizations | Change chart types, add drill-downs |
| Alerts | Add/modify thresholds, escalation paths |
| Refresh | Change refresh intervals |

### 7. Apply Remediation Updates (Option G)

If updating remediation procedures:

| Procedure Element | Modification Types |
|-------------------|-------------------|
| SLAs | Adjust response timeframes |
| Escalation | Modify escalation paths |
| Workflow | Change remediation workflow steps |
| Tracking | Add/modify tracking mechanisms |

### 8. Validate Changes

After applying all modifications:

| Validation Check | Description |
|------------------|-------------|
| Consistency | Cross-references remain valid |
| Completeness | All required sections present |
| Compliance | Changes maintain framework compliance |
| Dependencies | Dependent sections updated |

### 9. Update Document Metadata

Update the compliance specification metadata:

```yaml
document_metadata:
  version: "{incremented_version}"
  last_updated: "{current_date}"
  updated_by: "{user_name}"
  change_summary: "{brief description of changes}"
```

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

### Menu Options

### [A] Analyse - Change Impact Analysis
- **A1**: Analyze SOC 2 control coverage impact from proposed changes
- **A2**: Evaluate HIPAA compliance impact of audit logging modifications
- **A3**: Assess GDPR retention policy change implications
- **A4**: Review cross-framework control mapping consistency

### [P] Propose - Change Recommendations
- **P1**: Propose optimized control mapping for multi-framework compliance
- **P2**: Suggest evidence collection automation for new controls
- **P3**: Recommend retention policy harmonization across frameworks
- **P4**: Propose compliance monitoring updates for new requirements

### [C] Continue - Workflow Navigation
- **C1**: Continue to Validate Mode - load `step-20-v-load-compliance.md`
- **C2**: Return to Load Step - load `step-10-e-load-compliance.md`
- **C3**: Export updated compliance specification

---

## Verification

- [ ] All requested modifications applied
- [ ] Cross-references updated
- [ ] Framework compliance maintained
- [ ] Document validated for consistency
- [ ] Metadata updated
- [ ] Patterns align with pattern registry

## Outputs

- Updated compliance specification at `{output_folder}/planning-artifacts/compliance-spec.md`
- Change summary document
- Updated control mappings (if applicable)
- Updated evidence requirements (if applicable)

## Next Step

This completes the Edit mode. Run `step-20-v-load-compliance.md` to enter Validate mode and verify the updated compliance specification maintains framework compliance.

## Quality Gate Summary

### Edit Validation
- [ ] All modifications accurately applied
- [ ] No compliance regressions introduced
- [ ] Document structure maintained
- [ ] All cross-references valid
- [ ] Change history documented
