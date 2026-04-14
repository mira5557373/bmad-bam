# Step 1: Audit Model Security Controls

## Purpose

Audit security controls protecting AI models from extraction, tampering, and unauthorized access.

## Prerequisites

- Model deployment configuration available
- Access to model registry
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `ai-security`

## Actions

### 1. Review Model Access Controls

| Control | Requirement | Status |
|---------|-------------|--------|
| Authentication required | All model endpoints | |
| Authorization enforced | Role-based access | |
| API key rotation | Automated rotation | |
| Tenant isolation | Per-tenant credentials | |

### 2. Audit Model Storage Security

| Check | Requirement | Status |
|-------|-------------|--------|
| Encryption at rest | AES-256 or equivalent | |
| Access logging | All access logged | |
| Version control | Immutable versioning | |
| Backup encryption | Encrypted backups | |

### 3. Review Model Extraction Prevention

| Defense | Implementation | Status |
|---------|----------------|--------|
| Rate limiting | Per-tenant limits | |
| Output monitoring | Anomaly detection | |
| Watermarking | Model outputs marked | |
| Query logging | All queries logged | |

**Verify current best practices with web search:**
Search the web: "LLM model security best practices {date}"
Search the web: "AI model extraction prevention {date}"

## Verification

- [ ] Access controls documented
- [ ] Storage security verified
- [ ] Extraction prevention in place

## Outputs

- Model security findings

## Next Step

Proceed to `step-02-c-audit-inference-endpoints.md`
