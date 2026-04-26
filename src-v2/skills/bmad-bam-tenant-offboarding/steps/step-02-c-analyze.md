# Step 02: Design Data Export Process

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📦 **ENSURE data portability** - Export must be complete and usable

## EXECUTION PROTOCOLS

- 🎯 Focus: Design comprehensive data export process for tenant offboarding
- 💾 Track: `stepsCompleted: [1, 2]` when complete
- 📖 Context: Data formats, cross-module collection, verification, delivery
- 🚫 Do NOT: Design deletion process (that's Step 04)
- 🔍 Use web search: Verify GDPR data portability and export best practices
- ⚠️ Note: Data retention and compliance requirements are critical for export

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Export format selection (JSON, CSV, archive)
- Cross-module data collection strategy
- Export verification and checksum generation
- Delivery mechanism design (download, S3, email)

**OUT OF SCOPE:**
- Grace period design (Step 03)
- Hard deletion process (Step 04)
- Final compilation (Step 05)

---

## Purpose

Design the tenant data export process that allows tenants to retrieve their data before offboarding. This addresses GDPR Article 20 (Right to Data Portability), CCPA data access requirements, and general best practices for tenant data ownership.

---

## Prerequisites

- Step 01 completed: Offboarding scope established
- Data category inventory from Step 01
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: data-export
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Inputs

- Data category inventory from Step 01
- Module integration points from Step 01
- Compliance requirements from Step 01
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Design the comprehensive data export process for tenant offboarding.

---

## Main Sequence

### 1. Define Export Data Scope

Determine what data is included in the tenant export:

| Data Category | Include in Export | Format | Notes |
|---------------|-------------------|--------|-------|
| User profiles | YES | JSON | PII fields included |
| Business records | YES | JSON/CSV | Primary data |
| Transactions | YES | CSV | Financial records |
| Documents/Files | YES | Original | Binary files preserved |
| Audit logs | PARTIAL | JSON | Tenant's own actions only |
| System metadata | NO | N/A | Internal system data |
| Derived analytics | OPTIONAL | JSON | Aggregated insights |
| AI/Agent interactions | YES | JSON | Conversation history |

**CRITICAL Export Considerations:**
- [ ] **CRITICAL:** Include all tenant-owned data per compliance requirements
- [ ] **CRITICAL:** Exclude cross-tenant or system data
- [ ] **CRITICAL:** Preserve data relationships and references

### 2. Select Export Formats

Define export formats by data type:

| Data Type | Primary Format | Alternative | Rationale |
|-----------|----------------|-------------|-----------|
| Structured records | JSON | CSV | Machine-readable, preserves nesting |
| Tabular data | CSV | JSON | Spreadsheet-compatible |
| Documents | Original | PDF | Preserve original format |
| Images/Media | Original | ZIP | No conversion loss |
| Configurations | YAML/JSON | N/A | Importable format |

**Export Package Structure:**

```
tenant-export-{tenant_id}-{timestamp}/
├── manifest.json           # Export metadata and checksums
├── users/
│   └── users.json         # User profiles
├── data/
│   ├── {entity}.json      # Business entities
│   └── {entity}.csv       # Tabular exports
├── documents/
│   └── {filename}         # Original files
├── audit/
│   └── audit-log.json     # Tenant actions
├── ai/
│   └── conversations.json # Agent interactions
└── README.md              # Export documentation
```

### 3. Design Cross-Module Data Collection

Define how data is collected from each module:

| Module | Export Handler | Data Types | Dependencies |
|--------|----------------|------------|--------------|
| Identity | `identity.exportTenantData()` | Users, roles, permissions | None |
| Core Business | `business.exportTenantData()` | Primary entities | Identity |
| Documents | `documents.exportTenantData()` | Files, metadata | Core Business |
| Billing | `billing.exportTenantData()` | Invoices, payments | Identity |
| AI/Agents | `agents.exportTenantData()` | Conversations, runs | Identity, Core |
| Integrations | `integrations.exportTenantData()` | Configs, logs | Identity |

**Collection Sequence:**

```
1. Identity module → Users, roles
2. Core Business → Entities (references users)
3. Documents → Files (references entities)
4. Billing → Transactions (references users)
5. AI/Agents → Conversations (references users, entities)
6. Integrations → Configs (references everything)
```

### 4. Design Export Verification

Ensure export completeness and integrity:

#### 4.1 Completeness Verification

| Check | Method | Criteria |
|-------|--------|----------|
| Record count | Query vs Export | All records exported |
| File count | Storage scan | All files included |
| Reference integrity | Cross-reference | All refs resolved |
| Module coverage | Module checklist | All modules processed |

#### 4.2 Integrity Verification

| Field | Value |
|-------|-------|
| Export ID | UUID |
| Tenant ID | {{tenant_id}} |
| Created At | ISO timestamp |
| Checksum Algorithm | SHA-256 |
| Package Checksum | {{sha256_hash}} |

**Manifest Structure:**

```json
{
  "exportId": "{{uuid}}",
  "tenantId": "{{tenant_id}}",
  "createdAt": "{{iso_timestamp}}",
  "expiresAt": "{{expiry_timestamp}}",
  "version": "1.0",
  "checksum": {
    "algorithm": "SHA-256",
    "package": "{{hash}}",
    "files": {
      "users.json": "{{hash}}",
      "data/entities.json": "{{hash}}"
    }
  },
  "contents": {
    "totalFiles": {{count}},
    "totalSize": "{{size}}",
    "modules": ["identity", "business", "documents"]
  }
}
```

### 5. Design Delivery Mechanisms

Define how exports are delivered to tenants:

| Mechanism | Use Case | Security | Expiry |
|-----------|----------|----------|--------|
| Download Link | Standard | Signed URL | 7 days |
| S3 Transfer | Large exports | IAM + encryption | 30 days |
| Email Link | Small exports | Encrypted link | 7 days |
| API Retrieval | Automated | OAuth + signed | 7 days |

**Download Link Generation:**

| Attribute | Value |
|-----------|-------|
| URL Format | `https://export.{domain}/download/{export_id}` |
| Authentication | Tenant admin must authenticate |
| Encryption | AES-256 at rest, TLS in transit |
| Download Limit | 5 downloads max |
| Expiry | 7 days default, configurable |
| Notification | Email with link + security notice |

### 6. Design Export Request Flow

Define the export request lifecycle:

| State | Description | Next States |
|-------|-------------|-------------|
| `requested` | Export initiated | `preparing` |
| `preparing` | Collecting data | `ready`, `failed` |
| `ready` | Export available | `downloaded`, `expired` |
| `downloaded` | Retrieved by tenant | `expired` |
| `expired` | Link no longer valid | `deleted` |
| `failed` | Export generation failed | `requested` (retry) |
| `deleted` | Export file removed | Final |

**Request Handling:**

```
1. Tenant requests export (API/UI)
2. Validate request (permissions, rate limit)
3. Queue export job
4. Collect data from all modules
5. Package into export archive
6. Generate checksums
7. Upload to secure storage
8. Generate signed download URL
9. Notify tenant via email
10. Monitor download status
11. Clean up after expiry
```

### 7. Handle Large Exports

Design for exports that exceed standard limits:

| Export Size | Strategy | Implementation |
|-------------|----------|----------------|
| < 100 MB | Single ZIP | Direct download |
| 100 MB - 1 GB | Split archives | Multiple parts |
| 1 GB - 10 GB | S3 Transfer | Pre-signed multi-part |
| > 10 GB | Staged export | Incremental + resume |

**Large Export Handling:**

- Progress tracking API
- Resume capability for failed transfers
- Background processing with notifications
- Chunked file transfer

---

## COLLABORATION MENUS (A/P/C):

After completing data export design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific export requirements
- **P (Party Mode)**: Bring security and compliance perspectives on export design
- **C (Continue)**: Accept design and proceed to grace period design
- **[Specific concerns]**: Describe areas to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: export formats, delivery mechanisms, compliance requirements
- Process enhanced insights on data portability patterns
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review data export design for tenant offboarding: {summary}"
- Process Security Architect and Compliance Officer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document data export design
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design.md`

---

## SUCCESS METRICS:

- [ ] Export data scope defined
- [ ] Export formats selected per data type
- [ ] Cross-module collection strategy designed
- [ ] Verification and checksum process defined
- [ ] Delivery mechanisms specified
- [ ] Export request flow documented

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Export too large | Implement staged export with progress |
| Missing module data | Update module integration |
| Checksum mismatch | Retry collection for affected module |
| Delivery failure | Provide alternative delivery method |

---

## Verification

- [ ] All data categories addressed
- [ ] Export formats comply with data portability requirements
- [ ] Cross-module collection is complete
- [ ] Integrity verification is robust
- [ ] Delivery is secure and accessible
- [ ] Patterns align with pattern registry

---

## Outputs

- Export scope definition
- Export format specifications
- Cross-module collection design
- Verification and manifest schema
- Delivery mechanism specifications
- Export request flow

---

## NEXT STEP:

Proceed to `step-03-c-design.md` to design grace period and soft delete processes.
