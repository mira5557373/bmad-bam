# Step 4: Report Generation

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

Design automated report generation for audit evidence packages, compliance dashboards, and auditor-ready documentation.

---

## Prerequisites

- Step 3 completed: Collection automation with storage architecture
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/production-readiness.md`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Report Types

Identify required reports for SOC2 audits:

| Report Type | Audience | Frequency | Format |
|-------------|----------|-----------|--------|
| Evidence Package | External auditor | Per audit | PDF + attachments |
| Control Matrix | Auditor + Internal | Quarterly | Excel/PDF |
| Exception Report | Management | Monthly | PDF |
| Compliance Dashboard | Leadership | Real-time | Web dashboard |
| Trend Analysis | Management | Quarterly | PDF charts |
| Gap Analysis | Compliance team | On-demand | PDF |

### 2. Design Evidence Package Structure

Define auditor-ready evidence package:

| Section | Content | Evidence Types |
|---------|---------|----------------|
| Executive Summary | Scope, period, opinion | Attestation |
| Control Descriptions | Control narratives | Documentation |
| Test Procedures | Testing methodology | Procedure docs |
| Test Results | Pass/fail by control | Test evidence |
| Sample Populations | Full datasets | Population exports |
| Sample Selections | Selected items | Sample records |
| Exception Details | Control failures | Exception reports |
| Management Responses | Remediation plans | Response documents |
| Appendices | Supporting evidence | All evidence types |

### 3. Design Control Matrix Report

Define comprehensive control matrix:

| Column | Description | Data Source |
|--------|-------------|-------------|
| Control ID | TSC reference | Static mapping |
| Control Objective | What it achieves | Static description |
| Control Activity | How it operates | Documentation |
| Owner | Responsible party | RACI matrix |
| Frequency | Operating frequency | Control design |
| Evidence | Evidence collected | Evidence catalog |
| Test Date | When tested | Test log |
| Test Result | Pass/fail/exception | Test results |
| Exceptions | Any failures | Exception log |
| Remediation | Fix plan if applicable | Remediation tracker |

### 4. Design Compliance Dashboard

Define real-time compliance dashboard:

| Widget | Metrics | Visualization |
|--------|---------|---------------|
| Overall Score | % controls passing | Gauge chart |
| Control Status | Pass/fail by category | Stacked bar |
| Evidence Freshness | Days since collection | Heat map |
| Exception Trend | Exceptions over time | Line chart |
| Collection Status | Job success rate | Status grid |
| Upcoming Tests | Tests due soon | Calendar |
| Risk Areas | High-risk controls | Priority list |

### 5. Design Report Generation Pipeline

Define automated report generation:

| Stage | Action | Input | Output |
|-------|--------|-------|--------|
| Aggregate | Gather all evidence | Evidence catalog | Aggregated data |
| Validate | Check completeness | Aggregated data | Validation report |
| Template | Load report templates | Template files | Prepared template |
| Populate | Fill template with data | Template + data | Draft report |
| Review | Flag for human review | Draft report | Review queue |
| Approve | Management sign-off | Reviewed report | Approved report |
| Distribute | Send to recipients | Approved report | Distribution log |

### 6. Define Report Schedule

Establish report generation schedule:

| Report | Trigger | Review Required | Distribution |
|--------|---------|-----------------|--------------|
| Daily digest | 6am daily | No | Compliance team |
| Weekly summary | Monday 8am | No | Management |
| Monthly status | 1st of month | Yes | Leadership |
| Quarterly review | Quarter end | Yes | Board |
| Annual package | Audit start | Yes | External auditor |
| Ad-hoc exception | On exception | Yes | Control owner |

### 7. Design Auditor Portal

Define self-service auditor access:

| Feature | Description | Access Control |
|---------|-------------|----------------|
| Evidence browser | Navigate evidence by control | Auditor role |
| Download center | Bulk evidence download | Auditor role |
| Request tracker | Evidence request workflow | Auditor role |
| Q&A system | Question submission | Auditor role |
| Sample selector | Random sample selection | Auditor role |
| Progress tracker | Audit completion status | All roles |

**Verify current best practices with web search:**
Search the web: "SOC2 audit evidence package best practices {date}"
Search the web: "compliance reporting automation {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the report generation design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific report requirements
- **P (Party Mode)**: Bring auditor and leadership perspectives
- **C (Continue)**: Finalize SOC2 evidence collection design
- **[Specific refinements]**: Describe reporting concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Generate final SOC2 evidence collection design documents
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Save all outputs to `{output_folder}/planning-artifacts/compliance/`
- Present completion summary

---

## Final Gate Checkpoint

**Steps 1-4 complete the SOC2 evidence collection design.**

Present final summary of:
- Control mapping to Trust Services Criteria
- Evidence sources and collection queries
- Automated collection architecture
- Report generation and auditor portal

Confirm QG-P1 checklist items for compliance readiness are satisfied.

---

## Verification

- [ ] Report types defined
- [ ] Evidence package structure designed
- [ ] Control matrix format specified
- [ ] Compliance dashboard designed
- [ ] Report generation pipeline documented
- [ ] Report schedule established
- [ ] Auditor portal designed
- [ ] QG-P1 compliance items verified
- [ ] Patterns align with pattern registry

---

## Outputs

- Report type catalog
- Evidence package template
- Control matrix template
- Compliance dashboard design
- Report generation pipeline
- Auditor portal specification
- **Output to:** `{output_folder}/planning-artifacts/compliance/soc2-control-mapping.md`
- **Output to:** `{output_folder}/planning-artifacts/compliance/evidence-collection-plan.md`
- **Output to:** `{output_folder}/planning-artifacts/compliance/automation-design.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/soc2-control-mapping-template.md`

---

## Workflow Complete

The SOC2 evidence collection design workflow is complete. The following artifacts have been generated:
- `soc2-control-mapping.md` - Complete control to TSC mapping
- `evidence-collection-plan.md` - Evidence sources and queries
- `automation-design.md` - Collection and reporting automation

---

## Next Step

Create workflow complete. SOC2 evidence collection design ready for validation using Validate mode (`step-20-v-*`).

**Related Next Steps:**
- Implement collection automation per the designed pipelines
- Configure monitoring and alerting
- Prepare for SOC2 Type I audit
