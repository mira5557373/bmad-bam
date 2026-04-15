# Step 1: Design Request Intake

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

Design the deletion request intake system including submission channels, identity verification, request tracking, and SLA management per GDPR Article 17 requirements.

## Prerequisites

- Master architecture document completed
- Tenant model isolation defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → filter: GDPR


---

## Actions

### 1. Define Request Submission Channels

| Channel | Accessibility | Verification Method | Response SLA |
|---------|---------------|---------------------|--------------|
| Web Portal | Self-service form | Account login | Immediate ack |
| Email | privacy@domain.com | Email verification | 24 hours |
| API | Programmatic access | API key + JWT | Immediate |
| Support Ticket | Assisted submission | Support verification | 24 hours |

### 2. Design Identity Verification

| Verification Level | Method | Use Case |
|--------------------|--------|----------|
| Authenticated | Session token | Logged-in users |
| Email | Verification link | Email-based requests |
| Document | ID upload | High-risk deletions |
| Multi-factor | MFA challenge | Sensitive data |

### 3. Design Request Tracking

| Field | Type | Purpose |
|-------|------|---------|
| request_id | UUID | Unique identifier |
| tenant_id | UUID | Tenant context |
| data_subject_id | UUID | Subject identifier |
| status | Enum | Processing status |
| submitted_at | DateTime | Receipt timestamp |
| deadline | DateTime | 30-day SLA deadline |
| completed_at | DateTime | Completion timestamp |

### 4. Define SLA Management

| SLA Metric | Target | Alert Threshold |
|------------|--------|-----------------|
| Acknowledgment | 24 hours | 12 hours |
| Completion | 30 days | 20 days |
| Extension notice | Before deadline | 25 days |

**Verify current best practices with web search:**
Search the web: "GDPR deletion request intake best practices {date}"
Search the web: "Article 17 identity verification requirements {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### [A] Analyse - Request Intake Analysis
- **A1**: Analyze identity verification requirements per data sensitivity
- **A2**: Evaluate request channel accessibility requirements
- **A3**: Assess SLA tracking automation options
- **A4**: Review tenant-specific intake customization

### [P] Propose - Intake Recommendations
- **P1**: Propose automated intake workflow
- **P2**: Suggest identity verification tiering
- **P3**: Recommend request prioritization strategy
- **P4**: Propose intake metrics dashboard

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 2 (Design Data Discovery) - load `step-02-c-design-data-discovery.md`
- **C2**: Return to workflow overview
- **C3**: Export current intake design

---

## Verification

- [ ] Request channels defined
- [ ] Identity verification designed
- [ ] Request tracking schema defined
- [ ] SLA management established
- [ ] Patterns align with pattern registry

## Outputs

- Request submission channels
- Identity verification procedures
- Request tracking schema
- SLA management rules

## Next Step

Proceed to `step-02-c-design-data-discovery.md` to design data discovery procedures.
