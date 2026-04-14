# Step 2: Design Evidence Collection

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

Design evidence collection procedures including automated collection, manual procedures, storage requirements, and chain of custody.

## Prerequisites

- Evidence inventory completed (Step 1 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance


---

## Actions

### 1. Design Automated Collection

| Collection Type | Trigger | Frequency | Storage |
|-----------------|---------|-----------|---------|
| Log exports | Scheduled | Daily | S3/GCS |
| Config snapshots | CI/CD pipeline | On change | Git |
| Compliance scans | Scheduled | Weekly | Evidence repo |
| Metrics export | API | Real-time | Time-series DB |

### 2. Define Manual Collection Procedures

| Evidence Type | Collection Steps | Responsible | Timeline |
|---------------|------------------|-------------|----------|
| Policy reviews | 1. Export PDF 2. Timestamp 3. Sign | Compliance | Monthly |
| Interview notes | 1. Schedule 2. Document 3. Approve | Auditor | As needed |
| Physical access | 1. Photo 2. Log review 3. Document | Facilities | Quarterly |

### 3. Design Evidence Storage

| Storage Tier | Evidence Type | Retention | Access Control |
|--------------|---------------|-----------|----------------|
| Hot | Current audit evidence | Audit period + 90 days | Audit team |
| Warm | Historical evidence | 3 years | Compliance team |
| Cold | Archive | 7 years | Legal hold |

### 4. Define Chain of Custody

| Custody Element | Requirement | Implementation |
|-----------------|-------------|----------------|
| Collection timestamp | Automated | System timestamp |
| Collector identity | Authenticated | SSO user ID |
| Integrity hash | Tamper-evident | SHA-256 |
| Access log | Auditable | Access logging |

**Verify current best practices with web search:**
Search the web: "audit evidence storage requirements {date}"
Search the web: "chain of custody compliance evidence {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### [A] Analyse - Collection Analysis
- **A1**: Analyze automated collection coverage
- **A2**: Evaluate manual procedure efficiency
- **A3**: Assess storage security requirements
- **A4**: Review chain of custody completeness

### [P] Propose - Collection Recommendations
- **P1**: Propose evidence collection automation
- **P2**: Suggest evidence management platform
- **P3**: Recommend storage architecture
- **P4**: Propose custody audit trail design

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 3 (Plan Control Testing) - load `step-03-c-plan-testing.md`
- **C2**: Return to workflow overview
- **C3**: Export current collection design

---

## Verification

- [ ] Automated collection designed
- [ ] Manual procedures defined
- [ ] Storage architecture specified
- [ ] Chain of custody established
- [ ] Patterns align with pattern registry

## Outputs

- Automated collection procedures
- Manual collection runbooks
- Storage architecture
- Chain of custody requirements
- **Load template:** `{project-root}/_bmad/bam/templates/audit-evidence-collection-template.md`

## Next Step

Proceed to `step-03-c-plan-testing.md` to plan control effectiveness testing.
