# Step 2: Format Output

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Format the tool inventory for display.

---

## Prerequisites

- Module scanned (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: run-contracts`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

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

**Verify current best practices with web search:**
Search the web: "format output best practices {date}"
Search the web: "format output enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After formatting the output above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into output formatting using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for format review
- **C (Continue)**: Accept formatted output and complete Create mode
- **[Specific refinements]**: Describe what you'd like to adjust

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass format context: output generated, preferences applied
- Process enhanced insights from deep questioning
- Ask user: "Accept these format adjustments? (y/n)"
- If yes, integrate into final output
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tool listing format: {summary of format choices}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Display formatted results to user
- Update frontmatter `stepsCompleted: [1, 2]`
- Create mode complete

---

## Verification

- [ ] Output format selected
- [ ] Sorting applied
- [ ] Display preferences honored
- [ ] Results formatted correctly
- [ ] Patterns align with pattern registry

---

## Outputs

- Formatted tool listing
- **Load template:** `{project-root}/_bmad/bam/templates/tool-inventory-template.md`

---

## Next Step

Display results to user.
