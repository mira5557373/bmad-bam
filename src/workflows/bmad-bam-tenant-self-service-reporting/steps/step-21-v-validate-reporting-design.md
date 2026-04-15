# Step 2: Validate Reporting Design Completeness

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

Perform comprehensive validation of the tenant self-service reporting design against completeness criteria, pattern alignment, and production readiness requirements.

## Prerequisites

- Reporting design loaded (Step 20)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: reporting
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/production-readiness.md`

## Validation Categories

### Category 1: Report Types Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Categories defined | Usage, Billing, Analytics, Audit covered | |
| Tier availability documented | Free, Pro, Enterprise mapped | |
| Data sources specified | All reports have source tables | |
| Retention policies defined | Per tier retention documented | |
| Report specifications | All required attributes present | |

**Validation Rules:**
- [ ] All standard report categories covered
- [ ] Tier differentiation is clear and valuable
- [ ] Data sources are accessible and documented
- [ ] Retention aligns with compliance requirements

### Category 2: Report Builder Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Interface components defined | All builder elements specified | |
| Field selection documented | Capabilities per tier | |
| Filtering options specified | Filter types and limits | |
| Aggregation features defined | Functions per tier | |
| Visualization options documented | Chart types per tier | |
| Performance guardrails | Timeouts, limits defined | |

**Validation Rules:**
- [ ] **CRITICAL:** Builder capabilities support report types
- [ ] Tier differentiation is logical (Enterprise >= Pro)
- [ ] Performance guardrails prevent system abuse
- [ ] Field selection includes all report data sources

### Category 3: Scheduling Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Frequency options defined | Per tier options documented | |
| Quotas specified | Active schedules, executions | |
| Configuration interface designed | All settings documented | |
| Notification settings defined | Email, webhook options | |
| Management features documented | Edit, delete, history | |
| Execution monitoring defined | Metrics and alerts | |

**Validation Rules:**
- [ ] **CRITICAL:** Scheduling quotas prevent resource exhaustion
- [ ] Notification settings cover success and failure
- [ ] Management features enable user self-service
- [ ] Monitoring enables proactive issue detection

### Category 4: Export Formats Completeness

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Formats defined per tier | CSV, JSON, Excel, PDF, etc. | |
| Delivery channels documented | Download, email, S3, webhook | |
| Email delivery specified | Attachment, link, recipients | |
| Cloud storage options | Enterprise delivery channels | |
| Webhook specifications | Payload format, retry policy | |

**Validation Rules:**
- [ ] All tiers have at least one export format
- [ ] Enterprise has advanced delivery options
- [ ] Delivery channels cover common integrations
- [ ] Size limits are realistic for formats

### Category 5: Security Requirements

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Encryption defined | At rest and in transit | |
| Access control documented | Tenant isolation verified | |
| Audit logging specified | Export tracking | |
| Data masking rules | PII handling | |
| Compliance requirements | GDPR, SOC2, HIPAA | |

**Validation Rules:**
- [ ] **CRITICAL:** Tenant data isolation verified
- [ ] All delivery channels have encryption
- [ ] Audit logging covers all exports
- [ ] Compliance requirements documented

### Category 6: Tier Consistency

| Check | Pass Criteria | Status |
|-------|---------------|--------|
| Feature hierarchy | Enterprise >= Pro >= Free | |
| Value differentiation | Clear upgrade incentives | |
| Quota alignment | Quotas match tier value | |
| Capability mapping | All features mapped to tiers | |

**Validation Rules:**
- [ ] No Free tier features missing in paid tiers
- [ ] Enterprise has clear premium value
- [ ] Quotas encourage tier upgrades
- [ ] All capabilities documented for all tiers

## Validation Summary

### Overall Assessment

| Category | Status | Critical Issues | Notes |
|----------|--------|-----------------|-------|
| Report Types | | | |
| Report Builder | | | |
| Scheduling | | | |
| Export Formats | | | |
| Security Requirements | | | |
| Tier Consistency | | | |

### Critical Findings

List any CRITICAL validation failures:
1. 
2. 
3. 

### Recommendations

List improvement recommendations:
1. 
2. 
3. 



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

### [A]nalyze Options
- **A1**: Deep-dive report types validation
- **A2**: Analyze builder capabilities against requirements
- **A3**: Evaluate scheduling configuration completeness
- **A4**: Assess export formats and delivery channels
- **A5**: Review security requirements coverage
- **A6**: Analyze tier consistency

### [P]ropose Changes
- **P1**: Propose report type adjustments
- **P2**: Suggest builder capability improvements
- **P3**: Recommend scheduling configuration updates
- **P4**: Propose export format enhancements
- **P5**: Suggest security requirement additions
- **P6**: Recommend tier alignment fixes

### [C]ontinue
- **C1**: Accept validation results and proceed to report generation
- **C2**: Mark step complete and load `step-22-v-generate-report.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All categories validated
- [ ] Critical issues identified
- [ ] Recommendations documented
- [ ] Validation report complete
- [ ] Patterns align with pattern registry

## Outputs

- Reporting Design Validation Report
- List of critical issues
- Improvement recommendations
- Overall pass/fail/conditional status
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-self-service-reporting-template.md`

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.

## QG-SSR1 Exit Gate Verification

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-SSR1`

### QG-SSR1 Required Patterns

| Pattern | Required | Status | Evidence |
|---------|----------|--------|----------|
| `report_types_defined` | **YES** | [ ] Pass / [ ] Fail | Category 1 validation above |
| `report_builder_designed` | **YES** | [ ] Pass / [ ] Fail | Category 2 validation above |
| `scheduling_configured` | **YES** | [ ] Pass / [ ] Fail | Category 3 validation above |
| `export_channels_defined` | **YES** | [ ] Pass / [ ] Fail | Category 4 validation above |
| `data_isolation_verified` | **YES** | [ ] Pass / [ ] Fail | Category 5 security validation |

**QG-SSR1 Self-Service Reporting Gate:** [ ] SATISFIED / [ ] NOT SATISFIED

### Gate Decision

- **PASS**: All QG-SSR1 required patterns satisfied, all critical checks pass
- **CONDITIONAL**: Non-critical gaps with mitigation plan documented
- **FAIL**: Any QG-SSR1 critical pattern fails, requires remediation

If validation fails, document issues and recommend Edit mode to address gaps.
