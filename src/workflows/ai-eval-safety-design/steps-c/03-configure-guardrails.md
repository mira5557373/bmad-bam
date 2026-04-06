# Step 3: Configure Guardrails

Design and configure the guardrail system for runtime safety:

## Input Guardrails

Configure pre-execution checks:
- Input content filtering (toxicity, PII detection)
- Prompt injection detection patterns
- Input length and complexity limits
- Schema validation for structured inputs

## Output Guardrails

Configure post-execution checks:
- Output content filtering
- PII redaction rules
- Hallucination detection thresholds
- Response format validation

## Execution Guardrails

Configure runtime controls:
- Tool permission enforcement
- Memory access controls
- Cost and token budgets
- Execution time limits
- Concurrency limits

## Guardrail Configuration

For each guardrail, specify:
- Trigger conditions
- Action on trigger (block, warn, log, escalate)
- Bypass conditions (if any)
- Tenant tier overrides
- Monitoring and alerting rules

## Guardrail Hierarchy

Define the evaluation order:
1. System-level guardrails (non-negotiable)
2. Tenant-level guardrails (configurable per tier)
3. Agent-level guardrails (specific to agent type)
4. Task-level guardrails (context-specific)

Output: Guardrail configuration document with all rules and thresholds.
