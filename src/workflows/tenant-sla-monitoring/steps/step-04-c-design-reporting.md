# Step 4: Design Reporting

## Purpose

Design SLA reporting and compliance documentation.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all steps in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each step produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 3 completed

**Web Research (Required):**

Search the web: "SLA reporting dashboard best practices {date}"
Search the web: "service level reporting multi-tenant SaaS patterns {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Report Types

| Report | Frequency | Audience | Content |
|--------|-----------|----------|---------|
| Monthly SLA | Monthly | All customers | Compliance summary |
| Quarterly Review | Quarterly | Enterprise | Deep analysis |
| Incident Report | Per incident | Affected | RCA + timeline |
| Annual Summary | Yearly | All | Year in review |

### 2. Report Content

**Monthly SLA Report:**
- Uptime percentage
- Latency statistics
- Incident summary
- Error budget status
- Comparison to previous month

### 3. Self-Service Access

| Tier | Portal Access | API Access |
|------|---------------|------------|
| FREE | Basic dashboard | No |
| PRO | Full dashboard | Read-only |
| ENTERPRISE | Full + export | Full API |

### 4. Audit Trail

All SLA data preserved for:
- Compliance audits
- Dispute resolution
- Historical analysis

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Complete Create mode
```

#### If 'C' (Continue):
- Save complete design
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Output to: `{output_folder}/planning-artifacts/operations/tenant-sla-monitoring.md`
- Create mode complete

---

## Verification

- [ ] Report types defined
- [ ] Report content specified
- [ ] Self-service access documented
- [ ] Audit trail requirements met

---

## Outputs

- Report type specifications with frequency and audience
- Monthly SLA report content template
- Self-service access matrix by tier
- Audit trail retention and access requirements
- Complete SLA monitoring design document
- **Output to:** `{output_folder}/planning-artifacts/operations/tenant-sla-monitoring.md`
- **Load template:** `{project-root}/_bmad/bam/templates/sla-monitoring-template.md`

---

## Next Step

Create workflow complete. SLA monitoring design ready for validation using Validate mode (`step-20-v-*`).

---

## Create Mode Complete

SLA monitoring design is complete.
