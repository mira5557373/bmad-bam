# Step 1: Assess Input/Output Guardrails

## Purpose

Evaluate the implementation and effectiveness of AI agent input and output guardrails.

## Prerequisites

- Agent runtime architecture document available
- AI guardrails implementation complete
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `ai-safety`

## Actions

### 1. Review Input Guardrails

Assess input filtering mechanisms:

| Guardrail | Check | Status |
|-----------|-------|--------|
| Prompt injection detection | Active and tested | |
| PII detection | Configured for tenant data | |
| Topic restrictions | Aligned with policy | |
| Input length limits | Enforced per tier | |

### 2. Review Output Guardrails

Assess output filtering mechanisms:

| Guardrail | Check | Status |
|-----------|-------|--------|
| Content filtering | Harmful content blocked | |
| PII redaction | Tenant data protected | |
| Hallucination detection | Fact-checking enabled | |
| Response length limits | Enforced per tier | |

### 3. Test Guardrail Bypass Attempts

Execute bypass test suite:

| Test Category | Test Count | Pass Rate Target |
|---------------|------------|------------------|
| Direct injection | 20+ tests | 100% |
| Encoded injection | 10+ tests | 100% |
| Role confusion | 10+ tests | 100% |
| Context manipulation | 10+ tests | 100% |

**Verify current best practices with web search:**
Search the web: "AI guardrail bypass prevention {date}"
Search the web: "prompt injection defense patterns {date}"

## Verification

- [ ] All input guardrails documented
- [ ] All output guardrails documented
- [ ] Bypass test suite executed
- [ ] Pass rate meets 100% target

## Outputs

- Guardrail assessment in safety report

## Next Step

Proceed to `step-02-c-test-budget-enforcement.md`
