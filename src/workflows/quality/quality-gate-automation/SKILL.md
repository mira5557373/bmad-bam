---
name: quality-gate-automation
displayName: Quality Gate Automation
description: 'Automate quality gate validation in CI/CD pipelines'
module: bam
web_bundle: false
tags: [quality, phase-5, automation, cicd]
---

# Quality Gate Automation

## Overview

This workflow designs and implements automated quality gate validation integrated with CI/CD pipelines. It ensures quality gates are enforced automatically during the software delivery process.

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Design gate automation | `step-01-c-*` to `step-05-c-*` |
| Edit | Update automation | `step-10-e-*` to `step-11-e-*` |
| Validate | Verify automation | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Quality gates defined
- CI/CD pipeline exists
- **Config required:** `test_architecture`

## Outputs

- `gate-automation-spec.md` in `{output_folder}/quality-artifacts/`
- CI/CD configuration files

## Related Workflows

- `bmad-bam-quality-assurance-review` - Manual QA review
- `bmad-bam-cicd-pipeline-design` - Pipeline design
