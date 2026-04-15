# Step 3: Design Consent Storage

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

Design consent record storage architecture including consent record schema, proof of consent, tenant-isolated storage, and audit trail generation.

## Prerequisites

- Consent collection designed (Step 2 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`


---

## Inputs

- Consent collection design from Step 2
- Tenant model requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Design Consent Record Schema

Define consent record structure:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| consent_id | UUID | Yes | Unique consent record ID |
| tenant_id | UUID | Yes | Tenant context |
| data_subject_id | UUID | Yes | User identifier |
| purpose_id | String | Yes | Processing purpose |
| lawful_basis | Enum | Yes | GDPR Article 6 basis |
| consent_given | Boolean | Yes | Consent status |
| consent_version | String | Yes | Form version |
| timestamp | DateTime | Yes | UTC timestamp |
| collection_point | String | Yes | Where collected |
| ip_address | String | No | For proof (hashed) |
| user_agent | String | No | For proof |
| withdrawal_timestamp | DateTime | No | If withdrawn |

### 2. Design Proof of Consent

Ensure demonstrable consent (Article 7(1)):

| Proof Element | Storage | Retention | Purpose |
|---------------|---------|-----------|---------|
| Consent record | Database | Duration of consent + 3 years | Demonstrate consent |
| Form snapshot | Object storage | Duration of consent + 3 years | Show what was presented |
| Timestamp | Database | Duration of consent + 3 years | Prove timing |
| Collection context | Database | Duration of consent + 3 years | Prove circumstances |

### 3. Design Tenant-Isolated Storage

Define storage isolation per tenant model:

| Tenant Model | Consent Isolation | Query Pattern | Backup |
|--------------|-------------------|---------------|--------|
| RLS | Row-level policies | tenant_id filter | Tenant-filtered |
| Schema | Dedicated schema | Schema prefix | Per-schema |
| Database | Separate database | Connection routing | Per-database |

### 4. Design Consent Query API

Define consent verification endpoints:

| Endpoint | Method | Purpose | Response |
|----------|--------|---------|----------|
| /consent/{subject_id} | GET | Get all consents | Consent list |
| /consent/{subject_id}/{purpose} | GET | Check specific consent | Boolean + details |
| /consent/{subject_id} | POST | Record new consent | Consent record |
| /consent/{subject_id}/{purpose} | DELETE | Withdraw consent | Confirmation |
| /consent/{subject_id}/history | GET | Consent history | Audit trail |

### 5. Design Preference Center Data

Enable user self-service consent management:

| Feature | Data Required | API Support |
|---------|---------------|-------------|
| View consents | All active consents | GET /consent/{subject} |
| Modify consent | Consent toggles | POST /consent/{subject} |
| Withdraw all | Bulk withdrawal | DELETE /consent/{subject}/all |
| Download record | Consent proof | GET /consent/{subject}/export |
| History view | Audit trail | GET /consent/{subject}/history |

**Verify current best practices with web search:**
Search the web: "GDPR consent record storage requirements {date}"
Search the web: "consent management platform architecture {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-3 complete the purpose definition, collection design, and storage architecture.**

Present summary to user:
- Processing purposes and lawful bases
- Consent collection mechanisms
- Consent storage architecture

Ask for confirmation before proceeding to consent management specification creation.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A] Analyse - Storage Analysis
- **A1**: Analyze consent record retention requirements
- **A2**: Evaluate consent proof completeness
- **A3**: Assess tenant isolation effectiveness
- **A4**: Review consent API security requirements

### [P] Propose - Storage Recommendations
- **P1**: Propose consent database schema optimization
- **P2**: Suggest consent caching strategy for performance
- **P3**: Recommend consent event streaming architecture
- **P4**: Propose consent analytics dashboard

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 4 (Create Consent Spec) - load `step-04-c-create-consent-spec.md`
- **C2**: Return to workflow overview
- **C3**: Export current storage design

---

## Verification

- [ ] Consent record schema defined
- [ ] Proof of consent requirements met
- [ ] Tenant isolation designed
- [ ] Consent API specified
- [ ] Preference center data defined
- [ ] Patterns align with pattern registry

## Outputs

- Consent record schema
- Proof of consent requirements
- Tenant-isolated storage design
- Consent API specification
- Preference center data model
- **Load template:** `{project-root}/_bmad/bam/data/templates/data-residency-template.md`

## Next Step

Proceed to `step-04-c-create-consent-spec.md` to create the comprehensive consent management specification.
