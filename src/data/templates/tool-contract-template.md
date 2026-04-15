---
name: Tool Contract Template
description: Template for documenting AI tool contracts per module
category: integration
version: 1.0.0
type: "integration"
---

## Purpose

Template for documenting AI tool contracts per module

# Tool Contract: {{module_name}}

## Metadata

| Field          | Value                                          |
| -------------- | ---------------------------------------------- |
| Module         | {{module_name}}                                |
| Version        | {{semver}} — follows facade contract version   |
| Tools Count    | {{tools_count}}                                |
| Last Updated   | {{date}}                                       |
| Contract Owner | {{owner}}                                      |

## Tool Summary Matrix

| Tool Name              | Tier                | Category             | Approval | Idempotent | Timeout | Cost            |
| ---------------------- | ------------------- | -------------------- | -------- | ---------- | ------- | --------------- |
| `{{module_name}}_{{action}}` | FREE/PRO/ENTERPRISE | READ/WRITE/DANGEROUS | Yes/No   | Yes/No     | Ns      | LOW/MEDIUM/HIGH |

## Tools

### `{{module_name}}_{{action}}`

**Core Properties:**

| Property          | Value                |
| ----------------- | -------------------- |
| Tier Requirement  | FREE/PRO/ENTERPRISE  |
| Category          | READ/WRITE/DANGEROUS |
| Approval Required | Yes/No               |
| Idempotent        | Yes/No               |
| Sandbox Required  | Yes/No               |
| Timeout           | N seconds            |
| Cost Estimate     | LOW/MEDIUM/HIGH      |

**Rate Limit:**

| Scope      | Limit      | Window    |
| ---------- | ---------- | --------- |
| Per Tenant | N requests | N seconds |

**Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "{{param_name}}": {
      "type": "{{param_type}}",
      "description": "{{param_description}}"
    }
  },
  "required": ["{{required_params}}"]
}
```

**Semantic Keywords:** `keyword1`, `keyword2`, `keyword3` (3-10 per tool)

**Facade Method:** `{{module_name}}_facade.{{method_name}}`

**Example Usage (for LLM context):**

```
User: "{{natural_language_trigger}}"
Tool Call: {{module_name}}_{{action}}({{params}})
```

---

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "AI tool contract best practices {date}"
- "tool contract multi-tenant SaaS patterns {date}"
- "MCP tool specification enterprise implementation {date}"

Incorporate relevant findings into the document sections above.

---

## Verification Checklist

- [ ] Tool summary matrix includes all tools with tier, category, and approval requirements
- [ ] Each tool has defined core properties (tier, category, idempotent, sandbox, timeout, cost)
- [ ] Rate limits are specified per tenant with appropriate windows
- [ ] Input schema is complete with types, descriptions, and required fields
- [ ] Semantic keywords (3-10) are defined for each tool for discovery
- [ ] Facade method mapping is documented for each tool
- [ ] Example usage includes natural language trigger and tool call format
- [ ] Tools follow tenant isolation requirements in their implementation
- [ ] Dangerous tools require appropriate approval workflows
- [ ] Tool version aligns with facade contract version
- [ ] Breaking change policy is documented with deprecation periods
- [ ] Multi-tenant considerations (tenant context, tier checks) are addressed

---

## Breaking Change Policy

- Tool removal: 6-month deprecation period with `deprecated=True` flag
- Input schema changes: Non-breaking additions only; breaking changes require new tool
- Tier changes: Downgrade (PRO→FREE) is non-breaking; upgrade (FREE→PRO) is breaking
- Version follows facade contract version (Section 22.6.6)

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
