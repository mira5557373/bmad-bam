# Step 5: Review AI Access Controls

## Purpose

Review access control mechanisms for AI resources, models, and agent capabilities.

## Prerequisites

- Steps 1-4 complete
- RBAC/ABAC configuration available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `rbac`

## Actions

### 1. Model Access Matrix

| Role | View Models | Use Models | Manage Models | Deploy |
|------|-------------|------------|---------------|--------|
| User | ✓ | ✓ | ✗ | ✗ |
| Power User | ✓ | ✓ | ✗ | ✗ |
| Tenant Admin | ✓ | ✓ | ✓ | ✗ |
| Platform Admin | ✓ | ✓ | ✓ | ✓ |

### 2. Agent Permission Matrix

| Permission | Free | Pro | Enterprise |
|------------|------|-----|------------|
| Basic agents | ✓ | ✓ | ✓ |
| Custom tools | ✗ | ✓ | ✓ |
| Code execution | ✗ | ✓ | ✓ |
| External APIs | ✗ | Limited | ✓ |
| File access | ✗ | Limited | ✓ |

### 3. Tool Permission Audit

| Tool | Permission Required | Tenant Override | Status |
|------|---------------------|-----------------|--------|
| Web search | ai.tools.search | Yes | |
| Code interpreter | ai.tools.code | Yes | |
| File upload | ai.tools.files | Yes | |
| External API | ai.tools.api | Yes | |

### 4. Audit Access Logs

| Check | Requirement | Status |
|-------|-------------|--------|
| All AI access logged | Complete audit trail | |
| Unauthorized attempts logged | Alert generated | |
| Admin actions logged | Separate audit | |
| Log retention | Per compliance | |

**Verify current best practices with web search:**
Search the web: "review access controls best practices {date}"
Search the web: "review access controls multi-tenant SaaS {date}"

## Verification

- [ ] Role matrix documented
- [ ] Permissions enforced correctly
- [ ] Tool permissions configured
- [ ] Access logging complete

## Outputs

- Access control audit findings

## Next Step

Proceed to `step-06-c-generate-report.md`
