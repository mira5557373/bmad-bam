# Step 1: Load Artifact

## Purpose

This step loads the Tool Inventory artifact for validation. The tool inventory is a JSON-formatted catalog of all available tools, utilities, and capabilities within the BMAD workflow system, enabling discovery and documentation of the tooling ecosystem.

## Artifact Location

Load the existing tool inventory from:
- `{output_folder}/cache/tool-inventory.json`

## Pre-Validation Checks

Before proceeding, verify the following conditions:
- The file exists at the specified cache path
- The file contains valid JSON syntax
- The JSON structure is parseable without errors
- Required schema fields are present in each tool entry

## Expected Artifact Structure

The tool inventory JSON should contain these required elements:
- `tools` array with individual tool definitions
- Each tool entry must include: `name`, `description`, `category`
- Each tool entry should include: `parameters`, `usage_examples`
- `metadata` object with inventory version and generation timestamp
- `categories` summary listing all tool categories present

## Error Handling Guidance

If the file does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If the file exists but contains invalid JSON or is missing required schema fields, report the parsing errors or schema violations and suggest regenerating the inventory with the Create workflow.

## Next Step

Once the artifact is successfully loaded and JSON structure is confirmed valid, proceed to Step 2: Validate Artifact to perform detailed quality criteria checks.
