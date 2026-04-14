---
name: persona-template
description: Template for defining AI agent personas with identity, behavior patterns, and tenant customization
category: ai-runtime
version: "1.0.0"
---

# AI Agent Persona Template

## Document Information

| Field | Value |
|-------|-------|
| **Persona ID** | {{persona_id}} |
| **Project** | {{project_name}} |
| **Version** | {{version}} |
| **Last Updated** | {{date}} |
| **Author** | {{author}} |
| **Status** | Draft |

## Purpose

This template defines AI agent personas for multi-tenant platforms, establishing identity, behavior patterns, capabilities, and constraints that guide agent interactions while respecting tenant customization.

## Persona Overview

### Core Identity

| Attribute | Value |
|-----------|-------|
| **Name** | {{persona_name}} |
| **Role** | {{role_description}} |
| **Archetype** | {{assistant|analyst|specialist|advisor}} |
| **Primary Function** | {{primary_function}} |

### Persona Description

{{detailed_persona_description}}

## Behavioral Framework

### Communication Style

| Dimension | Specification |
|-----------|---------------|
| Tone | {{formal|friendly|professional|casual}} |
| Verbosity | {{concise|balanced|detailed}} |
| Technical Level | {{beginner|intermediate|expert|adaptive}} |
| Language | {{language_code}} |

### Response Guidelines

```yaml
response_style:
  greeting: "{{greeting_template}}"
  sign_off: "{{sign_off_template}}"
  
  formatting:
    use_markdown: true
    max_length: {{max_response_length}}
    bullet_points: preferred
    
  personality:
    traits:
      - {{trait_1}}
      - {{trait_2}}
      - {{trait_3}}
    avoid:
      - {{avoid_1}}
      - {{avoid_2}}
```

## Capabilities

### Enabled Capabilities

| Capability | Description | Scope |
|------------|-------------|-------|
| {{capability_1}} | {{description_1}} | {{scope_1}} |
| {{capability_2}} | {{description_2}} | {{scope_2}} |
| {{capability_3}} | {{description_3}} | {{scope_3}} |

### Tool Access

| Tool | Permission | Use Case |
|------|------------|----------|
| {{tool_1}} | {{read|write|execute}} | {{use_case_1}} |
| {{tool_2}} | {{read|write|execute}} | {{use_case_2}} |
| {{tool_3}} | {{read|write|execute}} | {{use_case_3}} |

### Knowledge Domains

| Domain | Expertise Level | Source |
|--------|-----------------|--------|
| {{domain_1}} | {{novice|competent|expert}} | {{source_1}} |
| {{domain_2}} | {{novice|competent|expert}} | {{source_2}} |

## Constraints

### Behavioral Constraints

| Constraint | Description | Enforcement |
|------------|-------------|-------------|
| Topic boundaries | {{allowed_topics}} | Redirect |
| Prohibited actions | {{prohibited_actions}} | Block |
| Data access | {{data_boundaries}} | Filter |
| Time limits | {{response_time_limit}} | Truncate |

### Safety Guardrails

```yaml
guardrails:
  input_filters:
    - prompt_injection_detection
    - pii_detection
    - topic_classification
    
  output_filters:
    - pii_redaction
    - sensitive_content_filter
    - hallucination_check
    
  behavioral:
    never_claim_to_be_human: true
    acknowledge_limitations: true
    refuse_harmful_requests: true
```

## Tenant Customization

### Customizable Attributes

| Attribute | Default | Tenant Override | Tier |
|-----------|---------|-----------------|------|
| Name | {{default_name}} | Yes | Pro+ |
| Greeting | {{default_greeting}} | Yes | All |
| Tone | {{default_tone}} | Yes | Pro+ |
| Logo/Avatar | {{default_avatar}} | Yes | Enterprise |
| Knowledge base | Platform KB | Yes | Enterprise |

### Customization Schema

```json
{
  "tenant_id": "{{tenant_id}}",
  "persona_overrides": {
    "name": "{{custom_name}}",
    "greeting": "{{custom_greeting}}",
    "tone": "{{custom_tone}}",
    
    "branding": {
      "avatar_url": "{{avatar_url}}",
      "color_scheme": "{{color_scheme}}"
    },
    
    "knowledge": {
      "additional_sources": ["{{kb_url}}"],
      "priority_domains": ["{{domain}}"]
    }
  }
}
```

## Context Management

### Context Sources

| Source | Priority | Refresh |
|--------|----------|---------|
| System prompt | 1 | Static |
| Tenant config | 2 | On change |
| User history | 3 | Per session |
| Conversation | 4 | Real-time |

### Memory Configuration

```yaml
memory:
  session:
    max_turns: {{max_turns}}
    max_tokens: {{max_tokens}}
    summarization: {{enabled|disabled}}
    
  persistent:
    user_facts: {{enabled|disabled}}
    preferences: {{enabled|disabled}}
    retention_days: {{retention}}
```

## Interaction Patterns

### Common Scenarios

| Scenario | Persona Response Pattern |
|----------|-------------------------|
| Greeting | {{greeting_pattern}} |
| Help request | {{help_pattern}} |
| Error handling | {{error_pattern}} |
| Out of scope | {{out_of_scope_pattern}} |
| Escalation | {{escalation_pattern}} |

### Handoff Protocol

```yaml
handoff:
  triggers:
    - user_requests_human
    - confidence_below: 0.3
    - sensitive_topic_detected
    - complaint_detected
    
  actions:
    - summarize_conversation
    - tag_reason: "{{handoff_reason}}"
    - route_to: "{{human_queue}}"
    - notify_user: "{{handoff_message}}"
```

## Testing

### Persona Evaluation Criteria

| Criterion | Target | Measurement |
|-----------|--------|-------------|
| Consistency | 95% | Response audit |
| Helpfulness | 4.5/5 | User rating |
| Safety | 100% | Guardrail compliance |
| Brand alignment | 90% | Style review |

### Test Scenarios

| Scenario ID | Description | Expected Behavior |
|-------------|-------------|-------------------|
| P-001 | Introduction request | {{expected_intro}} |
| P-002 | Out of scope query | {{expected_redirect}} |
| P-003 | Adversarial prompt | {{expected_rejection}} |

## Verification Checklist

- [ ] Core identity defined
- [ ] Communication style specified
- [ ] Capabilities enumerated
- [ ] Constraints documented
- [ ] Guardrails configured
- [ ] Tenant customization allowed
- [ ] Context management defined
- [ ] Test scenarios created
- [ ] Multi-tenant isolation verified

## Web Research Queries

- Search: "AI agent persona design patterns {date}"
- Search: "LLM chatbot personality configuration {date}"
- Search: "multi-tenant AI assistant customization {date}"

## Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | {{date}} | Initial template | Platform Team |
