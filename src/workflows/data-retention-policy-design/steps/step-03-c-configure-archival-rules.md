# Step 3: Configure Archival Rules

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
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Configure automated archival rules including storage tier transitions, compression, encryption, and retrieval SLAs for archived data.

---

## Prerequisites

- Retention policies defined (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `data-archival`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Storage Tiers

| Tier | Storage Type | Cost | Access Latency | Use Case |
|------|--------------|------|----------------|----------|
| Hot | Primary database | High | Milliseconds | Active data, real-time access |
| Warm | Object storage (standard) | Medium | Seconds | Recent archives, occasional access |
| Cold | Object storage (infrequent) | Low | Minutes | Long-term archives, rare access |
| Glacier | Deep archive | Very Low | Hours | Compliance archives, minimal access |

### 2. Define Tier Transition Rules

| Data Category | Hot Duration | Warm Duration | Cold Duration | Final Tier |
|---------------|--------------|---------------|---------------|------------|
| User PII | Account active | 30 days post-deletion | 90 days | Delete |
| Transaction Records | 1 year | 2 years | 4 years | Glacier (7+ years) |
| Agent Execution Logs | 30 days | 60 days | N/A | Delete |
| Audit Trails | 1 year | 3 years | 6 years | Glacier (10+ years) |
| Analytics (Raw) | 30 days | 60 days | N/A | Delete |
| Backups | 7 days | 23 days | N/A | Delete |

### 3. Define Archival Processing

| Process | Description | Tenant Isolation |
|---------|-------------|------------------|
| Compression | ZSTD compression for text, LZ4 for binary | Per-tenant archive files |
| Encryption | AES-256 with per-tenant keys | Tenant-specific KEK |
| Deduplication | Block-level for backups | Within tenant scope only |
| Integrity Check | SHA-256 checksums | Per-archive verification |
| Metadata Extraction | Searchable index generation | Per-tenant index |

### 4. Define Retrieval SLAs

| Tier | Retrieval SLA | Cost Model | Request Process |
|------|---------------|------------|-----------------|
| Warm | < 5 minutes | Included | Self-service API |
| Cold | < 1 hour | Per-GB retrieval fee | Self-service API |
| Glacier | < 24 hours | Per-GB retrieval fee | Support ticket or API |
| Legal Hold | < 4 hours | Compliance priority | Legal team request |

### 5. Define Archive Retention Rules

| Archive Type | Minimum Retention | Maximum Retention | Deletion Trigger |
|--------------|-------------------|-------------------|------------------|
| PII Archives | 30 days | 90 days | Automatic expiry |
| Transaction Archives | 7 years | 10 years | Manual review |
| Compliance Archives | 10 years | Indefinite | Manual release |
| Backup Archives | 7 days | 90 days | Automatic rotation |

**Verify current best practices with web search:**
Search the web: "data archival best practices cloud storage {date}"
Search the web: "multi-tenant data archival patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the archival rules above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into storage tiers and transition rules
- **P (Party Mode)**: Bring analyst and architect perspectives for archival review
- **C (Continue)**: Accept archival rules and proceed to deletion procedures
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass archival context: storage tiers, transitions, processing rules
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into archival rules
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review archival rules: {summary of tiers and transitions}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save archival rules to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-design-deletion-procedures.md`

---

## Verification

- [ ] Storage tiers defined with cost/access tradeoffs
- [ ] Tier transition rules specified per data category
- [ ] Archival processing (compression, encryption) defined
- [ ] Retrieval SLAs documented per tier
- [ ] Tenant isolation maintained in archives
- [ ] Patterns align with pattern registry

---

## Outputs

- Storage tier definitions
- Tier transition rules matrix
- Archival processing specifications
- Retrieval SLA catalog
- **Load template:** `{project-root}/_bmad/bam/templates/data-archival-template.md`

---

## Next Step

Proceed to `step-04-c-design-deletion-procedures.md` to design secure deletion procedures.
