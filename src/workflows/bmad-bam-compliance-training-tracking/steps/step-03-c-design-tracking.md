# Step 3: Design Tracking System

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
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Design training tracking system including completion tracking, compliance reporting, reminders, and audit evidence generation.

## Prerequisites

- Curriculum designed (Step 2 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance


---

## Actions

### 1. Design Completion Tracking

| Tracking Element | Data Captured | Storage | Retention |
|------------------|---------------|---------|-----------|
| Enrollment | User, course, date | LMS database | Indefinite |
| Progress | Module completion | LMS database | 3 years |
| Completion | Date, score, certificate | LMS database | 7 years |
| Acknowledgment | E-signature, timestamp | LMS database | 7 years |

### 2. Define Compliance Reporting

| Report | Audience | Frequency | Content |
|--------|----------|-----------|---------|
| Compliance dashboard | Management | Real-time | Overall status |
| Department summary | Managers | Weekly | Team completion |
| Individual transcript | Employees | On-demand | Personal record |
| Audit report | Auditors | On-demand | Full evidence |
| Overdue report | HR/Compliance | Daily | Non-compliant list |

### 3. Design Reminder System

| Reminder Type | Trigger | Channel | Escalation |
|---------------|---------|---------|------------|
| Enrollment | New hire day 1 | Email + LMS | Day 7 to manager |
| Due soon | 14 days before due | Email | 7 days, 3 days |
| Overdue | Due date passed | Email + manager | Weekly to HR |
| Renewal | 30 days before expiry | Email | 14 days, 7 days |

### 4. Design Audit Evidence

| Evidence Type | Generation | Format | Access |
|---------------|------------|--------|--------|
| Completion certificate | Automatic | PDF | Employee + HR |
| Training transcript | On-demand | PDF/CSV | HR + Audit |
| Completion report | Scheduled | Excel | Compliance |
| Sign-off acknowledgment | Automatic | PDF | Legal/Audit |

**Verify current best practices with web search:**
Search the web: "LMS compliance tracking features {date}"
Search the web: "training compliance reporting requirements {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-3 complete the requirements identification, curriculum design, and tracking system design.**

Present summary to user:
- Training requirements per framework
- Course catalog and learning paths
- Tracking and reporting capabilities

Ask for confirmation before proceeding to training tracking specification creation.

---

## COLLABORATION MENUS (A/P/C)

### [A] Analyse - Tracking Analysis
- **A1**: Analyze tracking coverage completeness
- **A2**: Evaluate reporting effectiveness
- **A3**: Assess reminder system adequacy
- **A4**: Review audit evidence sufficiency

### [P] Propose - Tracking Recommendations
- **P1**: Propose LMS integration approach
- **P2**: Suggest automated compliance monitoring
- **P3**: Recommend manager dashboard design
- **P4**: Propose mobile learning support

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 4 (Create Tracking Spec) - load `step-04-c-create-tracking-spec.md`
- **C2**: Return to workflow overview
- **C3**: Export current tracking design

---

## Verification

- [ ] Completion tracking designed
- [ ] Compliance reporting defined
- [ ] Reminder system designed
- [ ] Audit evidence generation specified
- [ ] Patterns align with pattern registry

## Outputs

- Completion tracking requirements
- Compliance reporting specifications
- Reminder system design
- Audit evidence requirements

## Next Step

Proceed to `step-04-c-create-tracking-spec.md` to create the comprehensive training tracking specification.
