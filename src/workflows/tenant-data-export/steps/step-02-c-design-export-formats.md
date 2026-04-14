# Step 2: Design Export Formats

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

Design export format specifications for GDPR-compliant machine-readable data portability.

---

## Prerequisites

- Exportable data categories defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design export formats for each data category:

---

## JSON Schema (Structured Data)

```yaml
export_schema:
  version: "1.0"
  tenant_id: string
  export_date: ISO8601
  categories:
    user:
      profile: object
      preferences: object
      api_keys: array
    content:
      conversations: array
      agents: array
      workflows: array
    configuration:
      workspace: object
      integrations: array
      security: object
    activity:
      format: "csv"
      files: ["audit_logs.csv", "usage.csv", "billing.csv"]
```

JSON characteristics:
- UTF-8 encoding
- Pretty-printed (2-space indent)
- Null values preserved
- Dates in ISO8601 format
- IDs as strings (not integers)

---

## CSV Format (Tabular Data)

| Aspect | Specification |
|--------|---------------|
| Delimiter | Comma (,) |
| Quote Character | Double quote (") |
| Encoding | UTF-8 with BOM |
| Line Ending | CRLF (\r\n) |
| Header Row | Required, first row |
| Date Format | ISO8601 (YYYY-MM-DDTHH:MM:SSZ) |

CSV files generated:
- `audit_logs.csv` - User actions with timestamps
- `usage_metrics.csv` - API calls, agent runs
- `billing_history.csv` - Invoice records

---

## File Packaging

Export package structure:

```
tenant_export_{tenant_id}_{timestamp}.zip
├── manifest.json          # Export metadata
├── user/
│   ├── profile.json
│   ├── preferences.json
│   └── api_keys.json
├── content/
│   ├── conversations.json
│   ├── agents.json
│   ├── workflows.json
│   └── documents/
│       ├── doc1.pdf
│       └── doc2.txt
├── configuration/
│   ├── workspace.json
│   ├── integrations.json
│   └── security.json
├── activity/
│   ├── audit_logs.csv
│   ├── usage_metrics.csv
│   └── billing_history.csv
└── checksums.sha256       # Integrity verification
```

---

## Manifest Schema

```json
{
  "export_version": "1.0",
  "tenant_id": "tenant_abc123",
  "export_timestamp": "2026-04-09T12:00:00Z",
  "requested_by": "user@example.com",
  "categories_included": ["user", "content", "configuration", "activity"],
  "file_count": 15,
  "total_size_bytes": 1048576,
  "encryption": {
    "enabled": true,
    "algorithm": "AES-256-GCM",
    "key_derivation": "PBKDF2"
  },
  "checksums": {
    "algorithm": "SHA-256",
    "file": "checksums.sha256"
  }
}
```

---

## Encryption Options

| Option | Description | Default |
|--------|-------------|---------|
| Password Protection | User-provided password | Optional |
| AES-256 | Symmetric encryption | Required for sensitive |
| Key Derivation | PBKDF2 with salt | Default |
| Integrity | HMAC verification | Always |

**Verify current best practices with web search:**
Search the web: "data export formats tenant lifecycle {date}"
Search the web: "machine-readable export multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the export formats above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into format specifications
- **P (Party Mode)**: Bring analyst and architect perspectives for format review
- **C (Continue)**: Accept formats and proceed to export pipeline
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass format context: JSON schema, CSV spec, packaging, encryption
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into export formats
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review export formats: {summary of schemas and packaging}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save export formats to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-build-export-pipeline.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the export format specification phase.**

Present summary of:
- JSON schema structure for structured data export
- CSV format specifications for tabular data
- File packaging structure with manifest and encryption options

Ask for confirmation before proceeding to export pipeline design.

---

## Verification

- [ ] JSON schema defined
- [ ] CSV format specified
- [ ] File packaging structure documented
- [ ] Manifest schema complete
- [ ] Encryption options defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Export format specifications
- JSON and CSV schemas

---

## Next Step

Proceed to `step-03-c-build-export-pipeline.md` to design the export pipeline.
