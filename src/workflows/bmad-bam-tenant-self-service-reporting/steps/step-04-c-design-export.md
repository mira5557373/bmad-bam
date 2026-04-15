# Step 4: Design Export Formats

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

Design export formats and delivery channels for tenant reports, including format options per tier, delivery methods, and security requirements for report distribution.

## Prerequisites

- Report types defined (Step 1)
- Report builder designed (Step 2)
- Scheduling configured (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: reporting
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: data-export


---

## Inputs

- Report type, builder, and scheduling definitions from Steps 1-3
- User requirements for export capabilities
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Export Formats per Tier

Define available export formats:

| Format | Free | Pro | Enterprise | Max Size |
|--------|------|-----|------------|----------|
| CSV | Yes | Yes | Yes | 50MB |
| JSON | No | Yes | Yes | 50MB |
| Excel (.xlsx) | No | Yes | Yes | 25MB |
| PDF | No | Yes | Yes | 10MB |
| Parquet | No | No | Yes | 100MB |
| XML | No | No | Yes | 50MB |

Format Configuration:
| Setting | Description | Pro | Enterprise |
|---------|-------------|-----|------------|
| Encoding | UTF-8, UTF-16, etc. | Yes | Yes |
| Delimiter (CSV) | Comma, Tab, Pipe | Yes | Yes |
| Date Format | ISO, US, EU, Custom | Yes | Yes |
| Number Format | Locale-specific | Yes | Yes |
| Include Headers | Column names | Yes | Yes |
| Include Metadata | Report info | No | Yes |
| Compression | gzip, zip | No | Yes |

### 2. Define Delivery Channels

Define available delivery methods per tier:

| Channel | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Download (UI) | Yes | Yes | Yes |
| Email Attachment | No | Yes | Yes |
| Email Link | No | Yes | Yes |
| S3 Bucket | No | No | Yes |
| SFTP | No | No | Yes |
| Webhook | No | No | Yes |
| API Endpoint | No | No | Yes |
| GCS/Azure Blob | No | No | Yes |

Channel Configuration:
| Setting | Description |
|---------|-------------|
| Destination URL | Target location |
| Credentials | Auth method |
| Path Template | Dynamic path with variables |
| Filename Template | Dynamic filename |
| Retry Policy | On failure behavior |
| Timeout | Max delivery time |

### 3. Design Email Delivery

Define email delivery specifications:

| Feature | Pro | Enterprise |
|---------|-----|------------|
| Max Attachment Size | 10MB | 25MB |
| Attachment vs Link Threshold | 5MB | 10MB |
| Custom Subject | Yes | Yes |
| Custom Body | Basic | Full HTML |
| Multiple Recipients | 5 | 50 |
| CC/BCC Support | No | Yes |
| Reply-To Configuration | No | Yes |
| Sender Customization | No | Yes (verified domain) |

Link Delivery Settings:
| Setting | Pro | Enterprise |
|---------|-----|------------|
| Link Expiration | 7 days | 30 days |
| Password Protection | No | Yes |
| Download Limit | 10 | Unlimited |
| Access Audit | No | Yes |

### 4. Design Cloud Storage Delivery

Define cloud storage delivery (Enterprise):

| Setting | Description |
|---------|-------------|
| Provider | S3, GCS, Azure Blob, SFTP |
| Bucket/Container | Target location |
| Path Prefix | Folder structure |
| Filename Pattern | Dynamic naming |
| Credentials | IAM Role, Access Key, Service Account |
| Encryption | SSE-S3, SSE-KMS, Customer Key |
| Lifecycle | Auto-delete after N days |
| Notification | SNS, Pub/Sub, Event Grid |

Path Variables:
| Variable | Description | Example |
|----------|-------------|---------|
| `{tenant_id}` | Tenant identifier | `t_abc123` |
| `{report_id}` | Report identifier | `rpt_456` |
| `{date}` | Execution date | `2026-04-11` |
| `{timestamp}` | Unix timestamp | `1712851200` |
| `{format}` | File format | `csv` |

### 5. Define Webhook Delivery

Define webhook delivery specifications (Enterprise):

| Setting | Description |
|---------|-------------|
| HTTP Method | POST |
| URL | Customer webhook endpoint |
| Headers | Custom headers |
| Authentication | Bearer, API Key, HMAC |
| Payload Format | JSON with metadata + download URL |
| Retry Policy | 3 attempts, exponential backoff |
| Timeout | 30 seconds |
| TLS Required | Yes, TLS 1.2+ |

Webhook Payload:
```json
{
  "event": "report.completed",
  "report_id": "rpt_456",
  "schedule_id": "sch_789",
  "tenant_id": "t_abc123",
  "status": "success",
  "download_url": "https://...",
  "expires_at": "2026-04-18T00:00:00Z",
  "row_count": 1500,
  "file_size_bytes": 102400,
  "format": "csv",
  "generated_at": "2026-04-11T10:00:00Z"
}
```

### 6. Define Security Requirements

Establish security requirements for report delivery:

| Requirement | Description | Implementation |
|-------------|-------------|----------------|
| Encryption at Rest | Reports encrypted before storage | AES-256 |
| Encryption in Transit | Secure delivery channels | TLS 1.2+ |
| Access Control | Tenant isolation | Signed URLs, ACLs |
| Audit Logging | Track all exports | Audit log system |
| Data Masking | Sensitive field handling | PII masking rules |
| Retention | Auto-delete exported files | Configurable per tier |
| Compliance | Regulatory requirements | GDPR, SOC2, HIPAA |

**Verify current best practices with web search:**
Search the web: "secure report export delivery patterns {date}"
Search the web: "multi-tenant data export compliance {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

### Menu Options

### [A]nalyze Options
- **A1**: Review export formats for typical use cases
- **A2**: Analyze delivery channel requirements
- **A3**: Evaluate email delivery settings
- **A4**: Assess security requirements completeness

### [P]ropose Changes
- **P1**: Propose export format adjustments
- **P2**: Propose delivery channel modifications
- **P3**: Suggest email delivery enhancements
- **P4**: Recommend security requirement changes

### [C]ontinue
- **C1**: Accept current export design and complete Create mode
- **C2**: Mark step complete and generate reporting design document

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Export formats defined per tier
- [ ] Delivery channels documented
- [ ] Email delivery specifications complete
- [ ] Cloud storage delivery designed
- [ ] Webhook delivery specified
- [ ] Security requirements established
- [ ] Patterns align with pattern registry

## Outputs

- Export formats matrix by tier
- Delivery channel specifications
- Email delivery configuration
- Cloud storage delivery documentation
- Webhook delivery specifications
- Security requirements documentation
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-self-service-reporting-template.md`

## Next Step

This completes the Create mode for tenant-self-service-reporting workflow. 

Generate the final reporting design document using template:
`{project-root}/_bmad/bam/data/templates/tenant-self-service-reporting-template.md`

Output to: `{output_folder}/planning-artifacts/tenant-self-service-reporting.md`

## Quality Gate Summary

Review the completed reporting design:
- All report types defined for all tiers
- Report builder capabilities documented
- Scheduling options configured
- Export formats and delivery channels defined
- Tenant data isolation verified
