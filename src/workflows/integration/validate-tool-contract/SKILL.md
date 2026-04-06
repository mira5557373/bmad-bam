---
name: bmad-bam-validate-tool-contract
displayName: Validate Tool Contract
description: Validate tool contract against ToolDefinition schema. Use when the user requests to 'validate tool contract' or 'check tool registration'.
module: bam
web_bundle: true
tags: [ai-runtime]
---

# Validate Tool Contract

## Overview

This workflow validates a module's tool contract against the ToolDefinition schema and QG-M3-TOOLS checklist. It ensures tools are properly registered with correct permissions, tenant scoping, sandbox configuration, and policy rules before they can be used by the AI runtime.

Act as an AI Runtime Architect validating tool safety and compliance.

**Args:** Accepts tool contract path or module name. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

**Intent Check:** Confirm the user's intent and the target tool contract path or module name before processing. Verify the contract exists and is the correct target for validation.

## Mode

This workflow operates in **Validate** mode — checking existing artifacts against quality criteria.

## Validation Checklist

For each tool in the contract:

### Schema Compliance

- [ ] Tool name follows naming convention
- [ ] Description is clear and actionable
- [ ] Input/output schemas defined (JSON Schema or Pydantic)
- [ ] Module owner declared

### Permission Model

- [ ] Role-based access defined
- [ ] Tenant-scoped (tool respects tenant boundaries)
- [ ] Approval-required flag set for high-risk tools
- [ ] Tier restrictions defined (which tiers can use this tool)

### Safety

- [ ] Sandbox configuration specified (E2B for untrusted execution)
- [ ] Rate limits defined per tenant
- [ ] Kill switch registered (can be disabled via feature flag)
- [ ] NeMo guardrail action rail configured (pre-tool check)

### Integration

- [ ] Tool registered in tool registry
- [ ] Facade dependency declared (if tool calls another module)
- [ ] Langfuse tracing configured for tool execution

**Soft Gate:** Validation checklist is complete for all tools. Present a summary of per-tool pass/fail results across schema, permission, safety, and integration checks. Ask for confirmation before generating the final report. In headless mode, auto-proceed.

## Output

- `{output_folder}/planning-artifacts/quality/tool-contract-validation-report.md` — tool contract validation report (pass/fail per tool, per check)
- Remediation items for failures

## References

- Template: `bam/templates/tool-contract-template.md`
- Tool Execution Middleware: `bam/knowledge/tool-execution-middleware.md`

- Checklist: `bam/checklists/qg-m3-tools.md`
- Knowledge: `bam/knowledge/tool-execution-middleware.md`, `bam/knowledge/agent-runtime-patterns.md`
- Tool Execution Middleware: `bam/knowledge/tool-execution-middleware.md`
