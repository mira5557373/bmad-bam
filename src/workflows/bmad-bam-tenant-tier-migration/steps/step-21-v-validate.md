# Step 21: Validate Tier Migration Plan

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

Validate the tenant tier migration plan against quality criteria, ensuring complete tier definitions, safe migration paths, operational runbook, and rollback procedures.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle



---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

---

## Validation Checklist

### Tier Definitions
- [ ] All tiers documented (FREE, PRO, ENTERPRISE minimum)
- [ ] Feature matrix complete with all platform features
- [ ] Resource limits defined per tier
- [ ] Pricing model documented

### Migration Paths
- [ ] All valid upgrade paths defined
- [ ] All valid downgrade paths defined
- [ ] Migration complexity assessed per path
- [ ] Billing transition rules documented

### Upgrade Strategy
- [ ] Feature enablement sequence defined
- [ ] Resource allocation plan documented
- [ ] Immediate vs. async operations identified
- [ ] User notification plan included

### Downgrade Strategy
- [ ] **CRITICAL:** Data retention policy defined for feature removal
- [ ] **CRITICAL:** Graceful degradation for premium features
- [ ] User notification timeline defined (7-day minimum recommended)
- [ ] Archive/export options documented

### Feature Transitions
- [ ] Feature flag strategy defined
- [ ] Entitlement model documented
- [ ] Real-time toggle capability for flags
- [ ] Event hooks for migration lifecycle

### Runbook Completeness
- [ ] **CRITICAL:** Pre-flight checks defined with blocking conditions
- [ ] Execution steps numbered with timeouts
- [ ] **CRITICAL:** Each step has rollback procedure
- [ ] Monitoring checklist defined
- [ ] Post-migration verification defined

### Rollback Procedure
- [ ] **CRITICAL:** Rollback triggers defined
- [ ] Automatic vs. manual rollback distinguished
- [ ] Rollback window documented
- [ ] Emergency rollback procedure defined

### Cross-Cutting
- [ ] Consistent with master architecture tenant model
- [ ] Tenant isolation maintained during migration
- [ ] No data leakage possible during transition

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All components defined, critical checks pass, rollback tested |
| **CONDITIONAL** | Minor gaps (e.g., monitoring thresholds: feature activation latency < 5s, quota sync delay < 30s, billing update lag < 1m, rollback detection < 2m) with mitigation plan |
| **FAIL** | Missing rollback procedure, undefined data retention, or no pre-flight checks |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and SRE perspectives on validation results
- **C (Continue)**: Accept validation results and generate report
- **[Specific findings]**: Describe findings to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation findings, failed checks, gap analysis
- Process enhanced insights on quality gaps
- Ask user: "Accept this detailed analysis of findings? (y/n)"
- If yes, document enhanced findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tier migration validation findings"
- Process QA and SRE perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation results with specific findings per component
- Determine preliminary gate decision
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per component

---

## Outputs

- Validation report
- Pass/Fail determination
- Specific findings per component

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
