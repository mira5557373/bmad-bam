---
name: agent-debug-report-template
description: Documents agent debugging investigations including root cause analysis and resolution for AI agent issues
category: ai-runtime
version: "1.0.0"
---

# Agent Debug Report Template

## Report Information

| Field | Value |
|-------|-------|
| **Report ID** | {{report_id}} |
| **Agent** | {{agent_name}} |
| **Date** | {{date}} |
| **Investigator** | {{author}} |
| **Severity** | {{severity}} |
| **Status** | Investigation In Progress |

## Issue Summary

### Problem Statement

{{description_of_issue}}

### Reproduction Steps

1. {{step_1}}
2. {{step_2}}
3. {{step_3}}

### Expected Behavior

{{expected_behavior}}

### Actual Behavior

{{actual_behavior}}

## Agent Context

### Agent Configuration

| Setting | Value |
|---------|-------|
| Agent ID | {{agent_id}} |
| Agent Type | {{agent_type}} |
| Model | {{model_name}} |
| Temperature | {{temperature}} |
| Max Tokens | {{max_tokens}} |
| Tools Enabled | {{tools_list}} |

### Tenant Context

| Field | Value |
|-------|-------|
| Tenant ID | {{tenant_id}} |
| Tier | {{tier}} |
| Token Budget | {{token_budget}} |
| Rate Limits | {{rate_limits}} |

## Debug Analysis

### Conversation Trace

```
Run ID: {{run_id}}
Conversation ID: {{conversation_id}}

Turn 1:
  Input: {{user_input_1}}
  Thinking: {{agent_thinking_1}}
  Tool Calls: {{tool_calls_1}}
  Output: {{agent_output_1}}

Turn 2:
  Input: {{user_input_2}}
  ...
```

### Tool Execution Log

| Tool | Input | Output | Duration | Status |
|------|-------|--------|----------|--------|
| {{tool_1}} | {{input_1}} | {{output_1}} | {{duration_1}} | {{status_1}} |
| {{tool_2}} | {{input_2}} | {{output_2}} | {{duration_2}} | {{status_2}} |

### Memory State

```json
{
  "session_memory": {{session_memory_snapshot}},
  "user_memory": {{user_memory_snapshot}},
  "tenant_memory": {{tenant_memory_snapshot}}
}
```

### Token Usage

| Metric | Value | Budget | % Used |
|--------|-------|--------|--------|
| Input Tokens | {{input_tokens}} | {{input_budget}} | {{input_pct}} |
| Output Tokens | {{output_tokens}} | {{output_budget}} | {{output_pct}} |
| Total Tokens | {{total_tokens}} | {{total_budget}} | {{total_pct}} |

## Root Cause Analysis

### Identified Issues

1. **{{issue_1_title}}**
   - Description: {{issue_1_description}}
   - Evidence: {{issue_1_evidence}}
   - Impact: {{issue_1_impact}}

2. **{{issue_2_title}}**
   - Description: {{issue_2_description}}
   - Evidence: {{issue_2_evidence}}
   - Impact: {{issue_2_impact}}

### Contributing Factors

- [ ] Prompt engineering issue
- [ ] Tool configuration error
- [ ] Memory corruption
- [ ] Context overflow
- [ ] Rate limiting triggered
- [ ] Model capability limitation
- [ ] Tenant isolation violation
- [ ] External API failure

## Resolution

### Immediate Fix

{{immediate_fix_description}}

### Long-Term Solution

{{long_term_solution_description}}

### Code Changes

```diff
{{code_diff}}
```

## Prevention

### Recommended Safeguards

1. {{safeguard_1}}
2. {{safeguard_2}}
3. {{safeguard_3}}

### Monitoring Additions

- [ ] Add alert for {{alert_condition}}
- [ ] Add metric for {{metric_name}}
- [ ] Add log for {{log_event}}

## Verification Checklist

- [ ] Root cause identified
- [ ] Fix implemented and tested
- [ ] No regression in related functionality
- [ ] Tenant isolation verified
- [ ] Token budget not exceeded
- [ ] All tools functioning correctly
- [ ] Memory state consistent
- [ ] Monitoring updated

## Web Research Queries

- Search: "LLM agent debugging techniques {date}"
- Search: "AI agent troubleshooting patterns {date}"
- Search: "LangGraph debugging best practices {date}"

## Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | {{date}} | Initial template | Platform Team |
