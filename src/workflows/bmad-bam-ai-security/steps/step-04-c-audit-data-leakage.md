# Step 4: Audit Data Leakage Prevention

## Purpose

Audit controls preventing data leakage through AI systems including cross-tenant leakage and PII exposure.

## Prerequisites

- Steps 1-3 complete
- Data classification available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-isolation`

## Actions

### 1. Cross-Tenant Leakage Prevention

| Vector | Control | Test | Status |
|--------|---------|------|--------|
| Context isolation | Per-tenant context | Query other tenant | |
| Memory isolation | Tenant-scoped memory | Access other tenant memory | |
| RAG isolation | Tenant-scoped vectors | Retrieve other tenant docs | |
| Model fine-tuning | Isolated training | Cross-tenant influence | |

### 2. PII Protection

| Check | Control | Status |
|-------|---------|--------|
| Input PII detection | Real-time scanning | |
| Output PII redaction | Before response | |
| Logging PII scrub | Logs sanitized | |
| Training data PII | Removed before training | |

### 3. System Prompt Protection

| Protection | Implementation | Status |
|------------|----------------|--------|
| Prompt not in output | Filtered | |
| Prompt not in logs | Redacted | |
| Prompt not extractable | Defended | |

### 4. Inference Data Protection

| Data Type | Protection | Status |
|-----------|------------|--------|
| User inputs | Encrypted in transit | |
| Model outputs | Not persisted unnecessarily | |
| Embeddings | Tenant-isolated | |
| Tool data | Scoped to tenant | |

**Verify current best practices with web search:**
Search the web: "audit data leakage best practices {date}"
Search the web: "audit data leakage multi-tenant SaaS {date}"

## Verification

- [ ] Cross-tenant leakage blocked
- [ ] PII protection active
- [ ] System prompt protected
- [ ] Inference data secured

## Outputs

- Data leakage audit findings

## Next Step

Proceed to `step-05-c-review-access-controls.md`
