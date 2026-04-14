# Step 2: Design Data Discovery

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

Design data discovery procedures to locate all personal data associated with a data subject across all systems, backups, and third parties.

## Prerequisites

- Request intake designed (Step 1 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance


---

## Actions

### 1. Create Personal Data Inventory

| Data Category | Systems | Identifiers | Discovery Method |
|---------------|---------|-------------|------------------|
| Account Data | User DB | user_id, email | Direct query |
| Transaction Data | Billing | user_id | Foreign key |
| Activity Logs | Analytics | user_id, session_id | Log search |
| AI Interactions | ML Store | user_id | Model association |
| Support Tickets | Help Desk | email | Text search |

### 2. Design Cross-System Discovery

| System Type | Discovery API | Data Format | Timeout |
|-------------|---------------|-------------|---------|
| Primary Database | SQL query | JSON | 30s |
| Search Index | Search API | JSON | 10s |
| Object Storage | List + filter | Binary refs | 60s |
| Third-party | Webhook/API | Varies | 120s |

### 3. Design Backup Inclusion

| Backup Type | Discovery Method | Deletion Approach |
|-------------|------------------|-------------------|
| Daily snapshot | Point-in-time query | Wait for rotation |
| Archive backup | Manifest search | Flagged for exclusion |
| DR replica | Sync from primary | Automatic |
| Offline backup | Manual audit | Documented exception |

### 4. Design Third-Party Tracking

| Third Party | Data Shared | Notification Method | Verification |
|-------------|-------------|---------------------|--------------|
| Email provider | Email, name | Deletion API | Confirmation |
| Analytics | Anonymized ID | Deletion API | Log review |
| Payment processor | Payment info | Support ticket | Certificate |

**Verify current best practices with web search:**
Search the web: "GDPR data discovery personal data mapping {date}"
Search the web: "right to erasure backup handling {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### [A] Analyse - Discovery Analysis
- **A1**: Analyze data inventory completeness
- **A2**: Evaluate cross-system discovery coverage
- **A3**: Assess backup deletion strategies
- **A4**: Review third-party data processor obligations

### [P] Propose - Discovery Recommendations
- **P1**: Propose automated data discovery workflow
- **P2**: Suggest data lineage tracking approach
- **P3**: Recommend backup retention alignment
- **P4**: Propose third-party audit program

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 3 (Design Deletion Execution) - load `step-03-c-design-deletion-execution.md`
- **C2**: Return to workflow overview
- **C3**: Export current discovery design

---

## Verification

- [ ] Personal data inventory complete
- [ ] Cross-system discovery designed
- [ ] Backup inclusion addressed
- [ ] Third-party tracking defined
- [ ] Patterns align with pattern registry

## Outputs

- Personal data inventory
- Cross-system discovery procedures
- Backup handling procedures
- Third-party notification matrix

## Next Step

Proceed to `step-03-c-design-deletion-execution.md` to design deletion execution procedures.
