# Step 3: Test PII Protection

## Purpose

Test PII detection, protection, and redaction mechanisms across the AI platform.

## Prerequisites

- Steps 1-2 complete
- PII protection controls deployed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `data-protection`

## Actions

### 1. PII Detection Testing

| PII Type | Detection Method | Test Data | Result |
|----------|------------------|-----------|--------|
| Email addresses | Regex + ML | test@example.com | |
| Phone numbers | Regex + ML | +1-555-123-4567 | |
| SSN/Tax IDs | Regex | 123-45-6789 | |
| Credit cards | Luhn + Regex | 4111-1111-1111-1111 | |
| Names | NER | John Smith | |
| Addresses | NER | 123 Main St | |

### 2. Input PII Protection

| Protection Point | Method | Test | Status |
|------------------|--------|------|--------|
| API input | Real-time scan | PII in prompt | |
| File upload | Pre-processing | PII in document | |
| Form data | Validation | PII in fields | |
| Webhook data | Ingest filter | External PII | |

### 3. Output PII Redaction

| Output Type | Redaction Method | Test | Status |
|-------------|------------------|------|--------|
| Model responses | Post-processing | Echo PII prompt | |
| Logs | Log sanitizer | PII in logs | |
| Exports | Export filter | PII in export | |
| API responses | Response filter | PII in JSON | |

### 4. PII in AI Context

| Context Type | Protection | Test | Status |
|--------------|------------|------|--------|
| System prompts | No PII allowed | Injection test | |
| RAG context | PII filtered | Retrieval test | |
| Agent memory | PII scrubbed | Memory recall | |
| Training data | PII removed | Model probe | |

**Verify PII protection best practices with web search:**
Search the web: "PII detection AI systems {date}"
Search the web: "GDPR PII protection validation {date}"

## Verification

- [ ] PII detection tested
- [ ] Input protection verified
- [ ] Output redaction verified
- [ ] AI context protection verified

## Outputs

- PII protection test results

## Next Step

Proceed to `step-04-c-validate-lifecycle.md`
