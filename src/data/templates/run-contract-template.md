---
name: run-contract-template
description: Template for defining AI agent run contracts with objectives, constraints, and success criteria
category: integration
version: 1.0.0
type: template
---

# Run Contract: {{run_name}}

## Purpose

Define the contract for an AI agent run, specifying objectives, constraints, budgets, and success criteria.

## Run Identification

| Field | Value |
|-------|-------|
| Run ID | {{run_id}} |
| Agent | {{agent_name}} |
| Version | {{agent_version}} |
| Tenant | {{tenant_id}} |
| Initiated By | {{initiator}} |
| Created | {{created_timestamp}} |

## Objective

### Primary Goal
{{primary_objective}}

### Success Criteria
| Criterion | Measurement | Target |
|-----------|-------------|--------|
| {{criterion_1}} | {{measure_1}} | {{target_1}} |
| {{criterion_2}} | {{measure_2}} | {{target_2}} |
| {{criterion_3}} | {{measure_3}} | {{target_3}} |

### Acceptance Test
{{acceptance_test_description}}

## Budget Constraints

### Token Budget
| Model | Max Tokens | Estimated Cost |
|-------|------------|----------------|
| {{model_1}} | {{token_limit_1}} | {{cost_1}} |
| {{model_2}} | {{token_limit_2}} | {{cost_2}} |

### Time Budget
- **Maximum Duration:** {{max_duration}}
- **Soft Timeout Warning:** {{soft_timeout}}
- **Hard Timeout Action:** {{hard_timeout_action}}

### Cost Budget
- **Maximum Cost:** ${{max_cost_usd}}
- **Cost Alert Threshold:** ${{alert_threshold_usd}}

## Tool Permissions

### Allowed Tools
| Tool | Permission Level | Rate Limit |
|------|------------------|------------|
| {{tool_1}} | {{permission_1}} | {{rate_1}} |
| {{tool_2}} | {{permission_2}} | {{rate_2}} |
| {{tool_3}} | {{permission_3}} | {{rate_3}} |

### Forbidden Actions
- {{forbidden_1}}
- {{forbidden_2}}
- {{forbidden_3}}

## Risk Classification

| Dimension | Level | Justification |
|-----------|-------|---------------|
| Data Sensitivity | {{data_risk_level}} | {{data_risk_reason}} |
| Action Reversibility | {{action_risk_level}} | {{action_risk_reason}} |
| External Impact | {{external_risk_level}} | {{external_risk_reason}} |
| **Overall Risk Class** | {{overall_risk_class}} | |

## Orchestration Mode

- **Mode:** {{orchestration_mode}}
- **Framework:** {{framework}}
- **State Persistence:** {{state_persistence}}

### Checkpoint Strategy
- **Checkpoint Interval:** {{checkpoint_interval}}
- **Recovery Strategy:** {{recovery_strategy}}

## Memory Configuration

| Tier | Enabled | TTL | Size Limit |
|------|---------|-----|------------|
| Session | {{session_enabled}} | {{session_ttl}} | {{session_limit}} |
| User | {{user_enabled}} | {{user_ttl}} | {{user_limit}} |
| Tenant | {{tenant_enabled}} | {{tenant_ttl}} | {{tenant_limit}} |

## Guardrails

### Input Validation
- {{input_guardrail_1}}
- {{input_guardrail_2}}

### Output Validation
- {{output_guardrail_1}}
- {{output_guardrail_2}}

### Kill Switch Triggers
| Condition | Action |
|-----------|--------|
| {{kill_condition_1}} | {{kill_action_1}} |
| {{kill_condition_2}} | {{kill_action_2}} |

## Audit Requirements

- **Log Level:** {{log_level}}
- **Retain Logs For:** {{log_retention}}
- **PII Handling:** {{pii_handling}}

## Related Documents

- Knowledge: `run-contracts.md`
- Agent Runtime: `agent-runtime-architecture-template.md`
- Tool Contracts: `tool-contract-template.md`

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "AI agent run contract best practices {date}"
- "agent orchestration multi-tenant SaaS patterns {date}"
- "LLM agent budget enterprise implementation {date}"

Incorporate relevant findings into the document sections above.

---

## Verification Checklist

- [ ] Primary objective and success criteria are clearly defined and measurable
- [ ] Token budget is specified per model with estimated cost limits
- [ ] Time budget includes soft timeout warning and hard timeout action
- [ ] Tool permissions are documented with permission levels and rate limits
- [ ] Forbidden actions are explicitly listed to prevent unsafe operations
- [ ] Risk classification covers data sensitivity, action reversibility, and external impact
- [ ] Orchestration mode and framework are specified with state persistence strategy
- [ ] Checkpoint strategy defines interval and recovery approach
- [ ] Memory configuration specifies tier access (Session, User, Tenant) with TTL and limits
- [ ] Input and output guardrails are defined for validation
- [ ] Kill switch triggers and actions are documented for safety mechanisms
- [ ] Audit requirements specify log level, retention, and PII handling

---

## Contract Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Requestor | {{requestor}} | {{request_date}} | |
| Security Review | {{security_reviewer}} | {{security_date}} | |
| Approved By | {{approver}} | {{approval_date}} | |

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
