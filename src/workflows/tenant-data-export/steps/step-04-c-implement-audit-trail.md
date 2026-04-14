# Step 4: Implement Audit Trail

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Design comprehensive audit trail for export operations to meet GDPR accountability requirements.

---

## Prerequisites

- Export pipeline designed (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `observability`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design audit trail for export operations:

---

## Export Request Logging

| Field | Description | Example |
|-------|-------------|---------|
| export_id | Unique export identifier | exp_abc123 |
| tenant_id | Requesting tenant | tenant_xyz |
| requested_by | User who initiated | user@example.com |
| requested_at | Timestamp | 2026-04-09T12:00:00Z |
| request_ip | Client IP address | 192.168.1.1 |
| request_method | UI, API, Support | UI |
| categories | Data categories requested | ["user", "content"] |
| encryption_requested | Boolean | true |
| delivery_method | download, email, webhook | download |

---

## Processing Status Tracking

| Status | Description | Logged At |
|--------|-------------|-----------|
| PENDING | Request received, queued | Immediately |
| PROCESSING | Export job started | Job start |
| COLLECTING_USER | Extracting user data | Stage start |
| COLLECTING_CONTENT | Extracting content | Stage start |
| COLLECTING_CONFIG | Extracting config | Stage start |
| COLLECTING_ACTIVITY | Generating CSVs | Stage start |
| PACKAGING | Creating ZIP | Stage start |
| ENCRYPTING | Applying encryption | Stage start |
| UPLOADING | Storing to S3 | Stage start |
| COMPLETED | Ready for download | Completion |
| FAILED | Export failed | Failure |
| EXPIRED | Download link expired | Expiry |

Status log entry:
```json
{
  "export_id": "exp_abc123",
  "status": "COLLECTING_CONTENT",
  "timestamp": "2026-04-09T12:00:30Z",
  "details": {
    "files_processed": 45,
    "bytes_processed": 1048576
  }
}
```

---

## Download Access Logging

| Field | Description |
|-------|-------------|
| export_id | Export identifier |
| download_timestamp | When downloaded |
| downloaded_by | User who downloaded |
| download_ip | Client IP |
| download_count | Number of downloads |
| user_agent | Browser/client info |

---

## Retention and Cleanup

| Data Type | Retention | Cleanup Action |
|-----------|-----------|----------------|
| Export Request Log | 1 year | Archive to cold storage |
| Processing Logs | 90 days | Delete |
| Download Logs | 1 year | Archive to cold storage |
| Export Package | 7 days | Delete from hot storage |
| Archive Copy | 30 days | Delete permanently |

Cleanup job schedule:
- Daily: Delete expired export packages
- Weekly: Archive old logs to cold storage
- Monthly: Purge logs past retention

---

## Compliance Reports

Generate compliance reports on demand:

| Report | Contents | Format |
|--------|----------|--------|
| Export Activity | All exports for period | CSV |
| Request Log | Detailed request history | JSON |
| Access Log | Download activity | CSV |
| Compliance Summary | Statistics and anomalies | PDF |

**Verify current best practices with web search:**
Search the web: "data export audit trail tenant lifecycle {date}"
Search the web: "compliance audit logging multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the audit trail design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into audit requirements
- **P (Party Mode)**: Bring analyst and architect perspectives for audit review
- **C (Continue)**: Accept audit trail and proceed to verification
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass audit context: logging, status, retention, reports
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into audit trail
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review audit trail: {summary of logging and retention}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save audit trail to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-design-verification.md`

---

## Soft Gate Checkpoint

**Steps 1-4 complete the export implementation design.**

Present summary of:
- Export request and processing status logging specifications
- Download access audit trail configuration
- Retention policies and compliance report generation

Ask for confirmation before proceeding to verification design.

---

## Verification

- [ ] Export request logging defined
- [ ] Status tracking implemented
- [ ] Download logging configured
- [ ] Retention policies specified
- [ ] Compliance reports defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Audit trail specification
- Retention policy document

---

## Next Step

Proceed to `step-05-c-design-verification.md` to design data completeness verification.
