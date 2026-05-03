---
name: bmad-bam-mcp-server-config
description: 'Design MCP (Model Context Protocol) server configuration for multi-tenant AI platforms covering server lifecycle, tenant isolation, tool discovery, federation, and authentication. Use when configuring MCP servers, designing MCP tool federations, or planning tenant-isolated MCP integrations.'
module: bam
tags: [mcp, ai-runtime, integration]
---

# MCP Server Configuration

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Validate | Check config | step-20-v to step-22-v |

## Overview

Design MCP (Model Context Protocol) server configuration for multi-tenant AI platforms. This workflow establishes server lifecycle management, tenant isolation, tool discovery, and authentication patterns.

**Your Role:** Guide decisions on MCP server architecture while ensuring tenant isolation and security.

## Prerequisites

- [ ] Master architecture document available
- [ ] Tenant isolation model selected
- [ ] **Load patterns:** `{project-root}/_bmad/bam/data/patterns/mcp-*.md`

## Outputs

- **MCP Server Config:** `{output_folder}/planning-artifacts/mcp-server-config.md`
- **Load template:** `./templates/mcp-server-config.md`

## Related Workflows

- `bmad-bam-master-architecture`
- `bmad-bam-agent-runtime`
- `bmad-bam-tool-contracts`

## On Activation

### Step 1: Load Persistent Facts

Load from `{project-root}/_bmad/bam/data/context/bam-core.md`

### Step 2: Greet User

Greet and confirm MCP configuration scope.

### Step 3: Begin Workflow

Read `workflow.md` to begin.
