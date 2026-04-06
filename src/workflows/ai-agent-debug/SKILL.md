---
name: bmad-bam-ai-agent-debug
displayName: AI Agent Debug
description: Debug AI agent behavior during development. Use when the user requests to 'debug AI agent' or 'troubleshoot agent behavior'.
module: bam
web_bundle: true
tags: [ai-runtime]
---

# AI Agent Debug

## Overview

This workflow provides a structured approach to debugging AI agent behavior during development. It covers trace analysis, tool execution inspection, memory state examination, prompt debugging, and tenant context verification. Produces a debug report with root cause analysis and fix recommendations.

Act as an AI Runtime Architect debugging agent behavior in LLM-based agent systems with multi-tenant awareness.

**Args:** Accepts agent name/ID and issue description. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Issue Capture

**Intent Check:** Confirm the user's intent before processing their input.

Gather from the user (or from args in headless mode):

- Agent type and configuration
- Expected vs actual behavior
- Reproduction steps
- Tenant context (which tenant, which tier)
- Relevant trace IDs (Langfuse)

### Step 2: Trace Analysis

- Load Langfuse traces for the agent session
- Examine LLM call sequence (prompts, responses, tool calls)
- Identify where behavior diverged from expected
- Check token usage and latency

### Step 3: Tool Execution Inspection

- Verify tool calls were correct (right tool, right parameters)
- Check tool permissions (was the tool allowed for this tenant/role?)
- Examine tool responses (did the tool return expected data?)
- Check sandbox execution (E2B logs if applicable)

### Step 4: Memory State Examination

- Check session memory (was context retained correctly?)
- Check user/tenant memory (was relevant history loaded?)
- Verify memory isolation (no cross-tenant contamination)
- Check memory tier boundaries

### Step 5: Prompt Debugging

- Examine system prompt (correct tier variant loaded?)
- Check context compilation (was relevant context included?)
- Verify guardrail behavior (NeMo rails triggered correctly?)
- Test prompt variations to isolate the issue

### Step 6: Tenant Context Verification

- Verify tenant_id propagation through the agent pipeline
- Check RLS filtering on any data access
- Verify tier-specific behavior (correct feature gates applied?)

**Soft Gate:** Steps 1-6 complete the investigation phase. Present a summary of findings from trace analysis, tool inspection, memory examination, prompt debugging, and tenant verification. Ask for confirmation before proceeding to root cause and fix recommendations.

### Step 7: Root Cause & Fix

- Document root cause with evidence
- Recommend fix (prompt change, tool fix, memory config, guardrail adjustment)
- Suggest regression test to prevent recurrence

## Output

- `{output_folder}/planning-artifacts/quality/debug-report-{agent-name}.md` — debug report with root cause analysis and fix recommendations
- Suggested regression test case for the golden task suite

## References

- Knowledge: `bam/knowledge/agent-runtime-patterns.md`, `bam/knowledge/memory-tier-patterns.md`, `bam/knowledge/tool-execution-middleware.md`
