# Step 5: Design Data Completeness Verification

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

Design verification mechanisms to ensure export completeness and integrity.

---

## Prerequisites

- Audit trail implemented (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design verification mechanisms:

---

## Pre-Export Data Inventory

Before export begins, generate inventory:

| Category | Inventory Check | Metric |
|----------|-----------------|--------|
| User | Count users, profiles | Row count |
| Conversations | Count conversations, messages | Row count |
| Documents | List files with sizes | File count, total bytes |
| Agents | Count agent definitions | Row count |
| Audit Logs | Count log entries in period | Row count |

Inventory stored with export request for post-export comparison.

---

## Post-Export Checksum Validation

Generate checksums for each exported file:

```
checksums.sha256:
user/profile.json           sha256:abc123...
user/preferences.json       sha256:def456...
content/conversations.json  sha256:ghi789...
content/documents/doc1.pdf  sha256:jkl012...
```

Verification process:
1. Calculate SHA-256 for each file during packaging
2. Store checksums in `checksums.sha256` file
3. Calculate ZIP archive checksum
4. Provide checksum in manifest for user verification

---

## Missing Data Detection

| Check | Detection Method | Action |
|-------|------------------|--------|
| Missing files | Compare inventory vs. export | Log gap, notify user |
| Partial data | Row count mismatch | Flag in report |
| Failed collection | Pipeline error status | Retry or exclude |
| Size anomaly | Expected vs. actual size | Alert for review |

Missing data report included in export:
```json
{
  "completeness": {
    "status": "PARTIAL",
    "expected_files": 150,
    "exported_files": 148,
    "missing": [
      {
        "type": "document",
        "id": "doc_xyz",
        "reason": "Storage unavailable"
      }
    ],
    "user_notified": true
  }
}
```

---

## Verification Report

Included in every export package:

```json
{
  "verification": {
    "pre_export_inventory": {
      "users": 50,
      "conversations": 1200,
      "documents": 150,
      "agents": 25,
      "audit_entries": 5000
    },
    "post_export_counts": {
      "users": 50,
      "conversations": 1200,
      "documents": 148,
      "agents": 25,
      "audit_entries": 5000
    },
    "completeness_percentage": 99.8,
    "checksum_validation": "PASSED",
    "encryption_verification": "PASSED",
    "generated_at": "2026-04-09T12:05:00Z"
  }
}
```

---

## User Self-Verification

Provide tools for users to verify their export:

| Tool | Purpose | Location |
|------|---------|----------|
| Checksum Verifier | Verify file integrity | CLI tool download |
| Manifest Viewer | Browse export contents | Web UI |
| Completeness Report | Review what's included | In export package |

---

## Documentation Deliverables

Output files to generate:
- `{output_folder}/planning-artifacts/compliance/data-export-design.md`
- `{output_folder}/planning-artifacts/architecture/export-pipeline.md`

**Verify current best practices with web search:**
Search the web: "data export verification tenant lifecycle {date}"
Search the web: "export integrity validation multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the verification design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into verification edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for verification review
- **C (Continue)**: Accept verification and finalize data export design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass verification context: inventory, checksums, missing data, report
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into verification design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review verification design: {summary of checks and reports}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save verification design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Generate final data export documentation

---

## Verification

- [ ] Pre-export inventory defined
- [ ] Checksum validation implemented
- [ ] Missing data detection designed
- [ ] Verification report specified
- [ ] User self-verification tools defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Data export design document
- Export pipeline architecture
- **Load template:** `{project-root}/_bmad/bam/data/templates/compliance-design-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/data-export-template.md`

---

## Next Step

Proceed to validation mode to verify data export design, or continue with implementation.
