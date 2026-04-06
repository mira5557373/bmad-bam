# Step 1: Scan Module

Discover all registered AI tools in the BAM module:

## Scan Locations

Search for tool definitions in:
- `bmad-bam/src/tools/` - Core tool implementations
- `bmad-bam/src/workflows/*/` - Workflow-specific tools
- `bmad-bam/src/agents/*/tools/` - Agent-specific tools

## Tool Discovery

For each tool found, extract:
- Tool name (unique identifier)
- Tool description
- Tool category (search, write, analyze, execute, etc.)
- Input parameters with types
- Output schema
- Required permissions
- Module owner

## Tool Registration Check

Verify each tool is properly registered:
- [ ] Tool has SKILL.md file
- [ ] Tool has instructions.md file
- [ ] Tool is listed in module manifest
- [ ] Tool permissions documented

## Filter Options

Support filtering by:
- Category (search, write, analyze, execute, utility)
- Module (which module owns the tool)
- Permission level (safe, approval-required, restricted)
- Status (active, deprecated, experimental)

## Tool Metadata

Collect additional metadata:
- Version
- Last updated date
- Usage statistics (if available)
- Related tools
- Dependencies on other tools

Output: Raw tool inventory with all discovered tools and metadata.
