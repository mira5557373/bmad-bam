---
name: bmad-bam-dev-trigger
displayName: Development Trigger
description: 'Event trigger for development workflow gates'
module: bam
web_bundle: false
tags: [development, trigger, ci-cd]
---

# Development Trigger

## Overview

This is an event trigger workflow that initiates development gates. It serves as an entry/exit point for:
- QG-DEV1 (Pre-Commit Validation)
- Code change events
- Code review events

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Handle dev event | `step-01-c-*` |

## Prerequisites

- Development environment configured
- CI/CD pipeline active

## Outputs

- Gate evaluation triggered

## Related Workflows

- Pre-commit hooks
- CI/CD pipeline stages
