---
name: bmad-bam-platform
description: 'Design platform architecture for extensibility, plugins, and partner ecosystem. Use when creating platform extension and marketplace architectures.'
module: bam
tags: [platform, extensibility, marketplace]
---

# Platform Architecture

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check architecture | step-20-v to step-22-v |

## Overview

Design platform architecture for extensibility, white-labeling, and partner ecosystem. This workflow establishes plugin systems, marketplace structures, partner APIs, and white-label configurations for multi-tenant SaaS platforms.

**Your Role:** Guide decisions on platform extensibility while ensuring tenant isolation and security across plugins, partners, and white-label customers.

## Prerequisites

- [ ] Master architecture document available
- [ ] Tenant isolation model selected
- [ ] **Load patterns:** `{project-root}/_bmad/bam/data/patterns/plugin-*.md`

## Outputs

- **Platform Architecture:** `{output_folder}/planning-artifacts/platform-architecture.md`
- **Load template:** `./templates/platform-architecture.md`

## Related Workflows

- `bmad-bam-master-architecture`
- `bmad-bam-tenant-isolation`
- `bmad-bam-api-versioning`

## On Activation

### Step 1: Load Persistent Facts

Load from `{project-root}/_bmad/bam/data/context/bam-core.md`

### Step 2: Greet User

Greet and confirm platform architecture scope.

### Step 3: Begin Workflow

Read `workflow.md` to begin.
