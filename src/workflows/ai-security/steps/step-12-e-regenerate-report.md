# Step 12: Regenerate Security Audit Report

## Purpose

Regenerate the AI security audit report after applying changes, ensuring all updates are reflected with proper version tracking and audit trail.

## Prerequisites

- Step 10 complete (existing audit loaded)
- Step 11 complete (changes applied)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `ai-security`
- **Load template:** `{project-root}/_bmad/bam/templates/ai-security-assessment-template.md`

## Actions

### 1. Consolidate Applied Changes

| Section Updated | Change Summary | Impact Level |
|-----------------|----------------|--------------|
| Model Security Audit | | |
| Inference Endpoint Security | | |
| Prompt Injection Defenses | | |
| Data Leakage Prevention | | |
| Access Control Review | | |

### 2. Update Report Metadata

| Metadata Field | Previous Value | Updated Value |
|----------------|----------------|---------------|
| Version | | |
| Last Modified | | |
| Modified By | | |
| Change Reason | | |

### 3. Regenerate Security Score

| Security Category | Previous Score | Updated Score | Delta |
|-------------------|----------------|---------------|-------|
| Model Security | | | |
| Endpoint Security | | | |
| Prompt Injection Defense | | | |
| Data Leakage Prevention | | | |
| Access Control | | | |
| **Overall Score** | | | |

### 4. Update Findings Summary

| Finding Type | Previous Count | Updated Count | Net Change |
|--------------|----------------|---------------|------------|
| Critical | | | |
| High | | | |
| Medium | | | |
| Low | | | |
| Resolved | | | |

### 5. Update Remediation Status

| Finding ID | Previous Status | New Status | Resolution Date |
|------------|-----------------|------------|-----------------|
| | | | |

### 6. Generate Change Log Entry

| Field | Value |
|-------|-------|
| Version | |
| Date | |
| Author | |
| Changes Summary | |
| Sections Affected | |
| Findings Added/Resolved | |
| Risk Level Change | |

### 7. Regenerate Report Artifact

**Updated report sections:**
1. Executive Summary (with change highlights)
2. Version History (new entry added)
3. Model Security Analysis (updated findings)
4. Endpoint Security Review (updated findings)
5. Defense Effectiveness Assessment
6. Data Protection Verification
7. Access Control Audit
8. Risk Summary (updated metrics)
9. Remediation Tracking (updated status)
10. Compliance Status
11. Change Log

**Save updated report to:** `{output_folder}/planning-artifacts/ai-security-assessment.md`

**Verify current best practices with web search:**
Search the web: "AI security audit report versioning {date}"
Search the web: "LLM security assessment change management {date}"

## Verification

- [ ] All changes consolidated
- [ ] Report metadata updated
- [ ] Security scores recalculated
- [ ] Findings summary updated
- [ ] Remediation status current
- [ ] Change log entry generated
- [ ] Report artifact regenerated
- [ ] Version number incremented
- [ ] Audit trail complete

## Outputs

- Regenerated AI security assessment report
- Updated change log
- Version history entry

## Next Step

Edit mode complete. Proceed to Validate mode (`step-20-v-load-report.md`) to verify updated report against QG-S4 AI Security gate criteria.
