# Step 2: Format Output

Format the tool inventory for display:

## Output Formats

**Summary View (Default):**
```
## Available Tools

### Search Tools
- **tool-name** - Brief description

### Write Tools
- **tool-name** - Brief description

### Analysis Tools
- **tool-name** - Brief description

Total: N tools
```

**Detailed View:**
```
## Tool: {tool-name}

**Category:** {category}
**Module:** {module}
**Permission:** {permission-level}
**Status:** {status}

### Description
{full description}

### Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| param1 | string | Yes | ... |

### Output
{output schema description}

### Example Usage
{example}

---
```

**Table View:**
```
| Tool | Category | Module | Permission | Status |
|------|----------|--------|------------|--------|
| ... | ... | ... | ... | ... |
```

**JSON View:**
```json
{
  "tools": [
    {
      "name": "tool-name",
      "category": "search",
      "module": "bmad-bam",
      "permission": "safe",
      "status": "active",
      "description": "...",
      "parameters": [...],
      "output": {...}
    }
  ],
  "totalCount": N,
  "generatedAt": "ISO-date"
}
```

## Sorting Options

Support sorting by:
- Name (alphabetical)
- Category (grouped)
- Module (grouped)
- Permission level (safe first)
- Recently updated

## Display Preferences

Apply user preferences:
- Show/hide deprecated tools
- Show/hide experimental tools
- Filter by permission level
- Limit results count

Output: Formatted tool listing in requested format.
