# Tool Contract: {{MODULE_NAME}}

## Metadata

| Field          | Value                                          |
| -------------- | ---------------------------------------------- |
| Module         | {{MODULE_NAME}}                                |
| Version        | {{SEMVER}} — follows facade contract version   |
| Tools Count    | {{TOOLS_COUNT}}                                |
| Last Updated   | {{DATE}}                                       |
| Contract Owner | {{OWNER}}                                      |

## Tool Summary Matrix

| Tool Name              | Tier                | Category             | Approval | Idempotent | Timeout | Cost            |
| ---------------------- | ------------------- | -------------------- | -------- | ---------- | ------- | --------------- |
| `{{MODULE_NAME}}_{{ACTION}}` | FREE/PRO/ENTERPRISE | READ/WRITE/DANGEROUS | Yes/No   | Yes/No     | Ns      | LOW/MEDIUM/HIGH |

## Tools

### `{{MODULE_NAME}}_{{ACTION}}`

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
    "{{PARAM_NAME}}": {
      "type": "{{PARAM_TYPE}}",
      "description": "{{PARAM_DESCRIPTION}}"
    }
  },
  "required": ["{{REQUIRED_PARAMS}}"]
}
```

**Semantic Keywords:** `keyword1`, `keyword2`, `keyword3` (3-10 per tool)

**Facade Method:** `{{MODULE_NAME}}_facade.{{METHOD_NAME}}`

**Example Usage (for LLM context):**

```
User: "{{NATURAL_LANGUAGE_TRIGGER}}"
Tool Call: {{MODULE_NAME}}_{{ACTION}}({{PARAMS}})
```

---

## Breaking Change Policy

- Tool removal: 6-month deprecation period with `deprecated=True` flag
- Input schema changes: Non-breaking additions only; breaking changes require new tool
- Tier changes: Downgrade (PRO→FREE) is non-breaking; upgrade (FREE→PRO) is breaking
- Version follows facade contract version (Section 22.6.6)
