# Step 10: Document Deprecation

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- READ **CRITICAL: ALWAYS read the complete step file** before taking any action
- LOOP **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- FOCUS **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- WRITE Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array
- SEARCH Use web search to verify current best practices when making technology decisions
- CLIP Reference pattern registry `web_queries` for search topics

---

## Purpose

Create comprehensive documentation of the deprecation process, including lessons learned, metrics analysis, and recommendations for future deprecations to improve organizational capability.

---

## Prerequisites

- Step 09 (Decommission Deprecated Model) completed
- Decommission verification passed
- Rollback window expired or waived
- All migration data collected
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: documentation
- **Load template:** `{project-root}/_bmad/bam/data/templates/deprecation-report-template.md`

---

## Actions

### 1. Create Executive Summary

Document high-level deprecation outcome:

| Element | Details |
|---------|---------|
| Deprecated Model | {model name and version} |
| Deprecation Period | {start date} to {end date} |
| Total Duration | {weeks/months} |
| Tenants Affected | {count} ({tiers breakdown}) |
| Tenants Successfully Migrated | {count} ({percentage}) |
| Tenants with Exceptions | {count} ({reasons}) |
| Overall Status | Success / Partial Success / Delayed |

### 2. Document Timeline Adherence

Compare planned vs. actual timeline:

| Milestone | Planned Date | Actual Date | Delta | Reason for Variance |
|-----------|--------------|-------------|-------|---------------------|
| Deprecation announced | {date} | {date} | {days} | {reason} |
| Migration tooling ready | {date} | {date} | {days} | {reason} |
| 50% migration | {date} | {date} | {days} | {reason} |
| 90% migration | {date} | {date} | {days} | {reason} |
| Deprecated model sunset | {date} | {date} | {days} | {reason} |
| Decommission complete | {date} | {date} | {days} | {reason} |

### 3. Capture Migration Metrics

Record final migration statistics:

| Metric | Target | Actual | Delta | Notes |
|--------|--------|--------|-------|-------|
| Overall migration rate | 100% | {%} | {%} | {notes} |
| Enterprise tier migration | 100% | {%} | {%} | {notes} |
| Pro tier migration | 100% | {%} | {%} | {notes} |
| Free tier migration | 100% | {%} | {%} | {notes} |
| Self-service migrations | {%} | {%} | {%} | {notes} |
| Assisted migrations | {%} | {%} | {%} | {notes} |
| Support tickets | <{count} | {count} | {delta} | {notes} |
| Escalations | <{count} | {count} | {delta} | {notes} |

### 4. Document Issues and Resolutions

Record significant issues encountered:

| Issue ID | Description | Severity | Tenant Impact | Resolution | Time to Resolve |
|----------|-------------|----------|---------------|------------|-----------------|
| {id} | {description} | P1/P2/P3 | {tenants} | {resolution} | {time} |

Issue categories to document:
- Technical migration failures
- Performance regressions
- Compatibility problems
- Communication gaps
- Resource constraints

### 5. Analyze Cost Impact

Document financial outcomes:

| Cost Category | Estimated | Actual | Delta | Notes |
|---------------|-----------|--------|-------|-------|
| Engineering effort | ${amount} | ${amount} | {%} | {notes} |
| Support resources | ${amount} | ${amount} | {%} | {notes} |
| Customer credits | ${amount} | ${amount} | {%} | {notes} |
| Infrastructure | ${amount} | ${amount} | {%} | {notes} |
| Opportunity cost | ${amount} | ${amount} | {%} | {notes} |
| **Total** | ${total} | ${total} | {%} | |

Ongoing impact:
- New model costs vs. deprecated model
- Efficiency gains/losses
- Maintenance reduction

### 6. Conduct Lessons Learned

Document key learnings:

| Category | What Worked Well | What Could Improve | Recommendation |
|----------|------------------|-------------------|----------------|
| Planning | {finding} | {finding} | {recommendation} |
| Communication | {finding} | {finding} | {recommendation} |
| Tooling | {finding} | {finding} | {recommendation} |
| Support | {finding} | {finding} | {recommendation} |
| Monitoring | {finding} | {finding} | {recommendation} |

### 7. Create Recommendations for Future Deprecations

Formalize improvements:

| Recommendation | Priority | Owner | Implementation Target |
|----------------|----------|-------|----------------------|
| {recommendation} | High/Med/Low | {owner} | {date} |

Key areas for improvement:
- Earlier tenant engagement
- Better self-service tooling
- Improved monitoring
- Streamlined communication
- Enhanced rollback capabilities

### 8. Archive Deprecation Artifacts

Organize and store deprecation documentation:

| Artifact | Location | Retention Period | Access |
|----------|----------|------------------|--------|
| Deprecation plan | {location} | Permanent | Team |
| Communication templates | {location} | 2 years | Team |
| Migration scripts | {location} | 1 year | Engineering |
| Support runbooks | {location} | 1 year | Support |
| Tenant communications | {location} | 3 years | Legal |
| Metrics dashboards | {location} | 1 year | Team |
| Lessons learned | {location} | Permanent | Organization |

### 9. Update Organizational Knowledge

Integrate learnings into organizational processes:

| Process | Update Required | Owner | Status |
|---------|-----------------|-------|--------|
| Deprecation playbook | {updates} | {owner} | {status} |
| Communication templates | {updates} | {owner} | {status} |
| SLA documentation | {updates} | {owner} | {status} |
| Training materials | {updates} | {owner} | {status} |
| Runbook library | {updates} | {owner} | {status} |

**Verify current best practices with web search:**
Search the web: "software deprecation postmortem best practices {date}"
Search the web: "lessons learned documentation template enterprise {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into analysis
- **[P] Party Mode**: Collaborative lessons learned session
- **[C] Continue**: Complete workflow

### Menu Options

### [A]nalyze Options
- **A1**: Deep analysis of timeline variances
- **A2**: Review issue patterns and root causes
- **A3**: Evaluate cost analysis accuracy
- **A4**: Assess recommendation feasibility

### [P]ropose Changes
- **P1**: Propose additional metrics to capture
- **P2**: Suggest process improvements
- **P3**: Recommend documentation enhancements
- **P4**: Identify knowledge sharing opportunities

### [C]ontinue
- **C1**: Finalize documentation and complete workflow
- **C2**: Mark workflow complete

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Executive summary completed
- [ ] Timeline adherence documented
- [ ] Migration metrics captured
- [ ] Issues and resolutions documented
- [ ] Cost impact analyzed
- [ ] Lessons learned conducted
- [ ] Future recommendations formalized
- [ ] Artifacts archived
- [ ] Organizational knowledge updated

---

## Outputs

- Deprecation final report
- Timeline analysis document
- Migration metrics summary
- Issue log with resolutions
- Cost impact analysis
- Lessons learned document
- Recommendations registry
- Artifact archive manifest
- Process update checklist

**Load template:** `{project-root}/_bmad/bam/data/templates/deprecation-report-template.md`

---

## Workflow Complete

The AI Model Deprecation workflow is now complete. All steps have been executed:

1. Assess Model Usage - Usage analysis across tenants
2. Identify Dependent Tenants - Tenant dependency mapping
3. Evaluate Replacement Models - Migration target selection
4. Plan Migration Timeline - Deprecation schedule creation
5. Notify Affected Tenants - Tenant communication execution
6. Provide Migration Support - Tenant migration assistance
7. Implement Fallback Routing - Traffic routing to replacements
8. Monitor Migration Progress - Migration tracking and reporting
9. Decommission Deprecated Model - Safe model removal
10. Document Deprecation - Final report and lessons learned

**Quality Gate Contribution:** This workflow contributes to QG-P1 (Production Readiness) by ensuring model lifecycle management is properly executed with minimal tenant disruption.
