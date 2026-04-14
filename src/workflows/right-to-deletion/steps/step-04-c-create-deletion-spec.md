# Step 4: Create Deletion Procedure Specification

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

Generate the comprehensive GDPR deletion procedure specification document consolidating request intake, data discovery, deletion execution, and audit trail requirements.

## Prerequisites

- Request intake (Step 1), Data discovery (Step 2), Deletion execution (Step 3) complete
- Soft gate checkpoint passed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load template:** `{project-root}/_bmad/bam/templates/deletion-procedure-template.md`


---

## Actions

### 1. Compile Request Handling Section

| Section | Content | Source |
|---------|---------|--------|
| Submission Channels | Channel specifications | Step 1 |
| Identity Verification | Verification procedures | Step 1 |
| Request Tracking | Tracking schema | Step 1 |
| SLA Management | SLA rules | Step 1 |

### 2. Document Data Discovery Procedures

| Component | Implementation | Coverage |
|-----------|----------------|----------|
| Data Inventory | System mapping | All personal data |
| Cross-System | Discovery APIs | All systems |
| Backups | Backup handling | All backup types |
| Third-Parties | Notification matrix | All processors |

### 3. Include Deletion Execution

| Procedure | Method | Verification |
|-----------|--------|--------------|
| Primary deletion | Per-type methods | Query verification |
| Cascading deletion | Order and constraints | FK integrity |
| Exception handling | Legal bases | Documentation |

### 4. Define Audit Trail Requirements

| Audit Element | Content | Retention |
|---------------|---------|-----------|
| Request received | Request details, timestamp | 3 years |
| Identity verified | Method, result | 3 years |
| Data discovered | Systems, data categories | 3 years |
| Deletion executed | Methods, results | 3 years |
| Verification complete | Proof, timestamp | 3 years |

### 5. Generate Deletion Procedure Specification

| Document Section | Content |
|------------------|---------|
| Executive Summary | Scope, GDPR Article 17 compliance |
| Request Handling | Channels, verification, tracking |
| Data Discovery | Inventory, procedures, coverage |
| Deletion Execution | Methods, cascading, exceptions |
| Verification | Procedures, confirmation |
| Audit Trail | Requirements, retention |
| Tenant Considerations | Multi-tenant handling |
| Appendices | Templates, checklists |

**Verify current best practices with web search:**
Search the web: "GDPR deletion procedure documentation requirements {date}"
Search the web: "Article 17 compliance audit trail {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### [C] Continue - Workflow Navigation
- **C1**: Finish Create Mode - export specification to `{output_folder}/planning-artifacts/right-to-deletion-spec.md`
- **C2**: Switch to Edit Mode - load `step-10-e-load-deletion.md`
- **C3**: Switch to Validate Mode - load `step-20-v-load-deletion.md`

---

## Verification

- [ ] Request handling section complete
- [ ] Data discovery documented
- [ ] Deletion execution included
- [ ] Audit trail defined
- [ ] Specification exported to output folder
- [ ] Patterns align with pattern registry

## Outputs

- `{output_folder}/planning-artifacts/right-to-deletion-spec.md`
- Deletion request workflow
- Data discovery procedures
- Exception handling matrix

## Next Step

Deletion procedure specification complete. Options:
- Switch to Edit mode (`step-10-e-load-deletion.md`) for modifications
- Switch to Validate mode (`step-20-v-load-deletion.md`) for compliance checks
