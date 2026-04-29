---
pattern_id: ai-safety
shortcode: ZAS
category: ai-safety
qg_ref: QG-I3
version: 1.0.0
last_reviewed: 2026-04-29
---

# AI Safety - BAM Pattern

**Loaded by:** ZAS  
**Applies to:** Agent security, prompt injection defense, refusal handling

---

## When to Use

- Implementing agent refusal handling for policy violations
- Detecting and preventing prompt injection attacks
- Defense-in-depth for multi-tenant AI systems
- Audit trail requirements for agent decisions
- Data exfiltration prevention across tenant boundaries

## When NOT to Use

- Internal-only agents with trusted inputs
- Development/sandbox environments
- Pre-validated inputs from trusted sources
- Single-tenant systems without isolation requirements

## Architecture

### Agent Refusal Headers

Standardized HTTP headers for communicating agent refusal decisions:

| Header | Type | Description |
|--------|------|-------------|
| `X-Agent-Refusal` | boolean | `true` if agent refused to process request |
| `X-Refusal-Reason` | string | Human-readable explanation of refusal |
| `X-Refusal-Code` | enum | Machine-readable refusal category |
| `X-Refusal-Confidence` | float | Confidence score (0.0-1.0) in refusal decision |

### Refusal Codes

| Code | Description | Typical Trigger |
|------|-------------|-----------------|
| `POLICY_VIOLATION` | Request violates content policy | Harmful content, restricted topics |
| `INJECTION_DETECTED` | Prompt injection attempt detected | Canary token triggered, jailbreak pattern |
| `RESOURCE_EXCEEDED` | Resource limits exceeded | Token count, rate limit, cost threshold |
| `CONFIDENCE_LOW` | Agent confidence below threshold | Ambiguous request, unclear intent |
| `TENANT_RESTRICTED` | Tenant-level restriction applies | Feature not enabled, tier limitation |

### Canary Token System

Invisible markers embedded in system prompts and data boundaries to detect injection attempts:

| Token Type | Purpose | Detection Trigger |
|------------|---------|-------------------|
| Tenant Boundary | Detect cross-tenant data access | Token from tenant A appears in tenant B context |
| System Prompt | Detect prompt extraction | System-level canary appears in output |
| Data Classification | Detect data exfiltration | Classified marker appears in unauthorized output |

```
┌────────────────────────────────────────────────────────────────┐
│                    Request Pipeline                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   Ingress    │───►│   Canary     │───►│    Agent     │      │
│  │   Filter     │    │   Injector   │    │   Runtime    │      │
│  └──────────────┘    └──────────────┘    └──────┬───────┘      │
│         │                   │                    │              │
│         │            Tenant Canary          ┌────▼────┐        │
│         │            System Canary          │ Output  │        │
│         │            Data Canary            │ Scanner │        │
│         │                                   └────┬────┘        │
│         │                                        │              │
│         ▼                                        ▼              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  Response Handler                         │  │
│  │  - Check for canary tokens in output                     │  │
│  │  - Set refusal headers if detected                       │  │
│  │  - Log security event to audit trail                     │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

### Implementation Pattern

```yaml
canary_config:
  tenant_canary:
    format: "<!-- TENANT:{tenant_id}:{nonce} -->"
    insertion_points:
      - system_prompt_header
      - context_boundaries
      - data_section_markers
    rotation: per_request
    
  system_canary:
    format: "<!-- SYSTEM:{deployment_id}:{timestamp} -->"
    insertion_points:
      - system_prompt_start
      - system_prompt_end
    rotation: hourly
    
  data_canary:
    format: "<!-- DATA:{classification}:{hash} -->"
    insertion_points:
      - before_sensitive_data
      - after_sensitive_data
    rotation: per_document
    
  detection:
    scan_outputs: true
    scan_tool_calls: true
    scan_intermediate_steps: true
    on_detection:
      - log_security_event
      - set_refusal_headers
      - terminate_request
      - notify_security_team
```

### Refusal Response Example

```http
HTTP/1.1 200 OK
X-Agent-Refusal: true
X-Refusal-Code: INJECTION_DETECTED
X-Refusal-Reason: Canary token detected in output
X-Refusal-Confidence: 0.95
Content-Type: application/json

{
  "status": "refused",
  "message": "Request could not be processed due to security constraints.",
  "incident_id": "inc_abc123",
  "support_url": "https://support.example.com/security"
}
```

## Trade-offs

| Approach | Benefit | Cost |
|----------|---------|------|
| Header-based refusal | Standardized, machine-readable | Requires client awareness |
| Inline canary tokens | Invisible to users | Token overhead, rotation complexity |
| External validation | Separation of concerns | Latency, additional service |
| Per-request rotation | Maximum security | Key management complexity |
| Static canaries | Simple implementation | Easier to detect/bypass |

## Web Research Queries

- "AI agent prompt injection defense patterns {date}"
- "LLM canary token detection techniques {date}"
- "multi-tenant AI safety guardrails {date}"
- "agent refusal handling best practices {date}"
- "prompt injection detection production systems {date}"
